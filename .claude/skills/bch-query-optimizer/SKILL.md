---
name: bch-query-optimizer
description: SQL / HOSxP query tuning authority for BCH 360° Intelligence V.10. Use this skill AGGRESSIVELY whenever the user asks about slow queries, EXPLAIN plans, index usage, query rewrites, full table scans, missing indexes, MV (materialized view) design, JOIN order, covering indexes, MariaDB 5.x quirks, or "why is this endpoint slow?". Triggers on slow query, EXPLAIN, index, full table scan, JOIN, materialized view, MV, covering index, query plan, query cost, MariaDB, MySQL tuning, query rewrite, optimizer. Complements `bch-360-expert` (DB pool), `bch-data-quality` (upstream health), `bch-observability` (measure slowness).
---

# BCH 360° — Query Optimizer

You are the SQL performance authority. HOSxP XE is MariaDB 5.x (not MySQL 8) with decades of accumulated schema quirks. Most dashboard slowness traces back to a single unindexed scan on `ovst` or `opitemrece`. Your job: find the bad queries, rewrite them, and add materialized views where live computation can't be fast enough.

Dashboard latency = clinician annoyance = loss of trust. Hot endpoints must be p95 < 500ms; aggregate reports < 2s. Every slow query is a bug.

## MariaDB 5.x constraints you must remember

- No `WITH` (CTE) support before 10.2. Use subqueries or temp tables.
- `JSON` type weak/absent; store JSON as TEXT, parse in app.
- Window functions arrived in 10.2 — not guaranteed on 5.x. Use self-joins instead.
- `EXPLAIN EXTENDED` available; `EXPLAIN ANALYZE` may not be. Use `SHOW PROFILE` for timing.
- Collation `utf8_general_ci` vs `utf8mb4_thai_520_w2` — Thai sorting works, but don't mix collations across tables or implicit conversion kills indexes.
- `DATETIME` vs `TIMESTAMP`: HOSxP uses `DATE` + separate `TIME` columns (`vstdate`, `vsttime`), which forces `CONCAT(…, ' ', …)` for timestamp math and defeats index-range scans.
- Implicit int→string comparisons kill indexes. Always match types.

## The HOSxP index landscape

Typical indexes present in HOSxP XE (verify with `SHOW INDEX FROM …`):

```sql
SHOW INDEX FROM ovst;
-- Usually has: PRIMARY(vn), KEY(hn), KEY(vstdate), KEY(dep)
-- Rarely has: composite (vstdate, dep) or (hn, vstdate)

SHOW INDEX FROM ipt;
-- Usually: PRIMARY(an), KEY(hn), KEY(regdate), KEY(dchdate)

SHOW INDEX FROM opitemrece;
-- Usually: PRIMARY(vn, …), KEY(vstdate)

SHOW INDEX FROM opdscreen;
-- Often thin. Join via vn often does a scan.
```

You are READ-ONLY on HOSxP — you cannot add indexes. This is a fundamental constraint. Compensate via:

1. Rewriting queries to use existing indexes.
2. Materialized views refreshed nightly.
3. Filter pushdown (narrow the date range first, then join).

## The common slow patterns (and how to fix them)

### 1. `TIMESTAMPDIFF` over `CONCAT(date, ' ', time)` prevents index use

```sql
-- SLOW: index on vstdate is ignored
SELECT AVG(TIMESTAMPDIFF(MINUTE, CONCAT(vstdate, ' ', vsttime), CONCAT(vstdate, ' ', s.service7)))
FROM ovst o JOIN opd_service s ON s.vn = o.vn
WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);
```

Partial fix: push the date filter first:

```sql
-- Date filter uses vstdate index; TIMESTAMPDIFF is applied AFTER filtering
SELECT AVG(TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', o.vsttime), CONCAT(o.vstdate, ' ', s.service7))) AS avg_wait
FROM ovst o
JOIN opd_service s ON s.vn = o.vn
WHERE o.vstdate BETWEEN DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND CURDATE()
  AND s.service7 IS NOT NULL;
```

Key trick: the `BETWEEN` is explicit; the optimizer picks the index reliably. Avoid `DATE_SUB(CURDATE(), …)` in a way that might evaluate per row.

### 2. Self-join for readmission is O(n²) without proper filtering

```sql
-- SLOW: cartesian on 100K admits
SELECT i1.an, i2.an AS readmit_an
FROM ipt i1
JOIN ipt i2 ON i2.hn = i1.hn
            AND i2.regdate > i1.dchdate
            AND i2.regdate <= DATE_ADD(i1.dchdate, INTERVAL 30 DAY)
WHERE i1.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY);
```

Fix: narrow the outer first, ensure index on `hn`:

```sql
-- Pre-filter to recent dchdate; let index(hn) carry the self-join
SELECT i1.an, i2.an AS readmit_an, DATEDIFF(i2.regdate, i1.dchdate) AS days_to_readmit
FROM (
  SELECT an, hn, dchdate
  FROM ipt
  WHERE dchdate BETWEEN DATE_SUB(CURDATE(), INTERVAL 90 DAY) AND CURDATE()
    AND dchstat IN ('Home', 'Self')  -- exclude deaths, transfers
) i1
JOIN ipt i2 ON i2.hn = i1.hn
           AND i2.an != i1.an
           AND i2.regdate > i1.dchdate
           AND i2.regdate <= DATE_ADD(i1.dchdate, INTERVAL 30 DAY);
```

Measure: `EXPLAIN` should show `index` on `i1.dchdate` and `ref` on `i2.hn`. If it shows `ALL`, pool your hands off production.

### 3. `LEFT JOIN` everywhere eats memory

HOSxP queries tend to accrue LEFT JOINs "just in case." Each one is a work-table. For aggregates, convert to subqueries:

```sql
-- BLOATED: 5 LEFT JOINs, temp table thrash
SELECT o.vn, o.pdx, MAX(x.order_date) AS last_xray, MAX(l.order_date) AS last_lab, SUM(r.sum_price) AS billed
FROM ovst o
LEFT JOIN xray_head x ON x.vn = o.vn
LEFT JOIN lab_head  l ON l.vn = o.vn
LEFT JOIN opitemrece r ON r.vn = o.vn
WHERE o.vstdate = CURDATE()
GROUP BY o.vn;

-- LEANER: correlated subqueries only when needed
SELECT o.vn, o.pdx,
  (SELECT MAX(order_date) FROM xray_head WHERE vn = o.vn) AS last_xray,
  (SELECT MAX(order_date) FROM lab_head  WHERE vn = o.vn) AS last_lab,
  (SELECT SUM(sum_price)  FROM opitemrece WHERE vn = o.vn) AS billed
FROM ovst o
WHERE o.vstdate = CURDATE();
```

Correlated subqueries can be slower than joins in some optimizers — `EXPLAIN` both and pick. MariaDB 5.x is inconsistent on this.

### 4. `IN (subquery)` vs `JOIN` vs `EXISTS`

HOSxP tables with millions of rows: `IN (SELECT …)` often becomes a full scan; `EXISTS` with correlated `WHERE` usually better.

```sql
-- SLOW
SELECT hn, firstname FROM patient
WHERE hn IN (SELECT hn FROM ipt WHERE regdate = CURDATE());

-- FAST
SELECT p.hn, p.firstname FROM patient p
WHERE EXISTS (SELECT 1 FROM ipt WHERE hn = p.hn AND regdate = CURDATE() LIMIT 1);
```

Or a JOIN:

```sql
SELECT p.hn, p.firstname FROM patient p
JOIN ipt i ON i.hn = p.hn
WHERE i.regdate = CURDATE();
```

Always `EXPLAIN` to confirm.

### 5. `ORDER BY` with `LIMIT` can force sort without index

```sql
-- Potentially SLOW: if no index matches ORDER BY, filesort
SELECT vn, hn, vstdate FROM ovst
WHERE dep = '001'
ORDER BY vstdate DESC LIMIT 20;
```

`EXPLAIN`: if `Using filesort`, add a composite index (can't — HOSxP read-only). Alternatives:
- Materialized view with pre-sorted/indexed data.
- Narrower WHERE (`WHERE dep = '001' AND vstdate >= CURDATE()`).

### 6. Aggregates over wide ranges — materialize

Monthly aggregates across 2+ years of OPD = millions of rows. Never run on hot path. Materialize nightly:

```sql
-- Refreshed nightly to bch_meta.mv_opd_monthly
CREATE TABLE mv_opd_monthly AS
SELECT DATE_FORMAT(vstdate, '%Y-%m') AS month,
       dep,
       COUNT(*) AS visits,
       SUM(CASE WHEN ovstost IN ('54','61') THEN 1 ELSE 0 END) AS admits,
       AVG(CASE WHEN s.service7 IS NOT NULL
                THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', o.vsttime), CONCAT(o.vstdate, ' ', s.service7))
           END) AS avg_wait
FROM ovst o LEFT JOIN opd_service s ON s.vn = o.vn
WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 3 YEAR)
GROUP BY DATE_FORMAT(vstdate, '%Y-%m'), dep;
```

Serve monthly/yearly reports from MV. Hot today-KPIs compute live on a small window.

## Materialized view design — the architecture

MVs live in the sidecar DB (better-sqlite3) per `bch-360-expert` (HOSxP is read-only). Refreshed by cron jobs.

```
server/db/mv/
├── mv_opd_monthly.js
├── mv_opd_daily_summary.js
├── mv_ipd_monthly_adjrw.js
├── mv_revenue_monthly.js
├── mv_ncd_goal_attainment.js
└── _refresher.js     (shared cron scheduler)
```

Each MV declares:

- Query against HOSxP (read-only).
- Target sidecar table schema.
- Refresh schedule (usually nightly 02:00).
- Invalidation triggers (if any — usually just time-based).

```js
// server/db/mv/mv_opd_monthly.js
export const mv = {
  name: 'mv_opd_monthly',
  sourceQuery: `
    SELECT DATE_FORMAT(vstdate, '%Y-%m') AS month, dep,
           COUNT(*) AS visits, ...
    FROM ovst o LEFT JOIN opd_service s ON s.vn = o.vn
    WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 3 YEAR)
    GROUP BY DATE_FORMAT(vstdate, '%Y-%m'), dep
  `,
  targetSchema: `
    CREATE TABLE IF NOT EXISTS mv_opd_monthly (
      month TEXT NOT NULL, dep TEXT NOT NULL,
      visits INTEGER NOT NULL, avg_wait REAL,
      refreshed_at INTEGER NOT NULL,
      PRIMARY KEY (month, dep)
    )
  `,
  schedule: '0 2 * * *',   // cron: nightly 2 AM
};
```

A refresher cron reads source → writes target; logs duration + row count. `getMV('mv_opd_monthly')` in route handlers reads from sidecar.

## Profiling toolkit

### `EXPLAIN` basics

```sql
EXPLAIN SELECT ...;
-- Look for:
-- type: const / eq_ref / ref / range (good) vs ALL (bad)
-- rows: estimated row count — large = problem
-- Extra: "Using index" (good, covering), "Using where" (ok), "Using filesort" / "Using temporary" (bad)
```

### `SHOW PROFILE` for timing

```sql
SET profiling = 1;
SELECT ...;
SHOW PROFILES;
SHOW PROFILE FOR QUERY <n>;
-- Breaks down time per phase: sending data, sorting result, etc.
```

### `SHOW STATUS` for aggregate

```sql
SHOW STATUS LIKE 'Handler_read%';
SHOW STATUS LIKE 'Handler_write%';
-- Compare before/after a query execution to see rows scanned vs used.
```

### Application-level: slow-query logging via winston

Every query in `server/db/mysql.js` can time itself:

```js
async function dbQuery(sql, params) {
  const start = Date.now();
  const [rows] = await pool.query(sql, params);
  const ms = Date.now() - start;
  if (ms > 1000) logger.warn('slow_query', { sql: sql.slice(0, 80), ms });
  return rows;
}
```

Log the truncated SQL (don't log PII parameter values). Correlate with `bch-observability` metrics.

## Hot-path query checklist

For any query in a frequently-hit endpoint:

- [ ] `EXPLAIN` shows `type` ≠ `ALL` on every table.
- [ ] `WHERE` clause uses an indexed column with a selectable range.
- [ ] No `Using filesort` unless acceptable for the row count.
- [ ] Join order: small → large, filtered → joined.
- [ ] No `SELECT *` — explicit columns only (avoids wide row reads).
- [ ] No `LIKE '%prefix'` on large columns.
- [ ] Parameterized — no string concatenation.
- [ ] Runs in < 500ms on production DB (measured).

## Common rewrites that often help

| Pattern | Rewrite |
|---------|---------|
| `WHERE YEAR(col) = 2026` | `WHERE col BETWEEN '2026-01-01' AND '2026-12-31'` |
| `WHERE col LIKE '2026-%'` | `WHERE col BETWEEN '2026-01-01' AND '2026-12-31'` |
| `WHERE DATE(datetime_col) = CURDATE()` | `WHERE datetime_col >= CURDATE() AND datetime_col < CURDATE() + INTERVAL 1 DAY` |
| `OR` with different columns | `UNION ALL` of two indexed queries |
| `COUNT(DISTINCT col)` over large table | Pre-aggregate via MV |
| `SELECT …, (subquery)` repeated | `LEFT JOIN LATERAL` (not in 5.x) or app-side composition |
| `CAST(id AS CHAR) = '123'` | `id = 123` (match types, use index) |

## When to give up and materialize

Signs: even with rewrites, query is > 1s.

Rule: if a query runs > 10 times per day and takes > 500ms, materialize it. Storage is cheap, clinician patience isn't.

## Connection pool tuning

Already configured in `server/db/mysql.js`:

- `connectionLimit: 50` per worker.
- Semaphore at 50 concurrent (global).
- `connectTimeout: 5000`, `queueLimit: 100`.

Signs of pool stress:
- Request latency spikes without DB-side slowness.
- `poolActive` gauge (from `bch-observability`) pegged at 50.
- Timeout errors in winston.

Response: profile — are there N+1 queries? Can batch? Can MV?

## Anti-patterns to refuse

- **Full table scans on hot endpoints** — always fix before shipping.
- **Subquery-correlated on 10M-row tables** — materialize.
- **Adding `LIMIT 1000000` "just in case"** — if you need a bound, use an explicit date range.
- **Running a query you haven't `EXPLAIN`ed once in production** — pre-flight every new hot query.
- **Schema "fixes" to HOSxP** — it's read-only. Work around via MV or rewrite.
- **Ignoring logged slow queries** — they're the product's ticking timebomb.

## Sibling skills

- `bch-360-expert/references/performance-auditor.md` — one-off audits.
- `bch-observability` — query-duration histogram reveals outliers.
- `bch-data-quality` — confirm slowness isn't caused by data volume anomaly.
- `bch-analytics-engineer` — metrics registry should declare `strategy: computed` vs `materialized`.
