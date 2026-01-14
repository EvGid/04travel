"""
04travel.ru - Contact API Server
================================
FastAPI application for handling contact form submissions.

USAGE:
------
    uvicorn main:app --host 127.0.0.1 --port 8000

PRODUCTION:
-----------
    uvicorn main:app --host 127.0.0.1 --port 8000 --workers 2
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contact_api import router as contact_router

app = FastAPI(
    title="04travel API",
    description="API для сайта 04travel.ru",
    version="1.0.0"
)

# CORS middleware for development
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "https://04travel.ru",
        "https://www.04travel.ru"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include contact form router
app.include_router(contact_router, prefix="/api")


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "ok"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
