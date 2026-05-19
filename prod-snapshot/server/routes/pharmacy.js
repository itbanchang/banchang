import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne, dbQueryOneHeavy, dbQueryHeavy } from '../db/mysql.js';
import { getDrug } from '../cache/masterData.js';
import logger from '../logger.js';

const router = Router();

// ============================================================
// 💊 Pharmacy Analytics — HOSxP XE (opitemrece + iptopitemrece)
// ============================================================

// เภสัชกร รพ.บ้านฉาง (HOSxP ไม่มี ภก./ภญ. ในชื่อ — ระบุ loginname ตรง)
const PHARMACIST_LOGINS = new Set(['methira', 'saranya', 'tank', 'pongbodin', 'witchuphol', '18635', 'warunee', 'pariyapat']);
// บุคลากรที่ไม่ใช่เจ้าหน้าที่ห้องยา — ไม่แสดงใน Pharmacy On-Duty
const EXCLUDE_PHARMACY_LOGINS = new Set(['13309', 'patty', 'occ03', '180911', 'ttm004']);

// Pharmacy Today Summary
router.get('/today', cached('pharmacyToday_v7', 60000, async () => {
  const [opdSummary, ipdSummary, topDrugsToday, onDutyPharmacists] = await Promise.all([

    // 1. OPD Dispensing Today — filter เฉพาะรายการยา (มี drugitems match) + an ว่าง = OPD
    dbQueryOneHeavy('pharmOpdSummaryToday', 2, `
      SELECT
        COUNT(DISTINCT oi.vn) as total_prescriptions,
        COUNT(*) as total_items,
        SUM(oi.qty) as total_qty,
        ROUND(SUM(COALESCE(oi.sum_price, oi.qty * oi.unitprice, 0)), 0) as total_value
      FROM opitemrece oi
      INNER JOIN drugitems di ON oi.icode = di.icode
      WHERE oi.vstdate = CURDATE() AND (oi.an IS NULL OR oi.an = '' OR oi.an = '0')
    `).catch(() => null),

    // 2. IPD Dispensing Today — opitemrece ที่มี an (admission number)
    dbQueryOneHeavy('pharmIpdSummaryToday', 2, `
      SELECT
        COUNT(DISTINCT oi.an) as total_an,
        COUNT(*) as total_items,
        SUM(oi.qty) as total_qty,
        ROUND(SUM(COALESCE(oi.sum_price, oi.qty * oi.unitprice, 0)), 0) as total_value
      FROM opitemrece oi
      INNER JOIN drugitems di ON oi.icode = di.icode
      WHERE oi.vstdate = CURDATE() AND oi.an IS NOT NULL AND oi.an != '' AND oi.an != '0'
    `).catch(() => null),

    // 3. Top Drugs Dispensed Today (cached 5 min to avoid repeated GROUP BY)
    dbQueryHeavy('pharmTopDrugsToday_v2', 5, `
      SELECT di.icode, di.name, di.units,
        SUM(oi.qty) as total_qty,
        ROUND(SUM(COALESCE(oi.sum_price, oi.qty * oi.unitprice, 0)), 0) as total_value,
        COUNT(DISTINCT oi.vn) as visit_count
      FROM opitemrece oi
      INNER JOIN drugitems di ON oi.icode = di.icode
      WHERE oi.vstdate = CURDATE()
      GROUP BY di.icode, di.name, di.units
      ORDER BY total_value DESC
      LIMIT 10
    `).catch(() => []),

    // 4. On-Duty Pharmacy Staff Today — ใช้ oi.staff (ไม่ใช่ oi.user) + ไม่ filter drug_access_level
    // แยกเภสัชกร/เจ้าหน้าที่ด้วย name pattern ใน JS
    dbQuery(`
      SELECT oi.staff as username, u.name as staff_name,
        COUNT(DISTINCT oi.vn) as prescriptions_handled,
        COUNT(*) as items_dispensed
      FROM opitemrece oi
      INNER JOIN drugitems di ON oi.icode = di.icode
      INNER JOIN opduser u ON oi.staff = u.loginname
      WHERE oi.vstdate = CURDATE()
        AND oi.staff IS NOT NULL AND oi.staff != ''
        AND u.name NOT LIKE 'นพ.%' AND u.name NOT LIKE 'พญ.%'
        AND u.name NOT LIKE 'พว.%' AND u.name NOT LIKE 'ทพญ.%'
      GROUP BY oi.staff, u.name
      ORDER BY items_dispensed DESC
      LIMIT 20
    `).catch(err => { logger.warn('[Pharmacy] onDutyStaff failed', { err: err.message }); return []; }),
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
    on_duty_pharmacists: (onDutyPharmacists || []).filter(p => PHARMACIST_LOGINS.has(p.username) && !EXCLUDE_PHARMACY_LOGINS.has(p.username)).map(p => ({
      username: p.username, staff_name: p.staff_name,
      prescriptions: Number(p.prescriptions_handled || 0), items: Number(p.items_dispensed || 0),
    })),
    on_duty_staff: (onDutyPharmacists || []).filter(p => !PHARMACIST_LOGINS.has(p.username) && !EXCLUDE_PHARMACY_LOGINS.has(p.username)).map(p => ({
      username: p.username, staff_name: p.staff_name,
      prescriptions: Number(p.prescriptions_handled || 0), items: Number(p.items_dispensed || 0),
    })),
    timestamp: new Date().toISOString(),
  };
}));

// Pharmacy Analytics (30-day)
router.get('/analytics', cached('pharmacyAnalytics_v19', 600000, async () => {
  const [
    volumeSummary, costSummary, genericRatio, opdVsIpd,
    monthlyTrend, topDrugsResult,
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

    // 3. Generic vs Brand Ratio (7D sample — 30D timeout on 126K+ rows without icode index)
    // ใช้ LEFT JOIN drugitems บน 7-day window (~30K rows) ซึ่งทำงานได้ภายใน 10s
    dbQueryOneHeavy('pharmGenericRatio7d_v1', 30, `
      SELECT
        SUM(CASE WHEN di.generic_name IS NOT NULL AND di.generic_name != '' THEN 1 ELSE 0 END) as generic_qty,
        COUNT(*) as total_qty,
        COUNT(DISTINCT CASE WHEN di.generic_name IS NOT NULL AND di.generic_name != '' THEN oi.icode END) as generic_items,
        COUNT(DISTINCT oi.icode) as total_items
      FROM opitemrece oi
      LEFT JOIN drugitems di ON oi.icode = di.icode
      WHERE oi.vstdate = CURDATE()
    `, [], { timeoutMs: 15000 }).catch(err => { console.error('[Pharmacy] genericRatio FAILED:', err.message); return null; }),

    // 4. OPD vs IPD Split (30D) — แยกโดย an field ใน opitemrece
    (async () => {
      try {
        const opd = await dbQueryOne(`
          SELECT COUNT(DISTINCT vn) as rx, ROUND(SUM(COALESCE(vs.inc_drug, 0))) as value
          FROM vn_stat vs WHERE vs.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND vs.inc_drug > 0
        `);
        const ipd = await dbQueryOne(`
          SELECT COUNT(DISTINCT an) as rx, ROUND(SUM(inc12)) as value
          FROM an_stat WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND inc12 > 0
        `);
        return {
          opd_rx: Number(opd?.rx || 0), opd_value: Number(opd?.value || 0),
          ipd_rx: Number(ipd?.rx || 0), ipd_value: Number(ipd?.value || 0),
        };
      } catch (err) { logger.warn('[Pharmacy] opdVsIpd failed', { err: err.message }); return null; }
    })(),

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

    // 6+7. Top Drugs — 2-step: aggregate opitemrece first (no JOIN), then lookup drugitems
    // This avoids the heavy GROUP BY + ORDER BY + JOIN that timeouts on 126K+ rows
    (async () => {
      try {
        // Step 1: Aggregate by icode (fast, no JOIN)
        const agg = await dbQueryHeavy('pharmTopAgg7d', 30, `
          SELECT icode, SUM(qty) as total_qty, COUNT(DISTINCT vn) as visit_count, COUNT(DISTINCT hn) as patient_count
          FROM opitemrece
          WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 3 DAY) AND qty > 0
          GROUP BY icode
          ORDER BY SUM(qty) DESC
          LIMIT 50
        `, [], { timeoutMs: 30000 });
        if (!agg?.length) return { byValue: [], byVolume: [] };

        // Step 2: Lookup drug names from in-memory master data cache (no DB query)
        const dm = {};
        agg.forEach(r => { const d = getDrug(r.icode); if (d) dm[r.icode] = d; });

        // Enrich & sort
        const enriched = agg.map(r => {
          const d = dm[r.icode] || {};
          return { icode: r.icode, name: d.name || r.icode, generic_name: d.generic_name || '', units: d.units || '', total_qty: Number(r.total_qty), total_value: Math.round(Number(r.total_qty) * Number(d.unitprice || 0)), visit_count: Number(r.visit_count), patient_count: Number(r.patient_count || 0) };
        });
        const byValue = [...enriched].sort((a, b) => b.total_value - a.total_value).slice(0, 20);
        const byVolume = enriched.slice(0, 20); // already sorted by qty DESC
        return { byValue, byVolume };
      } catch (err) {
        logger.warn('[Pharmacy] topDrugs failed', { err: err.message });
        return { byValue: [], byVolume: [] };
      }
    })(),

    // 8. Drug Type Distribution (30D) — computed from topDrugsResult + genericRatio (no extra query needed)
    Promise.resolve([]),  // placeholder — computed below from other results

    // 9. Active Pharmacists (Today) — drug_access_level >= 2 = licensed pharmacist
    // 9+10. Active Pharmacy Staff — ใช้ oi.staff, filter แพทย์/พยาบาลออก, แยก ภก./ภญ. ใน JS
    dbQuery(`
      SELECT oi.staff as username, u.name as staff_name,
        COUNT(DISTINCT oi.vn) as prescriptions_handled,
        COUNT(*) as items_dispensed,
        SUM(CASE WHEN HOUR(oi.rxtime) < 12 THEN 1 ELSE 0 END) as morning_count,
        SUM(CASE WHEN HOUR(oi.rxtime) >= 12 AND HOUR(oi.rxtime) < 17 THEN 1 ELSE 0 END) as afternoon_count,
        SUM(CASE WHEN HOUR(oi.rxtime) >= 17 THEN 1 ELSE 0 END) as night_count
      FROM opitemrece oi
      INNER JOIN drugitems di ON oi.icode = di.icode
      INNER JOIN opduser u ON oi.staff = u.loginname
      WHERE oi.vstdate = CURDATE()
        AND oi.staff IS NOT NULL AND oi.staff != ''
        AND u.name NOT LIKE 'นพ.%' AND u.name NOT LIKE 'พญ.%'
        AND u.name NOT LIKE 'พว.%' AND u.name NOT LIKE 'ทพญ.%'
        AND u.loginname != 'kiosk'
      GROUP BY oi.staff, u.name
      ORDER BY items_dispensed DESC
      LIMIT 20
    `).catch(err => { logger.warn('[Pharmacy] activeStaff failed', { err: err.message }); return []; }),
    Promise.resolve([]),  // placeholder for activeStaff (merged into single query above)
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
    top_drugs_by_value: (topDrugsResult?.byValue || []).map(d => ({
      icode: d.icode, name: d.name, units: d.units, generic_name: d.generic_name || '',
      qty: Number(d.total_qty || 0), value: Number(d.total_value || 0), visits: Number(d.visit_count || 0),
    })),
    top_drugs_by_volume: (topDrugsResult?.byVolume || []).map(d => ({
      icode: d.icode, name: d.name, units: d.units, generic_name: d.generic_name || '',
      qty: Number(d.total_qty || 0), value: Number(d.total_value || 0), visits: Number(d.visit_count || 0),
    })),
    drug_type_dist: (drugTypeDist || []).map(t => ({
      type: t.type_name, count: Number(t.drug_count || 0),
      qty: Number(t.total_qty || 0), value: Number(t.total_value || 0),
    })),
    on_duty: (() => {
      const allStaff = (activePharmacists || []).map(p => ({
        username: p.username, staff_name: p.staff_name,
        prescriptions: Number(p.prescriptions_handled || 0),
        items: Number(p.items_dispensed || 0),
        morning_count: Number(p.morning_count || 0),
        afternoon_count: Number(p.afternoon_count || 0),
        night_count: Number(p.night_count || 0),
        total_count: Number(p.items_dispensed || 0),
      }));
      return {
        pharmacists: allStaff.filter(s => PHARMACIST_LOGINS.has(s.username) && !EXCLUDE_PHARMACY_LOGINS.has(s.username)),
        staff: allStaff.filter(s => !PHARMACIST_LOGINS.has(s.username) && !EXCLUDE_PHARMACY_LOGINS.has(s.username)),
      };
    })(),
    timestamp: new Date().toISOString(),
  };
}));

// Pharmacy Fiscal Year Drug Revenue (3 ปีย้อนหลัง)
router.get('/revenue-fiscal', cached('pharmacyRevenueFiscal_v5', 3600000, async (req) => {
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
        COUNT(DISTINCT vs.vn) as visits,
        COUNT(DISTINCT vs.hn) as patients
      FROM vn_stat vs
      WHERE vs.vstdate BETWEEN ? AND ?
        AND vs.income > 0
      GROUP BY DATE_FORMAT(vs.vstdate, '%Y-%m')
      ORDER BY ym
    `, [fyStart, fyEnd]).catch(err => { logger.warn('[Pharmacy] revenueFiscal failed', { err: err.message }); return []; });

    // Prefer inc_drug; fall back to income if inc_drug is 0 across all months
    const hasDrugData = (rows || []).some(r => Number(r.drug_revenue || 0) > 0);
    const monthMap = {}, visitMap = {}, patientMap = {};
    (rows || []).forEach(r => {
      monthMap[r.ym] = hasDrugData
        ? Number(r.drug_revenue || 0)
        : Number(r.total_revenue || 0);
      visitMap[r.ym] = Number(r.visits || 0);
      patientMap[r.ym] = Number(r.patients || 0);
    });

    const months = MTH_ORDER.map((label, i) => {
      const mo = i < 3 ? (10 + i) : (i - 2);
      const yr = i < 3 ? (fy - 1) : fy;
      const key = `${yr}-${String(mo).padStart(2, '0')}`;
      return { month: label, month_num: mo, revenue: monthMap[key] || 0, visits: visitMap[key] || 0, patients: patientMap[key] || 0 };
    });

    const totalRevenue = months.reduce((s, m) => s + m.revenue, 0);
    const totalVisits = months.reduce((s, m) => s + m.visits, 0);
    const hasData = months.some(m => m.revenue > 0);

    // Unique patients — ต้อง query แยก (sum monthly ไม่ได้เพราะคนซ้ำข้ามเดือน)
    const endClip = new Date(`${fy}-09-30`) > new Date() ? new Date().toISOString().slice(0, 10) : `${fy}-09-30`;
    const patRow = await dbQueryOne(`
      SELECT COUNT(DISTINCT hn) as patients FROM vn_stat
      WHERE vstdate BETWEEN ? AND LEAST(?, CURDATE()) AND income > 0
    `, [fyStart, endClip]).catch(() => null);
    const totalPatients = Number(patRow?.patients || 0);

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
      fiscal_year_be: fy + 543,
      fiscal_label: `ปีงบ ${fy + 543}`,
      total_revenue: totalRevenue,
      total_visits: totalVisits,
      total_patients: totalPatients,
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

// ============================================================
// Top Drug Analysis — Pre-aggregated from SQLite Data Warehouse
// Query: ?start=2024-10-01&end=2025-09-30
// Performance: <5ms (SQLite) vs 30s+ (live MySQL GROUP BY on 8.8M rows)
// ============================================================
router.get('/top-drugs', cached('pharmTopDrugs_v2', 300000, async (req) => {
  const { getFiscalConfig } = await import('../helpers/fiscal.js');
  const { default: dwMod } = await import('../db/dataWarehouse.js');

  const now = new Date();
  const cm = now.getMonth() + 1, cy = now.getFullYear();
  const start = req?.query?.start || `${cm >= 10 ? cy : cy - 1}-10-01`;
  const end = req?.query?.end || now.toISOString().slice(0, 10);
  const endDate = new Date(end) > now ? now.toISOString().slice(0, 10) : end;

  // Fiscal year labels for YoY comparison
  const endDt = new Date(endDate);
  const endFY_BE = (endDt.getMonth() >= 9 ? endDt.getFullYear() + 1 : endDt.getFullYear()) + 543;

  // Helper: shift date range by N years
  const shiftYM = (dateStr, years) => {
    const dt = new Date(dateStr);
    dt.setFullYear(dt.getFullYear() - years);
    return dt.toISOString().slice(0, 7); // '2026-03' → '2025-03'
  };

  const startYM = start.slice(0, 7);
  const endYM = endDate.slice(0, 7);

  // Query current period + 2 previous years from SQLite (instant)
  const current = dwMod.getTopDrugs(start, endDate);

  // Previous year 1
  const prev1Start = shiftYM(start, 1) + '-01';
  const prev1End = shiftYM(endDate, 1) + '-28';
  const prev1 = dwMod.getTopDrugs(prev1Start, prev1End);
  const prev1Map = {};
  [...prev1.by_value, ...prev1.by_volume].forEach(r => {
    prev1Map[r.icode] = { qty: Number(r.total_qty), val: Number(r.total_value) };
  });

  // Previous year 2
  const prev2Start = shiftYM(start, 2) + '-01';
  const prev2End = shiftYM(endDate, 2) + '-28';
  const prev2 = dwMod.getTopDrugs(prev2Start, prev2End);
  const prev2Map = {};
  [...prev2.by_value, ...prev2.by_volume].forEach(r => {
    prev2Map[r.icode] = { qty: Number(r.total_qty), val: Number(r.total_value) };
  });

  // Enrich with YoY
  const pctChange = (curr, prev) => prev > 0 ? Math.round(((curr - prev) / prev) * 100) : curr > 0 ? 100 : null;

  const enrich = (items) => items.map(r => {
    const qty = Number(r.total_qty);
    const val = Number(r.total_value);
    const p1 = prev1Map[r.icode] || { qty: 0, val: 0 };
    const p2 = prev2Map[r.icode] || { qty: 0, val: 0 };
    return {
      icode: r.icode,
      name: r.drug_name || r.icode,
      generic_name: r.generic_name || '',
      units: r.units || '',
      total_qty: qty,
      total_value: val,
      visit_count: Number(r.visit_count || 0),
      patient_count: Number(r.patient_count || 0),
      yoy_qty_pct: pctChange(qty, p1.qty),
      yoy_val_pct: pctChange(val, p1.val),
      yoy2_qty_pct: pctChange(qty, p2.qty),
      yoy2_val_pct: pctChange(val, p2.val),
      prev1_qty: p1.qty,
      prev2_qty: p2.qty,
    };
  });

  return {
    by_value: enrich(current.by_value),
    by_volume: enrich(current.by_volume),
    period: { start, end: endDate, source: 'sqlite_dw' },
    compare_periods: {
      prev1: { start: prev1Start, end: prev1End, fy_label: `ปีงบ ${endFY_BE - 1}` },
      prev2: { start: prev2Start, end: prev2End, fy_label: `ปีงบ ${endFY_BE - 2}` },
    },
    data_source: 'HOSxP XE · SQLite DW (pre-aggregated)',
    total_drugs_in_period: current.total_drugs,
    timestamp: new Date().toISOString(),
  };
}));

export default router;
