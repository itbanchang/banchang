// ============================================================
// BCH 360° Intelligence V.10 — Dashboard Routes
// Summary, resource elasticity — cached endpoints
// ============================================================
import { Router } from 'express';
import hosxp from '../db/hosxpIntegration.js';
import { getEWSSummary } from '../ai/ewsEngine.js';
import { dbQueryOne } from '../db/mysql.js';
import { cached } from '../lib/cache.js';
import { getMV } from '../db/materializedViews.js';
import { getFinanceCal } from '../ai/calibration.js';

const router = Router();

// Dashboard Summary (2 min cache — matches frontend polling interval)
router.get('/summary', cached('summary', 120000, async () => {
  const start = Date.now();
  const T = (p, ms) => Promise.race([p.catch(() => null), new Promise(r => setTimeout(() => r(null), ms))]);

  const ewsPromise = T(
    getEWSSummary().then(e => ({ critical: e.critical, high: e.high, total: e.total_patients })),
    3000
  );

  const [
    d, ewsStats,
    prevRevenue, prevYesterday, prevIPD,
    financeMetrics, alosData, staffData,
  ] = await Promise.all([
    hosxp.getDashboardSummary(),
    ewsPromise.then(r => r || { critical: 0, high: 0, total: 0 }),
    T((async () => {
      const mvRows = getMV('mv_daily_revenue');
      if (mvRows?.length) {
        const now = new Date();
        const prevM = now.getMonth() === 0 ? 12 : now.getMonth(); // previous month (1-indexed)
        const prevY = now.getMonth() === 0 ? now.getFullYear() - 1 : now.getFullYear();
        const total = mvRows
          .filter(r => { const d = new Date(r.vstdate); return (d.getMonth() + 1) === prevM && d.getFullYear() === prevY; })
          .reduce((s, r) => s + Number(r.total_revenue || 0), 0);
        if (total > 0) return { revenue: total };
      }
      // Fallback: MV only has 30 days, may not cover full prev month
      return dbQueryOne(`
        SELECT COALESCE(SUM(income), 0) as revenue
        FROM vn_stat
        WHERE vstdate >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
          AND vstdate < DATE_FORMAT(CURDATE(), '%Y-%m-01')
      `);
    })(), 5000),
    T(dbQueryOne(`
      SELECT
        (SELECT COUNT(DISTINCT vn) FROM ovst WHERE vstdate = DATE_SUB(CURDATE(), INTERVAL 1 DAY)) as prev_opd,
        (SELECT COUNT(*) FROM er_regist WHERE vstdate = DATE_SUB(CURDATE(), INTERVAL 1 DAY)) as prev_er
    `), 3000),
    T(dbQueryOne(`SELECT COUNT(*) as total FROM ipt WHERE dchdate IS NULL AND regdate < CURDATE() AND ward != '06'`), 3000),
    T(dbQueryOne(`
      SELECT
        ROUND(100.0 * COALESCE(SUM(CASE WHEN vstdate >= DATE_FORMAT(CURDATE(), '%Y-%m-01') THEN income - remain_money END), 0)
          / NULLIF(SUM(CASE WHEN vstdate >= DATE_FORMAT(CURDATE(), '%Y-%m-01') THEN income END), 0), 1) as collection_rate,
        COALESCE(SUM(CASE WHEN vstdate >= DATE_FORMAT(CURDATE(), '%Y-%m-01') AND remain_money > 0 THEN remain_money ELSE 0 END), 0) as debtors_outstanding,
        -- any_outstanding_rate = claims with any unpaid balance (original "denial_rate" — kept for backward compat)
        ROUND(100.0 * SUM(CASE WHEN remain_money > 0 THEN 1 ELSE 0 END)
          / NULLIF(COUNT(*), 0), 1) as any_outstanding_rate,
        -- full_denial_rate = claims where > 80% of income is unpaid (true denial)
        ROUND(100.0 * SUM(CASE WHEN remain_money > income * 0.8 THEN 1 ELSE 0 END)
          / NULLIF(COUNT(*), 0), 1) as full_denial_rate,
        -- partial_denial_rate = claims where 10%-80% is unpaid (meaningful underpayment, not rounding error)
        ROUND(100.0 * SUM(CASE WHEN remain_money > income * 0.1 AND remain_money <= income * 0.8 THEN 1 ELSE 0 END)
          / NULLIF(COUNT(*), 0), 1) as partial_denial_rate,
        SUM(CASE WHEN remain_money > income * 0.8 THEN 1 ELSE 0 END) as full_denied_count,
        SUM(CASE WHEN remain_money > 0 THEN 1 ELSE 0 END) as any_denied_count,
        COUNT(*) as total_count
      FROM vn_stat
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND income > 100  -- exclude trivially-priced visits (courtesy care, voided claims)
    `), 5000),
    T(dbQueryOne(`
      SELECT ROUND(AVG(DATEDIFF(dchdate, regdate)), 1) as alos
      FROM ipt
      WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND dchdate IS NOT NULL AND ward != '06'
        AND DATEDIFF(dchdate, regdate) BETWEEN 0 AND 60
    `), 5000),
    T(dbQueryOne(`
      SELECT COUNT(DISTINCT doctor) as doctors_today
      FROM ovst
      WHERE vstdate = CURDATE() AND doctor IS NOT NULL AND doctor != ''
    `), 3000),
  ]);

  const calcT = (cur, prev) => {
    if (cur == null || !prev || prev === 0) return null;
    return Math.round(((cur - prev) / Math.abs(prev)) * 100);
  };

  // Pro-rata projection: extrapolate current month-to-date to full month
  // Prevents misleading "revenue down 60%" when we're only 10 days into the month.
  const now = new Date();
  const dayOfMonth = now.getDate();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const proRata = (partial) => (partial == null || dayOfMonth === 0) ? partial
    : Math.round(Number(partial) * (daysInMonth / dayOfMonth));

  const ytd        = d.revenue_ytd || 0;
  const thisMonth  = d.revenue_this_month || 0;
  const thisMonthProjected = proRata(thisMonth);
  const prevMonth  = Number(prevRevenue?.revenue || 0);

  // Calibrated expense ratio (auto-tuned every 24h from vn_stat × GL)
  const fcal = getFinanceCal();
  const expenseRatio = Number(fcal?.expense_ratio || 0.82);
  const totalExpense = Math.round(ytd * expenseRatio);
  const netProfit = ytd - totalExpense;
  const profitMargin = ytd > 0 ? Math.round(((ytd - totalExpense) / ytd) * 1000) / 10 : 0;

  const collRate    = financeMetrics?.collection_rate != null ? Number(financeMetrics.collection_rate) : null;
  const debtors     = financeMetrics?.debtors_outstanding != null ? Number(financeMetrics.debtors_outstanding) : null;
  const fullDenial  = financeMetrics?.full_denial_rate != null ? Number(financeMetrics.full_denial_rate) : null;
  const partDenial  = financeMetrics?.partial_denial_rate != null ? Number(financeMetrics.partial_denial_rate) : null;
  const anyOutstanding = financeMetrics?.any_outstanding_rate != null ? Number(financeMetrics.any_outstanding_rate) : null;
  const alos        = alosData?.alos != null ? Number(alosData.alos) : null;
  const doctors     = staffData?.doctors_today != null ? Number(staffData.doctors_today) : null;

  console.log(`📊 Dashboard Summary: ${Date.now() - start}ms | collection=${collRate}% full_denial=${fullDenial}% alos=${alos} doctors=${doctors} expense_ratio=${expenseRatio}`);

  return {
    data_source: 'HOSxP XE',
    filters: {
      excluded_wards: ['06 (Home Ward)'],
      income_floor: 100,
      readmit_window_days: 30,
    },
    finance: {
      total_revenue:            ytd,
      revenue_this_month:       thisMonth,
      revenue_month_projected:  thisMonthProjected,
      total_expense:            totalExpense,
      net_profit:               netProfit,
      profit_margin:            profitMargin,
      expense_ratio:            expenseRatio,
      expense_source:           fcal?._meta?.expense_ratio_source || 'default',
      // trend_revenue is pro-rata projected vs full previous month — fair like-for-like
      trend_revenue:            calcT(thisMonthProjected, prevMonth),
      trend_revenue_raw:        calcT(thisMonth, prevMonth),  // unadjusted (MTD vs full prev) for reference
      collection_rate:          collRate,
      debtors_outstanding:      debtors,
      // full_denial_rate: claims >80% unpaid — the true "denied" metric (preferred)
      full_denial_rate:         fullDenial,
      // partial_denial_rate: claims 10-80% unpaid — significant underpayment
      partial_denial_rate:      partDenial,
      // any_outstanding_rate: claims with any unpaid balance — inflates with small residuals (legacy compat)
      any_outstanding_rate:     anyOutstanding,
      // denial_rate: DEPRECATED alias for full_denial_rate (safer default than any_outstanding)
      denial_rate:              fullDenial,
      denied_count:             financeMetrics?.full_denied_count != null ? Number(financeMetrics.full_denied_count) : null,
    },
    opd: {
      today_visits:  d.opd_today,
      trend_visits:  calcT(d.opd_today, Number(prevYesterday?.prev_opd || 0)),
    },
    ipd: {
      active_admissions: d.ipd_current,
      trend_admissions:  calcT(d.ipd_current, Number(prevIPD?.total || 0)),
      alos,
    },
    er: {
      today_visits: d.er_today,
      trend_visits: calcT(d.er_today, Number(prevYesterday?.prev_er || 0)),
    },
    beds: {
      total:          d.total_beds,
      occupied:       d.beds_occupied,
      available:      d.total_beds - d.beds_occupied,
      occupancy_rate: d.occupancy_rate,
    },
    clinical: {
      critical_patients:  ewsStats.critical,
      high_risk_patients: ewsStats.high,
      total_monitored:    ewsStats.total,
    },
    staff: {
      on_duty:       doctors,
      doctors_today: doctors,
    },
    last_updated: new Date().toISOString(),
  };
}));

// Resource Elasticity
router.get('/resource-elasticity', cached('elasticity', 60000, async () => {
  let bed = 0; try { bed = (await hosxp.getDashboardSummary()).occupancy_rate; } catch { }
  return {
    metrics: [
      { name: 'Bed Occ', value: bed, fullMark: 100 }, { name: 'Staff', value: 72, fullMark: 100 },
      { name: 'Equipment', value: 68, fullMark: 100 }, { name: 'OR', value: 81, fullMark: 100 },
      { name: 'Lab', value: 55, fullMark: 100 }, { name: 'Pharmacy', value: 89, fullMark: 100 }
    ]
  };
}));

export default router;
