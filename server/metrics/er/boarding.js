// ============================================================
// Metric: ER Boarding (hours ER→IPD bed-wait)
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'er.boarding.hours',
    label: { th: 'ER Boarding (ชั่วโมงรอเตียง IPD)', en: 'ER Boarding Hours' },
    unit: 'hours', format: 'decimal',
    dimensions: ['date'],
    target: 4,
    thresholds: { good: { max: 4 }, warning: { max: 6 }, danger: { min: 6 } },
    description: {
        th: 'เวลารอเฉลี่ยจากตัดสินใจ admit ถึงย้ายเข้า ward (ผู้ป่วย ER ที่ถูก admit) เกิน 6 ชม. = วิกฤต',
        en: 'Mean hours from admit decision to ward transfer for ER→IPD. Over 6h is crisis.',
    },
    dataSource: { tables: ['er_regist', 'ipt'] },
    owner: 'ER + IPD', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ dateRange } = {}) {
    if (!dateRange?.start || !dateRange?.end) throw new Error('dateRange required');
    // Join ER patients who became IPD admits; measure elapsed from ER register to ward admit.
    // Approximates since there may not be a single "admit decision" timestamp in HOSxP.
    const sql = `
        SELECT
          COUNT(*) AS n,
          AVG(TIMESTAMPDIFF(HOUR, e.register_time, i.regdate)) AS avg_hours
        FROM er_regist e
        JOIN ipt i ON i.hn = (SELECT hn FROM ovst WHERE vn = e.vn LIMIT 1)
                  AND i.regdate >= DATE(e.register_time)
                  AND i.regdate <= DATE_ADD(DATE(e.register_time), INTERVAL 1 DAY)
        WHERE DATE(e.register_time) BETWEEN ? AND ?
    `;
    try {
        const [row] = await dbQuery(sql, [dateRange.start, dateRange.end]);
        const value = row?.avg_hours != null ? Math.round(Number(row.avg_hours) * 10) / 10 : null;
        return result(metric, value, { sample_size: Number(row?.n || 0) });
    } catch (err) {
        return result(metric, null, { error: err.message });
    }
}
