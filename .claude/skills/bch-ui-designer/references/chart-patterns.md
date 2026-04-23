# Chart Patterns — Recharts for Medical Data

Read this when placing, styling, or tuning any chart in the project. Recharts is the sole chart library; d3 is only transitively present through Recharts.

## Rules that apply to every chart

1. **Always wrap in `ResponsiveContainer`** with a fixed `height` (numeric pixels). Never fixed width + height.
2. **Always wrap in `<SubErrorBoundary>`** — Recharts throws on malformed data, and a broken tooltip must not nuke the tab.
3. **Turn off animation for live/streaming data** — `isAnimationActive={false}`. Re-animating on every socket update destroys perceived performance.
4. **Memoize data transforms** with `useMemo`. Chart data shouldn't be re-created every render.
5. **No more than ~1000 points** in a single `LineChart`/`AreaChart`. Downsample server-side first. 30 days of 1-minute data is 43,200 points — unreadable and slow.
6. **Always set a CartesianGrid with `strokeDasharray="3 3"`** and `XAxis dataKey` + `YAxis` explicitly. Default Recharts axes look unfinished.
7. **Thai XAxis ticks**: for date axes, format as `M/D` or `ม.ค.` etc., NOT ISO. Use a `tickFormatter` prop.

## Color rules specific to charts

Use legacy hex codes for Recharts `fill`/`stroke` so they render identically in light and dark modes without needing Tailwind:

- Primary series: `#5e72e4`
- Secondary/comparison: `#fb6340` (e.g. "เมื่อวาน")
- Prediction/forecast: `#2dce89` with `strokeDasharray="5 5"`
- Benchmark/target: `#8392ab` (muted slate)
- Danger threshold line: `#f5365c`

Bar charts for categorical status use the Thai status palette (see SKILL.md).

For a line/area chart with `today / yesterday / prediction`, always in this visual order (bottom to top / left to right in the legend): yesterday → today → prediction. This matches how clinicians read comparisons.

## Pattern: Hourly-flow chart (the OPD staple)

The OPD tab's hourly chart is the canonical reference. Reproduce its shape for any similar "today vs baseline vs prediction" view:

```jsx
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const hourlyChart = useMemo(() => (opd?.hourly || []).map((h, i) => ({
  hour: `${h.hour}:00`,
  count: h.count,                                 // today bar
  yesterday: opd?.hourly_yesterday?.[i]?.count ?? 0, // yesterday line (dim)
  prediction: opd?.hourly_prediction?.[i]?.count ?? 0, // prediction line (dashed)
  baseline:  opd?.hourly_benchmark?.[i]?.avg   ?? 0, // 7-day baseline
})), [opd]);

<SubErrorBoundary>
  <ResponsiveContainer width="100%" height={280}>
    <ComposedChart data={hourlyChart} margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
      <XAxis dataKey="hour" tick={{ fontSize: 12 }} />
      <YAxis tick={{ fontSize: 12 }} />
      <Tooltip contentStyle={{ borderRadius: 8, border: '1px solid #e2e8f0' }} />
      <Legend wrapperStyle={{ fontSize: 12 }} />
      <Bar  dataKey="count"      fill="#5e72e4" name="วันนี้" radius={[4, 4, 0, 0]} isAnimationActive={false} />
      <Line dataKey="yesterday"  stroke="#fb6340" strokeWidth={2} dot={false} name="เมื่อวาน" isAnimationActive={false} />
      <Line dataKey="prediction" stroke="#2dce89" strokeWidth={2} strokeDasharray="5 5" dot={false} name="คาดการณ์" isAnimationActive={false} />
      <Line dataKey="baseline"   stroke="#8392ab" strokeWidth={1} dot={false} name="ค่าเฉลี่ย 7 วัน" isAnimationActive={false} />
    </ComposedChart>
  </ResponsiveContainer>
</SubErrorBoundary>
```

## Pattern: Status-composition pie (triage, outcome, payer mix)

Pies are OK for 3–5 categories, never more. For triage levels, use the project's status palette:

```jsx
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#f5365c', '#fb6340', '#5e72e4', '#11cdef', '#2dce89']; // triage 1→5

<ResponsiveContainer width="100%" height={240}>
  <PieChart>
    <Pie data={data} dataKey="count" nameKey="label" innerRadius={40} outerRadius={80} paddingAngle={2}>
      {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
    </Pie>
    <Tooltip />
  </PieChart>
</ResponsiveContainer>
```

Always include `innerRadius > 0` (donut) — solid pies look dated. Legend goes to the side via a wrapper `div`, not inside Recharts, for layout control.

## Pattern: Revenue forecast band (forecast + CI)

For forecast charts with confidence interval:

```jsx
<ResponsiveContainer width="100%" height={320}>
  <ComposedChart data={forecastData}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="month_name" />
    <YAxis tickFormatter={v => `฿${(v / 1e6).toFixed(1)}M`} />
    <Tooltip formatter={v => `฿${(v / 1e6).toFixed(2)}M`} />
    <Legend />
    {/* CI band: area between lower and upper */}
    <Area dataKey="upper" stroke="none" fill="#2dce89" fillOpacity={0.15} name="ช่วงคาดการณ์บน" />
    <Area dataKey="lower" stroke="none" fill="#ffffff" fillOpacity={1} name="" legendType="none" />
    <Line dataKey="actual"   stroke="#5e72e4" strokeWidth={3} dot={{ r: 4 }} name="จริง" />
    <Line dataKey="forecast" stroke="#2dce89" strokeWidth={3} strokeDasharray="5 5" name="คาดการณ์" />
  </ComposedChart>
</ResponsiveContainer>
```

The trick for a band is to layer two `<Area>`s — fill between upper and lower by painting `lower` in the background color over the full `upper` area. Inelegant but it's what works in Recharts without a custom shape.

## Pattern: Gauge (use `HealthGauge`, not Recharts)

For 0–100 scores (DPI, NEWS2 normalized, compliance %), use the shared `<HealthGauge>` component — it's SVG-based and faster than a Recharts `RadialBarChart`. Only drop to `RadialBarChart` if you need a multi-arc radial.

## Pattern: Heatmap (day-of-week × hour)

Recharts doesn't have a first-class heatmap. Two options:

1. **Build with CSS Grid + conditional `background`** — cheap and fast, works for 7×24 grids.
2. **Use `ScatterChart` with square shape + `Cell` color scaling** — ugly API, but works.

Prefer option 1 for clinical heatmaps. Color scale: interpolate between `#f5f3ff` (primary.50, low) and `#4c1d95` (primary.800, high).

## Tooltip customization

Default Recharts tooltip is too wide and too opaque. Standardize:

```jsx
<Tooltip
  contentStyle={{
    borderRadius: 8,
    border: '1px solid #e2e8f0',
    boxShadow: '0 4px 20px 0 rgba(0,0,0,.08)',
    padding: '8px 12px',
    fontSize: 13,
  }}
  labelStyle={{ fontWeight: 600, marginBottom: 4 }}
  formatter={(value, name) => [value.toLocaleString('th-TH'), name]}
/>
```

For currency tooltips, wrap the formatter: `formatter={v => '฿' + (v/1e6).toFixed(2) + 'M'}`.

## Legend placement

- Top-right (default): for 2–3 series.
- Bottom-center: for 4+ series or when chart needs vertical real estate for the plot.
- Side (custom div, Recharts `Legend` wrapper): for composition pies.

```jsx
<Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
```

Never show a legend for a single-series chart — it's redundant.

## Animation timing

For tab-entry charts where the first render should feel alive, keep default animation (enter transition).

For live-updating charts (Socket.IO-driven counts, ER triage live, NEWS2 stream), **always `isAnimationActive={false}`**. Animating a bar chart on every 1s update looks like a seizure.

## Performance tips

- Downsample series with >500 points server-side (`LTTB` or simple bucketed averaging).
- For long horizontal line charts, set `interval="preserveStartEnd"` on `XAxis` to suppress tick crowding.
- Hide dots on lines with >60 points: `dot={false}` + `activeDot={{ r: 4 }}`.
- For dense bar charts, set `barSize` explicitly (e.g. `barSize={18}`) — Recharts' auto-sizing makes tiny bars on mobile.

## Medical-data-specific gotchas

- **Zero is not null.** A chart showing "0 admissions today" is different from "no data". Always plot explicit zeros and use `<EmptyState>` only when the underlying dataset is empty.
- **Negative on bar charts means reversal.** If you plot AR aging or variance, use stacked bars with `#f5365c` for overdue / negative and `#2dce89` for positive.
- **Threshold lines matter.** For NEWS2 charts, always plot `ReferenceLine` at y=3, y=5, y=7 with the severity colors. For SLA charts, plot the target as a dashed ReferenceLine so "passing" is visually obvious.
- **Weekends and holidays** visibly differ from weekdays. Shade them with `ReferenceArea` or a pale band — clinicians will ask "why was Saturday low?" otherwise.
- **Time zone** is Asia/Bangkok (+07:00). Server-side date serialization should use `dateStrings: true` in mysql2 config (already set in `server/db/mysql.js`) so there's no UTC drift.

## When NOT to use a chart

- For a single number with a trend → `KPICardV2` with `trend` prop.
- For a 0–100 gauge → `HealthGauge`.
- For a status queue → sortable table, not a stacked bar.
- For a narrative → Claude-generated text in `AIInsightCard`, not a "visualized paragraph."
