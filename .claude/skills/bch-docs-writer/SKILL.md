---
name: bch-docs-writer
description: Documentation / runbook / API-spec authority for BCH 360° Intelligence V.10. Use this skill AGGRESSIVELY whenever the user asks about API documentation, OpenAPI / Swagger, user manuals, clinician-facing Thai docs, onboarding docs, runbooks for IT, architecture diagrams, changelog, README, contributor guide, or "document this". Triggers on documentation, docs, README, OpenAPI, Swagger, API spec, manual, runbook, onboarding, changelog, architecture diagram, mermaid, ERD. Complements every other skill (each produces docs).
---

# BCH 360° — Docs Writer

You are the documentation authority. Hospital staff rotate. IT admins change jobs. Clinicians want a Thai user manual, not a repo walkthrough. Developers want to know where things live without asking. Good docs are the handoff that lets the project survive its builders.

Docs rot. Your job: design docs that rot slowly, live next to the code they describe, and earn their place.

## Who reads what — audience-first

Before writing any doc, name the reader. Different audiences = different docs.

1. **Clinicians (Director, Clinical Lead, Nurse)** — Thai, screenshot-heavy, task-oriented ("How do I see today's NEWS2 list"). They do NOT care about the architecture.
2. **IT Admins** — mixed Thai/English, runbook style, step-by-step ("How to deploy a hotfix", "What to do when MySQL pool is saturated").
3. **Developers / contributors** — English, architectural + conventions. New hire should be productive in 1 day.
4. **Regulators / auditors** — formal, PDPA-aligned, infrequent but high-stakes.
5. **Claude / AI assistants** — this is the skill files themselves. Optimised for trigger + dispatch.

Five audiences, five doc sets. Don't mix.

## Doc taxonomy — where things live

```
README.md                      — developer entry point (English)
docs/
├── user/                      — clinician-facing, Thai
│   ├── getting-started.md
│   ├── opd-tab.md
│   ├── ipd-tab.md
│   ├── faq.md
│   └── screenshots/
├── ops/                       — IT admin runbooks
│   ├── deploy.md
│   ├── backup-restore.md
│   ├── incident-response.md
│   ├── alert-response/
│   │   ├── db-pool-exhausted.md
│   │   ├── replication-lag.md
│   │   └── ai-drift.md
│   └── escalation-matrix.md
├── dev/                       — contributor docs
│   ├── architecture.md        — cross-reference to bch-360-expert skill
│   ├── conventions.md
│   ├── testing.md
│   ├── metrics-registry.md    — cross-reference to bch-analytics-engineer
│   ├── onboarding.md
│   └── adr/                   — Architecture Decision Records
│       ├── 0001-zustand-over-react-query.md
│       ├── 0002-hosxp-read-only.md
│       └── ...
├── api/
│   └── openapi.yaml           — generated from Zod schemas (see below)
├── security/
│   ├── pdpa.md
│   ├── pen-test-YYYY-MM.md
│   └── threat-model.md
└── metrics/                   — auto-generated from server/metrics/
    └── index.html
CLAUDE.md                      — top-level claude assistant guide
```

## Conventions

### Markdown style

- ATX headers (`#`, `##`) — no setext.
- Thai body text paragraphs: line-length ≤ 100 characters, line-height rendered ≥ 1.5.
- Code blocks: always with language fence (` ```js ` not ` ``` `).
- Links: prefer relative (`../ops/deploy.md`) over absolute.
- Filenames: kebab-case (`morning-briefing.md`), no spaces.

### Screenshots

- PNG, compressed (< 200KB each).
- Annotate with red boxes / arrows for clarity.
- Store in `docs/user/screenshots/YYYY-MM/`.
- Refresh per quarter or on major UI change.

### Thai language

- Use Thai for all clinician-facing sentences.
- Pair terms on first use: `ผู้ป่วยใน (IPD)`, `อัตราสรุปรหัสโรค (coding rate)`.
- Code examples and identifiers stay English.
- Dates: prefer B.E. (พ.ศ.) in body text; C.E. in timestamps.

## README.md — the front door

Must answer in the first 60 seconds of reading:

1. **What is this?** (one sentence)
2. **Who runs it?** (audience)
3. **How do I run it locally?** (verified commands)
4. **Where is the architecture?** (link)
5. **How do I get help?** (link / contact)

Keep it short. Detailed topics go to `docs/`.

## OpenAPI — generate, don't handwrite

The project uses Zod for request validation. Generate the OpenAPI spec from Zod schemas — single source of truth.

Recommended: `@asteasolutions/zod-to-openapi` or `zod-openapi`.

```js
// server/openapi.js
import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { opdTodayQuerySchema, opdTodayResponseSchema } from './routes/opd.schemas.js';

const registry = new OpenAPIRegistry();
registry.registerPath({
  method: 'get',
  path: '/api/opd/today',
  summary: 'OPD live summary for today',
  tags: ['OPD'],
  request: { query: opdTodayQuerySchema },
  responses: {
    200: { description: 'Successful response', content: { 'application/json': { schema: opdTodayResponseSchema } } },
    401: { description: 'Unauthorized' },
    429: { description: 'Rate limited' },
  },
});
// ... register all routes

const generator = new OpenApiGeneratorV3(registry.definitions);
const doc = generator.generateDocument({
  openapi: '3.0.0',
  info: { title: 'BCH 360° API', version: '10.0.0' },
  servers: [{ url: 'https://10.109.0.33' }],
});
writeFileSync('docs/api/openapi.yaml', yaml.dump(doc));
```

Serve via Swagger UI at `/api/docs` (admin-only). Regenerate in CI on every build.

## Runbooks — IT-facing, step-by-step

Every runbook follows the shape:

```markdown
# Runbook: <Situation>

## Symptom
What the IT admin notices first.

## Triage (5 min)
Commands to run, what to look at.

## Common causes
Bullet list.

## Fix
Exact steps. Include commands.

## Post-incident
What to log, who to notify, what to change.

## Related
Links to other runbooks / skills.

Last reviewed: YYYY-MM-DD by <owner>.
```

Every alert should link to its runbook. No alert without a runbook.

## User manual — task-oriented, Thai

Wrong: "The OPD tab is a view containing various KPIs including wait time metrics and flow predictions..."

Right:

```markdown
# หน้า OPD — ดูผู้ป่วยนอกวันนี้

## สิ่งที่คุณจะเห็น

- จำนวนผู้ป่วยตั้งแต่เปิดบริการ
- เวลารอเฉลี่ย (ต้นจนจบ)
- อัตราการทำตาม SLA (≤ 60 นาที)

## การใช้งานประจำวัน

1. เปิดหน้าเว็บที่ https://10.109.0.33
2. ล็อกอินด้วยบัญชีของท่าน
3. เมนูด้านซ้าย → คลิก "⏱️ OPD ผู้ป่วยนอก"
4. ดูการ์ด KPI ด้านบน

![OPD Tab Screenshot](screenshots/2026-04/opd-tab.png)

## ต้องการรายละเอียด?

- คลิก KPI ใดก็ได้ → จะเปิดหน้าต่างแสดงรายละเอียดพร้อมตารางรายคน
- ต้องการส่งออก Excel: ปุ่ม "📥 ส่งออก" มุมขวาบนของตาราง
```

Task > feature. Screenshot > paragraph.

## Onboarding doc — 1-day productivity

`docs/dev/onboarding.md` should let a new developer reach their first merged PR in a day:

```markdown
# Onboarding — BCH 360° V.10

## Day 0 (before first login)
- [ ] IT Admin creates your dashboard user with `developer` role
- [ ] Clone the repo
- [ ] Copy .env from secure storage

## First 2 hours
- [ ] npm install
- [ ] Verify local dev runs: `npm run dev`
- [ ] Open http://localhost:4001, log in
- [ ] Read `docs/dev/architecture.md` (20 minutes)
- [ ] Read `docs/dev/conventions.md` (15 minutes)

## First task (the "Hello World")
Pick one:
- Add a new KPI card to an existing tab (easiest)
- Add a new AI module following the template
- Fix a listed "good first issue" bug

Guide: `docs/dev/first-task-guide.md`

## Before your first PR
- [ ] Run `npm run typecheck && npm run lint && npm run test`
- [ ] Add tests (see `docs/dev/testing.md`)
- [ ] Update relevant metric in `server/metrics/` if you added or changed a KPI
- [ ] Write PR description with "what, why, how tested"

Links:
- Slack/LINE channel: ...
- Escalation: ...
```

## Architecture Decision Records (ADRs)

ADRs capture "why we chose X over Y" at the moment of decision. Critical for future-you (and successors) to avoid re-litigating settled debates.

Template:

```markdown
# ADR 0005: Use Zustand over React Query for dashboard state

Date: 2026-04-23
Status: Accepted

## Context
The dashboard unifies REST-fetched data and Socket.IO-pushed live events. Using react-query for REST and a separate mechanism for live data bifurcates state ownership.

## Decision
Use Zustand for all dashboard state. Socket.IO events dispatch into the same store as REST fetches.

## Consequences
- + Single source of truth for live + fetched state.
- + Simpler component code.
- - react-query is in package.json as a dep but unused — inform team.
- - Manual optimistic-update logic (react-query would've done this).

## Alternatives considered
- react-query + ad-hoc live updates: rejected (bifurcates state).
- Redux: rejected (too much boilerplate for this scope).
- MobX: rejected (team unfamiliar).
```

Every significant architectural choice gets an ADR. Immutable — don't edit after acceptance; add a new ADR to supersede.

## Metrics docs — auto-generated

Per `bch-analytics-engineer`, every metric is a declarative file. A generator produces `docs/metrics/index.html`:

```js
// server/metrics/generate-docs.mjs
import { readdirSync } from 'fs';
import { metrics } from './registry.js';

let html = '<h1>BCH 360° Metric Registry</h1><table>...';
for (const m of metrics) {
  html += `<tr><td>${m.id}</td><td>${m.label.th}</td><td>${m.formula}</td><td>${m.owner}</td><td>${m.reviewed}</td></tr>`;
}
html += '</table>';
writeFileSync('docs/metrics/index.html', html);
```

Run on every build. The doc is always current with code.

## Changelog

Follow [Keep a Changelog](https://keepachangelog.com/). Group by type (Added / Changed / Fixed / Deprecated / Removed / Security). Every release entry.

Practical pattern: one changelog per major version; archive old ones. For a single-deployment hospital project, a simple rolling `CHANGELOG.md` is fine.

## Architecture diagrams — Mermaid

Prefer Mermaid over external tools (draw.io, Lucidchart). Versioned with the code; renders in GitHub and most markdown viewers.

```markdown
## System overview

\`\`\`mermaid
flowchart LR
  HOSxP[(HOSxP XE<br/>MariaDB 5.x)]
  APP[BCH 360 Server<br/>Node + PM2]
  SIDECAR[(Sidecar SQLite)]
  CLAUDE[Claude API]
  USER[Clinician / Director]

  HOSxP -->|read-only| APP
  APP <-->|audit, MV, AI outcomes| SIDECAR
  APP -->|narratives| CLAUDE
  CLAUDE -->|prose| APP
  APP -->|HTTPS + Socket.IO| USER
\`\`\`
```

For ERDs of sidecar DB tables, use `erDiagram` in Mermaid.

## Docs CI

- Broken link check in CI (`markdown-link-check`).
- Spell check Thai + English (hunspell or custom).
- Screenshot freshness audit: flag screenshots > 6 months old.
- Auto-regenerate metric docs + OpenAPI on every build.

## Doc review cadence

- **Every PR**: touch the relevant doc if behavior changed.
- **Quarterly**: audit runbooks (someone runs through each, confirms commands still work).
- **Annually**: audit user manual for outdated screenshots.
- **On staff turnover**: update "who owns what" doc.

## Don'ts

- **Don't duplicate content**: cross-link instead. Duplication = drift.
- **Don't write docs nobody reads**: if it hasn't been opened in 6 months, archive or delete.
- **Don't write aspirational docs**: document what IS, not what you wish were true.
- **Don't gate knowledge in head**: if only one person knows how to restart PM2, that's the next incident.
- **Don't write for compliance theatre**: regulator docs are real docs; write them as such.

## Workflow

1. **Feature change** → update linked doc in the same PR.
2. **New alert / runbook situation** → runbook first, then alert.
3. **New architecture decision** → ADR at decision time.
4. **User-visible change** → user manual + screenshot.
5. **API change** → Zod schema updates → OpenAPI auto-regenerates.

## Sibling skills

- Every other skill. Each produces docs of its own domain.
- `bch-analytics-engineer` → metrics registry → auto-generated metric docs.
- `bch-ai-evals` → eval results → published to dev docs.
- `bch-security-compliance` → pen-test reports + threat model.
- `bch-devops` → runbooks + deploy docs.
- `bch-ui-designer` → screenshots + component catalog.
- `bch-ux-designer` → user manual structure + personas.
