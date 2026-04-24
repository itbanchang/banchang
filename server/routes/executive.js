// ============================================================
// BCH 360° Intelligence V.10 — Executive Features
// Export (CSV) · BSC · Auto-Report · Benchmark
// ============================================================
import { Router } from 'express';
import { dbQuery, dbQueryOne, dbQueryHeavy } from '../db/mysql.js';
import { cached } from '../cache/staleCache.js';
import { getMV } from '../db/materializedViews.js';
import dw from '../db/dataWarehouse.js';
import { KPI } from '../config/kpiThresholds.js';
import { getCalibrated, getCalibrationMeta } from '../ai/calibration.js';
import { getAlertStatus } from '../monitoring/alerts.js';
import { getMetricsJSON } from '../monitoring/metrics.js';
import logger from '../logger.js';
import { validateQuery, validateParams } from '../middleware/validate.js';
import { exportDatasetParams, exportMonthsQuery } from '../middleware/schemas.js';
import { safeError } from '../lib/safeError.js';

const router = Router();

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. CSV EXPORT — Download any KPI dataset as CSV
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/export/:dataset', validateParams(exportDatasetParams), validateQuery(exportMonthsQuery), async (req, res) => {
  try {
    const { dataset } = req.params;
    const { months = 6 } = req.query;

    const DATASETS = {
      // ── Revenue ──
      'revenue-monthly': {
        label: 'รายได้รายเดือน',
        fn: () => dw.getRevenueTrend(Math.ceil(months / 12) || 1),
      },
      'revenue-daily': {
        label: 'รายได้รายวัน',
        fn: () => getMV('mv_daily_revenue') || [],
      },
      'revenue-department': {
        label: 'รายได้แยกแผนก',
        fn: () => getMV('mv_monthly_dept_revenue') || [],
      },
      'revenue-payer': {
        label: 'รายได้แยกสิทธิ์',
        fn: () => getMV('mv_payer_revenue') || [],
      },

      // ── Clinical ──
      'ipd-summary': {
        label: 'สรุป IPD (Ward/Bed/LOS)',
        fn: () => getMV('mv_ipd_summary') || [],
      },
      'ipd-trend': {
        label: 'IPD Trend (Monthly)',
        fn: () => dw.getIPDTrend(Math.ceil(months / 12) || 1),
      },
      'er-trend': {
        label: 'ER Trend',
        fn: () => dw.getERTrend(Number(months) || 6),
      },
      'opd-wait-time': {
        label: 'OPD Wait Time',
        fn: () => getMV('mv_opd_wait_time') || [],
      },
      'top-diseases': {
        label: 'Top Diseases',
        fn: () => getMV('mv_top_diseases') || [],
      },
      'coding-audit': {
        label: 'Coding Audit',
        fn: () => getMV('mv_coding_audit') || [],
      },

      // ── Warehouse ──
      'yoy-comparison': {
        label: 'Year-over-Year Comparison',
        fn: () => dw.getYoYComparison(),
      },
    };

    const ds = DATASETS[dataset];
    if (!ds) {
      return res.status(400).json({
        error: `Unknown dataset: ${dataset}`,
        available: Object.keys(DATASETS).map(k => ({ id: k, label: DATASETS[k].label })),
      });
    }

    const rows = await ds.fn();
    if (!rows || (Array.isArray(rows) && rows.length === 0)) {
      return res.status(404).json({ error: 'No data available for this dataset' });
    }

    const data = Array.isArray(rows) ? rows : (rows.data || rows.trend || [rows]);
    if (!data.length) return res.status(404).json({ error: 'Empty dataset' });

    // Build CSV
    const headers = Object.keys(data[0]);
    const csvLines = [
      // BOM for Excel Thai support + header
      headers.join(','),
      ...data.map(row =>
        headers.map(h => {
          const v = row[h];
          if (v == null) return '';
          const s = String(v);
          return s.includes(',') || s.includes('"') || s.includes('\n')
            ? `"${s.replace(/"/g, '""')}"` : s;
        }).join(',')
      ),
    ];

    const csv = '\uFEFF' + csvLines.join('\r\n');
    const filename = `BCH360_${dataset}_${new Date().toISOString().split('T')[0]}.csv`;

    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="${filename}"`);
    res.send(csv);
  } catch (err) {
    logger.error('Export failed', { error: err.message, dataset: req.params.dataset });
    safeError(res, err, 'Executive');
  }
});

// ── List available datasets ──
router.get('/export', (req, res) => {
  res.json({
    datasets: [
      { id: 'revenue-monthly', label: 'รายได้รายเดือน', icon: '💰' },
      { id: 'revenue-daily', label: 'รายได้รายวัน (MV)', icon: '📅' },
      { id: 'revenue-department', label: 'รายได้แยกแผนก', icon: '🏢' },
      { id: 'revenue-payer', label: 'รายได้แยกสิทธิ์', icon: '💳' },
      { id: 'ipd-summary', label: 'สรุปผู้ป่วยใน', icon: '🏥' },
      { id: 'ipd-trend', label: 'IPD Trend', icon: '📈' },
      { id: 'er-trend', label: 'ER Trend', icon: '🚑' },
      { id: 'opd-wait-time', label: 'OPD Wait Time', icon: '⏱️' },
      { id: 'top-diseases', label: 'Top Diseases', icon: '🦠' },
      { id: 'coding-audit', label: 'Coding Audit', icon: '📋' },
      { id: 'yoy-comparison', label: 'YoY Comparison', icon: '📊' },
    ],
  });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. BENCHMARK — Compare KPIs vs HA Thailand National Standards
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/benchmark', cached('exec_benchmark_v2', 3600000, async () => {
  // Fetch real data from MVs and warehouse
  const [ipdData, mortalityData, erLWBS, revData] = await Promise.all([
    dbQueryOne(`
      SELECT
        COUNT(*) AS discharges,
        ROUND(AVG(DATEDIFF(ipt.dchdate, ipt.regdate)), 2) AS alos,
        ROUND(AVG(CASE WHEN a.rw > 0 THEN a.rw END), 3) AS cmi,
        ROUND(SUM(CASE WHEN ipt.dchtype IN ('09','9') THEN 1 ELSE 0 END) / COUNT(*) * 100, 2) AS mortality_pct,
        ROUND(SUM(CASE WHEN ipt.dchtype IN ('04','4','06','6') THEN 1 ELSE 0 END) / COUNT(*) * 100, 2) AS ama_pct,
        ROUND(SUM(CASE WHEN TIME(ipt.dchtime) < '12:00:00' AND ipt.dchtime IS NOT NULL THEN 1 ELSE 0 END) / COUNT(*) * 100, 1) AS before_noon_pct,
        ROUND(SUM(CASE WHEN EXISTS (
          SELECT 1 FROM ipt i2 WHERE i2.hn = ipt.hn AND i2.an != ipt.an
            AND i2.regdate BETWEEN ipt.dchdate AND DATE_ADD(ipt.dchdate, INTERVAL 30 DAY)
        ) THEN 1 ELSE 0 END) / COUNT(*) * 100, 2) AS readmit_pct,
        SUM(CASE WHEN ipt.dchdate IS NULL THEN 1 ELSE 0 END) AS current_census
      FROM ipt
      LEFT JOIN an_stat a ON ipt.an = a.an
      WHERE (ipt.dchdate >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH) OR ipt.dchdate IS NULL)
        AND ipt.ward != '06'
    `, [], { timeoutMs: 20000 }),

    // ER LWBS
    dbQueryOne(`
      SELECT
        COUNT(*) AS total_visits,
        ROUND(AVG(CASE WHEN door_to_doctor_second > 0 THEN door_to_doctor_second / 60 END), 1) AS avg_ttd_min,
        ROUND(SUM(CASE WHEN er_dch_type IN ('4','5') THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0) * 100, 2) AS lwbs_pct,
        ROUND(SUM(CASE WHEN er_emergency_type IN ('1','2') THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0) * 100, 1) AS critical_pct
      FROM er_regist WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
    `, [], { timeoutMs: 10000 }),

    // (bed count removed — uses KPI.ipd.total_beds = 120)
    Promise.resolve(null),

    // Revenue collection
    dbQueryOne(`
      SELECT
        ROUND(SUM(income)) AS total_income,
        ROUND(SUM(paid_money)) AS total_paid,
        ROUND(SUM(paid_money) / NULLIF(SUM(income), 0) * 100, 1) AS collection_rate
      FROM vn_stat WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH) AND income > 0
    `, [], { timeoutMs: 10000 }),
  ]);

  const totalBeds = 120; // เตียงจริง BCH
  const occupancy = ipdData?.current_census
    ? Math.round((Number(ipdData.current_census) / totalBeds) * 100)
    : null;

  // ── HA Thailand National Benchmarks (รพ.ชุมชน ระดับ F2) ──
  const benchmarks = [
    {
      category: 'Clinical Quality',
      icon: '🏥',
      indicators: [
        { name: 'อัตราตาย (Mortality Rate)', unit: '%', hospital: Number(ipdData?.mortality_pct || 0), benchmark: 2.0, target: '<2%', source: 'HA Thailand PCT', direction: 'lower_better' },
        { name: 'Readmission 30 วัน', unit: '%', hospital: Number(ipdData?.readmit_pct || 0), benchmark: 5.0, target: '<5%', source: 'HA Thailand PCT', direction: 'lower_better' },
        { name: 'AMA Rate', unit: '%', hospital: Number(ipdData?.ama_pct || 0), benchmark: 3.0, target: '<3%', source: 'HA Thailand ENV', direction: 'lower_better' },
        { name: 'ALOS (วันนอนเฉลี่ย)', unit: 'วัน', hospital: Number(ipdData?.alos || 0), benchmark: KPI.ipd.alos_target_days, target: `<${KPI.ipd.alos_target_days} วัน`, source: 'HA Thailand PCT', direction: 'lower_better' },
        { name: 'CMI (Case Mix Index)', unit: '', hospital: Number(ipdData?.cmi || 0), benchmark: 0.8, target: '>0.8', source: 'สปสช. F2', direction: 'higher_better' },
      ],
    },
    {
      category: 'Patient Safety',
      icon: '🛡️',
      indicators: [
        { name: 'ER LWBS Rate', unit: '%', hospital: Number(mortalityData?.lwbs_pct || 0), benchmark: KPI.er.lwbs_alert_pct, target: `<${KPI.er.lwbs_alert_pct}%`, source: 'ACEP/HA', direction: 'lower_better' },
        { name: 'ER Time to Doctor', unit: 'นาที', hospital: Number(mortalityData?.avg_ttd_min || 0), benchmark: 15, target: '<15 นาที', source: 'ACEP ESI', direction: 'lower_better' },
        { name: 'Discharge ก่อนเที่ยง', unit: '%', hospital: Number(ipdData?.before_noon_pct || 0), benchmark: 50, target: '>50%', source: 'HA Thailand ENV', direction: 'higher_better' },
      ],
    },
    {
      category: 'Operational Efficiency',
      icon: '⚙️',
      indicators: [
        { name: 'Bed Occupancy Rate', unit: '%', hospital: occupancy, benchmark: KPI.ipd.occupancy_warning_pct, target: `${KPI.ipd.occupancy_warning_pct}-${KPI.ipd.occupancy_critical_pct}%`, source: 'HA Thailand', direction: 'target_range', range: [KPI.ipd.occupancy_warning_pct, KPI.ipd.occupancy_critical_pct] },
        { name: 'ER Critical Triage %', unit: '%', hospital: Number(mortalityData?.critical_pct || 0), benchmark: 15, target: 'Monitor', source: 'Internal', direction: 'monitor' },
      ],
    },
    {
      category: 'Financial Performance',
      icon: '💰',
      indicators: [
        { name: 'Collection Rate', unit: '%', hospital: Number(revData?.collection_rate || 0), benchmark: KPI.finance.collection_rate_good_pct, target: `>${KPI.finance.collection_rate_good_pct}%`, source: 'สธ. รพช.', direction: 'higher_better' },
      ],
    },
  ];

  // Score each indicator
  for (const cat of benchmarks) {
    for (const ind of cat.indicators) {
      if (ind.hospital == null) { ind.status = 'no_data'; ind.score = null; continue; }
      if (ind.direction === 'lower_better') {
        ind.score = ind.hospital <= ind.benchmark ? 100 : Math.max(0, Math.round(100 - ((ind.hospital - ind.benchmark) / ind.benchmark) * 100));
        ind.status = ind.hospital <= ind.benchmark ? 'good' : ind.hospital <= ind.benchmark * 1.5 ? 'warning' : 'critical';
      } else if (ind.direction === 'higher_better') {
        ind.score = ind.hospital >= ind.benchmark ? 100 : Math.max(0, Math.round((ind.hospital / ind.benchmark) * 100));
        ind.status = ind.hospital >= ind.benchmark ? 'good' : ind.hospital >= ind.benchmark * 0.7 ? 'warning' : 'critical';
      } else if (ind.direction === 'target_range') {
        const [lo, hi] = ind.range;
        ind.status = ind.hospital >= lo && ind.hospital <= hi ? 'good' : ind.hospital > hi ? 'critical' : 'warning';
        ind.score = ind.status === 'good' ? 100 : ind.status === 'warning' ? 60 : 30;
      } else {
        ind.status = 'monitor'; ind.score = null;
      }
      ind.gap = ind.direction === 'lower_better'
        ? Math.round((ind.hospital - ind.benchmark) * 100) / 100
        : Math.round((ind.benchmark - ind.hospital) * 100) / 100;
    }
  }

  // Overall score
  const allScores = benchmarks.flatMap(c => c.indicators.map(i => i.score)).filter(s => s != null);
  const overallScore = allScores.length > 0 ? Math.round(allScores.reduce((s, v) => s + v, 0) / allScores.length) : 0;

  return {
    data_source: 'HOSxP XE · HA Thailand Benchmarks',
    timestamp: new Date().toISOString(),
    overall_score: overallScore,
    overall_status: overallScore >= 80 ? 'excellent' : overallScore >= 60 ? 'good' : overallScore >= 40 ? 'needs_improvement' : 'critical',
    categories: benchmarks,
    period: '3 months rolling',
  };
}));

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. AUTO-REPORT — AI-Powered Executive Summary
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/report', cached('exec_report_v2', 1800000, async () => {
  const now = new Date();
  const thDate = now.toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  // Gather all data from MVs and quick queries
  const [dailyRev, deptRev, payerRev, ipdSummary, erData, waitTime, topDiseases, alerts, calibration] = await Promise.all([
    getMV('mv_daily_revenue'),
    getMV('mv_monthly_dept_revenue'),
    getMV('mv_payer_revenue'),
    getMV('mv_ipd_summary'),
    getMV('mv_er_daily'),
    getMV('mv_opd_wait_time'),
    getMV('mv_top_diseases'),
    (async () => { try { return getAlertStatus(); } catch { return null; } })(),
    (async () => { try { return getCalibrationMeta(); } catch { return null; } })(),
  ]);

  // ── Revenue Section ──
  const todayRev = (dailyRev || []).find(r => r.vstdate === now.toISOString().split('T')[0]);
  const yesterdayRev = (dailyRev || []).find(r => {
    const y = new Date(now); y.setDate(y.getDate() - 1);
    return r.vstdate === y.toISOString().split('T')[0];
  });

  const monthlyRevTotal = (dailyRev || [])
    .filter(r => r.vstdate?.startsWith(now.toISOString().substring(0, 7)))
    .reduce((s, r) => s + Number(r.total_revenue || r.revenue || 0), 0);

  // ── IPD Section ──
  const ipdRows = ipdSummary || [];
  const totalOccupied = ipdRows.reduce((s, r) => s + Number(r.current_patients || r.occupied || 0), 0);
  const totalBeds = 120; // เตียงจริง BCH
  const avgLOS = ipdRows.length > 0 ? (ipdRows.reduce((s, r) => s + Number(r.avg_los || 0), 0) / ipdRows.length) : 0;

  // ── Top Departments ──
  const topDepts = (deptRev || [])
    .sort((a, b) => Number(b.revenue || 0) - Number(a.revenue || 0))
    .slice(0, 5)
    .map(d => ({ dept: d.department || d.dept_name || d.main_dep, revenue: Number(d.revenue || 0), visits: Number(d.visits || d.visit_count || 0) }));

  // ── Top Payers ──
  const topPayers = (payerRev || [])
    .sort((a, b) => Number(b.revenue || 0) - Number(a.revenue || 0))
    .slice(0, 5)
    .map(p => ({ payer: p.payer_name || p.pttype_name || p.name, revenue: Number(p.revenue || 0) }));

  // ── ER ──
  const todayER = (erData || []).find(r => r.vstdate === now.toISOString().split('T')[0]);

  // ── Alerts ──
  const activeAlerts = alerts?.active_alerts || [];
  const criticalAlerts = activeAlerts.filter(a => a.severity === 'critical');

  // ── Build Report Sections ──
  const fmtB = v => v >= 1e6 ? `฿${(v / 1e6).toFixed(2)}M` : v >= 1e3 ? `฿${(v / 1e3).toFixed(0)}K` : `฿${v}`;

  const report = {
    title: `📊 BCH 360° Executive Report`,
    subtitle: thDate,
    generated_at: now.toISOString(),
    data_source: 'HOSxP XE · Materialized Views · Data Warehouse',

    // ── Executive Summary ──
    executive_summary: {
      revenue_today: Number(todayRev?.total_revenue || todayRev?.revenue || 0),
      revenue_yesterday: Number(yesterdayRev?.total_revenue || yesterdayRev?.revenue || 0),
      revenue_mtd: monthlyRevTotal,
      visits_today: Number(todayRev?.total_visits || todayRev?.visits || 0),
      ipd_occupancy_pct: totalBeds > 0 ? Math.round((totalOccupied / totalBeds) * 100) : 0,
      ipd_census: totalOccupied,
      avg_los: Math.round(avgLOS * 10) / 10,
      er_visits_today: Number(todayER?.total_visits || todayER?.visits || 0),
      system_alerts: activeAlerts.length,
      critical_alerts: criticalAlerts.length,
    },

    // ── Revenue Analysis ──
    revenue: {
      today: fmtB(Number(todayRev?.total_revenue || todayRev?.revenue || 0)),
      yesterday: fmtB(Number(yesterdayRev?.total_revenue || yesterdayRev?.revenue || 0)),
      month_to_date: fmtB(monthlyRevTotal),
      top_departments: topDepts,
      top_payers: topPayers,
    },

    // ── Clinical Operations ──
    clinical: {
      ipd_census: totalOccupied,
      total_beds: totalBeds,
      occupancy_pct: totalBeds > 0 ? Math.round((totalOccupied / totalBeds) * 100) : 0,
      avg_los_days: Math.round(avgLOS * 10) / 10,
      er_visits: Number(todayER?.total_visits || todayER?.visits || 0),
    },

    // ── Top Diagnoses ──
    top_diseases: (topDiseases || []).slice(0, 10).map(d => ({
      icd10: d.icd10 || d.code,
      name: d.name || d.tname || d.name,
      count: Number(d.visit_count || d.count || d.cnt || 0),
    })),

    // ── System Health ──
    system: {
      status: criticalAlerts.length > 0 ? 'critical' : activeAlerts.length > 0 ? 'warning' : 'healthy',
      alerts: activeAlerts.map(a => ({ severity: a.severity, name: a.name, message: a.message })),
      ai_calibration: calibration?.last_calibrated ? 'active' : 'pending',
      last_calibrated: calibration?.last_calibrated || null,
    },

    // ── Action Items ──
    action_items: _generateActionItems({
      occupancy: totalBeds > 0 ? (totalOccupied / totalBeds) * 100 : 0,
      avgLOS,
      criticalAlerts,
      monthlyRevTotal,
    }),
  };

  return report;
}));

function _generateActionItems({ occupancy, avgLOS, criticalAlerts, monthlyRevTotal }) {
  const items = [];

  if (occupancy > KPI.ipd.occupancy_critical_pct) {
    items.push({ priority: 'critical', icon: '🔴', action: `Bed occupancy ${Math.round(occupancy)}% เกิน ${KPI.ipd.occupancy_critical_pct}% — เร่ง discharge planning` });
  } else if (occupancy > KPI.ipd.occupancy_warning_pct) {
    items.push({ priority: 'warning', icon: '🟡', action: `Bed occupancy ${Math.round(occupancy)}% ใกล้เต็ม — เตรียมแผนรับมือ` });
  }

  if (avgLOS > KPI.ipd.alos_target_days) {
    items.push({ priority: 'warning', icon: '🟡', action: `ALOS ${avgLOS.toFixed(1)} วัน เกิน target ${KPI.ipd.alos_target_days} วัน — ทบทวน discharge criteria` });
  }

  if (criticalAlerts.length > 0) {
    items.push({ priority: 'critical', icon: '🔴', action: `${criticalAlerts.length} critical system alert(s) — ตรวจสอบ /api/system/alerts` });
  }

  if (items.length === 0) {
    items.push({ priority: 'info', icon: '✅', action: 'ไม่มีเรื่องเร่งด่วน — ทุกตัวชี้วัดอยู่ในเกณฑ์ปกติ' });
  }

  return items;
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. ENHANCED BSC — Full Balanced Scorecard with Trends
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
router.get('/bsc', cached('exec_bsc_v3', 1800000, async () => {
  const [financial, ipdStats, erStats, staffStats, revTrend] = await Promise.all([
    dbQueryOne(`
      SELECT ROUND(SUM(income)) AS revenue, ROUND(SUM(paid_money)) AS collected,
        ROUND(SUM(paid_money) / NULLIF(SUM(income), 0) * 100, 1) AS collection_rate,
        COUNT(DISTINCT vn) AS visits, COUNT(DISTINCT hn) AS patients
      FROM vn_stat WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND income > 0
    `, [], { timeoutMs: 10000 }),

    dbQueryOne(`
      SELECT COUNT(*) AS discharges,
        ROUND(AVG(DATEDIFF(ipt.dchdate, ipt.regdate)), 1) AS alos,
        ROUND(AVG(CASE WHEN a.rw > 0 THEN a.rw END), 3) AS cmi,
        ROUND(SUM(CASE WHEN ipt.dchtype IN ('09','9') THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0) * 100, 2) AS mortality_pct,
        ROUND(SUM(CASE WHEN TIME(ipt.dchtime) < '12:00:00' AND ipt.dchtime IS NOT NULL THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0) * 100, 1) AS dch_before_noon_pct
      FROM ipt LEFT JOIN an_stat a ON ipt.an = a.an
      WHERE ipt.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND ipt.dchdate IS NOT NULL AND ipt.ward != '06'
    `, [], { timeoutMs: 15000 }),

    dbQueryOne(`
      SELECT COUNT(*) AS visits,
        ROUND(AVG(CASE WHEN door_to_doctor_second > 0 THEN door_to_doctor_second / 60 END), 1) AS avg_ttd_min,
        ROUND(SUM(CASE WHEN er_dch_type IN ('4','5') THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0) * 100, 2) AS lwbs_pct
      FROM er_regist WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `, [], { timeoutMs: 10000 }),

    dbQueryOne(`
      SELECT COUNT(DISTINCT doctor) AS doctors, COUNT(DISTINCT staff) AS staff
      FROM ovst FORCE INDEX (ix_vstdate)
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND doctor IS NOT NULL AND doctor != ''
    `, [], { timeoutMs: 10000 }),

    // Revenue trend (last 6 months from warehouse)
    (async () => { try { return dw.getRevenueTrend(1); } catch { return []; } })(),
  ]);

  // Score calculations (0-100)
  const finScore = Math.min(100, Math.round(Number(financial?.collection_rate || 0)));
  const clinScore = Math.min(100, Math.max(0, Math.round(
    100 - (Number(ipdStats?.mortality_pct || 0)) * 15 - Math.max(0, (Number(ipdStats?.alos || 4) - KPI.ipd.alos_target_days)) * 10
  )));
  const opsScore = Math.min(100, Math.max(0, Math.round(
    (Number(ipdStats?.dch_before_noon_pct || 50)) * 0.5 + (100 - Math.min(100, Number(erStats?.avg_ttd_min || 15) * 3)) * 0.5
  )));
  const growthScore = Math.min(100, Math.round(Number(staffStats?.doctors || 0) * 3 + Number(staffStats?.staff || 0) * 0.5));
  const overallScore = Math.round((finScore + clinScore + opsScore + growthScore) / 4);

  return {
    data_source: 'HOSxP XE · Balanced Scorecard',
    timestamp: new Date().toISOString(),
    period: '30 days rolling',
    overall_score: overallScore,
    overall_grade: overallScore >= 85 ? 'A' : overallScore >= 70 ? 'B' : overallScore >= 55 ? 'C' : overallScore >= 40 ? 'D' : 'F',

    perspectives: [
      {
        id: 'financial', name: 'Financial (การเงิน)', icon: '💰', score: finScore,
        grade: finScore >= 85 ? 'A' : finScore >= 70 ? 'B' : finScore >= 55 ? 'C' : 'D',
        kpis: [
          { name: 'รายได้ 30 วัน', value: Number(financial?.revenue || 0), format: 'currency' },
          { name: 'อัตราจัดเก็บ', value: Number(financial?.collection_rate || 0), format: 'pct', target: KPI.finance.collection_rate_good_pct },
          { name: 'จำนวน Visit', value: Number(financial?.visits || 0), format: 'number' },
          { name: 'ผู้ป่วยไม่ซ้ำ', value: Number(financial?.patients || 0), format: 'number' },
        ],
      },
      {
        id: 'clinical', name: 'Clinical Quality (คุณภาพ)', icon: '🏥', score: clinScore,
        grade: clinScore >= 85 ? 'A' : clinScore >= 70 ? 'B' : clinScore >= 55 ? 'C' : 'D',
        kpis: [
          { name: 'อัตราตาย', value: Number(ipdStats?.mortality_pct || 0), format: 'pct', target: 2.0, lower_better: true },
          { name: 'ALOS', value: Number(ipdStats?.alos || 0), format: 'decimal', unit: 'วัน', target: KPI.ipd.alos_target_days, lower_better: true },
          { name: 'CMI', value: Number(ipdStats?.cmi || 0), format: 'decimal', target: 0.8 },
          { name: 'Discharge จำนวน', value: Number(ipdStats?.discharges || 0), format: 'number' },
        ],
      },
      {
        id: 'operations', name: 'Operations (ปฏิบัติการ)', icon: '⚙️', score: opsScore,
        grade: opsScore >= 85 ? 'A' : opsScore >= 70 ? 'B' : opsScore >= 55 ? 'C' : 'D',
        kpis: [
          { name: 'Discharge ก่อนเที่ยง', value: Number(ipdStats?.dch_before_noon_pct || 0), format: 'pct', target: 50 },
          { name: 'ER TTD', value: Number(erStats?.avg_ttd_min || 0), format: 'decimal', unit: 'นาที', target: 15, lower_better: true },
          { name: 'ER LWBS', value: Number(erStats?.lwbs_pct || 0), format: 'pct', target: KPI.er.lwbs_alert_pct, lower_better: true },
          { name: 'ER Visits (30d)', value: Number(erStats?.visits || 0), format: 'number' },
        ],
      },
      {
        id: 'growth', name: 'Learning & Growth (เติบโต)', icon: '📚', score: growthScore,
        grade: growthScore >= 85 ? 'A' : growthScore >= 70 ? 'B' : growthScore >= 55 ? 'C' : 'D',
        kpis: [
          { name: 'แพทย์ปฏิบัติงาน', value: Number(staffStats?.doctors || 0), format: 'number' },
          { name: 'เจ้าหน้าที่ทั้งหมด', value: Number(staffStats?.staff || 0), format: 'number' },
        ],
      },
    ],

    revenue_trend: (revTrend || []).slice(-12),
  };
}));

export default router;
