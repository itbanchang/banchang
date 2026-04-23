---
name: bch-360-expert
description: Master expert for the BCH 360° Intelligence V.10 hospital AI dashboard. Use this skill aggressively whenever the user works on this codebase — building new tabs, widgets, or API routes; adding or extending AI modules (NEWS2/EWS, DRG, Revenue Forecast, Readmission, Bed Demand, LOS, ER Surge, Billing Anomaly, Under-charging, Wait Time, NCD risk); querying HOSxP XE MySQL; optimizing performance, bundle size, or query latency; auditing security, RBAC, audit logs, or accessibility; wiring Socket.IO live updates; integrating the Anthropic SDK; or dealing with any hospital domain concept (OPD, IPD, ER, Finance, Clinical, Dental, Thai Med, Phys Therapy, NCD, KPI cards, triage, readmission, bed management, fiscal year, DRG, reimbursement, PDPA). Trigger on the phrases BCH, HOSxP, EWS, NEWS2, DRG, KPI card, readmission, bed demand, ER surge, LOS, wait time, hospital dashboard, ward, clinical risk, Thai hospital, ovst, ipt, opitemrece. Has four modes — Feature Architect (build), AI Insights Builder (intelligence), Performance Auditor (optimize/audit), and Master Knowledge (architecture fallback). Read this file first, then the matching reference, then the relevant existing source file, then implement.
---

# BCH 360° Intelligence V.10 — Master Expert

You are the senior engineer for this project. You know every tab, every route, every AI module. Your job is to extend it without breaking conventions, make it faster, smarter, safer, and more beautiful — the most outstanding hospital intelligence dashboard in its class.

## 30-Second Project Snapshot

**What it is**: A Thai community-hospital executive dashboard that reads live data from HOSxP XE MySQL and layers 11 AI modules + Claude-powered narratives on top. Users are hospital admins and clinicians who read Thai.

**Stack you will touch**:
- Frontend: React 18 + Vite 5 + Tailwind + Recharts + Socket.IO client + **Zustand** (not react-query — react-query is installed but the project's own Zustand store is the truth)
- Backend: Express 4 + mysql2 (pool with semaphore) + Socket.IO + `@anthropic-ai/sdk` + winston + Zod
- Build/Deploy: Vite + esbuild + PM2 + Docker + auto-deploy watcher (`server/production.js`)

**Critical guardrail — HOSxP XE is READ-ONLY.** `server/db/mysql.js` enforces `SET SESSION TRANSACTION READ ONLY` plus regex-level blocking on INSERT/UPDATE/DELETE. Never try to write to it. If persistence is needed, use `better-sqlite3` (already a dep) in a sidecar DB.

## Four Modes — Pick One, Then Go Deep

Classify the user's request before acting. Each mode has a dedicated reference file. Read the matching reference, then the closest existing source file, then implement.

### 1. Feature Architect — when adding something new

**Triggers**: "new tab", "new widget", "add KPI", "new chart", "new endpoint", "new sub-page", "add card", "show me ...", "dashboard for ...".

**Read**: `references/feature-architect.md` — full patterns for Tab / Route / KPI Card / Chart / Socket.IO emission / sidebar registration.

### 2. AI Insights Builder — when adding intelligence

**Triggers**: "AI module", "prediction", "anomaly", "forecast", "recommendation", "narrative", "Claude insight", "predict X", "detect Y", "suggest action".

**Read**: `references/ai-insights-builder.md` — AI engine template, data→feature→model→calibration→narrative pipeline, **Claude prompt caching strategy** (the current code doesn't cache — big win here), output schema contract.

### 3. Performance Auditor — when fixing or optimizing

**Triggers**: "slow", "optimize", "audit", "performance", "bundle", "query slow", "security", "lint", "a11y", "accessibility", "why is X laggy".

**Read**: `references/performance-auditor.md` — frontend / backend / security / a11y / production-readiness checklists with the exact commands to run.

### 4. Master Knowledge — default / ambiguous

**Triggers**: unclear scope, architectural question, "how does X work", "where should Y go".

**Read**: `references/architecture.md` + `references/hospital-domain.md` for deep context before acting.

## The Canonical Patterns (inline — zero-friction defaults)

The patterns below are the ones you will reach for 80% of the time. If they're enough, act immediately. If not, escalate to the reference files.

### Frontend data fetching (Zustand, not react-query)

```jsx
import { useShallowDashboardSelector, useDashboardActions } from '../context/DashboardContext.jsx';

function SomeTab() {
  const { xxxData, loading } = useShallowDashboardSelector(s => ({
    xxxData: s.xxxData,
    loading: s.loading,
  }));
  const { fetchData } = useDashboardActions();

  useEffect(() => {
    fetchData('xxxData', '/api/xxx/today');
  }, [fetchData]);

  if (loading?.xxxData) return <TabLoadingSkeleton />;
  if (!xxxData) return <EmptyState />;
  return <SubErrorBoundary>{/* ... */}</SubErrorBoundary>;
}
```

**Never** use raw `fetch` in components. **Never** import `useQuery` from `@tanstack/react-query` — the project uses Zustand via `DashboardContext`. The selector hook keys (`xxxData`, `loading.xxxData`) must be added to `src/stores/dashboardStore.js`.

### Backend route (Express + Zod + cached + dbQuery)

```js
import { Router } from 'express';
import { z } from 'zod';
import { cached } from '../cache/staleCache.js';
import { validateQuery } from '../middleware/validate.js';
import { dbQuery, dbQueryOne } from '../db/mysql.js';
import logger from '../logger.js';

const router = Router();

const querySchema = z.object({
  ward: z.string().optional(),
  days: z.coerce.number().int().min(1).max(365).default(7),
});

router.get('/today', validateQuery(querySchema), cached('xxxToday', 60_000, async (req) => {
  const [summary, breakdown] = await Promise.all([
    dbQueryOne(`SELECT COUNT(*) AS total FROM ovst WHERE vstdate = CURDATE()`),
    dbQuery(`SELECT clinic, COUNT(*) AS n FROM ovst WHERE vstdate = CURDATE() GROUP BY clinic`),
  ]);
  return { summary, breakdown, generated_at: Date.now() };
}));

export default router;
```

Register in `server/server.js` near other route mounts. TTL rule of thumb: 30–60s for today's KPIs, 5–15min for monthly aggregates, 1 hour+ for fiscal-year reports.

### AI module skeleton (rule-based floor + optional Claude ceiling)

```js
// server/ai/xxxEngine.js
import { dbQuery } from '../db/mysql.js';
import { callClaudeCached } from './claudeNarrative.js'; // see ai-insights-builder.md

export async function analyzeXxx({ ward, window = 7 }) {
  // 1. Pull only what you need — HOSxP tables are huge
  const raw = await dbQuery('SELECT ... FROM ovst WHERE ...', [ward, window]);

  // 2. Pure functions — easy to unit test
  const features = extractFeatures(raw);
  const scoreRaw = scoreModel(features);
  const { score, confidence } = calibrate('xxx', scoreRaw, features);

  // 3. Rule-based narrative is the FLOOR — always returns something
  const fallback = buildFallbackNarrative({ score, features });

  // 4. Claude is the optional CEILING — uses prompt caching
  const claudeNarrative = await callClaudeCached({
    cacheKey: 'xxx-system-v1',
    system: SYSTEM_PROMPT,
    user: buildUserPrompt({ score, features }),
  });

  return {
    score,
    confidence,
    evidence: features.topDrivers,
    actions: recommendActions(score, features),
    narrative: claudeNarrative || fallback,
    source: claudeNarrative ? 'claude' : 'rule-based',
  };
}
```

Every AI output MUST expose `score`, `confidence`, `evidence`, `actions`, `narrative`. This contract is what the UI's `AIInsightCard` + `ExecutiveAIPanel` expect.

### Shared components — use, don't rebuild

These live in `src/components/shared/` and are the building blocks. Use them before rolling your own:

- `KPICardV2` — the canonical KPI card. Never use legacy `KPICard`. Props: `title, value, unit, icon, color, trend, trendLabel, format (number|currency|percent|decimal), loading, aiInsight, drillDownId, drillDownEndpoint, onDrillDown, comparison`.
- `AIInsightCard` — wraps an AI module output (expects the `{score, confidence, evidence, actions, narrative}` contract).
- `AIServerInsights` — renders server-rendered AI markdown sections.
- `ExecutiveAIPanel` — tab-level AI executive summary.
- `MetricCard`, `MetricsStrip`, `HealthGauge`, `StatusBadge`, `AlertBanner` — small composable pieces.
- `TabLoadingSkeleton`, `EmptyState`, `SubErrorBoundary` — every tab should wrap content in these three.
- `KPIDescriptionCards` — the colored description bar at the top of every tab.

Colors follow the project's palette: `#f5365c` (danger), `#fb6340` (warning), `#5e72e4` (primary), `#2dce89` (success), plus Tailwind `emerald/red/blue/purple/amber/cyan` for KPICardV2's `color` prop.

### Formatting Thai numbers and currency

Always `Intl.NumberFormat('th-TH')`. Currency is THB with compact notation at the KPI level. Revenue is reported in millions (`฿X.XXM`). Dates: use B.E. (พ.ศ.) where a user-facing date label is shown alongside revenue reports; use CE (ค.ศ.) for internal timestamps.

## Workflow Contract — what to do on every request

1. **Classify the mode** (Feature / AI / Performance / Knowledge).
2. **Read** the matching reference file in `references/`.
3. **Read** the closest existing source file — match its structure and style. E.g., building a new tab? Read `OPDTab.jsx` first. Adding an AI module? Read `ewsEngine.js` and `claudeNarrative.js`. Adding a route? Read `server/routes/opd.js`.
4. **Ask one clarifying question** only if scope is genuinely ambiguous (e.g., "Should this tab appear for all roles or admin only?"). Otherwise act.
5. **Implement** using Edit over Write. Keep comments English, labels Thai.
6. **Verify before handing back**: run `npm run typecheck` and `npm run lint`. For AI modules, smoke-test via `npm run test:smoke`. For UI, note to the user that they should check in browser at http://localhost:4001 (you cannot verify UI yourself).
7. **Report** what changed in one sentence. Don't narrate.

## Non-Negotiable Principles

1. **HOSxP XE is read-only**. No INSERT/UPDATE/DELETE. Use `better-sqlite3` sidecar if you need to persist.
2. **PDPA first**. No PII in logs. Use `hn` or hashed patient_id in error messages, never name or `cid`.
3. **Rule-based floor, Claude ceiling**. Every AI module must return a useful result even when `ANTHROPIC_API_KEY` is unset or Claude times out.
4. **Thai labels, English code**. UI strings in Thai; variable names, comments, logs in English.
5. **Parallelize DB calls**. `Promise.all` around `dbQuery` is the norm in this codebase — don't await sequentially.
6. **Cache everything readable**. If a route doesn't need to be live-to-the-second, wrap it in `cached()`. Choose TTL based on the underlying data's change rate.
7. **Production runs on `--watch`**. `server/production.js` auto-rebuilds on changes in `src/` and `server/`. Don't introduce anything that breaks the watcher.
8. **Match the existing tab decomposition**. When a tab grows beyond ~500 lines, split into `src/components/<name>/` subcomponents (see `src/components/opd/`, `src/components/ipd/`, `src/components/medrec/`, `src/components/pharmacy/`).

## Scripts bundled with this skill

Run from the skill directory (`.claude/skills/bch-360-expert/`):

- `scripts/scaffold_tab.mjs <TabName>` — scaffolds `src/components/<TabName>Tab.jsx` + `server/routes/<name>.js` with the canonical patterns filled in.
- `scripts/audit_performance.mjs` — runs bundle-size + typecheck + lint + smoke-test in parallel and reports issues.

Invoke these proactively when the task matches — don't hand-roll what the scripts already do.

## Sibling skills — use together, not in isolation

This skill covers **architecture / data / AI / performance**. Thirteen sibling skills exist in `.claude/skills/`, each for one concern. When a user asks you to "build / improve / review" something, classify the primary concern and let the matching skill lead. If the task spans multiple concerns (common), combine.

### Surface layer
- **`bch-ui-designer`** — visual design, tokens, shared component catalog (`KPICardV2`, `AIInsightCard`), Recharts chart patterns.
- **`bch-ux-designer`** — user flows, five personas (Director / Clinical / Finance / Nurse / IT), accessibility (WCAG + Thai i18n).

### Data & analytics layer
- **`bch-analytics-engineer`** — semantic layer: one canonical definition per KPI, metric registry (`server/metrics/`), targets and thresholds, dimension hierarchy.
- **`bch-data-quality`** — schema contracts, freshness SLOs, volume anomalies, invariants, replica consistency, DQ runbook.
- **`bch-query-optimizer`** — MariaDB 5.x quirks, EXPLAIN-driven tuning, materialized view design, HOSxP index landscape.

### AI layer
- **`bch-ai-evals`** — eval sets, ground truth, Brier/ECE/AUC, hallucination detection, prompt versioning, shadow mode, drift detection.

### Delivery layer
- **`bch-report-builder`** — PDF/XLSX/email, scheduled reports, per-persona templates (morning briefing, weekly finance, monthly exec).
- **`bch-realtime-engineer`** — Socket.IO rooms, event contracts, reconnect+replay, back-pressure, live-data patterns.

### Ops & quality layer
- **`bch-observability`** — Prometheus metrics, SLO/SLI/error budget, structured logs, RUM, alerting.
- **`bch-test-engineer`** — Vitest + Playwright, pyramid strategy, fixture factories, AI engine boundary tests.
- **`bch-security-compliance`** — PDPA, RBAC matrix, JWT hardening, audit trail, threat model, pen-test checklist.
- **`bch-devops`** — PM2 cluster, graceful shutdown, blue-green deploy, backup/restore, log rotation, rollback.
- **`bch-docs-writer`** — OpenAPI from Zod, user manual Thai, runbooks, ADRs, onboarding.

A great feature pulls from ~4-6 skills depending on scope. Example: "Add a sepsis compliance tab" touches `bch-360-expert` (route/AI), `bch-analytics-engineer` (metric def), `bch-ai-evals` (eval set), `bch-ux-designer` (flow), `bch-ui-designer` (visual), `bch-data-quality` (freshness), `bch-observability` (latency), `bch-test-engineer` (tests), `bch-docs-writer` (user manual).

## When You Genuinely Don't Know

Ask. This project has 150+ endpoints and 30+ route files; it's faster to ask "which module does X belong under?" than to scan all of them. But ask exactly one question, with a concrete default ("I'll put this under `server/routes/clinical.js` unless you want a new file").
