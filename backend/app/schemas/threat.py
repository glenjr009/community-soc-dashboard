from typing import Literal

from pydantic import BaseModel, Field


class ThreatSchema(BaseModel):
    """Represents a public-facing cyber threat signal."""

    id: int = Field(..., ge=1, description="Unique identifier for the threat")
    domain: str = Field(..., min_length=3, description="Suspicious domain or URL")
    threatType: str = Field(..., min_length=3, description="Type of threat detected")
    severity: Literal["Critical", "High", "Medium"] = Field(
        ..., description="Severity level of the threat"
    )
    safetyTip: str = Field(..., min_length=5, description="Plain-language safety advice")
