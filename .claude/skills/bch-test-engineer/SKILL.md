---
name: bch-test-engineer
description: Testing strategy authority for BCH 360° Intelligence V.10. Use this skill AGGRESSIVELY whenever the user asks about unit tests, integration tests, e2e tests, Vitest, Playwright, test coverage, snapshot testing, fixture design, synthetic data, CI integration, "add tests for X", "is this covered", test refactoring, or test flake. Triggers on test, testing, vitest, playwright, jest, coverage, snapshot, fixture, mock, stub, synthetic data, e2e, smoke, CI, GitHub Actions, flake. Complements `bch-ai-evals` (AI-specific evals) and `bch-360-expert` (module architecture).
---

# BCH 360° — Test Engineer

You are the testing strategy authority. A hospital dashboard cannot ship on "it worked on my laptop." Clinical decisions depend on this product — correctness is table stakes. Your job: design a test pyramid that catches regressions before they reach clinicians, without slowing the team with flakes.

## Testing pyramid — what to test at each layer

```
         [Manual / UAT]         <- smallest, human judgment
       [ Playwright e2e ]       <- critical flows only
     [  Integration (Vitest)  ] <- DB + route + engine
  [    Unit (Vitest) — core    ] <- pure functions, AI scoring
```

Ratio target (count, not time): ~70% unit / ~20% integration / ~10% e2e. Unit tests are cheap and fast; e2e tests are expensive and flaky — use them sparingly on critical paths only.

## Vitest — unit tests

Already installed (`vitest`, `@testing-library/react`, `@vitest/coverage-v8`). Used minimally. Expand.

### Pure AI engine testing (high ROI)

Every AI engine has pure scoring functions. Test those in isolation — no DB, no Claude.

```js
// tests/ai/ewsEngine.test.js
import { describe, it, expect } from 'vitest';
import { calculateNEWS2 } from '../../server/ai/ewsEngine.js';

describe('calculateNEWS2', () => {
  it('returns 0 score and low risk for normal vitals', () => {
    const r = calculateNEWS2({ rr: 16, o2sat: 98, bps: 120, pulse: 72, temperature: 36.8 });
    expect(r.total_score).toBe(0);
    expect(r.risk_level).toBe('low');
  });

  it('flags critical for severe vitals', () => {
    const r = calculateNEWS2({ rr: 26, o2sat: 90, bps: 85, pulse: 135, temperature: 35.0 });
    expect(r.total_score).toBeGreaterThanOrEqual(7);
    expect(r.risk_level).toBe('critical');
    expect(r.has_red_flag).toBe(true);
  });

  it('handles missing vitals gracefully', () => {
    const r = calculateNEWS2({});
    expect(r.total_score).toBe(0);
    expect(r.risk_level).toBe('low');  // by convention — missing is treated as low
  });

  // Boundary tests — every threshold
  it.each([
    [{ rr: 8, o2sat: 98, bps: 120, pulse: 72, temperature: 37 }, 3],  // rr ≤ 8 → 3 pts
    [{ rr: 12, o2sat: 98, bps: 120, pulse: 72, temperature: 37 }, 0], // normal range
    [{ rr: 21, o2sat: 98, bps: 120, pulse: 72, temperature: 37 }, 2], // rr 21-24 → 2 pts
  ])('scores RR boundary %j correctly', (vitals, expectedTotal) => {
    expect(calculateNEWS2(vitals).total_score).toBe(expectedTotal);
  });
});
```

Pattern: boundary testing for every threshold + happy path + missing data. Every threshold in every AI engine should have at least 3 test cases (below / at / above).

### Metric computation testing

For every metric in `server/metrics/`, test the calculation with fixture data:

```js
// tests/metrics/opd.waitTime.test.js
import { describe, it, expect, vi } from 'vitest';
import { compute } from '../../server/metrics/opd/waitTime.js';

vi.mock('../../server/db/mysql.js', () => ({
  dbQuery: vi.fn(),
}));

import { dbQuery } from '../../server/db/mysql.js';

describe('opd.waitTime.compute', () => {
  it('computes average wait from fixture rows', async () => {
    dbQuery.mockResolvedValueOnce([{ value: 45.6 }]);
    const result = await compute(null, { dateRange: { start: '2026-04-01', end: '2026-04-23' } });
    expect(result.value).toBeCloseTo(45.6);
    expect(result.status).toBe('warning');  // 45.6 > 40 target
  });
});
```

### Rule-based narrative testing

Fallback narrative (when Claude unavailable) should return a predictable, parseable string.

```js
import { buildForecastFallback } from '../../server/ai/claudeNarrative.js';

describe('buildForecastFallback', () => {
  it('includes headline, trend, and forecast values', () => {
    const n = buildForecastFallback(
      { trend_direction: 'increasing', yoy_growth: 8 },
      [{ month_name: 'ม.ค.', year: 2569, forecast: 12e6, lower: 10e6, upper: 14e6 }],
      { 1: 0.9, 7: 1.2 }
    );
    expect(n.headline).toContain('เพิ่มขึ้น');
    expect(n.trend_analysis).toContain('8%');
  });
});
```

### Component testing — targeted, not exhaustive

Use `@testing-library/react` for components with nontrivial logic (e.g., `KPICardV2` formatter, `DrillDownModal` state). Don't snapshot every tab — wasted effort.

```js
// tests/components/KPICardV2.test.jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import KPICardV2 from '../../src/components/KPICardV2.jsx';

describe('KPICardV2', () => {
  it('formats currency in THB compact', () => {
    render(<KPICardV2 title="รายได้" value={1_234_567} format="currency" color="green" />);
    expect(screen.getByText(/฿.*1\.2M/)).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<KPICardV2 title="ผู้ป่วย" value={100} loading={true} />);
    expect(screen.getByTestId('kpi-skeleton')).toBeInTheDocument();
  });

  it('renders trend arrow for positive trend', () => {
    render(<KPICardV2 title="รายได้" value={100} trend={8} />);
    const trendArrow = screen.getByRole('img', { hidden: true });
    expect(trendArrow).toHaveClass('text-emerald-500');
  });
});
```

## Integration tests — routes + DB

Use the existing smoke test (`scripts/smoke_test.mjs`) as baseline; expand to integration tests with supertest.

```js
// tests/integration/opd.test.js
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../../server/testApp.js';  // factory without PM2

let app;
beforeAll(async () => {
  app = await createApp({ mockDb: true, mockClaude: true });
});

describe('GET /api/opd/today', () => {
  it('returns 200 with expected shape', async () => {
    const res = await request(app).get('/api/opd/today').set('Authorization', 'Bearer <test-token>');
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      summary: expect.any(Object),
      hourly: expect.any(Array),
      generated_at: expect.any(Number),
    });
  });

  it('requires authentication', async () => {
    const res = await request(app).get('/api/opd/today');
    expect(res.status).toBe(401);
  });

  it('handles DB timeout with graceful error', async () => {
    const res = await request(app).get('/api/opd/today?simulate=timeout').set('Authorization', '...');
    expect(res.status).toBe(503);
    expect(res.body.error).toMatch(/timeout/i);
  });
});
```

To make this feasible: factor out the Express app creation into `server/testApp.js` that doesn't listen (returns `app`) and supports mocked DB / mocked Claude / in-memory better-sqlite3.

## Playwright — e2e tests

Already installed (`@playwright/test`). Existing tests minimal. Add critical-path coverage:

### Critical flows to cover

1. **Login → default tab loads**.
2. **Director morning-briefing flow**: open → 4 KPIs render → AIPanel shows → no errors in console.
3. **Clinical rounding flow**: IPD tab → ward list → click patient → DrillDownModal opens with data.
4. **Finance drill-down**: revenue KPI → modal → filter → export.
5. **ER surge alert**: mock backend event → AlertBanner appears → dismiss works.

```js
// e2e/morning-briefing.spec.js
import { test, expect } from '@playwright/test';

test('director can complete morning briefing in one view', async ({ page }) => {
  await page.goto('http://localhost:4001');
  await page.fill('[name="username"]', 'director');
  await page.fill('[name="password"]', process.env.TEST_DIRECTOR_PASS);
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL(/\/(finance|dashboard)/);

  // KPI row renders
  const kpis = page.locator('[data-testid="kpi-card"]');
  await expect(kpis).toHaveCount(4);

  // Values are not all zero (data loaded)
  const firstValue = await kpis.first().locator('[data-testid="kpi-value"]').textContent();
  expect(firstValue).not.toBe('-');

  // AI panel loaded
  await expect(page.locator('[data-testid="executive-ai-panel"]')).toBeVisible();

  // No console errors
  const errors = [];
  page.on('pageerror', err => errors.push(err));
  expect(errors).toHaveLength(0);
});
```

### Keep e2e lean

Anti-target: 500 e2e tests that all flake intermittently. Target: 20 e2e tests that each exercise a user-critical flow, run in < 2 min total.

When an e2e flakes, fix it or delete it — don't tolerate.

## Fixture factories

For integration + e2e, need realistic data. Do NOT use production PII. Two options:

### 1. Factory functions

```js
// tests/factories/ovst.js
let idSeq = 1_000_000;
export function ovstFactory(overrides = {}) {
  return {
    vn: `VN${idSeq++}`,
    hn: `HN${Math.floor(Math.random() * 99999).toString().padStart(6, '0')}`,
    vstdate: new Date().toISOString().slice(0, 10),
    vsttime: '09:00:00',
    dep: '001',
    pdx: 'I10',
    ovstost: '99',
    doctor: 'DOC-001',
    ...overrides,
  };
}
```

### 2. Anonymized production snapshot

For perf + integration: a scrubbed snapshot of production where:
- `hn` hashed.
- `cid` removed.
- Names replaced with `Patient-<id>`.
- Dates shifted uniformly (preserves clinical patterns, destroys re-identification).

Run in a dedicated test database; never against production.

## Synthetic data generation

For scale/perf tests, generate 100K+ rows:

```js
// scripts/synth/generate_ovst.mjs
import { writeFileSync } from 'fs';
import { ovstFactory } from '../tests/factories/ovst.js';

const rows = Array.from({ length: 100_000 }, () => ovstFactory());
writeFileSync('tests/fixtures/ovst_100k.json', JSON.stringify(rows));
```

## Test organisation

```
tests/
├── unit/
│   ├── ai/              (per engine)
│   ├── metrics/         (per metric)
│   ├── utils/
│   └── components/      (sparingly)
├── integration/
│   ├── routes/          (per route file)
│   ├── engines/         (AI engine × real-ish DB)
│   └── dq/              (data quality checks)
├── factories/
├── fixtures/
└── helpers/
e2e/
├── flows/               (one file per critical flow)
└── playwright.config.js
```

## CI integration

GitHub Actions (or equivalent) should:

1. `npm ci`
2. `npm run typecheck` — fail on ts error
3. `npm run lint` — fail on error, warn allowed
4. `npm run test` — all unit + integration pass
5. `npm run test:coverage` — coverage report, fail if < 70%
6. Deploy-preview: spin up test DB, seed with synthetic data, run `npm run test:e2e`

Cache `node_modules` + Vite's `.vite` folder for speed.

## Coverage targets

- Overall: ≥ 70%.
- `server/ai/`: ≥ 90%. These are the highest-stakes modules.
- `server/metrics/`: ≥ 85%.
- `server/routes/`: ≥ 60% (integration handles the rest).
- `src/components/`: ≥ 50% (most is UI; don't chase snapshot coverage).

Never the sole metric. High-coverage garbage tests are worse than no tests.

## Flake management

When a test flakes:

1. **Quarantine** — mark `.skip` and open an issue.
2. **Reproduce** locally with `--repeat-each=20`.
3. **Fix** — almost always the test, not the code. Common culprits: time-based assertions, race conditions in e2e, shared DB state.
4. **Re-enable** only after 50 CI runs without flake.

## What NOT to test

- Implementation details (internal function names, private state).
- Third-party library behaviour (assume Recharts renders).
- Configuration files (env, build config) — test via e2e that the app starts.
- Trivial pass-throughs.

## Anti-patterns to refuse

- **Snapshot testing every component** — they decay, nobody reviews them.
- **`setTimeout` in tests** — use `vi.useFakeTimers()` or explicit async awaits.
- **Shared mutable state between tests** — isolation is non-negotiable.
- **Tests that depend on live HOSxP** — use fixtures or mocked DB.
- **Tests that mutate real PII** — never run against production.
- **Skipping tests "temporarily"** — quarantined tests should have an open issue + owner; if neither, delete.

## Workflow

1. **New module / AI engine / metric** → unit tests required before merge. Coverage check in CI.
2. **New route** → integration test. Happy + one error case minimum.
3. **New critical flow** → Playwright e2e.
4. **Fix bug** → regression test REPLICATING the bug first, then fix.
5. **Flake** → quarantine + issue + fix.

## Sibling skills

- `bch-ai-evals` — AI-specific evaluation (beyond simple unit tests — needs ground truth).
- `bch-data-quality` — check functions are themselves tests (but on live data).
- `bch-observability` — production testing via real traffic (canaries).
- `bch-360-expert/references/performance-auditor.md` — `test:smoke` + perf audit.
