// ============================================================
// BCH 360° Intelligence V.10 — Executive Overview Routes
// Aggregated dashboard for hospital executives
// Today + MTD + 3FY · OPD/IPD/ER + Service Line + Quality + Finance
// ============================================================
import { Router } from 'express';
import { dbQueryHeavy } from '../db/mysql.js';
import { cached } from '../cache/staleCache.js';
import logger from '../logger.js';

const router = Router();

function getCurrentFYBE() {
  const now = new Date();
  return (now.getMonth() + 1) >= 10 ? now.getFullYear() + 544 : now.getFullYear() + 543;
}
function fyStartCE(beFY) { return beFY - 544; }
function fyDates(fyBE) {
  const s = fyStartCE(fyBE);
  return { be: fyBE, start: `${s}-10-01`, end: `${s + 1}-09-30` };
}

// ISO date helpers (UTC-safe, no timezone drift)
function addDays(iso, n) {
  const d = new Date(iso + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}
function diffDays(fromIso, toIso) {
  const a = new Date(fromIso + 'T00:00:00Z');
  const b = new Date(toIso + 'T00:00:00Z');
  return Math.round((b - a) / 86400000);
}
function isValidIsoDate(s) {
  return typeof s === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(s) && !isNaN(new Date(s + 'T00:00:00Z').getTime());
}

// Bangkok TZ helpers — container runs UTC, but data + display are Bangkok (UTC+7)
function bkkParts(date = new Date()) {
  const fmt = (opts) => new Intl.DateTimeFormat('en-US', { ...opts, timeZone: 'Asia/Bangkok' }).format(date);
  return {
    year: Number(fmt({ year: 'numeric' })),
    month: Number(fmt({ month: 'numeric' })),
    day: Number(fmt({ day: 'numeric' })),
    hour: Number(fmt({ hour: 'numeric', hour12: false })) % 24,
  };
}

router.get(
  '/executive',
  cached('overview_executive_v14_riskbed120', 300000, async (req) => {
    // Use Bangkok TZ for all date/time (container runs UTC)
    const bkk = bkkParts();
    const today = `${bkk.year}-${String(bkk.month).padStart(2, '0')}-${String(bkk.day).padStart(2, '0')}`;
    const monthStart = `${bkk.year}-${String(bkk.month).padStart(2, '0')}-01`;
    // Date range — optional query params (?from=&to=), default MTD
    const qFrom = req.query.from;
    const qTo = req.query.to;
    const from = isValidIsoDate(qFrom) ? qFrom : monthStart;
    const toRaw = isValidIsoDate(qTo) ? qTo : today;
    const to = toRaw >= from ? toRaw : from;
    const days = diffDays(from, to) + 1; // inclusive
    // Prior period: same-length window immediately preceding `from`
    const priorTo = addDays(from, -1);
    const priorFrom = addDays(priorTo, -(days - 1));
    // Sparkline: 30 days ending at `to`
    const sparkFrom = addDays(to, -29);
    const currentFY = getCurrentFYBE();
    const fy3 = [currentFY - 2, currentFY - 1, currentFY].map(fyDates);

    const queries = await Promise.allSettled([
      // 0) OPD today (vn_stat visits)
      dbQueryHeavy('ov_opd_today', 2,
        `SELECT COUNT(DISTINCT v.vn) AS visits,
                COUNT(DISTINCT v.hn) AS unique_hn,
                ROUND(SUM(COALESCE(v.income,0))) AS income
         FROM vn_stat v WHERE v.vstdate = ?`, [today]),

      // 1) OPD range (default MTD, configurable from/to)
      dbQueryHeavy(`ov_opd_rng_${from}_${to}`, 10,
        `SELECT COUNT(DISTINCT v.vn) AS visits,
                COUNT(DISTINCT v.hn) AS unique_hn,
                ROUND(SUM(COALESCE(v.income,0))) AS income
         FROM vn_stat v WHERE v.vstdate >= ? AND v.vstdate <= ?`, [from, to]),

      // 2) IPD active beds (currently admitted) — exclude virtual Home Ward (ward='06')
      //    Bed capacity (query 17) excludes Home Ward, so active count must too for accurate ratio.
      dbQueryHeavy('ov_ipd_active_v2', 2,
        `SELECT COUNT(*) AS active_count
         FROM ipt WHERE dchdate IS NULL AND (ward IS NULL OR ward <> '06')`, []),

      // 3) IPD admissions today — exclude Home Ward
      dbQueryHeavy('ov_ipd_today_v2', 2,
        `SELECT COUNT(*) AS admits_today,
                COUNT(DISTINCT hn) AS unique_hn
         FROM ipt WHERE regdate = ? AND (ward IS NULL OR ward <> '06')`, [today]),

      // 4) IPD discharges today — exclude Home Ward
      dbQueryHeavy('ov_ipd_dch_today_v2', 2,
        `SELECT COUNT(*) AS discharges_today
         FROM ipt WHERE dchdate = ? AND (ward IS NULL OR ward <> '06')`, [today]),

      // 5) IPD range — adjrw from ipt (not an_stat) · NULLIF excludes uncoded admits
      dbQueryHeavy(`ov_ipd_rng_${from}_${to}`, 10,
        `SELECT COUNT(DISTINCT i.an) AS admissions,
                ROUND(SUM(COALESCE(a.income,0))) AS income,
                ROUND(AVG(NULLIF(i.adjrw, 0)), 3) AS avg_rw,
                COUNT(NULLIF(i.adjrw, 0)) AS rw_coded_count,
                ROUND(AVG(DATEDIFF(COALESCE(i.dchdate, CURDATE()), i.regdate)), 1) AS avg_los
         FROM ipt i LEFT JOIN an_stat a ON i.an = a.an
         WHERE i.regdate >= ? AND i.regdate <= ?`, [from, to]),

      // 6) ER today (er_regist)
      dbQueryHeavy('ov_er_today', 1,
        `SELECT COUNT(*) AS visits_today,
                SUM(CASE WHEN finish_time IS NULL THEN 1 ELSE 0 END) AS in_er_now,
                SUM(CASE WHEN er_pt_type = '2' THEN 1 ELSE 0 END) AS trauma_today
         FROM er_regist WHERE vstdate = ?`, [today]),

      // 7) ER range
      dbQueryHeavy(`ov_er_rng_${from}_${to}`, 10,
        `SELECT COUNT(*) AS visits,
                SUM(CASE WHEN er_pt_type = '2' THEN 1 ELSE 0 END) AS trauma
         FROM er_regist WHERE vstdate >= ? AND vstdate <= ?`, [from, to]),

      // 8) 3 FY revenue (vn_stat + an_stat combined)
      dbQueryHeavy(`ov_3fy_revenue_${currentFY}`, 60,
        `SELECT
           SUM(CASE WHEN v.vstdate BETWEEN ? AND ? THEN v.income ELSE 0 END) AS opd_fy0,
           SUM(CASE WHEN v.vstdate BETWEEN ? AND ? THEN v.income ELSE 0 END) AS opd_fy1,
           SUM(CASE WHEN v.vstdate BETWEEN ? AND LEAST(?, CURDATE()) THEN v.income ELSE 0 END) AS opd_fy2,
           SUM(CASE WHEN v.vstdate BETWEEN ? AND ? THEN 1 ELSE 0 END) AS opd_v_fy0,
           SUM(CASE WHEN v.vstdate BETWEEN ? AND ? THEN 1 ELSE 0 END) AS opd_v_fy1,
           SUM(CASE WHEN v.vstdate BETWEEN ? AND LEAST(?, CURDATE()) THEN 1 ELSE 0 END) AS opd_v_fy2
         FROM vn_stat v WHERE v.vstdate BETWEEN ? AND LEAST(?, CURDATE()) AND v.income > 0`,
        [
          fy3[0].start, fy3[0].end,
          fy3[1].start, fy3[1].end,
          fy3[2].start, fy3[2].end,
          fy3[0].start, fy3[0].end,
          fy3[1].start, fy3[1].end,
          fy3[2].start, fy3[2].end,
          fy3[0].start, fy3[2].end,
        ]),

      // 9) 3 FY IPD revenue
      dbQueryHeavy(`ov_3fy_ipd_${currentFY}`, 60,
        `SELECT
           SUM(CASE WHEN i.regdate BETWEEN ? AND ? THEN a.income ELSE 0 END) AS ipd_fy0,
           SUM(CASE WHEN i.regdate BETWEEN ? AND ? THEN a.income ELSE 0 END) AS ipd_fy1,
           SUM(CASE WHEN i.regdate BETWEEN ? AND LEAST(?, CURDATE()) THEN a.income ELSE 0 END) AS ipd_fy2
         FROM ipt i LEFT JOIN an_stat a ON i.an = a.an
         WHERE i.regdate BETWEEN ? AND LEAST(?, CURDATE()) AND i.dchdate IS NOT NULL`,
        [
          fy3[0].start, fy3[0].end,
          fy3[1].start, fy3[1].end,
          fy3[2].start, fy3[2].end,
          fy3[0].start, fy3[2].end,
        ]),

      // 10) Service line MTD — 12 lines × 2 metrics (visits + revenue) using _v/_r suffix
      dbQueryHeavy(`ov_svc_rng_v7_${from}_${to}`, 10,
        `SELECT
           (SELECT COUNT(DISTINCT vn) FROM opitemrece WHERE vstdate BETWEEN ? AND ?) AS pharmacy_v,
           (SELECT ROUND(COALESCE(SUM(sum_price),0)) FROM opitemrece WHERE vstdate BETWEEN ? AND ?) AS pharmacy_r,
           (SELECT COUNT(DISTINCT vn) FROM lab_head WHERE order_date BETWEEN ? AND ?) AS lab_v,
           (SELECT ROUND(COALESCE(SUM(confirm_charge_money),0)) FROM lab_head WHERE order_date BETWEEN ? AND ?) AS lab_r,
           (SELECT COUNT(DISTINCT vn) FROM xray_report WHERE request_date BETWEEN ? AND ?) AS xray_v,
           (SELECT ROUND(COALESCE(SUM(service_price),0)) FROM xray_report WHERE request_date BETWEEN ? AND ?) AS xray_r,
           (SELECT COUNT(*) FROM ovst o JOIN kskdepartment d ON o.main_dep = d.depcode
              WHERE o.vstdate BETWEEN ? AND ? AND d.department REGEXP 'ทันตกรรม|Dental|ฟัน') AS dental_v,
           (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o JOIN kskdepartment d ON o.main_dep = d.depcode
              LEFT JOIN vn_stat v ON v.vn = o.vn
              WHERE o.vstdate BETWEEN ? AND ? AND d.department REGEXP 'ทันตกรรม|Dental|ฟัน') AS dental_r,
           (SELECT COUNT(*) FROM ovst o JOIN kskdepartment d ON o.main_dep = d.depcode
              WHERE o.vstdate BETWEEN ? AND ? AND d.department REGEXP 'กายภาพ|PT|Physical|Rehab') AS pt_v,
           (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o JOIN kskdepartment d ON o.main_dep = d.depcode
              LEFT JOIN vn_stat v ON v.vn = o.vn
              WHERE o.vstdate BETWEEN ? AND ? AND d.department REGEXP 'กายภาพ|PT|Physical|Rehab') AS pt_r,
           (SELECT COUNT(*) FROM ovst o JOIN kskdepartment d ON o.main_dep = d.depcode
              WHERE o.vstdate BETWEEN ? AND ? AND d.department REGEXP 'แพทย์แผนไทย|Thai|TM|นวด|สมุนไพร') AS thaimed_v,
           (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o JOIN kskdepartment d ON o.main_dep = d.depcode
              LEFT JOIN vn_stat v ON v.vn = o.vn
              WHERE o.vstdate BETWEEN ? AND ? AND d.department REGEXP 'แพทย์แผนไทย|Thai|TM|นวด|สมุนไพร') AS thaimed_r,
           (SELECT COUNT(*) FROM ovst o WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep = '140') AS dept_140_v,
           (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o LEFT JOIN vn_stat v ON v.vn = o.vn WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep = '140') AS dept_140_r,
           (SELECT COUNT(*) FROM ovst o WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep = '143') AS dept_143_v,
           (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o LEFT JOIN vn_stat v ON v.vn = o.vn WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep = '143') AS dept_143_r,
           (SELECT COUNT(*) FROM ovst o WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep = '145') AS dept_145_v,
           (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o LEFT JOIN vn_stat v ON v.vn = o.vn WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep = '145') AS dept_145_r,
           (SELECT COUNT(*) FROM ovst o WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep = '040') AS dept_040_v,
           (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o LEFT JOIN vn_stat v ON v.vn = o.vn WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep = '040') AS dept_040_r,
           (SELECT COUNT(*) FROM ovst o WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep = '053') AS dept_053_v,
           (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o LEFT JOIN vn_stat v ON v.vn = o.vn WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep = '053') AS dept_053_r,
           (SELECT COUNT(*) FROM ovst o WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep = '130') AS dept_130_v,
           (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o LEFT JOIN vn_stat v ON v.vn = o.vn WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep = '130') AS dept_130_r`,
        Array(24).fill(null).flatMap(() => [from, to])),

      // 11) NCD top diagnoses (HT/DM/CKD) for range
      dbQueryHeavy(`ov_ncd_rng_${from}_${to}`, 10,
        `SELECT
           SUM(CASE WHEN v.pdx LIKE 'I10%' THEN 1 ELSE 0 END) AS ht,
           SUM(CASE WHEN v.pdx LIKE 'E11%' THEN 1 ELSE 0 END) AS dm,
           SUM(CASE WHEN v.pdx LIKE 'N18%' THEN 1 ELSE 0 END) AS ckd,
           SUM(CASE WHEN v.pdx LIKE 'E78%' THEN 1 ELSE 0 END) AS dlp,
           SUM(CASE WHEN v.pdx LIKE 'I25%' THEN 1 ELSE 0 END) AS ihd,
           SUM(CASE WHEN v.pdx LIKE 'I69%' OR v.pdx LIKE 'I6[0-4]%' THEN 1 ELSE 0 END) AS stroke,
           SUM(CASE WHEN v.pdx LIKE 'J44%' THEN 1 ELSE 0 END) AS copd
         FROM vn_stat v WHERE v.vstdate >= ? AND v.vstdate <= ? AND v.pdx IS NOT NULL AND v.pdx != ''`,
        [from, to]),

      // 12) Outstanding aging summary (all-time outstanding)
      dbQueryHeavy('ov_aging_v1', 30,
        `SELECT
           SUM(CASE WHEN DATEDIFF(CURDATE(), v.vstdate) <= 30 THEN GREATEST(COALESCE(v.income,0) - COALESCE(v.paid_money,0), 0) ELSE 0 END) AS a0_30,
           SUM(CASE WHEN DATEDIFF(CURDATE(), v.vstdate) BETWEEN 31 AND 90 THEN GREATEST(COALESCE(v.income,0) - COALESCE(v.paid_money,0), 0) ELSE 0 END) AS a31_90,
           SUM(CASE WHEN DATEDIFF(CURDATE(), v.vstdate) BETWEEN 91 AND 180 THEN GREATEST(COALESCE(v.income,0) - COALESCE(v.paid_money,0), 0) ELSE 0 END) AS a91_180,
           SUM(CASE WHEN DATEDIFF(CURDATE(), v.vstdate) > 180 THEN GREATEST(COALESCE(v.income,0) - COALESCE(v.paid_money,0), 0) ELSE 0 END) AS a180p
         FROM vn_stat v
         WHERE v.vstdate >= ? AND v.vstdate <= CURDATE() AND COALESCE(v.income,0) > COALESCE(v.paid_money,0)`,
        [fy3[0].start]),

      // 13) Unique patients in range (loyalty)
      dbQueryHeavy(`ov_loyalty_${from}_${to}`, 30,
        `SELECT COUNT(DISTINCT o.hn) AS mtd_unique
         FROM ovst o WHERE o.vstdate >= ? AND o.vstdate <= ? AND o.hn IS NOT NULL AND o.hn <> ''`,
        [from, to]),

      // 14) HA Quality KPIs (approximate from existing data) — placeholders
      Promise.resolve([{ ha_score: null }]),

      // 15) Service lines TODAY — return BOTH visits (_v) + revenue (_r) for all 12 lines
      // Ancillary 3: pharmacy/lab/xray use specific revenue fields (opitemrece.sum_price etc.)
      // Clinic 9: dental/pt/thaimed/PMCx3/HD/inject/sleep use vn_stat.income via ovst JOIN
      dbQueryHeavy(`ov_svc_today_v4_${today}`, 2,
        `SELECT
           (SELECT COUNT(DISTINCT vn) FROM opitemrece WHERE vstdate = ?) AS pharmacy_v,
           (SELECT ROUND(COALESCE(SUM(sum_price),0)) FROM opitemrece WHERE vstdate = ?) AS pharmacy_r,
           (SELECT COUNT(DISTINCT vn) FROM lab_head WHERE order_date = ?) AS lab_v,
           (SELECT ROUND(COALESCE(SUM(confirm_charge_money),0)) FROM lab_head WHERE order_date = ?) AS lab_r,
           (SELECT COUNT(DISTINCT vn) FROM xray_report WHERE request_date = ?) AS xray_v,
           (SELECT ROUND(COALESCE(SUM(service_price),0)) FROM xray_report WHERE request_date = ?) AS xray_r,
           (SELECT COUNT(*) FROM ovst o JOIN kskdepartment d ON o.main_dep = d.depcode
              WHERE o.vstdate = ? AND d.department REGEXP 'ทันตกรรม|Dental|ฟัน') AS dental_v,
           (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o JOIN kskdepartment d ON o.main_dep = d.depcode
              LEFT JOIN vn_stat v ON v.vn = o.vn
              WHERE o.vstdate = ? AND d.department REGEXP 'ทันตกรรม|Dental|ฟัน') AS dental_r,
           (SELECT COUNT(*) FROM ovst o JOIN kskdepartment d ON o.main_dep = d.depcode
              WHERE o.vstdate = ? AND d.department REGEXP 'กายภาพ|PT|Physical|Rehab') AS pt_v,
           (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o JOIN kskdepartment d ON o.main_dep = d.depcode
              LEFT JOIN vn_stat v ON v.vn = o.vn
              WHERE o.vstdate = ? AND d.department REGEXP 'กายภาพ|PT|Physical|Rehab') AS pt_r,
           (SELECT COUNT(*) FROM ovst o JOIN kskdepartment d ON o.main_dep = d.depcode
              WHERE o.vstdate = ? AND d.department REGEXP 'แพทย์แผนไทย|Thai|TM|นวด|สมุนไพร') AS thaimed_v,
           (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o JOIN kskdepartment d ON o.main_dep = d.depcode
              LEFT JOIN vn_stat v ON v.vn = o.vn
              WHERE o.vstdate = ? AND d.department REGEXP 'แพทย์แผนไทย|Thai|TM|นวด|สมุนไพร') AS thaimed_r,
           (SELECT COUNT(*) FROM ovst o WHERE o.vstdate = ? AND o.main_dep = '140') AS dept_140_v,
           (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o LEFT JOIN vn_stat v ON v.vn = o.vn WHERE o.vstdate = ? AND o.main_dep = '140') AS dept_140_r,
           (SELECT COUNT(*) FROM ovst o WHERE o.vstdate = ? AND o.main_dep = '143') AS dept_143_v,
           (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o LEFT JOIN vn_stat v ON v.vn = o.vn WHERE o.vstdate = ? AND o.main_dep = '143') AS dept_143_r,
           (SELECT COUNT(*) FROM ovst o WHERE o.vstdate = ? AND o.main_dep = '145') AS dept_145_v,
           (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o LEFT JOIN vn_stat v ON v.vn = o.vn WHERE o.vstdate = ? AND o.main_dep = '145') AS dept_145_r,
           (SELECT COUNT(*) FROM ovst o WHERE o.vstdate = ? AND o.main_dep = '040') AS dept_040_v,
           (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o LEFT JOIN vn_stat v ON v.vn = o.vn WHERE o.vstdate = ? AND o.main_dep = '040') AS dept_040_r,
           (SELECT COUNT(*) FROM ovst o WHERE o.vstdate = ? AND o.main_dep = '053') AS dept_053_v,
           (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o LEFT JOIN vn_stat v ON v.vn = o.vn WHERE o.vstdate = ? AND o.main_dep = '053') AS dept_053_r,
           (SELECT COUNT(*) FROM ovst o WHERE o.vstdate = ? AND o.main_dep = '130') AS dept_130_v,
           (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o LEFT JOIN vn_stat v ON v.vn = o.vn WHERE o.vstdate = ? AND o.main_dep = '130') AS dept_130_r`,
        Array(24).fill(today)),

      // 16) NCD TODAY
      dbQueryHeavy(`ov_ncd_today_${today}`, 2,
        `SELECT
           SUM(CASE WHEN v.pdx LIKE 'I10%' THEN 1 ELSE 0 END) AS ht,
           SUM(CASE WHEN v.pdx LIKE 'E11%' THEN 1 ELSE 0 END) AS dm,
           SUM(CASE WHEN v.pdx LIKE 'N18%' THEN 1 ELSE 0 END) AS ckd,
           SUM(CASE WHEN v.pdx LIKE 'E78%' THEN 1 ELSE 0 END) AS dlp,
           SUM(CASE WHEN v.pdx LIKE 'I25%' THEN 1 ELSE 0 END) AS ihd,
           SUM(CASE WHEN v.pdx LIKE 'I69%' OR v.pdx LIKE 'I6[0-4]%' THEN 1 ELSE 0 END) AS stroke,
           SUM(CASE WHEN v.pdx LIKE 'J44%' THEN 1 ELSE 0 END) AS copd
         FROM vn_stat v WHERE v.vstdate = ? AND v.pdx IS NOT NULL AND v.pdx != ''`, [today]),

      // 17) IPD bed capacity — physical inpatient beds (exclude virtual Home Ward '06')
      dbQueryHeavy('ov_ward_capacity_v2', 60,
        `SELECT
           SUM(COALESCE(bedcount, 0)) AS total_beds,
           SUM(COALESCE(real_bedcount, 0)) AS real_beds,
           COUNT(*) AS ward_count
         FROM ward
         WHERE ward_active = 'Y'
           AND ward NOT IN ('06')
           AND (name NOT REGEXP 'Home Ward|home ward' OR name IS NULL)`, []),

      // 18) Quality scorecard — MRA OPD + IPD coding rate (MTD)
      // OPD: % of visits with at least 1 diagnosis recorded (ovstdiag exists)
      // IPD: % of discharged-eligible (3-day grace) admits with an_stat.pdx coded
      // Schema note: pdx lives on an_stat, NOT on ipt (verified 2026-05-13)
      dbQueryHeavy(`ov_quality_rng_v2_${from}_${to}`, 10,
        `SELECT
           (SELECT COUNT(*) FROM ovst o WHERE o.vstdate BETWEEN ? AND ?) AS opd_total,
           (SELECT COUNT(*) FROM ovst o WHERE o.vstdate BETWEEN ? AND ?
             AND EXISTS(SELECT 1 FROM ovstdiag d WHERE d.vn = o.vn)) AS opd_coded,
           (SELECT COUNT(*) FROM ipt i
             WHERE i.regdate BETWEEN ? AND ?
               AND i.dchdate IS NOT NULL
               AND i.dchdate <= DATE_SUB(CURDATE(), INTERVAL 3 DAY)) AS ipd_eligible,
           (SELECT COUNT(*) FROM ipt i JOIN an_stat a ON i.an = a.an
             WHERE i.regdate BETWEEN ? AND ?
               AND i.dchdate IS NOT NULL
               AND i.dchdate <= DATE_SUB(CURDATE(), INTERVAL 3 DAY)
               AND a.pdx IS NOT NULL AND a.pdx != '') AS ipd_coded`,
        [from, to, from, to, from, to, from, to]),

      // 19) NCD control proxy — HT/DM follow-up volume MTD (chronic care monitoring)
      // Counts patients with HT/DM Dx and Lab orders this month (proxy for "monitored")
      dbQueryHeavy(`ov_ncd_followup_${from}_${to}`, 30,
        `SELECT
           COUNT(DISTINCT CASE WHEN v.pdx LIKE 'I10%' THEN v.hn END) AS ht_patients,
           COUNT(DISTINCT CASE WHEN v.pdx LIKE 'E11%' THEN v.hn END) AS dm_patients,
           COUNT(DISTINCT CASE WHEN v.pdx LIKE 'N18%' THEN v.hn END) AS ckd_patients
         FROM vn_stat v
         WHERE v.vstdate BETWEEN ? AND ?
           AND v.pdx IS NOT NULL AND v.pdx != ''`,
        [from, to]),

      // 20) Prior period — same length window before `from` · for delta% compare
      dbQueryHeavy(`ov_prior_${priorFrom}_${priorTo}`, 30,
        `SELECT
           (SELECT COUNT(DISTINCT v.vn) FROM vn_stat v WHERE v.vstdate BETWEEN ? AND ?) AS opd_visits,
           (SELECT ROUND(SUM(COALESCE(v.income,0))) FROM vn_stat v WHERE v.vstdate BETWEEN ? AND ?) AS opd_income,
           (SELECT COUNT(DISTINCT i.an) FROM ipt i WHERE i.regdate BETWEEN ? AND ?) AS ipd_admissions,
           (SELECT ROUND(SUM(COALESCE(a.income,0))) FROM ipt i LEFT JOIN an_stat a ON i.an=a.an WHERE i.regdate BETWEEN ? AND ?) AS ipd_income,
           (SELECT ROUND(AVG(NULLIF(i.adjrw, 0)), 3) FROM ipt i WHERE i.regdate BETWEEN ? AND ?) AS ipd_adjrw,
           (SELECT COUNT(*) FROM er_regist WHERE vstdate BETWEEN ? AND ?) AS er_visits,
           (SELECT SUM(CASE WHEN er_pt_type='2' THEN 1 ELSE 0 END) FROM er_regist WHERE vstdate BETWEEN ? AND ?) AS er_trauma,
           (SELECT COUNT(DISTINCT o.hn) FROM ovst o WHERE o.vstdate BETWEEN ? AND ? AND o.hn IS NOT NULL AND o.hn <> '') AS unique_patients`,
        [priorFrom, priorTo, priorFrom, priorTo, priorFrom, priorTo, priorFrom, priorTo, priorFrom, priorTo, priorFrom, priorTo, priorFrom, priorTo, priorFrom, priorTo]),

      // 21) Sparkline — daily series for last 30 days ending at `to`
      // Each row = 1 day · used by frontend for mini-charts on KPI cards
      dbQueryHeavy(`ov_spark_${sparkFrom}_${to}`, 30,
        `SELECT d.day,
                COALESCE(opd.visits, 0) AS opd_visits,
                COALESCE(opd.income, 0) AS opd_income,
                COALESCE(ipd.admits, 0) AS ipd_admits,
                COALESCE(er.visits, 0) AS er_visits,
                COALESCE(er.trauma, 0) AS er_trauma
         FROM (
           SELECT DATE_SUB(?, INTERVAL n DAY) AS day
           FROM (SELECT 0 AS n UNION SELECT 1 UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6 UNION SELECT 7 UNION SELECT 8 UNION SELECT 9
                 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12 UNION SELECT 13 UNION SELECT 14 UNION SELECT 15 UNION SELECT 16 UNION SELECT 17 UNION SELECT 18 UNION SELECT 19
                 UNION SELECT 20 UNION SELECT 21 UNION SELECT 22 UNION SELECT 23 UNION SELECT 24 UNION SELECT 25 UNION SELECT 26 UNION SELECT 27 UNION SELECT 28 UNION SELECT 29) AS nums
         ) d
         LEFT JOIN (SELECT vstdate, COUNT(DISTINCT vn) AS visits, ROUND(SUM(COALESCE(income,0))) AS income FROM vn_stat WHERE vstdate BETWEEN ? AND ? GROUP BY vstdate) opd ON opd.vstdate = d.day
         LEFT JOIN (SELECT regdate, COUNT(*) AS admits FROM ipt WHERE regdate BETWEEN ? AND ? GROUP BY regdate) ipd ON ipd.regdate = d.day
         LEFT JOIN (SELECT vstdate, COUNT(*) AS visits, SUM(CASE WHEN er_pt_type='2' THEN 1 ELSE 0 END) AS trauma FROM er_regist WHERE vstdate BETWEEN ? AND ? GROUP BY vstdate) er ON er.vstdate = d.day
         ORDER BY d.day ASC`,
        [to, sparkFrom, to, sparkFrom, to, sparkFrom, to]),

      // 22) ER hourly arrival pattern over last 30 days (avg per hour-of-day)
      // Used for forecasting next-N-hour ER load based on historical pattern
      dbQueryHeavy(`ov_er_hourly_pattern_${sparkFrom}_${to}`, 60,
        `SELECT HOUR(enter_er_time) AS hr, COUNT(*) AS total_arrivals, COUNT(DISTINCT vstdate) AS day_count
         FROM er_regist
         WHERE vstdate BETWEEN ? AND ? AND enter_er_time IS NOT NULL
         GROUP BY HOUR(enter_er_time)
         ORDER BY hr ASC`,
        [sparkFrom, addDays(to, -1)]),

      // 23) ER today by hour (arrivals so far today)
      dbQueryHeavy('ov_er_today_hourly', 2,
        `SELECT HOUR(enter_er_time) AS hr, COUNT(*) AS arrivals
         FROM er_regist
         WHERE vstdate = CURDATE() AND enter_er_time IS NOT NULL
         GROUP BY HOUR(enter_er_time)
         ORDER BY hr ASC`, []),
    ]);

    const v = i => queries[i].status === 'fulfilled' ? (queries[i].value?.[0] || {}) : {};
    const vArr = i => queries[i].status === 'fulfilled' ? (queries[i].value || []) : [];
    const num = x => Number(x || 0);

    const opdToday = v(0);
    const opdRng = v(1);
    const ipdActive = v(2);
    const ipdToday = v(3);
    const ipdDchToday = v(4);
    const ipdRng = v(5);
    const erToday = v(6);
    const erRng = v(7);
    const fyRev = v(8);
    const fyIpd = v(9);
    const svc = v(10);
    const ncd = v(11);
    const aging = v(12);
    const loyalty = v(13);
    const svcToday = v(15);
    const ncdToday = v(16);
    const wardCap = v(17);
    const qualityRng = v(18);
    const ncdFollow = v(19);
    const prior = v(20);
    const sparkRows = vArr(21);
    const erHourlyRows = vArr(22);
    const erTodayHourlyRows = vArr(23);

    const opdTotal = num(qualityRng.opd_total);
    const opdCoded = num(qualityRng.opd_coded);
    const ipdEligible = num(qualityRng.ipd_eligible);
    const ipdCoded = num(qualityRng.ipd_coded);

    // ── Compare: current vs prior period ─────────────────
    const delta = (cur, prev) => {
      if (!prev || prev === 0) return { current: cur, prior: prev, delta_pct: null };
      return { current: cur, prior: prev, delta_pct: Math.round(((cur - prev) / prev) * 1000) / 10 };
    };
    const compare = {
      opd_visits: delta(num(opdRng.visits), num(prior.opd_visits)),
      opd_income: delta(num(opdRng.income), num(prior.opd_income)),
      ipd_admissions: delta(num(ipdRng.admissions), num(prior.ipd_admissions)),
      ipd_income: delta(num(ipdRng.income), num(prior.ipd_income)),
      ipd_adjrw: delta(num(ipdRng.avg_rw), num(prior.ipd_adjrw)),
      er_visits: delta(num(erRng.visits), num(prior.er_visits)),
      er_trauma: delta(num(erRng.trauma), num(prior.er_trauma)),
      unique_patients: delta(num(loyalty.mtd_unique), num(prior.unique_patients)),
    };

    // ── Sparklines: daily series, fill missing days with 0 ─────────────
    const formatDay = r => r.day instanceof Date ? r.day.toISOString().slice(0, 10) : String(r.day).slice(0, 10);
    const sparkSorted = [...sparkRows].sort((a, b) => formatDay(a) < formatDay(b) ? -1 : 1);
    const sparklines = {
      days: sparkSorted.map(formatDay),
      opd_visits: sparkSorted.map(r => num(r.opd_visits)),
      opd_income: sparkSorted.map(r => num(r.opd_income)),
      ipd_admits: sparkSorted.map(r => num(r.ipd_admits)),
      er_visits: sparkSorted.map(r => num(r.er_visits)),
      er_trauma: sparkSorted.map(r => num(r.er_trauma)),
    };

    // ── Forecast: linear projection to end-of-month + end-of-FY ─────
    const forecastForRange = (currentVal) => {
      // pace-based extrapolation: current ÷ days_elapsed × total_days_in_window
      if (days <= 0) return null;
      // EOM projection: project to last day of `from`'s month
      const fromDate = new Date(from + 'T00:00:00Z');
      const eom = new Date(Date.UTC(fromDate.getUTCFullYear(), fromDate.getUTCMonth() + 1, 0));
      const eomIso = eom.toISOString().slice(0, 10);
      const daysInMonth = eom.getUTCDate();
      const eomDaysElapsed = Math.min(daysInMonth, diffDays(`${from.slice(0,8)}01`, to) + 1);
      const eomProj = eomDaysElapsed > 0 ? Math.round(currentVal / eomDaysElapsed * daysInMonth) : currentVal;
      return { value: eomProj, eom: eomIso, days_elapsed: eomDaysElapsed, days_in_month: daysInMonth };
    };
    const fy2 = fy3[2];
    const fyDaysElapsed = Math.max(1, diffDays(fy2.start, to) + 1);
    const fyTotalDays = 365;
    const fyProject = (val) => Math.round(val / fyDaysElapsed * fyTotalDays);

    const forecast = {
      eom_opd_visits: forecastForRange(num(opdRng.visits)),
      eom_opd_income: forecastForRange(num(opdRng.income)),
      eom_ipd_admissions: forecastForRange(num(ipdRng.admissions)),
      eom_ipd_income: forecastForRange(num(ipdRng.income)),
      eom_er_visits: forecastForRange(num(erRng.visits)),
      fy_opd_income_projection: fyProject(num(fyRev.opd_fy2)),
      fy_ipd_income_projection: fyProject(num(fyIpd.ipd_fy2)),
      fy_total_income_projection: fyProject(num(fyRev.opd_fy2) + num(fyIpd.ipd_fy2)),
      fy_days_elapsed: fyDaysElapsed,
      fy_total_days: fyTotalDays,
      fy_end: fy2.end,
    };

    // ── Anomaly detection: today vs prior 28-day mean ± 2σ ───────
    function detectAnomaly(series, todayVal) {
      // series is full 30-day; use first 28 as baseline (exclude last 2 days incl today)
      if (!Array.isArray(series) || series.length < 14) return null;
      const baseline = series.slice(0, Math.max(0, series.length - 2));
      const n = baseline.length;
      if (n < 7) return null;
      const mean = baseline.reduce((a, b) => a + b, 0) / n;
      const variance = baseline.reduce((s, x) => s + (x - mean) ** 2, 0) / n;
      const stddev = Math.sqrt(variance);
      const z = stddev > 0 ? (todayVal - mean) / stddev : 0;
      const absZ = Math.abs(z);
      if (absZ < 2) return null; // within normal
      return {
        direction: z > 0 ? 'surge' : 'drop',
        z_score: Math.round(z * 100) / 100,
        baseline_mean: Math.round(mean * 100) / 100,
        baseline_stddev: Math.round(stddev * 100) / 100,
        today: todayVal,
        severity: absZ >= 3 ? 'critical' : 'warn',
      };
    }

    const anomalies = {
      opd_visits: detectAnomaly(sparklines.opd_visits, num(opdToday.visits)),
      ipd_admits: detectAnomaly(sparklines.ipd_admits, num(ipdToday.admits_today)),
      er_visits: detectAnomaly(sparklines.er_visits, num(erToday.visits_today)),
      er_trauma: detectAnomaly(sparklines.er_trauma, num(erToday.trauma_today)),
    };

    // ── ER hourly forecast: build 24-hour avg pattern + next-N hours projection
    const erHourPattern = Array(24).fill(0);
    const erHourDays = Array(24).fill(0);
    erHourlyRows.forEach(r => {
      const h = num(r.hr);
      if (h >= 0 && h < 24) {
        erHourPattern[h] = num(r.total_arrivals);
        erHourDays[h] = num(r.day_count) || 1;
      }
    });
    const erHourAvg = erHourPattern.map((total, h) => Math.round((total / Math.max(1, erHourDays[h])) * 10) / 10);
    const erHourToday = Array(24).fill(0);
    erTodayHourlyRows.forEach(r => {
      const h = num(r.hr);
      if (h >= 0 && h < 24) erHourToday[h] = num(r.arrivals);
    });
    const nowHr = bkk.hour;
    const next6 = [];
    for (let i = 1; i <= 6; i++) {
      const h = (nowHr + i) % 24;
      next6.push({ hour: h, predicted: erHourAvg[h] || 0 });
    }
    const next6Total = Math.round(next6.reduce((s, x) => s + x.predicted, 0));
    const erPredictive = {
      current_hour: nowHr,
      hour_avg_30d: erHourAvg,
      hour_today: erHourToday,
      next_6h_predicted: next6,
      next_6h_total: next6Total,
      peak_hour: erHourAvg.indexOf(Math.max(...erHourAvg)),
      peak_hour_avg: Math.max(...erHourAvg),
    };

    // ── Composite Risk Score (0-100) ──────────────────────────
    // Weighted: bed occupancy 25%, ER surge 20%, AdjRW gap 15%, IPD coding 15%, OPD coding 10%, anomalies 15%
    // Use operational 120-bed capacity (BCH actual physical beds), NOT ward.bedcount SUM (346 includes specialty/Home Ward)
    const wardCapNum = 120;
    const bedOccup = num(ipdActive.active_count) / wardCapNum;
    const occupRisk = Math.min(100, bedOccup * 100);
    const erInNow = num(erToday.in_er_now);
    const erRisk = Math.min(100, (erInNow / 15) * 100);
    const adjrwGap = Math.max(0, 0.85 - num(ipdRng.avg_rw)) / 0.85 * 100;
    const ipdCodingRisk = Math.max(0, 100 - (qualityRng.ipd_eligible > 0 ? (qualityRng.ipd_coded / qualityRng.ipd_eligible * 100) : 100));
    const opdCodingRisk = Math.max(0, 100 - (qualityRng.opd_total > 0 ? (qualityRng.opd_coded / qualityRng.opd_total * 100) : 100));
    const anomalyCount = Object.values(anomalies).filter(a => a?.severity).length;
    const anomalyRisk = Math.min(100, anomalyCount * 25);

    const riskScore = Math.round(
      occupRisk * 0.25 +
      erRisk * 0.20 +
      adjrwGap * 0.15 +
      ipdCodingRisk * 0.15 +
      opdCodingRisk * 0.10 +
      anomalyRisk * 0.15
    );
    const risk = {
      score: riskScore,
      level: riskScore >= 66 ? 'critical' : riskScore >= 33 ? 'warn' : 'normal',
      breakdown: {
        bed_occupancy: Math.round(occupRisk),
        er_surge: Math.round(erRisk),
        adjrw_gap: Math.round(adjrwGap),
        ipd_coding: Math.round(ipdCodingRisk),
        opd_coding: Math.round(opdCodingRisk),
        anomaly: Math.round(anomalyRisk),
      },
    };

    // ── Auto-Recommended Actions (rule engine, priority-ranked) ──
    const recs = [];
    if (bedOccup > 1.0) recs.push({ priority: 1, icon: '🛏️', tab: 'ipd', title: 'IPD เกินขีดความสามารถ', action: `เปิด step-down ward · เร่ง discharge planning · alert ทรัพยากร · ปัจจุบัน ${num(ipdActive.active_count)}/${wardCapNum} เตียง (${Math.round(bedOccup*100)}%)` });
    else if (bedOccup > 0.9) recs.push({ priority: 2, icon: '🛏️', tab: 'ipd', title: 'IPD ใกล้เต็ม', action: `ทบทวน pipeline admit · monitor discharge · ${Math.round(bedOccup*100)}% ของเตียงปกติ` });
    if (erInNow > 15) recs.push({ priority: 1, icon: '🚑', tab: 'er', title: 'ER surge — กำลังตรวจ ' + erInNow + ' ราย', action: 'เรียก backup MD/RN · ทบทวน triage · พิจารณา diversion' });
    else if (erInNow > 10) recs.push({ priority: 2, icon: '🚑', tab: 'er', title: 'ER ใกล้ surge', action: 'pre-call backup · เร่ง disposition · monitor wait time' });
    if (next6Total > 30) recs.push({ priority: 2, icon: '⏰', tab: 'er', title: `ER 6 ชม.ข้างหน้า: คาดว่า ${next6Total} ราย`, action: 'เตรียมทีม shift ถัดไป · ตรวจสอบเตียง ER + ทรัพยากร' });
    if (num(ipdRng.avg_rw) < 0.5) recs.push({ priority: 1, icon: '💰', tab: 'medrec', title: 'AdjRW ต่ำมาก — เสี่ยง reimbursement', action: `AdjRW ${num(ipdRng.avg_rw).toFixed(2)} (target ≥ 0.85) · audit DRG coding · ฝึก coder · review pending cases` });
    else if (num(ipdRng.avg_rw) < 0.8) recs.push({ priority: 2, icon: '💰', tab: 'medrec', title: 'AdjRW ต่ำกว่า target', action: `AdjRW ${num(ipdRng.avg_rw).toFixed(2)} (target 0.85) · เร่ง coding completeness` });
    if (qualityRng.ipd_eligible > 0 && qualityRng.ipd_coded / qualityRng.ipd_eligible < 0.6) {
      const r = Math.round(qualityRng.ipd_coded / qualityRng.ipd_eligible * 100);
      recs.push({ priority: 1, icon: '📋', tab: 'medrec', title: `IPD coding rate ${r}% (target ≥95%)`, action: `เร่ง DRG coding · pending ${qualityRng.ipd_eligible - qualityRng.ipd_coded} admits · กระทบ AdjRW + reimbursement โดยตรง` });
    }
    Object.entries(anomalies).forEach(([key, a]) => {
      if (a?.severity) {
        const labels = { opd_visits: 'OPD visits', ipd_admits: 'IPD admit', er_visits: 'ER visits', er_trauma: 'ER Trauma' };
        const tabs = { opd_visits: 'opd', ipd_admits: 'ipd', er_visits: 'er', er_trauma: 'eraudit' };
        recs.push({
          priority: a.severity === 'critical' ? 1 : 2,
          icon: a.direction === 'surge' ? '⚡' : '📉',
          tab: tabs[key],
          title: `${labels[key]} ${a.direction === 'surge' ? 'สูงผิดปกติ' : 'ต่ำผิดปกติ'} (z=${a.z_score})`,
          action: `วันนี้ ${a.today} vs baseline ${a.baseline_mean} ± ${a.baseline_stddev} (30 วัน) · ตรวจสอบสาเหตุ + ทำ root cause analysis`,
        });
      }
    });
    // sort by priority (1=critical first) then keep top 8
    recs.sort((a, b) => a.priority - b.priority);
    const recommendations = recs.slice(0, 8);

    // Build 3-FY revenue array
    const fy3Revenue = [
      { be: fy3[0].be, opd_income: num(fyRev.opd_fy0), opd_visits: num(fyRev.opd_v_fy0), ipd_income: num(fyIpd.ipd_fy0) },
      { be: fy3[1].be, opd_income: num(fyRev.opd_fy1), opd_visits: num(fyRev.opd_v_fy1), ipd_income: num(fyIpd.ipd_fy1) },
      { be: fy3[2].be, opd_income: num(fyRev.opd_fy2), opd_visits: num(fyRev.opd_v_fy2), ipd_income: num(fyIpd.ipd_fy2) },
    ].map(f => ({ ...f, total_income: f.opd_income + f.ipd_income }));

    return {
      data_source: 'HOSxP XE · multi-source aggregator',
      timestamp: new Date().toISOString(),
      today, month_start: monthStart,
      fiscal_years: fy3,
      current_fy: currentFY,

      range: { from, to, days, prior_from: priorFrom, prior_to: priorTo, spark_from: sparkFrom },

      today_snapshot: {
        opd: { visits: num(opdToday.visits), unique_hn: num(opdToday.unique_hn), income: num(opdToday.income) },
        ipd: {
          active_beds: num(ipdActive.active_count),
          admits_today: num(ipdToday.admits_today),
          discharges_today: num(ipdDchToday.discharges_today),
          unique_hn_today: num(ipdToday.unique_hn),
        },
        er: {
          visits_today: num(erToday.visits_today),
          in_er_now: num(erToday.in_er_now),
          trauma_today: num(erToday.trauma_today),
        },
        service_lines: {
          // Primary (backward compat): pharmacy/lab/xray = visits; 9 dept lines = revenue
          pharmacy: num(svcToday.pharmacy_v),
          lab: num(svcToday.lab_v),
          xray: num(svcToday.xray_v),
          dental: num(svcToday.dental_r),
          pt: num(svcToday.pt_r),
          thaimed: num(svcToday.thaimed_r),
          dept_140: num(svcToday.dept_140_r),
          dept_143: num(svcToday.dept_143_r),
          dept_145: num(svcToday.dept_145_r),
          dept_040: num(svcToday.dept_040_r),
          dept_053: num(svcToday.dept_053_r),
          dept_130: num(svcToday.dept_130_r),
          // Additive: both visits + revenue for all 12 lines
          pharmacy_visits: num(svcToday.pharmacy_v), pharmacy_revenue: num(svcToday.pharmacy_r),
          lab_visits: num(svcToday.lab_v), lab_revenue: num(svcToday.lab_r),
          xray_visits: num(svcToday.xray_v), xray_revenue: num(svcToday.xray_r),
          dental_visits: num(svcToday.dental_v), dental_revenue: num(svcToday.dental_r),
          pt_visits: num(svcToday.pt_v), pt_revenue: num(svcToday.pt_r),
          thaimed_visits: num(svcToday.thaimed_v), thaimed_revenue: num(svcToday.thaimed_r),
          dept_140_visits: num(svcToday.dept_140_v), dept_140_revenue: num(svcToday.dept_140_r),
          dept_143_visits: num(svcToday.dept_143_v), dept_143_revenue: num(svcToday.dept_143_r),
          dept_145_visits: num(svcToday.dept_145_v), dept_145_revenue: num(svcToday.dept_145_r),
          dept_040_visits: num(svcToday.dept_040_v), dept_040_revenue: num(svcToday.dept_040_r),
          dept_053_visits: num(svcToday.dept_053_v), dept_053_revenue: num(svcToday.dept_053_r),
          dept_130_visits: num(svcToday.dept_130_v), dept_130_revenue: num(svcToday.dept_130_r),
        },
        ncd: {
          ht: num(ncdToday.ht), dm: num(ncdToday.dm), ckd: num(ncdToday.ckd),
          dlp: num(ncdToday.dlp), ihd: num(ncdToday.ihd),
          stroke: num(ncdToday.stroke), copd: num(ncdToday.copd),
        },
      },

      mtd: {
        from, to,
        opd: { visits: num(opdRng.visits), unique_hn: num(opdRng.unique_hn), income: num(opdRng.income) },
        ipd: {
          admissions: num(ipdRng.admissions),
          income: num(ipdRng.income),
          avg_rw: num(ipdRng.avg_rw),
          avg_los: num(ipdRng.avg_los),
        },
        er: { visits: num(erRng.visits), trauma: num(erRng.trauma) },
        unique_patients: num(loyalty.mtd_unique),
        service_lines: {
          // Primary (backward compat)
          pharmacy: num(svc.pharmacy_v),
          lab: num(svc.lab_v),
          xray: num(svc.xray_v),
          dental: num(svc.dental_r),
          pt: num(svc.pt_r),
          thaimed: num(svc.thaimed_r),
          dept_140: num(svc.dept_140_r),
          dept_143: num(svc.dept_143_r),
          dept_145: num(svc.dept_145_r),
          dept_040: num(svc.dept_040_r),
          dept_053: num(svc.dept_053_r),
          dept_130: num(svc.dept_130_r),
          // Additive: both visits + revenue for all 12 lines
          pharmacy_visits: num(svc.pharmacy_v), pharmacy_revenue: num(svc.pharmacy_r),
          lab_visits: num(svc.lab_v), lab_revenue: num(svc.lab_r),
          xray_visits: num(svc.xray_v), xray_revenue: num(svc.xray_r),
          dental_visits: num(svc.dental_v), dental_revenue: num(svc.dental_r),
          pt_visits: num(svc.pt_v), pt_revenue: num(svc.pt_r),
          thaimed_visits: num(svc.thaimed_v), thaimed_revenue: num(svc.thaimed_r),
          dept_140_visits: num(svc.dept_140_v), dept_140_revenue: num(svc.dept_140_r),
          dept_143_visits: num(svc.dept_143_v), dept_143_revenue: num(svc.dept_143_r),
          dept_145_visits: num(svc.dept_145_v), dept_145_revenue: num(svc.dept_145_r),
          dept_040_visits: num(svc.dept_040_v), dept_040_revenue: num(svc.dept_040_r),
          dept_053_visits: num(svc.dept_053_v), dept_053_revenue: num(svc.dept_053_r),
          dept_130_visits: num(svc.dept_130_v), dept_130_revenue: num(svc.dept_130_r),
        },
        ncd: {
          ht: num(ncd.ht), dm: num(ncd.dm), ckd: num(ncd.ckd),
          dlp: num(ncd.dlp), ihd: num(ncd.ihd),
          stroke: num(ncd.stroke), copd: num(ncd.copd),
        },
      },

      revenue_3fy: fy3Revenue,

      aging_summary: {
        a0_30: num(aging.a0_30),
        a31_90: num(aging.a31_90),
        a91_180: num(aging.a91_180),
        a180p: num(aging.a180p),
        total: num(aging.a0_30) + num(aging.a31_90) + num(aging.a91_180) + num(aging.a180p),
      },

      ipd_capacity: {
        // BCH operational bed capacity (manually set; ward table sums 346 including special/Home Ward)
        total_beds: 120,
        real_beds: 120,
        ward_count: num(wardCap.ward_count),
        ward_table_sum: num(wardCap.total_beds),  // for reference only — includes specialty wards
      },

      quality_scorecard: {
        opd_coding_rate: opdTotal > 0 ? Math.round((opdCoded / opdTotal) * 1000) / 10 : 0,
        ipd_coding_rate: ipdEligible > 0 ? Math.round((ipdCoded / ipdEligible) * 1000) / 10 : 0,
        opd_total: opdTotal,
        opd_coded: opdCoded,
        ipd_eligible: ipdEligible,
        ipd_coded: ipdCoded,
      },

      ncd_followup: {
        ht_patients: num(ncdFollow.ht_patients),
        dm_patients: num(ncdFollow.dm_patients),
        ckd_patients: num(ncdFollow.ckd_patients),
      },

      compare,
      sparklines,
      forecast,
      anomalies,
      er_predictive: erPredictive,
      risk,
      recommendations,

      quality: {
        ha_score: null,
      },
    };
  })
);

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/overview/service-line-age/:code?date=YYYY-MM-DD
// Returns visits + revenue split by 4 age groups (Thai life-stage):
//   เด็ก (0-14) · วัยรุ่น (15-24) · วัยแรงงาน (25-59) · สูงอายุ (60+)
// for one service line on one date (defaults to Bangkok today).
// ─────────────────────────────────────────────────────────────────────────────
// SQL config — each entry returns {from, where, revenueExpr, visitExpr, params}
// for the date range [fromDate, toDate]. params is [fromDate, toDate].
const SERVICE_LINE_CONFIG = {
  // 3 ancillary — use service-table → ovst → patient JOIN chain
  pharmacy: {
    label: 'เภสัชกรรม',
    sql: (fromDate, toDate) => ({
      from: `opitemrece sl JOIN ovst o ON o.vn = sl.vn JOIN patient p ON p.hn = o.hn LEFT JOIN vn_stat v ON v.vn = sl.vn`,
      where: `sl.vstdate BETWEEN ? AND ?`,
      revenueExpr: `COALESCE(SUM(sl.sum_price), 0)`,
      visitExpr: `COUNT(DISTINCT sl.vn)`,
      params: [fromDate, toDate],
    }),
  },
  lab: {
    label: 'ห้องปฏิบัติการ',
    sql: (fromDate, toDate) => ({
      from: `lab_head sl JOIN ovst o ON o.vn = sl.vn JOIN patient p ON p.hn = o.hn LEFT JOIN vn_stat v ON v.vn = sl.vn`,
      where: `sl.order_date BETWEEN ? AND ?`,
      revenueExpr: `COALESCE(SUM(v.income), 0)`,
      visitExpr: `COUNT(DISTINCT sl.vn)`,
      params: [fromDate, toDate],
    }),
  },
  xray: {
    label: 'รังสีวิทยา',
    sql: (fromDate, toDate) => ({
      from: `xray_report sl JOIN ovst o ON o.vn = sl.vn JOIN patient p ON p.hn = o.hn LEFT JOIN vn_stat v ON v.vn = sl.vn`,
      where: `sl.request_date BETWEEN ? AND ?`,
      revenueExpr: `COALESCE(SUM(sl.service_price), 0)`,
      visitExpr: `COUNT(DISTINCT sl.vn)`,
      params: [fromDate, toDate],
    }),
  },
  // 9 dept clinics — use ovst → kskdepartment or main_dep code → patient JOIN
  dental: {
    label: 'ทันตกรรม',
    sql: (fromDate, toDate) => ({
      from: `ovst o JOIN kskdepartment d ON o.main_dep = d.depcode JOIN patient p ON p.hn = o.hn LEFT JOIN vn_stat v ON v.vn = o.vn`,
      where: `o.vstdate BETWEEN ? AND ? AND d.department REGEXP 'ทันตกรรม|Dental|ฟัน'`,
      revenueExpr: `COALESCE(SUM(v.income), 0)`,
      visitExpr: `COUNT(*)`,
      params: [fromDate, toDate],
    }),
  },
  pt: {
    label: 'กายภาพบำบัด',
    sql: (fromDate, toDate) => ({
      from: `ovst o JOIN kskdepartment d ON o.main_dep = d.depcode JOIN patient p ON p.hn = o.hn LEFT JOIN vn_stat v ON v.vn = o.vn`,
      where: `o.vstdate BETWEEN ? AND ? AND d.department REGEXP 'กายภาพ|PT|Physical|Rehab'`,
      revenueExpr: `COALESCE(SUM(v.income), 0)`,
      visitExpr: `COUNT(*)`,
      params: [fromDate, toDate],
    }),
  },
  thaimed: {
    label: 'แพทย์แผนไทย',
    sql: (fromDate, toDate) => ({
      from: `ovst o JOIN kskdepartment d ON o.main_dep = d.depcode JOIN patient p ON p.hn = o.hn LEFT JOIN vn_stat v ON v.vn = o.vn`,
      where: `o.vstdate BETWEEN ? AND ? AND d.department REGEXP 'แพทย์แผนไทย|Thai|TM|นวด|สมุนไพร'`,
      revenueExpr: `COALESCE(SUM(v.income), 0)`,
      visitExpr: `COUNT(*)`,
      params: [fromDate, toDate],
    }),
  },
  dept_140: { label: 'PMC ออฟฟิศซินโดรม', deptCode: '140' },
  dept_143: { label: 'PMC กายภาพบ้านฉาง', deptCode: '143' },
  dept_145: { label: 'PMC กายภาพ GC', deptCode: '145' },
  dept_040: { label: 'ไตเทียม', deptCode: '040' },
  dept_053: { label: 'ฉีดยาทำแผล', deptCode: '053' },
  dept_130: { label: 'Sleep Test', deptCode: '130' },
};

// Auto-build SQL for the 6 dept-code clinics
for (const [key, cfg] of Object.entries(SERVICE_LINE_CONFIG)) {
  if (cfg.deptCode && !cfg.sql) {
    cfg.sql = (fromDate, toDate) => ({
      from: `ovst o JOIN patient p ON p.hn = o.hn LEFT JOIN vn_stat v ON v.vn = o.vn`,
      where: `o.vstdate BETWEEN ? AND ? AND o.main_dep = '${cfg.deptCode}'`,
      revenueExpr: `COALESCE(SUM(v.income), 0)`,
      visitExpr: `COUNT(*)`,
      params: [fromDate, toDate],
    });
  }
}

router.get('/service-line-age/:code', async (req, res) => {
  try {
    const code = String(req.params.code || '');
    const cfg = SERVICE_LINE_CONFIG[code];
    if (!cfg) return res.status(400).json({ error: 'Unknown service code', allowed: Object.keys(SERVICE_LINE_CONFIG) });

    // Defaults: Bangkok today (single-day)
    const bkk = bkkParts();
    const defaultDate = `${bkk.year}-${String(bkk.month).padStart(2, '0')}-${String(bkk.day).padStart(2, '0')}`;

    // Accept:
    //   ?date=YYYY-MM-DD                      → single day (back-compat)
    //   ?from=YYYY-MM-DD&to=YYYY-MM-DD        → date range
    // (?to defaults to today if only ?from is given)
    let fromDate, toDate;
    if (isValidIsoDate(req.query.from)) {
      fromDate = req.query.from;
      toDate = isValidIsoDate(req.query.to) ? req.query.to : defaultDate;
      if (toDate < fromDate) toDate = fromDate;
    } else if (isValidIsoDate(req.query.date)) {
      fromDate = toDate = req.query.date;
    } else {
      fromDate = toDate = defaultDate;
    }

    const { from, where, revenueExpr, visitExpr, params } = cfg.sql(fromDate, toDate);

    // Single GROUP BY query — 4 age buckets + 1 unknown
    // TIMESTAMPDIFF uses toDate for age-as-of (snapshot at end of range)
    const sql = `
      SELECT
        CASE
          WHEN p.birthday IS NULL OR p.birthday = '0000-00-00' THEN 'unknown'
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, ?) BETWEEN 0 AND 14 THEN 'child'
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, ?) BETWEEN 15 AND 24 THEN 'youth'
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, ?) BETWEEN 25 AND 59 THEN 'working'
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, ?) >= 60 THEN 'elderly'
          ELSE 'unknown'
        END AS age_group,
        ${visitExpr} AS visits,
        ROUND(${revenueExpr}) AS revenue
      FROM ${from}
      WHERE ${where}
      GROUP BY age_group
    `;
    const fullParams = [toDate, toDate, toDate, toDate, ...params];
    const cacheKey = `ov_svc_age_${code}_${fromDate}_${toDate}`;
    const rows = await dbQueryHeavy(cacheKey, 5, sql, fullParams);

    // Normalize to fixed 4-bucket structure (ensure each present even if 0)
    const buckets = {
      child:   { age_group: 'child',   label: 'วัยเด็ก (0-14 ปี)',    age_min: 0,  age_max: 14, visits: 0, revenue: 0 },
      youth:   { age_group: 'youth',   label: 'วัยรุ่น (15-24 ปี)',    age_min: 15, age_max: 24, visits: 0, revenue: 0 },
      working: { age_group: 'working', label: 'วัยแรงงาน (25-59 ปี)', age_min: 25, age_max: 59, visits: 0, revenue: 0 },
      elderly: { age_group: 'elderly', label: 'วัยสูงอายุ (60+ ปี)',   age_min: 60, age_max: 999, visits: 0, revenue: 0 },
      unknown: { age_group: 'unknown', label: 'ไม่ระบุอายุ',            age_min: null, age_max: null, visits: 0, revenue: 0 },
    };
    for (const r of rows) {
      const b = buckets[r.age_group];
      if (b) {
        b.visits = Number(r.visits || 0);
        b.revenue = Number(r.revenue || 0);
      }
    }
    const age_groups = [buckets.child, buckets.youth, buckets.working, buckets.elderly];
    if (buckets.unknown.visits > 0) age_groups.push(buckets.unknown);

    const total_visits = age_groups.reduce((s, b) => s + b.visits, 0);
    const total_revenue = age_groups.reduce((s, b) => s + b.revenue, 0);

    res.json({
      code,
      label: cfg.label,
      from: fromDate,
      to: toDate,
      is_range: fromDate !== toDate,
      age_groups,
      total_visits,
      total_revenue,
    });
  } catch (err) {
    logger.error('[overview/service-line-age]', { error: err.message, code: req.params.code });
    res.status(500).json({ error: err.message });
  }
});

// ─────────────────────────────────────────────────────────────────────────────
// GET /api/overview/service-lines-grid?from=YYYY-MM-DD&to=YYYY-MM-DD
// Returns 12 service lines × 2 metrics (visits + revenue) for any date range.
// Used by the merged "วันนี้ + MTD" Service Lines section with period selector.
// ─────────────────────────────────────────────────────────────────────────────
router.get('/service-lines-grid', async (req, res) => {
  try {
    const bkk = bkkParts();
    const defaultDate = `${bkk.year}-${String(bkk.month).padStart(2, '0')}-${String(bkk.day).padStart(2, '0')}`;
    const fromDate = isValidIsoDate(req.query.from) ? req.query.from : defaultDate;
    const toDate = isValidIsoDate(req.query.to) ? req.query.to : fromDate;
    const safeTo = toDate >= fromDate ? toDate : fromDate;

    // Compute previous (comparison) period of the same length immediately preceding fromDate.
    // e.g., MTD 2026-05-01→2026-05-15 (15 days) → prev = 2026-04-16→2026-04-30.
    const periodDays = diffDays(fromDate, safeTo) + 1;
    const prevTo = new Date(new Date(fromDate + 'T00:00:00Z').getTime() - 86400000)
      .toISOString().slice(0, 10);
    const prevFrom = new Date(new Date(prevTo + 'T00:00:00Z').getTime() - (periodDays - 1) * 86400000)
      .toISOString().slice(0, 10);

    // SQL uses canonical item-table JOINs for ancillary revenue (drugitems/lab_items/xray_items)
    // because lab_head.confirm_charge_money is char(1) Y/N (not money!) and opitemrece without
    // filtering counts ALL items (drugs + lab + xray + IPD rooms + procedures = inflated).
    const SQL = `SELECT
         (SELECT COUNT(DISTINCT o.vn) FROM opitemrece o JOIN drugitems di ON di.icode=o.icode WHERE o.vstdate BETWEEN ? AND ?) AS pharmacy_v,
         (SELECT ROUND(COALESCE(SUM(o.sum_price),0)) FROM opitemrece o JOIN drugitems di ON di.icode=o.icode WHERE o.vstdate BETWEEN ? AND ?) AS pharmacy_r,
         (SELECT COUNT(DISTINCT o.vn) FROM opitemrece o JOIN lab_items li ON li.icode=o.icode WHERE o.vstdate BETWEEN ? AND ?) AS lab_v,
         (SELECT ROUND(COALESCE(SUM(o.sum_price),0)) FROM opitemrece o JOIN lab_items li ON li.icode=o.icode WHERE o.vstdate BETWEEN ? AND ?) AS lab_r,
         (SELECT COUNT(DISTINCT o.vn) FROM opitemrece o JOIN xray_items xi ON xi.icode=o.icode WHERE o.vstdate BETWEEN ? AND ?) AS xray_v,
         (SELECT ROUND(COALESCE(SUM(o.sum_price),0)) FROM opitemrece o JOIN xray_items xi ON xi.icode=o.icode WHERE o.vstdate BETWEEN ? AND ?) AS xray_r,
         (SELECT COUNT(*) FROM ovst o JOIN kskdepartment d ON o.main_dep=d.depcode
            WHERE o.vstdate BETWEEN ? AND ? AND d.department REGEXP 'ทันตกรรม|Dental|ฟัน') AS dental_v,
         (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o JOIN kskdepartment d ON o.main_dep=d.depcode
            LEFT JOIN vn_stat v ON v.vn=o.vn
            WHERE o.vstdate BETWEEN ? AND ? AND d.department REGEXP 'ทันตกรรม|Dental|ฟัน') AS dental_r,
         (SELECT COUNT(*) FROM ovst o JOIN kskdepartment d ON o.main_dep=d.depcode
            WHERE o.vstdate BETWEEN ? AND ? AND d.department REGEXP 'กายภาพ|PT|Physical|Rehab') AS pt_v,
         (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o JOIN kskdepartment d ON o.main_dep=d.depcode
            LEFT JOIN vn_stat v ON v.vn=o.vn
            WHERE o.vstdate BETWEEN ? AND ? AND d.department REGEXP 'กายภาพ|PT|Physical|Rehab') AS pt_r,
         (SELECT COUNT(*) FROM ovst o JOIN kskdepartment d ON o.main_dep=d.depcode
            WHERE o.vstdate BETWEEN ? AND ? AND d.department REGEXP 'แพทย์แผนไทย|Thai|TM|นวด|สมุนไพร') AS thaimed_v,
         (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o JOIN kskdepartment d ON o.main_dep=d.depcode
            LEFT JOIN vn_stat v ON v.vn=o.vn
            WHERE o.vstdate BETWEEN ? AND ? AND d.department REGEXP 'แพทย์แผนไทย|Thai|TM|นวด|สมุนไพร') AS thaimed_r,
         (SELECT COUNT(*) FROM ovst o WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep='140') AS dept_140_v,
         (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o LEFT JOIN vn_stat v ON v.vn=o.vn WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep='140') AS dept_140_r,
         (SELECT COUNT(*) FROM ovst o WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep='143') AS dept_143_v,
         (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o LEFT JOIN vn_stat v ON v.vn=o.vn WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep='143') AS dept_143_r,
         (SELECT COUNT(*) FROM ovst o WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep='145') AS dept_145_v,
         (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o LEFT JOIN vn_stat v ON v.vn=o.vn WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep='145') AS dept_145_r,
         (SELECT COUNT(*) FROM ovst o WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep='040') AS dept_040_v,
         (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o LEFT JOIN vn_stat v ON v.vn=o.vn WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep='040') AS dept_040_r,
         (SELECT COUNT(*) FROM ovst o WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep='053') AS dept_053_v,
         (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o LEFT JOIN vn_stat v ON v.vn=o.vn WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep='053') AS dept_053_r,
         (SELECT COUNT(*) FROM ovst o WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep='130') AS dept_130_v,
         (SELECT ROUND(COALESCE(SUM(v.income),0)) FROM ovst o LEFT JOIN vn_stat v ON v.vn=o.vn WHERE o.vstdate BETWEEN ? AND ? AND o.main_dep='130') AS dept_130_r`;
    const buildParams = (from, to) => Array(24).fill(null).flatMap(() => [from, to]);
    // Run current + previous-period queries in parallel. Previous period gets longer TTL (5 min)
    // since historical data rarely changes; current period uses 2 min.
    const [rowsCur, rowsPrev] = await Promise.all([
      dbQueryHeavy(`ov_svc_grid_v3_${fromDate}_${safeTo}`, 2, SQL, buildParams(fromDate, safeTo)),
      dbQueryHeavy(`ov_svc_grid_v3_${prevFrom}_${prevTo}`, 5, SQL, buildParams(prevFrom, prevTo)),
    ]);
    const r = rowsCur[0] || {};
    const p = rowsPrev[0] || {};
    const num = (x) => Number(x || 0);
    // Trend delta in % vs prev period. If prev==0 and cur>0, mark as "new" (delta=null, is_new=true).
    // If both 0, delta=0, is_new=false (flat).
    const delta = (cur, prev) => {
      if (prev > 0) return Math.round(((cur - prev) / prev) * 1000) / 10; // 1 decimal
      if (cur > 0 && prev === 0) return null; // new — no baseline
      return 0;
    };
    const META = [
      { code: 'pharmacy', label: 'เภสัชกรรม',         icon: '💊', sub: 'ผู้ป่วยได้ยา · ยา · Generic',  color: '#7c3aed' },
      { code: 'lab',      label: 'ห้องปฏิบัติการ',     icon: '🔬', sub: 'Lab orders',                  color: '#0284c7' },
      { code: 'xray',     label: 'รังสีวิทยา',          icon: '☢️', sub: 'X-ray · CT',                  color: '#059669' },
      { code: 'dental',   label: 'ทันตกรรม',           icon: '🦷', sub: 'คลินิกฟัน · DPI',              color: '#f43f5e' },
      { code: 'pt',       label: 'กายภาพบำบัด',         icon: '🏋️', sub: 'PT · Rehab',                  color: '#d97706' },
      { code: 'thaimed',  label: 'แพทย์แผนไทย',         icon: '🌿', sub: 'TM · นวด',                    color: '#16a34a' },
      { code: 'dept_140', label: 'PMC ออฟฟิศซินโดรม',  icon: '💼', sub: 'ศูนย์สิทธิข้าราชการ',           color: '#0891b2' },
      { code: 'dept_143', label: 'PMC กายภาพบ้านฉาง',  icon: '🦴', sub: 'คลินิกกายภาพ',                color: '#9333ea' },
      { code: 'dept_145', label: 'PMC กายภาพ GC',      icon: '🏃', sub: 'คลินิกกายภาพ GC',             color: '#db2777' },
      { code: 'dept_040', label: 'ไตเทียม',             icon: '🩸', sub: 'HD · ชั้น 2',                  color: '#dc2626' },
      { code: 'dept_053', label: 'ฉีดยาทำแผล',          icon: '💉', sub: 'ห้องฉีดยา 5',                  color: '#ea580c' },
      { code: 'dept_130', label: 'Sleep Test',          icon: '😴', sub: 'ตรวจการนอนหลับ',             color: '#6366f1' },
    ];
    const lines = META.map(m => {
      const visits = num(r[`${m.code}_v`]);
      const revenue = num(r[`${m.code}_r`]);
      const prev_visits = num(p[`${m.code}_v`]);
      const prev_revenue = num(p[`${m.code}_r`]);
      return {
        ...m,
        visits, revenue, prev_visits, prev_revenue,
        delta_visits_pct: delta(visits, prev_visits),
        delta_revenue_pct: delta(revenue, prev_revenue),
      };
    });
    // Build AI insight summary: total trend + top movers (only lines with material activity)
    const totVisits = lines.reduce((s, l) => s + l.visits, 0);
    const totRevenue = lines.reduce((s, l) => s + l.revenue, 0);
    const prevTotVisits = lines.reduce((s, l) => s + l.prev_visits, 0);
    const prevTotRevenue = lines.reduce((s, l) => s + l.prev_revenue, 0);
    const totalDeltaRevenuePct = delta(totRevenue, prevTotRevenue);
    const totalDeltaVisitsPct = delta(totVisits, prevTotVisits);
    // Significant movers = lines where both prev > 0 (has baseline) AND |delta_revenue_pct| >= 15%
    // AND revenue magnitude is meaningful (>= 5% of total revenue, so we don't surface tiny lines).
    const minMagnitude = totRevenue * 0.03; // 3% of total = "material"
    const movers = lines
      .filter(l => l.prev_revenue > 0 && l.revenue >= minMagnitude && l.delta_revenue_pct !== null && Math.abs(l.delta_revenue_pct) >= 10)
      .sort((a, b) => Math.abs(b.delta_revenue_pct) - Math.abs(a.delta_revenue_pct));
    const topUp = movers.filter(l => l.delta_revenue_pct > 0).slice(0, 2);
    const topDown = movers.filter(l => l.delta_revenue_pct < 0).slice(0, 2);
    res.json({
      from: fromDate,
      to: safeTo,
      is_range: fromDate !== safeTo,
      compare_from: prevFrom,
      compare_to: prevTo,
      period_days: periodDays,
      summary: {
        visits: totVisits,
        revenue: totRevenue,
        prev_visits: prevTotVisits,
        prev_revenue: prevTotRevenue,
        delta_visits_pct: totalDeltaVisitsPct,
        delta_revenue_pct: totalDeltaRevenuePct,
        top_up: topUp.map(l => ({ code: l.code, label: l.label, delta_revenue_pct: l.delta_revenue_pct })),
        top_down: topDown.map(l => ({ code: l.code, label: l.label, delta_revenue_pct: l.delta_revenue_pct })),
      },
      lines,
    });
  } catch (err) {
    logger.error('[overview/service-lines-grid]', { error: err.message });
    res.status(500).json({ error: err.message });
  }
});

export default router;
