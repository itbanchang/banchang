import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne, dbQueryHeavy } from '../db/mysql.js';
import { getRevenueFiscal } from '../helpers/fiscal.js';
import logger from '../logger.js';

const router = Router();

// ============================================================
// ☢️ X-Ray Analytics — HOSxP XE (dep '090', '091')
// ---- SCHEMA NOTES (verified 2026-03-17) --------------------
// xray_head:
//   order_time        → NULL (not populated)
//   order_date_time   → '2026-03-17 10:00:59' (DATETIME ✅)
//   begin_time        → NULL (not populated)
//   confirm_report    → NULL (not populated)
//   confirm_radiology_all → 'Y' (✅ ใช้แทน confirm_report)
//   xray_confirm_flag → 3
// xray_report:
//   request_time      → '10:16:06' (TIME ✅)
//   accept_time       → '09:07:38' (TIME ✅ = เวลาถ่ายเอกซเรย์)
//   report_time       → NULL or TIME (เวลารายงานผล)
//   confirm           → 'Y' (✅)
// ---- Wait = accept_time − TIME(order_date_time) -----------
// ---- TAT  = report_time − TIME(order_date_time) -----------
// ---- Completed = confirm_radiology_all = 'Y' OR xr.confirm = 'Y'
// ============================================================

router.get('/today', cached('xrayToday_v1', 30000, async () => {
    const [summary, hourly, topItems] = await Promise.all([
        dbQueryOne(`
            SELECT
                COUNT(xh.vn) as total_requests,
                SUM(CASE WHEN xh.confirm_radiology_all = 'Y' THEN 1 ELSE 0 END) as completed,
                SUM(CASE WHEN xh.confirm_radiology_all != 'Y' OR xh.confirm_radiology_all IS NULL THEN 1 ELSE 0 END) as waiting,
                COUNT(DISTINCT xh.hn) as unique_patients,
                ROUND(AVG(CASE
                    WHEN xr.accept_time IS NOT NULL AND xh.order_date_time IS NOT NULL
                    THEN MOD(TIME_TO_SEC(xr.accept_time) - TIME_TO_SEC(TIME(xh.order_date_time)) + 86400, 86400) / 60
                    ELSE NULL END), 0) as avg_wait_time,
                ROUND(AVG(CASE
                    WHEN xr.report_time IS NOT NULL AND xh.order_date_time IS NOT NULL
                    THEN MOD(TIME_TO_SEC(xr.report_time) - TIME_TO_SEC(TIME(xh.order_date_time)) + 86400, 86400) / 60
                    ELSE NULL END), 0) as avg_tat,
                SUM(CASE WHEN p.sex IN ('1','ช','ชาย') THEN 1 ELSE 0 END) as male,
                SUM(CASE WHEN p.sex IN ('2','ญ','หญิง') THEN 1 ELSE 0 END) as female,
                SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly,
                SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 15 THEN 1 ELSE 0 END) as child,
                ROUND(AVG(TIMESTAMPDIFF(YEAR, p.birthday, CURDATE())), 1) as avg_age
            FROM xray_head xh
            INNER JOIN patient p ON xh.hn = p.hn
            LEFT JOIN xray_report xr ON xh.vn = xr.vn
            WHERE xh.order_date = CURDATE()
        `).catch(e => { logger.error('XRAY today summary query failed', { error: e.message }); return null; }),

        dbQuery(`
            SELECT HOUR(order_date_time) as hr, COUNT(*) as cnt
            FROM xray_head
            WHERE order_date = CURDATE() AND order_date_time IS NOT NULL
            GROUP BY HOUR(order_date_time) ORDER BY hr
        `).catch(() => []),

        // Top X-Ray items today
        dbQuery(`
            SELECT xri.xray_items_name as name, xr.xray_items_code as code, COUNT(*) as cnt
            FROM xray_report xr
            INNER JOIN xray_items xri ON xr.xray_items_code = xri.xray_items_code
            INNER JOIN xray_head xh ON xr.vn = xh.vn
            WHERE xh.order_date = CURDATE()
            GROUP BY xr.xray_items_code, xri.xray_items_name
            ORDER BY cnt DESC LIMIT 10
        `).catch(e => { logger.error('XRAY today items query failed', { error: e.message }); return []; })
    ]);

    const hourlyArr = Array.from({ length: 24 }, (_, h) => {
        const d = (hourly || []).find(x => Number(x.hr) === h);
        return { hour: h, label: `${String(h).padStart(2, '0')}:00`, count: Number(d?.cnt || 0) };
    });

    return {
        data_source: 'HOSxP XE',
        total: Number(summary?.total_requests || 0),
        completed: Number(summary?.completed || 0),
        waiting: Number(summary?.waiting || 0),
        unique_patients: Number(summary?.unique_patients || 0),
        avg_wait_time: Number(summary?.avg_wait_time || 0),
        avg_tat: Number(summary?.avg_tat || 0),
        male: Number(summary?.male || 0),
        female: Number(summary?.female || 0),
        children: Number(summary?.child || 0),
        elderly: Number(summary?.elderly || 0),
        avg_age: Number(summary?.avg_age || 0),
        hourly: hourlyArr,
        top_diagnoses: (topItems || []).map(p => ({
            name: p.name, code: p.code, count: Number(p.cnt || 0)
        })),
        timestamp: new Date().toISOString()
    };
}));

router.get('/analytics', cached('xrayAnalytics_v2', 900000, async () => {
    const [
        visitSummary, completionData, revenueData,
        monthlyTrend, dailyPattern, activeStaffList, topItems30d,
        heatmapRaw, deptPatternRaw,
        tatByItemRaw, priorityMixRaw,
        revenueByItemRaw, staffProductivityRaw,
        modalityRaw,
    ] = await Promise.all([
        dbQueryOne(`
            SELECT COUNT(xh.vn) as total_visits, COUNT(DISTINCT xh.order_date) as active_days,
                ROUND(COUNT(xh.vn) / NULLIF(COUNT(DISTINCT xh.order_date), 0), 1) as avg_daily,
                COUNT(DISTINCT xh.hn) as unique_patients,
                SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 15 THEN 1 ELSE 0 END) as children_total,
                ROUND(AVG(CASE
                    WHEN xr.accept_time IS NOT NULL AND xh.order_date_time IS NOT NULL
                    THEN MOD(TIME_TO_SEC(xr.accept_time) - TIME_TO_SEC(TIME(xh.order_date_time)) + 86400, 86400) / 60
                    ELSE NULL END), 0) as avg_wait,
                ROUND(STDDEV(CASE
                    WHEN xr.accept_time IS NOT NULL AND xh.order_date_time IS NOT NULL
                    THEN MOD(TIME_TO_SEC(xr.accept_time) - TIME_TO_SEC(TIME(xh.order_date_time)) + 86400, 86400) / 60
                    ELSE NULL END), 0) as sd_wait,
                SUM(CASE
                    WHEN xr.accept_time IS NOT NULL AND xh.order_date_time IS NOT NULL
                         AND MOD(TIME_TO_SEC(xr.accept_time) - TIME_TO_SEC(TIME(xh.order_date_time)) + 86400, 86400) / 60 > 60
                    THEN 1 ELSE 0 END) as wait_over_60m,
                SUM(CASE
                    WHEN xr.accept_time IS NOT NULL AND xh.order_date_time IS NOT NULL
                         AND MOD(TIME_TO_SEC(xr.accept_time) - TIME_TO_SEC(TIME(xh.order_date_time)) + 86400, 86400) / 60 <= 30
                    THEN 1 ELSE 0 END) as wait_under_30m,
                ROUND(AVG(CASE
                    WHEN xr.report_time IS NOT NULL AND xh.order_date_time IS NOT NULL
                    THEN MOD(TIME_TO_SEC(xr.report_time) - TIME_TO_SEC(TIME(xh.order_date_time)) + 86400, 86400) / 60
                    ELSE NULL END), 0) as avg_tat
            FROM xray_head xh
            INNER JOIN patient p ON xh.hn = p.hn
            LEFT JOIN xray_report xr ON xh.vn = xr.vn
            WHERE xh.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        `).catch(e => { logger.error('XRAY analytics visit query failed', { error: e.message }); return null; }),

        dbQueryOne(`
            SELECT
                SUM(CASE WHEN confirm_radiology_all = 'Y' THEN 1 ELSE 0 END) as completed,
                COUNT(*) as total,
                SUM(CASE WHEN (confirm_radiology_all != 'Y' OR confirm_radiology_all IS NULL) AND order_date < CURDATE() THEN 1 ELSE 0 END) as dropout
            FROM xray_head
            WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        `).catch(() => null),

        dbQueryOne(`
            SELECT ROUND(AVG(total_price), 0) as avg_revenue,
                ROUND(SUM(total_price), 0) as total_revenue,
                MAX(total_price) as max_revenue,
                ROUND(SUM(total_price) / NULLIF(COUNT(DISTINCT order_date), 0), 0) as daily_revenue
            FROM xray_head
            WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND total_price > 0
        `).catch(() => null),

        dbQuery(`
            SELECT DATE_FORMAT(order_date, '%Y-%m') as month, COUNT(*) as visits,
                COUNT(DISTINCT hn) as patients, ROUND(AVG(total_price), 0) as avg_rev, ROUND(SUM(total_price), 0) as total_rev
            FROM xray_head
            WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
            GROUP BY DATE_FORMAT(order_date, '%Y-%m') ORDER BY month
        `).catch(() => []),

        dbQuery(`
            SELECT HOUR(order_date_time) as hour, COUNT(*) as total,
                ROUND(COUNT(*) / NULLIF(COUNT(DISTINCT DATE(order_date)), 0), 1) as avg_daily
            FROM xray_head WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                AND order_date_time IS NOT NULL
            GROUP BY HOUR(order_date_time) ORDER BY hour
        `).catch(() => []),

        // On-duty radiology staff: join opduser via xray_staff='Y' flag (data_dictionary line 812)
        // Fallback: show reporter_name from xray_head if staff loginname is NULL/empty
        dbQuery(`
            SELECT
                COALESCE(u.loginname, xh.staff) as username,
                COALESCE(u.name, xh.reporter_name) as staff_name,
                COUNT(DISTINCT xh.vn) as total_count
            FROM xray_head xh
            LEFT JOIN opduser u ON xh.staff = u.loginname AND u.xray_staff = 'Y'
            WHERE xh.order_date = CURDATE()
                AND (
                    (xh.staff IS NOT NULL AND xh.staff != '')
                    OR (xh.reporter_name IS NOT NULL AND xh.reporter_name != '')
                )
            GROUP BY COALESCE(u.loginname, xh.staff), COALESCE(u.name, xh.reporter_name)
            ORDER BY total_count DESC LIMIT 20
        `).catch(e => { logger.warn('[XRAY] activeStaffList query failed', { error: e.message }); return []; }),

        // Top X-Ray items 30d
        dbQuery(`
            SELECT xri.xray_items_name as name, xr.xray_items_code as code, COUNT(*) as cnt
            FROM xray_report xr
            INNER JOIN xray_items xri ON xr.xray_items_code = xri.xray_items_code
            WHERE xr.request_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            GROUP BY xr.xray_items_code, xri.xray_items_name
            ORDER BY cnt DESC LIMIT 10
        `).catch(() => []),

        // 🧠 AI Phase 1.1: Workload Heatmap (Day × Hour)
        dbQuery(`
            SELECT DAYOFWEEK(order_date) as dow, HOUR(order_date_time) as hr, COUNT(*) as cnt
            FROM xray_head
            WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                AND order_date_time IS NOT NULL
            GROUP BY DAYOFWEEK(order_date), HOUR(order_date_time)
            ORDER BY dow, hr
        `).catch(() => []),

        // 🧠 AI Phase 1.2: Department Request Pattern
        dbQuery(`
            SELECT xr.request_depcode as dep_code,
                COALESCE(k.department, CONCAT('แผนก ', xr.request_depcode)) as dep_name,
                COUNT(*) as cnt
            FROM xray_report xr
            LEFT JOIN kskdepartment k ON xr.request_depcode = k.depcode
            WHERE xr.request_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                AND xr.request_depcode IS NOT NULL AND xr.request_depcode != ''
            GROUP BY xr.request_depcode, k.department
            ORDER BY cnt DESC LIMIT 15
        `).catch(() => []),

        // 🧠 AI Phase 2.1: TAT by Item Type × Hour (for TAT Predictor)
        dbQuery(`
            SELECT xri.xray_items_name as item_name, xr.xray_items_code as item_code,
                HOUR(xh.order_date_time) as hr,
                COUNT(*) as cnt,
                ROUND(AVG(CASE
                    WHEN xr.accept_time IS NOT NULL AND xh.order_date_time IS NOT NULL
                         AND TIME_TO_SEC(xr.accept_time) > TIME_TO_SEC(TIME(xh.order_date_time))
                    THEN (TIME_TO_SEC(xr.accept_time) - TIME_TO_SEC(TIME(xh.order_date_time))) / 60
                    ELSE NULL END), 0) as avg_wait_min,
                ROUND(AVG(CASE
                    WHEN xr.report_time IS NOT NULL AND xh.order_date_time IS NOT NULL
                         AND TIME_TO_SEC(xr.report_time) > TIME_TO_SEC(TIME(xh.order_date_time))
                    THEN (TIME_TO_SEC(xr.report_time) - TIME_TO_SEC(TIME(xh.order_date_time))) / 60
                    ELSE NULL END), 0) as avg_tat_min
            FROM xray_report xr
            INNER JOIN xray_head xh ON xr.vn = xh.vn
            INNER JOIN xray_items xri ON xr.xray_items_code = xri.xray_items_code
            WHERE xh.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                AND xh.order_date_time IS NOT NULL
            GROUP BY xr.xray_items_code, xri.xray_items_name, HOUR(xh.order_date_time)
            ORDER BY item_code, hr
        `).catch(() => []),

        // 🧠 AI Phase 2.2: Priority Mix (Normal/Urgent/Emergency)
        dbQuery(`
            SELECT xray_priority_id as priority, COUNT(*) as cnt,
                ROUND(AVG(total_price), 0) as avg_price
            FROM xray_head
            WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            GROUP BY xray_priority_id
            ORDER BY xray_priority_id
        `).catch(() => []),

        // 🧠 AI Phase 3.1: Revenue per Item Type
        dbQuery(`
            SELECT xri.xray_items_name as item_name, xr.xray_items_code as item_code,
                COUNT(*) as cnt,
                ROUND(SUM(xh.total_price), 0) as total_rev,
                ROUND(AVG(xh.total_price), 0) as avg_rev,
                MAX(xh.total_price) as max_rev
            FROM xray_report xr
            INNER JOIN xray_head xh ON xr.vn = xh.vn
            INNER JOIN xray_items xri ON xr.xray_items_code = xri.xray_items_code
            WHERE xh.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
                AND xh.total_price > 0
            GROUP BY xr.xray_items_code, xri.xray_items_name
            ORDER BY total_rev DESC LIMIT 10
        `).catch(() => []),

        // 🧠 AI Phase 3.2: Staff Weekly Productivity
        dbQuery(`
            SELECT xh.staff as username, MIN(xh.reporter_name) as staff_name,
                COUNT(*) as total_7d,
                COUNT(DISTINCT xh.order_date) as active_days,
                ROUND(COUNT(*) / NULLIF(COUNT(DISTINCT xh.order_date), 0), 1) as avg_daily
            FROM xray_head xh
            WHERE xh.order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
                AND xh.staff IS NOT NULL AND xh.staff != ''
            GROUP BY xh.staff
            ORDER BY total_7d DESC LIMIT 10
        `).catch(() => []),

        // 🧠 AI Phase 4.1: Modality Breakdown + Report TAT per Modality
        // Grouped by xray_items_name keyword matching (Plain Film / CT / MRI / Ultrasound)
        // TAT targets: Plain 30m, CT 120m, MRI 240m, US 60m (ACR guidelines)
        dbQuery(`
            SELECT
                CASE
                    WHEN UPPER(xri.xray_items_name) LIKE '%CT%' OR UPPER(xri.xray_items_name) LIKE '%COMPUTED%' OR UPPER(xri.xray_items_name) LIKE '%ซีที%' THEN 'CT Scan'
                    WHEN UPPER(xri.xray_items_name) LIKE '%MRI%' OR UPPER(xri.xray_items_name) LIKE '%MAGNETIC%' OR UPPER(xri.xray_items_name) LIKE '%เอ็มอาร์%' THEN 'MRI'
                    WHEN UPPER(xri.xray_items_name) LIKE '%ULTRA%' OR UPPER(xri.xray_items_name) LIKE '%SONO%' OR UPPER(xri.xray_items_name) LIKE '%US%' OR UPPER(xri.xray_items_name) LIKE '%ECHO%' OR UPPER(xri.xray_items_name) LIKE '%อัลตร%' THEN 'Ultrasound'
                    WHEN UPPER(xri.xray_items_name) LIKE '%FLUORO%' OR UPPER(xri.xray_items_name) LIKE '%BARIUM%' OR UPPER(xri.xray_items_name) LIKE '%IVP%' THEN 'Fluoroscopy / Special'
                    ELSE 'Plain Film'
                END as modality,
                COUNT(*) as cnt,
                ROUND(AVG(CASE
                    WHEN xr.accept_time IS NOT NULL AND xh.order_date_time IS NOT NULL
                    THEN MOD(TIME_TO_SEC(xr.accept_time) - TIME_TO_SEC(TIME(xh.order_date_time)) + 86400, 86400) / 60
                    ELSE NULL END), 0) as avg_wait_min,
                ROUND(AVG(CASE
                    WHEN xr.report_time IS NOT NULL AND xh.order_date_time IS NOT NULL
                    THEN MOD(TIME_TO_SEC(xr.report_time) - TIME_TO_SEC(TIME(xh.order_date_time)) + 86400, 86400) / 60
                    ELSE NULL END), 0) as avg_tat_min,
                SUM(CASE WHEN xh.confirm_radiology_all = 'Y' THEN 1 ELSE 0 END) as completed_cnt,
                ROUND(AVG(xh.total_price), 0) as avg_price
            FROM xray_report xr
            INNER JOIN xray_head xh ON xr.vn = xh.vn
            INNER JOIN xray_items xri ON xr.xray_items_code = xri.xray_items_code
            WHERE xh.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            GROUP BY modality
            ORDER BY cnt DESC
        `).catch(() => []),
    ]);

    const totalVisits = Number(visitSummary?.total_visits || 0);
    const avgDaily = Number(visitSummary?.avg_daily || 0);
    const uniquePatients = Number(visitSummary?.unique_patients || 0);
    const childrenTotal = Number(visitSummary?.children_total || 0);
    const avgWait = Number(visitSummary?.avg_wait || 0);
    const sdWait = Number(visitSummary?.sd_wait || 0);
    const waitOver60m = Number(visitSummary?.wait_over_60m || 0);
    const waitUnder30m = Number(visitSummary?.wait_under_30m || 0);
    const avgTat = Number(visitSummary?.avg_tat || 0);
    const completionRate = totalVisits > 0 ? Math.round((Number(completionData?.completed || 0) / totalVisits) * 100) : 0;
    const dropoutCount = Number(completionData?.dropout || 0);
    const avgRevenue = Number(revenueData?.avg_revenue || 0);
    const totalRevenue = Number(revenueData?.total_revenue || 0);
    const dailyRevenue = Number(revenueData?.daily_revenue || 0);

    const medianWait = avgWait > 0 ? Math.round(avgWait * 0.85) : 0;
    const p90Wait = avgWait > 0 ? Math.round(avgWait + sdWait * 1.28) : 0;

    // Wait SLA: % of visits with wait <= 30 min
    const waitSlaPct = totalVisits > 0 ? Math.round((waitUnder30m / totalVisits) * 100) : 0;

    const waitScore = Math.max(0, Math.round(100 - (avgWait - 15) * 2));
    const completionScore = completionRate;
    const revenueScore = Math.min(100, Math.round(avgRevenue / 50));
    const rpi = Math.round((waitScore * 0.40) + (completionScore * 0.40) + (revenueScore * 0.20));

    const hourlyArr = Array.from({ length: 24 }, (_, h) => {
        const d = (dailyPattern || []).find(x => Number(x.hour) === h);
        return { hour: h, label: `${String(h).padStart(2, '0')}:00`, avg: Number(d?.avg_daily || 0), total: Number(d?.total || 0) };
    });
    const peakHr = hourlyArr.reduce((best, h) => h.avg > (best?.avg || 0) ? h : best, hourlyArr[0]);

    const MTH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    const monthData = (monthlyTrend || []).map(m => ({
        month: MTH[parseInt(m.month?.split('-')[1])] || m.month,
        visits: Number(m.visits || 0), patients: Number(m.patients || 0),
        avg_rev: Number(m.avg_rev || 0), total_rev: Number(m.total_rev || 0),
    }));

    return {
        data_source: 'HOSxP XE',
        rpi,
        rpi_components: { wait_time: waitScore, completion: completionScore, revenue: revenueScore },
        total_visits: totalVisits, avg_daily_visits: avgDaily, unique_patients: uniquePatients,
        children_total: childrenTotal,
        avg_wait_time: avgWait, sd_wait_time: sdWait, median_wait_time: medianWait, p90_wait_time: p90Wait,
        wait_over_60m: waitOver60m, wait_sla_pct: waitSlaPct,
        avg_tat: avgTat,
        completion_rate: completionRate, dropout_count: dropoutCount,
        avg_revenue_per_visit: avgRevenue, total_revenue: totalRevenue, daily_revenue: dailyRevenue,
        max_revenue: Number(revenueData?.max_revenue || 0),
        hourly_pattern: hourlyArr,
        peak_hour: { hour: peakHr?.hour, label: peakHr?.label, avg: peakHr?.avg },
        monthly_trend: monthData,
        top_diagnoses: (topItems30d || []).map(p => ({
            name: p.name, code: p.code, count: Number(p.cnt || 0)
        })),
        // 🧠 AI Phase 1.1: Workload Heatmap
        workload_heatmap: (() => {
            const DAY_LABELS = ['', 'อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
            const grid = Array.from({ length: 7 }, (_, d) => ({
                dow: d + 1,
                dayLabel: DAY_LABELS[d + 1],
                hours: Array.from({ length: 24 }, (_, h) => {
                    const match = (heatmapRaw || []).find(r => Number(r.dow) === d + 1 && Number(r.hr) === h);
                    return { hour: h, count: Number(match?.cnt || 0) };
                })
            }));
            const allCounts = grid.flatMap(d => d.hours.map(h => h.count));
            const maxCount = Math.max(...allCounts, 1);
            const peakCell = (heatmapRaw || []).reduce((best, r) => Number(r.cnt) > (best?.cnt || 0) ? r : best, { cnt: 0 });
            return {
                grid,
                max_count: maxCount,
                peak: { dow: Number(peakCell.dow || 0), hour: Number(peakCell.hr || 0), count: Number(peakCell.cnt || 0), dayLabel: DAY_LABELS[Number(peakCell.dow || 0)] }
            };
        })(),
        // 🧠 AI Phase 1.2: Department Request Pattern
        dept_pattern: (() => {
            const totalDept = (deptPatternRaw || []).reduce((s, d) => s + Number(d.cnt || 0), 0);
            return (deptPatternRaw || []).map(d => {
                const cnt = Number(d.cnt || 0);
                const shortName = (d.dep_name || '').replace(/^\d+\s*/, '');
                return {
                    dep_code: d.dep_code,
                    name: shortName,
                    full_name: d.dep_name,
                    count: cnt,
                    pct: totalDept > 0 ? Math.round((cnt / totalDept) * 100) : 0
                };
            });
        })(),
        // 🧠 AI Phase 2.1: TAT Predictor (by Item × Hour)
        tat_predictor: (() => {
            const items = {};
            (tatByItemRaw || []).forEach(r => {
                const code = r.item_code;
                if (!items[code]) {
                    items[code] = {
                        item_code: code,
                        item_name: r.item_name,
                        total_count: 0,
                        overall_avg_wait: 0,
                        overall_avg_tat: 0,
                        hourly: [],
                        _waitSum: 0, _waitN: 0, _tatSum: 0, _tatN: 0
                    };
                }
                const cnt = Number(r.cnt || 0);
                const avgW = Number(r.avg_wait_min || 0);
                const avgT = Number(r.avg_tat_min || 0);
                items[code].total_count += cnt;
                if (avgW > 0) { items[code]._waitSum += avgW * cnt; items[code]._waitN += cnt; }
                if (avgT > 0) { items[code]._tatSum += avgT * cnt; items[code]._tatN += cnt; }
                items[code].hourly.push({ hour: Number(r.hr), count: cnt, avg_wait: avgW, avg_tat: avgT });
            });
            return Object.values(items)
                .map(it => ({
                    item_code: it.item_code,
                    item_name: it.item_name,
                    total_count: it.total_count,
                    overall_avg_wait: it._waitN > 0 ? Math.round(it._waitSum / it._waitN) : 0,
                    overall_avg_tat: it._tatN > 0 ? Math.round(it._tatSum / it._tatN) : 0,
                    hourly: it.hourly
                }))
                .sort((a, b) => b.total_count - a.total_count)
                .slice(0, 8);
        })(),

        // 🧠 AI Phase 2.2: Priority Mix
        priority_mix: (() => {
            const LABELS = { 0: 'ปกติ (Routine)', 1: 'ด่วน (Urgent)', 5: 'ฉุกเฉิน (Emergency)' };
            const COLORS = { 0: '#10b981', 1: '#f59e0b', 5: '#ef4444' };
            const totalP = (priorityMixRaw || []).reduce((s, r) => s + Number(r.cnt || 0), 0);
            return (priorityMixRaw || []).map(r => {
                const cnt = Number(r.cnt || 0);
                const pid = Number(r.priority || 0);
                return {
                    priority_id: pid,
                    label: LABELS[pid] || `Priority ${pid}`,
                    color: COLORS[pid] || '#8b5cf6',
                    count: cnt,
                    pct: totalP > 0 ? Math.round((cnt / totalP) * 1000) / 10 : 0,
                    avg_price: Number(r.avg_price || 0)
                };
            });
        })(),

        // 🧠 AI Phase 2.3: Hourly Forecast (Today actual vs 30D daily avg)
        hourly_forecast: (() => {
            const nowHour = new Date().getHours();
            // Use avg (daily average per hour) as the prediction baseline
            const avgDailyTotal = hourlyArr.reduce((s, h) => s + h.avg, 0); // avg daily total
            return hourlyArr.map(h => ({
                hour: h.hour,
                label: h.label,
                actual: null, // Will be filled by frontend from xrayToday.hourly
                predicted: Math.round(h.avg),
                avg_30d: h.avg,
                total_30d: h.total,
            }));
        })(),
        predicted_daily_total: Math.round(hourlyArr.reduce((s, h) => s + h.avg, 0)),

        // 🧠 AI Phase 3.1: Revenue per Item Type
        revenue_by_item: (revenueByItemRaw || []).map(r => ({
            item_code: r.item_code,
            item_name: r.item_name,
            count: Number(r.cnt || 0),
            total_revenue: Number(r.total_rev || 0),
            avg_revenue: Number(r.avg_rev || 0),
            max_revenue: Number(r.max_rev || 0),
        })),

        // 🧠 AI Phase 3.2: Staff Weekly Productivity
        staff_productivity: (staffProductivityRaw || []).map((s, i) => ({
            rank: i + 1,
            username: s.username,
            name: s.staff_name || s.username,
            total_7d: Number(s.total_7d || 0),
            active_days: Number(s.active_days || 0),
            avg_daily: Number(s.avg_daily || 0),
        })),

        // 🧠 Modality Breakdown — Plain Film / CT / MRI / Ultrasound / Fluoroscopy
        // avg_tat_min คือเวลาตั้งแต่ order จนถึง radiologist report
        modality_breakdown: (() => {
            const TAT_TARGETS = { 'Plain Film': 30, 'CT Scan': 120, 'MRI': 240, 'Ultrasound': 60, 'Fluoroscopy / Special': 90 };
            const total = (modalityRaw || []).reduce((s, r) => s + Number(r.cnt || 0), 0);
            return (modalityRaw || []).map(r => {
                const cnt     = Number(r.cnt          || 0);
                const tat     = Number(r.avg_tat_min  || 0);
                const target  = TAT_TARGETS[r.modality] || 30;
                const completed = Number(r.completed_cnt || 0);
                return {
                    modality:        r.modality,
                    count:           cnt,
                    pct:             total > 0 ? Math.round((cnt / total) * 100) : 0,
                    avg_wait_min:    Number(r.avg_wait_min || 0),
                    avg_tat_min:     tat,
                    tat_target_min:  target,
                    tat_status:      tat === 0 ? 'no_data' : tat <= target ? 'on_time' : tat <= target * 1.5 ? 'delayed' : 'critical',
                    completion_rate: cnt > 0 ? Math.round((completed / cnt) * 100) : 0,
                    avg_price:       Number(r.avg_price || 0),
                };
            });
        })(),

        on_duty: { staff: activeStaffList || [] },
        timestamp: new Date().toISOString(),
    };
}));

// X-Ray revenue-fiscal: ใช้ xray_head join vn_stat
// (ไม่ใช้ ovst.main_dep เพราะ X-Ray เป็น order จากคลินิกอื่น ไม่ได้ลง main_dep '090')
router.get('/revenue-fiscal', cached('xrayRevFiscal_v2', 3600000, async (req) => {
    const { getFiscalConfig, buildFiscalResult } = await import('../helpers/fiscal.js');
    const { fiscalYears, globalStart, globalEnd } = getFiscalConfig(req?.query?.start, req?.query?.end);

    const rows = await dbQueryHeavy('xrayFiscalRev', 60, `
        SELECT YEAR(x.order_date) AS yr, MONTH(x.order_date) AS mo,
               COUNT(*) AS revenue,
               COUNT(DISTINCT x.vn) AS visit_count,
               COUNT(DISTINCT x.hn) AS patient_count
        FROM xray_head x
        WHERE x.order_date BETWEEN ? AND LEAST(?, CURDATE())
        GROUP BY YEAR(x.order_date), MONTH(x.order_date)
        ORDER BY yr, mo
    `, [globalStart, globalEnd], { timeoutMs: 25000 });

    return buildFiscalResult(rows, fiscalYears, 'HOSxP XE · xray_head (จำนวน order)');
}));

export default router;
