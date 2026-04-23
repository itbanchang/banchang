// ============================================================
// Metric: Total Revenue (vn_stat.income)
// Owner:  Finance / Revenue Cycle
// Reviewed: 2026-04-23
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'finance.revenue.total',
    label: {
        th: 'รายได้รวม',
        en: 'Total Revenue',
    },
    unit: 'THB',
    format: 'currency',
    dimensions: ['date', 'pttype', 'clinic'],
    // No static target — compare to prior periods. Thresholds below are
    // placeholders; real "good/bad" comes from YoY and budget variance.
    description: {
        th: 'รายได้รวมจาก vn_stat.income ในช่วงวันที่กำหนด สามารถกรองตามสิทธิการรักษา (pttype) และคลินิก (dep)',
        en: 'Sum of vn_stat.income for the given date range. Filterable by pttype and clinic.',
    },
    dataSource: {
        tables: ['vn_stat'],
        primaryKey: 'vn',
    },
    owner: 'Finance',
    reviewed: '2026-04-23',
    strategy: 'computed',
};

export async function compute({ dateRange, pttype = null, clinic = null } = {}) {
    if (!dateRange?.start || !dateRange?.end) throw new Error('dateRange.{start,end} required');

    const params = [dateRange.start, dateRange.end];
    let sql = `
        SELECT
          COUNT(*) AS n,
          COALESCE(SUM(income), 0) AS total_income,
          COALESCE(SUM(income - remain_money), 0) AS collected,
          COALESCE(SUM(remain_money), 0) AS outstanding
        FROM vn_stat
        WHERE vstdate BETWEEN ? AND ?
    `;
    if (pttype) { sql += ' AND pttype = ?'; params.push(pttype); }
    if (clinic) { sql += ' AND dep = ?'; params.push(clinic); }

    const [row] = await dbQuery(sql, params);
    const value = row?.total_income != null ? Math.round(Number(row.total_income)) : 0;
    return result(metric, value, {
        sample_size: Number(row?.n || 0),
        collected: Number(row?.collected || 0),
        outstanding: Number(row?.outstanding || 0),
        collection_rate: value > 0 ? (Number(row.collected) / value) : null,
        filters: { pttype, clinic },
    });
}
