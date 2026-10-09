"""M0 API smoke and consent-boundary tests."""

from fastapi.testclient import TestClient

from app.main import app

client = TestClient(app)


def test_health_response_is_explicit_about_data_collection() -> None:
    response = client.get("/api/health")
    assert response.status_code == 200
    assert response.json() == {
        "status": "ok",
        "service": "intelligence-testing-api",
        "event_collection_enabled": False,
    }


def test_no_participant_event_endpoint_exists_in_m0() -> None:
    # M0 does not accept or persist cognitive attempts, even with arbitrary payloads.
    response = client.post("/api/events", json={"participant_id": "example", "attempts": []})
    assert response.status_code == 404


def test_health_route_requires_no_participant_identity() -> None:
    response = client.get("/api/health")
    assert response.status_code == 200
    assert "participant_id" not in response.text
