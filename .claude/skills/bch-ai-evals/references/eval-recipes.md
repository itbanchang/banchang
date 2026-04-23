# Eval Recipes — Per-Module Implementations

Copy-ready eval recipes for each of the 11 AI modules. Each uses the same pattern: load ground truth → run model against historical inputs → compute metrics → compare to thresholds.

## Shared helpers

Put in `eval/lib/metrics.js`:

```js
export function accuracy(preds) {
  return preds.filter(p => p.predicted_label === p.actual).length / preds.length;
}

export function precision(preds) {
  const tp = preds.filter(p => p.predicted_label === 1 && p.actual === 1).length;
  const fp = preds.filter(p => p.predicted_label === 1 && p.actual === 0).length;
  return tp / (tp + fp) || 0;
}

export function recall(preds) {
  const tp = preds.filter(p => p.predicted_label === 1 && p.actual === 1).length;
  const fn = preds.filter(p => p.predicted_label === 0 && p.actual === 1).length;
  return tp / (tp + fn) || 0;
}

export function f1(preds) {
  const p = precision(preds), r = recall(preds);
  return (2 * p * r) / (p + r) || 0;
}

export function rocAuc(preds) {
  // Sort by predicted_score desc, compute area via trapezoid
  const sorted = [...preds].sort((a, b) => b.predicted_score - a.predicted_score);
  const pos = sorted.filter(p => p.actual === 1).length;
  const neg = sorted.length - pos;
  let tp = 0, fp = 0, auc = 0, prevFp = 0;
  for (const p of sorted) {
    if (p.actual === 1) tp++; else fp++;
    auc += (fp - prevFp) * tp;
    prevFp = fp;
  }
  return auc / (pos * neg) || 0;
}

export function brierScore(preds) {
  const sqErrs = preds.map(p => (p.predicted_score - p.actual) ** 2);
  return sqErrs.reduce((s, x) => s + x, 0) / preds.length;
}

export function expectedCalibrationError(preds, bins = 10) {
  // Bin by predicted_score, compute |mean_predicted - actual_rate| per bin
  const binned = Array.from({ length: bins }, () => []);
  for (const p of preds) {
    const idx = Math.min(bins - 1, Math.floor(p.predicted_score * bins));
    binned[idx].push(p);
  }
  let ece = 0;
  for (const b of binned) {
    if (b.length === 0) continue;
    const meanPred = b.reduce((s, p) => s + p.predicted_score, 0) / b.length;
    const actualRate = b.filter(p => p.actual === 1).length / b.length;
    ece += (b.length / preds.length) * Math.abs(meanPred - actualRate);
  }
  return ece;
}

export function mape(actuals, forecasts) {
  const n = actuals.length;
  return actuals.reduce((s, a, i) => s + Math.abs((a - forecasts[i]) / a), 0) / n;
}
```

## 1. NEWS2 — Early Warning

Already rule-based per NICE NEWS2 guidance. Eval is calibration check, not accuracy:

```js
// eval/runners/news2.js
export async function evalNEWS2() {
  const vitalsHistory = await dbQuery(`
    SELECT hn, vstdate, bps, bpd, pulse, temperature, rr, o2sat
    FROM opdscreen
    WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    AND rr IS NOT NULL AND o2sat IS NOT NULL
    LIMIT 1000
  `);

  const scores = vitalsHistory.map(v => calculateNEWS2(v).total_score);
  return {
    n: scores.length,
    distribution: bucket(scores, [0, 3, 5, 7]),
    meanScore: mean(scores),
    criticalRate: scores.filter(s => s >= 7).length / scores.length,
  };
}
```

Target: critical rate stays within 2σ of 30-day baseline. A sudden spike suggests either sicker patients or a bug in vitals parsing.

## 2. Revenue Forecast (Holt-Winters)

```js
export async function evalRevenueForecast() {
  // Walk-forward: forecast each of the last 6 months using only prior data
  const now = new Date();
  const errors = [];
  for (let i = 6; i >= 1; i--) {
    const cutoff = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const forecast = await forecastRevenue({ asOf: cutoff, horizon: 1 });
    const actual = await actualRevenueForMonth(cutoff);
    errors.push({
      month: monthKey(cutoff),
      forecast: forecast.value,
      lower: forecast.lower,
      upper: forecast.upper,
      actual,
      ape: Math.abs(actual - forecast.value) / actual,
      inCi: actual >= forecast.lower && actual <= forecast.upper,
    });
  }
  return {
    mape: mean(errors.map(e => e.ape)),
    ciCoverage: errors.filter(e => e.inCi).length / errors.length,
    details: errors,
  };
}
```

Target: MAPE ≤ 0.10, CI coverage in [0.90, 0.98].

## 3. Readmission Risk

Same-HN re-admit within 30 days of discharge.

```js
export async function evalReadmission() {
  // Admits discharged 30–60 days ago (had time to readmit)
  const admits = await dbQuery(`
    SELECT an, hn, regdate, dchdate, ward, pdx
    FROM ipt
    WHERE dchdate BETWEEN DATE_SUB(CURDATE(), INTERVAL 60 DAY)
                      AND DATE_SUB(CURDATE(), INTERVAL 30 DAY)
  `);

  const preds = [];
  for (const a of admits) {
    // Run model with features available AT DISCHARGE (no peeking forward)
    const pred = await analyzeReadmission({ an: a.an, asOf: a.dchdate });
    const readmitted = await dbQueryOne(`
      SELECT 1 FROM ipt
      WHERE hn = ? AND regdate > ? AND regdate <= DATE_ADD(?, INTERVAL 30 DAY)
      LIMIT 1
    `, [a.hn, a.dchdate, a.dchdate]);
    preds.push({
      predicted_score: pred.score,
      predicted_label: pred.score > 0.5 ? 1 : 0,
      actual: readmitted ? 1 : 0,
    });
  }

  return {
    n: preds.length,
    accuracy: accuracy(preds),
    auc: rocAuc(preds),
    brier: brierScore(preds),
    ece: expectedCalibrationError(preds, 10),
    readmitRate: preds.filter(p => p.actual === 1).length / preds.length,
  };
}
```

Targets: AUC ≥ 0.75, ECE ≤ 0.05, Brier ≤ 0.20.

## 4. Bed Demand Forecast

Predict next 7 days' IPD admissions per ward.

```js
export async function evalBedDemand({ ward = null } = {}) {
  // For each of the last 30 days: what did the model predict? What actually happened?
  const days = [...Array(30)].map((_, i) => new Date(Date.now() - (30 - i) * 86400000));
  const errors = [];
  for (const d of days) {
    const predicted = await forecastBedDemand({ asOf: d, horizon: 1, ward });
    const actual = await dbQueryOne(`
      SELECT COUNT(*) AS n FROM ipt WHERE regdate = ? ${ward ? 'AND ward = ?' : ''}
    `, ward ? [d, ward] : [d]);
    errors.push({
      date: d,
      forecast: predicted.value,
      actual: actual.n,
      ape: actual.n === 0 ? null : Math.abs(actual.n - predicted.value) / actual.n,
    });
  }
  const validErrors = errors.filter(e => e.ape != null);
  return {
    mape: mean(validErrors.map(e => e.ape)),
    directionalAccuracy: directionalMatch(errors),
    details: errors,
  };
}
```

Target: MAPE ≤ 0.15 at ward level, ≤ 0.10 at hospital level.

## 5. DRG Optimizer

Predict which admissions are candidates for DRG upcoding (legitimate — documentation catches all billable conditions).

```js
export async function evalDrgOptimizer() {
  // Use chart-audited admits as ground truth — they have audited DRG
  const audited = await dbQuery(`
    SELECT an, drg_code AS audited_drg, original_drg_code AS original_drg
    FROM drg_audit
    WHERE audited_at >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
      AND audited_drg != original_drg
  `);

  const preds = [];
  for (const a of audited) {
    const pred = await analyzeDrgOpportunity({ an: a.an });
    const wasLegitimateUpgrade = a.audited_drg !== a.original_drg;
    preds.push({
      predicted_score: pred.score,
      predicted_label: pred.score > 0.5 ? 1 : 0,
      actual: wasLegitimateUpgrade ? 1 : 0,
    });
  }

  return {
    precision: precision(preds),  // don't flag non-opportunities
    recall: recall(preds),        // catch opportunities
    auc: rocAuc(preds),
  };
}
```

Target: precision ≥ 0.80, recall ≥ 0.60. Better to miss some opportunities than falsely flag and waste coder time.

## 6. ER Surge Prediction

Predict next 4 hours' ER volume exceeding 120% capacity.

```js
export async function evalErSurge() {
  const hours = [...Array(24 * 7)].map((_, i) => new Date(Date.now() - (24 * 7 - i) * 3600000));
  const preds = [];
  for (const h of hours) {
    const pred = await predictErSurge({ asOf: h, horizonHours: 4 });
    const actualCensus = await dbQueryOne(`
      SELECT COUNT(*) AS n FROM er_regist
      WHERE register_time BETWEEN ? AND DATE_ADD(?, INTERVAL 4 HOUR)
        AND (depart_time IS NULL OR depart_time > DATE_ADD(?, INTERVAL 4 HOUR))
    `, [h, h, h]);
    const surge = actualCensus.n > ER_CAPACITY * 1.2;
    preds.push({
      predicted_score: pred.score,
      predicted_label: pred.score > 0.5 ? 1 : 0,
      actual: surge ? 1 : 0,
    });
  }
  return {
    accuracy: accuracy(preds),
    recall: recall(preds),   // missing a surge is worse than false alarm
    precision: precision(preds),
  };
}
```

Target: recall ≥ 0.85 (catch surges), precision ≥ 0.50 (acceptable alarm rate).

## 7. LOS Predictor

Predict length of stay at admission.

```js
export async function evalLos() {
  const admits = await dbQuery(`
    SELECT an, regdate, dchdate, ward, pdx, adjrw
    FROM ipt
    WHERE dchdate IS NOT NULL
      AND dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
      AND ward != '06'
  `);

  const errors = [];
  for (const a of admits) {
    const pred = await predictLos({ an: a.an, asOf: a.regdate });
    const actualLos = daysBetween(a.regdate, a.dchdate);
    errors.push({
      predicted: pred.value,
      actual: actualLos,
      ape: actualLos > 0 ? Math.abs(pred.value - actualLos) / actualLos : null,
    });
  }

  return {
    mape: mean(errors.filter(e => e.ape != null).map(e => e.ape)),
    mae: mean(errors.map(e => Math.abs(e.predicted - e.actual))),  // days
  };
}
```

Target: MAE ≤ 1.5 days, MAPE ≤ 0.25.

## 8. Billing Anomaly Detection

```js
export async function evalBillingAnomaly() {
  // Ground truth: flagged by finance audit review
  const audited = await dbQuery(`
    SELECT vn, is_anomaly FROM billing_audit
    WHERE audit_date >= DATE_SUB(CURDATE(), INTERVAL 60 DAY)
  `);
  const preds = [];
  for (const a of audited) {
    const pred = await detectBillingAnomaly({ vn: a.vn });
    preds.push({
      predicted_score: pred.score,
      predicted_label: pred.score > 0.5 ? 1 : 0,
      actual: a.is_anomaly,
    });
  }
  return { precision: precision(preds), recall: recall(preds), auc: rocAuc(preds) };
}
```

## 9. ER Admission Prediction

Predict on ER arrival whether the patient will be admitted to IPD.

```js
export async function evalErAdmission() {
  const erVisits = await dbQuery(`
    SELECT er.vn, er.register_time, er.triage_level, o.ovstost
    FROM er_regist er
    JOIN ovst o ON o.vn = er.vn
    WHERE er.register_time >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
  `);
  const preds = [];
  for (const v of erVisits) {
    const pred = await predictErAdmission({ vn: v.vn, asOf: v.register_time });
    const wasAdmitted = ['54', '61'].includes(v.ovstost);
    preds.push({
      predicted_score: pred.score,
      predicted_label: pred.score > 0.5 ? 1 : 0,
      actual: wasAdmitted ? 1 : 0,
    });
  }
  return { auc: rocAuc(preds), accuracy: accuracy(preds), brier: brierScore(preds) };
}
```

## 10. ER Wait Time Forecast

```js
export async function evalErWaitForecast() {
  // Hourly predictions vs actual wait
  const hours = recentHours(7 * 24);
  const errors = hours.map(async h => {
    const pred = await forecastErWaitTime({ asOf: h });
    const actual = await actualErMeanWait(h, h + 3600000);
    return { predicted: pred.value, actual, ape: Math.abs(pred.value - actual) / actual };
  });
  return { mape: mean((await Promise.all(errors)).map(e => e.ape)) };
}
```

## 11. Under-Charging Detection

```js
export async function evalUnderCharging() {
  // Ground truth: post-audit billing corrections
  const audited = await dbQuery(`SELECT vn, was_undercharged FROM billing_audit WHERE ...`);
  // (same pattern as #8)
}
```

## Narrative eval — factuality check

Runs against ALL Claude narrative modules:

```js
// eval/runners/narrative-factuality.js
export async function evalNarrativeFactuality(moduleId, fixtures) {
  const results = [];
  for (const f of fixtures) {
    const output = await generateNarrative(moduleId, f.inputs);
    const factCheck = checkNumbersMatch(output.text, f.inputs);
    results.push({
      fixture_id: f.id,
      pass: factCheck.pass,
      orphan_numbers: factCheck.orphanNumbers,
      word_count: wordCount(output.text),
    });
  }
  return {
    factuality_rate: results.filter(r => r.pass).length / results.length,
    total_orphans: results.flatMap(r => r.orphan_numbers),
  };
}
```

Target: factuality_rate ≥ 0.98. Anything below means Claude is inventing numbers — prompt needs tightening.

## Running the full eval suite

```bash
npm run eval                  # runs all; writes eval/reports/<timestamp>.json
npm run eval -- --module=readmission   # single module
npm run eval -- --compare-prompts     # runs prompt v1 vs v2 side-by-side
npm run eval -- --watch       # CI mode; fails if regressions > threshold
```

Add to `package.json`:

```json
{
  "scripts": {
    "eval": "node eval/runners/index.js",
    "eval:readmission": "node eval/runners/index.js --module=readmission",
    "eval:report": "node eval/lib/openReport.js latest.html"
  }
}
```

Run nightly via cron — always know the quality of yesterday's predictions.
