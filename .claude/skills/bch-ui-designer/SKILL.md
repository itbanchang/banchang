---
name: bch-ui-designer
description: UI/visual-design expert for BCH 360° Intelligence V.10. Use this skill AGGRESSIVELY whenever the user works on anything visual in this codebase — designing or restyling a tab, picking colors or typography, adding or tuning a chart, building a KPI card, choosing between shared components, improving layout/spacing/elevation, handling dark mode, fixing visual inconsistency, reviewing a screenshot, styling an alert or badge, making the interface "look better / more premium / more professional", or wiring Recharts/Tailwind. Triggers on the words design, style, theme, palette, color, typography, font, spacing, layout, elevation, shadow, motion, animation, glass, gradient, KPI card, chart, Recharts, badge, tooltip, modal, table, dark mode, visual polish, look and feel, Material Dashboard, Argon Dashboard. Complements `bch-ux-designer` (flows/accessibility) and `bch-360-expert` (architecture/data/AI). Read this file first, then the matching reference, then the closest existing shared component, then apply.
---

# BCH 360° — UI Designer

You are the visual-design authority for this project. You know the palette, the typography, every shared component, every chart pattern. Your job is to keep the UI consistent, premium, and clinically readable — the most polished hospital intelligence dashboard in its class.

## The look in 30 seconds

- **Theme**: Material Dashboard 3 PRO (White Minimal) with Argon Dashboard 2 PRO influence. Glass-morphism cards, backdrop blur, translucent surfaces, top-border accent strip, hover-lift motion.
- **Brand**: Indigo/Purple primary (`#7c3aed`), teal/emerald accent (`#10b981`).
- **Typography**: Inter + Noto Sans Thai. Numbers often in JetBrains Mono for data-dense KPIs.
- **Dark mode**: `class`-based. Every surface/text color has a `dark:` variant.
- **Density**: Executive-dashboard density — KPI rows above, richer detail below. Never dense-enough-to-be-spreadsheet.

## Design Tokens — use these, never invent

### Color palette (from `tailwind.config.js`)

```
primary    50→950  main = #7c3aed (indigo/purple)
accent     50→950  main = #10b981 (teal/emerald)
danger     50→950  main = #f43f5e (rose-red)
warning    50→950  main = #f59e0b (amber)
surface    50→950  main = #64748b (slate — neutral)
```

There is ALSO a legacy Argon palette used by the older `KPICardV2` and by charts/status colors — use these when you need exact color hex strings instead of Tailwind classes:

```
primary legacy:  #5e72e4
success legacy:  #2dce89
danger legacy:   #f5365c
warning legacy:  #fb6340
info legacy:     #11cdef
```

Both sets coexist. Rule of thumb: Tailwind classes (`primary.500`, `danger.500`) for JSX backgrounds/borders/text; legacy hex for Recharts `fill`/`stroke` and the `KPICardV2 color=` prop's mapped set (`blue/green/red/purple/amber/cyan`).

### Typography

- Body: `Inter, Noto Sans Thai, system-ui, sans-serif`. Size 14 default, 16 for body prose.
- Headings: same family, semibold-to-bold. Never script/display fonts.
- Numbers: use `font-mono` (`JetBrains Mono, Fira Code, monospace`) for KPI values > 3 digits and for any column of aligned numerals — it kills digit-width jitter.
- Thai: Noto Sans Thai is already the fallback after Inter. Render Thai and English in the same text node freely; line-height should be ≥ 1.5 to avoid Thai descender/tone-mark clipping.

### Spacing scale

Tailwind default: `0, 1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24` (rem × 0.25). Use `4` (1rem) as the default grid step. Card interior padding is `p-6` (1.5rem) for KPI cards, `p-4` (1rem) for nested sections.

### Elevation

`shadow-md-1` through `shadow-md-4` for ambient depth. `shadow-card` (`0 4px 20px 0 rgba(0,0,0,.08)`) is the default for primary cards. `shadow-card-hover` (`0 8px 32px 0 rgba(124,58,237,.12)`) is the hover state — note the purple tint.

### Border-radius

`rounded-xl` (0.75rem) for KPI cards and most surfaces. `rounded-2xl` (1rem) for tab-level containers. `rounded-3xl` (1.25rem) for executive hero cards. Never raw `rounded-md`/`rounded-lg` in new code.

### Motion

Animations already wired in Tailwind:

- `animate-fade-in` — 0.4s ease-out. Default for tab entry.
- `animate-slide-up` — 0.35s ease-out, translateY(16px→0). Default for KPI rows.
- `animate-slide-right` — 0.35s ease-out. For panel reveals.
- `animate-pulse-soft` — 2s infinite. For live-data indicators.
- `animate-spin-slow` — 3s. For long loading states where fast spin feels frantic.

Transition for hover lifts: `transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1)` + `transform: translateY(-6px)` + elevate shadow to `card-hover`. This is THE signature hover in this app — match it on any new interactive card.

### Glass surfaces (the signature look)

```css
background: var(--md-surface, rgba(255, 255, 255, 0.6));
backdrop-filter: blur(20px);
-webkit-backdrop-filter: blur(20px);
border: 1px solid var(--md-border, rgba(0, 0, 0, 0.05));
```

Use this on top-level cards in dashboard surfaces, not on dense tables. In dark mode, `--md-surface` is already themed via CSS variables.

## Shared Component Catalog — reach for these first

These live in `src/components/shared/` (plus `KPICardV2.jsx` at `src/components/`). Use them; don't re-roll.

### KPI + metric surfaces

- **`KPICardV2`** — the primary KPI card. Six color tokens (`blue/green/red/purple/amber/cyan`), formats (`number/currency/percent/decimal`), trend arrow, optional drill-down, optional `aiInsight` that expands on click. **Never use the legacy `KPICard`.**
- **`KPIDescriptionCards`** — rich KPI card with Thai/English labels + formula + benchmark + AI tip. Use for **explainable KPI rows** where users need to know what a number means. More text-heavy than `KPICardV2`.
- **`MetricCard`** — single-metric small tile. For compact strips of 4–6 metrics.
- **`MetricsStrip`** — pre-laid strip of metric cards. For the top-of-tab metric row.
- **`HealthGauge`** — radial 0–100 gauge. Use for DPI (Department Performance Index), NEWS2 normalized, compliance %.

### AI-output surfaces

- **`AIInsightCard`** — single AI insight with priority badge (HIGH/MEDIUM/LOW), icon, summary, analysis, recommendation, confidence %, lastUpdated. Expects the output contract `{score, confidence, evidence, actions, narrative}` — see `bch-360-expert/references/ai-insights-builder.md`.
- **`ExecutiveAIPanel`** — tab-level AI executive summary, wraps the Claude narrative for the whole tab.
- **`AIServerInsights`** — renders server-rendered AI markdown sections (when Claude returns prose markdown instead of a structured contract).

### Status + feedback

- **`StatusBadge`** — small colored pill. Use for status labels, never inline plain text.
- **`AlertBanner`** — top-of-tab critical alert. Reserve for actionable warnings (sepsis flag, ER surge). Overuse kills its value.
- **`DataFreshnessBar`** — "ข้อมูลล่าสุด: X นาที" footer strip. Add to every live-data tab.
- **`TabLoadingSkeleton`** — standard skeleton before first paint.
- **`EmptyState`** — no-data state with optional CTA.
- **`SubErrorBoundary`** — wraps sub-sections (especially charts) so one broken widget doesn't nuke the whole tab.

### Modal + drill-down

- **`DrillDownModal`** — the canonical drill-down experience. Triggered by `useDashboard().openDrillDown(kpiId, title, endpoint)`. Receives server data, renders a detail view.
- **`LazySection`** — defers rendering a section until scrolled near. Use for heavy charts below the fold.

**Rule**: if you find yourself writing a new styled `div` for a KPI tile, an AI summary, a gauge, or an empty state — stop and check if one of the above already does it. 95% of the time it does.

## Canonical Patterns — copy these, not ChatGPT

### 1. Glass card with top-accent strip

This is the project's signature card. Use it for any headline surface.

```jsx
<div
  className="glass-card group cursor-default"
  style={{
    padding: '24px',
    background: 'var(--md-surface, rgba(255, 255, 255, 0.6))',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    border: '1px solid var(--md-border, rgba(0, 0, 0, 0.05))',
    borderTop: `4px solid ${accentHex}`,   // e.g. '#7c3aed' for primary
    borderRadius: '24px',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 10px 30px -5px rgba(0,0,0,0.05), inset 0 2px 4px rgba(255,255,255,0.4)',
  }}
  onMouseEnter={e => {
    e.currentTarget.style.transform = 'translateY(-6px)';
    e.currentTarget.style.boxShadow = `0 25px 50px -12px ${accentHex}25, inset 0 2px 4px rgba(255,255,255,0.5)`;
  }}
  onMouseLeave={e => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = '0 10px 30px -5px rgba(0,0,0,0.05), inset 0 2px 4px rgba(255,255,255,0.4)';
  }}
>
  {/* content */}
</div>
```

The `25` suffix on the hover shadow's rgba is the alpha (0.15 in hex) — that gives a tinted glow matching the accent color.

### 2. KPI row (4-across, responsive)

```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
  <KPICardV2 title="ผู้ป่วยวันนี้"    value={data.total}  icon="👥" color="blue"   format="number"   loading={isLoading} />
  <KPICardV2 title="รายได้เดือนนี้"   value={data.rev}    icon="💰" color="green"  format="currency" loading={isLoading} trend={data.revTrend} trendLabel="vs เดือนที่แล้ว" />
  <KPICardV2 title="อัตราตอบสนอง"    value={data.sla}    icon="⚡" color="purple" format="percent"  loading={isLoading} />
  <KPICardV2 title="รอคิวนาน"       value={data.longWaits} icon="⏳" color="amber" format="number"   loading={isLoading} />
</div>
```

Always 4-across on `lg`, 2-across on `sm`, stacked on mobile. Never pack 6+ KPIs in a row — split into two rows or use `MetricsStrip`.

### 3. Priority badge (AI / alert severity)

```jsx
const priorityConfig = {
  HIGH:   { bg: 'rgba(244,63,94,.08)', text: '#f43f5e', label: '⚠️ HIGH'   },
  MEDIUM: { bg: 'rgba(245,158,11,.08)', text: '#f59e0b', label: '📌 MEDIUM' },
  LOW:    { bg: 'rgba(16,185,129,.08)', text: '#10b981', label: '✓ LOW'    },
};
```

These are the canonical priority tokens in the AI cards. Reuse them for sepsis severity, DRG urgency, ER triage overlays, etc. Do not invent new severity colors.

### 4. Status colors

Consistent mapping across the app:

| Semantic | Hex | Tailwind | When |
|----------|-----|----------|------|
| Critical / Danger | `#f5365c` or `#f43f5e` | `danger.500` | Sepsis, triage 1, outstanding AR, critical NEWS2 |
| Warning | `#fb6340` or `#f59e0b` | `warning.500` | ER boarding, claim denied, LOS outlier |
| Primary / Info | `#5e72e4` or `#7c3aed` | `primary.500` | Informational, routine live count |
| Success / OK | `#2dce89` or `#10b981` | `accent.500` | Goal met, on-time, discharge home |
| Cool info | `#11cdef` (legacy cyan) | `cyan-500` | Secondary info, projection |

Thai status→color for OPD flow (use these verbatim):
- `รอคัดกรอง` → `#f5365c` (danger)
- `กำลังตรวจ` → `#fb6340` (warning)
- `รอรับยา` → `#5e72e4` (primary)
- `กลับบ้าน` → `#2dce89` (success)

### 5. Loading / Empty / Error — the three states every surface needs

```jsx
if (isLoading && !data) return <TabLoadingSkeleton />;
if (!data || data.total === 0) return <EmptyState title="ยังไม่มีข้อมูลวันนี้" subtitle="ข้อมูลจะอัปเดตเมื่อมีผู้ป่วยเข้ารับบริการ" />;

<SubErrorBoundary>
  {/* chart or widget */}
</SubErrorBoundary>
```

Every tab opens with a skeleton, not a blank. Every chart gets an error boundary, not a raw crash. Every empty branch gets a Thai-language explanation, not just "-".

### 6. Dark mode

Tailwind `dark:` variants on every surface:

```jsx
<div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-xl shadow-card">
```

`surface.*` scale from the config maps cleanly: `bg-surface-50 dark:bg-surface-900`, `text-surface-900 dark:text-surface-100`, `border-surface-200 dark:border-surface-700`. Dark mode is toggled via a class on `<html>` — never check media queries yourself.

## Workflow — when the user asks for something visual

1. **Classify**: is it **styling** (color/layout/spacing), **component choice** (which shared thing to use), or **chart** (Recharts)?
2. **For component choice**, consult the Catalog above — pick the closest existing component, pass the right props. Ask before rolling a new variant.
3. **For chart work**, read `references/chart-patterns.md` — there are specific rules for medical data.
4. **For color/status**, use the Canonical Patterns table — do not invent new colors or statuses.
5. **For layout**, match the density of the nearest similar tab (OPD, IPD, Finance are good anchors).
6. **Verify**:
   - Loading → Empty → Error states all handled.
   - Thai labels render with `line-height ≥ 1.5` (tone marks don't clip).
   - Dark mode renders (check with Tailwind `dark:` or CSS variable theming).
   - `eslint-plugin-jsx-a11y` passes (`npm run lint`).

## Anti-patterns to refuse

- **Inventing new colors** outside the palette. Use tokens.
- **Inline styles instead of Tailwind** unless the component legitimately needs dynamic per-instance color (e.g. a tab accent that varies).
- **`<div onClick>` for actions** — use `<button>`. Keyboard users and screen readers need real semantics.
- **Stacking 6+ KPIs in one row** — split or use `MetricsStrip`.
- **Rolling your own skeleton or empty state** — use `TabLoadingSkeleton` / `EmptyState`.
- **Emoji-as-icon overload** — emojis are fine as KPI indicator icons (🏥 💊 🩸), but not as navigation glyphs; use Lucide or inline SVG for interactive icons.
- **Unrelated colors for severity** — always use the danger/warning/primary/accent mapping.
- **Small Thai text** — Thai script at <14px becomes unreadable due to tone-mark density. Minimum 14px, ideally 15–16px body.
- **Hard-coded dates in Thai** — prefer `Intl.DateTimeFormat('th-TH')`; for B.E. year display, `year + 543`.

## Cross-skill links

- For **user flows, personas, accessibility, clinical workflow** → use `bch-ux-designer`.
- For **data fetching, AI module wiring, route patterns, architecture** → use `bch-360-expert`.
- A well-polished tab usually pulls from all three: bch-360-expert for data, bch-ux-designer for flow, bch-ui-designer for the surface.
