# Feature Architect — Build New Features

Read this file when the user asks to **add** something: a new tab, a new KPI, a new chart, a new API endpoint, a new widget, a new sub-page.

## Decide first: is this a new Tab, or a widget inside an existing tab?

- **New Tab** when the domain is distinct (e.g., "Dialysis unit" — not covered by existing tabs) and would need its own sidebar entry.
- **New Widget** inside an existing tab when it's a new angle on existing data (e.g., "Add a diabetic-patient KPI to the NCD tab").

Default to Widget unless the user clearly wants a new navigation entry.

## Recipe: Add a new KPI card to an existing tab

1. **Figure out what SQL gives you the number.** Check if the tab's route (`server/routes/<tab>.js`) already queries it in its main `/today` or `/summary` endpoint. If yes, you don't need a new endpoint — just add a field.
2. **Extend the existing route's SELECT** to include the new field. Example:
   ```js
   dbQueryOne(`
     SELECT
       COUNT(*) AS total,
       COUNT(DISTINCT hn) AS unique_patients,     -- new field
       SUM(CASE WHEN ... THEN 1 ELSE 0 END) AS critical_count
     FROM ovst
     WHERE vstdate = CURDATE()
   `)
   ```
3. **Add the field to the tab's data slice** in `src/stores/dashboardStore.js` (it's usually already permissive — check).
4. **Render a `<KPICardV2>`** in the tab:
   ```jsx
   <KPICardV2
     title="ผู้ป่วยใหม่วันนี้"
     value={opd?.unique_patients}
     icon="👤"
     color="blue"
     format="number"
     trend={opd?.unique_patients_trend}
     trendLabel="vs เมื่อวาน"
     loading={loading?.opdToday}
     aiInsight={opd?.ai_unique_patients}
   />
   ```
5. **Verify** with `npm run typecheck` + open http://localhost:4001.

## Recipe: Add a new chart to an existing tab

1. **Pick a Recharts component** that matches — `LineChart` for trends, `BarChart` for comparisons, `ComposedChart` for mixed, `PieChart`/`Pie` for composition, `ScatterChart` for correlation.
2. **Wrap in `<ResponsiveContainer>`** with a fixed height.
3. **Memoize data transforms** with `useMemo` — tabs re-render often.
4. **Wrap the chart** in `<SubErrorBoundary>` so one bad tooltip doesn't break the whole tab.
5. **Use project palette**:
   - Danger: `#f5365c`
   - Warning: `#fb6340`
   - Primary: `#5e72e4`
   - Success: `#2dce89`
   - Info: `#11cdef`

Example:

```jsx
const hourlyData = useMemo(() => (opd?.hourly || []).map((h, i) => ({
  hour: `${h.hour}:00`,
  count: h.count,
  yesterday: opd?.hourly_yesterday?.[i]?.count ?? 0,
  prediction: opd?.hourly_prediction?.[i]?.count ?? 0,
})), [opd]);

<SubErrorBoundary>
  <ResponsiveContainer width="100%" height={280}>
    <ComposedChart data={hourlyData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="hour" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="count" fill="#5e72e4" name="วันนี้" />
      <Line type="monotone" dataKey="yesterday" stroke="#fb6340" name="เมื่อวาน" />
      <Line type="monotone" dataKey="prediction" stroke="#2dce89" strokeDasharray="5 5" name="คาดการณ์" />
    </ComposedChart>
  </ResponsiveContainer>
</SubErrorBoundary>
```

## Recipe: Add a new REST endpoint

1. **Pick the right route file** — modality-based. OPD things → `server/routes/opd.js`. Cross-cutting → `server/routes/dashboard.js`. AI-specific → `server/routes/ai/` or a `/api/ai/...` path in `ai_routes.js`.
2. **Write the Zod schema** first. Coerce strings → numbers/dates at the schema layer, not inside the handler.
3. **Wrap in `cached()`** with a sensible TTL.
4. **Parallelize queries** with `Promise.all`.
5. **Audit-log any PII access** via `req.audit('read:xxx', { id })`.
6. **Log slow queries** — if `Date.now() - start > 1000`, warn via `logger.warn`.

Full template:

```js
import { Router } from 'express';
import { z } from 'zod';
import { cached } from '../cache/staleCache.js';
import { validateQuery } from '../middleware/validate.js';
import { authenticate, authorize } from '../middleware/auth.js';
import { dbQuery, dbQueryOne } from '../db/mysql.js';
import logger from '../logger.js';

const router = Router();

const querySchema = z.object({
  ward: z.string().min(1).max(20).optional(),
  days: z.coerce.number().int().min(1).max(90).default(7),
});

router.get(
  '/trend',
  authenticate,
  authorize(['admin', 'viewer']),
  validateQuery(querySchema),
  cached('xxxTrend', 5 * 60_000, async (req) => {
    const start = Date.now();
    const { ward, days } = req.query;

    const [series, summary] = await Promise.all([
      dbQuery(
        `SELECT DATE(vstdate) AS d, COUNT(*) AS n
         FROM ovst
         WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
           AND (? IS NULL OR dep = ?)
         GROUP BY DATE(vstdate)
         ORDER BY d`,
        [days, ward ?? null, ward ?? null]
      ),
      dbQueryOne(
        `SELECT COUNT(*) AS total, AVG(age) AS avg_age
         FROM ovst
         WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)`,
        [days]
      ),
    ]);

    const ms = Date.now() - start;
    if (ms > 1000) logger.warn('xxxTrend slow', { ms, ward, days });

    return { series, summary, generated_at: Date.now() };
  })
);

export default router;
```

Then register in `server/server.js`:

```js
import xxxRouter from './routes/xxx.js';
app.use('/api/xxx', xxxRouter);
```

## Recipe: Add a new Tab (full-stack)

This is the biggest change. Steps:

1. **Create the route** — `server/routes/<name>.js` (template above).
2. **Register it** in `server/server.js`.
3. **Add a data slice** to `src/stores/dashboardStore.js`. Most tabs need at least `<name>Today` + `<name>Trend`.
4. **Create the tab component** — `src/components/<Name>Tab.jsx`. Copy `OPDTab.jsx` as a starting skeleton; keep the top-level structure (KPIDescriptionCards → KPI strip → AIInsightCard row → main charts → drill-down table).
5. **Wrap in `SubErrorBoundary`** at the top.
6. **Add the tab to the navigation** — check `src/App.jsx` or the tab router component. Follow existing naming (Thai label + English key).
7. **Add RBAC** — authorize the relevant roles in the route.
8. **Verify**:
   - `npm run typecheck`
   - `npm run lint`
   - `npm run test:smoke`
   - Manual: open http://localhost:4001, log in, navigate to the new tab, check loading skeleton → data → drill-down.

### Minimal tab skeleton

```jsx
// src/components/XxxTab.jsx
import React, { useEffect, useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useShallowDashboardSelector, useDashboardActions } from '../context/DashboardContext.jsx';
import KPIDescriptionCards from './shared/KPIDescriptionCards.jsx';
import ExecutiveAIPanel from './shared/ExecutiveAIPanel.jsx';
import AIInsightCard from './shared/AIInsightCard.jsx';
import StatusBadge from './shared/StatusBadge.jsx';
import TabLoadingSkeleton from './shared/TabLoadingSkeleton.jsx';
import EmptyState from './shared/EmptyState.jsx';
import SubErrorBoundary from './shared/SubErrorBoundary.jsx';
import KPICardV2 from './KPICardV2.jsx';

function XxxTab() {
  const state = useShallowDashboardSelector(s => ({
    xxxToday: s.xxxToday,
    xxxTrend: s.xxxTrend,
    loading: s.loading,
  }));
  const { fetchData } = useDashboardActions();

  useEffect(() => {
    fetchData('xxxToday', '/api/xxx/today');
    fetchData('xxxTrend', '/api/xxx/trend?days=30');
  }, [fetchData]);

  const data = state.xxxToday;
  const isLoading = state.loading?.xxxToday;

  if (isLoading && !data) return <TabLoadingSkeleton />;
  if (!data) return <EmptyState title="ไม่มีข้อมูล" />;

  return (
    <div className="space-y-6">
      <KPIDescriptionCards
        title="Xxx Analytics"
        subtitle="คำอธิบายแท็บสั้น ๆ"
        color="blue"
      />

      <SubErrorBoundary>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KPICardV2 title="รวมวันนี้" value={data.total} icon="📊" color="blue" />
          <KPICardV2 title="เทียบเมื่อวาน" value={data.trend} format="percent" color={data.trend > 0 ? 'green' : 'red'} />
          <KPICardV2 title="ค่าเฉลี่ย" value={data.avg} format="decimal" color="purple" />
          <KPICardV2 title="ยอดคงเหลือ" value={data.pending} icon="⏳" color="amber" />
        </div>
      </SubErrorBoundary>

      {data.ai && (
        <SubErrorBoundary>
          <AIInsightCard {...data.ai} />
        </SubErrorBoundary>
      )}

      <SubErrorBoundary>
        <div className="bg-white dark:bg-slate-900 rounded-lg p-4 shadow">
          <h3 className="text-lg font-semibold mb-4">แนวโน้ม 30 วัน</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={state.xxxTrend?.series || []}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="d" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="n" stroke="#5e72e4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </SubErrorBoundary>
    </div>
  );
}

export default XxxTab;
```

## Recipe: Wire Socket.IO live updates

Use live updates when the data genuinely changes faster than the cache TTL — e.g., ER triage queue, bed assignments, NEWS2 alerts. Don't use it for hourly aggregates; a 30s refetch is fine.

### Server side

```js
// Inside a route handler or a cron job
import { io } from '../socket.js';

io.to('er').emit('triageUpdate', { hn: hashHN(p.hn), triage_level: 2, ts: Date.now() });
```

Always hash or truncate PII before emitting.

### Client side

Add to a top-level hook or the `DashboardContext`:

```jsx
useEffect(() => {
  const socket = io('/', { withCredentials: true });
  socket.emit('joinRoom', 'er');
  socket.on('triageUpdate', payload => {
    // dispatch into store
    store.getState().dispatch({ type: 'ER_TRIAGE_UPDATE', payload });
  });
  return () => socket.disconnect();
}, []);
```

## Common pitfalls — things that used to break things

- **Using react-query hooks.** The project uses Zustand via `DashboardContext`. Don't import `useQuery`.
- **Writing to HOSxP.** The pool forbids it but the regex check is the last line — don't waste time debugging INSERT errors.
- **Direct fetch in a deeply nested component.** Only top-level tab components trigger `fetchData`. Children receive data via props.
- **Skipping SubErrorBoundary around charts.** Recharts can throw on malformed data; one bad chart nukes the whole tab without a boundary.
- **Forgetting to register the route in `server/server.js`.** `routes/xxx.js` alone does nothing.
- **Heavy query on the hot path.** If a query takes >500ms under normal load, put it behind `dbQueryHeavy` or move to a materialized view.
- **Currency formatted as USD.** Always `currency: 'THB'` with `locale: 'th-TH'`.
