import asyncio

from google import genai

from app.core.config import get_settings


class AIService:
    """Thin wrapper around the Gemini client for generating public-safety guidance."""

    def __init__(self) -> None:
        settings = get_settings()
        self.client = genai.Client(api_key=settings.gemini_api_key) if settings.gemini_api_key else None

    async def generate_safety_tip(self, domain: str, threat_type: str) -> str:
        """Generate a short, citizen-friendly safety tip for a specific threat."""
        if not self.client:
            return "Be cautious with unexpected messages and verify the website directly before clicking anything."

        prompt = (
            f"You are helping a regular citizen understand a cyber threat. "
            f"Create one clear, direct, two-sentence safety tip for a person who saw the domain '{domain}' "
            f"and the threat type '{threat_type}'. "
            "Keep the tone calm, practical, and easy to understand."
        )

        try:
            response = await asyncio.to_thread(
                self.client.models.generate_content,
                model="gemini-2.5-flash",
                contents=prompt,
            )
            text = getattr(response, "text", None)
            if isinstance(text, str) and text.strip():
                return text.strip()
        except Exception:
            pass

        return "Avoid clicking suspicious links and confirm the sender or website through a trusted source."

    async def analyze_suspicious_content(self, content: str) -> dict:
        """Analyze suspicious text or a link and return a structured safety assessment."""
        if not self.client:
            return {
                "verdict": "Suspicious",
                "confidence": "Medium",
                "detailedAnalysis": "The AI service is not configured yet. Treat the message with caution until verified through a trusted source.",
            }

        prompt = (
            "You are a public cyber-defense analyzer. Analyze the provided text or URL. "
            "Determine if it is safe, suspicious, or a scam. "
            "Return your evaluation with a clear one-word verdict, a confidence rating, and a 3-sentence non-technical breakdown explaining why and what the citizen should do."
        )

        try:
            response = await asyncio.to_thread(
                self.client.models.generate_content,
                model="gemini-2.5-flash",
                contents=[prompt, content],
            )
            text = getattr(response, "text", None)
            if isinstance(text, str) and text.strip():
                return self._parse_ai_response(text)
        except Exception:
            pass

        return {
            "verdict": "Suspicious",
            "confidence": "Medium",
            "detailedAnalysis": "The content appears risky. Avoid clicking links or sharing personal details until you verify the sender through a trusted source.",
        }

    def _parse_ai_response(self, raw_text: str) -> dict:
        lines = [line.strip() for line in raw_text.splitlines() if line.strip()]
        verdict = "Suspicious"
        confidence = "Medium"
        analysis = raw_text.strip()

        for line in lines:
            lower = line.lower()
            if lower.startswith("verdict:"):
                verdict = line.split(":", 1)[1].strip() or verdict
            elif lower.startswith("confidence:"):
                confidence = line.split(":", 1)[1].strip() or confidence
            elif lower.startswith("analysis:"):
                analysis = line.split(":", 1)[1].strip() or analysis

        return {
            "verdict": verdict.title(),
            "confidence": confidence,
            "detailedAnalysis": analysis,
        }


ai_service = AIService()
