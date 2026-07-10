import asyncio
from typing import List

from fastapi import APIRouter, HTTPException

from app.schemas.analyzer import ScanRequest, ScanResponse
from app.schemas.incident import IncidentCreateRequest, IncidentResponse, IncidentUpdateRequest
from app.schemas.threat import ThreatSchema
from app.services.ai_service import ai_service
from app.services.feed_service import feed_service
from app.services.incident_store import incident_store

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


@router.get("/incidents", response_model=List[IncidentResponse])
async def list_incidents() -> List[IncidentResponse]:
    """Return the persisted incident queue."""
    return incident_store.list()


@router.post("/incidents", response_model=IncidentResponse)
async def create_incident(payload: IncidentCreateRequest) -> IncidentResponse:
    """Create a new incident entry for the analyst queue."""
    return incident_store.create(payload)


@router.put("/incidents/{incident_id}", response_model=IncidentResponse)
async def update_incident(incident_id: int, payload: IncidentUpdateRequest) -> IncidentResponse:
    """Update the status of an existing incident."""
    incident = incident_store.update(incident_id, payload)
    if not incident:
        raise HTTPException(status_code=404, detail="Incident not found")
    return incident
