# BCH 360° — Metric Registry (Semantic Layer)

Single-source-of-truth for every KPI in the dashboard. One file per metric.

**Never inline KPI SQL in a route handler.** Import the metric and call `compute()`.

## Shape

Every metric exports:

```js
export const metric = {
  id, label: { th, en }, unit, format, dimensions,
  target, thresholds, benchmark, dataSource, calc,
  excludes, description: { th, en },
  owner, reviewed, strategy: 'computed' | 'materialized',
};
export async function compute(db, params) { ... }
```

See `opd/waitTime.js` for the canonical template.

## Directory

```
metrics/
├── index.js              registry loader
├── _shared.js            classify/format helpers
├── generate-docs.mjs     builds docs/metrics/index.html
├── opd/
├── ipd/
├── er/
├── finance/
├── clinical/
└── ncd/
```

## Usage in a route

```js
import { compute } from '../metrics/opd/waitTime.js';

router.get('/today', cached('opdToday', 60_000, async (req) => {
  const result = await compute({ dateRange: todayRange() });
  return { waitTime: result };
}));
```

## Governance

Every metric has an `owner` and `reviewed` date. DQ flags metrics with reviewed > 12 months old.

See skill `bch-analytics-engineer` for the full protocol.
