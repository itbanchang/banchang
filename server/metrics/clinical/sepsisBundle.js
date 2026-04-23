// ============================================================
// Metric: Sepsis Bundle Compliance (stub — requires protocol data)
// ============================================================
import { result } from '../_shared.js';

export const metric = {
    id: 'clinical.sepsisBundle.compliance',
    label: { th: 'การทำตาม 1-hour sepsis bundle', en: 'Sepsis 1-Hour Bundle Compliance' },
    unit: 'percent', format: 'percent',
    dimensions: ['date', 'ward'],
    target: 0.90,
    thresholds: { good: { max: 1 }, warning: { max: 0.80 }, danger: { min: 0 } },
    description: {
        th: 'สัดส่วนผู้ป่วย SIRS+/qSOFA+ ที่ได้ bundle ครบภายใน 1 ชม. (lactate, blood culture, broad-spectrum abx, fluids)',
        en: 'Share of SIRS+/qSOFA+ patients receiving the 1-hour bundle.',
    },
    dataSource: { tables: ['sepsis_protocol (pending)', 'drug_receive', 'lab_head'] },
    owner: 'Clinical', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ dateRange, ward = null } = {}) {
    // Real implementation requires:
    //  - Identify sepsis-trigger events (qSOFA ≥ 2 or SIRS ≥ 2 + suspected infection).
    //  - For each, check for: lactate draw, blood culture, IV abx, fluids within 1h of trigger.
    // Needs a sepsis_protocol table or computed trigger detector.
    return result(metric, null, {
        note: 'STUB: requires sepsis protocol trigger + order cross-reference (not yet implemented)',
        filters: { dateRange, ward },
    });
}
