from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.endpoints import router as threat_router

app = FastAPI(
    title="Community SOC Dashboard API",
    description="Secure public-facing threat intelligence endpoints for the community dashboard.",
    version="1.0.0",
)

# Allow the local React development server to call the backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(threat_router, prefix="/api")
