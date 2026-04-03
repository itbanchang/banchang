// ============================================================
// BCH 360° Intelligence V.10 — Customer Insight Routes
// คัดกรองผู้รับบริการเบื้องต้น ตามหลักเกณฑ์ วิธีการ เงื่อนไข
// การขอรับค่าใช้จ่ายฯ — แสดง 3 ปีงบประมาณล่าสุด
// Data: vn_stat · an_stat · ipt · pttype (HOSxP XE)
// ============================================================
import { Router } from 'express';
import { dbQuery, dbQueryHeavy } from '../db/mysql.js';
import { cached } from '../cache/staleCache.js';
import logger from '../logger.js';

const router = Router();

const FISCAL_MONTHS = [
  { idx: 0, mo: 10, label: 'ต.ค.' }, { idx: 1, mo: 11, label: 'พ.ย.' },
  { idx: 2, mo: 12, label: 'ธ.ค.' }, { idx: 3, mo: 1,  label: 'ม.ค.' },
  { idx: 4, mo: 2,  label: 'ก.พ.' }, { idx: 5, mo: 3,  label: 'มี.ค.' },
  { idx: 6, mo: 4,  label: 'เม.ย.' }, { idx: 7, mo: 5,  label: 'พ.ค.' },
  { idx: 8, mo: 6,  label: 'มิ.ย.' }, { idx: 9, mo: 7,  label: 'ก.ค.' },
  { idx: 10, mo: 8, label: 'ส.ค.' }, { idx: 11, mo: 9, label: 'ก.ย.' },
];

function fyStartCE(beFY) { return beFY - 544; }
function pctOf(part, total) { return total > 0 ? Math.round((part / total) * 10000) / 100 : 0; }
function growthPct(cur, prev) { return prev > 0 ? Math.round(((cur - prev) / prev) * 100) : cur > 0 ? 100 : 0; }

function getCurrentFYBE() {
  const now = new Date();
  return (now.getMonth() + 1) >= 10 ? now.getFullYear() + 544 : now.getFullYear() + 543;
}

function get3FY() {
  const latest = getCurrentFYBE();
  return [latest - 2, latest - 1, latest];
}

function fyDates(fyBE) {
  const s = fyStartCE(fyBE);
  return { be: fyBE, start: `${s}-10-01`, end: `${s + 1}-09-30`, label: `${fyBE}` };
}

// ── Per-FY OPD query (lightweight, runs in parallel) ──
function queryOpdFY(fy) {
  return dbQueryHeavy(
    `ci_opd_v2_${fy.be}`, 120,
    `SELECT
       COALESCE(v.pttype, '??') AS pttype_code,
       COALESCE(pt.name, CONCAT('รหัส ', v.pttype)) AS pttype_name,
       COUNT(DISTINCT v.vn) AS visits,
       COUNT(DISTINCT v.hn) AS patients,
       ROUND(SUM(COALESCE(v.income, 0))) AS total_income,
       ROUND(SUM(COALESCE(v.paid_money, 0))) AS total_paid,
       ROUND(SUM(COALESCE(v.income, 0)) - SUM(COALESCE(v.paid_money, 0))) AS total_outstanding,
       ROUND(SUM(COALESCE(v.remain_money, 0))) AS total_remain,
       ROUND(SUM(COALESCE(v.inc03, 0))) AS lab_income,
       ROUND(SUM(CASE WHEN v.inc_drug > 0 AND v.inc_drug <= 25000 THEN v.inc_drug ELSE 0 END)) AS drug_income,
       ROUND(SUM(COALESCE(v.inc04, 0))) AS xray_income
     FROM vn_stat v
     LEFT JOIN pttype pt ON v.pttype = pt.pttype
     WHERE v.vstdate >= ? AND v.vstdate <= LEAST(?, CURDATE())
       AND v.income > 0
     GROUP BY v.pttype, pt.name
     ORDER BY total_income DESC`,
    [fy.start, fy.end]
  );
}

// ── Per-FY IPD query ──
function queryIpdFY(fy) {
  return dbQueryHeavy(
    `ci_ipd_v2_${fy.be}`, 120,
    `SELECT
       COALESCE(i.pttype, '??') AS pttype_code,
       COALESCE(pt.name, CONCAT('รหัส ', i.pttype)) AS pttype_name,
       COUNT(DISTINCT i.an) AS admissions,
       COUNT(DISTINCT i.hn) AS patients,
       ROUND(SUM(COALESCE(a.income, 0))) AS total_income,
       ROUND(SUM(COALESCE(a.paid_money, 0))) AS total_paid,
       ROUND(SUM(COALESCE(a.income, 0)) - SUM(COALESCE(a.paid_money, 0))) AS total_outstanding,
       ROUND(SUM(COALESCE(a.remain_money, 0))) AS total_remain,
       ROUND(AVG(COALESCE(a.rw, 0)), 4) AS avg_rw,
       ROUND(AVG(DATEDIFF(COALESCE(i.dchdate, CURDATE()), i.regdate)), 1) AS avg_los
     FROM ipt i
     LEFT JOIN an_stat a ON i.an = a.an
     LEFT JOIN pttype pt ON i.pttype = pt.pttype
     WHERE i.regdate >= ? AND i.regdate <= LEAST(?, CURDATE())
       AND i.dchdate IS NOT NULL
     GROUP BY i.pttype, pt.name
     ORDER BY total_income DESC`,
    [fy.start, fy.end]
  );
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /screening-summary — 3 ปีงบ ภาพรวมคัดกรอง (parallel queries)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get(
  '/screening-summary',
  cached('ci_screening_3fy_v4', 3600000, async req => {
    const fiscalYears = get3FY().map(fyDates);

    // Run all 6 queries in parallel (3 OPD + 3 IPD)
    const [opd0, opd1, opd2, ipd0, ipd1, ipd2] = await Promise.all([
      queryOpdFY(fiscalYears[0]),
      queryOpdFY(fiscalYears[1]),
      queryOpdFY(fiscalYears[2]),
      queryIpdFY(fiscalYears[0]),
      queryIpdFY(fiscalYears[1]),
      queryIpdFY(fiscalYears[2]),
    ]);

    const opdByFY = { [fiscalYears[0].be]: opd0, [fiscalYears[1].be]: opd1, [fiscalYears[2].be]: opd2 };
    const ipdByFY = { [fiscalYears[0].be]: ipd0, [fiscalYears[1].be]: ipd1, [fiscalYears[2].be]: ipd2 };

    // ── Build nested: payerMap[code] → { name, fys: { [be]: data } } ──
    const payerMap = new Map();
    const emptyFY = () => ({
      opd_visits: 0, opd_patients: 0, opd_income: 0, opd_paid: 0, opd_outstanding: 0, opd_remain: 0,
      opd_lab: 0, opd_drug: 0, opd_xray: 0,
      ipd_admissions: 0, ipd_patients: 0, ipd_income: 0, ipd_paid: 0, ipd_outstanding: 0, ipd_remain: 0,
      ipd_avg_rw: 0, ipd_avg_los: 0,
    });

    function getEntry(code, name) {
      if (!payerMap.has(code)) {
        const fys = {};
        for (const fy of fiscalYears) fys[fy.be] = emptyFY();
        payerMap.set(code, { pttype_code: code, pttype_name: name, fys });
      }
      return payerMap.get(code);
    }

    for (const fy of fiscalYears) {
      for (const r of (opdByFY[fy.be] || [])) {
        const e = getEntry(r.pttype_code, r.pttype_name);
        const d = e.fys[fy.be];
        d.opd_visits = Number(r.visits || 0);
        d.opd_patients = Number(r.patients || 0);
        d.opd_income = Number(r.total_income || 0);
        d.opd_paid = Number(r.total_paid || 0);
        d.opd_outstanding = Number(r.total_outstanding || 0);
        d.opd_remain = Number(r.total_remain || 0);
        d.opd_lab = Number(r.lab_income || 0);
        d.opd_drug = Number(r.drug_income || 0);
        d.opd_xray = Number(r.xray_income || 0);
      }
      for (const r of (ipdByFY[fy.be] || [])) {
        const e = getEntry(r.pttype_code, r.pttype_name);
        const d = e.fys[fy.be];
        d.ipd_admissions = Number(r.admissions || 0);
        d.ipd_patients = Number(r.patients || 0);
        d.ipd_income = Number(r.total_income || 0);
        d.ipd_paid = Number(r.total_paid || 0);
        d.ipd_outstanding = Number(r.total_outstanding || 0);
        d.ipd_remain = Number(r.total_remain || 0);
        d.ipd_avg_rw = Number(r.avg_rw || 0);
        d.ipd_avg_los = Number(r.avg_los || 0);
      }
    }

    // Determine how many months of data the latest FY has (for fair comparison)
    const latestFYMonths = new Set();
    const latestBE = fiscalYears[2].be;
    for (const p of payerMap.values()) {
      if (p.fys[latestBE].opd_visits > 0 || p.fys[latestBE].ipd_admissions > 0) {
        latestFYMonths.add(latestBE);
        break;
      }
    }
    // Count actual months with data in latest FY
    const now = new Date();
    const latestFYStartCE = fyStartCE(latestBE);
    const monthsElapsed = now.getMonth() + 1 >= 10
      ? now.getMonth() + 1 - 10 + 1
      : now.getMonth() + 1 + 3; // Oct=1, Nov=2, ..., Sep=12

    // Compute totals + flags
    const payers = Array.from(payerMap.values()).map(p => {
      const fyData = {};
      let latestIncome = 0;
      for (const fy of fiscalYears) {
        const d = p.fys[fy.be];
        const totalIncome = d.opd_income + d.ipd_income;
        const totalPaid = d.opd_paid + d.ipd_paid;
        const totalOutstanding = d.opd_outstanding + d.ipd_outstanding;
        const totalRemain = d.opd_remain + d.ipd_remain;
        // Collection rate = paid_money / income (ส่วนร่วมจ่ายที่เก็บได้)
        fyData[fy.be] = {
          ...d,
          total_income: totalIncome,
          total_paid: totalPaid,
          total_outstanding: totalOutstanding,
          total_remain: totalRemain,
          collection_rate: pctOf(totalPaid, totalIncome),
        };
        if (fy.be === fiscalYears[2].be) latestIncome = totalIncome;
      }

      // Fair YoY: annualize latest FY or compare same-period
      const prev = fyData[fiscalYears[1].be], curr = fyData[fiscalYears[2].be];
      // Annualized growth: (curr * 12/months) vs prev
      const currAnnualized = monthsElapsed > 0 ? Math.round(curr.total_income * 12 / monthsElapsed) : 0;
      const prevVisitsAnnualized = monthsElapsed > 0 ? Math.round((prev.opd_visits + prev.ipd_admissions) * monthsElapsed / 12) : prev.opd_visits + prev.ipd_admissions;
      const prevIncomeProrated = monthsElapsed > 0 ? Math.round(prev.total_income * monthsElapsed / 12) : prev.total_income;

      return {
        pttype_code: p.pttype_code, pttype_name: p.pttype_name, fys: fyData,
        // Fair comparison: current partial-year vs same period of previous year
        income_growth: growthPct(curr.total_income, prevIncomeProrated),
        visit_growth: growthPct(curr.opd_visits + curr.ipd_admissions, prevVisitsAnnualized),
        flag_low_collection: curr.total_income > 1000 && curr.collection_rate < 80,
        flag_high_outstanding: curr.total_outstanding > 100000,
        _sort_income: latestIncome,
      };
    }).sort((a, b) => b._sort_income - a._sort_income);

    // Grand totals per FY
    const grand_totals = {};
    for (const fy of fiscalYears) {
      const gt = payers.reduce((acc, p) => {
        const d = p.fys[fy.be];
        return {
          opd_visits: acc.opd_visits + d.opd_visits, opd_patients: acc.opd_patients + d.opd_patients, opd_income: acc.opd_income + d.opd_income,
          ipd_admissions: acc.ipd_admissions + d.ipd_admissions, ipd_patients: acc.ipd_patients + d.ipd_patients, ipd_income: acc.ipd_income + d.ipd_income,
          total_income: acc.total_income + d.total_income, total_paid: acc.total_paid + d.total_paid,
          total_outstanding: acc.total_outstanding + d.total_outstanding, total_remain: acc.total_remain + d.total_remain,
        };
      }, { opd_visits: 0, opd_patients: 0, opd_income: 0, ipd_admissions: 0, ipd_patients: 0, ipd_income: 0, total_income: 0, total_paid: 0, total_outstanding: 0, total_remain: 0 });
      gt.collection_rate = pctOf(gt.total_paid, gt.total_income);
      grand_totals[fy.be] = gt;
    }

    // Fair YoY for grand totals
    const prevGT = grand_totals[fiscalYears[1].be];
    const currGT = grand_totals[fiscalYears[2].be];
    const prevIncomeProrated = monthsElapsed > 0 ? Math.round(prevGT.total_income * monthsElapsed / 12) : prevGT.total_income;

    return {
      data_source: 'HOSxP XE · vn_stat + an_stat + ipt + pttype',
      timestamp: new Date().toISOString(),
      fiscal_years: fiscalYears,
      months_elapsed: monthsElapsed,
      grand_totals,
      grand_growth: {
        income_growth_raw: growthPct(currGT.total_income, prevGT.total_income),
        income_growth_fair: growthPct(currGT.total_income, prevIncomeProrated),
        note: `เปรียบเทียบ ${monthsElapsed} เดือนแรกของแต่ละปีงบ (fair comparison)`,
      },
      payers,
      flagged_count: payers.filter(p => p.flag_low_collection || p.flag_high_outstanding).length,
    };
  })
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /monthly-trend — 3 ปีงบ แนวโน้มรายเดือน (parallel)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get(
  '/monthly-trend',
  cached('ci_monthly_3fy_v3', 3600000, async req => {
    const fiscalYears = get3FY().map(fyDates);

    function queryMonthly(fy) {
      return dbQueryHeavy(
        `ci_mo_${fy.be}`, 120,
        `SELECT YEAR(v.vstdate) AS yr, MONTH(v.vstdate) AS mo,
           COUNT(DISTINCT v.vn) AS visits, COUNT(DISTINCT v.hn) AS patients,
           ROUND(SUM(COALESCE(v.income, 0))) AS income,
           ROUND(SUM(COALESCE(v.paid_money, 0))) AS paid,
           ROUND(SUM(COALESCE(v.remain_money, 0))) AS remain
         FROM vn_stat v
         WHERE v.vstdate >= ? AND v.vstdate <= LEAST(?, CURDATE()) AND v.income > 0
         GROUP BY YEAR(v.vstdate), MONTH(v.vstdate) ORDER BY yr, mo`,
        [fy.start, fy.end]
      );
    }

    const [rows0, rows1, rows2] = await Promise.all(fiscalYears.map(queryMonthly));
    const rowsByFY = { [fiscalYears[0].be]: rows0, [fiscalYears[1].be]: rows1, [fiscalYears[2].be]: rows2 };

    function buildMonths(fyBE) {
      const fyStartYear = fyStartCE(fyBE);
      const rows = rowsByFY[fyBE] || [];
      return FISCAL_MONTHS.map(fm => {
        const calYear = fm.mo >= 10 ? fyStartYear : fyStartYear + 1;
        const row = rows.find(r => Number(r.yr) === calYear && Number(r.mo) === fm.mo);
        if (row) {
          const income = Number(row.income || 0), paid = Number(row.paid || 0), remain = Number(row.remain || 0);
          return { month: fm.label, month_num: fm.mo, fiscal_idx: fm.idx, visits: Number(row.visits || 0), patients: Number(row.patients || 0), income, paid, remain, collection_rate: pctOf(paid, income), has_data: true };
        }
        return { month: fm.label, month_num: fm.mo, fiscal_idx: fm.idx, visits: 0, patients: 0, income: 0, paid: 0, remain: 0, collection_rate: 0, has_data: false };
      });
    }

    const comparison = FISCAL_MONTHS.map((fm, i) => {
      const result = { month: fm.label, month_num: fm.mo };
      for (const fy of fiscalYears) result[`fy${fy.be}`] = buildMonths(fy.be)[i];
      return result;
    });

    return { fiscal_years: fiscalYears, comparison, timestamp: new Date().toISOString() };
  })
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /top-diagnosis — Top ICD-10 (ปีงบล่าสุด)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get(
  '/top-diagnosis',
  cached('ci_top_dx_v3', 3600000, async req => {
    const latestFY = fyDates(getCurrentFYBE());
    const limit = Math.min(Number(req?.query?.limit || 20), 50);
    const pttypeFilter = req?.query?.pttype || null;
    const params = [latestFY.start, latestFY.end];
    let pttypeWhere = '';
    if (pttypeFilter) { pttypeWhere = 'AND v.pttype = ?'; params.push(pttypeFilter); }
    params.push(limit);

    const rows = await dbQueryHeavy(
      `ci_top_dx_v2_${latestFY.be}_${pttypeFilter || 'all'}`, 60,
      `SELECT v.pdx AS icd10, COALESCE(ic.tname, ic.name, v.pdx) AS diagnosis_name,
         COUNT(DISTINCT v.vn) AS visit_count, COUNT(DISTINCT v.hn) AS patient_count,
         ROUND(SUM(COALESCE(v.income, 0))) AS total_income,
         ROUND(SUM(COALESCE(v.paid_money, 0))) AS total_paid,
         ROUND(SUM(COALESCE(v.income, 0)) - SUM(COALESCE(v.paid_money, 0))) AS total_outstanding
       FROM vn_stat v LEFT JOIN icd101 ic ON v.pdx = ic.code
       WHERE v.vstdate >= ? AND v.vstdate <= LEAST(?, CURDATE())
         AND v.pdx IS NOT NULL AND v.pdx != '' AND v.income > 0 ${pttypeWhere}
       GROUP BY v.pdx, ic.tname, ic.name ORDER BY visit_count DESC LIMIT ?`,
      params
    );

    return {
      fiscal_year: latestFY, pttype_filter: pttypeFilter,
      diagnoses: (rows || []).map(r => ({
        icd10: r.icd10, name: r.diagnosis_name,
        visits: Number(r.visit_count || 0), patients: Number(r.patient_count || 0),
        income: Number(r.total_income || 0),
        paid: Number(r.total_paid || 0),
        outstanding: Number(r.total_outstanding || 0),
        collection_rate: pctOf(Number(r.total_paid || 0), Number(r.total_income || 0)),
      })),
      timestamp: new Date().toISOString(),
    };
  })
);

export default router;
