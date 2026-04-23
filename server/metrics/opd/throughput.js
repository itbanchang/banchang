// ============================================================
// Metric: OPD Throughput (visits per hour)
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'opd.throughput.visitsPerHour',
    label: { th: 'อัตราผ่านงาน OPD ต่อชั่วโมง', en: 'OPD Throughput — visits/hr' },
    unit: 'visits/hr', format: 'decimal',
    dimensions: ['date', 'clinic'],
    target: 20,
    thresholds: { good: { max: 25 }, warning: { max: 30 }, danger: { min: 30 } },
    description: {
        th: 'จำนวนผู้ป่วยที่ผ่านงานต่อชั่วโมงเปิดทำการ ค่าสูง = คลินิกคัดกรอง-ส่งออกเร็ว ค่าต่ำ = คอขวด',
        en: 'Completed visits per open-hour of the clinic. High values: fast flow. Low: bottleneck.',
    },
    dataSource: { tables: ['ovst'], primaryKey: 'vn' },
    owner: 'OPD Operations', reviewed: '2026-04-23', strategy: 'computed',
};

// NOTE: "open hours" lookup would come from clinic schedule; here we use 8 (default business hours)
// as a sensible fallback. Wire to clinic.open_hours if/when that schema is confirmed.
const DEFAULT_OPEN_HOURS = 8;

export async function compute({ dateRange, clinic = null, openHours = DEFAULT_OPEN_HOURS } = {}) {
    if (!dateRange?.start || !dateRange?.end) throw new Error('dateRange required');
    const params = [dateRange.start, dateRange.end];
    let sql = `
        SELECT COUNT(*) AS visits, COUNT(DISTINCT vstdate) AS days
        FROM ovst
        WHERE vstdate BETWEEN ? AND ?
          AND (ovstost IS NULL OR ovstost NOT IN ('61', '89', '54'))
    `;
    if (clinic) { sql += ' AND dep = ?'; params.push(clinic); }
    const [row] = await dbQuery(sql, params);
    const visits = Number(row?.visits || 0);
    const days = Math.max(Number(row?.days || 1), 1);
    const value = Math.round((visits / (days * openHours)) * 10) / 10;
    return result(metric, value, { visits, days, open_hours: openHours, filters: { clinic } });
}
