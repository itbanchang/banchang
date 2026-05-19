import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne } from '../db/mysql.js';
import { getRevenueFiscal } from '../helpers/fiscal.js';

const router = Router();

// ============================================================
// 🏋️ Physical Therapy (กายภาพบำบัด) — HOSxP XE (main_dep = '034')
// ============================================================

router.get('/today', cached('ptToday', 30000, async () => {
  const [summary, completion, hourly, topProc, yesterdaySummary] = await Promise.all([
    dbQueryOne(`SELECT COUNT(o.vn) as total, COUNT(DISTINCT o.hn) as unique_patients,
        SUM(CASE WHEN p.sex IN ('1','ช','ชาย') THEN 1 ELSE 0 END) as male,
        SUM(CASE WHEN p.sex IN ('2','ญ','หญิง') THEN 1 ELSE 0 END) as female,
        SUM(CASE WHEN p.birthday < DATE_SUB(CURDATE(), INTERVAL 60 YEAR) THEN 1 ELSE 0 END) as elderly,
        ROUND(AVG(TIMESTAMPDIFF(YEAR, p.birthday, CURDATE())), 1) as avg_age
      FROM ovst o STRAIGHT_JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate = CURDATE() AND o.main_dep = '034'`).catch(() => null),
    // Completion: use vn_stat.income > 0 (service rendered + billed)
    dbQueryOne(`SELECT COUNT(CASE WHEN v.income > 0 THEN 1 END) as completed
      FROM ovst o LEFT JOIN vn_stat v ON v.vn = o.vn
      WHERE o.vstdate = CURDATE() AND o.main_dep = '034'`).catch(() => null),
    dbQuery(`SELECT HOUR(o.vsttime) as hr, COUNT(*) as cnt FROM ovst o
      WHERE o.vstdate = CURDATE() AND o.vsttime IS NOT NULL AND o.main_dep = '034'
      GROUP BY HOUR(o.vsttime) ORDER BY hr`).catch(() => []),
    // Top diagnoses: join both icd101 (ICD-10) and icd9cm1 (ICD-9 procedure) for name lookup
    dbQuery(`SELECT od.icd10, COALESCE(d10.name, d9.name, od.icd10) as name, COUNT(*) as cnt
      FROM ovstdiag od INNER JOIN ovst o ON od.vn = o.vn
      LEFT JOIN icd101 d10 ON od.icd10 = d10.code
      LEFT JOIN icd9cm1 d9 ON od.icd10 = d9.code
      WHERE o.vstdate = CURDATE() AND o.main_dep = '034'
      GROUP BY od.icd10, name ORDER BY cnt DESC LIMIT 10`).catch(() => []),
    dbQueryOne(`SELECT COUNT(o.vn) as yesterday_total
      FROM ovst o WHERE o.vstdate = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND o.main_dep = '034'`).catch(() => null),
  ]);
  const todayTotal = Number(summary?.total || 0);
  const completedCount = Number(completion?.completed || 0);
  const yesterdayTotal = Number(yesterdaySummary?.yesterday_total || 0);
  return {
    data_source: 'HOSxP XE', total: todayTotal, completed: completedCount,
    waiting: Math.max(0, todayTotal - completedCount),
    unique_patients: Number(summary?.unique_patients || 0),
    avg_total_time: 0, avg_wait_time: 0,
    male: Number(summary?.male || 0), female: Number(summary?.female || 0),
    elderly: Number(summary?.elderly || 0), avg_age: Number(summary?.avg_age || 0),
    yesterday_total: yesterdayTotal,
    today_vs_yesterday_pct: yesterdayTotal > 0 ? Math.round(((todayTotal - yesterdayTotal) / yesterdayTotal) * 100) : 0,
    hourly: Array.from({ length: 24 }, (_, h) => {
      const d = (hourly || []).find(x => Number(x.hr) === h);
      return { hour: h, label: `${String(h).padStart(2, '0')}:00`, count: Number(d?.cnt || 0) };
    }),
    top_diagnoses: (topProc || []).map(p => ({ icd10: p.icd10, name: p.name, count: Number(p.cnt || 0) })),
    timestamp: new Date().toISOString(),
  };
}));

router.get('/analytics', cached('ptAnalytics', 1800000, async () => {
  const [visitSummary, waitTime, completion, revenue, monthly, diagTop, ageDist, dailyPat, sla, revisitData] = await Promise.all([
    dbQueryOne(`SELECT COUNT(o.vn) as total_visits, COUNT(DISTINCT o.vstdate) as active_days,
      ROUND(COUNT(o.vn) / NULLIF(COUNT(DISTINCT o.vstdate), 0), 1) as avg_daily,
      COUNT(DISTINCT o.hn) as unique_patients,
      SUM(CASE WHEN p.birthday < DATE_SUB(CURDATE(), INTERVAL 60 YEAR) THEN 1 ELSE 0 END) as elderly_total,
      SUM(CASE WHEN p.sex IN ('1','ช','ชาย') THEN 1 ELSE 0 END) as male_total,
      SUM(CASE WHEN p.sex IN ('2','ญ','หญิง') THEN 1 ELSE 0 END) as female_total
      FROM ovst o STRAIGHT_JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '034'`).catch(() => null),
    // service_time restricted to 7-day window to avoid full-table scan
    dbQueryOne(`SELECT
      ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as avg_wait,
      ROUND(STDDEV(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as sd_wait,
      ROUND(AVG(CASE WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as avg_total_time,
      SUM(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        AND (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 > 30 THEN 1 ELSE 0 END) as wait_over_30m
      FROM ovst o STRAIGHT_JOIN service_time st ON st.vn = o.vn LEFT JOIN rcpt_print r ON r.vn = o.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND o.main_dep = '034' AND o.vsttime IS NOT NULL`).catch(() => null),
    // Completion: vn_stat.income > 0 = service rendered; exclude today from dropout
    dbQueryOne(`SELECT
      COUNT(o.vn) as total,
      SUM(CASE WHEN v.income > 0 THEN 1 ELSE 0 END) as completed,
      ROUND(100.0 * SUM(CASE WHEN v.income > 0 THEN 1 ELSE 0 END) / NULLIF(COUNT(o.vn), 0), 1) as completion_rate,
      SUM(CASE WHEN (v.income IS NULL OR v.income = 0) AND o.vstdate < CURDATE() THEN 1 ELSE 0 END) as dropout
      FROM ovst o LEFT JOIN vn_stat v ON v.vn = o.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '034'`).catch(() => null),
    dbQueryOne(`SELECT ROUND(AVG(v.income), 0) as avg_revenue, ROUND(SUM(v.income), 0) as total_revenue,
      MAX(v.income) as max_revenue, ROUND(SUM(v.income) / NULLIF(COUNT(DISTINCT o.vstdate), 0), 0) as daily_revenue
      FROM ovst o STRAIGHT_JOIN vn_stat v ON v.vn = o.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '034' AND v.income > 0`).catch(() => null),
    dbQuery(`SELECT DATE_FORMAT(o.vstdate, '%Y-%m') as month, COUNT(*) as visits,
      COUNT(DISTINCT o.hn) as patients, ROUND(AVG(v.income), 0) as avg_rev, ROUND(SUM(v.income), 0) as total_rev
      FROM ovst o LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND o.main_dep = '034'
      GROUP BY DATE_FORMAT(o.vstdate, '%Y-%m') ORDER BY month`).catch(() => []),
    // Top diagnoses: join both icd101 and icd9cm1 for procedure code names
    dbQuery(`SELECT od.icd10, COALESCE(d10.name, d9.name, od.icd10) as name, COUNT(*) as cnt, ROUND(AVG(v.income), 0) as avg_rev
      FROM ovstdiag od INNER JOIN ovst o ON od.vn = o.vn
      LEFT JOIN icd101 d10 ON od.icd10 = d10.code
      LEFT JOIN icd9cm1 d9 ON od.icd10 = d9.code
      LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '034'
      GROUP BY od.icd10, name ORDER BY cnt DESC LIMIT 10`).catch(() => []),
    dbQuery(`SELECT CASE
        WHEN p.birthday > DATE_SUB(CURDATE(), INTERVAL 18 YEAR) THEN '<18'
        WHEN p.birthday > DATE_SUB(CURDATE(), INTERVAL 35 YEAR) THEN '18-34'
        WHEN p.birthday > DATE_SUB(CURDATE(), INTERVAL 60 YEAR) THEN '35-59'
        ELSE '60+' END as age_group, COUNT(o.vn) as cnt
      FROM ovst o STRAIGHT_JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '034'
      GROUP BY age_group ORDER BY FIELD(age_group, '<18','18-34','35-59','60+')`).catch(() => []),
    dbQuery(`SELECT HOUR(o.vsttime) as hour, COUNT(o.vn) as total,
      ROUND(COUNT(o.vn) / NULLIF(COUNT(DISTINCT o.vstdate), 0), 1) as avg_daily
      FROM ovst o WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '034' AND o.vsttime IS NOT NULL
      GROUP BY HOUR(o.vsttime) ORDER BY hour`).catch(() => []),
    // SLA: 7-day window
    dbQueryOne(`SELECT
      SUM(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        AND (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 <= 30 THEN 1 ELSE 0 END) as wait_sla_pass,
      COUNT(*) as total
      FROM ovst o STRAIGHT_JOIN service_time st ON st.vn = o.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND o.main_dep = '034' AND o.vsttime IS NOT NULL`).catch(() => null),
    // Actual 7-day revisit: patients who came back within 7 days
    dbQueryOne(`SELECT
      COUNT(DISTINCT o2.vn) as revisit_count,
      COUNT(DISTINCT o1.vn) as base_visits
      FROM ovst o1
      INNER JOIN ovst o2 ON o1.hn = o2.hn AND o2.vn != o1.vn
        AND o2.vstdate BETWEEN o1.vstdate AND DATE_ADD(o1.vstdate, INTERVAL 7 DAY)
        AND o2.main_dep = '034'
      WHERE o1.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o1.vstdate <= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        AND o1.main_dep = '034'`).catch(() => null),
  ]);

  const tv = Number(visitSummary?.total_visits || 0), ad = Number(visitSummary?.avg_daily || 0), up = Number(visitSummary?.unique_patients || 0);
  const aw = Number(waitTime?.avg_wait || 0), sw = Number(waitTime?.sd_wait || 0);
  const at = Number(waitTime?.avg_total_time || 0), w30 = Number(waitTime?.wait_over_30m || 0);
  const cr = Number(completion?.completion_rate || 0), dc = Number(completion?.dropout || 0);
  const ar = Number(revenue?.avg_revenue || 0), tr = Number(revenue?.total_revenue || 0), dr2 = Number(revenue?.daily_revenue || 0);
  // Actual 7-day revisit rate
  const revisitBase = Number(revisitData?.base_visits || 0);
  const revisitCount = Number(revisitData?.revisit_count || 0);
  const rr = revisitBase > 0 ? Math.round((revisitCount / revisitBase) * 1000) / 10 : 0;
  const wsp = Number(sla?.total) > 0 ? Math.round((Number(sla.wait_sla_pass || 0) / Number(sla.total)) * 1000) / 10 : 0;

  // PPI component scores (calibrated for PT)
  // Wait: ≤15min=100, penalty for each 10min over
  const ws = Math.max(0, Math.min(100, Math.round(100 - Math.max(0, aw - 15) * (100 / 60))));
  const cs = Math.round(Math.min(100, cr));
  // PT revisit: planned series is normal, penalize only >40%
  const rs = Math.max(0, Math.round(100 - Math.max(0, rr - 20) * 3));
  // Revenue: target ฿800/visit for PT
  const rvs = Math.min(100, Math.round((ar / 800) * 100));
  const ss = Math.round(wsp);
  const ppi = Math.round((ws * 0.25) + (cs * 0.25) + (rs * 0.15) + (rvs * 0.15) + (ss * 0.20));

  const hourlyArr = Array.from({ length: 24 }, (_, h) => {
    const d = (dailyPat || []).find(x => Number(x.hour) === h);
    return { hour: h, label: `${String(h).padStart(2, '0')}:00`, avg: Number(d?.avg_daily || 0), total: Number(d?.total || 0) };
  });
  const peakHr = hourlyArr.reduce((b, h) => h.avg > (b?.avg || 0) ? h : b, hourlyArr[0]);
  const MTH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  return {
    data_source: 'HOSxP XE', ppi,
    ppi_components: { wait_time: ws, completion: cs, revisit: rs, revenue: rvs, sla: ss },
    total_visits: tv, avg_daily_visits: ad, unique_patients: up,
    elderly_total: Number(visitSummary?.elderly_total || 0),
    male_total: Number(visitSummary?.male_total || 0), female_total: Number(visitSummary?.female_total || 0),
    avg_wait_time: aw, sd_wait_time: sw, avg_total_time: at, sd_total_time: 0, wait_window_days: 7,
    wait_over_30m: w30, wait_sla_pct: wsp,
    completion_rate: cr, dropout_count: dc, revisit_rate: rr, revisit_count: revisitCount,
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

// ━━━━━━ Physical Therapy Revenue — Fiscal Year (3 ปีย้อนหลัง) ━━━━━━
router.get('/revenue-fiscal', cached('ptRevenueFiscal', 3600000, (req) => getRevenueFiscal('034', 'HOSxP XE · vn_stat (PT)', req?.query?.start, req?.query?.end)));

export default router;
