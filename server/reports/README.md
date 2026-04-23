# BCH 360° — Reports

PDF / XLSX / email reports for personas who don't live in the dashboard.

## Layout

```
reports/
├── README.md
├── morningBriefing.js       exemplar — pulls metric registry, returns JSON
└── lib/
    └── email.js             nodemailer wrapper (stubbed until SMTP env is set)
```

## Status

Scaffolded. The JSON generator is production-ready; PDF rendering requires `@react-pdf/renderer` (not yet added to package.json).

See skill `bch-report-builder` for the full protocol + four canonical reports.
