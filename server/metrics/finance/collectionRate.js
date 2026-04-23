// ============================================================
// Metric: Collection Rate (collected / billed)
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'finance.collectionRate.percent',
    label: { th: 'อัตราการจัดเก็บรายได้', en: 'Collection Rate' },
    unit: 'percent', format: 'percent',
    dimensions: ['vstdate', 'pttype'],
    target: 0.95,
    thresholds: { good: { max: 1 }, warning: { max: 0.85 }, danger: { min: 0 } },
    description: {
        th: '(income - remain_money) / income ของ visit ในช่วง ช่วยวัดว่าเก็บเงินได้จริงกี่ % ของที่เรียกเก็บ',
        en: '(billed - outstanding) / billed. Measures actual cash collection efficiency.',
    },
    dataSource: { tables: ['vn_stat'] },
    owner: 'Finance', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ dateRange, pttype = null } = {}) {
    if (!dateRange?.start || !dateRange?.end) throw new Error('dateRange required');
    const params = [dateRange.start, dateRange.end];
    let sql = `
        SELECT
          COALESCE(SUM(income), 0) AS billed,
          COALESCE(SUM(income - remain_money), 0) AS collected
        FROM vn_stat
        WHERE vstdate BETWEEN ? AND ?
          AND income > 0
    `;
    if (pttype) { sql += ' AND pttype = ?'; params.push(pttype); }
    const [row] = await dbQuery(sql, params);
    const billed = Number(row?.billed || 0);
    const collected = Number(row?.collected || 0);
    const rate = billed > 0 ? collected / billed : 0;
    return result(metric, Math.round(rate * 10000) / 10000, { billed, collected, filters: { pttype } });
}
