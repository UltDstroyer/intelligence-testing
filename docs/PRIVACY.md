# Participation and privacy specification (M0)

## Participant-facing statement

Intelligence Testing is an **optional, experimental cognitive-assessment project**, not an IQ diagnosis or a measure of personal worth. Future interactive tasks may collect puzzle answers, reaction times, interactions, assistance used, and optional self-reports about fatigue or effort. Task rules and precise scoring details may be hidden to prevent memorization, but participants must always know that cognitive measurement is taking place.

**In M0 no puzzle data, individual cognitive observations, participant identifiers, or self-reports are collected or stored by the application.** The welcome checkbox is held temporarily in the browser's memory and resets on reload. The backend has only a public health-check endpoint.

## M0 gate

- The lab-preview button is disabled until a participant acknowledges the disclosure.
- Withdrawing acknowledgment closes the preview and disables entry immediately.
- The backend does not implement event collection: a POST /api/events returns 404.
- Do not enable telemetry or add a database until consent and withdrawal controls are implemented and tested.

## Requirements for future consent (M3)

- Clearly disclose each data category, intended purpose, retention period, visibility, risks, and whether information is shared.
- Record explicit, revocable participation consent before the server accepts a cognitive event.
- Make optional longitudinal tracking, state/self-report fields, and research data-sharing separate choices.
- Allow opting out of individual question types without silently labeling a participant low ability.
- Provide participant-controlled exports, deletion, and withdrawal; include a server-side way to verify that participant-linked data is removed.
- No sale of participant data, third-party profiling, targeted ads, employer/insurer access, or undisclosed human ranking.
- Avoid collecting names, birth dates, precise location, or demographic attributes unless separately justified and consented.
- Do not place raw responses in server logs, analytics vendors, error reporting, or CI artifacts.
- Plan for accessible participation and avoid inducing exhaustion, sleep deprivation, or stress.

## Withdrawal, export, and deletion workflow (specification only)

1. Participant opens **Your data**, reviews stored categories and consent settings.
2. Participant can download a machine-readable export of their individual events, sessions, and derived scores.
3. Participant can withdraw future data-collection consent; new event ingestion must be blocked immediately.
4. Participant may request full deletion; the service deletes linked events, derived scores, and optional profile state, subject to clearly disclosed legal/backup limits.
5. The interface confirms deletion and shows any exceptional retention clearly.

**These controls are not implemented in M0**, because M0 stores no participant records. They are gated future acceptance criteria, not promises that the current prototype has a data-management portal.

## Caveats

Web servers and infrastructure can maintain operational access logs outside application telemetry. M0 runs locally by default. Before any internet hosting, audit access logs, HTTPS, hosting provider data processing, and security posture.

Burnout must be assessed separately using appropriate instruments, with consent; it cannot be diagnosed from slowed gameplay.
