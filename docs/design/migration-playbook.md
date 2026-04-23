# Migration Playbook — Old tabs → New design system

How to migrate the 16 remaining tabs to the new design system, one at a time, without breaking the app.

## Goal per migration

Each tab should, after migration:

- Use `KPICardV3` (or the registry's metric output) for every KPI.
- Use `SectionCard` / `ChartCard` for every bordered surface.
- Use `StatChip` / `InsightBadge` for status + AI output.
- Use `t.*` + Tailwind utilities — **no inline styles for colors/spacing/typography**.
- Handle 4 states: Loading → Empty → Data → Error.
- Render cleanly on mobile (< 640px), tablet (640–1024), desktop (≥ 1024).
- Pass `npm run lint` and open in dark mode without regressions.

## Recommended order

Pick easiest + highest-impact first, so the team gets quick wins:

1. **Finance** — data-dense + most-used by director persona.
2. **IPD** — clinical flagship.
3. **OPD** — operations flagship.
4. **ER** — real-time showcase.
5. **Dashboard / Executive** — already done (v2 exemplar).
6. **NCD, Clinical, Dental, Thai Med, Phys Therapy** — similar shapes; batch together.
7. **MedRec, XRAY, Pharmacy, Laboratory, Quality** — secondary modules.
8. **Customer Insight, Report, Compare, Evolution** — admin / long-tail.

Budget ~1 day per tab for a careful migration + smoke test.

## Step-by-step

### 1. Read the old tab

Look for three things:
- **Inline styles** (especially `fontSize`, color hexes, `padding`, `margin`).
- **Shared components already used** (`KPICardV2`, `AIInsightCard`, etc.) — these keep working during migration.
- **Hardcoded SQL or formulas** — these move to `server/metrics/`, NOT the tab.

### 2. Extract metrics to the registry

If the tab computes KPIs inline (SQL or JS), extract to `server/metrics/<category>/<name>.js`. See `bch-analytics-engineer/references/metric-catalog.md`.

Replace route-level inline SQL with `compute()` calls.

### 3. Layout the skeleton

```jsx
import KPICardV3 from './shared/KPICardV3.jsx';
import SectionCard from './shared/SectionCard.jsx';
import ChartCard from './shared/ChartCard.jsx';
import StatChip from './shared/StatChip.jsx';
import InsightBadge from './shared/InsightBadge.jsx';
import { t, cn, fmt } from '../theme/compose.js';
import { chart, color } from '../theme/tokens.js';
```

### 4. The 4-state shell

```jsx
function FinanceTab() {
  const { state, fetchData } = useDashboard();
  useEffect(() => { fetchData('financeToday', '/api/finance/today'); }, [fetchData]);

  const data = state.financeToday;
  const loading = state.loading?.financeToday;
  const error = state.errors?.financeToday;

  if (loading && !data) return <TabLoadingSkeleton />;
  if (error) return <EmptyState title="โหลดข้อมูลไม่ได้" subtitle={error} />;
  if (!data) return <EmptyState title="ยังไม่มีข้อมูล" />;

  return (
    <div className="space-y-4 sm:space-y-5 animate-fade-in">
      {/* ...content... */}
    </div>
  );
}
```

### 5. KPI row (standard template)

```jsx
<div className="grid grid-cols-kpi-auto gap-3 sm:gap-4">
  <KPICardV3
    title="REVENUE TODAY"
    thTitle="รายได้วันนี้"
    value={data.revenue}
    format="currency"
    color="primary"
    status="good"
    icon="💰"
    trend={data.revenueTrend}
    trendLabel="vs เดือนก่อน"
    aiHint={data.revenueTrend > 10 ? 'Strong growth — verify seasonal' : undefined}
  />
  {/* ... more KPICards ... */}
</div>
```

**Key mapping** (from old to new):
- `<KPICardV2 color="blue">` → `<KPICardV3 color="primary">`
- `<KPICardV2 color="red">` → `<KPICardV3 color="danger">`
- `<KPICardV2 color="green">` → `<KPICardV3 color="accent">`
- `<KPICardV2 color="amber">` → `<KPICardV3 color="warning">`
- `<KPICardV2 color="cyan">` → `<KPICardV3 color="info">`
- `<KPICardV2 color="purple">` → `<KPICardV3 color="ai">`

### 6. Charts → ChartCard

```jsx
<ChartCard
  title="แนวโน้มรายได้ 30 วัน"
  subtitle="YoY comparison"
  icon="📈"
  series={[
    { label: 'ปีนี้',  color: chart.primary },
    { label: 'ปีที่แล้ว', color: chart.comparison },
  ]}
  height={280}
  loading={loading}
  empty={!data?.trend?.length}
>
  <ResponsiveContainer width="100%" height="100%">
    {/* ...Recharts inside */}
  </ResponsiveContainer>
</ChartCard>
```

Always set `isAnimationActive={false}` on live-updating charts.

### 7. AI insights → InsightBadge

```jsx
{insights.map((ins, i) => (
  <InsightBadge key={i} priority={ins.priority} source={ins.source}>
    {ins.message}
  </InsightBadge>
))}
```

Or wrap in a `SectionCard` with accent="ai" for a group:

```jsx
<SectionCard title="AI Insights" accent="ai" icon="✨">
  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
    {/* ...InsightBadges... */}
  </div>
</SectionCard>
```

### 8. Remove legacy surface classes

Replace:
- `className="glass-card"` → use `<SectionCard>` or compose via `cn(card, cardPad)`
- `style={{ padding: '24px', borderRadius: '24px', ... }}` → Tailwind classes or `cardBase` import

### 9. Responsiveness check

Walk these breakpoints:
- 375px (phone portrait)
- 768px (tablet portrait)
- 1024px (desktop)
- 1920px (QHD, common office monitor)

Every grid wraps, no horizontal scroll except tables. KPI row: 1/2/3/4 columns as width grows.

### 10. Dark mode smoke test

Toggle the theme. If any text becomes unreadable, that's a hardcoded colour — replace with CSS vars or Tailwind class.

### 11. Lint + test

```bash
npm run typecheck
npm run lint
npm run test
```

Run each before PR. The `observabilityMiddleware` will tag request logs with the component path; use that to verify the new tab's routes are hit in dev.

## Common pitfalls

### "My chart still looks old"

You probably kept the old `<Tooltip />` without Recharts overrides. `index.css` has global tooltip + axis tick styling via CSS vars — make sure you import `recharts` primitives the same way other tabs do.

### "Mobile looks cramped"

Check the KPI row has `grid-cols-kpi-auto` (auto-fit with 240px min), not fixed `md:grid-cols-4`.

### "Dark mode: white flash on some cards"

You have inline `background: '#fff'`. Use `className="bg-[color:var(--md-surface)]"` instead.

### "New component doesn't match existing one"

Don't diverge. If you need a variant, add a prop to the shared component. Don't clone. See `docs/design/system.md` principle 5.

## Tooling

### Grep old inline styles

```bash
grep -rn "fontSize: '" src/components/XxxTab.jsx
grep -rn "backgroundColor: '#" src/components/XxxTab.jsx
grep -rn "padding: '" src/components/XxxTab.jsx
```

Fewer matches = healthier migration.

### Lint-friendly rename

Rename the old component as `<Name>Tab.legacy.jsx` before deleting, so PR reviewers can diff the migration.

## Sign-off checklist (per tab)

- [ ] All KPIs use `KPICardV3`.
- [ ] All surfaces use `SectionCard` or `ChartCard`.
- [ ] No inline `style={{ fontSize / color / padding }}` outside of one-off SVG helpers.
- [ ] 4 states handled (Loading / Empty / Data / Error).
- [ ] Works at 375 / 768 / 1024 / 1920 widths.
- [ ] Works in light + dark mode.
- [ ] `npm run lint` clean.
- [ ] Manual smoke-test: clicked into drill-down, checked keyboard nav.
- [ ] PR links to the old component for reviewer diff.
- [ ] Updated `CHANGELOG.md`.
