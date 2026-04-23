// ============================================================
// Metric: OPD DPI (Department Performance Index)
// Composite: SLA×30 + WaitScore×25 + ThroughputScore×25 + (100-Dropout)×20
// ============================================================
import { compute as computeWait } from './waitTime.js';
import { compute as computeThroughput } from './throughput.js';
import { compute as computeDropout } from './dropout.js';
import { compute as computeSla } from './sla.js';
import { result } from '../_shared.js';

export const metric = {
    id: 'opd.dpi.compositeScore',
    label: { th: 'DPI — คะแนนรวมประสิทธิภาพ OPD', en: 'OPD Department Performance Index' },
    unit: 'score', format: 'number',
    dimensions: ['date', 'clinic'],
    target: 80,
    thresholds: { good: { max: 100 }, warning: { max: 70 }, danger: { min: 0 } },
    description: {
        th: 'คะแนนรวม 0-100 = SLA×30% + WaitScore×25% + ThroughputScore×25% + (100−Dropout)×20% — ใช้เปรียบเทียบคลินิก/เดือน',
        en: 'Composite 0-100 for cross-clinic comparison.',
    },
    dataSource: { tables: ['ovst', 'opd_service', 'rcpt_print'] },
    owner: 'OPD Operations', reviewed: '2026-04-23', strategy: 'computed',
};

export async function compute({ dateRange, clinic = null } = {}) {
    const [wait, throughput, dropout, sla] = await Promise.all([
        computeWait({ dateRange, clinic }).catch(() => ({ value: null })),
        computeThroughput({ dateRange, clinic }).catch(() => ({ value: null })),
        computeDropout({ dateRange, clinic }).catch(() => ({ value: null })),
        computeSla({ dateRange, clinic }).catch(() => ({ value: null })),
    ]);

    const sla100 = sla.value != null ? sla.value * 100 : 0;                         // 0..100
    const waitScore = wait.value != null ? Math.max(0, Math.min(100, 100 - (wait.value / 120) * 100)) : 0;
    const throughputScore = throughput.value != null ? Math.min(100, (throughput.value / 30) * 100) : 0;
    const dropoutScore = dropout.value != null ? Math.max(0, 100 - dropout.value * 100) : 0;

    const dpi = Math.round(sla100 * 0.30 + waitScore * 0.25 + throughputScore * 0.25 + dropoutScore * 0.20);

    return result(metric, dpi, {
        components: {
            sla_pct: sla.value, wait_minutes: wait.value,
            throughput_per_hr: throughput.value, dropout_rate: dropout.value,
        },
        weights: { sla: 0.30, wait: 0.25, throughput: 0.25, dropout: 0.20 },
        filters: { clinic },
    });
}
