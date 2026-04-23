# BCH 360° Architecture Deep Dive

Use this file to answer "where does X live?" and "how does data flow from HOSxP to the screen?" questions. Read it before doing architectural work.

## Directory Map — where things live

### Frontend (`src/`)

```
src/
├── App.jsx                          ← root router + auth gate
├── main.jsx                         ← entry + DashboardProvider + QueryClientProvider
├── components/
│   ├── <Name>Tab.jsx                ← one file per major tab (OPD, IPD, ER, ...)
│   ├── KPICardV2.jsx                ← THE KPI card (canonical)
│   ├── AIInsightsPanel.jsx          ← tab-level AI executive summary
│   ├── AIAssistant.jsx              ← chat panel
│   ├── DailyBriefing.jsx            ← morning briefing block
│   ├── ExecutiveCommandCenter.jsx   ← homepage composite
│   ├── ProtectedRoute.jsx           ← RBAC gate for routes
│   ├── LoginForm.jsx / LoginForm.css
│   ├── ServerSettings.jsx
│   ├── opd/ ipd/ medrec/ pharmacy/  ← subcomponents when a tab exceeds ~500 lines
│   └── shared/                      ← reusable primitives (see below)
├── context/
│   └── DashboardContext.jsx         ← Zustand store provider + hooks
├── hooks/
│   └── useAuth.js                   ← access/refresh token lifecycle
├── layouts/                         ← shell layouts
├── providers/                       ← React Query client, theme, etc.
├── services/                        ← API client thin wrappers, formatters
├── stores/
│   └── dashboardStore.js            ← the Zustand store factory
├── types/                           ← TS type declarations (project is .jsx but TS for types)
└── utils/                           ← pure helpers
```

### Shared component library (`src/components/shared/`)

These are the Lego bricks. Reach for them first.

- **KPIDescriptionCards** — colored header bar at top of every tab describing what this tab shows.
- **ExecutiveAIPanel** — tab-level AI narrative (plugs into any AI module output that follows the contract).
- **AIInsightCard** — single-metric AI card with score, evidence, actions.
- **AIServerInsights** — renders pre-rendered server-side AI markdown.
- **MetricCard / MetricsStrip** — small metric tiles, often used in a horizontal strip.
- **HealthGauge** — radial gauge for 0–100 scores (DPI, NEWS2 normalized, etc.).
- **StatusBadge** — colored pill for status labels (ok / warning / danger / info).
- **AlertBanner** — top-of-tab alert for critical events.
- **TabLoadingSkeleton** — standard skeleton state for every tab.
- **EmptyState** — empty-data state with optional CTA.
- **SubErrorBoundary** — wrap chart sections so one broken chart doesn't nuke the whole tab.
- **tabNarratives.js** — per-tab quick summary builders (pure functions, input = state slice).

### Backend (`server/`)

```
server/
├── server.js                        ← main Express app (2,300+ lines, 150+ endpoints)
├── production.js                    ← auto-deploy watcher (watches src/ and server/)
├── startup.js                       ← DB connect, migrations, warm caches
├── socket.js                        ← Socket.IO wiring
├── logger.js                        ← winston instance — USE THIS, not console
├── db/
│   ├── mysql.js                     ← pool + semaphore + dbQuery helpers
│   ├── materializedViews.js         ← precomputed views for heavy aggregates
│   └── ...                          ← connection health, circuit breaker
├── cache/
│   └── staleCache.js                ← cached(key, ttlMs, asyncFn) helper
├── ai/
│   ├── aiModules.js                 ← AI module registry / router
│   ├── analytics.js                 ← shared stats helpers
│   ├── calibration.js               ← output calibration / confidence
│   ├── claudeNarrative.js           ← Anthropic SDK wrapper (see ai-insights-builder.md)
│   ├── clinicalIntelligence.js      ← clinical reasoning helpers
│   ├── drugInteractionEngine.js     ← pharmacy AI
│   ├── ewsEngine.js                 ← NEWS2 / EWS
│   ├── forecastEngine.js            ← Holt-Winters + SARIMA-ish forecasts
│   ├── infectionEngine.js           ← infection surveillance
│   ├── learningCapture.js           ← capture outcomes for later calibration
│   ├── ncdRiskEngine.js             ← NCD risk scoring
│   ├── opdFlowPredictor.js          ← OPD hourly flow prediction
│   ├── selfHeal.js                  ← self-heal hooks when AI output looks wrong
│   ├── sepsisEngine.js              ← sepsis risk
│   └── waitTimeOptimizer.js         ← OPD wait-time optimizer
├── routes/
│   ├── ai/                          ← AI-specific sub-routes
│   ├── ai_routes.js                 ← top-level AI router mount
│   ├── auth.js                      ← login, refresh, logout
│   ├── audit.js                     ← audit log read
│   ├── dashboard.js                 ← homepage aggregates
│   ├── executive.js                 ← executive command center data
│   ├── opd.js ipd.js er.js finance.js clinical.js
│   ├── dental.js thaimedicine.js physicaltherapy.js ncd.js
│   ├── pharmacy.js laboratory.js xray.js medrec.js
│   ├── quality.js safety.js staffing.js
│   ├── customerInsight.js doctorActivity.js evolution.js
│   ├── infrastructure.js system.js
│   ├── kpiExtended.js report.js
│   └── debug.js                     ← dev-only diagnostics
├── middleware/
│   ├── auth / rbac / audit / validate (Zod) / fhir
├── helpers/
│   └── fiscal.js                    ← Thai fiscal year math (Oct→Sep)
├── jobs/                            ← node-cron schedulers
├── config/                          ← env-driven config
├── infra/ monitoring/               ← health checks, metrics
└── logs/                            ← winston file rotation
```

## Data Flow — HOSxP to Screen

1. **HOSxP XE (MariaDB 5.x)** — read-only. Database `bchhosxpxe`. Connection is env-driven (`MYSQL_HOST`). Known hosts:
   - `10.109.0.33` — app-local replica, current dev/prod default
   - `10.109.0.240` — HOSxP master
   - `10.1.0.239` — HOSxP slave2

   Tables listed in `hospital-domain.md`.

2. **Connection pool** (`server/db/mysql.js`) — mysql2 pool with a global concurrency semaphore (`MAX_CONCURRENT = 50`) to prevent pool stampede. Circuit breaker included. Helpers: `dbQuery`, `dbQueryOne`, `dbQueryHeavy` (for long-running aggregates), `dbQueryOneHeavy`. All SQL goes through parameterized queries — never string concatenate.

3. **Materialized views** (`server/db/materializedViews.js`) — precomputed heavy aggregates refreshed on a cron schedule. Use `getMV('mv_name')` for anything that's expensive and doesn't need to be live.

4. **Routes** (`server/routes/*.js`) — Express handlers. Validate with Zod via `validateQuery` / `validateBody` middleware. Wrap reads in `cached(key, ttlMs, asyncFn)`. Emit Socket.IO events for live updates.

5. **AI engines** (`server/ai/*Engine.js`) — pure modules that take raw data and return `{score, confidence, evidence, actions, narrative}`. They can call `claudeNarrative` for Claude-powered prose; if Claude is unavailable the engine falls back to rule-based prose. Every engine is easy to unit-test because the core scoring functions are pure.

6. **Frontend store** (`src/stores/dashboardStore.js`) — Zustand. Has slices for every tab's data plus `loading`, `error`, `alerts`, `drillDown`. Actions: `fetchData(key, endpoint)`, `fetchParallel([...])`, `batchFetch([...])`, `addAlert`, `dismissAlert`, `openDrillDown`, `closeDrillDown`, `setTab`, `dispatch`.

7. **Components** — `<XxxTab>` reads via `useShallowDashboardSelector` + calls `fetchData` in `useEffect`. Child components receive props (no direct store access deep in the tree — keeps re-renders shallow).

8. **Socket.IO** — live updates pushed via `io.to(room).emit(event, payload)`. Client listens in a top-level effect (usually in `DashboardContext` or a dedicated hook) and dispatches into the store.

## Authentication & RBAC

- JWT with access + refresh tokens. Access token is short-lived (15m); refresh token in httpOnly cookie.
- `useAuth` hook (`src/hooks/useAuth.js`) handles silent refresh.
- `ProtectedRoute` component wraps authenticated routes.
- Backend middleware chain: `authenticate` → `authorize([roles])` → handler.
- Roles: at minimum `admin`, `viewer`, plus role variations per module (check `server/middleware/rbac.js` for the current list).

## Build & Deploy

- `npm run dev` — concurrently runs `node --watch server/server.js` (port 4000) + Vite dev server (port 4001, proxies `/api` and `/socket.io` to 4000).
- `npm run build` — cleans `dist/assets` then Vite builds.
- `npm run production` — runs `server/production.js` which watches src/ and server/, auto-rebuilds, serves from 3000.
- `npm run deploy` — powershell script against the production host (10.109.0.33).
- `pm2 start ecosystem.config.cjs --env production` — managed via PM2 in production.
- Docker: `Dockerfile` + `docker-compose.yml` available.

## Testing & Quality Gates

- `npm run typecheck` — `tsc --noEmit` (TypeScript for type-checking .jsx via JSDoc + .d.ts).
- `npm run lint` — ESLint with jsx-a11y, React hooks rules. Max warnings 50.
- `npm run test` — Vitest (unit).
- `npm run test:e2e` — Playwright.
- `npm run test:smoke` — end-to-end smoke check via `scripts/smoke_test.mjs`.
- `npm run validate:schema` — DB schema validation.

**Rule**: on any non-trivial change, run typecheck + lint + smoke. Don't push to the watcher if those fail — you'll break the production auto-deploy.

## What's intentionally different from "typical React + Express"

- **Zustand over react-query.** The Zustand store is the single source of truth. `fetchData(key, endpoint)` writes into the store; components subscribe with selectors. This keeps live-updates (Socket.IO) and fetched-updates (REST) in one place.
- **`cached()` in-process over Redis.** The hospital network may not have Redis available; `staleCache.js` does stale-while-revalidate in memory, sized for a single-node deployment. For multi-worker setups, coordinate via the DB or materialized views.
- **Rule-based AI floor.** Every AI module must return a useful result with NO external dependency. Claude is an optional upgrade. This is non-negotiable: hospital ops cannot pause when the internet is flaky.
- **Read-only HOSxP.** The app never writes to HOSxP XE. If you need to persist (e.g., user annotations, saved reports, AI outcomes for learning), use `better-sqlite3` in a sidecar DB.
- **Thai-first UI, English code.** Every user-facing string is Thai. All code, identifiers, comments, and logs are English. If you need to render a Thai month name, use the `thMonths` array pattern from `claudeNarrative.js`.
- **Materialized views for big aggregates.** Don't run 90-day OPD aggregates on the primary path — use `getMV('mv_opd_monthly')` etc.
