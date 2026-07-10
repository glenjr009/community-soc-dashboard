from typing import Literal, Optional

from pydantic import BaseModel

Severity = Literal['Critical', 'High', 'Medium']
Status = Literal['New', 'Investigating', 'Mitigated', 'False Positive']


class IncidentCreateRequest(BaseModel):
    domain: str
    threatType: str
    severity: Severity
    status: Status = 'New'


class IncidentUpdateRequest(BaseModel):
    status: Status


class IncidentResponse(BaseModel):
    id: int
    domain: str
    threatType: str
    severity: Severity
    status: Status
    createdAt: Optional[str] = None
    updatedAt: Optional[str] = None
