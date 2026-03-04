// ============================================================
// BCH 360° Intelligence V.10 - HOSxP XE Integration
// OPTIMIZED — ใช้ specific columns, ไม่ SELECT *, เร็วสุด
// ============================================================
import { dbQuery, dbQueryOne } from './mysql.js';

// ============================================================
// DASHBOARD SUMMARY — Query เดียวดึงทั้งหมด
// ============================================================
export async function getDashboardSummary() {
  const today = new Date().toISOString().split('T')[0];
  const yr = new Date().getFullYear();
  const mo = new Date().getMonth() + 1;

  const firstDayOfMonth = `${yr}-${String(mo).padStart(2, '0')}-01`;
  const firstDayOfYear = `${yr}-01-01`;
  const lastDayOfYear = `${yr}-12-31`;

  // Parallel queries for speed — EXTREMELY OPTIMIZED avoiding YEAR() / MONTH() functions to enable index use
  const [opdToday, ipdCurrent, erToday, revMonth, revYTD, beds] = await Promise.all([
    dbQueryOne(`SELECT COUNT(DISTINCT vn) as c FROM ovst WHERE vstdate = CURDATE()`),
    dbQueryOne(`SELECT COUNT(*) as c FROM ipt WHERE dchdate IS NULL AND ward != '06'`),
    dbQueryOne(`SELECT COUNT(*) as c FROM er_regist WHERE vstdate = CURDATE()`),
    dbQueryOne(`SELECT COALESCE(SUM(income), 0) as r FROM vn_stat WHERE vstdate >= ? AND vstdate <= LAST_DAY(?)`, [firstDayOfMonth, firstDayOfMonth]),
    dbQueryOne(`SELECT COALESCE(SUM(income), 0) as r FROM vn_stat WHERE vstdate >= ? AND vstdate <= ?`, [firstDayOfYear, lastDayOfYear]),
    dbQueryOne(`SELECT SUM(bedcount) as tb, SUM(real_bedcount) as rb FROM ward WHERE ward_active = 'Y'`)
  ]);

  const totalBeds = 120; // จำนวนเตียงจริงของโรงพยาบาล
  const occupied = ipdCurrent?.c || 0;

  return {
    opd_today: opdToday?.c || 0,
    ipd_current: occupied,
    er_today: erToday?.c || 0,
    revenue_this_month: revMonth?.r || 0,
    revenue_ytd: revYTD?.r || 0,
    total_beds: totalBeds,
    beds_occupied: occupied,
    occupancy_rate: totalBeds > 0 ? Math.round((occupied / totalBeds) * 100) : 0
  };
}

// ============================================================
// FINANCE — Revenue Monthly
// ============================================================
export async function getMonthlyRevenue(year = 2025) {
  const rows = await dbQuery(`
    SELECT MONTH(vstdate) as m, SUM(income) as r, COUNT(DISTINCT vn) as v
    FROM vn_stat
    WHERE vstdate >= ? AND vstdate <= ?
    GROUP BY MONTH(vstdate) ORDER BY m
  `, [`${year}-01-01`, `${year}-12-31`]);
  return rows;
}

export async function getRevenueByPayer(year = 2025) {
  return await dbQuery(`
    SELECT pt.name as payer, MONTH(v.vstdate) as m,
      SUM(v.income) as amount, COUNT(DISTINCT v.vn) as cnt
    FROM vn_stat v
    INNER JOIN patient p ON v.hn = p.hn
    LEFT JOIN pttype pt ON p.pttype = pt.pttype
    WHERE v.vstdate >= ? AND v.vstdate <= ?
    GROUP BY pt.name, MONTH(v.vstdate) ORDER BY amount DESC LIMIT 50
  `, [`${year}-01-01`, `${year}-12-31`]);
}

// ============================================================
// CLAIMS — IPD Claims from ipt + an_stat
// ============================================================
export async function getClaimsData(options = {}) {
  const { limit = 100, dateFrom, dateTo } = options;
  let sql = `
    SELECT i.an, i.hn, CONCAT(p.pname,p.fname,' ',p.lname) as name,
      pt.name as payer, id.icd10, i.regdate, i.dchdate,
      a.drg, a.rw,
      COALESCE(a.income,0) as charge,
      COALESCE(a.rcpt_money,0) + COALESCE(a.uc_money,0) + COALESCE(a.discount_money,0) + COALESCE(a.paid_money,0) as paid,
      DATEDIFF(COALESCE(i.dchdate,NOW()),i.regdate) as los
    FROM ipt i
    INNER JOIN patient p ON i.hn = p.hn
    LEFT JOIN pttype pt ON i.pttype = pt.pttype
    LEFT JOIN iptdiag id ON i.an = id.an AND id.diagtype = 1
    LEFT JOIN an_stat a ON i.an = a.an
    WHERE i.dchdate IS NOT NULL
  `;
  const params = [];
  if (dateFrom) { sql += ' AND i.regdate >= ?'; params.push(dateFrom); }
  if (dateTo) { sql += ' AND i.regdate <= ?'; params.push(dateTo); }
  sql += ' ORDER BY i.regdate DESC LIMIT ?';
  params.push(limit);
  return await dbQuery(sql, params);
}

// ============================================================
// IPD — Bed Occupancy
// ============================================================
// จำนวนเตียงจริงของแต่ละหอผู้ป่วย (รวม 120 เตียง)
const REAL_BEDS = { '01': 30, '02': 27, '07': 30, '08': 10, '18': 23 };
// ชื่อย่อสำหรับแสดงในกราฟ
const WARD_DISPLAY = { '01': 'สามัญหญิง', '02': 'จรุงจิต', '06': 'Home Ward', '07': 'สามัญชาย', '08': 'ห้องคลอด', '18': 'พิเศษสงฆ์' };

export async function getBedOccupancy() {
  const rows = await dbQuery(`
    SELECT w.ward as id, w.name, w.shortname,
      COALESCE(w.bedcount,0) as total_beds, COALESCE(w.real_bedcount,0) as real_beds,
      COUNT(DISTINCT CASE WHEN i.dchdate IS NULL THEN i.an END) as occupied
    FROM ward w LEFT JOIN ipt i ON w.ward = i.ward AND i.dchdate IS NULL
    WHERE w.ward_active = 'Y' AND w.ward != '17'
    GROUP BY w.ward, w.name, w.shortname, w.bedcount, w.real_bedcount
    ORDER BY w.name
  `);
  return (rows || []).map(w => ({
    ...w,
    shortname: WARD_DISPLAY[w.id] || w.shortname || w.name,
    total_beds: REAL_BEDS[w.id] || w.total_beds,
    real_beds: REAL_BEDS[w.id] || w.real_beds
  }));
}

export { REAL_BEDS };

// ============================================================
// IPD — Active Admissions
// ============================================================
export async function getActiveAdmissions(wardId = null) {
  let sql = `
    SELECT i.an, i.hn, CONCAT(p.pname,p.fname,' ',p.lname) as name,
      i.regdate, w.name as ward, w.ward as ward_id, d.name as doctor,
      id.icd10, icd.tname as dx_name,
      DATEDIFF(NOW(),i.regdate) as stay_days,
      pt.name as payer, TIMESTAMPDIFF(YEAR,p.birthday,NOW()) as age, p.sex
    FROM ipt i
    INNER JOIN patient p ON i.hn = p.hn
    LEFT JOIN ward w ON i.ward = w.ward
    LEFT JOIN doctor d ON i.admdoctor = d.code
    LEFT JOIN iptdiag id ON i.an = id.an AND id.diagtype = 1
    LEFT JOIN icd101 icd ON id.icd10 = icd.code
    LEFT JOIN pttype pt ON i.pttype = pt.pttype
    WHERE i.dchdate IS NULL
  `;
  const params = [];
  if (wardId) { sql += ' AND i.ward = ?'; params.push(wardId); }
  sql += ' ORDER BY i.regdate ASC';
  return await dbQuery(sql, params);
}

// ============================================================
// IPD — ALOS by DRG
// ============================================================
export async function getALOSData(options = {}) {
  const { year = 2025, wardId } = options;
  let sql = `
    SELECT a.drg, w.name as ward, COUNT(*) as cnt,
      AVG(DATEDIFF(i.dchdate,i.regdate)) as alos, AVG(a.rw) as rw
    FROM ipt i INNER JOIN an_stat a ON i.an = a.an
    LEFT JOIN ward w ON i.ward = w.ward
    WHERE YEAR(i.regdate) = ? AND i.dchdate IS NOT NULL
      AND a.drg IS NOT NULL AND a.drg != ''
  `;
  const params = [year];
  if (wardId) { sql += ' AND i.ward = ?'; params.push(wardId); }
  sql += ' GROUP BY a.drg, w.name HAVING cnt >= 2 ORDER BY alos DESC LIMIT 30';
  return await dbQuery(sql, params);
}

// ============================================================
// CLINICAL — High Risk Patients (current IPD)
// ============================================================
export async function getHighRiskPatients() {
  return await dbQuery(`
    SELECT i.an, i.hn, CONCAT(p.pname,p.fname,' ',p.lname) as name,
      TIMESTAMPDIFF(YEAR,p.birthday,NOW()) as age, p.sex,
      w.name as ward, i.regdate, DATEDIFF(NOW(),i.regdate) as stay_days,
      d.name as doctor, id.icd10, icd.tname as dx_name, pt.name as payer
    FROM ipt i
    INNER JOIN patient p ON i.hn = p.hn
    LEFT JOIN ward w ON i.ward = w.ward
    LEFT JOIN doctor d ON i.admdoctor = d.code
    LEFT JOIN iptdiag id ON i.an = id.an AND id.diagtype = 1
    LEFT JOIN icd101 icd ON id.icd10 = icd.code
    LEFT JOIN pttype pt ON i.pttype = pt.pttype
    WHERE i.dchdate IS NULL
    ORDER BY i.regdate ASC
  `);
}

// ============================================================
// CLINICAL — Vitals from opdscreen
// ============================================================
export async function getPatientVitals(hn) {
  return await dbQuery(`
    SELECT o.hn, os.bps, os.bpd, os.pulse, os.rr, os.temperature, os.o2sat, os.bw,
      o.vstdate, o.vsttime
    FROM opdscreen os INNER JOIN ovst o ON os.vn = o.vn
    WHERE o.hn = ? AND os.bps > 0
    ORDER BY o.vstdate DESC, o.vsttime DESC LIMIT 50
  `, [hn]);
}

// ============================================================
// ER — Today Patients & Triage
// ============================================================
export async function getERTodayPatients() {
  return await dbQuery(`
    SELECT e.vn, e.vstdate, o.hn, CONCAT(p.pname,p.fname,' ',p.lname) as name,
      TIMESTAMPDIFF(YEAR,p.birthday,NOW()) as age, p.sex,
      e.er_emergency_type as triage_id,
      e.enter_er_time, e.doctor_tx_time, e.finish_time,
      d.name as doctor_name,
      e.er_dch_type as dch_type_id,
      GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, COALESCE(e.finish_time, NOW()))) as stay_minutes,
      os.bps, os.bpd, os.pulse, os.rr, os.temperature as temp, os.o2sat,
      pt.name as pttype_name
    FROM er_regist e
    INNER JOIN ovst o ON e.vn = o.vn
    INNER JOIN patient p ON o.hn = p.hn
    LEFT JOIN doctor d ON e.er_doctor = d.code
    LEFT JOIN opdscreen os ON e.vn = os.vn
    LEFT JOIN pttype pt ON o.pttype = pt.pttype
    WHERE e.vstdate = CURDATE()
    ORDER BY e.enter_er_time DESC
  `);
}

export async function getERTriageStats() {
  return await dbQuery(`
    SELECT e.er_emergency_type as id, COUNT(*) as cnt
    FROM er_regist e
    WHERE e.vstdate = CURDATE()
    GROUP BY e.er_emergency_type
    ORDER BY e.er_emergency_type
  `);
}

export async function getERFlowAnalytics() {
  // Fetch Lab and X-ray durations for ER patients today
  const [lab, xray] = await Promise.all([
    dbQuery(`
      SELECT e.vn, 
        TIMESTAMPDIFF(MINUTE, CONCAT(l.order_date, ' ', l.order_time), CONCAT(l.report_date, ' ', l.report_time)) as duration
      FROM er_regist e
      INNER JOIN lab_head l ON e.vn = l.vn
      WHERE e.vstdate = CURDATE() AND l.report_time IS NOT NULL
    `),
    dbQuery(`
      SELECT e.vn, 
        TIMESTAMPDIFF(MINUTE, CONCAT(x.order_date, ' ', x.order_time), CONCAT(x.report_date, ' ', x.report_time)) as duration
      FROM er_regist e
      INNER JOIN xray_head x ON e.vn = x.vn
      WHERE e.vstdate = CURDATE() AND x.report_time IS NOT NULL
    `)
  ]);

  return { lab, xray };
}

export default {
  getDashboardSummary, getMonthlyRevenue, getRevenueByPayer,
  getClaimsData, getBedOccupancy, getActiveAdmissions,
  getALOSData, getHighRiskPatients, getPatientVitals,
  getERTodayPatients, getERTriageStats, getERFlowAnalytics
};
