// ============================================================
// Doctor Product Activity Routes
// Productivity metrics per doctor: OPD · IPD · Orders · Revenue
// ============================================================
import { Router } from 'express';
import { dbQuery, dbQueryOne } from '../db/mysql.js';
import { cacheMiddleware } from '../cache/redis.js';
import { safeError } from '../lib/safeError.js';
import logger from '../logger.js';

const router = Router();

/**
 * GET /api/doctor/activity-summary
 * Query: ?days=30 (default 30, max 90) · ?start=YYYY-MM-DD&end=YYYY-MM-DD
 * Returns aggregated doctor productivity for the period.
 */
router.get('/activity-summary', cacheMiddleware(300), async (req, res) => {
    try {
        const days = Math.min(Math.max(parseInt(req.query.days) || 30, 1), 90);
        const start = req.query.start;
        const end = req.query.end;

        // Build date condition — always cap at CURDATE() so future-dated rows don't pollute metrics
        // Note: "N วัน" = today + (N-1) days back, so INTERVAL uses (days-1) for correct count.
        // days=1 → today only · days=7 → 7 days inclusive · days=30 → 30 days inclusive
        const dateCondition = start && end
            ? 'BETWEEN ? AND LEAST(?, CURDATE())'
            : 'BETWEEN DATE_SUB(CURDATE(), INTERVAL ? DAY) AND CURDATE()';
        const dateParams = start && end ? [start, end] : [Math.max(0, days - 1)];

        // NOTE: Summary is computed AFTER enrichment (from aggregated maps) —
        // no separate SQL needed. This eliminates 6 correlated subqueries that
        // were previously dominating response time.

        // ─── Per-doctor productivity — 6 parallel GROUP BY queries ───
        // OPTIMIZED: previously 8 correlated subqueries × 90+ doctors → 7.7s
        //            now 6 independent GROUP BY queries in parallel → <1s
        // Each query does ONE index scan, results joined in app code.
        const [
            doctorMaster,
            opdAgg,
            ipdAgg,
            labAgg,
            xrayAgg,
            opdRevAgg,
            ipdRevAgg,
            dentistMaster,
        ] = await Promise.all([
            // Canonical doctor master — HOSxP `doctor` table (PK: code).
            // Filter to actual physicians (นพ./พญ. prefix). The `doctor` table
            // also stores ทพ./ทพญ. (dentists), พว. (registered nurses), and admin
            // staff who issue orders; we exclude those here because this dashboard
            // is "doctor productivity" — dentists/nurses have their own tabs.
            dbQuery(`
                SELECT d.code AS code, d.name AS name,
                    COALESCE(NULLIF(d.department, ''), '') AS position
                FROM doctor d
                WHERE COALESCE(d.active, 'Y') = 'Y'
                  AND (d.name LIKE 'นพ.%' OR d.name LIKE 'พญ.%')
                  AND d.code IS NOT NULL AND d.code <> ''
                  AND (
                    EXISTS(SELECT 1 FROM ovst o WHERE o.doctor=d.code AND o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY))
                    OR EXISTS(SELECT 1 FROM ipt i WHERE i.admdoctor=d.code AND i.regdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY))
                  )
            `),
            // OPD visits per doctor
            dbQuery(`SELECT doctor, COUNT(*) AS cnt FROM ovst WHERE vstdate ${dateCondition} AND doctor IS NOT NULL AND doctor <> '' GROUP BY doctor`, [...dateParams]),
            // IPD admissions per doctor
            dbQuery(`SELECT admdoctor, COUNT(*) AS cnt FROM ipt WHERE regdate ${dateCondition} AND admdoctor IS NOT NULL AND admdoctor <> '' GROUP BY admdoctor`, [...dateParams]),
            // Lab orders per doctor
            dbQuery(`SELECT doctor_code, COUNT(*) AS cnt FROM lab_head WHERE order_date ${dateCondition} AND doctor_code IS NOT NULL AND doctor_code <> '' GROUP BY doctor_code`, [...dateParams]),
            // X-Ray orders per doctor (via vn → ovst.doctor)
            dbQuery(`SELECT o.doctor, COUNT(*) AS cnt FROM xray_head x INNER JOIN ovst o ON x.vn = o.vn WHERE x.order_date ${dateCondition} AND o.doctor IS NOT NULL AND o.doctor <> '' GROUP BY o.doctor`, [...dateParams]),
            // OPD revenue per doctor
            dbQuery(`SELECT o.doctor, COALESCE(SUM(v.income), 0) AS total FROM vn_stat v INNER JOIN ovst o ON v.vn = o.vn WHERE v.vstdate ${dateCondition} AND o.doctor IS NOT NULL AND o.doctor <> '' GROUP BY o.doctor`, [...dateParams]),
            // IPD revenue per doctor
            dbQuery(`SELECT i.admdoctor, COALESCE(SUM(a.income), 0) AS total FROM an_stat a INNER JOIN ipt i ON a.an = i.an WHERE i.regdate ${dateCondition} AND i.admdoctor IS NOT NULL AND i.admdoctor <> '' GROUP BY i.admdoctor`, [...dateParams]),
            // Dentist master — ทพ./ทพญ. prefix on doctor table
            dbQuery(`
                SELECT d.code AS code, d.name AS name,
                    COALESCE(NULLIF(d.department, ''), '') AS position
                FROM doctor d
                WHERE COALESCE(d.active, 'Y') = 'Y'
                  AND (d.name LIKE 'ทพ.%' OR d.name LIKE 'ทพญ.%')
                  AND d.code IS NOT NULL AND d.code <> ''
                  AND EXISTS(SELECT 1 FROM ovst o WHERE o.doctor=d.code AND o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY))
            `),
        ]);

        // Build O(1) lookup maps
        const opdMap = new Map(opdAgg.map(r => [r.doctor, Number(r.cnt)]));
        const ipdMap = new Map(ipdAgg.map(r => [r.admdoctor, Number(r.cnt)]));
        const labMap = new Map(labAgg.map(r => [r.doctor_code, Number(r.cnt)]));
        const xrayMap = new Map(xrayAgg.map(r => [r.doctor, Number(r.cnt)]));
        const opdRevMap = new Map(opdRevAgg.map(r => [r.doctor, Number(r.total)]));
        const ipdRevMap = new Map(ipdRevAgg.map(r => [r.admdoctor, Number(r.total)]));

        // Join + filter to doctors with activity · compute derived metrics
        // Build full enrichment for ALL doctors in roster (no activity filter)
        const allEnriched = doctorMaster
            .map(d => {
                const code = d.code;
                const opd = opdMap.get(code) || 0;
                const ipd = ipdMap.get(code) || 0;
                const lab = labMap.get(code) || 0;
                const xray = xrayMap.get(code) || 0;
                const opdRev = opdRevMap.get(code) || 0;
                const ipdRev = ipdRevMap.get(code) || 0;
                const totalVisits = opd + ipd;
                const totalRevenue = opdRev + ipdRev;
                const totalOrders = lab + xray;
                const ordersPerVisit = totalVisits > 0 ? Number((totalOrders / totalVisits).toFixed(2)) : 0;
                const revenuePerVisit = totalVisits > 0 ? Math.round(totalRevenue / totalVisits) : 0;
                return {
                    code,
                    name: d.name,
                    position: d.position,
                    opd_visits: opd,
                    ipd_admissions: ipd,
                    lab_orders: lab,
                    xray_orders: xray,
                    total_visits: totalVisits,
                    total_orders: totalOrders,
                    total_revenue: totalRevenue,
                    opd_revenue: opdRev,
                    ipd_revenue: ipdRev,
                    orders_per_visit: ordersPerVisit,
                    revenue_per_visit: revenuePerVisit,
                };
            })
            .sort((a, b) => b.opd_visits - a.opd_visits || b.ipd_admissions - a.ipd_admissions);

        // Enriched = only those with activity in selected period (for table + summary)
        const enriched = allEnriched.filter(d => d.total_visits > 0);

        // Top 50 for display; summary uses full list so totals don't clip
        const topDoctors = enriched.slice(0, 50);
        // All doctors (full roster) — for "แพทย์ทั้งหมด" drill panel
        const allDoctors = allEnriched;

        // ─── Dentists — full roster enrichment ───
        const allEnrichedDentists = dentistMaster
            .map(d => {
                const code = d.code;
                const opd = opdMap.get(code) || 0;
                const lab = labMap.get(code) || 0;
                const xray = xrayMap.get(code) || 0;
                const opdRev = opdRevMap.get(code) || 0;
                return {
                    code,
                    name: d.name,
                    position: d.position,
                    opd_visits: opd,
                    ipd_admissions: 0, // dentists don't admit IPD in community hospital
                    lab_orders: lab,
                    xray_orders: xray,
                    total_visits: opd,
                    total_orders: lab + xray,
                    total_revenue: opdRev,
                    opd_revenue: opdRev,
                    ipd_revenue: 0,
                    orders_per_visit: opd > 0 ? Number(((lab + xray) / opd).toFixed(2)) : 0,
                    revenue_per_visit: opd > 0 ? Math.round(opdRev / opd) : 0,
                };
            })
            .sort((a, b) => b.opd_visits - a.opd_visits);
        // dentists = only those with activity in selected period (for table + KPI summary)
        const enrichedDentists = allEnrichedDentists.filter(d => d.opd_visits > 0);
        // all_dentists = full master roster (incl. 0-activity) — for "ทันตแพทย์ทั้งหมด" drill
        const allDentists = allEnrichedDentists;

        // ─── Daily trend (last 7 days, physicians only) ───
        // Filter to นพ./พญ. only — matches Section 1 KPI cards.
        // INTERVAL 6 DAY → today + 6 prior = 7 days inclusive (NOT 8).
        const trend = await dbQuery(`
            SELECT
                DATE(o.vstdate) AS date,
                COUNT(DISTINCT CASE WHEN d.name LIKE 'นพ.%' OR d.name LIKE 'พญ.%' THEN o.doctor END) AS doctors,
                COUNT(DISTINCT CASE WHEN d.name LIKE 'ทพ.%' OR d.name LIKE 'ทพญ.%' THEN o.doctor END) AS dentists,
                SUM(CASE WHEN d.name LIKE 'นพ.%' OR d.name LIKE 'พญ.%' THEN 1 ELSE 0 END) AS doctor_visits,
                SUM(CASE WHEN d.name LIKE 'ทพ.%' OR d.name LIKE 'ทพญ.%' THEN 1 ELSE 0 END) AS dentist_visits,
                COUNT(*) AS visits
            FROM ovst o
            INNER JOIN doctor d ON d.code = o.doctor
            WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 DAY)
              AND o.vstdate <= CURDATE()
              AND o.doctor IS NOT NULL AND o.doctor <> ''
              AND (d.name LIKE 'นพ.%' OR d.name LIKE 'พญ.%'
                   OR d.name LIKE 'ทพ.%' OR d.name LIKE 'ทพญ.%')
              AND COALESCE(d.active, 'Y') = 'Y'
            GROUP BY DATE(o.vstdate)
            ORDER BY date
        `).catch(() => []);

        // Summary derived from aggregated maps — zero extra DB queries
        const totalOpdDoctors = enriched.filter(d => d.opd_visits > 0).length;
        const totalIpdDoctors = enriched.filter(d => d.ipd_admissions > 0).length;
        const totalOpdVisits = enriched.reduce((sum, d) => sum + d.opd_visits, 0);
        const totalIpdAdmissions = enriched.reduce((sum, d) => sum + d.ipd_admissions, 0);
        const totalLabOrders = enriched.reduce((sum, d) => sum + d.lab_orders, 0);
        const totalXrayOrders = enriched.reduce((sum, d) => sum + d.xray_orders, 0);
        const totalRevenueAll = enriched.reduce((sum, d) => sum + d.total_revenue, 0);
        const avgVisitsPerDoctor = totalOpdDoctors > 0 ? Math.round(totalOpdVisits / totalOpdDoctors) : 0;

        const totalDentistOpdVisits = enrichedDentists.reduce((sum, d) => sum + d.opd_visits, 0);
        const totalDentistRevenue = enrichedDentists.reduce((sum, d) => sum + d.total_revenue, 0);

        res.json({
            data_source: `HOSxP XE · ovst + ipt + lab_head + xray_head + vn_stat + an_stat`,
            period: start && end ? { start, end } : { days },
            as_of: new Date().toISOString(),
            summary: {
                total_doctors: doctorMaster.length,
                total_dentists: dentistMaster.length,
                opd_doctors: totalOpdDoctors,
                ipd_doctors: totalIpdDoctors,
                opd_visits: totalOpdVisits,
                ipd_admissions: totalIpdAdmissions,
                lab_orders: totalLabOrders,
                xray_orders: totalXrayOrders,
                avg_visits_per_doctor: avgVisitsPerDoctor,
                total_revenue: totalRevenueAll,
                dental_doctors: enrichedDentists.length,
                dental_visits: totalDentistOpdVisits,
                dental_revenue: totalDentistRevenue,
            },
            doctors: topDoctors,
            all_doctors: allDoctors,
            dentists: enrichedDentists,
            all_dentists: allDentists,
            trend_7d: trend,
        });
    } catch (err) {
        logger.error('Doctor activity error', { error: err.message });
        safeError(res, err, 'Doctor Activity');
    }
});

export default router;
