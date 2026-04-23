// ============================================================
// Metric: ER Time to Doctor (minutes from arrival to seen)
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'er.timeToDoctor.minutes',
    label: { th: 'เวลารอพบแพทย์ ER', en: 'ER Time to Doctor' },
    unit: 'minutes', format: 'number',
    dimensions: ['date', 'triage_level'],
    // Target depends on triage level (1=1min, 2=15min, 3=30min, 4-5=60min).
    // This metric returns overall average; drill down for per-triage.
    target: 30,
    thresholds: { good: { max: 30 }, warning: { max: 60 }, danger: { min: 60 } },
    description: {
        th: 'ค่าเฉลี่ยเวลาจากลงทะเบียน ER ถึงพบแพทย์ครั้งแรก — ต่อ triage level มีเป้าหมายต่างกัน (1:≤1, 2:≤15, 3:≤30, 4-5:≤60)',
        en: 'Mean minutes from ER registration to first MD contact. Triage-dependent targets.',
    },
    dataSource: { tables: ['er_regist', 'er_nursing_detail'] },
    owner: 'ER', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ dateRange, triage = null } = {}) {
    if (!dateRange?.start || !dateRange?.end) throw new Error('dateRange required');
    const params = [dateRange.start, dateRange.end];
    // NOTE: 'doctor_seen_time' column name is a placeholder — confirm with
    // HOSxP DBA before production use. Common candidates:
    //   er_nursing_detail.seen_by_md_time, er_regist.doctor_contact_time
    let sql = `
        SELECT
          COUNT(*) AS n,
          AVG(TIMESTAMPDIFF(MINUTE, e.register_time, COALESCE(n.seen_by_md_time, e.doctor_contact_time))) AS avg_minutes
        FROM er_regist e
        LEFT JOIN er_nursing_detail n ON n.vn = e.vn
        WHERE DATE(e.register_time) BETWEEN ? AND ?
          AND (n.seen_by_md_time IS NOT NULL OR e.doctor_contact_time IS NOT NULL)
    `;
    if (triage) { sql += ' AND e.triage_level = ?'; params.push(triage); }
    try {
        const [row] = await dbQuery(sql, params);
        const value = row?.avg_minutes != null ? Math.round(Number(row.avg_minutes)) : null;
        return result(metric, value, { sample_size: Number(row?.n || 0), filters: { triage } });
    } catch (err) {
        return result(metric, null, { error: `columns may differ: ${err.message}`, filters: { triage } });
    }
}
