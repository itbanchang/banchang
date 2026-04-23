#!/usr/bin/env node
// ============================================================
// bch-360-expert: scaffold a new Tab end-to-end
// Usage:  node scripts/scaffold_tab.mjs <TabName> [--thai "ชื่อไทย"]
// Creates:
//   src/components/<TabName>Tab.jsx
//   server/routes/<tabname>.js
//   (prints next-steps so you finish wiring yourself)
// ============================================================
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
// Project root = four levels up from this script (.claude/skills/bch-360-expert/scripts/)
const PROJECT_ROOT = resolve(__dirname, '..', '..', '..', '..');

const args = process.argv.slice(2);
if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
  console.log('Usage: node scripts/scaffold_tab.mjs <TabName> [--thai "ชื่อไทย"]');
  console.log('');
  console.log('Example:');
  console.log('  node scripts/scaffold_tab.mjs Dialysis --thai "ไตเทียม"');
  process.exit(0);
}

const pascalName = args[0];
if (!/^[A-Z][A-Za-z0-9]+$/.test(pascalName)) {
  console.error(`ERROR: Tab name must be PascalCase, got: ${pascalName}`);
  process.exit(1);
}

const thaiIdx = args.indexOf('--thai');
const thaiLabel = thaiIdx >= 0 ? args[thaiIdx + 1] : pascalName;
const lowerName = pascalName.toLowerCase();
const camelName = pascalName.charAt(0).toLowerCase() + pascalName.slice(1);

const tabPath = resolve(PROJECT_ROOT, 'src', 'components', `${pascalName}Tab.jsx`);
const routePath = resolve(PROJECT_ROOT, 'server', 'routes', `${lowerName}.js`);

// ── Generate files ────────────────────────────────────────────
const tabContent = `// ============================================================
// BCH 360° Intelligence V.10 - ${pascalName} Tab (${thaiLabel})
// Scaffolded by bch-360-expert. Fill in real KPIs + charts.
// ============================================================
import React, { useEffect } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useShallowDashboardSelector, useDashboardActions } from '../context/DashboardContext.jsx';
import KPIDescriptionCards from './shared/KPIDescriptionCards.jsx';
import AIInsightCard from './shared/AIInsightCard.jsx';
import TabLoadingSkeleton from './shared/TabLoadingSkeleton.jsx';
import EmptyState from './shared/EmptyState.jsx';
import SubErrorBoundary from './shared/SubErrorBoundary.jsx';
import KPICardV2 from './KPICardV2.jsx';

function ${pascalName}Tab() {
    const state = useShallowDashboardSelector(s => ({
        ${camelName}Today: s.${camelName}Today,
        ${camelName}Trend: s.${camelName}Trend,
        loading: s.loading,
    }));
    const { fetchData } = useDashboardActions();

    useEffect(() => {
        fetchData('${camelName}Today', '/api/${lowerName}/today');
        fetchData('${camelName}Trend', '/api/${lowerName}/trend?days=30');
    }, [fetchData]);

    const data = state.${camelName}Today;
    const isLoading = state.loading?.${camelName}Today;

    if (isLoading && !data) return <TabLoadingSkeleton />;
    if (!data) return <EmptyState title="ไม่มีข้อมูล ${thaiLabel}" />;

    return (
        <div className="space-y-6">
            <KPIDescriptionCards
                title="${thaiLabel} Analytics"
                subtitle="คำอธิบายแท็บ ${thaiLabel} — ปรับให้ตรงกับโดเมนจริง"
                color="blue"
            />

            <SubErrorBoundary>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <KPICardV2 title="รวมวันนี้" value={data.total} icon="📊" color="blue" loading={isLoading} />
                    <KPICardV2 title="เทียบเมื่อวาน" value={data.trend} format="percent"
                        color={data.trend > 0 ? 'green' : 'red'} loading={isLoading} />
                    <KPICardV2 title="ค่าเฉลี่ย" value={data.avg} format="decimal" color="purple" loading={isLoading} />
                    <KPICardV2 title="ยอดคงเหลือ" value={data.pending} icon="⏳" color="amber" loading={isLoading} />
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
                        <LineChart data={state.${camelName}Trend?.series || []}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="d" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="n" stroke="#5e72e4" strokeWidth={2}
                                isAnimationActive={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </SubErrorBoundary>
        </div>
    );
}

export default ${pascalName}Tab;
`;

const routeContent = `// ============================================================
// BCH 360° Intelligence V.10 - ${pascalName} Routes
// Scaffolded by bch-360-expert. Replace placeholder SQL with real queries.
// ============================================================
import { Router } from 'express';
import { z } from 'zod';
import { cached } from '../cache/staleCache.js';
import { validateQuery } from '../middleware/validate.js';
import { dbQuery, dbQueryOne } from '../db/mysql.js';
import logger from '../logger.js';

const router = Router();

// ── Today summary ─────────────────────────────────────────────
router.get('/today', cached('${camelName}Today', 60_000, async () => {
    const start = Date.now();

    // TODO: replace with real queries against HOSxP XE
    const summary = await dbQueryOne(\`
        SELECT
            COUNT(*) AS total,
            ROUND(AVG(1), 2) AS avg,
            0 AS pending
        FROM ovst
        WHERE vstdate = CURDATE()
    \`);

    const ms = Date.now() - start;
    if (ms > 1000) logger.warn('[${lowerName}/today] slow', { ms });

    return {
        ...summary,
        trend: 0,           // compute vs yesterday
        ai: null,           // attach AI insight { score, confidence, evidence, actions, narrative }
        generated_at: Date.now(),
    };
}));

// ── Trend (N-day series) ──────────────────────────────────────
const trendSchema = z.object({
    days: z.coerce.number().int().min(1).max(90).default(30),
});

router.get('/trend', validateQuery(trendSchema), cached('${camelName}Trend', 5 * 60_000, async (req) => {
    const { days } = req.query;
    const series = await dbQuery(\`
        SELECT DATE(vstdate) AS d, COUNT(*) AS n
        FROM ovst
        WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
        GROUP BY DATE(vstdate)
        ORDER BY d
    \`, [days]);
    return { series, generated_at: Date.now() };
}));

export default router;
`;

// ── Safety: don't overwrite ────────────────────────────────────
function writeSafe(path, content) {
    if (existsSync(path)) {
        console.log(`SKIP (exists): ${path}`);
        return false;
    }
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, content, 'utf8');
    console.log(`CREATED:      ${path}`);
    return true;
}

console.log(`\nScaffolding ${pascalName}Tab (${thaiLabel})...\n`);
const tabCreated = writeSafe(tabPath, tabContent);
const routeCreated = writeSafe(routePath, routeContent);

// ── Next steps ─────────────────────────────────────────────────
console.log('\nNext steps (manual — these modify files this scaffold is not willing to touch):\n');
console.log(`  1. Register the route in server/server.js:\n`);
console.log(`       import ${camelName}Router from './routes/${lowerName}.js';`);
console.log(`       app.use('/api/${lowerName}', ${camelName}Router);\n`);
console.log(`  2. Add data slice keys to src/stores/dashboardStore.js:`);
console.log(`       ${camelName}Today: null,`);
console.log(`       ${camelName}Trend: null,\n`);
console.log(`  3. Register the tab in src/App.jsx (or your tab router). Example:`);
console.log(`       const ${pascalName}Tab = React.lazy(() => import('./components/${pascalName}Tab.jsx'));`);
console.log(`       // Add to sidebar with thai label: '${thaiLabel}'\n`);
console.log(`  4. Verify:`);
console.log(`       npm run typecheck && npm run lint\n`);

if (!tabCreated && !routeCreated) {
    console.log('Both files already exist — nothing to do. Delete them first if you want a fresh scaffold.\n');
    process.exit(0);
}
