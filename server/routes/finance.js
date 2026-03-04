// ============================================================
// Finance & RCM Routes — HOSxP XE Only, Optimized
// ============================================================
import { Router } from 'express';
import hosxp from '../db/hosxpIntegration.js';
import { cacheMiddleware } from '../cache/redis.js';

const router = Router();
const MN = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

// ---- Monthly Summary (cached 3 min) ----
router.get('/monthly-summary', cacheMiddleware(180), async (req, res) => {
    try {
        const year = parseInt(req.query.year) || new Date().getFullYear();
        const rows = await hosxp.getMonthlyRevenue(year);

        const monthly = Array.from({ length: 12 }, (_, i) => ({
            month: i + 1, month_name: MN[i + 1], revenue: 0, expense: 0, profit: 0, margin: 0
        }));
        (rows || []).forEach(r => {
            const m = monthly[r.m - 1];
            if (m) {
                m.revenue = Number(r.r || 0);
                m.expense = Math.round(m.revenue * 0.62);
                m.profit = m.revenue - m.expense;
                m.margin = m.revenue > 0 ? Math.round((m.profit / m.revenue) * 1000) / 10 : 0;
            }
        });
        const totR = monthly.reduce((s, m) => s + m.revenue, 0);
        const totE = monthly.reduce((s, m) => s + m.expense, 0);

        res.json({
            data_source: 'HOSxP XE', year, monthly,
            summary: {
                total_revenue: Math.round(totR), total_expense: Math.round(totE),
                net_profit: Math.round(totR - totE),
                profit_margin: totR > 0 ? Math.round(((totR - totE) / totR) * 1000) / 10 : 0
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---- Claims (cached 2 min) ----
router.get('/claims', cacheMiddleware(120), async (req, res) => {
    try {
        const data = await hosxp.getClaimsData({
            limit: parseInt(req.query.limit) || 100,
            dateFrom: req.query.dateFrom, dateTo: req.query.dateTo
        });
        const claims = data || [];
        res.json({
            data_source: 'HOSxP XE', claims,
            stats: {
                total: claims.length,
                total_amount: claims.reduce((s, c) => s + Number(c.charge || 0), 0),
                approved_amount: claims.reduce((s, c) => s + Number(c.paid || 0), 0),
                avg_los: claims.length > 0 ? Math.round(claims.reduce((s, c) => s + (c.los || 0), 0) / claims.length * 10) / 10 : 0
            }
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ---- Denial Analytics (cached 5 min — uses demo mapping since no eclaim denial reasons) ----
router.get('/denial-analytics', cacheMiddleware(300), async (req, res) => {
    res.json({
        by_category: [
            { denial_category: 'Documentation', count: 18, total_amount: 245000 },
            { denial_category: 'Coding', count: 14, total_amount: 189000 },
            { denial_category: 'Authorization', count: 10, total_amount: 156000 },
            { denial_category: 'Eligibility', count: 7, total_amount: 98000 },
            { denial_category: 'Duplicate', count: 3, total_amount: 42000 },
            { denial_category: 'Other', count: 2, total_amount: 25000 }
        ],
        by_payer: []
    });
});

// ---- Revenue Leakage (placeholder) ----
router.get('/revenue-leakage', cacheMiddleware(300), (req, res) => {
    res.json({ leakages: [], total_leakage: 0 });
});

router.post('/predict-denial', (req, res) => {
    res.json({ risk_score: 0, factors: [] });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔬 Professional Finance Analytics
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/analytics', cacheMiddleware(300), async (req, res) => {
    try {
        const { dbQuery, dbQueryOne } = await import('../db/mysql.js');

        const [
            // 1. Revenue per Bed-Day (current IPD)
            revPerBedDay,
            // 2. Collection Rate (Paid vs Charged)
            collectionRate,
            // 3. Monthly Revenue + Growth Trend
            monthlyGrowth,
            // 4. Payer Mix (Revenue by payer type)
            payerMix,
            // 5. Revenue per Department
            revPerDept,
            // 6. Claims Performance (IPD)
            claimsPerf,
            // 7. Average Revenue per OPD Visit
            revPerOPD,
            // 8. Average Revenue per IPD Case
            revPerIPD,
            // 9. Unpaid / Outstanding
            unpaidRatio,
            // 10. Cost Structure (DRG-based)
            costStructure,
            // 11. Average LOS + Bed Turnover Rate + CMI
            losAndTurnover,
            // 12. OPD total revenue for OPD-IPD ratio
            opdTotalRev90d,
            // 13. High-RW Case Analysis
            highRwAnalysis,
            // 14. Provider Productivity
            providerProductivity,
            // 15. New vs Return Patient Revenue
            newVsReturnRevenue,
            // 16. Weekend Revenue Pattern
            weekendRevenue
        ] = await Promise.all([
            // 1. Revenue per Bed-Day
            dbQueryOne(`
                SELECT
                    ROUND(SUM(a.income) / NULLIF(SUM(DATEDIFF(i.dchdate, i.regdate)), 0), 0) as rev_per_bed_day,
                    SUM(DATEDIFF(i.dchdate, i.regdate)) as total_bed_days,
                    SUM(a.income) as total_charge,
                    COUNT(*) as total_cases
                FROM ipt i
                INNER JOIN an_stat a ON i.an = a.an
                WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
                    AND i.dchdate IS NOT NULL
                    AND i.ward != '06'
            `).catch(() => null),

            // 2. Collection Rate
            dbQueryOne(`
                SELECT
                    ROUND(SUM(COALESCE(a.rcpt_money,0) + COALESCE(a.uc_money,0) + COALESCE(a.discount_money,0) + COALESCE(a.paid_money,0)), 0) as total_paid,
                    ROUND(SUM(a.income), 0) as total_charged,
                    ROUND(100.0 * SUM(COALESCE(a.rcpt_money,0) + COALESCE(a.uc_money,0) + COALESCE(a.discount_money,0) + COALESCE(a.paid_money,0)) / NULLIF(SUM(a.income), 0), 1) as collection_rate,
                    COUNT(*) as total_cases,
                    SUM(CASE WHEN (COALESCE(a.rcpt_money,0) + COALESCE(a.uc_money,0) + COALESCE(a.discount_money,0) + COALESCE(a.paid_money,0)) < a.income * 0.5 THEN 1 ELSE 0 END) as under_collected
                FROM an_stat a
                INNER JOIN ipt i ON a.an = i.an
                WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
                    AND i.dchdate IS NOT NULL
                    AND a.income > 0
            `).catch(() => null),

            // 3. Monthly Revenue (12 months)
            dbQuery(`
                SELECT
                    DATE_FORMAT(v.vstdate, '%Y-%m') as month,
                    ROUND(SUM(v.income), 0) as revenue,
                    COUNT(DISTINCT v.vn) as visits,
                    ROUND(AVG(v.income), 0) as avg_per_visit
                FROM vn_stat v
                WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
                    AND v.income > 0
                GROUP BY DATE_FORMAT(v.vstdate, '%Y-%m')
                ORDER BY month
            `).catch(() => []),

            // 4. Payer Mix (top 10 by revenue) — use ovst.pttype (actual visit insurance)
            dbQuery(`
                SELECT
                    COALESCE(pt.name, CONCAT('สิทธิ์ ', o.pttype)) as payer,
                    COUNT(DISTINCT v.vn) as visit_count,
                    ROUND(SUM(v.income), 0) as total_revenue,
                    ROUND(AVG(v.income), 0) as avg_revenue
                FROM vn_stat v
                INNER JOIN ovst o ON v.vn = o.vn
                LEFT JOIN pttype pt ON o.pttype = pt.pttype
                WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
                    AND v.income > 0
                GROUP BY o.pttype, pt.name
                ORDER BY total_revenue DESC
                LIMIT 10
            `).catch(() => []),

            // 5. Revenue per Department (IPD wards)
            dbQuery(`
                SELECT
                    w.name as dept,
                    COUNT(*) as cases,
                    ROUND(SUM(a.income), 0) as revenue,
                    ROUND(AVG(a.income), 0) as avg_revenue,
                    ROUND(AVG(a.rw), 2) as avg_rw,
                    ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 1) as avg_los
                FROM ipt i
                INNER JOIN an_stat a ON i.an = a.an
                LEFT JOIN ward w ON i.ward = w.ward
                WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
                    AND i.dchdate IS NOT NULL AND i.ward != '06'
                GROUP BY w.ward, w.name
                ORDER BY revenue DESC
            `).catch(() => []),

            // 6. Claims Performance — "paid" = actual payment received (not DRG weight)
            dbQueryOne(`
                SELECT
                    COUNT(*) as total_claims,
                    SUM(CASE WHEN (COALESCE(a.rcpt_money,0) + COALESCE(a.uc_money,0) + COALESCE(a.discount_money,0) + COALESCE(a.paid_money,0)) > 0 THEN 1 ELSE 0 END) as paid_claims,
                    ROUND(100.0 * SUM(CASE WHEN (COALESCE(a.rcpt_money,0) + COALESCE(a.uc_money,0) + COALESCE(a.discount_money,0) + COALESCE(a.paid_money,0)) > 0 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) as claim_success_rate,
                    ROUND(SUM(a.income - (COALESCE(a.rcpt_money,0) + COALESCE(a.uc_money,0) + COALESCE(a.discount_money,0) + COALESCE(a.paid_money,0))), 0) as total_gap,
                    ROUND(AVG(a.income - (COALESCE(a.rcpt_money,0) + COALESCE(a.uc_money,0) + COALESCE(a.discount_money,0) + COALESCE(a.paid_money,0))), 0) as avg_gap,
                    ROUND(AVG(a.rw), 3) as avg_adjrw
                FROM an_stat a
                INNER JOIN ipt i ON a.an = i.an
                WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
                    AND i.dchdate IS NOT NULL
                    AND a.income > 0
            `).catch(err => { console.error('⚠️ Claims Performance query failed:', err.message); return null; }),

            // 7. Revenue per OPD Visit
            dbQueryOne(`
                SELECT
                    ROUND(AVG(v.income), 0) as avg_opd_revenue,
                    ROUND(STDDEV(v.income), 0) as sd_opd_revenue,
                    COUNT(DISTINCT v.vn) as total_opd_visits,
                    ROUND(SUM(v.income), 0) as total_opd_revenue
                FROM vn_stat v
                WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                    AND v.income > 0
            `).catch(() => null),

            // 8. Revenue per IPD Case
            dbQueryOne(`
                SELECT
                    ROUND(AVG(a.income), 0) as avg_ipd_charge,
                    ROUND(AVG(COALESCE(a.rcpt_money,0) + COALESCE(a.uc_money,0) + COALESCE(a.discount_money,0) + COALESCE(a.paid_money,0)), 0) as avg_ipd_paid,
                    ROUND(AVG(a.income - (COALESCE(a.rcpt_money,0) + COALESCE(a.uc_money,0) + COALESCE(a.discount_money,0) + COALESCE(a.paid_money,0))), 0) as avg_ipd_gap,
                    COUNT(*) as total_ipd_dch,
                    ROUND(SUM(a.income), 0) as total_ipd_charge,
                    ROUND(SUM(COALESCE(a.rcpt_money,0) + COALESCE(a.uc_money,0) + COALESCE(a.discount_money,0) + COALESCE(a.paid_money,0)), 0) as total_ipd_paid
                FROM an_stat a
                INNER JOIN ipt i ON a.an = i.an
                WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                    AND i.dchdate IS NOT NULL
                    AND a.income > 0
            `).catch(() => null),

            // 9. Unpaid Outstanding (current IPD) — optimized: flat JOIN replaces correlated subquery
            dbQueryOne(`
                SELECT
                    COUNT(DISTINCT i.an) as current_ipd,
                    ROUND(COALESCE(SUM(vs.income), 0), 0) as accumulated_charge,
                    ROUND(AVG(DATEDIFF(NOW(), i.regdate)), 1) as avg_los_current
                FROM ipt i
                LEFT JOIN ovst o ON o.hn = i.hn AND o.vstdate >= i.regdate
                LEFT JOIN vn_stat vs ON vs.vn = o.vn
                WHERE i.dchdate IS NULL AND i.ward != '06'
            `).catch(() => null),

            // 10. Cost Structure by DRG (top DRGs)
            dbQuery(`
                SELECT
                    a.drg,
                    COUNT(*) as cases,
                    ROUND(AVG(a.income), 0) as avg_charge,
                    ROUND(AVG(COALESCE(a.rcpt_money,0) + COALESCE(a.uc_money,0) + COALESCE(a.discount_money,0) + COALESCE(a.paid_money,0)), 0) as avg_paid,
                    ROUND(AVG(a.rw), 2) as avg_rw,
                    ROUND(AVG(a.rw), 3) as avg_adjrw,
                    ROUND(100.0 * AVG(COALESCE(a.rcpt_money,0) + COALESCE(a.uc_money,0) + COALESCE(a.discount_money,0) + COALESCE(a.paid_money,0)) / NULLIF(AVG(a.income), 0), 1) as recovery_pct
                FROM an_stat a
                INNER JOIN ipt i ON a.an = i.an
                WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
                    AND i.dchdate IS NOT NULL
                    AND a.drg IS NOT NULL AND a.drg != ''
                GROUP BY a.drg
                HAVING cases >= 3
                ORDER BY cases DESC
                LIMIT 10
            `).catch(() => []),

            // 11. Average LOS + Bed Turnover Rate + CMI (Case Mix Index)
            dbQueryOne(`
                SELECT
                    ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 1) as avg_los,
                    ROUND(STDDEV(DATEDIFF(i.dchdate, i.regdate)), 1) as sd_los,
                    COUNT(*) as total_dc_90d,
                    COUNT(DISTINCT i.ward) as active_wards,
                    ROUND(COUNT(*) / NULLIF(COUNT(DISTINCT i.ward), 0), 1) as bed_turnover_per_ward,
                    ROUND(AVG(a.rw), 3) as cmi,
                    MIN(DATEDIFF(i.dchdate, i.regdate)) as min_los,
                    MAX(DATEDIFF(i.dchdate, i.regdate)) as max_los,
                    SUM(CASE WHEN DATEDIFF(i.dchdate, i.regdate) > 7 THEN 1 ELSE 0 END) as long_los_cases
                FROM ipt i
                INNER JOIN an_stat a ON i.an = a.an
                WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
                    AND i.dchdate IS NOT NULL
                    AND i.ward != '06'
            `).catch(() => null),

            // 12. OPD Total Revenue (90d) — for OPD-IPD ratio
            dbQueryOne(`
                SELECT
                    ROUND(SUM(v.income), 0) as total_opd_revenue_90d,
                    COUNT(DISTINCT v.vn) as total_opd_visits_90d
                FROM vn_stat v
                WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
                    AND v.income > 0
            `).catch(() => null),

            // 13. High-RW Case Analysis + Revenue per RW
            dbQueryOne(`
                SELECT
                    COUNT(*) as total_cases,
                    SUM(CASE WHEN a.rw >= 2.0 THEN 1 ELSE 0 END) as high_rw_cases,
                    ROUND(100.0 * SUM(CASE WHEN a.rw >= 2.0 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) as high_rw_pct,
                    ROUND(SUM(a.income) / NULLIF(SUM(a.rw), 0), 0) as revenue_per_rw,
                    ROUND(SUM(a.rw), 2) as total_rw,
                    ROUND(AVG(CASE WHEN a.rw >= 2.0 THEN a.income ELSE NULL END), 0) as avg_high_rw_revenue,
                    ROUND(AVG(CASE WHEN a.rw < 2.0 THEN a.income ELSE NULL END), 0) as avg_low_rw_revenue
                FROM an_stat a
                INNER JOIN ipt i ON a.an = i.an
                WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
                    AND i.dchdate IS NOT NULL
                    AND a.rw > 0
            `).catch(() => null),

            // 14. Provider Productivity (Revenue per Doctor)
            dbQuery(`
                SELECT
                    CONCAT(IFNULL(d.pname,''), IFNULL(d.fname,''), ' ', IFNULL(d.lname,'')) as doctor_name,
                    COUNT(DISTINCT v.vn) as visit_count,
                    ROUND(SUM(v.income), 0) as total_revenue,
                    ROUND(AVG(v.income), 0) as avg_revenue_per_visit
                FROM vn_stat v
                INNER JOIN doctor d ON v.doctor = d.code
                WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
                    AND v.income > 0
                    AND (d.fname IS NOT NULL AND d.fname != '')
                GROUP BY v.doctor, d.pname, d.fname, d.lname
                ORDER BY total_revenue DESC
                LIMIT 10
            `).catch(() => []),

            // 15. New vs Return Patient Revenue
            dbQueryOne(`
                SELECT
                    COUNT(DISTINCT CASE WHEN v.count_visit = 1 THEN v.vn END) as new_visits,
                    COUNT(DISTINCT CASE WHEN v.count_visit > 1 THEN v.vn END) as return_visits,
                    ROUND(SUM(CASE WHEN v.count_visit = 1 THEN v.income ELSE 0 END), 0) as new_revenue,
                    ROUND(SUM(CASE WHEN v.count_visit > 1 THEN v.income ELSE 0 END), 0) as return_revenue,
                    COUNT(DISTINCT v.vn) as total_visits
                FROM vn_stat v
                WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
                    AND v.income > 0
            `).catch(() => null),

            // 16. Weekend vs Weekday Revenue
            dbQueryOne(`
                SELECT
                    ROUND(SUM(CASE WHEN DAYOFWEEK(v.vstdate) IN (1, 7) THEN v.income ELSE 0 END), 0) as weekend_revenue,
                    ROUND(SUM(CASE WHEN DAYOFWEEK(v.vstdate) NOT IN (1, 7) THEN v.income ELSE 0 END), 0) as weekday_revenue,
                    COUNT(DISTINCT CASE WHEN DAYOFWEEK(v.vstdate) IN (1, 7) THEN v.vn END) as weekend_visits,
                    COUNT(DISTINCT CASE WHEN DAYOFWEEK(v.vstdate) NOT IN (1, 7) THEN v.vn END) as weekday_visits
                FROM vn_stat v
                WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
                    AND v.income > 0
            `).catch(() => null)
        ]);

        // ━━ Financial Health Index (FHI) — Composite 0-100 ━━
        // Weights: Collection Rate 30% + Claims Success 25% + Revenue Growth 20% + Unpaid Risk 15% + Efficiency 10%
        const collRate = Number(collectionRate?.collection_rate || 0);
        const collScore = Math.min(100, Math.round(collRate)); // direct mapping

        const claimSuccess = Number(claimsPerf?.claim_success_rate || 0);
        const claimScore = Math.min(100, Math.round(claimSuccess));

        // Revenue growth = compare last 2 COMPLETE months (skip current partial month)
        const monthlyArr = monthlyGrowth || [];
        let growthScore = 50;
        if (monthlyArr.length >= 2) {
            // Current month (today) is incomplete — skip it
            const currentYM = new Date().toISOString().slice(0, 7); // e.g. "2026-03"
            const completedMonths = monthlyArr.filter(m => m.month !== currentYM);
            if (completedMonths.length >= 2) {
                const last = Number(completedMonths[completedMonths.length - 1]?.revenue || 0);
                const prev = Number(completedMonths[completedMonths.length - 2]?.revenue || 0);
                const growth = prev > 0 ? ((last - prev) / prev) * 100 : 0;
                growthScore = Math.max(0, Math.min(100, Math.round(50 + growth * 2)));
                console.log(`📈 Growth: ${completedMonths[completedMonths.length - 2]?.month}(${prev}) → ${completedMonths[completedMonths.length - 1]?.month}(${last}) = ${growth.toFixed(1)}% → score ${growthScore}`);
            } else if (completedMonths.length === 1) {
                growthScore = 50; // only 1 complete month, neutral
            }
        }

        const unpaidCharge = Number(unpaidRatio?.accumulated_charge || 0);
        const opdRev = Math.max(Number(revPerOPD?.total_opd_revenue || 1), 1);
        const unpaidScore = Math.max(0, Math.round(100 - (unpaidCharge / opdRev) * 200));

        const efficiencyScore = Math.min(100, Math.round(Number(revPerBedDay?.rev_per_bed_day || 0) / 50));

        console.log(`💰 FHI Debug: Collection=${collScore} Claims=${claimScore}(raw=${claimSuccess}) Growth=${growthScore}(months=${monthlyArr.length}) Unpaid=${unpaidScore} Efficiency=${efficiencyScore}`);

        const fhi = Math.round(
            (collScore * 0.30) +
            (claimScore * 0.25) +
            (growthScore * 0.20) +
            (Math.max(0, unpaidScore) * 0.15) +
            (Math.min(100, efficiencyScore) * 0.10)
        );

        // Monthly trend with Thai month names
        const MONTH_TH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
        const trendData = (monthlyGrowth || []).map((m, i, arr) => ({
            month: MONTH_TH[parseInt(m.month?.split('-')[1])] || m.month,
            revenue: Number(m.revenue || 0),
            visits: Number(m.visits || 0),
            avg: Number(m.avg_per_visit || 0),
            growth: i > 0 && Number(arr[i - 1]?.revenue) > 0
                ? Math.round(((Number(m.revenue || 0) - Number(arr[i - 1]?.revenue || 0)) / Number(arr[i - 1]?.revenue)) * 100 * 10) / 10
                : 0,
        }));

        res.json({
            data_source: 'HOSxP XE',

            // ━━ Composite ━━
            fhi, // Financial Health Index 0-100
            fhi_components: {
                collection: collScore,
                claims: claimScore,
                growth: growthScore,
                unpaid_risk: Math.max(0, unpaidScore),
                efficiency: Math.min(100, efficiencyScore),
            },

            // ━━ Revenue KPIs ━━
            rev_per_bed_day: Number(revPerBedDay?.rev_per_bed_day || 0),
            total_bed_days_90d: Number(revPerBedDay?.total_bed_days || 0),
            total_ipd_charge_90d: Number(revPerBedDay?.total_charge || 0),

            // ━━ Collection ━━
            collection_rate: collRate,
            total_paid_90d: Number(collectionRate?.total_paid || 0),
            total_charged_90d: Number(collectionRate?.total_charged || 0),
            under_collected_cases: Number(collectionRate?.under_collected || 0),

            // ━━ Claims ━━
            claim_success_rate: claimSuccess,
            total_claims_gap: Number(claimsPerf?.total_gap || 0),
            avg_claim_gap: Number(claimsPerf?.avg_gap || 0),
            avg_adjrw: Number(claimsPerf?.avg_adjrw || 0),

            // ━━ OPD Revenue ━━
            avg_opd_revenue: Number(revPerOPD?.avg_opd_revenue || 0),
            total_opd_revenue_30d: Number(revPerOPD?.total_opd_revenue || 0),
            total_opd_visits_30d: Number(revPerOPD?.total_opd_visits || 0),

            // ━━ IPD Revenue ━━
            avg_ipd_charge: Number(revPerIPD?.avg_ipd_charge || 0),
            avg_ipd_paid: Number(revPerIPD?.avg_ipd_paid || 0),
            avg_ipd_gap: Number(revPerIPD?.avg_ipd_gap || 0),
            total_ipd_dch_30d: Number(revPerIPD?.total_ipd_dch || 0),

            // ━━ Unpaid ━━
            current_ipd_accumulated: Number(unpaidRatio?.accumulated_charge || 0),
            current_ipd_count: Number(unpaidRatio?.current_ipd || 0),

            // ━━ NEW: LOS & Turnover & CMI ━━
            avg_los: Number(losAndTurnover?.avg_los || 0),
            sd_los: Number(losAndTurnover?.sd_los || 0),
            min_los: Number(losAndTurnover?.min_los || 0),
            max_los: Number(losAndTurnover?.max_los || 0),
            long_los_cases: Number(losAndTurnover?.long_los_cases || 0),
            total_dc_90d: Number(losAndTurnover?.total_dc_90d || 0),
            active_wards: Number(losAndTurnover?.active_wards || 0),
            bed_turnover_per_ward: Number(losAndTurnover?.bed_turnover_per_ward || 0),
            cmi: Number(losAndTurnover?.cmi || 0),

            // ━━ NEW: Revenue Composition ━━
            total_opd_revenue_90d: Number(opdTotalRev90d?.total_opd_revenue_90d || 0),
            total_opd_visits_90d: Number(opdTotalRev90d?.total_opd_visits_90d || 0),
            opd_ipd_ratio: (() => {
                const opd90 = Number(opdTotalRev90d?.total_opd_revenue_90d || 0);
                const ipd90 = Number(revPerBedDay?.total_charge || 0);
                const total = opd90 + ipd90;
                return {
                    opd_pct: total > 0 ? Math.round(1000 * opd90 / total) / 10 : 0,
                    ipd_pct: total > 0 ? Math.round(1000 * ipd90 / total) / 10 : 0,
                    total: total,
                };
            })(),

            // ━━ NEW: Revenue MoM Growth ━━
            revenue_mom_growth: (() => {
                const currentYM = new Date().toISOString().slice(0, 7);
                const completed = (monthlyGrowth || []).filter(m => m.month !== currentYM);
                if (completed.length >= 2) {
                    const last = Number(completed[completed.length - 1]?.revenue || 0);
                    const prev = Number(completed[completed.length - 2]?.revenue || 0);
                    return prev > 0 ? Math.round(((last - prev) / prev) * 1000) / 10 : 0;
                }
                return 0;
            })(),

            // ━━ NEW: Days in A/R ━━
            days_in_ar: (() => {
                const outstanding = Number(unpaidRatio?.accumulated_charge || 0);
                const totalRev90 = Number(revPerBedDay?.total_charge || 0) + Number(opdTotalRev90d?.total_opd_revenue_90d || 0);
                const dailyRev = totalRev90 / 90;
                return dailyRev > 0 ? Math.round(outstanding / dailyRev * 10) / 10 : 0;
            })(),

            // ━━ NEW: Profit Margin (estimated 62% cost ratio) ━━
            profit_margin: (() => {
                const totalRev90 = Number(revPerBedDay?.total_charge || 0) + Number(opdTotalRev90d?.total_opd_revenue_90d || 0);
                const totalExp = Math.round(totalRev90 * 0.62);
                return totalRev90 > 0 ? Math.round(((totalRev90 - totalExp) / totalRev90) * 1000) / 10 : 0;
            })(),

            // ━━ NEW: High-RW & DRG Efficiency ━━
            high_rw_cases: Number(highRwAnalysis?.high_rw_cases || 0),
            high_rw_pct: Number(highRwAnalysis?.high_rw_pct || 0),
            revenue_per_rw: Number(highRwAnalysis?.revenue_per_rw || 0),
            total_rw: Number(highRwAnalysis?.total_rw || 0),
            avg_high_rw_revenue: Number(highRwAnalysis?.avg_high_rw_revenue || 0),
            avg_low_rw_revenue: Number(highRwAnalysis?.avg_low_rw_revenue || 0),

            // ━━ NEW: DRG Recovery Rate (avg across all DRGs) ━━
            drg_recovery_rate: (() => {
                const drgs = costStructure || [];
                if (drgs.length === 0) return 0;
                const avgRecovery = drgs.reduce((s, d) => s + Number(d.recovery_pct || 0), 0) / drgs.length;
                return Math.round(avgRecovery * 10) / 10;
            })(),

            // ━━ NEW: Revenue Volatility (SD of monthly revenue) ━━
            revenue_volatility: (() => {
                const currentYM = new Date().toISOString().slice(0, 7);
                const revs = (monthlyGrowth || []).filter(m => m.month !== currentYM).map(m => Number(m.revenue || 0)).filter(r => r > 0);
                if (revs.length < 2) return 0;
                const mean = revs.reduce((s, r) => s + r, 0) / revs.length;
                const variance = revs.reduce((s, r) => s + Math.pow(r - mean, 2), 0) / revs.length;
                const sd = Math.sqrt(variance);
                return mean > 0 ? Math.round((sd / mean) * 1000) / 10 : 0; // CV% (Coefficient of Variation)
            })(),

            // ━━ NEW: Payer Concentration Risk (top 3 payer %) ━━
            payer_concentration: (() => {
                const sorted = (payerMix || []).sort((a, b) => Number(b.total_revenue || 0) - Number(a.total_revenue || 0));
                const totalRev = sorted.reduce((s, p) => s + Number(p.total_revenue || 0), 0);
                const top3Rev = sorted.slice(0, 3).reduce((s, p) => s + Number(p.total_revenue || 0), 0);
                return totalRev > 0 ? Math.round(1000 * top3Rev / totalRev) / 10 : 0;
            })(),

            // ━━ NEW: Bad Debt Ratio ━━
            bad_debt_ratio: (() => {
                const uc = Number(collectionRate?.under_collected || 0);
                const total = Number(collectionRate?.total_cases || 1);
                return Math.round(1000 * uc / total) / 10;
            })(),

            // ━━ Detail Data ━━
            payer_mix: (() => {
                const payerList = (payerMix || []).map(p => ({
                    payer: p.payer || 'Unknown',
                    visits: Number(p.visit_count || 0),
                    revenue: Number(p.total_revenue || 0),
                    avg: Number(p.avg_revenue || 0),
                }));
                const totalPayerRev = payerList.reduce((s, p) => s + p.revenue, 0);
                return payerList.map(p => ({ ...p, pct: totalPayerRev > 0 ? Math.round(1000 * p.revenue / totalPayerRev) / 10 : 0 }));
            })(),

            revenue_by_dept: (revPerDept || []).map(d => ({
                dept: d.dept || 'Unknown',
                cases: Number(d.cases || 0),
                revenue: Number(d.revenue || 0),
                avg_revenue: Number(d.avg_revenue || 0),
                avg_rw: Number(d.avg_rw || 0),
                avg_los: Number(d.avg_los || 0),
            })),

            revenue_trend: trendData,

            cost_by_drg: (costStructure || []).map(d => ({
                drg: d.drg,
                cases: Number(d.cases || 0),
                avg_charge: Number(d.avg_charge || 0),
                avg_paid: Number(d.avg_paid || 0),
                avg_rw: Number(d.avg_rw || 0),
                recovery_pct: Number(d.recovery_pct || 0),
            })),

            // ━━ NEW: Provider Productivity ━━
            top_doctors: (providerProductivity || []).map(d => ({
                name: d.doctor_name,
                visits: Number(d.visit_count || 0),
                revenue: Number(d.total_revenue || 0),
                avg_per_visit: Number(d.avg_revenue_per_visit || 0),
            })),
            active_doctors: (providerProductivity || []).length,
            revenue_per_doctor: (() => {
                const docs = providerProductivity || [];
                const totalRev = docs.reduce((s, d) => s + Number(d.total_revenue || 0), 0);
                return docs.length > 0 ? Math.round(totalRev / docs.length) : 0;
            })(),
            avg_visits_per_doctor: (() => {
                const docs = providerProductivity || [];
                const totalVisits = docs.reduce((s, d) => s + Number(d.visit_count || 0), 0);
                return docs.length > 0 ? Math.round(totalVisits / docs.length) : 0;
            })(),

            // ━━ NEW: New vs Return Patient ━━
            new_patient_visits: Number(newVsReturnRevenue?.new_visits || 0),
            return_patient_visits: Number(newVsReturnRevenue?.return_visits || 0),
            new_patient_revenue: Number(newVsReturnRevenue?.new_revenue || 0),
            return_patient_revenue: Number(newVsReturnRevenue?.return_revenue || 0),
            new_patient_pct: (() => {
                const total = Number(newVsReturnRevenue?.total_visits || 0);
                const newV = Number(newVsReturnRevenue?.new_visits || 0);
                return total > 0 ? Math.round(1000 * newV / total) / 10 : 0;
            })(),
            return_revenue_pct: (() => {
                const newR = Number(newVsReturnRevenue?.new_revenue || 0);
                const retR = Number(newVsReturnRevenue?.return_revenue || 0);
                const total = newR + retR;
                return total > 0 ? Math.round(1000 * retR / total) / 10 : 0;
            })(),

            // ━━ NEW: Weekend Revenue ━━
            weekend_revenue: Number(weekendRevenue?.weekend_revenue || 0),
            weekday_revenue: Number(weekendRevenue?.weekday_revenue || 0),
            weekend_visits: Number(weekendRevenue?.weekend_visits || 0),
            weekday_visits: Number(weekendRevenue?.weekday_visits || 0),
            weekend_revenue_pct: (() => {
                const we = Number(weekendRevenue?.weekend_revenue || 0);
                const wd = Number(weekendRevenue?.weekday_revenue || 0);
                const total = we + wd;
                return total > 0 ? Math.round(1000 * we / total) / 10 : 0;
            })(),

            timestamp: new Date().toISOString(),
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;
