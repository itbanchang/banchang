// ============================================================
// Metric: Mean HbA1c of tracked DM patients
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'ncd.hba1cControl.average',
    label: { th: 'HbA1c เฉลี่ย (DM)', en: 'Mean HbA1c (DM)' },
    unit: 'percent', format: 'decimal',
    dimensions: ['date', 'clinic'],
    target: 7.0,
    thresholds: { good: { max: 7.0 }, warning: { max: 8.0 }, danger: { min: 8.0 } },
    description: {
        th: 'ค่าเฉลี่ย HbA1c ของผู้ป่วย DM ที่ตรวจในช่วง — target ≤ 7.0% (individualised for elderly)',
        en: 'Mean HbA1c for DM patients with test in range.',
    },
    dataSource: { tables: ['lab_head', 'lab_order'] },
    owner: 'Clinical / NCD', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ dateRange, clinic = null } = {}) {
    if (!dateRange?.start || !dateRange?.end) throw new Error('dateRange required');
    try {
        // Note: lab_code may differ across HOSxP versions. Common: 'HbA1c', 'HBA1C', code 2028
        const [row] = await dbQuery(`
            SELECT
              COUNT(*) AS n,
              AVG(CAST(lo.lab_result AS DECIMAL(5,2))) AS avg_a1c
            FROM lab_order lo
            JOIN lab_head lh ON lh.lab_order_number = lo.lab_order_number
            WHERE lh.order_date BETWEEN ? AND ?
              AND (lo.lab_code LIKE '%HbA1c%' OR lo.lab_code LIKE '%HBA1C%')
              AND lo.lab_result REGEXP '^[0-9]+(\\\\.[0-9]+)?$'
              AND CAST(lo.lab_result AS DECIMAL(5,2)) BETWEEN 3 AND 20
        `, [dateRange.start, dateRange.end]);
        const n = Number(row?.n || 0);
        const avg = row?.avg_a1c != null ? Math.round(Number(row.avg_a1c) * 100) / 100 : null;
        return result(metric, avg, { sample_size: n, filters: { clinic } });
    } catch (err) {
        return result(metric, null, { error: err.message, note: 'confirm lab_code name for HbA1c' });
    }
}
