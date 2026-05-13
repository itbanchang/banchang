// ============================================================
// BCH 360° Intelligence V.10 — IPD Fiscal Year Report
// รายงานจำนวนผู้ป่วยในเปรียบเทียบ ปีงบประมาณ
// Data: ipt + an_stat + ward (HOSxP XE)
// ============================================================
import { Router } from 'express';
import { dbQuery, dbQueryHeavy, dbQueryOne } from '../db/mysql.js';
import { cached } from '../cache/staleCache.js';
import { KPI } from '../config/kpiThresholds.js';
import logger from '../logger.js';
import { validateQuery } from '../middleware/validate.js';
import { fiscalCompareQuery } from '../middleware/schemas.js';
import { safeError } from '../lib/safeError.js';

const router = Router();

const FISCAL_MONTHS = [
  { idx: 0, mo: 10, label: 'ต.ค.' },
  { idx: 1, mo: 11, label: 'พ.ย.' },
  { idx: 2, mo: 12, label: 'ธ.ค.' },
  { idx: 3, mo: 1, label: 'ม.ค.' },
  { idx: 4, mo: 2, label: 'ก.พ.' },
  { idx: 5, mo: 3, label: 'มี.ค.' },
  { idx: 6, mo: 4, label: 'เม.ย.' },
  { idx: 7, mo: 5, label: 'พ.ค.' },
  { idx: 8, mo: 6, label: 'มิ.ย.' },
  { idx: 9, mo: 7, label: 'ก.ค.' },
  { idx: 10, mo: 8, label: 'ส.ค.' },
  { idx: 11, mo: 9, label: 'ก.ย.' },
];

// ── Helper: get fiscal year start CE from Thai BE year ──
function fyStartCE(beFY) {
  // ปีงบ 2568 → starts Oct 2024 (CE = 2568 - 544)
  return beFY - 544;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /ipd-compare — รายงานผู้ป่วยในเปรียบเทียบปีงบประมาณ
// Query: ?fy1=2568&fy2=2569  or  ?fy1=2568&fy2=2569&start=YYYY-MM-DD&end=YYYY-MM-DD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get(
  '/ipd-compare',
  validateQuery(fiscalCompareQuery),
  cached('report_ipd_compare_v4', 3600000, async req => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const currentFYBE = currentMonth >= 10 ? currentYear + 544 : currentYear + 543;
    const prevFYBE = currentFYBE - 1;

    const customStart = req?.query?.start;
    const customEnd = req?.query?.end;
    const dateRangeMode = customStart && customEnd;

    let fy1BE, fy2BE, fy1Start, fy1End, fy2Start, fy2End;

    if (dateRangeMode) {
      // Date-range mode: fy2 = selected period, fy1 = same window shifted back 1 year
      const cs = new Date(customStart), ce = new Date(customEnd);
      fy2Start = customStart;
      fy2End = customEnd;
      fy1Start = `${cs.getFullYear() - 1}-${String(cs.getMonth() + 1).padStart(2, '0')}-${String(cs.getDate()).padStart(2, '0')}`;
      fy1End = `${ce.getFullYear() - 1}-${String(ce.getMonth() + 1).padStart(2, '0')}-${String(ce.getDate()).padStart(2, '0')}`;
      // Derive fiscal year labels from end date
      const eFY = ce.getMonth() >= 9 ? ce.getFullYear() : ce.getFullYear() - 1;
      fy2BE = eFY + 544;
      fy1BE = fy2BE - 1;
    } else {
      // Legacy fiscal-year mode: fy1/fy2 from query params
      fy1BE = Number(req?.query?.fy1 || prevFYBE);
      fy2BE = Number(req?.query?.fy2 || currentFYBE);
      fy1Start = `${fyStartCE(fy1BE)}-10-01`;
      fy1End = `${fyStartCE(fy1BE) + 1}-09-30`;
      fy2Start = `${fyStartCE(fy2BE)}-10-01`;
      fy2End = `${fyStartCE(fy2BE) + 1}-09-30`;
    }

    // Determine which months of fy2 have data (for partial year comparison)
    const fy2LastMonth =
      fy2BE === currentFYBE ? (currentMonth >= 10 ? currentMonth : currentMonth) : 9; // full year

    const totalBeds = KPI.ipd.total_beds; // 120 เตียงจริง (จาก config)

    const [monthlyData, admitData] = await Promise.all([
      // Discharge-based stats (grouped by dchdate)
      dbQueryHeavy(
        `report_ipd_dc_${fy1BE}_${fy2BE}_${fy1Start}_${fy2End}`,
        120,
        `
      SELECT
        YEAR(i.dchdate) AS yr,
        MONTH(i.dchdate) AS mo,
        COUNT(DISTINCT i.an) AS discharges,
        SUM(DATEDIFF(i.dchdate, i.regdate)) AS total_los,
        ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 2) AS alos,
        ROUND(SUM(COALESCE(i.adjrw, a.rw, 0)), 2) AS sum_adjrw,
        ROUND(AVG(CASE WHEN COALESCE(i.adjrw, a.rw) > 0 THEN COALESCE(i.adjrw, a.rw) END), 2) AS cmi
      FROM ipt i
      LEFT JOIN an_stat a ON i.an = a.an
      WHERE i.dchdate IS NOT NULL
        AND (
          (i.dchdate >= ? AND i.dchdate <= LEAST(?, CURDATE()))
          OR
          (i.dchdate >= ? AND i.dchdate <= LEAST(?, CURDATE()))
        )
      GROUP BY YEAR(i.dchdate), MONTH(i.dchdate)
      ORDER BY yr, mo
    `,
        [fy1Start, fy1End, fy2Start, fy2End],
        { timeoutMs: 25000 }
      ),
      // Admission-based count (grouped by regdate)
      dbQueryHeavy(
        `report_ipd_adm_${fy1BE}_${fy2BE}_${fy1Start}_${fy2End}`,
        120,
        `
      SELECT
        YEAR(i.regdate) AS yr,
        MONTH(i.regdate) AS mo,
        COUNT(DISTINCT i.an) AS admits
      FROM ipt i
      WHERE i.regdate IS NOT NULL
        AND (
          (i.regdate >= ? AND i.regdate <= LEAST(?, CURDATE()))
          OR
          (i.regdate >= ? AND i.regdate <= LEAST(?, CURDATE()))
        )
      GROUP BY YEAR(i.regdate), MONTH(i.regdate)
      ORDER BY yr, mo
    `,
        [fy1Start, fy1End, fy2Start, fy2End],
        { timeoutMs: 25000 }
      ),
    ]);

    // Build admit lookup map: "yr-mo" → admits
    const admitMap = new Map();
    for (const r of (admitData || [])) admitMap.set(`${r.yr}-${r.mo}`, Number(r.admits || 0));

    // ── Build month map for each FY ──
    function buildFYMonths(rows, fyBE) {
      const fyStartYear = fyStartCE(fyBE);
      const result = [];

      for (const fm of FISCAL_MONTHS) {
        const calYear = fm.mo >= 10 ? fyStartYear : fyStartYear + 1;
        const row = (rows || []).find(r => Number(r.yr) === calYear && Number(r.mo) === fm.mo);
        const admitsCount = admitMap.get(`${calYear}-${fm.mo}`) || 0;

        if (row && Number(row.discharges) > 0) {
          const discharges = Number(row.discharges);
          const totalLOS = Number(row.total_los || 0);
          const daysInMonth = new Date(calYear, fm.mo, 0).getDate();
          const occupancyRate =
            totalBeds > 0 ? Math.round((totalLOS / (totalBeds * daysInMonth)) * 10000) / 100 : 0;
          const activeBeds = totalBeds > 0 ? Math.round((totalLOS / daysInMonth) * 100) / 100 : 0;

          result.push({
            month: fm.label,
            month_num: fm.mo,
            fiscal_idx: fm.idx,
            admits: admitsCount,
            discharges,
            total_los: totalLOS,
            alos: Number(row.alos || 0),
            occupancy_rate: occupancyRate,
            active_beds: activeBeds,
            sum_adjrw: Number(row.sum_adjrw || 0),
            cmi: Number(row.cmi || 0),
            has_data: true,
          });
        } else {
          result.push({
            month: fm.label,
            month_num: fm.mo,
            fiscal_idx: fm.idx,
            admits: admitsCount,
            discharges: 0,
            total_los: 0,
            alos: 0,
            occupancy_rate: 0,
            active_beds: 0,
            sum_adjrw: 0,
            cmi: 0,
            has_data: admitsCount > 0,
          });
        }
      }
      return result;
    }

    const fy1Months = buildFYMonths(monthlyData, fy1BE);
    const fy2Months = buildFYMonths(monthlyData, fy2BE);

    // ── Compute totals ──
    function computeTotals(months) {
      const withData = months.filter(m => m.has_data);
      const totalAdmits = withData.reduce((s, m) => s + m.admits, 0);
      const totalDischarges = withData.reduce((s, m) => s + m.discharges, 0);
      const totalLOS = withData.reduce((s, m) => s + m.total_los, 0);
      const totalAdjRW = withData.reduce((s, m) => s + m.sum_adjrw, 0);
      const avgALOS = totalDischarges > 0 ? Math.round((totalLOS / totalDischarges) * 100) / 100 : 0;
      const totalDays = withData.reduce((s, m) => {
        const calYear = m.month_num >= 10 ? fyStartCE(fy1BE) : fyStartCE(fy1BE) + 1;
        return s + new Date(calYear, m.month_num, 0).getDate();
      }, 0);
      const avgOccupancy =
        totalBeds > 0 && totalDays > 0
          ? Math.round((totalLOS / (totalBeds * totalDays)) * 10000) / 100
          : 0;
      const avgActiveBeds = totalDays > 0 ? Math.round((totalLOS / totalDays) * 100) / 100 : 0;
      const avgCMI =
        withData.filter(m => m.cmi > 0).length > 0
          ? Math.round(
              (withData.filter(m => m.cmi > 0).reduce((s, m) => s + m.cmi, 0) /
                withData.filter(m => m.cmi > 0).length) *
                100
            ) / 100
          : 0;

      return {
        months_with_data: withData.length,
        admits: totalAdmits,
        discharges: totalDischarges,
        total_los: totalLOS,
        alos: avgALOS,
        occupancy_rate: avgOccupancy,
        active_beds: avgActiveBeds,
        sum_adjrw: Math.round(totalAdjRW * 100) / 100,
        cmi: avgCMI,
      };
    }

    const fy1Totals = computeTotals(fy1Months);
    const fy2Totals = computeTotals(fy2Months);

    // ── Compare: growth % and difference ──
    const comparison = FISCAL_MONTHS.map((fm, i) => {
      const m1 = fy1Months[i];
      const m2 = fy2Months[i];
      const growth =
        m1.admits > 0
          ? Math.round(((m2.admits - m1.admits) / m1.admits) * 100)
          : m2.admits > 0
            ? 100
            : 0;
      const diff = m2.admits - m1.admits;

      // Month label with BE year (from fy2 side)
      const calYear = fm.mo >= 10 ? fyStartCE(fy2BE) : fyStartCE(fy2BE) + 1;
      const beYear = calYear + 543;
      const monthLabel = `${fm.label} ${beYear}`;

      return {
        month: monthLabel,
        month_num: fm.mo,
        fy1: m1,
        fy2: m2,
        growth_pct: growth,
        admit_diff: diff,
        has_data: m1.has_data || m2.has_data,
      };
    }).filter(c => c.has_data);

    // Overall growth — compare only months where BOTH FYs have data (fair comparison)
    const comparableMonths = comparison.filter(c => c.fy1.has_data && c.fy2.has_data);
    const compFy1Admits = comparableMonths.reduce((s, c) => s + c.fy1.admits, 0);
    const compFy2Admits = comparableMonths.reduce((s, c) => s + c.fy2.admits, 0);
    const overallGrowth =
      compFy1Admits > 0 ? Math.round(((compFy2Admits - compFy1Admits) / compFy1Admits) * 100) : 0;

    // Rebuild totals with comparable period only (so "รวม" row is fair)
    const rebuildTotals = fySide => {
      const cm = comparableMonths.map(c => c[fySide]);
      const admits = cm.reduce((s, m) => s + m.admits, 0);
      const discharges = cm.reduce((s, m) => s + m.discharges, 0);
      const los = cm.reduce((s, m) => s + m.total_los, 0);
      const adjrw = cm.reduce((s, m) => s + m.sum_adjrw, 0);
      const cmis = cm.filter(m => m.cmi > 0);
      return {
        months_with_data: cm.length,
        admits,
        discharges,
        total_los: los,
        alos: discharges > 0 ? Math.round((los / discharges) * 100) / 100 : 0,
        occupancy_rate:
          cm.length > 0
            ? Math.round((cm.reduce((s, m) => s + m.occupancy_rate, 0) / cm.length) * 100) / 100
            : 0,
        active_beds:
          cm.length > 0
            ? Math.round((cm.reduce((s, m) => s + m.active_beds, 0) / cm.length) * 100) / 100
            : 0,
        sum_adjrw: Math.round(adjrw * 100) / 100,
        cmi:
          cmis.length > 0
            ? Math.round((cmis.reduce((s, m) => s + m.cmi, 0) / cmis.length) * 100) / 100
            : 0,
      };
    };

    const comparableFy1 = rebuildTotals('fy1');
    const comparableFy2 = rebuildTotals('fy2');

    const fy1Label = dateRangeMode ? `${fy1Start} — ${fy1End}` : `ปี งบ ${fy1BE}`;
    const fy2Label = dateRangeMode ? `${fy2Start} — ${fy2End}` : `ปี งบ ${fy2BE}`;

    return {
      data_source: 'HOSxP XE · ipt + an_stat',
      timestamp: new Date().toISOString(),
      title: dateRangeMode
        ? `รายงานจำนวนผู้ป่วยใน — ${fy2Start} ถึง ${fy2End} เทียบปีก่อน`
        : `รายงานจำนวนผู้ป่วยในเปรียบเทียบ ปี ${fy1BE}-${fy2BE}`,

      fiscal_years: {
        fy1: { be: fy1BE, label: fy1Label, start: fy1Start, end: fy1End },
        fy2: { be: fy2BE, label: fy2Label, start: fy2Start, end: fy2End },
      },

      custom_range: dateRangeMode ? { start: customStart, end: customEnd } : null,

      total_beds: totalBeds,
      fy1_totals: comparableFy1,
      fy2_totals: comparableFy2,
      overall_growth_pct: overallGrowth,
      overall_admit_diff: compFy2Admits - compFy1Admits,
      comparable_months: comparableMonths.length,
      comparison,
    };
  })
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /opd-compare — รายงานผู้ป่วยนอกเปรียบเทียบปีงบประมาณ
// Query: ?fy1=2568&fy2=2569
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get(
  '/opd-compare',
  validateQuery(fiscalCompareQuery),
  cached('report_opd_compare_v1', 3600000, async req => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const currentFYBE = currentMonth >= 10 ? currentYear + 544 : currentYear + 543;
    const prevFYBE = currentFYBE - 1;

    const fy1BE = Number(req?.query?.fy1 || prevFYBE);
    const fy2BE = Number(req?.query?.fy2 || currentFYBE);

    const fy1Start = `${fyStartCE(fy1BE)}-10-01`;
    const fy1End = `${fyStartCE(fy1BE) + 1}-09-30`;
    const fy2Start = `${fyStartCE(fy2BE)}-10-01`;
    const fy2End = `${fyStartCE(fy2BE) + 1}-09-30`;

    const [monthlyData] = await Promise.all([
      dbQueryHeavy(
        `report_opd_fy_${fy1BE}_${fy2BE}`,
        120,
        `SELECT
           YEAR(vstdate) AS yr,
           MONTH(vstdate) AS mo,
           COUNT(*) AS visits,
           COUNT(DISTINCT hn) AS patients,
           ROUND(SUM(COALESCE(income, 0)), 2) AS revenue,
           ROUND(SUM(COALESCE(inc_drug, 0)), 2) AS drug_cost,
           ROUND(SUM(COALESCE(inc03, 0)), 2) AS lab_cost,
           ROUND(SUM(COALESCE(inc04, 0)), 2) AS xray_cost,
           ROUND(AVG(COALESCE(income, 0)), 2) AS avg_income
         FROM vn_stat
         WHERE (vstdate >= ? AND vstdate <= LEAST(?, CURDATE()))
            OR (vstdate >= ? AND vstdate <= LEAST(?, CURDATE()))
         GROUP BY YEAR(vstdate), MONTH(vstdate)
         ORDER BY yr, mo`,
        [fy1Start, fy1End, fy2Start, fy2End],
        { timeoutMs: 25000 }
      ),
    ]);

    function buildFYMonths(rows, fyBE) {
      const fyStartYear = fyStartCE(fyBE);
      return FISCAL_MONTHS.map(fm => {
        const calYear = fm.mo >= 10 ? fyStartYear : fyStartYear + 1;
        const row = (rows || []).find(r => Number(r.yr) === calYear && Number(r.mo) === fm.mo);
        if (row && Number(row.visits) > 0) {
          return {
            month: fm.label, month_num: fm.mo, fiscal_idx: fm.idx,
            visits: Number(row.visits),
            patients: Number(row.patients),
            revenue: Number(row.revenue || 0),
            drug_cost: Number(row.drug_cost || 0),
            lab_cost: Number(row.lab_cost || 0),
            xray_cost: Number(row.xray_cost || 0),
            avg_income: Number(row.avg_income || 0),
            has_data: true,
          };
        }
        return {
          month: fm.label, month_num: fm.mo, fiscal_idx: fm.idx,
          visits: 0, patients: 0, revenue: 0, drug_cost: 0,
          lab_cost: 0, xray_cost: 0, avg_income: 0, has_data: false,
        };
      });
    }

    const fy1Months = buildFYMonths(monthlyData, fy1BE);
    const fy2Months = buildFYMonths(monthlyData, fy2BE);

    const comparison = FISCAL_MONTHS.map((fm, i) => {
      const m1 = fy1Months[i], m2 = fy2Months[i];
      const growth = m1.visits > 0
        ? Math.round(((m2.visits - m1.visits) / m1.visits) * 100)
        : m2.visits > 0 ? 100 : 0;
      return {
        month: fm.label, month_num: fm.mo,
        fy1: m1, fy2: m2,
        growth_pct: growth,
        visit_diff: m2.visits - m1.visits,
        has_data: m1.has_data || m2.has_data,
      };
    }).filter(c => c.has_data);

    const comparableMonths = comparison.filter(c => c.fy1.has_data && c.fy2.has_data);
    const sumField = (side, field) => comparableMonths.reduce((s, c) => s + c[side][field], 0);

    const fy1Visits = sumField('fy1', 'visits');
    const fy2Visits = sumField('fy2', 'visits');
    const overallGrowth = fy1Visits > 0 ? Math.round(((fy2Visits - fy1Visits) / fy1Visits) * 100) : 0;

    const buildTotals = side => ({
      months_with_data: comparableMonths.length,
      visits: sumField(side, 'visits'),
      patients: sumField(side, 'patients'),
      revenue: Math.round(sumField(side, 'revenue') * 100) / 100,
      drug_cost: Math.round(sumField(side, 'drug_cost') * 100) / 100,
      lab_cost: Math.round(sumField(side, 'lab_cost') * 100) / 100,
      xray_cost: Math.round(sumField(side, 'xray_cost') * 100) / 100,
      avg_income: sumField(side, 'visits') > 0
        ? Math.round((sumField(side, 'revenue') / sumField(side, 'visits')) * 100) / 100 : 0,
    });

    return {
      data_source: 'HOSxP XE · vn_stat',
      timestamp: new Date().toISOString(),
      title: `รายงานจำนวนผู้ป่วยนอกเปรียบเทียบ ปี ${fy1BE}-${fy2BE}`,
      fiscal_years: {
        fy1: { be: fy1BE, label: `ปี งบ ${fy1BE}`, start: fy1Start, end: fy1End },
        fy2: { be: fy2BE, label: `ปี งบ ${fy2BE}`, start: fy2Start, end: fy2End },
      },
      fy1_totals: buildTotals('fy1'),
      fy2_totals: buildTotals('fy2'),
      overall_growth_pct: overallGrowth,
      overall_visit_diff: fy2Visits - fy1Visits,
      comparable_months: comparableMonths.length,
      comparison,
    };
  })
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /opd-compare-daterange — OPD เปรียบเทียบปีก่อน (auto shift -1 year)
// Query: ?start=2025-10-01&end=2026-03-31
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/opd-compare-daterange', validateQuery(fiscalCompareQuery), async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) return res.status(400).json({ error: 'กรุณาระบุ start และ end (YYYY-MM-DD)' });

    const cs = new Date(start), ce = new Date(end);
    const fy2Start = start, fy2End = end;
    const fy1Start = `${cs.getFullYear() - 1}-${String(cs.getMonth() + 1).padStart(2, '0')}-${String(cs.getDate()).padStart(2, '0')}`;
    const fy1End = `${ce.getFullYear() - 1}-${String(ce.getMonth() + 1).padStart(2, '0')}-${String(ce.getDate()).padStart(2, '0')}`;

    const THAI_MO = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

    const [rows] = await Promise.all([
      dbQueryHeavy(
        `report_opd_cmp_${fy1Start}_${fy2End}`,
        60,
        `SELECT
           YEAR(vstdate) AS yr, MONTH(vstdate) AS mo,
           COUNT(*) AS visits, COUNT(DISTINCT hn) AS patients,
           ROUND(SUM(COALESCE(income, 0)), 2) AS revenue,
           ROUND(SUM(COALESCE(inc_drug, 0)), 2) AS drug_cost,
           ROUND(SUM(COALESCE(inc03, 0)), 2) AS lab_cost,
           ROUND(SUM(COALESCE(inc04, 0)), 2) AS xray_cost,
           ROUND(AVG(COALESCE(income, 0)), 2) AS avg_income
         FROM vn_stat
         WHERE (
           (vstdate >= ? AND vstdate <= LEAST(?, CURDATE()))
           OR
           (vstdate >= ? AND vstdate <= LEAST(?, CURDATE()))
         )
         GROUP BY YEAR(vstdate), MONTH(vstdate)
         ORDER BY yr, mo`,
        [fy1Start, fy1End, fy2Start, fy2End],
        { timeoutMs: 25000 }
      ),
    ]);

    // Build month map
    const rowMap = new Map();
    for (const r of (rows || [])) rowMap.set(`${r.yr}-${r.mo}`, r);

    // Determine months to show (based on fy2 range)
    const months = [];
    let d = new Date(cs);
    while (d <= ce) {
      const mo = d.getMonth() + 1;
      const yr = d.getFullYear();
      if (!months.find(m => m.yr === yr && m.mo === mo)) months.push({ yr, mo });
      d.setMonth(d.getMonth() + 1);
    }

    const num = (v) => Number(v || 0);
    const comparison = months.map(({ yr, mo }) => {
      const fy2Row = rowMap.get(`${yr}-${mo}`) || {};
      const fy1Row = rowMap.get(`${yr - 1}-${mo}`) || {};
      const label = `${THAI_MO[mo]} ${yr + 543}`;
      return {
        month: label, month_num: mo,
        fy1: { visits: num(fy1Row.visits), patients: num(fy1Row.patients), revenue: num(fy1Row.revenue), drug_cost: num(fy1Row.drug_cost), lab_cost: num(fy1Row.lab_cost), xray_cost: num(fy1Row.xray_cost), avg_income: num(fy1Row.avg_income), has_data: num(fy1Row.visits) > 0 },
        fy2: { visits: num(fy2Row.visits), patients: num(fy2Row.patients), revenue: num(fy2Row.revenue), drug_cost: num(fy2Row.drug_cost), lab_cost: num(fy2Row.lab_cost), xray_cost: num(fy2Row.xray_cost), avg_income: num(fy2Row.avg_income), has_data: num(fy2Row.visits) > 0 },
        has_data: num(fy1Row.visits) > 0 || num(fy2Row.visits) > 0,
      };
    }).filter(c => c.has_data);

    const comparableMonths = comparison.filter(c => c.fy1.has_data && c.fy2.has_data);
    const sumSide = (side) => {
      const cm = comparableMonths.map(c => c[side]);
      const visits = cm.reduce((s, m) => s + m.visits, 0);
      const patients = cm.reduce((s, m) => s + m.patients, 0);
      const revenue = Math.round(cm.reduce((s, m) => s + m.revenue, 0) * 100) / 100;
      const drug_cost = Math.round(cm.reduce((s, m) => s + m.drug_cost, 0) * 100) / 100;
      const lab_cost = Math.round(cm.reduce((s, m) => s + m.lab_cost, 0) * 100) / 100;
      const xray_cost = Math.round(cm.reduce((s, m) => s + m.xray_cost, 0) * 100) / 100;
      return { visits, patients, revenue, drug_cost, lab_cost, xray_cost, avg_income: visits > 0 ? Math.round((revenue / visits) * 100) / 100 : 0 };
    };
    const fy1Totals = sumSide('fy1');
    const fy2Totals = sumSide('fy2');
    const yoyVisits = fy1Totals.visits > 0 ? Math.round(((fy2Totals.visits - fy1Totals.visits) / fy1Totals.visits) * 100) : 0;

    res.json({
      data_source: 'HOSxP XE · vn_stat',
      timestamp: new Date().toISOString(),
      title: `รายงานจำนวนผู้ป่วยนอก — ${fy2Start} ถึง ${fy2End} เทียบปีก่อน`,
      custom_range: { start: fy2Start, end: fy2End },
      fiscal_years: {
        fy1: { label: `${fy1Start} — ${fy1End}`, start: fy1Start, end: fy1End },
        fy2: { label: `${fy2Start} — ${fy2End}`, start: fy2Start, end: fy2End },
      },
      fy1_totals: fy1Totals,
      fy2_totals: fy2Totals,
      overall_growth_pct: yoyVisits,
      comparable_months: comparableMonths.length,
      comparison,
    });
  } catch (err) {
    logger.error('OPD compare-daterange error', { error: err.message });
    safeError(res, err, 'Report');
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /opd-daterange — รายงานผู้ป่วยนอก ช่วงวันที่กำหนดเอง (legacy)
// Query: ?start=2024-10-01&end=2025-03-27
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/opd-daterange', async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: 'กรุณาระบุ start และ end (YYYY-MM-DD)' });
    }

    // Daily breakdown
    const dailyData = await dbQueryHeavy(
      `report_opd_range_${start}_${end}`,
      60,
      `SELECT
         DATE_FORMAT(vstdate, '%Y-%m-%d') AS date,
         YEAR(vstdate) AS yr,
         MONTH(vstdate) AS mo,
         DAY(vstdate) AS dy,
         COUNT(*) AS visits,
         COUNT(DISTINCT hn) AS patients,
         ROUND(SUM(COALESCE(income, 0)), 2) AS revenue,
         ROUND(SUM(COALESCE(inc_drug, 0)), 2) AS drug_cost,
         ROUND(SUM(COALESCE(inc03, 0)), 2) AS lab_cost,
         ROUND(SUM(COALESCE(inc04, 0)), 2) AS xray_cost,
         ROUND(AVG(COALESCE(income, 0)), 2) AS avg_income
       FROM vn_stat
       WHERE vstdate >= ? AND vstdate <= LEAST(?, CURDATE())
       GROUP BY vstdate
       ORDER BY vstdate`,
      [start, end],
      { timeoutMs: 25000 }
    );

    // Monthly summary
    const monthlyData = await dbQueryHeavy(
      `report_opd_range_monthly_${start}_${end}`,
      60,
      `SELECT
         YEAR(vstdate) AS yr,
         MONTH(vstdate) AS mo,
         COUNT(*) AS visits,
         COUNT(DISTINCT hn) AS patients,
         ROUND(SUM(COALESCE(income, 0)), 2) AS revenue,
         ROUND(SUM(COALESCE(inc_drug, 0)), 2) AS drug_cost,
         ROUND(SUM(COALESCE(inc03, 0)), 2) AS lab_cost,
         ROUND(SUM(COALESCE(inc04, 0)), 2) AS xray_cost,
         ROUND(AVG(COALESCE(income, 0)), 2) AS avg_income
       FROM vn_stat
       WHERE vstdate >= ? AND vstdate <= LEAST(?, CURDATE())
       GROUP BY YEAR(vstdate), MONTH(vstdate)
       ORDER BY yr, mo`,
      [start, end],
      { timeoutMs: 25000 }
    );

    const THAI_MONTHS = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

    const monthly = (monthlyData || []).map(r => ({
      month: `${THAI_MONTHS[Number(r.mo)]} ${Number(r.yr) + 543}`,
      yr: Number(r.yr),
      mo: Number(r.mo),
      visits: Number(r.visits),
      patients: Number(r.patients),
      revenue: Number(r.revenue || 0),
      drug_cost: Number(r.drug_cost || 0),
      lab_cost: Number(r.lab_cost || 0),
      xray_cost: Number(r.xray_cost || 0),
      avg_income: Number(r.avg_income || 0),
    }));

    const totals = {
      visits: monthly.reduce((s, m) => s + m.visits, 0),
      patients: monthly.reduce((s, m) => s + m.patients, 0),
      revenue: Math.round(monthly.reduce((s, m) => s + m.revenue, 0) * 100) / 100,
      drug_cost: Math.round(monthly.reduce((s, m) => s + m.drug_cost, 0) * 100) / 100,
      lab_cost: Math.round(monthly.reduce((s, m) => s + m.lab_cost, 0) * 100) / 100,
      xray_cost: Math.round(monthly.reduce((s, m) => s + m.xray_cost, 0) * 100) / 100,
      avg_income: 0,
    };
    totals.avg_income = totals.visits > 0 ? Math.round((totals.revenue / totals.visits) * 100) / 100 : 0;

    res.json({
      data_source: 'HOSxP XE · vn_stat',
      timestamp: new Date().toISOString(),
      title: `รายงานจำนวนผู้ป่วยนอก ${start} ถึง ${end}`,
      date_range: { start, end },
      monthly,
      daily: (dailyData || []).map(r => ({
        date: r.date,
        visits: Number(r.visits),
        patients: Number(r.patients),
        revenue: Number(r.revenue || 0),
      })),
      totals,
      total_months: monthly.length,
    });
  } catch (err) {
    logger.error('OPD daterange report error', { error: err.message });
    safeError(res, err, 'Report');
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /frax-patients — ดึงผู้ป่วยหญิงที่ตรวจ Bone Density + คำนวณ FRAX
// Query: ?start=2024-10-01&end=2025-03-27
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/frax-patients', async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: 'กรุณาระบุ start และ end (YYYY-MM-DD)' });
    }

    // Query: ผู้ป่วยหญิงที่ตรวจ Bone Density X-Ray ในช่วงวันที่
    const rows = await dbQueryHeavy(
      `frax_patients_${start}_${end}`,
      120,
      `SELECT
         xh.vn,
         p.hn,
         p.cid,
         CONCAT(p.pname, p.fname, ' ', p.lname) AS fullname,
         p.sex,
         TIMESTAMPDIFF(YEAR, p.birthday, xh.order_date) AS age,
         p.mobile_phone_number AS phone,
         xh.order_date AS vstdate,
         DATE_FORMAT(xh.order_date_time, '%H:%i:%s') AS vsttime,
         os.bw AS weight,
         COALESCE(os.height, p.height) AS height,
         o.vstdate AS ovst_date,
         v.pttype,
         pt.name AS pttype_name,
         v.hospmain,
         v.hospsub
       FROM xray_head xh
       INNER JOIN xray_report xr ON xh.vn = xr.vn
       INNER JOIN xray_items xi ON xr.xray_items_code = xi.xray_items_code
       INNER JOIN patient p ON xh.hn = p.hn
       INNER JOIN ovst o ON xh.vn = o.vn
       LEFT JOIN vn_stat v ON xh.vn = v.vn
       LEFT JOIN pttype pt ON v.pttype = pt.pttype
       LEFT JOIN opdscreen os ON xh.vn = os.vn
       WHERE p.sex IN ('2','ญ','หญิง')
         AND xi.xray_items_name LIKE '%bone%density%'
         AND xh.order_date >= ? AND xh.order_date <= LEAST(?, CURDATE())
       GROUP BY xh.vn
       ORDER BY xh.order_date DESC, xh.order_date_time DESC`,
      [start, end],
      { timeoutMs: 30000 }
    );

    // FRAX Log Trilinear Interpolation — Thai Female
    // Source: FRAX Plus API grid (fraxplus.org), 1,210 data points
    const gridPath = new URL('../data/frax_grid.json', import.meta.url);
    const GRID = JSON.parse(await import('fs').then(fs => fs.promises.readFile(gridPath, 'utf8')));
    const AGES = GRID.ages, WEIGHTS = GRID.weights, HEIGHTS = GRID.heights;
    const MOF_LOG = GRID.mof_log, HIP_LOG = GRID.hip_log;

    function findIdx(arr, val) {
      const v = Math.max(arr[0], Math.min(arr[arr.length - 1], val));
      for (let i = 0; i < arr.length - 1; i++) {
        if (v >= arr[i] && v <= arr[i + 1]) {
          return [i, (v - arr[i]) / (arr[i + 1] - arr[i])];
        }
      }
      return [arr.length - 2, 1.0];
    }

    function trilinear(grid, ai, at, wi, wt, hi, ht) {
      const c000 = grid[ai][wi][hi],     c001 = grid[ai][wi][hi+1];
      const c010 = grid[ai][wi+1][hi],   c011 = grid[ai][wi+1][hi+1];
      const c100 = grid[ai+1][wi][hi],   c101 = grid[ai+1][wi][hi+1];
      const c110 = grid[ai+1][wi+1][hi], c111 = grid[ai+1][wi+1][hi+1];
      const c00 = c000*(1-ht) + c001*ht;
      const c01 = c010*(1-ht) + c011*ht;
      const c10 = c100*(1-ht) + c101*ht;
      const c11 = c110*(1-ht) + c111*ht;
      const c0 = c00*(1-wt) + c01*wt;
      const c1 = c10*(1-wt) + c11*wt;
      return c0*(1-at) + c1*at;
    }

    function calcFRAX(age, weight, height) {
      const a = Math.max(40, Math.min(90, Number(age) || 65));
      const w = Math.max(30, Math.min(120, Number(weight) || 60));
      const h = Math.max(100, Math.min(200, Number(height) || 155));
      const [ai, at] = findIdx(AGES, a);
      const [wi, wt] = findIdx(WEIGHTS, w);
      const [hi, ht] = findIdx(HEIGHTS, h);
      const mofLog = trilinear(MOF_LOG, ai, at, wi, wt, hi, ht);
      const hipLog = trilinear(HIP_LOG, ai, at, wi, wt, hi, ht);
      return {
        major: Math.round(Math.max(0, Math.expm1(mofLog)) * 100) / 100,
        hip:   Math.round(Math.max(0, Math.expm1(hipLog)) * 100) / 100,
      };
    }

    // Filter: age >= 60, must have weight & height
    const eligible = (rows || []).filter(r => {
      const age = Number(r.age);
      return age >= 60 && r.weight && r.height;
    });

    const patients = eligible.map((r, idx) => {
      const frax = calcFRAX(r.age, r.weight, r.height);
      return {
        no: idx + 1,
        vn: r.vn,
        hn: r.hn,
        cid: r.cid,
        fullname: r.fullname,
        sex: 'หญิง',
        age: Number(r.age) || null,
        phone: r.phone || '',
        vstdate: r.vstdate,
        vsttime: r.vsttime,
        pttype: r.pttype,
        pttype_name: r.pttype_name,
        hospmain: r.hospmain,
        hospsub: r.hospsub,
        weight: r.weight ? Number(r.weight) : null,
        height: r.height ? Number(r.height) : null,
        bmi: r.weight && r.height ? (r.weight / ((r.height / 100) ** 2)).toFixed(1) : null,
        major_osteoporotic: frax.major,
        hip_fracture: frax.hip,
      };
    });

    res.json({
      data_source: 'HOSxP XE · FRAX Log Trilinear Interpolation (Thai Female, 1210-point grid)',
      timestamp: new Date().toISOString(),
      title: `FRAX — ผู้ป่วยหญิง ≥60 ปี ตรวจ Bone Density (${start} ถึง ${end})`,
      date_range: { start, end },
      total_bone_density: (rows || []).length,
      total: patients.length,
      patients,
    });
  } catch (err) {
    logger.error('FRAX patients report error', { error: err.message });
    safeError(res, err, 'Report');
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /pt-patients — รายงานกายภาพบำบัด (Physical Therapy Patient List)
// Query: ?start=2025-10-01&end=2026-04-07
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/pt-patients', async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: 'กรุณาระบุ start และ end (YYYY-MM-DD)' });
    }

    const rows = await dbQueryHeavy(
      `pt_patients_${start}_${end}`,
      120,
      `SELECT
         o.vn,
         o.hn,
         CONCAT(p.pname, ' ', p.fname, ' ', p.lname) AS pt_name,
         v.age_y,
         p.cid,
         o.vstdate,
         k.department,
         pt.name AS pttype_name,
         CONCAT(
           IFNULL(p.addrpart,''), ' หมู่ ', IFNULL(p.moopart,''), ' ',
           IFNULL(t3.full_name, IFNULL(t2.full_name, t1.full_name))
         ) AS address,
         p.mobile_phone_number,
         c.icd10,
         dt.name AS icd10name,
         COALESCE(v.income, 0) AS income,
         op.cc AS chief_complaint,
         CASE WHEN o.an IS NOT NULL AND o.an != '' THEN 'IPD' ELSE 'OPD' END AS visit_type,
         o.an,
         w.name AS ward_name
       FROM ovst o
       LEFT JOIN patient p ON p.hn = o.hn
       LEFT JOIN thaiaddress t1
         ON t1.chwpart = p.chwpart AND t1.amppart = '00' AND t1.tmbpart = '00'
       LEFT JOIN thaiaddress t2
         ON t2.chwpart = p.chwpart AND t2.amppart = p.amppart AND t2.tmbpart = '00'
       LEFT JOIN thaiaddress t3
         ON t3.chwpart = p.chwpart AND t3.amppart = p.amppart AND t3.tmbpart = p.tmbpart
       LEFT JOIN pttype pt ON pt.pttype = o.pttype
       LEFT JOIN vn_stat v ON v.vn = o.vn
       LEFT JOIN kskdepartment k ON k.depcode = o.main_dep
       LEFT JOIN ovstdiag c ON c.vn = o.vn AND c.diagtype = '1'
       LEFT JOIN icd101 dt ON dt.code = c.icd10
       LEFT JOIN opdscreen op ON op.vn = o.vn
       LEFT JOIN ipt i ON i.an = o.an
       LEFT JOIN ward w ON w.ward = i.ward
       WHERE o.vstdate BETWEEN ? AND LEAST(?, CURDATE())
         AND o.main_dep IN ('034','140','143')
       GROUP BY o.vn
       ORDER BY o.vstdate DESC, o.vsttime DESC
       LIMIT 5000`,
      [start, end],
      { timeoutMs: 30000 }
    );

    const patients = (rows || []).map((r, idx) => ({
      no: idx + 1,
      vn: r.vn,
      hn: r.hn,
      pt_name: r.pt_name,
      age_y: Number(r.age_y) || null,
      cid: r.cid,
      vstdate: r.vstdate,
      department: r.department || 'กายภาพบำบัด',
      pttype_name: r.pttype_name || '',
      address: r.address || '',
      mobile_phone_number: r.mobile_phone_number || '',
      icd10: r.icd10 || '',
      icd10name: r.icd10name || '',
      income: Number(r.income) || 0,
      chief_complaint: r.chief_complaint || '',
      visit_type: r.visit_type || 'OPD',
      an: r.an || '',
      ward_name: r.ward_name || '',
    }));

    const totalIncome = patients.reduce((s, p) => s + p.income, 0);
    const opdPatients = patients.filter(p => p.visit_type === 'OPD');
    const ipdPatients = patients.filter(p => p.visit_type === 'IPD');

    // ── YoY: same period last year (aggregates only) ──
    const yoyStart = `${parseInt(start.slice(0, 4)) - 1}-${start.slice(5)}`;
    const yoyEnd = `${parseInt(end.slice(0, 4)) - 1}-${end.slice(5)}`;
    let yoy = null;
    try {
      const yoyAgg = await dbQueryHeavy(
        `pt_yoy_${yoyStart}_${yoyEnd}`,
        300,
        `SELECT
           COUNT(*) AS total,
           SUM(CASE WHEN o.an IS NOT NULL AND o.an != '' THEN 0 ELSE 1 END) AS opd_count,
           SUM(CASE WHEN o.an IS NOT NULL AND o.an != '' THEN 1 ELSE 0 END) AS ipd_count,
           SUM(COALESCE(v.income, 0)) AS total_income,
           SUM(CASE WHEN o.an IS NOT NULL AND o.an != '' THEN 0 ELSE COALESCE(v.income, 0) END) AS opd_income,
           SUM(CASE WHEN o.an IS NOT NULL AND o.an != '' THEN COALESCE(v.income, 0) ELSE 0 END) AS ipd_income
         FROM ovst o
         LEFT JOIN vn_stat v ON v.vn = o.vn
         WHERE o.vstdate BETWEEN ? AND ?
           AND o.main_dep IN ('034','140','143')`,
        [yoyStart, yoyEnd],
        { timeoutMs: 30000 }
      );
      if (yoyAgg && yoyAgg[0]) {
        yoy = {
          start: yoyStart,
          end: yoyEnd,
          total: Number(yoyAgg[0].total) || 0,
          total_income: Number(yoyAgg[0].total_income) || 0,
          opd_count: Number(yoyAgg[0].opd_count) || 0,
          opd_income: Number(yoyAgg[0].opd_income) || 0,
          ipd_count: Number(yoyAgg[0].ipd_count) || 0,
          ipd_income: Number(yoyAgg[0].ipd_income) || 0,
        };
      }
    } catch (e) {
      logger.warn('PT YoY query failed', { error: e.message });
    }

    res.json({
      data_source: 'HOSxP XE · กายภาพบำบัด (main_dep = 034, 140, 143)',
      timestamp: new Date().toISOString(),
      title: `รายงานกายภาพบำบัด และ PMC (${start} ถึง ${end})`,
      date_range: { start, end },
      total: patients.length,
      total_income: totalIncome,
      opd_count: opdPatients.length,
      opd_income: opdPatients.reduce((s, p) => s + p.income, 0),
      ipd_count: ipdPatients.length,
      ipd_income: ipdPatients.reduce((s, p) => s + p.income, 0),
      yoy,
      patients,
    });
  } catch (err) {
    logger.error('PT patients report error', { error: err.message });
    safeError(res, err, 'Report');
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /staff-patients — รายงานการรับบริการของบุคลากร
// Filter: ผู้รับบริการที่ cid ตรงกับ doctor.active='Y' หรือ officer.officer_active='Y'
// Query: ?start=2025-10-01&end=2026-04-07
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/staff-patients', async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: 'กรุณาระบุ start และ end (YYYY-MM-DD)' });
    }

    const rows = await dbQueryHeavy(
      `staff_patients_${start}_${end}`,
      2,
      `SELECT
         o.vn,
         o.hn,
         CONCAT(p.pname, ' ', p.fname, ' ', p.lname) AS pt_name,
         v.age_y,
         p.cid,
         o.vstdate,
         k.department,
         pt.name AS pttype_name,
         CONCAT(
           IFNULL(p.addrpart,''), ' หมู่ ', IFNULL(p.moopart,''), ' ',
           IFNULL(t3.full_name, IFNULL(t2.full_name, t1.full_name))
         ) AS address,
         p.mobile_phone_number,
         c.icd10,
         dt.name AS icd10name,
         COALESCE(v.income, 0) AS income,
         op.cc AS chief_complaint,
         CASE WHEN o.an IS NOT NULL AND o.an != '' THEN 'IPD' ELSE 'OPD' END AS visit_type,
         o.an,
         w.name AS ward_name,
         CASE
           WHEN EXISTS(SELECT 1 FROM doctor doc WHERE doc.cid = p.cid AND doc.active = 'Y') THEN 'แพทย์'
           WHEN EXISTS(SELECT 1 FROM officer ofc WHERE ofc.officer_cid = p.cid AND ofc.officer_active = 'Y') THEN 'เจ้าหน้าที่'
           ELSE 'อื่นๆ'
         END AS staff_type,
         (SELECT doc.jobposition FROM doctor doc WHERE doc.cid = p.cid AND doc.active = 'Y' LIMIT 1) AS staff_position
       FROM ovst o
       LEFT JOIN patient p ON p.hn = o.hn
       LEFT JOIN thaiaddress t1
         ON t1.chwpart = p.chwpart AND t1.amppart = '00' AND t1.tmbpart = '00'
       LEFT JOIN thaiaddress t2
         ON t2.chwpart = p.chwpart AND t2.amppart = p.amppart AND t2.tmbpart = '00'
       LEFT JOIN thaiaddress t3
         ON t3.chwpart = p.chwpart AND t3.amppart = p.amppart AND t3.tmbpart = p.tmbpart
       LEFT JOIN pttype pt ON pt.pttype = o.pttype
       LEFT JOIN vn_stat v ON v.vn = o.vn
       LEFT JOIN kskdepartment k ON k.depcode = o.main_dep
       LEFT JOIN ovstdiag c ON c.vn = o.vn AND c.diagtype = '1'
       LEFT JOIN icd101 dt ON dt.code = c.icd10
       LEFT JOIN opdscreen op ON op.vn = o.vn
       LEFT JOIN ipt i ON i.an = o.an
       LEFT JOIN ward w ON w.ward = i.ward
       WHERE o.vstdate BETWEEN ? AND LEAST(?, CURDATE())
         AND p.cid IS NOT NULL AND p.cid != ''
         AND (
           EXISTS(SELECT 1 FROM doctor doc WHERE doc.cid = p.cid AND doc.active = 'Y')
           OR EXISTS(SELECT 1 FROM officer ofc WHERE ofc.officer_cid = p.cid AND ofc.officer_active = 'Y')
         )
       GROUP BY o.vn
       ORDER BY o.vstdate DESC, o.vsttime DESC
       LIMIT 5000`,
      [start, end],
      { timeoutMs: 30000 }
    );

    const patients = (rows || []).map((r, idx) => ({
      no: idx + 1,
      vn: r.vn,
      hn: r.hn,
      pt_name: r.pt_name,
      age_y: Number(r.age_y) || null,
      cid: r.cid,
      vstdate: r.vstdate,
      department: r.department || '-',
      pttype_name: r.pttype_name || '',
      address: r.address || '',
      mobile_phone_number: r.mobile_phone_number || '',
      icd10: r.icd10 || '',
      icd10name: r.icd10name || '',
      income: Number(r.income) || 0,
      chief_complaint: r.chief_complaint || '',
      visit_type: r.visit_type || 'OPD',
      an: r.an || '',
      ward_name: r.ward_name || '',
      staff_type: r.staff_type || '',
      staff_position: r.staff_position || '',
    }));

    const totalIncome = patients.reduce((s, p) => s + p.income, 0);
    const opdPatients = patients.filter(p => p.visit_type === 'OPD');
    const ipdPatients = patients.filter(p => p.visit_type === 'IPD');

    // YoY: same period last year
    const yoyStart = `${parseInt(start.slice(0, 4)) - 1}-${start.slice(5)}`;
    const yoyEnd = `${parseInt(end.slice(0, 4)) - 1}-${end.slice(5)}`;
    let yoy = null;
    try {
      const yoyAgg = await dbQueryHeavy(
        `staff_yoy_${yoyStart}_${yoyEnd}`,
        5,
        `SELECT
           COUNT(*) AS total,
           COUNT(DISTINCT o.hn) AS unique_hn,
           SUM(CASE WHEN o.an IS NOT NULL AND o.an != '' THEN 0 ELSE 1 END) AS opd_count,
           SUM(CASE WHEN o.an IS NOT NULL AND o.an != '' THEN 1 ELSE 0 END) AS ipd_count,
           SUM(COALESCE(v.income, 0)) AS total_income,
           SUM(CASE WHEN o.an IS NOT NULL AND o.an != '' THEN 0 ELSE COALESCE(v.income, 0) END) AS opd_income,
           SUM(CASE WHEN o.an IS NOT NULL AND o.an != '' THEN COALESCE(v.income, 0) ELSE 0 END) AS ipd_income
         FROM ovst o
         LEFT JOIN patient p ON p.hn = o.hn
         LEFT JOIN vn_stat v ON v.vn = o.vn
         WHERE o.vstdate BETWEEN ? AND ?
           AND p.cid IS NOT NULL AND p.cid != ''
           AND (
             EXISTS(SELECT 1 FROM doctor doc WHERE doc.cid = p.cid AND doc.active = 'Y')
             OR EXISTS(SELECT 1 FROM officer ofc WHERE ofc.officer_cid = p.cid AND ofc.officer_active = 'Y')
           )`,
        [yoyStart, yoyEnd],
        { timeoutMs: 30000 }
      );
      if (yoyAgg && yoyAgg[0]) {
        yoy = {
          start: yoyStart,
          end: yoyEnd,
          total: Number(yoyAgg[0].total) || 0,
          total_income: Number(yoyAgg[0].total_income) || 0,
          opd_count: Number(yoyAgg[0].opd_count) || 0,
          opd_income: Number(yoyAgg[0].opd_income) || 0,
          ipd_count: Number(yoyAgg[0].ipd_count) || 0,
          ipd_income: Number(yoyAgg[0].ipd_income) || 0,
          unique_hn: Number(yoyAgg[0].unique_hn) || 0,
        };
      }
    } catch (e) {
      logger.warn('Staff YoY query failed', { error: e.message });
    }

    // Total active-staff registry count (denominator for "บุคลากรทั้งหมด" card)
    // Same definition as the patients filter: doctor.active='Y' UNION officer.officer_active='Y'
    let staff_registry_count = 0;
    try {
      const reg = await dbQueryHeavy(
        `staff_registry_count_v1`,
        60,
        `SELECT COUNT(DISTINCT t.cid) AS n FROM (
           SELECT cid FROM doctor  WHERE active='Y' AND cid IS NOT NULL AND cid <> ''
           UNION
           SELECT officer_cid AS cid FROM officer WHERE officer_active='Y' AND officer_cid IS NOT NULL AND officer_cid <> ''
         ) t`,
        [],
        { timeoutMs: 5000 }
      );
      staff_registry_count = Number(reg?.[0]?.n) || 0;
    } catch (e) {
      logger.warn('Staff registry count failed', { error: e.message });
    }

    res.json({
      data_source: 'HOSxP XE · บุคลากร (cid match doctor.active=Y OR officer.officer_active=Y)',
      timestamp: new Date().toISOString(),
      title: `รายงานการรับบริการของบุคลากร (${start} ถึง ${end})`,
      date_range: { start, end },
      total: patients.length,
      total_income: totalIncome,
      opd_count: opdPatients.length,
      opd_income: opdPatients.reduce((s, p) => s + p.income, 0),
      ipd_count: ipdPatients.length,
      ipd_income: ipdPatients.reduce((s, p) => s + p.income, 0),
      staff_registry_count,
      yoy,
      patients,
    });
  } catch (err) {
    logger.error('Staff patients report error', { error: err.message });
    safeError(res, err, 'Report');
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /fluoride-patients — รายงานการเคลือบฟลูออไรด์ 25-59 ปี
// Query: ?start=2025-10-01&end=2026-04-16
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/fluoride-patients', async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: 'กรุณาระบุ start และ end (YYYY-MM-DD)' });
    }

    const rows = await dbQueryHeavy(
      `fluoride_patients_${start}_${end}`,
      120,
      `SELECT
         o.vn,
         o.hn,
         CONCAT(p.pname, ' ', p.fname, ' ', p.lname) AS pt_name,
         v.age_y,
         p.cid,
         o.vstdate,
         k.department,
         pt.name AS pttype_name,
         CONCAT(
           IFNULL(p.addrpart,''), ' หมู่ ', IFNULL(p.moopart,''), ' ',
           IFNULL(t3.full_name, IFNULL(t2.full_name, t1.full_name))
         ) AS address,
         p.mobile_phone_number,
         c.icd10,
         dt.name AS icd10name,
         COALESCE(oi.sum_price, 0) AS fluoride_price,
         COALESCE(v.income, 0) AS income,
         op.cc AS chief_complaint
       FROM ovst o
       INNER JOIN opitemrece oi ON oi.vn = o.vn AND oi.icode = '3004640'
       LEFT JOIN patient p ON p.hn = o.hn
       LEFT JOIN thaiaddress t1
         ON t1.chwpart = p.chwpart AND t1.amppart = '00' AND t1.tmbpart = '00'
       LEFT JOIN thaiaddress t2
         ON t2.chwpart = p.chwpart AND t2.amppart = p.amppart AND t2.tmbpart = '00'
       LEFT JOIN thaiaddress t3
         ON t3.chwpart = p.chwpart AND t3.amppart = p.amppart AND t3.tmbpart = p.tmbpart
       LEFT JOIN pttype pt ON pt.pttype = o.pttype
       LEFT JOIN vn_stat v ON v.vn = o.vn
       LEFT JOIN kskdepartment k ON k.depcode = o.main_dep
       LEFT JOIN ovstdiag c ON c.vn = o.vn AND c.diagtype = '1'
       LEFT JOIN icd101 dt ON dt.code = c.icd10
       LEFT JOIN opdscreen op ON op.vn = o.vn
       WHERE o.vstdate BETWEEN ? AND LEAST(?, CURDATE())
         AND v.age_y BETWEEN 25 AND 59
       GROUP BY o.vn
       ORDER BY o.vstdate DESC, o.vsttime DESC
       LIMIT 5000`,
      [start, end],
      { timeoutMs: 30000 }
    );

    const patients = (rows || []).map((r, idx) => ({
      no: idx + 1,
      vn: r.vn,
      hn: r.hn,
      pt_name: r.pt_name,
      age_y: Number(r.age_y) || null,
      cid: r.cid,
      vstdate: r.vstdate,
      department: r.department || 'ทันตกรรม',
      pttype_name: r.pttype_name || '',
      address: r.address || '',
      mobile_phone_number: r.mobile_phone_number || '',
      icd10: r.icd10 || '',
      icd10name: r.icd10name || '',
      fluoride_price: Number(r.fluoride_price) || 0,
      income: Number(r.income) || 0,
      chief_complaint: r.chief_complaint || '',
    }));

    const totalIncome = patients.reduce((s, p) => s + p.income, 0);
    const totalFluoridePrice = patients.reduce((s, p) => s + p.fluoride_price, 0);

    res.json({
      data_source: 'HOSxP XE · opitemrece icode=3004640 (เคลือบฟลูออไรด์ กลุ่มเสี่ยง) · อายุ 25-59 ปี',
      timestamp: new Date().toISOString(),
      title: `รายงานการเคลือบฟลูออไรด์ 25-59 ปี (${start} ถึง ${end})`,
      date_range: { start, end },
      total: patients.length,
      total_income: totalIncome,
      total_fluoride_price: totalFluoridePrice,
      patients,
    });
  } catch (err) {
    logger.error('Fluoride patients report error', { error: err.message });
    safeError(res, err, 'Report');
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /elderly-cxr — รายงานผู้สูงอายุ 60+ ที่มี CXR (Chest X-Ray)
// Query: ?start=2025-10-01&end=2026-04-16
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/elderly-cxr', async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: 'กรุณาระบุ start และ end (YYYY-MM-DD)' });
    }

    // รหัสค่ารักษา CXR ทั้งหมดจาก HOSxP (NonDrugItems)
    const CXR_ICODES = [
      '3001443', // CXR AP (250)
      '3001390', // CXR Lordotic view (250)
      '3001305', // CXR Lt Lateral (250)
      '3001306', // CXR Lt Lateral decubitus (250)
      '3001361', // CXR PA Upright (250)
      '3001433', // CXR Portable (350)
      '3001622', // CXR Portable (350)
      '3001667', // CXR Portable PA (350)
      '3004476', // CXR Portable PA ตรวจสุขภาพ (350)
      '3001307', // CXR Rt Lateral (250)
      '3001308', // CXR Rt Lateral decubitus (250)
      '3004424', // CXR ตรวจสุขภาพ (250)
      '3004462', // CXR ตรวจสุขภาพ 170 (170)
      '3005210', // CXR ตรวจสุขภาพ วนชัย (200)
    ];
    const icodePlaceholders = CXR_ICODES.map(() => '?').join(',');

    const rows = await dbQueryHeavy(
      `elderly_cxr_${start}_${end}`,
      120,
      `SELECT
         o.vn,
         o.hn,
         CONCAT(p.pname, ' ', p.fname, ' ', p.lname) AS pt_name,
         v.age_y,
         CASE WHEN p.sex IN ('1','ช','ชาย') THEN 'ชาย' ELSE 'หญิง' END AS sex,
         p.cid,
         o.vstdate,
         k.department,
         pt.name AS pttype_name,
         CONCAT(
           IFNULL(p.addrpart,''), ' หมู่ ', IFNULL(p.moopart,''), ' ',
           IFNULL(t3.full_name, IFNULL(t2.full_name, t1.full_name))
         ) AS address,
         p.mobile_phone_number,
         oi.icode AS cxr_icode,
         nd.name AS cxr_name,
         COALESCE(oi.sum_price, 0) AS cxr_price,
         c.icd10,
         dt.name AS icd10name,
         COALESCE(v.income, 0) AS income,
         op.cc AS chief_complaint
       FROM ovst o
       INNER JOIN opitemrece oi ON oi.vn = o.vn AND oi.icode IN (${icodePlaceholders})
       LEFT JOIN nondrugitems nd ON nd.icode = oi.icode
       LEFT JOIN patient p ON p.hn = o.hn
       LEFT JOIN thaiaddress t1
         ON t1.chwpart = p.chwpart AND t1.amppart = '00' AND t1.tmbpart = '00'
       LEFT JOIN thaiaddress t2
         ON t2.chwpart = p.chwpart AND t2.amppart = p.amppart AND t2.tmbpart = '00'
       LEFT JOIN thaiaddress t3
         ON t3.chwpart = p.chwpart AND t3.amppart = p.amppart AND t3.tmbpart = p.tmbpart
       LEFT JOIN pttype pt ON pt.pttype = o.pttype
       LEFT JOIN vn_stat v ON v.vn = o.vn
       LEFT JOIN kskdepartment k ON k.depcode = o.main_dep
       LEFT JOIN ovstdiag c ON c.vn = o.vn AND c.diagtype = '1'
       LEFT JOIN icd101 dt ON dt.code = c.icd10
       LEFT JOIN opdscreen op ON op.vn = o.vn
       WHERE o.vstdate BETWEEN ? AND LEAST(?, CURDATE())
         AND v.age_y >= 60
       GROUP BY o.vn
       ORDER BY o.vstdate DESC, o.vsttime DESC
       LIMIT 5000`,
      [...CXR_ICODES, start, end],
      { timeoutMs: 30000 }
    );

    const patients = (rows || []).map((r, idx) => ({
      no: idx + 1,
      vn: r.vn,
      hn: r.hn,
      pt_name: r.pt_name,
      age_y: Number(r.age_y) || null,
      sex: r.sex || '',
      cid: r.cid,
      vstdate: r.vstdate,
      department: r.department || '',
      pttype_name: r.pttype_name || '',
      address: r.address || '',
      mobile_phone_number: r.mobile_phone_number || '',
      cxr_icode: r.cxr_icode || '',
      cxr_name: r.cxr_name || '',
      cxr_price: Number(r.cxr_price) || 0,
      icd10: r.icd10 || '',
      icd10name: r.icd10name || '',
      income: Number(r.income) || 0,
      chief_complaint: r.chief_complaint || '',
    }));

    const totalIncome = patients.reduce((s, p) => s + p.income, 0);
    const totalCxrPrice = patients.reduce((s, p) => s + p.cxr_price, 0);

    res.json({
      data_source: 'HOSxP XE · opitemrece CXR icode (14 รหัส) · ผู้สูงอายุ 60+ ปี',
      timestamp: new Date().toISOString(),
      title: `รายงานผู้สูงอายุ 60+ ที่มี CXR (${start} ถึง ${end})`,
      date_range: { start, end },
      total: patients.length,
      total_income: totalIncome,
      total_cxr_price: totalCxrPrice,
      patients,
    });
  } catch (err) {
    logger.error('Elderly CXR report error', { error: err.message });
    safeError(res, err, 'Report');
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /resource-usage — รายงานการใช้ทรัพยากรสำคัญ OPD/IPD (Lab, Drug, CT/X-ray)
// Query: ?fy1=2568&fy2=2569
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get(
  '/resource-usage',
  validateQuery(fiscalCompareQuery),
  cached('report_resource_usage_v4', 3600000, async req => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const currentFYBE = currentMonth >= 10 ? currentYear + 544 : currentYear + 543;

    const fy1BE = Number(req?.query?.fy1 || currentFYBE - 1);
    const fy2BE = Number(req?.query?.fy2 || currentFYBE);

    const fy1Start = `${fyStartCE(fy1BE)}-10-01`;
    const fy1End = `${fyStartCE(fy1BE) + 1}-09-30`;
    const fy2Start = `${fyStartCE(fy2BE)}-10-01`;
    const fy2End = `${fyStartCE(fy2BE) + 1}-09-30`;

    const befy = [
      { label: 'fy1', start: fy1Start, end: fy1End },
      { label: 'fy2', start: fy2Start, end: fy2End },
    ];

    const results = {
      data_source: 'HOSxP XE · vn_stat + opitemrece + xray_head + lab_head',
      timestamp: new Date().toISOString(),
      fiscal_years: {
        fy1: { be: fy1BE, start: fy1Start, end: fy1End },
        fy2: { be: fy2BE, start: fy2Start, end: fy2End },
      },
      outpatient: { Lab: null, Drug: null, 'CT / X-ray': null },
      inpatient: { Lab: null, Drug: null, 'CT / X-ray': null },
    };

    // Helper: query with extended timeout for heavy aggregation
    const q1 = (sql, params) =>
      dbQuery(sql, params, { timeoutMs: 30000 })
        .then(rows => rows[0] || {})
        .catch(() => ({}));

    // ── HOSxP XE Income Category Mapping ──
    // vn_stat (OPD):  inc03 = Lab, inc04 = X-ray, inc_drug = Drug
    // an_stat (IPD):  inc03 = Lab, inc04 = X-ray, inc12 = Drug (ค่ายา)

    for (const fy of befy) {
      const [opdRow, ipdRow, opdLabCount, ipdLabCount] = await Promise.all([
        // OPD aggregation from vn_stat (pre-aggregated per visit)
        // NOTE: inc_drug มี data error ช่วง ก.ย.–พ.ย. 2566 (สูงเกินจริง ~300x)
        //       ใช้ cap 25000 ตัด outlier (ค่าปกติ avg=367, max=22871)
        q1(
          `SELECT
             COUNT(CASE WHEN inc03 > 0 THEN 1 END) AS lab_orders,
             ROUND(SUM(COALESCE(inc03, 0))) AS lab_price,
             COUNT(CASE WHEN inc_drug > 0 AND inc_drug <= 25000 THEN 1 END) AS drug_orders,
             ROUND(SUM(CASE WHEN inc_drug > 0 AND inc_drug <= 25000 THEN inc_drug ELSE 0 END)) AS drug_price,
             COUNT(CASE WHEN inc04 > 0 THEN 1 END) AS xray_orders,
             ROUND(SUM(COALESCE(inc04, 0))) AS xray_price
           FROM vn_stat WHERE vstdate BETWEEN ? AND ?`,
          [fy.start, fy.end]
        ),

        // IPD aggregation from an_stat (pre-aggregated per admission)
        q1(
          `SELECT
             COUNT(CASE WHEN inc03 > 0 THEN 1 END) AS lab_orders,
             ROUND(SUM(COALESCE(inc03, 0))) AS lab_price,
             COUNT(CASE WHEN inc12 > 0 THEN 1 END) AS drug_orders,
             ROUND(SUM(COALESCE(inc12, 0))) AS drug_price,
             COUNT(CASE WHEN inc04 > 0 THEN 1 END) AS xray_orders,
             ROUND(SUM(COALESCE(inc04, 0))) AS xray_price
           FROM an_stat WHERE dchdate BETWEEN ? AND ?`,
          [fy.start, fy.end]
        ),

        // OPD Lab: actual order count from lab_head (more accurate than vn_stat visits)
        q1(
          `SELECT COUNT(*) AS cnt FROM lab_head
           WHERE order_date BETWEEN ? AND ? AND vn IS NOT NULL AND vn != ''`,
          [fy.start, fy.end]
        ),

        // IPD Lab: use an_stat count (lab_head vn=NULL is unreliable for IPD)
        Promise.resolve({ cnt: 0 }), // will use ipdRow.lab_orders instead
      ]);

      results.outpatient.Lab = results.outpatient.Lab || {};
      results.outpatient.Drug = results.outpatient.Drug || {};
      results.outpatient['CT / X-ray'] = results.outpatient['CT / X-ray'] || {};
      results.inpatient.Lab = results.inpatient.Lab || {};
      results.inpatient.Drug = results.inpatient.Drug || {};
      results.inpatient['CT / X-ray'] = results.inpatient['CT / X-ray'] || {};

      const prefix = fy.label; // fy1 or fy2

      // OPD
      results.outpatient.Lab[prefix] = {
        orders: Number(opdLabCount.cnt || opdRow.lab_orders || 0),
        total_price: Number(opdRow.lab_price || 0),
      };
      results.outpatient.Drug[prefix] = {
        orders: Number(opdRow.drug_orders || 0),
        total_price: Number(opdRow.drug_price || 0),
      };
      results.outpatient['CT / X-ray'][prefix] = {
        orders: Number(opdRow.xray_orders || 0),
        total_price: Number(opdRow.xray_price || 0),
      };

      // IPD
      results.inpatient.Lab[prefix] = {
        orders: Number(ipdRow.lab_orders || 0),
        total_price: Number(ipdRow.lab_price || 0),
      };
      results.inpatient.Drug[prefix] = {
        orders: Number(ipdRow.drug_orders || 0),
        total_price: Number(ipdRow.drug_price || 0),
      };
      results.inpatient['CT / X-ray'][prefix] = {
        orders: Number(ipdRow.xray_orders || 0),
        total_price: Number(ipdRow.xray_price || 0),
      };
    }

    return results;
  })
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /resource-opd-monthly — ทรัพยากรผู้ป่วยนอก รายเดือน (Lab/Drug/CT-Xray)
// Query: ?fy1=2568&fy2=2569
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get(
  '/resource-opd-monthly',
  validateQuery(fiscalCompareQuery),
  cached('report_resource_opd_monthly_v1', 3600000, async req => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const currentFYBE = currentMonth >= 10 ? currentYear + 544 : currentYear + 543;

    const fy1BE = Number(req?.query?.fy1 || currentFYBE - 1);
    const fy2BE = Number(req?.query?.fy2 || currentFYBE);

    const fy1Start = `${fyStartCE(fy1BE)}-10-01`;
    const fy1End = `${fyStartCE(fy1BE) + 1}-09-30`;
    const fy2Start = `${fyStartCE(fy2BE)}-10-01`;
    const fy2End = `${fyStartCE(fy2BE) + 1}-09-30`;

    const [monthlyData] = await Promise.all([
      dbQueryHeavy(
        `report_res_opd_mo_${fy1BE}_${fy2BE}`,
        120,
        `SELECT
           YEAR(vstdate) AS yr,
           MONTH(vstdate) AS mo,
           COUNT(CASE WHEN inc03 > 0 THEN 1 END) AS lab_orders,
           ROUND(SUM(COALESCE(inc03, 0))) AS lab_price,
           COUNT(CASE WHEN inc_drug > 0 AND inc_drug <= 25000 THEN 1 END) AS drug_orders,
           ROUND(SUM(CASE WHEN inc_drug > 0 AND inc_drug <= 25000 THEN inc_drug ELSE 0 END)) AS drug_price,
           COUNT(CASE WHEN inc04 > 0 THEN 1 END) AS xray_orders,
           ROUND(SUM(COALESCE(inc04, 0))) AS xray_price
         FROM vn_stat
         WHERE (vstdate >= ? AND vstdate <= LEAST(?, CURDATE()))
            OR (vstdate >= ? AND vstdate <= LEAST(?, CURDATE()))
         GROUP BY YEAR(vstdate), MONTH(vstdate)
         ORDER BY yr, mo`,
        [fy1Start, fy1End, fy2Start, fy2End],
        { timeoutMs: 30000 }
      ),
    ]);

    function buildFYMonths(rows, fyBE) {
      const fyStartYear = fyStartCE(fyBE);
      return FISCAL_MONTHS.map(fm => {
        const calYear = fm.mo >= 10 ? fyStartYear : fyStartYear + 1;
        const row = (rows || []).find(r => Number(r.yr) === calYear && Number(r.mo) === fm.mo);
        if (row) {
          return {
            month: fm.label, month_num: fm.mo, fiscal_idx: fm.idx,
            lab_orders: Number(row.lab_orders || 0),
            lab_price: Number(row.lab_price || 0),
            drug_orders: Number(row.drug_orders || 0),
            drug_price: Number(row.drug_price || 0),
            xray_orders: Number(row.xray_orders || 0),
            xray_price: Number(row.xray_price || 0),
            has_data: Number(row.lab_orders || 0) + Number(row.drug_orders || 0) + Number(row.xray_orders || 0) > 0,
          };
        }
        return {
          month: fm.label, month_num: fm.mo, fiscal_idx: fm.idx,
          lab_orders: 0, lab_price: 0, drug_orders: 0, drug_price: 0,
          xray_orders: 0, xray_price: 0, has_data: false,
        };
      });
    }

    const fy1Months = buildFYMonths(monthlyData, fy1BE);
    const fy2Months = buildFYMonths(monthlyData, fy2BE);

    // Build comparison
    const comparison = FISCAL_MONTHS.map((fm, i) => {
      const m1 = fy1Months[i], m2 = fy2Months[i];
      return {
        month: fm.label, month_num: fm.mo,
        fy1: m1, fy2: m2,
        has_data: m1.has_data || m2.has_data,
      };
    });

    // Totals
    const sumFields = (months) => {
      const d = months.filter(m => m.has_data);
      return {
        lab_orders: d.reduce((s, m) => s + m.lab_orders, 0),
        lab_price: d.reduce((s, m) => s + m.lab_price, 0),
        drug_orders: d.reduce((s, m) => s + m.drug_orders, 0),
        drug_price: d.reduce((s, m) => s + m.drug_price, 0),
        xray_orders: d.reduce((s, m) => s + m.xray_orders, 0),
        xray_price: d.reduce((s, m) => s + m.xray_price, 0),
      };
    };

    const comparableMonths = comparison.filter(c => c.fy1.has_data && c.fy2.has_data);
    const buildTotals = side => {
      const cm = comparableMonths.map(c => c[side]);
      return {
        lab_orders: cm.reduce((s, m) => s + m.lab_orders, 0),
        lab_price: cm.reduce((s, m) => s + m.lab_price, 0),
        drug_orders: cm.reduce((s, m) => s + m.drug_orders, 0),
        drug_price: cm.reduce((s, m) => s + m.drug_price, 0),
        xray_orders: cm.reduce((s, m) => s + m.xray_orders, 0),
        xray_price: cm.reduce((s, m) => s + m.xray_price, 0),
      };
    };

    const fy1Totals = buildTotals('fy1');
    const fy2Totals = buildTotals('fy2');

    const pct = (a, b) => b > 0 ? Math.round(((a - b) / b) * 100) : a > 0 ? 100 : 0;

    return {
      data_source: 'HOSxP XE · vn_stat (inc03 · inc_drug · inc04)',
      timestamp: new Date().toISOString(),
      title: `ทรัพยากร ผู้ป่วยนอก (Lab / Drug / CT-Xray) เปรียบเทียบปีงบประมาณ ${fy1BE} vs ${fy2BE}`,
      fiscal_years: {
        fy1: { be: fy1BE, label: `ปี งบ ${fy1BE}`, start: fy1Start, end: fy1End },
        fy2: { be: fy2BE, label: `ปี งบ ${fy2BE}`, start: fy2Start, end: fy2End },
      },
      fy1_totals: fy1Totals,
      fy2_totals: fy2Totals,
      overall_orders_growth_pct: pct(
        fy2Totals.lab_orders + fy2Totals.drug_orders + fy2Totals.xray_orders,
        fy1Totals.lab_orders + fy1Totals.drug_orders + fy1Totals.xray_orders
      ),
      overall_price_growth_pct: pct(
        fy2Totals.lab_price + fy2Totals.drug_price + fy2Totals.xray_price,
        fy1Totals.lab_price + fy1Totals.drug_price + fy1Totals.xray_price
      ),
      comparable_months: comparableMonths.length,
      comparison,
    };
  })
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /resource-ipd-monthly — ทรัพยากรผู้ป่วยใน รายเดือน (Lab/Drug/CT-Xray)
// Query: ?fy1=2568&fy2=2569
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get(
  '/resource-ipd-monthly',
  validateQuery(fiscalCompareQuery),
  cached('report_resource_ipd_monthly_v1', 3600000, async req => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const currentFYBE = currentMonth >= 10 ? currentYear + 544 : currentYear + 543;

    const fy1BE = Number(req?.query?.fy1 || currentFYBE - 1);
    const fy2BE = Number(req?.query?.fy2 || currentFYBE);

    const fy1Start = `${fyStartCE(fy1BE)}-10-01`;
    const fy1End = `${fyStartCE(fy1BE) + 1}-09-30`;
    const fy2Start = `${fyStartCE(fy2BE)}-10-01`;
    const fy2End = `${fyStartCE(fy2BE) + 1}-09-30`;

    // IPD uses an_stat with dchdate, inc03=Lab, inc12=Drug, inc04=X-ray
    const [monthlyData] = await Promise.all([
      dbQueryHeavy(
        `report_res_ipd_mo_${fy1BE}_${fy2BE}`,
        120,
        `SELECT
           YEAR(dchdate) AS yr,
           MONTH(dchdate) AS mo,
           COUNT(CASE WHEN inc03 > 0 THEN 1 END) AS lab_orders,
           ROUND(SUM(COALESCE(inc03, 0))) AS lab_price,
           COUNT(CASE WHEN inc12 > 0 THEN 1 END) AS drug_orders,
           ROUND(SUM(COALESCE(inc12, 0))) AS drug_price,
           COUNT(CASE WHEN inc04 > 0 THEN 1 END) AS xray_orders,
           ROUND(SUM(COALESCE(inc04, 0))) AS xray_price
         FROM an_stat
         WHERE (dchdate >= ? AND dchdate <= LEAST(?, CURDATE()))
            OR (dchdate >= ? AND dchdate <= LEAST(?, CURDATE()))
         GROUP BY YEAR(dchdate), MONTH(dchdate)
         ORDER BY yr, mo`,
        [fy1Start, fy1End, fy2Start, fy2End]
      ),
    ]);

    function buildFYMonths(rows, fyBE) {
      const fyStartYear = fyStartCE(fyBE);
      return FISCAL_MONTHS.map(fm => {
        const calYear = fm.mo >= 10 ? fyStartYear : fyStartYear + 1;
        const row = (rows || []).find(r => Number(r.yr) === calYear && Number(r.mo) === fm.mo);
        if (row) {
          return {
            month: fm.label, month_num: fm.mo, fiscal_idx: fm.idx,
            lab_orders: Number(row.lab_orders || 0), lab_price: Number(row.lab_price || 0),
            drug_orders: Number(row.drug_orders || 0), drug_price: Number(row.drug_price || 0),
            xray_orders: Number(row.xray_orders || 0), xray_price: Number(row.xray_price || 0),
            has_data: Number(row.lab_orders || 0) + Number(row.drug_orders || 0) + Number(row.xray_orders || 0) > 0,
          };
        }
        return {
          month: fm.label, month_num: fm.mo, fiscal_idx: fm.idx,
          lab_orders: 0, lab_price: 0, drug_orders: 0, drug_price: 0,
          xray_orders: 0, xray_price: 0, has_data: false,
        };
      });
    }

    const fy1Months = buildFYMonths(monthlyData, fy1BE);
    const fy2Months = buildFYMonths(monthlyData, fy2BE);

    const comparison = FISCAL_MONTHS.map((fm, i) => ({
      month: fm.label, month_num: fm.mo,
      fy1: fy1Months[i], fy2: fy2Months[i],
      has_data: fy1Months[i].has_data || fy2Months[i].has_data,
    }));

    const comparableMonths = comparison.filter(c => c.fy1.has_data && c.fy2.has_data);
    const buildTotals = side => {
      const cm = comparableMonths.map(c => c[side]);
      return {
        lab_orders: cm.reduce((s, m) => s + m.lab_orders, 0),
        lab_price: cm.reduce((s, m) => s + m.lab_price, 0),
        drug_orders: cm.reduce((s, m) => s + m.drug_orders, 0),
        drug_price: cm.reduce((s, m) => s + m.drug_price, 0),
        xray_orders: cm.reduce((s, m) => s + m.xray_orders, 0),
        xray_price: cm.reduce((s, m) => s + m.xray_price, 0),
      };
    };

    const fy1Totals = buildTotals('fy1');
    const fy2Totals = buildTotals('fy2');
    const pct = (a, b) => b > 0 ? Math.round(((a - b) / b) * 100) : a > 0 ? 100 : 0;

    return {
      data_source: 'HOSxP XE · an_stat (inc03 · inc12 · inc04)',
      timestamp: new Date().toISOString(),
      title: `ทรัพยากร ผู้ป่วยใน (Lab / Drug / CT-Xray) เปรียบเทียบปีงบประมาณ ${fy1BE} vs ${fy2BE}`,
      fiscal_years: {
        fy1: { be: fy1BE, label: `ปี งบ ${fy1BE}`, start: fy1Start, end: fy1End },
        fy2: { be: fy2BE, label: `ปี งบ ${fy2BE}`, start: fy2Start, end: fy2End },
      },
      fy1_totals: fy1Totals,
      fy2_totals: fy2Totals,
      overall_orders_growth_pct: pct(
        fy2Totals.lab_orders + fy2Totals.drug_orders + fy2Totals.xray_orders,
        fy1Totals.lab_orders + fy1Totals.drug_orders + fy1Totals.xray_orders
      ),
      overall_price_growth_pct: pct(
        fy2Totals.lab_price + fy2Totals.drug_price + fy2Totals.xray_price,
        fy1Totals.lab_price + fy1Totals.drug_price + fy1Totals.xray_price
      ),
      comparable_months: comparableMonths.length,
      comparison,
    };
  })
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /mortality-monthly — รายงานการตาย รายเดือน แยก OPD / IPD
// Query: ?fy1=2568&fy2=2569
// IPD death: ipt.dchtype IN ('8','9','08','09')
// OPD death: vn_stat.count_dead > 0 (HOSxP XE dead-at-visit flag)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get(
  '/mortality-monthly',
  validateQuery(fiscalCompareQuery),
  cached('report_mortality_monthly_v1', 3600000, async req => {
    const now = new Date();
    const currentMonth = now.getMonth() + 1;
    const currentYear = now.getFullYear();
    const currentFYBE = currentMonth >= 10 ? currentYear + 544 : currentYear + 543;

    const fy1BE = Number(req?.query?.fy1 || currentFYBE - 1);
    const fy2BE = Number(req?.query?.fy2 || currentFYBE);

    const fy1Start = `${fyStartCE(fy1BE)}-10-01`;
    const fy1End = `${fyStartCE(fy1BE) + 1}-09-30`;
    const fy2Start = `${fyStartCE(fy2BE)}-10-01`;
    const fy2End = `${fyStartCE(fy2BE) + 1}-09-30`;

    // ── IPD Mortality: dchtype IN ('8','9','08','09') from ipt ──
    // ── All Deaths: from death table, split by an IS NULL (OPD) vs an IS NOT NULL (IPD) ──
    const [ipdRows, deathRows] = await Promise.all([
      dbQueryHeavy(
        `report_mortality_ipd_${fy1BE}_${fy2BE}`, 120,
        `SELECT
           YEAR(i.dchdate) AS yr, MONTH(i.dchdate) AS mo,
           COUNT(*) AS total_discharge,
           SUM(CASE WHEN i.dchtype IN ('8','9','08','09') THEN 1 ELSE 0 END) AS deaths,
           SUM(CASE WHEN i.dchtype IN ('8','9','08','09') AND DATEDIFF(i.dchdate, i.regdate) < 2 THEN 1 ELSE 0 END) AS early_deaths
         FROM ipt i
         WHERE i.dchdate IS NOT NULL AND i.ward != '06'
           AND ((i.dchdate >= ? AND i.dchdate <= LEAST(?, CURDATE()))
             OR (i.dchdate >= ? AND i.dchdate <= LEAST(?, CURDATE())))
         GROUP BY YEAR(i.dchdate), MONTH(i.dchdate)
         ORDER BY yr, mo`,
        [fy1Start, fy1End, fy2Start, fy2End]
      ),
      // death table: split OPD (an is null/empty) vs IPD (an is not null)
      dbQueryHeavy(
        `report_mortality_death_${fy1BE}_${fy2BE}`, 120,
        `SELECT
           YEAR(d.death_date) AS yr, MONTH(d.death_date) AS mo,
           SUM(CASE WHEN d.an IS NULL OR d.an = '' THEN 1 ELSE 0 END) AS opd_deaths,
           SUM(CASE WHEN d.an IS NOT NULL AND d.an != '' THEN 1 ELSE 0 END) AS ipd_deaths,
           COUNT(*) AS total_deaths
         FROM death d
         WHERE ((d.death_date >= ? AND d.death_date <= LEAST(?, CURDATE()))
             OR (d.death_date >= ? AND d.death_date <= LEAST(?, CURDATE())))
         GROUP BY YEAR(d.death_date), MONTH(d.death_date)
         ORDER BY yr, mo`,
        [fy1Start, fy1End, fy2Start, fy2End]
      ),
    ]);
    const opdRows = deathRows; // alias for clarity

    function buildFYMonths(ipdData, deathData, fyBE) {
      const fyStartYear = fyStartCE(fyBE);
      return FISCAL_MONTHS.map(fm => {
        const calYear = fm.mo >= 10 ? fyStartYear : fyStartYear + 1;
        const ipd = (ipdData || []).find(r => Number(r.yr) === calYear && Number(r.mo) === fm.mo);
        const dt = (deathData || []).find(r => Number(r.yr) === calYear && Number(r.mo) === fm.mo);
        const ipdDeaths = Number(ipd?.deaths || 0);
        const ipdDischarge = Number(ipd?.total_discharge || 0);
        const opdDeaths = Number(dt?.opd_deaths || 0);
        const totalDeaths = Number(dt?.total_deaths || 0);
        return {
          month: fm.label, month_num: fm.mo, fiscal_idx: fm.idx,
          ipd_discharge: ipdDischarge,
          ipd_deaths: ipdDeaths,
          ipd_early_deaths: Number(ipd?.early_deaths || 0),
          ipd_mortality_rate: ipdDischarge > 0
            ? Math.round((ipdDeaths / ipdDischarge) * 10000) / 100 : 0,
          opd_deaths: opdDeaths,
          total_deaths: totalDeaths || (ipdDeaths + opdDeaths),
          has_data: ipdDischarge > 0 || totalDeaths > 0,
        };
      });
    }

    const fy1Months = buildFYMonths(ipdRows, opdRows, fy1BE);
    const fy2Months = buildFYMonths(ipdRows, opdRows, fy2BE);

    const comparison = FISCAL_MONTHS.map((fm, i) => ({
      month: fm.label, month_num: fm.mo,
      fy1: fy1Months[i], fy2: fy2Months[i],
      has_data: fy1Months[i].has_data || fy2Months[i].has_data,
    }));

    const sumTotals = (months) => {
      const d = months.filter(m => m.has_data);
      return {
        ipd_discharge: d.reduce((s, m) => s + m.ipd_discharge, 0),
        ipd_deaths: d.reduce((s, m) => s + m.ipd_deaths, 0),
        ipd_early_deaths: d.reduce((s, m) => s + m.ipd_early_deaths, 0),
        opd_deaths: d.reduce((s, m) => s + m.opd_deaths, 0),
        total_deaths: d.reduce((s, m) => s + m.total_deaths, 0),
      };
    };

    const comparableMonths = comparison.filter(c => c.fy1.has_data && c.fy2.has_data);
    const buildTotals = side => {
      const t = sumTotals(comparableMonths.map(c => c[side]));
      t.ipd_mortality_rate = t.ipd_discharge > 0 ? Math.round((t.ipd_deaths / t.ipd_discharge) * 10000) / 100 : 0;
      return t;
    };

    const fy1Totals = buildTotals('fy1');
    const fy2Totals = buildTotals('fy2');
    const pct = (a, b) => b > 0 ? Math.round(((a - b) / b) * 100) : a > 0 ? 100 : 0;

    return {
      data_source: 'HOSxP XE · ipt (dchtype 8,9) + death table',
      timestamp: new Date().toISOString(),
      title: `รายงานการตาย OPD / IPD เปรียบเทียบปีงบประมาณ ${fy1BE} vs ${fy2BE}`,
      fiscal_years: {
        fy1: { be: fy1BE, label: `ปี งบ ${fy1BE}`, start: fy1Start, end: fy1End },
        fy2: { be: fy2BE, label: `ปี งบ ${fy2BE}`, start: fy2Start, end: fy2End },
      },
      fy1_totals: fy1Totals,
      fy2_totals: fy2Totals,
      death_growth_pct: pct(fy2Totals.total_deaths, fy1Totals.total_deaths),
      ipd_death_growth_pct: pct(fy2Totals.ipd_deaths, fy1Totals.ipd_deaths),
      comparable_months: comparableMonths.length,
      comparison,
    };
  })
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /ncd-patients — รายงานผู้รับบริการ NCD แยกโรค (รายราย)
// Concept เดียวกับ elderly-cxr: รายชื่อผู้ป่วยพร้อมรายละเอียด
// Query: ?start=YYYY-MM-DD&end=YYYY-MM-DD
// กลุ่มโรค NCD: DM(E1x), HT(I1x), IHD(I20-I259), Stroke(I60-I699), COPD(J40-J479), CKD(N18x)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// CKD-EPI 2009 (without race factor) — eGFR ml/min/1.73m² from serum Cr
function computeEgfr(scr, age, isFemale) {
  if (!scr || !age || scr <= 0) return null;
  const kappa = isFemale ? 0.7 : 0.9;
  const alpha = isFemale ? -0.241 : -0.302;
  const ratio = scr / kappa;
  const minPart = Math.pow(Math.min(ratio, 1), alpha);
  const maxPart = Math.pow(Math.max(ratio, 1), -1.200);
  let egfr = 142 * minPart * maxPart * Math.pow(0.9938, age);
  if (isFemale) egfr *= 1.012;
  return Math.round(egfr);
}

function ckdStageFromEgfr(egfr) {
  if (egfr == null) return null;
  if (egfr >= 90) return 'CKD1';
  if (egfr >= 60) return 'CKD2';
  if (egfr >= 30) return 'CKD3';
  if (egfr >= 15) return 'CKD4';
  return 'CKD5';
}

router.get('/ncd-patients', async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: 'กรุณาระบุ start และ end (YYYY-MM-DD)' });
    }

    const rows = await dbQueryHeavy(
      `ncd_patients_v3_${start}_${end}`,
      120,
      `SELECT
         o.vn,
         o.hn,
         CONCAT(p.pname, ' ', p.fname, ' ', p.lname) AS pt_name,
         v.age_y,
         CASE WHEN p.sex IN ('1','ช','ชาย') THEN 'ชาย' ELSE 'หญิง' END AS sex,
         p.cid,
         o.vstdate,
         o.vsttime,
         k.department,
         pt.name AS pttype_name,
         CONCAT(
           IFNULL(p.addrpart,''), ' หมู่ ', IFNULL(p.moopart,''), ' ',
           IFNULL(t3.full_name, IFNULL(t2.full_name, t1.full_name))
         ) AS address,
         p.mobile_phone_number,
         GROUP_CONCAT(DISTINCT
           CASE
             WHEN UPPER(TRIM(od.icd10)) LIKE 'E11%' THEN 'DM'                     -- Type 2 DM
             WHEN UPPER(TRIM(od.icd10)) LIKE 'E78%' THEN 'DLP'                    -- Hyperlipidemia
             WHEN UPPER(TRIM(od.icd10)) = 'I10' THEN 'HT'                         -- Essential HT (ตรง Top ICD)
             WHEN UPPER(TRIM(od.icd10)) LIKE 'I25%' THEN 'IHD'                    -- Chronic IHD
             WHEN UPPER(TRIM(od.icd10)) LIKE 'I69%' THEN 'Stroke'                 -- Sequelae of stroke
             WHEN UPPER(TRIM(od.icd10)) LIKE 'J44%' THEN 'COPD'                   -- true COPD
             WHEN UPPER(TRIM(od.icd10)) LIKE 'N181%' THEN 'CKD1'
             WHEN UPPER(TRIM(od.icd10)) LIKE 'N182%' THEN 'CKD2'
             WHEN UPPER(TRIM(od.icd10)) LIKE 'N183%' THEN 'CKD3'
             WHEN UPPER(TRIM(od.icd10)) LIKE 'N184%' THEN 'CKD4'
             WHEN UPPER(TRIM(od.icd10)) LIKE 'N185%' THEN 'CKD5'
             WHEN UPPER(TRIM(od.icd10)) LIKE 'N186%' THEN 'CKD5'
             WHEN UPPER(TRIM(od.icd10)) LIKE 'N18%' THEN 'CKD'
           END
           ORDER BY 1 SEPARATOR ', '
         ) AS disease_groups,
         GROUP_CONCAT(DISTINCT UPPER(TRIM(od.icd10)) ORDER BY UPPER(TRIM(od.icd10)) SEPARATOR ', ') AS icd10,
         GROUP_CONCAT(DISTINCT dt.name ORDER BY dt.name SEPARATOR ' | ') AS icd10name,
         GROUP_CONCAT(DISTINCT CONCAT(UPPER(TRIM(od.icd10)), '::', COALESCE(dt.name, ''))
                      ORDER BY 1 SEPARATOR '||') AS icd_pairs,
         COALESCE(v.income, 0) AS income,
         op.cc AS chief_complaint
       FROM ovst o
       LEFT JOIN ovstdiag od ON o.vn = od.vn
       LEFT JOIN icd101 dt ON dt.code = od.icd10
       LEFT JOIN patient p ON p.hn = o.hn
       LEFT JOIN thaiaddress t1
         ON t1.chwpart = p.chwpart AND t1.amppart = '00' AND t1.tmbpart = '00'
       LEFT JOIN thaiaddress t2
         ON t2.chwpart = p.chwpart AND t2.amppart = p.amppart AND t2.tmbpart = '00'
       LEFT JOIN thaiaddress t3
         ON t3.chwpart = p.chwpart AND t3.amppart = p.amppart AND t3.tmbpart = p.tmbpart
       LEFT JOIN pttype pt ON pt.pttype = o.pttype
       LEFT JOIN vn_stat v ON v.vn = o.vn
       LEFT JOIN kskdepartment k ON k.depcode = o.main_dep
       LEFT JOIN opdscreen op ON op.vn = o.vn
       WHERE o.vstdate BETWEEN ? AND LEAST(?, CURDATE())
         AND o.main_dep = '024'
         AND COALESCE(o.an, '') = ''  -- exclude IPD-linked visits (only OPD)
       GROUP BY o.vn
       ORDER BY o.vstdate DESC, o.vsttime DESC
       LIMIT 100000`,
      [start, end],
      { timeoutMs: 60000 }
    );

    // Latest serum Creatinine per patient — look back 365 days from end date
    // for eGFR-based CKD staging.
    // Scoped to the HN list returned by the patients query (avoids hospital-wide scan).
    // Dedupe in JS (HOSxP MariaDB 10.1 has no window functions; ORDER BY DESC + first-seen-wins).
    const uniqueHns = [...new Set((rows || []).map(r => r.hn).filter(Boolean))];
    let crRows = [];
    if (uniqueHns.length > 0) {
      const placeholders = uniqueHns.map(() => '?').join(',');
      crRows = await dbQueryHeavy(
        `ncd_creatinine_v2_${start}_${end}`,
        120,
        `SELECT
           lh.hn,
           CAST(lo.lab_order_result AS DECIMAL(8,3)) AS creatinine,
           lh.order_date
         FROM lab_head lh
         INNER JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
         WHERE lh.order_date BETWEEN DATE_SUB(?, INTERVAL 365 DAY) AND LEAST(?, CURDATE())
           AND lh.hn IN (${placeholders})
           AND (lo.lab_items_name_ref LIKE '%reatinine%'
             OR lo.lab_items_name_ref LIKE 'Cr%'
             OR lo.lab_items_name_ref LIKE '%Cr (S)%'
             OR lo.lab_items_name_ref LIKE '%Cr(S)%'
             OR lo.lab_items_name_ref LIKE '%ครีเอ%')
           AND lo.lab_order_result IS NOT NULL
           AND lo.lab_order_result REGEXP '^[0-9]+(\\\\.[0-9]+)?$'
           AND CAST(lo.lab_order_result AS DECIMAL(8,3)) BETWEEN 0.1 AND 30
         ORDER BY lh.hn, lh.order_date DESC`,
        [end, end, ...uniqueHns],
        { timeoutMs: 30000 }
      ).catch((e) => { logger.warn('NCD creatinine query failed', { error: e.message }); return []; });
    }

    // Map: HN -> latest creatinine (first row per HN due to ORDER BY DESC)
    const crByHn = {};
    for (const r of (crRows || [])) {
      if (!(r.hn in crByHn)) crByHn[r.hn] = Number(r.creatinine);
    }

    const patients = (rows || []).map((r, idx) => {
      const age = Number(r.age_y) || null;
      const isFemale = r.sex === 'หญิง';
      const cr = crByHn[r.hn];
      const egfr = computeEgfr(cr, age, isFemale);
      const computedStage = ckdStageFromEgfr(egfr);

      // If patient has any CKD diagnosis (N18.x), prefer eGFR-based stage
      let groups = (r.disease_groups || '').split(',').map(s => s.trim()).filter(Boolean);
      const hasCkd = groups.some(g => g === 'CKD' || /^CKD[1-5]$/.test(g));
      if (hasCkd && computedStage) {
        groups = groups.filter(g => g !== 'CKD' && !/^CKD[1-5]$/.test(g));
        groups.push(computedStage);
      }
      // Visits to NCD clinic with no NCD-coded diagnosis → 'Other' bucket
      if (groups.length === 0) groups = ['Other'];

      return {
        no: idx + 1,
        vn: r.vn,
        hn: r.hn,
        pt_name: r.pt_name,
        age_y: age,
        sex: r.sex || '',
        cid: r.cid,
        vstdate: r.vstdate,
        vsttime: r.vsttime,
        department: r.department || '',
        pttype_name: r.pttype_name || '',
        address: r.address || '',
        mobile_phone_number: r.mobile_phone_number || '',
        disease_groups: groups.join(', '),
        icd10: r.icd10 || '',
        icd10name: r.icd10name || '',
        icd_pairs: r.icd_pairs || '',
        income: Number(r.income) || 0,
        chief_complaint: r.chief_complaint || '',
        creatinine: cr ?? null,
        egfr: egfr ?? null,
        ckd_stage: hasCkd ? (computedStage || 'CKD') : null,
      };
    });

    // Disease group counts (each patient may have multiple diseases)
    const DISEASES = ['DM', 'HT', 'DLP', 'IHD', 'Stroke', 'COPD', 'CKD1', 'CKD2', 'CKD3', 'CKD4', 'CKD5', 'CKD', 'Other'];
    const diseaseCounts = Object.fromEntries(DISEASES.map(d => [d, 0]));
    for (const p of patients) {
      const groups = (p.disease_groups || '').split(',').map(s => s.trim()).filter(Boolean);
      for (const g of groups) if (g in diseaseCounts) diseaseCounts[g]++;
    }

    // CKD detail stats
    const ckdPatients = patients.filter(p => p.ckd_stage);
    const ckdWithEgfr = ckdPatients.filter(p => p.egfr != null);
    const avgEgfr = ckdWithEgfr.length > 0
      ? Math.round(ckdWithEgfr.reduce((s, p) => s + p.egfr, 0) / ckdWithEgfr.length)
      : null;

    const totalIncome = patients.reduce((s, p) => s + p.income, 0);
    const uniquePatients = new Set(patients.map(p => p.hn)).size;

    res.json({
      data_source: 'HOSxP XE · ovst + ovstdiag (main_dep=024) · NCD groups: DM·HT·DLP·IHD·Stroke·COPD·CKD1-5 · CKD stage จาก eGFR (CKD-EPI 2009)',
      timestamp: new Date().toISOString(),
      title: `รายงานผู้รับบริการ NCD แยกโรค (${start} ถึง ${end})`,
      date_range: { start, end },
      ckd_total_patients: ckdPatients.length,
      ckd_with_egfr: ckdWithEgfr.length,
      ckd_avg_egfr: avgEgfr,
      total: patients.length,
      unique_patients: uniquePatients,
      total_income: totalIncome,
      diseases: DISEASES,
      disease_labels: {
        DM:   'เบาหวาน Type 2 (DM · E11)',
        HT:   'ความดันโลหิตสูง Essential (HT · I10)',
        DLP:  'ไขมันในเลือดสูง (DLP · E78)',
        IHD:  'หัวใจขาดเลือดเรื้อรัง (IHD · I25)',
        Stroke: 'หลอดเลือดสมอง Sequelae (Stroke · I69)',
        COPD: 'ปอดอุดกั้นเรื้อรัง (COPD · J44)',
        CKD1: 'CKD Stage 1 (N18.1 · GFR ≥90)',
        CKD2: 'CKD Stage 2 (N18.2 · GFR 60-89)',
        CKD3: 'CKD Stage 3 (N18.3 · GFR 30-59)',
        CKD4: 'CKD Stage 4 (N18.4 · GFR 15-29)',
        CKD5: 'CKD Stage 5 / ESRD (N18.5-6 · GFR <15)',
        CKD:  'CKD ไม่ระบุ stage (N18.9)',
        Other: 'มาคลินิก NCD แต่ไม่มีรหัสโรค NCD',
      },
      disease_counts: diseaseCounts,
      patients,
    });
  } catch (err) {
    logger.error('NCD patients report error', { error: err.message });
    safeError(res, err, 'Report');
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /ncd-diagnostic — diagnose visit-count gap vs HOSxP
// Query: ?start=YYYY-MM-DD&end=YYYY-MM-DD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/ncd-diagnostic', async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: 'กรุณาระบุ start และ end (YYYY-MM-DD)' });
    }

    const queries = await Promise.all([
      // 1. Raw count from ovst only (most permissive — should match HOSxP)
      dbQueryOne(
        `SELECT COUNT(*) AS cnt FROM ovst
         WHERE vstdate BETWEEN ? AND ? AND main_dep = '024'`,
        [start, end]
      ),
      // 2. Count distinct VN
      dbQueryOne(
        `SELECT COUNT(DISTINCT vn) AS cnt FROM ovst
         WHERE vstdate BETWEEN ? AND ? AND main_dep = '024'`,
        [start, end]
      ),
      // 3. Count distinct VN, vn not null
      dbQueryOne(
        `SELECT COUNT(DISTINCT vn) AS cnt FROM ovst
         WHERE vstdate BETWEEN ? AND ? AND main_dep = '024' AND vn IS NOT NULL`,
        [start, end]
      ),
      // 4. Excluding cancelled (ovstost 54/61/89)
      dbQueryOne(
        `SELECT COUNT(DISTINCT vn) AS cnt FROM ovst
         WHERE vstdate BETWEEN ? AND ? AND main_dep = '024'
           AND (ovstost IS NULL OR ovstost NOT IN ('54','61','89'))`,
        [start, end]
      ),
      // 5. Cancelled only count
      dbQueryOne(
        `SELECT COUNT(DISTINCT vn) AS cnt FROM ovst
         WHERE vstdate BETWEEN ? AND ? AND main_dep = '024'
           AND ovstost IN ('54','61','89')`,
        [start, end]
      ),
      // 6. Status distribution
      dbQuery(
        `SELECT IFNULL(ovstost, 'NULL') AS status, COUNT(*) AS cnt FROM ovst
         WHERE vstdate BETWEEN ? AND ? AND main_dep = '024'
         GROUP BY ovstost ORDER BY cnt DESC`,
        [start, end]
      ),
      // 7. Date < end+1 day (DATETIME edge case test)
      dbQueryOne(
        `SELECT COUNT(DISTINCT vn) AS cnt FROM ovst
         WHERE vstdate >= ? AND vstdate < DATE_ADD(?, INTERVAL 1 DAY) AND main_dep = '024'`,
        [start, end]
      ),
      // 8. Replicate the actual ncd-patients query (LEFT JOIN, GROUP BY)
      dbQueryOne(
        `SELECT COUNT(*) AS cnt FROM (
           SELECT o.vn FROM ovst o
           LEFT JOIN ovstdiag od ON o.vn = od.vn
           LEFT JOIN icd101 dt ON dt.code = od.icd10
           LEFT JOIN patient p ON p.hn = o.hn
           LEFT JOIN pttype pt ON pt.pttype = o.pttype
           LEFT JOIN vn_stat v ON v.vn = o.vn
           LEFT JOIN kskdepartment k ON k.depcode = o.main_dep
           LEFT JOIN opdscreen op ON op.vn = o.vn
           WHERE o.vstdate BETWEEN ? AND LEAST(?, CURDATE())
             AND o.main_dep = '024'
           GROUP BY o.vn
         ) sub`,
        [start, end]
      ),
      // 9. Same as 8 but WITHOUT thaiaddress JOINs (which may multiply rows)
      dbQueryOne(
        `SELECT COUNT(*) AS cnt FROM (
           SELECT o.vn FROM ovst o
           LEFT JOIN ovstdiag od ON o.vn = od.vn
           WHERE o.vstdate BETWEEN ? AND LEAST(?, CURDATE())
             AND o.main_dep = '024'
           GROUP BY o.vn
         ) sub`,
        [start, end]
      ),
      // 9b. WITH thaiaddress JOINs (the actual query) — to confirm thaiaddress is the issue
      dbQueryOne(
        `SELECT COUNT(*) AS cnt FROM (
           SELECT o.vn FROM ovst o
           LEFT JOIN ovstdiag od ON o.vn = od.vn
           LEFT JOIN patient p ON p.hn = o.hn
           LEFT JOIN thaiaddress t1
             ON t1.chwpart = p.chwpart AND t1.amppart = '00' AND t1.tmbpart = '00'
           LEFT JOIN thaiaddress t2
             ON t2.chwpart = p.chwpart AND t2.amppart = p.amppart AND t2.tmbpart = '00'
           LEFT JOIN thaiaddress t3
             ON t3.chwpart = p.chwpart AND t3.amppart = p.amppart AND t3.tmbpart = p.tmbpart
           WHERE o.vstdate BETWEEN ? AND LEAST(?, CURDATE())
             AND o.main_dep = '024'
           GROUP BY o.vn
         ) sub`,
        [start, end]
      ).catch(e => ({ cnt: 0, error: e.message })),
      // 9c. Run the EXACT actual query but only count rows
      dbQueryHeavy(
        `ncd_diag_actual_${start}_${end}`,
        60,
        `SELECT COUNT(*) AS cnt FROM (
           SELECT o.vn FROM ovst o
           LEFT JOIN ovstdiag od ON o.vn = od.vn
           LEFT JOIN icd101 dt ON dt.code = od.icd10
           LEFT JOIN patient p ON p.hn = o.hn
           LEFT JOIN thaiaddress t1
             ON t1.chwpart = p.chwpart AND t1.amppart = '00' AND t1.tmbpart = '00'
           LEFT JOIN thaiaddress t2
             ON t2.chwpart = p.chwpart AND t2.amppart = p.amppart AND t2.tmbpart = '00'
           LEFT JOIN thaiaddress t3
             ON t3.chwpart = p.chwpart AND t3.amppart = p.amppart AND t3.tmbpart = p.tmbpart
           LEFT JOIN pttype pt ON pt.pttype = o.pttype
           LEFT JOIN vn_stat v ON v.vn = o.vn
           LEFT JOIN kskdepartment k ON k.depcode = o.main_dep
           LEFT JOIN opdscreen op ON op.vn = o.vn
           WHERE o.vstdate BETWEEN ? AND LEAST(?, CURDATE())
             AND o.main_dep = '024'
           GROUP BY o.vn
           ORDER BY o.vstdate DESC, o.vsttime DESC
           LIMIT 5000
         ) sub`,
        [start, end],
        { timeoutMs: 30000 }
      ).then(r => r[0] || { cnt: 0 }).catch(e => ({ cnt: 0, error: e.message })),
      // 10. Daily breakdown of main_dep=024 visits
      dbQuery(
        `SELECT vstdate, COUNT(DISTINCT vn) AS cnt FROM ovst
         WHERE vstdate BETWEEN ? AND ? AND main_dep = '024'
         GROUP BY vstdate ORDER BY vstdate`,
        [start, end]
      ),
      // 11. VNs with NULL hn (would break joins differently)
      dbQueryOne(
        `SELECT COUNT(DISTINCT vn) AS cnt FROM ovst
         WHERE vstdate BETWEEN ? AND ? AND main_dep = '024' AND (hn IS NULL OR hn = '')`,
        [start, end]
      ),
      // 12. vstdate column type detection
      dbQuery(
        `SELECT COLUMN_NAME, DATA_TYPE FROM INFORMATION_SCHEMA.COLUMNS
         WHERE TABLE_SCHEMA = DATABASE() AND TABLE_NAME = 'ovst'
           AND COLUMN_NAME IN ('vstdate', 'vsttime', 'vn', 'main_dep', 'ovstost')`
      ).catch(() => []),
    ]);

    const [
      total_ovst_count,
      total_distinct_vn,
      vn_not_null,
      excluding_cancelled,
      cancelled_only,
      status_dist,
      datetime_safe_count,
      ncd_patients_replica,
      no_address_join,
      with_address_join,
      exact_actual_query,
      daily_breakdown,
      null_hn_count,
      column_types,
    ] = queries;

    res.json({
      data_source: 'HOSxP XE · ovst diagnostic',
      timestamp: new Date().toISOString(),
      query: { start, end },
      counts: {
        '1_total_ovst_count_raw': Number(total_ovst_count?.cnt || 0),
        '2_distinct_vn': Number(total_distinct_vn?.cnt || 0),
        '3_distinct_vn_not_null': Number(vn_not_null?.cnt || 0),
        '4_excluding_cancelled_status': Number(excluding_cancelled?.cnt || 0),
        '5_cancelled_only': Number(cancelled_only?.cnt || 0),
        '6_datetime_safe_range': Number(datetime_safe_count?.cnt || 0),
        '7_ncd_patients_replica_no_address': Number(ncd_patients_replica?.cnt || 0),
        '8_ncd_patients_no_address_joins': Number(no_address_join?.cnt || 0),
        '9a_with_3_thaiaddress_joins': Number(with_address_join?.cnt || 0),
        '9b_with_thaiaddress_error': with_address_join?.error || null,
        '9c_exact_actual_query_with_limit': Number(exact_actual_query?.cnt || 0),
        '9d_exact_query_error': exact_actual_query?.error || null,
        '10_null_hn_count': Number(null_hn_count?.cnt || 0),
      },
      status_distribution: (status_dist || []).map(r => ({
        ovstost: r.status,
        count: Number(r.cnt || 0),
      })),
      column_types: (column_types || []).map(c => ({
        column: c.COLUMN_NAME,
        type: c.DATA_TYPE,
      })),
      daily_breakdown: (daily_breakdown || []).map(r => ({
        date: r.vstdate,
        count: Number(r.cnt || 0),
      })),
      analysis: {
        hosxp_expected: 2113,
        gap_explanation: 'เปรียบเทียบ count ในแต่ละข้อ — ข้อที่ใกล้ HOSxP คือ filter ที่ HOSxP ใช้',
      },
    });
  } catch (err) {
    logger.error('NCD diagnostic error', { error: err.message });
    safeError(res, err, 'Report');
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /imaging-services — รายงานบริการ XRAY/CT/Portable/BMD
// Concept เดียวกับ NCD แยกโรค: รายชื่อผู้ป่วยพร้อมรายละเอียด
// Query: ?start=YYYY-MM-DD&end=YYYY-MM-DD
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/imaging-services', async (req, res) => {
  try {
    const { start, end } = req.query;
    if (!start || !end) {
      return res.status(400).json({ error: 'กรุณาระบุ start และ end (YYYY-MM-DD)' });
    }

    const rows = await dbQueryHeavy(
      `imaging_services_${start}_${end}`,
      120,
      `SELECT
         o.vn,
         o.hn,
         CONCAT(p.pname, ' ', p.fname, ' ', p.lname) AS pt_name,
         v.age_y,
         CASE WHEN p.sex IN ('1','ช','ชาย') THEN 'ชาย' ELSE 'หญิง' END AS sex,
         p.cid,
         o.vstdate,
         o.vsttime,
         k.department,
         pt.name AS pttype_name,
         CONCAT(
           IFNULL(p.addrpart,''), ' หมู่ ', IFNULL(p.moopart,''), ' ',
           IFNULL(t3.full_name, IFNULL(t2.full_name, t1.full_name))
         ) AS address,
         p.mobile_phone_number,
         GROUP_CONCAT(DISTINCT
           CASE
             WHEN nd.name LIKE '%BMD%' OR nd.name LIKE '%Bone Density%' OR nd.name LIKE '%Bone Densitometry%' OR nd.name LIKE '%DEXA%' THEN 'BMD'
             WHEN nd.name LIKE '%CT %' OR nd.name LIKE '%CT-%' OR nd.name LIKE 'CT%' OR nd.name LIKE '%Computed Tomography%' THEN 'CT'
             WHEN nd.name LIKE '%Portable%' OR nd.name LIKE '%Mobile%' OR nd.name LIKE '%บีดไซด์%' THEN 'Portable'
             WHEN nd.name LIKE '%X-ray%' OR nd.name LIKE '%X-Ray%' OR nd.name LIKE '%XRAY%' OR nd.name LIKE '%CXR%' OR nd.name LIKE 'X-%' THEN 'XRAY'
           END
           ORDER BY 1 SEPARATOR ', '
         ) AS service_groups,
         GROUP_CONCAT(DISTINCT nd.name ORDER BY nd.name SEPARATOR ' | ') AS service_names,
         GROUP_CONCAT(DISTINCT oi.icode ORDER BY oi.icode SEPARATOR ', ') AS service_codes,
         ROUND(SUM(COALESCE(oi.sum_price, 0)), 2) AS imaging_price,
         GROUP_CONCAT(DISTINCT od.icd10 ORDER BY od.icd10 SEPARATOR ', ') AS icd10,
         GROUP_CONCAT(DISTINCT dt.name ORDER BY dt.name SEPARATOR ' | ') AS icd10name,
         GROUP_CONCAT(DISTINCT CONCAT(od.icd10, '::', COALESCE(dt.name, ''))
                      ORDER BY 1 SEPARATOR '||') AS icd_pairs,
         COALESCE(v.income, 0) AS income,
         op.cc AS chief_complaint
       FROM ovst o
       INNER JOIN opitemrece oi ON oi.vn = o.vn
       INNER JOIN nondrugitems nd ON nd.icode = oi.icode
         AND (
           nd.name LIKE '%BMD%' OR nd.name LIKE '%Bone Density%' OR nd.name LIKE '%Bone Densitometry%' OR nd.name LIKE '%DEXA%'
           OR nd.name LIKE '%CT %' OR nd.name LIKE '%CT-%' OR nd.name LIKE 'CT%' OR nd.name LIKE '%Computed Tomography%'
           OR nd.name LIKE '%Portable%' OR nd.name LIKE '%Mobile%' OR nd.name LIKE '%บีดไซด์%'
           OR nd.name LIKE '%X-ray%' OR nd.name LIKE '%X-Ray%' OR nd.name LIKE '%XRAY%' OR nd.name LIKE '%CXR%' OR nd.name LIKE 'X-%'
         )
       LEFT JOIN ovstdiag od ON od.vn = o.vn AND od.diagtype = '1'
       LEFT JOIN icd101 dt ON dt.code = od.icd10
       LEFT JOIN patient p ON p.hn = o.hn
       LEFT JOIN thaiaddress t1
         ON t1.chwpart = p.chwpart AND t1.amppart = '00' AND t1.tmbpart = '00'
       LEFT JOIN thaiaddress t2
         ON t2.chwpart = p.chwpart AND t2.amppart = p.amppart AND t2.tmbpart = '00'
       LEFT JOIN thaiaddress t3
         ON t3.chwpart = p.chwpart AND t3.amppart = p.amppart AND t3.tmbpart = p.tmbpart
       LEFT JOIN pttype pt ON pt.pttype = o.pttype
       LEFT JOIN vn_stat v ON v.vn = o.vn
       LEFT JOIN kskdepartment k ON k.depcode = o.main_dep
       LEFT JOIN opdscreen op ON op.vn = o.vn
       WHERE o.vstdate BETWEEN ? AND LEAST(?, CURDATE())
       GROUP BY o.vn
       ORDER BY o.vstdate DESC, o.vsttime DESC
       LIMIT 5000`,
      [start, end],
      { timeoutMs: 30000 }
    );

    const SERVICES = ['XRAY', 'CT', 'Portable', 'BMD'];
    const patients = (rows || []).map((r, idx) => {
      const groups = (r.service_groups || '').split(',').map(s => s.trim()).filter(Boolean);
      return {
        no: idx + 1,
        vn: r.vn,
        hn: r.hn,
        pt_name: r.pt_name,
        age_y: Number(r.age_y) || null,
        sex: r.sex || '',
        cid: r.cid,
        vstdate: r.vstdate,
        vsttime: r.vsttime,
        department: r.department || '',
        pttype_name: r.pttype_name || '',
        address: r.address || '',
        mobile_phone_number: r.mobile_phone_number || '',
        service_groups: groups.join(', '),
        service_names: r.service_names || '',
        service_codes: r.service_codes || '',
        imaging_price: Number(r.imaging_price) || 0,
        icd10: r.icd10 || '',
        icd10name: r.icd10name || '',
        icd_pairs: r.icd_pairs || '',
        income: Number(r.income) || 0,
        chief_complaint: r.chief_complaint || '',
      };
    });

    const serviceCounts = Object.fromEntries(SERVICES.map(s => [s, 0]));
    let totalImagingPrice = 0;
    for (const p of patients) {
      const groups = (p.service_groups || '').split(',').map(s => s.trim()).filter(Boolean);
      for (const g of groups) if (g in serviceCounts) serviceCounts[g]++;
      totalImagingPrice += p.imaging_price;
    }
    const totalIncome = patients.reduce((s, p) => s + p.income, 0);
    const uniquePatients = new Set(patients.map(p => p.hn)).size;

    res.json({
      data_source: 'HOSxP XE · opitemrece + nondrugitems · จำแนก XRAY / CT / Portable / BMD ตาม nd.name',
      timestamp: new Date().toISOString(),
      title: `รายงานบริการ XRAY / CT / Portable / BMD (${start} ถึง ${end})`,
      date_range: { start, end },
      total: patients.length,
      unique_patients: uniquePatients,
      total_income: totalIncome,
      total_imaging_price: totalImagingPrice,
      services: SERVICES,
      service_labels: {
        XRAY:     'X-Ray ทั่วไป (Plain Radiography)',
        CT:       'CT Scan (Computed Tomography)',
        Portable: 'Portable X-Ray (เคลื่อนที่)',
        BMD:      'BMD (Bone Mineral Density · DEXA)',
      },
      service_counts: serviceCounts,
      patients,
    });
  } catch (err) {
    logger.error('Imaging services report error', { error: err.message });
    safeError(res, err, 'Report');
  }
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /pttype-services — รายงานการรับบริการแยกกลุ่มสิทธิ์
// Query: ?from=YYYY-MM-DD&to=YYYY-MM-DD (default: current Thai fiscal year)
// Returns: per-pttype OPD/IPD/ER visit count + unique HN + monthly trend
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/pttype-services', async (req, res) => {
  try {
    const now = new Date();
    const yy = now.getFullYear();
    const mo = now.getMonth() + 1;
    const fyStart = mo >= 10 ? `${yy}-10-01` : `${yy - 1}-10-01`;
    const today = now.toISOString().slice(0, 10);
    const from = (req.query.from && /^\d{4}-\d{2}-\d{2}$/.test(req.query.from)) ? req.query.from : fyStart;
    const to = (req.query.to && /^\d{4}-\d{2}-\d{2}$/.test(req.query.to)) ? req.query.to : today;

    const cacheKey = `report_pttype_services_v1_${from}_${to}`;

    // Age group classifier SQL fragment (consistent across all channels)
    const AGE_CASE = (dob, refdate) => `
      CASE
        WHEN ${dob} IS NULL THEN 'ไม่ระบุ'
        WHEN TIMESTAMPDIFF(YEAR, ${dob}, ${refdate}) <= 14 THEN 'วัยเด็ก (0-14 ปี)'
        WHEN TIMESTAMPDIFF(YEAR, ${dob}, ${refdate}) <= 24 THEN 'วัยรุ่น/วัยหนุ่มสาว (15-24 ปี)'
        WHEN TIMESTAMPDIFF(YEAR, ${dob}, ${refdate}) <= 59 THEN 'วัยแรงงาน (25-59 ปี)'
        ELSE 'วัยสูงอายุ (60 ปีขึ้นไป)'
      END
    `;
    const AGE_ORDER = ['วัยเด็ก (0-14 ปี)', 'วัยรุ่น/วัยหนุ่มสาว (15-24 ปี)', 'วัยแรงงาน (25-59 ปี)', 'วัยสูงอายุ (60 ปีขึ้นไป)', 'ไม่ระบุ'];

    const [opdSummary, ipdSummary, erSummary, opdTrend, ipdTrend, erTrend, opdAge, ipdAge, erAge] = await Promise.all([
      // OPD per pttype
      dbQueryHeavy(`${cacheKey}_opd`, 30, `
        SELECT
          o.pttype AS pttype,
          pt.name AS pttype_name,
          COUNT(*) AS visits,
          COUNT(DISTINCT o.hn) AS unique_hn
        FROM ovst o
        LEFT JOIN pttype pt ON pt.pttype = o.pttype
        WHERE o.vstdate BETWEEN ? AND ?
        GROUP BY o.pttype, pt.name
        ORDER BY visits DESC
      `, [from, to], { timeoutMs: 30000 }),
      // IPD per pttype
      dbQueryHeavy(`${cacheKey}_ipd`, 30, `
        SELECT
          a.pttype AS pttype,
          pt.name AS pttype_name,
          COUNT(*) AS admissions,
          COUNT(DISTINCT a.hn) AS unique_hn
        FROM an_stat a
        LEFT JOIN pttype pt ON pt.pttype = a.pttype
        WHERE a.regdate BETWEEN ? AND ?
        GROUP BY a.pttype, pt.name
        ORDER BY admissions DESC
      `, [from, to], { timeoutMs: 30000 }),
      // ER per pttype (route through ovst since er_regist has no pttype)
      dbQueryHeavy(`${cacheKey}_er`, 30, `
        SELECT
          o.pttype AS pttype,
          pt.name AS pttype_name,
          COUNT(*) AS visits,
          COUNT(DISTINCT o.hn) AS unique_hn
        FROM er_regist e
        JOIN ovst o ON o.vn = e.vn
        LEFT JOIN pttype pt ON pt.pttype = o.pttype
        WHERE e.vstdate BETWEEN ? AND ?
        GROUP BY o.pttype, pt.name
        ORDER BY visits DESC
      `, [from, to], { timeoutMs: 30000 }),
      // Monthly trend — OPD
      dbQueryHeavy(`${cacheKey}_opd_trend`, 30, `
        SELECT
          DATE_FORMAT(o.vstdate, '%Y-%m') AS ym,
          o.pttype AS pttype,
          COUNT(*) AS visits
        FROM ovst o
        WHERE o.vstdate BETWEEN ? AND ?
        GROUP BY ym, o.pttype
        ORDER BY ym
      `, [from, to], { timeoutMs: 30000 }),
      // Monthly trend — IPD
      dbQueryHeavy(`${cacheKey}_ipd_trend`, 30, `
        SELECT
          DATE_FORMAT(a.regdate, '%Y-%m') AS ym,
          a.pttype AS pttype,
          COUNT(*) AS visits
        FROM an_stat a
        WHERE a.regdate BETWEEN ? AND ?
        GROUP BY ym, a.pttype
        ORDER BY ym
      `, [from, to], { timeoutMs: 30000 }),
      // Monthly trend — ER
      dbQueryHeavy(`${cacheKey}_er_trend`, 30, `
        SELECT
          DATE_FORMAT(e.vstdate, '%Y-%m') AS ym,
          o.pttype AS pttype,
          COUNT(*) AS visits
        FROM er_regist e
        JOIN ovst o ON o.vn = e.vn
        WHERE e.vstdate BETWEEN ? AND ?
        GROUP BY ym, o.pttype
        ORDER BY ym
      `, [from, to], { timeoutMs: 30000 }),
      // Age breakdown — OPD per pttype × age_group
      dbQueryHeavy(`${cacheKey}_opd_age`, 30, `
        SELECT
          o.pttype AS pttype,
          ${AGE_CASE('p.birthday', 'o.vstdate')} AS age_group,
          COUNT(*) AS visits,
          COUNT(DISTINCT o.hn) AS unique_hn
        FROM ovst o
        LEFT JOIN patient p ON p.hn = o.hn
        WHERE o.vstdate BETWEEN ? AND ?
        GROUP BY o.pttype, age_group
      `, [from, to], { timeoutMs: 30000 }),
      // Age breakdown — IPD per pttype × age_group
      dbQueryHeavy(`${cacheKey}_ipd_age`, 30, `
        SELECT
          a.pttype AS pttype,
          ${AGE_CASE('p.birthday', 'a.regdate')} AS age_group,
          COUNT(*) AS visits,
          COUNT(DISTINCT a.hn) AS unique_hn
        FROM an_stat a
        LEFT JOIN patient p ON p.hn = a.hn
        WHERE a.regdate BETWEEN ? AND ?
        GROUP BY a.pttype, age_group
      `, [from, to], { timeoutMs: 30000 }),
      // Age breakdown — ER per pttype × age_group
      dbQueryHeavy(`${cacheKey}_er_age`, 30, `
        SELECT
          o.pttype AS pttype,
          ${AGE_CASE('p.birthday', 'e.vstdate')} AS age_group,
          COUNT(*) AS visits,
          COUNT(DISTINCT o.hn) AS unique_hn
        FROM er_regist e
        JOIN ovst o ON o.vn = e.vn
        LEFT JOIN patient p ON p.hn = o.hn
        WHERE e.vstdate BETWEEN ? AND ?
        GROUP BY o.pttype, age_group
      `, [from, to], { timeoutMs: 30000 }),
    ]);

    // ── Classify pttype name into 9 standard groups (v2 — expanded UC subtypes) ──
    const classifyPttype = (name) => {
      const s = String(name || '').toLowerCase();
      if (/ประกันสังคม|sss|สปส|ปกส|ทุพพลภาพ|กองทุนเงินทดแทน/i.test(s)) return 'ประกันสังคม';
      if (/พรบ|พ\.?ร\.?บ|พระราชบัญญัติคุ้มครอง|พรบ\.?​?รถ|พ\.ร\.บ\.?ฯ|ประกันภัยจากรถ/i.test(s)) return 'พรบ';
      if (/ต่างด้าว|แรงงานต่างด้าว|migrant|alien|fdh/i.test(s)) return 'ต่างด้าว';
      if (/ต่างชาติ|foreigner|foreign\s*nationals|1\.5 ?เท่า|ชาวต่าง/i.test(s)) return 'ต่างชาติ (1.5 เท่า)';
      if (/รัฐวิสาหกิจ|state\s*enterprise/i.test(s)) return 'รัฐวิสาหกิจ';
      if (/ราชการ|อปท|csmbs|local\s*gov|เบิก\s*จ่าย\s*ตรง|อปท\.|กรมบัญชีกลาง|กบข|พนักงาน\s*ราชการ|กทม\.|ครูเอกชน/i.test(s)) return 'ข้าราชการ / อปท';
      if (/ชำระเงิน|เงินสด|จ่ายตรง|self\s*pay|out\s*of\s*pocket|จ่ายเอง|ประกันสุขภาพเอกชน|contract|contrac/i.test(s)) return 'ชำระเงินเอง';
      if (/uc|บัตรทอง|30 ?บาท|หลักประกันสุขภาพ|สิทธิ์\s*สปสช|nhso|universal\s*coverage|ucs|ส่งเสริมป้องกัน|ผู้สูงอายุ|ผู้พิการ|ผู้มีรายได้น้อย|ฝากครรภ์|บัตร\s*อสม|อสม|นักเรียน|เด็กอายุ|ทหารผ่านศึก|ทหารเกณฑ์|ภิกษุ|ผู้นำศาสนา|ผู้นำชุมชน|สิทธิว่าง|ว่างมาตรา|ตรวจฟัน|บริจาคโลหิต|ผู้มีปัญหาสถานะ|op walkin|ราชทัณฑ์|ล้างไต|ฟอกไต|hd|capd|ตรวจสุขภาพ|อนุเคราะห์|ตรวจ amphet|ไปรษณีย์|อสม\./i.test(s)) return 'UC';
      return 'อื่นๆ';
    };

    // ── Merge per-pttype summary across OPD/IPD/ER ──
    const merged = {};
    const upsert = (rows, k1, k2) => {
      for (const r of (rows || [])) {
        const key = String(r.pttype || '_unknown');
        if (!merged[key]) {
          merged[key] = {
            pttype: r.pttype || '',
            pttype_name: r.pttype_name || `รหัส ${r.pttype || '—'}`,
            opd_visits: 0, opd_hn: 0,
            ipd_admissions: 0, ipd_hn: 0,
            er_visits: 0, er_hn: 0,
          };
        }
        if (r.pttype_name && merged[key].pttype_name.startsWith('รหัส')) {
          merged[key].pttype_name = r.pttype_name;
        }
        merged[key][k1] = Number(r[k2] || 0);
        if (r.unique_hn !== undefined) {
          const hnKey = k1.replace('visits', 'hn').replace('admissions', 'hn');
          merged[key][hnKey] = Number(r.unique_hn || 0);
        }
      }
    };
    upsert(opdSummary, 'opd_visits', 'visits');
    upsert(ipdSummary, 'ipd_admissions', 'admissions');
    upsert(erSummary, 'er_visits', 'visits');

    const summary = Object.values(merged).map(r => ({
      ...r,
      group_name: classifyPttype(r.pttype_name),
      total_visits: r.opd_visits + r.ipd_admissions + r.er_visits,
      total_unique_hn_estimate: Math.max(r.opd_hn, r.ipd_hn, r.er_hn),
    })).sort((a, b) => b.total_visits - a.total_visits);

    // ── Group-level aggregate (9 standard pttype buckets) ──
    const GROUP_ORDER = ['UC', 'ข้าราชการ / อปท', 'ชำระเงินเอง', 'ต่างชาติ (1.5 เท่า)', 'ต่างด้าว', 'ประกันสังคม', 'พรบ', 'รัฐวิสาหกิจ', 'อื่นๆ'];
    const groupAgg = Object.fromEntries(GROUP_ORDER.map(g => [g, {
      group_name: g,
      opd_visits: 0, opd_hn: 0,
      ipd_admissions: 0, ipd_hn: 0,
      er_visits: 0, er_hn: 0,
      total_visits: 0,
      pttype_count: 0,
    }]));
    for (const r of summary) {
      const g = groupAgg[r.group_name] || groupAgg['อื่นๆ'];
      g.opd_visits += r.opd_visits;
      g.opd_hn += r.opd_hn;
      g.ipd_admissions += r.ipd_admissions;
      g.ipd_hn += r.ipd_hn;
      g.er_visits += r.er_visits;
      g.er_hn += r.er_hn;
      g.total_visits += r.total_visits;
      g.pttype_count += 1;
    }
    const groups = GROUP_ORDER.map(g => groupAgg[g]).filter(g => g.total_visits > 0 || g.pttype_count > 0);

    // ── Monthly trend — combine OPD + IPD + ER by ym × pttype ──
    const trendMap = {};
    const accumTrend = (rows, channel) => {
      for (const r of (rows || [])) {
        const k = `${r.ym}__${r.pttype}`;
        if (!trendMap[k]) {
          trendMap[k] = { ym: r.ym, pttype: r.pttype || '', opd: 0, ipd: 0, er: 0, total: 0 };
        }
        trendMap[k][channel] = Number(r.visits || 0);
        trendMap[k].total = trendMap[k].opd + trendMap[k].ipd + trendMap[k].er;
      }
    };
    accumTrend(opdTrend, 'opd');
    accumTrend(ipdTrend, 'ipd');
    accumTrend(erTrend, 'er');
    const trend = Object.values(trendMap).sort((a, b) =>
      a.ym === b.ym ? String(a.pttype).localeCompare(String(b.pttype)) : a.ym.localeCompare(b.ym)
    );

    // ── Monthly trend per group_name (aggregated) ──
    const pttypeToGroup = {};
    for (const r of summary) pttypeToGroup[String(r.pttype)] = r.group_name;
    const groupTrendMap = {};
    for (const t of trend) {
      const g = pttypeToGroup[String(t.pttype)] || 'อื่นๆ';
      const k = `${t.ym}__${g}`;
      if (!groupTrendMap[k]) {
        groupTrendMap[k] = { ym: t.ym, group_name: g, opd: 0, ipd: 0, er: 0, total: 0 };
      }
      groupTrendMap[k].opd += t.opd;
      groupTrendMap[k].ipd += t.ipd;
      groupTrendMap[k].er += t.er;
      groupTrendMap[k].total += t.total;
    }
    const groupTrend = Object.values(groupTrendMap).sort((a, b) =>
      a.ym === b.ym ? GROUP_ORDER.indexOf(a.group_name) - GROUP_ORDER.indexOf(b.group_name) : a.ym.localeCompare(b.ym)
    );

    // ── Age breakdown: pivot per group × age_group ──
    const ageMap = {};   // key: group_name__age_group
    const upsertAge = (rows, channel) => {
      for (const r of (rows || [])) {
        const grp = pttypeToGroup[String(r.pttype)] || 'อื่นๆ';
        const ag = r.age_group || 'ไม่ระบุ';
        const k = `${grp}__${ag}`;
        if (!ageMap[k]) {
          ageMap[k] = { group_name: grp, age_group: ag, opd: 0, ipd: 0, er: 0, total: 0, unique_hn_max: 0 };
        }
        ageMap[k][channel] += Number(r.visits || 0);
        ageMap[k].total = ageMap[k].opd + ageMap[k].ipd + ageMap[k].er;
        if (Number(r.unique_hn || 0) > ageMap[k].unique_hn_max) {
          ageMap[k].unique_hn_max = Number(r.unique_hn || 0);
        }
      }
    };
    upsertAge(opdAge, 'opd');
    upsertAge(ipdAge, 'ipd');
    upsertAge(erAge, 'er');
    const ageBreakdown = Object.values(ageMap).sort((a, b) => {
      const gi = GROUP_ORDER.indexOf(a.group_name) - GROUP_ORDER.indexOf(b.group_name);
      if (gi !== 0) return gi;
      return AGE_ORDER.indexOf(a.age_group) - AGE_ORDER.indexOf(b.age_group);
    });

    res.json({
      data_source: 'HOSxP XE · ovst + an_stat + er_regist + pttype + patient',
      from, to,
      summary,           // per-pttype (with group_name)
      groups,            // 9 standard buckets aggregated
      trend,             // monthly per-pttype
      group_trend: groupTrend,  // monthly per-group
      age_breakdown: ageBreakdown,  // per-group × age_group
      group_order: GROUP_ORDER,
      age_order: AGE_ORDER,
      generated_at: new Date().toISOString(),
    });
  } catch (err) {
    logger.error('pttype-services report failed', { error: err.message });
    safeError(res, err, 'Report');
  }
});

export default router;
