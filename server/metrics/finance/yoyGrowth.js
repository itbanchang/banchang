// ============================================================
// Metric: YoY Revenue Growth (this year vs same period last year)
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'finance.yoyGrowth.percent',
    label: { th: 'การเติบโต Revenue YoY', en: 'Revenue YoY Growth' },
    unit: 'percent', format: 'percent',
    dimensions: ['period'],
    description: {
        th: 'อัตราการเติบโตของรายได้เมื่อเทียบกับช่วงเดียวกันปีก่อน — บวก = โต, ลบ = หด',
        en: 'Year-over-year revenue growth vs same calendar period last year.',
    },
    dataSource: { tables: ['vn_stat'] },
    owner: 'Finance', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ dateRange } = {}) {
    if (!dateRange?.start || !dateRange?.end) throw new Error('dateRange required');
    const [current] = await dbQuery(
        `SELECT COALESCE(SUM(income), 0) AS r FROM vn_stat WHERE vstdate BETWEEN ? AND ?`,
        [dateRange.start, dateRange.end]
    );
    // Same period last year
    const shiftYear = d => {
        const dt = new Date(d);
        dt.setFullYear(dt.getFullYear() - 1);
        return dt.toISOString().slice(0, 10);
    };
    const [prev] = await dbQuery(
        `SELECT COALESCE(SUM(income), 0) AS r FROM vn_stat WHERE vstdate BETWEEN ? AND ?`,
        [shiftYear(dateRange.start), shiftYear(dateRange.end)]
    );
    const cur = Number(current?.r || 0);
    const pre = Number(prev?.r || 0);
    const growth = pre > 0 ? (cur - pre) / pre : null;
    return result(metric, growth != null ? Math.round(growth * 10000) / 10000 : null, {
        current_period: cur,
        previous_period: pre,
    });
}
