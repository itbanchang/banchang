# CLAUDE.md — BCH 360° Intelligence V.10 (production-baseline)

## What this branch is

`feat/baseline-from-prod` is the **working production source** (commit `4723088`,
the snapshot from `/opt/bch360` on 10.109.0.33) plus the dev→staging→prod
promotion infrastructure built in this session. This is the baseline to develop
new features off.

The earlier `master` (commit `4831c4d`) is **broken** — it ships imports for
42 backend files that were never committed to git. See
`memory/project_v2_merge_incomplete.md` for the investigation.

## Project context

Hospital AI executive dashboard for BCH (Thai community hospital). Reads HOSxP
XE MariaDB 5.x (read-only), exposes Express + Socket.IO API, React 18 + Vite
frontend. Production: `https://10.109.0.33`.

## Common commands

```bash
# Local dev (this machine)
npm run dev              # concurrent: Vite + Express
npm run build            # Vite production build to dist/

# Promote local -> staging -> prod (10.109.0.33) — see docs/ops/promote-flow.md
npm run promote:staging  # parallel container on :4002 — click around before prod
npm run promote          # gates (lint baseline + build) + image swap + auto-rollback
npm run promote:dry      # show what promote would do, no remote changes
npm run rollback         # restore prod from latest snapshot
npm run rollback:list    # list snapshots on prod

# Quality
npm run lint             # ESLint
npm run lint:check       # compare current to scripts/lint-baseline.json
npm run lint:baseline    # re-snapshot baseline after fixing issues
```

`promote.sh` enforces a deploy-window guard (no Mon-Fri 07-11, no Fri ≥15:00
unless `--emergency="reason"`). It tags every build as
`bch360:sha-<short>` + `bch360:deploy-<YYYYMMDD-HHMM>` + `:latest`, polls
`/healthz` and `/api/smoke`, and on failure restores `bch360:safe`
(rotated hourly by `scripts/promote-safe-rotate.sh` once the running container
has been healthy for ≥1h).

## Image tag scheme on prod (10.109.0.33)

- `bch360:safe` — auto-rollback target. **Never overwritten by `promote.sh`.**
- `bch360:latest` — current deploy.
- `bch360:sha-<short>` and `bch360:deploy-<YYYYMMDD-HHMM>` — immutable per-deploy tags.
- `bch360-staging:latest` — staging container image.

## Non-negotiables

1. **HOSxP XE is READ-ONLY.** `server/db/mysql.js` enforces this. Never write.
2. **PDPA first.** No PII in logs. Use hashed `hn`, never `cid` or name.
3. **Parameterize queries.** Never string-concat SQL.
4. **Prefer working baseline.** Develop off this branch; don't reintroduce
   master's incomplete state.

## Directory map (high-level)

```
src/                     React 18 + Vite frontend
server/                  Express backend
├── server.js            main app
├── routes/              Express routers (incl. routes/smoke.js — Tier 2.1)
├── ai/                  AI engines
├── db/                  MySQL pool + materialized views
├── lib/                 small helpers (incl. safeError.js)
├── middleware/          auth / rbac / audit / validate / fhir / observability
└── ...

scripts/                 ⭐ promote.sh, rollback.sh, promote-staging.sh,
                         lint-check.sh, promote-safe-rotate.sh,
                         install-safe-rotate-cron.sh, lint-baseline.json
docs/ops/                ⭐ promote-flow.md, branch-protection.md
.github/workflows/ci.yml ⭐ typecheck (if-present) + lint baseline + build
```
