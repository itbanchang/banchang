import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne, dbQueryHeavy, dbQueryOneHeavy } from '../db/mysql.js';
import { getRevenueFiscal } from '../helpers/fiscal.js';

const router = Router();

// Dental Today Summary
// Completion signals: service7, bill_time, service5 (finance), diagnosis, or income > 0
router.get('/today', cached('dentalToday', 30000, async () => {
  const [summary, hourly, topProc] = await Promise.all([
    dbQueryOne(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN st.service7 IS NOT NULL
                   OR r.bill_time IS NOT NULL
                   OR st.service5 IS NOT NULL
                   OR (st.service2 IS NOT NULL AND (dx.has_dx = 1 OR vs.income > 0))
             THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN st.service7 IS NULL
                  AND r.bill_time IS NULL
                  AND st.service5 IS NULL
                  AND (st.service2 IS NULL OR ((dx.has_dx IS NULL OR dx.has_dx = 0) AND (vs.income IS NULL OR vs.income = 0)))
             THEN 1 ELSE 0 END) as waiting,
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
      LEFT JOIN (SELECT vn, 1 as has_dx FROM ovstdiag GROUP BY vn) dx ON o.vn = dx.vn
      LEFT JOIN vn_stat vs ON o.vn = vs.vn
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
      SELECT d.icd10, d.icd10_name as name, COUNT(*) as cnt
      FROM ovstdiag od
      INNER JOIN ovst o ON od.vn = o.vn
      LEFT JOIN icd101 d ON od.icd10 = d.icd10
      WHERE o.vstdate = CURDATE()
        AND o.main_dep = '010'
      GROUP BY od.icd10, d.icd10_name
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

// Dental Analytics (30-day, 5min cache)
router.get('/analytics', cached('dentalAnalytics', 300000, async () => {
  const [
    baseAnalytics,
    percentiles,
    revenueData,
    monthlyTrend,
    diagnosisTop,
    ageDistribution,
    dailyPattern,
    revisitData
  ] = await Promise.all([
    // 1-3 & 10. Combined 30-Day Base Analytics (Summary, Wait, Completion, SLA)
    dbQueryOneHeavy('dentalBaseAnalytics30d', 60, `
      SELECT
        COUNT(*) as total_visits,
        COUNT(DISTINCT DATE(o.vstdate)) as active_days,
        COUNT(DISTINCT o.hn) as unique_patients,
        -- Wait Times
        ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND st.service1 > o.vsttime 
          THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as avg_wait,
        ROUND(STDDEV(CASE WHEN st.service1 IS NOT NULL AND st.service1 > o.vsttime 
          THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as sd_wait,
        ROUND(AVG(CASE 
          WHEN r.bill_time IS NOT NULL AND r.bill_time > o.vsttime THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
          WHEN st.service7 IS NOT NULL AND st.service7 > o.vsttime THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 0) as avg_total_time,
        SUM(CASE WHEN st.service1 IS NOT NULL AND (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 > 30 THEN 1 ELSE 0 END) as wait_over_30m,
        -- Completion
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL OR st.service5 IS NOT NULL OR vs.income > 0 THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL AND st.service5 IS NULL AND (vs.income IS NULL OR vs.income = 0) AND o.vstdate < CURDATE() THEN 1 ELSE 0 END) as dropout,
        -- SLA
        SUM(CASE WHEN st.service1 IS NOT NULL AND (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 <= 30 THEN 1 ELSE 0 END) as wait_sla_pass,
        SUM(CASE WHEN (COALESCE(st.service7, r.bill_time) IS NOT NULL AND (TIME_TO_SEC(COALESCE(st.service7, r.bill_time)) - TIME_TO_SEC(o.vsttime)) / 60 <= 60) THEN 1 ELSE 0 END) as total_sla_pass,
        -- Demographics
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 12 THEN 1 ELSE 0 END) as children_total,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly_total,
        SUM(CASE WHEN p.sex IN('1', 'ช', 'ชาย') THEN 1 ELSE 0 END) as male_total,
        SUM(CASE WHEN p.sex IN('2', 'ญ', 'หญิง') THEN 1 ELSE 0 END) as female_total
      FROM ovst o
      INNER JOIN patient p ON o.hn = p.hn
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      LEFT JOIN vn_stat vs ON o.vn = vs.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.main_dep = '010'
    `).catch(() => null),

    // Advanced: Median & P90 Wait Time (30-day)
    dbQueryOneHeavy('dentalPercentiles30d', 120, `
      SELECT 
        (SELECT ROUND(AVG(t.wait_min), 0) FROM (
          SELECT (TIME_TO_SEC(COALESCE(st2.service7, r2.bill_time)) - TIME_TO_SEC(o2.vsttime)) / 60 as wait_min
          FROM ovst o2
          LEFT JOIN service_time st2 ON o2.vn = st2.vn
          LEFT JOIN rcpt_print r2 ON o2.vn = r2.vn
          WHERE o2.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o2.main_dep = '010'
            AND (st2.service7 IS NOT NULL OR r2.bill_time IS NOT NULL)
          ORDER BY wait_min LIMIT 2 OFFSET (SELECT FLOOR(COUNT(*)/2) FROM ovst WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND main_dep='010')
        ) t) as median_wait,
        (SELECT ROUND(MAX(t.wait_min), 0) FROM (
          SELECT (TIME_TO_SEC(COALESCE(st2.service7, r2.bill_time)) - TIME_TO_SEC(o2.vsttime)) / 60 as wait_min
          FROM ovst o2
          LEFT JOIN service_time st2 ON o2.vn = st2.vn
          LEFT JOIN rcpt_print r2 ON o2.vn = r2.vn
          WHERE o2.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o2.main_dep = '010'
            AND (st2.service7 IS NOT NULL OR r2.bill_time IS NOT NULL)
          ORDER BY wait_min ASC LIMIT CEIL(0.9 * (SELECT COUNT(*) FROM ovst WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND main_dep='010'))
        ) t) as p90_wait
      FROM DUAL
    `).catch(() => ({ median_wait: null, p90_wait: null })),

    // 4. Revenue
    dbQueryOneHeavy('dentalRevenue30d', 60, `
      SELECT
        ROUND(AVG(v.income), 0) as avg_revenue,
        ROUND(SUM(v.income), 0) as total_revenue,
        COUNT(*) as billable_visits,
        ROUND(SUM(v.income) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 0) as daily_revenue
      FROM ovst o
      INNER JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.main_dep = '010' AND v.income > 0
    `).catch(() => null),

    // 5. Monthly Trend (6 months)
    dbQueryHeavy('dentalMonthlyTrend', 120, `
      SELECT
        DATE_FORMAT(o.vstdate, '%Y-%m') as month,
        COUNT(*) as visits,
        ROUND(SUM(v.income), 0) as total_rev
      FROM ovst o
      LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        AND o.main_dep = '010'
      GROUP BY DATE_FORMAT(o.vstdate, '%Y-%m')
      ORDER BY month
    `).catch(() => []),

    // 6. Top Diagnoses (30-day)
    dbQueryHeavy('dentalTopDiag30d', 60, `
      SELECT od.icd10, d.icd10_name as name, COUNT(*) as cnt
      FROM ovstdiag od
      INNER JOIN ovst o ON od.vn = o.vn
      LEFT JOIN icd101 d ON od.icd10 = d.icd10
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.main_dep = '010'
      GROUP BY od.icd10, d.icd10_name
      ORDER BY cnt DESC LIMIT 10
    `).catch(() => []),

    // 7. Age Distribution
    dbQueryHeavy('dentalAgeDist30d', 60, `
      SELECT
        CASE
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 12 THEN 'Children'
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 60 THEN 'Adult'
          ELSE 'Elderly'
        END as age_group,
        COUNT(*) as cnt
      FROM ovst o
      INNER JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.main_dep = '010'
      GROUP BY age_group
    `).catch(() => []),

    // 8. Daily Pattern (30-day hourly average)
    dbQueryHeavy('dentalDailyPattern30d', 60, `
      SELECT
        HOUR(o.vsttime) as hour,
        ROUND(COUNT(*) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 1) as avg_daily
      FROM ovst o
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.main_dep = '010' AND o.vsttime IS NOT NULL
      GROUP BY HOUR(o.vsttime)
      ORDER BY hour
    `).catch(() => []),

    // 9. Revisit Rate (same patient within 7 days)
    dbQueryOneHeavy('dentalRevisitRate30d', 60, `
      SELECT
        COUNT(DISTINCT o2.vn) as revisit_count,
        COUNT(DISTINCT o1.vn) as total_visits,
        ROUND(100.0 * COUNT(DISTINCT o2.vn) / NULLIF(COUNT(DISTINCT o1.vn), 0), 1) as revisit_rate
      FROM ovst o1
      INNER JOIN ovst o2 ON o1.hn = o2.hn AND o1.vn != o2.vn
        AND o2.vstdate BETWEEN DATE_ADD(o1.vstdate, INTERVAL 1 DAY) AND DATE_ADD(o1.vstdate, INTERVAL 7 DAY)
        AND o2.main_dep = '010'
      WHERE o1.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o1.main_dep = '010'
    `).catch(() => null),
  ]);

  // ── Derived calculations ──
  const base = baseAnalytics || {};
  const totalVisits = Number(base.total_visits || 0);
  const completionRate = totalVisits > 0 ? Math.round((Number(base.completed || 0) / totalVisits) * 1000) / 10 : 0;
  const waitSlaPct = totalVisits > 0 ? Math.round((Number(base.wait_sla_pass || 0) / totalVisits) * 1000) / 10 : 0;
  const revisitRate = Number(revisitData?.revisit_rate || 0);

  // ── DPI: Dental Performance Index (Advanced AI Scoring) ──
  const waitScore = Math.max(0, Math.min(100, 100 - (Number(base.avg_wait || 0) - 15) * 2));
  const completionScore = completionRate;
  const revisitScore = Math.max(0, 100 - revisitRate * 5);
  const revenueScore = Math.min(100, (Number(revenueData?.avg_revenue || 0) / 1500) * 100);
  const dpi = Math.round((waitScore * 0.3) + (completionScore * 0.3) + (revisitScore * 0.2) + (revenueScore * 0.2));

  return {
    data_source: 'HOSxP XE',
    dpi,
    dpi_components: { wait_time: waitScore, completion: completionScore, revisit: revisitScore, revenue: revenueScore },
    total_visits: totalVisits,
    avg_daily_visits: Number(base.avg_daily || 0),
    unique_patients: Number(base.unique_patients || 0),
    avg_wait_time: Number(base.avg_wait || 0),
    median_wait_time: Number(percentiles?.median_wait || 0),
    p90_wait_time: Number(percentiles?.p90_wait || 0),
    completion_rate: completionRate,
    dropout_count: Number(base.dropout || 0),
    wait_sla_pct: waitSlaPct,
    revisit_rate: revisitRate,
    avg_revenue_per_visit: Number(revenueData?.avg_revenue || 0),
    total_revenue: Number(revenueData?.total_revenue || 0),
    monthly_trend: (monthlyTrend || []).map(m => ({ month: m.month, visits: m.visits, total_rev: m.total_rev })),
    top_diagnoses: (diagnosisTop || []).map(d => ({ icd10: d.icd10, name: d.name, count: d.cnt })),
    hourly_pattern: (dailyPattern || []).map(p => ({ hour: p.hour, avg: p.avg_daily })),
    demographics: {
      children: Number(base.children_total || 0),
      elderly: Number(base.elderly_total || 0),
      male: Number(base.male_total || 0),
      female: Number(base.female_total || 0)
    },
    timestamp: new Date().toISOString(),
  };

}));

// ━━━━━━ Dental Estimated Revenue — Fiscal Year (3 ปีย้อนหลัง) ━━━━━━
router.get('/revenue-fiscal', cached('dentalRevenueFiscal', 3600000, () => getRevenueFiscal('010', 'HOSxP XE · vn_stat (dental)')));

export default router;
