import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne } from '../db/mysql.js';

const router = Router();

// ── Critical Value Thresholds (WHO Critical Value Notification Protocol) ──
// DANGER = immediate life threat, WARNING = clinically significant abnormal
const CRIT_THRESHOLDS = {
  potassium:   { danger_lo: 2.5, danger_hi: 6.5, warn_lo: 3.0, warn_hi: 5.5 },
  sodium:      { danger_lo: 120, danger_hi: 160, warn_lo: 128, warn_hi: 150 },
  glucose:     { danger_lo: 40,  danger_hi: 500, warn_lo: 54,  warn_hi: 400 },
  hemoglobin:  { danger_lo: 5.0, danger_hi: 99,  warn_lo: 7.0, warn_hi: 20 },
  platelet:    { danger_lo: 20000, danger_hi: 999999, warn_lo: 50000, warn_hi: 999999 },
  creatinine:  { danger_lo: -1, danger_hi: 10,  warn_lo: -1,  warn_hi: 5.0 },
  troponin:    { danger_lo: -1, danger_hi: 0.3, warn_lo: -1,  warn_hi: 0.04 },
  lactate:     { danger_lo: -1, danger_hi: 6.0, warn_lo: -1,  warn_hi: 4.0 },
  wbc:         { danger_lo: 1.0, danger_hi: 50, warn_lo: 2.0, warn_hi: 30 },
};

function classifyCriticalValues(rows) {
  const results = [];
  for (const c of rows) {
    const val = parseFloat(c.result);
    if (isNaN(val)) continue;
    const ln = (c.test_name || '').toLowerCase();

    let threshKey = null;
    if (ln.includes('potassium')) threshKey = 'potassium';
    else if (ln.includes('sodium')) threshKey = 'sodium';
    else if (ln.includes('glucose') || ln.includes('fasting')) threshKey = 'glucose';
    else if (ln.includes('hemoglobin') && !ln.includes('a1c')) threshKey = 'hemoglobin';
    else if (ln.includes('platelet')) threshKey = 'platelet';
    else if (ln.includes('creatinine')) threshKey = 'creatinine';
    else if (ln.includes('troponin')) threshKey = 'troponin';
    else if (ln.includes('lactate')) threshKey = 'lactate';
    else if (ln.includes('wbc count')) threshKey = 'wbc';

    let severity = 'NORMAL';
    if (threshKey) {
      const t = CRIT_THRESHOLDS[threshKey];
      if (val <= t.danger_lo || val >= t.danger_hi) severity = 'DANGER';
      else if (val <= t.warn_lo || val >= t.warn_hi) severity = 'WARNING';
    } else if (ln.includes('hba1c')) {
      if (val >= 10) severity = 'WARNING';
      else if (val >= 7) severity = 'WARNING';
    } else {
      severity = 'WARNING';
    }

    if (severity !== 'NORMAL') {
      results.push({ test: c.test_name, result: c.result, normal: c.normal_range, hn: c.hn, severity });
    }
  }
  // Sort DANGER first, then WARNING
  results.sort((a, b) => (a.severity === 'DANGER' ? 0 : 1) - (b.severity === 'DANGER' ? 0 : 1));
  return results.slice(0, 20);
}

// ============================================================
// 🔬 Laboratory Analytics — HOSxP XE
// ---- SCHEMA NOTES (verified) --------------------------------
// lab_head:
//   lab_order_number   → PK (VARCHAR / INT)
//   hn                 → patient HN
//   vn                 → OPD visit number (may be NULL for IPD)
//   order_date         → DATE of order
//   order_time         → TIME (may be NULL)
//   report_date        → DATE result was released
//   report_time        → TIME result was released
//   reporter_staff     → staff who reported (username)
//   confirm_flag       → 'Y' or NULL
//   department         → ordering department code
// lab_order:
//   lab_order_number   → FK to lab_head
//   lab_items_name_ref → test name (e.g. 'HbA1c', 'WBC', 'Creatinine')
//   lab_order_result   → result value (VARCHAR)
//   lab_items_normal_value_ref → normal range text
//   abnormal_result    → 'Y' if abnormal
// ---- TAT = TIMESTAMPDIFF(MINUTE, CONCAT(order_date,' ',order_time), CONCAT(report_date,' ',report_time))
// ---- Completed = report_date IS NOT NULL
// ============================================================

// Lab Today Summary
router.get('/today', cached('labToday_v1', 30000, async () => {
  const [summary, hourly, topTests, abnormalSummary, criticalValues, onDutyStaff] = await Promise.all([

    // 1. Today Lab Summary — count at ORDER level (not item/row level)
    dbQueryOne(`
      SELECT
        COUNT(DISTINCT lh.lab_order_number) as total_orders,
        COUNT(DISTINCT lh.hn) as unique_patients,
        COUNT(DISTINCT CASE WHEN lh.report_date IS NOT NULL THEN lh.lab_order_number END) as completed_orders,
        COUNT(DISTINCT CASE WHEN lh.report_date IS NULL THEN lh.lab_order_number END) as pending_orders,
        COUNT(lo.lab_order_number) as total_items,
        SUM(CASE WHEN lo.lab_order_result IS NOT NULL AND lo.lab_order_result != '' THEN 1 ELSE 0 END) as completed_items,
        ROUND(AVG(CASE
          WHEN lh.report_date IS NOT NULL AND lh.order_time IS NOT NULL AND lh.report_time IS NOT NULL
               AND TIMESTAMPDIFF(MINUTE, CONCAT(lh.order_date, ' ', lh.order_time), CONCAT(lh.report_date, ' ', lh.report_time)) > 0
               AND TIMESTAMPDIFF(MINUTE, CONCAT(lh.order_date, ' ', lh.order_time), CONCAT(lh.report_date, ' ', lh.report_time)) < 1440
          THEN TIMESTAMPDIFF(MINUTE,
            CONCAT(lh.order_date, ' ', lh.order_time),
            CONCAT(lh.report_date, ' ', lh.report_time))
          ELSE NULL END), 0) as avg_tat_min,
        SUM(CASE WHEN p.sex IN ('1','ช','ชาย') THEN 1 ELSE 0 END) as male,
        SUM(CASE WHEN p.sex IN ('2','ญ','หญิง') THEN 1 ELSE 0 END) as female
      FROM lab_head lh
      INNER JOIN patient p ON lh.hn = p.hn
      LEFT JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
      WHERE lh.order_date = CURDATE()
    `).catch(() => null),

    // 2. Hourly Orders Today
    dbQuery(`
      SELECT HOUR(order_time) as hr, COUNT(*) as cnt
      FROM lab_head
      WHERE order_date = CURDATE() AND order_time IS NOT NULL
      GROUP BY HOUR(order_time) ORDER BY hr
    `).catch(() => []),

    // 3. Top Tests Today
    dbQuery(`
      SELECT lo.lab_items_name_ref as name,
        COUNT(*) as cnt,
        SUM(CASE WHEN lo.abnormal_result = 'Y' THEN 1 ELSE 0 END) as abnormal_cnt
      FROM lab_head lh
      INNER JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
      WHERE lh.order_date = CURDATE()
        AND lo.lab_items_name_ref IS NOT NULL AND lo.lab_items_name_ref != ''
      GROUP BY lo.lab_items_name_ref
      ORDER BY cnt DESC LIMIT 10
    `).catch(() => []),

    // 4. Abnormal Summary Today
    dbQueryOne(`
      SELECT
        COUNT(*) as total_items,
        SUM(CASE WHEN lo.abnormal_result = 'Y' THEN 1 ELSE 0 END) as abnormal_count
      FROM lab_head lh
      INNER JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
      WHERE lh.order_date = CURDATE()
    `).catch(() => null),

    // 5. Critical Values Today — get all abnormal critical tests with numeric result for threshold check
    dbQuery(`
      SELECT lo.lab_items_name_ref as test_name,
        lo.lab_order_result as result,
        lo.lab_items_normal_value_ref as normal_range,
        lh.hn
      FROM lab_head lh
      INNER JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
      WHERE lh.order_date = CURDATE()
        AND lo.abnormal_result = 'Y'
        AND lo.lab_order_result REGEXP '^[0-9]'
        AND (
          lo.lab_items_name_ref LIKE '%Potassium%' OR lo.lab_items_name_ref LIKE '%Sodium%'
          OR lo.lab_items_name_ref LIKE '%Glucose%' OR lo.lab_items_name_ref LIKE '%Hemoglobin%'
          OR lo.lab_items_name_ref LIKE '%Troponin%' OR lo.lab_items_name_ref LIKE '%Lactate%'
          OR lo.lab_items_name_ref LIKE '%WBC count%' OR lo.lab_items_name_ref LIKE '%Platelet%'
          OR lo.lab_items_name_ref LIKE '%Creatinine%'
          OR lo.lab_items_name_ref LIKE '%HbA1c%' OR lo.lab_items_name_ref LIKE '%Fasting%'
        )
      ORDER BY lh.order_date DESC
      LIMIT 50
    `).catch(() => []),

    // 6. On-Duty Lab Staff Today — combine reporter + receive staff for coverage
    dbQuery(`
      SELECT staff_name as username, SUM(cnt) as total_reported FROM (
        SELECT reporter_staff as staff_name, COUNT(*) as cnt
        FROM lab_head
        WHERE order_date = CURDATE()
          AND reporter_staff IS NOT NULL AND reporter_staff != ''
        GROUP BY reporter_staff
        UNION ALL
        SELECT receive_staff as staff_name, COUNT(*) as cnt
        FROM lab_head
        WHERE order_date = CURDATE()
          AND receive_staff IS NOT NULL AND receive_staff != ''
          AND (reporter_staff IS NULL OR reporter_staff = '')
        GROUP BY receive_staff
      ) combined
      GROUP BY staff_name
      ORDER BY total_reported DESC
      LIMIT 15
    `).catch(() => []),
  ]);

  const totalOrders = Number(summary?.total_orders || 0);
  const completedOrders = Number(summary?.completed_orders || 0);
  const pendingOrders = Number(summary?.pending_orders || 0);
  const totalItems = Number(abnormalSummary?.total_items || 0);
  const completedItems = Number(summary?.completed_items || 0);
  const abnormalCount = Number(abnormalSummary?.abnormal_count || 0);
  const abnormalRate = totalItems > 0 ? Math.round((abnormalCount / totalItems) * 100 * 10) / 10 : 0;

  const hourlyArr = Array.from({ length: 24 }, (_, h) => {
    const d = (hourly || []).find(x => Number(x.hr) === h);
    return { hour: h, label: `${String(h).padStart(2, '0')}:00`, count: Number(d?.cnt || 0) };
  });

  return {
    data_source: 'HOSxP XE',
    total_orders: totalOrders,
    completed: completedOrders,
    completed_orders: completedOrders,
    completed_items: completedItems,
    pending: pendingOrders,
    pending_orders: pendingOrders,
    unique_patients: Number(summary?.unique_patients || 0),
    avg_tat_min: Number(summary?.avg_tat_min || 0),
    male: Number(summary?.male || 0),
    female: Number(summary?.female || 0),
    total_items: totalItems,
    abnormal_count: abnormalCount,
    abnormal_rate: abnormalRate,
    critical_values: classifyCriticalValues(criticalValues || []),
    top_tests: (topTests || []).map(t => ({
      name: t.name, count: Number(t.cnt || 0), abnormal: Number(t.abnormal_cnt || 0),
    })),
    on_duty_staff: (onDutyStaff || []).map(s => ({
      username: s.username, total: Number(s.total_reported || 0),
    })),
    on_duty: (onDutyStaff || []).map(s => ({
      username: s.username, total: Number(s.total_reported || 0),
    })),
    hourly: hourlyArr,
    timestamp: new Date().toISOString(),
  };
}));

// Lab Analytics (30-day)
router.get('/analytics', cached('labAnalytics_v1', 300000, async () => {
  const [
    volumeSummary, tatSummary, abnormalSummary, completionData,
    monthlyTrend, topTestsByVolume, topTestsByAbnormal,
    deptPattern, labTypeDistRaw, onDutyStaff, tatDistRaw, p90Row
  ] = await Promise.all([

    // 1. Volume Summary (30D)
    dbQueryOne(`
      SELECT
        COUNT(DISTINCT lh.lab_order_number) as total_orders,
        COUNT(DISTINCT lh.hn) as unique_patients,
        COUNT(DISTINCT lh.order_date) as active_days,
        ROUND(COUNT(DISTINCT lh.lab_order_number) / NULLIF(COUNT(DISTINCT lh.order_date), 0), 1) as avg_daily_orders,
        COUNT(DISTINCT lo.lab_order_number) as total_items,
        ROUND(COUNT(DISTINCT lo.lab_order_number) / NULLIF(COUNT(DISTINCT lh.order_date), 0), 1) as avg_daily_items
      FROM lab_head lh
      LEFT JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
      WHERE lh.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `).catch(() => null),

    // 2. TAT Summary (30D) — orders with both order_time and report_time
    dbQueryOne(`
      SELECT
        ROUND(AVG(CASE
          WHEN lh.report_date IS NOT NULL AND lh.order_time IS NOT NULL AND lh.report_time IS NOT NULL
               AND TIMESTAMPDIFF(MINUTE, CONCAT(lh.order_date,' ',lh.order_time), CONCAT(lh.report_date,' ',lh.report_time)) > 0
               AND TIMESTAMPDIFF(MINUTE, CONCAT(lh.order_date,' ',lh.order_time), CONCAT(lh.report_date,' ',lh.report_time)) < 1440
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(lh.order_date,' ',lh.order_time), CONCAT(lh.report_date,' ',lh.report_time))
          ELSE NULL END), 0) as avg_tat,
        ROUND(STDDEV(CASE
          WHEN lh.report_date IS NOT NULL AND lh.order_time IS NOT NULL AND lh.report_time IS NOT NULL
               AND TIMESTAMPDIFF(MINUTE, CONCAT(lh.order_date,' ',lh.order_time), CONCAT(lh.report_date,' ',lh.report_time)) > 0
               AND TIMESTAMPDIFF(MINUTE, CONCAT(lh.order_date,' ',lh.order_time), CONCAT(lh.report_date,' ',lh.report_time)) < 1440
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(lh.order_date,' ',lh.order_time), CONCAT(lh.report_date,' ',lh.report_time))
          ELSE NULL END), 0) as sd_tat,
        SUM(CASE
          WHEN lh.report_date IS NOT NULL AND lh.order_time IS NOT NULL AND lh.report_time IS NOT NULL
               AND TIMESTAMPDIFF(MINUTE, CONCAT(lh.order_date,' ',lh.order_time), CONCAT(lh.report_date,' ',lh.report_time)) BETWEEN 1 AND 60
          THEN 1 ELSE 0 END) as tat_under_60m,
        SUM(CASE
          WHEN lh.report_date IS NOT NULL AND lh.order_time IS NOT NULL AND lh.report_time IS NOT NULL
               AND TIMESTAMPDIFF(MINUTE, CONCAT(lh.order_date,' ',lh.order_time), CONCAT(lh.report_date,' ',lh.report_time)) > 120
          THEN 1 ELSE 0 END) as tat_over_120m
      FROM lab_head lh
      WHERE lh.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `).catch(() => null),

    // 3. Abnormal Rate (30D)
    dbQueryOne(`
      SELECT
        COUNT(*) as total_items,
        SUM(CASE WHEN lo.abnormal_result = 'Y' THEN 1 ELSE 0 END) as abnormal_count
      FROM lab_head lh
      INNER JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
      WHERE lh.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `).catch(() => null),

    // 4. Completion Rate (30D) — order level, exclude today for overdue (still in progress)
    dbQueryOne(`
      SELECT
        COUNT(DISTINCT lab_order_number) as total,
        COUNT(DISTINCT CASE WHEN report_date IS NOT NULL THEN lab_order_number END) as completed,
        COUNT(DISTINCT CASE WHEN report_date IS NULL AND order_date < CURDATE()
          AND confirm_flag IS NULL THEN lab_order_number END) as overdue
      FROM lab_head
      WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `).catch(() => null),

    // 5. Monthly Trend (6M)
    dbQuery(`
      SELECT DATE_FORMAT(lh.order_date, '%Y-%m') as month,
        COUNT(DISTINCT lh.lab_order_number) as orders,
        COUNT(DISTINCT lh.hn) as patients,
        COUNT(lo.lab_order_number) as items,
        SUM(CASE WHEN lo.abnormal_result = 'Y' THEN 1 ELSE 0 END) as abnormal_items
      FROM lab_head lh
      LEFT JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
      WHERE lh.order_date >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(lh.order_date, '%Y-%m')
      ORDER BY month
    `).catch(() => []),

    // 6. Top Tests by Volume (30D) — group CBC/Heme morphology sub-items
    dbQuery(`
      SELECT test_group as name,
        SUM(cnt) as total_count,
        SUM(abn) as abnormal_count
      FROM (
        SELECT
          CASE
            WHEN lo.lab_items_name_ref IN ('WBC count','RBC count','Hemoglobin','Hematocrit','Platelet count',
              'MCV','MCH','MCHC','RDW','MPV','PDW','Neutrophil','Lymphocyte','Monocyte','Eosinophil','Basophil',
              'NRBC','Reticulocyte','Band','Atypical Lymph','Metamyelocyte','Myelocyte','Blast',
              'Spherocyte','Acanthocyte','Keratocyte','Echinocyte','Microcyte','Macrocyte',
              'Anisicytosis','Poikilocytosis','Target cell','Schistocyte','Stomatocyte','Ovalocyte')
            THEN 'CBC (Complete Blood Count)'
            WHEN lo.lab_items_name_ref LIKE '%Urine%' OR lo.lab_items_name_ref LIKE 'Specific gravity%'
              OR lo.lab_items_name_ref IN ('WBC','RBC','Epithelial cell','Bacteria','Cast','Crystal','Color','Appearance','Protein in Urine','Glucose in Urine','Ketone','Bilirubin (urine)','Urobilinogen','Nitrite','Leukocyte esterase')
            THEN 'Urinalysis'
            ELSE lo.lab_items_name_ref
          END as test_group,
          COUNT(*) as cnt,
          SUM(CASE WHEN lo.abnormal_result = 'Y' THEN 1 ELSE 0 END) as abn
        FROM lab_head lh
        INNER JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
        WHERE lh.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
          AND lo.lab_items_name_ref IS NOT NULL AND lo.lab_items_name_ref != ''
        GROUP BY test_group
      ) grouped
      GROUP BY test_group
      ORDER BY total_count DESC
      LIMIT 15
    `).catch(() => []),

    // 7. Top Tests by Abnormal Rate (min 10 results, 30D)
    dbQuery(`
      SELECT lo.lab_items_name_ref as name,
        COUNT(*) as total_count,
        SUM(CASE WHEN lo.abnormal_result = 'Y' THEN 1 ELSE 0 END) as abnormal_count,
        ROUND(100.0 * SUM(CASE WHEN lo.abnormal_result = 'Y' THEN 1 ELSE 0 END) / COUNT(*), 1) as abnormal_rate
      FROM lab_head lh
      INNER JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
      WHERE lh.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND lo.lab_items_name_ref IS NOT NULL AND lo.lab_items_name_ref != ''
      GROUP BY lo.lab_items_name_ref
      HAVING COUNT(*) >= 10
      ORDER BY abnormal_rate DESC
      LIMIT 10
    `).catch(() => []),

    // 8. Department Request Pattern (30D) — via vn → ovst or direct department field
    dbQuery(`
      SELECT COALESCE(lh.department, 'ไม่ระบุ') as dept,
        COUNT(DISTINCT lh.lab_order_number) as order_count
      FROM lab_head lh
      WHERE lh.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND lh.department IS NOT NULL
      GROUP BY COALESCE(lh.department, 'ไม่ระบุ')
      ORDER BY order_count DESC LIMIT 10
    `).catch(() => []),

    // 9. Lab Type Distribution (via test name grouping)
    dbQuery(`
      SELECT
        CASE
          WHEN lo.lab_items_name_ref LIKE '%CBC%' OR lo.lab_items_name_ref LIKE '%WBC%' OR lo.lab_items_name_ref LIKE '%Hb%' OR lo.lab_items_name_ref LIKE '%Hct%' OR lo.lab_items_name_ref LIKE '%PLT%' OR lo.lab_items_name_ref LIKE '%RBC%' THEN 'Hematology'
          WHEN lo.lab_items_name_ref LIKE '%Glucose%' OR lo.lab_items_name_ref LIKE '%FBS%' OR lo.lab_items_name_ref LIKE '%HbA1c%' OR lo.lab_items_name_ref LIKE '%Creatinine%' OR lo.lab_items_name_ref LIKE '%BUN%' OR lo.lab_items_name_ref LIKE '%AST%' OR lo.lab_items_name_ref LIKE '%ALT%' OR lo.lab_items_name_ref LIKE '%Cholesterol%' OR lo.lab_items_name_ref LIKE '%Triglyceride%' OR lo.lab_items_name_ref LIKE '%LDL%' OR lo.lab_items_name_ref LIKE '%HDL%' THEN 'Chemistry'
          WHEN lo.lab_items_name_ref LIKE '%Urine%' OR lo.lab_items_name_ref LIKE '%UA%' THEN 'Urinalysis'
          WHEN lo.lab_items_name_ref LIKE '%Cultur%' OR lo.lab_items_name_ref LIKE '%Gram%' THEN 'Microbiology'
          WHEN lo.lab_items_name_ref LIKE '%Troponin%' OR lo.lab_items_name_ref LIKE '%CK%' OR lo.lab_items_name_ref LIKE '%BNP%' THEN 'Cardiac Markers'
          WHEN lo.lab_items_name_ref LIKE '%TSH%' OR lo.lab_items_name_ref LIKE '%T3%' OR lo.lab_items_name_ref LIKE '%T4%' OR lo.lab_items_name_ref LIKE '%PSA%' THEN 'Immunology'
          ELSE 'Other'
        END as lab_type,
        COUNT(*) as cnt
      FROM lab_head lh
      INNER JOIN lab_order lo ON lh.lab_order_number = lo.lab_order_number
      WHERE lh.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND lo.lab_items_name_ref IS NOT NULL
      GROUP BY lab_type
      ORDER BY cnt DESC
    `).catch(() => []),

    // 10. On-Duty Lab Staff Today
    dbQuery(`
      SELECT reporter_staff as username,
        COUNT(*) as total_reported,
        SUM(CASE WHEN HOUR(report_time) < 12 THEN 1 ELSE 0 END) as morning_count,
        SUM(CASE WHEN HOUR(report_time) >= 12 AND HOUR(report_time) < 17 THEN 1 ELSE 0 END) as afternoon_count,
        SUM(CASE WHEN HOUR(report_time) >= 17 THEN 1 ELSE 0 END) as night_count
      FROM lab_head
      WHERE order_date = CURDATE()
        AND reporter_staff IS NOT NULL AND reporter_staff != ''
        AND report_time IS NOT NULL
      GROUP BY reporter_staff
      ORDER BY total_reported DESC
      LIMIT 20
    `).catch(() => []),

    // 11. TAT Distribution Buckets (30D)
    dbQuery(`
      SELECT
        CASE
          WHEN tat_min < 30 THEN '< 30min'
          WHEN tat_min < 60 THEN '30-60min'
          WHEN tat_min < 120 THEN '1-2hr'
          WHEN tat_min < 240 THEN '2-4hr'
          ELSE '> 4hr'
        END as bucket,
        COUNT(*) as cnt
      FROM (
        SELECT TIMESTAMPDIFF(MINUTE,
          CONCAT(lh.order_date,' ',lh.order_time),
          CONCAT(lh.report_date,' ',lh.report_time)) as tat_min
        FROM lab_head lh
        WHERE lh.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
          AND lh.order_time IS NOT NULL AND lh.report_time IS NOT NULL
          AND lh.report_date IS NOT NULL
      ) t
      WHERE tat_min > 0 AND tat_min < 1440
      GROUP BY bucket
      ORDER BY FIELD(bucket, '< 30min','30-60min','1-2hr','2-4hr','> 4hr')
    `).catch(() => []),

    // 12. P90 TAT — actual 90th percentile via ORDER BY + OFFSET
    dbQueryOne(`
      SELECT tat_min as p90_tat FROM (
        SELECT TIMESTAMPDIFF(MINUTE,
          CONCAT(lh.order_date,' ',lh.order_time),
          CONCAT(lh.report_date,' ',lh.report_time)) as tat_min
        FROM lab_head lh
        WHERE lh.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
          AND lh.order_time IS NOT NULL AND lh.report_time IS NOT NULL
          AND lh.report_date IS NOT NULL
        HAVING tat_min > 0 AND tat_min < 1440
        ORDER BY tat_min ASC
      ) t
      LIMIT 1 OFFSET FLOOR((SELECT COUNT(*) FROM lab_head
        WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
          AND order_time IS NOT NULL AND report_time IS NOT NULL AND report_date IS NOT NULL) * 0.9)
    `).catch(() => null),
  ]);

  // ── Derived Metrics ──
  const totalOrders = Number(volumeSummary?.total_orders || 0);
  const avgDailyOrders = Number(volumeSummary?.avg_daily_orders || 0);
  const totalItems = Number(abnormalSummary?.total_items || 0);
  const abnormalCount = Number(abnormalSummary?.abnormal_count || 0);
  const abnormalRate = totalItems > 0 ? Math.round((abnormalCount / totalItems) * 100 * 10) / 10 : 0;
  const completionTotal = Number(completionData?.total || 0);
  const completionCompleted = Number(completionData?.completed || 0);
  const completionRate = completionTotal > 0 ? Math.round((completionCompleted / completionTotal) * 100 * 10) / 10 : 0;
  const overdueCount = Number(completionData?.overdue || 0);

  const avgTat = Number(tatSummary?.avg_tat || 0);
  const sdTat = Number(tatSummary?.sd_tat || 0);
  const tatUnder60 = Number(tatSummary?.tat_under_60m || 0);
  const tatOver120 = Number(tatSummary?.tat_over_120m || 0);
  const p90Tat = Number(p90Row?.p90_tat || 0) || (avgTat > 0 ? Math.round(avgTat + sdTat * 1.28) : 0);
  const tatSlaPct = completionCompleted > 0 ? Math.round((tatUnder60 / completionCompleted) * 100) : 0;

  // ── LPI: Lab Performance Index (0–100) ──
  // 1. TAT Score (45%): < 60min = 100, each 30min over = -15 pts
  const tatScore = avgTat > 0 ? Math.max(0, Math.min(100, Math.round(100 - Math.max(0, (avgTat - 60) / 30) * 15))) : 50;
  // 2. Completion Rate Score (35%): direct %
  const completionScore = Math.round(Math.min(100, completionRate));
  // 3. SLA Score (20%): % of orders completed within 60 min (target ≥70%)
  const slaScore = Math.min(100, Math.round((tatSlaPct / 70) * 100));

  const lpi = Math.round(tatScore * 0.45 + completionScore * 0.35 + slaScore * 0.20);

  // ── Monthly Trend ──
  const MTH = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
  const monthData = (monthlyTrend || []).map(m => ({
    month: MTH[parseInt(m.month?.split('-')[1])] || m.month,
    orders: Number(m.orders || 0),
    patients: Number(m.patients || 0),
    items: Number(m.items || 0),
    abnormal: Number(m.abnormal_items || 0),
  }));

  return {
    data_source: 'HOSxP XE',
    lpi,
    lpi_components: { tat: tatScore, completion: completionScore, sla: slaScore },
    total_orders: totalOrders,
    avg_daily_orders: avgDailyOrders,
    total_items: totalItems,
    abnormal_count: abnormalCount,
    abnormal_rate: abnormalRate,
    completion_rate: completionRate,
    overdue_count: overdueCount,
    avg_tat: avgTat,
    sd_tat: sdTat,
    p90_tat: p90Tat,
    tat_sla_pct: tatSlaPct,
    tat_under_60m: tatUnder60,
    tat_over_120m: tatOver120,
    monthly_trend: monthData,
    top_tests_by_volume: (topTestsByVolume || []).map(t => ({
      name: t.name,
      count: Number(t.total_count || 0),
      abnormal: Number(t.abnormal_count || 0),
      abnormal_rate: Number(t.total_count) > 0 ? Math.round((Number(t.abnormal_count) / Number(t.total_count)) * 100) : 0,
    })),
    top_tests_by_abnormal: (topTestsByAbnormal || []).map(t => ({
      name: t.name,
      count: Number(t.total_count || 0),
      abnormal: Number(t.abnormal_count || 0),
      abnormal_rate: Number(t.abnormal_rate || 0),
    })),
    dept_pattern: (deptPattern || []).map(d => ({
      dept: d.dept, count: Number(d.order_count || 0),
    })),
    lab_type_dist: (labTypeDistRaw || []).map(t => ({
      type: t.lab_type, count: Number(t.cnt || 0),
    })),
    tat_distribution: (tatDistRaw || []).map(b => ({
      bucket: b.bucket, count: Number(b.cnt || 0),
    })),
    on_duty: {
      staff: (onDutyStaff || []).map(s => ({
        username: s.username,
        total_count: Number(s.total_reported || 0),
        morning_count: Number(s.morning_count || 0),
        afternoon_count: Number(s.afternoon_count || 0),
        night_count: Number(s.night_count || 0),
      })),
    },
    timestamp: new Date().toISOString(),
  };
}));

// Lab Fiscal Year Revenue (ใช้ lab order volume แทนรายได้ เพราะ lab revenue อยู่ใน vn_stat)
router.get('/revenue-fiscal', cached('labRevenueFiscal_v1', 3600000, async (req) => {
  const { getFiscalConfig } = await import('../helpers/fiscal.js');
  const { fiscalYears: fyConfig } = getFiscalConfig(req?.query?.start, req?.query?.end);
  const fiscalYears = fyConfig.map(fy => fy.fiscalBE - 543);
  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const MTH_ORDER = ['ต.ค.', 'พ.ย.', 'ธ.ค.', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.'];

  const fyData = await Promise.all(fiscalYears.map(async (fy) => {
    const fyStart = `${fy - 1}-10-01`;
    const fyEnd = `${fy}-09-30`;

    const rows = await dbQuery(`
      SELECT DATE_FORMAT(order_date, '%Y-%m') as ym,
        COUNT(DISTINCT lab_order_number) as orders,
        COUNT(DISTINCT vn) as visits
      FROM lab_head
      WHERE order_date BETWEEN ? AND ?
      GROUP BY DATE_FORMAT(order_date, '%Y-%m')
      ORDER BY ym
    `, [fyStart, fyEnd]).catch(() => []);

    const monthMap = {}, visitMap = {};
    (rows || []).forEach(r => { monthMap[r.ym] = Number(r.orders || 0); visitMap[r.ym] = Number(r.visits || 0); });

    const months = MTH_ORDER.map((label, i) => {
      const mo = i < 3 ? (10 + i) : (i - 2);
      const yr = i < 3 ? (fy - 1) : fy;
      const key = `${yr}-${String(mo).padStart(2, '0')}`;
      return { month: label, month_num: mo, revenue: monthMap[key] || 0, visits: visitMap[key] || 0 };
    });

    const totalRevenue = months.reduce((s, m) => s + m.revenue, 0);
    const totalVisits = months.reduce((s, m) => s + m.visits, 0);
    const nowKey = `${currentYear}-${String(currentMonth).padStart(2, '0')}`;
    const comparableMonths = months.filter((_, i) => {
      const mo = i < 3 ? (10 + i) : (i - 2);
      const yr = i < 3 ? (fy - 1) : fy;
      const key = `${yr}-${String(mo).padStart(2, '0')}`;
      return key <= nowKey;
    });
    const comparable_revenue = comparableMonths.reduce((s, m) => s + m.revenue, 0);

    return {
      fiscal_year: fy,
      fiscal_label: `FY${fy}`,
      total_revenue: totalRevenue,
      total_visits: totalVisits,
      comparable_revenue,
      months,
      has_data: months.some(m => m.revenue > 0),
    };
  }));

  // Comparable period: only sum months that have data in latest FY (fair YoY)
  const latest = fyData[fyData.length - 1];
  const comparableIdx = (latest?.months || []).map((m, i) => m.revenue > 0 ? i : -1).filter(i => i >= 0);
  for (const fy of fyData) {
    let compRev = 0, compVis = 0;
    for (const i of comparableIdx) {
      compRev += fy.months[i]?.revenue || 0;
      compVis += fy.months[i]?.visits || 0;
    }
    fy.comparable_revenue = compRev;
    fy.comparable_visits = compVis;
    fy.comparable_months = comparableIdx.length;
  }

  return {
    data_source: 'HOSxP XE · lab_head (order volume)',
    fiscal_years: fyData,
    value_unit: 'orders',
    timestamp: new Date().toISOString(),
  };
}));

export default router;
