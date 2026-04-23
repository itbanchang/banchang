// ============================================================
// Metric: IPD Sum of AdjRW (DRG reimbursement proxy)
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'ipd.adjrw.sum',
    label: { th: 'AdjRW รวม (DRG)', en: 'Sum of AdjRW (DRG)' },
    unit: 'rw', format: 'decimal',
    dimensions: ['dchdate', 'ward'],
    description: {
        th: 'ผลรวม AdjRW จาก ipt + an_stat สำหรับ admit ที่จำหน่ายในช่วง ใช้คาดการณ์การเบิก DRG (ยกเว้น ward 06)',
        en: 'Sum of DRG-adjusted RW for discharged admits.',
    },
    dataSource: { tables: ['ipt', 'an_stat'] },
    owner: 'Medical Records + Finance', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ dateRange, ward = null } = {}) {
    if (!dateRange?.start || !dateRange?.end) throw new Error('dateRange required');
    const params = [dateRange.start, dateRange.end];
    let sql = `
        SELECT
          COUNT(*) AS admits,
          ROUND(SUM(COALESCE(i.adjrw, a.rw, 0)), 2) AS sum_adjrw
        FROM ipt i
        LEFT JOIN an_stat a ON a.an = i.an
        WHERE i.dchdate IS NOT NULL
          AND i.dchdate BETWEEN ? AND ?
          AND i.ward != '06'
    `;
    if (ward) { sql += ' AND i.ward = ?'; params.push(ward); }
    const [row] = await dbQuery(sql, params);
    return result(metric, Number(row?.sum_adjrw || 0), {
        sample_size: Number(row?.admits || 0),
        filters: { ward },
    });
}
