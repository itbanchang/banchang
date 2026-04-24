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
  const [doctorActivity, nurseActivity, ipdNurseActivity, pharmacistActivity, labActivity, xrayActivity, ipdCensus] = await Promise.all([
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

    // 2. Nurse activity today (from clinical activity: BP screening, PQ, Assessment)
    dbQuery(`
      SELECT
        u.loginname, u.name,
        COUNT(*) AS screen_count,
        SUM(CASE WHEN HOUR(activity_time) < 12 THEN 1 ELSE 0 END) AS morning_count,
        SUM(CASE WHEN HOUR(activity_time) >= 12 AND HOUR(activity_time) < 17 THEN 1 ELSE 0 END) AS afternoon_count,
        SUM(CASE WHEN HOUR(activity_time) >= 17 THEN 1 ELSE 0 END) AS night_count
      FROM (
        SELECT staff, screen_time AS activity_time FROM opdscreen_bp WHERE screen_date = CURDATE()
        UNION ALL
        SELECT staff, screen_time AS activity_time FROM pq_screen WHERE screen_date = CURDATE()
        UNION ALL
        SELECT assessment_head_staff AS staff, assessment_head_datetime AS activity_time FROM assessment_head WHERE DATE(assessment_head_datetime) = CURDATE()
      ) AS activity
      INNER JOIN opduser u ON activity.staff = u.loginname
      WHERE (u.name LIKE 'พว.%' OR u.name LIKE 'พยาบาล%' OR u.name LIKE 'นป.%' OR u.name LIKE 'พช.%')
        AND u.name NOT LIKE 'นพ.%' AND u.name NOT LIKE 'พญ.%'
      GROUP BY u.loginname, u.name
      ORDER BY screen_count DESC
    `, [], { timeoutMs: 10000 }),

    // 2b. IPD Nurse activity today (assessment_head IPD + ipd_nurse_note)
    dbQuery(`
      SELECT u.loginname, u.name, COUNT(*) AS note_count
      FROM (
        SELECT assessment_head_staff AS staff FROM assessment_head
        WHERE DATE(assessment_head_datetime) = CURDATE() AND patient_type = 'IPD'
        UNION ALL
        SELECT staff FROM ipd_nurse_note WHERE DATE(entry_datetime) = CURDATE()
      ) AS activity
      INNER JOIN opduser u ON activity.staff = u.loginname
      WHERE (u.name LIKE 'พว.%' OR u.name LIKE 'พยาบาล%' OR u.name LIKE 'นป.%' OR u.name LIKE 'พช.%')
      GROUP BY u.loginname, u.name
      ORDER BY note_count DESC
    `, [], { timeoutMs: 10000 }).catch(() => []),

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

  const nurseCount = (nurseActivity || []).length;
  const ipdNurseCount = (ipdNurseActivity || []).length;
  const currentIPD = Number(ipdCensus?.current_patients || 0);
  // IPD ratio uses IPD nurses only; falls back to all nurses if IPD query returns 0
  const ratioNurses = ipdNurseCount > 0 ? ipdNurseCount : nurseCount;
  const nurseToPatientRatio = ratioNurses > 0 && currentIPD > 0
    ? `1:${Math.round(currentIPD / ratioNurses)}`
    : 'N/A';

  return {
    data_source: 'HOSxP XE',
    timestamp: new Date().toISOString(),

    summary: {
      active_doctors: totalDoctors,
      total_opd_patients: totalPatientsSeen,
      avg_patients_per_doctor: avgPatientsPerDoctor,
      active_nurses: nurseCount,
      ipd_nurses: ipdNurseCount,
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

    nurses: (nurseActivity || []).map(n => ({
      username: n.loginname, name: n.name,
      screen_count: n.screen_count,
      morning: n.morning_count,
      afternoon: n.afternoon_count,
      night: n.night_count,
    })),

    ipd_nurses: (ipdNurseActivity || []).map(n => ({
      username: n.loginname, name: n.name,
      note_count: n.note_count,
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
