---
name: bch-report-builder
description: Report / export / scheduled-delivery authority for BCH 360° Intelligence V.10. Use this skill AGGRESSIVELY whenever the user asks about PDF reports, Excel exports, scheduled email, printable layouts, morning-briefing reports, executive summaries on paper, board decks, chart-to-image rendering, XLSX generation, snapshot reports, per-persona report templates, or "I want this in email every morning". Triggers on report, PDF, Excel, XLSX, CSV export, print, printable, scheduled email, morning briefing, board deck, snapshot, render, puppeteer, react-pdf, xlsx-js-style, attachment, cron report. Complements `bch-360-expert` (routes), `bch-analytics-engineer` (KPI formulas), `bch-ui-designer` (print CSS).
---

# BCH 360° — Report Builder

You are the export authority. Not every user lives in the dashboard. Directors want a morning PDF in their inbox at 07:00. Finance wants XLSX every Friday. The board wants a one-page snapshot. Your job: deliver the right information in the right format at the right time without anyone opening a browser.

Today the project has basic tables that can be copy-pasted but no first-class reporting. That's the gap.

## Three output formats, three tools

### PDF reports → Puppeteer (for screenshot-like) OR react-pdf (for layout-controlled)

**Puppeteer** is simpler — render any dashboard URL as PDF. Good for "what you see is what you get". Downside: needs a headless Chrome, heavier dependency, awkward pagination.

**react-pdf** (`@react-pdf/renderer`) is a React DSL that produces PDFs directly. Cleaner for multi-page reports with precise typography. Uses different components (`<Document>`, `<Page>`, `<Text>`, `<View>`). Best for board decks and formatted reports.

**Rule of thumb**: executive PDFs (monthly, quarterly, board) → react-pdf. "Print this dashboard to PDF" → Puppeteer.

Neither is currently a dependency; pick one per use case.

### Excel / XLSX → `xlsx-js-style` (already installed)

The project already has `xlsx-js-style` and `xlsx` as deps. Use `xlsx-js-style` for anything with formatting (column widths, cell colors, borders, merged cells). Use `xlsx` bare for plain CSV-style data dumps.

```js
import xlsx from 'xlsx-js-style';

const ws = xlsx.utils.json_to_sheet(rows, { header: ['vn', 'hn', 'clinic', 'waitMinutes'] });
ws['!cols'] = [{ wch: 12 }, { wch: 10 }, { wch: 20 }, { wch: 14 }];
// Style header row
for (let c = 0; c < headers.length; c++) {
  const cell = xlsx.utils.encode_cell({ r: 0, c });
  ws[cell].s = {
    font: { bold: true, color: { rgb: 'FFFFFF' } },
    fill: { fgColor: { rgb: '5E72E4' } },
    alignment: { horizontal: 'center' },
  };
}
const wb = xlsx.utils.book_new();
xlsx.utils.book_append_sheet(wb, ws, 'OPD Wait');
const buf = xlsx.write(wb, { type: 'buffer', bookType: 'xlsx' });
// Serve as download or attach to email
```

### CSV → `xlsx.utils.sheet_to_csv()` or manual

For simple dumps. Prefer XLSX for exec delivery; CSV only for pipeline hand-off (upstream to BI tools).

## Report architecture pattern

Every report is a function that:

1. Takes a config (date range, filters, persona).
2. Fetches the canonical metrics (via the registry from `bch-analytics-engineer`).
3. Renders to the target format.
4. Returns a Buffer + filename + MIME type.

```js
// server/reports/morningBriefing.js
import { compute as revenueToday } from '../metrics/finance/revenue.js';
import { compute as opdToday } from '../metrics/opd/throughput.js';
// ... etc

export async function morningBriefingPdf({ asOf = new Date() } = {}) {
  // Gather all KPIs in parallel
  const [rev, opd, ipd, er, alerts] = await Promise.all([
    revenueToday(db, { dateRange: { start: asOf, end: asOf } }),
    opdToday(db, { dateRange: { start: asOf, end: asOf } }),
    ipdSnapshot(db, asOf),
    erSnapshot(db, asOf),
    criticalAlerts(db, asOf),
  ]);

  // Generate narrative
  const narrative = await generateExecutiveNarrative({ rev, opd, ipd, er, alerts });

  // Render PDF
  const buf = await renderReactPdf(<MorningBriefingReport data={{ rev, opd, ipd, er, alerts, narrative }} asOf={asOf} />);

  return {
    buffer: buf,
    filename: `morning-briefing-${formatDate(asOf)}.pdf`,
    mime: 'application/pdf',
  };
}
```

## Scheduled delivery — node-cron + nodemailer (or webhook)

node-cron is already a dep. Email via nodemailer (add as dep) or a transactional service (SendGrid, SES).

```js
// server/jobs/morningBriefing.js
import cron from 'node-cron';
import { morningBriefingPdf } from '../reports/morningBriefing.js';
import { sendEmail } from '../lib/email.js';
import logger from '../logger.js';

const RECIPIENTS = (process.env.MORNING_BRIEFING_TO || '').split(',').filter(Boolean);

cron.schedule('0 7 * * *', async () => {
  if (RECIPIENTS.length === 0) {
    logger.info('[morningBriefing] no recipients configured, skipping');
    return;
  }
  try {
    const { buffer, filename } = await morningBriefingPdf();
    await sendEmail({
      to: RECIPIENTS,
      subject: `BCH 360° Morning Briefing — ${formatThaiDate(new Date())}`,
      text: 'กรุณาดูไฟล์แนบ / Please see attached.',
      attachments: [{ filename, content: buffer }],
    });
    logger.info('[morningBriefing] delivered', { recipients: RECIPIENTS.length });
  } catch (err) {
    logger.error('[morningBriefing] failed', { message: err.message });
  }
}, { timezone: 'Asia/Bangkok' });
```

Keep recipient lists in env (e.g., `MORNING_BRIEFING_TO=director@bch.go.th,...`). Not in source.

## The four canonical reports

### 1. Morning Briefing (daily 07:00, Director + Leadership)

One page. Headline numbers, yesterday vs day-before, critical alerts, AI narrative.

Content:
- Header: โรงพยาบาลบ้านฉาง • BCH 360° • Morning Briefing • [date B.E.]
- Top-of-day: Revenue yesterday (vs last week same day), OPD count, IPD occupancy, ER visits.
- AI Executive Summary (Claude, 3–5 sentences in Thai).
- Critical alerts from last 24 hours.
- Footer: "รายงานอัตโนมัติ ณ เวลา X — สำหรับข้อสงสัยกรุณาติดต่อทีม IT"

### 2. Weekly Finance Report (Monday 08:00, Finance)

Two pages with XLSX attached.

Content:
- Weekly revenue by pttype.
- AR aging snapshot.
- Denial rate week-over-week.
- Top 10 under-charging cases (XLSX for action).
- YoY trend chart.

### 3. Monthly Executive Deck (1st of month 09:00, Director + Board)

Four pages.

Content:
- Month summary: revenue, OPD, IPD, ER totals.
- YoY growth chart.
- Department performance index (DPI) per tab.
- NCD goal attainment by cluster.
- AI-generated narrative: "สิ่งที่น่าจับตาในเดือนถัดไป".

### 4. On-demand drill-down export

Triggered from any `DrillDownModal`. User clicks "ส่งออก XLSX" → current filter + data exported as Excel.

```jsx
<button onClick={() => downloadXlsx('/api/report/export?kpi=' + kpiId + '&filters=' + encodeFilters())}>
  📥 ส่งออก XLSX
</button>
```

## Printable web layouts (without Puppeteer)

For "Print this tab" features, use CSS `@media print`:

```css
@media print {
  .no-print, .sidebar, .header, button {
    display: none !important;
  }
  .tab-content {
    margin: 0;
    padding: 0;
    background: white;
    color: black;
  }
  .glass-card {
    background: white;
    border: 1px solid #ccc;
    box-shadow: none;
    backdrop-filter: none;
    page-break-inside: avoid;
  }
  .recharts-wrapper {
    page-break-inside: avoid;
  }
}
```

Charts may not render perfectly in print — for critical print accuracy, swap Recharts for static SVG rendering in print mode or snapshot as PNG.

## Thai language in PDFs

Font embedding is critical. Default fonts don't render Thai. Register Noto Sans Thai explicitly:

```js
// react-pdf
import { Font } from '@react-pdf/renderer';
Font.register({
  family: 'Noto Sans Thai',
  fonts: [
    { src: '/fonts/NotoSansThai-Regular.ttf' },
    { src: '/fonts/NotoSansThai-Bold.ttf', fontWeight: 700 },
  ],
});
```

For Puppeteer: use Chrome's built-in fonts (Chromium has Thai fonts); ensure `<html lang="th">` is set.

For XLSX: font embedding isn't supported by spec, but most Excel installs render Thai fine. Test on user's Excel before shipping.

## Numbers and dates in reports

- Numbers: `Intl.NumberFormat('th-TH').format(n)` always.
- Currency: `฿1,234,567.00`, or compact `฿1.23M` for headlines.
- Dates: use `Intl.DateTimeFormat('th-TH', { dateStyle: 'long' })` → "23 เมษายน 2569".
- Times: 24-hour, `HH:mm`.
- Year label in exec reports: B.E. (พ.ศ.) for the title, C.E. in footers/timestamps.

## API surface

```
GET  /api/report/morning-briefing?date=YYYY-MM-DD&format=pdf|xlsx
GET  /api/report/weekly-finance?week=YYYY-WW&format=xlsx
GET  /api/report/monthly-exec?month=YYYY-MM&format=pdf
GET  /api/report/export?kpi=<id>&from=<date>&to=<date>&format=xlsx
POST /api/report/subscribe   { reportType, recipients[], schedule }   admin only
```

Authenticated, RBAC-gated. The subscribe endpoint lets admins manage email lists without code changes (stored in `better-sqlite3` sidecar).

## Do's and don'ts

### Do

- Cache generated reports for 1 hour (by filter hash). Same report requested twice in the same hour returns from cache.
- Include a "generated at" timestamp on every page.
- Show the filter applied ("ช่วงเวลา: 1 ต.ค. 2568 – 30 เม.ย. 2569") prominently.
- Offer both PDF (for reading) and XLSX (for analysis) when data is tabular.
- Send email in plain text + HTML + attachment. Some clinicians view on feature phones.

### Don't

- Don't embed raw SQL output. Route all data through `server/metrics/` for consistency.
- Don't send an "empty" report. If no data, skip the send and log it.
- Don't auto-subscribe users without consent. PDPA applies.
- Don't rely on fonts that may not be on the target system (always embed, or use Chromium for Thai).
- Don't make the morning brief > 1 page. Directors won't read page 2.

## Libraries to add to package.json

```json
{
  "dependencies": {
    "@react-pdf/renderer": "^3.4.0",       // react-pdf reports
    "puppeteer": "^22.0.0",                // dashboard-to-pdf (optional, heavy)
    "nodemailer": "^6.9.0",                // SMTP delivery
    "handlebars": "^4.7.0"                 // email HTML templates
  }
}
```

Puppeteer downloads Chromium (~300MB). If install size matters, skip it and use only react-pdf.

## Workflow — when the user asks for a report

1. **Which persona?** Director / Clinical / Finance / Admin? That picks the template.
2. **What cadence?** On-demand / daily / weekly / monthly.
3. **Which format?** PDF for reading, XLSX for analysis, both sometimes.
4. **Which KPIs?** Pull from `server/metrics/` — don't hand-roll SQL in a report file.
5. **Implement** using the patterns above. Register cron schedule in `server/jobs/` if scheduled.
6. **Test**: render locally, open in target tool (PDF reader, Excel), confirm Thai renders.
7. **Deploy**: env vars for recipients; check nodemailer config.

## Anti-patterns to refuse

- **Hard-coding email addresses** — use env vars.
- **Sending unencrypted PII over email** — attachments should be password-protected when containing patient lists; or share via internal storage link.
- **Rendering Recharts inside Puppeteer then discarding** — expensive. Pre-render charts to SVG/PNG and embed.
- **"One report format for everyone"** — directors don't want what finance wants. Separate templates.
- **Ignoring the 1-page rule for exec briefs** — one page is the feature, not a constraint.

## Sibling skills

- `bch-analytics-engineer` — metrics registry feeding all reports.
- `bch-ai-evals` — the Claude narrative in reports should pass factuality eval.
- `bch-ui-designer` — print CSS + Thai typography for in-browser prints.
- `bch-security-compliance` — PDPA handling for attachments containing PII.
