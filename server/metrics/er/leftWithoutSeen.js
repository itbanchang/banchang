// ============================================================
// Metric: ER Left-Without-Seen rate
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'er.leftWithoutSeen.rate',
    label: { th: 'ER ออกไปก่อนพบแพทย์', en: 'ER Left Without Being Seen' },
    unit: 'percent', format: 'percent',
    dimensions: ['date'],
    target: 0.01,
    thresholds: { good: { max: 0.01 }, warning: { max: 0.03 }, danger: { min: 0.03 } },
    description: {
        th: 'สัดส่วนผู้ป่วย ER ที่ออกไปก่อนได้พบแพทย์ อาจหมายถึง คิวยาวเกินไป หรือ ความรุนแรงไม่เร่งด่วน',
        en: 'Share of ER registrations with no medical contact documented.',
    },
    dataSource: { tables: ['er_regist', 'er_nursing_detail'] },
    owner: 'ER', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ dateRange } = {}) {
    if (!dateRange?.start || !dateRange?.end) throw new Error('dateRange required');
    const sql = `
        SELECT
          COUNT(*) AS total,
          SUM(CASE WHEN n.seen_by_md_time IS NULL AND e.doctor_contact_time IS NULL THEN 1 ELSE 0 END) AS lwbs
        FROM er_regist e
        LEFT JOIN er_nursing_detail n ON n.vn = e.vn
        WHERE DATE(e.register_time) BETWEEN ? AND ?
    `;
    try {
        const [row] = await dbQuery(sql, [dateRange.start, dateRange.end]);
        const total = Number(row?.total || 0);
        const lwbs = Number(row?.lwbs || 0);
        const rate = total > 0 ? lwbs / total : 0;
        return result(metric, Math.round(rate * 10000) / 10000, { total, lwbs });
    } catch (err) {
        return result(metric, null, { error: err.message });
    }
}
