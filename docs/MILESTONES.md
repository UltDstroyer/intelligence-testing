# Development Milestones and Acceptance Criteria

This checklist defines **done** in terms of verifiable artifacts and tests. Mark a milestone complete only when every mandatory criterion has supporting evidence (tests, screenshots, sample data, or a review). Estimates, thresholds, and scoring weights are provisional until pilot validation.

## M0 — Repository and development foundation
**Goal:** A repeatable local environment and a safe foundation for participant data.

- [ ] Create a TypeScript/React web app with a documented local startup command.
- [ ] Create a FastAPI Python service with version-pinned dependencies and one documented health route.
- [ ] Document NixOS-first setup (optionally a dev shell/flake), plus platform-neutral startup instructions.
- [ ] Establish frontend and backend lint, format, type-check, and test commands.
- [ ] Add CI that runs checks on every pull request and fails on broken builds.
- [ ] Add .gitignore covering secrets, local databases, generated datasets, node_modules, caches, and participant exports.
- [ ] Add a minimal privacy notice, voluntary participation disclosure, withdrawal/delete workflow specification, and consent gate design.
- [ ] Document repository structure and a reproducible smoke test.

**Exit evidence:** Clean checkout passes CI and runs locally; no participant event can be recorded before consent.

## M1 — Measurement design and experiment specification
**Goal:** Specify what is being observed before building score formulas.

- [ ] Create a construct map for fluid reasoning, learning potential, working memory, spatial reasoning, processing efficiency, creativity, social-emotional reasoning, and adaptive planning; label conceptual overlaps.
- [ ] For each initial task, state the proposed domain(s), confounds, observable behaviors, scoring direction, and what it *cannot* establish.
- [ ] Distinguish capability, task proficiency, learning rate, momentary state, and long-term performance variability.
- [ ] Specify Assessment versus Exploration behaviors: instructions, hints, feedback, pause rules, difficulty policies, and contribution to scores.
- [ ] Write an event schema with pseudonymous participant ID, consent version, session/mode, timestamp, task/generator/version/seed, difficulty, response history, hints, feedback, timing, device class, and prior exposure.
- [ ] Version the scoring model, task family, calibration data, and each reporting algorithm.
- [ ] Write a preregistration-style list of hypotheses, potential biases, and validation requirements.
- [ ] Design an accessibility review covering keyboard use, reduced motion, color independence, and timer accommodations.

**Exit evidence:** Reviewed spec and valid example event payloads for both modes; all measured categories have explicit operational definitions or are marked future research.

## M2 — Rule Discovery procedural challenge MVP
**Goal:** A genuinely playable task with new, checkable challenges.

- [ ] Implement at least **3 structurally distinct** hidden-rule families, not merely symbol recoloring.
- [ ] Generate tasks from deterministic seeds and record generator versions.
- [ ] Provide a reference solver that checks solution correctness and flags ambiguous/unintended solutions.
- [ ] Define difficulty features (e.g. hypothesis space, rule depth, number of observations required) rather than equating difficulty with random complexity.
- [ ] Build an accessible UI for exploring examples, submitting hypotheses/answers, requesting hints, and completing a task.
- [ ] Save a full local replayable attempt history (not just the final answer).
- [ ] Add property-based or fuzz tests over at least **1,000 generated seeds per rule family**; failures must be reproducible.
- [ ] Test that task families have varied solutions, no accidental leaks of hidden answers, and stable output given seed plus version.
- [ ] Make a manually reviewed set of at least 20 examples, with written notes on expected solutions and accessibility issues.

**Exit evidence:** Playable locally, automatic tests pass, and unseen tasks can be solved and verified without hand-authoring answers.

## M3 — Assessment, Exploration, and privacy-safe telemetry
**Goal:** Both modes measure cognition but have different participant experiences.

- [ ] Assessment presents calibrated-style, unfamiliar tasks with standardized instructions and limited assistance.
- [ ] Exploration permits hints, retries, creative experiments, and lower-pressure play; behavior is still logged with consent.
- [ ] Record assistance, retries, exposure, and familiarity separately from success/failure.
- [ ] Log time spent actively solving separately from paused or idle time, and avoid treating inactivity as low ability.
- [ ] Provide an optional post-session self-report for effort, fatigue, sleepiness, and perceived pressure.
- [ ] Give participants clear notice of cognitive measurement in both modes while keeping exact hidden rules and scoring mechanics concealed.
- [ ] Allow review/export/delete of collected data and withdrawal of optional longitudinal consent.
- [ ] Test disconnect, refresh, offline interruption, skipped questions, and missing state-report fields without corrupting sessions.
- [ ] Explicitly forbid inferring burnout from performance data alone.

**Exit evidence:** A volunteer can consent, complete either mode, inspect their records, export, and delete them; automated privacy and data-consistency checks pass.

## M4 — Provisional ability model and adaptive delivery
**Goal:** Useful estimates without false precision or easy answer farming.

- [ ] Implement an auditable baseline for within-task performance and learning; keep separate metrics for accuracy, time, hints, attempts, and transfer.
- [ ] Implement a provisional **75% Assessment / 25% Exploration** evidence-policy experiment (not a scientifically validated ratio).
- [ ] Reduce or cap contribution from repeated instances, exposed rules, hints, and structurally similar puzzles, while preserving learning evidence separately.
- [ ] Keep exploration failures from automatically penalizing the ability estimate; characterize exploration and learning process independently.
- [ ] Include uncertainty/confidence in every experimental estimate, expanding uncertainty when data is sparse.
- [ ] Select new items using estimated ability, novelty, coverage, and uncertain difficulty; preserve deliberate exploration freedom.
- [ ] Test synthetic participant profiles: generalist, narrow specialist, broad specialist, fast learner, random responder, and high-practice memorizer.
- [ ] Show no population percentiles, IQ labels, diagnostic assertions, or 'validated' claims before M8.
- [ ] Write reproducible unit tests for identical-event scoring and monotonicity where appropriate.

**Exit evidence:** Synthetic tests show sensible directional behavior, anti-repetition protections work, and results remain explicitly labeled experimental.

## M5 — Expand cognitive task coverage
**Goal:** Measure multiple skills with more than one narrow game mechanic.

- [ ] Build a working-memory task with varying sequence lengths and manipulation demands.
- [ ] Build a spatial transformation task with fresh objects, transformations, and calibrated candidate answers.
- [ ] Build an adaptive-planning task with procedural goals, multiple strategies, and rule-change events.
- [ ] Implement seeded generators and solution validators for each new task.
- [ ] Add randomized holdout forms that test transfer rather than memorized layouts.
- [ ] Check device/input confounds (mouse versus touch, different screen sizes) and document limitations.
- [ ] Define which domain scores can be supported by current tasks; do not report unmeasured domains as zeros.
- [ ] Add tests for reproducibility, accessibility, data events, correct evaluation, and level progression.

**Exit evidence:** Four task families playable in both modes with versioned event records, basic QA, and no unsupported domain claims.

## M6 — Personal profile, breadth, and specialization
**Goal:** A participant can understand their measured strengths without being reduced to a ranking.

- [ ] Display individual measured domains with uncertainty intervals and an explanation of what each domain covers.
- [ ] Separate peak ability, typical performance, learning trajectories, and task familiarity.
- [ ] Show cognitive breadth and exceptional strengths as independently labeled *exploratory* descriptors.
- [ ] Design a composite-index proposal that rewards both robust specialization and broad competence; document alternative weights and sensitivity analysis.
- [ ] Do not calculate population-normalized IQ-style scores until a suitable norm sample and validity evidence exist.
- [ ] Implement a chronological session history with explicit practice and exposure indicators.
- [ ] Make all charts screen-reader accessible and offer text/table alternatives.
- [ ] Verify profile consistency against raw events and scoring version; allow private export and deletion.

**Exit evidence:** Profile is reproducible from raw data, distinguishes breadth from peaks, and never implies personal worth or clinical diagnosis.

## M7 — Cognitive state, effort, and longitudinal study
**Goal:** Separate stable capacity from daily fluctuation.

- [ ] Design brief optional check-ins for perceived effort, sleepiness, fatigue, stress, and rest, with skip controls.
- [ ] Use natural state variation; **never induce sleep deprivation, chronic stress, or burnout** as an assessment condition.
- [ ] Compare performance on equated/unseen tasks across rested, relaxed, and naturally tired occasions.
- [ ] Account for time-of-day, device, item familiarity, and practice effects in analyses.
- [ ] Describe fatigue sensitivity and recovery trends with intervals, avoiding identity labels from isolated sessions.
- [ ] If burnout is studied, use an appropriate separate validated self-report with consent; never diagnose it from gameplay.
- [ ] Provide optional longitudinal reminders and a straightforward pause/opt-out mechanism.
- [ ] Establish a minimum evidence requirement before showing any state-based conclusion.

**Exit evidence:** Multiple sessions produce interpretable within-person charts without conflating exhaustion with intelligence.

## M8 — Scientific pilot, calibration, and validation gate
**Goal:** Determine whether the measurements are psychometrically meaningful.

- [ ] Draft a pilot protocol with informed consent, target population, exclusions, and a sample-size rationale.
- [ ] Seek institutional ethics/IRB review where applicable before formal human-subjects research.
- [ ] Calibrate item difficulty using observed response data instead of assuming generated complexity equals difficulty.
- [ ] Evaluate test-retest reliability, alternate-form equivalence, practice effects, and scoring stability.
- [ ] Examine convergent/discriminant validity against appropriate established measures.
- [ ] Check whether task data support claimed factors or whether domain constructs are too correlated or underspecified.
- [ ] Analyze device, accessibility, language, and demographic fairness; document limits and mitigation.
- [ ] Validate breadth/specialization weights and exploration contribution with out-of-sample criteria; revise or drop weights that are unsupported.
- [ ] Investigate predictive value for independently measured learning and transfer outcomes, not 'human value'.
- [ ] Publish a transparent limitations/validity report and explicit release gate for every kind of score.

**Exit evidence:** Reproducible pilot report, data-protection review, quantitative reliability/validity results, and written go/no-go decision for norm-based reporting.

## M9 — Voluntary privacy-preserving beta
**Goal:** A stable product for personal insight, not a covert ranking system.

- [ ] Publish understandable consent and data-use notices; explain that specific hidden rules are concealed but measurement is not.
- [ ] Offer participant-controlled export, deletion, and optional local-only storage where feasible.
- [ ] Test security, authentication (if implemented), input validation, retention, and deletion end-to-end.
- [ ] Provide usable mobile/desktop interfaces with accessibility testing.
- [ ] Document limits, version history, uncertainty, and the evidence backing every score.
- [ ] Ship Assessment and Exploration with procedural novelty and exposure safeguards.
- [ ] Provide user feedback/reporting for confusing or unfair tasks and track fixes by generator version.
- [ ] Include no IQ-style norms or diagnostic claims unless M8 explicitly validated them for the intended population.
- [ ] Conduct a beta launch checklist including monitoring, backups (if hosted), and incident response.

**Exit evidence:** A consented participant can complete tasks, receive evidence-appropriate insights, manage their data, and understand limitations without assistance.

---

## Milestone review template

For each milestone, create a tracking issue or PR with:

- **Scope / owner / prerequisites**
- **Checklist items:** copy the applicable tasks above.
- **Evidence:** screenshots, tests with exact commands, sample seeds or anonymized examples.
- **Risks and known limitations**
- **Decision:** complete / blocked / needs revision and reviewer/date.

## Immediate next action

**Start M0.** Set up the runnable project skeleton, CI, and data boundaries before introducing real participant data. Then begin M1's operational definitions alongside the M2 Rule Discovery generator.

## Non-negotiable scientific guardrails

- Scores represent evidence from tasks, not innate human value.
- Practice and motivation are confounds to model, not reasons to shame participants.
- Large scoring numbers can look persuasive while being invalid; every score must be calibrated and traceable.
- Treat a measurement result as provisional until it survives repeat testing and independent validation.
