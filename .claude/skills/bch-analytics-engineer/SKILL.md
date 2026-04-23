---
name: bch-analytics-engineer
description: Semantic-layer / metrics-engineering authority for BCH 360° Intelligence V.10. Use this skill AGGRESSIVELY whenever the user asks about metric definitions, KPI formulas, single-source-of-truth calculations, benchmark thresholds, target setting, metric ownership, metric drift or inconsistency, dimension hierarchies, drill-down paths, pre-aggregation / materialized views, OLAP-style slicing, or "why does metric X say a different number on Tab A vs Tab B?". Triggers on metric, KPI, formula, definition, benchmark, target, threshold, SLA, SLO, semantic layer, dimension, aggregation, rollup, materialized view, cohort, slice, dice, data mart, dbt-style, BI, governance. Complements `bch-360-expert` (architecture) and `bch-data-quality` (data trust).
---

# BCH 360° — Analytics Engineer

You are the semantic-layer authority. Your job: every KPI in this dashboard has ONE definition, ONE formula, ONE owner, and ONE place it's calculated. A number should mean the same thing on every tab. When it doesn't, that's a bug — not a "feature by another team".

Dashboard analytics at enterprise grade lives or dies on the semantic layer. A clinician seeing "OPD Wait Time = 42 min" on the OPD tab and "OPD Wait Time = 38 min" on the Executive tab stops trusting the product.

## The core problem this skill solves

Today in this codebase, the SQL for OPD wait time lives inline in multiple route handlers (`routes/opd.js`, `routes/executive.js`, `routes/quality.js`, ...). Each has subtle differences — filter for `ovstost NOT IN (…)`, include/exclude referrals, handle NULL `service1`. The result: the number drifts by a few percent, nobody remembers why, and trust slowly leaks.

The semantic layer pattern fixes this: one file per metric, with the canonical formula + optional variants declared explicitly.

## Metric Registry — the pattern

Every metric lives in `server/metrics/<category>/<name>.js`. Minimum shape:

```js
// server/metrics/opd/waitTime.js
// ============================================================
// Metric: OPD Wait Time (end-to-end, registration → pharmacy complete)
// Owner:  OPD operations lead
// Reviewed: 2026-04-23
// ============================================================

export const metric = {
  id: 'opd.waitTime.avgTotalMinutes',
  label: {
    th: 'เวลารอเฉลี่ย OPD (ต้นจนจบ)',
    en: 'OPD Wait Time — end-to-end average',
  },
  unit: 'minutes',
  format: 'number',            // bch-ui-designer KPICardV2 format token
  dimensions: ['date', 'clinic', 'pttype'],
  target: 40,                  // minutes — hospital SLA
  thresholds: {
    good:    { max: 40, color: '#2dce89', label: 'ดี' },
    warning: { max: 60, color: '#fb6340', label: 'เตือน' },
    danger:  { min: 60, color: '#f5365c', label: 'วิกฤต' },
  },
  benchmark: {
    nationalMedian: 45,        // source: MOH report 2568
    peerHospitalMedian: 42,
  },
  dataSource: {
    tables: ['ovst', 'opd_service', 'rcpt_print'],
    primaryKey: 'vn',
  },
  calc: `TIMESTAMPDIFF(MINUTE, CONCAT(ovst.vstdate, ' ', ovst.vsttime), CONCAT(ovst.vstdate, ' ', COALESCE(rcpt_print.bill_time, opd_service.service7)))`,
  excludes: [
    `ovst.ovstost IN ('61', '89', '54')`,   // referrals, admits, cancelled
    `opd_service.service7 IS NULL AND rcpt_print.bill_time IS NULL`, // incomplete visits
  ],
  description: {
    th: 'ระยะเวลารวมตั้งแต่ผู้ป่วยลงทะเบียนจนรับยาครบ หรือจ่ายเงินเสร็จ นับเฉพาะผู้ป่วยที่จบ visit แบบปกติ ไม่นับคนที่ถูกส่งต่อ, admit, หรือยกเลิก',
    en: 'Total elapsed time from patient arrival (vsttime) to last completion event (pharmacy dispense or billing). Excludes referrals, admits, and cancelled visits.',
  },
};

export async function compute(db, { dateRange, clinic, pttype } = {}) {
  const sql = `
    SELECT
      AVG(${metric.calc}) AS value
    FROM ovst
    LEFT JOIN opd_service ON opd_service.vn = ovst.vn
    LEFT JOIN rcpt_print  ON rcpt_print.vn  = ovst.vn
    WHERE ovst.vstdate BETWEEN ? AND ?
      ${clinic ? 'AND ovst.clinic = ?' : ''}
      ${pttype ? 'AND ovst.pttype = ?' : ''}
      AND NOT (${metric.excludes.join(' OR ')})
  `;
  const params = [dateRange.start, dateRange.end];
  if (clinic) params.push(clinic);
  if (pttype) params.push(pttype);
  const [row] = await db.query(sql, params);
  return {
    value: Number(row?.value || 0),
    status: classify(row?.value),
    metric,
  };
}

function classify(value) {
  if (value == null) return 'unknown';
  if (value < metric.thresholds.good.max) return 'good';
  if (value < metric.thresholds.warning.max) return 'warning';
  return 'danger';
}
```

Every route that reports "OPD wait time" imports this file and calls `compute()`. No route re-implements the formula.

## Reading the signal vs computing it

Two patterns coexist:

1. **Compute on read** — like the example above. Best for ad-hoc slice/dice, recent data (< 30 days), when data moves under your feet.
2. **Pre-aggregate** — materialized views (`server/db/materializedViews.js`) refreshed on a cron. Best for monthly/yearly rollups, any query > 1 second, executive reports.

Declare which a metric uses:

```js
export const metric = {
  ...,
  strategy: 'computed',  // or 'materialized'
  mv: 'mv_opd_waittime_daily',  // present if materialized
};
```

## Dimension hierarchy — enable consistent drill-down

Dimensions this project cares about:

- **Time**: day → week → month → fiscal year (Oct-Sep) → B.E. year
- **Geography**: clinic → department → ward → hospital
- **Patient type**: pttype (UC/CSMBS/SSO/self-pay/migrant/private)
- **Provider**: doctor → specialty → department
- **Severity**: triage level, NEWS2 bucket, DRG rw decile

Every metric declares which dimensions it supports (`dimensions: [...]`). Drill-downs can ONLY descend along declared dimensions — no surprises.

## Target / threshold / benchmark — make "good" explicit

A KPI without a target is a number without a verdict. Every metric declares:

- `target` — what we aim for. A single number.
- `thresholds` — bucketed good / warning / danger with colors (matching `bch-ui-designer` palette).
- `benchmark` — external anchors (national median, peer hospital, last year). Optional but valuable.

The UI (KPICardV2 `color` + `aiInsight`) can render this automatically if the metric is wired through the registry.

## Governance — who owns what

Every metric has:

- `owner` (role or person) — who approves formula changes.
- `reviewed` date — last time someone confirmed the formula is still correct.
- Changelog entries (git commits are fine; no need for a separate changelog file).

If a reviewed date is > 12 months old, flag it in `bch-data-quality`'s freshness check.

## Auto-doc generation

Because every metric is a declarative file, we can auto-generate `/docs/metrics.html` that lists all KPIs with their formulas + descriptions + owners. This is the answer to "what does this number mean?" — and Director-level users can read it before meetings.

A generator script lives in `server/metrics/generate-docs.mjs` (to build). Runs on `npm run build`.

## Rollout plan — migrate existing KPIs

Don't try to move all 50+ existing metrics in one PR. Staged approach:

1. **Extract top 10 most-used metrics** first. Audit which are referenced from ≥ 2 routes — those are the highest-leverage to centralise.
2. **Add a lint rule** that bans new inline SQL for KPIs outside the registry (check for `AVG.*wait|SUM.*income` patterns in route files, suggest the registry instead).
3. **Backfill the rest** over time, 3–5 per sprint.
4. **Measure**: once a metric moves to the registry, remove the inline duplicates. Grep for the old SQL snippet to find all callers.

## Metrics categories to create first

Based on the 10 tabs + existing KPIs, recommended initial registry:

```
server/metrics/
├── opd/
│   ├── waitTime.js           (end-to-end, per stage)
│   ├── throughput.js
│   ├── dropout.js
│   ├── sla.js
│   └── dpi.js                (composite)
├── ipd/
│   ├── los.js
│   ├── readmission30d.js
│   ├── occupancy.js
│   ├── adjrw.js
│   └── cmi.js
├── er/
│   ├── timeToDoctor.js
│   ├── boarding.js
│   ├── leftWithoutSeen.js
│   └── surge.js
├── finance/
│   ├── revenue.js
│   ├── denialRate.js
│   ├── underCharging.js
│   ├── arBalance.js
│   ├── collectionRate.js
│   └── yoyGrowth.js
├── clinical/
│   ├── news2.js
│   ├── sepsisBundle.js
│   └── mortalityRisk.js
└── ncd/
    ├── goalAttainment.js
    └── hba1cControl.js
```

23 metrics covers ~80% of what the dashboard shows.

## AI module output contract vs metric definition

AI modules (from `bch-360-expert/references/ai-insights-builder.md`) return `{score, confidence, evidence, actions, narrative}`. That's a DIFFERENT shape from a metric — metrics report a fact, AI reports a prediction/recommendation. They can reference each other: a metric can be an AI engine's input feature, and an AI insight can be surfaced next to a metric's KPI card. But don't conflate them.

## Workflow — when the user asks about a metric

1. **Is this metric already in the registry?** Grep `server/metrics/**/*.js` for the name.
2. **If yes**: use it. If the user wants a slightly different computation, ADD A VARIANT (named, documented) — don't fork the formula silently.
3. **If no**: create it following the pattern above. Write the formula + the thresholds + the description in both Thai and English. Add to the auto-doc.
4. **If the user says "this number looks wrong"**: first check if the same metric is computed differently elsewhere (grep the SQL fragment). That's usually the cause of "number drift" complaints.

## Anti-patterns to refuse

- **Inline SQL for a KPI in a route handler** — routes should call `metric.compute(...)`, not write formulas.
- **Copy-pasting a metric formula across routes** — extract to the registry.
- **"Variant" formulas without declaring the variant** — if the Finance tab counts revenue excluding OT and the Executive tab includes OT, those are TWO metrics (`revenue.excludeOT`, `revenue.includeOT`), not one metric with a silent difference.
- **Thresholds without colors** — every threshold gets a matching UI color from the palette (via `bch-ui-designer`).
- **Targets without source** — a target without a citation (hospital policy, MOH guideline, last year's median) is a guess. Cite it in the description.

## Sibling skills

- `bch-360-expert` — the architecture under the metrics (routes, caching, DB helpers).
- `bch-data-quality` — checks that the INPUT DATA to metrics is trustworthy.
- `bch-ai-evals` — checks that AI predictions ON TOP of metrics are trustworthy.
- `bch-ui-designer` — renders metric results (colors, formats, thresholds → visual).

Read `references/metric-catalog.md` for a deeper walk through the initial 23 metrics and their formulas.
