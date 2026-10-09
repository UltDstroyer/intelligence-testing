# Local development (Milestone 0)

This project currently contains a working application **skeleton**. There are no cognitive tests or validated intelligence scores yet.

## Requirements

- NixOS: enter the repository root and run **nix-shell** (uses the system's configured Nixpkgs).
- Other platforms: Node.js **22**, Python **3.12**, and Git.

The Nix shell supplies Node 22, Python 3.12, virtualenv, and Git. It does not modify the host's global package collections.

## Start the backend

From the repository root:

~~~sh
python -m venv .venv
source .venv/bin/activate
python -m pip install -e "./backend[dev]"
uvicorn app.main:app --app-dir backend --reload --host 127.0.0.1 --port 8000
~~~

The backend health endpoint is **http://127.0.0.1:8000/api/health**. Its JSON response explicitly says event collection is disabled.

## Start the frontend

In a second terminal, from the repository root:

~~~sh
cd web
npm install
npm run dev
~~~

Open **http://127.0.0.1:5173**. Vite proxies /api to the local backend at port 8000. Use **Check API** to verify the connection.

The frontend has a consent/acknowledgment checkbox controlling a placeholder lab preview. No gameplay telemetry, cookies, accounts, or user data persistence exist in M0.

## Run checks

From repository root with the Python venv activated:

~~~sh
ruff check backend
ruff format --check backend
python -m pytest -q backend/tests
~~~

From web/:

~~~sh
npm run typecheck
npm run lint
npm run format:check
npm run test
npm run build
~~~

To format files:

~~~sh
ruff format backend
cd web && npm run format
~~~

CI runs backend lint, format checks, tests, and frontend type checks, lint, tests, and build. Frontend format can be checked locally; it will become a CI gate once a verified dependency lockfile and consistent formatting baseline are committed.

## Reproducibility caveats and next hardening step

Direct application dependencies are pinned in backend/pyproject.toml and web/package.json, and CI chooses Node 22 / Python 3.12. **Transitive dependencies are not yet locked**: an npm package-lock.json and a pinned Python resolver lock should be generated in a networked development environment and committed before release. Likewise, shell.nix follows the user's configured Nixpkgs; pin Nixpkgs when exact reproducibility across machines becomes required.

## Smoke tests

1. Start the backend and request /api/health. It returns 200 and event_collection_enabled: false.
2. Start the frontend and verify Enter the lab is disabled by default.
3. Tick the consent acknowledgment, enter the preview, then leave it.
4. Untick the checkbox; lab entry should immediately become unavailable.
5. Click Check API; the status should read online when the backend is running.
6. A POST to /api/events returns 404 because M0 intentionally has no data collection route.

## Milestone boundary

- **M0:** UI, API, consent design, CI, and development shell.
- **M1:** Psychometric constructs and versioned event schema.
- **M2:** First playable procedural challenge.
- **M3:** Genuine consented event recording and both modes.

See docs/ARCHITECTURE.md and docs/PRIVACY.md.
