# Architecture: M0 foundation

## Directory tree

~~~text
.github/workflows/ci.yml   CI verification
backend/
  pyproject.toml           Python package and pinned direct dependencies
  app/main.py              FastAPI health route only
  tests/test_main.py       API smoke and no-telemetry assertions
web/
  package.json             React, Vite, TypeScript, test/lint tools
  index.html               Browser entry
  src/App.tsx              Consent-first welcome screen
  src/consent.ts           Placeholder lab gate
  src/styles.css           Responsive styles
  src/*.test.*             UI and consent tests
  vite.config.ts           Development API proxy and Vitest setup
shell.nix                  Local NixOS development tools
docs/PRIVACY.md            Participation and data-boundary specification
docs/DEVELOPMENT.md        Local startup and smoke-test instructions
docs/MILESTONES.md         Roadmap and exit criteria
~~~

## Current request/data flow

Browser -> Vite (127.0.0.1:5173) -> /api proxy -> FastAPI (127.0.0.1:8000).

Only GET /api/health exists. It supplies static service metadata and does not require identifiers or use a database. Consent in M0 is a transient in-memory UI state that unlocks a placeholder view. There is no session identity or telemetry event.

This is a **technical starting point**, not proof that web servers, browsers, hosting providers, or network intermediaries collect zero access data. For private use run the services on loopback and do not add analytics.

## Future design boundaries

- Event ingestion will be introduced only after versioned M1 schema and M3 consent implementation, with explicit tests that unauthenticated/unconsented requests cannot write anything.
- Raw events, participant pseudonyms, and score estimates will be separate concepts. Consent version and task-generator version will accompany future observations.
- Exploration and Assessment both contribute evidence eventually, but claims remain provisional pending calibration. The proposed 75/25 split is a design experiment, not a psychometric fact.
- Deployment should use least-privilege credentials, encryption at rest and transit, deletion/export endpoints, and retention controls.
- No IQ-style or diagnostic score will be presented until supported by scientific validation.

## Planned interfaces (not implemented)

- Consent creation/withdrawal and export/delete operations
- Task definition and seed/revision metadata
- Assessment/Exploration sessions
- Event capture and reproducible scoring outputs
- Participant-owned longitudinal reporting

These interfaces will be specified in M1 before implementation.
