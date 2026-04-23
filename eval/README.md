# BCH 360° — AI Evaluation Suite

Measures AI quality so prompt changes don't silently regress and drift gets caught early.

## Run

```bash
npm run eval                          # all modules, full suite
npm run eval -- --module=readmission  # single module
```

## Layout

```
eval/
├── lib/
│   ├── stats.js            accuracy / precision / recall / AUC / Brier / ECE / MAPE
│   └── factuality.js       detects numbers in Claude output not in the input
├── runners/
│   ├── index.js            CLI entry
│   └── readmission.js      exemplar classification eval
├── datasets/
│   └── README.md           how to build a golden dataset
└── reports/
    └── <timestamp>.json    per-run snapshot (gitignored)
```

See skill `bch-ai-evals` for the full protocol.
