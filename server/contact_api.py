"""
Contact Form API Endpoint for 04travel.ru
==========================================
FastAPI route for handling contact form submissions.
Sends notifications to Telegram and email.

USAGE:
------
Add this router to your main FastAPI app:

    from contact_api import router as contact_router
    app.include_router(contact_router, prefix="/api")

CONFIGURATION:
--------------
Set these environment variables:
    TELEGRAM_BOT_TOKEN - Your Telegram bot token from @BotFather
    TELEGRAM_CHAT_ID   - Chat ID to send notifications to
    SMTP_HOST          - SMTP server (e.g., smtp.beget.com)
    SMTP_PORT          - SMTP port (usually 587 for TLS)
    SMTP_USER          - Email address for sending
    SMTP_PASS          - Email password
    NOTIFY_EMAIL       - Email to receive notifications
"""

import os
import asyncio
import logging
from typing import Optional
from datetime import datetime

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
import httpx
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

# Configure logging
LOG_FILE = os.path.join(os.path.dirname(__file__), "contact_api.log")
logger = logging.getLogger("contact_api")
logger.setLevel(logging.INFO)
# Clear existing handlers
if logger.handlers:
    logger.handlers.clear()
    
file_handler = logging.FileHandler(LOG_FILE)
file_handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
logger.addHandler(file_handler)
logger.addHandler(logging.StreamHandler()) # Also print to console/systemd

router = APIRouter()


# ============== Configuration ==============

TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")
TELEGRAM_CHAT_ID = os.getenv("TELEGRAM_CHAT_ID", "")
CONTACT_THREAD_ID = os.getenv("CONTACT_THREAD_ID", "")

SMTP_HOST = os.getenv("SMTP_HOST", "smtp.beget.com")
SMTP_PORT = int(os.getenv("SMTP_PORT", "587"))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASS = os.getenv("SMTP_PASS", "")
NOTIFY_EMAIL = os.getenv("NOTIFY_EMAIL", "oasis@04travel.ru")


# ============== Models ==============

class ContactFormData(BaseModel):
    name: str = Field(..., min_length=1, max_length=100)
    phone: str = Field(..., min_length=5, max_length=30)
    telegram: Optional[str] = Field(default="", max_length=50)
    interest: str = Field(..., pattern="^(tour|cabin)$")
    dates: Optional[str] = Field(default="", max_length=200)
    comment: Optional[str] = Field(default="", max_length=1000)


class ContactResponse(BaseModel):
    success: bool
    message: str


# ============== Telegram Notification ==============

async def send_telegram_message(text: str) -> bool:
    """Send message to Telegram via Bot API."""
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHAT_ID:
        logger.warning("Telegram credentials not configured")
        return False
    
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendMessage"
    payload = {
        "chat_id": TELEGRAM_CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
    }
    
    if CONTACT_THREAD_ID:
        payload["message_thread_id"] = int(CONTACT_THREAD_ID)
    
    try:
        async with httpx.AsyncClient(timeout=10.0) as client:
            response = await client.post(url, json=payload)
            if response.status_code == 200:
                logger.info("Telegram notification sent successfully")
                return True
            else:
                logger.error(f"Telegram API error: {response.text}")
                return False
    except Exception as e:
        logger.error(f"Failed to send Telegram message: {e}")
        return False


# ============== Email Notification ==============

def send_email_notification(subject: str, body: str) -> bool:
    """Send email notification via SMTP."""
    if not SMTP_USER or not SMTP_PASS or not NOTIFY_EMAIL:
        logger.warning("Email credentials not configured")
        return False
    
    try:
        msg = MIMEMultipart()
        msg["From"] = SMTP_USER
        msg["To"] = NOTIFY_EMAIL
        msg["Subject"] = subject
        msg.attach(MIMEText(body, "html", "utf-8"))
        
        # Use SMTP_SSL for port 465
        if SMTP_PORT == 465:
            with smtplib.SMTP_SSL(SMTP_HOST, SMTP_PORT) as server:
                server.login(SMTP_USER, SMTP_PASS)
                server.send_message(msg)
        else:
            with smtplib.SMTP(SMTP_HOST, SMTP_PORT) as server:
                server.starttls()
                server.login(SMTP_USER, SMTP_PASS)
                server.send_message(msg)
        
        logger.info("Email notification sent successfully")
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {e}")
        return False


# ============== Format Message ==============

def format_telegram_message(data: ContactFormData) -> str:
    """Format contact form data for Telegram."""
    interest_label = "🏔️ Тур" if data.interest == "tour" else "🏡 Домик"
    timestamp = datetime.now().strftime("%d.%m.%Y %H:%M")
    
    lines = [
        "📬 <b>Новая заявка с сайта</b>",
        "",
        f"👤 <b>Имя:</b> {data.name}",
        f"📞 <b>Телефон:</b> {data.phone}",
    ]
    
    if data.telegram:
        lines.append(f"✈️ <b>Telegram:</b> {data.telegram}")
    
    lines.extend([
        f"🎯 <b>Интерес:</b> {interest_label}",
    ])
    
    if data.dates:
        lines.append(f"📅 <b>Даты:</b> {data.dates}")
    
    if data.comment:
        lines.append(f"💬 <b>Комментарий:</b> {data.comment}")
    
    lines.extend([
        "",
        f"🕐 {timestamp}",
    ])
    
    return "\n".join(lines)


def format_email_message(data: ContactFormData) -> tuple[str, str]:
    """Format contact form data for email. Returns (subject, body)."""
    interest_label = "Тур" if data.interest == "tour" else "Домик"
    timestamp = datetime.now().strftime("%d.%m.%Y %H:%M")
    
    subject = f"[04travel] Заявка: {data.name} — {interest_label}"
    
    body = f"""
    <html>
    <body style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Новая заявка с сайта 04travel.ru</h2>
        <table style="border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold;">Имя:</td><td style="padding: 8px;">{data.name}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Телефон:</td><td style="padding: 8px;">{data.phone}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Telegram:</td><td style="padding: 8px;">{data.telegram or '—'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Интерес:</td><td style="padding: 8px;">{interest_label}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Даты:</td><td style="padding: 8px;">{data.dates or '—'}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold;">Комментарий:</td><td style="padding: 8px;">{data.comment or '—'}</td></tr>
        </table>
        <p style="color: #888; font-size: 12px; margin-top: 20px;">Отправлено: {timestamp}</p>
    </body>
    </html>
    """
    
    return subject, body


# ============== API Route ==============

@router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(data: ContactFormData):
    """
    Handle contact form submission.
    Sends notification to Telegram and email.
    """
    logger.info(f"Received contact form: {data.name}, {data.phone}")
    
    # Format messages
    telegram_msg = format_telegram_message(data)
    email_subject, email_body = format_email_message(data)
    
    # Send Telegram notification (async)
    tg_task = asyncio.create_task(send_telegram_message(telegram_msg))
    
    # Send email notification (sync, run in executor)
    loop = asyncio.get_event_loop()
    email_task = loop.run_in_executor(None, send_email_notification, email_subject, email_body)
    
    # Wait for both
    tg_result = await tg_task
    email_result = await email_task
    
    if not tg_result and not email_result:
        logger.error("Both notification methods failed")
        # Still return success to user, but log the error
        # In production, you might want to queue this for retry
    
    return ContactResponse(
        success=True,
        message="Заявка успешно отправлена"
    )
