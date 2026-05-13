import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne } from '../db/mysql.js';
import { getRevenueFiscal } from '../helpers/fiscal.js';

const router = Router();

// ============================================================
// 🦷 Dental Analytics — HOSxP XE (main_dep = '010')
// ============================================================

// Dental Today Summary
router.get('/today', cached('dentalToday_v2', 30000, async () => {
  const [summary, hourly, topProc] = await Promise.all([
    dbQueryOne(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL THEN 1 ELSE 0 END) as waiting,
        COUNT(DISTINCT o.hn) as unique_patients,
        ROUND(AVG(CASE
          WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
          WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 0) as avg_total_time,
        ROUND(AVG(CASE
          WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 0) as avg_wait_time,
        SUM(CASE WHEN p.sex IN ('1','ช','ชาย') THEN 1 ELSE 0 END) as male,
        SUM(CASE WHEN p.sex IN ('2','ญ','หญิง') THEN 1 ELSE 0 END) as female,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 12 THEN 1 ELSE 0 END) as children,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly,
        ROUND(AVG(TIMESTAMPDIFF(YEAR, p.birthday, CURDATE())), 1) as avg_age
      FROM ovst o
      INNER JOIN patient p ON o.hn = p.hn
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE()
        AND o.main_dep = '010'
    `).catch(() => null),

    dbQuery(`
      SELECT HOUR(o.vsttime) as hr, COUNT(*) as cnt
      FROM ovst o
      WHERE o.vstdate = CURDATE() AND o.vsttime IS NOT NULL
        AND o.main_dep = '010'
      GROUP BY HOUR(o.vsttime) ORDER BY hr
    `).catch(() => []),

    dbQuery(`
      SELECT od.icd10, d.name as name, COUNT(*) as cnt
      FROM ovstdiag od
      INNER JOIN ovst o ON od.vn = o.vn
      LEFT JOIN icd101 d ON od.icd10 = d.code
      WHERE o.vstdate = CURDATE()
        AND o.main_dep = '010'
      GROUP BY od.icd10, d.name
      ORDER BY cnt DESC LIMIT 10
    `).catch(() => []),
  ]);

  const hourlyArr = Array.from({ length: 24 }, (_, h) => {
    const d = (hourly || []).find(x => Number(x.hr) === h);
    return { hour: h, label: `${String(h).padStart(2, '0')}:00`, count: Number(d?.cnt || 0) };
  });

  return {
    data_source: 'HOSxP XE',
    total: Number(summary?.total || 0),
    completed: Number(summary?.completed || 0),
    waiting: Number(summary?.waiting || 0),
    unique_patients: Number(summary?.unique_patients || 0),
    avg_total_time: Number(summary?.avg_total_time || 0),
    avg_wait_time: Number(summary?.avg_wait_time || 0),
    male: Number(summary?.male || 0),
    female: Number(summary?.female || 0),
    children: Number(summary?.children || 0),
    elderly: Number(summary?.elderly || 0),
    avg_age: Number(summary?.avg_age || 0),
    hourly: hourlyArr,
    top_diagnoses: (topProc || []).map(p => ({
      icd10: p.icd10, name: p.name, count: Number(p.cnt || 0)
    })),
    timestamp: new Date().toISOString(),
  };
}));

// Dental Analytics (30-day)
router.get('/analytics', cached('dentalAnalytics_v16', 900000, async () => {
  const [
    visitSummary, waitTimeSummary, completionData, revenueData,
    monthlyTrend, diagnosisTop, ageDistribution, dailyPattern, revisitData, slaCounts,
    activeDoctorsList, activeNursesList, activeStaffList
  ] = await Promise.all([
    // 1. Visit Summary
    dbQueryOne(`
      SELECT COUNT(o.vn) as total_visits, COUNT(DISTINCT o.vstdate) as active_days,
        ROUND(COUNT(o.vn) / NULLIF(COUNT(DISTINCT o.vstdate), 0), 1) as avg_daily,
        COUNT(DISTINCT o.hn) as unique_patients,
        SUM(CASE WHEN p.birthday > DATE_SUB(CURDATE(), INTERVAL 12 YEAR) THEN 1 ELSE 0 END) as children_total,
        SUM(CASE WHEN p.birthday < DATE_SUB(CURDATE(), INTERVAL 60 YEAR) THEN 1 ELSE 0 END) as elderly_total,
        SUM(CASE WHEN p.sex IN ('1','ช','ชาย') THEN 1 ELSE 0 END) as male_total,
        SUM(CASE WHEN p.sex IN ('2','ญ','หญิง') THEN 1 ELSE 0 END) as female_total
      FROM ovst o STRAIGHT_JOIN patient p ON p.hn = o.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '010'
    `).catch(() => null),

    // 2. Wait Time Summary
    dbQueryOne(`
      SELECT
        ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as avg_wait,
        ROUND(STDDEV(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as sd_wait,
        ROUND(AVG(CASE
          WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
          WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 0) as avg_total_time,
        SUM(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
            AND (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 > 30 THEN 1 ELSE 0 END) as wait_over_30m
      FROM ovst o STRAIGHT_JOIN service_time st ON st.vn = o.vn LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '010' AND o.vsttime IS NOT NULL
    `).catch(() => null),

    // 3. Completion Rates
    dbQueryOne(`
      SELECT
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as completed,
        COUNT(o.vn) as total,
        ROUND(100.0 * SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) / NULLIF(COUNT(o.vn), 0), 1) as completion_rate,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL AND o.vstdate < CURDATE() THEN 1 ELSE 0 END) as dropout
      FROM ovst o LEFT JOIN service_time st ON o.vn = st.vn LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '010'
    `).catch(() => null),

    // 4. Revenue
    dbQueryOne(`
      SELECT ROUND(AVG(v.income), 0) as avg_revenue,
        ROUND(SUM(v.income), 0) as total_revenue, MAX(v.income) as max_revenue, COUNT(v.vn) as billable_visits,
        ROUND(SUM(v.income) / NULLIF(COUNT(DISTINCT o.vstdate), 0), 0) as daily_revenue
      FROM ovst o STRAIGHT_JOIN vn_stat v ON v.vn = o.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '010' AND v.income > 0
    `).catch(() => null),

    // 5. Monthly Trend
    dbQuery(`
      SELECT DATE_FORMAT(o.vstdate, '%Y-%m') as month, COUNT(*) as visits,
        COUNT(DISTINCT o.hn) as patients, ROUND(AVG(v.income), 0) as avg_rev, ROUND(SUM(v.income), 0) as total_rev
      FROM ovst o LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND o.main_dep = '010'
      GROUP BY DATE_FORMAT(o.vstdate, '%Y-%m') ORDER BY month
    `).catch(() => []),

    // 6. Top Diagnoses
    dbQuery(`
      SELECT od.icd10, d.name as name, COUNT(*) as cnt, ROUND(AVG(v.income), 0) as avg_rev
      FROM ovstdiag od INNER JOIN ovst o ON od.vn = o.vn LEFT JOIN icd101 d ON od.icd10 = d.code
      LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '010'
      GROUP BY od.icd10, d.name ORDER BY cnt DESC LIMIT 10
    `).catch(() => []),

    // 7. Age Distribution
    dbQuery(`
      SELECT CASE
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 6 THEN '0-5'
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 12 THEN '6-11'
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 18 THEN '12-17'
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 35 THEN '18-34'
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 60 THEN '35-59'
          ELSE '60+' END as age_group, COUNT(*) as cnt
      FROM ovst o INNER JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '010'
      GROUP BY age_group ORDER BY FIELD(age_group, '0-5','6-11','12-17','18-34','35-59','60+')
    `).catch(() => []),

    // 8. Daily Pattern
    dbQuery(`
      SELECT HOUR(o.vsttime) as hour, COUNT(*) as total,
        ROUND(COUNT(*) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 1) as avg_daily
      FROM ovst o WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.main_dep = '010' AND o.vsttime IS NOT NULL
      GROUP BY HOUR(o.vsttime) ORDER BY hour
    `).catch(() => []),

    // 9. Revisit Rate
    dbQueryOne(`
      SELECT COUNT(DISTINCT o2.vn) as revisit_count, COUNT(DISTINCT o1.vn) as total_visits,
        ROUND(100.0 * COUNT(DISTINCT o2.vn) / NULLIF(COUNT(DISTINCT o1.vn), 0), 1) as revisit_rate
      FROM ovst o1 LEFT JOIN ovst o2 ON o1.hn = o2.hn AND o1.vn != o2.vn
        AND o2.vstdate BETWEEN DATE_ADD(o1.vstdate, INTERVAL 1 DAY) AND DATE_ADD(o1.vstdate, INTERVAL 7 DAY)
        AND o2.main_dep = '010'
      WHERE o1.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o1.main_dep = '010'
    `).catch(() => null),

    // 10. SLA Counts
    dbQueryOne(`
      SELECT
        SUM(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
            AND (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 <= 30 THEN 1 ELSE 0 END) as wait_sla_pass,
        SUM(CASE
          WHEN (r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
            AND (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60 <= 60)
          OR (st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
            AND (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60 <= 60)
          THEN 1 ELSE 0 END) as total_sla_pass,
        COUNT(*) as total
      FROM ovst o LEFT JOIN service_time st ON o.vn = st.vn LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '010' AND o.vsttime IS NOT NULL
    `).catch(() => null),

    // 11. Active Dentists Today (Exact Dentists)
    dbQuery(`
      SELECT u.loginname as username, u.name as staff_name, COUNT(o.vn) as total_count
      FROM ovst o
      JOIN opduser u ON o.doctor = u.doctorcode OR o.doctor = u.loginname
      WHERE o.vstdate = CURDATE() AND o.main_dep = '010'
        AND (u.name LIKE 'ทพ.%' OR u.name LIKE 'ทพญ.%')
      GROUP BY u.loginname, u.name
      ORDER BY total_count DESC
    `).catch(() => []),

    // 12. Active Dental Hygienists (ทันตาภิบาล)
    dbQuery(`
      SELECT username, staff_name, 
             SUM(morning_count) as morning_count, 
             SUM(afternoon_count) as afternoon_count, 
             SUM(night_count) as night_count, 
             SUM(total_count) as total_count
      FROM (
        SELECT u.loginname as username, u.name as staff_name,
               SUM(CASE WHEN HOUR(o.vsttime) < 12 THEN 1 ELSE 0 END) as morning_count,
               SUM(CASE WHEN HOUR(o.vsttime) >= 12 AND HOUR(o.vsttime) < 17 THEN 1 ELSE 0 END) as afternoon_count,
               SUM(CASE WHEN HOUR(o.vsttime) >= 17 THEN 1 ELSE 0 END) as night_count,
               COUNT(*) as total_count
        FROM ovst o
        JOIN opduser u ON o.staff = u.loginname
        WHERE o.vstdate = CURDATE() AND o.main_dep = '010'
          AND (u.name LIKE 'พว.%' OR u.name LIKE 'นป.%' OR u.name LIKE 'ผช.%')
        GROUP BY u.loginname, u.name
        
        UNION ALL
        
        SELECT u.loginname as username, u.name as staff_name,
               SUM(CASE WHEN HOUR(o.vsttime) < 12 THEN 1 ELSE 0 END) as morning_count,
               SUM(CASE WHEN HOUR(o.vsttime) >= 12 AND HOUR(o.vsttime) < 17 THEN 1 ELSE 0 END) as afternoon_count,
               SUM(CASE WHEN HOUR(o.vsttime) >= 17 THEN 1 ELSE 0 END) as night_count,
               COUNT(*) as total_count
        FROM ovst o
        JOIN opduser u ON o.doctor = u.doctorcode OR o.doctor = u.loginname
        WHERE o.vstdate = CURDATE() AND o.main_dep = '010'
          AND u.name NOT LIKE 'ทพ.%' AND u.name NOT LIKE 'ทพญ.%'
          AND u.name NOT LIKE 'นพ.%' AND u.name NOT LIKE 'พญ.%'
          AND u.loginname != 'kiosk'
        GROUP BY u.loginname, u.name
      ) AS t
      GROUP BY username, staff_name
      ORDER BY total_count DESC
    `).catch(() => []),

    // 13. Active Dental Staff Today (Administrative/Support)
    dbQuery(`
      SELECT u.loginname as username, u.name as staff_name,
             SUM(CASE WHEN HOUR(o.vsttime) < 12 THEN 1 ELSE 0 END) as morning_count,
             SUM(CASE WHEN HOUR(o.vsttime) >= 12 AND HOUR(o.vsttime) < 17 THEN 1 ELSE 0 END) as afternoon_count,
             SUM(CASE WHEN HOUR(o.vsttime) >= 17 THEN 1 ELSE 0 END) as night_count,
             COUNT(*) as total_count
      FROM ovst o
      JOIN opduser u ON o.staff = u.loginname
      WHERE o.vstdate = CURDATE() AND o.main_dep = '010'
        AND u.name NOT LIKE 'พว.%' AND u.name NOT LIKE 'นป.%' AND u.name NOT LIKE 'ผช.%'
        AND u.name NOT LIKE 'ทพ.%' AND u.name NOT LIKE 'ทพญ.%'
        AND u.name NOT LIKE 'นพ.%' AND u.name NOT LIKE 'พญ.%'
        AND u.loginname != 'kiosk'
      GROUP BY u.loginname, u.name
      ORDER BY total_count DESC
    `).catch(() => [])
  ]);

  // Derived calculations
  const totalVisits = Number(visitSummary?.total_visits || 0);
  const avgDaily = Number(visitSummary?.avg_daily || 0);
  const uniquePatients = Number(visitSummary?.unique_patients || 0);
  const avgWait = Number(waitTimeSummary?.avg_wait || 0);
  const sdWait = Number(waitTimeSummary?.sd_wait || 0);
  const avgTotal = Number(waitTimeSummary?.avg_total_time || 0);
  const waitOver30m = Number(waitTimeSummary?.wait_over_30m || 0);
  const completionRate = Number(completionData?.completion_rate || 0);
  const dropoutCount = Number(completionData?.dropout || 0);
  const avgRevenue = Number(revenueData?.avg_revenue || 0);
  const totalRevenue = Number(revenueData?.total_revenue || 0);
  const dailyRevenue = Number(revenueData?.daily_revenue || 0);
  const revisitRate = Number(revisitData?.revisit_rate || 0);
  const waitSlaPct = Number(slaCounts?.total) > 0
    ? Math.round((Number(slaCounts.wait_sla_pass || 0) / Number(slaCounts.total)) * 100 * 10) / 10 : 0;
  const totalSlaPct = Number(slaCounts?.total) > 0
    ? Math.round((Number(slaCounts.total_sla_pass || 0) / Number(slaCounts.total)) * 100 * 10) / 10 : 0;

  // Median & P90 approximation from wait distribution
  const medianWait = avgWait > 0 ? Math.round(avgWait * 0.85) : 0;
  const p90Wait = avgWait > 0 ? Math.round(avgWait + sdWait * 1.28) : 0;

  // DPI: Dental Performance Index (0-100)
  const waitScore = Math.max(0, Math.round(100 - (avgWait - 10) * 3));
  const completionScore = Math.round(Math.min(100, completionRate));
  const revisitScore = Math.max(0, Math.round(100 - revisitRate * 8));
  const revenueScore = Math.min(100, Math.round(avgRevenue / 20));
  const slaScore = Math.round(waitSlaPct);
  const dpi = Math.round(
    (waitScore * 0.25) + (completionScore * 0.25) + (revisitScore * 0.15) + (revenueScore * 0.15) + (slaScore * 0.20)
  );

  // Hourly pattern
  const hourlyArr = Array.from({ length: 24 }, (_, h) => {
    const d = (dailyPattern || []).find(x => Number(x.hour) === h);
    return { hour: h, label: `${String(h).padStart(2, '0')}:00`, avg: Number(d?.avg_daily || 0), total: Number(d?.total || 0) };
  });
  const peakHr = hourlyArr.reduce((best, h) => h.avg > (best?.avg || 0) ? h : best, hourlyArr[0]);

  // Monthly trend
  const MTH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const monthData = (monthlyTrend || []).map(m => ({
    month: MTH[parseInt(m.month?.split('-')[1])] || m.month,
    visits: Number(m.visits || 0), patients: Number(m.patients || 0),
    avg_rev: Number(m.avg_rev || 0), total_rev: Number(m.total_rev || 0),
  }));

  return {
    data_source: 'HOSxP XE',
    dpi,
    dpi_components: { wait_time: waitScore, completion: completionScore, revisit: revisitScore, revenue: revenueScore, sla: slaScore },
    total_visits: totalVisits, avg_daily_visits: avgDaily, unique_patients: uniquePatients,
    children_total: Number(visitSummary?.children_total || 0),
    elderly_total: Number(visitSummary?.elderly_total || 0),
    male_total: Number(visitSummary?.male_total || 0),
    female_total: Number(visitSummary?.female_total || 0),
    avg_wait_time: avgWait, sd_wait_time: sdWait, median_wait_time: medianWait, p90_wait_time: p90Wait,
    avg_total_time: avgTotal, sd_total_time: Number(waitTimeSummary?.sd_total_time || 0),
    wait_over_30m: waitOver30m, wait_sla_pct: waitSlaPct, total_sla_pct: totalSlaPct,
    completion_rate: completionRate, dropout_count: dropoutCount,
    revisit_rate: revisitRate, revisit_count: Number(revisitData?.revisit_count || 0),
    avg_revenue_per_visit: avgRevenue, total_revenue: totalRevenue, daily_revenue: dailyRevenue,
    max_revenue: Number(revenueData?.max_revenue || 0),
    hourly_pattern: hourlyArr,
    peak_hour: { hour: peakHr?.hour, label: peakHr?.label, avg: peakHr?.avg },
    monthly_trend: monthData,
    top_diagnoses: (diagnosisTop || []).map(d => ({ icd10: d.icd10, name: d.name, count: Number(d.cnt || 0), avg_rev: Number(d.avg_rev || 0) })),
    age_distribution: (ageDistribution || []).map(a => ({ group: a.age_group, count: Number(a.cnt || 0) })),
    on_duty: {
      doctors: activeDoctorsList || [],
      nurses: activeNursesList || [],
      staff: activeStaffList || []
    },
    timestamp: new Date().toISOString(),
  };
}));

// ━━━━━━ Dental Estimated Revenue — Fiscal Year (3 ปีย้อนหลัง) ━━━━━━
router.get('/revenue-fiscal', cached('dentalRevenueFiscal', 3600000, (req) => getRevenueFiscal('010', 'HOSxP XE · vn_stat (dental)', req?.query?.start, req?.query?.end)));

export default router;
