import asyncio
from typing import List

from fastapi import APIRouter

from app.schemas.analyzer import ScanRequest, ScanResponse
from app.schemas.threat import ThreatSchema
from app.services.ai_service import ai_service
from app.services.feed_service import feed_service

router = APIRouter()


@router.get("/threats", response_model=List[ThreatSchema])
async def get_threats() -> List[ThreatSchema]:
    """Return live community threat signals with AI-generated safety guidance."""
    live_threats = feed_service.fetch_feed()

    async def build_threat(threat: dict) -> ThreatSchema:
        safety_tip = await ai_service.generate_safety_tip(
            domain=threat["domain"],
            threat_type=threat["threatType"],
        )
        return ThreatSchema(
            id=threat["id"],
            domain=threat["domain"],
            threatType=threat["threatType"],
            severity=threat["severity"],
            safetyTip=safety_tip,
        )

    return await asyncio.gather(*(build_threat(threat) for threat in live_threats))


@router.post("/analyze", response_model=ScanResponse)
async def analyze_content(payload: ScanRequest) -> ScanResponse:
    """Analyze suspicious text or a link and return a structured safety assessment."""
    analysis = await ai_service.analyze_suspicious_content(payload.content)
    return ScanResponse(
        verdict=analysis["verdict"],
        confidence=analysis["confidence"],
        detailedAnalysis=analysis["detailedAnalysis"],
    )
