// ============================================================
// BCH 360° Intelligence V.10 — Materialized Views Manager
// Pre-computed Summary Tables for Heavy KPIs (< 1s Dashboard)
// ============================================================
// Instead of querying millions of opitemrece rows live, we
// pre-compute summary tables on a schedule and serve them
// to the Dashboard API instantly from in-memory cache.
// ============================================================
import { dbQuery, dbQueryOne, dbQueryHeavy } from './mysql.js';

// ── In-Memory Materialized View Store ──
const MV_STORE = {};
const MV_META = {};  // refresh timestamps + status

/**
 * Get a materialized view by name
 * @param {string} viewName
 * @returns {object|null}
 */
export function getMV(viewName) {
    return MV_STORE[viewName] || null;
}

/**
 * Get metadata for all materialized views
 */
export function getMVStatus() {
    return Object.entries(MV_META).map(([name, meta]) => ({
        name,
        last_refresh: meta.last_refresh,
        refresh_duration_ms: meta.duration,
        row_count: meta.row_count,
        status: meta.status,
        error: meta.error || null,
        next_refresh: meta.next_refresh,
    }));
}

// ── View Definitions ──
// Each view has: name, SQL, refreshIntervalMs, category
const VIEW_DEFINITIONS = [
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 1. Daily Revenue Summary (from vn_stat — lightweight)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        name: 'mv_daily_revenue',
        category: 'finance',
        refreshIntervalMs: 5 * 60 * 1000,   // Every 5 minutes
        sql: `
            SELECT 
                vstdate,
                COUNT(DISTINCT vn) as visit_count,
                COUNT(DISTINCT hn) as patient_count,
                COALESCE(SUM(income), 0) as total_revenue
            FROM vn_stat
            WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            GROUP BY vstdate
            ORDER BY vstdate DESC
        `
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 2. Monthly Revenue by Department
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        name: 'mv_monthly_dept_revenue',
        category: 'finance',
        refreshIntervalMs: 15 * 60 * 1000,  // Every 15 minutes
        sql: `
            SELECT 
                DATE_FORMAT(v.vstdate, '%Y-%m') as month,
                YEAR(v.vstdate) as yr,
                MONTH(v.vstdate) as mo,
                k.depcode,
                k.department as dept_name,
                COUNT(DISTINCT v.vn) as visit_count,
                COUNT(DISTINCT v.hn) as patient_count,
                SUM(v.income) as revenue
            FROM vn_stat v FORCE INDEX (idx_vnstat_vstdate_income)
            STRAIGHT_JOIN ovst o ON v.vn = o.vn
            INNER JOIN kskdepartment k ON o.main_dep = k.depcode
            WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
              AND v.income > 0
            GROUP BY month, yr, mo, k.depcode, k.department
            ORDER BY month DESC, revenue DESC
        `
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 3. Revenue by Payer Type Summary
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        name: 'mv_payer_revenue',
        category: 'finance',
        refreshIntervalMs: 15 * 60 * 1000,
        sql: `
            SELECT
                DATE_FORMAT(v.vstdate, '%Y-%m') as month,
                YEAR(v.vstdate) as yr,
                MONTH(v.vstdate) as mo,
                pt.pttype,
                pt.name as payer_name,
                COUNT(DISTINCT v.vn) as visit_count,
                SUM(v.income) as revenue
            FROM vn_stat v
            INNER JOIN patient p ON v.hn = p.hn
            LEFT JOIN pttype pt ON p.pttype = pt.pttype
            WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
              AND v.income > 0
            GROUP BY month, yr, mo, pt.pttype, pt.name
            ORDER BY month DESC, revenue DESC
        `
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 4. OPD Wait Time Summary (per hour, for trend)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        name: 'mv_opd_wait_time',
        category: 'opd',
        refreshIntervalMs: 3 * 60 * 1000,   // Every 3 minutes (near real-time)
        sql: `
            SELECT
                o.vstdate,
                HOUR(o.vsttime) as hour,
                COUNT(*) as visit_count,
                ROUND(AVG(CASE 
                    WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
                    THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60
                    WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
                    THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
                    ELSE NULL END), 1) as avg_wait_min,
                SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as completed,
                SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL THEN 1 ELSE 0 END) as waiting
            FROM ovst o FORCE INDEX (ix_vstdate)
            LEFT JOIN service_time st ON o.vn = st.vn
            LEFT JOIN rcpt_print r ON o.vn = r.vn
            WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
              AND o.vsttime IS NOT NULL
            GROUP BY o.vstdate, HOUR(o.vsttime)
            ORDER BY o.vstdate DESC, hour DESC
        `
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 5. IPD Summary — Bed Occupancy & ALOS Trends
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        name: 'mv_ipd_summary',
        category: 'ipd',
        refreshIntervalMs: 10 * 60 * 1000,  // Every 10 minutes
        sql: `
            SELECT
                DATE_FORMAT(i.dchdate, '%Y-%m') as month,
                w.ward,
                w.name as ward_name,
                COUNT(*) as discharge_count,
                ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 1) as avg_los,
                ROUND(AVG(a.rw), 3) as avg_rw,
                ROUND(SUM(a.rw), 2) as total_rw,
                SUM(a.income) as total_revenue,
                SUM(CASE WHEN i.dchtype IN ('8','9') THEN 1 ELSE 0 END) as mortality_count,
                ROUND(AVG(a.income), 0) as avg_income
            FROM ipt i
            INNER JOIN an_stat a ON i.an = a.an
            LEFT JOIN ward w ON i.ward = w.ward
            WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH)
              AND i.dchdate IS NOT NULL
            GROUP BY month, w.ward, w.name
            ORDER BY month DESC
        `
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 6. OPD Revenue Per Visit (from vn_stat — avoids opitemrece)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        name: 'mv_opd_revenue_per_visit',
        category: 'finance',
        refreshIntervalMs: 10 * 60 * 1000,
        sql: `
            SELECT 
                vstdate,
                COUNT(DISTINCT vn) as visit_count,
                ROUND(SUM(income), 0) as total_charge,
                ROUND(AVG(income), 0) as avg_revenue_per_visit
            FROM vn_stat
            WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
              AND income > 0
            GROUP BY vstdate
            ORDER BY vstdate DESC
        `
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 7. Coding Audit Summary (MedRec KPI)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        name: 'mv_coding_audit',
        category: 'medrec',
        refreshIntervalMs: 5 * 60 * 1000,
        sql: `
            SELECT 
                o.vstdate,
                COUNT(o.vn) as total_visits,
                COUNT(DISTINCT d.vn) as coded_visits
            FROM ovst o
            LEFT JOIN ovstdiag d ON o.vn = d.vn
            WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
            GROUP BY o.vstdate
            ORDER BY o.vstdate DESC
        `
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 8. ER Flow Metrics (Daily Summary)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        name: 'mv_er_daily',
        category: 'er',
        refreshIntervalMs: 3 * 60 * 1000,
        sql: `
            SELECT
                e.vstdate,
                COUNT(*) as total_patients,
                SUM(CASE WHEN e.er_emergency_type = '1' THEN 1 ELSE 0 END) as triage_1,
                SUM(CASE WHEN e.er_emergency_type = '2' THEN 1 ELSE 0 END) as triage_2,
                SUM(CASE WHEN e.er_emergency_type = '3' THEN 1 ELSE 0 END) as triage_3,
                SUM(CASE WHEN e.er_emergency_type = '4' THEN 1 ELSE 0 END) as triage_4,
                SUM(CASE WHEN e.er_emergency_type = '5' THEN 1 ELSE 0 END) as triage_5,
                ROUND(AVG(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, COALESCE(e.finish_time, NOW())))), 0) as avg_stay_minutes,
                SUM(CASE WHEN e.er_dch_type = '1' THEN 1 ELSE 0 END) as admit_count
            FROM er_regist e
            WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            GROUP BY e.vstdate
            ORDER BY e.vstdate DESC
        `
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 9. Fiscal Year Revenue (Pre-computed for 3 FY)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        name: 'mv_fiscal_revenue',
        category: 'finance',
        refreshIntervalMs: 15 * 60 * 1000,
        sql: `
            SELECT 
                YEAR(vstdate) AS yr,
                MONTH(vstdate) AS mo,
                SUM(income) AS revenue,
                COUNT(DISTINCT vn) AS visit_count,
                COUNT(DISTINCT hn) AS patient_count
            FROM vn_stat 
            WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
              AND income > 0
            GROUP BY YEAR(vstdate), MONTH(vstdate) 
            ORDER BY yr, mo
        `
    },

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    // 10. Top Disease Summary (ICD-10 frequency)
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    {
        name: 'mv_top_diseases',
        category: 'clinical',
        refreshIntervalMs: 30 * 60 * 1000,  // Every 30 minutes
        sql: `
            SELECT 
                d.icd10 as code,
                MAX(icd.tname) as name,
                COUNT(*) as cases,
                COUNT(DISTINCT d.vn) as visits,
                MONTH(d.vstdate) as mo,
                YEAR(d.vstdate) as yr
            FROM ovstdiag d
            LEFT JOIN icd101 icd ON d.icd10 = icd.code
            WHERE d.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
            GROUP BY d.icd10, MONTH(d.vstdate), YEAR(d.vstdate)
            ORDER BY cases DESC
            LIMIT 200
        `
    },
];

// ── Refresh a single materialized view ──
async function refreshView(viewDef) {
    const startTime = Date.now();
    MV_META[viewDef.name] = {
        ...MV_META[viewDef.name],
        status: 'refreshing',
    };

    try {
        // MV refreshes are background tasks → use 25s timeout instead of default 10s
        const rows = await dbQuery(viewDef.sql, [], { timeoutMs: 25000 });
        MV_STORE[viewDef.name] = rows;

        const duration = Date.now() - startTime;
        MV_META[viewDef.name] = {
            last_refresh: new Date().toISOString(),
            duration,
            row_count: rows?.length || 0,
            status: 'ready',
            category: viewDef.category,
            next_refresh: new Date(Date.now() + viewDef.refreshIntervalMs).toISOString(),
        };

        process.stdout.write(`📊 [MV] ${viewDef.name}: ${rows?.length || 0} rows (${duration}ms) `);
    } catch (err) {
        const duration = Date.now() - startTime;
        MV_META[viewDef.name] = {
            ...MV_META[viewDef.name],
            status: 'error',
            error: err.message,
            duration,
            last_refresh: MV_META[viewDef.name]?.last_refresh || null,
        };
        console.error(`\n❌ [MV] ${viewDef.name} refresh failed (${duration}ms): ${err.message}`);
    }
}

// ── Initialize All Views — staggered to avoid DB stampede ──
const timers = [];

export async function initMaterializedViews() {
    console.log(`\n🏗️  Initializing ${VIEW_DEFINITIONS.length} Materialized Views...`);
    const t0 = Date.now();

    // Phase 1: Sequential initial load (staggered by 200ms to avoid DB stampede)
    for (let i = 0; i < VIEW_DEFINITIONS.length; i++) {
        const vd = VIEW_DEFINITIONS[i];
        try {
            await refreshView(vd);
        } catch (e) {
            console.error(`  ⚠️ ${vd.name}: skipped (${e.message})`);
        }
        // Small delay between initial loads
        if (i < VIEW_DEFINITIONS.length - 1) {
            await new Promise(r => setTimeout(r, 200));
        }
    }

    console.log(`\n✅ Materialized Views initialized in ${Date.now() - t0}ms`);

    // Phase 2: Set up periodic refresh with jitter
    for (const vd of VIEW_DEFINITIONS) {
        // Add random jitter (up to +50%) to spread refreshes and prevent thundering herd
        const jitter = vd.refreshIntervalMs + (Math.random() * vd.refreshIntervalMs * 0.5);
        const timer = setInterval(() => refreshView(vd), jitter);
        timers.push(timer);
    }

    return getMVStatus();
}

// ── Force Refresh a specific view (admin API) ──
export async function forceRefreshView(viewName) {
    const vd = VIEW_DEFINITIONS.find(v => v.name === viewName);
    if (!vd) throw new Error(`View "${viewName}" not found`);
    await refreshView(vd);
    return MV_META[viewName];
}

// ── Force Refresh all views ──
export async function forceRefreshAll() {
    for (const vd of VIEW_DEFINITIONS) {
        await refreshView(vd);
    }
    return getMVStatus();
}

// ── Query helpers for pre-computed data ──

/**
 * Get today's revenue from materialized view
 */
export function getTodayRevenue() {
    const rows = MV_STORE['mv_daily_revenue'] || [];
    const today = new Date().toISOString().split('T')[0];
    return rows.find(r => r.vstdate === today) || null;
}

/**
 * Get revenue trend for last N days
 */
export function getRevenueTrend(days = 30) {
    const rows = MV_STORE['mv_daily_revenue'] || [];
    return rows.slice(0, days);
}

/**
 * Get department revenue for current month
 */
export function getDeptRevenueCurrentMonth() {
    const rows = MV_STORE['mv_monthly_dept_revenue'] || [];
    const now = new Date();
    const currentMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return rows.filter(r => r.month === currentMonth);
}

/**
 * Get fiscal year revenue data (pre-computed)
 */
export function getFiscalRevenue() {
    return MV_STORE['mv_fiscal_revenue'] || [];
}

/**
 * Get OPD wait time for today
 */
export function getOPDWaitTimeToday() {
    const rows = MV_STORE['mv_opd_wait_time'] || [];
    const today = new Date().toISOString().split('T')[0];
    return rows.filter(r => r.vstdate === today);
}

/**
 * Get coding audit summary
 */
export function getCodingAudit(days = 30) {
    const rows = MV_STORE['mv_coding_audit'] || [];
    return rows.slice(0, days);
}

// ── Cleanup ──
export function stopMaterializedViews() {
    for (const t of timers) clearInterval(t);
    timers.length = 0;
    console.log('🛑 Materialized Views stopped');
}

export default {
    initMaterializedViews,
    getMV, getMVStatus,
    forceRefreshView, forceRefreshAll,
    getTodayRevenue, getRevenueTrend,
    getDeptRevenueCurrentMonth, getFiscalRevenue,
    getOPDWaitTimeToday, getCodingAudit,
    stopMaterializedViews
};
