
import os
import json
import uuid
import logging
import asyncio
import httpx
from fastapi import APIRouter, Request, HTTPException, BackgroundTasks
from pydantic import BaseModel
from sse_starlette.sse import EventSourceResponse
from typing import Dict, List, Optional
from datetime import datetime

# Configure chat logger
CHAT_LOG_FILE = os.path.join(os.path.dirname(__file__), "chat_api.log")
logger = logging.getLogger("chat_api")
logger.setLevel(logging.INFO)

if logger.handlers:
    logger.handlers.clear()

file_handler = logging.FileHandler(CHAT_LOG_FILE)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
logger.addHandler(file_handler)
logger.addHandler(logging.StreamHandler())

router = APIRouter()

# Environment variables
TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")
CHAT_THREAD_ID = os.getenv("CHAT_THREAD_ID", "")

# In-memory storage for active sessions and message mappings
# In production, use Redis or a database
sessions: Dict[str, asyncio.Queue] = {}
# Mapping from TG Message ID to User Session ID
message_map: Dict[int, str] = {}

class ChatMessage(BaseModel):
    session_id: str
    text: str
    user_name: Optional[str] = "Гость"

def get_telegram_message_text(message: dict) -> Optional[str]:
    """Extract text representation from various Telegram message types."""
    if message.get("text"):
        return message.get("text")
    
    if message.get("sticker"):
        emoji = message.get("sticker", {}).get("emoji")
        return emoji if emoji else "[Стикер]"
        
    if message.get("caption"):
        return message.get("caption")
        
    if message.get("photo"):
        return "[Фото]"
        
    if message.get("voice"):
        return "[Голосовое сообщение]"
        
    if message.get("video"):
        return "[Видео]"
        
    if message.get("document"):
        return "[Документ]"
        
    return None

async def send_to_telegram(text: str, session_id: str, user_name: str):
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        logger.warning("Telegram credentials not configured for chat")
        return
    
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    
    formatted_text = (
        f"💬 <b>Новое сообщение в чате</b>\n"
        f"👤 Пользователь: {user_name}\n"
        f"🆔 Сессия: <code>{session_id}</code>\n\n"
        f"{text}"
    )
    
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": formatted_text,
        "parse_mode": "HTML"
    }
    
    if CHAT_THREAD_ID:
        payload["message_thread_id"] = int(CHAT_THREAD_ID)
    
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(url, json=payload)
            if response.status_code == 200:
                result = response.json()
                logger.info(f"Telegram response: {json.dumps(result)}")
                tg_msg_id = result.get("result", {}).get("message_id")
                if tg_msg_id:
                    message_map[tg_msg_id] = session_id
                    logger.info(f"Chat message sent to TG. Map: {tg_msg_id} -> {session_id}")
            else:
                logger.error(f"TG API error in chat: {response.text}")
    except Exception as e:
        logger.error(f"Failed to send chat to TG: {e}")

@router.post("/chat/send")
async def handle_user_message(data: ChatMessage, background_tasks: BackgroundTasks):
    logger.info(f"Received chat from {data.session_id}: {data.text}")
    
    # Send to Telegram in background
    background_tasks.add_task(send_to_telegram, data.text, data.session_id, data.user_name)
    
    return {"status": "sent"}

@router.get("/chat/stream/{session_id}")
async def chat_stream(session_id: str, request: Request):
    if session_id not in sessions:
        sessions[session_id] = asyncio.Queue()
    
    async def event_generator():
        queue = sessions[session_id]
        try:
            while True:
                # Check for client disconnect
                if await request.is_disconnected():
                    logger.info(f"Client {session_id} disconnected")
                    break
                
                try:
                    # Wait for message with timeout to prevent hanging
                    message = await asyncio.wait_for(queue.get(), timeout=30.0)
                    yield {
                        "event": "message",
                        "data": json.dumps(message),
                        "id": str(uuid.uuid4())
                    }
                except asyncio.TimeoutError:
                    # Keep-alive comment
                    yield {"comment": "keep-alive"}
        finally:
            # Cleanup on disconnect? 
            # We might want to keep the queue in case of reconnect
            pass

    return EventSourceResponse(event_generator())

@router.post("/chat/webhook")
async def telegram_webhook(request: Request):
    data = await request.json()
    logger.info(f"Webhook received: {json.dumps(data)}")
    
    message = data.get("message", {})
    if not message:
         # Sometimes updates are 'edited_message' or 'channel_post'
        message = data.get("edited_message") or data.get("channel_post") or {}

    reply_to = message.get("reply_to_message", {})
    text_content = get_telegram_message_text(message)
    
    if reply_to and text_content:
        reply_msg_id = reply_to.get("message_id")
        logger.info(f"Processing reply to message ID: {reply_msg_id}. Current Map keys: {list(message_map.keys())}")
        
        session_id = message_map.get(reply_msg_id)
        
        if session_id:
            if session_id in sessions:
                response_text = text_content
                logger.info(f"Operator reply for {session_id}: {response_text}")
                
                # Put message into user's queue
                await sessions[session_id].put({
                    "role": "bot",
                    "text": response_text,
                    "timestamp": datetime.now().isoformat()
                })
                return {"status": "delivered"}
            else:
                logger.warning(f"Could not find session {session_id} in active sessions")
        else:
            logger.warning(f"Could not find session for reply to {reply_msg_id}")
    
    return {"status": "ignored"}
