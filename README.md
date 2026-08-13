# CampusConnect — Team 2 MVP

CampusConnect is a responsive student-services web MVP for Bluesky Technology University (BTU). It consolidates the core student journey—courses, waitlists, campus events, appointments, and trusted policy guidance—into one role-aware experience.

## MVP capabilities

1. **User Login / RBA** — demo login for Student, Advisor, and Administrator roles; restricted views demonstrate role-based access.
2. **Event Directory** — search and filter events, view capacity, RSVP, and cancel an RSVP.
3. **Appointment Scheduler** — select a service, advisor, date, time, and meeting type; save a confirmation.
4. **Course Selection & Waitlists** — search courses, enroll, drop, join a waitlist, and leave a waitlist.
5. **RAG Policy AI Assistant** — retrieves only from an approved BTU policy knowledge base, shows citations, and refuses unsupported questions.
6. **Observability Dashboard** — Administrator-only service health, adoption, budget, delivery, and risk monitoring.
7. **Security & FERPA Compliance** — access matrix, privacy controls, responsible-AI safeguards, and an Administrator-only audit log.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite. To validate a production build:

```bash
npm run build
npm run preview
```

## Demo roles

The login page supplies fictional demo accounts automatically:

| Role | Demo identity | Main proof point |
|---|---|---|
| Student | Demo Student | Complete student journey; Observability is blocked |
| Advisor | Demo Advisor | Student-service role and privacy boundaries |
| Administrator | Demo Administrator | Observability and access-audit views |

All records are fictional. The MVP stores interaction state in the browser's `localStorage`; it does not collect real student data or store passwords.

## Recommended live demo flow

1. Sign in as **Student**.
2. Add an open course and join a full course's waitlist.
3. RSVP to an event.
4. Confirm an appointment with the Career Services Advisor.
5. Ask Policy AI: “Can BTU share my resume?” and show the FERPA citation.
6. Open Observability to demonstrate that Student access is blocked.
7. Sign out, sign in as **Administrator**, then show Observability and the FERPA audit log.

## Design and technical decisions

- React + Vite single-page application with no production backend dependency.
- Responsive layouts support laptop, tablet, and mobile demos.
- No secrets or API keys are committed to the public repository.
- The AI experience is a safe RAG simulation: retrieval and source-grounding are real; free-form generation is intentionally disabled for the public MVP.
- GitHub Actions builds and publishes the `dist` artifact to GitHub Pages.

## Team 2 — Rockstars

- Suzy Petrosyan — Project Manager
- Pramod Sharma — Developer
- Jinwen Xu — Business Analyst
- Shirali Amin — Product Manager

Built for MB668 Project Management with AI, Summer 2026.
