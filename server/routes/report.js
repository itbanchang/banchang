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
// Query: ?fy1=2568&fy2=2569
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get(
  '/ipd-compare',
  cached('report_ipd_compare_v4', 3600000, async req => {
    // Default: compare current FY vs previous FY
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

    // Determine which months of fy2 have data (for partial year comparison)
    const fy2LastMonth =
      fy2BE === currentFYBE ? (currentMonth >= 10 ? currentMonth : currentMonth) : 9; // full year

    const totalBeds = KPI.ipd.total_beds; // 120 เตียงจริง (จาก config)

    const [monthlyData] = await Promise.all([
      // Monthly IPD statistics for both fiscal years
      dbQueryHeavy(
        `report_ipd_fy_${fy1BE}_${fy2BE}`,
        120,
        `
      SELECT
        YEAR(i.dchdate) AS yr,
        MONTH(i.dchdate) AS mo,
        COUNT(DISTINCT i.an) AS admits,
        SUM(DATEDIFF(i.dchdate, i.regdate)) AS total_los,
        ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 2) AS alos,
        ROUND(SUM(COALESCE(i.adjrw, a.rw, 0)), 2) AS sum_adjrw,
        ROUND(AVG(CASE WHEN COALESCE(i.adjrw, a.rw) > 0 THEN COALESCE(i.adjrw, a.rw) END), 2) AS cmi
      FROM ipt i
      LEFT JOIN an_stat a ON i.an = a.an
      WHERE i.dchdate IS NOT NULL
        AND i.ward != '06'
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
    ]);

    // ── Build month map for each FY ──
    function buildFYMonths(rows, fyBE) {
      const fyStartYear = fyStartCE(fyBE);
      const result = [];

      for (const fm of FISCAL_MONTHS) {
        const calYear = fm.mo >= 10 ? fyStartYear : fyStartYear + 1;
        const row = (rows || []).find(r => Number(r.yr) === calYear && Number(r.mo) === fm.mo);

        if (row && Number(row.admits) > 0) {
          const admits = Number(row.admits);
          const totalLOS = Number(row.total_los || 0);
          const daysInMonth = new Date(calYear, fm.mo, 0).getDate();
          const occupancyRate =
            totalBeds > 0 ? Math.round((totalLOS / (totalBeds * daysInMonth)) * 10000) / 100 : 0;
          const activeBeds = totalBeds > 0 ? Math.round((totalLOS / daysInMonth) * 100) / 100 : 0;

          result.push({
            month: fm.label,
            month_num: fm.mo,
            fiscal_idx: fm.idx,
            admits,
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
            admits: 0,
            total_los: 0,
            alos: 0,
            occupancy_rate: 0,
            active_beds: 0,
            sum_adjrw: 0,
            cmi: 0,
            has_data: false,
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
      const totalLOS = withData.reduce((s, m) => s + m.total_los, 0);
      const totalAdjRW = withData.reduce((s, m) => s + m.sum_adjrw, 0);
      const avgALOS = totalAdmits > 0 ? Math.round((totalLOS / totalAdmits) * 100) / 100 : 0;
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

      return {
        month: fm.label,
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
      const los = cm.reduce((s, m) => s + m.total_los, 0);
      const adjrw = cm.reduce((s, m) => s + m.sum_adjrw, 0);
      const cmis = cm.filter(m => m.cmi > 0);
      return {
        months_with_data: cm.length,
        admits,
        total_los: los,
        alos: admits > 0 ? Math.round((los / admits) * 100) / 100 : 0,
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

    return {
      data_source: 'HOSxP XE · ipt + an_stat',
      timestamp: new Date().toISOString(),
      title: `รายงานจำนวนผู้ป่วยในเปรียบเทียบ ปี ${fy1BE}-${fy2BE}`,

      fiscal_years: {
        fy1: { be: fy1BE, label: `ปี งบ ${fy1BE}`, start: fy1Start, end: fy1End },
        fy2: { be: fy2BE, label: `ปี งบ ${fy2BE}`, start: fy2Start, end: fy2End },
      },

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
// GET /resource-usage — รายงานการใช้ทรัพยากรสำคัญ OPD/IPD (Lab, Drug, CT/X-ray)
// Query: ?fy1=2568&fy2=2569
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get(
  '/resource-usage',
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

export default router;
