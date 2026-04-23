---
name: bch-data-quality
description: Data-quality / data-trust authority for BCH 360° Intelligence V.10. Use this skill AGGRESSIVELY whenever the user asks about HOSxP schema drift, missing data, stale data, data freshness, volume anomalies, invariant checks, cross-table consistency, data lineage, "the number looks wrong", "data stopped updating", "why is today's count zero", replication lag, or "can we trust this data?". Triggers on data quality, DQ, freshness, staleness, schema drift, volume anomaly, invariant, lineage, cross-check, replication lag, null rate, orphan rows, data contract, data SLA, data trust. Complements `bch-360-expert` (DB pool/circuit breaker), `bch-analytics-engineer` (metric defs), and `bch-ai-evals` (downstream AI quality).
---

# BCH 360° — Data Quality

You are the data trust authority. Clinical and financial decisions are being made on this dashboard; if the underlying data is stale, malformed, or missing, every decision is suspect. Your mandate: detect data problems automatically, alert before users notice, and give the team a way to verify "is this number real?"

The biggest risk in a hospital analytics product isn't algorithmic — it's silent data degradation. A schema drift, a replication pause, a NULL flood, and the dashboard quietly lies for days.

## Four pillars of data quality

Every check in this project fits into one of four buckets:

1. **Schema contracts** — the tables and columns we depend on still exist and have the expected types.
2. **Freshness** — data hasn't fallen behind the SLO (e.g., OPD visits arrive in the replica within 5 minutes).
3. **Volume / distribution anomalies** — today's counts aren't absurdly high or low vs recent baseline.
4. **Invariants** — relationships between data points hold (sum of clinic = hospital total, every admit has a ward, every billing line has a visit).

A data quality job is a set of assertions in each bucket, run on a schedule, with alerting and a visible status on a dashboard tab.

## Schema contracts

Every table the app reads has a declared contract. If HOSxP XE schema drifts (new column, removed column, type change), the contract check fails BEFORE the dashboard lies.

```js
// server/dq/contracts/ovst.js
export const contract = {
  table: 'ovst',
  requiredColumns: {
    vn: 'VARCHAR',
    hn: 'VARCHAR',
    vstdate: 'DATE',
    vsttime: 'TIME',
    dep: 'VARCHAR',
    pdx: 'VARCHAR',
    ovstost: 'VARCHAR',
    doctor: 'VARCHAR',
  },
  indexes: ['vn', 'hn', 'vstdate'],  // queries lean on these
  approximateRowCount: {
    min: 1_000_000,   // the table is huge — if it drops below this, something's wrong
    warn_below: 2_000_000,
  },
};

export async function check(db) {
  const cols = await db.query(`
    SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_SCHEMA = ? AND TABLE_NAME = ?
  `, [process.env.MYSQL_DB, 'ovst']);

  const missing = Object.keys(contract.requiredColumns).filter(
    c => !cols.find(row => row.COLUMN_NAME === c)
  );
  const typeMismatch = cols.filter(row =>
    contract.requiredColumns[row.COLUMN_NAME] &&
    !row.DATA_TYPE.toUpperCase().includes(contract.requiredColumns[row.COLUMN_NAME])
  );

  const rc = await db.queryOne(`SELECT COUNT(*) AS n FROM ovst`);
  return {
    pass: missing.length === 0 && typeMismatch.length === 0,
    missing,
    typeMismatch,
    rowCount: Number(rc.n),
  };
}
```

Run all contracts daily via cron (node-cron is already a dep). Fail the dashboard's green health indicator if any contract fails.

## Freshness SLOs

Every data source has a target staleness. Compute "how old is the newest row?" and compare.

| Source | Freshness SLO | Check |
|--------|---------------|-------|
| `ovst` (OPD visits) | ≤ 5 min | `MAX(CONCAT(vstdate, ' ', vsttime))` |
| `ipt` (admissions) | ≤ 10 min | `MAX(regdate)` |
| `opitemrece` (billing) | ≤ 30 min | `MAX(bill_time)` |
| `er_regist` | ≤ 2 min | `MAX(register_time)` |
| `opdscreen` (vitals) | ≤ 5 min | `MAX(entry_datetime)` |
| `drug_receive` | ≤ 15 min | `MAX(drug_date)` |
| `lab_head` | ≤ 15 min | `MAX(order_date)` |

During off-hours (22:00–07:00), ER is the only thing that MUST be fresh; relax OPD/IPD to 60 min between rounds.

```js
// server/dq/freshness.js
const TARGETS = { /* as above */ };

export async function checkFreshness() {
  const results = {};
  for (const [src, cfg] of Object.entries(TARGETS)) {
    const { sql, ageMinutes } = await lastRowAge(src);
    results[src] = {
      ageMinutes,
      target: cfg.targetMin,
      pass: ageMinutes <= cfg.targetMin,
    };
  }
  return results;
}
```

## Volume & distribution anomalies

Today's counts vs the 30-day rolling baseline. A z-score > 3 triggers a warning; > 4 triggers a critical alert.

```js
// server/dq/volume.js
export async function checkDailyVolumes() {
  const today = await dbQueryOne(`SELECT COUNT(*) AS n FROM ovst WHERE vstdate = CURDATE()`);
  const baseline = await dbQuery(`
    SELECT DATE(vstdate) AS d, COUNT(*) AS n
    FROM ovst
    WHERE vstdate BETWEEN DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND DATE_SUB(CURDATE(), INTERVAL 1 DAY)
      AND DAYOFWEEK(vstdate) = DAYOFWEEK(CURDATE())  -- compare same day-of-week
    GROUP BY DATE(vstdate)
  `);
  const { mean, std } = stats(baseline.map(b => Number(b.n)));
  const z = (today.n - mean) / (std || 1);
  return {
    today: today.n,
    baselineMean: mean,
    baselineStd: std,
    zScore: z,
    severity: Math.abs(z) > 4 ? 'critical' : Math.abs(z) > 3 ? 'warning' : 'ok',
    possibleCauses: z < -3
      ? ['clinic closed unexpectedly', 'registration system down', 'replication lag']
      : z > 3
        ? ['surge event', 'special clinic', 'data import error']
        : [],
  };
}
```

Run for OPD count, IPD admits, ER visits, lab orders, pharmacy dispenses, total billed amount.

Same-day-of-week comparison matters: Sundays have 30% of Monday's volume normally, so comparing Sunday vs Saturday is useless.

## Invariants — relational consistency

Examples of invariants that should always hold:

```sql
-- Every opitemrece row has a matching visit
SELECT COUNT(*) AS orphan_bills
FROM opitemrece o
LEFT JOIN ovst v ON o.vn = v.vn
WHERE o.vn IS NOT NULL AND v.vn IS NULL;
-- Expected: 0 (orphan billing items)

-- Every admit has a discharge OR is currently active
SELECT COUNT(*) AS impossible_admits
FROM ipt
WHERE dchdate IS NOT NULL AND dchdate < regdate;
-- Expected: 0 (discharge before admission makes no sense)

-- Clinic-level totals should equal hospital total
SELECT ABS((SELECT COUNT(*) FROM ovst WHERE vstdate = CURDATE()) -
           (SELECT SUM(cnt) FROM (
             SELECT clinic, COUNT(*) AS cnt FROM ovst WHERE vstdate = CURDATE() GROUP BY clinic
           ) t)) AS mismatch;
-- Expected: 0

-- Every prediction has a labeled outcome after outcome window
-- (for AI modules with captured outcomes via learningCapture.js)
SELECT COUNT(*) AS stale_pending FROM ai_predictions
WHERE predicted_at < strftime('%s','now','-60 days')*1000
  AND outcome_at IS NULL
  AND module_id IN ('readmission','losForecast');
-- Expected: low (most should have outcomes by 60 days)
```

Each invariant is an assertion function returning `{ pass, details }`. The suite runs nightly.

## Cross-replica consistency

The project already has `verify_3servers*.js` (master + slave2 now after 10.1.0.3 retirement). Wrap that in the DQ framework:

- Replica lag (master vs slave2): each slave's `Seconds_Behind_Master` should be ≤ 60s.
- Row count drift on key tables: master and slave2 should match within ±10 rows (allows for in-flight writes).
- Latest record date per table: same across replicas.

Run hourly. Alert at > 120s lag or > 100 row drift.

## Null rate / completeness checks

For critical columns, NULL rate shouldn't drift:

```js
const CRITICAL_NULLS = {
  'ovst.pdx': { maxNullRate: 0.05 },    // diagnosis should be present for > 95%
  'ovst.doctor': { maxNullRate: 0.02 },
  'opdscreen.bps': { maxNullRate: 0.15 }, // vitals sometimes skipped but shouldn't exceed 15%
  'ipt.pdx': { maxNullRate: 0.02 },
  'ipt.dchstat': { maxNullRate: 0.05 },  // discharge status for completed admits
};

export async function checkNullRates(dateFrom, dateTo) {
  const results = {};
  for (const [spec, cfg] of Object.entries(CRITICAL_NULLS)) {
    const [table, col] = spec.split('.');
    const rate = await nullRate(table, col, dateFrom, dateTo);
    results[spec] = {
      rate,
      target: cfg.maxNullRate,
      pass: rate <= cfg.maxNullRate,
    };
  }
  return results;
}
```

## Data lineage — document where every KPI comes from

For every metric in `server/metrics/` (from `bch-analytics-engineer`), there should be a lineage entry:

```yaml
# server/dq/lineage/opd.waitTime.yml
metric: opd.waitTime.avgTotalMinutes
upstream:
  - table: ovst
    columns: [vn, vstdate, vsttime, ovstost, clinic]
  - table: opd_service
    columns: [vn, service1, service2, service7]
  - table: rcpt_print
    columns: [vn, bill_time]
transforms:
  - "LEFT JOIN opd_service ON vn"
  - "LEFT JOIN rcpt_print ON vn"
  - "TIMESTAMPDIFF calculation"
  - "Exclude ovstost IN ('61','89','54')"
consumers:
  - "/api/opd/today"
  - "/api/executive/summary"
  - "OPDTab.jsx"
  - "ExecutiveCommandCenter.jsx"
```

Auto-generated from code analysis (grep for `from <table>`, link to metric ID). The lineage doc is what someone reaches for when they ask "why did this metric change yesterday?"

## DQ dashboard tab

A dedicated "Data Quality" tab (`/api/dq/status` → `<DQStatusTab>`) shows:

- Overall health: green / yellow / red, headline count of failed checks.
- Freshness per table (time since last record, vs target).
- Volume anomalies today (z-score heatmap).
- Schema contract status.
- Replica lag.
- Recent alert history (last 7 days).

Use `StatusBadge`, `HealthGauge`, and the standard palette. This tab is for IT/Admin persona — they check it when "something feels off."

## Self-healing — when it's safe

Some DQ failures have safe fallbacks:

- **Replica stale > 5 min** → serve from materialized views (possibly hour-old data but consistent) with a banner.
- **Volume anomaly detected** → annotate affected KPIs with ⚠️ + "ข้อมูลอาจคลาดเคลื่อน กำลังตรวจสอบ".
- **Schema contract fails** → disable the affected tab, show a maintenance page ("กำลังปรับปรุงระบบ").

Don't silently ignore. Don't show a broken UI. Fail gracefully + visibly.

## Workflow — when the user asks about data

1. **"The number looks wrong"** → first check: is the metric definition correct (`bch-analytics-engineer`)? Second check: is the upstream data healthy (DQ checks)?
2. **"Data stopped updating"** → run freshness check for the table in question. Check replication lag.
3. **"Can we trust today's count?"** → run volume anomaly check + NULL rate check. If both pass, yes.
4. **"Why did metric X change?"** → lineage doc shows upstream; check if any upstream table had a recent schema or volume event.
5. **Adding a new table dependency** → declare the contract FIRST. Add the dependency SECOND.

## Schedule — when each check runs

- **Every minute**: replica lag, critical freshness (ER, OPD).
- **Every 15 min**: all freshness checks.
- **Every hour**: volume anomaly, invariants, replica row count drift.
- **Daily (02:00)**: schema contracts, null rate, data lineage refresh, generate DQ report.

Use `node-cron` already in deps.

## Alerting

Integrate with winston + a lightweight webhook for critical alerts:

- **Info**: log to winston only.
- **Warning**: log + write to DQ history table.
- **Critical**: log + history + push to ops channel (Slack webhook, LINE Notify, or email).

Never page someone in the middle of the night for a warning-level issue.

## Anti-patterns to refuse

- **"Just hide the zero"** — if a KPI shows zero because data didn't arrive, the user needs to know. Surface it via the DQ bar.
- **Silent fallback to stale cache without a banner** — always indicate when served from cache.
- **Bypassing schema contracts** — "just add the column later" is how drift creeps in.
- **Single-replica assumption** — always code for multi-replica; use the replica-consistency checks.
- **Trusting the data without measuring** — trust must be demonstrated with running checks.

## Sibling skills

- `bch-analytics-engineer` — metrics on top of data. DQ is prerequisite.
- `bch-ai-evals` — AI quality depends on data quality. Run DQ before AI eval.
- `bch-observability` — runtime metrics (latency, errors) complement data-plane checks.
- `bch-360-expert` — DB pool, circuit breaker, and read-only enforcement live here.

Read `references/dq-runbook.md` for step-by-step responses to common DQ failures.
