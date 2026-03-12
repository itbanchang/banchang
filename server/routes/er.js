import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne, dbQueryHeavy, dbQueryOneHeavy } from '../db/mysql.js';
import hosxp from '../db/hosxpIntegration.js';
import ai from '../ai/aiModules.js';

const router = Router();

// ============================================================
// 🚑 ER Operations — Live from HOSxP XE
// ============================================================
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
router.get('/analytics', cached('erAnalytics', 300000, async () => {
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
    todayAcuity
  ] = await Promise.all([
    // 1. Combined ER Base Analytics (Summary, Returns, LWBS, SLA)
    dbQueryOneHeavy('erBaseAnalytics30d', 60, `
      SELECT
        COUNT(*) as total_visits,
        COUNT(DISTINCT DATE(e.vstdate)) as active_days,
        ROUND(AVG(NULLIF(GREATEST(0, COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time))), 0)) / 60, 1) as avg_ttd,
        ROUND(STDDEV(NULLIF(GREATEST(0, COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time))), 0)) / 60, 1) as sd_ttd,
        SUM(CASE WHEN e.er_dch_type IN ('4', '5') OR (e.door_to_doctor_second IS NULL AND e.doctor_tx_time IS NULL AND e.finish_time IS NOT NULL AND TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.finish_time) < 15) THEN 1 ELSE 0 END) as lwbs_count,
        SUM(CASE 
          WHEN e.er_emergency_type = '1' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 60 THEN 1
          WHEN e.er_emergency_type = '2' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 600 THEN 1
          WHEN e.er_emergency_type = '3' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 1800 THEN 1
          WHEN e.er_emergency_type > '3' AND COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time)) <= 3600 THEN 1
          ELSE 0 END) as sla_pass_count,
        (SELECT COUNT(DISTINCT e2.vn) 
         FROM er_regist e1_sub 
         INNER JOIN ovst o1 ON e1_sub.vn = o1.vn
         INNER JOIN ovst o2 ON o1.hn = o2.hn 
         INNER JOIN er_regist e2 ON o2.vn = e2.vn
         WHERE e1_sub.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
           AND e2.vstdate BETWEEN e1_sub.vstdate AND DATE_ADD(e1_sub.vstdate, INTERVAL 3 DAY)
           AND e1_sub.vn != e2.vn
        ) as return_count
      FROM er_regist e WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `).catch(() => null),

    // 2. Median & P90 TTD (MariaDB 10.1 Compatible Percentiles - Refined Sorting)
    dbQueryOneHeavy('erPercentiles30d', 120, `
      SELECT 
        AVG(CASE WHEN row_num = ROUND(cnt * 0.5) THEN wait_min END) as median_ttd,
        AVG(CASE WHEN row_num = ROUND(cnt * 0.9) THEN wait_min END) as p90_ttd
      FROM (
        SELECT 
          t_inner.wait_min,
          @row := @row + 1 as row_num,
          t_inner.cnt
        FROM (
          SELECT 
            GREATEST(0.1, COALESCE(e.door_to_doctor_second, TIMESTAMPDIFF(SECOND, e.enter_er_time, e.doctor_tx_time))) / 60 as wait_min,
            (SELECT COUNT(*) FROM er_regist WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND doctor_tx_time IS NOT NULL) as cnt
          FROM er_regist e
          WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) 
            AND e.doctor_tx_time IS NOT NULL 
          ORDER BY wait_min
        ) t_inner, (SELECT @row := 0) r
      ) t
    `).catch(() => ({ median_ttd: 0, p90_ttd: 0 })),

    // 3. Revenue & Cost
    dbQueryOneHeavy('erRevenue30d', 60, `
      SELECT ROUND(AVG(v.income), 0) as avg_cost, ROUND(SUM(v.income), 0) as total_revenue, COUNT(*) as billable_visits
      FROM er_regist e INNER JOIN vn_stat v ON e.vn = v.vn
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
      SELECT od.icd10, d.icd10_name as name, COUNT(*) as cnt
      FROM ovstdiag od INNER JOIN er_regist e ON od.vn = e.vn LEFT JOIN icd101 d ON od.icd10 = d.icd10
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY od.icd10, d.icd10_name ORDER BY cnt DESC LIMIT 10
    `).catch(() => []),

    // 6. Age Distribution
    dbQueryHeavy('erAgeDist30d', 60, `
      SELECT CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 12 THEN 'Children' WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 60 THEN 'Adult' ELSE 'Elderly' END as age_group, COUNT(*) as cnt
      FROM er_regist e INNER JOIN patient p ON e.hn = p.hn WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY age_group
    `).catch(() => []),

    // 7. Hourly Load Pattern (30 วัน)
    dbQueryHeavy('erDailyPattern30d', 60, `
      SELECT HOUR(e.enter_er_time) as hour, COUNT(*) as total, ROUND(COUNT(*) / 30.0, 1) as avg_daily, SUM(CASE WHEN e.er_emergency_type IN ('1','2') THEN 1 ELSE 0 END) as critical_count
      FROM er_regist e WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND e.enter_er_time IS NOT NULL GROUP BY HOUR(e.enter_er_time) ORDER BY hour
    `).catch(() => []),

    // 8. Disposition Analysis
    dbQueryHeavy('erDisposition30d', 60, `
      SELECT e.er_dch_type as dch_type, COUNT(*) as cnt, ROUND(AVG(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.finish_time))), 0) as avg_stay_min
      FROM er_regist e WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND e.er_dch_type IS NOT NULL GROUP BY e.er_dch_type ORDER BY cnt DESC
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
    `).catch(() => null)
  ]);

  // ━━ Calculations ━━
  const base = baseAnalytics || {};
  const totalVisits = Number(base.total_visits || 0);
  const avgTTD = Number(base.avg_ttd || 0);
  const lwbsCount = Number(base.lwbs_count || 0);
  const lwbsRate = totalVisits > 0 ? Math.round((lwbsCount / totalVisits) * 100 * 10) / 10 : 0;
  const returnCount = Number(base.return_count || 0);
  const returnRate = totalVisits > 0 ? Math.round((returnCount / totalVisits) * 100 * 10) / 10 : 0;
  const slaPassRate = totalVisits > 0 ? Math.round((Number(base.sla_pass_count || 0) / totalVisits) * 100 * 10) / 10 : 0;

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

  // Disposition formatting
  const DISPO_NAMES = {
    '1': 'กลับบ้าน', '2': 'Admit IPD', '3': 'ส่งต่อ Refer',
    '4': 'ปฏิเสธรักษา', '5': 'หนีกลับ', '9': 'เสียชีวิต'
  };
  const dispoData = (disposition || []).map(d => ({
    type: d.dch_type,
    name: DISPO_NAMES[d.dch_type] || `Type ${d.dch_type}`,
    count: Number(d.cnt || 0),
    avg_stay: Number(d.avg_stay_min || 0),
  }));
  const admitCount = dispoData.find(d => d.type === '2')?.count || 0;
  const totalDispo = dispoData.reduce((s, d) => s + d.count, 0);
  const admitRate = totalDispo > 0 ? Math.round((admitCount / totalDispo) * 100 * 10) / 10 : 0;

  // Monthly trend
  const MONTH_TH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const monthData = (monthlyTrend || []).map(m => ({
    month: MONTH_TH[parseInt(m.month?.split('-')[1])] || m.month,
    visits: Number(m.visits || 0),
    critical: Number(m.critical || 0),
    avg_stay: Number(m.avg_stay || 0),
  }));

  // ━━ ER Performance Index (EPI) — Composite 0-100 ━━
  const ttdScore = Math.max(0, Math.round(100 - (avgTTD - 10) * 3));
  const lwbsScore = Math.max(0, Math.round(100 - lwbsRate * 10));
  const returnScore = Math.max(0, Math.round(100 - returnRate * 5));
  const acuityMatch = Number(todayAcuity?.acuity_pct || 0);
  const acuityScore = Math.min(100, Math.round(50 + acuityMatch));
  const avgCost = Number(revenueData?.avg_cost || 1500);
  const costScore = Math.min(100, Math.round((5000 / Math.max(avgCost, 1)) * 50));

  const epi = Math.round(
    (ttdScore * 0.30) +
    (lwbsScore * 0.20) +
    (returnScore * 0.20) +
    (acuityScore * 0.15) +
    (costScore * 0.15)
  );

  return {
    data_source: 'HOSxP XE · 8 AI Modules',
    epi,
    epi_components: { time_to_doctor: ttdScore, lwbs: lwbsScore, return_visit: returnScore, acuity: acuityScore, cost: costScore },
    total_visits_30d: totalVisits,
    avg_daily_visits: totalVisits > 0 ? Math.round(totalVisits / Math.max(1, Number(base.active_days || 1)) * 10) / 10 : 0,
    return_visit_rate: returnRate,
    return_visit_count: returnCount,
    avg_time_to_doctor: avgTTD,
    median_time_to_doctor: Number(percentiles?.median_ttd || 0),
    p90_time_to_doctor: Number(percentiles?.p90_ttd || 0),
    sd_time_to_doctor: Number(base.sd_ttd || 0),
    lwbs_count: lwbsCount,
    lwbs_rate: lwbsRate,
    admit_rate: admitRate,
    admit_count: admitCount,
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
    timestamp: new Date().toISOString(),
  };
}));

// ━━━━━━ ER Estimated Revenue — Fiscal Year (3 ปีย้อนหลัง) ━━━━━━
router.get('/revenue-fiscal', cached('erRevenueFiscal', 3600000, async () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const currentFiscalStartYear = currentMonth >= 10 ? currentYear : currentYear - 1;

  const MONTH_TH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

  const fiscalYears = [];
  for (let offset = 2; offset >= 0; offset--) {
    const startYear = currentFiscalStartYear - offset;
    fiscalYears.push({
      startYear,
      startDate: `${startYear}-10-01`,
      endDate: `${startYear + 1}-09-30`,
      fiscalBE: startYear + 543 + 1,
    });
  }

  const globalStart = fiscalYears[0].startDate;
  const globalEnd = `${currentFiscalStartYear + 1}-09-30`;

  // Use dbQueryHeavy for the revenue fiscal query
  const rows = await dbQueryHeavy('erRevenueFiscalQuery', 120, `
    SELECT
      YEAR(e.vstdate) AS yr,
    MONTH(e.vstdate) AS mo,
    SUM(v.income) AS revenue,
    COUNT(DISTINCT e.vn) AS visit_count,
    COUNT(DISTINCT o.hn) AS patient_count
    FROM er_regist e
    INNER JOIN vn_stat v ON e.vn = v.vn
    INNER JOIN ovst o ON e.vn = o.vn
    WHERE e.vstdate BETWEEN '${globalStart}' AND LEAST('${globalEnd}', CURDATE())
      AND v.income > 0
    GROUP BY YEAR(e.vstdate), MONTH(e.vstdate)
    ORDER BY yr, mo
    `);

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

export default router;
