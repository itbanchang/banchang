# Deploy Runbook — BCH 360° V.10

Canonical deploy path. Every production change follows this.

## Pre-flight (once per machine)

- Node 24+ installed (`nvm use 24`).
- PM2 installed globally (`npm i -g pm2`).
- `.env` present at project root, permissions 600.
- Nginx + SSL cert installed for `10.109.0.33`.

## Deploy (every release)

```powershell
# From the production host (10.109.0.33)
cd C:\opt\bch-360

# 1. Record current SHA for rollback
git rev-parse HEAD > deploy\.last-deploy-sha

# 2. Pull the release
git fetch origin
git checkout main
git pull --ff-only

# 3. Install + build
npm ci
npm run build

# 4. Smoke test (optional but recommended)
npm run test:smoke

# 5. Zero-downtime reload under PM2
pm2 reload bch360-server

# 6. Confirm
pm2 status
curl -sf https://10.109.0.33/api/health
```

If any step fails → `deploy/rollback.ps1` → investigate → fix forward.

## Rollback

```powershell
powershell -ExecutionPolicy Bypass -File deploy/rollback.ps1
```

Reads `deploy/.last-deploy-sha`, checks it out, rebuilds, reloads PM2.

## Zero-downtime assumptions

`ecosystem.config.cjs` must have:

- `instances: 2` (or more; 4 is typical) + `exec_mode: 'cluster'`
- `kill_timeout: 5000` (5s drain)
- `wait_ready: true` (if using `process.send('ready')`)

Server.js must handle `SIGTERM` + `message` with a graceful close (see `bch-devops` skill).

## Env changes

Edits to `.env` require restart (not reload), because dotenv only runs at boot:

```powershell
pm2 restart bch360-server
```

Warn users first; expect a brief gap.

## Migrations / breaking changes

For DB schema changes (sidecar SQLite only — HOSxP is read-only):

1. Migration must be backward-compat with the OLD running code (so reload doesn't break).
2. Apply migration BEFORE deploying new code.
3. Deploy new code.
4. Next release: remove old-code compatibility.

For Socket.IO event schema changes: bump `version` in the payload; old clients get the old shape for 1 release.

## Don't deploy

- Friday after 3pm.
- During morning rounds (07:00–11:00).
- Without a rollback plan.
- Without a health check.
- Without watching logs for 5 min afterward.

## After-deploy checks (5 minutes)

- [ ] `pm2 status` — all workers online.
- [ ] `/api/health` → 200.
- [ ] Error log: no new errors (`pm2 logs bch360-server --lines 100`).
- [ ] `bch-observability` dashboard: latency + error rate within baseline.
- [ ] DQ status: `/api/dq/status` returns green/yellow (no red new).
- [ ] Clinician shoulder-tap: ask 1 active user "does it feel OK".

## See also

- Skill: `bch-devops`
- `deploy/rollback.ps1`
- `ecosystem.config.cjs`
