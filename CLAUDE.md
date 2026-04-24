# CLAUDE.md — BCH 360° Intelligence V.10

This file guides Claude / AI assistants on how to work in this project.

## What this project is

Hospital AI Executive Dashboard for BCH (Thai community hospital). Reads HOSxP XE MariaDB 5.x (read-only) and layers 11 AI modules + Claude-powered narratives on top. Built on React 18 + Vite + Tailwind + Zustand-via-Context + Express + Socket.IO. Production URL: https://10.109.0.33.

## Fourteen project skills

Claude should use these automatically based on the task. Each lives at `.claude/skills/<name>/SKILL.md` and has trigger terms in its frontmatter.

### Architecture
- **bch-360-expert** — orchestrator; architecture / data / AI / perf. Has scaffolding scripts.

### Surface
- **bch-ui-designer** — design tokens, shared components, chart patterns.
- **bch-ux-designer** — 5 personas, flows, accessibility.

### Data & Analytics
- **bch-analytics-engineer** — metric registry (semantic layer). See `server/metrics/`.
- **bch-data-quality** — DQ runner + checks. See `server/dq/`.
- **bch-query-optimizer** — MariaDB tuning, HOSxP quirks, MV design.

### AI
- **bch-ai-evals** — accuracy, calibration, hallucination, drift. See `eval/`.

### Delivery
- **bch-report-builder** — PDF / XLSX / email. See `server/reports/`.
- **bch-realtime-engineer** — Socket.IO rooms + replay. See `server/socket/`.

### Ops & Quality
- **bch-observability** — metrics, logs, SLO, RUM.
- **bch-test-engineer** — Vitest + Playwright. See `tests/`.
- **bch-security-compliance** — PDPA, RBAC, JWT.
- **bch-devops** — PM2 cluster, deploy, rollback. See `deploy/`.
- **bch-docs-writer** — runbooks, ADRs, OpenAPI.

## Non-negotiables

1. **HOSxP XE is READ-ONLY.** `server/db/mysql.js` enforces this. Never try to write.
2. **PDPA first.** No PII in logs. Use hashed `hn`, never `cid` or name.
3. **Rule-based floor, Claude ceiling.** Every AI module returns a useful result even without Claude.
4. **Thai labels, English code.** UI strings in Thai; identifiers/comments/logs in English.
5. **Use the metric registry.** For any KPI, import from `server/metrics/<category>/<name>.js`. Never inline SQL for a KPI in a route handler.
6. **Parameterize queries.** Never string-concat SQL.
7. **Every AI output obeys the contract**: `{score, confidence, evidence, actions, narrative, source}`.

## Common commands

```bash
# Local dev (this machine)
npm run dev              # Vite on :4001 + backend on :4000

# Promote local -> prod (10.109.0.33) — see docs/ops/promote-flow.md
npm run promote          # gates (typecheck, lint, build) + snapshot + auto-rollback
npm run promote:dry      # show what promote would do, no remote changes
npm run rollback         # restore prod from latest snapshot
npm run rollback:list    # list snapshots on prod

# Quality
npm run build            # Vite build to dist/
npm run test             # Vitest
npm run test:e2e         # Playwright
npm run typecheck        # tsc --noEmit
npm run lint             # ESLint

npm run eval             # AI eval suite (runs readmission exemplar + any added runners)
npm run metrics:docs     # regenerate docs/metrics/index.html
```

See `package.json` for the full list.

## Dev → Prod flow (TL;DR)

`local desktop (npm run dev)` → `git commit` → `npm run promote` → `https://10.109.0.33`

`promote` enforces a deploy-window guard (no Mon-Fri 07-11, no Fri ≥15:00 unless `--emergency="reason"`), runs pre-flight gates (typecheck + lint baseline + build), snapshots prod, syncs source via SSH, rebuilds the Docker image (tagged with git SHA + deploy timestamp), restarts the container, healthchecks, and on failure restores `bch360:safe` (the last-known-good image, rotated hourly by `scripts/promote-safe-rotate.sh`). Full runbook at [docs/ops/promote-flow.md](docs/ops/promote-flow.md).

**Image tag scheme on prod (10.109.0.33):**
- `bch360:safe` — auto-rollback target. Rotated only after running container is healthy ≥1h. **Never overwritten by `promote.sh`.**
- `bch360:latest` — current deploy.
- `bch360:sha-<short>` and `bch360:deploy-<YYYYMMDD-HHMM>` — immutable per-deploy tags (10 newest kept).

## Directory map (high-level)

```
src/                     React 18 + Vite frontend
├── components/*.jsx     tabs + shared/
├── context/             DashboardContext (Zustand-style via useReducer)
├── hooks/               useAuth, useWebSocket
└── monitoring/rum.js    web-vitals + error capture

server/                  Express backend
├── server.js            main app (2300+ lines, 150+ endpoints)
├── production.js        auto-deploy watcher
├── metrics/             ⭐ semantic layer — one file per KPI
├── dq/                  ⭐ data-quality runner + contracts + freshness
├── reports/             ⭐ report generators (morning briefing etc)
├── socket/              ⭐ publisher + event log for Socket.IO replay
├── ai/                  11 AI engines + claudeNarrative
├── routes/              Express routers
├── db/                  mysql pool + MV framework
├── cache/               stale-while-revalidate cache
├── middleware/          auth / rbac / audit / validate / fhir / observability
├── monitoring/          Prometheus metrics + alerts
├── jobs/                node-cron schedulers
└── lib/                 ⭐ jwtRotation + other small helpers

eval/                    ⭐ AI evaluation suite
├── lib/                 stats + factuality helpers
├── runners/             per-module eval recipes
└── datasets/            golden datasets (scrubbed)

tests/                   ⭐ Vitest unit + integration
├── unit/
├── factories/           fixture factories
└── integration/

docs/                    Markdown
├── security/rbac.md     ⭐ RBAC matrix
└── ops/deploy.md        ⭐ deploy runbook

deploy/                  PowerShell deploy + rollback scripts
.claude/skills/          ⭐ 14 project skills
```

(⭐ = added in the April 2026 modernisation pass.)

## Workflow — "add a new KPI to the OPD tab"

1. Check if metric exists in `server/metrics/opd/` — if yes, use it.
2. If not, create `server/metrics/opd/<name>.js` following the template in `bch-analytics-engineer/SKILL.md`.
3. Import into the route handler; call `compute({ dateRange, ... })`.
4. Render with `<KPICardV2>` in the tab; pass `color` + `format` from metric.
5. Add a unit test in `tests/unit/metrics/`.
6. Verify: `npm run typecheck && npm run lint && npm run test`.

## Workflow — "add a new AI module"

Skill: `bch-360-expert/references/ai-insights-builder.md` has the full template. Then:

1. Add eval set in `eval/datasets/<module>.json` (or document how to generate).
2. Add eval runner in `eval/runners/<module>.js`.
3. Wire into `eval/runners/index.js`.
4. Confirm on-push CI runs the eval and guards regression.

## When Claude should ask

If a task spans multiple skills and the scope is ambiguous, ask ONE clarifying question with a default ("I'll put this under `server/routes/clinical.js` unless you want a new file").

Silence means proceed.
