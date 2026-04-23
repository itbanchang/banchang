// ============================================================
// Metric: High Mortality Risk Active Patients (from sepsisEngine)
// STUB — needs structured IPD vitals source.
// ============================================================
import { result } from '../_shared.js';

export const metric = {
    id: 'clinical.mortalityRisk.highCount',
    label: { th: 'ผู้ป่วยเสี่ยงสูงต่อการเสียชีวิต', en: 'High Mortality-Risk Patients' },
    unit: 'count', format: 'number',
    dimensions: ['ward'],
    target: 0,
    thresholds: { good: { max: 2 }, warning: { max: 5 }, danger: { min: 5 } },
    description: {
        th: 'จำนวนผู้ป่วย IPD ที่มีคะแนน mortality risk > 0.20 จาก sepsisEngine ใช้จัด priority morning rounds',
        en: 'Active IPD patients with calibrated mortality risk > 0.20.',
    },
    dataSource: { tables: ['ipt', 'patient', '(IPD vitals TBD)'] },
    owner: 'Clinical', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ ward = null } = {}) {
    // Same blocker as clinical.news2: structured IPD vitals table unconfirmed.
    // Once confirmed, wire sepsisEngine.assessRisk and compute against active admits.
    return result(metric, null, {
        note: 'STUB: requires structured IPD vitals table + sepsisEngine.assessRisk wiring. See clinical/news2.js for the same blocker.',
        filters: { ward },
    });
}
