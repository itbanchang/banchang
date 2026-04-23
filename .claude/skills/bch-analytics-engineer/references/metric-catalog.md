# Metric Catalog — Initial 23 Metrics

Read this when creating a new metric or auditing an existing one. Each entry lists the canonical definition and the traps to avoid.

## OPD (6)

### opd.waitTime.avgTotalMinutes
End-to-end mean wait. `TIMESTAMPDIFF(MINUTE, arrival, completion)`. Exclude `ovstost IN ('61','89','54')` (referral/admit/cancelled). Per-stage variants: `waitToScreen` (arrival → service1), `screenToDoctor` (service1 → service2), `doctorToPharmacy` (service2 → service7). Completion = `COALESCE(rcpt_print.bill_time, opd_service.service7)`. Target 40 min.

### opd.throughput.visitsPerHour
Count of completed visits per hour. Denominator = clinic open hours (not elapsed wall time). Target 15–25/hr per clinic peak.

### opd.dropout.rate
% of arrivals that never reach `opd_service.service1`. Counts only visits with `TIME_TO_SEC(vsttime) < TIME_TO_SEC(CURTIME()) - 7200` (gave up after 2 hours). Target < 2%.

### opd.sla.percent
% of visits completing within 60 min total. Target ≥ 85%.

### opd.dpi.compositeScore
Composite 0–100: SLA×30% + WaitScore×25% + ThroughputScore×25% + (100−Dropout)×20%. WaitScore interpolates 100@0min → 0@120min. ThroughputScore = min(100, throughput/30*100). Target ≥ 80.

### opd.revisit.rate
% of today's visits where same HN had a visit in last 7 days. Target < 15% (high = unresolved complaints or medication issues).

## IPD (5)

### ipd.los.averageDays
`AVG(DATEDIFF(dchdate, regdate))` where `dchdate IS NOT NULL`. Per DRG band (adjrw deciles) and per ward. Target depends on DRG — use DRG-adjusted expected LOS. Plain AVG is misleading across casemix.

### ipd.readmission30d.rate
Same-HN re-admission within 30 days of previous discharge. Join `ipt i1` to itself where `i2.regdate > i1.dchdate AND i2.regdate <= DATE_ADD(i1.dchdate, INTERVAL 30 DAY)`. Denominator = distinct admits dc'd 30–60 days ago (have had time to readmit). Target < 10%.

### ipd.occupancy.percent
Active admits (regdate <= today, dchdate IS NULL OR dchdate >= today) ÷ total beds per ward. Use `ward.bed_count` from HOSxP. Target 70–85% (over 90% = no surge capacity, under 60% = underutilisation).

### ipd.adjrw.sum
`SUM(COALESCE(i.adjrw, a.rw, 0))` from `ipt i LEFT JOIN an_stat a`. Excludes `ward='06'` (newborn) per hospital convention. Used for DRG payment projections.

### ipd.cmi.caseMixIndex
`AVG(COALESCE(i.adjrw, a.rw))` where rw > 0. Higher = sicker patient mix = more reimbursement per admit. Trend over time per ward.

## ER (4)

### er.timeToDoctor.minutes
`TIMESTAMPDIFF(MINUTE, register_time, seen_by_doctor_time)`. By triage level. Target: triage 1 ≤ 1 min, triage 2 ≤ 15 min, triage 3 ≤ 30 min, triage 4–5 ≤ 60 min.

### er.boarding.hours
Time from "admit decision" to "ward bed available" for ER→IPD transitions. Target ≤ 4 hours; over 6 = crisis.

### er.leftWithoutSeen.rate
% of ER arrivals who departed before being seen. Proxy via `er_regist` rows with no linked service times. Target < 1%.

### er.surge.status
Current ER census ÷ ER bed count. Status: ok (<80%), warning (80–120%), surge (>120%). Drives the surge-alert banner.

## Finance (6)

### finance.revenue.total
`SUM(vn_stat.income)` — the conventional revenue number. Per fiscal year (Oct-Sep). Use `helpers/fiscal.js` for the date math.

### finance.denialRate.percent
% of claims with `remain_money > 0` after 60 days. Narrower: % of claims DENIED (not outstanding — need claim status from `ipd_billing` if available). Target < 5%.

### finance.underCharging.amount
Billable services documented but not billed. Joins `opitemrece` to the canonical service catalog and flags missing line items. Owned by Medical Record Audit tab.

### finance.arBalance.total
`SUM(vn_stat.remain_money)` where `remain_money > 0`. Aged into 0–30 / 31–60 / 61–90 / 90+ buckets.

### finance.collectionRate.percent
`SUM(income - remain_money) ÷ SUM(income)` for a period. Target ≥ 95%.

### finance.yoyGrowth.percent
`(current_FY - previous_FY_same_period) ÷ previous_FY_same_period × 100`. Report at YTD and monthly granularity.

## Clinical (3)

### clinical.news2.distribution
Distribution of latest NEWS2 per active IPD patient: low (0–2), medium (3–4), high (5–6), critical (7+). Recomputed on every vitals update. Alert threshold: any critical unseen for > 15 min.

### clinical.sepsisBundle.compliance
% of SIRS/qSOFA+ patients who received the 1-hour bundle (lactate, blood culture, broad-spectrum abx, fluids). Target ≥ 90%. Gap analysis surfaced via the Clinical tab.

### clinical.mortalityRisk.highPatientCount
Active admits with calibrated mortality risk > 0.20 (from `sepsisEngine` or equivalent). Used for morning rounds prioritisation.

## NCD (2)

### ncd.goalAttainment.rate
Per disease cluster (DM, HT, IHD, Stroke, COPD, CKD), % of tracked patients meeting clinical goals in the last visit:
- DM: HbA1c ≤ 7 (or individualised)
- HT: SBP < 140 AND DBP < 90
- IHD: on statin + ASA
- Stroke: secondary prevention regimen
- COPD: smoking cessation documented
- CKD: eGFR slope stable or improving

### ncd.hba1cControl.averagePercent
Mean HbA1c of tracked DM patients. Target ≤ 7.0. Trend monthly.

## Common pitfalls across metrics

### Fiscal year boundaries
Thai fiscal year is Oct 1 → Sep 30. `helpers/fiscal.js` has the canonical conversion. Never hardcode `'2024-10-01'`.

### NULL vs zero
`dchdate IS NULL` means "still admitted", NOT "discharged on day 0". Filter explicitly in every IPD metric.

### Ward `'06'` (newborn)
Excluded from LOS / CMI / AdjRW by convention — newborns skew everything. Include explicitly only for perinatal-specific metrics.

### Double-counting on self-join
Readmission queries self-join `ipt`. Use `DISTINCT i1.an` in aggregates or the count doubles.

### `rcpt_print.bill_time` vs `opd_service.service7`
Not all visits have both. Use `COALESCE(rcpt_print.bill_time, opd_service.service7)` for completion time. Order matters: billing is usually the last event; pharmacy dispense is earlier.

### `ovstost` codes
- `01`-`05`: routine outcomes (completed, referred to specialist in-house, etc.)
- `54`: admit to IPD
- `61`: direct admit
- `89`: referred out
- `99`: other completed
- `00`, `98`: still open / in-progress
- NULL: legacy or in-progress

Most analytics EXCLUDE `ovstost IN ('54','61','89')` because these are patient-transferred, not wait-complete.

### `pttype` normalization
Raw `pttype` codes are a mess across eras of HOSxP. Normalize to categories (UC, CSMBS, SSO, PRIVATE, FOREIGN, OTHER) via a helper. Don't group by raw code in KPI outputs.

### Time zone
Server is Asia/Bangkok. `mysql2` uses `dateStrings: true` in `server/db/mysql.js`, so dates come back as strings without UTC conversion. DO NOT wrap them in `new Date()` without first appending `+07:00` or you'll drift 7 hours.

### Holiday classification
The `holiday` table in HOSxP flags hospital holidays. Some metrics (throughput, staffing) need to compare weekday vs weekend vs holiday separately — use the helper, don't compute DAYOFWEEK alone.

## Template: a new metric in 5 minutes

```bash
# 1. Create the file
touch server/metrics/<category>/<name>.js

# 2. Fill the declaration (copy from SKILL.md example)
# 3. Add at least one usage in a route:
import { compute } from '../metrics/opd/waitTime.js';
const result = await compute(db, { dateRange: { start, end }, clinic });

# 4. Add to the auto-doc index (once the generator exists)
# 5. Add a unit test with fixture data
```

That's it. The point is a low-friction template so nobody is tempted to write inline SQL for a KPI ever again.
