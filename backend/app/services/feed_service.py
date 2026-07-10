import asyncio
import re
import time
from typing import List, Optional

import requests

from app.schemas.threat import ThreatSchema
from app.services.ai_service import ai_service


class FeedService:
    """Fetches and caches threat indicators from a public open-source feed."""

    FEED_URL = "https://openphish.com/feed.txt"
    CACHE_TTL_SECONDS = 600
    MAX_ITEMS = 8

    def __init__(self) -> None:
        self._cache: Optional[List[dict]] = None
        self._cache_time: float = 0.0

    def _normalize_domain(self, value: str) -> str:
        value = value.strip().lower()
        value = value.replace("http://", "").replace("https://", "")
        value = value.split("/", 1)[0]
        value = re.sub(r"^www\.", "", value)
        return value

    def _classify_severity(self, value: str) -> str:
        if "phish" in value.lower() or "malware" in value.lower():
            return "Critical"
        return "High"

    def _parse_feed(self, raw_text: str) -> List[dict]:
        domains: List[dict] = []
        seen = set()

        for line in raw_text.splitlines():
            candidate = line.strip()
            if not candidate or candidate.startswith("#"):
                continue

            domain = self._normalize_domain(candidate)
            if not domain or "." not in domain or domain in seen:
                continue

            seen.add(domain)
            domains.append(
                {
                    "id": len(domains) + 1,
                    "domain": domain,
                    "threatType": "Phishing Domain Detected",
                    "severity": self._classify_severity(domain),
                }
            )

            if len(domains) >= self.MAX_ITEMS:
                break

        return domains

    def fetch_feed(self) -> List[dict]:
        """Fetch the public feed, returning cached data when still fresh."""
        now = time.time()
        if self._cache and (now - self._cache_time) < self.CACHE_TTL_SECONDS:
            return self._cache

        try:
            response = requests.get(self.FEED_URL, timeout=10)
            response.raise_for_status()
            self._cache = self._parse_feed(response.text)
            self._cache_time = now
            return self._cache
        except Exception:
            if self._cache:
                return self._cache
            return []


feed_service = FeedService()
