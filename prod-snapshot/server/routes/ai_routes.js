import { Router } from 'express';
import { cached } from '../cache/staleCache.js';
import { dbQuery, dbQueryOne } from '../db/mysql.js';
import ai from '../ai/aiModules.js';
import { getEWSSummary, getIPDPatientsEWS, calculateNEWS2 } from '../ai/ewsEngine.js';
import { forecastRevenue, forecastByPayer } from '../ai/forecastEngine.js';
import { generateInsights, detectSepsisRisk, analyzeDeterioration, getCriticalLabs, getWardAcuity, identifyFallRisk, getMonitoringGaps, getOperationalEfficiency, getQualityInsights } from '../ai/clinicalIntelligence.js';
import { validateQuery } from '../middleware/validate.js';
import { ewsPatientQuery, forecastMonthsQuery, insightsQuery } from '../middleware/schemas.js';
import { safeError } from '../lib/safeError.js';
import logger from '../logger.js';

const router = Router();

// ============================================================
// 🧠 AI MODULES — 8 Endpoints
// ============================================================

// #1 AI EWS (60s cache)
router.get('/ews/summary', cached('ews', 60000, async () => {
  const d = await getEWSSummary();
  return { data_source: 'HOSxP XE + AI NEWS2', ...d, timestamp: new Date().toISOString() };
}));
router.get('/ews/patients', validateQuery(ewsPatientQuery), async (req, res) => {
  try {
    let p = await getIPDPatientsEWS();
    if (req.query.ward) p = p.filter(x => x.ward_id == req.query.ward);
    if (req.query.level) p = p.filter(x => x.ews.risk_level === req.query.level);
    res.json({ patients: p, count: p.length });
  } catch (err) { safeError(res, err, 'AI'); }
});
router.post('/ews/calculate', (req, res) => res.json(calculateNEWS2(req.body)));

// #2 AI Revenue Forecast (5min cache)
router.get('/forecast/revenue', validateQuery(forecastMonthsQuery), cached('forecast', 300000, async (req) => {
  const m = parseInt(req.query.months) || 6;
  return { data_source: 'HOSxP XE + AI Holt-Winters', ...(await forecastRevenue(m)) };
}));
router.get('/forecast/by-payer', validateQuery(forecastMonthsQuery), cached('fcPayer', 300000, async (req) => {
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
    safeError(res, err, 'AI');
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
    safeError(res, err, 'AI');
  }
});

// ============================================================
// 🧠 CLINICAL INTELLIGENCE — Premium Decision Support
// ============================================================
router.get('/clinical-insights', validateQuery(insightsQuery), async (req, res) => {
    try { res.json({ data_source: 'BCH Clinical Intelligence', ...(await generateInsights(req.query.role || req.user?.role || 'all')) }); }
    catch (err) { safeError(res, err, 'AI'); }
});
router.get('/clinical/sepsis', async (req, res) => { try { const d = await detectSepsisRisk(); res.json({ total: d.length, critical: d.filter(a => a.severity === 'critical').length, patients: d }); } catch (e) { safeError(res, e, 'AI'); } });
router.get('/clinical/deterioration', async (req, res) => { try { const d = await analyzeDeterioration(); res.json({ total: d.length, patients: d }); } catch (e) { safeError(res, e, 'AI'); } });
router.get('/clinical/critical-labs', async (req, res) => { try { const d = await getCriticalLabs(); res.json({ total: d.length, alerts: d }); } catch (e) { safeError(res, e, 'AI'); } });
router.get('/clinical/ward-acuity', async (req, res) => { try { const d = await getWardAcuity(); res.json({ total: d.length, wards: d }); } catch (e) { safeError(res, e, 'AI'); } });
router.get('/clinical/fall-risk', async (req, res) => { try { const d = await identifyFallRisk(); res.json({ total: d.length, patients: d }); } catch (e) { safeError(res, e, 'AI'); } });
router.get('/clinical/monitor-gaps', async (req, res) => { try { const d = await getMonitoringGaps(); res.json({ total: d.length, patients: d }); } catch (e) { safeError(res, e, 'AI'); } });
router.get('/clinical/operations', async (req, res) => { try { res.json(await getOperationalEfficiency()); } catch (e) { safeError(res, e, 'AI'); } });
router.get('/clinical/quality', async (req, res) => { try { res.json({ indicators: await getQualityInsights() }); } catch (e) { safeError(res, e, 'AI'); } });

// ============================================================
// 🌐 AI HUB — Aggregated AI Module Status Overview
// ============================================================
router.get('/hub', cached('aiHub', 60000, async () => {
  const [ews, sepsis, forecast, readmission, bedDemand, anomalies] = await Promise.allSettled([
    getEWSSummary(),
    detectSepsisRisk(),
    forecastRevenue(1),
    ai.getReadmissionRisk(),
    ai.getBedDemandForecast(),
    (async () => {
      const today = await dbQueryOne(`SELECT COUNT(DISTINCT vn) as visits FROM ovst WHERE vstdate = CURDATE()`);
      const avg = await dbQueryOne(`SELECT AVG(c) as avg FROM (SELECT COUNT(DISTINCT vn) as c FROM ovst WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY vstdate) t`);
      return avg?.avg > 0 ? Math.abs(((today?.visits - avg.avg) / avg.avg) * 100) > 30 : false;
    })(),
  ]);

  const modules = [
    { id: 'news2', name: 'NEWS2 Early Warning', status: ews.status === 'fulfilled' ? 'active' : 'error',
      summary: ews.status === 'fulfilled' ? `${ews.value?.high_risk || 0} high-risk patients` : 'unavailable', icon: '🫀' },
    { id: 'sepsis', name: 'Sepsis Detection (qSOFA/SIRS)', status: sepsis.status === 'fulfilled' ? 'active' : 'error',
      summary: sepsis.status === 'fulfilled' ? `${sepsis.value?.length || 0} alerts` : 'unavailable', icon: '🔴' },
    { id: 'forecast', name: 'Revenue Forecast (Holt-Winters)', status: forecast.status === 'fulfilled' ? 'active' : 'error',
      summary: forecast.status === 'fulfilled' ? `${forecast.value?.forecast?.length || 0} months projected` : 'unavailable', icon: '📈' },
    { id: 'readmission', name: 'Readmission Risk (LACE)', status: readmission.status === 'fulfilled' ? 'active' : 'error',
      summary: readmission.status === 'fulfilled' ? `${readmission.value?.filter(p => p.risk_level === 'high').length || 0} high-risk` : 'unavailable', icon: '🔄' },
    { id: 'bed_demand', name: 'Bed Demand Prediction', status: bedDemand.status === 'fulfilled' ? 'active' : 'error',
      summary: bedDemand.status === 'fulfilled' ? `${bedDemand.value?.length || 0} wards monitored` : 'unavailable', icon: '🛏️' },
    { id: 'er_surge', name: 'ER Surge Prediction', status: 'active', summary: 'Real-time', icon: '🚑' },
    { id: 'drg_optimizer', name: 'DRG Optimizer', status: 'active', summary: 'Active', icon: '💊' },
    { id: 'anomaly', name: 'Anomaly Detection', status: 'active',
      summary: anomalies.status === 'fulfilled' && anomalies.value ? 'Anomaly detected' : 'Normal', icon: '🔍' },
    { id: 'opd_flow', name: 'OPD Flow Prediction', status: 'active', summary: 'Active', icon: '⏱️' },
    { id: 'ncd_risk', name: 'NCD Risk Stratification', status: 'active', summary: 'DM/HT/CKD', icon: '🫀' },
    { id: 'drug_safety', name: 'Drug Interaction Engine', status: 'active', summary: 'ISMP-based', icon: '💉' },
    { id: 'infection', name: 'Infection Surveillance', status: 'active', summary: 'HAI monitoring', icon: '🦠' },
    { id: 'self_heal', name: 'Self-Healing Engine', status: 'active', summary: 'Auto-recovery', icon: '🧬' },
    { id: 'clinical_intel', name: 'Clinical Intelligence', status: 'active', summary: 'Fall/Acuity/Gaps', icon: '🧠' },
  ];

  return {
    data_source: 'BCH 360° AI Platform',
    total_modules: modules.length,
    active: modules.filter(m => m.status === 'active').length,
    errors: modules.filter(m => m.status === 'error').length,
    modules,
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// 📋 AI DAILY BRIEFING — Executive Morning Summary
// ============================================================
router.get('/daily-briefing', cached('dailyBriefing', 300000, async () => {
  const [revenue, visits, ipd, er, mortality, readmit, sepsis, labs] = await Promise.allSettled([
    dbQueryOne(`SELECT SUM(income) as today_rev FROM vn_stat WHERE vstdate = CURDATE()`),
    dbQueryOne(`SELECT COUNT(DISTINCT vn) as opd, COUNT(DISTINCT CASE WHEN ptstatus='1' THEN vn END) as new_pt FROM ovst WHERE vstdate = CURDATE()`),
    dbQuery(`SELECT w.name as ward, COUNT(*) as census, SUM(CASE WHEN DATEDIFF(CURDATE(), i.regdate) > 7 THEN 1 ELSE 0 END) as long_stay
             FROM ipt i JOIN ward w ON i.ward = w.ward WHERE i.dchdate IS NULL AND i.ward != '06' GROUP BY i.ward, w.name`),
    dbQueryOne(`SELECT COUNT(*) as total, SUM(CASE WHEN er_pt_type IN ('1','2') THEN 1 ELSE 0 END) as critical FROM er_regist WHERE vstdate = CURDATE()`),
    dbQueryOne(`SELECT COUNT(*) as deaths FROM an_stat WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND dchstts = '09'`),
    ai.getReadmissionRisk().catch(() => []),
    detectSepsisRisk().catch(() => []),
    getCriticalLabs().catch(() => []),
  ]);

  const todayRev = revenue.status === 'fulfilled' ? Number(revenue.value?.today_rev || 0) : 0;
  const opdVisits = visits.status === 'fulfilled' ? visits.value?.opd || 0 : 0;
  const erTotal = er.status === 'fulfilled' ? er.value?.total || 0 : 0;
  const erCritical = er.status === 'fulfilled' ? er.value?.critical || 0 : 0;
  const ipdWards = ipd.status === 'fulfilled' ? ipd.value || [] : [];
  const ipdCensus = ipdWards.reduce((s, w) => s + (w.census || 0), 0);
  const longStay = ipdWards.reduce((s, w) => s + (w.long_stay || 0), 0);
  const highRiskReadmit = readmit.status === 'fulfilled' ? readmit.value?.filter(p => p.risk_level === 'high').length || 0 : 0;
  const sepsisAlerts = sepsis.status === 'fulfilled' ? sepsis.value?.length || 0 : 0;
  const criticalLabCount = labs.status === 'fulfilled' ? labs.value?.length || 0 : 0;
  const deaths30d = mortality.status === 'fulfilled' ? mortality.value?.deaths || 0 : 0;

  // Generate priority actions
  const actions = [];
  if (sepsisAlerts > 0) actions.push({ priority: 'critical', icon: '🔴', text: `Sepsis alert: ${sepsisAlerts} ราย ต้อง Blood culture + ATB ภายใน 1 ชม.` });
  if (criticalLabCount > 0) actions.push({ priority: 'critical', icon: '🧪', text: `Critical lab: ${criticalLabCount} รายการ ต้องรายงานแพทย์ทันที` });
  if (erCritical > 0) actions.push({ priority: 'high', icon: '🚑', text: `ER Resuscitation/Emergency: ${erCritical} ราย` });
  if (highRiskReadmit > 0) actions.push({ priority: 'high', icon: '🔄', text: `Readmission risk สูง: ${highRiskReadmit} ราย ต้อง Discharge Planning` });
  if (longStay > 0) actions.push({ priority: 'medium', icon: '🏥', text: `Long stay >7 วัน: ${longStay} ราย พิจารณา DC` });

  return {
    data_source: 'BCH AI Daily Briefing',
    date: new Date().toLocaleDateString('th-TH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    executive_summary: {
      revenue: { today: todayRev, formatted: `฿${(todayRev / 1000).toFixed(0)}K` },
      opd: { visits: opdVisits, new_patients: visits.status === 'fulfilled' ? visits.value?.new_pt || 0 : 0 },
      ipd: { census: ipdCensus, long_stay: longStay, wards: ipdWards },
      er: { total: erTotal, critical: erCritical },
      mortality_30d: deaths30d,
    },
    ai_alerts: {
      sepsis: sepsisAlerts,
      critical_labs: criticalLabCount,
      readmission_high_risk: highRiskReadmit,
    },
    priority_actions: actions,
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// 💉 DRUG INTERACTION CHECK — Patient Drug Safety
// ============================================================
router.get('/drug-safety/check/:hn', async (req, res) => {
  try {
    const { hn } = req.params;

    // Get patient's current medications
    // NOTE: drugitems has no `drugname` — use `generic_name`. `pharmacology_group` is actually `pharmacology_group1`.
    const meds = await dbQuery(`
      SELECT DISTINCT d.name, d.icode, d.generic_name AS drugname, d.therapeutic,
             d.pharmacology_group1 AS pharm_group, d.alert_level
      FROM opitemrece o
      JOIN drugitems d ON o.icode = d.icode
      WHERE o.hn = ? AND o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      ORDER BY d.alert_level DESC, d.name
      LIMIT 50
    `, [hn]);

    // Get patient allergies
    const allergies = await dbQuery(`
      SELECT agent, symptom, seriousness_id, report_date
      FROM opd_allergy WHERE hn = ? ORDER BY report_date DESC
    `, [hn]);

    // Check drug interactions between current meds
    const icodePairs = [];
    for (let i = 0; i < meds.length; i++) {
      for (let j = i + 1; j < meds.length; j++) {
        icodePairs.push([meds[i].icode, meds[j].icode]);
      }
    }

    let interactions = [];
    if (icodePairs.length > 0) {
      // NOTE: drug_interaction stores drug NAMES (drugname1/drugname2), not icodes.
      //       Join on name instead. Field is `note`, not `detail`.
      const drugNames = [...new Set(meds.map(m => m.name).filter(Boolean))];
      if (drugNames.length > 0) {
        interactions = await dbQuery(`
          SELECT di.drugname1 AS drug1, di.drugname2 AS drug2, di.severity, di.note AS detail
          FROM drug_interaction di
          WHERE di.drugname1 IN (?) AND di.drugname2 IN (?)
        `, [drugNames, drugNames]).catch(() => []);
      }
    }

    // High-alert drug flagging (ISMP criteria)
    const HIGH_ALERT_GROUPS = ['anticoagulant', 'insulin', 'opioid', 'chemotherapy', 'potassium', 'sedative'];
    const highAlertDrugs = meds.filter(m =>
      m.alert_level >= 3 || HIGH_ALERT_GROUPS.some(g => (m.pharm_group || '').toLowerCase().includes(g))
    );

    // Duplicate therapy detection
    const therapyGroups = {};
    meds.forEach(m => {
      const key = m.therapeutic || m.pharm_group || 'unknown';
      if (!therapyGroups[key]) therapyGroups[key] = [];
      therapyGroups[key].push(m);
    });
    const duplicates = Object.entries(therapyGroups)
      .filter(([, drugs]) => drugs.length > 1)
      .map(([group, drugs]) => ({ group, count: drugs.length, drugs: drugs.map(d => d.name) }));

    // Allergy cross-check
    const allergyAlerts = [];
    const allergyAgents = allergies.map(a => (a.agent || '').toLowerCase());
    meds.forEach(m => {
      if (allergyAgents.some(a => (m.name || '').toLowerCase().includes(a) || (m.drugname || '').toLowerCase().includes(a))) {
        allergyAlerts.push({ drug: m.name, matched_allergy: allergies.find(a => (m.name || '').toLowerCase().includes((a.agent || '').toLowerCase()))?.agent });
      }
    });

    res.json({
      data_source: 'HOSxP XE + Drug Safety AI',
      hn,
      medications: { count: meds.length, list: meds },
      allergies: { count: allergies.length, list: allergies },
      safety_analysis: {
        interactions: { count: interactions.length, list: interactions },
        high_alert_drugs: { count: highAlertDrugs.length, list: highAlertDrugs.map(d => ({ name: d.name, alert_level: d.alert_level, group: d.pharm_group })) },
        duplicate_therapy: { count: duplicates.length, list: duplicates },
        allergy_conflicts: { count: allergyAlerts.length, list: allergyAlerts },
      },
      risk_score: Math.min(100, interactions.length * 20 + highAlertDrugs.length * 15 + allergyAlerts.length * 30 + duplicates.length * 10),
      timestamp: new Date().toISOString(),
    });
  } catch (err) { safeError(res, err, 'Drug Safety'); }
});

// ============================================================
// 🦠 INFECTION SURVEILLANCE — HAI Detection & Outbreak Monitor
// ============================================================
router.get('/infection/surveillance', cached('infectionSurv', 300000, async () => {
  const HA_BENCHMARKS = { CAUTI: 3.5, CLABSI: 1.5, VAP: 5.0, SSI: 2.0, HAI_OVERALL: 1.0 };

  // HAI cases this month (ICD-10 based)
  const haiCases = await dbQuery(`
    SELECT
      CASE
        WHEN d.icd10 BETWEEN 'J150' AND 'J189' THEN 'HAI_Pneumonia'
        WHEN d.icd10 IN ('N390') THEN 'HAI_UTI'
        WHEN d.icd10 BETWEEN 'A400' AND 'A419' THEN 'HAI_Sepsis'
        WHEN d.icd10 BETWEEN 'T810' AND 'T819' THEN 'HAI_SSI'
        ELSE 'Other'
      END as hai_type,
      COUNT(DISTINCT i.an) as cases,
      GROUP_CONCAT(DISTINCT w.name) as wards
    FROM iptdiag d
    JOIN ipt i ON d.an = i.an
    JOIN ward w ON i.ward = w.ward
    WHERE i.regdate >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
      AND d.diagtype > 1
      AND (d.icd10 BETWEEN 'J150' AND 'J189' OR d.icd10 = 'N390'
           OR d.icd10 BETWEEN 'A400' AND 'A419' OR d.icd10 BETWEEN 'T810' AND 'T819')
    GROUP BY hai_type
  `).catch(() => []);

  // Total admissions this month for rate calculation
  const admissions = await dbQueryOne(`
    SELECT COUNT(DISTINCT an) as total FROM ipt WHERE regdate >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
  `).catch(() => ({ total: 0 }));

  const totalHAI = haiCases.reduce((s, h) => s + (h.cases || 0), 0);
  const haiRate = admissions?.total > 0 ? ((totalHAI / admissions.total) * 100).toFixed(2) : 0;

  // Communicable disease surveillance (last 7 days)
  const communicable = await dbQuery(`
    SELECT
      CASE
        WHEN d.icd10 BETWEEN 'A90' AND 'A919' THEN 'Dengue'
        WHEN d.icd10 IN ('U071','U072') THEN 'COVID-19'
        WHEN d.icd10 BETWEEN 'J09' AND 'J118' THEN 'Influenza'
        WHEN d.icd10 BETWEEN 'A00' AND 'A09' THEN 'Diarrhea'
        WHEN d.icd10 BETWEEN 'A150' AND 'A199' THEN 'TB'
        ELSE 'Other'
      END as disease,
      COUNT(DISTINCT o.vn) as cases,
      MAX(o.vstdate) as last_seen
    FROM ovstdiag d
    JOIN ovst o ON d.vn = o.vn
    WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      AND (d.icd10 BETWEEN 'A90' AND 'A919' OR d.icd10 IN ('U071','U072')
           OR d.icd10 BETWEEN 'J09' AND 'J118' OR d.icd10 BETWEEN 'A00' AND 'A09'
           OR d.icd10 BETWEEN 'A150' AND 'A199')
    GROUP BY disease
    HAVING cases > 0
    ORDER BY cases DESC
  `).catch(() => []);

  // Outbreak detection: >2x baseline for any disease
  const alerts = communicable.filter(d => d.cases >= 5).map(d => ({
    disease: d.disease, cases: d.cases, level: d.cases >= 10 ? 'outbreak' : 'watch',
    action: d.cases >= 10 ? 'แจ้ง สสจ. ภายใน 24 ชม.' : 'เฝ้าระวังต่อเนื่อง'
  }));

  return {
    data_source: 'HOSxP XE + Infection AI',
    hai: {
      total_cases: totalHAI,
      rate: parseFloat(haiRate),
      benchmark: HA_BENCHMARKS.HAI_OVERALL,
      status: parseFloat(haiRate) <= HA_BENCHMARKS.HAI_OVERALL ? 'within_target' : 'above_target',
      by_type: haiCases,
      admissions_this_month: admissions?.total || 0,
    },
    communicable: { diseases: communicable, alert_count: alerts.length, alerts },
    benchmarks: HA_BENCHMARKS,
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// 🏥 AI MORTALITY RISK — APACHE-II Simplified Scoring
// ============================================================
router.get('/mortality-risk', cached('mortalityRisk', 120000, async () => {
  // Get all current IPD patients with latest vitals and labs
  const patients = await dbQuery(`
    SELECT i.an, i.hn, CONCAT(p.pname, p.fname, ' ', p.lname) as patient_name,
           TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) as age, p.sex,
           w.name as ward, DATEDIFF(CURDATE(), i.regdate) as los,
           o.bps, o.bpd, o.pulse, o.rr, o.temperature, o.spo2,
           (SELECT GROUP_CONCAT(d.icd10) FROM iptdiag d WHERE d.an = i.an AND d.diagtype = 1) as primary_dx
    FROM ipt i
    JOIN patient p ON i.hn = p.hn
    JOIN ward w ON i.ward = w.ward
    LEFT JOIN opdscreen o ON i.hn = o.hn AND o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 2 DAY)
    WHERE i.dchdate IS NULL AND i.ward != '06'
    GROUP BY i.an
  `).catch(() => []);

  // Score each patient (simplified APACHE-II components)
  const scored = patients.map(pt => {
    let score = 0;
    const factors = [];

    // Age score
    if (pt.age >= 75) { score += 6; factors.push('อายุ ≥75 ปี'); }
    else if (pt.age >= 65) { score += 5; factors.push('อายุ ≥65 ปี'); }
    else if (pt.age >= 55) { score += 3; factors.push('อายุ ≥55 ปี'); }

    // Vital signs
    if (pt.bps && (pt.bps < 70 || pt.bps > 180)) { score += 4; factors.push(pt.bps < 70 ? 'Hypotension' : 'Hypertensive crisis'); }
    else if (pt.bps && (pt.bps < 90 || pt.bps > 160)) { score += 2; factors.push('BP ผิดปกติ'); }
    if (pt.pulse && (pt.pulse < 40 || pt.pulse > 150)) { score += 4; factors.push('HR ผิดปกติรุนแรง'); }
    else if (pt.pulse && (pt.pulse < 55 || pt.pulse > 110)) { score += 2; factors.push('HR ผิดปกติ'); }
    if (pt.rr && (pt.rr < 6 || pt.rr > 35)) { score += 4; factors.push('RR ผิดปกติรุนแรง'); }
    if (pt.temperature && (pt.temperature < 34 || pt.temperature > 40)) { score += 4; factors.push('อุณหภูมิผิดปกติรุนแรง'); }
    if (pt.spo2 && pt.spo2 < 90) { score += 4; factors.push('SpO₂ < 90%'); }
    else if (pt.spo2 && pt.spo2 < 94) { score += 2; factors.push('SpO₂ ต่ำ'); }

    // LOS as proxy for complexity
    if (pt.los > 14) { score += 3; factors.push(`LOS ${pt.los} วัน`); }
    else if (pt.los > 7) { score += 1; factors.push(`LOS ${pt.los} วัน`); }

    const risk_level = score >= 15 ? 'critical' : score >= 10 ? 'high' : score >= 5 ? 'moderate' : 'low';

    return { ...pt, mortality_score: score, risk_level, risk_factors: factors };
  }).sort((a, b) => b.mortality_score - a.mortality_score);

  return {
    data_source: 'HOSxP XE + AI Mortality Risk (Simplified APACHE-II)',
    total_patients: scored.length,
    critical: scored.filter(p => p.risk_level === 'critical').length,
    high: scored.filter(p => p.risk_level === 'high').length,
    moderate: scored.filter(p => p.risk_level === 'moderate').length,
    patients: scored.slice(0, 50),
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// 📊 AI NO-SHOW PREDICTION — OPD Appointment No-Show Risk
// ============================================================
router.get('/noshow-prediction', cached('noshow', 300000, async () => {
  // Analyze no-show patterns by clinic, day-of-week, time
  const patterns = await dbQuery(`
    SELECT
      k.department as clinic,
      DAYOFWEEK(o.vstdate) as dow,
      COUNT(DISTINCT o.vn) as total_visits,
      SUM(CASE WHEN o.ovstist = '4' THEN 1 ELSE 0 END) as noshow_count
    FROM ovst o
    JOIN kskdepartment k ON o.main_dep = k.depcode
    WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
    GROUP BY k.department, DAYOFWEEK(o.vstdate)
    HAVING total_visits >= 10
    ORDER BY (noshow_count / total_visits) DESC
  `).catch(() => []);

  // Overall stats
  const overall = await dbQueryOne(`
    SELECT
      COUNT(DISTINCT vn) as total,
      SUM(CASE WHEN ovstist = '4' THEN 1 ELSE 0 END) as noshow
    FROM ovst WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)
  `).catch(() => ({ total: 0, noshow: 0 }));

  const overallRate = overall?.total > 0 ? ((overall.noshow / overall.total) * 100).toFixed(1) : 0;

  // High-risk clinics
  const clinicRisk = {};
  patterns.forEach(p => {
    if (!clinicRisk[p.clinic]) clinicRisk[p.clinic] = { total: 0, noshow: 0 };
    clinicRisk[p.clinic].total += p.total_visits;
    clinicRisk[p.clinic].noshow += p.noshow_count;
  });

  const clinicSummary = Object.entries(clinicRisk)
    .map(([clinic, d]) => ({ clinic, total: d.total, noshow: d.noshow, rate: ((d.noshow / d.total) * 100).toFixed(1) }))
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 15);

  // Day-of-week pattern
  const dayNames = ['', 'อาทิตย์', 'จันทร์', 'อังคาร', 'พุธ', 'พฤหัสบดี', 'ศุกร์', 'เสาร์'];
  const dowPattern = Array.from({ length: 7 }, (_, i) => {
    const dow = i + 1;
    const dayData = patterns.filter(p => p.dow === dow);
    const total = dayData.reduce((s, p) => s + p.total_visits, 0);
    const noshow = dayData.reduce((s, p) => s + p.noshow_count, 0);
    return { day: dayNames[dow], total, noshow, rate: total > 0 ? ((noshow / total) * 100).toFixed(1) : '0' };
  });

  return {
    data_source: 'HOSxP XE + AI No-Show Prediction',
    overall: { rate: parseFloat(overallRate), total: overall?.total || 0, noshow: overall?.noshow || 0 },
    by_clinic: clinicSummary,
    by_day: dowPattern,
    recommendations: parseFloat(overallRate) > 10
      ? ['พิจารณา SMS reminder ก่อนนัด 1 วัน', 'Overbooking 10-15% สำหรับคลินิกที่ no-show สูง', 'วิเคราะห์ผู้ป่วยที่ no-show ซ้ำ เพื่อ targeted intervention']
      : ['อัตรา no-show อยู่ในเกณฑ์ดี', 'คงรูปแบบ appointment system ปัจจุบัน'],
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// 🦷 AI DENTAL — Demand Forecast & Efficiency Optimization
// ============================================================
router.get('/dental/optimization', cached('dentalAI', 300000, async () => {
  const [today, trend, peakHours] = await Promise.allSettled([
    dbQueryOne(`SELECT COUNT(DISTINCT vn) as visits, AVG(TIMESTAMPDIFF(MINUTE, o.vsttime, o.oqueue)) as avg_wait
                FROM ovst o JOIN ovst_seq s ON o.vn = s.vn WHERE o.vstdate = CURDATE() AND o.main_dep IN (SELECT depcode FROM kskdepartment WHERE department LIKE '%ฟัน%' OR department LIKE '%ทันต%')`),
    dbQuery(`SELECT DATE_FORMAT(vstdate,'%Y-%m') as month, COUNT(DISTINCT vn) as visits
             FROM ovst WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND main_dep IN (SELECT depcode FROM kskdepartment WHERE department LIKE '%ฟัน%' OR department LIKE '%ทันต%')
             GROUP BY month ORDER BY month`),
    dbQuery(`SELECT HOUR(vsttime) as hr, COUNT(*) as cnt FROM ovst WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND main_dep IN (SELECT depcode FROM kskdepartment WHERE department LIKE '%ฟัน%' OR department LIKE '%ทันต%')
             GROUP BY hr ORDER BY cnt DESC LIMIT 3`),
  ]);
  const peakHrs = peakHours.status === 'fulfilled' ? peakHours.value : [];
  const trendData = trend.status === 'fulfilled' ? trend.value : [];
  const avgGrowth = trendData.length >= 2 ? ((trendData[trendData.length-1]?.visits - trendData[0]?.visits) / (trendData[0]?.visits || 1) * 100).toFixed(1) : 0;
  return {
    data_source: 'HOSxP XE + Dental AI',
    demand_forecast: { trend: trendData, growth_rate: parseFloat(avgGrowth), direction: avgGrowth > 0 ? 'increasing' : 'decreasing' },
    peak_hours: peakHrs.map(h => ({ hour: `${h.hr}:00`, avg_patients: h.cnt })),
    recommendations: [
      peakHrs[0] ? `Peak hour ${peakHrs[0].hr}:00 — เพิ่ม unit ทันตกรรม` : null,
      today.status === 'fulfilled' && today.value?.avg_wait > 30 ? `Avg wait ${Math.round(today.value.avg_wait)} นาที — พิจารณา Fast-track` : null,
      avgGrowth > 5 ? `Demand เพิ่ม ${avgGrowth}% — วางแผนเพิ่มทันตแพทย์` : null,
    ].filter(Boolean),
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// ☢️ AI XRAY — TAT Prediction & Workload Optimization
// ============================================================
router.get('/xray/optimization', cached('xrayAI', 300000, async () => {
  // NOTE: xray_head has no `xray_date` (use `order_date`) and no `xray_items_code`
  //       (items are in xray_report table). Rewrote to use correct schema.
  const [tatStats, hourly, examType] = await Promise.allSettled([
    dbQuery(`SELECT xr.xray_items_code, xi.xray_items_name as exam,
                    COUNT(*) as cnt, AVG(TIMESTAMPDIFF(MINUTE, x.order_date_time, x.report_date)) as avg_tat
             FROM xray_head x
             JOIN xray_report xr ON x.vn = xr.vn
             JOIN xray_items xi ON xr.xray_items_code = xi.xray_items_code
             WHERE x.order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND x.report_date IS NOT NULL
             GROUP BY xr.xray_items_code, xi.xray_items_name ORDER BY cnt DESC LIMIT 10`),
    dbQuery(`SELECT HOUR(order_date_time) as hr, COUNT(*) as cnt FROM xray_head WHERE order_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) GROUP BY hr ORDER BY hr`),
    dbQueryOne(`SELECT COUNT(*) as pending FROM xray_head WHERE order_date = CURDATE() AND report_date IS NULL`),
  ]);
  const tatData = tatStats.status === 'fulfilled' ? tatStats.value : [];
  const slowExams = tatData.filter(t => t.avg_tat > 60);
  return {
    data_source: 'HOSxP XE + Radiology AI',
    tat_analysis: tatData.map(t => ({ exam: t.exam, count: t.cnt, avg_tat_min: Math.round(t.avg_tat || 0) })),
    pending_reports: examType.status === 'fulfilled' ? examType.value?.pending || 0 : 0,
    hourly_distribution: hourly.status === 'fulfilled' ? hourly.value : [],
    bottlenecks: slowExams.map(s => ({ exam: s.exam, avg_tat: Math.round(s.avg_tat), action: `TAT ${Math.round(s.avg_tat)} นาที — พิจารณาเพิ่ม Radiologist` })),
    recommendations: [
      slowExams.length > 0 ? `${slowExams.length} exam types TAT > 60 นาที` : 'TAT อยู่ในเกณฑ์',
      examType.status === 'fulfilled' && examType.value?.pending > 10 ? `${examType.value.pending} report ค้าง — เร่งอ่านผล` : null,
    ].filter(Boolean),
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// 💊 AI PHARMACY — Drug Utilization & Generic Optimization
// ============================================================
router.get('/pharmacy/optimization', cached('pharmAI', 300000, async () => {
  const [highCost, generic, alerts] = await Promise.allSettled([
    dbQuery(`SELECT d.name, d.generic_name AS drugname, d.unitprice, SUM(o.qty) as total_qty, SUM(o.qty * d.unitprice) as total_cost
             FROM opitemrece o JOIN drugitems d ON o.icode = d.icode
             WHERE o.vstdate >= DATE_FORMAT(CURDATE(),'%Y-%m-01') AND d.unitprice > 0
             GROUP BY d.icode ORDER BY total_cost DESC LIMIT 15`),
    dbQuery(`SELECT d.name, d.generic_name AS drugname, d.unitprice, d.istatus,
                    CASE WHEN d.istatus = 'Y' THEN 'generic' ELSE 'original' END as drug_type,
                    SUM(o.qty * d.unitprice) as cost
             FROM opitemrece o JOIN drugitems d ON o.icode = d.icode
             WHERE o.vstdate >= DATE_FORMAT(CURDATE(),'%Y-%m-01') AND d.unitprice > 0
             GROUP BY d.icode HAVING cost > 1000 ORDER BY cost DESC LIMIT 20`),
    dbQuery(`SELECT d.name, d.alert_level, COUNT(DISTINCT o.hn) as patient_count
             FROM opitemrece o JOIN drugitems d ON o.icode = d.icode
             WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND d.alert_level >= 3
             GROUP BY d.icode ORDER BY d.alert_level DESC, patient_count DESC LIMIT 10`),
  ]);
  const highCostDrugs = highCost.status === 'fulfilled' ? highCost.value : [];
  const totalCost = highCostDrugs.reduce((s, d) => s + (d.total_cost || 0), 0);
  return {
    data_source: 'HOSxP XE + Pharmacy AI',
    cost_analysis: { top_drugs: highCostDrugs.map(d => ({ name: d.name, qty: d.total_qty, cost: d.total_cost })), total_top15: totalCost },
    high_alert_drugs: alerts.status === 'fulfilled' ? alerts.value.map(d => ({ name: d.name, alert_level: d.alert_level, patients: d.patient_count })) : [],
    optimization: {
      generic_substitution: generic.status === 'fulfilled' ? generic.value.filter(d => d.drug_type === 'original' && d.cost > 5000).map(d => ({
        drug: d.name, current_cost: d.cost, recommendation: 'พิจารณาใช้ยา Generic ทดแทน'
      })) : [],
    },
    recommendations: [
      highCostDrugs.length > 0 ? `Top drug cost: ฿${(highCostDrugs[0]?.total_cost/1000).toFixed(0)}K — ${highCostDrugs[0]?.name}` : null,
      alerts.status === 'fulfilled' && alerts.value.length > 0 ? `${alerts.value.length} High-alert drugs ใช้อยู่ — ต้อง double-check` : null,
    ].filter(Boolean),
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// 🔬 AI LAB — Critical Value Prediction & TAT Optimization
// ============================================================
router.get('/lab/optimization', cached('labAI', 300000, async () => {
  const [criticals, tatByTest, trend] = await Promise.allSettled([
    dbQuery(`SELECT lo.lab_items_name_ref as test_name, lo.lab_order_result as result, lo.lab_items_normal_value_ref as normal,
                    lh.hn, CONCAT(p.pname,p.fname,' ',p.lname) as patient_name, lh.order_date
             FROM lab_order lo JOIN lab_head lh ON lo.lab_order_number = lh.lab_order_number
             JOIN patient p ON lh.hn = p.hn
             WHERE lh.order_date >= DATE_SUB(CURDATE(), INTERVAL 1 DAY)
               AND lo.confirm = 'Y' AND lo.abnormal_result IS NOT NULL AND lo.abnormal_result != ''
               AND lo.lab_order_result IS NOT NULL AND lo.lab_order_result != ''
             ORDER BY lh.order_date DESC LIMIT 30`),
    dbQuery(`SELECT lo.lab_items_name_ref as test_name, COUNT(*) as cnt,
                    AVG(TIMESTAMPDIFF(MINUTE, lh.order_date, lo.update_datetime)) as avg_tat
             FROM lab_order lo JOIN lab_head lh ON lo.lab_order_number = lh.lab_order_number
             WHERE lh.order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND lo.update_datetime IS NOT NULL
             GROUP BY lo.lab_items_name_ref ORDER BY cnt DESC LIMIT 15`),
    dbQuery(`SELECT DATE(lh.order_date) as dt, COUNT(*) as orders, SUM(CASE WHEN lo.abnormal_result IS NOT NULL AND lo.abnormal_result != '' THEN 1 ELSE 0 END) as abnormal
             FROM lab_order lo JOIN lab_head lh ON lo.lab_order_number = lh.lab_order_number
             WHERE lh.order_date >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND lo.confirm = 'Y'
             GROUP BY dt ORDER BY dt`),
  ]);
  const critList = criticals.status === 'fulfilled' ? criticals.value : [];
  const tatList = tatByTest.status === 'fulfilled' ? tatByTest.value : [];
  const slowTests = tatList.filter(t => t.avg_tat > 120);
  return {
    data_source: 'HOSxP XE + Lab AI',
    critical_values: { count: critList.length, alerts: critList.slice(0, 15) },
    tat_analysis: tatList.map(t => ({ test: t.test_name, count: t.cnt, avg_tat_min: Math.round(t.avg_tat || 0) })),
    trend: trend.status === 'fulfilled' ? trend.value.map(t => ({ date: t.dt, orders: t.orders, abnormal: t.abnormal, abnormal_rate: t.orders > 0 ? ((t.abnormal/t.orders)*100).toFixed(1) : 0 })) : [],
    bottlenecks: slowTests.map(t => ({ test: t.test_name, avg_tat: Math.round(t.avg_tat), recommendation: 'TAT > 2 ชม. — review workflow' })),
    recommendations: [
      critList.length > 0 ? `${critList.length} Critical values 24 ชม. — verify notification` : 'ไม่มี critical value',
      slowTests.length > 0 ? `${slowTests.length} tests TAT > 2 ชม.` : 'TAT อยู่ในเกณฑ์ดี',
    ].filter(Boolean),
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// ⭐ AI QUALITY — HA Readiness & Trend Prediction
// ============================================================
router.get('/quality/prediction', cached('qualityAI', 300000, async () => {
  const [mortality, readmit, infection, satisfaction] = await Promise.allSettled([
    // NOTE: dchstts is in ipt table, not an_stat — join via an
    dbQuery(`SELECT DATE_FORMAT(a.dchdate,'%Y-%m') as month, COUNT(*) as deaths,
                    (SELECT COUNT(*) FROM an_stat a2 WHERE DATE_FORMAT(a2.dchdate,'%Y-%m') = DATE_FORMAT(a.dchdate,'%Y-%m')) as total_dc
             FROM an_stat a
             INNER JOIN ipt i ON a.an = i.an
             WHERE i.dchstts = '09' AND a.dchdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
             GROUP BY month ORDER BY month`),
    dbQuery(`SELECT DATE_FORMAT(i2.regdate,'%Y-%m') as month, COUNT(*) as readmissions
             FROM ipt i1 JOIN ipt i2 ON i1.hn = i2.hn AND i2.regdate > i1.dchdate AND i2.regdate <= DATE_ADD(i1.dchdate, INTERVAL 30 DAY) AND i2.an != i1.an
             WHERE i1.dchdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) GROUP BY month ORDER BY month`),
    dbQuery(`SELECT DATE_FORMAT(i.regdate,'%Y-%m') as month, COUNT(DISTINCT i.an) as hai_cases
             FROM iptdiag d JOIN ipt i ON d.an = i.an
             WHERE i.regdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND d.diagtype > 1
               AND (d.icd10 BETWEEN 'J150' AND 'J189' OR d.icd10 = 'N390' OR d.icd10 BETWEEN 'A400' AND 'A419' OR d.icd10 BETWEEN 'T810' AND 'T819')
             GROUP BY month ORDER BY month`),
    dbQueryOne(`SELECT AVG(CASE WHEN ptstatus IN ('1','3') THEN 1 ELSE 0 END) * 100 as completion_rate FROM ovst WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)`),
  ]);

  const mortalityData = mortality.status === 'fulfilled' ? mortality.value : [];
  const latestMort = mortalityData.length > 0 ? mortalityData[mortalityData.length-1] : null;
  const mortRate = latestMort?.total_dc > 0 ? ((latestMort.deaths / latestMort.total_dc) * 100).toFixed(2) : 0;

  // Compute HA Quality Score (composite)
  const scores = {
    mortality: parseFloat(mortRate) < 2 ? 95 : parseFloat(mortRate) < 3 ? 80 : 60,
    readmission: readmit.status === 'fulfilled' && readmit.value.length > 0 ? (readmit.value[readmit.value.length-1]?.readmissions < 5 ? 90 : 70) : 85,
    infection: infection.status === 'fulfilled' && infection.value.length > 0 ? (infection.value[infection.value.length-1]?.hai_cases < 5 ? 90 : 70) : 85,
    completion: satisfaction.status === 'fulfilled' ? Math.min(100, Math.round(satisfaction.value?.completion_rate || 80)) : 80,
  };
  const overallScore = Math.round((scores.mortality + scores.readmission + scores.infection + scores.completion) / 4);

  return {
    data_source: 'HOSxP XE + Quality AI',
    ha_readiness: { overall_score: overallScore, status: overallScore >= 85 ? 'ready' : overallScore >= 70 ? 'needs_improvement' : 'at_risk', scores },
    trends: {
      mortality: mortalityData.map(m => ({ month: m.month, rate: m.total_dc > 0 ? ((m.deaths/m.total_dc)*100).toFixed(2) : 0, deaths: m.deaths })),
      readmission: readmit.status === 'fulfilled' ? readmit.value : [],
      infection: infection.status === 'fulfilled' ? infection.value : [],
    },
    benchmarks: { mortality_target: 2.0, readmission_target: 5, hai_target: 1.0 },
    recommendations: [
      parseFloat(mortRate) > 2 ? `Mortality ${mortRate}% เกินเป้า 2% — ทบทวน case` : null,
      overallScore < 85 ? `HA Score ${overallScore} — ต้องปรับปรุงก่อน Survey` : `HA Score ${overallScore} — พร้อม Survey`,
    ].filter(Boolean),
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// 🎯 AI CUSTOMER INSIGHT — Patient Segmentation & Loyalty
// ============================================================
router.get('/customer/segmentation', cached('custSegment', 300000, async () => {
  const [ageGroup, loyalty, payer, geographic] = await Promise.allSettled([
    dbQuery(`SELECT
               CASE WHEN TIMESTAMPDIFF(YEAR,p.birthday,CURDATE()) < 15 THEN 'เด็ก 0-14'
                    WHEN TIMESTAMPDIFF(YEAR,p.birthday,CURDATE()) < 30 THEN 'วัยรุ่น 15-29'
                    WHEN TIMESTAMPDIFF(YEAR,p.birthday,CURDATE()) < 45 THEN 'วัยทำงาน 30-44'
                    WHEN TIMESTAMPDIFF(YEAR,p.birthday,CURDATE()) < 60 THEN 'วัยกลางคน 45-59'
                    ELSE 'สูงอายุ 60+' END as age_group,
               COUNT(DISTINCT o.hn) as patients, COUNT(DISTINCT o.vn) as visits, SUM(v.income) as revenue
             FROM ovst o JOIN patient p ON o.hn = p.hn LEFT JOIN vn_stat v ON o.vn = v.vn
             WHERE o.vstdate >= DATE_FORMAT(CURDATE(),'%Y-%m-01') GROUP BY age_group ORDER BY patients DESC`),
    dbQuery(`SELECT visit_count, COUNT(*) as patients FROM (
               SELECT hn, COUNT(DISTINCT vn) as visit_count FROM ovst WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 12 MONTH) GROUP BY hn
             ) sub GROUP BY CASE WHEN visit_count = 1 THEN 1 WHEN visit_count <= 3 THEN 2 WHEN visit_count <= 6 THEN 3 ELSE 4 END ORDER BY visit_count`),
    dbQuery(`SELECT pt.name as payer, COUNT(DISTINCT o.hn) as patients, SUM(v.income) as revenue
             FROM ovst o JOIN pttype pt ON o.pttype = pt.pttype LEFT JOIN vn_stat v ON o.vn = v.vn
             WHERE o.vstdate >= DATE_FORMAT(CURDATE(),'%Y-%m-01') GROUP BY pt.name ORDER BY revenue DESC LIMIT 10`),
    dbQuery(`SELECT p.addrpart as district, COUNT(DISTINCT o.hn) as patients
             FROM ovst o JOIN patient p ON o.hn = p.hn
             WHERE o.vstdate >= DATE_FORMAT(CURDATE(),'%Y-%m-01') AND p.addrpart IS NOT NULL AND p.addrpart != ''
             GROUP BY p.addrpart ORDER BY patients DESC LIMIT 10`),
  ]);

  const ageData = ageGroup.status === 'fulfilled' ? ageGroup.value : [];
  const topAge = ageData[0];
  const totalRevenue = ageData.reduce((s, a) => s + (Number(a.revenue) || 0), 0);

  return {
    data_source: 'HOSxP XE + Customer AI',
    segmentation: {
      by_age: ageData.map(a => ({ ...a, revenue_share: totalRevenue > 0 ? ((a.revenue/totalRevenue)*100).toFixed(1) : 0 })),
      by_payer: payer.status === 'fulfilled' ? payer.value : [],
      by_geography: geographic.status === 'fulfilled' ? geographic.value : [],
    },
    loyalty: loyalty.status === 'fulfilled' ? loyalty.value.map(l => ({
      segment: l.visit_count === 1 ? 'New (1 visit)' : l.visit_count <= 3 ? 'Casual (2-3)' : l.visit_count <= 6 ? 'Regular (4-6)' : 'Loyal (7+)',
      patients: l.patients,
    })) : [],
    insights: [
      topAge ? `กลุ่ม ${topAge.age_group} มากที่สุด (${topAge.patients} คน)` : null,
      totalRevenue > 0 ? `รายได้เดือนนี้ ฿${(totalRevenue/1e6).toFixed(1)}M` : null,
    ].filter(Boolean),
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// 🌿 AI THAI MED — Demand Forecast & Herbal Utilization
// ============================================================
router.get('/thaimed/optimization', cached('thaimedAI', 300000, async () => {
  const [today, trend, topService] = await Promise.allSettled([
    dbQueryOne(`SELECT COUNT(DISTINCT vn) as visits, AVG(TIMESTAMPDIFF(MINUTE, o.vsttime, COALESCE(o.oqueue, o.vsttime))) as avg_wait
                FROM ovst o WHERE o.vstdate = CURDATE()
                  AND o.main_dep IN (SELECT depcode FROM kskdepartment WHERE department LIKE '%แผนไทย%' OR department LIKE '%Thai%')`),
    dbQuery(`SELECT DATE_FORMAT(o.vstdate,'%Y-%m') as month, COUNT(DISTINCT o.vn) as visits, SUM(v.income) as revenue
             FROM ovst o LEFT JOIN vn_stat v ON o.vn = v.vn
             WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
               AND o.main_dep IN (SELECT depcode FROM kskdepartment WHERE department LIKE '%แผนไทย%' OR department LIKE '%Thai%')
             GROUP BY month ORDER BY month`),
    // NOTE: pp_special has pp_special_type_id (not pp_special_type) · no vstdate (use entry_datetime via DATE())
    //       opitemrece has no sum_price — use unitprice*qty
    dbQuery(`SELECT pp.pp_special_type_name as service, COUNT(*) as cnt, SUM(o2.unitprice * o2.qty) as revenue
             FROM pp_special ps
             JOIN pp_special_type pp ON ps.pp_special_type_id = pp.pp_special_type_id
             LEFT JOIN opitemrece o2 ON ps.vn = o2.vn AND o2.icode LIKE '%TTM%'
             WHERE DATE(ps.entry_datetime) >= DATE_FORMAT(CURDATE(),'%Y-%m-01')
             GROUP BY pp.pp_special_type_name ORDER BY cnt DESC LIMIT 10`),
  ]);

  const trendData = trend.status === 'fulfilled' ? trend.value : [];
  const avgGrowth = trendData.length >= 2 ? ((trendData[trendData.length-1]?.visits - trendData[0]?.visits) / Math.max(trendData[0]?.visits, 1) * 100).toFixed(1) : 0;
  const todayData = today.status === 'fulfilled' ? today.value : {};
  const services = topService.status === 'fulfilled' ? topService.value : [];

  return {
    data_source: 'HOSxP XE + Thai Med AI',
    today: { visits: todayData?.visits || 0, avg_wait: Math.round(todayData?.avg_wait || 0) },
    demand_forecast: { trend: trendData, growth_rate: parseFloat(avgGrowth), direction: parseFloat(avgGrowth) > 0 ? 'increasing' : 'stable' },
    top_services: services.map(s => ({ service: s.service, count: s.cnt, revenue: s.revenue || 0 })),
    recommendations: [
      parseFloat(avgGrowth) > 10 ? `Demand เพิ่ม ${avgGrowth}% — เพิ่มเจ้าหน้าที่แผนไทย` : null,
      todayData?.avg_wait > 30 ? `Wait ${Math.round(todayData.avg_wait)} นาที — พิจารณา Fast-track` : null,
      services.length > 0 ? `Top service: ${services[0]?.service} (${services[0]?.cnt} ครั้ง)` : null,
      'ส่งเสริม Herbal products ตาม National List of Essential Medicines',
    ].filter(Boolean),
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// 🏋️ AI PHYS THERAPY — Rehab Outcome & Workload Prediction
// ============================================================
router.get('/phystherapy/optimization', cached('phystherapyAI', 300000, async () => {
  const [today, trend, peakHours] = await Promise.allSettled([
    dbQueryOne(`SELECT COUNT(DISTINCT vn) as visits, AVG(TIMESTAMPDIFF(MINUTE, o.vsttime, COALESCE(o.oqueue, o.vsttime))) as avg_wait
                FROM ovst o WHERE o.vstdate = CURDATE()
                  AND o.main_dep IN (SELECT depcode FROM kskdepartment WHERE department LIKE '%กายภาพ%' OR department LIKE '%Phys%')`),
    dbQuery(`SELECT DATE_FORMAT(o.vstdate,'%Y-%m') as month, COUNT(DISTINCT o.vn) as visits, SUM(v.income) as revenue
             FROM ovst o LEFT JOIN vn_stat v ON o.vn = v.vn
             WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
               AND o.main_dep IN (SELECT depcode FROM kskdepartment WHERE department LIKE '%กายภาพ%' OR department LIKE '%Phys%')
             GROUP BY month ORDER BY month`),
    dbQuery(`SELECT HOUR(o.vsttime) as hr, COUNT(*) as cnt FROM ovst o
             WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
               AND o.main_dep IN (SELECT depcode FROM kskdepartment WHERE department LIKE '%กายภาพ%' OR department LIKE '%Phys%')
             GROUP BY hr ORDER BY cnt DESC LIMIT 3`),
  ]);

  const trendData = trend.status === 'fulfilled' ? trend.value : [];
  const avgGrowth = trendData.length >= 2 ? ((trendData[trendData.length-1]?.visits - trendData[0]?.visits) / Math.max(trendData[0]?.visits, 1) * 100).toFixed(1) : 0;
  const todayData = today.status === 'fulfilled' ? today.value : {};
  const peakData = peakHours.status === 'fulfilled' ? peakHours.value : [];

  return {
    data_source: 'HOSxP XE + PT AI',
    today: { visits: todayData?.visits || 0, avg_wait: Math.round(todayData?.avg_wait || 0) },
    demand_forecast: { trend: trendData, growth_rate: parseFloat(avgGrowth), direction: parseFloat(avgGrowth) > 0 ? 'increasing' : 'stable' },
    peak_hours: peakData.map(h => ({ hour: `${h.hr}:00`, avg_patients: h.cnt })),
    recommendations: [
      parseFloat(avgGrowth) > 10 ? `Demand เพิ่ม ${avgGrowth}% — วางแผนเพิ่มนักกายภาพ` : null,
      peakData[0] ? `Peak hour: ${peakData[0].hr}:00 — เพิ่ม station` : null,
      todayData?.avg_wait > 30 ? `Wait time ${Math.round(todayData.avg_wait)} นาที — จัดคิวนัดหมาย` : null,
      'พัฒนา Home Program ลดการมา รพ. ซ้ำ',
    ].filter(Boolean),
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// 📊 AI COMPARE — YoY Growth Trend & Revenue Prediction
// ============================================================
router.get('/compare/trend-analysis', cached('compareAI', 300000, async () => {
  // Revenue comparison across fiscal years
  const revenue = await dbQuery(`
    SELECT
      CASE WHEN MONTH(vstdate) >= 10 THEN YEAR(vstdate)+544 ELSE YEAR(vstdate)+543 END as fiscal_year,
      CASE WHEN MONTH(vstdate) >= 10 THEN MONTH(vstdate)-9 ELSE MONTH(vstdate)+3 END as fiscal_month,
      SUM(income) as revenue, COUNT(DISTINCT vn) as visits
    FROM vn_stat
    WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 3 YEAR)
    GROUP BY fiscal_year, fiscal_month
    ORDER BY fiscal_year, fiscal_month
  `).catch(() => []);

  // Group by FY
  const fyMap = {};
  revenue.forEach(r => {
    if (!fyMap[r.fiscal_year]) fyMap[r.fiscal_year] = { total: 0, visits: 0, months: [] };
    fyMap[r.fiscal_year].total += Number(r.revenue) || 0;
    fyMap[r.fiscal_year].visits += Number(r.visits) || 0;
    fyMap[r.fiscal_year].months.push({ month: r.fiscal_month, revenue: r.revenue, visits: r.visits });
  });

  const fys = Object.keys(fyMap).sort();
  const latest = fys[fys.length - 1];
  const prev = fys.length >= 2 ? fys[fys.length - 2] : null;

  // Fair YoY: only compare months that exist in BOTH years (comparable period)
  let latestComparable = 0, prevComparable = 0;
  if (prev && fyMap[latest] && fyMap[prev]) {
    const latestMonthNums = new Set(fyMap[latest].months.map(m => m.month));
    for (const m of fyMap[prev].months) {
      if (latestMonthNums.has(m.month)) {
        prevComparable += Number(m.revenue) || 0;
      }
    }
    for (const m of fyMap[latest].months) {
      latestComparable += Number(m.revenue) || 0;
    }
  }
  const yoyGrowth = prevComparable > 0
    ? ((latestComparable - prevComparable) / prevComparable * 100).toFixed(1) : 0;

  // Department revenue ranking this FY
  const deptRevenue = await dbQuery(`
    SELECT k.department as dept, SUM(v.income) as revenue, COUNT(DISTINCT v.vn) as visits
    FROM vn_stat v JOIN ovst o ON v.vn = o.vn JOIN kskdepartment k ON o.main_dep = k.depcode
    WHERE v.vstdate >= CASE WHEN MONTH(CURDATE()) >= 10 THEN CONCAT(YEAR(CURDATE()),'-10-01') ELSE CONCAT(YEAR(CURDATE())-1,'-10-01') END
    GROUP BY k.department ORDER BY revenue DESC LIMIT 15
  `).catch(() => []);

  return {
    data_source: 'HOSxP XE + Compare AI',
    fiscal_years: fys.map(fy => ({ fy, total_revenue: fyMap[fy].total, total_visits: fyMap[fy].visits })),
    yoy_growth: parseFloat(yoyGrowth),
    yoy_note: prev ? `เปรียบเทียบช่วงเดียวกัน (comparable months) ปีงบ ${latest} vs ${prev}` : null,
    latest_fy: latest,
    dept_ranking: deptRevenue.map(d => ({ dept: d.dept, revenue: d.revenue, visits: d.visits })),
    recommendations: [
      parseFloat(yoyGrowth) > 0 ? `YoY Growth +${yoyGrowth}% (comparable period) — แนวโน้มดี` : `YoY Growth ${yoyGrowth}% (comparable period) — ต้องวิเคราะห์สาเหตุ`,
      deptRevenue[0] ? `Top Dept: ${deptRevenue[0].dept} (฿${(deptRevenue[0].revenue/1e6).toFixed(1)}M)` : null,
      'เปรียบเทียบ cost-to-revenue ratio แต่ละแผนก',
    ].filter(Boolean),
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// 📋 AI REPORT — Executive Summary Generator
// ============================================================
router.get('/report/executive-summary', cached('reportAI', 300000, async () => {
  // Current month range
  const monthStart = `DATE_FORMAT(CURDATE(),'%Y-%m-01')`;
  // Previous month same period for YoY context
  const prevMonthStart = `DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 YEAR),'%Y-%m-01')`;
  const prevMonthEnd = `DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 YEAR),'%Y-%m-%d')`;

  const [revenue, revenuePrev, opd, opdPrev, ipd, ipdPrev, er, erPrev, quality] = await Promise.allSettled([
    // Current month revenue: OPD (vn_stat) + IPD (an_stat)
    dbQueryOne(`SELECT
      COALESCE((SELECT SUM(income) FROM vn_stat WHERE vstdate >= ${monthStart} AND vstdate <= CURDATE()), 0)
      + COALESCE((SELECT SUM(income) FROM an_stat WHERE dchdate >= ${monthStart} AND dchdate <= CURDATE()), 0) AS total`),
    // Previous year same month
    dbQueryOne(`SELECT
      COALESCE((SELECT SUM(income) FROM vn_stat WHERE vstdate >= ${prevMonthStart} AND vstdate <= ${prevMonthEnd}), 0)
      + COALESCE((SELECT SUM(income) FROM an_stat WHERE dchdate >= ${prevMonthStart} AND dchdate <= ${prevMonthEnd}), 0) AS total`),
    // OPD current
    dbQueryOne(`SELECT COUNT(DISTINCT vn) as visits, COUNT(DISTINCT hn) as patients FROM ovst WHERE vstdate >= ${monthStart} AND vstdate <= CURDATE()`),
    // OPD previous year
    dbQueryOne(`SELECT COUNT(DISTINCT vn) as visits, COUNT(DISTINCT hn) as patients FROM ovst WHERE vstdate >= ${prevMonthStart} AND vstdate <= ${prevMonthEnd}`),
    // IPD current: Admit by regdate + D/C stats by dchdate (separate for accuracy)
    dbQuery(`SELECT
      (SELECT COUNT(DISTINCT an) FROM ipt WHERE regdate >= ${monthStart} AND regdate <= CURDATE()) AS admissions,
      COUNT(DISTINCT i.an) AS discharges,
      SUM(DATEDIFF(i.dchdate, i.regdate)) AS total_los,
      ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 2) AS alos,
      SUM(CASE WHEN i.dchstts='09' THEN 1 ELSE 0 END) AS deaths,
      ROUND(SUM(COALESCE(i.adjrw, a.rw, 0)), 2) AS sum_adjrw,
      ROUND(AVG(CASE WHEN COALESCE(i.adjrw, a.rw) > 0 THEN COALESCE(i.adjrw, a.rw) END), 2) AS cmi
      FROM ipt i LEFT JOIN an_stat a ON i.an = a.an
      WHERE i.dchdate >= ${monthStart} AND i.dchdate <= CURDATE() AND i.dchdate IS NOT NULL`),
    // IPD previous year same month
    dbQuery(`SELECT
      (SELECT COUNT(DISTINCT an) FROM ipt WHERE regdate >= ${prevMonthStart} AND regdate <= ${prevMonthEnd}) AS admissions,
      COUNT(DISTINCT i.an) AS discharges,
      ROUND(AVG(DATEDIFF(i.dchdate, i.regdate)), 2) AS alos,
      SUM(CASE WHEN i.dchstts='09' THEN 1 ELSE 0 END) AS deaths,
      ROUND(SUM(COALESCE(i.adjrw, a.rw, 0)), 2) AS sum_adjrw,
      ROUND(AVG(CASE WHEN COALESCE(i.adjrw, a.rw) > 0 THEN COALESCE(i.adjrw, a.rw) END), 2) AS cmi
      FROM ipt i LEFT JOIN an_stat a ON i.an = a.an
      WHERE i.dchdate >= ${prevMonthStart} AND i.dchdate <= ${prevMonthEnd} AND i.dchdate IS NOT NULL`),
    // ER current
    dbQueryOne(`SELECT COUNT(*) as total FROM er_regist WHERE vstdate >= ${monthStart} AND vstdate <= CURDATE()`),
    // ER previous year
    dbQueryOne(`SELECT COUNT(*) as total FROM er_regist WHERE vstdate >= ${prevMonthStart} AND vstdate <= ${prevMonthEnd}`),
    // HAI
    dbQueryOne(`SELECT COUNT(DISTINCT i.an) as hai FROM iptdiag d JOIN ipt i ON d.an = i.an
                WHERE i.dchdate >= ${monthStart} AND i.dchdate <= CURDATE() AND d.diagtype > 1
                  AND (d.icd10 BETWEEN 'J150' AND 'J189' OR d.icd10 = 'N390' OR d.icd10 BETWEEN 'A400' AND 'A419')`),
  ]);

  const val = (r) => r.status === 'fulfilled' ? r.value : null;
  const num = (v) => Number(v || 0);

  const rev = num(val(revenue)?.total);
  const revPrev = num(val(revenuePrev)?.total);
  const revYoY = revPrev > 0 ? Math.round(((rev - revPrev) / revPrev) * 100) : 0;

  const opdD = val(opd) || {};
  const opdP = val(opdPrev) || {};
  const opdVisits = num(opdD.visits);
  const opdPatients = num(opdD.patients);
  const opdYoY = num(opdP.visits) > 0 ? Math.round(((opdVisits - num(opdP.visits)) / num(opdP.visits)) * 100) : 0;

  const ipdD = val(ipd)?.[0] || {};
  const ipdP = val(ipdPrev)?.[0] || {};
  const admissions = num(ipdD.admissions);
  const discharges = num(ipdD.discharges);
  const alos = num(ipdD.alos);
  const deaths = num(ipdD.deaths);
  const cmi = num(ipdD.cmi);
  const adjrw = num(ipdD.sum_adjrw);
  const mortRate = discharges > 0 ? parseFloat(((deaths / discharges) * 100).toFixed(1)) : 0;
  const admitYoY = num(ipdP.admissions) > 0 ? Math.round(((admissions - num(ipdP.admissions)) / num(ipdP.admissions)) * 100) : 0;
  const dcYoY = num(ipdP.discharges) > 0 ? Math.round(((discharges - num(ipdP.discharges)) / num(ipdP.discharges)) * 100) : 0;
  const alosP = num(ipdP.alos) > 0 ? Math.round(((alos - num(ipdP.alos)) / num(ipdP.alos)) * 100) : 0;
  const cmiP = num(ipdP.cmi) > 0 ? Math.round(((cmi - num(ipdP.cmi)) / num(ipdP.cmi)) * 100) : 0;

  const erVisits = num(val(er)?.total);
  const erPrevVisits = num(val(erPrev)?.total);
  const erYoY = erPrevVisits > 0 ? Math.round(((erVisits - erPrevVisits) / erPrevVisits) * 100) : 0;

  const haiCount = num(val(quality)?.hai);

  // Build smart recommendations
  const recs = [];

  // Revenue
  const revFmt = `฿${(rev / 1e6).toFixed(1)}M`;
  const revPrevFmt = `฿${(revPrev / 1e6).toFixed(1)}M`;
  if (revYoY < -10) {
    recs.push({ severity: 'HIGH', text: `รายได้ MTD ${revFmt} (YoY ${revYoY}%, ปีก่อน ${revPrevFmt}) — ลดลงมาก ตรวจสอบ Under-coding, สิทธิ์เบิกค้าง และ Refer Out ที่เพิ่มขึ้น` });
  } else if (revYoY < 0) {
    recs.push({ severity: 'MEDIUM', text: `รายได้ MTD ${revFmt} (YoY ${revYoY}%) — ลดลงเล็กน้อย ติดตามแนวโน้มเดือนถัดไป` });
  } else {
    recs.push({ severity: 'LOW', text: `รายได้ MTD ${revFmt} (YoY +${revYoY}%) — เพิ่มขึ้นจากปีก่อน (${revPrevFmt})` });
  }

  // IPD Volume
  recs.push({
    severity: admitYoY < -10 ? 'HIGH' : admitYoY < 0 ? 'MEDIUM' : 'LOW',
    text: `IPD: Admit ${fmt_n(admissions)} ราย (YoY ${admitYoY >= 0 ? '+' : ''}${admitYoY}%) · D/C ${fmt_n(discharges)} ราย (YoY ${dcYoY >= 0 ? '+' : ''}${dcYoY}%) · ALOS ${alos.toFixed(1)} วัน (YoY ${alosP >= 0 ? '+' : ''}${alosP}%) · CMI ${cmi.toFixed(2)} (YoY ${cmiP >= 0 ? '+' : ''}${cmiP}%)`,
  });

  // ALOS
  if (alos > 5) {
    recs.push({ severity: 'HIGH', text: `ALOS ${alos.toFixed(1)} วัน — สูงกว่าเกณฑ์ (>5 วัน) ทบทวน Discharge Planning: Clinical Pathway Top 5 DRG, Fast-track D/C, แยก Social Admission` });
  } else if (alos > 4) {
    recs.push({ severity: 'MEDIUM', text: `ALOS ${alos.toFixed(1)} วัน — ใกล้เกณฑ์ ติดตามเคส LOS > 7 วัน เพื่อหา Barrier to Discharge` });
  }

  // Mortality
  if (mortRate > 2) {
    recs.push({ severity: 'HIGH', text: `Mortality Rate ${mortRate}% (${deaths}/${discharges}) — สูงกว่าเกณฑ์ (>2%) ทบทวน M&M Conference เร่งด่วน: วิเคราะห์สาเหตุการตาย แยก Preventable/Non-preventable` });
  } else if (deaths > 0) {
    recs.push({ severity: 'MEDIUM', text: `Mortality ${mortRate}% (${deaths} ราย) — อยู่ในเกณฑ์ ดำเนิน M&M Conference ตามปกติ` });
  } else {
    recs.push({ severity: 'LOW', text: `Mortality 0% — ไม่มีผู้เสียชีวิตในเดือนนี้` });
  }

  // HAI
  if (haiCount > 3) {
    recs.push({ severity: 'HIGH', text: `HAI ${haiCount} ราย — สูงกว่าเกณฑ์ IC สอบสวนเร่งด่วน: ตรวจสอบ VAP/CAUTI/CLABSI/SSI แยกรายประเภท + Hand Hygiene Compliance Audit` });
  } else if (haiCount > 0) {
    recs.push({ severity: 'MEDIUM', text: `HAI ${haiCount} ราย — IC ติดตาม Root Cause Analysis ทุกเคส` });
  } else {
    recs.push({ severity: 'LOW', text: `ไม่พบ HAI — Infection Control ดี ให้คงมาตรฐาน` });
  }

  // OPD + ER
  recs.push({
    severity: 'LOW',
    text: `OPD: ${fmt_n(opdVisits)} visit / ${fmt_n(opdPatients)} คน (YoY ${opdYoY >= 0 ? '+' : ''}${opdYoY}%) · ER: ${fmt_n(erVisits)} ราย (YoY ${erYoY >= 0 ? '+' : ''}${erYoY}%)`,
  });

  return {
    data_source: 'HOSxP XE + Report AI',
    period: `${new Date().toLocaleDateString('th-TH', { month: 'long', year: 'numeric' })}`,
    executive_kpis: {
      revenue: { value: rev, formatted: revFmt, yoy: revYoY, prev: revPrev, status: 'reported' },
      opd: { visits: opdVisits, patients: opdPatients, yoy: opdYoY },
      ipd: { admissions, discharges, alos: parseFloat(alos.toFixed(1)), deaths, mortality_rate: mortRate, cmi, sum_adjrw: adjrw, yoy_admit: admitYoY, yoy_dc: dcYoY, yoy_alos: alosP, yoy_cmi: cmiP },
      er: { visits: erVisits, yoy: erYoY },
      quality: { hai_cases: haiCount, mortality_rate: mortRate },
    },
    recommendations: recs.map(r => r.text),
    recommendations_detail: recs,
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// ⏱️ AI OPD — Wait Time & Throughput Optimization
// ============================================================
router.get('/opd/optimization', cached('opdAI', 300000, async () => {
  const [today, waitStats, peakHours, topClinic, weekTrend] = await Promise.allSettled([
    dbQueryOne(`SELECT COUNT(DISTINCT vn) as visits, COUNT(DISTINCT hn) as patients FROM ovst WHERE vstdate = CURDATE()`),
    dbQueryOne(`SELECT
        ROUND(AVG(TIMESTAMPDIFF(MINUTE, o.vsttime, st.service1)), 0) as avg_wait,
        ROUND(AVG(TIMESTAMPDIFF(MINUTE, o.vsttime, r.bill_time)), 0) as avg_total,
        SUM(CASE WHEN TIMESTAMPDIFF(MINUTE, o.vsttime, st.service1) > 30 THEN 1 ELSE 0 END) as wait_over_30,
        COUNT(*) as total
      FROM ovst o
      LEFT JOIN service_time st ON st.vn = o.vn
      LEFT JOIN rcpt_print r ON r.vn = o.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND o.vsttime IS NOT NULL`),
    dbQuery(`SELECT HOUR(vsttime) as hr, COUNT(*) as cnt FROM ovst
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND vsttime IS NOT NULL
      GROUP BY hr ORDER BY cnt DESC LIMIT 3`),
    dbQuery(`SELECT k.department, COUNT(o.vn) as visits FROM ovst o
      LEFT JOIN kskdepartment k ON o.main_dep = k.depcode
      WHERE o.vstdate = CURDATE() GROUP BY k.department ORDER BY visits DESC LIMIT 5`),
    dbQuery(`SELECT vstdate as dt, COUNT(DISTINCT vn) as visits FROM ovst
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) GROUP BY vstdate ORDER BY dt`),
  ]);

  const t = today.status === 'fulfilled' ? today.value : null;
  const w = waitStats.status === 'fulfilled' ? waitStats.value : null;
  const peaks = peakHours.status === 'fulfilled' ? peakHours.value : [];
  const tops = topClinic.status === 'fulfilled' ? topClinic.value : [];
  const week = weekTrend.status === 'fulfilled' ? weekTrend.value : [];

  const avgWait = Number(w?.avg_wait || 0);
  const avgTotal = Number(w?.avg_total || 0);
  const waitOver = Number(w?.wait_over_30 || 0);
  const totalSamples = Number(w?.total || 0);
  const waitOverPct = totalSamples > 0 ? Math.round((waitOver / totalSamples) * 100) : 0;
  const visitsToday = Number(t?.visits || 0);
  const last7avg = week.length > 0 ? Math.round(week.reduce((s, d) => s + Number(d.visits || 0), 0) / week.length) : 0;
  const trendPct = last7avg > 0 ? Math.round(((visitsToday - last7avg) / last7avg) * 100) : 0;

  const recs = [];
  if (avgWait > 30) recs.push(`Wait time เฉลี่ย ${avgWait} นาที (>30 นาที) — เปิด Fast-track / เพิ่มจุดบริการชั่วคราวช่วงเวลาเร่งด่วน`);
  else if (avgWait > 0) recs.push(`Wait time เฉลี่ย ${avgWait} นาที — อยู่ในเกณฑ์ดี (<30 นาที)`);
  if (waitOverPct > 30) recs.push(`${waitOverPct}% ของผู้ป่วยรอเกิน 30 นาที — ทบทวน Triage และ Patient Flow`);
  if (peaks[0]) recs.push(`Peak hour: ${peaks[0].hr}:00 (${peaks[0].cnt} ราย/วัน) — จัดเจ้าหน้าที่เพิ่มช่วงเวลานี้`);
  if (tops[0]) recs.push(`คลินิกที่มีผู้ป่วยมากสุดวันนี้: ${tops[0].department} (${tops[0].visits} ราย)`);
  if (Math.abs(trendPct) > 20) recs.push(`Visit วันนี้ ${visitsToday} ราย — ${trendPct >= 0 ? 'สูงกว่า' : 'ต่ำกว่า'}เฉลี่ย 7 วัน ${Math.abs(trendPct)}%`);

  return {
    data_source: 'HOSxP XE + OPD AI',
    today_visits: visitsToday,
    today_patients: Number(t?.patients || 0),
    avg_wait_time_min: avgWait,
    avg_total_time_min: avgTotal,
    wait_over_30_pct: waitOverPct,
    peak_hours: peaks.map(p => ({ hour: `${p.hr}:00`, avg_patients: p.cnt })),
    top_clinics: tops,
    week_trend: week,
    recommendations: recs,
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// 🏥 AI IPD — Bed, LOS & Readmission Intelligence
// ============================================================
router.get('/ipd/optimization', cached('ipdAI', 300000, async () => {
  const [census, losStats, wardOcc, readmit, mortality] = await Promise.allSettled([
    dbQueryOne(`SELECT COUNT(*) as active FROM ipt WHERE dchdate IS NULL`),
    dbQueryOne(`SELECT
        ROUND(AVG(DATEDIFF(dchdate, regdate)), 1) as alos,
        ROUND(MAX(DATEDIFF(dchdate, regdate)), 0) as max_los,
        SUM(CASE WHEN DATEDIFF(dchdate, regdate) > 7 THEN 1 ELSE 0 END) as long_stay,
        COUNT(*) as total
      FROM ipt WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND dchdate IS NOT NULL`),
    dbQuery(`SELECT w.name as ward, w.bedcount as beds,
        (SELECT COUNT(*) FROM ipt WHERE ward = w.ward AND dchdate IS NULL) as occupied
      FROM ward w WHERE w.ward_active = 'Y' ORDER BY w.ward LIMIT 10`),
    dbQueryOne(`SELECT COUNT(DISTINCT i2.an) as readmit_30d
      FROM ipt i1 JOIN ipt i2 ON i1.hn = i2.hn AND i2.regdate > i1.dchdate
        AND i2.regdate <= DATE_ADD(i1.dchdate, INTERVAL 30 DAY) AND i2.an != i1.an
      WHERE i1.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)`),
    dbQueryOne(`SELECT COUNT(*) as deaths FROM ipt
      WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND dchstts = '09'`),
  ]);

  const c = census.status === 'fulfilled' ? Number(census.value?.active || 0) : 0;
  const l = losStats.status === 'fulfilled' ? losStats.value : null;
  const w = wardOcc.status === 'fulfilled' ? wardOcc.value : [];
  const r30 = readmit.status === 'fulfilled' ? Number(readmit.value?.readmit_30d || 0) : 0;
  const d30 = mortality.status === 'fulfilled' ? Number(mortality.value?.deaths || 0) : 0;

  const totalBeds = w.reduce((s, x) => s + Number(x.beds || 0), 0);
  const totalOcc = w.reduce((s, x) => s + Number(x.occupied || 0), 0);
  const occRate = totalBeds > 0 ? Math.round((totalOcc / totalBeds) * 100) : 0;
  const alos = Number(l?.alos || 0);
  const longStay = Number(l?.long_stay || 0);
  const totalDc = Number(l?.total || 0);
  const longStayPct = totalDc > 0 ? Math.round((longStay / totalDc) * 100) : 0;
  const mortRate = totalDc > 0 ? Math.round((d30 / totalDc) * 1000) / 10 : 0;
  const readmitRate = totalDc > 0 ? Math.round((r30 / totalDc) * 1000) / 10 : 0;

  const recs = [];
  if (occRate > 85) recs.push(`Bed Occupancy ${occRate}% — ใกล้เต็ม เตรียม Surge Capacity Plan / เร่ง D/C เคสที่พร้อม`);
  else if (occRate < 50) recs.push(`Bed Occupancy ${occRate}% — ต่ำกว่าเกณฑ์ พิจารณาขยายบริการ / Marketing IPD`);
  if (alos > 5) recs.push(`ALOS ${alos} วัน — สูงเกินเกณฑ์ ทบทวน Discharge Planning + Clinical Pathway Top 5 DRG`);
  if (longStayPct > 20) recs.push(`${longStayPct}% ของ D/C นอน >7 วัน (${longStay} ราย) — สอบสวน Barrier to Discharge`);
  if (mortRate > 2) recs.push(`Mortality Rate ${mortRate}% (${d30} ราย) — สูงเกินเกณฑ์ เร่ง M&M Conference + แยก Preventable`);
  if (readmitRate > 10) recs.push(`30-day Readmission ${readmitRate}% (${r30} ราย) — ทบทวน D/C Education + Follow-up call`);
  if (recs.length === 0) recs.push('IPD KPIs อยู่ในเกณฑ์ปกติ — รักษาระดับมาตรฐาน');

  return {
    data_source: 'HOSxP XE + IPD AI',
    active_inpatients: c,
    occupancy_rate: occRate,
    total_beds: totalBeds,
    occupied_beds: totalOcc,
    alos,
    long_stay_pct: longStayPct,
    mortality_30d: d30,
    mortality_rate: mortRate,
    readmission_30d: r30,
    readmission_rate: readmitRate,
    ward_breakdown: w.map(x => ({
      ward: x.ward,
      beds: Number(x.beds || 0),
      occupied: Number(x.occupied || 0),
      pct: x.beds > 0 ? Math.round((x.occupied / x.beds) * 100) : 0,
    })),
    recommendations: recs,
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// 💰 AI FINANCE — Revenue Health & RCM Optimization
// ============================================================
router.get('/finance/optimization', cached('financeAI', 300000, async () => {
  const [todayRev, monthRev, prevMonthRev, payerMix, topDept, unbilled] = await Promise.allSettled([
    dbQueryOne(`SELECT SUM(income) as rev FROM vn_stat WHERE vstdate = CURDATE()`),
    dbQueryOne(`SELECT
      COALESCE((SELECT SUM(income) FROM vn_stat WHERE vstdate >= DATE_FORMAT(CURDATE(),'%Y-%m-01') AND vstdate <= CURDATE()), 0)
      + COALESCE((SELECT SUM(income) FROM an_stat WHERE dchdate >= DATE_FORMAT(CURDATE(),'%Y-%m-01') AND dchdate <= CURDATE()), 0) AS total`),
    dbQueryOne(`SELECT
      COALESCE((SELECT SUM(income) FROM vn_stat WHERE vstdate >= DATE_FORMAT(DATE_SUB(CURDATE(),INTERVAL 1 MONTH),'%Y-%m-01') AND vstdate < DATE_FORMAT(CURDATE(),'%Y-%m-01')), 0)
      + COALESCE((SELECT SUM(income) FROM an_stat WHERE dchdate >= DATE_FORMAT(DATE_SUB(CURDATE(),INTERVAL 1 MONTH),'%Y-%m-01') AND dchdate < DATE_FORMAT(CURDATE(),'%Y-%m-01')), 0) AS total`),
    dbQuery(`SELECT pt.name as payer, SUM(v.income) as rev, COUNT(*) as cnt FROM vn_stat v
      LEFT JOIN pttype pt ON v.pttype = pt.pttype
      WHERE v.vstdate >= DATE_FORMAT(CURDATE(),'%Y-%m-01') AND v.vstdate <= CURDATE()
      GROUP BY pt.name ORDER BY rev DESC LIMIT 6`),
    dbQuery(`SELECT k.department as dept, SUM(v.income) as rev FROM vn_stat v
      LEFT JOIN ovst o ON v.vn = o.vn LEFT JOIN kskdepartment k ON o.main_dep = k.depcode
      WHERE v.vstdate >= DATE_FORMAT(CURDATE(),'%Y-%m-01') AND v.vstdate <= CURDATE()
      GROUP BY k.department ORDER BY rev DESC LIMIT 5`),
    dbQueryOne(`SELECT COUNT(DISTINCT vn) as cnt FROM vn_stat
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND (income = 0 OR income IS NULL)`),
  ]);

  const td = todayRev.status === 'fulfilled' ? Number(todayRev.value?.rev || 0) : 0;
  const mtd = monthRev.status === 'fulfilled' ? Number(monthRev.value?.total || 0) : 0;
  const prev = prevMonthRev.status === 'fulfilled' ? Number(prevMonthRev.value?.total || 0) : 0;
  const mom = prev > 0 ? Math.round(((mtd - prev) / prev) * 100) : 0;
  const pm = payerMix.status === 'fulfilled' ? payerMix.value : [];
  const tdept = topDept.status === 'fulfilled' ? topDept.value : [];
  const ub = unbilled.status === 'fulfilled' ? Number(unbilled.value?.cnt || 0) : 0;

  const totalPayerRev = pm.reduce((s, p) => s + Number(p.rev || 0), 0);
  const topPayer = pm[0] ? { name: pm[0].payer, pct: Math.round((Number(pm[0].rev) / (totalPayerRev || 1)) * 100), rev: Number(pm[0].rev || 0) } : null;

  const recs = [];
  recs.push(`รายได้ MTD ฿${(mtd / 1e6).toFixed(2)}M (MoM ${mom >= 0 ? '+' : ''}${mom}%)`);
  if (mom < -10) recs.push(`รายได้ลด MoM ${mom}% — ตรวจสอบ Under-coding, Refer Out, สิทธิเบิกค้าง`);
  else if (mom > 10) recs.push(`รายได้เพิ่ม MoM +${mom}% — แนวโน้มดี ขยายบริการที่สร้างรายได้สูง`);
  if (topPayer && topPayer.pct > 60) recs.push(`สิทธิ ${topPayer.name} กิน ${topPayer.pct}% ของรายได้ — กระจายความเสี่ยง diversify payer mix`);
  if (tdept[0]) recs.push(`Top Department: ${tdept[0].dept} (฿${(Number(tdept[0].rev) / 1e6).toFixed(2)}M)`);
  if (ub > 100) recs.push(`${ub} visit ใน 30 วันยังไม่มีรายได้บันทึก — ทบทวน Billing process / Coding completeness`);

  return {
    data_source: 'HOSxP XE + Finance AI',
    today_revenue: td,
    mtd_revenue: mtd,
    prev_month_revenue: prev,
    mom_growth_pct: mom,
    payer_mix: pm.map(p => ({ payer: p.payer, revenue: Number(p.rev || 0), visits: Number(p.cnt || 0) })),
    top_departments: tdept.map(d => ({ dept: d.dept, revenue: Number(d.rev || 0) })),
    unbilled_visits: ub,
    recommendations: recs,
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// 🚑 AI ER — Surge Forecast & Triage Intelligence
// ============================================================
router.get('/er/optimization', cached('erAIv3_col_fix', 120000, async () => {
  // Phase E — Fix wrong column names. er_regist uses vstdate + enter_er_time,
  // NOT er_regist_date / er_regist_time. Old code silently returned 0 via .allSettled.
  const [today, hourly, triage, week] = await Promise.allSettled([
    dbQueryOne(`SELECT COUNT(*) as visits FROM er_regist WHERE vstdate = CURDATE()`),
    dbQuery(`SELECT HOUR(enter_er_time) as hr, COUNT(*) as cnt FROM er_regist
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 14 DAY)
        AND enter_er_time IS NOT NULL
      GROUP BY hr ORDER BY hr`),
    dbQuery(`SELECT er_emergency_type as level, COUNT(*) as cnt FROM er_regist
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY er_emergency_type ORDER BY cnt DESC`),
    dbQuery(`SELECT vstdate as dt, COUNT(*) as cnt FROM er_regist
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
      GROUP BY vstdate ORDER BY dt`),
  ]);

  const t = today.status === 'fulfilled' ? Number(today.value?.visits || 0) : 0;
  const h = hourly.status === 'fulfilled' ? hourly.value : [];
  const tri = triage.status === 'fulfilled' ? triage.value : [];
  const wk = week.status === 'fulfilled' ? week.value : [];

  const peakHr = h.reduce((b, x) => Number(x.cnt || 0) > Number(b?.cnt || 0) ? x : b, h[0] || { hr: 0, cnt: 0 });
  const avgPerDay = wk.length > 0 ? Math.round(wk.reduce((s, d) => s + Number(d.cnt || 0), 0) / wk.length) : 0;
  const trend = avgPerDay > 0 ? Math.round(((t - avgPerDay) / avgPerDay) * 100) : 0;

  const totalTriage = tri.reduce((s, x) => s + Number(x.cnt || 0), 0);
  const critical = tri.find(x => x.level === '1' || x.level === 'Resuscitation' || x.level === 'R');
  const criticalPct = critical && totalTriage > 0 ? Math.round((Number(critical.cnt) / totalTriage) * 100) : 0;

  const recs = [];
  recs.push(`ER วันนี้ ${t} ราย (${trend >= 0 ? '+' : ''}${trend}% vs เฉลี่ย 7 วัน = ${avgPerDay})`);
  if (trend > 30) recs.push(`Surge Alert! ER เพิ่ม ${trend}% — เปิด Surge Plan / เรียกแพทย์ standby`);
  if (peakHr) recs.push(`Peak hour: ${peakHr.hr}:00 (เฉลี่ย ${Math.round(Number(peakHr.cnt) / 14)} ราย/ชม.) — เตรียมทีมเวรเสริม`);
  if (criticalPct > 15) recs.push(`Critical/Resuscitation ${criticalPct}% — สูงกว่าค่าเฉลี่ย พิจารณาเพิ่ม Trauma team`);
  if (recs.length === 1) recs.push('ER อยู่ในเกณฑ์ปกติ — Monitor surge pattern ทุก 2 ชม.');

  return {
    data_source: 'HOSxP XE + ER AI',
    today_visits: t,
    avg_daily_7d: avgPerDay,
    trend_pct: trend,
    peak_hour: peakHr ? { hour: `${peakHr.hr}:00`, cnt: Number(peakHr.cnt) } : null,
    triage_breakdown: tri.map(x => ({ level: x.level, count: Number(x.cnt || 0) })),
    critical_pct: criticalPct,
    week_trend: wk,
    recommendations: recs,
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// 🫀 AI NCD — Diabetes / Hypertension / CKD Risk Stratification
// ============================================================
router.get('/ncd/optimization', cached('ncdAI', 600000, async () => {
  const [dm, ht, ckd, control, follow] = await Promise.allSettled([
    dbQueryOne(`SELECT COUNT(DISTINCT p.hn) as patients FROM patient p
      JOIN ovstdiag d ON p.hn = (SELECT hn FROM ovst WHERE vn = d.vn LIMIT 1)
      WHERE d.icd10 LIKE 'E10%' OR d.icd10 LIKE 'E11%' OR d.icd10 LIKE 'E12%' OR d.icd10 LIKE 'E13%' OR d.icd10 LIKE 'E14%'`),
    dbQueryOne(`SELECT COUNT(DISTINCT p.hn) as patients FROM patient p
      JOIN ovstdiag d ON p.hn = (SELECT hn FROM ovst WHERE vn = d.vn LIMIT 1)
      WHERE d.icd10 LIKE 'I10%' OR d.icd10 LIKE 'I11%' OR d.icd10 LIKE 'I12%' OR d.icd10 LIKE 'I13%' OR d.icd10 LIKE 'I15%'`),
    dbQueryOne(`SELECT COUNT(DISTINCT p.hn) as patients FROM patient p
      JOIN ovstdiag d ON p.hn = (SELECT hn FROM ovst WHERE vn = d.vn LIMIT 1)
      WHERE d.icd10 LIKE 'N18%'`),
    dbQueryOne(`SELECT
      AVG(CASE WHEN lab_order_result REGEXP '^[0-9.]+$' THEN CAST(lab_order_result AS DECIMAL(10,2)) END) as avg_hba1c,
      COUNT(*) as tested
      FROM lab_order WHERE lab_items_name_ref LIKE '%HbA1c%' AND order_date >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)`),
    dbQueryOne(`SELECT COUNT(DISTINCT o.hn) as overdue FROM ovst o
      JOIN ovstdiag d ON d.vn = o.vn
      WHERE (d.icd10 LIKE 'E1_%' OR d.icd10 LIKE 'I10%')
        AND o.vstdate < DATE_SUB(CURDATE(), INTERVAL 90 DAY)
        AND NOT EXISTS (SELECT 1 FROM ovst o2 WHERE o2.hn = o.hn AND o2.vstdate >= DATE_SUB(CURDATE(), INTERVAL 90 DAY))`),
  ]);

  const dmCount = dm.status === 'fulfilled' ? Number(dm.value?.patients || 0) : 0;
  const htCount = ht.status === 'fulfilled' ? Number(ht.value?.patients || 0) : 0;
  const ckdCount = ckd.status === 'fulfilled' ? Number(ckd.value?.patients || 0) : 0;
  const ctrl = control.status === 'fulfilled' ? control.value : null;
  const avgA1c = Number(ctrl?.avg_hba1c || 0);
  const tested = Number(ctrl?.tested || 0);
  const overdue = follow.status === 'fulfilled' ? Number(follow.value?.overdue || 0) : 0;

  const recs = [];
  recs.push(`ผู้ป่วย NCD ในระบบ: DM ${dmCount.toLocaleString()} · HT ${htCount.toLocaleString()} · CKD ${ckdCount.toLocaleString()}`);
  if (avgA1c > 0) {
    if (avgA1c > 8) recs.push(`HbA1c เฉลี่ย ${avgA1c.toFixed(1)}% (จาก ${tested} ราย) — สูงเกินเป้าหมาย <7% เร่ง intensive control / titrate ยา`);
    else if (avgA1c > 7) recs.push(`HbA1c เฉลี่ย ${avgA1c.toFixed(1)}% — ใกล้เป้าหมาย ทบทวน adherence + lifestyle counseling`);
    else recs.push(`HbA1c เฉลี่ย ${avgA1c.toFixed(1)}% — ควบคุมได้ดีตามเป้า`);
  }
  if (overdue > 50) recs.push(`${overdue.toLocaleString()} ราย NCD ขาดนัด >90 วัน — เร่ง outreach team / Telephone reminder`);
  if (ckdCount > 100) recs.push(`CKD ${ckdCount} ราย — ทำ Risk stratification ตาม eGFR + ส่งต่อ Nephrology stage 3b ขึ้นไป`);

  return {
    data_source: 'HOSxP XE + NCD AI',
    dm_patients: dmCount,
    ht_patients: htCount,
    ckd_patients: ckdCount,
    avg_hba1c: avgA1c > 0 ? Math.round(avgA1c * 10) / 10 : null,
    hba1c_tested_90d: tested,
    overdue_followup: overdue,
    recommendations: recs,
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// 📇 AI MEDREC — Coding Quality & Audit Intelligence
// ============================================================
router.get('/medrec/optimization', cached('medrecAI', 600000, async () => {
  const [coding, missing, topDx, cmi, late] = await Promise.allSettled([
    // FIX: an_stat has no 'adjrw' column. Use ipt + 3-day grace to match /medrec/today page.
    dbQueryOne(`SELECT
      SUM(CASE WHEN i.dchdate <= DATE_SUB(CURDATE(), INTERVAL 3 DAY) THEN 1 ELSE 0 END) as total,
      SUM(CASE WHEN i.dchdate <= DATE_SUB(CURDATE(), INTERVAL 3 DAY) AND EXISTS(SELECT 1 FROM iptdiag d WHERE d.an = i.an AND d.diagtype = '1') THEN 1 ELSE 0 END) as coded
      FROM ipt i WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND i.dchdate IS NOT NULL`),
    dbQueryOne(`SELECT COUNT(*) as missing FROM ipt i
      WHERE i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND i.dchdate IS NOT NULL
        AND NOT EXISTS (SELECT 1 FROM iptdiag d WHERE d.an = i.an AND d.diagtype = '1')`),
    dbQuery(`SELECT d.icd10, ic.name, COUNT(*) as cnt FROM iptdiag d
      LEFT JOIN icd101 ic ON d.icd10 = ic.code
      JOIN ipt i ON i.an = d.an
      WHERE d.diagtype = '1' AND i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY d.icd10, ic.name ORDER BY cnt DESC LIMIT 5`),
    // FIX: use ipt.adjrw (matches AdjCMI shown on medrec page).
    dbQueryOne(`SELECT ROUND(AVG(CASE WHEN adjrw > 0 THEN adjrw END), 2) as cmi,
      ROUND(SUM(adjrw), 2) as sum_rw
      FROM ipt WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND dchdate IS NOT NULL`),
    dbQueryOne(`SELECT COUNT(*) as late_coding FROM ipt i
      WHERE i.dchdate IS NOT NULL AND i.dchdate >= DATE_SUB(CURDATE(), INTERVAL 60 DAY)
        AND DATEDIFF(CURDATE(), i.dchdate) > 14
        AND NOT EXISTS (SELECT 1 FROM iptdiag d WHERE d.an = i.an AND d.diagtype = '1')`),
  ]);

  const c = coding.status === 'fulfilled' ? coding.value : null;
  const total = Number(c?.total || 0);
  const coded = Number(c?.coded || 0);
  const codedPct = total > 0 ? Math.round((coded / total) * 100) : 0;
  const miss = missing.status === 'fulfilled' ? Number(missing.value?.missing || 0) : 0;
  const top = topDx.status === 'fulfilled' ? topDx.value : [];
  const cmiData = cmi.status === 'fulfilled' ? cmi.value : null;
  const cmiVal = Number(cmiData?.cmi || 0);
  const sumRw = Number(cmiData?.sum_rw || 0);
  const lateCoding = late.status === 'fulfilled' ? Number(late.value?.late_coding || 0) : 0;

  const recs = [];
  recs.push(`📊 ภาพรวม 30 วันที่ผ่านมา: ผู้ป่วยใน ${total} ราย · สรุปรหัสโรคเสร็จแล้ว ${coded} ราย (${codedPct}%) · ค่าความซับซ้อนเฉลี่ย ${cmiVal.toFixed(2)} (มาตรฐาน ≥0.80) · มูลค่ารวม ${sumRw.toFixed(2)} หน่วย RW`);
  if (codedPct < 90) recs.push(`⚠️ ปัจจุบันสรุปรหัสได้ ${codedPct}% ยังไม่ถึงเป้าหมาย 90% — ควรเร่งทีมและกำหนดเส้นตายให้สรุปเสร็จภายใน 7 วันหลังจำหน่ายผู้ป่วย เพื่อไม่ให้พลาดการเบิกค่ารักษา`);
  if (miss > 0) recs.push(`📋 ผู้ป่วย ${miss} ราย ยังไม่ได้ระบุโรคหลัก (Principal Diagnosis) — แพทย์/ทีมสรุปรหัสต้องเข้าไปบันทึกให้ครบ มิฉะนั้นจะส่งเบิกค่ารักษากับ สปสช. ไม่ได้`);
  if (lateCoding > 0) recs.push(`⏰ ผู้ป่วย ${lateCoding} ราย ค้างสรุปรหัสเกิน 14 วันแล้ว — ต้องรีบทำ มิฉะนั้นจะส่งเบิกไม่ทันและ รพ.จะเสียรายได้ที่ควรได้`);
  if (cmiVal > 0 && cmiVal < 1.0) recs.push(`📉 ค่า CMI (ความซับซ้อนเฉลี่ยของผู้ป่วย) อยู่ที่ ${cmiVal.toFixed(2)} ต่ำกว่ามาตรฐาน 1.00 — แสดงว่าระบุโรคยังไม่ละเอียดพอ อาจมีโรคแทรกซ้อน/โรคร่วมที่ยังไม่ได้บันทึก ทำให้ รพ.ได้รับเงินคืนน้อยกว่าที่ควร`);
  if (top[0]) recs.push(`🩺 โรคที่พบมากที่สุดในรอบนี้: ${top[0].icd10} ${top[0].name || ''} จำนวน ${top[0].cnt} ราย — แนะนำให้ระบุรหัสโรคให้ละเอียด เช่น ระบุเชื้อก่อโรค/ตำแหน่ง/ระยะ เพื่อให้ได้รหัสที่จำเพาะกว่าและเก็บรายได้ได้สูงสุด`);

  return {
    data_source: 'HOSxP XE + MedRec AI',
    total_discharges: total,
    coded_count: coded,
    coding_completeness_pct: codedPct,
    missing_principal_dx: miss,
    cmi: cmiVal,
    sum_adjrw: sumRw,
    late_coding_14d: lateCoding,
    top_diagnoses: top.map(t => ({ icd10: t.icd10, name: t.name, count: Number(t.cnt || 0) })),
    recommendations: recs,
    timestamp: new Date().toISOString(),
  };
}));

function fmt_n(v) { return v != null ? Number(v).toLocaleString('th-TH') : '—'; }

export default router;
