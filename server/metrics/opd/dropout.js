// ============================================================
// Metric: OPD Dropout Rate — patients who gave up before completion
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'opd.dropout.rate',
    label: { th: 'อัตราการออกไปกลางคัน OPD', en: 'OPD Dropout Rate' },
    unit: 'percent', format: 'percent',
    dimensions: ['date', 'clinic'],
    target: 0.02,
    thresholds: { good: { max: 0.02 }, warning: { max: 0.05 }, danger: { min: 0.05 } },
    description: {
        th: 'สัดส่วนผู้ป่วยที่มาลงทะเบียนแล้วไม่มีการบันทึก service1 ภายใน 2 ชั่วโมง (ออกไปเอง) / ผู้ป่วยทั้งหมด',
        en: 'Share of registered visits with no service1 timestamp after 2h (walked out). Target < 2%.',
    },
    dataSource: { tables: ['ovst', 'service_time'], primaryKey: 'vn' },
    owner: 'OPD Operations', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ dateRange, clinic = null } = {}) {
    if (!dateRange?.start || !dateRange?.end) throw new Error('dateRange required');
    const params = [dateRange.start, dateRange.end];
    let sql = `
        SELECT
          COUNT(*) AS total,
          SUM(CASE
              WHEN s.service1 IS NULL
               AND TIME_TO_SEC(o.vsttime) < TIME_TO_SEC(CURTIME()) - 7200
              THEN 1 ELSE 0 END) AS dropouts
        FROM ovst o
        LEFT JOIN service_time s ON s.vn = o.vn
        WHERE o.vstdate BETWEEN ? AND ?
          AND (o.ovstost IS NULL OR o.ovstost NOT IN ('61', '89', '54'))
    `;
    if (clinic) { sql += ' AND o.dep = ?'; params.push(clinic); }
    const [row] = await dbQuery(sql, params);
    const total = Number(row?.total || 0);
    const drop = Number(row?.dropouts || 0);
    const rate = total > 0 ? drop / total : 0;
    return result(metric, Math.round(rate * 10000) / 10000, { total, dropouts: drop, filters: { clinic } });
}
