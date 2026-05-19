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

// ── 9-group pttype classifier v2 (sync with ReportTab pttype-services) ──
// Expanded UC subtypes after verify: ผู้สูงอายุ, อสม, นักเรียน, ผู้พิการ, ฯลฯ
const GROUP_ORDER = ['UC', 'ข้าราชการ / อปท', 'ชำระเงินเอง', 'ต่างชาติ (1.5 เท่า)', 'ต่างด้าว', 'ประกันสังคม', 'พรบ', 'รัฐวิสาหกิจ', 'อื่นๆ'];
function classifyPttype(name) {
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
  // Custom date ranges (fy.be=0) get unique cache key per start/end to avoid collisions
  const cacheKey = fy.be > 0 ? `ci_opd_v3_${fy.be}` : `ci_opd_custom_v2_${fy.start}_${fy.end}`;
  const cacheTtl = fy.be > 0 ? 120 : 5; // custom ranges: 5 min (vs 2hr for FY)
  return dbQueryHeavy(
    cacheKey, cacheTtl,
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
     GROUP BY v.pttype, pt.name
     ORDER BY total_income DESC`,
    [fy.start, fy.end]
  );
}

// ── Per-FY IPD query ──
function queryIpdFY(fy) {
  const cacheKey = fy.be > 0 ? `ci_ipd_v3_${fy.be}` : `ci_ipd_custom_v2_${fy.start}_${fy.end}`;
  const cacheTtl = fy.be > 0 ? 120 : 5;
  return dbQueryHeavy(
    cacheKey, cacheTtl,
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
  cached('ci_screening_3fy_v6_flagged_per_fy', 3600000, async req => {
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
        pttype_code: p.pttype_code, pttype_name: p.pttype_name,
        group_name: classifyPttype(p.pttype_name),
        fys: fyData,
        // Fair comparison: current partial-year vs same period of previous year
        income_growth: growthPct(curr.total_income, prevIncomeProrated),
        visit_growth: growthPct(curr.opd_visits + curr.ipd_admissions, prevVisitsAnnualized),
        flag_low_collection: curr.total_income > 1000 && curr.collection_rate < 80,
        flag_high_outstanding: curr.total_outstanding > 100000,
        _sort_income: latestIncome,
      };
    }).sort((a, b) => b._sort_income - a._sort_income);

    // ── Group-level aggregates per FY ──
    const groups = GROUP_ORDER.map(gn => {
      const memberPayers = payers.filter(p => p.group_name === gn);
      const groupFys = {};
      for (const fy of fiscalYears) {
        groupFys[fy.be] = memberPayers.reduce((acc, p) => {
          const d = p.fys[fy.be];
          return {
            opd_visits: acc.opd_visits + d.opd_visits,
            opd_patients: acc.opd_patients + d.opd_patients,
            ipd_admissions: acc.ipd_admissions + d.ipd_admissions,
            ipd_patients: acc.ipd_patients + d.ipd_patients,
            total_income: acc.total_income + d.total_income,
            total_paid: acc.total_paid + d.total_paid,
            total_outstanding: acc.total_outstanding + d.total_outstanding,
            opd_drug: acc.opd_drug + (d.opd_drug || 0),
            opd_lab: acc.opd_lab + (d.opd_lab || 0),
            opd_xray: acc.opd_xray + (d.opd_xray || 0),
          };
        }, { opd_visits: 0, opd_patients: 0, ipd_admissions: 0, ipd_patients: 0, total_income: 0, total_paid: 0, total_outstanding: 0, opd_drug: 0, opd_lab: 0, opd_xray: 0 });
        groupFys[fy.be].collection_rate = pctOf(groupFys[fy.be].total_paid, groupFys[fy.be].total_income);
      }
      const curr = groupFys[fiscalYears[2].be];
      const prev = groupFys[fiscalYears[1].be];
      const prevProrated = monthsElapsed > 0 ? Math.round(prev.total_income * monthsElapsed / 12) : prev.total_income;
      return {
        group_name: gn,
        pttype_count: memberPayers.length,
        fys: groupFys,
        income_growth: growthPct(curr.total_income, prevProrated),
        flag_low_collection: curr.total_income > 1000 && curr.collection_rate < 80,
        flag_high_outstanding: curr.total_outstanding > 100000,
      };
    }).filter(g => g.pttype_count > 0 && (g.fys[fiscalYears[2].be].total_income > 0 || g.fys[fiscalYears[1].be].total_income > 0 || g.fys[fiscalYears[0].be].total_income > 0));

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
      groups,                       // 9-group aggregates per FY (sync with pttype-services)
      group_order: GROUP_ORDER,
      flagged_count: payers.filter(p => p.flag_low_collection || p.flag_high_outstanding).length,
      // Per-FY flagged count: how many payers had collect% <80% / outstanding >100K in that year
      flagged_count_per_fy: Object.fromEntries(fiscalYears.map(fy => [
        fy.be,
        payers.filter(p => {
          const d = p.fys[fy.be];
          return (d.total_income > 1000 && d.collection_rate < 80) || d.total_outstanding > 100000;
        }).length,
      ])),
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
      `ci_top_dx_v3_${latestFY.be}_${pttypeFilter || 'all'}`, 60,
      `SELECT v.pdx AS icd10,
              COALESCE(NULLIF(TRIM(ic.tname), ''), NULLIF(TRIM(ic.name), ''), v.pdx) AS diagnosis_name,
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

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /patient-insight — มุมมองผู้รับบริการ (Patient-as-Customer)
// FY ปัจจุบัน · loyalty + demographics + top high-value/frequency + inactive cohort
// Cache 30 min (changes slowly within a day)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get(
  '/patient-insight',
  cached('ci_patient_insight_v1', 1800000, async () => {
    const fy = fyDates(getCurrentFYBE());

    const [loyalty, ageSex, topValue, topFrequency, inactive] = await Promise.all([
      // 1. Loyalty: total / new / returning (new = first-ever vstdate within current FY)
      dbQueryHeavy(
        `ci_loyalty_${fy.be}`, 60,
        `SELECT
           COUNT(DISTINCT o.hn) AS total_unique,
           COUNT(DISTINCT CASE WHEN fv.first_seen >= ? THEN o.hn END) AS new_patients,
           COUNT(DISTINCT CASE WHEN fv.first_seen <  ? THEN o.hn END) AS returning_patients,
           COUNT(DISTINCT o.vn) AS total_visits,
           SUM(COALESCE(v.income, 0)) AS total_income
         FROM ovst o
         LEFT JOIN vn_stat v ON v.vn = o.vn
         LEFT JOIN (SELECT hn, MIN(vstdate) AS first_seen FROM ovst WHERE hn IS NOT NULL AND hn <> '' GROUP BY hn) fv
                ON fv.hn = o.hn
         WHERE o.vstdate BETWEEN ? AND ?
           AND o.hn IS NOT NULL AND o.hn <> ''`,
        [fy.start, fy.start, fy.start, fy.end],
        { timeoutMs: 30000 }
      ),

      // 2. Demographics: age band + sex (per unique HN)
      dbQueryHeavy(
        `ci_demographics_${fy.be}`, 60,
        `SELECT
           SUM(CASE WHEN age_y < 18 THEN 1 ELSE 0 END) AS lt18,
           SUM(CASE WHEN age_y BETWEEN 18 AND 34 THEN 1 ELSE 0 END) AS a18_34,
           SUM(CASE WHEN age_y BETWEEN 35 AND 59 THEN 1 ELSE 0 END) AS a35_59,
           SUM(CASE WHEN age_y >= 60 THEN 1 ELSE 0 END) AS gte60,
           SUM(CASE WHEN sex IN ('1','ช','ชาย') THEN 1 ELSE 0 END) AS male,
           SUM(CASE WHEN sex IN ('2','ญ','หญิง') THEN 1 ELSE 0 END) AS female
         FROM (
           SELECT
             p.hn,
             p.sex,
             FLOOR(DATEDIFF(CURDATE(), p.birthday) / 365.25) AS age_y
           FROM patient p
           WHERE p.hn IN (
             SELECT DISTINCT o.hn FROM ovst o
             WHERE o.vstdate BETWEEN ? AND ? AND o.hn IS NOT NULL AND o.hn <> ''
           )
         ) t`,
        [fy.start, fy.end],
        { timeoutMs: 30000 }
      ),

      // 3. Top 20 high-value patients
      dbQueryHeavy(
        `ci_top_value_${fy.be}`, 30,
        `SELECT
           o.hn,
           CONCAT(IFNULL(p.pname,''), ' ', IFNULL(p.fname,''), ' ', IFNULL(p.lname,'')) AS pt_name,
           p.sex,
           FLOOR(DATEDIFF(CURDATE(), p.birthday) / 365.25) AS age,
           COUNT(DISTINCT o.vn) AS visit_count,
           SUM(COALESCE(v.income, 0)) AS total_income,
           MAX(o.vstdate) AS last_visit
         FROM ovst o
         LEFT JOIN patient p ON p.hn = o.hn
         LEFT JOIN vn_stat v ON v.vn = o.vn
         WHERE o.vstdate BETWEEN ? AND ?
           AND o.hn IS NOT NULL AND o.hn <> ''
         GROUP BY o.hn, pt_name, p.sex, age
         HAVING total_income > 0
         ORDER BY total_income DESC
         LIMIT 20`,
        [fy.start, fy.end],
        { timeoutMs: 30000 }
      ),

      // 4. Top 20 high-frequency patients
      dbQueryHeavy(
        `ci_top_freq_${fy.be}`, 30,
        `SELECT
           o.hn,
           CONCAT(IFNULL(p.pname,''), ' ', IFNULL(p.fname,''), ' ', IFNULL(p.lname,'')) AS pt_name,
           p.sex,
           FLOOR(DATEDIFF(CURDATE(), p.birthday) / 365.25) AS age,
           COUNT(DISTINCT o.vn) AS visit_count,
           SUM(COALESCE(v.income, 0)) AS total_income,
           MAX(o.vstdate) AS last_visit
         FROM ovst o
         LEFT JOIN patient p ON p.hn = o.hn
         LEFT JOIN vn_stat v ON v.vn = o.vn
         WHERE o.vstdate BETWEEN ? AND ?
           AND o.hn IS NOT NULL AND o.hn <> ''
         GROUP BY o.hn, pt_name, p.sex, age
         ORDER BY visit_count DESC, total_income DESC
         LIMIT 20`,
        [fy.start, fy.end],
        { timeoutMs: 30000 }
      ),

      // 5. Inactive cohort: patients with NO visit in last 3/6/12 months (but had visits before)
      dbQueryHeavy(
        `ci_inactive_v1`, 60,
        `SELECT
           SUM(CASE WHEN last_visit < DATE_SUB(CURDATE(), INTERVAL 3 MONTH) AND last_visit >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) THEN 1 ELSE 0 END) AS inactive_3_6mo,
           SUM(CASE WHEN last_visit < DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND last_visit >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH) THEN 1 ELSE 0 END) AS inactive_6_12mo,
           SUM(CASE WHEN last_visit < DATE_SUB(CURDATE(), INTERVAL 12 MONTH) THEN 1 ELSE 0 END) AS inactive_12mo_plus,
           COUNT(*) AS total_patients_ever
         FROM (
           SELECT hn, MAX(vstdate) AS last_visit
           FROM ovst
           WHERE hn IS NOT NULL AND hn <> ''
           GROUP BY hn
         ) t`,
        [],
        { timeoutMs: 30000 }
      ),
    ]);

    const L = loyalty[0] || {};
    const D = ageSex[0] || {};
    const I = inactive[0] || {};
    const totalUnique = Number(L.total_unique || 0);

    return {
      data_source: 'HOSxP XE · ovst + patient + vn_stat',
      timestamp: new Date().toISOString(),
      fiscal_year: { be: fy.be, start: fy.start, end: fy.end },
      loyalty: {
        total_unique: totalUnique,
        new_patients: Number(L.new_patients || 0),
        returning_patients: Number(L.returning_patients || 0),
        new_pct: pctOf(Number(L.new_patients || 0), totalUnique),
        returning_pct: pctOf(Number(L.returning_patients || 0), totalUnique),
        total_visits: Number(L.total_visits || 0),
        total_income: Number(L.total_income || 0),
        avg_visits_per_patient: totalUnique > 0
          ? Math.round((Number(L.total_visits || 0) / totalUnique) * 10) / 10
          : 0,
      },
      demographics: {
        age_bands: {
          lt18: Number(D.lt18 || 0),
          a18_34: Number(D.a18_34 || 0),
          a35_59: Number(D.a35_59 || 0),
          gte60: Number(D.gte60 || 0),
        },
        sex: {
          male: Number(D.male || 0),
          female: Number(D.female || 0),
        },
      },
      top_high_value: (topValue || []).map(r => ({
        hn: r.hn,
        pt_name: (r.pt_name || '').trim(),
        sex: r.sex || '',
        age: Number(r.age || 0) || null,
        visit_count: Number(r.visit_count || 0),
        total_income: Number(r.total_income || 0),
        last_visit: r.last_visit,
      })),
      top_high_frequency: (topFrequency || []).map(r => ({
        hn: r.hn,
        pt_name: (r.pt_name || '').trim(),
        sex: r.sex || '',
        age: Number(r.age || 0) || null,
        visit_count: Number(r.visit_count || 0),
        total_income: Number(r.total_income || 0),
        last_visit: r.last_visit,
      })),
      inactive: {
        inactive_3_6mo: Number(I.inactive_3_6mo || 0),
        inactive_6_12mo: Number(I.inactive_6_12mo || 0),
        inactive_12mo_plus: Number(I.inactive_12mo_plus || 0),
        total_patients_ever: Number(I.total_patients_ever || 0),
      },
    };
  })
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /aging — Outstanding aging buckets per payer
// Buckets: 0-30d / 31-60d / 61-90d / 91-180d / 180+d (วันนับจาก vstdate)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get(
  '/aging',
  cached('ci_aging_v2', 1800000, async req => {
    const latestFY = fyDates(getCurrentFYBE());

    // OPD aging — outstanding per pttype × aging bucket
    const opdAging = await dbQueryHeavy(
      `ci_aging_opd_${latestFY.be}`, 60,
      `SELECT
         COALESCE(v.pttype, '??') AS pttype_code,
         COALESCE(pt.name, CONCAT('รหัส ', v.pttype)) AS pttype_name,
         SUM(CASE WHEN DATEDIFF(CURDATE(), v.vstdate) <= 30 THEN GREATEST(COALESCE(v.income,0) - COALESCE(v.paid_money,0), 0) ELSE 0 END) AS aging_0_30,
         SUM(CASE WHEN DATEDIFF(CURDATE(), v.vstdate) BETWEEN 31 AND 60 THEN GREATEST(COALESCE(v.income,0) - COALESCE(v.paid_money,0), 0) ELSE 0 END) AS aging_31_60,
         SUM(CASE WHEN DATEDIFF(CURDATE(), v.vstdate) BETWEEN 61 AND 90 THEN GREATEST(COALESCE(v.income,0) - COALESCE(v.paid_money,0), 0) ELSE 0 END) AS aging_61_90,
         SUM(CASE WHEN DATEDIFF(CURDATE(), v.vstdate) BETWEEN 91 AND 180 THEN GREATEST(COALESCE(v.income,0) - COALESCE(v.paid_money,0), 0) ELSE 0 END) AS aging_91_180,
         SUM(CASE WHEN DATEDIFF(CURDATE(), v.vstdate) > 180 THEN GREATEST(COALESCE(v.income,0) - COALESCE(v.paid_money,0), 0) ELSE 0 END) AS aging_180_plus,
         ROUND(SUM(GREATEST(COALESCE(v.income,0) - COALESCE(v.paid_money,0), 0))) AS total_outstanding
       FROM vn_stat v
       LEFT JOIN pttype pt ON v.pttype = pt.pttype
       WHERE v.vstdate >= ? AND v.vstdate <= CURDATE()
         AND COALESCE(v.income, 0) > COALESCE(v.paid_money, 0)
       GROUP BY v.pttype, pt.name
       HAVING total_outstanding > 0
       ORDER BY total_outstanding DESC`,
      [`${fyStartCE(latestFY.be) - 1}-10-01`],   // include prev FY for older outstanding
      { timeoutMs: 30000 }
    );

    // IPD aging
    const ipdAging = await dbQueryHeavy(
      `ci_aging_ipd_${latestFY.be}`, 60,
      `SELECT
         COALESCE(i.pttype, '??') AS pttype_code,
         COALESCE(pt.name, CONCAT('รหัส ', i.pttype)) AS pttype_name,
         SUM(CASE WHEN DATEDIFF(CURDATE(), i.regdate) <= 30 THEN GREATEST(COALESCE(a.income,0) - COALESCE(a.paid_money,0), 0) ELSE 0 END) AS aging_0_30,
         SUM(CASE WHEN DATEDIFF(CURDATE(), i.regdate) BETWEEN 31 AND 60 THEN GREATEST(COALESCE(a.income,0) - COALESCE(a.paid_money,0), 0) ELSE 0 END) AS aging_31_60,
         SUM(CASE WHEN DATEDIFF(CURDATE(), i.regdate) BETWEEN 61 AND 90 THEN GREATEST(COALESCE(a.income,0) - COALESCE(a.paid_money,0), 0) ELSE 0 END) AS aging_61_90,
         SUM(CASE WHEN DATEDIFF(CURDATE(), i.regdate) BETWEEN 91 AND 180 THEN GREATEST(COALESCE(a.income,0) - COALESCE(a.paid_money,0), 0) ELSE 0 END) AS aging_91_180,
         SUM(CASE WHEN DATEDIFF(CURDATE(), i.regdate) > 180 THEN GREATEST(COALESCE(a.income,0) - COALESCE(a.paid_money,0), 0) ELSE 0 END) AS aging_180_plus,
         ROUND(SUM(GREATEST(COALESCE(a.income,0) - COALESCE(a.paid_money,0), 0))) AS total_outstanding
       FROM ipt i
       LEFT JOIN an_stat a ON i.an = a.an
       LEFT JOIN pttype pt ON i.pttype = pt.pttype
       WHERE i.regdate >= ? AND i.regdate <= CURDATE()
         AND COALESCE(a.income, 0) > COALESCE(a.paid_money, 0)
       GROUP BY i.pttype, pt.name
       HAVING total_outstanding > 0
       ORDER BY total_outstanding DESC`,
      [`${fyStartCE(latestFY.be) - 1}-10-01`],
      { timeoutMs: 30000 }
    );

    // Merge OPD + IPD by pttype
    const mergedAging = {};
    const upsertAging = (rows, channel) => {
      for (const r of (rows || [])) {
        const code = String(r.pttype_code || '??');
        if (!mergedAging[code]) {
          mergedAging[code] = {
            pttype_code: code,
            pttype_name: r.pttype_name || `รหัส ${code}`,
            aging_0_30: 0, aging_31_60: 0, aging_61_90: 0, aging_91_180: 0, aging_180_plus: 0,
            total_outstanding: 0,
            opd_outstanding: 0, ipd_outstanding: 0,
          };
        }
        const a = mergedAging[code];
        a.aging_0_30 += Number(r.aging_0_30 || 0);
        a.aging_31_60 += Number(r.aging_31_60 || 0);
        a.aging_61_90 += Number(r.aging_61_90 || 0);
        a.aging_91_180 += Number(r.aging_91_180 || 0);
        a.aging_180_plus += Number(r.aging_180_plus || 0);
        a.total_outstanding += Number(r.total_outstanding || 0);
        if (channel === 'opd') a.opd_outstanding += Number(r.total_outstanding || 0);
        else a.ipd_outstanding += Number(r.total_outstanding || 0);
      }
    };
    upsertAging(opdAging, 'opd');
    upsertAging(ipdAging, 'ipd');

    const payerAging = Object.values(mergedAging)
      .sort((a, b) => b.total_outstanding - a.total_outstanding);

    // Grand totals
    const grand = payerAging.reduce((acc, p) => ({
      aging_0_30: acc.aging_0_30 + p.aging_0_30,
      aging_31_60: acc.aging_31_60 + p.aging_31_60,
      aging_61_90: acc.aging_61_90 + p.aging_61_90,
      aging_91_180: acc.aging_91_180 + p.aging_91_180,
      aging_180_plus: acc.aging_180_plus + p.aging_180_plus,
      total_outstanding: acc.total_outstanding + p.total_outstanding,
    }), { aging_0_30: 0, aging_31_60: 0, aging_61_90: 0, aging_91_180: 0, aging_180_plus: 0, total_outstanding: 0 });

    return {
      data_source: 'HOSxP XE · vn_stat + ipt + an_stat (aging by DATEDIFF from vstdate)',
      timestamp: new Date().toISOString(),
      window: { from: `${fyStartCE(latestFY.be) - 1}-10-01`, to: new Date().toISOString().slice(0, 10) },
      bucket_definitions: {
        aging_0_30: '0-30 วัน (current)',
        aging_31_60: '31-60 วัน',
        aging_61_90: '61-90 วัน',
        aging_91_180: '91-180 วัน',
        aging_180_plus: '> 180 วัน (write-off risk)',
      },
      payers: payerAging,
      grand_total: grand,
    };
  })
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /payer-patients?pttype=XX — Top 50 patients in a pttype sorted by outstanding
// Drill-down from payer card → patient detail
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get(
  '/payer-patients',
  cached('ci_payer_patients_v1', 900000, async req => {
    const pttype = req?.query?.pttype || null;
    const limit = Math.min(Number(req?.query?.limit || 50), 200);
    const sortBy = ['outstanding', 'income', 'visits'].includes(req?.query?.sort_by) ? req.query.sort_by : 'outstanding';
    const latestFY = fyDates(getCurrentFYBE());

    if (!pttype) {
      return { error: 'pttype parameter required', patients: [] };
    }

    const orderClause = sortBy === 'outstanding'
      ? 'total_outstanding DESC, total_income DESC'
      : sortBy === 'income' ? 'total_income DESC'
      : 'visit_count DESC';

    const rows = await dbQueryHeavy(
      `ci_payer_pts_${latestFY.be}_${pttype}_${sortBy}_${limit}`, 30,
      `SELECT
         o.hn,
         CONCAT(IFNULL(p.pname,''), ' ', IFNULL(p.fname,''), ' ', IFNULL(p.lname,'')) AS pt_name,
         p.sex,
         FLOOR(DATEDIFF(CURDATE(), p.birthday) / 365.25) AS age,
         COUNT(DISTINCT o.vn) AS visit_count,
         ROUND(SUM(COALESCE(v.income, 0))) AS total_income,
         ROUND(SUM(COALESCE(v.paid_money, 0))) AS total_paid,
         ROUND(SUM(GREATEST(COALESCE(v.income,0) - COALESCE(v.paid_money,0), 0))) AS total_outstanding,
         MAX(o.vstdate) AS last_visit
       FROM ovst o
       LEFT JOIN patient p ON p.hn = o.hn
       LEFT JOIN vn_stat v ON v.vn = o.vn
       WHERE o.vstdate BETWEEN ? AND ?
         AND v.pttype = ?
         AND o.hn IS NOT NULL AND o.hn <> ''
       GROUP BY o.hn, pt_name, p.sex, age
       HAVING total_income > 0
       ORDER BY ${orderClause}
       LIMIT ?`,
      [latestFY.start, latestFY.end, pttype, limit],
      { timeoutMs: 30000 }
    );

    return {
      pttype, sort_by: sortBy, limit,
      fiscal_year: latestFY,
      patients: (rows || []).map(r => ({
        hn: r.hn,
        pt_name: (r.pt_name || '').trim(),
        sex: r.sex || '',
        age: Number(r.age || 0) || null,
        visit_count: Number(r.visit_count || 0),
        total_income: Number(r.total_income || 0),
        total_paid: Number(r.total_paid || 0),
        total_outstanding: Number(r.total_outstanding || 0),
        last_visit: r.last_visit,
        collection_rate: pctOf(Number(r.total_paid || 0), Number(r.total_income || 0)),
      })),
      timestamp: new Date().toISOString(),
    };
  })
);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /screening-custom?from=&to= — Single period screening summary
// Same shape as screening-summary but for an arbitrary date range
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/screening-custom', async (req, res) => {
  try {
    const from = req.query?.from && /^\d{4}-\d{2}-\d{2}$/.test(req.query.from) ? req.query.from : null;
    const to = req.query?.to && /^\d{4}-\d{2}-\d{2}$/.test(req.query.to) ? req.query.to : null;
    if (!from || !to) {
      return res.status(400).json({ error: 'from and to required (YYYY-MM-DD)' });
    }

    const fy = { be: 0, start: from, end: to, label: `${from} → ${to}` };

    const [opd, ipd] = await Promise.all([queryOpdFY(fy), queryIpdFY(fy)]);

    const payerMap = new Map();
    const emptyFY = () => ({
      opd_visits: 0, opd_patients: 0, opd_income: 0, opd_paid: 0, opd_outstanding: 0, opd_remain: 0,
      opd_lab: 0, opd_drug: 0, opd_xray: 0,
      ipd_admissions: 0, ipd_patients: 0, ipd_income: 0, ipd_paid: 0, ipd_outstanding: 0, ipd_remain: 0,
      ipd_avg_rw: 0, ipd_avg_los: 0,
    });
    function getEntry(code, name) {
      if (!payerMap.has(code)) payerMap.set(code, { pttype_code: code, pttype_name: name, fy: emptyFY() });
      return payerMap.get(code);
    }
    for (const r of (opd || [])) {
      const e = getEntry(r.pttype_code, r.pttype_name);
      e.fy.opd_visits = Number(r.visits || 0);
      e.fy.opd_patients = Number(r.patients || 0);
      e.fy.opd_income = Number(r.total_income || 0);
      e.fy.opd_paid = Number(r.total_paid || 0);
      e.fy.opd_outstanding = Number(r.total_outstanding || 0);
      e.fy.opd_remain = Number(r.total_remain || 0);
      e.fy.opd_lab = Number(r.lab_income || 0);
      e.fy.opd_drug = Number(r.drug_income || 0);
      e.fy.opd_xray = Number(r.xray_income || 0);
    }
    for (const r of (ipd || [])) {
      const e = getEntry(r.pttype_code, r.pttype_name);
      e.fy.ipd_admissions = Number(r.admissions || 0);
      e.fy.ipd_patients = Number(r.patients || 0);
      e.fy.ipd_income = Number(r.total_income || 0);
      e.fy.ipd_paid = Number(r.total_paid || 0);
      e.fy.ipd_outstanding = Number(r.total_outstanding || 0);
      e.fy.ipd_remain = Number(r.total_remain || 0);
      e.fy.ipd_avg_rw = Number(r.avg_rw || 0);
      e.fy.ipd_avg_los = Number(r.avg_los || 0);
    }

    const payers = Array.from(payerMap.values()).map(p => {
      const d = p.fy;
      const totalIncome = d.opd_income + d.ipd_income;
      const totalPaid = d.opd_paid + d.ipd_paid;
      const totalOutstanding = d.opd_outstanding + d.ipd_outstanding;
      return {
        pttype_code: p.pttype_code,
        pttype_name: p.pttype_name,
        fy: {
          ...d,
          total_income: totalIncome,
          total_paid: totalPaid,
          total_outstanding: totalOutstanding,
          collection_rate: pctOf(totalPaid, totalIncome),
        },
        flag_low_collection: totalIncome > 1000 && pctOf(totalPaid, totalIncome) < 80,
        flag_high_outstanding: totalOutstanding > 100000,
        _sort_income: totalIncome,
      };
    }).sort((a, b) => b._sort_income - a._sort_income);

    const gt = payers.reduce((acc, p) => {
      const d = p.fy;
      return {
        opd_visits: acc.opd_visits + d.opd_visits,
        opd_patients: acc.opd_patients + (d.opd_patients || 0),
        ipd_admissions: acc.ipd_admissions + d.ipd_admissions,
        ipd_patients: acc.ipd_patients + (d.ipd_patients || 0),
        opd_lab: acc.opd_lab + d.opd_lab,
        opd_drug: acc.opd_drug + d.opd_drug,
        opd_xray: acc.opd_xray + d.opd_xray,
        total_income: acc.total_income + d.total_income,
        total_paid: acc.total_paid + d.total_paid,
        total_outstanding: acc.total_outstanding + d.total_outstanding,
      };
    }, { opd_visits: 0, opd_patients: 0, ipd_admissions: 0, ipd_patients: 0, opd_lab: 0, opd_drug: 0, opd_xray: 0, total_income: 0, total_paid: 0, total_outstanding: 0 });
    gt.collection_rate = pctOf(gt.total_paid, gt.total_income);

    // ── DB registry: total unique patients per pttype (from patient table) ──
    let dbPatientsPerPttype = [];
    try {
      // Active patients = distinct HN that visited (OPD) in last 3 years, grouped by visit-time pttype
      // Avoids patient.pttype inflation (default registration) + matches period_patients convention
      dbPatientsPerPttype = await dbQueryHeavy(
        'ci_active_patients_per_pttype_3y_v1', 1440,
        `SELECT v.pttype AS pttype_code,
                COALESCE(pt.name, '-') AS pttype_name,
                COUNT(DISTINCT v.hn) AS db_patients
         FROM vn_stat v
         LEFT JOIN pttype pt ON pt.pttype = v.pttype
         WHERE v.vstdate >= DATE_SUB(CURDATE(), INTERVAL 3 YEAR)
           AND v.vstdate <= CURDATE()
           AND v.pttype IS NOT NULL AND v.pttype <> ''
         GROUP BY v.pttype, pt.name`,
        []
      ) || [];
    } catch (e) { /* tolerate missing patient.pttype or alt schema */ dbPatientsPerPttype = []; }

    // Aggregate payers (period) + dbPatientsPerPttype into 9 groups
    const groupAgg = {};
    for (const gn of GROUP_ORDER) groupAgg[gn] = { group_name: gn, period_visits: 0, period_patients: 0, db_patients: 0, pttype_count: 0 };
    for (const p of payers) {
      const gn = classifyPttype(p.pttype_name);
      if (!groupAgg[gn]) continue;
      groupAgg[gn].period_visits += (p.fy.opd_visits || 0) + (p.fy.ipd_admissions || 0);
      groupAgg[gn].period_patients += (p.fy.opd_patients || 0) + (p.fy.ipd_patients || 0);
      groupAgg[gn].pttype_count += 1;
    }
    for (const r of dbPatientsPerPttype) {
      const gn = classifyPttype(r.pttype_name);
      if (!groupAgg[gn]) continue;
      groupAgg[gn].db_patients += Number(r.db_patients || 0);
    }
    const groups = GROUP_ORDER.map(gn => {
      const g = groupAgg[gn];
      g.utilization_pct = g.db_patients > 0 ? Math.round((g.period_patients / g.db_patients) * 1000) / 10 : 0;
      return g;
    }).filter(g => g.db_patients > 0 || g.period_patients > 0);

    res.json({
      data_source: 'HOSxP XE · vn_stat + an_stat + ipt + pttype + patient (custom date range)',
      timestamp: new Date().toISOString(),
      window: { from, to, label: `${from} → ${to}` },
      grand_total: gt,
      groups,
      payers,
      flagged_count: payers.filter(p => p.flag_low_collection || p.flag_high_outstanding).length,
    });
  } catch (err) {
    logger.error('screening-custom failed', { error: err.message });
    res.status(500).json({ error: err.message });
  }
});

export default router;
