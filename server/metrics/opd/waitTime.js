// ============================================================
// Metric: OPD End-to-End Wait Time (arrival → completion)
// Owner:  OPD operations lead
// Reviewed: 2026-04-23
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'opd.waitTime.avgTotalMinutes',
    label: {
        th: 'เวลารอเฉลี่ย OPD (ต้นจนจบ)',
        en: 'OPD Wait Time — end-to-end average',
    },
    unit: 'minutes',
    format: 'number',
    dimensions: ['date', 'clinic', 'pttype'],
    target: 40,
    thresholds: {
        good: { max: 40 },
        warning: { max: 60 },
        danger: { min: 60 },
    },
    benchmark: {
        nationalMedian: 45,
        source: 'MOH community-hospital survey 2568',
    },
    dataSource: {
        tables: ['ovst', 'service_time', 'rcpt_print'],
        primaryKey: 'vn',
    },
    description: {
        th: 'ระยะเวลารวมตั้งแต่ผู้ป่วยลงทะเบียนจนรับยาครบหรือจ่ายเงินเสร็จ นับเฉพาะผู้ป่วยที่จบการตรวจแบบปกติ (ไม่รวมผู้ที่ถูกส่งต่อ, admit, หรือยกเลิก)',
        en: 'Total minutes from arrival (vsttime) to last completion event (pharmacy dispense or billing). Excludes referrals, admits, and cancelled visits.',
    },
    owner: 'OPD Operations',
    reviewed: '2026-04-23',
    strategy: 'computed',
};

const EXCLUDED_OVSTOST = ['61', '89', '54'];

export async function compute({ dateRange, clinic = null, pttype = null } = {}) {
    if (!dateRange?.start || !dateRange?.end) throw new Error('dateRange.{start,end} required');

    const params = [dateRange.start, dateRange.end, ...EXCLUDED_OVSTOST];
    let sql = `
        SELECT
          COUNT(*) AS n,
          AVG(TIMESTAMPDIFF(MINUTE,
                CONCAT(o.vstdate, ' ', o.vsttime),
                CONCAT(o.vstdate, ' ', COALESCE(r.bill_time, s.service7)))) AS avg_minutes
        FROM ovst o
        LEFT JOIN service_time s ON s.vn = o.vn
        LEFT JOIN rcpt_print   r ON r.vn = o.vn
        WHERE o.vstdate BETWEEN ? AND ?
          AND (o.ovstost IS NULL OR o.ovstost NOT IN (?, ?, ?))
          AND (s.service7 IS NOT NULL OR r.bill_time IS NOT NULL)
    `;
    if (clinic) { sql += ' AND o.dep = ?'; params.push(clinic); }
    if (pttype) { sql += ' AND o.pttype = ?'; params.push(pttype); }

    const [row] = await dbQuery(sql, params);
    const value = row?.avg_minutes != null ? Math.round(Number(row.avg_minutes)) : null;
    return result(metric, value, { sample_size: Number(row?.n || 0), filters: { clinic, pttype } });
}
