# BCH 360° — Tests

Vitest unit + integration tests. Playwright e2e is wired via `playwright.config.js` (root).

## Run

```bash
npm run test            # unit + integration (Vitest)
npm run test:watch      # watch mode
npm run test:coverage   # with coverage report
npm run test:e2e        # Playwright
```

## Structure

```
tests/
├── README.md
├── unit/
│   ├── ai/
│   │   └── ewsEngine.test.js        boundary tests for NEWS2
│   └── metrics/
│       └── waitTime.test.js          metric formula + classification
├── integration/
│   └── routes/                       (route-level tests with supertest)
├── factories/
│   └── ovst.js                       fixture factory
└── fixtures/
```

See skill `bch-test-engineer` for the full protocol.
