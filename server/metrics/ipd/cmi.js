// ============================================================
// Metric: IPD Case Mix Index (average adjrw where rw > 0)
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'ipd.cmi.caseMixIndex',
    label: { th: 'Case Mix Index (CMI)', en: 'Case Mix Index' },
    unit: 'rw', format: 'decimal',
    dimensions: ['dchdate', 'ward'],
    target: 1.0,
    description: {
        th: 'ค่าเฉลี่ย AdjRW ของ admit ที่มี RW > 0 ค่าสูง = ผู้ป่วยอาการหนัก / ได้เบิก DRG ต่อรายสูง',
        en: 'Average DRG-adjusted RW for admits with rw > 0. Higher = sicker case mix.',
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
          ROUND(AVG(COALESCE(i.adjrw, a.rw)), 3) AS cmi
        FROM ipt i
        LEFT JOIN an_stat a ON a.an = i.an
        WHERE i.dchdate IS NOT NULL
          AND i.dchdate BETWEEN ? AND ?
          AND i.ward != '06'
          AND COALESCE(i.adjrw, a.rw) > 0
    `;
    if (ward) { sql += ' AND i.ward = ?'; params.push(ward); }
    const [row] = await dbQuery(sql, params);
    return result(metric, Number(row?.cmi || 0), {
        sample_size: Number(row?.admits || 0),
        filters: { ward },
    });
}
