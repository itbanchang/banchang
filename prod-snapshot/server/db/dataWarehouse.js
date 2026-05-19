// ============================================================
// BCH 360° Intelligence V.10 — Data Warehouse (SQLite)
// Separate from HOSxP — Long-term Analysis (5-10 Years)
// ============================================================
// This replaces the JSON-based Data Lake with a proper SQLite
// Data Warehouse that supports efficient queries over years of
// historical data without touching the HOSxP production DB.
// ============================================================
import Database from 'better-sqlite3';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DW_DIR = path.resolve(__dirname, '../../data_lake');
const DW_PATH = path.join(DW_DIR, 'warehouse.db');

let db = null;

// ── Initialize Data Warehouse ──
export function initDataWarehouse() {
    try {
        // Ensure directory exists
        fs.mkdirSync(DW_DIR, { recursive: true });

        db = new Database(DW_PATH);
        db.pragma('journal_mode = WAL');       // Faster concurrent reads
        db.pragma('foreign_keys = ON');
        db.pragma('cache_size = -64000');       // 64MB cache
        db.pragma('synchronous = NORMAL');      // Balanced durability/speed

        // Create schema
        createSchema();

        console.log(`📦 Data Warehouse initialized: ${DW_PATH}`);
        console.log(`   Tables: ${listTables().join(', ')}`);
        return true;
    } catch (err) {
        console.error(`❌ Data Warehouse init failed: ${err.message}`);
        return false;
    }
}

// ── Schema Definition ──
function createSchema() {
    db.exec(`
        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        -- 1. Daily Snapshot — Dashboard KPIs
        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        CREATE TABLE IF NOT EXISTS dw_daily_snapshot (
            snapshot_date   TEXT NOT NULL,
            category        TEXT NOT NULL DEFAULT 'dashboard',
            opd_visits      INTEGER DEFAULT 0,
            ipd_admissions  INTEGER DEFAULT 0,
            er_visits       INTEGER DEFAULT 0,
            total_revenue   REAL DEFAULT 0,
            opd_revenue     REAL DEFAULT 0,
            ipd_revenue     REAL DEFAULT 0,
            beds_total      INTEGER DEFAULT 0,
            beds_occupied   INTEGER DEFAULT 0,
            occupancy_pct   REAL DEFAULT 0,
            avg_wait_min    REAL DEFAULT 0,
            created_at      TEXT DEFAULT (datetime('now', 'localtime')),
            PRIMARY KEY (snapshot_date, category)
        );

        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        -- 2. Monthly Revenue — By Department
        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        CREATE TABLE IF NOT EXISTS dw_monthly_revenue (
            year_month      TEXT NOT NULL,     -- '2026-03'
            dept_code       TEXT,
            dept_name       TEXT,
            payer_type      TEXT,
            payer_name      TEXT,
            visit_count     INTEGER DEFAULT 0,
            patient_count   INTEGER DEFAULT 0,
            revenue         REAL DEFAULT 0,
            expense_est     REAL DEFAULT 0,    -- Estimated expense (62% ratio)
            created_at      TEXT DEFAULT (datetime('now', 'localtime')),
            PRIMARY KEY (year_month, dept_code, payer_type)
        );

        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        -- 3. IPD Discharge Summary — Monthly
        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        CREATE TABLE IF NOT EXISTS dw_ipd_monthly (
            year_month      TEXT NOT NULL,
            ward_code       TEXT,
            ward_name       TEXT,
            discharge_count INTEGER DEFAULT 0,
            avg_los         REAL DEFAULT 0,
            avg_rw          REAL DEFAULT 0,
            total_rw        REAL DEFAULT 0,
            total_revenue   REAL DEFAULT 0,
            mortality_count INTEGER DEFAULT 0,
            readmission_count INTEGER DEFAULT 0,
            created_at      TEXT DEFAULT (datetime('now', 'localtime')),
            PRIMARY KEY (year_month, ward_code)
        );

        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        -- 4. ER Daily Metrics
        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        CREATE TABLE IF NOT EXISTS dw_er_daily (
            snapshot_date   TEXT NOT NULL PRIMARY KEY,
            total_patients  INTEGER DEFAULT 0,
            triage_1        INTEGER DEFAULT 0,
            triage_2        INTEGER DEFAULT 0,
            triage_3        INTEGER DEFAULT 0,
            triage_4        INTEGER DEFAULT 0,
            triage_5        INTEGER DEFAULT 0,
            avg_stay_min    REAL DEFAULT 0,
            admit_count     INTEGER DEFAULT 0,
            created_at      TEXT DEFAULT (datetime('now', 'localtime'))
        );

        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        -- 5. Top Diseases — Monthly ICD-10 Summary
        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        CREATE TABLE IF NOT EXISTS dw_disease_monthly (
            year_month      TEXT NOT NULL,
            icd10_code      TEXT NOT NULL,
            icd10_name      TEXT,
            cases           INTEGER DEFAULT 0,
            visits          INTEGER DEFAULT 0,
            created_at      TEXT DEFAULT (datetime('now', 'localtime')),
            PRIMARY KEY (year_month, icd10_code)
        );

        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        -- 6. Coding Audit — Daily Summary
        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        CREATE TABLE IF NOT EXISTS dw_coding_audit (
            snapshot_date   TEXT NOT NULL PRIMARY KEY,
            opd_total       INTEGER DEFAULT 0,
            opd_coded       INTEGER DEFAULT 0,
            opd_pending     INTEGER DEFAULT 0,
            ipd_total       INTEGER DEFAULT 0,
            ipd_coded       INTEGER DEFAULT 0,
            ipd_pending     INTEGER DEFAULT 0,
            uncoded_revenue REAL DEFAULT 0,
            created_at      TEXT DEFAULT (datetime('now', 'localtime'))
        );

        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        -- 7. Forecast History — Revenue predictions log
        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        CREATE TABLE IF NOT EXISTS dw_forecast_log (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            forecast_date   TEXT NOT NULL,
            target_month    TEXT NOT NULL,
            predicted_value REAL,
            actual_value    REAL,
            accuracy_pct    REAL,
            model_name      TEXT DEFAULT 'linear_regression',
            created_at      TEXT DEFAULT (datetime('now', 'localtime'))
        );

        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        -- 8. PPFS Activity — Fee Schedule Tracking
        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        CREATE TABLE IF NOT EXISTS dw_ppfs_monthly (
            year_month      TEXT NOT NULL,
            activity_name   TEXT NOT NULL,
            volume          INTEGER DEFAULT 0,
            revenue         REAL DEFAULT 0,
            unit_price      REAL DEFAULT 0,
            created_at      TEXT DEFAULT (datetime('now', 'localtime')),
            PRIMARY KEY (year_month, activity_name)
        );

        -- Performance Indices
        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        -- 9. Learning Journal — AI auto-captured insights
        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        CREATE TABLE IF NOT EXISTS dw_learning_journal (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            event_date      TEXT NOT NULL DEFAULT (date('now','localtime')),
            module          TEXT NOT NULL,
            event_type      TEXT NOT NULL,
            severity        TEXT DEFAULT 'info',
            title           TEXT NOT NULL,
            detail          TEXT,
            metric_value    REAL,
            metric_unit     TEXT,
            created_at      TEXT DEFAULT (datetime('now','localtime'))
        );

        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        -- 10. Evolution Log — System changes & improvements
        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        CREATE TABLE IF NOT EXISTS dw_evolution_log (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            event_date      TEXT NOT NULL DEFAULT (date('now','localtime')),
            category        TEXT NOT NULL,
            title           TEXT NOT NULL,
            description     TEXT,
            author          TEXT DEFAULT 'system',
            version         TEXT,
            tags            TEXT,
            impact          TEXT DEFAULT 'minor',
            created_at      TEXT DEFAULT (datetime('now','localtime'))
        );

        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        -- 11. Drug Monthly — Pre-aggregated Top Drugs
        -- Replaces live opitemrece GROUP BY (8.8M rows)
        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        CREATE TABLE IF NOT EXISTS dw_drug_monthly (
            year_month      TEXT NOT NULL,     -- '2026-03'
            icode           TEXT NOT NULL,
            drug_name       TEXT,
            generic_name    TEXT,
            units           TEXT,
            unitprice       REAL DEFAULT 0,
            total_qty       INTEGER DEFAULT 0,
            total_value     REAL DEFAULT 0,    -- SUM(sum_price) from opitemrece
            visit_count     INTEGER DEFAULT 0,
            patient_count   INTEGER DEFAULT 0,
            created_at      TEXT DEFAULT (datetime('now', 'localtime')),
            PRIMARY KEY (year_month, icode)
        );

        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        -- 12. Patient Satisfaction Survey — Phase E Tier 3
        -- ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        -- HOSxP has no satisfaction table — store responses here.
        -- Public POST /api/satisfaction/submit writes one row per response.
        -- No PHI stored: HN/VN are OPTIONAL and only used to dedupe per visit.
        CREATE TABLE IF NOT EXISTS dw_patient_satisfaction (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            visit_date      TEXT NOT NULL DEFAULT (date('now', 'localtime')),
            department      TEXT NOT NULL DEFAULT 'ER',   -- 'ER', 'OPD', 'IPD', etc.
            hn              TEXT,                          -- optional, for dedup
            vn              TEXT,                          -- optional, for dedup
            overall_score   INTEGER NOT NULL CHECK (overall_score BETWEEN 1 AND 5),
            speed_score     INTEGER CHECK (speed_score BETWEEN 1 AND 5),
            staff_score     INTEGER CHECK (staff_score BETWEEN 1 AND 5),
            facility_score  INTEGER CHECK (facility_score BETWEEN 1 AND 5),
            comment         TEXT,
            source          TEXT DEFAULT 'qr',              -- 'qr', 'kiosk', 'web', 'tablet'
            client_ip       TEXT,                           -- rate limit + audit only
            submitted_at    TEXT DEFAULT (datetime('now', 'localtime'))
        );

        CREATE INDEX IF NOT EXISTS idx_dw_daily_date ON dw_daily_snapshot(snapshot_date);
        CREATE INDEX IF NOT EXISTS idx_dw_monthly_rev ON dw_monthly_revenue(year_month);
        CREATE INDEX IF NOT EXISTS idx_dw_ipd_month ON dw_ipd_monthly(year_month);
        CREATE INDEX IF NOT EXISTS idx_dw_er_date ON dw_er_daily(snapshot_date);
        CREATE INDEX IF NOT EXISTS idx_dw_disease ON dw_disease_monthly(year_month);
        CREATE INDEX IF NOT EXISTS idx_dw_forecast_target ON dw_forecast_log(target_month);
        CREATE INDEX IF NOT EXISTS idx_dw_learn_date ON dw_learning_journal(event_date);
        CREATE INDEX IF NOT EXISTS idx_dw_learn_module ON dw_learning_journal(module);
        CREATE INDEX IF NOT EXISTS idx_dw_evo_date ON dw_evolution_log(event_date);
        CREATE INDEX IF NOT EXISTS idx_dw_evo_category ON dw_evolution_log(category);
        CREATE INDEX IF NOT EXISTS idx_dw_drug_month ON dw_drug_monthly(year_month);
        CREATE INDEX IF NOT EXISTS idx_dw_drug_icode ON dw_drug_monthly(icode);
        CREATE INDEX IF NOT EXISTS idx_dw_sat_date ON dw_patient_satisfaction(visit_date);
        CREATE INDEX IF NOT EXISTS idx_dw_sat_dept ON dw_patient_satisfaction(department);
        CREATE INDEX IF NOT EXISTS idx_dw_sat_submitted ON dw_patient_satisfaction(submitted_at);
        CREATE INDEX IF NOT EXISTS idx_dw_sat_vn ON dw_patient_satisfaction(vn) WHERE vn IS NOT NULL;
    `);
}

// ── Expose db for shared access ──
export function getWarehouseDb() { return db; }

// ── Archive Functions (called daily from server) ──

/**
 * Archive daily dashboard snapshot
 */
export function archiveDailySnapshot(data) {
    if (!db) return;
    const today = new Date().toISOString().split('T')[0];

    const stmt = db.prepare(`
        INSERT OR REPLACE INTO dw_daily_snapshot 
        (snapshot_date, category, opd_visits, ipd_admissions, er_visits,
         total_revenue, opd_revenue, ipd_revenue,
         beds_total, beds_occupied, occupancy_pct, avg_wait_min)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    stmt.run(
        today,
        data.category || 'dashboard',
        data.opd_visits || data.opd_today || 0,
        data.ipd_admissions || data.ipd_current || 0,
        data.er_visits || data.er_today || 0,
        data.total_revenue || data.revenue_ytd || 0,
        data.opd_revenue || 0,
        data.ipd_revenue || 0,
        data.beds_total || data.total_beds || 0,
        data.beds_occupied || 0,
        data.occupancy_pct || data.occupancy_rate || 0,
        data.avg_wait_min || 0
    );
}

/**
 * Archive monthly revenue data
 */
export function archiveMonthlyRevenue(rows) {
    if (!db || !rows?.length) return;

    const stmt = db.prepare(`
        INSERT OR REPLACE INTO dw_monthly_revenue 
        (year_month, dept_code, dept_name, payer_type, payer_name, 
         visit_count, patient_count, revenue, expense_est)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const tx = db.transaction((data) => {
        for (const r of data) {
            stmt.run(
                r.month || r.year_month,
                r.depcode || r.dept_code || 'ALL',
                r.dept_name || r.depname || 'รวม',
                r.pttype || r.payer_type || 'ALL',
                r.payer_name || 'รวม',
                r.visit_count || 0,
                r.patient_count || 0,
                r.revenue || 0,
                Math.round((r.revenue || 0) * 0.62)
            );
        }
    });

    tx(rows);
}

/**
 * Archive IPD monthly data
 */
export function archiveIPDMonthly(rows) {
    if (!db || !rows?.length) return;

    const stmt = db.prepare(`
        INSERT OR REPLACE INTO dw_ipd_monthly 
        (year_month, ward_code, ward_name, discharge_count, avg_los, 
         avg_rw, total_rw, total_revenue, mortality_count)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const tx = db.transaction((data) => {
        for (const r of data) {
            stmt.run(
                r.month,
                r.ward || 'ALL',
                r.ward_name || 'รวม',
                r.discharge_count || 0,
                r.avg_los || 0,
                r.avg_rw || 0,
                r.total_rw || 0,
                r.total_revenue || 0,
                r.mortality_count || 0
            );
        }
    });

    tx(rows);
}

/**
 * Archive ER daily summary
 */
export function archiveERDaily(data) {
    if (!db) return;
    const today = new Date().toISOString().split('T')[0];

    db.prepare(`
        INSERT OR REPLACE INTO dw_er_daily 
        (snapshot_date, total_patients, triage_1, triage_2, triage_3, 
         triage_4, triage_5, avg_stay_min, admit_count)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
        data.snapshot_date || today,
        data.total_patients || 0,
        data.triage_1 || 0,
        data.triage_2 || 0,
        data.triage_3 || 0,
        data.triage_4 || 0,
        data.triage_5 || 0,
        data.avg_stay_min || 0,
        data.admit_count || 0
    );
}

/**
 * Archive drug dispensing data (monthly aggregation from opitemrece)
 * Called by background job — replaces live MySQL GROUP BY on 8.8M rows
 */
export function archiveDrugMonthly(rows) {
    if (!db || !rows?.length) return 0;

    const stmt = db.prepare(`
        INSERT OR REPLACE INTO dw_drug_monthly
        (year_month, icode, drug_name, generic_name, units, unitprice,
         total_qty, total_value, visit_count, patient_count)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const tx = db.transaction((data) => {
        for (const r of data) {
            stmt.run(
                r.year_month,
                r.icode,
                r.drug_name || '',
                r.generic_name || '',
                r.units || '',
                r.unitprice || 0,
                r.total_qty || 0,
                r.total_value || 0,
                r.visit_count || 0,
                r.patient_count || 0
            );
        }
    });

    tx(rows);
    return rows.length;
}

/**
 * Get top drugs for a fiscal date range with YoY comparison
 * Reads from pre-aggregated SQLite — instant (<5ms) vs 30s+ MySQL
 */
export function getTopDrugs(startDate, endDate) {
    if (!db) return { by_value: [], by_volume: [] };

    // Convert dates to year_month range
    const startYM = startDate.slice(0, 7);  // '2025-10-01' → '2025-10'
    const endYM = endDate.slice(0, 7);      // '2026-03-26' → '2026-03'

    const rows = db.prepare(`
        SELECT icode, drug_name, generic_name, units, unitprice,
               SUM(total_qty) as total_qty,
               SUM(total_value) as total_value,
               SUM(visit_count) as visit_count,
               SUM(patient_count) as patient_count
        FROM dw_drug_monthly
        WHERE year_month BETWEEN ? AND ?
        GROUP BY icode
        HAVING total_qty > 0
    `).all(startYM, endYM);

    const byValue = [...rows].sort((a, b) => b.total_value - a.total_value).slice(0, 20);
    const byVolume = [...rows].sort((a, b) => b.total_qty - a.total_qty).slice(0, 20);

    return { by_value: byValue, by_volume: byVolume, total_drugs: rows.length };
}

/**
 * Get drug monthly row count (to check if data exists for a period)
 */
export function getDrugMonthlyCount(startYM, endYM) {
    if (!db) return 0;
    const row = db.prepare(`SELECT COUNT(*) as cnt FROM dw_drug_monthly WHERE year_month BETWEEN ? AND ?`).get(startYM, endYM);
    return row?.cnt || 0;
}

// ── Query Functions for Long-term Analysis ──

/**
 * Get revenue trend for N years
 */
export function getRevenueTrend(years = 5) {
    if (!db) return [];
    return db.prepare(`
        SELECT year_month, 
               SUM(revenue) as total_revenue,
               SUM(visit_count) as total_visits,
               SUM(patient_count) as total_patients,
               SUM(expense_est) as total_expense
        FROM dw_monthly_revenue
        WHERE year_month >= strftime('%Y-%m', date('now', '-${years} years'))
        GROUP BY year_month
        ORDER BY year_month
    `).all();
}

/**
 * Get department revenue trend for N years
 */
export function getDeptRevenueTrend(deptCode, years = 5) {
    if (!db) return [];
    return db.prepare(`
        SELECT year_month, dept_name, revenue, visit_count, patient_count
        FROM dw_monthly_revenue
        WHERE dept_code = ?
          AND year_month >= strftime('%Y-%m', date('now', '-${years} years'))
        ORDER BY year_month
    `).all(deptCode);
}

/**
 * Get daily dashboard trend for N months
 */
export function getDailyTrend(months = 12) {
    if (!db) return [];
    return db.prepare(`
        SELECT snapshot_date, opd_visits, ipd_admissions, er_visits,
               total_revenue, occupancy_pct, avg_wait_min
        FROM dw_daily_snapshot
        WHERE snapshot_date >= date('now', '-${months} months')
          AND category = 'dashboard'
        ORDER BY snapshot_date
    `).all();
}

/**
 * Get IPD performance trend
 */
export function getIPDTrend(years = 3) {
    if (!db) return [];
    return db.prepare(`
        SELECT year_month, 
               SUM(discharge_count) as discharges,
               ROUND(AVG(avg_los), 1) as avg_los,
               ROUND(AVG(avg_rw), 3) as avg_rw,
               SUM(total_rw) as total_rw,
               SUM(total_revenue) as revenue,
               SUM(mortality_count) as deaths
        FROM dw_ipd_monthly
        WHERE year_month >= strftime('%Y-%m', date('now', '-${years} years'))
        GROUP BY year_month
        ORDER BY year_month
    `).all();
}

/**
 * Get ER trend
 */
export function getERTrend(months = 12) {
    if (!db) return [];
    return db.prepare(`
        SELECT snapshot_date, total_patients, 
               triage_1, triage_2, triage_3, triage_4, triage_5,
               avg_stay_min, admit_count
        FROM dw_er_daily
        WHERE snapshot_date >= date('now', '-${months} months')
        ORDER BY snapshot_date
    `).all();
}

/**
 * Year-over-Year comparison
 */
export function getYoYComparison(metric = 'revenue') {
    if (!db) return [];
    return db.prepare(`
        SELECT 
            SUBSTR(year_month, 6, 2) as month_num,
            SUBSTR(year_month, 1, 4) as year,
            SUM(revenue) as revenue,
            SUM(visit_count) as visits,
            SUM(patient_count) as patients
        FROM dw_monthly_revenue
        GROUP BY year, month_num
        ORDER BY year, month_num
    `).all();
}

/**
 * Get warehouse statistics
 */
export function getWarehouseStats() {
    if (!db) return null;

    const tables = [
        'dw_daily_snapshot', 'dw_monthly_revenue', 'dw_ipd_monthly',
        'dw_er_daily', 'dw_disease_monthly', 'dw_coding_audit',
        'dw_forecast_log', 'dw_ppfs_monthly'
    ];

    const stats = {};
    for (const table of tables) {
        try {
            const row = db.prepare(`SELECT COUNT(*) as cnt, MIN(rowid) as min_id, MAX(rowid) as max_id FROM ${table}`).get();
            const dateRange = db.prepare(`
                SELECT MIN(COALESCE(snapshot_date, year_month, forecast_date)) as earliest,
                       MAX(COALESCE(snapshot_date, year_month, forecast_date)) as latest
                FROM ${table}
            `).get();
            stats[table] = {
                row_count: row.cnt,
                date_range: { from: dateRange?.earliest, to: dateRange?.latest }
            };
        } catch {
            stats[table] = { row_count: 0, date_range: { from: null, to: null } };
        }
    }

    // File size
    try {
        const fstat = fs.statSync(DW_PATH);
        stats._file_size_mb = Math.round(fstat.size / 1048576 * 100) / 100;
    } catch {
        stats._file_size_mb = 0;
    }

    return stats;
}

// ── Utility ──
function listTables() {
    if (!db) return [];
    return db.prepare("SELECT name FROM sqlite_master WHERE type='table' ORDER BY name").all().map(r => r.name);
}

export function closeWarehouse() {
    if (db) { db.close(); db = null; }
}

export default {
    initDataWarehouse,
    archiveDailySnapshot, archiveMonthlyRevenue, archiveIPDMonthly, archiveERDaily,
    archiveDrugMonthly, getTopDrugs, getDrugMonthlyCount,
    getRevenueTrend, getDeptRevenueTrend, getDailyTrend,
    getIPDTrend, getERTrend, getYoYComparison,
    getWarehouseStats, closeWarehouse
};
