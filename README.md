# Intelligence Testing

**An opt-in, game-like platform for exploring human cognitive strengths, learning potential, specialization, and performance variability.**

> **Status:** M0 foundation implemented on a feature branch. No playable cognitive assessment or validated intelligence scores exist yet.

## Vision

Help people understand *how* they think, learn, adapt, and solve unfamiliar problems without conflating intelligence with trivia knowledge or a person's worth.

The product will eventually provide:
- **Domain scores:** independent measurements of reasoning, learning potential, working memory, spatial reasoning, processing efficiency, creative problem solving, social-emotional reasoning, and adaptive planning.
- **Capability profile:** broad cognitive strengths, peak specializations, and combinations of strengths; generalists and specialists both remain visible.
- **Performance profile:** performance while trying hard, during relaxed exploration, and across naturally occurring variations in fatigue and motivation.
- **Longitudinal insights:** changes across sessions, learning curves, practice effects, and measurement uncertainty.

These are *proposed constructs*, not eight empirically independent intelligences. The cognitive taxonomy and any composite index must be validated before interpretation.

## Core product principles

1. **Voluntary and transparent.** Participants know they are engaging in a cognitive assessment, even when individual task rules and scoring algorithms are hidden to preserve test validity. Separate consent for optional longitudinal data.
2. **Exploration contributes evidence.** Both modes record performance. Assessment Mode initially contributes about 75% and Exploration Mode about 25% of the provisional ability evidence, subject to reliability, task novelty, and validation. This is a design hypothesis, not a validated scoring rule.
3. **Reward curiosity, not just correctness.** Exploration, experimentation, and requesting hints must not automatically reduce a person's estimated intelligence. Learning responses can be measured separately from independent proficiency.
4. **Randomize *structure*, not just appearance.** Generate unseen rule families, graphs, transformations, and strategies; enforce solvability and monitor prior exposure to prevent answer memorization.
5. **Balance specialization and breadth.** Publish a multidimensional profile with peak strengths and consistency across domains. An overall composite, if offered, must have an explicit and validated weighting rationale.
6. **Separate ability from state.** Fatigue, stress, sleep, illness, motivation, and accessibility can change measured performance. A tired session is not proof of lower intelligence. Burnout must never be inferred from task scores alone.
7. **Privacy by default.** Minimize data collected; provide exports and deletion; never sell participant data or silently reuse it for third-party ranking.
8. **Do not overclaim.** Before norming and psychometric validation, output only experimental task metrics with uncertainty, not IQ, diagnostic, or population-percentile claims.

## Development roadmap

The detailed, testable milestone criteria are in **[docs/MILESTONES.md](docs/MILESTONES.md)**.

| Milestone | Outcome |
|---|---|
| M0 — Foundation | Repository conventions, privacy/consent groundwork, runnable project skeleton |
| M1 — Measurement design | Defined constructs, tasks, validity risks, event/data schema |
| M2 — Rule Discovery prototype | Solvable, seed-reproducible and structurally varied puzzles |
| M3 — Two play modes & telemetry | Assessment and Exploration with complete consented instrumentation |
| M4 — Provisional scoring & adaptation | Evidence weighting, uncertainty, novelty tracking, adaptive difficulty |
| M5 — More cognitive tasks | Memory, spatial reasoning, and adaptive planning challenges |
| M6 — Personal intelligence profile | Domain reporting, specialization, breadth, repeat-session history |
| M7 — States and longitudinal measures | Natural fatigue and effort variability, recovery trends |
| M8 — Pilot and calibration | Quality, reliability, measurement invariance, and external validation |
| M9 — Voluntary beta | Accessible, privacy-preserving deployment with honest score explanations |

**Milestone dependencies:** M0 → M1 → M2 → M3 → M4; then M5 and M6; M7 builds on repeated sessions; M8 validates measures before M9 presents any norm-based claims.

## Planned implementation

- Web frontend: React + TypeScript (accessible browser tasks)
- Behavioral task runner: jsPsych where useful
- Backend: Python + FastAPI
- Storage: SQLite in local development, PostgreSQL only if server deployment is justified
- Analysis: NumPy/SciPy initially; psychometric and Bayesian models after sufficient pilot data
- Tests: Vitest/Playwright for frontend and interaction; pytest/property-based tests for generators and scoring

The technology is a **proposal**, not yet an installed or configured stack. Begin with M0.

## First engineering target

Implement a Rule Discovery prototype in which every attempt records a generator seed, a versioned rule family, the task's solution and difficulty metadata, response/attempt history, hints, mode, and prior exposure. Verify many generated puzzles with automated tests *before* treating success rates as ability estimates.

## Research and ethical boundaries

This is a personal-development tool, **not** a system for ranking human worth, diagnosing cognitive or mental health conditions, or silently evaluating people. Scores should be tied to clearly defined tasks, intervals, and validation evidence. Population norms and composite scores are blocked until M8's scientific checks support them.

## Documentation

- [Milestones and acceptance criteria](docs/MILESTONES.md)

## Contributing

Initially use GitHub issues and pull requests for changes, attaching a short test plan and evidence that relevant acceptance criteria are met. Keep assessment logic auditable, version all generated tasks, and do not commit participant data or secrets.


## Milestone 0: local foundation (feature branch)

The initial scaffold is proposed in **[PR #1](https://github.com/UltDstroyer/intelligence-testing/pull/1)**. It includes a responsive React/TypeScript consent-first preview and a FastAPI health endpoint. These are **not** working cognitive assessments yet.

To try the scaffold on NixOS:

~~~bash
git clone https://github.com/UltDstroyer/intelligence-testing.git
cd intelligence-testing
git switch feat/m0-foundation
nix-shell
python -m venv .venv
source .venv/bin/activate
pip install -e "./backend[dev]"
uvicorn app.main:app --app-dir backend --reload --host 127.0.0.1 --port 8000
~~~

From a second terminal:

~~~bash
cd intelligence-testing/web
npm install
npm run dev
~~~

Open **http://127.0.0.1:5173**. The app requests acknowledgment before opening its placeholder lab preview; it does not record cognitive attempts.

See [development setup](docs/DEVELOPMENT.md), [technical architecture](docs/ARCHITECTURE.md), and [privacy specification](docs/PRIVACY.md). CI status and any remaining work are tracked in PR #1.
