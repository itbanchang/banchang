# Color System for KPI Cards

The 6-color palette + opacity scale that gives BCH 360° its visual rhythm.

## The 6 metric colors

```js
const KPI_COLORS = {
  total:    "#10b981",  // emerald-500 — Total / Growth / Positive
  count:    "#0ea5e9",  // sky-500 — Outpatient / Generic count
  alert:    "#ef4444",  // red-500 — Critical / Alert / Inpatient
  money:    "#3b82f6",  // blue-500 — Money / Revenue
  average:  "#8b5cf6",  // violet-500 — Average / Calculated
  mix:      "#ec4899",  // pink-500 — Department / Mix / Diversity
};
```

These are Tailwind 500 weights from the same generation — so they harmonize when placed side by side.

## When to use each color

### `#10b981` — Emerald (Total / Growth)
- ผู้รับบริการ / Total visits
- ยอดรวม / Total revenue (when emphasizing growth)
- จำนวนผู้ป่วยใหม่ / New patients
- Top-line success metrics

### `#0ea5e9` — Sky (Count / OPD)
- ผู้ป่วยนอก (OPD)
- จำนวน Visit (when not a primary total)
- HN ไม่ซ้ำ / Unique HN
- Default "neutral count" color

### `#ef4444` — Red (Alert ONLY)
- 🚨 **Reserved for true alerts** — KPI fail, critical patient state, system error
- งานค้าง / Backlog when over threshold
- Critical errors / Pending items requiring action
- RW Loss / Negative deltas

> **Sprint 1 Task 2.5 — IPD migrated away from red.** IPD now uses `#14b8a6` (teal-500).
> Rationale: red overload (Alert + IPD + Triage L1 + DM/IHD) caused desensitization;
> reserving red for "needs action" preserves urgency signal.

### `#14b8a6` — Teal (IPD)
- ผู้ป่วยใน (IPD) — Phase H rebrand from red
- Inpatient counts / Ward census
- Pairs with `#0ea5e9` (sky/OPD) for outpatient↔inpatient comparisons

### `#3b82f6` — Royal blue (Money)
- รายได้รวม / Total revenue
- ค่ารักษา / Treatment cost
- รายได้รอเก็บ / Pending revenue
- Financial metrics in general

### `#8b5cf6` — Violet (Average / Calculated)
- เฉลี่ย / ราย / Average per visit
- Avg coding time
- CMI / AdjCMI
- Computed/derived metrics

### `#ec4899` — Pink (Department / Mix)
- จำนวนแผนก / Department count
- สิทธิ์ที่หลากหลาย / Pttype diversity
- Mix-related metrics

## Opacity scale (the magic numbers)

For each base color, use these specific opacity stops to maintain visual rhythm across cards:

| Use case | Opacity | Notation |
|---|---|---|
| Card background tint | `08` (3%) | `${color}08` |
| Icon tile background | `15` (8%) | `${color}15` |
| Border | `25` (14%) | `${color}25` |
| Accent bar gradient end | `55` (33%) | `${color}55` |
| Hover shadow | `25` (14%) | `${color}25` |
| YoY chip background (positive) | `rgba(16,185,129,.10)` | (10%) |
| YoY chip background (negative) | `rgba(239,68,68,.10)` | (10%) |

These specific opacity stops were tested across light + dark modes. Don't tweak — the cumulative effect breaks if any single number is off.

## Dark mode considerations

The system uses CSS variables `--md-surface`, `--md-text-primary`, etc. that auto-adapt. Avoid hard-coding `#fff` or `#111827` for text/bg — use:

- Card text: `var(--md-text-primary)` (auto-adapts)
- Sub text: `var(--md-text-secondary)`
- Tertiary: `var(--md-text-tertiary)`
- Card surface: `var(--md-surface, #fff)` (fallback for safety)
- Border: `var(--md-border)`
- Surface alt: `var(--md-surface-2, rgba(0,0,0,.04))` for subtle backgrounds

The 6 metric colors render fine in dark mode because the opacity stops are low enough not to clash.

## Trend indicator colors (YoY chips)

Up trend (positive): `#059669` (emerald-600 — slightly darker than #10b981 for contrast against the 10% bg)
Down trend (negative): `#dc2626` (red-600 — slightly darker than #ef4444)

These darker shades pop against the light pill backgrounds.

## Don't add new colors

Resist the urge to add yellow / orange / cyan / lime etc. The 6 colors cover all needs. Adding more breaks visual rhythm.

If you absolutely need to differentiate beyond 6 (e.g., a chart with 10 categories), use **shades of one primary color** rather than introducing new ones. Example for 10-line chart:
```js
const monoBlue = ["#0ea5e9", "#0284c7", "#0369a1", "#075985", "#0c4a6e", ...];
```

## Examples from the codebase

### Workload Balance chart (medrec)
- Bars use grayscale `#94a3b8` to `#e2e8f0` with one accent on the average line — appropriate because it's a "fairness" view, not categorical

### NCD disease breakdown (multi-disease)
- Each disease has a hard-coded color: DM=`#ef4444`, HT=`#f59e0b`, DLP=`#eab308`, IHD=`#dc2626`, etc.
- This is the EXCEPTION because clinicians associate diseases with colors. Don't replicate elsewhere.

### Imaging services (XRAY/CT/Portable/BMD)
- 4 services, 4 colors from palette: `#3b82f6` / `#7c3aed` / `#f59e0b` / `#ec4899`
- Maps to "modality category" — each modality consistently in same color across page
