# Performance Auditor — Make It Fast, Safe, Clean

Read this when the user says the app is slow, wants an audit, or wants to raise the quality bar. Work in four layers: **frontend performance, backend performance, security, quality gates**.

## Run these commands first, always

```bash
npm run typecheck     # should be zero errors
npm run lint          # should be zero errors; warnings < 50
npm run test          # all passing
npm run test:smoke    # DB + API smoke (optional if no DB access)
```

If any fail, STOP and fix before touching anything else. Piling changes onto a broken base wastes time.

## Frontend Performance

### Bundle size

```bash
npm run build
# Check dist/assets/*.js sizes
```

**Targets** (gzip):
- Main chunk: < 500 KB
- Per-tab chunk (if lazy-split): < 200 KB
- Recharts: lazy-loaded per chart type when possible

**Red flags**:
- Any single `index-*.js` over 800 KB — tabs aren't code-split.
- `recharts` bundled into every chunk — not lazy.
- Anthropic SDK in the client bundle — it should be server-only (`@anthropic-ai/sdk` is backend).

### React performance

- Profile with React DevTools → Profiler. Any tab re-rendering more than 2x per data update is a selector problem.
- Use `useShallowDashboardSelector` with narrowed keys — don't select the whole store.
- Memoize heavy transforms with `useMemo`.
- Virtualize long lists with `react-window` (`FixedSizeList`) — pattern used in `OPDTab.jsx`.
- Charts: wrap in `<SubErrorBoundary>` and consider `React.memo` if the parent re-renders often but chart data is stable.

### Recharts specifically

- Use `ResponsiveContainer` with a fixed height, not width+height.
- Set `isAnimationActive={false}` on charts that re-render with streaming data — the animation restart on every render is a major framerate killer.
- Avoid rendering more than ~1000 points in a single `LineChart` — downsample first.

### Code-splitting per tab

Check `src/App.jsx`. Each tab should be `React.lazy`-loaded:

```jsx
const OPDTab = React.lazy(() => import('./components/OPDTab.jsx'));
const IPDTab = React.lazy(() => import('./components/IPDTab.jsx'));

<Suspense fallback={<TabLoadingSkeleton />}>
  <Routes>...</Routes>
</Suspense>
```

If tabs aren't lazy-loaded, that's usually the single biggest frontend win available.

## Backend Performance

### Query speed

- **EXPLAIN every new query.** Full table scans on `ovst` (OPD visits) or `opitemrece` (billing items) are blockers.
- **Parameterize always.** Never string-concat SQL.
- **Parallelize with `Promise.all`.** The codebase does this widely — follow the pattern.
- **Use `dbQueryHeavy` for slow aggregates** (30+ day windows, cross-joins). Regular `dbQuery` is for sub-second queries.
- **Materialized views** for repeatable heavy reads. See `server/db/materializedViews.js` and the `getMV()` helper.

Profile slow endpoints:

```js
const start = Date.now();
const data = await dbQueryHeavy(sql, params);
const ms = Date.now() - start;
if (ms > 1000) logger.warn('slow query', { endpoint: 'xxx', ms });
```

### Connection pool

- Pool is sized at 30 connections per worker, 4 workers → 120 total. MySQL `max_connections` must exceed this.
- Global semaphore in `server/db/mysql.js` caps concurrent in-flight queries at 50 per process to prevent stampede.
- Long-held transactions are a pool killer. Don't `BEGIN` a transaction against a read replica. (The project shouldn't have transactions — HOSxP is read-only.)

### Caching

Every GET route should be wrapped in `cached(key, ttlMs, fn)` unless it genuinely must be live.

TTL guide:
- 10–30s — ER triage, live bed status, NEWS2 live alerts
- 60s — today's OPD/IPD/ER summary
- 5 min — 7-day trends, ward-level KPIs
- 15 min — monthly fiscal roll-ups
- 1 hour — year-over-year, DRG distributions
- 6 hours — quality-indicator reports

### Rate limiting

Every mutation endpoint should have `express-rate-limit`. GET endpoints generally don't need it (caching protects them), but auth endpoints (`/api/auth/login`, `/api/auth/refresh`) absolutely need it. Check `server/middleware/` for the rate-limiter setup.

## Security

### Non-negotiable checks

- **No secrets in code.** `.env` only. Check `git grep -iE "(password|secret|token|key)\s*=\s*['\"]"` — should return nothing in tracked code.
- **JWT secret from env.** No hardcoded fallbacks.
- **bcrypt rounds ≥ 10** for password hashing. 12 is the current sweet spot.
- **helmet enabled** with a sensible CSP. CSP should allow WebSocket for Socket.IO.
- **CORS locked** to known origins — not `*`.
- **Input validation** via Zod on every route. `validateBody` + `validateQuery` middleware.
- **Parameterized queries always.** Any `\${ ... }` inside a SQL template string is a red flag.

### RBAC coverage

Every route should have:

```js
router.get('/...', authenticate, authorize(['role1', 'role2']), handler);
```

Grep for routes missing this:

```bash
# routes that lack authorize
grep -L "authorize" server/routes/*.js
```

Exceptions: the login/refresh/logout endpoints themselves, and public health checks.

### Audit logging

Any endpoint that reads PII should emit an audit entry:

```js
req.audit?.('read:patient', { hn: hashHn(req.params.hn) });
```

Check `server/middleware/audit.js` for the exact API. Never log raw `hn`, name, or `cid`.

### PDPA compliance checks

- [ ] No PII in winston logs. Search: `logger.*(.*\b(name|cid|phone|address)\b)`.
- [ ] Audit logs retained 7 years (per MOH). Check `server/middleware/audit.js` retention config.
- [ ] Right-to-erasure: tracked in the sidecar SQLite `audit.db` or `bch_meta.db`. Check migration files.
- [ ] Patient consent fields present in FHIR middleware (`server/middleware/fhir.js`) if applicable.

## Accessibility (a11y)

The project already has `eslint-plugin-jsx-a11y`. It should be clean.

```bash
npm run lint
```

Specific checks:

- [ ] Every `<img>` has `alt`. Decorative icons use `aria-hidden="true"`.
- [ ] Every form input has a `<label>` (or `aria-label` on the input).
- [ ] Buttons use `<button>`, not `<div onClick>`. Keyboard navigation requires real buttons.
- [ ] Color is never the only signal. Pair red KPIs with icons or text like "ลดลง".
- [ ] Contrast ≥ 4.5:1 for body text. Use Tailwind `text-slate-700 dark:text-slate-200` over `text-gray-500` for readability.
- [ ] Focus ring visible on all interactive elements. Don't `outline-none` without a replacement.

## Quality gates before handing back

After any non-trivial change, confirm:

```bash
npm run typecheck && npm run lint && npm run test
```

If the change was backend-heavy:

```bash
npm run test:smoke
```

If the change was UI-heavy, tell the user to verify at http://localhost:4001 — you can't verify UI behavior.

## Audit script

`scripts/audit_performance.mjs` bundled with this skill runs typecheck + lint + build + bundle-size report in parallel and produces a one-screen summary. Use it as the default when the user says "audit the project".

## Common performance bugs in this codebase

These come up repeatedly — know them so you can fix them quickly when you spot them.

1. **Sequential `await`s in a route** — should be `Promise.all`. Search: `await dbQuery.*\n.*await dbQuery` (rough).
2. **Unbounded date range** — e.g., a route that defaults to `INTERVAL 365 DAY`. Every query should have a hard cap.
3. **N+1 from frontend** — component-level `fetchData` inside a `.map()`. Should be one `/batch` endpoint.
4. **Tooltip or tick formatter allocated per render** — creates garbage. Extract to top-level const.
5. **KPICard without `format` prop on currency** — renders raw number. Should be `format="currency"`.
6. **Selector returning a new object on every render** — causes re-renders. Use `useShallowDashboardSelector`.
7. **Chart re-animating on every data update** — set `isAnimationActive={false}` for live charts.
8. **Route not cached** — every GET should be under `cached()` unless truly live.
9. **Logger called at `info` level inside a tight loop** — floods the log file. Use `debug` or sample.
10. **Materialized view not used for 90-day aggregates** — runs a fresh aggregate on the hot path. Move to MV.
