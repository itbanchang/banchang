// ============================================================
// Metric: Under-charging (billable but not billed)
// Stub: real detection requires cross-ref with service catalog.
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'finance.underCharging.suspectCount',
    label: { th: 'จำนวน visit น่าสงสัย under-charging', en: 'Suspected Under-charging Visits' },
    unit: 'count', format: 'number',
    dimensions: ['vstdate'],
    description: {
        th: 'จำนวน visit ที่อาจมีการคิดค่าใช้จ่ายต่ำกว่าที่ควร (proxy: visits มี procedure แต่ไม่มี line ใน opitemrece) — wire real detector ใน server/ai/billing*.js',
        en: 'Count of visits suspected of under-charging. Stub metric.',
    },
    dataSource: { tables: ['ovst', 'opitemrece'] },
    owner: 'Finance + Medical Records', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ dateRange } = {}) {
    if (!dateRange?.start || !dateRange?.end) throw new Error('dateRange required');
    // Heuristic: visits with pdx set but no opitemrece line. This is a weak signal;
    // real logic checks doc-to-bill match. Replace with engine call when available.
    try {
        const [row] = await dbQuery(`
            SELECT COUNT(*) AS n
            FROM ovst o
            WHERE o.vstdate BETWEEN ? AND ?
              AND o.pdx IS NOT NULL AND o.pdx != ''
              AND NOT EXISTS (SELECT 1 FROM opitemrece r WHERE r.vn = o.vn AND r.vstdate = o.vstdate)
        `, [dateRange.start, dateRange.end]);
        return result(metric, Number(row?.n || 0), { note: 'heuristic proxy; wire server/ai/billing*.js for precision' });
    } catch (err) {
        return result(metric, null, { error: err.message });
    }
}
