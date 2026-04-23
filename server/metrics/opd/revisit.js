// ============================================================
// Metric: OPD Revisit Rate — same HN visiting again within 7 days
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'opd.revisit.rate',
    label: { th: 'อัตรากลับมาซ้ำ 7 วัน (OPD)', en: 'OPD 7-Day Revisit Rate' },
    unit: 'percent', format: 'percent',
    dimensions: ['date', 'clinic'],
    target: 0.15,
    thresholds: { good: { max: 0.15 }, warning: { max: 0.25 }, danger: { min: 0.25 } },
    description: {
        th: 'สัดส่วนผู้ป่วย OPD วันนี้ที่เคยมาใน 7 วันก่อนหน้า — สูง = อาการไม่หาย / ยาไม่พอ',
        en: 'Share of today\'s OPD visits where same HN visited within prior 7 days.',
    },
    dataSource: { tables: ['ovst'] },
    owner: 'OPD Operations', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ dateRange, clinic = null } = {}) {
    if (!dateRange?.start || !dateRange?.end) throw new Error('dateRange required');
    const params = [dateRange.start, dateRange.end, dateRange.start, dateRange.end];
    let sql = `
        SELECT
          COUNT(*) AS total,
          SUM(CASE WHEN EXISTS (
                SELECT 1 FROM ovst prior
                WHERE prior.hn = o.hn
                  AND prior.vstdate >= DATE_SUB(o.vstdate, INTERVAL 7 DAY)
                  AND prior.vstdate < o.vstdate
              ) THEN 1 ELSE 0 END) AS revisits
        FROM ovst o
        WHERE o.vstdate BETWEEN ? AND ?
          AND (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54'))
    `;
    if (clinic) { sql += ' AND o.dep = ?'; params.splice(2, 0, clinic); /* oops — redo */ }
    // simpler: build params cleanly
    const finalParams = [dateRange.start, dateRange.end];
    const finalSql = `
        SELECT
          COUNT(*) AS total,
          SUM(CASE WHEN EXISTS (
                SELECT 1 FROM ovst prior
                WHERE prior.hn = o.hn
                  AND prior.vstdate >= DATE_SUB(o.vstdate, INTERVAL 7 DAY)
                  AND prior.vstdate < o.vstdate
              ) THEN 1 ELSE 0 END) AS revisits
        FROM ovst o
        WHERE o.vstdate BETWEEN ? AND ?
          AND (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54'))
          ${clinic ? 'AND o.dep = ?' : ''}
    `;
    if (clinic) finalParams.push(clinic);

    const [row] = await dbQuery(finalSql, finalParams);
    const total = Number(row?.total || 0);
    const rev = Number(row?.revisits || 0);
    const rate = total > 0 ? rev / total : 0;
    return result(metric, Math.round(rate * 10000) / 10000, { total, revisits: rev, filters: { clinic } });
}
