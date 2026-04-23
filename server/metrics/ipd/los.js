// ============================================================
// Metric: IPD Average Length of Stay (days)
// Owner:  Medical Records + Clinical
// Reviewed: 2026-04-23
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'ipd.los.averageDays',
    label: {
        th: 'ระยะเวลานอนเฉลี่ย IPD',
        en: 'IPD Average Length of Stay',
    },
    unit: 'days',
    format: 'decimal',
    dimensions: ['date', 'ward', 'drg_bucket'],
    // NOTE: target depends on case-mix — a plain average is misleading.
    // For fair comparison use DRG-adjusted LOS or ward-specific targets.
    target: 4.5,
    thresholds: {
        good: { max: 4.5 },
        warning: { max: 6 },
        danger: { min: 6 },
    },
    dataSource: {
        tables: ['ipt'],
        primaryKey: 'an',
    },
    description: {
        th: 'ค่าเฉลี่ยจำนวนวันนอนของผู้ป่วยใน (dchdate - regdate) ไม่รวมห้องทารกแรกเกิด (ward 06)',
        en: 'Average discharge - admission days, excluding newborn ward (06).',
    },
    owner: 'Medical Records',
    reviewed: '2026-04-23',
    strategy: 'computed',
};

export async function compute({ dateRange, ward = null } = {}) {
    if (!dateRange?.start || !dateRange?.end) throw new Error('dateRange.{start,end} required');

    const params = [dateRange.start, dateRange.end];
    let sql = `
        SELECT
          COUNT(*) AS n,
          AVG(DATEDIFF(dchdate, regdate)) AS avg_los
        FROM ipt
        WHERE dchdate IS NOT NULL
          AND dchdate BETWEEN ? AND ?
          AND ward != '06'
    `;
    if (ward) { sql += ' AND ward = ?'; params.push(ward); }

    const [row] = await dbQuery(sql, params);
    const value = row?.avg_los != null ? Math.round(Number(row.avg_los) * 10) / 10 : null;
    return result(metric, value, { sample_size: Number(row?.n || 0), filters: { ward } });
}
