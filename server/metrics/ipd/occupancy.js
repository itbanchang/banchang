// ============================================================
// Metric: IPD Bed Occupancy (active admits / total beds)
// ============================================================
import { dbQuery } from '../../db/mysql.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'ipd.occupancy.percent',
    label: { th: 'อัตราครองเตียง IPD', en: 'IPD Bed Occupancy' },
    unit: 'percent', format: 'percent',
    dimensions: ['ward'],
    target: 0.80,
    thresholds: { good: { max: 0.90 }, warning: { max: 0.95 }, danger: { min: 0.95 } },
    description: {
        th: 'สัดส่วนเตียงที่มีผู้ป่วยอยู่ ณ เวลาปัจจุบัน / จำนวนเตียงทั้งหมด (>95% = ไม่มีพื้นที่รองรับ ER boarding)',
        en: 'Active admits / total beds. Over 95% means no surge capacity.',
    },
    dataSource: { tables: ['ipt', 'ward'] },
    owner: 'Clinical Operations', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ ward = null } = {}) {
    // Active admits: regdate <= today AND (dchdate IS NULL OR dchdate >= today)
    const params = [];
    let activeSql = `
        SELECT COUNT(*) AS active FROM ipt
        WHERE regdate <= CURDATE()
          AND (dchdate IS NULL OR dchdate >= CURDATE())
          AND ward != '06'
    `;
    let bedSql = `SELECT COALESCE(SUM(bed_num), 0) AS beds FROM ward WHERE ward != '06'`;
    if (ward) {
        activeSql += ' AND ward = ?';
        bedSql = `SELECT COALESCE(SUM(bed_num), 0) AS beds FROM ward WHERE ward = ?`;
        params.push(ward);
    }
    try {
        const [act] = await dbQuery(activeSql, ward ? params : []);
        const [bedRow] = await dbQuery(bedSql, ward ? params : []);
        const active = Number(act?.active || 0);
        const beds = Math.max(Number(bedRow?.beds || 0), 1);
        const rate = active / beds;
        return result(metric, Math.round(rate * 10000) / 10000, { active, beds, filters: { ward } });
    } catch (err) {
        // `ward.bed_num` may not exist on all HOSxP schemas; return a stub with the error.
        return result(metric, null, { error: err.message, filters: { ward } });
    }
}
