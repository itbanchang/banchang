# Remaining Roadmap — Tier 3 (deep) + Tier 4

> **Status as of 2026-05-13**: All Tier 0-2 + Tier 3.x (partial: AIInsightPanel wired to IPD-compare) complete. This document maps the ~4-6 month work ahead.

---

## 🎨 Tier 3 Deep — Quality & Sophistication (~4-6 weeks)

### 3.1 BSC v4 Redesign (Sprint 7, 1 week)

Current: 4-perspective BSC with simple scoring, no Customer perspective.
Target: Kaplan-style BSC with Customer + Strategic weighting.

**Tasks**:

- [ ] Add Customer perspective to executive.js BSC endpoint
  - Patient Satisfaction (already in warehouse: `dw_patient_satisfaction`)
  - NPS / Complaint count
  - Catchment coverage %
- [ ] Redesign Learning & Growth (currently just doctor count)
  - Training hours/employee
  - Cert compliance (ACLS/BLS/NRP)
  - CQI projects/quarter
  - Turnover rate
- [ ] Strategic weighting (35/25/20/20: Internal/Customer/Financial/Growth)
- [ ] Confidence interval for low-n KPIs (STEMI, Stroke FT, L1-2 Refer)
- [ ] BSC drill-down (click perspective → KPI list → individual case)
- [ ] BSC trend overlay (12-month)

**Files**: `server/routes/executive.js`, new BSC tab/page in src

### 3.2 Visualization Upgrade (Sprint 8, 1 week)

Current: heavy on bar/line/pie. Missing flow + density visualizations.

**Tasks**:

- [ ] `npm install recharts-sankey` (or use existing primitives)
- [ ] **Refer-out Sankey** — BCH → destination hospitals
- [ ] **Patient Flow Funnel** — OPD: register → triage → MD → dispense
- [ ] **Treemap** — Service Lines + Revenue Mix + Drug Spending
- [ ] **Heatmap** (custom div grid) — Hourly ER/OPD load by day-of-week
- [ ] Replace 15 PieCharts → Donut + max 5 slices (rest grouped)

**Files**: new components in `src/components/viz/`

### 3.3 Storytelling & Progressive Disclosure (Sprint 9, 1 week)

**Tasks**:

- [ ] Click-to-drill universal pattern — modal/drawer ทุก KPI card
- [ ] Inline mini-trend (sparkline 30d) ใต้ทุก KPI card
- [ ] Inline AI insight for KPIs with anomaly
- [ ] Global filter bar — date range, ward, service line persist across tabs
- [ ] Story scroll page — 1 screen = 1 question (executive view)
- [ ] Breadcrumb context navigation

**Files**: `src/components/Sidebar.jsx`, `src/components/shared/`, `src/context/`

### 3.4 Accessibility & Performance (Sprint 10, 1 week)

**Tasks**:

- [ ] WCAG AA full audit — axe DevTools across all 21 tabs
- [ ] Pattern fills (hatched/dots) สำหรับ color-blind beyond color cues
- [ ] Data table fallback ("View as table") ทุก chart
- [ ] Keyboard navigation + focus rings ทุก interactive
- [ ] Bundle size optimization — analyze + tree-shake
- [ ] Lighthouse score baseline + target ≥85

**Files**: all components (cross-cutting concern)

---

## 🌟 Tier 4 — Advanced & Sustainability (~6 months)

### 4.1 Strategic Positioning (Weeks 23-26)

- [ ] **Catchment Heatmap** by ตำบล (Leaflet) — show where patients come from
- [ ] **Peer F2 Benchmark Tab** — เทียบกับ 4-5 รพช.เขต 6 (HDC API integration)
- [ ] **MoPH PA Tracker Tab** — แสดงทุก PA KPI + progress quarterly
- [ ] **Service Plan Scorecard Tab** — 16 สาขาในหน้าเดียว

### 4.2 Service Plan Coverage Expansion (Weeks 27-34)

- [ ] **Mental Health Tab** — IC-10 F00-F99 visits + screening compliance
- [ ] **Palliative Care Registry** — warehouse-feature, manual entry by ward
- [ ] **LTC + Elderly Fall Tracker** — 60+ falls, pressure injury count
- [ ] **Eye Care (Cataract) KPI** — pre-op + post-op outcomes

### 4.3 Sustainability + Future (Weeks 35-48)

- [ ] **Green & Clean Hospital Plus Tracker** (warehouse-feature)
  - GREEN: Garbage / Restroom / Energy / Environment / Nutrition
  - CLEAN: Communication / Leader / Awareness / Networking
- [ ] **SDG 3 Scorecard** — UN Sustainable Development Goals
  - 3.1 Maternal mortality < 70/100K LB
  - 3.2 Neonatal mortality < 12/1000 LB
  - 3.4 NCD mortality ↓ 1/3
  - 3.8 Universal Health Coverage (BCH already 100%)
- [ ] **Health Equity Lens** — payer-mix breakdown of all KPIs
- [ ] **F2 → M2 Upgrade Readiness Scorecard** — Service Plan compliance + bed count + specialty mix

---

## 📋 Tier 1.5 Bundle Replacement — Phased (4 weeks)

Per `docs/tier1.5-bundle-replacement-plan.md`:

- [ ] **Sprint A** (Week 1): Step 1 build + Step 2 side-by-side parity test → `docs/tier1.5-parity-results.md`
- [ ] **Sprint B** (Week 2): Step 3 docker image + Step 4 blue-green deploy
- [ ] **Sprint C** (Week 3): Step 5 cutover on Sunday low-traffic
- [ ] **Sprint D** (Week 4): Step 6 burn-in 24h + Step 7 cleanup OR rollback

**Pre-flight check before starting Tier 1.5**:

- ✅ CI workflows passing (Sprint 0.2 done)
- [ ] One real PR has gone through CI without intervention
- [ ] Stakeholder sign-off (Director + ICN agree to "report might look slightly different")
- [ ] Verify `npm run build` output works (Step 1)
- [ ] Side-by-side parity test passes (Step 2)

---

## 📊 Total Roadmap Status (2026-05-13)

| Tier                 | Status                        | Lines committed | Effort spent                 |
| -------------------- | ----------------------------- | --------------- | ---------------------------- |
| Tier 0 Foundation    | ✅ 100%                       | ~6,000          | ~10 hrs                      |
| Tier 1.x Critical    | ✅ 100%                       | ~5,000          | ~18 hrs (backend deployed)   |
| Tier 2.x Content     | ✅ 100%                       | ~3,800          | ~12 hrs (6 reports + drawer) |
| Tier 3.x Quality     | 🟡 35% (AIInsightPanel wired) | ~600            | ~3 hrs                       |
| Tier 4.x Strategic   | ⏸️ 0%                         | 0               | 0                            |
| **Tier 1.5 cutover** | **⏸️ planned only**           | 0               | ~0 (plan: 4 weeks)           |

**Composite**: ~70% of 12-month roadmap delivered in one extended session.

---

## 🚦 Suggested Next Sessions

| Session | Focus                         | Output                             |
| ------- | ----------------------------- | ---------------------------------- |
| 1       | Tier 1.5 Sprint A (Steps 1-2) | parity-results.md + build artifact |
| 2       | Tier 3.1 BSC v4 redesign      | New Customer perspective live      |
| 3       | Tier 3.2 Sankey + Treemap     | 2-3 new viz on prod                |
| 4       | Tier 1.5 Sprint B-C cutover   | Prod runs src-built code           |
| 5+      | Tier 3.3-3.4 + Tier 4.x       | Storytelling, a11y, network        |

---

_Last updated: 2026-05-13 · Companion to bch-source-recovery + bch-ci-cd skills_
