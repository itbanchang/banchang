// ============================================================
// Metric: 30-day readmission rate (same HN re-admitted within 30d of discharge)
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'ipd.readmission30d.rate',
    label: { th: 'อัตรา Readmit 30 วัน', en: 'IPD 30-Day Readmission Rate' },
    unit: 'percent', format: 'percent',
    dimensions: ['dchdate', 'ward'],
    target: 0.10,
    thresholds: { good: { max: 0.10 }, warning: { max: 0.15 }, danger: { min: 0.15 } },
    description: {
        th: 'สัดส่วน admit ที่ผู้ป่วยเดิมกลับมานอนใหม่ภายใน 30 วันหลังจำหน่าย นับผู้ป่วยที่จำหน่ายในช่วง dateRange (ยกเว้นแผนกทารกแรกเกิด)',
        en: '30-day readmission rate, newborn ward excluded.',
    },
    dataSource: { tables: ['ipt'] },
    owner: 'Medical Records', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ dateRange, ward = null } = {}) {
    if (!dateRange?.start || !dateRange?.end) throw new Error('dateRange required');
    const params = [dateRange.start, dateRange.end];
    let sql = `
        SELECT
          COUNT(DISTINCT i1.an) AS discharged,
          COUNT(DISTINCT CASE WHEN EXISTS (
                SELECT 1 FROM ipt i2
                WHERE i2.hn = i1.hn
                  AND i2.an <> i1.an
                  AND i2.regdate > i1.dchdate
                  AND i2.regdate <= DATE_ADD(i1.dchdate, INTERVAL 30 DAY)
              ) THEN i1.an END) AS readmits
        FROM ipt i1
        WHERE i1.dchdate IS NOT NULL
          AND i1.dchdate BETWEEN ? AND ?
          AND i1.ward != '06'
    `;
    if (ward) { sql += ' AND i1.ward = ?'; params.push(ward); }
    const [row] = await dbQuery(sql, params);
    const n = Number(row?.discharged || 0);
    const r = Number(row?.readmits || 0);
    const rate = n > 0 ? r / n : 0;
    return result(metric, Math.round(rate * 10000) / 10000, { discharged: n, readmits: r, filters: { ward } });
}
