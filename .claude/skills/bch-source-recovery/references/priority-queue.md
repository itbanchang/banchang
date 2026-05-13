# Priority Queue — order to restore source

Score = (Frequency of edit × User-visibility × Source-loss-magnitude) / Effort.

## Tier 1 — Restore first (highest leverage)

### 1.1 PT/Staff report (combined)
- **Frequency**: Most-edited today (10+ patches)
- **Visibility**: Default landing target for clinical exec
- **Loss**: Daily Trend, YoY chips, สิทธิ์, new/repeat, narrative — ALL only in bundle
- **Effort**: 8-12 hours
- **Why first**: Has most modern patterns. Restoring this = template for next 6 reports.

### 1.2 Hamburger drawer + Footer cleanup
- **Frequency**: Done once, but high-visibility result
- **Visibility**: Every page
- **Loss**: drawer menu, search input, locked REPORT bar, hidden Live Alert, hidden ECC, hidden bot, removed footer items
- **Effort**: 4-6 hours
- **Why second**: Quick win, builds confidence

### 1.3 KPI card design system
- **Frequency**: Used in PT/Staff, will spread
- **Visibility**: Highest — every dashboard
- **Loss**: 5-layer card design (accent bar + icon tile + tabular nums + YoY pill + hover lift)
- **Effort**: 4 hours
- **Why third**: Reusable component, unblocks redesign of other tabs

## Tier 2 — Per-report restoration (similar pattern, 6 reports)

### 2.1 Fluoride (เคลือบฟลูออไรด์)
- Same data shape as PT
- Add narrative for dental focus
- **Effort**: 4-6 hours

### 2.2 Elderly-CXR
- Same shape + ชาย/หญิง split
- Narrative for screening recommendations
- **Effort**: 4-6 hours

### 2.3 Mortality
- Different shape (death stats by age/dchtype)
- Has "AI Insights & ข้อเสนอแนะทางคลินิก/บริหาร" excel export
- **Effort**: 6-8 hours

### 2.4 FRAX
- Bone fracture risk per patient
- Patient-level data, similar to PT but with FRAX score
- **Effort**: 6-8 hours

### 2.5 NCD-disease
- Multi-disease (DM/HT/CKD/etc.) breakdown
- More complex than PT — multi-condition analysis
- **Effort**: 8-12 hours

### 2.6 Imaging-services
- 4 modalities (XRAY/CT/Portable/BMD)
- Different from patient list — service-centric
- **Effort**: 6-8 hours

## Tier 3 — Compare reports (FY1 vs FY2 monthly)

### 3.1 IPD-compare
- Has rich inline AI Insight (per-stakeholder actions) — keep this
- Multi-metric comparison (admit/discharge/ALOS/CMI/etc.)
- **Effort**: 12-16 hours
- **Note**: Keep the inline AI box as a feature, don't remove

### 3.2 OPD-compare
- Visit comparison + breakdown
- **Effort**: 8-12 hours

### 3.3 Resource-OPD
- Lab/Drug/CT-Xray usage comparison
- **Effort**: 8-12 hours

### 3.4 Resource-IPD
- Same as above for IPD
- **Effort**: 8-12 hours

## Tier 4 — Backend (42 missing files)

These are listed in `project_v2_merge_incomplete.md`. They exist in `production-snapshot-2026-04-24` (commit 4723088) and `feat/baseline-from-prod` (commit 77f11af). Not in master.

Sub-categories:
- `server/lib/{safeError,cache,healthCheck,...}` — utilities (5 files)
- `server/lib/repositories/*` — data access layer (5 files)
- `server/lib/services/*` — business logic (3 files)
- `server/middleware/{csrf,dataValidation,schemas}.js` — middleware (3 files)
- `server/ai/{drugInteraction,infection,sepsis}Engine.js` — AI engines (3 files)
- `server/cache/masterData.js` (1 file)
- `server/config/{env,middleware,routes}.js` — config (3 files)
- `server/data/frax_grid.json` — FRAX lookup table (1 file)
- `server/db/hospital.db*` — SQLite (3 files; gitignore + seed via build)
- `server/jobs/drugMonthlySync.js` (1 file)
- `server/routes/ai/*.js` — AI routes (4 files)
- `server/routes/{audit,dashboard,doctorActivity,system}.js` — routes (4 files)
- `server/socket.js`, `server/ssl/*`, `server/startup.js`, `server/types/api.ts` (5 files)

**Approach**: Cherry-pick from `production-snapshot-2026-04-24` (just commit + PR — no decompile needed, source IS in git history).

```bash
git checkout master
git checkout production-snapshot-2026-04-24 -- server/lib/safeError.js
# repeat for each file
git commit -m "restore: 42 backend files from production snapshot"
```

**Effort**: 4-8 hours total (mostly verification + ensuring tests still pass).

## Tier 5 — Today's backend patches (7 files)

Patches we made today via `bch-edit-on-prod` to backend files in container, NOT in git:

1. `/api/report/pt-patients` — main_dep 143 added, YoY query added (in `server/routes/report.js`)
2. `/api/report/staff-patients` — new endpoint
3. `/api/ai/medrec/optimization` — adjrw bug fix (in BOTH `ai/departments.js` and `ai_routes.js`)
4. AI Recommendation strings rewritten for executive audience

**Approach**: pull current container's files, diff with git, commit the diff.

```bash
ssh root@10.109.0.33 "docker cp bch360:/app/server/routes/report.js /tmp/cur-report.js"
scp root@10.109.0.33:/tmp/cur-report.js /tmp/cur-report.js
diff /tmp/cur-report.js server/routes/report.js
# Apply the diff to git source, commit
```

**Effort**: 2-3 hours.

## Total estimated effort

| Tier | Effort |
|---|---|
| Tier 1 (3 items) | 16-22 hours |
| Tier 2 (6 reports) | 36-50 hours |
| Tier 3 (4 reports) | 36-52 hours |
| Tier 4 (42 backend files) | 4-8 hours |
| Tier 5 (today's patches) | 2-3 hours |
| **Total** | **94-135 hours** ≈ 2-4 weeks of focused work |

## Suggested cadence

- Week 1: Tier 1 (PT/Staff + drawer + KPI design system)
- Week 2: Tier 5 + Tier 4 (backend re-source — easier wins)
- Week 3: Tier 2 (per-report — divide among team)
- Week 4: Tier 3 (compare reports — biggest)
- Ongoing: maintain via CI (skill `bch-ci-cd`)

OR: spread over 2-3 months at slower pace, 1 item per session, alongside new features.

## Status tracker

Maintain this section, update each session.

| Item | Status | Restored in commit/PR | Notes |
|---|---|---|---|
| **PT/Staff report** | **✅ DONE 2026-05-13** | `5b26a08` (partial) + `f078441` (complete) | src/components/reports/PTStaffReport.jsx — KPI grid (8 cards) + DeptBreakdown + AgeGroups + Icd10Top10 + DailyTrend + PatientTable (14 cols). Wired into ReportTab dispatcher. Side-by-side parity UAT deferred to Tier 1.5. |
| Hamburger drawer | ⏸️ Pending | — | Next session (decompile required) |
| KPI card system | ⏸️ Pending | — | Next session (decompile required) |
| Fluoride | ⏸️ Pending | — | After PT/Staff template established |
| Elderly-CXR | ⏸️ Pending | — | After PT/Staff template established |
| Mortality | ⏸️ Pending | — | After PT/Staff template established |
| FRAX | ⏸️ Pending | — | After PT/Staff template established |
| NCD-disease | ⏸️ Pending | — | After PT/Staff template established |
| Imaging-services | ⏸️ Pending | — | After PT/Staff template established |
| IPD-compare | ⏸️ Pending | — | Tier 3 — biggest decompile |
| OPD-compare | ⏸️ Pending | — | Tier 3 |
| Resource-OPD | ⏸️ Pending | — | Tier 3 |
| Resource-IPD | ⏸️ Pending | — | Tier 3 |
| **40 new backend files** | **✅ DONE 2026-05-13** | working tree (ux-iteration-1, defer commit) | Cherry-picked from `feat/baseline-from-prod` — server/lib/{repositories,services,utils,*}, server/ai/{drugInteraction,infection,sepsis}Engine.js, server/cache/masterData.js, server/config/{env,middleware}.js, server/data/frax_grid.json, server/jobs/drugMonthlySync.js, server/middleware/dataValidation.js, server/routes/ai/{clinical,core,departments,index}.js, server/routes/{audit,dashboard,doctorActivity,smoke,system}.js, server/socket.js, server/startup.js, server/types/api.ts. All 117 server/*.js syntax-pass. |
| **24 modified backend files** | **✅ DONE 2026-05-13** | working tree | server/ai/{calibration,selfHeal}.js, server/cache/staleCache.js, server/db/{dataWarehouse,hosxpIntegration,materializedViews,mysql}.js, server/infra/*, server/logger.js, server/middleware/rbac.js, server/monitoring/alerts.js, server/routes/{auth,clinical,dental,evolution,finance,infrastructure,pharmacy,quality,report,staffing,ai_routes}.js. Excluded: executive/er/ipd/claudeNarrative (Phase H Tier 1 work preserved), server.js/production.js (architectural diff with prod), SSL keys (security-sensitive). |
| **Phase H Tier 1 sync** | **✅ DONE 2026-05-13** | working tree | 3 files synced prod → src: server/routes/executive.js (BSC v7 LWBS clinical proxy + benchmark v6 + mortality_unexpected + Avg RW + Revenue Billed/Collected split), server/routes/ipd.js (1156 lines from prod), server/ai/claudeNarrative.js (prompt caching + token telemetry). server/routes/er.js was already identical. |
| **3 new utility files** | **✅ DONE earlier in session** | working tree | server/utils/units.js, server/ai/claudeMetrics.js, server/routes/claudeMetrics.js (claude cost monitoring) |
