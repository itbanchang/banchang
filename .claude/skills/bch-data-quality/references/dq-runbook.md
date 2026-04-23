# DQ Runbook — Responses to Common Failures

Read this when an alert fires or a user reports a data issue. Each section is a mini-playbook: symptom → triage → fix → post-mortem.

## 1. "Today's OPD count is zero"

**Symptom**: Dashboard shows 0 OPD visits, volume anomaly z-score < -5.

**Triage (5 min)**:

```bash
# Check freshness
node -e "
  require('dotenv').config();
  const mysql = require('mysql2/promise');
  const c = await mysql.createConnection({ host: process.env.MYSQL_HOST, user: process.env.MYSQL_USER, password: process.env.MYSQL_PASS, database: process.env.MYSQL_DB });
  const [r] = await c.query('SELECT MAX(CONCAT(vstdate,\" \",vsttime)) AS latest FROM ovst');
  console.log('Latest OPD row:', r[0].latest);
"
```

Three likely causes:

1. **Replication stopped** → `SHOW SLAVE STATUS` on replica. If `Slave_IO_Running: No`, restart replication (requires HOSxP DBA — escalate).
2. **Clinic genuinely didn't open** → check `holiday` table for today. Holidays are 0 OPD.
3. **Registration system outage at HOSxP** → check with HOSxP operations team.

**Fix**: if replication, call HOSxP. If outage, disable the "today" KPIs and show maintenance banner. If holiday, annotate and move on.

**Post-mortem**: if replication silently stopped, add an alert at 5-min lag threshold so next time it pages.

## 2. "IPD readmission rate spiked from 8% to 25%"

**Symptom**: readmission KPI shows dramatic jump with no clinical explanation.

**Triage**:

```sql
-- Are there duplicate admits?
SELECT hn, an, regdate, COUNT(*)
FROM ipt WHERE regdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
GROUP BY hn, an, regdate HAVING COUNT(*) > 1;

-- Is the metric formula using the right self-join?
-- Check lineage: server/metrics/ipd/readmission30d.js

-- Has discharge date logic changed? NULL → 0 in some joins?
SELECT COUNT(*) FROM ipt
WHERE regdate >= DATE_SUB(CURDATE(), INTERVAL 60 DAY) AND dchdate IS NULL;
```

**Most common cause**: a metric formula change picked up NULL `dchdate` as a readmission (anything after NULL evaluates weird). Check recent git log for changes to the readmission metric.

**Fix**: pin the metric back to the working version, add regression test.

## 3. "ER queue is empty but the hospital is full"

**Symptom**: ER tab shows no patients waiting; nursing staff confirms queue is full.

**Triage**:

```sql
-- Is er_regist fresh?
SELECT MAX(register_time), COUNT(*) FROM er_regist
WHERE register_time >= DATE_SUB(NOW(), INTERVAL 1 HOUR);

-- Are the filter conditions too strict?
-- Check route: server/routes/er.js → look for WHERE clauses
```

**Likely cause**: an `ovstost IS NULL` filter in the route excludes patients with an in-progress outcome code. Over-filtering.

**Fix**: relax the filter to match the canonical "still here" logic from `server/metrics/opd/waitTime.js`.

## 4. "Revenue report is 30% lower than accounting's report"

**Symptom**: dashboard revenue != official finance report.

**Triage**: this is a metric-definition issue, not data quality directly. But DQ can help verify the source.

```sql
-- What's the dashboard's sum?
SELECT SUM(income) FROM vn_stat WHERE vstdate BETWEEN ? AND ?;

-- What's accounting's sum? Ask finance for their SQL.
-- Compare pttype filters, ovstost filters, date boundary (Oct-start vs Jan-start).
```

Common culprits:
- Fiscal year vs calendar year mismatch.
- Accounting excludes `pttype='cancel'` but dashboard doesn't (or vice versa).
- Accounting includes in-hospital pharmacy separately.

**Fix**: align the metric definition in `server/metrics/finance/revenue.js` with accounting's convention. Document the decision in the metric's description.

## 5. "Claude narrative mentions a number I don't see on the dashboard"

**Symptom**: Claude-generated summary says "OPD saw 412 visits" but dashboard shows 398.

**Triage**:

1. Run the factuality eval (`bch-ai-evals`) on the narrative — it should flag orphan numbers.
2. Check the timestamp: narrative might be from 2-hour-old cached output.
3. Check the prompt inputs — were they snapshot at a different time than the dashboard number?

**Fix**: either refresh the narrative or align the prompt inputs to the exact dashboard data. Add a "generated at" timestamp next to narratives.

## 6. "Replica drift > 100 rows on `ipt`"

**Symptom**: `verify_3servers.js` reports row count mismatch.

**Triage**:

```bash
node verify_3servers_deep.js
# Look at which replica is behind, and on which tables.
# Check Seconds_Behind_Master.
```

Common causes:
- Slave replication paused manually by DBA.
- Slave fell behind during a large batch load.
- One slave has a corrupted replication position.

**Fix**: coordinate with HOSxP DBA. Meanwhile, disable the affected replica in `server/db/mysql.js` (switch `MYSQL_SERVER` to a healthy one).

## 7. "Schema contract failed: ovst.new_column expected, not found"

**Symptom**: nightly DQ run reports a schema contract failure.

**Triage**: check whether the column was:
1. Intentionally removed by HOSxP (coordinate with DBA).
2. Renamed (match by position + type).
3. Truly missing due to replication issue.

**Fix**: if intentional, update the contract. If not, escalate.

Bonus: write contracts to be forward-compatible (accept superset of columns, not exact match).

## 8. "NULL rate on `opdscreen.bps` exceeded 15%"

**Symptom**: vitals missing for > 15% of OPD visits today.

**Triage**:

```sql
SELECT dep, COUNT(*) AS total, SUM(CASE WHEN bps IS NULL THEN 1 ELSE 0 END) AS null_bps
FROM opdscreen s JOIN ovst v ON s.vn = v.vn
WHERE v.vstdate = CURDATE()
GROUP BY dep;
```

Usually a specific clinic is the culprit. Could be:
- A specific nurse/station's routine changed.
- A device (blood pressure machine) broken at a clinic.
- Data entry process changed.

**Fix**: notify clinic lead. If chronic, adjust the NULL rate threshold for that clinic specifically.

## 9. "Materialized view is 26 hours old"

**Symptom**: MV-backed KPI shows yesterday's data.

**Triage**:

```bash
# Check MV status
curl -s http://localhost:4000/api/system/mv-status
```

Either:
- Cron refresh didn't run → check PM2 process for the refresher.
- Refresh SQL errored → check winston log for that job.
- Table lock held the refresh → check DB `SHOW PROCESSLIST`.

**Fix**: manually trigger refresh (`/api/system/mv-refresh?name=...`), then fix the underlying cron/error.

## 10. "Drug dispense data stopped 3 hours ago"

**Symptom**: `drug_receive` freshness check fails.

**Triage**: same as #1. Check pharmacy system status; pharmacy writes to HOSxP master, replica follows.

**Fix**: coordinate with pharmacy. If it's a pharmacy-side outage, show dashboard banner "ข้อมูลเภสัช ณ เวลา X" using the last known freshness timestamp.

## Escalation matrix

| Issue | Who | When |
|-------|-----|------|
| Replica lag > 5 min (business hours) | IT lead | Within 15 min |
| Schema contract failure | HOSxP DBA + IT lead | Within 1 hour |
| Data volume anomaly z > 4 | IT + clinic manager (if clinic-specific) | Within 30 min |
| Freshness SLO miss on ER (any time) | IT lead + nursing supervisor | Immediately |
| Freshness SLO miss on finance (off hours) | IT lead | Next business day |

## Preventive habits

- Daily: DQ dashboard review in morning huddle (30 seconds).
- Weekly: audit alert-to-acknowledge times.
- Monthly: re-examine freshness SLOs (maybe too strict / too loose).
- Quarterly: schema contract drift review with HOSxP DBA.
- After every incident: update this runbook.

A DQ culture isn't built in a sprint. It's a daily discipline.
