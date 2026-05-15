import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne, dbQueryHeavy, dbQueryOneHeavy } from '../db/mysql.js';
import hosxp from '../db/hosxpIntegration.js';
import ai from '../ai/aiModules.js';

const router = Router();

// ============================================================
// 🚑 ER Operations — Live from HOSxP XE
// ============================================================

// ER Today Summary — triage + patients + bottlenecks in one call
// Phase H.2 (2026-05-15): admission count is now outcome-based via ovst→an_stat
// JOIN, since er_regist.er_dch_type is NULL 100% at BCH (verified
// scripts/verify-phase-h2-er-admit.mjs — old=0 vs new=4 matches HOSxP raw).
router.get('/today', cached('erToday_v3_admit_outcome', 30000, async () => {
  const TRIAGE_NAMES = { '1': 'Resuscitation', '2': 'Emergency', '3': 'Urgent', '4': 'Semi-urgent', '5': 'Non-urgent' };
  const TRIAGE_COLORS = { '1': '#f43f5e', '2': '#f59e0b', '3': '#eab308', '4': '#10b981', '5': '#94a3b8' };

  const [summary, triage, hourly, rawPatients, flowData] = await Promise.all([
    // 1. Summary KPIs
    dbQueryOne(`
      SELECT COUNT(*) as total,
        SUM(CASE WHEN e.finish_time IS NOT NULL THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN e.finish_time IS NULL THEN 1 ELSE 0 END) as waiting,
        SUM(CASE WHEN e.er_emergency_type IN ('1','2') THEN 1 ELSE 0 END) as critical,
        ROUND(AVG(NULLIF(GREATEST(0, COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time))), 0)) / 60, 1) as avg_ttd,
        SUM(CASE WHEN an.an IS NOT NULL THEN 1 ELSE 0 END) as admitted
      FROM er_regist e
      LEFT JOIN ovst o ON o.vn = e.vn
      LEFT JOIN an_stat an ON an.hn = o.hn AND an.regdate = e.vstdate
      WHERE e.vstdate = CURDATE()
    `).catch(() => null),

    // 2. Triage breakdown
    dbQuery(`
      SELECT e.er_emergency_type as level, COUNT(*) as cnt
      FROM er_regist e WHERE e.vstdate = CURDATE() AND e.er_emergency_type IS NOT NULL
      GROUP BY e.er_emergency_type ORDER BY e.er_emergency_type
    `).catch(() => []),

    // 3. Hourly distribution
    dbQuery(`
      SELECT HOUR(e.enter_er_time) as hr, COUNT(*) as cnt
      FROM er_regist e WHERE e.vstdate = CURDATE() AND e.enter_er_time IS NOT NULL
      GROUP BY HOUR(e.enter_er_time) ORDER BY hr
    `).catch(() => []),

    // 4. Patient list with vitals
    hosxp.getERTodayPatients().catch(() => []),

    // 5. Flow bottlenecks (lab/xray TAT)
    hosxp.getERFlowAnalytics().catch(() => ({ lab: [], xray: [] })),
  ]);

  // Patient list with AI predictions
  let patients = rawPatients || [];
  let waitForecast = null;
  try {
    patients = await ai.getERAdmissionPrediction(patients);
    waitForecast = await ai.getERWaitTimeForecast(patients);
  } catch { /* use raw patients */ }

  // Bottleneck summary
  const labDurations = (flowData?.lab || []).map(r => Number(r.duration)).filter(d => d > 0);
  const xrayDurations = (flowData?.xray || []).map(r => Number(r.duration)).filter(d => d > 0);
  const avg = arr => arr.length ? Math.round(arr.reduce((s, v) => s + v, 0) / arr.length) : 0;

  return {
    data_source: 'HOSxP XE + AI',
    total: Number(summary?.total || 0),
    completed: Number(summary?.completed || 0),
    waiting: Number(summary?.waiting || 0),
    critical: Number(summary?.critical || 0),
    avg_ttd_min: Number(summary?.avg_ttd || 0),
    admitted: Number(summary?.admitted || 0),

    triage: (triage || []).map(t => ({
      level: Number(t.level),
      name: TRIAGE_NAMES[t.level] || `Level ${t.level}`,
      color: TRIAGE_COLORS[t.level] || '#94a3b8',
      count: Number(t.cnt),
    })),

    hourly: Array.from({ length: 24 }, (_, h) => {
      const d = (hourly || []).find(x => Number(x.hr) === h);
      return { hour: h, label: `${String(h).padStart(2, '0')}:00`, count: Number(d?.cnt || 0) };
    }),

    patients,
    wait_time_forecast: waitForecast,

    bottlenecks: {
      lab_avg_tat_min: avg(labDurations),
      lab_orders: labDurations.length,
      xray_avg_tat_min: avg(xrayDurations),
      xray_orders: xrayDurations.length,
    },

    timestamp: new Date().toISOString(),
  };
}));

router.get('/today-patients', cached('erPatients', 30000, async () => {
  const patients = await hosxp.getERTodayPatients();
  const predicted = await ai.getERAdmissionPrediction(patients);
  const forecast = await ai.getERWaitTimeForecast(patients);
  return {
    data_source: 'HOSxP XE + AI Admission & Wait Time Predictor',
    patients: predicted,
    wait_time_forecast: forecast
  };
}));

router.get('/triage-stats', cached('erTriage', 30000, async () => {
  return { data_source: 'HOSxP XE', stats: await hosxp.getERTriageStats() };
}));

router.get('/flow-bottlenecks', cached('erBottlenecks', 60000, async () => {
  const flowData = await hosxp.getERFlowAnalytics();
  const analysis = await ai.getERBottleneckAI(flowData);
  return analysis;
}));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🔬 Professional ER Analytics — Advanced KPIs
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/analytics', cached('er_analytics_v17_valid_ttd', 600000, async () => {
  const [
    baseAnalytics,
    percentiles,
    revenueData,
    monthlyTrend,
    diagnosisTop,
    ageDistribution,
    dailyPattern,
    disposition,
    triageStayTime,
    todayAcuity,
    todayBaseAnalytics,
    activeDoctorsList,
    activeNursesList,
    activeStaffList,
    returnVisit72h,
    returnVisit48h,
    triageAccuracy,
    timeToRefer,
    edLOS,
    doorToCT,
    mortality,
    stemiBundle,
    referBreakdown,
    repeat28d,
  ] = await Promise.all([
    // 1. Combined ER Base Analytics (Summary, LWBS, SLA)
    // LWBS logic (Phase A — outcome-based, BCH-specific):
    //   er_regist.er_dch_type is 100% NULL at BCH → cannot rely on it.
    //   Proxy: <15 min in ER + no doctor contact + finish_time set
    //   + NOT EXISTS admit (ovst→an_stat) AND NOT EXISTS refer (referout same vn within 24h)
    dbQueryOneHeavy('erBaseAnalytics30d_v4_validTTD', 60, `
      SELECT
        COUNT(e.vn) as total_visits,
        COUNT(DISTINCT e.vstdate) as active_days,
        ROUND(AVG(NULLIF(GREATEST(0, COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time))), 0)) / 60, 1) as avg_ttd,
        ROUND(STDDEV(NULLIF(GREATEST(0, COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time))), 0)) / 60, 1) as sd_ttd,
        ROUND(AVG(CASE
          WHEN GREATEST(0, COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time))) >= 5
          THEN GREATEST(0, COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)))
          END) / 60, 1) as avg_ttd_valid_only,
        SUM(CASE
          WHEN GREATEST(0, COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time))) >= 5
          THEN 1 ELSE 0 END) as valid_ttd_count,
        SUM(CASE
          WHEN e.door_to_doctor_second IS NULL
            AND e.doctor_tx_time IS NULL
            AND e.finish_time IS NOT NULL
            AND TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.finish_time) < 15
            AND NOT EXISTS (
              SELECT 1 FROM ovst o JOIN an_stat an ON an.hn = o.hn
              WHERE o.vn = e.vn AND an.regdate = e.vstdate
            )
            AND NOT EXISTS (
              SELECT 1 FROM referout ro WHERE ro.vn = e.vn
                AND ro.refer_date BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY)
            )
          THEN 1
          ELSE 0
        END) as lwbs_count,
        SUM(CASE
          WHEN e.er_emergency_type = '1' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 60 THEN 1
          WHEN e.er_emergency_type = '2' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 900 THEN 1
          WHEN e.er_emergency_type = '3' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 1800 THEN 1
          WHEN e.er_emergency_type > '3' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 3600 THEN 1
          ELSE 0 END) as sla_pass_count
      FROM er_regist e WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `).catch(() => null),


    // 2. Percentiles — calculate in JS instead of slow session variable SQL
    dbQueryHeavy('erWaitTimes30d', 60, `
      SELECT ROUND(TIMESTAMPDIFF(SECOND, enter_er_time, doctor_tx_time) / 60, 1) as wait_min
      FROM er_regist
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND enter_er_time IS NOT NULL AND doctor_tx_time IS NOT NULL
        AND doctor_tx_time > enter_er_time
      ORDER BY wait_min
    `).then(rows => {
      if (!rows?.length) return { median_ttd: null, p90_ttd: null, p10_ttd: null };
      const vals = rows.map(r => Number(r.wait_min)).filter(v => v > 0 && v < 480);
      vals.sort((a, b) => a - b);
      const p = (pct) => { const i = Math.floor(vals.length * pct); return vals[Math.min(i, vals.length - 1)]; };
      return { median_ttd: p(0.5), p90_ttd: p(0.9), p10_ttd: p(0.1) };
    }).catch(() => ({ median_ttd: null, p90_ttd: null, p10_ttd: null })),

    // 3. Revenue & Cost
    dbQueryOneHeavy('erRevenue30d', 60, `
      SELECT ROUND(AVG(v.income), 0) as avg_cost, ROUND(SUM(v.income), 0) as total_revenue, COUNT(e.vn) as billable_visits
      FROM er_regist e STRAIGHT_JOIN vn_stat v ON e.vn = v.vn
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND v.income > 0
    `).catch(() => null),

    // 4. Monthly ER Trend (6 เดือน)
    dbQueryHeavy('erMonthlyTrend6mo', 120, `
      SELECT DATE_FORMAT(e.vstdate, '%Y-%m') as month, COUNT(*) as visits,
      SUM(CASE WHEN e.er_emergency_type IN ('1','2') THEN 1 ELSE 0 END) as critical,
      ROUND(AVG(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, COALESCE(e.finish_time, NOW())))), 0) as avg_stay
      FROM er_regist e WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) GROUP BY DATE_FORMAT(e.vstdate, '%Y-%m') ORDER BY month
    `).catch(() => []),

    // 5. Top Diagnoses (30-day)
    dbQueryHeavy('erTopDiag30d', 60, `
      SELECT od.icd10, d.name as name, COUNT(*) as cnt
      FROM ovstdiag od INNER JOIN er_regist e ON od.vn = e.vn LEFT JOIN icd101 d ON od.icd10 = d.code
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY od.icd10, d.name ORDER BY cnt DESC LIMIT 10
    `).catch(() => []),

    // 6. Age Distribution — er_regist has no hn column at BCH; route through ovst to get hn.
    dbQueryHeavy('erAgeDist30d_v2_ovst', 60, `
      SELECT CASE WHEN p.birthday > DATE_SUB(CURDATE(), INTERVAL 12 YEAR) THEN 'Children' WHEN p.birthday < DATE_SUB(CURDATE(), INTERVAL 60 YEAR) THEN 'Elderly' ELSE 'Adult' END as age_group, COUNT(e.vn) as cnt
      FROM er_regist e
      JOIN ovst o ON o.vn = e.vn
      JOIN patient p ON p.hn = o.hn
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY age_group
    `).catch(() => []),

    // 7. Hourly Load Pattern (30 วัน)
    dbQueryHeavy('erDailyPattern30d', 60, `
      SELECT HOUR(e.enter_er_time) as hour, COUNT(*) as total, ROUND(COUNT(*) / 30.0, 1) as avg_daily, SUM(CASE WHEN e.er_emergency_type IN ('1','2') THEN 1 ELSE 0 END) as critical_count
      FROM er_regist e WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND e.enter_er_time IS NOT NULL GROUP BY HOUR(e.enter_er_time) ORDER BY hour
    `).catch(() => []),

    // 8. Disposition Analysis (Phase A — outcome-based)
    // er_dch_type is NULL at BCH → derive from downstream evidence.
    dbQueryHeavy('erDispositionOutcome30d', 60, `
      SELECT
        CASE
          WHEN an.an IS NOT NULL THEN 'admit_ipd'
          WHEN ro.referout_id IS NOT NULL THEN 'refer_out'
          ELSE 'discharge'
        END AS dch_type,
        COUNT(*) AS cnt,
        ROUND(AVG(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.finish_time))), 0) AS avg_stay_min
      FROM er_regist e
      LEFT JOIN ovst o ON o.vn = e.vn
      LEFT JOIN an_stat an ON an.hn = o.hn AND an.regdate = e.vstdate
      LEFT JOIN referout ro ON ro.vn = e.vn
        AND ro.refer_date BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY)
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY dch_type
      ORDER BY cnt DESC
    `).catch(() => []),

    // 9. Triage-level Stay Time
    dbQueryHeavy('erTriageStayTime30d', 60, `
      SELECT e.er_emergency_type as triage, COUNT(*) as cnt, ROUND(AVG(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, COALESCE(e.finish_time, NOW())))), 0) as avg_stay, ROUND(AVG(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.doctor_tx_time))), 0) as avg_wait_doctor
      FROM er_regist e WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND e.enter_er_time IS NOT NULL GROUP BY e.er_emergency_type ORDER BY e.er_emergency_type
    `).catch(() => []),

    // 10. Today Acuity Summary
    dbQueryOne(`
      SELECT SUM(CASE WHEN e.er_emergency_type = '1' THEN 1 ELSE 0 END) as resus, SUM(CASE WHEN e.er_emergency_type = '2' THEN 1 ELSE 0 END) as emerg, SUM(CASE WHEN e.er_emergency_type = '3' THEN 1 ELSE 0 END) as urgent, SUM(CASE WHEN e.er_emergency_type = '4' THEN 1 ELSE 0 END) as semi, SUM(CASE WHEN e.er_emergency_type = '5' THEN 1 ELSE 0 END) as non_urg, COUNT(*) as total, ROUND(100.0 * SUM(CASE WHEN e.er_emergency_type IN ('1','2') THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) as acuity_pct
      FROM er_regist e WHERE e.vstdate = CURDATE()
    `).catch(() => null),

    // 11. Today Base Analytics (TTD & SLA)
    dbQueryOne(`
      SELECT
        ROUND(AVG(NULLIF(GREATEST(0, COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time))), 0)) / 60, 1) as avg_ttd,
        SUM(CASE 
          WHEN e.er_emergency_type = '1' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 60 THEN 1
          WHEN e.er_emergency_type = '2' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 900 THEN 1
          WHEN e.er_emergency_type = '3' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 1800 THEN 1
          WHEN e.er_emergency_type > '3' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 3600 THEN 1
          ELSE 0 END) as sla_pass_count,
        COUNT(*) as total_visits
      FROM er_regist e WHERE e.vstdate = CURDATE()
    `).catch(() => null),

    // 12. Active ER Doctors Today
    dbQuery(`
      SELECT u.loginname as username, u.name as staff_name, COUNT(e.vn) as total_count
      FROM er_regist e
      JOIN opduser u ON e.er_doctor = u.doctorcode OR e.er_doctor = u.loginname
      WHERE e.vstdate = CURDATE()
      GROUP BY u.loginname, u.name
      ORDER BY total_count DESC
    `).catch(() => []),

    // 13. Active ER Nurses Today (Activity in ER Depcodes)
    dbQuery(`
      SELECT u.loginname as username, u.name as staff_name,
             SUM(CASE WHEN HOUR(activity_time) < 12 THEN 1 ELSE 0 END) as morning_count,
             SUM(CASE WHEN HOUR(activity_time) >= 12 AND HOUR(activity_time) < 17 THEN 1 ELSE 0 END) as afternoon_count,
             SUM(CASE WHEN HOUR(activity_time) >= 17 THEN 1 ELSE 0 END) as night_count,
             COUNT(*) as total_count
      FROM (
          SELECT staff, screen_time as activity_time FROM opdscreen_bp WHERE screen_date = CURDATE() AND depcode IN ('013','076','128')
          UNION ALL
          SELECT staff, screen_time as activity_time FROM pq_screen WHERE screen_date = CURDATE() AND next_dep IN ('013','076','128')
      ) activity
      JOIN opduser u ON activity.staff = u.loginname
      WHERE (u.name LIKE 'พว.%' OR u.name LIKE 'พยาบาล%' OR u.name LIKE 'นป.%' OR u.name LIKE 'พช.%')
      GROUP BY u.loginname, u.name
      ORDER BY total_count DESC
    `).catch(() => []),

    // 14. Active ER Staff Today (Reception/Support in ER Depcodes)
    dbQuery(`
      SELECT u.loginname as username, u.name as staff_name,
             SUM(CASE WHEN HOUR(o.vsttime) < 12 THEN 1 ELSE 0 END) as morning_count,
             SUM(CASE WHEN HOUR(o.vsttime) >= 12 AND HOUR(o.vsttime) < 17 THEN 1 ELSE 0 END) as afternoon_count,
             SUM(CASE WHEN HOUR(o.vsttime) >= 17 THEN 1 ELSE 0 END) as night_count,
             COUNT(*) as total_count
      FROM ovst o
      JOIN opduser u ON o.staff = u.loginname
      WHERE o.vstdate = CURDATE() AND o.main_dep IN ('013','076','128')
        AND u.name NOT LIKE 'นพ.%' AND u.name NOT LIKE 'พญ.%'
        AND u.name NOT LIKE 'พว.%' AND u.name NOT LIKE 'พยาบาล%' AND u.name NOT LIKE 'นป.%' AND u.name NOT LIKE 'พช.%'
        AND u.loginname != 'kiosk'
      GROUP BY u.loginname, u.name
      ORDER BY total_count DESC
    `).catch(() => []),

    // 15. 72h Return Visit — ผู้ป่วยที่กลับมา ER ภายใน 72 ชั่วโมง (30 วัน)
    // NOTE: er_regist has no hn field (only vn) — join with ovst to get hn
    dbQueryOneHeavy('erReturn72h30d', 60, `
      SELECT COUNT(DISTINCT e2.vn) as return_72h_count
      FROM er_regist e2
      INNER JOIN ovst o2 ON e2.vn = o2.vn
      INNER JOIN ovst o1 ON o1.hn = o2.hn AND o1.vn != o2.vn
      INNER JOIN er_regist e1 ON e1.vn = o1.vn
        AND e1.vstdate >= DATE_SUB(e2.vstdate, INTERVAL 3 DAY)
        AND e1.vstdate < e2.vstdate
        AND TIMESTAMPDIFF(HOUR,
            COALESCE(e1.finish_time, CONCAT(e1.vstdate, ' 23:59:00')),
            COALESCE(e2.enter_er_time, CONCAT(e2.vstdate, ' 00:01:00'))
        ) <= 72
      WHERE e2.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `).catch(() => ({ return_72h_count: 0 })),

    // ━━━ Phase B — Tier-1 KPIs per MoPH ECS Service Plan ━━━

    // 16. 48h Return Visit (MoPH primary target, ≤3%)
    dbQueryOneHeavy('erReturn48h30d_v1', 60, `
      SELECT COUNT(DISTINCT e2.vn) AS return_48h_count
      FROM er_regist e2
      INNER JOIN ovst o2 ON e2.vn = o2.vn
      INNER JOIN ovst o1 ON o1.hn = o2.hn AND o1.vn != o2.vn
      INNER JOIN er_regist e1 ON e1.vn = o1.vn
        AND e1.vstdate >= DATE_SUB(e2.vstdate, INTERVAL 2 DAY)
        AND e1.vstdate < e2.vstdate
        AND TIMESTAMPDIFF(HOUR,
          COALESCE(e1.finish_time, CONCAT(e1.vstdate, ' 23:59:00')),
          COALESCE(e2.enter_er_time, CONCAT(e2.vstdate, ' 00:01:00'))
        ) <= 48
      WHERE e2.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `).catch(() => ({ return_48h_count: 0 })),

    // 17. Triage Accuracy — over-triage / under-triage via downstream outcome
    dbQueryHeavy('erTriageAccuracy30d', 60, `
      SELECT
        e.er_emergency_type AS triage,
        COUNT(*) AS total,
        SUM(CASE WHEN an.an IS NOT NULL OR ro.referout_id IS NOT NULL THEN 1 ELSE 0 END) AS critical_outcome
      FROM er_regist e
      LEFT JOIN ovst o ON o.vn = e.vn
      LEFT JOIN an_stat an ON an.hn = o.hn AND an.regdate = e.vstdate
      LEFT JOIN referout ro ON ro.vn = e.vn
        AND ro.refer_date BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY)
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND e.er_emergency_type IS NOT NULL
      GROUP BY e.er_emergency_type ORDER BY e.er_emergency_type
    `).catch(() => []),

    // 18. Door-to-Refer-Call by triage — MoPH target ≤30 min for L1-2
    dbQueryHeavy('erTimeToRefer30d', 60, `
      SELECT
        e.er_emergency_type AS triage,
        COUNT(*) AS refer_cnt,
        ROUND(AVG(NULLIF(GREATEST(0,
          TIMESTAMPDIFF(MINUTE, e.enter_er_time,
            STR_TO_DATE(CONCAT(r.refer_date, ' ', r.refer_time), '%Y-%m-%d %H:%i:%s'))
        ), 0)), 0) AS avg_door_to_refer,
        SUM(CASE WHEN TIMESTAMPDIFF(MINUTE, e.enter_er_time,
          STR_TO_DATE(CONCAT(r.refer_date, ' ', r.refer_time), '%Y-%m-%d %H:%i:%s')) <= 30
          THEN 1 ELSE 0 END) AS within_30m
      FROM er_regist e
      JOIN referout r ON r.vn = e.vn
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND r.refer_time IS NOT NULL AND r.refer_date IS NOT NULL
        AND TIMESTAMPDIFF(MINUTE, e.enter_er_time,
          STR_TO_DATE(CONCAT(r.refer_date, ' ', r.refer_time), '%Y-%m-%d %H:%i:%s')) BETWEEN 0 AND 720
      GROUP BY e.er_emergency_type ORDER BY e.er_emergency_type
    `).catch(() => []),

    // 19. ED LOS ≤4 hr — among real visits (doctor seen)
    dbQueryOneHeavy('erLOS30d', 60, `
      SELECT
        COUNT(*) AS total,
        ROUND(AVG(TIMESTAMPDIFF(MINUTE, enter_er_time, finish_time)), 0) AS avg_los_min,
        SUM(CASE WHEN TIMESTAMPDIFF(MINUTE, enter_er_time, finish_time) <= 240 THEN 1 ELSE 0 END) AS within_4hr,
        ROUND(100.0 * SUM(CASE WHEN TIMESTAMPDIFF(MINUTE, enter_er_time, finish_time) <= 240 THEN 1 ELSE 0 END) / NULLIF(COUNT(*),0), 1) AS within_4hr_pct
      FROM er_regist
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND enter_er_time IS NOT NULL AND finish_time IS NOT NULL
        AND doctor_tx_time IS NOT NULL
    `).catch(() => null),

    // 20. Door-to-CT (Stroke Fast Track) — CT Brain codes 234/235
    dbQueryOneHeavy('erDoorToCT30d', 60, `
      SELECT
        COUNT(*) AS total,
        ROUND(AVG(TIMESTAMPDIFF(MINUTE, e.enter_er_time,
          STR_TO_DATE(CONCAT(xr.request_date, ' ', xr.request_time), '%Y-%m-%d %H:%i:%s')
        )), 1) AS avg_min,
        SUM(CASE WHEN TIMESTAMPDIFF(MINUTE, e.enter_er_time,
          STR_TO_DATE(CONCAT(xr.request_date, ' ', xr.request_time), '%Y-%m-%d %H:%i:%s')) <= 25
          THEN 1 ELSE 0 END) AS within_25m
      FROM er_regist e
      JOIN xray_report xr ON xr.vn = e.vn
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND xr.xray_items_code IN (234, 235)
        AND xr.request_date IS NOT NULL AND xr.request_time IS NOT NULL
        AND TIMESTAMPDIFF(MINUTE, e.enter_er_time,
          STR_TO_DATE(CONCAT(xr.request_date, ' ', xr.request_time), '%Y-%m-%d %H:%i:%s')) BETWEEN 0 AND 720
    `).catch(() => null),

    // ━━━ Phase D — Tier 2 Clinical + Tier 3 Operational KPIs ━━━

    // 21. ED Mortality — patient.deathday (er_dch_type='9' unusable at BCH)
    // Death within ER stay or 24h after ER visit. 90-day window for sample size.
    dbQueryOneHeavy('erMortality90d', 60, `
      SELECT
        COUNT(DISTINCT e.vn) AS total_visits,
        SUM(CASE WHEN p.deathday = e.vstdate THEN 1 ELSE 0 END) AS same_day,
        SUM(CASE WHEN p.deathday BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY) THEN 1 ELSE 0 END) AS within_24h
      FROM er_regist e
      JOIN ovst o ON o.vn = e.vn
      JOIN patient p ON p.hn = o.hn
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
    `).catch(() => null),

    // 22. STEMI Pre-Refer Bundle (ICD-10 I21.x, 365d for sample)
    // ASA + Clopidogrel + Statin compliance (rough proxy via opitemrece+drugitems)
    dbQueryOneHeavy('erStemiBundle365d', 60, `
      SELECT
        COUNT(DISTINCT e.vn) AS stemi_cnt,
        SUM(CASE WHEN EXISTS (
          SELECT 1 FROM opitemrece o JOIN drugitems d ON o.icode = d.icode
          WHERE o.vn = e.vn AND (d.name LIKE '%ASPIRIN%' OR d.name LIKE '%ASA%')
        ) THEN 1 ELSE 0 END) AS got_asa,
        SUM(CASE WHEN EXISTS (
          SELECT 1 FROM opitemrece o JOIN drugitems d ON o.icode = d.icode
          WHERE o.vn = e.vn AND (d.name LIKE '%CLOPIDOGREL%' OR d.name LIKE '%TICAGRELOR%')
        ) THEN 1 ELSE 0 END) AS got_clop,
        SUM(CASE WHEN EXISTS (
          SELECT 1 FROM opitemrece o JOIN drugitems d ON o.icode = d.icode
          WHERE o.vn = e.vn AND (d.name LIKE '%ATORVASTATIN%' OR d.name LIKE '%SIMVASTATIN%' OR d.name LIKE '%ROSUVASTATIN%')
        ) THEN 1 ELSE 0 END) AS got_statin
      FROM er_regist e
      JOIN ovstdiag od ON od.vn = e.vn
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 365 DAY)
        AND od.icd10 LIKE 'I21%'
    `).catch(() => null),

    // 23. Refer-out Rate breakdown by emergency type (MoPH ECS levels 1-5)
    dbQueryHeavy('erReferBreakdown30d', 60, `
      SELECT
        r.referout_emergency_type_id AS type_id,
        COUNT(*) AS cnt
      FROM er_regist e JOIN referout r ON r.vn = e.vn
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND r.referout_emergency_type_id IS NOT NULL
      GROUP BY r.referout_emergency_type_id
      ORDER BY r.referout_emergency_type_id
    `).catch(() => []),

    // 24. Repeat ER 28d (same ICD-10 chapter) — captures patients
    //     returning to ER for the same primary diagnosis within 28 days.
    //     Stronger quality signal than 48h re-visit (different conditions excluded).
    dbQueryOneHeavy('erRepeat28dSameDx30d', 60, `
      SELECT COUNT(DISTINCT e2.vn) AS same_dx_cnt
      FROM er_regist e2
      JOIN ovst o2 ON e2.vn = o2.vn
      JOIN ovstdiag d2 ON d2.vn = e2.vn AND d2.diagtype = 1
      WHERE e2.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND EXISTS (
          SELECT 1 FROM er_regist e1
          JOIN ovst o1 ON o1.vn = e1.vn
          JOIN ovstdiag d1 ON d1.vn = e1.vn AND d1.diagtype = 1
          WHERE o1.hn = o2.hn AND e1.vn != e2.vn
            AND e1.vstdate < e2.vstdate
            AND e1.vstdate >= DATE_SUB(e2.vstdate, INTERVAL 28 DAY)
            AND SUBSTRING(d1.icd10, 1, 3) = SUBSTRING(d2.icd10, 1, 3)
        )
    `).catch(() => ({ same_dx_cnt: 0 })),
  ]);

  const activeDoctors = activeDoctorsList || [];
  const activeNurses = activeNursesList || [];
  const activeStaff = activeStaffList || [];

  const base = baseAnalytics || {};
  const today = todayBaseAnalytics || {};
  const avgCost = Number(revenueData?.avg_cost || 0);
  const totalVisits30d = Number(base.total_visits || 0);
  const totalVisitsToday = Number(today.total_visits || 0);

  const avgTTD = Number(today.avg_ttd || 0);
  const slaPassRate = totalVisitsToday > 0 ? Math.round((Number(today.sla_pass_count || 0) / totalVisitsToday) * 100 * 10) / 10 : 0;

  const lwbsCount = Number(base.lwbs_count || 0);
  const lwbsRate = totalVisits30d > 0 ? Math.round((lwbsCount / totalVisits30d) * 100 * 10) / 10 : 0;
  // 72h return window — explicit label used throughout EPI and frontend
  const returnCount = Number(returnVisit72h?.return_72h_count || 0);
  const returnRate = totalVisits30d > 0 ? Math.round((returnCount / totalVisits30d) * 100 * 10) / 10 : 0;

  // Triage stay time data (formatted)
  const TRIAGE_NAMES = { 1: 'Resuscitation', 2: 'Emergency', 3: 'Urgent', 4: 'Semi-urgent', 5: 'Non-urgent' };
  const TRIAGE_COLORS = { 1: '#f43f5e', 2: '#f59e0b', 3: '#eab308', 4: '#10b981', 5: '#94a3b8' };
  const triageData = (triageStayTime || []).map(t => ({
    triage: Number(t.triage),
    name: TRIAGE_NAMES[t.triage] || `Level ${t.triage}`,
    color: TRIAGE_COLORS[t.triage] || '#94a3b8',
    count: Number(t.cnt || 0),
    avg_stay: Number(t.avg_stay || 0),
    avg_wait_doctor: Number(t.avg_wait_doctor || 0),
  }));

  // Hourly heatmap (fill all 24 hours)
  const hourlyData = Array.from({ length: 24 }, (_, h) => {
    const d = (dailyPattern || []).find(x => Number(x.hour) === h);
    return {
      hour: h,
      label: `${String(h).padStart(2, '0')}:00`,
      total: Number(d?.total || 0),
      avg: Number(d?.avg_daily || 0),
      critical: Number(d?.critical_count || 0),
    };
  });
  const peakHour = hourlyData.reduce((best, h) => h.avg > (best?.avg || 0) ? h : best, hourlyData[0]);

  // Disposition formatting (Phase A — outcome-based keys)
  // Derived from downstream evidence (an_stat / referout join), since
  // er_regist.er_dch_type is unused at BCH.
  const DISPO_NAMES = {
    'admit_ipd': 'Admit IPD',
    'refer_out': 'ส่งต่อ Refer',
    'discharge': 'กลับบ้าน',
  };
  const dispoData = (disposition || []).map(d => ({
    type: d.dch_type,
    name: DISPO_NAMES[d.dch_type] || d.dch_type,
    count: Number(d.cnt || 0),
    avg_stay: Number(d.avg_stay_min || 0),
  }));
  const admitCount = dispoData.find(d => d.type === 'admit_ipd')?.count || 0;
  const referCount = dispoData.find(d => d.type === 'refer_out')?.count || 0;
  const totalDispo = dispoData.reduce((s, d) => s + d.count, 0);
  const admitRate = totalDispo > 0 ? Math.round((admitCount / totalDispo) * 100 * 10) / 10 : 0;
  const referRate = totalDispo > 0 ? Math.round((referCount / totalDispo) * 100 * 10) / 10 : 0;

  // ━━ Phase B — 48h re-visit (MoPH primary, target ≤3%) ━━
  const return48hCount = Number(returnVisit48h?.return_48h_count || 0);
  const return48hRate  = totalVisits30d > 0 ? Math.round((return48hCount / totalVisits30d) * 100 * 10) / 10 : 0;

  // ━━ Triage Accuracy (per MoPH ECS) ━━
  const triageRows = triageAccuracy || [];
  const l12 = triageRows.filter(t => Number(t.triage) <= 2);
  const l45 = triageRows.filter(t => Number(t.triage) >= 4);
  const l12Total = l12.reduce((s, t) => s + Number(t.total), 0);
  const l12Crit  = l12.reduce((s, t) => s + Number(t.critical_outcome), 0);
  const l45Total = l45.reduce((s, t) => s + Number(t.total), 0);
  const l45Crit  = l45.reduce((s, t) => s + Number(t.critical_outcome), 0);
  const overTriagePct  = l12Total > 0 ? Math.round((1 - l12Crit / l12Total) * 100 * 10) / 10 : 0;
  const underTriagePct = l45Total > 0 ? Math.round((l45Crit / l45Total) * 100 * 10) / 10 : 0;
  const triageByLevel = triageRows.map(t => ({
    triage: Number(t.triage),
    total: Number(t.total),
    critical_outcome: Number(t.critical_outcome),
    critical_pct: Number(t.total) > 0
      ? Math.round((Number(t.critical_outcome) / Number(t.total)) * 100 * 10) / 10
      : 0,
  }));

  // ━━ Time-to-Refer Call (MoPH target ≤30 min for L1-2) ━━
  const referRows = timeToRefer || [];
  const ref12 = referRows.filter(r => Number(r.triage) <= 2);
  const ref12Total  = ref12.reduce((s, r) => s + Number(r.refer_cnt), 0);
  const ref12Within = ref12.reduce((s, r) => s + Number(r.within_30m), 0);
  const referL12Within30Pct = ref12Total > 0 ? Math.round((ref12Within / ref12Total) * 100 * 10) / 10 : 0;
  const referByLevel = referRows.map(r => ({
    triage: Number(r.triage),
    count: Number(r.refer_cnt),
    avg_door_to_refer_min: Number(r.avg_door_to_refer || 0),
    within_30m: Number(r.within_30m),
  }));

  // ━━ ED LOS (target ≥90% within 4 hr) ━━
  const losData = edLOS || {};
  const losTotal = Number(losData.total || 0);
  const losWithin4hr = Number(losData.within_4hr || 0);
  const losWithin4hrPct = Number(losData.within_4hr_pct || 0);
  const avgLosMin = Number(losData.avg_los_min || 0);

  // ━━ Door-to-CT Brain (Stroke FT, target ≤25 min) ━━
  const ctData = doorToCT || {};
  const ctTotal = Number(ctData.total || 0);
  const ctAvgMin = Number(ctData.avg_min || 0);
  const ctWithin25 = Number(ctData.within_25m || 0);
  const ctWithin25Pct = ctTotal > 0 ? Math.round((ctWithin25 / ctTotal) * 100 * 10) / 10 : 0;

  // ━━ Phase D: ED Mortality (Tier 2, target ≤0.5%) ━━
  // Two views per ACEP/CEM convention:
  //   - ed_only_rate_pct = death IN ED (same vstdate) — stricter, ACEP "ED Mortality"
  //   - rate_pct (24h)   = death within 24h of visit — broader, BCH default
  const mortData = mortality || {};
  const mortTotal = Number(mortData.total_visits || 0);
  const mortSameDay = Number(mortData.same_day || 0);
  const mortWithin24h = Number(mortData.within_24h || 0);
  const mortRate = mortTotal > 0 ? Math.round((mortWithin24h / mortTotal) * 100 * 100) / 100 : 0;
  const mortEdOnlyRate = mortTotal > 0 ? Math.round((mortSameDay / mortTotal) * 100 * 100) / 100 : 0;

  // ━━ Phase D: STEMI Pre-Refer Bundle (Tier 2, target ≥95% all 3 components) ━━
  const stemiData = stemiBundle || {};
  const stemiCnt = Number(stemiData.stemi_cnt || 0);
  const stemiAsa = Number(stemiData.got_asa || 0);
  const stemiClop = Number(stemiData.got_clop || 0);
  const stemiStatin = Number(stemiData.got_statin || 0);
  const stemiAsaPct  = stemiCnt > 0 ? Math.round((stemiAsa  / stemiCnt) * 100) : 0;
  const stemiClopPct = stemiCnt > 0 ? Math.round((stemiClop / stemiCnt) * 100) : 0;
  const stemiStatinPct = stemiCnt > 0 ? Math.round((stemiStatin / stemiCnt) * 100) : 0;
  const stemiBundlePct = stemiCnt > 0
    ? Math.round(((stemiAsa + stemiClop + stemiStatin) / (stemiCnt * 3)) * 100) : 0;

  // ━━ Phase D: Refer-out breakdown by MoPH ECS emergency level (Tier 3) ━━
  const REFER_TYPE_NAMES = {
    1: 'Life threatening', 2: 'Emergency', 3: 'Urgent', 4: 'Acute', 5: 'Non acute'
  };
  const REFER_TYPE_THAI = {
    1: 'วิกฤต', 2: 'เร่งด่วน', 3: 'ด่วน', 4: 'เฉียบพลัน', 5: 'ไม่เร่งด่วน'
  };
  const referBreakRows = referBreakdown || [];
  const referTotal = referBreakRows.reduce((s, r) => s + Number(r.cnt), 0);
  const referByType = referBreakRows.map(r => ({
    type_id: Number(r.type_id),
    name_en: REFER_TYPE_NAMES[r.type_id] || `Type ${r.type_id}`,
    name_th: REFER_TYPE_THAI[r.type_id] || `ระดับ ${r.type_id}`,
    count: Number(r.cnt),
    pct: referTotal > 0 ? Math.round((Number(r.cnt) / referTotal) * 100 * 10) / 10 : 0,
  }));
  const referTimeCritical = referByType.filter(r => r.type_id <= 2).reduce((s, r) => s + r.count, 0);
  const referTimeCriticalPct = referTotal > 0 ? Math.round((referTimeCritical / referTotal) * 100 * 10) / 10 : 0;

  // ━━ Phase D: Repeat ER 28d (same ICD-10 chapter, Tier 3) ━━
  const repeat28Count = Number(repeat28d?.same_dx_cnt || 0);
  const repeat28Rate = totalVisits30d > 0 ? Math.round((repeat28Count / totalVisits30d) * 100 * 10) / 10 : 0;

  // Monthly trend
  const MONTH_TH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const monthData = (monthlyTrend || []).map(m => ({
    month: MONTH_TH[parseInt(m.month?.split('-')[1])] || m.month,
    visits: Number(m.visits || 0),
    critical: Number(m.critical || 0),
    avg_stay: Number(m.avg_stay || 0),
  }));

  // ━━ ER Performance Index (EPI) — Composite 0-100+ ━━
  // Formula: SLA×30% + (100−LWBS%)×20% + TTD_Score×30% + (100−Return%)×20%
  // TTD_Score: 100 = 10min target. <10min = Bonus (e.g., 0min = 113.3 score)
  const ttdScore = Math.max(0, Math.round(100 + (10 - avgTTD) * 1.333));
  const lwbsScore = Math.max(0, 100 - lwbsRate);
  const returnScore = Math.max(0, 100 - returnRate);
  const slaScore = slaPassRate;

  const epi = Math.round(
    (slaScore * 0.30) +
    (lwbsScore * 0.20) +
    (ttdScore * 0.30) +
    (returnScore * 0.20)
  );

  return {
    data_source: 'HOSxP XE · 8 AI Modules',
    epi,
    epi_components: { time_to_doctor: ttdScore, lwbs: lwbsScore, return_visit: returnScore, sla: slaScore },
    total_visits_30d: totalVisits30d,
    avg_daily_visits: totalVisits30d > 0 ? Math.round(totalVisits30d / Math.max(1, Number(base.active_days || 1)) * 10) / 10 : 0,
    return_visit_rate: returnRate,
    return_visit_count: returnCount,
    avg_time_to_doctor: avgTTD,
    median_time_to_doctor: Number(percentiles?.median_ttd || 0),
    p90_time_to_doctor: Number(percentiles?.p90_ttd || 0),
    sd_time_to_doctor: Number(base.sd_ttd || 0),
    // ━━ Phase H3 — backup TTD excluding suspect (shadow-copied timestamp) cases ━━
    // Excludes visits where door-to-doctor was <5 sec (HOSxP shadow-copy artifact at BCH).
    // Reports the "real waits" subset until DQ workflow is fixed (see ttd-time-stamping-brief-th.md).
    avg_time_to_doctor_valid_only: Number(base.avg_ttd_valid_only || 0),
    valid_ttd_count: Number(base.valid_ttd_count || 0),
    lwbs_count: lwbsCount,
    lwbs_rate: lwbsRate,
    admit_rate: admitRate,
    admit_count: admitCount,
    refer_rate: referRate,
    refer_count: referCount,
    // ━━ Phase B — Tier-1 KPIs per MoPH ECS Service Plan ━━
    return_48h_rate: return48hRate,
    return_48h_count: return48hCount,
    triage_accuracy: {
      over_triage_pct:  overTriagePct,
      under_triage_pct: underTriagePct,
      by_level: triageByLevel,
    },
    time_to_refer: {
      l12_within_30m_pct: referL12Within30Pct,
      l12_total: ref12Total,
      l12_within_30m: ref12Within,
      by_level: referByLevel,
    },
    ed_los: {
      total: losTotal,
      within_4hr: losWithin4hr,
      within_4hr_pct: losWithin4hrPct,
      avg_los_min: avgLosMin,
    },
    door_to_ct: {
      total: ctTotal,
      avg_min: ctAvgMin,
      within_25m: ctWithin25,
      within_25m_pct: ctWithin25Pct,
    },
    // ━━ Phase D — Tier 2 Clinical + Tier 3 Operational ━━
    ed_mortality: {
      total_visits_90d: mortTotal,
      same_day_count: mortSameDay,
      within_24h_count: mortWithin24h,
      ed_only_rate_pct: mortEdOnlyRate, // strict ACEP "ED Mortality" (death same vstdate)
      rate_pct: mortRate,                // BCH default — death within 24h of visit
    },
    stemi_bundle: {
      total_cases_365d: stemiCnt,
      asa_count: stemiAsa,
      asa_pct: stemiAsaPct,
      clopidogrel_count: stemiClop,
      clopidogrel_pct: stemiClopPct,
      statin_count: stemiStatin,
      statin_pct: stemiStatinPct,
      overall_bundle_pct: stemiBundlePct,
    },
    refer_breakdown: {
      total: referTotal,
      time_critical_count: referTimeCritical,
      time_critical_pct: referTimeCriticalPct,
      by_level: referByType,
    },
    repeat_er_28d: {
      same_dx_count: repeat28Count,
      rate_pct: repeat28Rate,
    },
    avg_cost_per_visit: avgCost,
    total_er_revenue: Number(revenueData?.total_revenue || 0),
    sla_pass_rate: slaPassRate,
    today_acuity: {
      resus: Number(todayAcuity?.resus || 0),
      emerg: Number(todayAcuity?.emerg || 0),
      urgent: Number(todayAcuity?.urgent || 0),
      semi: Number(todayAcuity?.semi || 0),
      non_urg: Number(todayAcuity?.non_urg || 0),
      total: Number(todayAcuity?.total || 0),
      acuity_pct: Number(todayAcuity?.acuity_pct || 0),
    },
    triage_stay_time: triageData,
    hourly_heatmap: hourlyData,
    peak_hour: { hour: peakHour?.hour, label: peakHour?.label, avg: peakHour?.avg },
    disposition: dispoData,
    monthly_trend: monthData,
    on_duty: {
      doctors: activeDoctors,
      nurses: activeNurses,
      staff: activeStaff
    },
    timestamp: new Date().toISOString(),
  };
}));

// ━━━━━━ ER Estimated Revenue — Fiscal Year (3 ปีย้อนหลัง) ━━━━━━
router.get('/revenue-fiscal', cached('erRevenueFiscal', 3600000, async (req) => {
  const { getFiscalConfig } = await import('../helpers/fiscal.js');
  const { fiscalYears, globalStart, globalEnd } = getFiscalConfig(req?.query?.start, req?.query?.end);

  const MONTH_TH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

  // Use dbQueryHeavy for the revenue fiscal query with STRAIGHT_JOIN for optimal performance
  const rows = await dbQueryHeavy('erRevFiscalQ_v2', 120, `
    SELECT
      YEAR(e.vstdate) AS yr,
      MONTH(e.vstdate) AS mo,
      COALESCE(SUM(v.income), 0) AS revenue,
      COUNT(DISTINCT e.vn) AS visit_count,
      COUNT(DISTINCT v.hn) AS patient_count
    FROM er_regist e
    STRAIGHT_JOIN vn_stat v ON e.vn = v.vn
    WHERE e.vstdate BETWEEN ? AND LEAST(?, CURDATE())
      AND v.income > 0
    GROUP BY YEAR(e.vstdate), MONTH(e.vstdate)
    ORDER BY yr, mo
  `, [globalStart, globalEnd], { timeoutMs: 25000 });

  const result = fiscalYears.map(fy => {
    const months = [];
    let totalRevenue = 0;
    let totalVisits = 0;
    let totalPatients = 0;

    for (let i = 0; i < 12; i++) {
      const mNum = ((9 + i) % 12) + 1;
      const yNum = mNum >= 10 ? fy.startYear : fy.startYear + 1;

      const row = (rows || []).find(r => Number(r.yr) === yNum && Number(r.mo) === mNum);
      const rev = Math.round(Number(row?.revenue || 0));
      const visits = Number(row?.visit_count || 0);
      const patients = Number(row?.patient_count || 0);

      totalRevenue += rev;
      totalVisits += visits;
      totalPatients += patients;

      months.push({
        month: MONTH_TH[mNum], month_num: mNum, year_num: yNum,
        revenue: rev, visits, patients, has_data: visits > 0,
      });
    }

    return {
      fiscal_year_be: fy.fiscalBE,
      fiscal_label: `ปีงบ ${fy.fiscalBE}`,
      start_date: fy.startDate, end_date: fy.endDate,
      total_revenue: totalRevenue,
      total_visits: totalVisits,
      total_patients: totalPatients,
      avg_revenue_per_visit: totalVisits > 0 ? Math.round(totalRevenue / totalVisits) : 0,
      months,
    };
  });

  // ---- Comparable Revenue: fair YoY comparison ----
  const latest = result[result.length - 1];
  const comparableIdx = latest.months.map((m, i) => m.has_data ? i : -1).filter(i => i >= 0);
  const comparableMonthCount = comparableIdx.length;
  for (const fy of result) {
    let compRev = 0, compVis = 0;
    for (const i of comparableIdx) {
      compRev += fy.months[i]?.revenue || 0;
      compVis += fy.months[i]?.visits || 0;
    }
    fy.comparable_revenue = compRev;
    fy.comparable_visits = compVis;
    fy.comparable_months = comparableMonthCount;
  }

  return {
    data_source: 'HOSxP XE · vn_stat + er_regist',
    fiscal_years: result,
    timestamp: new Date().toISOString(),
  };
}));

// ━━━━━━ ER Diversion Status — Auto-computed from Live Load ━━━━━━
// DIVERTED  : รับผู้ป่วยไม่ได้ / ขอให้หน่วยกู้ชีพพิจารณาโรงพยาบาลอื่น
// CAUTION   : รับได้ แต่อาจล่าช้า
// OPEN      : รับผู้ป่วยได้ปกติ
router.get('/diversion-status', cached('erDiversionStatus_v2_finish_time', 60000, async () => {
  // Phase C — Currently-in-ER detection uses finish_time IS NULL.
  // er_dch_type is 100% NULL at BCH so the old filter caught EVERY visit
  // today, not just patients still in the ER.
  const [currentLoad, criticalToday, longWaiters] = await Promise.all([
    dbQueryOne(`
      SELECT
        COUNT(*) as waiting_count,
        ROUND(AVG(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, NOW()))), 0) as avg_wait_min
      FROM er_regist e
      WHERE e.vstdate = CURDATE()
        AND e.finish_time IS NULL
        AND e.enter_er_time IS NOT NULL
    `).catch(() => null),

    dbQueryOne(`
      SELECT
        SUM(CASE WHEN e.er_emergency_type = '1' THEN 1 ELSE 0 END) as resus_count,
        SUM(CASE WHEN e.er_emergency_type IN ('1','2') THEN 1 ELSE 0 END) as critical_count,
        COUNT(*) as total_today
      FROM er_regist e
      WHERE e.vstdate = CURDATE()
    `).catch(() => null),

    dbQueryOne(`
      SELECT COUNT(*) as long_wait_count
      FROM er_regist e
      WHERE e.vstdate = CURDATE()
        AND e.finish_time IS NULL
        AND e.enter_er_time IS NOT NULL
        AND TIMESTAMPDIFF(MINUTE, e.enter_er_time, NOW()) > 120
    `).catch(() => null),
  ]);

  const waiting   = Number(currentLoad?.waiting_count || 0);
  const avgWait   = Number(currentLoad?.avg_wait_min  || 0);
  const resus     = Number(criticalToday?.resus_count   || 0);
  const critical  = Number(criticalToday?.critical_count || 0);
  const total     = Number(criticalToday?.total_today   || 0);
  const longWait  = Number(longWaiters?.long_wait_count || 0);
  const critPct   = total > 0 ? Math.round((critical / total) * 100) : 0;

  // Diversion auto-logic:
  // DIVERTED  : ≥30 กำลังรอ  OR  Resus ≥3 ราย  OR  (≥20 รอ AND เฉลี่ย ≥60 นาที)
  // CAUTION   : ≥15 รอ  OR  เฉลี่ย ≥45 นาที  OR  Critical% ≥20%
  // OPEN      : otherwise
  let status, reason;
  if (waiting >= 30 || resus >= 3 || (waiting >= 20 && avgWait >= 60)) {
    status = 'diverted';
    reason = waiting >= 30 ? `${waiting} รายรอ — เกินขีดความสามารถ`
           : resus >= 3    ? `Resus ${resus} ราย — ทรัพยากรจำกัด`
           :                 `${waiting} ราย รอเฉลี่ย ${avgWait} นาที`;
  } else if (waiting >= 15 || avgWait >= 45 || critPct >= 20) {
    status = 'caution';
    reason = avgWait >= 45 ? `เวลารอเฉลี่ย ${avgWait} นาที`
           :                  `${waiting} รายรอ — หนาแน่นปานกลาง`;
  } else {
    status = 'open';
    reason = `${waiting} รายรอ — รับผู้ป่วยได้ปกติ`;
  }

  return {
    status,           // 'open' | 'caution' | 'diverted'
    reason,
    waiting_count: waiting,
    avg_wait_min:  avgWait,
    resus_count:   resus,
    critical_count: critical,
    critical_pct:  critPct,
    long_wait_count: longWait,
    timestamp: new Date().toISOString(),
  };
}));

// ━━━━━━ Data Quality Monitor — Phase E Tier 3 ━━━━━━
// Compliance % for HOSxP fields that exist but rarely filled at BCH.
// Drives the "Data Quality Monitor" panel — push staff to fill more.
router.get('/data-quality', cached('erDataQuality_v2_ttd_validity', 600000, async () => {
  const [pain30d, dch30d, stemiYear, strokeYear, ttdValid30d] = await Promise.all([
    // 1. Pain score compliance (opdscreen.pain_score for ER visits, 30d)
    dbQueryOne(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN os.pain_score IS NOT NULL THEN 1 ELSE 0 END) AS filled
      FROM er_regist e
      LEFT JOIN opdscreen os ON os.vn = e.vn
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `).catch(() => null),

    // 2. ER disposition (er_dch_type) compliance — among FINISHED visits
    dbQueryOne(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN er_dch_type IS NOT NULL THEN 1 ELSE 0 END) AS filled
      FROM er_regist
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND finish_time IS NOT NULL
    `).catch(() => null),

    // 3. STEMI balloon datetime compliance — among I21.x cases (365d)
    dbQueryOne(`
      SELECT
        COUNT(DISTINCT e.vn) AS total,
        COUNT(DISTINCT CASE WHEN e.stemi_balloon_datetime IS NOT NULL THEN e.vn END) AS filled
      FROM er_regist e
      JOIN ovstdiag od ON od.vn = e.vn
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 365 DAY)
        AND od.icd10 LIKE 'I21%'
    `).catch(() => null),

    // 4. Stroke needle datetime compliance — among I60-I64, G45 (365d)
    dbQueryOne(`
      SELECT
        COUNT(DISTINCT e.vn) AS total,
        COUNT(DISTINCT CASE WHEN e.stroke_needle_datetime IS NOT NULL THEN e.vn END) AS filled
      FROM er_regist e
      JOIN ovstdiag od ON od.vn = e.vn
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 365 DAY)
        AND od.icd10 REGEXP '^(I6[0-4]|G45)'
    `).catch(() => null),

    // 5. TTD validity — % of visits where door-to-doctor was time-stamped separately (>60 sec gap)
    // BCH issue: 98.5% of visits have enter_er_time == doctor_tx_time (shadow-copied timestamp).
    // This metric tracks how many cases actually have separate timestamps — drives the
    // workflow change to push nurses/doctors to use two separate HOSxP buttons.
    dbQueryOne(`
      SELECT
        COUNT(*) AS total,
        SUM(CASE WHEN GREATEST(0, COALESCE(door_to_doctor_second, TIMESTAMPDIFF(SECOND, enter_er_time, doctor_tx_time))) > 60 THEN 1 ELSE 0 END) AS filled
      FROM er_regist
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND doctor_tx_time IS NOT NULL
        AND enter_er_time IS NOT NULL
    `).catch(() => null),
  ]);

  const pct = (filled, total) => total > 0 ? Math.round((Number(filled) / Number(total)) * 100 * 10) / 10 : 0;

  const fields = [
    {
      id: 'pain_score',
      name_th: 'Pain Score',
      detail_th: 'คะแนนความเจ็บปวด (pain_score)',
      table: 'opdscreen.pain_score',
      who_fills: 'พยาบาล Triage',
      hosxp_screen: 'หน้าจอ Vital sign / OPD Screen',
      window: '30 วันย้อนหลัง',
      total: Number(pain30d?.total || 0),
      filled: Number(pain30d?.filled || 0),
      compliance_pct: pct(pain30d?.filled, pain30d?.total),
      target_pct: 95,
      unlocks_kpi: 'Pain Management Time (เกณฑ์ สธ.: pain>6 ได้ยา ≤30 นาที)',
      action: 'บอกพยาบาล Triage กรอกคะแนนเจ็บปวด 0-10 ทุก visit',
    },
    {
      id: 'er_dch_type',
      name_th: 'ER Disposition',
      detail_th: 'ผลการจำหน่าย ER (er_dch_type)',
      table: 'er_regist.er_dch_type',
      who_fills: 'แพทย์ ER',
      hosxp_screen: 'หน้าจอ ER → ก่อน finish visit',
      window: '30 วันย้อนหลัง (visits ที่ finish แล้ว)',
      total: Number(dch30d?.total || 0),
      filled: Number(dch30d?.filled || 0),
      compliance_pct: pct(dch30d?.filled, dch30d?.total),
      target_pct: 90,
      unlocks_kpi: 'Disposition accuracy (Admit/Refer/Discharge/LWBS แม่นยำกว่า outcome-proxy)',
      action: 'บอก ER doctor กรอก disposition (1-9) ทุกครั้งที่ finish ER visit',
    },
    {
      id: 'stemi_balloon_datetime',
      name_th: 'STEMI Balloon Time',
      detail_th: 'เวลาทำ Balloon STEMI (stemi_balloon_datetime)',
      table: 'er_regist.stemi_balloon_datetime',
      who_fills: 'แพทย์/พยาบาล ER',
      hosxp_screen: 'หน้าจอ STEMI Fast Track',
      window: '365 วันย้อนหลัง (เฉพาะ ICD-10 I21.x)',
      total: Number(stemiYear?.total || 0),
      filled: Number(stemiYear?.filled || 0),
      compliance_pct: pct(stemiYear?.filled, stemiYear?.total),
      target_pct: 100,
      unlocks_kpi: 'Door-to-Balloon Time (เกณฑ์ สธ.: ≤90 นาที STEMI)',
      action: 'บันทึก datetime เมื่อทำหัตถการ Balloon หรือเมื่อรับ refer-in กลับ',
    },
    {
      id: 'stroke_needle_datetime',
      name_th: 'Stroke Needle Time',
      detail_th: 'เวลา rt-PA Needle (stroke_needle_datetime)',
      table: 'er_regist.stroke_needle_datetime',
      who_fills: 'แพทย์/พยาบาล ER',
      hosxp_screen: 'หน้าจอ Stroke Fast Track',
      window: '365 วันย้อนหลัง (เฉพาะ ICD-10 I60-I64, G45)',
      total: Number(strokeYear?.total || 0),
      filled: Number(strokeYear?.filled || 0),
      compliance_pct: pct(strokeYear?.filled, strokeYear?.total),
      target_pct: 100,
      unlocks_kpi: 'Door-to-Needle Time (เกณฑ์ สธ.: ≤60 นาที Stroke)',
      action: 'บันทึก datetime เมื่อให้ rt-PA หรือเมื่อรับ refer-in กลับ',
    },
    {
      id: 'ttd_validity',
      name_th: 'TTD Validity',
      detail_th: 'เวลาเข้า ER vs เวลาพบหมอ บันทึกแยกขั้นตอน (>60 วินาที)',
      table: 'er_regist.enter_er_time + doctor_tx_time',
      who_fills: 'พยาบาล Triage (รับ) + แพทย์ ER (เริ่มตรวจ)',
      hosxp_screen: 'ปุ่ม Triage In + ปุ่ม Doctor Tx — กดแยก 2 ครั้ง',
      window: '30 วันย้อนหลัง (visits ที่พบหมอ)',
      total: Number(ttdValid30d?.total || 0),
      filled: Number(ttdValid30d?.filled || 0),
      compliance_pct: pct(ttdValid30d?.filled, ttdValid30d?.total),
      target_pct: 80,
      unlocks_kpi: 'Door-to-Doctor · P90 Wait · Triage SLA · EPI Score · LWBS Rate (KPI 4-5 ตัวยังตัดสินใจไม่ได้)',
      action: 'เปลี่ยน workflow — พยาบาลกดบันทึก enter_er_time ตอนรับ + แพทย์กดบันทึก doctor_tx_time ตอนเริ่มตรวจ (อ่าน docs/ttd-time-stamping-brief-th.md)',
    },
  ];

  const scoredFields = fields.filter(f => f.total > 0);
  const overallPct = scoredFields.length > 0
    ? Math.round(scoredFields.reduce((s, f) => s + f.compliance_pct, 0) / scoredFields.length * 10) / 10
    : 0;
  const passing = scoredFields.filter(f => f.compliance_pct >= f.target_pct).length;

  return {
    data_source: 'HOSxP XE · Data Quality compliance check',
    overall_compliance_pct: overallPct,
    fields_scored: scoredFields.length,
    fields_passing: passing,
    fields: fields,
    note: 'ค่า 0% = ทีมยังไม่กรอก HOSxP field นี้ — push organizational improvement (ไม่ใช่ bug ในระบบ)',
    timestamp: new Date().toISOString(),
  };
}));

// ━━━━━━ ER Trends — 12-Month KPI Time Series (Phase F #15) ━━━━━━
router.get('/trends', cached('erTrends_v1', 600000, async (req) => {
  const months = Math.min(24, Math.max(3, parseInt(req?.query?.months || '12', 10)));

  const [base, lwbs, triage, mortality, refer, revisit48, doorCt, l12Refer, repeat28] = await Promise.all([
    dbQueryHeavy('erTrendsBase', 30, `
      SELECT
        DATE_FORMAT(vstdate, '%Y-%m') AS month,
        COUNT(*) AS total_visits,
        SUM(CASE WHEN er_emergency_type IN ('1','2') THEN 1 ELSE 0 END) AS critical_visits,
        ROUND(AVG(NULLIF(GREATEST(0, COALESCE(door_to_doctor_second, TIMESTAMPDIFF(SECOND, enter_er_time, doctor_tx_time))), 0)) / 60, 1) AS avg_ttd,
        SUM(CASE
          WHEN er_emergency_type = '1' AND COALESCE(door_to_doctor_second, TIMESTAMPDIFF(SECOND, enter_er_time, doctor_tx_time)) <= 60 THEN 1
          WHEN er_emergency_type = '2' AND COALESCE(door_to_doctor_second, TIMESTAMPDIFF(SECOND, enter_er_time, doctor_tx_time)) <= 900 THEN 1
          WHEN er_emergency_type = '3' AND COALESCE(door_to_doctor_second, TIMESTAMPDIFF(SECOND, enter_er_time, doctor_tx_time)) <= 1800 THEN 1
          WHEN er_emergency_type > '3' AND COALESCE(door_to_doctor_second, TIMESTAMPDIFF(SECOND, enter_er_time, doctor_tx_time)) <= 3600 THEN 1
          ELSE 0 END) AS sla_pass,
        SUM(CASE WHEN doctor_tx_time IS NOT NULL AND finish_time IS NOT NULL AND TIMESTAMPDIFF(MINUTE, enter_er_time, finish_time) <= 240 THEN 1 ELSE 0 END) AS los_pass,
        SUM(CASE WHEN doctor_tx_time IS NOT NULL AND finish_time IS NOT NULL THEN 1 ELSE 0 END) AS los_eligible
      FROM er_regist
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)
      GROUP BY DATE_FORMAT(vstdate, '%Y-%m') ORDER BY month
    `, [months]).catch(() => []),
    dbQueryHeavy('erTrendsLWBS', 30, `
      SELECT DATE_FORMAT(e.vstdate, '%Y-%m') AS month,
        SUM(CASE WHEN e.door_to_doctor_second IS NULL AND e.doctor_tx_time IS NULL AND e.finish_time IS NOT NULL
            AND TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.finish_time) < 15
            AND NOT EXISTS (SELECT 1 FROM ovst o JOIN an_stat an ON an.hn = o.hn WHERE o.vn = e.vn AND an.regdate = e.vstdate)
            AND NOT EXISTS (SELECT 1 FROM referout ro WHERE ro.vn = e.vn AND ro.refer_date BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY))
          THEN 1 ELSE 0 END) AS lwbs_count
      FROM er_regist e WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)
      GROUP BY DATE_FORMAT(e.vstdate, '%Y-%m') ORDER BY month
    `, [months]).catch(() => []),
    dbQueryHeavy('erTrendsTriage', 30, `
      SELECT DATE_FORMAT(e.vstdate, '%Y-%m') AS month, e.er_emergency_type AS triage,
        COUNT(*) AS total, SUM(CASE WHEN an.an IS NOT NULL OR ro.referout_id IS NOT NULL THEN 1 ELSE 0 END) AS crit
      FROM er_regist e
      LEFT JOIN ovst o ON o.vn = e.vn
      LEFT JOIN an_stat an ON an.hn = o.hn AND an.regdate = e.vstdate
      LEFT JOIN referout ro ON ro.vn = e.vn AND ro.refer_date BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY)
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL ? MONTH) AND e.er_emergency_type IS NOT NULL
      GROUP BY DATE_FORMAT(e.vstdate, '%Y-%m'), e.er_emergency_type
    `, [months]).catch(() => []),
    dbQueryHeavy('erTrendsMortality', 30, `
      SELECT DATE_FORMAT(e.vstdate, '%Y-%m') AS month,
        COUNT(DISTINCT e.vn) AS total,
        SUM(CASE WHEN p.deathday BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY) THEN 1 ELSE 0 END) AS within_24h
      FROM er_regist e JOIN ovst o ON o.vn = e.vn JOIN patient p ON p.hn = o.hn
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)
      GROUP BY DATE_FORMAT(e.vstdate, '%Y-%m')
    `, [months]).catch(() => []),
    dbQueryHeavy('erTrendsRefer', 30, `
      SELECT DATE_FORMAT(e.vstdate, '%Y-%m') AS month, COUNT(*) AS total,
        SUM(CASE WHEN r.referout_emergency_type_id <= 2 THEN 1 ELSE 0 END) AS time_critical
      FROM er_regist e JOIN referout r ON r.vn = e.vn
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL ? MONTH) AND r.referout_emergency_type_id IS NOT NULL
      GROUP BY DATE_FORMAT(e.vstdate, '%Y-%m')
    `, [months]).catch(() => []),
    dbQueryHeavy('erTrendsRevisit48', 60, `
      SELECT DATE_FORMAT(e2.vstdate, '%Y-%m') AS month, COUNT(DISTINCT e2.vn) AS cnt
      FROM er_regist e2 JOIN ovst o2 ON e2.vn = o2.vn
      WHERE e2.vstdate >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)
        AND EXISTS (
          SELECT 1 FROM er_regist e1 JOIN ovst o1 ON o1.vn = e1.vn
          WHERE o1.hn = o2.hn AND e1.vstdate < e2.vstdate
            AND e1.vstdate >= DATE_SUB(e2.vstdate, INTERVAL 2 DAY)
            AND TIMESTAMPDIFF(HOUR, COALESCE(e1.finish_time, CONCAT(e1.vstdate, ' 23:59:00')),
              COALESCE(e2.enter_er_time, CONCAT(e2.vstdate, ' 00:01:00'))) <= 48
        )
      GROUP BY DATE_FORMAT(e2.vstdate, '%Y-%m')
    `, [months]).catch(() => []),
    dbQueryHeavy('erTrendsDoorCT', 30, `
      SELECT DATE_FORMAT(e.vstdate, '%Y-%m') AS month, COUNT(*) AS total,
        SUM(CASE WHEN TIMESTAMPDIFF(MINUTE, e.enter_er_time, STR_TO_DATE(CONCAT(xr.request_date, ' ', xr.request_time), '%Y-%m-%d %H:%i:%s')) <= 25 THEN 1 ELSE 0 END) AS within_25m
      FROM er_regist e JOIN xray_report xr ON xr.vn = e.vn
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)
        AND xr.xray_items_code IN (234, 235) AND xr.request_date IS NOT NULL AND xr.request_time IS NOT NULL
        AND TIMESTAMPDIFF(MINUTE, e.enter_er_time, STR_TO_DATE(CONCAT(xr.request_date, ' ', xr.request_time), '%Y-%m-%d %H:%i:%s')) BETWEEN 0 AND 720
      GROUP BY DATE_FORMAT(e.vstdate, '%Y-%m')
    `, [months]).catch(() => []),
    dbQueryHeavy('erTrendsL12Refer', 30, `
      SELECT DATE_FORMAT(e.vstdate, '%Y-%m') AS month, COUNT(*) AS refer_cnt,
        SUM(CASE WHEN TIMESTAMPDIFF(MINUTE, e.enter_er_time, STR_TO_DATE(CONCAT(r.refer_date, ' ', r.refer_time), '%Y-%m-%d %H:%i:%s')) <= 30 THEN 1 ELSE 0 END) AS within_30m
      FROM er_regist e JOIN referout r ON r.vn = e.vn
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)
        AND e.er_emergency_type IN ('1','2') AND r.refer_time IS NOT NULL AND r.refer_date IS NOT NULL
        AND TIMESTAMPDIFF(MINUTE, e.enter_er_time, STR_TO_DATE(CONCAT(r.refer_date, ' ', r.refer_time), '%Y-%m-%d %H:%i:%s')) BETWEEN 0 AND 720
      GROUP BY DATE_FORMAT(e.vstdate, '%Y-%m')
    `, [months]).catch(() => []),
    dbQueryHeavy('erTrendsRepeat28', 60, `
      SELECT DATE_FORMAT(e2.vstdate, '%Y-%m') AS month, COUNT(DISTINCT e2.vn) AS cnt
      FROM er_regist e2 JOIN ovst o2 ON e2.vn = o2.vn
      JOIN ovstdiag d2 ON d2.vn = e2.vn AND d2.diagtype = 1
      WHERE e2.vstdate >= DATE_SUB(CURDATE(), INTERVAL ? MONTH)
        AND EXISTS (
          SELECT 1 FROM er_regist e1 JOIN ovst o1 ON o1.vn = e1.vn
          JOIN ovstdiag d1 ON d1.vn = e1.vn AND d1.diagtype = 1
          WHERE o1.hn = o2.hn AND e1.vn != e2.vn AND e1.vstdate < e2.vstdate
            AND e1.vstdate >= DATE_SUB(e2.vstdate, INTERVAL 28 DAY)
            AND SUBSTRING(d1.icd10, 1, 3) = SUBSTRING(d2.icd10, 1, 3)
        )
      GROUP BY DATE_FORMAT(e2.vstdate, '%Y-%m')
    `, [months]).catch(() => []),
  ]);

  // ── Build month axis (last N months including current) ──
  const now = new Date();
  const axis = [];
  for (let i = months - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    axis.push(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`);
  }
  const findVal = (rows, month, key, dflt = 0) => {
    const r = (rows || []).find(x => x.month === month);
    return r ? Number(r[key] || 0) : dflt;
  };

  // Pre-aggregate triage per month
  const triageByMonth = {};
  for (const r of (triage || [])) {
    if (!triageByMonth[r.month]) triageByMonth[r.month] = [];
    triageByMonth[r.month].push({ triage: Number(r.triage), total: Number(r.total), crit: Number(r.crit) });
  }

  const pct = (num, den) => den > 0 ? Math.round((num / den) * 100 * 10) / 10 : 0;
  const pct2 = (num, den) => den > 0 ? Math.round((num / den) * 100 * 100) / 100 : 0;

  const series = axis.map(m => {
    const b = (base || []).find(r => r.month === m) || {};
    const totalVisits = Number(b.total_visits || 0);
    const tm = triageByMonth[m] || [];
    const l12 = tm.filter(t => t.triage <= 2);
    const l45 = tm.filter(t => t.triage >= 4);
    const l12T = l12.reduce((s, t) => s + t.total, 0);
    const l12C = l12.reduce((s, t) => s + t.crit, 0);
    const l45T = l45.reduce((s, t) => s + t.total, 0);
    const l45C = l45.reduce((s, t) => s + t.crit, 0);
    const ctTotal = findVal(doorCt, m, 'total');
    const l12RT = findVal(l12Refer, m, 'refer_cnt');
    const mortTotal = findVal(mortality, m, 'total');
    return {
      month: m,
      total_visits: totalVisits,
      critical_visits: Number(b.critical_visits || 0),
      avg_ttd: Number(b.avg_ttd || 0),
      triage_sla_pct: pct(Number(b.sla_pass || 0), totalVisits),
      ed_los_4hr_pct: pct(Number(b.los_pass || 0), Number(b.los_eligible || 0)),
      lwbs_pct: pct(findVal(lwbs, m, 'lwbs_count'), totalVisits),
      revisit_48h_pct: pct(findVal(revisit48, m, 'cnt'), totalVisits),
      door_to_ct_pct: pct(findVal(doorCt, m, 'within_25m'), ctTotal),
      door_to_ct_total: ctTotal,
      l12_refer_30m_pct: pct(findVal(l12Refer, m, 'within_30m'), l12RT),
      l12_refer_total: l12RT,
      mortality_pct: pct2(findVal(mortality, m, 'within_24h'), mortTotal),
      mortality_count: findVal(mortality, m, 'within_24h'),
      over_triage_pct: l12T > 0 ? Math.round((1 - l12C / l12T) * 100 * 10) / 10 : 0,
      under_triage_pct: l45T > 0 ? Math.round((l45C / l45T) * 100 * 10) / 10 : 0,
      refer_total: findVal(refer, m, 'total'),
      refer_time_critical_pct: pct(findVal(refer, m, 'time_critical'), findVal(refer, m, 'total')),
      repeat_28d_pct: pct(findVal(repeat28, m, 'cnt'), totalVisits),
    };
  });

  const kpiDefs = [
    { id: 'total_visits', name_th: 'จำนวน Visit ทั้งหมด', unit: 'ราย', target: null, higher_better: null, tier: 0, group: 'volume' },
    { id: 'critical_visits', name_th: 'High Acuity (L1+L2)', unit: 'ราย', target: null, higher_better: null, tier: 0, group: 'volume' },
    { id: 'avg_ttd', name_th: 'Door-to-Doctor', unit: 'min', target: 10, higher_better: false, tier: 1, group: 'time' },
    { id: 'triage_sla_pct', name_th: 'Triage SLA', unit: '%', target: 85, higher_better: true, tier: 1, group: 'time' },
    { id: 'l12_refer_30m_pct', name_th: 'L1-2 Refer ≤30m', unit: '%', target: 90, higher_better: true, tier: 1, group: 'time' },
    { id: 'door_to_ct_pct', name_th: 'Door-to-CT ≤25m', unit: '%', target: 80, higher_better: true, tier: 1, group: 'time' },
    { id: 'ed_los_4hr_pct', name_th: 'ED LOS ≤4hr', unit: '%', target: 90, higher_better: true, tier: 1, group: 'time' },
    { id: 'over_triage_pct', name_th: 'Over-triage L1-2', unit: '%', target: 15, higher_better: false, tier: 1, group: 'time' },
    { id: 'under_triage_pct', name_th: 'Under-triage L4-5', unit: '%', target: 5, higher_better: false, tier: 1, group: 'time' },
    { id: 'lwbs_pct', name_th: 'LWBS Rate', unit: '%', target: 2, higher_better: false, tier: 2, group: 'quality' },
    { id: 'revisit_48h_pct', name_th: 'Re-visit 48h', unit: '%', target: 3, higher_better: false, tier: 2, group: 'quality' },
    { id: 'mortality_pct', name_th: 'ED Mortality', unit: '%', target: 0.5, higher_better: false, tier: 2, group: 'quality' },
    { id: 'repeat_28d_pct', name_th: 'Repeat ER 28d', unit: '%', target: 5, higher_better: false, tier: 3, group: 'ops' },
    { id: 'refer_time_critical_pct', name_th: 'Refer Time-Critical %', unit: '%', target: null, higher_better: null, tier: 3, group: 'ops' },
  ];

  return {
    data_source: 'HOSxP XE · 12-month trend aggregates',
    months_window: months,
    axis,
    series,
    kpi_defs: kpiDefs,
    timestamp: new Date().toISOString(),
  };
}));

export default router;
