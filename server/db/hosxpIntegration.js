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

// ---- Revenue by Department Top 10 ----
export async function getRevenueByDeptTop10(year = new Date().getFullYear()) {
  return await dbQuery(`
    SELECT k.depname as dept_name, 
           COUNT(DISTINCT v.vn) as total_visits,
           SUM(v.income) as total_revenue
    FROM vn_stat v
    INNER JOIN kskdepartment k ON v.main_dep = k.depcode
    WHERE v.vstdate >= ? AND v.vstdate <= ?
    GROUP BY k.depname
    ORDER BY total_revenue DESC
    LIMIT 10
  `, [`${year}-01-01`, `${year}-12-31`]);
}

// ---- Revenue Breakdown (OPD vs IPD vs Other) ----
export async function getRevenueBreakdownSummary(year = new Date().getFullYear()) {
  const [opd, ipd] = await Promise.all([
    dbQueryOne(`SELECT SUM(income) as r FROM vn_stat WHERE vstdate >= ? AND vstdate <= ?`, [`${year}-01-01`, `${year}-12-31`]),
    dbQueryOne(`SELECT SUM(income) as r FROM an_stat WHERE dchdate >= ? AND dchdate <= ?`, [`${year}-01-01`, `${year}-12-31`])
  ]);

  const o = Number(opd?.r || 0);
  const i = Number(ipd?.r || 0);

  return {
    opd: o,
    ipd: i,
    other: Math.round((o + i) * 0.05) // Placeholder for other revenues usually ~5%
  };
}

// ============================================================
// CLAIMS — IPD Claims from ipt + an_stat
// ============================================================
export async function getClaimsData(options = {}) {
  const { limit = 100, dateFrom, dateTo } = options;
  let sql = `
    SELECT i.an, i.hn, CONCAT(p.pname, p.fname, ' ', p.lname) as name,
    pt.name as payer, id.icd10, i.regdate, i.dchdate,
    a.drg, a.rw,
    COALESCE(a.income, 0) as charge,
    COALESCE(a.rcpt_money, 0) + COALESCE(a.uc_money, 0) + COALESCE(a.discount_money, 0) + COALESCE(a.paid_money, 0) as paid,
    DATEDIFF(COALESCE(i.dchdate, NOW()), i.regdate) as los
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
    COALESCE(w.bedcount, 0) as total_beds, COALESCE(w.real_bedcount, 0) as real_beds,
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
    SELECT i.an, i.hn, CONCAT(p.pname, p.fname, ' ', p.lname) as name,
    i.regdate, w.name as ward, w.ward as ward_id, d.name as doctor,
    id.icd10, icd.tname as dx_name,
    DATEDIFF(NOW(), i.regdate) as stay_days,
    pt.name as payer, TIMESTAMPDIFF(YEAR, p.birthday, NOW()) as age, p.sex
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
    AVG(DATEDIFF(i.dchdate, i.regdate)) as alos, AVG(a.rw) as rw
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
    SELECT i.an, i.hn, CONCAT(p.pname, p.fname, ' ', p.lname) as name,
    TIMESTAMPDIFF(YEAR, p.birthday, NOW()) as age, p.sex,
    w.name as ward, i.regdate, DATEDIFF(NOW(), i.regdate) as stay_days,
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
    SELECT e.vn, e.vstdate, o.hn, CONCAT(p.pname, p.fname, ' ', p.lname) as name,
    TIMESTAMPDIFF(YEAR, p.birthday, NOW()) as age, p.sex,
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

// ============================================================
// FINANCE — PPFS Comparison (Promotion & Prevention Fee Schedule)
// ============================================================
export async function getPPFSComparison() {
  const p1_start = '2024-10-01';
  const p1_end = '2025-02-28';
  const p2_start = '2025-10-01';
  const p2_end = '2026-02-28';

  const activities = [
    { name: 'บริการ ANC', search: 'ANC' },
    { name: 'บริการอัลตราซาวนด์ในหญิงตั้งครรภ์', search: 'อัลตราซาวนด์' },
    { name: 'LAB ครั้งที่ 1', search: 'LAB' },
    { name: 'LAB ครั้งที่ 2', search: 'LAB' },
    { name: 'ทดสอบการตั้งครรภ์ (UPT)', search: 'UPT' },
    { name: 'บริการยาเม็ดเสริมธาตุเหล็ก', search: 'ธาตุเหล็ก' },
    { name: 'ตรวจหลังคลอด', search: 'หลังคลอด' },
    { name: 'ทันตกรรมในหญิงตั้งครรภ์', search: 'ทันตกรรม' },
    { name: 'บริการ Tele', search: 'Tele' },
    { name: 'อุปกรณ์อวัยวะเทียม', search: 'เทียม' },
    { name: 'ยาสมุนไพรจ่ายแบบ Fee Schedule', search: 'ยาสมุนไพร' },
    { name: 'STROKE', search: 'STROKE' },
    { name: 'STEMI', search: 'STEMI' },
    { name: 'ตรวจฟัน 25-59 ปี', search: 'ตรวจฟัน' },
    { name: 'ฟันปลอม', search: 'ฟันปลอม' },
    { name: 'ยาฝังคุมกำเนิด / ฉีดยาคุม', search: 'คุมกำเนิด' },
    { name: 'Palliative care', search: 'Palliative' },
    { name: 'OPIOID', search: 'OPIOID' },
    { name: 'กลุ่มอาการดาวน์', search: 'ดาวน์' },
    { name: 'คัดกรองโลหิตจาง', search: 'โลหิตจาง' },
    { name: 'บริการคัดกรองธาลัสซีเมีย', search: 'ธาลัสซีเมีย' },
    { name: 'KTB ฉีดวัคซีนไข้หวัดใหญ่', search: 'ไข้หวัดใหญ่' },
    { name: 'KTB คัดกรอง Hep B', search: 'Hep B' },
    { name: 'KTB คัดกรอง Hep C', search: 'Hep C' },
    { name: 'KTB คัดกรองมะเร็งลำไส้', search: 'มะเร็งลำไส้' },
    { name: 'KTB คัดกรองมะเร็งปากมดลูก (HPV DNA Test)', search: 'HPV DNA' },
    { name: 'KTB FPG', search: 'FPG' },
    { name: 'KTB Total Cholesterol', search: 'Total Cholesterol' },
    { name: 'บริการฉีดวัคซีนคอตีบ บาดทะยัก', search: 'บาดทะยัก' },
    { name: 'บริการวัคซีน EPI', search: 'EPI' },
    { name: 'บริการผู้ป่วยเบาหวานชนิดที่ 2', search: 'เบาหวาน' },
    { name: 'บริการโรคความดันโลหิตสูง', search: 'ความดัน' },
    { name: 'รายงานผู้ติดเชื้อ HIV (NAP)', search: 'HIV' },
    { name: 'คัดกรอง TB', search: 'TB' },
    { name: 'บริการฟื้นฟูสมรรถภาพ (กายภาพ)', search: 'กายภาพ' }
  ];

  // Map activities to a long CASE SQL or run multiple if necessary, 
  // but for performance we'll use a IN list of titles and let MySQL group it.
  const searchPatterns = activities.map(a => `% ${a.search} % `);

  const sql = `
    SELECT 
      t.pp_special_type_name as raw_act,
    COUNT(CASE WHEN s.entry_datetime BETWEEN ? AND ? THEN 1 END) as c68,
    COUNT(CASE WHEN s.entry_datetime BETWEEN ? AND ? THEN 1 END) as c69,
    MAX(COALESCE(tc.FS, 100)) as unit_price
    FROM pp_special s
    JOIN pp_special_type t ON s.pp_special_type_id = t.pp_special_type_id
    LEFT JOIN nhso_adp_code tc ON t.pp_special_code = tc.nhso_adp_code
    WHERE(s.entry_datetime BETWEEN ? AND ?) OR(s.entry_datetime BETWEEN ? AND ?)
    GROUP BY t.pp_special_type_name
    `;

  const rawRows = await dbQuery(sql, [
    p1_start, p1_end, p2_start, p2_end,
    p1_start, p1_end, p2_start, p2_end
  ]);

  // Group and map to the specific requested activities
  return activities.map(template => {
    // Find all rows that match the template's search pattern
    const matches = rawRows.filter(r => r.raw_act.includes(template.search));

    const c68 = matches.reduce((sum, r) => sum + (r.c68 || 0), 0);
    const c69 = matches.reduce((sum, r) => sum + (r.c69 || 0), 0);
    const unit_price = matches.length > 0 ? matches[0].unit_price : 100;

    const rev68 = c68 * unit_price;
    const rev69 = c69 * unit_price;
    const volG = c68 > 0 ? Math.round(((c69 - c68) / c68) * 100) : (c69 > 0 ? 100 : 0);
    const revG = rev68 > 0 ? Math.round(((rev69 - rev68) / rev68) * 100) : (rev69 > 0 ? 100 : 0);

    return {
      act: template.name,
      c68, rev68,
      c69, rev69,
      volG, revG
    };
  }).filter(r => r.c68 > 0 || r.c69 > 0);
}

// ============================================================
// IPD DRILL-DOWN — Professional Details
// ============================================================
export async function getIPDReadmissionDetails() {
  return await dbQuery(`
    SELECT i2.an, i2.hn, CONCAT(p.pname, p.fname, ' ', p.lname) as name,
    i1.dchdate as prev_dchdate, i2.regdate as readmit_date,
    DATEDIFF(i2.regdate, i1.dchdate) as days_since_dch,
    w.name as ward, icd.tname as dx_name
    FROM ipt i1
    INNER JOIN ipt i2 ON i1.hn = i2.hn AND i2.an != i1.an
    INNER JOIN patient p ON i1.hn = p.hn
    LEFT JOIN ward w ON i2.ward = w.ward
    LEFT JOIN iptdiag id ON i2.an = id.an AND id.diagtype = 1
    LEFT JOIN icd101 icd ON id.icd10 = icd.code
    WHERE i1.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
      AND i2.regdate BETWEEN i1.dchdate AND DATE_ADD(i1.dchdate, INTERVAL 30 DAY)
    ORDER BY i2.regdate DESC
    LIMIT 50
  `);
}

export async function getIPDALOSVarianceDetails() {
  return await dbQuery(`
    SELECT i.an, i.hn, CONCAT(p.pname, p.fname, ' ', p.lname) as name,
    i.regdate, i.dchdate, DATEDIFF(COALESCE(i.dchdate, CURDATE()), i.regdate) as actual_alos,
    ROUND(a.rw * 4, 1) as benchmark_alos,
    (DATEDIFF(COALESCE(i.dchdate, CURDATE()), i.regdate) - ROUND(a.rw * 4, 1)) as excess_days,
    w.name as ward, icd.tname as dx_name
    FROM ipt i
    INNER JOIN an_stat a ON i.an = a.an
    INNER JOIN patient p ON i.hn = p.hn
    LEFT JOIN ward w ON i.ward = w.ward
    LEFT JOIN iptdiag id ON i.an = id.an AND id.diagtype = 1
    LEFT JOIN icd101 icd ON id.icd10 = icd.code
    WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      AND (DATEDIFF(COALESCE(i.dchdate, CURDATE()), i.regdate) > (a.rw * 4))
    ORDER BY excess_days DESC
    LIMIT 50
  `);
}

export async function getIPDCMIDetails() {
  return await dbQuery(`
    SELECT a.drg, icd.tname as dx_name, COUNT(*) as cases,
    ROUND(AVG(a.rw), 3) as avg_rw, SUM(a.rw) as total_rw,
    ROUND(AVG(a.income), 0) as avg_income
    FROM an_stat a
    LEFT JOIN ipt i ON a.an = i.an
    LEFT JOIN iptdiag id ON a.an = id.an AND id.diagtype = 1
    LEFT JOIN icd101 icd ON id.icd10 = icd.code
    WHERE a.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    GROUP BY a.drg, icd.tname
    ORDER BY total_rw DESC
    LIMIT 50
  `);
}

export async function getIPDMortalityDetails() {
  return await dbQuery(`
    SELECT i.an, i.hn, CONCAT(p.pname, p.fname, ' ', p.lname) as name,
    i.regdate, i.dchdate, w.name as ward, icd.tname as dx_name, d.name as doctor
    FROM ipt i
    INNER JOIN patient p ON i.hn = p.hn
    LEFT JOIN ward w ON i.ward = w.ward
    LEFT JOIN iptdiag id ON i.an = id.an AND id.diagtype = 1
    LEFT JOIN icd101 icd ON id.icd10 = icd.code
    LEFT JOIN doctor d ON i.admdoctor = d.code
    WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
      AND i.dchtype IN ('8','9')
    ORDER BY i.dchdate DESC
    LIMIT 50
  `);
}

export default {
  getDashboardSummary, getMonthlyRevenue, getRevenueByPayer,
  getRevenueByDeptTop10, getRevenueBreakdownSummary,
  getClaimsData, getBedOccupancy, getActiveAdmissions,
  getALOSData, getHighRiskPatients, getPatientVitals,
  getERTodayPatients, getERTriageStats, getERFlowAnalytics,
  getPPFSComparison,
  getIPDReadmissionDetails, getIPDALOSVarianceDetails, getIPDCMIDetails,
  getIPDMortalityDetails
};
