# Onboarding — BCH 360° V.10

Goal: you reach your first merged PR in one day.

## Day 0 (before your first login)

- [ ] IT Admin creates your dashboard user + appropriate role.
- [ ] Clone the repo.
- [ ] Copy `.env` from secure storage into project root.
- [ ] Install Node 24+ (`nvm install 24 && nvm use 24`).

## First 2 hours

- [ ] `npm ci`
- [ ] `npm run dev` — Vite on http://localhost:4001, API on http://localhost:4000. Log in with your dev credentials.
- [ ] Read `CLAUDE.md` (5 min).
- [ ] Read `.claude/skills/bch-360-expert/SKILL.md` (10 min).
- [ ] Read `.claude/skills/bch-360-expert/references/architecture.md` (15 min).
- [ ] Skim `.claude/skills/bch-ui-designer/SKILL.md` + `bch-ux-designer/SKILL.md` (15 min).

## First task — "Hello KPI"

Pick one:

### Easier — add a new KPI to an existing tab

1. Identify the clinic-level question (e.g., "how many OPD patients are still waiting for pharmacy?").
2. If a metric already exists in `server/metrics/opd/`, use it. Otherwise create one following `bch-analytics-engineer/SKILL.md`.
3. Expose via a route (probably already has a route; add field).
4. Render a `<KPICardV2>` in the OPD tab.
5. Write a unit test in `tests/unit/metrics/`.

### Harder — add a new AI module eval

1. Pick an AI module without an eval (`readmission` already has one; try `losPredictor`).
2. Implement `eval/runners/<module>.js` following `bch-ai-evals/references/eval-recipes.md`.
3. Register in `eval/runners/index.js`.
4. Run `npm run eval -- --module=<module>` and verify output.

## Before your first PR

- [ ] `npm run typecheck && npm run lint && npm run test` — all green.
- [ ] PR description answers: what / why / how tested.
- [ ] If you touched a KPI, update `server/metrics/` and run `npm run metrics:docs`.
- [ ] If you added a route, update RBAC in `docs/security/rbac.md`.

## Where to ask

- Code convention: `.claude/skills/bch-360-expert/SKILL.md` + references.
- "Why did we choose X?": `docs/dev/adr/`.
- "How do I deploy?": `docs/ops/deploy.md`.
- "What does this KPI mean?": `docs/metrics/index.html` (auto-generated).

## What to skip

- `scripts/old_server*.js` — legacy archives.
- `CODE_REVIEW_*.md`, `SYSTEM_COMPLETE_STATUS.md` — timestamped snapshots, historical.

## Success criterion

Your first merged PR shows:
- A passing test.
- An updated metric (if applicable) or an updated route (if applicable).
- A clear, short PR description.

Welcome.
