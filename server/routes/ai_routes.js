import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne } from '../db/mysql.js';
import ai from '../ai/aiModules.js';
import { getEWSSummary, getIPDPatientsEWS, calculateNEWS2 } from '../ai/ewsEngine.js';
import { forecastRevenue, forecastByPayer } from '../ai/forecastEngine.js';

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


export default router;
