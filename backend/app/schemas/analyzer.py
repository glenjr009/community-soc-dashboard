from pydantic import BaseModel, Field


class ScanRequest(BaseModel):
    """Request payload for scanning suspicious text or URLs."""

    content: str = Field(..., min_length=3, description="Text or URL to analyze")


class ScanResponse(BaseModel):
    """Response payload returned by the content scanner."""

    verdict: str = Field(..., description="One-word verdict such as Safe, Suspicious, or Scam")
    confidence: str = Field(..., description="Confidence level of the analysis")
    detailedAnalysis: str = Field(..., description="Three-sentence non-technical breakdown")
