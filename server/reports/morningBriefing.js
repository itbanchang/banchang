// ============================================================
// Report: Morning Briefing (JSON / to-be-rendered-as-PDF)
// Pulls the metric registry so every number is traceable.
// ============================================================
import { compute as opdWaitTime } from '../metrics/opd/waitTime.js';
import { compute as ipdLos } from '../metrics/ipd/los.js';
import { compute as financeRevenue } from '../metrics/finance/revenue.js';
import { todayRange, lastNDays } from '../metrics/_shared.js';
import logger from '../logger.js';

/**
 * Generate the morning briefing dataset.
 * @returns {object} — structured report ready for rendering.
 */
export async function generateMorningBriefing({ asOf = new Date() } = {}) {
    const todayR = todayRange();
    const last7 = lastNDays(7);

    const [revenueToday, waitToday, losRecent] = await Promise.all([
        financeRevenue({ dateRange: todayR }).catch(e => ({ error: e.message })),
        opdWaitTime({ dateRange: todayR }).catch(e => ({ error: e.message })),
        ipdLos({ dateRange: last7 }).catch(e => ({ error: e.message })),
    ]);

    const headline = buildHeadline({ revenueToday, waitToday, losRecent });

    return {
        report_id: 'morning_briefing',
        title: 'BCH 360° Morning Briefing',
        asOf: asOf.toISOString(),
        headline,
        sections: [
            {
                id: 'revenue',
                title: 'รายได้วันนี้',
                metric: revenueToday,
            },
            {
                id: 'opd_wait',
                title: 'OPD Wait Time',
                metric: waitToday,
            },
            {
                id: 'ipd_los',
                title: 'IPD LOS (7 วัน)',
                metric: losRecent,
            },
        ],
        footer: 'รายงานอัตโนมัติ — สำหรับข้อสงสัย ติดต่อทีม IT (bch-360-expert)',
    };
}

function buildHeadline({ revenueToday, waitToday, losRecent }) {
    const parts = [];
    if (revenueToday?.value != null) {
        const m = (revenueToday.value / 1e6).toFixed(2);
        parts.push(`รายได้วันนี้ ฿${m}M`);
    }
    if (waitToday?.value != null) {
        parts.push(`เวลารอ OPD เฉลี่ย ${waitToday.value} นาที`);
    }
    if (losRecent?.value != null) {
        parts.push(`LOS เฉลี่ย 7 วัน ${losRecent.value} วัน`);
    }
    return parts.join(' • ') || 'ยังไม่มีข้อมูลสำหรับวันนี้';
}

// ── CLI entry: node server/reports/morningBriefing.js ──
if (import.meta.url === `file://${process.argv[1]}`) {
    (async () => {
        const report = await generateMorningBriefing();
        console.log(JSON.stringify(report, null, 2));
        process.exit(0);
    })().catch(err => {
        logger.error('[morningBriefing] failed', { message: err.message });
        process.exit(1);
    });
}
