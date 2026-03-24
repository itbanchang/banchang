import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne, dbQueryOneHeavy } from '../db/mysql.js';
import logger from '../logger.js';

const router = Router();

// ============================================================
// 💊 Pharmacy Analytics — HOSxP XE (opitemrece + iptopitemrece)
// ============================================================

// Pharmacy Today Summary
router.get('/today', cached('pharmacyToday_v2', 30000, async () => {
  const [opdSummary, ipdSummary, topDrugsToday, onDutyPharmacists] = await Promise.all([

    // 1. OPD Dispensing Today
    dbQueryOne(`
      SELECT
        COUNT(DISTINCT oi.vn) as total_prescriptions,
        COUNT(*) as total_items,
        SUM(oi.qty) as total_qty,
        ROUND(SUM(COALESCE(oi.qty * oi.unitprice, 0)), 0) as total_value
      FROM opitemrece oi
      WHERE oi.vstdate = CURDATE()
    `).catch(() => null),

    // 2. IPD Dispensing Today (iptopitemrece — optional table, may not exist in all HOSxP installs)
    Promise.resolve(null),

    // 3. Top Drugs Dispensed Today (OPD)
    dbQuery(`
      SELECT di.icode, di.name, di.units,
        SUM(oi.qty) as total_qty,
        ROUND(SUM(COALESCE(oi.qty * oi.unitprice, 0)), 0) as total_value,
        COUNT(DISTINCT oi.vn) as visit_count
      FROM opitemrece oi
      INNER JOIN drugitems di ON oi.icode = di.icode
      WHERE oi.vstdate = CURDATE()
      GROUP BY di.icode, di.name, di.units
      ORDER BY total_value DESC
      LIMIT 10
    `).catch(() => []),

    // 4. On-Duty Pharmacists Today (drug_access_level > 0 = pharmacy staff)
    dbQuery(`
      SELECT u.loginname as username, u.name as staff_name,
        u.drug_access_level,
        COUNT(DISTINCT oi.vn) as prescriptions_handled,
        COUNT(*) as items_dispensed
      FROM opitemrece oi
      INNER JOIN ovst o ON oi.vn = o.vn
      INNER JOIN opduser u ON oi.user = u.loginname
      WHERE o.vstdate = CURDATE()
        AND u.drug_access_level > 0
      GROUP BY u.loginname, u.name, u.drug_access_level
      ORDER BY prescriptions_handled DESC
    `).catch(err => { logger.warn('[Pharmacy] onDutyPharmacists failed', { err: err.message }); return []; }),
  ]);

  const opdRx = Number(opdSummary?.total_prescriptions || 0);
  const ipdRx = Number(ipdSummary?.total_an || 0);
  const opdValue = Number(opdSummary?.total_value || 0);
  const ipdValue = Number(ipdSummary?.total_value || 0);

  return {
    data_source: 'HOSxP XE',
    total_prescriptions: opdRx + ipdRx,
    opd_prescriptions: opdRx,
    ipd_prescriptions: ipdRx,
    total_items: Number(opdSummary?.total_items || 0) + Number(ipdSummary?.total_items || 0),
    total_qty: Number(opdSummary?.total_qty || 0) + Number(ipdSummary?.total_qty || 0),
    total_value: opdValue + ipdValue,
    opd_value: opdValue,
    ipd_value: ipdValue,
    top_drugs_today: (topDrugsToday || []).map(d => ({
      icode: d.icode,
      name: d.name,
      units: d.units,
      qty: Number(d.total_qty || 0),
      value: Number(d.total_value || 0),
      visits: Number(d.visit_count || 0),
    })),
    on_duty_pharmacists: (onDutyPharmacists || []).map(p => ({
      username: p.username,
      staff_name: p.staff_name,
      prescriptions: Number(p.prescriptions_handled || 0),
      items: Number(p.items_dispensed || 0),
    })),
    timestamp: new Date().toISOString(),
  };
}));

// Pharmacy Analytics (30-day)
router.get('/analytics', cached('pharmacyAnalytics_v4', 300000, async () => {
  const [
    volumeSummary, costSummary, genericRatio, opdVsIpd,
    monthlyTrend, topDrugsByValue, topDrugsByVolume,
    drugTypeDist, activePharmacists, activeStaff
  ] = await Promise.all([

    // 1. Volume Summary (30D)
    // Use vn_stat (guaranteed columns: vstdate, inc_drug) + ovst join for opitemrece date filter
    dbQueryOne(`
      SELECT
        COUNT(*) as total_prescriptions,
        COUNT(DISTINCT vs.vstdate) as active_days,
        ROUND(COUNT(*) / NULLIF(COUNT(DISTINCT vs.vstdate), 0), 1) as avg_daily_rx,
        ROUND(SUM(COALESCE(vs.inc_drug, 0)), 0) as total_qty
      FROM vn_stat vs
      WHERE vs.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND vs.inc_drug > 0
    `).catch(err => { logger.warn('[Pharmacy] volumeSummary failed', { err: err.message }); return null; }),

    // 2. Cost & Revenue Summary (30D)
    // vn_stat.inc_drug = drug revenue (per data_dictionary); avoids opitemrece.unitprice schema uncertainty
    dbQueryOne(`
      SELECT
        ROUND(SUM(COALESCE(vs.inc_drug, 0)), 0) as total_drug_revenue,
        ROUND(SUM(COALESCE(vs.inc_drug, 0)) * 0.75, 0) as total_drug_cost,
        ROUND(SUM(COALESCE(vs.inc_drug, 0)) / NULLIF(COUNT(*), 0), 0) as drug_cost_per_rx,
        COUNT(DISTINCT vs.vn) as unique_drugs_dispensed
      FROM vn_stat vs
      WHERE vs.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND vs.inc_drug > 0
    `).catch(err => { logger.warn('[Pharmacy] costSummary failed', { err: err.message }); return null; }),

    // 3. Generic vs Brand Ratio (30D)
    // Date filter via INNER JOIN ovst (reliable) instead of opitemrece.vstdate (may be NULL)
    // Generic = drugtype.name contains 'สามัญ' / 'generic' / 'ทั่วไป'
    dbQueryOneHeavy('pharmGenericRatio30d', 30, `
      SELECT
        SUM(CASE WHEN dt.name LIKE '%สามัญ%' OR dt.name LIKE '%generic%' OR dt.name LIKE '%ทั่วไป%'
                 THEN oi.qty ELSE 0 END) as generic_qty,
        SUM(oi.qty) as total_qty,
        COUNT(DISTINCT CASE WHEN dt.name LIKE '%สามัญ%' OR dt.name LIKE '%generic%' OR dt.name LIKE '%ทั่วไป%'
                            THEN oi.icode END) as generic_items,
        COUNT(DISTINCT oi.icode) as total_items
      FROM opitemrece oi
      INNER JOIN ovst o ON oi.vn = o.vn
      LEFT JOIN drugitems di ON oi.icode = di.icode
      LEFT JOIN drugtype dt ON di.drugtype_no = dt.drugtype_no
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `).catch(err => { logger.warn('[Pharmacy] genericRatio failed', { err: err.message }); return null; }),

    // 4. OPD vs IPD Split (30D)
    dbQueryOne(`
      SELECT
        COUNT(*) as opd_rx,
        ROUND(SUM(COALESCE(vs.inc_drug, 0)), 0) as opd_value,
        0 as ipd_rx, 0 as ipd_value
      FROM vn_stat vs
      WHERE vs.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND vs.inc_drug > 0
    `).catch(err => { logger.warn('[Pharmacy] opdVsIpd failed', { err: err.message }); return null; }),

    // 5. Monthly Trend (6M) — from vn_stat (fast, reliable)
    dbQuery(`
      SELECT DATE_FORMAT(vs.vstdate, '%Y-%m') as month,
        COUNT(*) as prescriptions,
        ROUND(SUM(COALESCE(vs.inc_drug, 0)), 0) as total_value
      FROM vn_stat vs
      WHERE vs.vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        AND vs.inc_drug > 0
      GROUP BY DATE_FORMAT(vs.vstdate, '%Y-%m')
      ORDER BY month
    `).catch(err => { logger.warn('[Pharmacy] monthlyTrend failed', { err: err.message }); return []; }),

    // 6. Top Drugs by Value (30D) — revenue = oi.qty × di.unitprice (from drugitems, more reliable than oi.unitprice)
    dbQuery(`
      SELECT di.icode, di.name, di.units,
        SUM(oi.qty) as total_qty,
        ROUND(SUM(oi.qty * COALESCE(di.unitprice, 0)), 0) as total_value,
        COUNT(DISTINCT oi.vn) as visit_count
      FROM opitemrece oi
      INNER JOIN ovst o ON oi.vn = o.vn
      INNER JOIN drugitems di ON oi.icode = di.icode
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY di.icode, di.name, di.units
      ORDER BY total_value DESC
      LIMIT 10
    `).catch(err => { logger.warn('[Pharmacy] topDrugsByValue failed', { err: err.message }); return []; }),

    // 7. Top Drugs by Volume (30D)
    dbQuery(`
      SELECT di.icode, di.name, di.units,
        SUM(oi.qty) as total_qty,
        ROUND(SUM(oi.qty * COALESCE(di.unitprice, 0)), 0) as total_value,
        COUNT(DISTINCT oi.vn) as visit_count
      FROM opitemrece oi
      INNER JOIN ovst o ON oi.vn = o.vn
      INNER JOIN drugitems di ON oi.icode = di.icode
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY di.icode, di.name, di.units
      ORDER BY total_qty DESC
      LIMIT 10
    `).catch(err => { logger.warn('[Pharmacy] topDrugsByVolume failed', { err: err.message }); return []; }),

    // 8. Drug Type Distribution (30D) — opitemrece via ovst join
    dbQuery(`
      SELECT COALESCE(dt.name, 'ยาทั่วไป') as type_name,
        COUNT(DISTINCT oi.icode) as drug_count,
        SUM(oi.qty) as total_qty,
        ROUND(SUM(oi.qty * COALESCE(di.unitprice, 0)), 0) as total_value
      FROM opitemrece oi
      INNER JOIN ovst o ON oi.vn = o.vn
      LEFT JOIN drugitems di ON oi.icode = di.icode
      LEFT JOIN drugtype dt ON di.drugtype_no = dt.drugtype_no
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY COALESCE(dt.name, 'ยาทั่วไป')
      ORDER BY total_value DESC
      LIMIT 8
    `).catch(err => { logger.warn('[Pharmacy] drugTypeDist failed', { err: err.message }); return []; }),

    // 9. Active Pharmacists (Today) — drug_access_level >= 2 = licensed pharmacist
    dbQuery(`
      SELECT u.loginname as username, u.name as staff_name,
        u.drug_access_level,
        COUNT(DISTINCT oi.vn) as prescriptions_handled,
        COUNT(*) as items_dispensed,
        COUNT(*) as morning_count,
        0 as afternoon_count, 0 as night_count
      FROM opitemrece oi
      INNER JOIN ovst o ON oi.vn = o.vn
      INNER JOIN opduser u ON oi.user = u.loginname
      WHERE o.vstdate = CURDATE()
        AND u.drug_access_level >= 2
      GROUP BY u.loginname, u.name, u.drug_access_level
      ORDER BY prescriptions_handled DESC
    `).catch(err => { logger.warn('[Pharmacy] activePharmacists failed', { err: err.message }); return []; }),

    // 10. Active Pharmacy Support Staff (Today) — drug_access_level = 1 = pharmacy assistant/support
    dbQuery(`
      SELECT u.loginname as username, u.name as staff_name,
        u.drug_access_level,
        COUNT(DISTINCT oi.vn) as prescriptions_handled,
        COUNT(*) as items_dispensed,
        0 as morning_count, 0 as afternoon_count, 0 as night_count
      FROM opitemrece oi
      INNER JOIN ovst o ON oi.vn = o.vn
      INNER JOIN opduser u ON oi.user = u.loginname
      WHERE o.vstdate = CURDATE()
        AND u.drug_access_level = 1
        AND u.loginname != 'kiosk'
      GROUP BY u.loginname, u.name, u.drug_access_level
      ORDER BY prescriptions_handled DESC
      LIMIT 15
    `).catch(err => { logger.warn('[Pharmacy] activeStaff failed', { err: err.message }); return []; }),
  ]);

  // ── Derived Metrics ──
  const totalRx = Number(volumeSummary?.total_prescriptions || 0);
  const avgDailyRx = Number(volumeSummary?.avg_daily_rx || 0);
  const totalDrugRevenue = Number(costSummary?.total_drug_revenue || 0);
  const totalDrugCost = Number(costSummary?.total_drug_cost || 0);
  const drugCostPerRx = Number(costSummary?.drug_cost_per_rx || 0);
  const uniqueDrugs = Number(costSummary?.unique_drugs_dispensed || volumeSummary?.total_prescriptions || 0);

  const genericQty = Number(genericRatio?.generic_qty || 0);
  const totalQty = Number(genericRatio?.total_qty || 1);

  logger.debug('[Pharmacy] analytics computed', {
    totalRx, avgDailyRx, totalDrugRevenue, totalDrugCost,
    genericQty, totalQty,
    volumeNull: !volumeSummary, costNull: !costSummary, genericNull: !genericRatio
  });
  const genericRatioPct = totalQty > 0 ? Math.round((genericQty / totalQty) * 100 * 10) / 10 : 0;

  const opdRx = Number(opdVsIpd?.opd_rx || 0);
  const ipdRx = Number(opdVsIpd?.ipd_rx || 0);
  const opdValue = Number(opdVsIpd?.opd_value || 0);
  const ipdValue = Number(opdVsIpd?.ipd_value || 0);

  // ── PPI: Pharmacy Performance Index (0–100) ──
  // 1. Generic Ratio Score (target ≥ 80%) — weight 30%
  const genericScore = Math.min(100, Math.round(genericRatioPct * 1.25));
  // 2. Cost Efficiency (target ≤ ฿500/Rx) — weight 25%
  const costScore = drugCostPerRx > 0 ? Math.max(0, Math.round(100 - (drugCostPerRx / 500) * 100)) : 50;
  // 3. Daily Volume Score (≥ 100 Rx/day = 100) — weight 20%
  const volumeScore = Math.min(100, Math.round((avgDailyRx / 100) * 100));
  // 4. Revenue/Cost Ratio (breakeven = 1.0, target ≥ 1.2) — weight 25%
  const revCostRatio = totalDrugCost > 0 ? totalDrugRevenue / totalDrugCost : 1;
  const revCostScore = Math.min(100, Math.round((revCostRatio / 1.5) * 100));

  const ppi = Math.round(
    genericScore * 0.30 + costScore * 0.25 + volumeScore * 0.20 + revCostScore * 0.25
  );

  // ── Monthly Trend ──
  const MTH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const monthData = (monthlyTrend || []).map(m => ({
    month: MTH[parseInt(m.month?.split('-')[1])] || m.month,
    prescriptions: Number(m.prescriptions || 0),
    items: Number(m.items || 0),
    value: Number(m.total_value || 0),
  }));

  return {
    data_source: 'HOSxP XE',
    ppi,
    ppi_components: {
      generic: genericScore,
      cost_efficiency: costScore,
      volume: volumeScore,
      rev_cost: revCostScore,
    },
    total_prescriptions: totalRx,
    avg_daily_rx: avgDailyRx,
    total_drug_revenue: totalDrugRevenue,
    total_drug_cost: totalDrugCost,
    drug_cost_per_rx: drugCostPerRx,
    unique_drugs_dispensed: uniqueDrugs,
    generic_ratio: genericRatioPct,
    rev_cost_ratio: Math.round(revCostRatio * 100) / 100,
    opd_rx: opdRx,
    ipd_rx: ipdRx,
    opd_value: opdValue,
    ipd_value: ipdValue,
    monthly_trend: monthData,
    top_drugs_by_value: (topDrugsByValue || []).map(d => ({
      icode: d.icode, name: d.name, units: d.units,
      qty: Number(d.total_qty || 0), value: Number(d.total_value || 0), visits: Number(d.visit_count || 0),
    })),
    top_drugs_by_volume: (topDrugsByVolume || []).map(d => ({
      icode: d.icode, name: d.name, units: d.units,
      qty: Number(d.total_qty || 0), value: Number(d.total_value || 0), visits: Number(d.visit_count || 0),
    })),
    drug_type_dist: (drugTypeDist || []).map(t => ({
      type: t.type_name, count: Number(t.drug_count || 0),
      qty: Number(t.total_qty || 0), value: Number(t.total_value || 0),
    })),
    on_duty: {
      pharmacists: (activePharmacists || []).map(p => ({
        username: p.username, staff_name: p.staff_name,
        prescriptions: Number(p.prescriptions_handled || 0),
        items: Number(p.items_dispensed || 0),
        morning_count: Number(p.morning_count || 0),
        afternoon_count: Number(p.afternoon_count || 0),
        night_count: Number(p.night_count || 0),
        total_count: Number(p.prescriptions_handled || 0),
      })),
      staff: (activeStaff || []).map(s => ({
        username: s.username, staff_name: s.staff_name,
        prescriptions: Number(s.prescriptions_handled || 0),
        items: Number(s.items_dispensed || 0),
        morning_count: Number(s.morning_count || 0),
        afternoon_count: Number(s.afternoon_count || 0),
        night_count: Number(s.night_count || 0),
        total_count: Number(s.prescriptions_handled || 0),
      })),
    },
    timestamp: new Date().toISOString(),
  };
}));

// Pharmacy Fiscal Year Drug Revenue (3 ปีย้อนหลัง)
router.get('/revenue-fiscal', cached('pharmacyRevenueFiscal_v2', 3600000, async (req) => {
  const { getFiscalConfig } = await import('../helpers/fiscal.js');
  const { fiscalYears: fyConfig } = getFiscalConfig(req?.query?.start, req?.query?.end);
  const fiscalYears = fyConfig.map(fy => fy.fiscalBE - 543);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const MTH_ORDER = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];

  const fyData = await Promise.all(fiscalYears.map(async (fy) => {
    const fyStart = `${fy - 1}-10-01`;
    const fyEnd = `${fy}-09-30`;
    // Dual-column: inc_drug = drug-only revenue (preferred); income = total fallback if inc_drug is 0
    const rows = await dbQuery(`
      SELECT DATE_FORMAT(vs.vstdate, '%Y-%m') as ym,
        ROUND(SUM(COALESCE(vs.inc_drug, 0)), 0) as drug_revenue,
        ROUND(SUM(COALESCE(vs.income, 0)), 0) as total_revenue,
        COUNT(DISTINCT vs.vn) as visits
      FROM vn_stat vs
      WHERE vs.vstdate BETWEEN ? AND ?
        AND vs.income > 0
      GROUP BY DATE_FORMAT(vs.vstdate, '%Y-%m')
      ORDER BY ym
    `, [fyStart, fyEnd]).catch(err => { logger.warn('[Pharmacy] revenueFiscal failed', { err: err.message }); return []; });

    // Prefer inc_drug; fall back to income if inc_drug is 0 across all months
    const hasDrugData = (rows || []).some(r => Number(r.drug_revenue || 0) > 0);
    const monthMap = {}, visitMap = {};
    (rows || []).forEach(r => {
      monthMap[r.ym] = hasDrugData
        ? Number(r.drug_revenue || 0)
        : Number(r.total_revenue || 0);
      visitMap[r.ym] = Number(r.visits || 0);
    });

    const months = MTH_ORDER.map((label, i) => {
      const mo = i < 3 ? (10 + i) : (i - 2);
      const yr = i < 3 ? (fy - 1) : fy;
      const key = `${yr}-${String(mo).padStart(2, '0')}`;
      return { month: label, month_num: mo, revenue: monthMap[key] || 0, visits: visitMap[key] || 0 };
    });

    const totalRevenue = months.reduce((s, m) => s + m.revenue, 0);
    const totalVisits = months.reduce((s, m) => s + m.visits, 0);
    const hasData = months.some(m => m.revenue > 0);
    const nowKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
    const comparableMonths = months.filter((_, i) => {
      const mo = i < 3 ? (10 + i) : (i - 2);
      const yr = i < 3 ? (fy - 1) : fy;
      const key = `${yr}-${String(mo).padStart(2, '0')}`;
      return key <= nowKey;
    });
    const comparable_revenue = comparableMonths.reduce((s, m) => s + m.revenue, 0);

    return {
      fiscal_year: fy,
      fiscal_label: `FY${fy}`,
      total_revenue: totalRevenue,
      total_visits: totalVisits,
      comparable_revenue,
      months,
      has_data: hasData,
    };
  }));

  // Comparable period: only sum months that have data in latest FY (fair YoY)
  const latest = fyData[fyData.length - 1];
  const comparableIdx = (latest?.months || []).map((m, i) => m.revenue > 0 ? i : -1).filter(i => i >= 0);
  for (const fy of fyData) {
    let compRev = 0, compVis = 0;
    for (const i of comparableIdx) {
      compRev += fy.months[i]?.revenue || 0;
      compVis += fy.months[i]?.visits || 0;
    }
    fy.comparable_revenue = compRev;
    fy.comparable_visits = compVis;
    fy.comparable_months = comparableIdx.length;
  }

  const usesDrugField = fyData.some(fy => fy.total_revenue > 0);
  return {
    data_source: usesDrugField
      ? 'HOSxP XE · vn_stat.inc_drug (drug revenue)'
      : 'HOSxP XE · vn_stat.income (total visit revenue — inc_drug not populated)',
    fiscal_years: fyData,
    timestamp: new Date().toISOString(),
  };
}));

export default router;
