import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne, dbQueryHeavy, dbQueryOneHeavy } from '../db/mysql.js';
import { getRevenueFiscal } from '../helpers/fiscal.js';
import { getNCDRiskStratification } from '../ai/ncdRiskEngine.js';

const router = Router();

const NCD_ICD_WHERE = `(od.icd10 LIKE 'E1%' OR od.icd10 LIKE 'I1%' OR od.icd10 BETWEEN 'I20' AND 'I259'
  OR od.icd10 BETWEEN 'I60' AND 'I699' OR od.icd10 BETWEEN 'J40' AND 'J479' OR od.icd10 LIKE 'N18%')`;

router.get('/today', cached('ncdToday', 30000, async () => {
  const [summary, byDisease, hourly] = await Promise.all([
    dbQueryOne(`
      SELECT COUNT(DISTINCT o.vn) as total_visits, COUNT(DISTINCT o.hn) as unique_patients,
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL
                   OR st.service5 IS NOT NULL
                   OR (st.service2 IS NOT NULL AND (dx.has_dx = 1 OR vs.income > 0))
             THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL
                  AND st.service5 IS NULL
                  AND (st.service2 IS NULL OR ((dx.has_dx IS NULL OR dx.has_dx = 0) AND (vs.income IS NULL OR vs.income = 0)))
             THEN 1 ELSE 0 END) as waiting,
        ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as avg_wait_time,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly,
        SUM(CASE WHEN p.sex IN ('1','ช','ชาย') THEN 1 ELSE 0 END) as male,
        SUM(CASE WHEN p.sex IN ('2','ญ','หญิง') THEN 1 ELSE 0 END) as female
      FROM ovst o INNER JOIN patient p ON o.hn = p.hn
      LEFT JOIN service_time st ON o.vn = st.vn LEFT JOIN rcpt_print r ON o.vn = r.vn
      LEFT JOIN (SELECT vn, 1 as has_dx FROM ovstdiag GROUP BY vn) dx ON o.vn = dx.vn
      LEFT JOIN vn_stat vs ON o.vn = vs.vn
      WHERE o.vstdate = CURDATE() AND o.main_dep = '024'
    `).catch(() => null),
    dbQuery(`SELECT
        CASE WHEN od.icd10 LIKE 'E1%' THEN 'DM'
             WHEN od.icd10 LIKE 'I1%' THEN 'HT'
             WHEN od.icd10 BETWEEN 'I20' AND 'I259' THEN 'IHD'
             WHEN od.icd10 BETWEEN 'I60' AND 'I699' THEN 'Stroke'
             WHEN od.icd10 BETWEEN 'J40' AND 'J479' THEN 'COPD'
             WHEN od.icd10 LIKE 'N18%' THEN 'CKD'
             ELSE 'Other' END as disease,
        COUNT(DISTINCT o.vn) as visits, COUNT(DISTINCT o.hn) as patients
      FROM ovst o LEFT JOIN ovstdiag od ON o.vn = od.vn
      WHERE o.vstdate = CURDATE() AND o.main_dep = '024'
      GROUP BY disease ORDER BY visits DESC`).catch(() => []),
    dbQuery(`SELECT HOUR(o.vsttime) as hr, COUNT(DISTINCT o.vn) as cnt FROM ovst o
      WHERE o.vstdate = CURDATE() AND o.main_dep = '024' AND o.vsttime IS NOT NULL
      GROUP BY HOUR(o.vsttime) ORDER BY hr`).catch(() => []),
  ]);
  return {
    data_source: 'HOSxP XE', total: Number(summary?.total_visits || 0),
    unique_patients: Number(summary?.unique_patients || 0),
    completed: Number(summary?.completed || 0), waiting: Number(summary?.waiting || 0),
    avg_wait_time: Number(summary?.avg_wait_time || 0),
    elderly: Number(summary?.elderly || 0), male: Number(summary?.male || 0), female: Number(summary?.female || 0),
    by_disease: (byDisease || []).map(d => ({ disease: d.disease, visits: Number(d.visits || 0), patients: Number(d.patients || 0) })),
    hourly: Array.from({ length: 24 }, (_, h) => {
      const d = (hourly || []).find(x => Number(x.hr) === h);
      return { hour: h, label: `${String(h).padStart(2, '0')}:00`, count: Number(d?.cnt || 0) };
    }),
    timestamp: new Date().toISOString(),
  };
}));

router.get('/analytics', cached('ncdAnalytics', 300000, async () => {
  const results = await Promise.all([
    dbQueryOneHeavy('ncdVisitSummary30d', 60, `SELECT COUNT(DISTINCT o.vn) as total_visits, COUNT(DISTINCT DATE(o.vstdate)) as active_days,
        ROUND(COUNT(DISTINCT o.vn) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 1) as avg_daily,
        COUNT(DISTINCT o.hn) as unique_patients,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly_total,
        SUM(CASE WHEN p.sex IN('1', 'ช', 'ชาย') THEN 1 ELSE 0 END) as male_total,
        SUM(CASE WHEN p.sex IN('2', 'ญ', 'หญิง') THEN 1 ELSE 0 END) as female_total
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn INNER JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE} `).catch(() => null),

    dbQueryOneHeavy('ncdWaitTime30d', 60, `SELECT
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
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn
      LEFT JOIN service_time st ON o.vn = st.vn LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE} AND o.vsttime IS NOT NULL`).catch(() => null),

    dbQueryOneHeavy('ncdCompletionRate30d', 60, `SELECT
      SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL
                 OR st.service5 IS NOT NULL
                 OR(st.service2 IS NOT NULL AND(dx.has_dx = 1 OR vs.income > 0))
           THEN 1 ELSE 0 END) as completed, COUNT(*) as total,
        ROUND(100.0 * SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL
                 OR st.service5 IS NOT NULL
                 OR(st.service2 IS NOT NULL AND(dx.has_dx = 1 OR vs.income > 0))
           THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) as completion_rate,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL
                AND st.service5 IS NULL
                AND(st.service2 IS NULL OR((dx.has_dx IS NULL OR dx.has_dx = 0) AND(vs.income IS NULL OR vs.income = 0)))
                AND o.vstdate < CURDATE() THEN 1 ELSE 0 END) as dropout
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn
      LEFT JOIN service_time st ON o.vn = st.vn LEFT JOIN rcpt_print r ON o.vn = r.vn
      LEFT JOIN vn_stat vs ON o.vn = vs.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE} `).catch(() => null),

    dbQueryOneHeavy('ncdRevenue30d', 60, `SELECT ROUND(AVG(v.income), 0) as avg_revenue, ROUND(SUM(v.income), 0) as total_revenue,
    MAX(v.income) as max_revenue, ROUND(SUM(v.income) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 0) as daily_revenue
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn INNER JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE} AND v.income > 0`).catch(() => null),

    dbQueryHeavy('ncdMonthlyTrend', 120, `SELECT DATE_FORMAT(o.vstdate, '%Y-%m') as month, COUNT(DISTINCT o.vn) as visits,
    COUNT(DISTINCT o.hn) as patients, ROUND(AVG(v.income), 0) as avg_rev, ROUND(SUM(v.income), 0) as total_rev
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND o.main_dep = '024' AND ${NCD_ICD_WHERE}
      GROUP BY DATE_FORMAT(o.vstdate, '%Y-%m') ORDER BY month`).catch(() => []),

    dbQueryHeavy('ncdTopDiag30d', 60, `SELECT od.icd10, d.icd10_name as name, COUNT(*) as cnt, ROUND(AVG(v.income), 0) as avg_rev
      FROM ovstdiag od INNER JOIN ovst o ON od.vn = o.vn LEFT JOIN icd101 d ON od.icd10 = d.icd10
      LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE}
      GROUP BY od.icd10, d.icd10_name ORDER BY cnt DESC LIMIT 10`).catch(() => []),

    dbQueryHeavy('ncdAgeDist30d', 60, `SELECT CASE
        WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 40 THEN '<40'
        WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 50 THEN '40-49'
        WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 60 THEN '50-59'
        WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 70 THEN '60-69'
        ELSE '70+' END as age_group, COUNT(DISTINCT o.hn) as cnt
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn INNER JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE}
      GROUP BY age_group ORDER BY FIELD(age_group, '<40', '40-49', '50-59', '60-69', '70+')`).catch(() => []),

    dbQueryHeavy('ncdDailyPattern30d', 60, `SELECT HOUR(o.vsttime) as hour, COUNT(DISTINCT o.vn) as total,
    ROUND(COUNT(DISTINCT o.vn) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 1) as avg_daily
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE} AND o.vsttime IS NOT NULL
      GROUP BY HOUR(o.vsttime) ORDER BY hour`).catch(() => []),

    dbQueryOneHeavy('ncdRevisitRate30d', 60, `SELECT COUNT(DISTINCT o2.vn) as revisit_count, COUNT(DISTINCT o1.vn) as total_visits,
    ROUND(100.0 * COUNT(DISTINCT o2.vn) / NULLIF(COUNT(DISTINCT o1.vn), 0), 1) as revisit_rate
      FROM ovst o1 INNER JOIN ovstdiag od1 ON o1.vn = od1.vn
      LEFT JOIN ovst o2 ON o1.hn = o2.hn AND o1.vn != o2.vn
        AND o2.vstdate BETWEEN DATE_ADD(o1.vstdate, INTERVAL 1 DAY) AND DATE_ADD(o1.vstdate, INTERVAL 7 DAY)
      LEFT JOIN ovstdiag od2 ON o2.vn = od2.vn AND ${NCD_ICD_WHERE.replace(/od\./g, 'od2.')}
      WHERE o1.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o1.main_dep = '024' AND ${NCD_ICD_WHERE.replace(/od\./g, 'od1.')} `).catch(() => null),

    dbQueryOneHeavy('ncdCollectionRate30d', 60, `SELECT
  ROUND(100.0 * SUM(COALESCE(v.rcpt_money, 0) + COALESCE(v.uc_money, 0) + COALESCE(v.paid_money, 0)) / NULLIF(SUM(v.income), 0), 1) as collection_rate,
    ROUND(SUM(v.income - (COALESCE(v.rcpt_money, 0) + COALESCE(v.uc_money, 0) + COALESCE(v.paid_money, 0))), 0) as total_gap,
    COUNT(DISTINCT CASE WHEN(COALESCE(v.rcpt_money, 0) + COALESCE(v.uc_money, 0) + COALESCE(v.paid_money, 0)) > 0 THEN o.vn END) as paid_visits,
    COUNT(DISTINCT o.vn) as total_visits
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn INNER JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE} `).catch(() => null),

    dbQueryOneHeavy('ncdDebtRisk30d', 60, `SELECT
  SUM(CASE WHEN v.income > 1000 AND(COALESCE(v.rcpt_money, 0) + COALESCE(v.uc_money, 0) + COALESCE(v.paid_money, 0)) < v.income * 0.5 THEN 1 ELSE 0 END) as high_risk_debt_cases,
    COUNT(*) as total_cases,
    ROUND(AVG(DATEDIFF(CURDATE(), o.vstdate)), 1) as avg_days_since_visit
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn INNER JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE} AND v.income > 0`).catch(() => null),

    dbQueryOneHeavy('ncdSLA30d', 60, `SELECT
  SUM(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        AND(TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 <= 30 THEN 1 ELSE 0 END) as wait_sla_pass,
    COUNT(*) as total
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn LEFT JOIN service_time st ON o.vn = st.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE} AND o.vsttime IS NOT NULL`).catch(() => null),

    dbQueryHeavy('ncdByDisease30d', 60, `SELECT
        CASE WHEN od.icd10 LIKE 'E1%' THEN 'DM'
             WHEN od.icd10 LIKE 'I1%' THEN 'HT'
             WHEN od.icd10 BETWEEN 'I20' AND 'I259' THEN 'IHD'
             WHEN od.icd10 BETWEEN 'I60' AND 'I699' THEN 'Stroke'
             WHEN od.icd10 BETWEEN 'J40' AND 'J479' THEN 'COPD'
             WHEN od.icd10 LIKE 'N18%' THEN 'CKD'
             ELSE 'Other' END as disease,
    COUNT(DISTINCT o.vn) as visits, COUNT(DISTINCT o.hn) as patients,
    ROUND(AVG(v.income), 0) as avg_rev
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE}
      GROUP BY disease ORDER BY visits DESC`).catch(() => []),
  ]);

  const [visitSummary, waitTime, completion, revenue, monthly, diagTop, ageDist, dailyPat, revisit, finMetrics, debtMetrics, sla, byDisease30] = results;

  const tv = Number(visitSummary?.total_visits || 0), ad = Number(visitSummary?.avg_daily || 0), up = Number(visitSummary?.unique_patients || 0);
  const aw = Number(waitTime?.avg_wait || 0), sw = Number(waitTime?.sd_wait || 0);
  const at = Number(waitTime?.avg_total_time || 0), st2 = Number(waitTime?.sd_total || 0), w30 = Number(waitTime?.wait_over_30m || 0);
  const cr = Number(completion?.completion_rate || 0), dc = Number(completion?.dropout || 0);
  const ar = Number(revenue?.avg_revenue || 0), tr = Number(revenue?.total_revenue || 0), dr2 = Number(revenue?.daily_revenue || 0);
  const rr = Number(revisit?.revisit_rate || 0);
  const wsp = Number(sla?.total) > 0 ? Math.round((Number(sla.wait_sla_pass || 0) / Number(sla.total)) * 1000) / 10 : 0;

  const collRate = Number(finMetrics?.collection_rate || 0);
  const claimSuccess = finMetrics?.total_visits > 0 ? Math.round((finMetrics.paid_visits / finMetrics.total_visits) * 1000) / 10 : 0;
  const badDebt = debtMetrics?.total_cases > 0 ? Math.round((debtMetrics.high_risk_debt_cases / debtMetrics.total_cases) * 1000) / 10 : 0;
  const daysAR = Number(debtMetrics?.avg_days_since_visit || 0);

  const ws = Math.max(0, Math.round(100 - (aw - 10) * 3)), cs = Math.round(Math.min(100, cr));
  const rs = Math.max(0, Math.round(100 - rr * 5)), rvs = Math.min(100, Math.round(ar / 15)), ss = Math.round(wsp);
  const fs = Math.round((collRate * 0.4) + (claimSuccess * 0.3) + (Math.max(0, 100 - badDebt * 5) * 0.3));

  const nci = Math.round((ws * 0.15) + (cs * 0.20) + (rs * 0.15) + (rvs * 0.10) + (ss * 0.15) + (fs * 0.25));
  const hourlyArr = Array.from({ length: 24 }, (_, h) => {
    const d = (dailyPat || []).find(x => Number(x.hour) === h);
    return { hour: h, label: `${String(h).padStart(2, '0')}:00`, avg: Number(d?.avg_daily || 0), total: Number(d?.total || 0) };
  });
  const peakHr = hourlyArr.reduce((b, h) => h.avg > (b?.avg || 0) ? h : b, hourlyArr[0]);
  const MTH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  return {
    data_source: 'HOSxP XE', nci,
    nci_components: { wait_time: ws, completion: cs, revisit: rs, revenue: rvs, sla: ss, finance: fs },
    collection_rate: collRate, claim_success: claimSuccess, bad_debt_ratio: badDebt, days_in_ar: daysAR,
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
    by_disease: (byDisease30 || []).map(d => ({ disease: d.disease, visits: Number(d.visits || 0), patients: Number(d.patients || 0), avg_rev: Number(d.avg_rev || 0) })),
    timestamp: new Date().toISOString()
  };
}));

// ━━━━━━ NCD Estimated Revenue — Fiscal Year (3 ปีย้อนหลัง) ━━━━━━
router.get('/revenue-fiscal', cached('ncdRevenueFiscal', 3600000, () => getRevenueFiscal('024', 'HOSxP XE · vn_stat (NCD)')));

// ============================================================
// 🤖 AI #15 — NCD Risk Stratification Engine
// ============================================================
router.get('/ai/risk-stratification', cached('ncdRiskStratification', 120000, async () => {
  return await getNCDRiskStratification();
}));

export default router;
