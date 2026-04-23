---
name: bch-observability
description: Observability / monitoring / APM authority for BCH 360° Intelligence V.10. Use this skill AGGRESSIVELY whenever the user asks about latency, p95/p99, error rates, slow endpoints, cache hit rate, error budget, SLO/SLI, traces, structured logs, metrics, Prometheus, Grafana, alerting, on-call, dashboard usage analytics, "why is it slow", "what's breaking", runtime health. Triggers on latency, p50, p95, p99, error rate, SLI, SLO, error budget, trace, span, structured log, metrics endpoint, Prometheus, Grafana, alert, on-call, healthcheck, APM, telemetry, histogram. Complements `bch-360-expert` (perf-auditor reference), `bch-data-quality` (data-plane), `bch-devops` (deploy + infra).
---

# BCH 360° — Observability

You are the runtime-health authority. When something breaks or slows down, the team should know in minutes, not days. Your job: make every hot endpoint measurable, every error traceable, every slow query visible — and make the dashboard answer "is the system healthy right now?" in one glance.

Without observability, every incident starts with guesswork. With it, you see the problem forming before users notice.

## Three pillars

### 1. Metrics — counters, gauges, histograms

Per-endpoint:
- Request count (counter).
- Latency distribution (histogram, with p50/p95/p99 derived).
- Error count (counter, labeled by status code).
- Cache hit/miss (counter).

Per-DB:
- Query latency histogram.
- Pool utilisation gauge (active + waiting).
- Slow-query counter (> 1s).
- Connection error counter.

Per-AI-module:
- Inference latency histogram.
- Claude API latency + cache hit rate.
- Rule-based fallback rate.

Export as Prometheus-compatible `/metrics` endpoint. Use `prom-client` (lightweight, battle-tested).

```js
// server/monitoring/metrics.js
import { Registry, Counter, Histogram, Gauge, register } from 'prom-client';

export const metrics = new Registry();
metrics.setDefaultLabels({ app: 'bch-360', env: process.env.NODE_ENV });

export const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request latency',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5, 10],
  registers: [metrics],
});

export const httpRequests = new Counter({
  name: 'http_requests_total',
  help: 'Total HTTP requests',
  labelNames: ['method', 'route', 'status'],
  registers: [metrics],
});

export const dbQueryDuration = new Histogram({
  name: 'db_query_duration_seconds',
  help: 'MySQL query latency',
  labelNames: ['query_name', 'profile'],
  buckets: [0.005, 0.05, 0.25, 0.5, 1, 2, 5, 15],
  registers: [metrics],
});

export const cacheEvents = new Counter({
  name: 'cache_events_total',
  help: 'Cache hits and misses',
  labelNames: ['cache', 'result'],   // result: hit | miss | stale_served
  registers: [metrics],
});

export const poolActive = new Gauge({
  name: 'db_pool_active_connections',
  help: 'MySQL pool active connections',
  registers: [metrics],
});

export const aiInferenceDuration = new Histogram({
  name: 'ai_inference_duration_seconds',
  help: 'AI module inference latency',
  labelNames: ['module_id', 'source'],  // source: claude | rule-based
  buckets: [0.05, 0.1, 0.3, 1, 3, 10, 30],
  registers: [metrics],
});
```

Expose:

```js
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', metrics.contentType);
  res.end(await metrics.metrics());
});
```

Protect with a bearer token or restrict to internal network — metrics endpoints are info leaks if exposed.

### 2. Logs — structured, queryable

Winston already in use. Tighten:

```js
// server/logger.js (upgrade)
import winston from 'winston';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json(),           // ALWAYS JSON in production
  ),
  defaultMeta: { service: 'bch-360', env: process.env.NODE_ENV },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    process.env.NODE_ENV === 'development'
      ? new winston.transports.Console({ format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })
      : null,
  ].filter(Boolean),
});
```

**Every log line MUST have**:
- `level`, `timestamp`, `message` (from winston).
- `requestId` (generated per request, propagated through async context — use `async_hooks`).
- `userId` (if authenticated) — for audit trail.
- Relevant metadata (`endpoint`, `query_name`, `module_id`).

**Never log**:
- Plain patient data (name, `cid`, full medical records).
- Raw SQL with parameter values containing PII.
- JWT tokens, passwords, keys.

### 3. Traces — distributed timing

For requests that touch multiple components (route → AI → DB → cache → Claude), traces show the timeline. OpenTelemetry is the standard; Jaeger or Tempo for visualization.

For this single-app deployment, tracing is overkill at first. Start with metrics + logs; add tracing when the team has multiple services or needs to debug compound latency issues.

## Instrument every endpoint — one middleware

```js
// server/middleware/observability.js
import { httpRequestDuration, httpRequests } from '../monitoring/metrics.js';
import logger from '../logger.js';
import { randomUUID } from 'crypto';

export function observabilityMiddleware(req, res, next) {
  req.id = req.headers['x-request-id'] || randomUUID();
  req.startTime = process.hrtime.bigint();
  const logCtx = { requestId: req.id, method: req.method, path: req.path, userId: req.user?.id };

  res.on('finish', () => {
    const durationMs = Number(process.hrtime.bigint() - req.startTime) / 1e6;
    const route = req.route?.path || req.path;
    httpRequestDuration.labels(req.method, route, String(res.statusCode)).observe(durationMs / 1000);
    httpRequests.labels(req.method, route, String(res.statusCode)).inc();

    const level = res.statusCode >= 500 ? 'error' : res.statusCode >= 400 ? 'warn' : 'info';
    logger.log(level, 'http_request', { ...logCtx, status: res.statusCode, durationMs });
  });

  next();
}

app.use(observabilityMiddleware);
```

This single middleware gives you RED (Rate, Error, Duration) metrics for every endpoint + structured access logs.

## SLOs — what does "healthy" mean

Define per-service SLOs (service level objectives). Without them, alerts are arbitrary.

| SLI (indicator) | SLO (target) | Measurement window |
|----------------|--------------|--------------------|
| `/api/opd/today` latency p95 | < 500ms | 28-day rolling |
| `/api/opd/today` availability | 99.5% | 28-day |
| `/api/executive/summary` latency p95 | < 2s | 28-day |
| AI module inference p95 (rule-based) | < 200ms | 7-day |
| AI module inference p95 (Claude) | < 5s | 7-day |
| Dashboard first paint (FCP) | < 2s (p75) | RUM, 28-day |
| Cache hit rate (warm endpoints) | ≥ 80% | 7-day |

**Error budget**: `1 - SLO`. If SLO is 99.5%, error budget is 0.5% (about 3h 36m per month). When the budget is half consumed, slow down on risky changes.

## Alerting — the rules that matter

Don't page for everything. Page only for:

1. Availability drop below SLO (sustained > 5 min).
2. p95 latency > 2× SLO (sustained > 5 min).
3. Error rate > 5× baseline (sustained > 2 min).
4. DB connection pool exhaustion.
5. Data freshness SLO violations (see `bch-data-quality`).

Everything else: log and surface on the ops dashboard. Not a 3am page.

Alert tool: webhook to Slack/LINE/email. For a single-hospital deployment, a simple `node-cron` checker → webhook is fine.

```js
// server/monitoring/alerts.js
cron.schedule('*/1 * * * *', async () => {
  const errorRate = await getErrorRateLast5Min();
  if (errorRate > 0.05) {
    await sendAlert({
      level: 'critical',
      title: `Error rate ${(errorRate * 100).toFixed(1)}% last 5 min`,
      link: 'https://ops.bch/grafana/d/bch-health',
    });
  }
});
```

## Dashboard — Grafana or minimal built-in

### Option A: Grafana (recommended for production)

- Prometheus scrapes `/metrics` every 15s.
- Grafana pulls from Prometheus.
- Dashboards for: RED per endpoint, DB pool, cache hit rate, AI inference latency, data freshness.

Heavy but industry-standard. Good for IT team fluent in it.

### Option B: Built-in "System Health" tab

Simpler: a tab in the BCH dashboard itself that reads `/metrics` and renders native. Already partial via `ServerSettings.jsx` + `/api/system/mv-status`.

Build out to show:
- Current active connections + requests/min.
- Per-endpoint latency p95 (last 1h).
- Cache hit rate (last 1h).
- Recent errors (last 24h count, last 3 messages).
- Data freshness (from `bch-data-quality`).
- AI module health (latency + fallback rate).

For a single-hospital deployment, option B is usually enough.

## Frontend observability (RUM — real-user monitoring)

Capture client-side metrics:
- Web Vitals (LCP, FID, CLS, INP).
- Route changes + tab load time.
- Client-side errors (`window.addEventListener('error')`).
- Slow interactions.

```js
// src/monitoring/rum.js
import { onLCP, onINP, onCLS } from 'web-vitals';

function report(metric) {
  fetch('/api/rum', {
    method: 'POST',
    body: JSON.stringify({ name: metric.name, value: metric.value, path: location.pathname }),
    headers: { 'Content-Type': 'application/json' },
    keepalive: true,
  });
}
onLCP(report); onINP(report); onCLS(report);
```

Server-side, aggregate RUM into Prometheus or store in sidecar SQLite.

## Client error capture

```js
window.addEventListener('error', (ev) => {
  fetch('/api/rum/error', {
    method: 'POST',
    keepalive: true,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      message: ev.message,
      source: ev.filename,
      line: ev.lineno,
      col: ev.colno,
      stack: ev.error?.stack,
      path: location.pathname,
      userAgent: navigator.userAgent,
    }),
  });
});
```

Don't capture PII by accident — sanitize query strings.

## Usage analytics — which tabs matter

Log tab-change events per session (anonymous by default, `userId` only if consented/required for audit).

```js
// src/App.jsx — on setTab
fetch('/api/rum/usage', {
  method: 'POST',
  keepalive: true,
  body: JSON.stringify({ tab, sessionId, ts: Date.now() }),
});
```

Aggregate weekly: "OPD tab opened X times by Y users." Drives product priorities (build for hot tabs; retire cold ones).

## Runbook — incident response

When an alert fires:

1. **Acknowledge**: own it in the ops channel.
2. **Check the dashboard**: is it localized (one endpoint) or systemic?
3. **Check recent changes**: `git log --since='2 hours ago'` — did something deploy?
4. **Check data plane**: run DQ checks (`bch-data-quality`).
5. **Mitigate**: rollback deploy / failover DB / restart PM2 worker / disable feature flag.
6. **Resolve**: confirm metrics recovered.
7. **Post-mortem**: blameless, action items logged.

Have this written down. Nobody remembers runbooks in a crisis.

## Performance budget per endpoint

Every endpoint gets a target. When the budget is exceeded, fix before adding features.

```js
// server/routes/opd.js
router.get('/today', budgeted('/api/opd/today', 500, async (req, res) => {
  // ...
}));
```

Where `budgeted` is a wrapper that logs a warning if the handler exceeds its budget and increments a counter.

## Workflow — when the user asks about performance

1. **Check the dashboard** — is the problem widespread or localized?
2. **Check recent changes** — was there a deploy?
3. **Check DB** — slow query? pool saturated?
4. **Check cache** — hit rate dropped?
5. **Check AI** — Claude latency / fallback rate?
6. **If stuck**: ask for the request ID from the user report, trace through the logs.

## Anti-patterns to refuse

- **Free-text log messages without structured metadata** — impossible to query.
- **Metric names with high cardinality labels** — per-user-id labels explode storage. Use bucketed / hashed labels.
- **Alerting on every warning** — pager fatigue = real alerts missed.
- **"Check prod to see if it's working"** — the whole point is knowing without checking.
- **Instrumenting only the happy path** — errors are the most important events; instrument them first.
- **Exposing `/metrics` publicly** — treat as internal-only.

## Sibling skills

- `bch-360-expert/references/performance-auditor.md` — one-off perf audits.
- `bch-data-quality` — data-plane health, complements runtime health.
- `bch-devops` — infra + deploy, where PM2 tuning and resource limits live.
- `bch-security-compliance` — audit log framework relates to log hygiene.
