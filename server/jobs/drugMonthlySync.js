// ============================================================
// BCH 360° Intelligence V.10 - Drug Monthly Sync Job
// Pre-aggregates opitemrece (8.8M rows) into SQLite monthly
// Eliminates live GROUP BY on production MySQL
// ============================================================
// Strategy:
//   - On startup: backfill last 36 months (if SQLite is empty)
//   - Every 6 hours: refresh current month + previous month
//   - Each month query scans ~40K rows (vs 8.8M full table)
// ============================================================

import cron from 'node-cron';
import { dbQuery, dbQueryHeavy } from '../db/mysql.js';
import dw from '../db/dataWarehouse.js';
import logger from '../logger.js';

let _isRunning = false;
let _lastSync = null;
let _stats = { months_synced: 0, rows_archived: 0, last_duration_ms: 0 };

/**
 * Fetch drug aggregation for a single month from MySQL
 * Scans only ~40K rows per month (vs 8.8M full table)
 */
async function fetchMonthFromMySQL(yearMonth) {
  const [yr, mo] = yearMonth.split('-');
  const startDate = `${yr}-${mo}-01`;
  // Last day of month
  const endDate = new Date(Number(yr), Number(mo), 0).toISOString().slice(0, 10);

  // Step 1: Aggregate opitemrece by icode (no JOIN — fast)
  const agg = await dbQueryHeavy(`drugSync_agg_${yearMonth}`, 60, `
    SELECT icode,
           SUM(qty) as total_qty,
           ROUND(SUM(COALESCE(sum_price, 0)), 0) as total_value,
           COUNT(DISTINCT vn) as visit_count,
           COUNT(DISTINCT hn) as patient_count
    FROM opitemrece
    WHERE vstdate BETWEEN ? AND ?
      AND qty > 0
    GROUP BY icode
  `, [startDate, endDate], { timeoutMs: 30000 });

  if (!agg?.length) return [];

  // Step 2: Lookup drug names (cached — primary key lookup)
  const icodes = agg.map(r => r.icode);
  const drugs = await dbQueryHeavy('drugSync_drugitems', 360,
    'SELECT icode, name, generic_name, unitprice, units FROM drugitems',
    [], { timeoutMs: 5000 });

  const dm = {};
  (drugs || []).forEach(d => { dm[d.icode] = d; });

  // Step 3: Enrich and return
  return agg
    .filter(r => dm[r.icode]) // only actual drugs (not non-drug items)
    .map(r => {
      const d = dm[r.icode];
      const qty = Number(r.total_qty || 0);
      // Prefer sum_price from opitemrece; fallback to qty * unitprice
      const value = Number(r.total_value || 0) > 0
        ? Number(r.total_value)
        : Math.round(qty * Number(d.unitprice || 0));
      return {
        year_month: yearMonth,
        icode: r.icode,
        drug_name: d.name || '',
        generic_name: d.generic_name || '',
        units: d.units || '',
        unitprice: Number(d.unitprice || 0),
        total_qty: qty,
        total_value: value,
        visit_count: Number(r.visit_count || 0),
        patient_count: Number(r.patient_count || 0),
      };
    });
}

/**
 * Generate list of year-month strings between two dates
 */
function getMonthRange(startDate, endDate) {
  const months = [];
  const cur = new Date(startDate);
  const end = new Date(endDate);
  while (cur <= end) {
    months.push(`${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}`);
    cur.setMonth(cur.getMonth() + 1);
  }
  return months;
}

/**
 * Sync drug data for specified months into SQLite
 */
async function syncMonths(months) {
  let totalRows = 0;
  for (const ym of months) {
    try {
      const rows = await fetchMonthFromMySQL(ym);
      if (rows.length > 0) {
        const archived = dw.archiveDrugMonthly(rows);
        totalRows += archived;
        logger.info(`[DrugSync] ${ym}: ${rows.length} drugs archived`);
      } else {
        logger.debug(`[DrugSync] ${ym}: no data`);
      }
    } catch (err) {
      logger.warn(`[DrugSync] ${ym} failed: ${err.message}`);
    }
    // Small delay between months to avoid DB pressure
    await new Promise(r => setTimeout(r, 500));
  }
  return totalRows;
}

/**
 * Main sync function
 * - If SQLite is empty: backfill 36 months
 * - Otherwise: refresh current + previous month
 */
async function runDrugSync() {
  if (_isRunning) {
    logger.debug('[DrugSync] Already running, skipping');
    return;
  }
  _isRunning = true;
  const t0 = Date.now();

  try {
    const now = new Date();
    const curYM = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;

    // Check if we need backfill (3 fiscal years = ~36 months)
    const existingCount = dw.getDrugMonthlyCount('2000-01', '2099-12');

    let months;
    if (existingCount === 0) {
      // First run: backfill 36 months
      logger.info('[DrugSync] First run — backfilling 36 months...');
      const backfillStart = new Date();
      backfillStart.setMonth(backfillStart.getMonth() - 35);
      const startDate = `${backfillStart.getFullYear()}-${String(backfillStart.getMonth() + 1).padStart(2, '0')}-01`;
      months = getMonthRange(startDate, now.toISOString().slice(0, 10));
    } else {
      // Regular refresh: current month + previous month (covers late entries)
      const prevMonth = new Date(now);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      const prevYM = `${prevMonth.getFullYear()}-${String(prevMonth.getMonth() + 1).padStart(2, '0')}`;
      months = [prevYM, curYM];
    }

    const totalRows = await syncMonths(months);
    const duration = Date.now() - t0;

    _lastSync = now.toISOString();
    _stats = { months_synced: months.length, rows_archived: totalRows, last_duration_ms: duration };

    logger.info(`[DrugSync] Complete: ${months.length} months, ${totalRows} rows (${duration}ms)`);
  } catch (err) {
    logger.error('[DrugSync] Failed', { error: err.message });
  } finally {
    _isRunning = false;
  }
}

/**
 * Start the drug monthly sync job
 * - Immediate first run (backfill if needed)
 * - Then every 6 hours
 */
export function startDrugMonthlySync() {
  // Initial sync after 10s delay (let MySQL pool warm up)
  setTimeout(() => {
    runDrugSync().catch(err => logger.error('[DrugSync] Initial sync error', { error: err.message }));
  }, 10_000);

  // Schedule: every 6 hours (0:00, 6:00, 12:00, 18:00)
  cron.schedule('0 */6 * * *', () => {
    runDrugSync().catch(err => logger.error('[DrugSync] Cron sync error', { error: err.message }));
  });

  logger.info('[DrugSync] Drug monthly sync job registered (every 6h)');
}

export function getDrugSyncStatus() {
  return { is_running: _isRunning, last_sync: _lastSync, ..._stats };
}

export default { startDrugMonthlySync, getDrugSyncStatus, runDrugSync };
