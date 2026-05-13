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
router.get('/benchmark', cached('exec_benchmark_v6_lwbs_clinical', 3600000, async () => {
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

    // ER LWBS via outcome-based proxy (er_dch_type NULL 100% at BCH).
    dbQueryOne(`
      SELECT
        COUNT(*) AS total_visits,
        ROUND(AVG(CASE WHEN e.door_to_doctor_second > 0 THEN e.door_to_doctor_second / 60 END), 1) AS avg_ttd_min,
        ROUND(SUM(CASE
          WHEN e.door_to_doctor_second IS NULL
           AND e.finish_time IS NOT NULL
           AND TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.finish_time) < 10
           AND NOT EXISTS (SELECT 1 FROM ovst o JOIN an_stat a ON a.hn = o.hn WHERE o.vn = e.vn AND a.regdate = e.vstdate)
           AND NOT EXISTS (SELECT 1 FROM referout r WHERE r.vn = e.vn AND r.refer_date BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY))
           AND NOT EXISTS (SELECT 1 FROM opitemrece p WHERE p.vn = e.vn)
          THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0) * 100, 2) AS lwbs_pct,
        ROUND(SUM(CASE WHEN e.er_emergency_type IN ('1','2') THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0) * 100, 1) AS critical_pct
      FROM er_regist e WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 3 MONTH)
    `, [], { timeoutMs: 15000 }),

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
router.get('/bsc', cached('exec_bsc_v8_kaplan_5perspective', 1800000, async () => {
  // BSC v8 (2026-05-13) — Kaplan-style 5 perspective with strategic weighting.
  //   - Financial 20% — billed/collected/outstanding (existing)
  //   - Customer 25% (NEW) — patient satisfaction + complaint + catchment
  //   - Internal Process / Clinical 35% — mortality + ALOS + Avg RW
  //   - Learning & Growth 20% — training + cert + CQI + turnover
  //   - Operations (deprecated, merged into Internal Process)
  // Sum = 100%. Weight reflects patient-safety-first priority.
  const [financial, ipdStats, erStats, staffStats, satisfaction, complaints, revTrend] = await Promise.all([
    dbQueryOne(`
      SELECT ROUND(SUM(income)) AS revenue, ROUND(SUM(paid_money)) AS collected,
        ROUND(SUM(paid_money) / NULLIF(SUM(income), 0) * 100, 1) AS collection_rate,
        COUNT(DISTINCT vn) AS visits, COUNT(DISTINCT hn) AS patients
      FROM vn_stat WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND income > 0
    `, [], { timeoutMs: 10000 }),

    // Mortality split: overall + unexpected (exclude Z51.5 palliative as best-available DNR proxy).
    // CMI renamed to avg_rw (since SQL is AVG(rw) — not weighted true CMI).
    dbQueryOne(`
      SELECT COUNT(*) AS discharges,
        ROUND(AVG(DATEDIFF(ipt.dchdate, ipt.regdate)), 1) AS alos,
        ROUND(AVG(CASE WHEN a.rw > 0 THEN a.rw END), 3) AS avg_rw,
        ROUND(STDDEV(CASE WHEN a.rw > 0 THEN a.rw END), 3) AS rw_stddev,
        ROUND(SUM(CASE WHEN ipt.dchtype IN ('09','9') THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0) * 100, 2) AS mortality_pct,
        ROUND(SUM(CASE
          WHEN ipt.dchtype IN ('09','9')
           AND NOT EXISTS (
             SELECT 1 FROM iptdiag d WHERE d.an = ipt.an
             AND (d.icd10 LIKE 'Z51.5%' OR d.icd10 = 'Z515')
           )
          THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0) * 100, 2) AS mortality_unexpected_pct,
        ROUND(SUM(CASE WHEN TIME(ipt.dchtime) < '12:00:00' AND ipt.dchtime IS NOT NULL THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0) * 100, 1) AS dch_before_noon_pct
      FROM ipt LEFT JOIN an_stat a ON ipt.an = a.an
      WHERE ipt.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND ipt.dchdate IS NOT NULL AND ipt.ward != '06'
    `, [], { timeoutMs: 20000 }),

    // LWBS via outcome-based proxy — er_dch_type is NULL 100% at BCH, so direct field unusable.
    // Definition: finished visit < 15 min with no doctor contact AND no admit AND no refer.
    dbQueryOne(`
      SELECT COUNT(*) AS visits,
        ROUND(AVG(CASE WHEN e.door_to_doctor_second > 0 THEN e.door_to_doctor_second / 60 END), 1) AS avg_ttd_min,
        ROUND(SUM(CASE
          WHEN e.door_to_doctor_second IS NULL
           AND e.finish_time IS NOT NULL
           AND TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.finish_time) < 10
           AND NOT EXISTS (SELECT 1 FROM ovst o JOIN an_stat a ON a.hn = o.hn WHERE o.vn = e.vn AND a.regdate = e.vstdate)
           AND NOT EXISTS (SELECT 1 FROM referout r WHERE r.vn = e.vn AND r.refer_date BETWEEN e.vstdate AND DATE_ADD(e.vstdate, INTERVAL 1 DAY))
           AND NOT EXISTS (SELECT 1 FROM opitemrece p WHERE p.vn = e.vn)
          THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0) * 100, 2) AS lwbs_pct
      FROM er_regist e WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `, [], { timeoutMs: 15000 }),

    dbQueryOne(`
      SELECT COUNT(DISTINCT doctor) AS doctors, COUNT(DISTINCT staff) AS staff
      FROM ovst FORCE INDEX (ix_vstdate)
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND doctor IS NOT NULL AND doctor != ''
    `, [], { timeoutMs: 10000 }),

    // BSC v8 Customer perspective — Patient Satisfaction from warehouse
    (async () => {
      try {
        const stmt = `SELECT
          COUNT(*) AS response_count,
          ROUND(AVG(overall_rating), 2) AS avg_rating,
          ROUND(SUM(CASE WHEN overall_rating >= 4 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0) * 100, 1) AS satisfied_pct,
          ROUND(SUM(CASE WHEN nps_score >= 9 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0) * 100, 1) AS promoter_pct,
          ROUND(SUM(CASE WHEN nps_score <= 6 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0) * 100, 1) AS detractor_pct
          FROM dw_patient_satisfaction
          WHERE submitted_at >= datetime('now', '-30 days')`;
        return dw.getDb()?.prepare(stmt).get() || null;
      } catch {
        return null;
      }
    })(),

    // BSC v8 — Complaint count (placeholder until complaint registry built)
    Promise.resolve({ count_30d: 0, resolution_avg_days: null }),

    // Revenue trend (last 6 months from warehouse)
    (async () => { try { return dw.getRevenueTrend(1); } catch { return []; } })(),
  ]);

  // ━━ BSC v8 Per-Perspective Score Calculations (0-100) ━━
  // Higher = better. Each perspective uses its own scoring model.

  // 1. Financial — based on collection_rate (target ≥ KPI.finance.collection_rate_good_pct, default 90%)
  const finScore = Math.min(100, Math.round(Number(financial?.collection_rate || 0)));

  // 2. Customer — composite of satisfaction + NPS + complaint
  //    Patient sat satisfied_pct (≥4 stars) contributes 60%
  //    NPS (promoter% - detractor%) normalized to 0-100 contributes 40%
  //    Complaint penalty: -2 points per complaint, max -20
  const satPct = Number(satisfaction?.satisfied_pct || 0);
  const npsValue = Number(satisfaction?.promoter_pct || 0) - Number(satisfaction?.detractor_pct || 0);
  const npsNorm = Math.max(0, Math.min(100, npsValue + 100) / 2); // shift -100..100 → 0..100
  const complaintPenalty = Math.min(20, Number(complaints?.count_30d || 0) * 2);
  const customerScore = satisfaction?.response_count >= 10
    ? Math.max(0, Math.min(100, Math.round(satPct * 0.6 + npsNorm * 0.4 - complaintPenalty)))
    : null; // null = insufficient sample (< 10 responses)

  // 3. Internal Process / Clinical — mortality_unexpected_pct + ALOS gap + ER quality
  //    Uses unexpected mortality (excludes Z51.5) — fairer for case-mix
  const mortalityForScore = Number(ipdStats?.mortality_unexpected_pct ?? ipdStats?.mortality_pct ?? 0);
  const alosGap = Math.max(0, Number(ipdStats?.alos || 4) - KPI.ipd.alos_target_days);
  const ttdScore = 100 - Math.min(100, Number(erStats?.avg_ttd_min || 15) * 3);
  const dchBeforeNoon = Number(ipdStats?.dch_before_noon_pct || 50);
  const internalScore = Math.min(100, Math.max(0, Math.round(
    (100 - mortalityForScore * 15 - alosGap * 10) * 0.5 +
    (ttdScore * 0.3) +
    (dchBeforeNoon * 0.2)
  )));

  // 4. Learning & Growth — composite (training+cert+CQI+turnover from warehouse)
  //    Currently warehouse doesn't track these yet — use stub fallback to staff count.
  //    Note: real metrics require staffing manual entry (Tier 4 work) — see roadmap.
  const trainingHours = 0; // TODO: dw_staff_training table
  const certCompliancePct = null; // TODO: dw_staff_certification table
  const cqiProjectsCount = 0; // TODO: dw_cqi_projects table
  const turnoverPct = null; // TODO: dw_staff_turnover table
  const growthStubScore = Math.min(100, Math.round(Number(staffStats?.doctors || 0) * 3 + Number(staffStats?.staff || 0) * 0.5));
  const growthScore = trainingHours > 0
    ? Math.round((Math.min(100, trainingHours / 10 * 100) * 0.3) + // 10 hr/emp/yr target
                 ((certCompliancePct ?? 50) * 0.3) +
                 (Math.min(100, cqiProjectsCount * 25) * 0.2) +
                 ((100 - Math.min(100, (turnoverPct ?? 15) * 5)) * 0.2))
    : growthStubScore; // fallback until staffing tracker built

  // ━━ Strategic Weighted Overall (sum to 100%) ━━
  //   Internal Process 35% (patient safety first)
  //   Customer 25% (BCH stated content goal)
  //   Financial 20% (เงินบำรุง important but not over-prioritize)
  //   Learning & Growth 20% (long-term sustainability)
  const WEIGHTS = { internal: 0.35, customer: 0.25, financial: 0.20, growth: 0.20 };
  // Customer perspective uses 0 weight if insufficient sample, redistribute to internal
  const effectiveWeights = customerScore == null
    ? { internal: 0.5, customer: 0, financial: 0.25, growth: 0.25 }
    : WEIGHTS;
  const overallScore = Math.round(
    internalScore * effectiveWeights.internal +
    (customerScore ?? 0) * effectiveWeights.customer +
    finScore * effectiveWeights.financial +
    growthScore * effectiveWeights.growth
  );

  const gradeFor = (s) => s >= 85 ? 'A' : s >= 70 ? 'B' : s >= 55 ? 'C' : s >= 40 ? 'D' : 'F';

  return {
    data_source: 'HOSxP XE + warehouse · Balanced Scorecard v8 (Kaplan 4P + Customer)',
    timestamp: new Date().toISOString(),
    period: '30 days rolling',
    version: 'v8',
    overall_score: overallScore,
    overall_grade: gradeFor(overallScore),
    weights: effectiveWeights,
    weights_explanation: customerScore == null
      ? 'Customer perspective skipped (sample size < 10). Weights redistributed to Internal 50% / Financial 25% / Growth 25%.'
      : 'Patient-safety-first: Internal 35% · Customer 25% · Financial 20% · Growth 20%',

    perspectives: [
      {
        id: 'internal',
        name: 'Internal Process / Clinical Quality (กระบวนการภายใน)',
        icon: '🏥',
        weight: effectiveWeights.internal,
        score: internalScore,
        grade: gradeFor(internalScore),
        kpis: [
          { name: 'อัตราตาย (รวม)', value: Number(ipdStats?.mortality_pct || 0), format: 'pct', target: 2.0, lower_better: true, note: 'รวมทุก discharge รหัส 09/9' },
          { name: 'อัตราตาย (ไม่นับ Palliative)', value: Number(ipdStats?.mortality_unexpected_pct || 0), format: 'pct', target: 2.0, lower_better: true, note: 'ตัด Z51.5 (palliative care) ออก — ใกล้กับ unexpected mortality' },
          { name: 'ALOS', value: Number(ipdStats?.alos || 0), format: 'decimal', unit: 'วัน', target: KPI.ipd.alos_target_days, lower_better: true },
          { name: 'Avg RW (CMI proxy)', value: Number(ipdStats?.avg_rw || 0), format: 'decimal', target: 0.8, note: 'AVG(rw) — ไม่ใช่ true CMI' },
          { name: 'RW Stddev', value: Number(ipdStats?.rw_stddev || 0), format: 'decimal', note: 'case-mix variability' },
          { name: 'Discharge ก่อนเที่ยง', value: dchBeforeNoon, format: 'pct', target: 50 },
          { name: 'ER TTD', value: Number(erStats?.avg_ttd_min || 0), format: 'decimal', unit: 'นาที', target: 15, lower_better: true },
          { name: 'ER LWBS (clinical proxy)', value: Number(erStats?.lwbs_pct || 0), format: 'pct', target: KPI.er.lwbs_alert_pct, lower_better: true },
        ],
      },
      {
        id: 'customer',
        name: 'Customer (ผู้รับบริการ)',
        icon: '🤝',
        weight: effectiveWeights.customer,
        score: customerScore,
        grade: customerScore == null ? 'N/A' : gradeFor(customerScore),
        kpis: customerScore == null
          ? [{ name: 'รอข้อมูล', value: null, format: 'text', note: `Patient Satisfaction sample size = ${satisfaction?.response_count || 0} (need ≥ 10)` }]
          : [
              { name: 'ความพึงพอใจ ≥4 ดาว', value: satPct, format: 'pct', target: 85, lower_better: false, note: `n=${satisfaction?.response_count || 0} responses (30d)` },
              { name: 'NPS Score', value: Math.round(npsValue), format: 'number', target: 50, lower_better: false, note: `Promoter ${satisfaction?.promoter_pct || 0}% − Detractor ${satisfaction?.detractor_pct || 0}%` },
              { name: 'คะแนนเฉลี่ย (5 ดาว)', value: Number(satisfaction?.avg_rating || 0), format: 'decimal', target: 4.0, lower_better: false },
              { name: 'ข้อร้องเรียน (30d)', value: Number(complaints?.count_30d || 0), format: 'number', target: 0, lower_better: true, note: 'manual entry — registry pending' },
            ],
      },
      {
        id: 'financial',
        name: 'Financial (การเงิน)',
        icon: '💰',
        weight: effectiveWeights.financial,
        score: finScore,
        grade: gradeFor(finScore),
        kpis: [
          { name: 'รายได้ตามบิล (Billed)', value: Number(financial?.revenue || 0), format: 'currency', note: 'SUM(vn_stat.income)' },
          { name: 'เก็บได้จริง (Collected)', value: Number(financial?.collected || 0), format: 'currency', note: 'SUM(vn_stat.paid_money)' },
          { name: 'ส่วนต่าง (Outstanding)', value: Math.max(0, Number(financial?.revenue || 0) - Number(financial?.collected || 0)), format: 'currency', note: 'ค้างเก็บ' },
          { name: 'อัตราจัดเก็บ', value: Number(financial?.collection_rate || 0), format: 'pct', target: KPI.finance.collection_rate_good_pct, lower_better: false },
          { name: 'จำนวน Visit', value: Number(financial?.visits || 0), format: 'number' },
          { name: 'ผู้ป่วยไม่ซ้ำ', value: Number(financial?.patients || 0), format: 'number' },
        ],
      },
      {
        id: 'growth',
        name: 'Learning & Growth (เติบโต)',
        icon: '📚',
        weight: effectiveWeights.growth,
        score: growthScore,
        grade: gradeFor(growthScore),
        kpis: trainingHours > 0
          ? [
              { name: 'ชั่วโมงอบรม/คน', value: trainingHours, format: 'decimal', target: 10, lower_better: false, note: 'เป้า MoPH ≥10 ชม./คน/ปี' },
              { name: 'Cert ไม่หมดอายุ', value: certCompliancePct, format: 'pct', target: 95, lower_better: false, note: 'ACLS/BLS/NRP' },
              { name: 'CQI Projects', value: cqiProjectsCount, format: 'number', target: 4, lower_better: false, note: 'ต่อ quarter' },
              { name: 'Turnover (12m)', value: turnoverPct, format: 'pct', target: 15, lower_better: true, note: 'เป้า < 15%/ปี' },
            ]
          : [
              { name: 'แพทย์ปฏิบัติงาน (stub)', value: Number(staffStats?.doctors || 0), format: 'number', note: 'fallback metric — real metrics require warehouse staffing tracker' },
              { name: 'เจ้าหน้าที่ทั้งหมด (stub)', value: Number(staffStats?.staff || 0), format: 'number' },
              { name: 'แผน Tier 4', value: 'pending', format: 'text', note: 'dw_staff_training + dw_certification + dw_cqi + dw_turnover tables not yet built' },
            ],
      },
    ],

    revenue_trend: (revTrend || []).slice(-12),
  };
}));

export default router;
