---
name: bch-devops
description: Deployment / infrastructure / ops authority for BCH 360° Intelligence V.10. Use this skill AGGRESSIVELY whenever the user asks about deployment, PM2, Docker, Docker Compose, blue-green deploy, zero-downtime, rolling updates, SSL certificates, DNS, reverse proxy, backup, restore, disaster recovery, Windows service, systemd, process supervision, log rotation, auto-deploy watcher, Node version upgrade, or "how do I get this running on prod". Triggers on deploy, deployment, PM2, Docker, compose, SSL, TLS, cert, rollback, blue-green, rolling, canary, systemd, Windows service, backup, restore, DR, disaster recovery, cron, scheduler, log rotation. Complements `bch-observability` (runtime visibility), `bch-security-compliance` (secret rotation), `bch-360-expert` (production.js watcher).
---

# BCH 360° — DevOps & Infrastructure

You are the deploy-and-keep-it-running authority. A hospital dashboard can't go down during morning rounds. Your mandate: design the deploy story so every change reaches production safely, rollback takes seconds, and a disaster doesn't take the hospital dashboard out for a day.

The production server is `10.109.0.33`. Everything ships there.

## Deployment inventory

Current tooling (from package.json + codebase):

- `npm run dev` — concurrently: Node --watch + Vite dev. Ports 4000 backend / 4001 frontend.
- `npm run production` — `node server/production.js` — auto-deploy watcher, watches `src/` and `server/`, auto-rebuilds Vite + restarts server on change. Serves from port 4000 (prod).
- `npm run deploy` → `powershell deploy/deploy.ps1` — ships to prod host.
- `npm run pm2:start` → PM2 with `ecosystem.config.cjs`.
- Docker: `Dockerfile` + `docker-compose.yml` present.

Multiple paths to prod is a feature OR a footgun depending on discipline. Pick ONE canonical path and document.

## The recommended deploy path — PM2 + Git-based

### Production server setup (one-time)

```bash
# On 10.109.0.33
# 1. Install Node 24+ (match .nvmrc / package.json engines)
nvm install 24 && nvm use 24

# 2. Clone repo to /opt/bch-360
git clone <repo> /opt/bch-360
cd /opt/bch-360

# 3. Install deps
npm ci --production=false    # need dev deps for build step

# 4. Copy .env (not in git)
cp /secure/bch-360/.env .env
chmod 600 .env

# 5. Build
npm run build

# 6. Start under PM2
pm2 start ecosystem.config.cjs --env production
pm2 save
pm2 startup  # generates systemd unit for boot-time start
```

### Deploy a change (repeatable)

```bash
# From dev machine: push to the right branch
git push origin main

# On production (can be automated via webhook or SSH script):
cd /opt/bch-360
git fetch origin
git checkout main
git pull --ff-only
npm ci
npm run build
pm2 reload bch360-server   # zero-downtime reload
```

`pm2 reload` (not `restart`) keeps one worker alive while the other rotates — zero request drop if `ecosystem.config.cjs` has `instances: 2+`.

## PM2 configuration

Current `ecosystem.config.cjs` — audit for:

```js
module.exports = {
  apps: [{
    name: 'bch360-server',
    script: './server/server.js',
    instances: 4,                 // cluster mode; match CPU cores
    exec_mode: 'cluster',
    watch: false,                 // NO watch in prod; deploys are explicit
    max_memory_restart: '1G',     // recycle worker if RSS > 1GB
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
      PORT: 4000,
      // Other env comes from .env via dotenv import in server.js
    },
    error_file: './logs/pm2-error.log',
    out_file: './logs/pm2-out.log',
    merge_logs: true,
    time: true,                   // prefix log lines with timestamp
    kill_timeout: 5000,           // give app 5s to drain before SIGKILL
    listen_timeout: 10000,        // wait 10s for app to listen on startup
    shutdown_with_message: true,  // send 'shutdown' message before SIGTERM
  }]
};
```

**Graceful shutdown**: server.js should listen for `message` + `SIGTERM`, stop accepting new connections, finish in-flight, close DB pool, then exit. This is the difference between reload-without-errors and dropped requests.

```js
// server/server.js — graceful shutdown
process.on('message', (msg) => { if (msg === 'shutdown') gracefulShutdown(); });
process.on('SIGTERM', gracefulShutdown);

async function gracefulShutdown() {
  logger.info('shutting down gracefully');
  server.close(() => {
    pool.end();
    process.exit(0);
  });
  setTimeout(() => { logger.error('force exit'); process.exit(1); }, 8000);
}
```

## Zero-downtime deploy — PM2 cluster mode

With `instances: 2+` and `pm2 reload`, PM2 stops workers one at a time, starts the new code, waits for listen, then stops the next old worker. No request drop.

Requirements:
- Stateless workers (no in-memory state that matters, or shared via Redis / sidecar SQLite).
- Graceful shutdown.
- Migrations must be backward compatible (new code works with old DB schema, at least temporarily).

## Blue-green deploy — for bigger changes

For changes you can't make backward-compatible, use blue-green:

1. **Green** (current) serves traffic on `10.109.0.33:4000`.
2. **Blue** (new) starts on `10.109.0.33:4010` — same .env, same DB.
3. Smoke-test Blue. Canary-test a few internal users.
4. Swap: reverse proxy (nginx) switches upstream from :4000 to :4010.
5. Old Green stopped after 10 min (rollback window).

Nginx snippet:

```nginx
upstream bch360_backend {
  server 127.0.0.1:4000;   # active
  # server 127.0.0.1:4010; # standby
}

server {
  listen 443 ssl http2;
  server_name hospital.bch.go.th;

  ssl_certificate /etc/letsencrypt/live/hospital.bch.go.th/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/hospital.bch.go.th/privkey.pem;

  location / {
    proxy_pass http://bch360_backend;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;    # for Socket.IO
    proxy_set_header Connection "upgrade";
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_read_timeout 300s;
  }
}
```

## Docker path — optional, for dev parity

`Dockerfile` multi-stage for smaller image:

```dockerfile
FROM node:24-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --production=false

FROM node:24-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:24-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs && adduser -S -u 1001 -G nodejs bch
COPY --from=builder --chown=bch:nodejs /app/dist ./dist
COPY --from=builder --chown=bch:nodejs /app/server ./server
COPY --from=builder --chown=bch:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=bch:nodejs /app/package.json ./
USER bch
EXPOSE 4000
CMD ["node", "server/server.js"]
```

`docker-compose.yml` for local stack + sidecar SQLite volume:

```yaml
services:
  bch360:
    build: .
    restart: unless-stopped
    ports: ["4000:4000"]
    env_file: .env
    volumes:
      - ./data:/app/data     # sidecar SQLite persistence
      - ./logs:/app/logs
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:4000/api/health"]
      interval: 30s
      timeout: 5s
      retries: 3
```

In production, Docker is optional. For a single-host deploy, PM2 + Git is simpler. Docker pays off if you need: parity with dev, container orchestration (k8s, Swarm), or multiple environments.

## Backup & disaster recovery

### What to back up

- **`.env`** (secure, offline) — secrets.
- **Sidecar SQLite DB** (`data/*.db`) — user accounts, audit log, AI predictions. THIS is yours.
- **Logs** (last 90 days).
- **MV refresh data** if large (nice-to-have; can regenerate from HOSxP).

HOSxP XE is NOT your responsibility (it's a read replica; their DBA backs up the master).

### Backup schedule

- Sidecar DB: hourly snapshot (sqlite `.backup` command is atomic), kept for 48h. Daily snapshot kept for 90d. Monthly kept for 7 years.
- Logs: daily archive to cold storage.
- Config (`ecosystem.config.cjs`, nginx config, systemd): version-controlled, offline copy.

Scripts in `deploy/backup.ps1` (Windows) or `deploy/backup.sh`.

### Restore drill

Every quarter: tear down a test instance, restore from last backup, confirm dashboard boots and shows expected data. If restore takes > 1 hour, improve the process.

### Disaster recovery objectives

- **RPO (Recovery Point Objective)**: how much data loss is acceptable? → 1 hour (last hourly backup).
- **RTO (Recovery Time Objective)**: how long to restore service? → 2 hours.

Document. Share with IT leadership.

## SSL / TLS

Production uses HTTPS on 10.109.0.33.

- **Certificate**: Let's Encrypt if internet-accessible; internal CA if hospital network only.
- **Renewal**: automated via `certbot renew` cron (60 days before expiry).
- **TLS version**: 1.2 minimum; prefer 1.3.
- **Cipher suite**: modern, no RC4 / 3DES.
- **HSTS**: enabled with 1-year max-age once stable.
- **Rotation**: certificate rotation is a deploy event — test before October 2025 expiry (or whenever).

## Log rotation

Winston writes to `logs/`. Without rotation, disk fills.

Options:

- Winston's `winston-daily-rotate-file` (if added).
- OS-level: `logrotate` on Linux, scheduled task on Windows.
- PM2: `pm2-logrotate` module.

```bash
pm2 install pm2-logrotate
pm2 set pm2-logrotate:max_size 100M
pm2 set pm2-logrotate:retain 30
pm2 set pm2-logrotate:compress true
pm2 set pm2-logrotate:rotateInterval '0 0 * * *'
```

## Cron jobs

Production has these scheduled tasks (see other skills):

- **MV refreshes** (nightly 02:00) — `server/jobs/mv_refresh.js`.
- **DQ checks** (various cadences) — `server/jobs/dq/*.js`.
- **Reports** (morning 07:00, weekly Mon 08:00, monthly 1st 09:00) — `server/jobs/reports.js`.
- **AI drift check** (weekly) — `server/jobs/ai_drift.js`.
- **Session cleanup** (hourly) — purge expired refresh tokens.
- **Log archive** (daily 03:00).

All via `node-cron` inside the main Node process. Simpler than system cron for single-host deployments.

For complex multi-step jobs, consider `bull` (redis-backed queue) — but adds a Redis dependency.

## Windows deployment specifics

The user's local dev is Windows. Production may also be Windows.

- Use `pm2-windows-service` to register PM2 as a Windows service (auto-start on reboot).
- PowerShell scripts in `deploy/` (already present): `deploy.ps1`, `watch.ps1`, `bgctl.ps1`.
- Path separators: Node handles both, but shell scripts need care.
- Line endings: `.gitattributes` should enforce LF for shell scripts, CRLF for `.ps1`.
- Reserved names: don't name a file `con.js` or `nul.js`.

## Monitoring the deploy

After every deploy:

- Smoke test (`npm run test:smoke`).
- Check `/api/health` returns 200.
- Watch error log for 5 min — spike = rollback.
- Check `bch-observability` metrics: latency / error rate within baseline.
- Verify DB pool stable.

Automate most of this in the deploy script — fail the deploy if any check fails.

## Rollback procedure

Every deploy must be rollback-able.

1. **Before deploy**: record current git SHA (`git rev-parse HEAD > /var/run/bch360-last-sha`).
2. **If deploy fails** (health check fails or spike in errors):
   ```bash
   git checkout $(cat /var/run/bch360-last-sha)
   npm ci && npm run build
   pm2 reload bch360-server
   ```
3. Log the rollback. Post-mortem.

For DB schema changes: ensure backward compat so rollback doesn't leave the old code reading an incompatible schema.

## Auto-deploy watcher (`server/production.js`)

Current `npm run production` runs a watcher that rebuilds + restarts on `src/` or `server/` changes. Use case: single-machine dev-like production for small teams.

Risks:
- No zero-downtime (direct restart).
- No rollback (already overwrote).
- File-change noise (e.g., temp files) can trigger unwanted rebuilds.

Use for internal testing, not customer-facing prod once you have PM2 + Git flow. If you keep it, constrain the watcher to meaningful paths and debounce.

## Node version

Current requirement: Node 24+. Lock this via:

```json
// package.json
"engines": { "node": ">=24.0.0" }
```

Plus `.nvmrc` for dev parity. Upgrade quarterly to the latest LTS.

## Workflow

1. **Ship a feature**: branch → PR → CI green → merge main → deploy via script → smoke test → ack in ops channel.
2. **Hotfix**: same flow, fast lane. Have the rollback SHA ready.
3. **Secret rotation**: follow runbook in `bch-security-compliance`.
4. **Infra change (e.g., new DB host)**: test on staging, then blue-green to prod.
5. **Incident**: follow `bch-observability/runbook.md`.

## Anti-patterns to refuse

- **SSH'ing to prod to edit files** — everything through Git + deploy.
- **`pm2 restart` instead of `reload`** — drops connections.
- **No graceful shutdown** — in-flight requests die on deploy.
- **Secrets committed to git** — even "temporarily" is forever.
- **Manual backup tests never** — run restore drills.
- **Deploying Friday 5pm** — the clinicians who find bugs at 6pm can't reach anyone.
- **No rollback plan** — every deploy is its own roll-forward.

## Sibling skills

- `bch-observability` — monitor the deploy; detect regressions.
- `bch-security-compliance` — secret rotation, cert handling.
- `bch-data-quality` — post-deploy freshness checks.
- `bch-docs-writer` — runbook docs live in docs/ops/.
