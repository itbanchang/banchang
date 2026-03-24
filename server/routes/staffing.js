// ============================================================
// BCH 360° Intelligence V.10 — Staffing & Workforce KPIs
// 15 KPIs: Productivity, Ratios, Utilization, Coverage
// ============================================================
import { Router } from 'express';
import { dbQuery, dbQueryOne, dbQueryHeavy } from '../db/mysql.js';
import { cached } from '../cache/staleCache.js';
import logger from '../logger.js';

const router = Router();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /today — Real-time Staffing Snapshot
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/today', cached('staffing_today_v1', 120000, async () => {
  const [doctorActivity, nurseActivity, pharmacistActivity, labActivity, xrayActivity, ipdCensus] = await Promise.all([
    // 1. Doctor productivity today
    dbQuery(`
      SELECT o.doctor AS code, d.name,
        COUNT(DISTINCT o.vn) AS patients_seen,
        COUNT(DISTINCT o.hn) AS unique_patients,
        MIN(o.vsttime) AS first_patient,
        MAX(o.vsttime) AS last_patient,
        GROUP_CONCAT(DISTINCT c.name ORDER BY c.name SEPARATOR ', ') AS clinics
      FROM ovst o
      LEFT JOIN doctor d ON o.doctor = d.code
      LEFT JOIN clinic c ON o.cur_dep = c.clinic
      WHERE o.vstdate = CURDATE() AND o.doctor IS NOT NULL AND o.doctor != ''
      GROUP BY o.doctor, d.name
      ORDER BY patients_seen DESC
    `, [], { timeoutMs: 10000 }),

    // 2. Nurse/Staff activity today (from assessment_head + ovst)
    dbQuery(`
      SELECT u.loginname, u.name,
        COUNT(DISTINCT o.vn) AS visits_handled,
        CASE
          WHEN u.doctorcode IS NOT NULL AND u.doctorcode != '' THEN 'doctor'
          WHEN u.drug_access_level >= 2 THEN 'pharmacist'
          WHEN u.xray_staff = 'Y' THEN 'xray_tech'
          ELSE 'nurse_staff'
        END AS role
      FROM opduser u
      JOIN ovst o ON o.staff = u.loginname
      WHERE o.vstdate = CURDATE()
      GROUP BY u.loginname, u.name, role
      ORDER BY visits_handled DESC
    `, [], { timeoutMs: 10000 }),

    // 3. Pharmacist activity today
    dbQuery(`
      SELECT u.name,
        COUNT(DISTINCT oi.vn) AS prescriptions_filled,
        COUNT(oi.icode) AS items_dispensed,
        ROUND(SUM(oi.qty * oi.unitprice)) AS value_dispensed
      FROM opitemrece oi
      JOIN opduser u ON oi.staff = u.loginname
      WHERE oi.vstdate = CURDATE() AND u.drug_access_level >= 2
      GROUP BY u.name
      ORDER BY prescriptions_filled DESC
    `, [], { timeoutMs: 10000 }),

    // 4. Lab tech activity today
    dbQuery(`
      SELECT lh.reporter_name AS name,
        COUNT(DISTINCT lh.lab_order_number) AS orders_completed,
        COUNT(lo.lab_items_name_ref) AS tests_reported,
        ROUND(AVG(TIMESTAMPDIFF(MINUTE,
          CONCAT(lh.order_date, ' ', lh.order_time),
          CONCAT(lh.report_date, ' ', lh.report_time)
        ))) AS avg_tat_min
      FROM lab_head lh
      JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
      WHERE lh.order_date = CURDATE() AND lh.report_date IS NOT NULL
        AND lh.reporter_name IS NOT NULL AND lh.reporter_name != ''
      GROUP BY lh.reporter_name
      ORDER BY orders_completed DESC
    `, [], { timeoutMs: 10000 }),

    // 5. Radiology staff activity today
    dbQuery(`
      SELECT xh.staff AS name,
        COUNT(DISTINCT xh.vn) AS exams_completed,
        ROUND(SUM(xh.total_price)) AS revenue
      FROM xray_head xh
      WHERE xh.order_date = CURDATE()
        AND xh.staff IS NOT NULL AND xh.staff != ''
      GROUP BY xh.staff
      ORDER BY exams_completed DESC
    `, [], { timeoutMs: 10000 }),

    // 6. Current IPD census for nurse ratio
    dbQueryOne(`
      SELECT COUNT(*) AS current_patients,
        COUNT(DISTINCT ward) AS active_wards
      FROM ipt
      WHERE dchdate IS NULL AND ward != '06'
    `, [], { timeoutMs: 5000 }),
  ]);

  // Aggregate metrics
  const totalDoctors = (doctorActivity || []).length;
  const totalPatientsSeen = (doctorActivity || []).reduce((s, d) => s + d.patients_seen, 0);
  const avgPatientsPerDoctor = totalDoctors > 0 ? Math.round(totalPatientsSeen / totalDoctors) : 0;

  const nurseCount = (nurseActivity || []).filter(n => n.role === 'nurse_staff').length;
  const currentIPD = Number(ipdCensus?.current_patients || 0);
  const nurseToPatientRatio = nurseCount > 0 && currentIPD > 0
    ? `1:${Math.round(currentIPD / nurseCount)}`
    : 'N/A';

  return {
    data_source: 'HOSxP XE',
    timestamp: new Date().toISOString(),

    summary: {
      active_doctors: totalDoctors,
      total_opd_patients: totalPatientsSeen,
      avg_patients_per_doctor: avgPatientsPerDoctor,
      active_nurses: nurseCount,
      ipd_census: currentIPD,
      nurse_to_patient_ratio: nurseToPatientRatio,
      active_pharmacists: (pharmacistActivity || []).length,
      active_lab_techs: (labActivity || []).length,
      active_xray_staff: (xrayActivity || []).length,
    },

    doctors: (doctorActivity || []).map(d => ({
      code: d.code, name: d.name,
      patients_seen: d.patients_seen,
      unique_patients: d.unique_patients,
      clinics: d.clinics,
      first_patient: d.first_patient,
      last_patient: d.last_patient,
    })),

    pharmacists: (pharmacistActivity || []).map(p => ({
      name: p.name,
      prescriptions: p.prescriptions_filled,
      items: p.items_dispensed,
      value: p.value_dispensed,
    })),

    lab_techs: (labActivity || []).map(l => ({
      name: l.name,
      orders: l.orders_completed,
      tests: l.tests_reported,
      avg_tat_min: l.avg_tat_min,
    })),

    xray_staff: (xrayActivity || []).map(x => ({
      name: x.name,
      exams: x.exams_completed,
      revenue: x.revenue,
    })),
  };
}));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// GET /analytics — 30-Day Staffing Trends & Productivity
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/analytics', cached('staffing_analytics_v1', 3600000, async () => {
  const [doctorTrend, deptStaffing, consultTime, wardStaffing] = await Promise.all([
    // 1. Doctor productivity trend (7 days — fast)
    dbQueryHeavy('staffing_doctor_trend_7d', 120, `
      SELECT o.vstdate AS date,
        COUNT(DISTINCT o.doctor) AS doctors_active,
        COUNT(DISTINCT o.vn) AS total_visits,
        ROUND(COUNT(DISTINCT o.vn) / NULLIF(COUNT(DISTINCT o.doctor), 0)) AS visits_per_doctor
      FROM ovst o FORCE INDEX (ix_vstdate)
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 3 DAY) AND o.vstdate < CURDATE()
        AND o.doctor IS NOT NULL AND o.doctor != ''
      GROUP BY o.vstdate ORDER BY o.vstdate
    `, [], { timeoutMs: 10000 }),

    // 2. Department staffing (last 7 days for speed)
    dbQueryHeavy('staffing_dept_7d', 120, `
      SELECT k.department AS department,
        COUNT(DISTINCT o.vn) AS total_visits,
        COUNT(DISTINCT o.doctor) AS unique_doctors,
        ROUND(COUNT(DISTINCT o.vn) / NULLIF(COUNT(DISTINCT o.doctor), 0)) AS visits_per_doctor
      FROM ovst o FORCE INDEX (ix_vstdate)
      JOIN kskdepartment k ON o.main_dep = k.depcode
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 3 DAY) AND o.vstdate < CURDATE()
        AND o.doctor IS NOT NULL AND o.doctor != ''
      GROUP BY k.department
      HAVING total_visits >= 3
      ORDER BY total_visits DESC
    `, [], { timeoutMs: 10000 }),

    // 3. Doctor productivity summary (30 days)
    dbQueryHeavy('staffing_doctor_prod', 120, `
      SELECT d.name AS doctor_name,
        COUNT(DISTINCT o.vn) AS consultations,
        COUNT(DISTINCT o.hn) AS unique_patients,
        COUNT(DISTINCT o.vstdate) AS active_days,
        ROUND(COUNT(DISTINCT o.vn) / NULLIF(COUNT(DISTINCT o.vstdate), 0)) AS avg_per_day
      FROM ovst o
      JOIN doctor d ON o.doctor = d.code
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND o.vstdate < CURDATE()
      GROUP BY d.name
      HAVING consultations >= 5
      ORDER BY consultations DESC
      LIMIT 30
    `, [], { timeoutMs: 10000 }),

    // 4. Ward staffing (IPD nurse assignments)
    dbQueryHeavy('staffing_ward_30d', 120, `
      SELECT w.name AS ward_name, w.real_bedcount AS beds,
        COUNT(DISTINCT i.an) AS total_admissions,
        ROUND(AVG(CASE WHEN i.dchdate IS NULL THEN 1 ELSE 0 END) * 100, 1) AS current_occupancy_pct,
        ROUND(AVG(DATEDIFF(COALESCE(i.dchdate, CURDATE()), i.regdate)), 1) AS avg_los
      FROM ipt i
      JOIN ward w ON i.ward = w.ward
      WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND i.ward != '06'
      GROUP BY w.name, w.real_bedcount
      ORDER BY total_admissions DESC
    `, [], { timeoutMs: 15000 }),
  ]);

  return {
    data_source: 'HOSxP XE · 30-day analysis',
    timestamp: new Date().toISOString(),

    doctor_trend: doctorTrend || [],
    department_staffing: deptStaffing || [],
    consultation_times: consultTime || [],
    ward_staffing: wardStaffing || [],

    kpis: {
      avg_visits_per_doctor: _avgField(doctorTrend, 'visits_per_doctor'),
      avg_daily_doctors: _avgField(doctorTrend, 'doctors_active'),
      total_departments: (deptStaffing || []).length,
      avg_consult_min: _avgField(consultTime, 'avg_consult_min'),
    },
  };
}));

// Revenue-fiscal endpoint for CompareTab compatibility
router.get('/revenue-fiscal', cached('staffing_revenue_fiscal', 3600000, async (req) => {
  // Staffing doesn't have revenue — return empty for CompareTab
  return { data_source: 'N/A', fiscal_years: [] };
}));

function _avgField(rows, field) {
  if (!rows?.length) return 0;
  const vals = rows.map(r => Number(r[field])).filter(v => v > 0);
  return vals.length > 0 ? Math.round(vals.reduce((s, v) => s + v, 0) / vals.length) : 0;
}

export default router;
