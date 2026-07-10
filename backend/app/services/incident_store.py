from __future__ import annotations

from datetime import datetime, timezone
from typing import Dict, List, Optional

from app.schemas.incident import IncidentCreateRequest, IncidentResponse, IncidentUpdateRequest


class IncidentStore:
    def __init__(self) -> None:
        self._incidents: Dict[int, dict] = {}
        self._next_id = 1

    def create(self, payload: IncidentCreateRequest) -> IncidentResponse:
        incident_id = self._next_id
        self._next_id += 1
        created_at = datetime.now(timezone.utc).isoformat()
        self._incidents[incident_id] = {
            'id': incident_id,
            'domain': payload.domain,
            'threatType': payload.threat_type if hasattr(payload, 'threat_type') else payload.threatType,
            'severity': payload.severity,
            'status': payload.status,
            'createdAt': created_at,
            'updatedAt': created_at,
        }
        return IncidentResponse(**self._incidents[incident_id])

    def list(self) -> List[IncidentResponse]:
        return [IncidentResponse(**incident) for incident in sorted(self._incidents.values(), key=lambda item: item['id'], reverse=True)]

    def update(self, incident_id: int, payload: IncidentUpdateRequest) -> Optional[IncidentResponse]:
        incident = self._incidents.get(incident_id)
        if not incident:
            return None
        incident['status'] = payload.status
        incident['updatedAt'] = datetime.now(timezone.utc).isoformat()
        return IncidentResponse(**incident)


incident_store = IncidentStore()
