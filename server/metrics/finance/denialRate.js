// ============================================================
// Metric: Claim Denial Rate (visits with outstanding > 60 days)
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'finance.denialRate.percent',
    label: { th: 'อัตรา Claim ไม่ผ่าน', en: 'Claim Denial Rate' },
    unit: 'percent', format: 'percent',
    dimensions: ['vstdate', 'pttype'],
    target: 0.05,
    thresholds: { good: { max: 0.05 }, warning: { max: 0.10 }, danger: { min: 0.10 } },
    description: {
        th: 'สัดส่วน visit ที่ยังมี remain_money > 0 หลัง 60 วัน (approximation ของ claim denial) — confirm คำจำกัดความกับ Finance ก่อน production',
        en: 'Approximate denial rate: visits with remain_money > 0 at 60+ days.',
    },
    dataSource: { tables: ['vn_stat'] },
    owner: 'Finance', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ dateRange, pttype = null } = {}) {
    if (!dateRange?.start || !dateRange?.end) throw new Error('dateRange required');
    const params = [dateRange.start, dateRange.end];
    let sql = `
        SELECT
          COUNT(*) AS total,
          SUM(CASE WHEN remain_money > 0
                AND vstdate < DATE_SUB(CURDATE(), INTERVAL 60 DAY)
              THEN 1 ELSE 0 END) AS denied
        FROM vn_stat
        WHERE vstdate BETWEEN ? AND ?
          AND income > 0
    `;
    if (pttype) { sql += ' AND pttype = ?'; params.push(pttype); }
    const [row] = await dbQuery(sql, params);
    const total = Number(row?.total || 0);
    const denied = Number(row?.denied || 0);
    const rate = total > 0 ? denied / total : 0;
    return result(metric, Math.round(rate * 10000) / 10000, { total, denied, filters: { pttype } });
}
