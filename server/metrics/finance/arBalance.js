// ============================================================
// Metric: AR Balance (outstanding receivables) + aging buckets
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'finance.arBalance.total',
    label: { th: 'ยอดค้างรับ (A/R)', en: 'Accounts Receivable Balance' },
    unit: 'THB', format: 'currency',
    dimensions: ['aging_bucket', 'pttype'],
    description: {
        th: 'ผลรวม remain_money ของ visit ที่ยังค้างจ่าย แบ่งตาม aging bucket (0-30 / 31-60 / 61-90 / 90+ วัน)',
        en: 'Total outstanding receivables by aging bucket.',
    },
    dataSource: { tables: ['vn_stat'] },
    owner: 'Finance', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute() {
    // Aging buckets computed as of today
    const sql = `
        SELECT
          SUM(CASE WHEN DATEDIFF(CURDATE(), vstdate) <= 30 THEN remain_money ELSE 0 END) AS b_0_30,
          SUM(CASE WHEN DATEDIFF(CURDATE(), vstdate) BETWEEN 31 AND 60 THEN remain_money ELSE 0 END) AS b_31_60,
          SUM(CASE WHEN DATEDIFF(CURDATE(), vstdate) BETWEEN 61 AND 90 THEN remain_money ELSE 0 END) AS b_61_90,
          SUM(CASE WHEN DATEDIFF(CURDATE(), vstdate) > 90 THEN remain_money ELSE 0 END) AS b_90p,
          SUM(remain_money) AS total
        FROM vn_stat
        WHERE remain_money > 0
    `;
    const [row] = await dbQuery(sql);
    return result(metric, Math.round(Number(row?.total || 0)), {
        aging: {
            '0_30': Math.round(Number(row?.b_0_30 || 0)),
            '31_60': Math.round(Number(row?.b_31_60 || 0)),
            '61_90': Math.round(Number(row?.b_61_90 || 0)),
            '90_plus': Math.round(Number(row?.b_90p || 0)),
        },
    });
}
