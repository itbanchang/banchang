// ============================================================
// Metric: OPD SLA — visits completing within 60 minutes
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

const SLA_MINUTES = 60;

export const metric = {
    id: 'opd.sla.percent',
    label: { th: 'OPD SLA (ผ่านเกณฑ์ 60 นาที)', en: 'OPD SLA — % under 60 min' },
    unit: 'percent', format: 'percent',
    dimensions: ['date', 'clinic'],
    target: 0.85,
    thresholds: { good: { max: 1 }, warning: { max: 0.7 }, danger: { min: 0 } },
    // Note thresholds are "worse = lower" for this metric — classify() treats
    // higher as better; we invert by using minHigh semantics via the consuming UI.
    description: {
        th: 'สัดส่วนผู้ป่วยที่จบ visit ภายใน 60 นาที — เป้าหมาย ≥ 85%',
        en: 'Share of completed visits finishing within 60 minutes. Target ≥ 85%.',
    },
    dataSource: { tables: ['ovst', 'service_time', 'rcpt_print'], primaryKey: 'vn' },
    owner: 'OPD Operations', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ dateRange, clinic = null } = {}) {
    if (!dateRange?.start || !dateRange?.end) throw new Error('dateRange required');
    const params = [dateRange.start, dateRange.end, SLA_MINUTES];
    let sql = `
        SELECT
          COUNT(*) AS total,
          SUM(CASE WHEN TIMESTAMPDIFF(MINUTE,
                CONCAT(o.vstdate, ' ', o.vsttime),
                CONCAT(o.vstdate, ' ', COALESCE(r.bill_time, s.service7))) <= ?
              THEN 1 ELSE 0 END) AS under_sla
        FROM ovst o
        LEFT JOIN service_time s ON s.vn = o.vn
        LEFT JOIN rcpt_print r  ON r.vn = o.vn
        WHERE o.vstdate BETWEEN ? AND ?
          AND (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54'))
          AND (s.service7 IS NOT NULL OR r.bill_time IS NOT NULL)
    `;
    // Reorder params: sla_minutes needs to appear BEFORE date BETWEEN clause
    const sqlFinal = `
        SELECT
          COUNT(*) AS total,
          SUM(CASE WHEN TIMESTAMPDIFF(MINUTE,
                CONCAT(o.vstdate, ' ', o.vsttime),
                CONCAT(o.vstdate, ' ', COALESCE(r.bill_time, s.service7))) <= ${SLA_MINUTES}
              THEN 1 ELSE 0 END) AS under_sla
        FROM ovst o
        LEFT JOIN service_time s ON s.vn = o.vn
        LEFT JOIN rcpt_print r  ON r.vn = o.vn
        WHERE o.vstdate BETWEEN ? AND ?
          AND (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54'))
          AND (s.service7 IS NOT NULL OR r.bill_time IS NOT NULL)
          ${clinic ? 'AND o.dep = ?' : ''}
    `;
    const finalParams = [dateRange.start, dateRange.end];
    if (clinic) finalParams.push(clinic);
    const [row] = await dbQuery(sqlFinal, finalParams);
    const total = Number(row?.total || 0);
    const under = Number(row?.under_sla || 0);
    const pct = total > 0 ? under / total : 0;
    return result(metric, Math.round(pct * 10000) / 10000, { total, under_sla: under, filters: { clinic } });
}
