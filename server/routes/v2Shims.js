// ============================================================
// V2 Shim endpoints — data shapes that the new Tailwind-native tabs expect.
//
// Why a dedicated file: the legacy /api routes return shapes the old tabs
// depend on; touching them risks breaking live dashboards. This router
// sits earlier in the chain and provides V2-specific JSON for the handful
// of new URLs that FinanceTabV2 / ExecutiveCommandCenterV2 / DataQualityTab
// consume. Mounted at `/api` BEFORE `/api/finance` etc.
// ============================================================
import { Router } from 'express';
import { dbQuery, dbQueryOne } from '../db/mysql.js';
import { cached } from '../cache/staleCache.js';
import { compute as revenueCompute } from '../metrics/finance/revenue.js';
import { compute as collectionRateCompute } from '../metrics/finance/collectionRate.js';
import { compute as denialRateCompute } from '../metrics/finance/denialRate.js';
import { compute as yoyGrowthCompute } from '../metrics/finance/yoyGrowth.js';
import { compute as arBalanceCompute } from '../metrics/finance/arBalance.js';
import { compute as newsCriticalCompute } from '../metrics/clinical/news2.js';
import { getEWSSummary } from '../ai/ewsEngine.js';
import { todayRange, lastNDays } from '../metrics/_shared.js';
import logger from '../logger.js';

const router = Router();

// ── /api/finance/summary ──
// V2 expects: revenue_today, revenue_mtd, collection_rate, denial_rate,
//             ar_balance, ar_aging.{0_30,31_60,61_90,90_plus},
//             undercharging_count, trend fields, generated_at
router.get('/finance/summary', cached('v2.financeSummary', 60_000, async () => {
    const today = todayRange();
    const now = new Date();
    const mtdStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
    const mtdEnd = today.end;
    const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);
    const prevMtdStart = `${prevMonthEnd.getFullYear()}-${String(prevMonthEnd.getMonth() + 1).padStart(2, '0')}-01`;
    const prevMtdEnd = `${prevMonthEnd.getFullYear()}-${String(prevMonthEnd.getMonth() + 1).padStart(2, '0')}-${String(Math.min(now.getDate() - 1, prevMonthEnd.getDate())).padStart(2, '0')}`;

    const [revToday, revYesterday, revMtd, revPrevMtd, collToday, denialMtd, yoy, ar, underN] = await Promise.all([
        revenueCompute({ dateRange: today }).catch(() => ({ value: 0 })),
        revenueCompute({ dateRange: { start: yesterday(1), end: yesterday(1) } }).catch(() => ({ value: 0 })),
        revenueCompute({ dateRange: { start: mtdStart, end: mtdEnd } }).catch(() => ({ value: 0 })),
        revenueCompute({ dateRange: { start: prevMtdStart, end: prevMtdEnd } }).catch(() => ({ value: 0 })),
        collectionRateCompute({ dateRange: { start: mtdStart, end: mtdEnd } }).catch(() => ({ value: null })),
        denialRateCompute({ dateRange: lastNDays(30) }).catch(() => ({ value: null })),
        yoyGrowthCompute({ dateRange: { start: mtdStart, end: mtdEnd } }).catch(() => ({ value: null })),
        arBalanceCompute().catch(() => ({ value: 0, aging: {} })),
        dbQueryOne(`
            SELECT COUNT(*) AS n
            FROM ovst o
            WHERE o.vstdate = CURDATE()
              AND o.pdx IS NOT NULL AND o.pdx != ''
              AND NOT EXISTS (SELECT 1 FROM opitemrece r WHERE r.vn = o.vn AND r.vstdate = o.vstdate)
        `).catch(() => ({ n: 0 })),
    ]);

    const revYest = Number(revYesterday?.value || 0);
    const revT = Number(revToday?.value || 0);
    const revPrev = Number(revPrevMtd?.value || 0);
    const revM = Number(revMtd?.value || 0);

    return {
        revenue_today: revT,
        revenue_trend_pct: revYest > 0 ? round2(((revT - revYest) / revYest) * 100) : null,
        revenue_mtd: revM,
        revenue_mtd_trend_pct: revPrev > 0 ? round2(((revM - revPrev) / revPrev) * 100) : null,
        revenue_target_mtd: Math.round(revPrev * 1.05) || null,  // naive target: 5% over prior month

        collection_rate: collToday?.value != null ? round2(collToday.value * 100) : null,

        ar_balance: ar?.value || 0,
        ar_balance_trend_pct: null,  // TODO: previous period AR
        ar_aged_90plus: ar?.aging?.['90_plus'] || 0,
        ar_aging: ar?.aging || { '0_30': 0, '31_60': 0, '61_90': 0, '90_plus': 0 },

        denial_rate: denialMtd?.value != null ? round2(denialMtd.value * 100) : null,
        undercharging_count: Number(underN?.n || 0),

        yoy_growth_pct: yoy?.value != null ? round2(yoy.value * 100) : null,
        generated_at: Date.now(),
    };
}));

// ── /api/finance/revenue-trend?days=30 ──
// V2 expects: { series: [{d, revenue, previous, ma7}] }
router.get('/finance/revenue-trend', cached('v2.revenueTrend', 5 * 60_000, async (req) => {
    const days = Math.max(1, Math.min(365, Number(req.query?.days) || 30));
    const rows = await dbQuery(`
        SELECT DATE(vstdate) AS d, COALESCE(SUM(income), 0) AS revenue
        FROM vn_stat
        WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL ? DAY)
          AND vstdate < CURDATE()
        GROUP BY DATE(vstdate)
        ORDER BY d
    `, [days + 365]).catch(e => { logger.warn('revenue-trend failed', { message: e.message }); return []; });

    const byDate = new Map(rows.map(r => [String(r.d).slice(0, 10), Number(r.revenue)]));
    const series = [];
    const shift = (dateStr, deltaDays) => {
        const d = new Date(dateStr);
        d.setDate(d.getDate() + deltaDays);
        return d.toISOString().slice(0, 10);
    };

    for (let i = days - 1; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i - 1);  // exclude today (not yet finalized)
        const key = d.toISOString().slice(0, 10);
        const priorKey = shift(key, -365);

        // 7-day MA: look back 7 days from key
        let ma7 = 0, count = 0;
        for (let j = 0; j < 7; j++) {
            const past = shift(key, -j);
            const v = byDate.get(past);
            if (v != null) { ma7 += v; count++; }
        }
        ma7 = count ? Math.round(ma7 / count) : 0;

        series.push({
            d: key.slice(5),  // MM-DD for display
            revenue: byDate.get(key) || 0,
            previous: byDate.get(priorKey) || null,
            ma7,
        });
    }

    return { series, days, generated_at: Date.now() };
}));

// ── /api/finance/denial-breakdown ──
// V2 expects: { reasons: [{reason, count}], threshold }
router.get('/finance/denial-breakdown', cached('v2.denialBreakdown', 15 * 60_000, async () => {
    // HOSxP doesn't cleanly categorise denial reasons. Proxy: group visits
    // with outstanding > 0 by pttype (insurance scheme). Swap to real claim
    // status when billing API is wired.
    const rows = await dbQuery(`
        SELECT COALESCE(pt.name, CONCAT('pttype ', v.pttype)) AS reason, COUNT(*) AS count
        FROM vn_stat v
        LEFT JOIN pttype pt ON pt.pttype = v.pttype
        WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
          AND v.remain_money > 0
        GROUP BY v.pttype
        ORDER BY count DESC
        LIMIT 8
    `).catch(() => []);

    return {
        reasons: rows.map(r => ({ reason: String(r.reason).slice(0, 40), count: Number(r.count) })),
        threshold: 50,
        note: 'proxy: grouped by pttype where remain_money > 0 (30d)',
        generated_at: Date.now(),
    };
}));

// ── /api/finance/pttype-revenue ──
// V2 expects: { breakdown: [{label, revenue}] }
router.get('/finance/pttype-revenue', cached('v2.pttypeRevenue', 15 * 60_000, async () => {
    const now = new Date();
    const mtdStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;
    const rows = await dbQuery(`
        SELECT COALESCE(pt.name, CONCAT('pttype ', v.pttype)) AS label, COALESCE(SUM(v.income), 0) AS revenue
        FROM vn_stat v
        LEFT JOIN pttype pt ON pt.pttype = v.pttype
        WHERE v.vstdate >= ?
          AND v.income > 0
        GROUP BY v.pttype
        ORDER BY revenue DESC
        LIMIT 8
    `, [mtdStart]).catch(() => []);

    return {
        breakdown: rows.map(r => ({ label: String(r.label).slice(0, 30), revenue: Number(r.revenue) })),
        period: `MTD from ${mtdStart}`,
        generated_at: Date.now(),
    };
}));

// ── /api/clinical/insights ──
// V2 expects: { doctor: [{priority, message, source}], nurse: [], admin: [], summary: {} }
router.get('/clinical/insights', cached('v2.clinicalInsights', 2 * 60_000, async () => {
    const [ews, critical] = await Promise.all([
        getEWSSummary().catch(() => ({ critical: 0, high: 0, total_patients: 0 })),
        newsCriticalCompute().catch(() => ({ value: null, distribution: {} })),
    ]);

    const doctor = [];
    const nurse = [];
    const admin = [];

    if (ews.critical > 0) {
        doctor.push({
            id: 'news2_critical',
            priority: 'HIGH',
            message: `ผู้ป่วย NEWS2 วิกฤต ${ews.critical} ราย — ต้องเรียก RRT`,
            count: ews.critical,
            source: 'rule-based',
        });
    }
    if (ews.high > 0) {
        nurse.push({
            id: 'news2_high',
            priority: 'MEDIUM',
            message: `ผู้ป่วย NEWS2 สูง ${ews.high} ราย — ประเมินทุก 1 ชั่วโมง`,
            count: ews.high,
            source: 'rule-based',
        });
    }
    if (ews.total_patients > 0 && ews.critical === 0 && ews.high === 0) {
        doctor.push({
            id: 'all_stable',
            priority: 'LOW',
            message: `ผู้ป่วย IPD ${ews.total_patients} รายอยู่ในเกณฑ์ปกติ`,
            source: 'rule-based',
        });
    }

    return {
        doctor, nurse, admin,
        summary: {
            total_active: ews.total_patients,
            critical: ews.critical,
            high: ews.high,
            distribution: critical?.distribution || {},
        },
        generated_at: Date.now(),
    };
}));

// ── /api/ai/finance/narrative ──
// V2 expects: { headline, analysis, recommendations, source, confidence }
router.get('/ai/finance/narrative', cached('v2.financeNarrative', 10 * 60_000, async () => {
    // Rule-based narrative assembled from metric registry. Claude layer wires
    // on top via ai/claudeNarrative.js when ANTHROPIC_API_KEY is set.
    const now = new Date();
    const mtdStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-01`;

    const [rev, denial, yoy, coll] = await Promise.all([
        revenueCompute({ dateRange: { start: mtdStart, end: now.toISOString().slice(0, 10) } }).catch(() => ({ value: 0 })),
        denialRateCompute({ dateRange: lastNDays(30) }).catch(() => ({ value: null })),
        yoyGrowthCompute({ dateRange: { start: mtdStart, end: now.toISOString().slice(0, 10) } }).catch(() => ({ value: null })),
        collectionRateCompute({ dateRange: { start: mtdStart, end: now.toISOString().slice(0, 10) } }).catch(() => ({ value: null })),
    ]);

    const revM = (rev?.value || 0) / 1e6;
    const yoyPct = yoy?.value != null ? Math.round(yoy.value * 100) : null;
    const denialPct = denial?.value != null ? Math.round(denial.value * 1000) / 10 : null;
    const collPct = coll?.value != null ? Math.round(coll.value * 1000) / 10 : null;

    const headline = `รายได้เดือนนี้ ฿${revM.toFixed(2)}M${yoyPct != null ? ` • YoY ${yoyPct > 0 ? '+' : ''}${yoyPct}%` : ''}`;

    const analysisParts = [];
    if (collPct != null) analysisParts.push(`อัตราการจัดเก็บ ${collPct}%`);
    if (denialPct != null) analysisParts.push(`อัตรา claim ไม่ผ่าน ${denialPct}%`);
    const analysis = analysisParts.length ? analysisParts.join(' • ') : 'ข้อมูลกำลังคำนวณ';

    const recommendations = [];
    if (collPct != null && collPct < 85) {
        recommendations.push({
            priority: 'HIGH',
            message: `อัตราการจัดเก็บต่ำกว่าเป้า (${collPct}% < 95%) — ตรวจสอบ pttype ที่มียอดค้างสูง`,
        });
    }
    if (denialPct != null && denialPct > 10) {
        recommendations.push({
            priority: 'HIGH',
            message: `อัตรา claim ไม่ผ่านสูง (${denialPct}% > 10%) — review denial patterns 30d`,
        });
    }
    if (yoyPct != null && yoyPct < -5) {
        recommendations.push({
            priority: 'MEDIUM',
            message: `รายได้หดตัว YoY ${yoyPct}% — เช็ค volume + mix of services`,
        });
    }
    if (!recommendations.length) {
        recommendations.push({
            priority: 'LOW',
            message: 'KPI การเงินอยู่ในเกณฑ์ปกติ — ติดตามต่อเนื่อง',
        });
    }

    return {
        headline,
        analysis,
        recommendations,
        source: 'rule-based',  // Claude layer can override when ANTHROPIC_API_KEY is set
        confidence: 0.85,
        generated_at: Date.now(),
    };
}));

// ── Helpers ──
function round2(v) { return Math.round(Number(v) * 100) / 100; }
function yesterday(n) {
    const d = new Date();
    d.setDate(d.getDate() - n);
    return d.toISOString().slice(0, 10);
}

export default router;
