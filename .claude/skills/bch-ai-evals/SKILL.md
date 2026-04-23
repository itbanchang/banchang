---
name: bch-ai-evals
description: AI-quality / evaluation authority for BCH 360° Intelligence V.10. Use this skill AGGRESSIVELY whenever the user asks about AI accuracy, prediction quality, hallucination, Claude output validation, prompt engineering, prompt versioning, eval set design, ground-truth data, A/B testing of AI outputs, calibration monitoring, model drift, confidence score sanity, AI regression detection, or "is the AI actually working?". Triggers on eval, evaluation, accuracy, precision, recall, AUC, Brier, calibration, hallucination, ground truth, prompt engineering, prompt version, prompt test, AI quality, AI regression, shadow mode, A/B test. Complements `bch-360-expert` (AI engine patterns) and `bch-analytics-engineer` (metric definitions).
---

# BCH 360° — AI Evaluation

You are the AI quality authority. The project runs 11 AI modules plus Claude narratives. Without evaluation infrastructure, nobody knows whether a prompt change improved or regressed output. Clinicians stop trusting recommendations they can't verify.

This skill sets up the eval → measure → iterate loop. The goal: every AI output has a measurable quality score, every prompt change is tested against a held-out eval set, and drift is detected before clinicians notice.

## What goes wrong without evals

Real risks in this codebase right now:

- **Claude narratives can invent numbers.** The current `claudeNarrative.js` prompt tells Claude "ห้ามประดิษฐ์ตัวเลขที่ไม่มีใน input" — but nothing verifies the output obeys that.
- **Calibration can drift.** `calibrate('xxx', rawScore, features)` is a placeholder — real calibration needs historical outcomes.
- **Prompt edits are unversioned.** Someone changes the system prompt to get a nicer narrative, and three modules silently regress.
- **Prediction modules have no ground truth.** NEWS2 predicts sepsis risk, but was that prediction right 48 hours later? Nobody's checking.

## Eval types — pick the right one for the AI task

### Type 1: Classification / Risk Scoring (readmission, sepsis, no-show, denial)

**Metrics**: accuracy, precision, recall, F1, ROC-AUC, **Brier score** (calibration), **Expected Calibration Error (ECE)**.

Ground truth: look back 30–90 days. What did the model say? What actually happened?

```js
// eval/classification.js
import { analyzeReadmission } from '../server/ai/readmissionEngine.js';
import { dbQuery } from '../server/db/mysql.js';

export async function evalReadmission({ lookbackDays = 90 } = {}) {
  // 1. Get historical admits from N days ago
  const admits = await dbQuery(`
    SELECT an, hn, regdate, dchdate, dchtype
    FROM ipt
    WHERE dchdate BETWEEN DATE_SUB(CURDATE(), INTERVAL ? DAY)
                      AND DATE_SUB(CURDATE(), INTERVAL ? DAY)
  `, [lookbackDays, lookbackDays - 30]);

  // 2. For each, compute what the model WOULD have predicted at discharge time
  const predictions = [];
  for (const a of admits) {
    const predicted = await analyzeReadmission({ hn: a.hn, atDate: a.dchdate });
    const actualReadmit = await didReadmitWithin30Days(a.hn, a.dchdate);
    predictions.push({
      predicted_score: predicted.score,
      predicted_label: predicted.score > 0.5 ? 1 : 0,
      actual: actualReadmit ? 1 : 0,
    });
  }

  // 3. Compute metrics
  return {
    n: predictions.length,
    accuracy: accuracy(predictions),
    precision: precision(predictions),
    recall: recall(predictions),
    auc: rocAuc(predictions),
    brier: brierScore(predictions),
    ece: expectedCalibrationError(predictions, 10),  // 10 bins
  };
}
```

**Target thresholds** (domain-appropriate):
- Readmission: AUC ≥ 0.75, ECE ≤ 0.05
- Sepsis: recall ≥ 0.90 at precision ≥ 0.30 (catch most true positives even at the cost of false alarms)
- No-show: AUC ≥ 0.70, calibration within ±0.03 across bins

### Type 2: Forecasting (revenue, bed demand, ER surge)

**Metrics**: MAPE (mean absolute percent error), sMAPE (symmetric), directional accuracy, coverage of confidence intervals.

```js
export async function evalRevenueForecast({ fiscalYear = 2568 } = {}) {
  const forecast = await forecastRevenue({ year: fiscalYear });
  const actual = await actualRevenueByMonth(fiscalYear);

  const errors = forecast.months.map((f, i) => {
    const a = actual[i];
    return {
      month: f.month,
      forecast: f.value,
      actual: a,
      ape: Math.abs(f.value - a) / a,
      inCi: a >= f.lower && a <= f.upper,
    };
  });

  return {
    mape: mean(errors.map(e => e.ape)),
    ciCoverage: errors.filter(e => e.inCi).length / errors.length,  // should be ~0.95 for 95% CI
    directionalAccuracy: directionalMatch(forecast, actual),
  };
}
```

**Targets**: MAPE ≤ 10% for monthly revenue; CI coverage within [0.90, 0.98] for a 95% CI.

### Type 3: Claude narratives (quality + factuality)

This is the hardest category. Narratives are free text; "quality" isn't a single number.

Test dimensions:

1. **Factuality**: does the narrative cite ONLY numbers that appear in the input?
2. **Completeness**: does it cover all salient features (top 3 drivers, suggested actions)?
3. **Length**: within budget (executive summaries ≤ 200 words; per-patient ≤ 80 words).
4. **Tone**: clinical + Thai + non-alarmist.

Automated checks:

```js
// eval/narrative.js
export async function evalNarrative(moduleId, inputs) {
  const output = await generateNarrative(moduleId, inputs);
  return {
    factuality: checkNumbersMatch(output.text, inputs),  // see below
    length_words: wordCount(output.text),
    has_action: /(แนะนำ|ควร|ต้อง|recommend|should)/.test(output.text),
    has_hallucinated_entity: detectHallucinatedEntities(output.text, inputs),
    language: detectLanguage(output.text),  // should be 'th' for most
    passes: output.source === 'claude' || output.source === 'rule-based',
  };
}

function checkNumbersMatch(text, inputs) {
  const numbersInText = [...text.matchAll(/[\d,]+\.?\d*/g)].map(m => Number(m[0].replace(/,/g, '')));
  const allowedNumbers = collectNumbersFromInputs(inputs);  // recursive
  const orphans = numbersInText.filter(n => !allowedNumbers.some(a => closeEnough(n, a)));
  return {
    pass: orphans.length === 0,
    orphanNumbers: orphans,  // numbers Claude "invented"
  };
}
```

The hallucination detector is the single most valuable eval — it catches Claude making up patient counts or percentages. Run it on every narrative in CI.

### Type 4: Recommendation relevance

Each AI module's `actions` array should be rated:
- Is it actionable (clinician can act within shift)?
- Is it specific (names protocol/person/bed, not "consider escalation")?
- Is it safe (doesn't contradict standing orders)?

Manual review sample — 50 per module per quarter. No good automated proxy yet.

## Eval set structure — the directory

```
eval/
├── datasets/
│   ├── readmission_golden.json     (100–500 labelled admits)
│   ├── sepsis_golden.json          (50–200 vitals traces)
│   ├── revenue_golden.json          (36 months historical forecast/actual)
│   └── narrative_prompts.json       (20 fixed inputs per module)
├── runners/
│   ├── classification.js
│   ├── forecast.js
│   ├── narrative.js
│   └── index.js                     (runs all, writes JSON)
├── reports/
│   ├── YYYY-MM-DD_HHMMSS.json       (per-run snapshot)
│   └── latest.html                  (dashboard)
└── fixtures/
    └── prompts/                     (versioned prompt snapshots)
```

Run via `npm run eval`. Writes a report. CI can fail the build if any metric regresses > N% vs baseline.

## Prompt versioning — the hygiene practice

Every prompt change bumps a version tag. Store prompts in dedicated files, not inline:

```
server/ai/prompts/
├── revenueForecast.v1.2.ts
├── revenueForecast.v1.3.ts          (current — referenced by code)
├── newsNarrative.v2.0.ts
└── _archive/
    └── revenueForecast.v1.1.ts      (historical)
```

The active prompt is imported by the engine. When you change it, copy → new version → update import. Eval results are tagged with prompt version — you can see "v1.3 improved MAPE by 1.2pp vs v1.2".

## A/B testing harness — shadow mode

For high-stakes changes (new sepsis model, new prompt), run BOTH old and new for a period, log both outputs, compare outcomes. Do not flip production traffic without a shadow period.

```js
// server/ai/shadowRunner.js
export async function runShadow(moduleId, inputs) {
  const [prod, candidate] = await Promise.all([
    runProd(moduleId, inputs),
    runCandidate(moduleId, inputs),
  ]);
  await logShadow(moduleId, { inputs, prod, candidate, ts: Date.now() });
  return prod;  // production path only; candidate is logged-only
}
```

After 2 weeks: analyze the log. If candidate passes evals + doesn't flip-flop agreement with prod, promote.

## Drift detection — monitoring in production

For each deployed AI module, compute weekly:
- Distribution of `score` outputs (histogram).
- Distribution of `confidence`.
- Rate of `actions.urgency = critical`.

Compare to a 30-day rolling baseline (2σ threshold). When a dimension shifts > 2σ, alert. This catches:
- Input data changes upstream (HOSxP schema drift, see `bch-data-quality`).
- Model miscalibration after a prompt edit.
- Feature code regression.

```js
// server/ai/drift.js
export async function checkDrift(moduleId) {
  const today = await dailyDistribution(moduleId, 1);
  const baseline = await rollingBaseline(moduleId, 30);
  const zScores = {
    meanScore: zScore(today.meanScore, baseline.meanScore, baseline.stdScore),
    pctCritical: zScore(today.pctCritical, baseline.meanPctCritical, baseline.stdPctCritical),
  };
  if (Math.abs(zScores.meanScore) > 2 || Math.abs(zScores.pctCritical) > 2) {
    alert(`AI drift detected on ${moduleId}`, zScores);
  }
}
```

## Ground-truth capture — the missing foundation

`server/ai/learningCapture.js` exists as a stub. Turn it on:

```js
// When an AI makes a prediction
captureOutcome(moduleId, {
  inputs,
  prediction,
  ts: Date.now(),
});

// Later, when outcome is known (e.g., did the patient readmit?)
linkOutcome(predictionId, { actual: true, outcomeTs: Date.now() });
```

Store in sidecar SQLite (HOSxP is read-only per `bch-360-expert`). Schema:

```sql
CREATE TABLE ai_predictions (
  id INTEGER PRIMARY KEY,
  module_id TEXT NOT NULL,
  inputs_json TEXT NOT NULL,
  prediction_json TEXT NOT NULL,
  prompt_version TEXT,
  predicted_at INTEGER NOT NULL,
  actual_json TEXT,
  outcome_at INTEGER
);
CREATE INDEX idx_module_predicted ON ai_predictions(module_id, predicted_at);
```

Backfill: run predictions historically against the last 90 days of discharges — you have the ground truth already.

## Workflow — when the user asks about AI quality

1. **Classify the task**: classification / forecast / narrative / recommendation?
2. **Check if an eval set exists** in `eval/datasets/`. If not, the first task is building one.
3. **Run the relevant eval** via `npm run eval -- --module=<id>`.
4. **Interpret the result** against the target thresholds above.
5. **If a prompt change is proposed**: run eval on both old and new prompt, show the delta. Refuse to merge if a critical metric regresses.
6. **If drift is reported**: check input data health (→ `bch-data-quality`) before blaming the AI.

## Anti-patterns to refuse

- **"Trust me, the output looks better"** — not without eval numbers.
- **Prompt changes without version bump** — unversioned prompts are un-auditable.
- **Production flip without shadow** — for any high-stakes module (sepsis, mortality, DRG), shadow first.
- **Eval on training data** — always hold out. For time-series, train on t < T, eval on T ≤ t < T+k.
- **Precision 99% for sepsis** — if you're optimizing precision at the cost of recall, you're letting sepsis through. Recall first, precision second.
- **Claude narrative without hallucination check** — every production call should hit the factuality check at least at the eval stage.

## Sibling skills

- `bch-360-expert` for AI engine architecture (`references/ai-insights-builder.md`).
- `bch-analytics-engineer` for metric definitions feeding AI inputs.
- `bch-data-quality` for upstream data checks (no eval on corrupt data).
- `bch-observability` for production drift monitoring dashboards.

Read `references/eval-recipes.md` for specific module-by-module eval implementations.
