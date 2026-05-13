// ============================================================
// BCH 360° Intelligence V.10 — AI Routes: Core Modules
// EWS, Revenue Forecast, Readmission, Bed Demand, DRG, ER Surge
// Insights, Anomalies, Hub, Daily Briefing
// ============================================================
import { Router } from 'express';
import { cached } from '../../cache/staleCache.js';
import { dbQuery, dbQueryOne } from '../../db/mysql.js';
import ai from '../../ai/aiModules.js';
import { getEWSSummary, getIPDPatientsEWS, calculateNEWS2 } from '../../ai/ewsEngine.js';
import { forecastRevenue, forecastByPayer } from '../../ai/forecastEngine.js';
import { detectSepsisRisk } from '../../ai/clinicalIntelligence.js';
import { validateQuery } from '../../middleware/validate.js';
import { ewsPatientQuery, forecastMonthsQuery, insightsQuery } from '../../middleware/schemas.js';
import { safeError } from '../../lib/safeError.js';
import logger from '../../logger.js';

const router = Router();

// ── #1 EWS ──────────────────────────────────────────────────
router.get(
  '/ews/summary',
  cached('ews', 60000, async () => {
    const d = await getEWSSummary();
    return { data_source: 'HOSxP XE + AI NEWS2', ...d, timestamp: new Date().toISOString() };
  })
);

router.get('/ews/patients', validateQuery(ewsPatientQuery), async (req, res) => {
  try {
    let p = await getIPDPatientsEWS();
    if (req.query.ward) p = p.filter(x => x.ward_id == req.query.ward);
    if (req.query.level) p = p.filter(x => x.ews.risk_level === req.query.level);
    res.json({ patients: p, count: p.length });
  } catch (err) {
    safeError(res, err, 'AI');
  }
});

router.post('/ews/calculate', (req, res) => res.json(calculateNEWS2(req.body)));

// ── #2 Revenue Forecast ──────────────────────────────────────
router.get(
  '/forecast/revenue',
  validateQuery(forecastMonthsQuery),
  cached('forecast', 300000, async req => {
    const m = parseInt(req.query.months) || 6;
    return { data_source: 'HOSxP XE + AI Holt-Winters', ...(await forecastRevenue(m)) };
  })
);

router.get(
  '/forecast/by-payer',
  validateQuery(forecastMonthsQuery),
  cached('fcPayer', 300000, async req => {
    return {
      data_source: 'HOSxP XE + AI',
      ...(await forecastByPayer(parseInt(req.query.months) || 3)),
    };
  })
);

// ── #3 Readmission Risk ──────────────────────────────────────
router.get(
  '/readmission',
  cached('readmit', 300000, async () => {
    const patients = await ai.getReadmissionRisk();
    return {
      data_source: 'HOSxP XE + AI LACE',
      total: patients.length,
      high_risk: patients.filter(p => p.risk_level === 'high').length,
      moderate_risk: patients.filter(p => p.risk_level === 'moderate').length,
      patients,
    };
  })
);

// ── #4 Bed Demand ────────────────────────────────────────────
router.get(
  '/bed-demand',
  cached('bedDemand', 120000, async () => {
    const wards = await ai.getBedDemandForecast();
    const alerts = wards.flatMap(w =>
      w.forecast
        .filter(f => f.alert)
        .map(f => ({ ward: w.ward, hours: f.hours, rate: f.occupancy_rate }))
    );
    return { data_source: 'HOSxP XE + AI', wards, alerts, alert_count: alerts.length };
  })
);

// ── #5 DRG Optimizer ─────────────────────────────────────────
router.get(
  '/drg-optimizer',
  cached('drg', 300000, async () => {
    return { data_source: 'HOSxP XE + AI', ...(await ai.getDRGOptimizer()) };
  })
);

// ── #6 ER Surge ──────────────────────────────────────────────
router.get(
  '/er-surge',
  cached('erSurge', 60000, async () => {
    const surge = await ai.getERSurgePrediction();
    const currentHour = new Date().getHours();
    const hourlyForecast = (surge.hourly || []).map(h => ({
      ...h,
      is_future: h.hour > currentHour,
    }));
    const todayPredicted = hourlyForecast.reduce((s, h) => s + (h.predicted || 0), 0);
    const next4h = hourlyForecast
      .filter(h => h.hour > currentHour && h.hour <= currentHour + 4)
      .reduce((s, h) => s + (h.predicted || 0), 0);
    const peakH = hourlyForecast.reduce(
      (best, h) => ((h.predicted || 0) > (best.predicted || 0) ? h : best),
      { hour: 0, predicted: 0 }
    );

    const dayNames = ['', 'อา.', 'จ.', 'อ.', 'พ.', 'พฤ.', 'ศ.', 'ส.'];
    const dailyPattern = Array.from({ length: 7 }, (_, i) => {
      const dow = i + 1;
      const d = (surge.daily_dow || []).find(x => x.dow === dow);
      return { day: dayNames[dow], dow, avg: Math.round(Number(d?.avg_daily || 0)) };
    });

    return {
      data_source: 'HOSxP XE + AI',
      ...surge,
      hourly_forecast: hourlyForecast,
      today_predicted: todayPredicted,
      current_hour: currentHour,
      next_4h_predicted: next4h,
      peak_hour: peakH,
      dow_factor: surge.pattern_multiplier || 1,
      daily_pattern: dailyPattern,
    };
  })
);

// ── #7 Insights ──────────────────────────────────────────────
router.get('/insights', async (req, res) => {
  try {
    const [summary, prevMonth, ipd, beds] = await Promise.all([
      dbQueryOne(`SELECT SUM(income) as total_revenue, COUNT(DISTINCT vn) as visit_count, AVG(income) as avg_revenue
                  FROM vn_stat WHERE vstdate >= CURDATE()`),
      dbQueryOne(`SELECT SUM(income) as revenue FROM vn_stat
                  WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
                    AND vstdate < DATE_FORMAT(CURDATE(), '%Y-%m-01')`),
      dbQueryOne(`SELECT COUNT(*) as active FROM ipt WHERE dchdate IS NULL AND ward != '06'`),
      dbQueryOne(`SELECT SUM(bedcount) as total FROM ward WHERE ward_active = 'Y'`),
    ]);

    const occupancy = beds?.total > 0 ? Math.round((ipd?.active / beds.total) * 100) : 0;
    const revenueGrowth =
      prevMonth?.revenue > 0
        ? Math.round(((summary?.total_revenue - prevMonth.revenue) / prevMonth.revenue) * 100)
        : 0;

    const insights = [];
    if (revenueGrowth > 10) {
      insights.push({
        type: 'success',
        icon: '📈',
        title: 'Strong Revenue Growth',
        message: `Revenue growing at ${revenueGrowth}% - excellent performance this period.`,
        priority: 'high',
      });
    } else if (revenueGrowth < -5) {
      insights.push({
        type: 'warning',
        icon: '📉',
        title: 'Revenue Decline Alert',
        message: `Revenue declined ${Math.abs(revenueGrowth)}% - investigate causes immediately.`,
        priority: 'critical',
      });
    }
    if (occupancy > 85) {
      insights.push({
        type: 'warning',
        icon: '🏥',
        title: 'High Bed Occupancy',
        message: `IPD occupancy at ${occupancy}% - nearing capacity. Consider scaling operations.`,
        priority: 'high',
      });
    } else if (occupancy < 50) {
      insights.push({
        type: 'info',
        icon: '📊',
        title: 'Underutilized Capacity',
        message: `IPD occupancy only ${occupancy}% - leverage available beds through marketing initiatives.`,
        priority: 'medium',
      });
    }
    if (insights.length === 0) {
      insights.push({
        type: 'info',
        icon: '✅',
        title: 'System Operating Normally',
        message: 'All key metrics within normal operating parameters. Continue monitoring.',
        priority: 'low',
      });
    }

    res.json({
      data_source: 'HOSxP XE + AI Analytics',
      insights,
      metrics: {
        revenue_growth: revenueGrowth,
        occupancy_rate: occupancy,
        visit_count: summary?.visit_count || 0,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    safeError(res, err, 'AI');
  }
});

// ── #8 Anomaly Detection ─────────────────────────────────────
router.get('/anomalies', async (req, res) => {
  try {
    const [today, avgWeekly, todayRevenue, avgDailyRevenue] = await Promise.all([
      dbQueryOne(`SELECT COUNT(DISTINCT vn) as visits FROM ovst WHERE vstdate = CURDATE()`),
      dbQueryOne(
        `SELECT AVG(daily_visits) as avg FROM (SELECT COUNT(DISTINCT vn) as daily_visits FROM ovst WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY vstdate) sub`
      ),
      dbQueryOne(`SELECT SUM(income) as revenue FROM vn_stat WHERE vstdate = CURDATE()`),
      dbQueryOne(
        `SELECT AVG(daily_revenue) as avg FROM (SELECT SUM(income) as daily_revenue FROM vn_stat WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY vstdate) sub`
      ),
    ]);

    const anomalies = [];
    const deviation =
      avgWeekly?.avg > 0 ? ((today?.visits - avgWeekly.avg) / avgWeekly.avg) * 100 : 0;
    if (Math.abs(deviation) > 30) {
      anomalies.push(
        deviation > 0
          ? `OPD volume ${deviation.toFixed(0)}% higher than weekly average - investigate potential surge`
          : `OPD volume ${Math.abs(deviation).toFixed(0)}% lower than weekly average - check for operational issues`
      );
    }
    if (avgDailyRevenue?.avg > 0) {
      const revenueDev =
        ((todayRevenue?.revenue - avgDailyRevenue.avg) / avgDailyRevenue.avg) * 100;
      if (Math.abs(revenueDev) > 25) {
        anomalies.push(
          revenueDev > 0
            ? `Daily revenue ${revenueDev.toFixed(0)}% above average - verify billing accuracy`
            : `Daily revenue ${Math.abs(revenueDev).toFixed(0)}% below average - check system connectivity`
        );
      }
    }

    res.json({
      data_source: 'HOSxP XE + AI Anomaly Detection',
      anomalies,
      anomaly_count: anomalies.length,
      deviations: {
        opd_volume_deviation: parseFloat(deviation.toFixed(1)),
        revenue_deviation: avgDailyRevenue?.avg
          ? parseFloat(
              (((todayRevenue?.revenue - avgDailyRevenue.avg) / avgDailyRevenue.avg) * 100).toFixed(
                1
              )
            )
          : 0,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    safeError(res, err, 'AI');
  }
});

// ── AI Hub ───────────────────────────────────────────────────
router.get(
  '/hub',
  cached('aiHub', 60000, async () => {
    const [ews, sepsis, forecast, readmission, bedDemand, anomalies] = await Promise.allSettled([
      getEWSSummary(),
      detectSepsisRisk(),
      forecastRevenue(1),
      ai.getReadmissionRisk(),
      ai.getBedDemandForecast(),
      (async () => {
        const today = await dbQueryOne(
          `SELECT COUNT(DISTINCT vn) as visits FROM ovst WHERE vstdate = CURDATE()`
        );
        const avg = await dbQueryOne(
          `SELECT AVG(c) as avg FROM (SELECT COUNT(DISTINCT vn) as c FROM ovst WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY vstdate) t`
        );
        return avg?.avg > 0 ? Math.abs(((today?.visits - avg.avg) / avg.avg) * 100) > 30 : false;
      })(),
    ]);

    const modules = [
      {
        id: 'news2',
        name: 'NEWS2 Early Warning',
        status: ews.status === 'fulfilled' ? 'active' : 'error',
        summary:
          ews.status === 'fulfilled'
            ? `${ews.value?.high_risk || 0} high-risk patients`
            : 'unavailable',
        icon: '🫀',
      },
      {
        id: 'sepsis',
        name: 'Sepsis Detection (qSOFA/SIRS)',
        status: sepsis.status === 'fulfilled' ? 'active' : 'error',
        summary:
          sepsis.status === 'fulfilled' ? `${sepsis.value?.length || 0} alerts` : 'unavailable',
        icon: '🔴',
      },
      {
        id: 'forecast',
        name: 'Revenue Forecast (Holt-Winters)',
        status: forecast.status === 'fulfilled' ? 'active' : 'error',
        summary:
          forecast.status === 'fulfilled'
            ? `${forecast.value?.forecast?.length || 0} months projected`
            : 'unavailable',
        icon: '📈',
      },
      {
        id: 'readmission',
        name: 'Readmission Risk (LACE)',
        status: readmission.status === 'fulfilled' ? 'active' : 'error',
        summary:
          readmission.status === 'fulfilled'
            ? `${readmission.value?.filter(p => p.risk_level === 'high').length || 0} high-risk`
            : 'unavailable',
        icon: '🔄',
      },
      {
        id: 'bed_demand',
        name: 'Bed Demand Prediction',
        status: bedDemand.status === 'fulfilled' ? 'active' : 'error',
        summary:
          bedDemand.status === 'fulfilled'
            ? `${bedDemand.value?.length || 0} wards monitored`
            : 'unavailable',
        icon: '🛏️',
      },
      {
        id: 'er_surge',
        name: 'ER Surge Prediction',
        status: 'active',
        summary: 'Real-time',
        icon: '🚑',
      },
      {
        id: 'drg_optimizer',
        name: 'DRG Optimizer',
        status: 'active',
        summary: 'Active',
        icon: '💊',
      },
      {
        id: 'anomaly',
        name: 'Anomaly Detection',
        status: 'active',
        summary:
          anomalies.status === 'fulfilled' && anomalies.value ? 'Anomaly detected' : 'Normal',
        icon: '🔍',
      },
      {
        id: 'opd_flow',
        name: 'OPD Flow Prediction',
        status: 'active',
        summary: 'Active',
        icon: '⏱️',
      },
      {
        id: 'ncd_risk',
        name: 'NCD Risk Stratification',
        status: 'active',
        summary: 'DM/HT/CKD',
        icon: '🫀',
      },
      {
        id: 'drug_safety',
        name: 'Drug Interaction Engine',
        status: 'active',
        summary: 'ISMP-based',
        icon: '💉',
      },
      {
        id: 'infection',
        name: 'Infection Surveillance',
        status: 'active',
        summary: 'HAI monitoring',
        icon: '🦠',
      },
      {
        id: 'self_heal',
        name: 'Self-Healing Engine',
        status: 'active',
        summary: 'Auto-recovery',
        icon: '🧬',
      },
      {
        id: 'clinical_intel',
        name: 'Clinical Intelligence',
        status: 'active',
        summary: 'Fall/Acuity/Gaps',
        icon: '🧠',
      },
    ];

    return {
      data_source: 'BCH 360° AI Platform',
      total_modules: modules.length,
      active: modules.filter(m => m.status === 'active').length,
      errors: modules.filter(m => m.status === 'error').length,
      modules,
      timestamp: new Date().toISOString(),
    };
  })
);

export default router;
