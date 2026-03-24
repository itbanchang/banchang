import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne } from '../db/mysql.js';
import ai from '../ai/aiModules.js';
import { getEWSSummary, getIPDPatientsEWS, calculateNEWS2 } from '../ai/ewsEngine.js';
import { forecastRevenue, forecastByPayer } from '../ai/forecastEngine.js';
import { generateInsights, detectSepsisRisk, analyzeDeterioration, getCriticalLabs, getWardAcuity, identifyFallRisk, getMonitoringGaps, getOperationalEfficiency, getQualityInsights } from '../ai/clinicalIntelligence.js';

const router = Router();

// ============================================================
// 🧠 AI MODULES — 8 Endpoints
// ============================================================

// #1 AI EWS (60s cache)
router.get('/ews/summary', cached('ews', 60000, async () => {
  const d = await getEWSSummary();
  return { data_source: 'HOSxP XE + AI NEWS2', ...d, timestamp: new Date().toISOString() };
}));
router.get('/ews/patients', async (req, res) => {
  try {
    let p = await getIPDPatientsEWS();
    if (req.query.ward) p = p.filter(x => x.ward_id == req.query.ward);
    if (req.query.level) p = p.filter(x => x.ews.risk_level === req.query.level);
    res.json({ patients: p, count: p.length });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
router.post('/ews/calculate', (req, res) => res.json(calculateNEWS2(req.body)));

// #2 AI Revenue Forecast (5min cache)
router.get('/forecast/revenue', cached('forecast', 300000, async (req) => {
  const m = parseInt(req.query.months) || 6;
  return { data_source: 'HOSxP XE + AI Holt-Winters', ...(await forecastRevenue(m)) };
}));
router.get('/forecast/by-payer', cached('fcPayer', 300000, async (req) => {
  return { data_source: 'HOSxP XE + AI', ...(await forecastByPayer(parseInt(req.query.months) || 3)) };
}));

// #3 AI Readmission Risk (5min cache — IPD patient set changes slowly)
router.get('/readmission', cached('readmit', 300000, async () => {
  const patients = await ai.getReadmissionRisk();
  return {
    data_source: 'HOSxP XE + AI LACE',
    total: patients.length,
    high_risk: patients.filter(p => p.risk_level === 'high').length,
    moderate_risk: patients.filter(p => p.risk_level === 'moderate').length,
    patients
  };
}));

// #4 AI Bed Demand (2min cache)
router.get('/bed-demand', cached('bedDemand', 120000, async () => {
  const wards = await ai.getBedDemandForecast();
  const alerts = wards.flatMap(w => w.forecast.filter(f => f.alert).map(f => ({ ward: w.ward, hours: f.hours, rate: f.occupancy_rate })));
  return { data_source: 'HOSxP XE + AI', wards, alerts, alert_count: alerts.length };
}));

// #5 AI DRG Optimizer (5min cache)
router.get('/drg-optimizer', cached('drg', 300000, async () => {
  return { data_source: 'HOSxP XE + AI', ...(await ai.getDRGOptimizer()) };
}));

// #6 AI ER Surge (1min cache)
router.get('/er-surge', cached('erSurge', 60000, async () => {
  const surge = await ai.getERSurgePrediction();
  const currentHour = new Date().getHours();
  const hourlyForecast = (surge.hourly || []).map(h => ({
    ...h, is_future: h.hour > currentHour
  }));
  const todayPredicted = hourlyForecast.reduce((s, h) => s + (h.predicted || 0), 0);
  const next4h = hourlyForecast.filter(h => h.hour > currentHour && h.hour <= currentHour + 4).reduce((s, h) => s + (h.predicted || 0), 0);
  const peakH = hourlyForecast.reduce((best, h) => (h.predicted || 0) > (best.predicted || 0) ? h : best, { hour: 0, predicted: 0 });

  // Day-of-week pattern from real data
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
    daily_pattern: dailyPattern
  };
}));

// #7 AI INSIGHTS — Generate professional insights from current data
router.get('/insights', async (req, res) => {
  try {
    const summary = await dbQueryOne(`
      SELECT 
        SUM(income) as total_revenue,
        COUNT(DISTINCT vn) as visit_count,
        AVG(income) as avg_revenue
      FROM vn_stat
      WHERE vstdate >= CURDATE()
    `);

    const prevMonth = await dbQueryOne(`
      SELECT SUM(income) as revenue
      FROM vn_stat
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 1 MONTH)
        AND vstdate < DATE_FORMAT(CURDATE(), '%Y-%m-01')
    `);

    const ipd = await dbQueryOne(`
      SELECT COUNT(*) as active FROM ipt WHERE dchdate IS NULL AND ward != '06'
    `);

    const beds = await dbQueryOne(`
      SELECT SUM(bedcount) as total FROM ward WHERE ward_active = 'Y'
    `);

    const occupancy = beds?.total > 0 ? Math.round((ipd?.active / beds.total) * 100) : 0;

    const insights = [];
    const revenueGrowth = prevMonth?.revenue > 0 
      ? Math.round(((summary?.total_revenue - prevMonth.revenue) / prevMonth.revenue) * 100)
      : 0;

    // Revenue insights
    if (revenueGrowth > 10) {
      insights.push({
        type: 'success',
        icon: '📈',
        title: 'Strong Revenue Growth',
        message: `Revenue growing at ${revenueGrowth}% - excellent performance this period.`,
        priority: 'high'
      });
    } else if (revenueGrowth < -5) {
      insights.push({
        type: 'warning',
        icon: '📉',
        title: 'Revenue Decline Alert',
        message: `Revenue declined ${Math.abs(revenueGrowth)}% - investigate causes immediately.`,
        priority: 'critical'
      });
    }

    // Occupancy insights
    if (occupancy > 85) {
      insights.push({
        type: 'warning',
        icon: '🏥',
        title: 'High Bed Occupancy',
        message: `IPD occupancy at ${occupancy}% - nearing capacity. Consider scaling operations.`,
        priority: 'high'
      });
    } else if (occupancy < 50) {
      insights.push({
        type: 'info',
        icon: '📊',
        title: 'Underutilized Capacity',
        message: `IPD occupancy only ${occupancy}% - leverage available beds through marketing initiatives.`,
        priority: 'medium'
      });
    }

    // Default insights if none generated
    if (insights.length === 0) {
      insights.push({
        type: 'info',
        icon: '✅',
        title: 'System Operating Normally',
        message: 'All key metrics within normal operating parameters. Continue monitoring.',
        priority: 'low'
      });
    }

    res.json({
      data_source: 'HOSxP XE + AI Analytics',
      insights,
      metrics: {
        revenue_growth: revenueGrowth,
        occupancy_rate: occupancy,
        visit_count: summary?.visit_count || 0
      },
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// #8 AI ANOMALIES — Detect unusual patterns
router.get('/anomalies', async (req, res) => {
  try {
    const today = await dbQueryOne(`
      SELECT COUNT(DISTINCT vn) as visits FROM ovst WHERE vstdate = CURDATE()
    `);

    const avgWeekly = await dbQueryOne(`
      SELECT AVG(daily_visits) as avg FROM (
        SELECT COUNT(DISTINCT vn) as daily_visits 
        FROM ovst 
        WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        GROUP BY vstdate
      ) sub
    `);

    const anomalies = [];
    const deviation = avgWeekly?.avg > 0 
      ? ((today?.visits - avgWeekly.avg) / avgWeekly.avg) * 100
      : 0;

    // Check for unusual visit volume
    if (Math.abs(deviation) > 30) {
      anomalies.push(
        deviation > 0 
          ? `OPD volume ${(deviation).toFixed(0)}% higher than weekly average - investigate potential surge`
          : `OPD volume ${(Math.abs(deviation)).toFixed(0)}% lower than weekly average - check for operational issues`
      );
    }

    // Check for unusual revenue patterns
    const todayRevenue = await dbQueryOne(`
      SELECT SUM(income) as revenue FROM vn_stat WHERE vstdate = CURDATE()
    `);

    const avgDailyRevenue = await dbQueryOne(`
      SELECT AVG(daily_revenue) as avg FROM (
        SELECT SUM(income) as daily_revenue 
        FROM vn_stat 
        WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        GROUP BY vstdate
      ) sub
    `);

    if (avgDailyRevenue?.avg > 0) {
      const revenueDev = ((todayRevenue?.revenue - avgDailyRevenue.avg) / avgDailyRevenue.avg) * 100;
      if (Math.abs(revenueDev) > 25) {
        anomalies.push(
          revenueDev > 0 
            ? `Daily revenue ${(revenueDev).toFixed(0)}% above average - verify billing accuracy`
            : `Daily revenue ${(Math.abs(revenueDev)).toFixed(0)}% below average - check system connectivity`
        );
      }
    }

    res.json({
      data_source: 'HOSxP XE + AI Anomaly Detection',
      anomalies,
      anomaly_count: anomalies.length,
      deviations: {
        opd_volume_deviation: parseFloat(deviation.toFixed(1)),
        revenue_deviation: avgDailyRevenue?.avg ? parseFloat(((todayRevenue?.revenue - avgDailyRevenue.avg) / avgDailyRevenue.avg) * 100).toFixed(1) : 0
      },
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================================
// 🧠 CLINICAL INTELLIGENCE — Premium Decision Support
// ============================================================
router.get('/clinical-insights', async (req, res) => {
    try { res.json({ data_source: 'BCH Clinical Intelligence', ...(await generateInsights(req.query.role || req.user?.role || 'all')) }); }
    catch (err) { res.status(500).json({ error: err.message }); }
});
router.get('/clinical/sepsis', async (req, res) => { try { const d = await detectSepsisRisk(); res.json({ total: d.length, critical: d.filter(a => a.severity === 'critical').length, patients: d }); } catch (e) { res.status(500).json({ error: e.message }); } });
router.get('/clinical/deterioration', async (req, res) => { try { const d = await analyzeDeterioration(); res.json({ total: d.length, patients: d }); } catch (e) { res.status(500).json({ error: e.message }); } });
router.get('/clinical/critical-labs', async (req, res) => { try { const d = await getCriticalLabs(); res.json({ total: d.length, alerts: d }); } catch (e) { res.status(500).json({ error: e.message }); } });
router.get('/clinical/ward-acuity', async (req, res) => { try { const d = await getWardAcuity(); res.json({ total: d.length, wards: d }); } catch (e) { res.status(500).json({ error: e.message }); } });
router.get('/clinical/fall-risk', async (req, res) => { try { const d = await identifyFallRisk(); res.json({ total: d.length, patients: d }); } catch (e) { res.status(500).json({ error: e.message }); } });
router.get('/clinical/monitor-gaps', async (req, res) => { try { const d = await getMonitoringGaps(); res.json({ total: d.length, patients: d }); } catch (e) { res.status(500).json({ error: e.message }); } });
router.get('/clinical/operations', async (req, res) => { try { res.json(await getOperationalEfficiency()); } catch (e) { res.status(500).json({ error: e.message }); } });
router.get('/clinical/quality', async (req, res) => { try { res.json({ indicators: await getQualityInsights() }); } catch (e) { res.status(500).json({ error: e.message }); } });

export default router;
