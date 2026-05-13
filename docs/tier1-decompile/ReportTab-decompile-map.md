# ReportTab Decompile Map (Phase H Tier 1 — next-session entry point)

**Source bundle**: `dist/assets/ReportTab-PTSVC09.js` (400 KB minified, 14072 lines beautified)
**Beautified copy**: `scripts/_tier1-decompile/ReportTab-PTSVC09-active.beauty.js`
**Goal**: Extract 7 missing reports to `src/components/reports/*.jsx` per `bch-source-recovery` skill workflow.

---

## 1. The 13 report types — dropdown options (line 4729-4767)

| Value | Thai label | Render fn | Render line | Skill priority |
|---|---|---|---|---|
| `opd-compare` | จำนวนผู้ป่วยนอก (OPD) | `k0()` | ~3586 | Tier 3.2 (compare) |
| `ipd-compare` | จำนวนผู้ป่วยใน (IPD) | `V()` | ~1936 | Tier 3.1 — has rich AI Insight, KEEP |
| `resource-opd` | ทรัพยากร ผู้ป่วยนอก (Lab/Drug/CT-Xray) | `U0()` | ~3607 | Tier 3.3 |
| `resource-ipd` | ทรัพยากร ผู้ป่วยใน (Lab/Drug/CT-Xray) | `q0()` | ~3607 | Tier 3.4 |
| `mortality` | รายงานการตาย (OPD / IPD) | `ru()` | ~4645 | Tier 2.3 |
| `frax` | FRAX Calculator | `vu()` | ~1959 | Tier 2.4 |
| **`pt`** | **รายงานกายภาพบำบัด และ PMC** | **`Su()`** | **~2177** | **Tier 1.1 ⭐** |
| **`staff-services`** | **รายงานการรับบริการของบุคลากร** | **`Cu()`** | **~2177** | **Tier 1.1 ⭐ (shares pt code)** |
| `fluoride` | เคลือบฟลูออไรด์ 25-59 ปี | `Du()` | ~2531 | Tier 2.1 |
| `elderly-cxr` | ผู้สูงอายุ 60+ ที่มี CXR | `au()` | ~2815 | Tier 2.2 |
| `ncd-disease` | ผู้รับบริการ NCD แยกโรค | `nu()` | ~3645 | Tier 2.5 |
| `imaging-services` | บริการ XRAY / CT / Portable / BMD | `Ou()` | ~3219 | Tier 2.6 |
| `pttype-services` | รายงานการรับบริการแยกกลุ่มสิทธิ์ | `Hu()` | ~3129 | (Tier 2 candidate) |

Dispatcher (line 1259):
```js
s === "ipd-compare" ? V() : s === "opd-compare" ? k0() : ... : s === "staff-services" && Cu()
```

---

## 2. PT/Staff data fetch (line 1177-1190) — start here

```js
// PT data fetch (start: 1177)
const e = await uu(`/api/report/pt-patients?start=${g0}&end=${x0}&_t=${Date.now()}`, {...});

// Staff data fetch (start: 1189)
const e = await uu(`/api/report/staff-patients?start=${g0}&end=${x0}&_t=${Date.now()}`, {...});
```

- **API**: `/api/report/pt-patients` and `/api/report/staff-patients` (both exist in restored `server/routes/report.js`)
- **Data state**: `J` (combined PT/Staff state per line 2177)

---

## 3. PT/Staff render block (line 2177-2531)

```js
if (s === "pt" || s === "staff-services") {
  return ...JSX with KPIs:
  - line 2473: 'จำนวน Visit บุคลากร' / 'จำนวน Visit PT'
  - line 2480: 'บุคลากรที่เข้ารับบริการ (HN ไม่ซ้ำ)' / 'จำนวนผู้รับบริการ (HN ไม่ซ้ำ)'
  - line 2465: staff_registry_count (staff-only)
  - line 2455: titleText switching label
}
```

KPI cards use shared KPIDescriptionCards component. The 5-layer card design from `bch-kpi-card-designer/references/card-anatomy.md` is applied here.

---

## 4. PT/Staff patient list (line 9748+)

```js
!S0 && (s === "pt" || s === "staff-services") && J?.patients && (() => {
  // patient-level table with Daily Trend, YoY chips, สิทธิ์, new/repeat
})
```

This is the largest block — patient detail rows including:
- Daily Trend mini-chart
- YoY % delta chips
- สิทธิ์ (insurance) breakdown
- New vs Repeat patient flag
- Per-patient narrative summary

---

## 5. Excel export (line 5029)

`s === "pt" || s === "staff-services"` triggers Excel format (not CSV).
Export function lives elsewhere — find via grep `Xu` or similar export fn name.

---

## 6. Extraction Strategy (Next Session — 8-12 hours)

### Step 1 (1 hr): Identify all helper functions PT/Staff uses
Search `Su`, `Cu`, and any data transformation helpers they call. Document inputs/outputs.

### Step 2 (2 hr): Extract `<PTStaffReport>` component skeleton
Create `src/components/reports/PTStaffReport.jsx` with:
- Props: `data` (from `/api/report/pt-patients` or `/api/report/staff-patients`)
- Props: `mode` ('pt' | 'staff-services')
- Internal state for date range, sort, filter

### Step 3 (2 hr): Extract KPI cards (line 2455-2530)
Use existing `KPIDescriptionCards` shared component. Map JSON structure 1:1.

### Step 4 (2 hr): Extract patient list (line 9748+)
Use Recharts for Daily Trend mini-chart. Use shared `BCHTooltip` component (already in src from Phase H Tier 1).

### Step 5 (1 hr): Wire into ReportTab
Lazy import + dispatcher branch. Keep old bundle fallback during transition.

### Step 6 (1 hr): Side-by-side verification
- Run dev server with new PTStaffReport
- Compare with prod (bundle version)
- Visual + behavioral parity check
- Smoke test

### Step 7 (1 hr): Add tests
Unit test for data transformation. Integration test for empty/no-data cases.

---

## 7. Templates for next 6 reports (after PT/Staff)

Once `<PTStaffReport>` works, the pattern transfers:
- **`<FluorideReport>`** — same data shape, dental focus narrative
- **`<ElderlyCXRReport>`** — same shape + ชาย/หญิง split
- **`<MortalityReport>`** — different shape (death stats by age/dchtype)
- **`<FRAXReport>`** — patient-level + FRAX score
- **`<NCDDiseaseReport>`** — multi-condition
- **`<ImagingServicesReport>`** — 4 modalities

Each: 4-8 hours after template established.

---

## 8. Helper function map (TODO — discover next session)

These minified names appear in the dispatcher. Find their definitions:

| Min name | Likely full name | Type |
|---|---|---|
| `V` | renderIpdCompare | Render |
| `k0` | renderOpdCompare | Render |
| `U0` | renderResourceOpd | Render |
| `q0` | renderResourceIpd | Render |
| `ru` | renderMortality | Render |
| `vu` | renderFrax | Render |
| `Su` | renderPT | Render |
| `Du` | renderFluoride | Render |
| `au` | renderElderlyCxr | Render |
| `nu` | renderNcdDisease | Render |
| `Ou` | renderImagingServices | Render |
| `Hu` | renderPttypeServices | Render |
| `Cu` | renderStaffServices | Render |
| `uu` | fetchWithTokenRefresh | Util (already in src as `fetchWithTokenRefresh`) |
| `J` | ptStaffData (state) | State |

---

## 9. Anti-patterns to avoid (per bch-source-recovery skill)

- ❌ **Don't aim for byte-identical output** — behavioral parity is the goal
- ❌ **Don't throw away the bundle file** — keep `ReportTab-PTSVC09.js` in dist/ as rollback
- ❌ **Don't skip tests** — adding tests is the whole point of recovery
- ❌ **Don't try to extract all 13 reports in 1 PR** — each is its own unit

---

## 10. Acceptance criteria

Per item:
1. `npm run build` succeeds from clean checkout
2. New component renders identical to bundle version (visual diff)
3. Tests pass (`npm test` if test framework exists)
4. Hard refresh in prod shows new component working
5. No console errors

Once all 7 reports restored:
- Switch HTML entry to use `src/` only (drop bundle dependency)
- Delete the old bundle file from `dist/`
- Update CI to enforce `npm run build` passes
- Mark Tier 1 ⭐⭐⭐ complete in `priority-queue.md`

---

*Document created: 2026-05-13 · Sprint 0 Tier 1 preparation*
*Next session: continue from Step 1 above*
