import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne, dbQueryHeavy, dbQueryOneHeavy } from '../db/mysql.js';
import { getRevenueFiscal } from '../helpers/fiscal.js';

const router = Router();

// Completion signals: service7, bill_time, service5 (finance) — strong end-of-visit only
router.get('/today', cached('ttmToday', 30000, async () => {
  const [summary, hourly, topProc, avgHourly7d] = await Promise.all([
    dbQueryOne(`
      SELECT COUNT(*) as total,
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL
                   OR st.service5 IS NOT NULL
                   OR (st.service2 IS NOT NULL AND (dx.has_dx = 1 OR vs.income > 0))
             THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL
                  AND st.service5 IS NULL
                  AND (st.service2 IS NULL OR ((dx.has_dx IS NULL OR dx.has_dx = 0) AND (vs.income IS NULL OR vs.income = 0)))
             THEN 1 ELSE 0 END) as waiting,
        COUNT(DISTINCT o.hn) as unique_patients,
        ROUND(AVG(CASE WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
          WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 0) as avg_total_time,
        ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 0) as avg_wait_time,
        SUM(CASE WHEN p.sex IN ('1','ช','ชาย') THEN 1 ELSE 0 END) as male,
        SUM(CASE WHEN p.sex IN ('2','ญ','หญิง') THEN 1 ELSE 0 END) as female,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly,
        ROUND(AVG(TIMESTAMPDIFF(YEAR, p.birthday, CURDATE())), 1) as avg_age
      FROM ovst o INNER JOIN patient p ON o.hn = p.hn
      LEFT JOIN service_time st ON o.vn = st.vn LEFT JOIN rcpt_print r ON o.vn = r.vn
      LEFT JOIN (SELECT vn, 1 as has_dx FROM ovstdiag GROUP BY vn) dx ON o.vn = dx.vn
      LEFT JOIN vn_stat vs ON o.vn = vs.vn
      WHERE o.vstdate = CURDATE() AND o.main_dep = '003'
    `).catch(() => null),
    dbQuery(`SELECT HOUR(o.vsttime) as hr, COUNT(*) as cnt FROM ovst o
      WHERE o.vstdate = CURDATE() AND o.vsttime IS NOT NULL AND o.main_dep = '003'
      GROUP BY HOUR(o.vsttime) ORDER BY hr`).catch(() => []),
    dbQuery(`SELECT d.icd10, d.icd10_name as name, COUNT(*) as cnt
      FROM ovstdiag od INNER JOIN ovst o ON od.vn = o.vn LEFT JOIN icd101 d ON od.icd10 = d.icd10
      WHERE o.vstdate = CURDATE() AND o.main_dep = '003'
      GROUP BY od.icd10, d.icd10_name ORDER BY cnt DESC LIMIT 10`).catch(() => []),
    // AI Prediction: 7-day average hourly pattern (cached 1hr)
    dbQueryHeavy('ttmAvgHourly7d', 60, `
      SELECT HOUR(vsttime) as hr, 
        ROUND(COUNT(*) / GREATEST(COUNT(DISTINCT vstdate), 1), 0) as avg_cnt
      FROM ovst 
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND vstdate < CURDATE()
        AND main_dep = '003' AND vsttime IS NOT NULL
      GROUP BY HOUR(vsttime)
    `).catch(() => []),
  ]);

  const hourlyPrediction = Array.from({ length: 24 }, (_, h) => {
    const p = (avgHourly7d || []).find(x => Number(x.hr) === h);
    return { hour: h, count: Number(p?.avg_cnt || 0) };
  });

  return {
    data_source: 'HOSxP XE + AI Prediction',
    total: Number(summary?.total || 0),
    completed: Number(summary?.completed || 0),
    waiting: Number(summary?.waiting || 0),
    unique_patients: Number(summary?.unique_patients || 0),
    avg_total_time: Number(summary?.avg_total_time || 0),
    avg_wait_time: Number(summary?.avg_wait_time || 0),
    male: Number(summary?.male || 0),
    female: Number(summary?.female || 0),
    elderly: Number(summary?.elderly || 0),
    avg_age: Number(summary?.avg_age || 0),
    hourly: Array.from({ length: 24 }, (_, h) => {
      const d = (hourly || []).find(x => Number(x.hr) === h);
      return { hour: h, label: `${String(h).padStart(2, '0')}:00`, count: Number(d?.cnt || 0) };
    }),
    hourly_prediction: hourlyPrediction,
    top_diagnoses: (topProc || []).map(p => ({ icd10: p.icd10, name: p.name, count: Number(p.cnt || 0) })),
    timestamp: new Date().toISOString(),
  };
}));


router.get('/analytics', cached('ttmAnalytics', 300000, async () => {
  const [visitSummary, waitTime, completion, revenue, monthly, diagTop, ageDist, dailyPat, revisit, sla] = await Promise.all([
    dbQueryOneHeavy('ttmVisitSummary30d', 60, `SELECT COUNT(*) as total_visits, COUNT(DISTINCT DATE(o.vstdate)) as active_days,
        ROUND(COUNT(*) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 1) as avg_daily,
        COUNT(DISTINCT o.hn) as unique_patients,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly_total,
        SUM(CASE WHEN p.sex IN('1', 'ช', 'ชาย') THEN 1 ELSE 0 END) as male_total,
        SUM(CASE WHEN p.sex IN('2', 'ญ', 'หญิง') THEN 1 ELSE 0 END) as female_total
      FROM ovst o INNER JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '003'`).catch(() => null),

    dbQueryOneHeavy('ttmWaitTime30d', 60, `SELECT
      ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        THEN(TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as avg_wait,
        ROUND(STDDEV(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        THEN(TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as sd_wait,
        ROUND(AVG(CASE WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
        THEN(TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
        WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
        THEN(TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as avg_total_time,
        ROUND(STDDEV(CASE WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
        THEN(TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
        WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
        THEN(TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as sd_total,
        SUM(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        AND(TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 > 30 THEN 1 ELSE 0 END) as wait_over_30m
      FROM ovst o LEFT JOIN service_time st ON o.vn = st.vn LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 14 DAY) AND o.main_dep = '003' AND o.vsttime IS NOT NULL`).catch(() => null),

    // Completion Rate (service7/bill/s5 + combined service2+dx/income)
    dbQueryOneHeavy('ttmCompletionRate30d', 60, `SELECT
      SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL
                 OR st.service5 IS NOT NULL
                 OR(st.service2 IS NOT NULL AND(dx.has_dx = 1 OR vs.income > 0))
           THEN 1 ELSE 0 END) as completed,
        COUNT(*) as total,
        ROUND(100.0 * SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL
                 OR st.service5 IS NOT NULL
                 OR(st.service2 IS NOT NULL AND(dx.has_dx = 1 OR vs.income > 0))
           THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) as completion_rate,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL
                AND st.service5 IS NULL
                AND(st.service2 IS NULL OR((dx.has_dx IS NULL OR dx.has_dx = 0) AND(vs.income IS NULL OR vs.income = 0)))
                AND o.vstdate < CURDATE() THEN 1 ELSE 0 END) as dropout
      FROM ovst o LEFT JOIN service_time st ON o.vn = st.vn LEFT JOIN rcpt_print r ON o.vn = r.vn
      LEFT JOIN(SELECT vn, 1 as has_dx FROM ovstdiag GROUP BY vn) dx ON o.vn = dx.vn
      LEFT JOIN vn_stat vs ON o.vn = vs.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '003'`).catch(() => null),

    dbQueryOneHeavy('ttmRevenue30d', 60, `SELECT ROUND(AVG(v.income), 0) as avg_revenue, ROUND(SUM(v.income), 0) as total_revenue,
  MAX(v.income) as max_revenue, ROUND(SUM(v.income) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 0) as daily_revenue
      FROM ovst o INNER JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '003' AND v.income > 0`).catch(() => null),

    dbQueryHeavy('ttmMonthlyTrend', 120, `SELECT DATE_FORMAT(o.vstdate, '%Y-%m') as month, COUNT(*) as visits,
  COUNT(DISTINCT o.hn) as patients, ROUND(AVG(v.income), 0) as avg_rev, ROUND(SUM(v.income), 0) as total_rev
      FROM ovst o LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH) AND o.main_dep = '003'
      GROUP BY DATE_FORMAT(o.vstdate, '%Y-%m') ORDER BY month`).catch(() => []),

    dbQueryHeavy('ttmTopDiag30d', 60, `SELECT od.icd10, d.icd10_name as name, COUNT(*) as cnt, ROUND(AVG(v.income), 0) as avg_rev
      FROM ovstdiag od INNER JOIN ovst o ON od.vn = o.vn LEFT JOIN icd101 d ON od.icd10 = d.icd10
      LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 14 DAY) AND o.main_dep = '003'
      GROUP BY od.icd10, d.icd10_name ORDER BY cnt DESC LIMIT 10`).catch(() => []),

    dbQueryHeavy('ttmAgeDist30d', 60, `SELECT CASE
        WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 18 THEN '<18'
        WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 35 THEN '18-34'
        WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 60 THEN '35-59'
        ELSE '60+' END as age_group, COUNT(*) as cnt
      FROM ovst o INNER JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '003'
      GROUP BY age_group ORDER BY FIELD(age_group, '<18', '18-34', '35-59', '60+')`).catch(() => []),

    dbQueryHeavy('ttmDailyPattern30d', 60, `SELECT HOUR(o.vsttime) as hour, COUNT(*) as total,
  ROUND(COUNT(*) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 1) as avg_daily
      FROM ovst o WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 14 DAY) AND o.main_dep = '003' AND o.vsttime IS NOT NULL
      GROUP BY HOUR(o.vsttime) ORDER BY hour`).catch(() => []),

    dbQueryOneHeavy('ttmRevisitRate30d', 60, `SELECT COUNT(DISTINCT o2.vn) as revisit_count, COUNT(DISTINCT o1.vn) as total_visits,
  ROUND(100.0 * COUNT(DISTINCT o2.vn) / NULLIF(COUNT(DISTINCT o1.vn), 0), 1) as revisit_rate
      FROM ovst o1 LEFT JOIN ovst o2 ON o1.hn = o2.hn AND o1.vn != o2.vn
        AND o2.vstdate BETWEEN DATE_ADD(o1.vstdate, INTERVAL 1 DAY) AND DATE_ADD(o1.vstdate, INTERVAL 7 DAY)
        AND o2.main_dep = '003'
      WHERE o1.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o1.main_dep = '003'`).catch(() => null),

    dbQueryOneHeavy('ttmSLA30d', 60, `SELECT
      SUM(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        AND(TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 <= 30 THEN 1 ELSE 0 END) as wait_sla_pass,
  COUNT(*) as total
      FROM ovst o LEFT JOIN service_time st ON o.vn = st.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 14 DAY) AND o.main_dep = '003' AND o.vsttime IS NOT NULL`).catch(() => null),
  ]);

  const tv = Number(visitSummary?.total_visits || 0);
  const ad = Number(visitSummary?.avg_daily || 0);
  const up = Number(visitSummary?.unique_patients || 0);
  const aw = Number(waitTime?.avg_wait || 0);
  const sw = Number(waitTime?.sd_wait || 0);
  const at = Number(waitTime?.avg_total_time || 0);
  const st2 = Number(waitTime?.sd_total || 0);
  const w30 = Number(waitTime?.wait_over_30m || 0);
  const cr = Number(completion?.completion_rate || 0);
  const dc = Number(completion?.dropout || 0);
  const ar = Number(revenue?.avg_revenue || 0);
  const tr = Number(revenue?.total_revenue || 0);
  const dr2 = Number(revenue?.daily_revenue || 0);
  const rr = Number(revisit?.revisit_rate || 0);
  const wsp = Number(sla?.total) > 0 ? Math.round((Number(sla?.wait_sla_pass || 0) / Number(sla?.total)) * 1000) / 10 : 0;

  const ws = Math.max(0, Math.round(100 - (aw - 10) * 3));
  const cs = Math.round(Math.min(100, cr));
  const rs = Math.max(0, Math.round(100 - rr * 8));
  const rvs = Math.min(100, Math.round(ar / 15));
  const ss = Math.round(wsp);

  // Composite AI Score: Service Quality Index (SQI)
  const sqiSla = wsp;
  const sqiComplete = cr;
  const sqiStability = Math.round(Math.max(0, 100 - sw * 2)); // Slightly less sensitive
  const sqiYield = Math.round(Math.min(100, (at > 0 ? (at - aw) / at * 100 : 0))); // % actual service time

  const sqi = Math.round(sqiSla * 0.4 + sqiComplete * 0.3 + sqiStability * 0.2 + sqiYield * 0.1);
  const tpi = sqi; // Use SQI as main performance index

  const hourlyArr = Array.from({ length: 24 }, (_, h) => {
    const d = (dailyPat || []).find(x => Number(x.hour) === h);
    return { hour: h, label: `${String(h).padStart(2, '0')}:00`, avg: Number(d?.avg_daily || 0), total: Number(d?.total || 0) };
  });
  const peakHr = hourlyArr.reduce((b, h) => h.avg > (b?.avg || 0) ? h : b, hourlyArr[0]);
  const MTH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

  return {
    data_source: 'HOSxP XE', sqi, tpi: sqi,
    sqi_components: {
      sla_compliance: { score: sqiSla, weight: 40 },
      process_completion: { score: sqiComplete, weight: 30 },
      wait_stability: { score: sqiStability, weight: 20 },
      service_yield: { score: sqiYield, weight: 10 }
    },
    tpi_components: { wait_time: ws, completion: cs, revisit: rs, revenue: rvs, sla: ss },
    total_visits: tv, avg_daily_visits: ad, unique_patients: up,
    elderly_total: Number(visitSummary?.elderly_total || 0),
    male_total: Number(visitSummary?.male_total || 0), female_total: Number(visitSummary?.female_total || 0),
    avg_wait_time: aw, sd_wait_time: sw, avg_total_time: at, sd_total_time: st2,
    wait_over_30m: w30, wait_sla_pct: wsp,
    completion_rate: cr, dropout_count: dc, revisit_rate: rr, revisit_count: Number(revisit?.revisit_count || 0),
    avg_revenue_per_visit: ar, total_revenue: tr, daily_revenue: dr2, max_revenue: Number(revenue?.max_revenue || 0),
    hourly_pattern: hourlyArr, peak_hour: { hour: peakHr?.hour, label: peakHr?.label, avg: peakHr?.avg },
    monthly_trend: (monthly || []).map(m => ({
      month: MTH[parseInt(m.month?.split('-')[1])] || m.month,
      visits: Number(m.visits || 0), patients: Number(m.patients || 0), avg_rev: Number(m.avg_rev || 0), total_rev: Number(m.total_rev || 0)
    })),
    top_diagnoses: (diagTop || []).map(d => ({ icd10: d.icd10, name: d.name, count: Number(d.cnt || 0), avg_rev: Number(d.avg_rev || 0) })),
    age_distribution: (ageDist || []).map(a => ({ group: a.age_group, count: Number(a.cnt || 0) })),
    timestamp: new Date().toISOString(),
  };
}));

// ━━━━━━ Thai Medicine Revenue — Fiscal Year (3 ปีย้อนหลัง) ━━━━━━
router.get('/revenue-fiscal', cached('ttmRevenueFiscal', 3600000, () => getRevenueFiscal('003', 'HOSxP XE · vn_stat (TTM)')));


export default router;
