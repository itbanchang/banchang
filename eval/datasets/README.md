# Golden Datasets

For classification / forecast AI modules, collect ground-truth examples here in JSON.

## Expected shape

```json
{
  "module": "readmission",
  "version": 1,
  "collected": "2026-04-23",
  "cases": [
    { "inputs": { "an": "...", "hn": "...", "features": {...} }, "actual": 1 },
    { "inputs": { "an": "...", "hn": "...", "features": {...} }, "actual": 0 }
  ]
}
```

## Why maintain static golden datasets on top of live DB evals?

- **Reproducibility**: re-running eval against the same cases isolates model changes from data drift.
- **Regression testing**: CI can run on the golden set on every push.
- **Edge case coverage**: clinicians curate adversarial cases the model should get right.

## How to generate one

1. Run an AI module over 30–90 days of discharges.
2. Label outcomes from the DB (e.g., readmission within 30 days = true).
3. Export cases as JSON. Scrub PII (hash `hn`, remove `cid`, bucket age).
4. Commit. Never commit raw PII to the repo.

A sample generator per module is the next addition (not implemented yet).
