"""Minimal API for the M0 foundation.

No participant telemetry routes or persistent stores exist in M0 by design.
"""

from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title="Intelligence Testing API",
    description="Consent-first cognitive exploration prototype",
    version="0.1.0",
)


class HealthResponse(BaseModel):
    """Public, non-personal service metadata."""

    status: str
    service: str
    event_collection_enabled: bool


@app.get("/api/health", response_model=HealthResponse)
def health() -> HealthResponse:
    """Check service availability without collecting participant data."""
    return HealthResponse(
        status="ok",
        service="intelligence-testing-api",
        event_collection_enabled=False,
    )
