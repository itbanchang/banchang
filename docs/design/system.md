# BCH 360° — Design System

Design principles + tokens + component catalog for the modern dashboard redesign (April 2026).

This is the single source of truth. Use it whenever you:
- Build a new tab
- Migrate an old tab
- Pick colours, spacing, typography
- Compose a new shared component

## Design principles

### 1. Decision-first, data-second

Every screen answers a single question the persona has right now. Numbers support the question, not replace it. If a user needs 30 seconds of staring to know "is today good or bad", the layout failed.

### 2. Glanceable status, drillable detail

Three-layer progressive disclosure (from `bch-ux-designer`):
- **Layer 1 (scan)**: status chip + KPI value + trend
- **Layer 2 (explain)**: tooltip / AI hint / benchmark
- **Layer 3 (drill)**: DrillDownModal with the underlying rows

No layer is skipped, none is hidden.

### 3. Thai-first, clinically calm

- Kanit font, line-height 1.7 body (accommodates tone marks).
- Semibold (600) default for text-base so Thai strokes stay crisp.
- Colour **never** the only signal — pair red with ⚠️ and bold text.
- No alarm fatigue: `danger` reserved for actionable critical events.

### 4. AI personality without noise

- Violet (`ai.600` = `#7c3aed`) is the AI colour.
- AI outputs get the ✨ mark + priority badge + source label (`claude | rule-based`).
- AI narratives **must show** confidence + top drivers.
- No auto-popping modals, no hypnotic gradients.

### 5. Responsive-native

Every component is mobile-first. Grids: `kpi-auto` utility falls back to 1-col ≤ 420px, 2-col at 480-768, and fluid from 1024px+.

### 6. Dark mode is a first-class citizen

- All colour tokens have dark-mode swaps via CSS variables.
- Surface + text use `var(--md-*)` never hardcoded hex.
- Tested: `html.dark` works with zero per-component overrides.

## Tokens

### Colours (Tailwind utility scale)

| Token | 600 / main hex | Use |
|-------|----------------|-----|
| `primary` | `#0f766e` (Deep Teal) | Primary brand, navigation, headers |
| `accent`  | `#059669` (Emerald)   | Success, good status, AI confidence |
| `danger`  | `#e11d48` (Rose)      | Critical alerts, red flags |
| `warning` | `#d97706` (Amber)     | Caution, below target |
| `info`    | `#0284c7` (Sky)       | Routine info, secondary stats |
| `ai`      | `#7c3aed` (Violet)    | AI narrative accent, Claude outputs |

Neutral surfaces use `surface.50–950` for light, and automatic dark variants via CSS vars.

### Typography scale (responsive)

See `src/index.css`. Tailwind aliases: `text-fs-{micro,2xs,xs,sm,base,md,lg,xl,2xl,3xl,hero}`.

| Token | Mobile | Laptop | QHD | Use |
|-------|--------|--------|-----|-----|
| `fs-3xl` | 24px | 24px | 26px | KPI hero value |
| `fs-2xl` | 20px | 20px | 22px | KPI value |
| `fs-xl`  | 16px | 16px | 18px | Card title |
| `fs-lg`  | 14px | 14px | 16px | Section title |
| `fs-base` | 11px | 11px | 13px | Body default |
| `fs-xs`  | 9px  | 10.5px | 12px | Table cells |

### Spacing & radii

- Grid step: 4px. Use `p-3/4/5/6` — never arbitrary `p-[7px]`.
- Card interior: `p-4 sm:p-5 lg:p-6`.
- Radius: `rounded-card` (16px) for surfaces, `rounded-pill` for chips, `rounded-xl` (12px) for inputs.

### Elevation

`shadow-elev-sm | elev-md | elev-lg | elev-xl | brand | card | card-hover | focus | danger-focus`

Prefer semantic names over raw pixel values in new code.

### Motion

`animate-fade-in | slide-up | slide-down | slide-right | pulse-soft | pulse-live | ai-glow | shimmer`

Default tab-entry: `animate-fade-in`. Default KPI-row reveal: `animate-slide-up`.

## Component catalog (modern set)

Built in April 2026, live in `src/components/shared/`.

- **`AppShell`** — responsive layout (sidebar + header + content). Mobile drawer + desktop fixed.
- **`Sidebar`** — collapsible, searchable, grouped nav. Keyboard toggle `Cmd/Ctrl+B`.
- **`AppHeader`** — sticky top bar: breadcrumb + live clock + command-palette trigger + alerts + theme + user menu.
- **`KPICardV3`** — Tailwind-native KPI card. Registry-aware (accepts `{value, status, format}`). Replaces `KPICardV2`'s inline styles.
- **`ChartCard`** — consistent chart wrapper: title, toolbar, custom legend swatches, loading/empty states.
- **`SectionCard`** — titled surface with optional accent bar + toolbar.
- **`StatChip`** — small semantic pill. 6 statuses: good/warning/danger/info/ai/unknown.
- **`InsightBadge`** — AI narrative indicator with priority + source label.

Older components stay backward-compatible; migrate tab-by-tab using the playbook.

## JSX composition helpers

In `src/theme/compose.js`:

```js
import { cn, card, t, fmt, kpiTint, statusOf } from '../theme/compose.js';

// Class joiner
<div className={cn('flex', isActive && 'bg-primary-600')} />

// Pre-composed classes
<div className={card}>...</div>

// Typography presets
<h3 className={t.sectionTitle}>...</h3>
<p className={t.bodyDim}>...</p>

// Formatters
{fmt.currency(1234567)}   // "฿1.2M"
{fmt.thaiDate(new Date())} // "23 เมษายน 2569"

// Status classification
const status = statusOf(value, { goodMax: 40, warningMax: 60 });
```

Tokens in `src/theme/tokens.js` for inline styles or Recharts.

## Accessibility

- WCAG 2.1 Level AA as baseline (see `bch-ux-designer/references/accessibility.md`).
- Every interactive element is keyboard-reachable with visible focus.
- Thai body ≥ 14px, line-height ≥ 1.5.
- Colour contrast ≥ 4.5:1 for text, ≥ 3:1 for graphical objects.
- `prefers-reduced-motion` respected (animations off).

## What NOT to do

- **Inline hex colours in components.** Use `tokens.js` or Tailwind classes.
- **Arbitrary `text-[10px]`.** Use `text-fs-2xs`, or bump to `text-fs-xs`.
- **New KPICard variants.** Extend `KPICardV3` via props, don't clone.
- **Emoji as interactive affordance.** Pair with a `<button>` + label.
- **`dangerouslySetInnerHTML` for AI output.** Sanitize first or use plain string rendering.
- **Custom colours for severity.** Stick to `danger/warning/accent/info` tokens.

## Where to go next

- Migration playbook: `docs/design/migration-playbook.md`
- UX principles (personas, flows, a11y): `.claude/skills/bch-ux-designer/SKILL.md`
- UI specifics (chart patterns, legacy tokens): `.claude/skills/bch-ui-designer/SKILL.md`
- Metrics & data: `.claude/skills/bch-analytics-engineer/SKILL.md`
