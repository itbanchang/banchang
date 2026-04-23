// ============================================================
// Metric: ER Surge status (current census vs capacity)
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

// Default capacity; override via env or config
const ER_CAPACITY = Number(process.env.ER_CAPACITY || 15);

export const metric = {
    id: 'er.surge.ratio',
    label: { th: 'ER Surge (ความหนาแน่น)', en: 'ER Surge Ratio' },
    unit: 'ratio', format: 'decimal',
    dimensions: [],
    target: 0.8,
    thresholds: { good: { max: 0.8 }, warning: { max: 1.2 }, danger: { min: 1.2 } },
    description: {
        th: 'อัตราส่วนผู้ป่วย ER ที่กำลังอยู่ ต่อ ER capacity (>1.2 = surge ต้องปรับแผน)',
        en: 'Current ER census divided by capacity. >1.2 triggers surge plan.',
    },
    dataSource: { tables: ['er_regist'] },
    owner: 'ER', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute() {
    const sql = `
        SELECT COUNT(*) AS census FROM er_regist
        WHERE register_time IS NOT NULL
          AND (discharge_time IS NULL OR discharge_time > NOW())
          AND register_time > DATE_SUB(NOW(), INTERVAL 24 HOUR)
    `;
    try {
        const [row] = await dbQuery(sql);
        const census = Number(row?.census || 0);
        const ratio = census / Math.max(ER_CAPACITY, 1);
        return result(metric, Math.round(ratio * 100) / 100, { census, capacity: ER_CAPACITY });
    } catch (err) {
        return result(metric, null, { error: err.message, capacity: ER_CAPACITY });
    }
}
