// ============================================================
// Metric: NCD Goal Attainment Rate (DM/HT/IHD/Stroke/COPD/CKD)
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'ncd.goalAttainment.rate',
    label: { th: 'อัตราถึงเป้าหมาย NCD', en: 'NCD Goal Attainment' },
    unit: 'percent', format: 'percent',
    dimensions: ['disease', 'clinic'],
    target: 0.65,
    thresholds: { good: { max: 1 }, warning: { max: 0.50 }, danger: { min: 0 } },
    description: {
        th: 'สัดส่วนผู้ป่วย NCD (DM/HT/IHD/Stroke/COPD/CKD) ที่บรรลุเป้าหมายทางคลินิกในการตรวจล่าสุด — ตัวอย่าง: DM HbA1c ≤ 7, HT BP < 140/90',
        en: 'Share of NCD patients meeting clinical goals at last visit.',
    },
    dataSource: { tables: ['ovstdiag', 'opdscreen', 'lab_head', 'lab_order'] },
    owner: 'Clinical / NCD', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ dateRange, disease = null } = {}) {
    // This is a multi-condition aggregation. For now return DM goal as
    // the most common NCD example; extend per disease when lab-result schema
    // is confirmed.
    if (!dateRange?.start || !dateRange?.end) throw new Error('dateRange required');
    // Placeholder query — needs real HbA1c link. Safe to fail gracefully.
    try {
        const [row] = await dbQuery(`
            SELECT
              COUNT(DISTINCT o.hn) AS tracked,
              SUM(CASE WHEN l.lab_result <= 7 THEN 1 ELSE 0 END) AS on_target
            FROM ovstdiag o
            LEFT JOIN lab_order l ON l.vn = o.vn AND l.lab_code = 'HbA1c'
            WHERE o.vstdate BETWEEN ? AND ?
              AND o.icd10 LIKE 'E1%'
        `, [dateRange.start, dateRange.end]);
        const total = Number(row?.tracked || 0);
        const hit = Number(row?.on_target || 0);
        const rate = total > 0 ? hit / total : 0;
        return result(metric, Math.round(rate * 10000) / 10000, {
            disease: disease || 'DM',
            tracked: total,
            on_target: hit,
            note: 'DM HbA1c only — extend per disease cluster',
        });
    } catch (err) {
        return result(metric, null, { error: `schema may differ: ${err.message}` });
    }
}
