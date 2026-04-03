import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne } from '../db/mysql.js';
import { getRevenueFiscal } from '../helpers/fiscal.js';

const router = Router();

// ============================================================
// 🫀 NCD (Non-Communicable Disease / โรคไม่ติดต่อเรื้อรัง) — HOSxP XE
// ICD-10: DM(E10-E14), HT(I10-I15), IHD(I20-I25), Stroke(I60-I69), COPD(J40-J47), CKD(N18)
// main_dep = '024'
// ============================================================

const NCD_ICD_WHERE = `(od.icd10 LIKE 'E1%' OR od.icd10 LIKE 'I1%' OR od.icd10 BETWEEN 'I20' AND 'I259'
  OR od.icd10 BETWEEN 'I60' AND 'I699' OR od.icd10 BETWEEN 'J40' AND 'J479' OR od.icd10 LIKE 'N18%')`;

router.get('/today', cached('ncdToday', 30000, async () => {
    // Split into 2 fast queries — avoids slow service_time join
    const [summary, completion, byDisease, hourly, yesterdaySummary] = await Promise.all([
        dbQueryOne(`SELECT COUNT(DISTINCT o.vn) as total_visits, COUNT(DISTINCT o.hn) as unique_patients,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly,
        SUM(CASE WHEN p.sex IN ('1','ช','ชาย') THEN 1 ELSE 0 END) as male,
        SUM(CASE WHEN p.sex IN ('2','ญ','หญิง') THEN 1 ELSE 0 END) as female
      FROM ovst o STRAIGHT_JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate = CURDATE() AND o.main_dep = '024'`).catch(() => null),
        dbQueryOne(`SELECT COUNT(CASE WHEN v.income > 0 THEN 1 END) as completed
      FROM ovst o LEFT JOIN vn_stat v ON v.vn = o.vn
      WHERE o.vstdate = CURDATE() AND o.main_dep = '024'`).catch(() => null),
        // Disease breakdown: use today's dx if coded, else look up patient's historical NCD dx (last 365 days)
        dbQuery(`SELECT
        CASE WHEN dx.icd10 LIKE 'E1%' THEN 'DM'
             WHEN dx.icd10 LIKE 'I1%' THEN 'HT'
             WHEN dx.icd10 BETWEEN 'I20' AND 'I259' THEN 'IHD'
             WHEN dx.icd10 BETWEEN 'I60' AND 'I699' THEN 'Stroke'
             WHEN dx.icd10 BETWEEN 'J40' AND 'J479' THEN 'COPD'
             WHEN dx.icd10 LIKE 'N18%' THEN 'CKD'
             ELSE 'Other' END as disease,
        COUNT(DISTINCT o.vn) as visits, COUNT(DISTINCT o.hn) as patients
      FROM ovst o
      LEFT JOIN ovstdiag od_today ON o.vn = od_today.vn AND ${NCD_ICD_WHERE.replace(/od\./g, 'od_today.')}
      LEFT JOIN (
        SELECT DISTINCT prev_od.hn, prev_diag.icd10
        FROM ovst prev_od
        INNER JOIN ovstdiag prev_diag ON prev_od.vn = prev_diag.vn
        WHERE prev_od.vstdate >= DATE_SUB(CURDATE(), INTERVAL 365 DAY)
          AND prev_od.main_dep = '024'
          AND (prev_diag.icd10 LIKE 'E1%' OR prev_diag.icd10 LIKE 'I1%'
            OR prev_diag.icd10 BETWEEN 'I20' AND 'I259' OR prev_diag.icd10 BETWEEN 'I60' AND 'I699'
            OR prev_diag.icd10 BETWEEN 'J40' AND 'J479' OR prev_diag.icd10 LIKE 'N18%')
      ) hist ON o.hn = hist.hn
      CROSS JOIN LATERAL (
        SELECT COALESCE(od_today.icd10, hist.icd10) as icd10
      ) dx
      WHERE o.vstdate = CURDATE() AND o.main_dep = '024'
        AND dx.icd10 IS NOT NULL
      GROUP BY disease ORDER BY visits DESC`).catch(() =>
        // Fallback: if LATERAL not supported, use simple historical lookup
        dbQuery(`SELECT
          CASE WHEN prev_diag.icd10 LIKE 'E1%' THEN 'DM'
               WHEN prev_diag.icd10 LIKE 'I1%' THEN 'HT'
               WHEN prev_diag.icd10 BETWEEN 'I20' AND 'I259' THEN 'IHD'
               WHEN prev_diag.icd10 BETWEEN 'I60' AND 'I699' THEN 'Stroke'
               WHEN prev_diag.icd10 BETWEEN 'J40' AND 'J479' THEN 'COPD'
               WHEN prev_diag.icd10 LIKE 'N18%' THEN 'CKD'
               ELSE 'Other' END as disease,
          COUNT(DISTINCT o.vn) as visits, COUNT(DISTINCT o.hn) as patients
        FROM ovst o
        INNER JOIN (
          SELECT DISTINCT prev_o.hn, pd.icd10
          FROM ovst prev_o
          INNER JOIN ovstdiag pd ON prev_o.vn = pd.vn
          WHERE prev_o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 365 DAY)
            AND prev_o.main_dep = '024'
            AND (pd.icd10 LIKE 'E1%' OR pd.icd10 LIKE 'I1%'
              OR pd.icd10 BETWEEN 'I20' AND 'I259' OR pd.icd10 BETWEEN 'I60' AND 'I699'
              OR pd.icd10 BETWEEN 'J40' AND 'J479' OR pd.icd10 LIKE 'N18%')
        ) prev_diag ON o.hn = prev_diag.hn
        WHERE o.vstdate = CURDATE() AND o.main_dep = '024'
        GROUP BY disease ORDER BY visits DESC`).catch(() => [])
      ),
        dbQuery(`SELECT HOUR(o.vsttime) as hr, COUNT(DISTINCT o.vn) as cnt FROM ovst o
      WHERE o.vstdate = CURDATE() AND o.main_dep = '024' AND o.vsttime IS NOT NULL
      GROUP BY HOUR(o.vsttime) ORDER BY hr`).catch(() => []),
        dbQueryOne(`SELECT COUNT(DISTINCT o.vn) as yesterday_total FROM ovst o
      WHERE o.vstdate = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND o.main_dep = '024'`).catch(() => null),
    ]);
    const todayTotal = Number(summary?.total_visits || 0);
    const completedCount = Number(completion?.completed || 0);
    const yesterdayTotal = Number(yesterdaySummary?.yesterday_total || 0);
    return {
        data_source: 'HOSxP XE', total: todayTotal,
        unique_patients: Number(summary?.unique_patients || 0),
        completed: completedCount, waiting: Math.max(0, todayTotal - completedCount),
        avg_wait_time: 0,
        elderly: Number(summary?.elderly || 0), male: Number(summary?.male || 0), female: Number(summary?.female || 0),
        yesterday_total: yesterdayTotal,
        today_vs_yesterday_pct: yesterdayTotal > 0 ? Math.round(((todayTotal - yesterdayTotal) / yesterdayTotal) * 100) : 0,
        by_disease: (byDisease || []).map(d => ({ disease: d.disease, visits: Number(d.visits || 0), patients: Number(d.patients || 0) })),
        hourly: Array.from({ length: 24 }, (_, h) => {
            const d = (hourly || []).find(x => Number(x.hr) === h);
            return { hour: h, label: `${String(h).padStart(2, '0')}:00`, count: Number(d?.cnt || 0) };
        }),
        timestamp: new Date().toISOString(),
    };
}));

router.get('/analytics', cached('ncdAnalytics', 1800000, async () => {
    const [visitSummary, waitTime, completion, revenue, monthly, diagTop, ageDist, dailyPat, sla, byDisease30, revisitData] = await Promise.all([
        dbQueryOne(`SELECT COUNT(DISTINCT o.vn) as total_visits, COUNT(DISTINCT DATE(o.vstdate)) as active_days,
      ROUND(COUNT(DISTINCT o.vn) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 1) as avg_daily,
      COUNT(DISTINCT o.hn) as unique_patients,
      SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly_total,
      SUM(CASE WHEN p.sex IN ('1','ช','ชาย') THEN 1 ELSE 0 END) as male_total,
      SUM(CASE WHEN p.sex IN ('2','ญ','หญิง') THEN 1 ELSE 0 END) as female_total
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn INNER JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE}`).catch(() => null),
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
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn
      STRAIGHT_JOIN service_time st ON st.vn = o.vn LEFT JOIN rcpt_print r ON r.vn = o.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE} AND o.vsttime IS NOT NULL`).catch(() => null),
        // Completion: vn_stat.income > 0 = service rendered; exclude today from dropout
        dbQueryOne(`SELECT
      COUNT(o.vn) as total,
      SUM(CASE WHEN v.income > 0 THEN 1 ELSE 0 END) as completed,
      ROUND(100.0 * SUM(CASE WHEN v.income > 0 THEN 1 ELSE 0 END) / NULLIF(COUNT(o.vn), 0), 1) as completion_rate,
      SUM(CASE WHEN (v.income IS NULL OR v.income = 0) AND o.vstdate < CURDATE() THEN 1 ELSE 0 END) as dropout
      FROM ovst o LEFT JOIN vn_stat v ON v.vn = o.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024'`).catch(() => null),
        dbQueryOne(`SELECT ROUND(AVG(v.income), 0) as avg_revenue, ROUND(SUM(v.income), 0) as total_revenue,
      MAX(v.income) as max_revenue, ROUND(SUM(v.income) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 0) as daily_revenue
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn INNER JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE} AND v.income > 0`).catch(() => null),
        dbQuery(`SELECT DATE_FORMAT(o.vstdate, '%Y-%m') as month, COUNT(DISTINCT o.vn) as visits,
      COUNT(DISTINCT o.hn) as patients, ROUND(AVG(v.income), 0) as avg_rev, ROUND(SUM(v.income), 0) as total_rev
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND o.main_dep = '024' AND ${NCD_ICD_WHERE}
      GROUP BY DATE_FORMAT(o.vstdate, '%Y-%m') ORDER BY month`).catch(() => []),
        dbQuery(`SELECT od.icd10, d.name as name, COUNT(*) as cnt, ROUND(AVG(v.income), 0) as avg_rev
      FROM ovstdiag od INNER JOIN ovst o ON od.vn = o.vn LEFT JOIN icd101 d ON od.icd10 = d.code
      LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE}
      GROUP BY od.icd10, d.name ORDER BY cnt DESC LIMIT 10`).catch(() => []),
        dbQuery(`SELECT CASE
        WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 40 THEN '<40'
        WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 50 THEN '40-49'
        WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 60 THEN '50-59'
        WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 70 THEN '60-69'
        ELSE '70+' END as age_group, COUNT(DISTINCT o.hn) as cnt
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn INNER JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE}
      GROUP BY age_group ORDER BY FIELD(age_group, '<40','40-49','50-59','60-69','70+')`).catch(() => []),
        dbQuery(`SELECT HOUR(o.vsttime) as hour, COUNT(DISTINCT o.vn) as total,
      ROUND(COUNT(DISTINCT o.vn) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 1) as avg_daily
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE} AND o.vsttime IS NOT NULL
      GROUP BY HOUR(o.vsttime) ORDER BY hour`).catch(() => []),
        // SLA: 7-day window to avoid service_time full scan
        dbQueryOne(`SELECT
      SUM(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        AND (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 <= 30 THEN 1 ELSE 0 END) as wait_sla_pass,
      COUNT(*) as total
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn STRAIGHT_JOIN service_time st ON st.vn = o.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE} AND o.vsttime IS NOT NULL`).catch(() => null),
        dbQuery(`SELECT
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
        // Actual 7-day revisit for NCD — use 90-day window for enough base (NCD = monthly visits)
        dbQueryOne(`SELECT
      COUNT(DISTINCT o2.vn) as revisit_count,
      COUNT(DISTINCT o1.vn) as base_visits
      FROM ovst o1
      INNER JOIN ovst o2 ON o1.hn = o2.hn AND o2.vn != o1.vn
        AND o2.vstdate > o1.vstdate AND o2.vstdate <= DATE_ADD(o1.vstdate, INTERVAL 7 DAY)
        AND o2.main_dep = '024'
      WHERE o1.vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
        AND o1.vstdate <= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        AND o1.main_dep = '024'`).catch(() => null),
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
    // NCI component scores (calibrated for NCD)
    const ws = Math.max(0, Math.min(100, Math.round(100 - Math.max(0, aw - 15) * (100 / 60))));
    const cs = Math.round(Math.min(100, cr));
    // NCD: low 7-day revisit is GOOD (monthly follow-up is normal); penalize >10%
    const rs = Math.max(0, Math.round(100 - Math.max(0, rr - 5) * 5));
    // Revenue: NCD avg ฿1500/visit → target ฿1500
    const rvs = Math.min(100, Math.round((ar / 1500) * 100));
    const ss = Math.round(wsp);
    const nci = Math.round((ws * 0.20) + (cs * 0.25) + (rs * 0.20) + (rvs * 0.15) + (ss * 0.20));
    const hourlyArr = Array.from({ length: 24 }, (_, h) => {
        const d = (dailyPat || []).find(x => Number(x.hour) === h);
        return { hour: h, label: `${String(h).padStart(2, '0')}:00`, avg: Number(d?.avg_daily || 0), total: Number(d?.total || 0) };
    });
    const peakHr = hourlyArr.reduce((b, h) => h.avg > (b?.avg || 0) ? h : b, hourlyArr[0]);
    const MTH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
    return {
        data_source: 'HOSxP XE', nci,
        nci_components: { wait_time: ws, completion: cs, revisit: rs, revenue: rvs, sla: ss },
        total_visits: tv, avg_daily_visits: ad, unique_patients: up,
        elderly_total: Number(visitSummary?.elderly_total || 0),
        male_total: Number(visitSummary?.male_total || 0), female_total: Number(visitSummary?.female_total || 0),
        avg_wait_time: aw, sd_wait_time: sw, avg_total_time: at, sd_total_time: 0,
        wait_over_30m: w30, wait_sla_pct: wsp,
        completion_rate: cr, dropout_count: dc, revisit_rate: rr, revisit_count: revisitCount, wait_window_days: 7,
        avg_revenue_per_visit: ar, total_revenue: tr, daily_revenue: dr2, max_revenue: Number(revenue?.max_revenue || 0),
        hourly_pattern: hourlyArr, peak_hour: { hour: peakHr?.hour, label: peakHr?.label, avg: peakHr?.avg },
        monthly_trend: (monthly || []).map(m => ({
            month: MTH[parseInt(m.month?.split('-')[1])] || m.month,
            visits: Number(m.visits || 0), patients: Number(m.patients || 0), avg_rev: Number(m.avg_rev || 0), total_rev: Number(m.total_rev || 0)
        })),
        top_diagnoses: (diagTop || []).map(d => ({ icd10: d.icd10, name: d.name, count: Number(d.cnt || 0), avg_rev: Number(d.avg_rev || 0) })),
        age_distribution: (ageDist || []).map(a => ({ group: a.age_group, count: Number(a.cnt || 0) })),
        by_disease: (byDisease30 || []).map(d => ({ disease: d.disease, visits: Number(d.visits || 0), patients: Number(d.patients || 0), avg_rev: Number(d.avg_rev || 0) })),
        timestamp: new Date().toISOString(),
    };
}));

// ━━━━━━ NCD Goal Attainment — HbA1c & Blood Pressure Targets ━━━━━━
// Clinical targets: HbA1c <7% (ADA 2024), BP <140/90 mmHg (กรมการแพทย์)
// Elderly ≥60 ปี ตามนโยบาย กสธ. ไทย (≠ WHO ≥65 ปี)
router.get('/goal-attainment', cached('ncdGoalAttainment', 1800000, async () => {
  const [hba1cGoal, bpGoal] = await Promise.all([
    // HbA1c goal for DM patients — 90-day window (quarterly check)
    // lab_head.lab_order_number → lab_order.lab_order_number; lab_items_name_ref for test name
    dbQueryOne(`
      SELECT
        COUNT(DISTINCT lh.hn) as total_tested,
        SUM(CASE WHEN CAST(lo.lab_order_result AS DECIMAL(5,2)) < 7 THEN 1 ELSE 0 END) as goal_met,
        SUM(CASE WHEN CAST(lo.lab_order_result AS DECIMAL(5,2)) >= 7 AND CAST(lo.lab_order_result AS DECIMAL(5,2)) < 9 THEN 1 ELSE 0 END) as suboptimal,
        SUM(CASE WHEN CAST(lo.lab_order_result AS DECIMAL(5,2)) >= 9 THEN 1 ELSE 0 END) as poor_control,
        ROUND(AVG(CAST(lo.lab_order_result AS DECIMAL(5,2))), 1) as avg_value,
        ROUND(MIN(CAST(lo.lab_order_result AS DECIMAL(5,2))), 1) as min_value,
        ROUND(MAX(CAST(lo.lab_order_result AS DECIMAL(5,2))), 1) as max_value
      FROM lab_head lh
      INNER JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
      INNER JOIN ovst o ON lh.vn = o.vn
      INNER JOIN ovstdiag od ON o.vn = od.vn
      WHERE lh.order_date >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
        AND o.main_dep = '024'
        AND od.icd10 LIKE 'E1%'
        AND lo.lab_items_name_ref LIKE '%HbA1c%'
        AND lo.lab_order_result IS NOT NULL
        AND lo.lab_order_result != ''
        AND lo.lab_order_result REGEXP '^[0-9]+(\\\\.[0-9]+)?$'
    `).catch(() => null),

    // BP goal for HT patients — 30-day window
    // opdscreen table has bps (systolic) and bpd (diastolic)
    dbQueryOne(`
      SELECT
        COUNT(DISTINCT o.hn) as total_measured,
        SUM(CASE WHEN CAST(os.bps AS UNSIGNED) < 140 AND CAST(os.bpd AS UNSIGNED) < 90 THEN 1 ELSE 0 END) as goal_met,
        SUM(CASE WHEN CAST(os.bps AS UNSIGNED) BETWEEN 140 AND 159 THEN 1 ELSE 0 END) as stage1_ht,
        SUM(CASE WHEN CAST(os.bps AS UNSIGNED) >= 160 THEN 1 ELSE 0 END) as stage2_ht,
        ROUND(AVG(CAST(os.bps AS UNSIGNED)), 0) as avg_systolic,
        ROUND(AVG(CAST(os.bpd AS UNSIGNED)), 0) as avg_diastolic
      FROM ovst o
      INNER JOIN ovstdiag od ON o.vn = od.vn
      INNER JOIN opdscreen os ON os.vn = o.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.main_dep = '024'
        AND od.icd10 LIKE 'I1%'
        AND CAST(os.bps AS UNSIGNED) > 0
        AND CAST(os.bpd AS UNSIGNED) > 0
    `).catch(() => null),
  ]);

  const dmTotal   = Number(hba1cGoal?.total_tested  || 0);
  const dmGoal    = Number(hba1cGoal?.goal_met       || 0);
  const dmSubopt  = Number(hba1cGoal?.suboptimal     || 0);
  const dmPoor    = Number(hba1cGoal?.poor_control   || 0);

  const htTotal   = Number(bpGoal?.total_measured || 0);
  const htGoal    = Number(bpGoal?.goal_met        || 0);
  const htStage1  = Number(bpGoal?.stage1_ht       || 0);
  const htStage2  = Number(bpGoal?.stage2_ht       || 0);

  return {
    // HbA1c — DM patients (90-day window)
    hba1c: {
      window_days:    90,
      total_tested:   dmTotal,
      goal_met:       dmGoal,       // HbA1c <7%
      suboptimal:     dmSubopt,     // 7-9%
      poor_control:   dmPoor,       // ≥9%
      goal_rate:      dmTotal > 0 ? Math.round((dmGoal  / dmTotal) * 100) : null,
      avg_value:      Number(hba1cGoal?.avg_value || 0),
      min_value:      Number(hba1cGoal?.min_value || 0),
      max_value:      Number(hba1cGoal?.max_value || 0),
      target_pct:     7.0,
      unit:           '%',
    },
    // Blood Pressure — HT patients (30-day window)
    bp: {
      window_days:     30,
      total_measured:  htTotal,
      goal_met:        htGoal,      // BP <140/90
      stage1_ht:       htStage1,    // 140-159 mmHg systolic
      stage2_ht:       htStage2,    // ≥160 mmHg systolic
      goal_rate:       htTotal > 0 ? Math.round((htGoal / htTotal) * 100) : null,
      avg_systolic:    Number(bpGoal?.avg_systolic  || 0),
      avg_diastolic:   Number(bpGoal?.avg_diastolic || 0),
      target_systolic:  140,
      target_diastolic: 90,
      unit:            'mmHg',
    },
    data_source: 'HOSxP XE · lab_order + opdscreen_bp',
    timestamp: new Date().toISOString(),
  };
}));

// ━━━━━━ NCD Monthly Fiscal — Cycle Time & Wait Steps (ปีงบปัจจุบัน) ━━━━━━
router.get('/monthly-fiscal', cached('ncdMonthlyFiscal', 3600000, async () => {
  const now = new Date();
  const mo = now.getMonth() + 1;
  const yr = now.getFullYear();
  const fiscalStartYear = mo >= 10 ? yr : yr - 1;
  const fiscalStart = `${fiscalStartYear}-10-01`;
  const fiscalEnd = `${fiscalStartYear + 1}-09-30`;
  const fiscalBE = fiscalStartYear + 543 + 1;

  const [visitRows, waitRows] = await Promise.all([
    dbQuery(`
      SELECT YEAR(o.vstdate) AS year_num, MONTH(o.vstdate) AS month_num, COUNT(DISTINCT o.vn) AS total_visits
      FROM ovst o WHERE o.vstdate BETWEEN '${fiscalStart}' AND LEAST('${fiscalEnd}', CURDATE()) AND o.main_dep = '024'
      GROUP BY YEAR(o.vstdate), MONTH(o.vstdate)
    `),
    dbQuery(`
      SELECT YEAR(st.vstdate) AS year_num, MONTH(st.vstdate) AS month_num,
        AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(st.vsttime)
          THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(st.vsttime)) / 60 END) AS avg_reg_to_screen,
        AVG(CASE WHEN st.service5 IS NOT NULL AND st.service1 IS NOT NULL AND TIME_TO_SEC(st.service5) > TIME_TO_SEC(st.service1)
          THEN (TIME_TO_SEC(st.service5) - TIME_TO_SEC(st.service1)) / 60 END) AS avg_screen_to_doc,
        AVG(CASE WHEN st.service7 IS NOT NULL AND st.service5 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(st.service5)
          THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(st.service5)) / 60 END) AS avg_doc_to_rx,
        ROUND(AVG(CASE WHEN (r.bill_time IS NOT NULL OR st.service7 IS NOT NULL)
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(st.vstdate,' ',st.vsttime), CONCAT(st.vstdate,' ',COALESCE(r.bill_time, st.service7)))
          ELSE NULL END), 0) AS true_cycle_time
      FROM ovst o
      INNER JOIN service_time st ON st.vn = o.vn
      LEFT JOIN rcpt_print r ON st.vn = r.vn
      WHERE o.vstdate BETWEEN '${fiscalStart}' AND LEAST('${fiscalEnd}', CURDATE())
        AND o.main_dep = '024' AND st.service1 IS NOT NULL
      GROUP BY YEAR(st.vstdate), MONTH(st.vstdate)
    `),
  ]);

  const MTH = ['','ม.ค.','ก.พ.','มี.ค.','เม.ย.','พ.ค.','มิ.ย.','ก.ค.','ส.ค.','ก.ย.','ต.ค.','พ.ย.','ธ.ค.'];
  const months = [];
  for (let i = 0; i < 12; i++) {
    const mNum = ((9 + i) % 12) + 1;
    const yNum = mNum >= 10 ? fiscalStartYear : fiscalStartYear + 1;
    const vRow = (visitRows || []).find(r => Number(r.month_num) === mNum && Number(r.year_num) === yNum);
    const wRow = (waitRows || []).find(r => Number(r.month_num) === mNum && Number(r.year_num) === yNum);
    const reg = Math.round(Number(wRow?.avg_reg_to_screen || 0));
    const screen = Math.round(Number(wRow?.avg_screen_to_doc || 0));
    const doc = Math.round(Number(wRow?.avg_doc_to_rx || 0));
    const trueCycle = Number(wRow?.true_cycle_time || 0);
    const total = trueCycle > 0 ? trueCycle : (reg + screen + doc);
    months.push({
      month: MTH[mNum], month_num: mNum, year_num: yNum,
      total_visits: Number(vRow?.total_visits || 0),
      avg_total: total, avg_reg: reg, avg_screen: screen, avg_doc: doc, avg_rx: 0,
      has_data: Number(vRow?.total_visits || 0) > 0,
    });
  }
  const withData = months.filter(m => m.has_data && m.avg_total > 0);
  const benchmark = withData.length ? Math.round(withData.reduce((s, m) => s + m.avg_total, 0) / withData.length) : 0;

  return {
    data_source: 'HOSxP XE (NCD dept 024)',
    fiscal_year_be: fiscalBE, fiscal_start: fiscalStart, fiscal_end: fiscalEnd,
    benchmark_avg: benchmark, months,
  };
}));

// ━━━━━━ NCD Estimated Revenue — Fiscal Year (3 ปีย้อนหลัง) ━━━━━━
router.get('/revenue-fiscal', cached('ncdRevenueFiscal', 3600000, (req) => getRevenueFiscal('024', 'HOSxP XE · vn_stat (NCD)', req?.query?.start, req?.query?.end)));

export default router;
