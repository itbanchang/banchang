// ============================================================
// Metric: NEWS2 Distribution — critical count in active IPD patients
// ============================================================
import { result } from '../_shared.js';

export const metric = {
    id: 'clinical.news2.criticalCount',
    label: { th: 'ผู้ป่วย NEWS2 วิกฤต (≥7)', en: 'Patients with NEWS2 ≥ 7' },
    unit: 'count', format: 'number',
    dimensions: ['ward'],
    target: 0,
    thresholds: { good: { max: 0 }, warning: { max: 2 }, danger: { min: 2 } },
    description: {
        th: 'จำนวนผู้ป่วย IPD ที่มีคะแนน NEWS2 ≥ 7 จากการวัด vital signs ล่าสุด ต้องรีบตอบสนอง RRT',
        en: 'Count of active IPD patients with latest NEWS2 ≥ 7. Requires RRT response.',
    },
    // Data source NOTE: this HOSxP XE instance does NOT have a structured
    // ipt vitals-values table. `ipt_vital_chart` stores PNG images, not values.
    // The live IPD vitals-values source still needs to be confirmed with
    // HOSxP DBA (likely candidates: nursing assessment tables, or
    // `opdscreen` for cases where vitals were captured at OPD→IPD transfer).
    dataSource: { tables: ['ipt', '(IPD vitals table TBD)'] },
    owner: 'Clinical', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ ward = null } = {}) {
    // Stub until the structured IPD vitals table is confirmed.
    // Wire the JOIN to the real table once HOSxP DBA identifies it.
    return result(metric, null, {
        note: 'STUB: awaiting confirmed IPD vitals table. `ipt_vital_chart` stores PNG images only. See docs/data-dictionary/ and `project_hosxp_real_tables` memory.',
        filters: { ward },
    });
}
