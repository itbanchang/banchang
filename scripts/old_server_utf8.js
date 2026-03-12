// ============================================================
// BCH 360ยฐ Intelligence V.10 - Main Server
// HOSxP XE + 8 AI Modules โ€” Performance Optimized
// ============================================================
import express from 'express';
import { createServer } from 'http';
import { Server as SocketIO } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

import { getPool, isMySQLConnected, dbQuery, dbQueryOne } from './db/mysql.js';
import hosxp from './db/hosxpIntegration.js';
import { getEWSSummary, getIPDPatientsEWS, calculateNEWS2 } from './ai/ewsEngine.js';
import { forecastRevenue, forecastByPayer } from './ai/forecastEngine.js';
import ai from './ai/aiModules.js';
import financeRoutes from './routes/finance.js';
import ipdRoutes from './routes/ipd.js';
import clinicalRoutes from './routes/clinical.js';
import authRoutes from './routes/auth.js';

const app = express();
const server = createServer(app);
const io = new SocketIO(server, { cors: { origin: '*' } });
const PORT = process.env.PORT || 3001;

// ---- ESM __dirname ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DIST_DIR = path.resolve(__dirname, '..', 'dist');

// ---- Middleware ----
app.use(compression({ level: 6, threshold: 1024 })); // gzip responses >1KB
app.use(cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());
app.use((req, res, next) => {
  req.user = { role: 'admin', username: 'dashboard' };
  next();
});

// ---- Serve Production Frontend (dist/) ----
app.use(express.static(DIST_DIR, { maxAge: '1d', etag: true }));

// ---- Routes ----
app.use('/api/auth', authRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/ipd', ipdRoutes);
app.use('/api/clinical', clinicalRoutes);

// ---- Cache Helper (Stale-While-Revalidate) ----
const cache = {};
function cached(key, ttl, fn) {
  return async (req, res) => {
    const k = key + (req.originalUrl.includes('?') ? req.originalUrl.split('?')[1] : '');
    const entry = cache[k];
    const now = Date.now();

    // HIT โ€” still fresh โ’ return pre-serialized JSON instantly
    if (entry && now - entry.t < ttl) {
      return res.set('X-Cache', 'HIT')
        .set('Cache-Control', `public, max-age=${Math.round(ttl / 1000)}`)
        .type('json').end(entry.json);
    }

    // STALE โ€” expired but exists โ’ return stale immediately, refresh in background
    if (entry && now - entry.t < ttl * 3) {
      res.set('X-Cache', 'STALE')
        .set('Cache-Control', `public, max-age=${Math.round(ttl / 1000)}, stale-while-revalidate=${Math.round(ttl / 500)}`)
        .type('json').end(entry.json);
      // Background refresh (fire-and-forget)
      fn(req).then(data => {
        const json = JSON.stringify(data);
        cache[k] = { d: data, json, t: Date.now() };
      }).catch(() => { });
      return;
    }

    // MISS โ€” fetch fresh
    try {
      const data = await fn(req);
      const json = JSON.stringify(data);
      cache[k] = { d: data, json, t: Date.now() };
      res.set('X-Cache', 'MISS')
        .set('Cache-Control', `public, max-age=${Math.round(ttl / 1000)}`)
        .type('json').end(json);
    } catch (err) { res.status(500).json({ error: err.message }); }
  };
}

// ---- Revenue Fiscal Year Helpers (shared, DRY, Map-optimized) ----
const MONTH_TH_FISCAL = ['', 'เธก.เธ.', 'เธ.เธ.', 'เธกเธต.เธ.', 'เน€เธก.เธข.', 'เธ.เธ.', 'เธกเธด.เธข.', 'เธ.เธ.', 'เธช.เธ.', 'เธ.เธข.', 'เธ•.เธ.', 'เธ.เธข.', 'เธ.เธ.'];
function getFiscalConfig() {
  const now = new Date();
  const cm = now.getMonth() + 1, cy = now.getFullYear();
  const cfs = cm >= 10 ? cy : cy - 1;
  const fiscalYears = [];
  for (let o = 2; o >= 0; o--) {
    const sy = cfs - o;
    fiscalYears.push({ startYear: sy, startDate: `${sy}-10-01`, endDate: `${sy + 1}-09-30`, fiscalBE: sy + 543 + 1 });
  }
  return { fiscalYears, globalStart: fiscalYears[0].startDate, globalEnd: `${cfs + 1}-09-30` };
}
function buildFiscalResult(rows, fiscalYears, dataSource) {
  const m = new Map();
  for (const r of (rows || [])) m.set(`${r.yr}-${r.mo}`, r);
  const result = fiscalYears.map(fy => {
    const months = []; let tR = 0, tV = 0, tP = 0;
    for (let i = 0; i < 12; i++) {
      const mNum = ((9 + i) % 12) + 1, yNum = mNum >= 10 ? fy.startYear : fy.startYear + 1;
      const row = m.get(`${yNum}-${mNum}`);
      const rev = Math.round(Number(row?.revenue || 0)), vis = Number(row?.visit_count || 0), pat = Number(row?.patient_count || 0);
      tR += rev; tV += vis; tP += pat;
      months.push({ month: MONTH_TH_FISCAL[mNum], month_num: mNum, year_num: yNum, revenue: rev, visits: vis, patients: pat, has_data: vis > 0 });
    }
    return {
      fiscal_year_be: fy.fiscalBE, fiscal_label: `เธเธตเธเธ ${fy.fiscalBE}`, start_date: fy.startDate, end_date: fy.endDate,
      total_revenue: tR, total_visits: tV, total_patients: tP, avg_revenue_per_visit: tV > 0 ? Math.round(tR / tV) : 0, months
    };
  });
  return { data_source: dataSource, fiscal_years: result, timestamp: new Date().toISOString() };
}
async function getRevenueFiscal(mainDep, dataSource) {
  const { fiscalYears, globalStart, globalEnd } = getFiscalConfig();
  const sql = mainDep
    ? `SELECT YEAR(o.vstdate) AS yr, MONTH(o.vstdate) AS mo, SUM(v.income) AS revenue, COUNT(DISTINCT o.vn) AS visit_count, COUNT(DISTINCT o.hn) AS patient_count
       FROM ovst o INNER JOIN vn_stat v ON o.vn = v.vn WHERE o.vstdate BETWEEN '${globalStart}' AND LEAST('${globalEnd}', CURDATE()) AND o.main_dep = '${mainDep}' AND v.income > 0
       GROUP BY YEAR(o.vstdate), MONTH(o.vstdate) ORDER BY yr, mo`
    : `SELECT YEAR(vstdate) AS yr, MONTH(vstdate) AS mo, SUM(income) AS revenue, COUNT(DISTINCT vn) AS visit_count, COUNT(DISTINCT hn) AS patient_count
       FROM vn_stat WHERE vstdate BETWEEN '${globalStart}' AND LEAST('${globalEnd}', CURDATE()) GROUP BY YEAR(vstdate), MONTH(vstdate) ORDER BY yr, mo`;
  return buildFiscalResult(await dbQuery(sql), fiscalYears, dataSource);
}

// ---- System Status ----
app.get('/api/system/status', (req, res) => {
  res.json({
    version: '10.0.0', mysql_connected: isMySQLConnected(),
    mysql_host: '10.1.0.3', mysql_db: 'bchhosxpxe',
    data_source: isMySQLConnected() ? 'HOSxP XE (Live)' : 'Disconnected',
    ai_modules: [
      'NEWS2 EWS', 'Revenue Forecast', 'Readmission Risk', 'Bed Demand', 'DRG Optimizer',
      'ER Surge', 'LOS Predictor', 'Billing Anomaly', 'ER Admission Pred', 'ER Wait Forecast'
    ],
    uptime: Math.round(process.uptime())
  });
});

// ---- Dashboard Summary (30s cache) ---- ULTRA-FAST: EWS is non-blocking with timeout
app.get('/api/dashboard/summary', cached('summary', 30000, async () => {
  const start = Date.now();

  // EWS runs in parallel with a 3s timeout
  const ewsPromise = Promise.race([
    getEWSSummary().then(e => ({ critical: e.critical, high: e.high, total: e.total_patients })),
    new Promise(resolve => setTimeout(() => resolve(null), 3000))
  ]).catch(() => null);

  // Current + previous period in parallel for trend calculation
  const [d, ewsStats, prevRevenue, prevOPD, prevIPD, prevER] = await Promise.all([
    hosxp.getDashboardSummary(),
    ewsPromise.then(r => r || { critical: 0, high: 0, total: 0 }),

    // เธฃเธฒเธขเนเธ”เนเน€เธ”เธทเธญเธเธเนเธญเธ (เน€เธเธฃเธตเธขเธเน€เธ—เธตเธขเธ trend)
    dbQueryOne(`
      SELECT SUM(income) as revenue
      FROM opdscreen
      WHERE vstdate >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
        AND vstdate < DATE_FORMAT(CURDATE(), '%Y-%m-01')
    `).catch(() => null),

    // OPD เน€เธกเธทเนเธญเธงเธฒเธ
    dbQueryOne(`
      SELECT COUNT(*) as total FROM ovst
      WHERE vstdate = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
    `).catch(() => null),

    // IPD เธงเธฑเธเธเนเธญเธ
    dbQueryOne(`
      SELECT COUNT(*) as total FROM ipt
      WHERE dchdate IS NULL AND regdate < CURDATE()
    `).catch(() => null),

    // ER เน€เธกเธทเนเธญเธงเธฒเธ
    dbQueryOne(`
      SELECT COUNT(*) as total FROM opdscreen
      WHERE vstdate = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
        AND ipdtype IN (SELECT ipdtype FROM ipt WHERE regdate = DATE_SUB(CURDATE(), INTERVAL 1 DAY) LIMIT 1)
    `).catch(() => null),
  ]);

  const ytd = d.revenue_ytd || 0;
  const exp = Math.round(ytd * 0.62);
  const thisMonth = d.revenue_this_month || 0;
  const prevMonth = Number(prevRevenue?.revenue || 0);

  // เธเธณเธเธงเธ“ trend %
  const calcT = (cur, prev) => {
    if (!prev || prev === 0) return null;
    return Math.round(((cur - prev) / Math.abs(prev)) * 100);
  };

  console.log(`๐“ Dashboard Summary: ${Date.now() - start}ms`);
  return {
    data_source: 'HOSxP XE',
    finance: {
      total_revenue: ytd,
      total_expense: exp,
      net_profit: ytd - exp,
      profit_margin: ytd > 0 ? Math.round(((ytd - exp) / ytd) * 1000) / 10 : 0,
      revenue_this_month: thisMonth,
      trend_revenue: calcT(thisMonth, prevMonth),   // % เน€เธ—เธตเธขเธเน€เธ”เธทเธญเธเธเนเธญเธ
    },
    opd: {
      today_visits: d.opd_today,
      trend_visits: calcT(d.opd_today, Number(prevOPD?.total || 0)),  // % เน€เธ—เธตเธขเธเน€เธกเธทเนเธญเธงเธฒเธ
    },
    ipd: {
      active_admissions: d.ipd_current,
      trend_admissions: calcT(d.ipd_current, Number(prevIPD?.total || 0)),
    },
    er: {
      today_visits: d.er_today,
      trend_visits: calcT(d.er_today, Number(prevER?.total || 0)),
    },
    beds: {
      total: d.total_beds,
      occupied: d.beds_occupied,
      available: d.total_beds - d.beds_occupied,
      occupancy_rate: d.occupancy_rate,
    },
    clinical: {
      critical_patients: ewsStats.critical,
      high_risk_patients: ewsStats.high,
      total_monitored: ewsStats.total,
    },
    claims: { total: 0, denied: 0, denial_rate: 0 },
    last_updated: new Date().toISOString()
  };
}));


// ---- Resource Elasticity ----
app.get('/api/dashboard/resource-elasticity', cached('elasticity', 60000, async () => {
  let bed = 0; try { bed = (await hosxp.getDashboardSummary()).occupancy_rate; } catch { }
  return {
    metrics: [
      { name: 'Bed Occ', value: bed, fullMark: 100 }, { name: 'Staff', value: 72, fullMark: 100 },
      { name: 'Equipment', value: 68, fullMark: 100 }, { name: 'OR', value: 81, fullMark: 100 },
      { name: 'Lab', value: 55, fullMark: 100 }, { name: 'Pharmacy', value: 89, fullMark: 100 }
    ]
  };
}));

// ============================================================
// ๐ฅ OPD Wait Time Analytics โ€” Live from HOSxP XE
// ============================================================

// OPD Today Summary + Patient List with Wait Times
app.get('/api/opd/today', cached('opdToday', 30000, async () => {
  const start = Date.now();

  // Run ALL queries in parallel for maximum speed
  const [summary, breakdown, hourly, patients, analytics, yesterdayHourly, avgHourly7d, medianData, p90Data, revisitData, revenueData, level4Data, yesterdaySummary] = await Promise.all([
    dbQueryOne(`
      SELECT COUNT(*) as total,
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL THEN 1 ELSE 0 END) as still_here,
        AVG(CASE WHEN st.service1 IS NOT NULL AND st.service1 > o.vsttime
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', o.vsttime), CONCAT(o.vstdate, ' ', st.service1)) END) as avg_wait_to_screen,
        AVG(CASE WHEN st.service2 IS NOT NULL AND st.service2 > st.service1
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', st.service1), CONCAT(o.vstdate, ' ', st.service2)) END) as avg_screen_to_doctor,
        AVG(CASE WHEN st.service7 IS NOT NULL AND st.service7 > st.service2
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', st.service2), CONCAT(o.vstdate, ' ', st.service7)) END) as avg_doctor_to_pharmacy,
        AVG(CASE WHEN r.bill_time IS NOT NULL AND r.bill_time > st.service7
          THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate, ' ', st.service7), CONCAT(o.vstdate, ' ', r.bill_time)) END) as avg_pharmacy_to_finance
      FROM ovst o 
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE()
    `),

    // เนเธขเธ เน€เธเธจ + เธเธนเนเธเนเธงเธขเนเธซเธกเน/เน€เธเนเธฒ + KPI เธเธฃเธฐเธชเธดเธ—เธเธดเธ เธฒเธ
    // ovstost: 1=เธเธนเนเธเนเธงเธขเนเธซเธกเน (new), เธญเธทเนเธ=เน€เธเนเธฒ (revisit)
    // p.sex: 1 or 'เธ'=เธเธฒเธข, 2 or 'เธ'=เธซเธเธดเธ
    dbQueryOne(`
      SELECT
        SUM(CASE WHEN p.sex IN ('1','เธ','เธ ','เธเธฒเธข') THEN 1 ELSE 0 END) as male,
        SUM(CASE WHEN p.sex IN ('2','เธ','เธ ','เธซเธเธดเธ') THEN 1 ELSE 0 END) as female,
        SUM(CASE WHEN o.ovstost IN ('1','2') THEN 1 ELSE 0 END) as new_patient,
        SUM(CASE WHEN o.ovstost NOT IN ('1','2') OR o.ovstost IS NULL THEN 1 ELSE 0 END) as revisit_patient,

        -- SLA: % เธ—เธตเนเธฃเธญเนเธกเนเน€เธเธดเธ 60 เธเธฒเธ—เธต (เน€เธเธเธฒเธฐเธ—เธตเนเธกเธตเธเนเธญเธกเธนเธฅ service_time)
        ROUND(
          100.0 * SUM(CASE
            WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime) <= 3600
              AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime) THEN 1
            WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime) <= 3600
              AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime) THEN 1
            ELSE 0 END)
          / NULLIF(SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END), 0)
        , 1) as sla_pct,

        -- เธฃเธญเธเธฒเธเธชเธธเธ” (เธเธฒเธ—เธต) เธงเธฑเธเธเธตเน
        MAX(CASE
          WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
            THEN ROUND((TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60)
          WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
            THEN ROUND((TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60)
          ELSE NULL END) as max_wait,

        -- เธเธณเธเธงเธเธ—เธตเนเธขเธฑเธเธฃเธญเนเธเธ—เธขเนเธซเธฃเธทเธญเธเธณเธฅเธฑเธเธ•เธฃเธงเธ (bottleneck)
        SUM(CASE
          WHEN st.service2 IS NULL AND st.service7 IS NULL AND r.bill_time IS NULL THEN 1
          ELSE 0 END) as waiting_doctor,

        -- Peak hour เธงเธฑเธเธเธตเน
        (SELECT HOUR(vsttime) FROM ovst
          WHERE vstdate = CURDATE() GROUP BY HOUR(vsttime)
          ORDER BY COUNT(*) DESC LIMIT 1) as peak_hour

      FROM ovst o
      INNER JOIN patient p ON o.hn = p.hn
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE()
    `),

    dbQuery(`
      SELECT HOUR(vsttime) as hr, COUNT(*) as cnt
      FROM ovst WHERE vstdate = CURDATE() AND vsttime IS NOT NULL
      GROUP BY HOUR(vsttime) ORDER BY hr
    `),

    dbQuery(`
      SELECT o.vn, o.hn, CONCAT(p.pname,p.fname,' ',p.lname) as name,
        TIMESTAMPDIFF(YEAR,p.birthday,NOW()) as age, p.sex,
        o.vsttime, o.oqueue, o.cur_dep, o.ovstost,
        c.name as clinic_name,
        st.service1 as cur_dep_time,
        st.service2 as doctor_time,
        st.service7 as outtime,
        r.bill_time as finance_time,
        CASE
          WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 'เธเธฅเธฑเธเธเนเธฒเธ'
          WHEN st.service2 IS NOT NULL THEN 'เธฃเธญเธฃเธฑเธเธขเธฒ'
          WHEN st.service1 IS NOT NULL THEN 'เธเธณเธฅเธฑเธเธ•เธฃเธงเธ'
          ELSE 'เธฃเธญเธเธฑเธ”เธเธฃเธญเธ'
        END as current_status,
        CASE
          WHEN r.bill_time IS NOT NULL THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime), CONCAT(o.vstdate,' ',r.bill_time))
          WHEN st.service7 IS NOT NULL THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime), CONCAT(o.vstdate,' ',st.service7))
          WHEN st.service2 IS NOT NULL THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime), CONCAT(o.vstdate,' ',st.service2))
          ELSE TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime), NOW())
        END as total_minutes
      FROM ovst o
      INNER JOIN patient p ON o.hn = p.hn
      LEFT JOIN clinic c ON o.cur_dep = c.clinic
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE()
      ORDER BY o.vsttime DESC LIMIT 200
    `),

    // โ”โ” Advanced Analytics (parallel โ€” no extra latency) โ”โ”
    dbQueryOne(`
      SELECT
        ROUND(STDDEV(CASE
          WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60
          WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 1) as wait_stddev,
        SUM(CASE WHEN st.vn IS NULL THEN 1 ELSE 0 END) as dropout_count,
        ROUND(
          100.0 * AVG(CASE
            WHEN st.service2 IS NOT NULL AND st.service1 IS NOT NULL
              AND TIME_TO_SEC(st.service2) > TIME_TO_SEC(st.service1)
            THEN (TIME_TO_SEC(st.service2) - TIME_TO_SEC(st.service1)) / 60 END)
          / NULLIF(AVG(CASE
            WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60 END), 0)
        , 1) as doctor_yield_pct,
        ROUND(100.0 * SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END)
          / NULLIF(COUNT(*), 0), 1) as completion_rate
      FROM ovst o
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE()
    `),

    // Yesterday hourly
    dbQuery(`
      SELECT HOUR(vsttime) as hr, COUNT(*) as cnt
      FROM ovst WHERE vstdate = DATE_SUB(CURDATE(), INTERVAL 1 DAY) AND vsttime IS NOT NULL
      GROUP BY HOUR(vsttime) ORDER BY hr
    `).catch(() => []),

    // 7-day average hourly (for AI prediction) โ€” simplified, no subquery
    dbQuery(`
      SELECT HOUR(vsttime) as hr,
        ROUND(COUNT(*) / GREATEST(DATEDIFF(CURDATE(), MIN(vstdate)), 1), 0) as avg_cnt,
        COUNT(*) as total_cnt,
        COUNT(DISTINCT vstdate) as num_days
      FROM ovst
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
        AND vstdate < CURDATE()
        AND vsttime IS NOT NULL
      GROUP BY HOUR(vsttime) ORDER BY hr
    `).catch(err => { console.error('โ ๏ธ AI Hourly prediction query failed:', err.message); return []; }),

    // โ”โ” NEW: Advanced Professional KPIs (Level 3) โ”โ”
    // P50 Median + P90 Wait + Revisit 7d + Revenue per Visit + First-Contact Resolution
    dbQueryOne(`
      SELECT
        ROUND((SELECT AVG(t.wait_min) FROM (
          SELECT (TIME_TO_SEC(COALESCE(st2.service7, r2.bill_time)) - TIME_TO_SEC(o2.vsttime)) / 60 as wait_min
          FROM ovst o2
          LEFT JOIN service_time st2 ON o2.vn = st2.vn
          LEFT JOIN rcpt_print r2 ON o2.vn = r2.vn
          WHERE o2.vstdate = CURDATE()
            AND (st2.service7 IS NOT NULL OR r2.bill_time IS NOT NULL)
            AND TIME_TO_SEC(COALESCE(st2.service7, r2.bill_time)) > TIME_TO_SEC(o2.vsttime)
          ORDER BY wait_min
          LIMIT 2 OFFSET (
            SELECT FLOOR(COUNT(*)/2) FROM ovst ox
            LEFT JOIN service_time stx ON ox.vn = stx.vn
            LEFT JOIN rcpt_print rx ON ox.vn = rx.vn
            WHERE ox.vstdate = CURDATE() AND (stx.service7 IS NOT NULL OR rx.bill_time IS NOT NULL)
          )
        ) t), 0) as median_wait
      FROM DUAL
    `).catch(() => ({ median_wait: null })),

    // P90 percentile wait
    dbQueryOne(`
      SELECT ROUND(
        (SELECT MAX(t.wait_min) FROM (
          SELECT (TIME_TO_SEC(COALESCE(st2.service7, r2.bill_time)) - TIME_TO_SEC(o2.vsttime)) / 60 as wait_min
          FROM ovst o2
          LEFT JOIN service_time st2 ON o2.vn = st2.vn
          LEFT JOIN rcpt_print r2 ON o2.vn = r2.vn
          WHERE o2.vstdate = CURDATE()
            AND (st2.service7 IS NOT NULL OR r2.bill_time IS NOT NULL)
            AND TIME_TO_SEC(COALESCE(st2.service7, r2.bill_time)) > TIME_TO_SEC(o2.vsttime)
          ORDER BY wait_min ASC
          LIMIT CEIL(0.9 * (
            SELECT COUNT(*) FROM ovst ox
            LEFT JOIN service_time stx ON ox.vn = stx.vn
            LEFT JOIN rcpt_print rx ON ox.vn = rx.vn
            WHERE ox.vstdate = CURDATE() AND (stx.service7 IS NOT NULL OR rx.bill_time IS NOT NULL)
          ))
        ) t)
      , 0) as p90_wait
      FROM DUAL
    `).catch(() => ({ p90_wait: null })),

    // Revisit within 7 days
    dbQueryOne(`
      SELECT
        COUNT(DISTINCT o2.hn) as revisit_7d_count,
        ROUND(100.0 * COUNT(DISTINCT o2.hn) / NULLIF((SELECT COUNT(DISTINCT hn) FROM ovst WHERE vstdate = CURDATE()), 0), 1) as revisit_7d_pct
      FROM ovst o2
      WHERE o2.vstdate = CURDATE()
        AND EXISTS (
          SELECT 1 FROM ovst o3
          WHERE o3.hn = o2.hn
            AND o3.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
            AND o3.vstdate < CURDATE()
        )
    `).catch(() => ({ revisit_7d_count: 0, revisit_7d_pct: 0 })),

    // Mean revenue per visit
    dbQueryOne(`
      SELECT
        ROUND(AVG(t.total_charge), 0) as avg_revenue_per_visit,
        ROUND(SUM(t.total_charge), 0) as total_opd_revenue
      FROM (
        SELECT o.vn, SUM(oi.qty * oi.unitprice) as total_charge
        FROM ovst o
        INNER JOIN opitemrece oi ON o.vn = oi.vn
        WHERE o.vstdate = CURDATE()
        GROUP BY o.vn
      ) t
    `).catch(() => ({ avg_revenue_per_visit: 0, total_opd_revenue: 0 })),

    // โ”โ” Level 4: Operational Intelligence โ”โ”
    dbQueryOne(`
      SELECT
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly_count,
        ROUND(100.0 * SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) as elderly_pct,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 15 THEN 1 ELSE 0 END) as child_count,
        ROUND(100.0 * SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 15 THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) as child_pct,
        SUM(CASE WHEN HOUR(o.vsttime) < 12 THEN 1 ELSE 0 END) as morning_count,
        SUM(CASE WHEN HOUR(o.vsttime) >= 12 THEN 1 ELSE 0 END) as afternoon_count,
        ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
          THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as avg_time_to_first_service,
        COUNT(DISTINCT o.cur_dep) as active_clinics,
        ROUND(AVG(TIMESTAMPDIFF(YEAR, p.birthday, CURDATE())), 1) as avg_age
      FROM ovst o
      INNER JOIN patient p ON o.hn = p.hn
      LEFT JOIN service_time st ON o.vn = st.vn
      WHERE o.vstdate = CURDATE()
    `).catch(() => ({})),

    // Yesterday summary for comparison
    dbQueryOne(`
      SELECT COUNT(*) as yesterday_total,
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as yesterday_completed,
        ROUND(AVG(CASE WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
          THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60
          WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
          THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 0) as yesterday_avg_wait
      FROM ovst o
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
    `).catch(() => ({})),
  ]);

  const s = summary || {};
  const b = breakdown || {};

  // Throughput: เธฃเธฒเธข/เธเธฑเนเธงเนเธกเธ = เธเธณเธเธงเธเธเธฅเธฑเธเธเนเธฒเธเนเธฅเนเธง / เธเธฑเนเธงเนเธกเธเธ—เธตเนเน€เธเธดเธ”เนเธซเนเธเธฃเธดเธเธฒเธฃ
  const currentHour = new Date().getHours();
  const hoursOpen = Math.max(1, currentHour - 7); // เธชเธกเธกเธ•เธดเน€เธเธดเธ” 08:00
  const throughput = Math.round(Number(s.completed || 0) / hoursOpen);

  console.log(`โฑ๏ธ OPD Today: ${Date.now() - start}ms`);
  return {
    data_source: 'HOSxP XE',
    today_total: s.total || 0,
    completed: s.completed || 0,
    still_here: s.still_here || 0,
    // เน€เธเธจ
    male: Number(b.male || 0),
    female: Number(b.female || 0),
    // เนเธซเธกเน/เน€เธเนเธฒ
    new_patient: Number(b.new_patient || 0),
    revisit_patient: Number(b.revisit_patient || 0),
    // โ”โ” KPI เธเธฃเธฐเธชเธดเธ—เธเธดเธ เธฒเธ (Level 1) โ”โ”
    sla_pct: Number(b.sla_pct || 0),
    max_wait: Number(b.max_wait || 0),
    waiting_doctor: Number(b.waiting_doctor || 0),
    peak_hour: Number(b.peak_hour ?? -1),
    throughput,
    avg_total_minutes: Math.round(
      Number(s.avg_wait_to_screen || 0) +
      Number(s.avg_screen_to_doctor || 0) +
      Number(s.avg_doctor_to_pharmacy || 0) +
      Number(s.avg_pharmacy_to_finance || 0)
    ),
    wait_steps: {
      registration_to_screening: Math.round(s.avg_wait_to_screen || 0),
      screening_to_doctor: Math.round(s.avg_screen_to_doctor || 0),
      doctor_to_pharmacy: Math.round(s.avg_doctor_to_pharmacy || 0),
      pharmacy_to_finance: Math.round(s.avg_pharmacy_to_finance || 0),
    },
    // โ”โ” Advanced Analytics (Level 2) โ”โ”
    wait_stddev: Number(analytics?.wait_stddev || 0),   // ฯ เธเธงเธฒเธกเธเธฑเธเธเธงเธ
    dropout_count: Number(analytics?.dropout_count || 0),   // เธญเธญเธเธเนเธญเธเธฃเธฑเธเธเธฃเธดเธเธฒเธฃ
    dropout_pct: Number(s.total) > 0
      ? Math.round((Number(analytics?.dropout_count || 0) / Number(s.total)) * 100 * 10) / 10
      : 0,
    doctor_yield_pct: Number(analytics?.doctor_yield_pct || 0),  // % เน€เธงเธฅเธฒเธเธฃเธดเธเธเธฑเธเนเธเธ—เธขเน
    completion_rate: Number(analytics?.completion_rate || 0),  // % เธเธฃเธเธ—เธธเธเธเธฑเนเธเธ•เธญเธ
    // Capacity Utilization: visits / (เธ—เธคเธฉเธเธต max = throughput ร— hours_open ร— 1.5)
    capacity_utilization: Math.min(100, Math.round(
      (Number(s.total || 0) / Math.max(1, throughput * hoursOpen * 1.5)) * 100
    )),
    // โ”โ” Professional KPIs (Level 3) โ”โ”
    median_wait: Number(medianData?.median_wait || 0),
    p90_wait: Number(p90Data?.p90_wait || 0),
    revisit_7d_count: Number(revisitData?.revisit_7d_count || 0),
    revisit_7d_pct: Number(revisitData?.revisit_7d_pct || 0),
    avg_revenue_per_visit: Number(revenueData?.avg_revenue_per_visit || 0),
    total_opd_revenue: Number(revenueData?.total_opd_revenue || 0),
    // Patient Throughput Efficiency (PTE): completed / still_here  ratio
    pte_ratio: Number(s.still_here || 0) > 0 ? Math.round((Number(s.completed || 0) / Number(s.still_here || 1)) * 100) / 100 : Number(s.completed || 0) > 0 ? 99 : 0,
    // โ”โ” Level 4: Operational Intelligence โ”โ”
    elderly_count: Number(level4Data?.elderly_count || 0),
    elderly_pct: Number(level4Data?.elderly_pct || 0),
    child_count: Number(level4Data?.child_count || 0),
    child_pct: Number(level4Data?.child_pct || 0),
    morning_count: Number(level4Data?.morning_count || 0),
    afternoon_count: Number(level4Data?.afternoon_count || 0),
    morning_afternoon_ratio: Number(level4Data?.afternoon_count || 0) > 0
      ? Math.round((Number(level4Data?.morning_count || 0) / Number(level4Data?.afternoon_count || 1)) * 100) / 100
      : 0,
    avg_time_to_first_service: Number(level4Data?.avg_time_to_first_service || 0),
    active_clinics: Number(level4Data?.active_clinics || 0),
    avg_age: Number(level4Data?.avg_age || 0),
    revenue_per_hour: hoursOpen > 0 ? Math.round(Number(revenueData?.total_opd_revenue || 0) / hoursOpen) : 0,
    // โ”โ” Level 5: Yesterday Comparison โ”โ”
    yesterday_total: Number(yesterdaySummary?.yesterday_total || 0),
    yesterday_completed: Number(yesterdaySummary?.yesterday_completed || 0),
    yesterday_avg_wait: Number(yesterdaySummary?.yesterday_avg_wait || 0),
    today_vs_yesterday_pct: Number(yesterdaySummary?.yesterday_total || 0) > 0
      ? Math.round(((Number(s.total || 0) - Number(yesterdaySummary?.yesterday_total || 0)) / Number(yesterdaySummary?.yesterday_total || 1)) * 100)
      : 0,
    // Service Quality Index (SQI) โ€” Composite 0-100
    // Weight: SLA 40% + Completion 30% + Stability (ฯ<30=100%) 20% + Yield 10%
    ...(() => {
      const sqiSla = Math.round(Number(b.sla_pct ?? 0));
      const sqiComplete = Math.round(Number(analytics?.completion_rate ?? 0));
      const sqiStability = Math.round(Math.max(0, 100 - Number(analytics?.wait_stddev ?? 30)));
      const sqiYield = Math.round(Math.min(100, Number(analytics?.doctor_yield_pct ?? 0)));
      const sqiScore = Math.round(sqiSla * 0.40 + sqiComplete * 0.30 + sqiStability * 0.20 + sqiYield * 0.10);
      console.log(`๐“ SQI Debug: SLA=${sqiSla} Completion=${sqiComplete} Stability=${sqiStability} Yield=${sqiYield} โ’ SQI=${sqiScore}`);
      return {
        sqi: sqiScore,
        sqi_components: {
          sla_compliance: { score: sqiSla, weight: 40, label: 'SLA Compliance', desc: '% visit เธ—เธตเนเธฃเธญเนเธกเนเน€เธเธดเธเธกเธฒเธ•เธฃเธเธฒเธ' },
          process_completion: { score: sqiComplete, weight: 30, label: 'Process Completion', desc: '% เธ—เธตเนเธเนเธฒเธเธเธฃเธเธ—เธธเธเธเธฑเนเธเธ•เธญเธ' },
          wait_stability: { score: sqiStability, weight: 20, label: 'Wait Stability', desc: 'เธเธงเธฒเธกเธชเธกเนเธณเน€เธชเธกเธญ (ฯ เธ•เนเธณ = เธ”เธต)' },
          doctor_yield: { score: sqiYield, weight: 10, label: 'Doctor Yield', desc: '% เน€เธงเธฅเธฒเธเธฃเธดเธเธเธฑเธเนเธเธ—เธขเน' },
        },
      };
    })(),

    hourly: Array.from({ length: 24 }, (_, h) => ({
      hour: h, label: `${String(h).padStart(2, '0')}:00`,
      count: (hourly || []).find(x => x.hr === h)?.cnt || 0
    })),
    hourly_yesterday: Array.from({ length: 24 }, (_, h) => ({
      hour: h, label: `${String(h).padStart(2, '0')}:00`,
      count: (yesterdayHourly || []).find(x => x.hr === h)?.cnt || 0
    })),
    hourly_prediction: Array.from({ length: 24 }, (_, h) => {
      const avg = Number((avgHourly7d || []).find(x => x.hr === h)?.avg_cnt || 0);
      const sd = Number((avgHourly7d || []).find(x => x.hr === h)?.sd_cnt || 0);
      // AI prediction: weighted avg + small trend adjustment (grow 2% if positive trend)
      const todayVal = (hourly || []).find(x => x.hr === h)?.cnt || 0;
      const predicted = avg > 0 ? Math.round(avg * 1.02 + (todayVal > avg ? (todayVal - avg) * 0.1 : 0)) : 0;
      return { hour: h, label: `${String(h).padStart(2, '0')}:00`, count: predicted, confidence: Math.max(0, Math.round(100 - sd * 5)) };
    }),
    patients: (patients || []).map(pt => ({
      ...pt,
      wait_registration: pt.vsttime && pt.cur_dep_time && pt.cur_dep_time > pt.vsttime ? timeDiffMin(pt.vsttime, pt.cur_dep_time) : null,
      wait_screening: pt.cur_dep_time && pt.doctor_time && pt.doctor_time > pt.cur_dep_time ? timeDiffMin(pt.cur_dep_time, pt.doctor_time) : null,
      wait_doctor: pt.doctor_time && pt.outtime && pt.outtime > pt.doctor_time ? timeDiffMin(pt.doctor_time, pt.outtime) : null,
      wait_pharmacy: pt.outtime && pt.finance_time && pt.finance_time > pt.outtime ? timeDiffMin(pt.outtime, pt.finance_time) : null
    }))
  };
}));


// Wait times by clinic
app.get('/api/opd/by-clinic', cached('opdClinic', 60000, async () => {
  const clinics = await dbQuery(`
    SELECT c.name as clinic, COUNT(*) as visits,
      AVG(CASE WHEN st.service7 IS NOT NULL AND st.service7 > o.vsttime
        THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime), CONCAT(o.vstdate,' ',st.service7)) END) as avg_total,
      AVG(CASE WHEN st.service1 IS NOT NULL AND st.service1 > o.vsttime
        THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime), CONCAT(o.vstdate,' ',st.service1)) END) as avg_wait,
      SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL THEN 1 ELSE 0 END) as still_waiting
    FROM ovst o 
    LEFT JOIN clinic c ON o.cur_dep = c.clinic
    LEFT JOIN service_time st ON o.vn = st.vn
    LEFT JOIN rcpt_print r ON o.vn = r.vn
    WHERE o.vstdate = CURDATE() AND c.name IS NOT NULL
    GROUP BY c.clinic, c.name HAVING visits >= 2
    ORDER BY visits DESC LIMIT 20
  `);
  return {
    data_source: 'HOSxP XE',
    clinics: (clinics || []).map(c => ({
      ...c,
      avg_total: Math.round(c.avg_total || 0),
      avg_wait: Math.round(c.avg_wait || 0)
    }))
  };
}));

// Wait time trends (past 7 days)
app.get('/api/opd/wait-trend', cached('opdTrend', 120000, async () => {
  const trend = await dbQuery(`
    SELECT o.vstdate as date, COUNT(*) as visits,
      AVG(CASE WHEN st.service7 IS NOT NULL AND st.service7 > o.vsttime
        THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime), CONCAT(o.vstdate,' ',st.service7)) END) as avg_total,
      AVG(CASE WHEN st.service1 IS NOT NULL AND st.service1 > o.vsttime
        THEN TIMESTAMPDIFF(MINUTE, CONCAT(o.vstdate,' ',o.vsttime), CONCAT(o.vstdate,' ',st.service1)) END) as avg_wait
    FROM ovst o
    LEFT JOIN service_time st ON o.vn = st.vn
    WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)
    GROUP BY o.vstdate ORDER BY o.vstdate
  `);
  return {
    data_source: 'HOSxP XE',
    trend: (trend || []).map(d => ({ ...d, avg_total: Math.round(d.avg_total || 0), avg_wait: Math.round(d.avg_wait || 0) }))
  };
}));

function timeDiffMin(a, b) {
  if (!a || !b) return null;
  const toMin = t => { const p = String(t).split(':'); return (parseInt(p[0]) || 0) * 60 + (parseInt(p[1]) || 0); };
  const diff = toMin(b) - toMin(a);
  return diff > 0 ? diff : null;
}

// OPD Monthly Trend โ€” เธเธตเธเธเธเธฃเธฐเธกเธฒเธ“ (เธ•.เธ.โ€“เธ.เธข.)
// โก OPTIMIZED: 2 parallel queries + TIME_TO_SEC + 1hr cache
app.get('/api/opd/monthly-fiscal', cached('opdMonthlyFiscal', 3600000, async () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();

  const fiscalStartYear = currentMonth >= 10 ? currentYear : currentYear - 1;
  const fiscalStart = `${fiscalStartYear}-10-01`;
  const fiscalEnd = `${fiscalStartYear + 1}-09-30`;
  const fiscalBE = fiscalStartYear + 543 + 1;

  // เธงเธดเนเธ 2 queries เธเธฃเนเธญเธกเธเธฑเธ:
  // Q1: เธเธฑเธเธฃเธฒเธขเน€เธ”เธทเธญเธ โ€” เนเธกเน JOIN เน€เธฅเธข เน€เธฃเนเธงเธกเธฒเธ
  // Q2: เธเธณเธเธงเธ“เน€เธงเธฅเธฒเธฃเธญ โ€” JOIN service_time เธญเธขเนเธฒเธเน€เธ”เธตเธขเธง + TIME_TO_SEC เนเธ—เธ CONCAT
  const [visitRows, waitRows] = await Promise.all([

    dbQuery(`
      SELECT
        YEAR(vstdate)  AS year_num,
        MONTH(vstdate) AS month_num,
        COUNT(*)       AS total_visits
      FROM ovst
      WHERE vstdate BETWEEN '${fiscalStart}' AND LEAST('${fiscalEnd}', CURDATE())
      GROUP BY YEAR(vstdate), MONTH(vstdate)
    `),

    dbQuery(`
      SELECT
        YEAR(o.vstdate)  AS year_num,
        MONTH(o.vstdate) AS month_num,
        AVG(CASE
          WHEN st.service1 IS NOT NULL
            AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
          THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60
        END) AS avg_reg_to_screen,
        AVG(CASE
          WHEN st.service2 IS NOT NULL AND st.service1 IS NOT NULL
            AND TIME_TO_SEC(st.service2) > TIME_TO_SEC(st.service1)
          THEN (TIME_TO_SEC(st.service2) - TIME_TO_SEC(st.service1)) / 60
        END) AS avg_screen_to_doc,
        AVG(CASE
          WHEN st.service7 IS NOT NULL AND st.service2 IS NOT NULL
            AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(st.service2)
          THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(st.service2)) / 60
        END) AS avg_doc_to_rx
      FROM ovst o
      STRAIGHT_JOIN service_time st ON st.vn = o.vn
      WHERE o.vstdate BETWEEN '${fiscalStart}' AND LEAST('${fiscalEnd}', CURDATE())
        AND st.service1 IS NOT NULL
      GROUP BY YEAR(o.vstdate), MONTH(o.vstdate)
    `)

  ]);

  const MONTH_TH = ['', 'เธก.เธ.', 'เธ.เธ.', 'เธกเธต.เธ.', 'เน€เธก.เธข.', 'เธ.เธ.', 'เธกเธด.เธข.', 'เธ.เธ.', 'เธช.เธ.', 'เธ.เธข.', 'เธ•.เธ.', 'เธ.เธข.', 'เธ.เธ.'];
  const fiscalMonths = [];

  for (let i = 0; i < 12; i++) {
    const mNum = ((9 + i) % 12) + 1;
    const yNum = mNum >= 10 ? fiscalStartYear : fiscalStartYear + 1;

    const vRow = (visitRows || []).find(r => Number(r.month_num) === mNum && Number(r.year_num) === yNum);
    const wRow = (waitRows || []).find(r => Number(r.month_num) === mNum && Number(r.year_num) === yNum);

    const reg = Math.round(Number(wRow?.avg_reg_to_screen || 0));
    const screen = Math.round(Number(wRow?.avg_screen_to_doc || 0));
    const doc = Math.round(Number(wRow?.avg_doc_to_rx || 0));
    const total = reg + screen + doc;

    fiscalMonths.push({
      month: MONTH_TH[mNum],
      month_num: mNum,
      year_num: yNum,
      total_visits: Number(vRow?.total_visits || 0),
      avg_total: total,
      avg_reg: reg,
      avg_screen: screen,
      avg_doc: doc,
      avg_rx: 0,
      has_data: Number(vRow?.total_visits || 0) > 0,
    });
  }

  const withData = fiscalMonths.filter(m => m.has_data && m.avg_total > 0);
  const benchmark = withData.length
    ? Math.round(withData.reduce((s, m) => s + m.avg_total, 0) / withData.length)
    : 0;

  return {
    data_source: 'HOSxP XE',
    fiscal_year_be: fiscalBE,
    fiscal_start: fiscalStart,
    fiscal_end: fiscalEnd,
    benchmark_avg: benchmark,
    months: fiscalMonths,
  };
}));

// โ”โ”โ”โ”โ”โ” OPD Estimated Revenue โ€” Fiscal Year (3 เธเธตเธขเนเธญเธเธซเธฅเธฑเธ) โ”โ”โ”โ”โ”โ”
app.get('/api/opd/revenue-fiscal', cached('opdRevenueFiscal', 3600000, () => getRevenueFiscal(null, 'HOSxP XE ยท vn_stat')));


// ============================================================
// ๐ง  AI MODULES โ€” 8 Endpoints
// ============================================================

// #1 AI EWS (60s cache)
app.get('/api/ai/ews/summary', cached('ews', 60000, async () => {
  const d = await getEWSSummary();
  return { data_source: 'HOSxP XE + AI NEWS2', ...d, timestamp: new Date().toISOString() };
}));
app.get('/api/ai/ews/patients', async (req, res) => {
  try {
    let p = await getIPDPatientsEWS();
    if (req.query.ward) p = p.filter(x => x.ward_id == req.query.ward);
    if (req.query.level) p = p.filter(x => x.ews.risk_level === req.query.level);
    res.json({ patients: p, count: p.length });
  } catch (err) { res.status(500).json({ error: err.message }); }
});
app.post('/api/ai/ews/calculate', (req, res) => res.json(calculateNEWS2(req.body)));

// #2 AI Revenue Forecast (5min cache)
app.get('/api/ai/forecast/revenue', cached('forecast', 300000, async (req) => {
  const m = parseInt(req.query.months) || 6;
  return { data_source: 'HOSxP XE + AI Holt-Winters', ...(await forecastRevenue(m)) };
}));
app.get('/api/ai/forecast/by-payer', cached('fcPayer', 300000, async (req) => {
  return { data_source: 'HOSxP XE + AI', ...(await forecastByPayer(parseInt(req.query.months) || 3)) };
}));

// #3 AI Readmission Risk (2min cache)
app.get('/api/ai/readmission', cached('readmit', 120000, async () => {
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
app.get('/api/ai/bed-demand', cached('bedDemand', 120000, async () => {
  const wards = await ai.getBedDemandForecast();
  const alerts = wards.flatMap(w => w.forecast.filter(f => f.alert).map(f => ({ ward: w.ward, hours: f.hours, rate: f.occupancy_rate })));
  return { data_source: 'HOSxP XE + AI', wards, alerts, alert_count: alerts.length };
}));

// #5 AI DRG Optimizer (5min cache)
app.get('/api/ai/drg-optimizer', cached('drg', 300000, async () => {
  return { data_source: 'HOSxP XE + AI', ...(await ai.getDRGOptimizer()) };
}));

// #6 AI ER Surge (1min cache)
app.get('/api/ai/er-surge', cached('erSurge', 60000, async () => {
  const surge = await ai.getERSurgePrediction();
  const currentHour = new Date().getHours();
  const hourlyForecast = (surge.hourly || []).map(h => ({
    ...h, is_future: h.hour > currentHour
  }));
  const todayPredicted = hourlyForecast.reduce((s, h) => s + (h.predicted || 0), 0);
  const next4h = hourlyForecast.filter(h => h.hour > currentHour && h.hour <= currentHour + 4).reduce((s, h) => s + (h.predicted || 0), 0);
  const peakH = hourlyForecast.reduce((best, h) => (h.predicted || 0) > (best.predicted || 0) ? h : best, { hour: 0, predicted: 0 });

  // Day-of-week pattern from real data
  const dayNames = ['', 'เธญเธฒ.', 'เธ.', 'เธญ.', 'เธ.', 'เธเธค.', 'เธจ.', 'เธช.'];
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

// ============================================================
// ๐‘ ER Operations โ€” Live from HOSxP XE
// ============================================================
app.get('/api/er/today-patients', cached('erPatients', 30000, async () => {
  const patients = await hosxp.getERTodayPatients();
  const predicted = await ai.getERAdmissionPrediction(patients);
  const forecast = await ai.getERWaitTimeForecast(patients);
  return {
    data_source: 'HOSxP XE + AI Admission & Wait Time Predictor',
    patients: predicted,
    wait_time_forecast: forecast
  };
}));

app.get('/api/er/triage-stats', cached('erTriage', 30000, async () => {
  return { data_source: 'HOSxP XE', stats: await hosxp.getERTriageStats() };
}));

app.get('/api/er/flow-bottlenecks', cached('erBottlenecks', 60000, async () => {
  const flowData = await hosxp.getERFlowAnalytics();
  const analysis = await ai.getERBottleneckAI(flowData);
  return analysis;
}));

// โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”
// ๐”ฌ Professional ER Analytics โ€” Advanced KPIs
// โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”โ”
app.get('/api/er/analytics', cached('erAnalytics', 300000, async () => {
  const [
    // 1. ER Visit Summary (30 เธงเธฑเธ)
    visitSummary,
    // 2. Return Visit Rate (72h revisit)
    returnVisit,
    // 3. Disposition Analysis โ€” admit vs เธเธณเธซเธเนเธฒเธข
    disposition,
    // 4. Time-to-Doctor
    timeToDoctor,
    // 5. Triage-level Stay Time
    triageStayTime,
    // 6. Hourly Load Heatmap (30 เธงเธฑเธ)
    hourlyLoad,
    // 7. Left Without Being Seen (LWBS)
    lwbs,
    // 8. ER Cost per Visit
    erCost,
    // 9. Monthly ER Trend (6 เน€เธ”เธทเธญเธ)
    monthlyTrend,
    // 10. Today Acuity
    todayAcuity
  ] = await Promise.all([
    // 1. ER Visit Summary
    dbQueryOne(`
      SELECT
        COUNT(*) as total_visits_30d,
        COUNT(DISTINCT DATE(e.vstdate)) as active_days,
        ROUND(COUNT(*) / NULLIF(COUNT(DISTINCT DATE(e.vstdate)), 0), 1) as avg_daily,
        COUNT(DISTINCT e.vn) as unique_visits
      FROM er_regist e
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `).catch(() => null),

    // 2. Return Visit (72h) โ€” HA Quality Indicator
    dbQueryOne(`
      SELECT
        COUNT(DISTINCT e2.vn) as return_count,
        COUNT(DISTINCT e1.vn) as total_visits,
        ROUND(100.0 * COUNT(DISTINCT e2.vn) / NULLIF(COUNT(DISTINCT e1.vn), 0), 1) as return_rate
      FROM er_regist e1
      LEFT JOIN er_regist e2
        ON e1.vn != e2.vn
        AND e2.vstdate BETWEEN e1.vstdate AND DATE_ADD(e1.vstdate, INTERVAL 3 DAY)
        AND EXISTS (
          SELECT 1 FROM ovst o1 INNER JOIN ovst o2 ON o1.hn = o2.hn
          WHERE o1.vn = e1.vn AND o2.vn = e2.vn
        )
      WHERE e1.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `).catch(() => null),

    // 3. Disposition Analysis
    dbQuery(`
      SELECT
        e.er_dch_type as dch_type,
        COUNT(*) as cnt,
        ROUND(AVG(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.finish_time))), 0) as avg_stay_min
      FROM er_regist e
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND e.er_dch_type IS NOT NULL
      GROUP BY e.er_dch_type
      ORDER BY cnt DESC
    `).catch(() => []),

    // 4. Time-to-Doctor (Triage โ’ Doctor Tx)
    dbQueryOne(`
      SELECT
        ROUND(AVG(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.doctor_tx_time))), 0) as avg_time_to_doctor,
        ROUND(STDDEV(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.doctor_tx_time))), 0) as sd_time_to_doctor,
        MAX(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.doctor_tx_time))) as max_time,
        SUM(CASE WHEN TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.doctor_tx_time) > 30 THEN 1 ELSE 0 END) as over_30m,
        SUM(CASE WHEN TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.doctor_tx_time) <= 10 THEN 1 ELSE 0 END) as within_10m,
        COUNT(*) as total
      FROM er_regist e
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND e.doctor_tx_time IS NOT NULL
        AND e.enter_er_time IS NOT NULL
        AND TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.doctor_tx_time) BETWEEN 0 AND 300
    `).catch(() => null),

    // 5. Triage-level Stay Time
    dbQuery(`
      SELECT
        e.er_emergency_type as triage,
        COUNT(*) as cnt,
        ROUND(AVG(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, COALESCE(e.finish_time, NOW())))), 0) as avg_stay,
        ROUND(AVG(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, e.doctor_tx_time))), 0) as avg_wait_doctor
      FROM er_regist e
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND e.enter_er_time IS NOT NULL
      GROUP BY e.er_emergency_type
      ORDER BY e.er_emergency_type
    `).catch(() => []),

    // 6. Hourly Load Heatmap (30 เธงเธฑเธ)
    dbQuery(`
      SELECT
        HOUR(e.enter_er_time) as hour,
        COUNT(*) as total,
        ROUND(COUNT(*) / 30.0, 1) as avg_per_day,
        SUM(CASE WHEN e.er_emergency_type IN ('1','2') THEN 1 ELSE 0 END) as critical_count
      FROM er_regist e
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND e.enter_er_time IS NOT NULL
      GROUP BY HOUR(e.enter_er_time)
      ORDER BY hour
    `).catch(() => []),

    // 7. LWBS / Left Without Treatment
    dbQueryOne(`
      SELECT
        SUM(CASE WHEN e.er_dch_type IN ('4', '5') OR (e.doctor_tx_time IS NULL AND e.finish_time IS NOT NULL) THEN 1 ELSE 0 END) as lwbs_count,
        COUNT(*) as total,
        ROUND(100.0 * SUM(CASE WHEN e.er_dch_type IN ('4', '5') OR (e.doctor_tx_time IS NULL AND e.finish_time IS NOT NULL) THEN 1 ELSE 0 END)
          / NULLIF(COUNT(*), 0), 1) as lwbs_rate
      FROM er_regist e
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
    `).catch(() => null),

    // 8. Average Cost per ER Visit
    dbQueryOne(`
      SELECT
        ROUND(AVG(v.income), 0) as avg_cost,
        ROUND(STDDEV(v.income), 0) as sd_cost,
        ROUND(SUM(v.income), 0) as total_revenue,
        MAX(v.income) as max_cost
      FROM er_regist e
      INNER JOIN vn_stat v ON e.vn = v.vn
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND v.income > 0
    `).catch(() => null),

    // 9. Monthly Trend (6 เน€เธ”เธทเธญเธ)
    dbQuery(`
      SELECT
        DATE_FORMAT(e.vstdate, '%Y-%m') as month,
        COUNT(*) as visits,
        SUM(CASE WHEN e.er_emergency_type IN ('1','2') THEN 1 ELSE 0 END) as critical,
        ROUND(AVG(GREATEST(0, TIMESTAMPDIFF(MINUTE, e.enter_er_time, COALESCE(e.finish_time, NOW())))), 0) as avg_stay
      FROM er_regist e
      WHERE e.vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
      GROUP BY DATE_FORMAT(e.vstdate, '%Y-%m')
      ORDER BY month
    `).catch(() => []),

    // 10. Today Acuity Summary
    dbQueryOne(`
      SELECT
        SUM(CASE WHEN e.er_emergency_type = '1' THEN 1 ELSE 0 END) as resus,
        SUM(CASE WHEN e.er_emergency_type = '2' THEN 1 ELSE 0 END) as emerg,
        SUM(CASE WHEN e.er_emergency_type = '3' THEN 1 ELSE 0 END) as urgent,
        SUM(CASE WHEN e.er_emergency_type = '4' THEN 1 ELSE 0 END) as semi,
        SUM(CASE WHEN e.er_emergency_type = '5' THEN 1 ELSE 0 END) as non_urg,
        COUNT(*) as total,
        ROUND(100.0 * SUM(CASE WHEN e.er_emergency_type IN ('1','2') THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) as acuity_pct
      FROM er_regist e
      WHERE e.vstdate = CURDATE()
    `).catch(() => null)
  ]);

  // โ”โ” Calculations โ”โ”

  // Triage stay time data (formatted)
  const TRIAGE_NAMES = { 1: 'Resuscitation', 2: 'Emergency', 3: 'Urgent', 4: 'Semi-urgent', 5: 'Non-urgent' };
  const TRIAGE_COLORS = { 1: '#f43f5e', 2: '#f59e0b', 3: '#eab308', 4: '#10b981', 5: '#94a3b8' };
  const triageData = (triageStayTime || []).map(t => ({
    triage: Number(t.triage),
    name: TRIAGE_NAMES[t.triage] || `Level ${t.triage}`,
    color: TRIAGE_COLORS[t.triage] || '#94a3b8',
    count: Number(t.cnt || 0),
    avg_stay: Number(t.avg_stay || 0),
    avg_wait_doctor: Number(t.avg_wait_doctor || 0),
  }));

  // Hourly heatmap (fill all 24 hours)
  const hourlyData = Array.from({ length: 24 }, (_, h) => {
    const d = (hourlyLoad || []).find(x => Number(x.hour) === h);
    return {
      hour: h,
      label: `${String(h).padStart(2, '0')}:00`,
      total: Number(d?.total || 0),
      avg: Number(d?.avg_per_day || 0),
      critical: Number(d?.critical_count || 0),
    };
  });
  const peakHour = hourlyData.reduce((best, h) => h.avg > (best?.avg || 0) ? h : best, hourlyData[0]);

  // Disposition formatting
  const DISPO_NAMES = {
    '1': 'เธเธฅเธฑเธเธเนเธฒเธ', '2': 'Admit IPD', '3': 'เธชเนเธเธ•เนเธญ Refer',
    '4': 'เธเธเธดเน€เธชเธเธฃเธฑเธเธฉเธฒ', '5': 'เธซเธเธตเธเธฅเธฑเธ', '9': 'เน€เธชเธตเธขเธเธตเธงเธดเธ•'
  };
  const dispoData = (disposition || []).map(d => ({
    type: d.dch_type,
    name: DISPO_NAMES[d.dch_type] || `Type ${d.dch_type}`,
    count: Number(d.cnt || 0),
    avg_stay: Number(d.avg_stay_min || 0),
  }));
  const admitCount = dispoData.find(d => d.type === '2')?.count || 0;
  const totalDispo = dispoData.reduce((s, d) => s + d.count, 0);
  const admitRate = totalDispo > 0 ? Math.round((admitCount / totalDispo) * 100 * 10) / 10 : 0;

  // Monthly trend
  const MONTH_TH = ['', 'เธก.เธ.', 'เธ.เธ.', 'เธกเธต.เธ.', 'เน€เธก.เธข.', 'เธ.เธ.', 'เธกเธด.เธข.', 'เธ.เธ.', 'เธช.เธ.', 'เธ.เธข.', 'เธ•.เธ.', 'เธ.เธข.', 'เธ.เธ.'];
  const monthData = (monthlyTrend || []).map(m => ({
    month: MONTH_TH[parseInt(m.month?.split('-')[1])] || m.month,
    visits: Number(m.visits || 0),
    critical: Number(m.critical || 0),
    avg_stay: Number(m.avg_stay || 0),
  }));

  // โ”โ” ER Performance Index (EPI) โ€” Composite 0-100 โ”โ”
  // Weight: Time-to-Doctor 30% + LWBS 20% + Return Rate 20% + Acuity Match 15% + Cost Efficiency 15%
  const avgTTD = Number(timeToDoctor?.avg_time_to_doctor || 30);
  const ttdScore = Math.max(0, Math.round(100 - (avgTTD - 10) * 3)); // 10min = 100, 40+ = 0
  const lwbsRate = Number(lwbs?.lwbs_rate || 0);
  const lwbsScore = Math.max(0, Math.round(100 - lwbsRate * 10));
  const returnRate = Number(returnVisit?.return_rate || 0);
  const returnScore = Math.max(0, Math.round(100 - returnRate * 5));
  const acuityMatch = Number(todayAcuity?.acuity_pct || 0);
  const acuityScore = Math.min(100, Math.round(50 + acuityMatch)); // Some critical cases = good ER function
  const avgCost = Number(erCost?.avg_cost || 1500);
  const costScore = Math.min(100, Math.round((5000 / Math.max(avgCost, 1)) * 50)); // lower cost = higher score

  const epi = Math.round(
    (ttdScore * 0.30) +
    (lwbsScore * 0.20) +
    (returnScore * 0.20) +
    (acuityScore * 0.15) +
    (costScore * 0.15)
  );

  return {
    data_source: 'HOSxP XE',

    // Composite
    epi,  // ER Performance Index 0-100
    epi_components: {
      time_to_doctor: ttdScore,
      lwbs: lwbsScore,
      return_visit: returnScore,
      acuity: acuityScore,
      cost: costScore,
    },

    // Visit Summary
    total_visits_30d: Number(visitSummary?.total_visits_30d || 0),
    avg_daily_visits: Number(visitSummary?.avg_daily || 0),

    // Return Visit
    return_visit_rate: returnRate,
    return_visit_count: Number(returnVisit?.return_count || 0),

    // Time to Doctor
    avg_time_to_doctor: avgTTD,
    sd_time_to_doctor: Number(timeToDoctor?.sd_time_to_doctor || 0),
    over_30m_count: Number(timeToDoctor?.over_30m || 0),
    within_10m_count: Number(timeToDoctor?.within_10m || 0),
    within_10m_pct: Number(timeToDoctor?.total) > 0
      ? Math.round((Number(timeToDoctor.within_10m || 0) / Number(timeToDoctor.total)) * 100 * 10) / 10 : 0,

    // LWBS
    lwbs_count: Number(lwbs?.lwbs_count || 0),
    lwbs_rate: lwbsRate,

    // Admission Rate
    admit_rate: admitRate,
    admit_count: admitCount,

    // ER Cost
    avg_cost_per_visit: avgCost,
    total_er_revenue: Number(erCost?.total_revenue || 0),
    max_cost: Number(erCost?.max_cost || 0),

    // Today Acuity
    today_acuity: {
      resus: Number(todayAcuity?.resus || 0),
      emerg: Number(todayAcuity?.emerg || 0),
      urgent: Number(todayAcuity?.urgent || 0),
      semi: Number(todayAcuity?.semi || 0),
      non_urg: Number(todayAcuity?.non_urg || 0),
      total: Number(todayAcuity?.total || 0),
      acuity_pct: Number(todayAcuity?.acuity_pct || 0),
    },

    // Detail data
    triage_stay_time: triageData,
    hourly_heatmap: hourlyData,
    peak_hour: { hour: peakHour?.hour, label: peakHour?.label, avg: peakHour?.avg },
    disposition: dispoData,
    monthly_trend: monthData,

    timestamp: new Date().toISOString(),
  };
}));

// โ”โ”โ”โ”โ”โ” ER Estimated Revenue โ€” Fiscal Year (3 เธเธตเธขเนเธญเธเธซเธฅเธฑเธ) โ”โ”โ”โ”โ”โ”
app.get('/api/er/revenue-fiscal', cached('erRevenueFiscal', 3600000, async () => {
  const now = new Date();
  const currentMonth = now.getMonth() + 1;
  const currentYear = now.getFullYear();
  const currentFiscalStartYear = currentMonth >= 10 ? currentYear : currentYear - 1;

  const MONTH_TH = ['', 'เธก.เธ.', 'เธ.เธ.', 'เธกเธต.เธ.', 'เน€เธก.เธข.', 'เธ.เธ.', 'เธกเธด.เธข.', 'เธ.เธ.', 'เธช.เธ.', 'เธ.เธข.', 'เธ•.เธ.', 'เธ.เธข.', 'เธ.เธ.'];

  const fiscalYears = [];
  for (let offset = 2; offset >= 0; offset--) {
    const startYear = currentFiscalStartYear - offset;
    fiscalYears.push({
      startYear,
      startDate: `${startYear}-10-01`,
      endDate: `${startYear + 1}-09-30`,
      fiscalBE: startYear + 543 + 1,
    });
  }

  const globalStart = fiscalYears[0].startDate;
  const globalEnd = `${currentFiscalStartYear + 1}-09-30`;

  const rows = await dbQuery(`
    SELECT
      YEAR(e.vstdate) AS yr,
      MONTH(e.vstdate) AS mo,
      SUM(v.income) AS revenue,
      COUNT(DISTINCT e.vn) AS visit_count,
      COUNT(DISTINCT o.hn) AS patient_count
    FROM er_regist e
    INNER JOIN vn_stat v ON e.vn = v.vn
    INNER JOIN ovst o ON e.vn = o.vn
    WHERE e.vstdate BETWEEN '${globalStart}' AND LEAST('${globalEnd}', CURDATE())
      AND v.income > 0
    GROUP BY YEAR(e.vstdate), MONTH(e.vstdate)
    ORDER BY yr, mo
  `);

  const result = fiscalYears.map(fy => {
    const months = [];
    let totalRevenue = 0;
    let totalVisits = 0;
    let totalPatients = 0;

    for (let i = 0; i < 12; i++) {
      const mNum = ((9 + i) % 12) + 1;
      const yNum = mNum >= 10 ? fy.startYear : fy.startYear + 1;

      const row = (rows || []).find(r => Number(r.yr) === yNum && Number(r.mo) === mNum);
      const rev = Math.round(Number(row?.revenue || 0));
      const visits = Number(row?.visit_count || 0);
      const patients = Number(row?.patient_count || 0);

      totalRevenue += rev;
      totalVisits += visits;
      totalPatients += patients;

      months.push({
        month: MONTH_TH[mNum], month_num: mNum, year_num: yNum,
        revenue: rev, visits, patients, has_data: visits > 0,
      });
    }

    return {
      fiscal_year_be: fy.fiscalBE,
      fiscal_label: `เธเธตเธเธ ${fy.fiscalBE}`,
      start_date: fy.startDate, end_date: fy.endDate,
      total_revenue: totalRevenue,
      total_visits: totalVisits,
      total_patients: totalPatients,
      avg_revenue_per_visit: totalVisits > 0 ? Math.round(totalRevenue / totalVisits) : 0,
      months,
    };
  });

  return {
    data_source: 'HOSxP XE ยท vn_stat + er_regist',
    fiscal_years: result,
    timestamp: new Date().toISOString(),
  };
}));

// ============================================================
// ๐ฆท Dental Analytics โ€” HOSxP XE
// ============================================================

// Diagnostic: All specialties in DB (to find correct dental codes)
app.get('/api/debug/specialties', async (req, res) => {
  try {
    const rows = await dbQuery(`
      SELECT o.spclty, s.name, COUNT(*) as cnt
      FROM ovst o
      LEFT JOIN spclty s ON o.spclty = s.spclty
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
      GROUP BY o.spclty, s.name
      ORDER BY cnt DESC
    `);
    res.json(rows);
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Diagnostic: Check service_time columns for a department
app.get('/api/debug/service-time/:dep', async (req, res) => {
  try {
    const dep = req.params.dep;
    const rows = await dbQuery(`
      SELECT
        COUNT(*) as total_visits,
        SUM(CASE WHEN st.vn IS NOT NULL THEN 1 ELSE 0 END) as has_service_time,
        SUM(CASE WHEN st.service1 IS NOT NULL THEN 1 ELSE 0 END) as has_s1,
        SUM(CASE WHEN st.service2 IS NOT NULL THEN 1 ELSE 0 END) as has_s2,
        SUM(CASE WHEN st.service3 IS NOT NULL THEN 1 ELSE 0 END) as has_s3,
        SUM(CASE WHEN st.service4 IS NOT NULL THEN 1 ELSE 0 END) as has_s4,
        SUM(CASE WHEN st.service5 IS NOT NULL THEN 1 ELSE 0 END) as has_s5,
        SUM(CASE WHEN st.service6 IS NOT NULL THEN 1 ELSE 0 END) as has_s6,
        SUM(CASE WHEN st.service7 IS NOT NULL THEN 1 ELSE 0 END) as has_s7,
        SUM(CASE WHEN r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as has_bill_time
      FROM ovst o
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE() AND o.main_dep = ?
    `, [dep]);
    res.json({ main_dep: dep, data: rows[0] || {} });
  } catch (e) { res.status(500).json({ error: e.message }); }
});

// Dental Today Summary
app.get('/api/dental/today', cached('dentalToday', 30000, async () => {
  const [summary, hourly, topProc] = await Promise.all([
    dbQueryOne(`
      SELECT
        COUNT(*) as total,
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL THEN 1 ELSE 0 END) as waiting,
        COUNT(DISTINCT o.hn) as unique_patients,
        ROUND(AVG(CASE
          WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
          WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 0) as avg_total_time,
        ROUND(AVG(CASE
          WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 0) as avg_wait_time,
        SUM(CASE WHEN p.sex IN ('1','เธ','เธเธฒเธข') THEN 1 ELSE 0 END) as male,
        SUM(CASE WHEN p.sex IN ('2','เธ','เธซเธเธดเธ') THEN 1 ELSE 0 END) as female,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 12 THEN 1 ELSE 0 END) as children,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly,
        ROUND(AVG(TIMESTAMPDIFF(YEAR, p.birthday, CURDATE())), 1) as avg_age
      FROM ovst o
      INNER JOIN patient p ON o.hn = p.hn
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE()
        AND o.main_dep = '010'
    `).catch(() => null),

    dbQuery(`
      SELECT HOUR(o.vsttime) as hr, COUNT(*) as cnt
      FROM ovst o
      WHERE o.vstdate = CURDATE() AND o.vsttime IS NOT NULL
        AND o.main_dep = '010'
      GROUP BY HOUR(o.vsttime) ORDER BY hr
    `).catch(() => []),

    dbQuery(`
      SELECT d.icd10, d.icd10_name as name, COUNT(*) as cnt
      FROM ovstdiag od
      INNER JOIN ovst o ON od.vn = o.vn
      LEFT JOIN icd101 d ON od.icd10 = d.icd10
      WHERE o.vstdate = CURDATE()
        AND o.main_dep = '010'
      GROUP BY od.icd10, d.icd10_name
      ORDER BY cnt DESC LIMIT 10
    `).catch(() => []),
  ]);

  const hourlyArr = Array.from({ length: 24 }, (_, h) => {
    const d = (hourly || []).find(x => Number(x.hr) === h);
    return { hour: h, label: `${String(h).padStart(2, '0')}:00`, count: Number(d?.cnt || 0) };
  });

  return {
    data_source: 'HOSxP XE',
    total: Number(summary?.total || 0),
    completed: Number(summary?.completed || 0),
    waiting: Number(summary?.waiting || 0),
    unique_patients: Number(summary?.unique_patients || 0),
    avg_total_time: Number(summary?.avg_total_time || 0),
    avg_wait_time: Number(summary?.avg_wait_time || 0),
    male: Number(summary?.male || 0),
    female: Number(summary?.female || 0),
    children: Number(summary?.children || 0),
    elderly: Number(summary?.elderly || 0),
    avg_age: Number(summary?.avg_age || 0),
    hourly: hourlyArr,
    top_diagnoses: (topProc || []).map(p => ({
      icd10: p.icd10, name: p.name, count: Number(p.cnt || 0)
    })),
    timestamp: new Date().toISOString(),
  };
}));

// Dental Analytics (30-day, 5min cache)
app.get('/api/dental/analytics', cached('dentalAnalytics', 300000, async () => {
  const [
    visitSummary,
    waitTimeSummary,
    completionData,
    revenueData,
    monthlyTrend,
    diagnosisTop,
    ageDistribution,
    dailyPattern,
    revisitData,
    slaCounts
  ] = await Promise.all([
    // 1. Visit Summary (30 days)
    dbQueryOne(`
      SELECT
        COUNT(*) as total_visits,
        COUNT(DISTINCT DATE(o.vstdate)) as active_days,
        ROUND(COUNT(*) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 1) as avg_daily,
        COUNT(DISTINCT o.hn) as unique_patients,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 12 THEN 1 ELSE 0 END) as children_total,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly_total,
        SUM(CASE WHEN p.sex IN ('1','เธ','เธเธฒเธข') THEN 1 ELSE 0 END) as male_total,
        SUM(CASE WHEN p.sex IN ('2','เธ','เธซเธเธดเธ') THEN 1 ELSE 0 END) as female_total
      FROM ovst o
      INNER JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.main_dep = '010'
    `).catch(() => null),

    // 2. Wait Time Analytics
    dbQueryOne(`
      SELECT
        ROUND(AVG(CASE
          WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 0) as avg_wait,
        ROUND(STDDEV(CASE
          WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 0) as sd_wait,
        ROUND(AVG(CASE
          WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
          WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 0) as avg_total_time,
        ROUND(STDDEV(CASE
          WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
          WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 0) as sd_total_time,
        SUM(CASE
          WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
            AND (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 > 30
          THEN 1 ELSE 0 END) as wait_over_30m
      FROM ovst o
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.main_dep = '010'
        AND o.vsttime IS NOT NULL
    `).catch(() => null),

    // 3. Completion Rate
    dbQueryOne(`
      SELECT
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as completed,
        COUNT(*) as total,
        ROUND(100.0 * SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) as completion_rate,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL AND o.vstdate < CURDATE() THEN 1 ELSE 0 END) as dropout
      FROM ovst o
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.main_dep = '010'
    `).catch(() => null),

    // 4. Revenue
    dbQueryOne(`
      SELECT
        ROUND(AVG(v.income), 0) as avg_revenue,
        ROUND(STDDEV(v.income), 0) as sd_revenue,
        ROUND(SUM(v.income), 0) as total_revenue,
        MAX(v.income) as max_revenue,
        COUNT(*) as billable_visits,
        ROUND(SUM(v.income) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 0) as daily_revenue
      FROM ovst o
      INNER JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.main_dep = '010'
        AND v.income > 0
    `).catch(() => null),

    // 5. Monthly Trend (6 months)
    dbQuery(`
      SELECT
        DATE_FORMAT(o.vstdate, '%Y-%m') as month,
        COUNT(*) as visits,
        COUNT(DISTINCT o.hn) as patients,
        ROUND(AVG(v.income), 0) as avg_rev,
        ROUND(SUM(v.income), 0) as total_rev
      FROM ovst o
      LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH)
        AND o.main_dep = '010'
      GROUP BY DATE_FORMAT(o.vstdate, '%Y-%m')
      ORDER BY month
    `).catch(() => []),

    // 6. Top Diagnoses (30-day)
    dbQuery(`
      SELECT od.icd10, d.icd10_name as name, COUNT(*) as cnt,
        ROUND(AVG(v.income), 0) as avg_rev
      FROM ovstdiag od
      INNER JOIN ovst o ON od.vn = o.vn
      LEFT JOIN icd101 d ON od.icd10 = d.icd10
      LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.main_dep = '010'
      GROUP BY od.icd10, d.icd10_name
      ORDER BY cnt DESC LIMIT 10
    `).catch(() => []),

    // 7. Age Distribution
    dbQuery(`
      SELECT
        CASE
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 6 THEN '0-5'
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 12 THEN '6-11'
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 18 THEN '12-17'
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 35 THEN '18-34'
          WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 60 THEN '35-59'
          ELSE '60+'
        END as age_group,
        COUNT(*) as cnt
      FROM ovst o
      INNER JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.main_dep = '010'
      GROUP BY age_group
      ORDER BY FIELD(age_group, '0-5','6-11','12-17','18-34','35-59','60+')
    `).catch(() => []),

    // 8. Daily Pattern (30-day hourly average)
    dbQuery(`
      SELECT
        HOUR(o.vsttime) as hour,
        COUNT(*) as total,
        ROUND(COUNT(*) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 1) as avg_daily
      FROM ovst o
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.main_dep = '010'
        AND o.vsttime IS NOT NULL
      GROUP BY HOUR(o.vsttime)
      ORDER BY hour
    `).catch(() => []),

    // 9. Revisit Rate (same patient within 7 days)
    dbQueryOne(`
      SELECT
        COUNT(DISTINCT o2.vn) as revisit_count,
        COUNT(DISTINCT o1.vn) as total_visits,
        ROUND(100.0 * COUNT(DISTINCT o2.vn) / NULLIF(COUNT(DISTINCT o1.vn), 0), 1) as revisit_rate
      FROM ovst o1
      LEFT JOIN ovst o2
        ON o1.hn = o2.hn AND o1.vn != o2.vn
        AND o2.vstdate BETWEEN DATE_ADD(o1.vstdate, INTERVAL 1 DAY) AND DATE_ADD(o1.vstdate, INTERVAL 7 DAY)
        AND o2.main_dep = '010'
      WHERE o1.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o1.main_dep = '010'
    `).catch(() => null),

    // 10. SLA (<30min wait + <60min total)
    dbQueryOne(`
      SELECT
        SUM(CASE
          WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
            AND (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 <= 30
          THEN 1 ELSE 0 END) as wait_sla_pass,
        SUM(CASE
          WHEN (r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
            AND (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60 <= 60)
          OR (st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
            AND (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60 <= 60)
          THEN 1 ELSE 0 END) as total_sla_pass,
        COUNT(*) as total
      FROM ovst o
      LEFT JOIN service_time st ON o.vn = st.vn
      LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND o.main_dep = '010'
        AND o.vsttime IS NOT NULL
    `).catch(() => null),
  ]);

  // โ”€โ”€ Derived calculations โ”€โ”€
  const totalVisits = Number(visitSummary?.total_visits || 0);
  const avgDaily = Number(visitSummary?.avg_daily || 0);
  const uniquePatients = Number(visitSummary?.unique_patients || 0);
  const avgWait = Number(waitTimeSummary?.avg_wait || 0);
  const sdWait = Number(waitTimeSummary?.sd_wait || 0);
  const avgTotal = Number(waitTimeSummary?.avg_total_time || 0);
  const waitOver30m = Number(waitTimeSummary?.wait_over_30m || 0);
  const completionRate = Number(completionData?.completion_rate || 0);
  const dropoutCount = Number(completionData?.dropout || 0);
  const avgRevenue = Number(revenueData?.avg_revenue || 0);
  const totalRevenue = Number(revenueData?.total_revenue || 0);
  const dailyRevenue = Number(revenueData?.daily_revenue || 0);
  const revisitRate = Number(revisitData?.revisit_rate || 0);
  const waitSlaPct = Number(slaCounts?.total) > 0
    ? Math.round((Number(slaCounts.wait_sla_pass || 0) / Number(slaCounts.total)) * 100 * 10) / 10 : 0;
  const totalSlaPct = Number(slaCounts?.total) > 0
    ? Math.round((Number(slaCounts.total_sla_pass || 0) / Number(slaCounts.total)) * 100 * 10) / 10 : 0;

  // โ”€โ”€ DPI: Dental Performance Index (0-100) โ”€โ”€
  const waitScore = Math.max(0, Math.round(100 - (avgWait - 10) * 3));
  const completionScore = Math.round(Math.min(100, completionRate));
  const revisitScore = Math.max(0, Math.round(100 - revisitRate * 8));
  const revenueScore = Math.min(100, Math.round(avgRevenue / 20));
  const slaScore = Math.round(waitSlaPct);

  const dpi = Math.round(
    (waitScore * 0.25) +
    (completionScore * 0.25) +
    (revisitScore * 0.15) +
    (revenueScore * 0.15) +
    (slaScore * 0.20)
  );

  // Hourly pattern
  const hourlyArr = Array.from({ length: 24 }, (_, h) => {
    const d = (dailyPattern || []).find(x => Number(x.hour) === h);
    return { hour: h, label: `${String(h).padStart(2, '0')}:00`, avg: Number(d?.avg_daily || 0), total: Number(d?.total || 0) };
  });
  const peakHr = hourlyArr.reduce((best, h) => h.avg > (best?.avg || 0) ? h : best, hourlyArr[0]);

  // Monthly trend TH
  const MTH = ['', 'เธก.เธ.', 'เธ.เธ.', 'เธกเธต.เธ.', 'เน€เธก.เธข.', 'เธ.เธ.', 'เธกเธด.เธข.', 'เธ.เธ.', 'เธช.เธ.', 'เธ.เธข.', 'เธ•.เธ.', 'เธ.เธข.', 'เธ.เธ.'];
  const monthData = (monthlyTrend || []).map(m => ({
    month: MTH[parseInt(m.month?.split('-')[1])] || m.month,
    visits: Number(m.visits || 0),
    patients: Number(m.patients || 0),
    avg_rev: Number(m.avg_rev || 0),
    total_rev: Number(m.total_rev || 0),
  }));

  return {
    data_source: 'HOSxP XE',
    // Composite
    dpi,
    dpi_components: { wait_time: waitScore, completion: completionScore, revisit: revisitScore, revenue: revenueScore, sla: slaScore },
    // Volume
    total_visits: totalVisits,
    avg_daily_visits: avgDaily,
    unique_patients: uniquePatients,
    children_total: Number(visitSummary?.children_total || 0),
    elderly_total: Number(visitSummary?.elderly_total || 0),
    male_total: Number(visitSummary?.male_total || 0),
    female_total: Number(visitSummary?.female_total || 0),
    // Wait Time
    avg_wait_time: avgWait,
    sd_wait_time: sdWait,
    avg_total_time: avgTotal,
    sd_total_time: Number(waitTimeSummary?.sd_total_time || 0),
    wait_over_30m: waitOver30m,
    wait_sla_pct: waitSlaPct,
    total_sla_pct: totalSlaPct,
    // Quality
    completion_rate: completionRate,
    dropout_count: dropoutCount,
    revisit_rate: revisitRate,
    revisit_count: Number(revisitData?.revisit_count || 0),
    // Revenue
    avg_revenue_per_visit: avgRevenue,
    total_revenue: totalRevenue,
    daily_revenue: dailyRevenue,
    max_revenue: Number(revenueData?.max_revenue || 0),
    // Detail data
    hourly_pattern: hourlyArr,
    peak_hour: { hour: peakHr?.hour, label: peakHr?.label, avg: peakHr?.avg },
    monthly_trend: monthData,
    top_diagnoses: (diagnosisTop || []).map(d => ({ icd10: d.icd10, name: d.name, count: Number(d.cnt || 0), avg_rev: Number(d.avg_rev || 0) })),
    age_distribution: (ageDistribution || []).map(a => ({ group: a.age_group, count: Number(a.cnt || 0) })),
    timestamp: new Date().toISOString(),
  };
}));

// โ”โ”โ”โ”โ”โ” Dental Estimated Revenue โ€” Fiscal Year (3 เธเธตเธขเนเธญเธเธซเธฅเธฑเธ) โ”โ”โ”โ”โ”โ”
app.get('/api/dental/revenue-fiscal', cached('dentalRevenueFiscal', 3600000, () => getRevenueFiscal('010', 'HOSxP XE ยท vn_stat (dental)')));

// ============================================================
// ๐ฟ Thai Traditional Medicine (เนเธเธ—เธขเนเนเธเธเนเธ—เธข) โ€” HOSxP XE
// ============================================================

app.get('/api/thaimedicine/today', cached('ttmToday', 30000, async () => {
  const [summary, hourly, topProc] = await Promise.all([
    dbQueryOne(`
      SELECT COUNT(*) as total,
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL THEN 1 ELSE 0 END) as waiting,
        COUNT(DISTINCT o.hn) as unique_patients,
        ROUND(AVG(CASE WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
          WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 0) as avg_total_time,
        ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 0) as avg_wait_time,
        SUM(CASE WHEN p.sex IN ('1','เธ','เธเธฒเธข') THEN 1 ELSE 0 END) as male,
        SUM(CASE WHEN p.sex IN ('2','เธ','เธซเธเธดเธ') THEN 1 ELSE 0 END) as female,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly,
        ROUND(AVG(TIMESTAMPDIFF(YEAR, p.birthday, CURDATE())), 1) as avg_age
      FROM ovst o INNER JOIN patient p ON o.hn = p.hn
      LEFT JOIN service_time st ON o.vn = st.vn LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE() AND o.main_dep = '003'
    `).catch(() => null),
    dbQuery(`SELECT HOUR(o.vsttime) as hr, COUNT(*) as cnt FROM ovst o
      WHERE o.vstdate = CURDATE() AND o.vsttime IS NOT NULL AND o.main_dep = '003'
      GROUP BY HOUR(o.vsttime) ORDER BY hr`).catch(() => []),
    dbQuery(`SELECT d.icd10, d.icd10_name as name, COUNT(*) as cnt
      FROM ovstdiag od INNER JOIN ovst o ON od.vn = o.vn LEFT JOIN icd101 d ON od.icd10 = d.icd10
      WHERE o.vstdate = CURDATE() AND o.main_dep = '003'
      GROUP BY od.icd10, d.icd10_name ORDER BY cnt DESC LIMIT 10`).catch(() => []),
  ]);
  return {
    data_source: 'HOSxP XE', total: Number(summary?.total || 0), completed: Number(summary?.completed || 0),
    waiting: Number(summary?.waiting || 0), unique_patients: Number(summary?.unique_patients || 0),
    avg_total_time: Number(summary?.avg_total_time || 0), avg_wait_time: Number(summary?.avg_wait_time || 0),
    male: Number(summary?.male || 0), female: Number(summary?.female || 0),
    elderly: Number(summary?.elderly || 0), avg_age: Number(summary?.avg_age || 0),
    hourly: Array.from({ length: 24 }, (_, h) => {
      const d = (hourly || []).find(x => Number(x.hr) === h);
      return { hour: h, label: `${String(h).padStart(2, '0')}:00`, count: Number(d?.cnt || 0) };
    }),
    top_diagnoses: (topProc || []).map(p => ({ icd10: p.icd10, name: p.name, count: Number(p.cnt || 0) })),
    timestamp: new Date().toISOString(),
  };
}));

app.get('/api/thaimedicine/analytics', cached('ttmAnalytics', 300000, async () => {
  const [visitSummary, waitTime, completion, revenue, monthly, diagTop, ageDist, dailyPat, revisit, sla] = await Promise.all([
    dbQueryOne(`SELECT COUNT(*) as total_visits, COUNT(DISTINCT DATE(o.vstdate)) as active_days,
      ROUND(COUNT(*) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 1) as avg_daily,
      COUNT(DISTINCT o.hn) as unique_patients,
      SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly_total,
      SUM(CASE WHEN p.sex IN ('1','เธ','เธเธฒเธข') THEN 1 ELSE 0 END) as male_total,
      SUM(CASE WHEN p.sex IN ('2','เธ','เธซเธเธดเธ') THEN 1 ELSE 0 END) as female_total
      FROM ovst o INNER JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '003'`).catch(() => null),

    dbQueryOne(`SELECT
      ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as avg_wait,
      ROUND(STDDEV(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as sd_wait,
      ROUND(AVG(CASE WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
        WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as avg_total_time,
      ROUND(STDDEV(CASE WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
        WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as sd_total,
      SUM(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        AND (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 > 30 THEN 1 ELSE 0 END) as wait_over_30m
      FROM ovst o LEFT JOIN service_time st ON o.vn = st.vn LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '003' AND o.vsttime IS NOT NULL`).catch(() => null),

    dbQueryOne(`SELECT
      SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as completed,
      COUNT(*) as total,
      ROUND(100.0 * SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) as completion_rate,
      SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL AND o.vstdate < CURDATE() THEN 1 ELSE 0 END) as dropout
      FROM ovst o LEFT JOIN service_time st ON o.vn = st.vn LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '003'`).catch(() => null),

    dbQueryOne(`SELECT ROUND(AVG(v.income), 0) as avg_revenue, ROUND(SUM(v.income), 0) as total_revenue,
      MAX(v.income) as max_revenue, ROUND(SUM(v.income) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 0) as daily_revenue
      FROM ovst o INNER JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '003' AND v.income > 0`).catch(() => null),

    dbQuery(`SELECT DATE_FORMAT(o.vstdate, '%Y-%m') as month, COUNT(*) as visits,
      COUNT(DISTINCT o.hn) as patients, ROUND(AVG(v.income), 0) as avg_rev, ROUND(SUM(v.income), 0) as total_rev
      FROM ovst o LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND o.main_dep = '003'
      GROUP BY DATE_FORMAT(o.vstdate, '%Y-%m') ORDER BY month`).catch(() => []),

    dbQuery(`SELECT od.icd10, d.icd10_name as name, COUNT(*) as cnt, ROUND(AVG(v.income), 0) as avg_rev
      FROM ovstdiag od INNER JOIN ovst o ON od.vn = o.vn LEFT JOIN icd101 d ON od.icd10 = d.icd10
      LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '003'
      GROUP BY od.icd10, d.icd10_name ORDER BY cnt DESC LIMIT 10`).catch(() => []),

    dbQuery(`SELECT CASE
        WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 18 THEN '<18'
        WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 35 THEN '18-34'
        WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 60 THEN '35-59'
        ELSE '60+' END as age_group, COUNT(*) as cnt
      FROM ovst o INNER JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '003'
      GROUP BY age_group ORDER BY FIELD(age_group, '<18','18-34','35-59','60+')`).catch(() => []),

    dbQuery(`SELECT HOUR(o.vsttime) as hour, COUNT(*) as total,
      ROUND(COUNT(*) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 1) as avg_daily
      FROM ovst o WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '003' AND o.vsttime IS NOT NULL
      GROUP BY HOUR(o.vsttime) ORDER BY hour`).catch(() => []),

    dbQueryOne(`SELECT COUNT(DISTINCT o2.vn) as revisit_count, COUNT(DISTINCT o1.vn) as total_visits,
      ROUND(100.0 * COUNT(DISTINCT o2.vn) / NULLIF(COUNT(DISTINCT o1.vn), 0), 1) as revisit_rate
      FROM ovst o1 LEFT JOIN ovst o2 ON o1.hn = o2.hn AND o1.vn != o2.vn
        AND o2.vstdate BETWEEN DATE_ADD(o1.vstdate, INTERVAL 1 DAY) AND DATE_ADD(o1.vstdate, INTERVAL 7 DAY)
        AND o2.main_dep = '003'
      WHERE o1.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o1.main_dep = '003'`).catch(() => null),

    dbQueryOne(`SELECT
      SUM(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        AND (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 <= 30 THEN 1 ELSE 0 END) as wait_sla_pass,
      COUNT(*) as total
      FROM ovst o LEFT JOIN service_time st ON o.vn = st.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '003' AND o.vsttime IS NOT NULL`).catch(() => null),
  ]);

  const tv = Number(visitSummary?.total_visits || 0);
  const ad = Number(visitSummary?.avg_daily || 0);
  const up = Number(visitSummary?.unique_patients || 0);
  const aw = Number(waitTime?.avg_wait || 0);
  const sw = Number(waitTime?.sd_wait || 0);
  const at = Number(waitTime?.avg_total_time || 0);
  const st2 = Number(waitTime?.sd_total || 0);
  const w30 = Number(waitTime?.wait_over_30m || 0);
  const cr = Number(completion?.completion_rate || 0);
  const dc = Number(completion?.dropout || 0);
  const ar = Number(revenue?.avg_revenue || 0);
  const tr = Number(revenue?.total_revenue || 0);
  const dr2 = Number(revenue?.daily_revenue || 0);
  const rr = Number(revisit?.revisit_rate || 0);
  const wsp = Number(sla?.total) > 0 ? Math.round((Number(sla.wait_sla_pass || 0) / Number(sla.total)) * 1000) / 10 : 0;

  const ws = Math.max(0, Math.round(100 - (aw - 10) * 3));
  const cs = Math.round(Math.min(100, cr));
  const rs = Math.max(0, Math.round(100 - rr * 8));
  const rvs = Math.min(100, Math.round(ar / 15));
  const ss = Math.round(wsp);
  const tpi = Math.round((ws * 0.25) + (cs * 0.25) + (rs * 0.15) + (rvs * 0.15) + (ss * 0.20));

  const hourlyArr = Array.from({ length: 24 }, (_, h) => {
    const d = (dailyPat || []).find(x => Number(x.hour) === h);
    return { hour: h, label: `${String(h).padStart(2, '0')}:00`, avg: Number(d?.avg_daily || 0), total: Number(d?.total || 0) };
  });
  const peakHr = hourlyArr.reduce((b, h) => h.avg > (b?.avg || 0) ? h : b, hourlyArr[0]);
  const MTH = ['', 'เธก.เธ.', 'เธ.เธ.', 'เธกเธต.เธ.', 'เน€เธก.เธข.', 'เธ.เธ.', 'เธกเธด.เธข.', 'เธ.เธ.', 'เธช.เธ.', 'เธ.เธข.', 'เธ•.เธ.', 'เธ.เธข.', 'เธ.เธ.'];

  return {
    data_source: 'HOSxP XE', tpi,
    tpi_components: { wait_time: ws, completion: cs, revisit: rs, revenue: rvs, sla: ss },
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
    timestamp: new Date().toISOString(),
  };
}));

// โ”โ”โ”โ”โ”โ” Thai Medicine Revenue โ€” Fiscal Year (3 เธเธตเธขเนเธญเธเธซเธฅเธฑเธ) โ”โ”โ”โ”โ”โ”
app.get('/api/thaimedicine/revenue-fiscal', cached('ttmRevenueFiscal', 3600000, () => getRevenueFiscal('003', 'HOSxP XE ยท vn_stat (TTM)')));

// ============================================================
// ๐๏ธ Physical Therapy (เธเธฒเธขเธ เธฒเธเธเธณเธเธฑเธ”) โ€” HOSxP XE
// spclty: 11=เน€เธงเธเธเธฃเธฃเธกเธเธทเนเธเธเธน, 12=เธเธฒเธขเธ เธฒเธเธเธณเธเธฑเธ”
// ============================================================

app.get('/api/physicaltherapy/today', cached('ptToday', 30000, async () => {
  const [summary, hourly, topProc] = await Promise.all([
    dbQueryOne(`
      SELECT COUNT(*) as total,
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL THEN 1 ELSE 0 END) as waiting,
        COUNT(DISTINCT o.hn) as unique_patients,
        ROUND(AVG(CASE WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
          WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 0) as avg_total_time,
        ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60
          ELSE NULL END), 0) as avg_wait_time,
        SUM(CASE WHEN p.sex IN ('1','เธ','เธเธฒเธข') THEN 1 ELSE 0 END) as male,
        SUM(CASE WHEN p.sex IN ('2','เธ','เธซเธเธดเธ') THEN 1 ELSE 0 END) as female,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly,
        ROUND(AVG(TIMESTAMPDIFF(YEAR, p.birthday, CURDATE())), 1) as avg_age
      FROM ovst o INNER JOIN patient p ON o.hn = p.hn
      LEFT JOIN service_time st ON o.vn = st.vn LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate = CURDATE() AND o.main_dep = '034'
    `).catch(() => null),
    dbQuery(`SELECT HOUR(o.vsttime) as hr, COUNT(*) as cnt FROM ovst o
      WHERE o.vstdate = CURDATE() AND o.vsttime IS NOT NULL AND o.main_dep = '034'
      GROUP BY HOUR(o.vsttime) ORDER BY hr`).catch(() => []),
    dbQuery(`SELECT d.icd10, d.icd10_name as name, COUNT(*) as cnt
      FROM ovstdiag od INNER JOIN ovst o ON od.vn = o.vn LEFT JOIN icd101 d ON od.icd10 = d.icd10
      WHERE o.vstdate = CURDATE() AND o.main_dep = '034'
      GROUP BY od.icd10, d.icd10_name ORDER BY cnt DESC LIMIT 10`).catch(() => []),
  ]);
  return {
    data_source: 'HOSxP XE', total: Number(summary?.total || 0), completed: Number(summary?.completed || 0),
    waiting: Number(summary?.waiting || 0), unique_patients: Number(summary?.unique_patients || 0),
    avg_total_time: Number(summary?.avg_total_time || 0), avg_wait_time: Number(summary?.avg_wait_time || 0),
    male: Number(summary?.male || 0), female: Number(summary?.female || 0),
    elderly: Number(summary?.elderly || 0), avg_age: Number(summary?.avg_age || 0),
    hourly: Array.from({ length: 24 }, (_, h) => {
      const d = (hourly || []).find(x => Number(x.hr) === h);
      return { hour: h, label: `${String(h).padStart(2, '0')}:00`, count: Number(d?.cnt || 0) };
    }),
    top_diagnoses: (topProc || []).map(p => ({ icd10: p.icd10, name: p.name, count: Number(p.cnt || 0) })),
    timestamp: new Date().toISOString(),
  };
}));

app.get('/api/physicaltherapy/analytics', cached('ptAnalytics', 300000, async () => {
  const [visitSummary, waitTime, completion, revenue, monthly, diagTop, ageDist, dailyPat, revisit, sla] = await Promise.all([
    dbQueryOne(`SELECT COUNT(*) as total_visits, COUNT(DISTINCT DATE(o.vstdate)) as active_days,
      ROUND(COUNT(*) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 1) as avg_daily,
      COUNT(DISTINCT o.hn) as unique_patients,
      SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly_total,
      SUM(CASE WHEN p.sex IN ('1','เธ','เธเธฒเธข') THEN 1 ELSE 0 END) as male_total,
      SUM(CASE WHEN p.sex IN ('2','เธ','เธซเธเธดเธ') THEN 1 ELSE 0 END) as female_total
      FROM ovst o INNER JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '034'`).catch(() => null),
    dbQueryOne(`SELECT
      ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as avg_wait,
      ROUND(STDDEV(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as sd_wait,
      ROUND(AVG(CASE WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
        WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as avg_total_time,
      ROUND(STDDEV(CASE WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
        WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as sd_total,
      SUM(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        AND (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 > 30 THEN 1 ELSE 0 END) as wait_over_30m
      FROM ovst o LEFT JOIN service_time st ON o.vn = st.vn LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '034' AND o.vsttime IS NOT NULL`).catch(() => null),
    dbQueryOne(`SELECT
      SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as completed, COUNT(*) as total,
      ROUND(100.0 * SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) as completion_rate,
      SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL AND o.vstdate < CURDATE() THEN 1 ELSE 0 END) as dropout
      FROM ovst o LEFT JOIN service_time st ON o.vn = st.vn LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '034'`).catch(() => null),
    dbQueryOne(`SELECT ROUND(AVG(v.income), 0) as avg_revenue, ROUND(SUM(v.income), 0) as total_revenue,
      MAX(v.income) as max_revenue, ROUND(SUM(v.income) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 0) as daily_revenue
      FROM ovst o INNER JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '034' AND v.income > 0`).catch(() => null),
    dbQuery(`SELECT DATE_FORMAT(o.vstdate, '%Y-%m') as month, COUNT(*) as visits,
      COUNT(DISTINCT o.hn) as patients, ROUND(AVG(v.income), 0) as avg_rev, ROUND(SUM(v.income), 0) as total_rev
      FROM ovst o LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND o.main_dep = '034'
      GROUP BY DATE_FORMAT(o.vstdate, '%Y-%m') ORDER BY month`).catch(() => []),
    dbQuery(`SELECT od.icd10, d.icd10_name as name, COUNT(*) as cnt, ROUND(AVG(v.income), 0) as avg_rev
      FROM ovstdiag od INNER JOIN ovst o ON od.vn = o.vn LEFT JOIN icd101 d ON od.icd10 = d.icd10
      LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '034'
      GROUP BY od.icd10, d.icd10_name ORDER BY cnt DESC LIMIT 10`).catch(() => []),
    dbQuery(`SELECT CASE
        WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 18 THEN '<18'
        WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 35 THEN '18-34'
        WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) < 60 THEN '35-59'
        ELSE '60+' END as age_group, COUNT(*) as cnt
      FROM ovst o INNER JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '034'
      GROUP BY age_group ORDER BY FIELD(age_group, '<18','18-34','35-59','60+')`).catch(() => []),
    dbQuery(`SELECT HOUR(o.vsttime) as hour, COUNT(*) as total,
      ROUND(COUNT(*) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 1) as avg_daily
      FROM ovst o WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '034' AND o.vsttime IS NOT NULL
      GROUP BY HOUR(o.vsttime) ORDER BY hour`).catch(() => []),
    dbQueryOne(`SELECT COUNT(DISTINCT o2.vn) as revisit_count, COUNT(DISTINCT o1.vn) as total_visits,
      ROUND(100.0 * COUNT(DISTINCT o2.vn) / NULLIF(COUNT(DISTINCT o1.vn), 0), 1) as revisit_rate
      FROM ovst o1 LEFT JOIN ovst o2 ON o1.hn = o2.hn AND o1.vn != o2.vn
        AND o2.vstdate BETWEEN DATE_ADD(o1.vstdate, INTERVAL 1 DAY) AND DATE_ADD(o1.vstdate, INTERVAL 7 DAY)
        AND o2.main_dep = '034'
      WHERE o1.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o1.main_dep = '034'`).catch(() => null),
    dbQueryOne(`SELECT
      SUM(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        AND (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 <= 30 THEN 1 ELSE 0 END) as wait_sla_pass,
      COUNT(*) as total
      FROM ovst o LEFT JOIN service_time st ON o.vn = st.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '034' AND o.vsttime IS NOT NULL`).catch(() => null),
  ]);

  const tv = Number(visitSummary?.total_visits || 0), ad = Number(visitSummary?.avg_daily || 0), up = Number(visitSummary?.unique_patients || 0);
  const aw = Number(waitTime?.avg_wait || 0), sw = Number(waitTime?.sd_wait || 0);
  const at = Number(waitTime?.avg_total_time || 0), st2 = Number(waitTime?.sd_total || 0), w30 = Number(waitTime?.wait_over_30m || 0);
  const cr = Number(completion?.completion_rate || 0), dc = Number(completion?.dropout || 0);
  const ar = Number(revenue?.avg_revenue || 0), tr = Number(revenue?.total_revenue || 0), dr2 = Number(revenue?.daily_revenue || 0);
  const rr = Number(revisit?.revisit_rate || 0);
  const wsp = Number(sla?.total) > 0 ? Math.round((Number(sla.wait_sla_pass || 0) / Number(sla.total)) * 1000) / 10 : 0;
  const ws = Math.max(0, Math.round(100 - (aw - 10) * 3)), cs = Math.round(Math.min(100, cr));
  const rs = Math.max(0, Math.round(100 - rr * 8)), rvs = Math.min(100, Math.round(ar / 20)), ss = Math.round(wsp);
  const ppi = Math.round((ws * 0.25) + (cs * 0.25) + (rs * 0.15) + (rvs * 0.15) + (ss * 0.20));
  const hourlyArr = Array.from({ length: 24 }, (_, h) => {
    const d = (dailyPat || []).find(x => Number(x.hour) === h);
    return { hour: h, label: `${String(h).padStart(2, '0')}:00`, avg: Number(d?.avg_daily || 0), total: Number(d?.total || 0) };
  });
  const peakHr = hourlyArr.reduce((b, h) => h.avg > (b?.avg || 0) ? h : b, hourlyArr[0]);
  const MTH = ['', 'เธก.เธ.', 'เธ.เธ.', 'เธกเธต.เธ.', 'เน€เธก.เธข.', 'เธ.เธ.', 'เธกเธด.เธข.', 'เธ.เธ.', 'เธช.เธ.', 'เธ.เธข.', 'เธ•.เธ.', 'เธ.เธข.', 'เธ.เธ.'];
  return {
    data_source: 'HOSxP XE', ppi,
    ppi_components: { wait_time: ws, completion: cs, revisit: rs, revenue: rvs, sla: ss },
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
    timestamp: new Date().toISOString(),
  };
}));

// โ”โ”โ”โ”โ”โ” Physical Therapy Revenue โ€” Fiscal Year (3 เธเธตเธขเนเธญเธเธซเธฅเธฑเธ) โ”โ”โ”โ”โ”โ”
app.get('/api/physicaltherapy/revenue-fiscal', cached('ptRevenueFiscal', 3600000, () => getRevenueFiscal('034', 'HOSxP XE ยท vn_stat (PT)')));

// ============================================================
// ๐ซ€ NCD (Non-Communicable Disease / เนเธฃเธเนเธกเนเธ•เธดเธ”เธ•เนเธญเน€เธฃเธทเนเธญเธฃเธฑเธ) โ€” HOSxP XE
// ICD-10: DM(E10-E14), HT(I10-I15), IHD(I20-I25), Stroke(I60-I69), COPD(J40-J47), CKD(N18)
// ============================================================

const NCD_ICD_WHERE = `(od.icd10 LIKE 'E1%' OR od.icd10 LIKE 'I1%' OR od.icd10 BETWEEN 'I20' AND 'I259'
  OR od.icd10 BETWEEN 'I60' AND 'I699' OR od.icd10 BETWEEN 'J40' AND 'J479' OR od.icd10 LIKE 'N18%')`;

app.get('/api/ncd/today', cached('ncdToday', 30000, async () => {
  const [summary, byDisease, hourly] = await Promise.all([
    dbQueryOne(`
      SELECT COUNT(DISTINCT o.vn) as total_visits, COUNT(DISTINCT o.hn) as unique_patients,
        SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as completed,
        SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL THEN 1 ELSE 0 END) as waiting,
        ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
            THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as avg_wait_time,
        SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly,
        SUM(CASE WHEN p.sex IN ('1','เธ','เธเธฒเธข') THEN 1 ELSE 0 END) as male,
        SUM(CASE WHEN p.sex IN ('2','เธ','เธซเธเธดเธ') THEN 1 ELSE 0 END) as female
      FROM ovst o INNER JOIN patient p ON o.hn = p.hn
      LEFT JOIN service_time st ON o.vn = st.vn LEFT JOIN rcpt_print r ON o.vn = r.vn
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

app.get('/api/ncd/analytics', cached('ncdAnalytics', 300000, async () => {
  const [visitSummary, waitTime, completion, revenue, monthly, diagTop, ageDist, dailyPat, revisit, sla, byDisease30] = await Promise.all([
    dbQueryOne(`SELECT COUNT(DISTINCT o.vn) as total_visits, COUNT(DISTINCT DATE(o.vstdate)) as active_days,
      ROUND(COUNT(DISTINCT o.vn) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 1) as avg_daily,
      COUNT(DISTINCT o.hn) as unique_patients,
      SUM(CASE WHEN TIMESTAMPDIFF(YEAR, p.birthday, CURDATE()) >= 60 THEN 1 ELSE 0 END) as elderly_total,
      SUM(CASE WHEN p.sex IN ('1','เธ','เธเธฒเธข') THEN 1 ELSE 0 END) as male_total,
      SUM(CASE WHEN p.sex IN ('2','เธ','เธซเธเธดเธ') THEN 1 ELSE 0 END) as female_total
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn INNER JOIN patient p ON o.hn = p.hn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE}`).catch(() => null),
    dbQueryOne(`SELECT
      ROUND(AVG(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as avg_wait,
      ROUND(STDDEV(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as sd_wait,
      ROUND(AVG(CASE WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
        WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as avg_total_time,
      ROUND(STDDEV(CASE WHEN r.bill_time IS NOT NULL AND TIME_TO_SEC(r.bill_time) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(r.bill_time) - TIME_TO_SEC(o.vsttime)) / 60
        WHEN st.service7 IS NOT NULL AND TIME_TO_SEC(st.service7) > TIME_TO_SEC(o.vsttime)
        THEN (TIME_TO_SEC(st.service7) - TIME_TO_SEC(o.vsttime)) / 60 ELSE NULL END), 0) as sd_total,
      SUM(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        AND (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 > 30 THEN 1 ELSE 0 END) as wait_over_30m
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn
      LEFT JOIN service_time st ON o.vn = st.vn LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE} AND o.vsttime IS NOT NULL`).catch(() => null),
    dbQueryOne(`SELECT
      SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) as completed, COUNT(*) as total,
      ROUND(100.0 * SUM(CASE WHEN st.service7 IS NOT NULL OR r.bill_time IS NOT NULL THEN 1 ELSE 0 END) / NULLIF(COUNT(*), 0), 1) as completion_rate,
      SUM(CASE WHEN st.service7 IS NULL AND r.bill_time IS NULL AND o.vstdate < CURDATE() THEN 1 ELSE 0 END) as dropout
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn
      LEFT JOIN service_time st ON o.vn = st.vn LEFT JOIN rcpt_print r ON o.vn = r.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE}`).catch(() => null),
    dbQueryOne(`SELECT ROUND(AVG(v.income), 0) as avg_revenue, ROUND(SUM(v.income), 0) as total_revenue,
      MAX(v.income) as max_revenue, ROUND(SUM(v.income) / NULLIF(COUNT(DISTINCT DATE(o.vstdate)), 0), 0) as daily_revenue
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn INNER JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE} AND v.income > 0`).catch(() => null),
    dbQuery(`SELECT DATE_FORMAT(o.vstdate, '%Y-%m') as month, COUNT(DISTINCT o.vn) as visits,
      COUNT(DISTINCT o.hn) as patients, ROUND(AVG(v.income), 0) as avg_rev, ROUND(SUM(v.income), 0) as total_rev
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 6 MONTH) AND o.main_dep = '024' AND ${NCD_ICD_WHERE}
      GROUP BY DATE_FORMAT(o.vstdate, '%Y-%m') ORDER BY month`).catch(() => []),
    dbQuery(`SELECT od.icd10, d.icd10_name as name, COUNT(*) as cnt, ROUND(AVG(v.income), 0) as avg_rev
      FROM ovstdiag od INNER JOIN ovst o ON od.vn = o.vn LEFT JOIN icd101 d ON od.icd10 = d.icd10
      LEFT JOIN vn_stat v ON o.vn = v.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE}
      GROUP BY od.icd10, d.icd10_name ORDER BY cnt DESC LIMIT 10`).catch(() => []),
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
    dbQueryOne(`SELECT COUNT(DISTINCT o2.vn) as revisit_count, COUNT(DISTINCT o1.vn) as total_visits,
      ROUND(100.0 * COUNT(DISTINCT o2.vn) / NULLIF(COUNT(DISTINCT o1.vn), 0), 1) as revisit_rate
      FROM ovst o1 INNER JOIN ovstdiag od1 ON o1.vn = od1.vn
      LEFT JOIN ovst o2 ON o1.hn = o2.hn AND o1.vn != o2.vn
        AND o2.vstdate BETWEEN DATE_ADD(o1.vstdate, INTERVAL 1 DAY) AND DATE_ADD(o1.vstdate, INTERVAL 7 DAY)
      LEFT JOIN ovstdiag od2 ON o2.vn = od2.vn AND ${NCD_ICD_WHERE.replace(/od\./g, 'od2.')}
      WHERE o1.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o1.main_dep = '024' AND ${NCD_ICD_WHERE.replace(/od\./g, 'od1.')}`).catch(() => null),
    dbQueryOne(`SELECT
      SUM(CASE WHEN st.service1 IS NOT NULL AND TIME_TO_SEC(st.service1) > TIME_TO_SEC(o.vsttime)
        AND (TIME_TO_SEC(st.service1) - TIME_TO_SEC(o.vsttime)) / 60 <= 30 THEN 1 ELSE 0 END) as wait_sla_pass,
      COUNT(*) as total
      FROM ovst o INNER JOIN ovstdiag od ON o.vn = od.vn LEFT JOIN service_time st ON o.vn = st.vn
      WHERE o.vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY) AND o.main_dep = '024' AND ${NCD_ICD_WHERE} AND o.vsttime IS NOT NULL`).catch(() => null),
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
  ]);

  const tv = Number(visitSummary?.total_visits || 0), ad = Number(visitSummary?.avg_daily || 0), up = Number(visitSummary?.unique_patients || 0);
  const aw = Number(waitTime?.avg_wait || 0), sw = Number(waitTime?.sd_wait || 0);
  const at = Number(waitTime?.avg_total_time || 0), st2 = Number(waitTime?.sd_total || 0), w30 = Number(waitTime?.wait_over_30m || 0);
  const cr = Number(completion?.completion_rate || 0), dc = Number(completion?.dropout || 0);
  const ar = Number(revenue?.avg_revenue || 0), tr = Number(revenue?.total_revenue || 0), dr2 = Number(revenue?.daily_revenue || 0);
  const rr = Number(revisit?.revisit_rate || 0);
  const wsp = Number(sla?.total) > 0 ? Math.round((Number(sla.wait_sla_pass || 0) / Number(sla.total)) * 1000) / 10 : 0;
  const ws = Math.max(0, Math.round(100 - (aw - 10) * 3)), cs = Math.round(Math.min(100, cr));
  const rs = Math.max(0, Math.round(100 - rr * 5)), rvs = Math.min(100, Math.round(ar / 15)), ss = Math.round(wsp);
  const nci = Math.round((ws * 0.20) + (cs * 0.25) + (rs * 0.20) + (rvs * 0.15) + (ss * 0.20));
  const hourlyArr = Array.from({ length: 24 }, (_, h) => {
    const d = (dailyPat || []).find(x => Number(x.hour) === h);
    return { hour: h, label: `${String(h).padStart(2, '0')}:00`, avg: Number(d?.avg_daily || 0), total: Number(d?.total || 0) };
  });
  const peakHr = hourlyArr.reduce((b, h) => h.avg > (b?.avg || 0) ? h : b, hourlyArr[0]);
  const MTH = ['', 'เธก.เธ.', 'เธ.เธ.', 'เธกเธต.เธ.', 'เน€เธก.เธข.', 'เธ.เธ.', 'เธกเธด.เธข.', 'เธ.เธ.', 'เธช.เธ.', 'เธ.เธข.', 'เธ•.เธ.', 'เธ.เธข.', 'เธ.เธ.'];
  return {
    data_source: 'HOSxP XE', nci,
    nci_components: { wait_time: ws, completion: cs, revisit: rs, revenue: rvs, sla: ss },
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
    timestamp: new Date().toISOString(),
  };
}));

// โ”โ”โ”โ”โ”โ” NCD Estimated Revenue โ€” Fiscal Year (3 เธเธตเธขเนเธญเธเธซเธฅเธฑเธ) โ”โ”โ”โ”โ”โ”
app.get('/api/ncd/revenue-fiscal', cached('ncdRevenueFiscal', 3600000, () => getRevenueFiscal('024', 'HOSxP XE ยท vn_stat (NCD)')));

// #7 AI LOS Predictor (2min cache)
app.get('/api/ai/los-predictor', cached('los', 120000, async () => {
  const patients = await ai.getLOSPrediction();
  return {
    data_source: 'HOSxP XE + AI',
    total: patients.length,
    over_stay: patients.filter(p => p.status === 'over_stay').length,
    at_risk: patients.filter(p => p.status === 'at_risk').length,
    on_track: patients.filter(p => p.status === 'on_track').length,
    patients
  };
}));

// #8 AI Billing Anomaly (5min cache)
app.get('/api/ai/billing-anomaly', cached('billing', 300000, async () => {
  return { data_source: 'HOSxP XE + AI Z-Score', ...(await ai.getBillingAnomalies()) };
}));

// #9 AI Claim Denial Predictor (30s cache)
app.get('/api/ai/denial-prediction', cached('denialRisk', 30000, async () => {
  return { data_source: 'HOSxP XE + AI Pattern Matching', ...(await ai.getClaimDenialRisk()) };
}));

// #10 AI Under-Charging Detection (30s cache)
app.get('/api/ai/under-charging', cached('underCharge', 30000, async () => {
  return { data_source: 'HOSxP XE + AI Knowledge Base', ...(await ai.getUnderChargingDetection()) };
}));

// #11 AI Payment Variance Analytics (1min cache)
app.get('/api/ai/payment-variance', cached('paymentVar', 60000, async () => {
  return { data_source: 'HOSxP XE + AI Balance Audit', ...(await ai.getPaymentVariance()) };
}));

// #12 AI Patient Propensity to Pay (30s cache)
app.get('/api/ai/propensity-to-pay', cached('propensityToPay', 30000, async () => {
  return { data_source: 'HOSxP XE + AI Financial Risk Profiling', ...(await ai.getPatientPropensityToPay()) };
}));

// ---- AI Hub (all summaries) ----
app.get('/api/ai/hub', cached('aiHub', 60000, async () => {
  const [ews, readmit, bed, er, los] = await Promise.all([
    getEWSSummary().catch(() => null),
    ai.getReadmissionRisk().catch(() => []),
    ai.getBedDemandForecast().catch(() => []),
    ai.getERSurgePrediction().catch(() => null),
    ai.getLOSPrediction().catch(() => [])
  ]);
  return {
    ews: { critical: ews?.critical || 0, high: ews?.high || 0, total: ews?.total_patients || 0 },
    readmission: { high_risk: readmit.filter(p => p.risk_level === 'high').length, total: readmit.length },
    bed_demand: { alerts: bed.flatMap(w => w.forecast.filter(f => f.alert)).length },
    er: { surge_alert: er?.surge_alert || false, today_actual: er?.today_actual || 0 },
    los: { over_stay: los.filter(p => p.status === 'over_stay').length, total: los.length },
    timestamp: new Date().toISOString()
  };
}));

// ============================
// WebSocket โ€” Real-time Updates
// ============================
io.on('connection', (socket) => {
  const sendAll = async () => {
    try {
      const [beds, ews] = await Promise.all([
        hosxp.getBedOccupancy().catch(() => null),
        getEWSSummary().catch(() => null)
      ]);
      if (beds) socket.emit('bed:update', beds.map(w => ({ ward: w.name, occupied: w.occupied, available: (w.total_beds || 0) - w.occupied, total: w.total_beds || 0 })));
      if (ews?.alerts?.length) socket.emit('ews:alerts', { critical_count: ews.critical, high_count: ews.high, alerts: ews.alerts.slice(0, 5).map(a => ({ name: a.name, ward: a.ward, ews_score: a.ews.score, action: a.ews.action })) });
    } catch { }
  };
  sendAll();
  const timer = setInterval(sendAll, 30000);
  socket.on('disconnect', () => clearInterval(timer));
});

// ---- SPA Fallback (must be AFTER all /api routes) ----
app.get('*', (req, res) => {
  res.sendFile(path.join(DIST_DIR, 'index.html'));
});

// ---- Get LAN IP ----
function getLanIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return 'localhost';
}

// ---- Start ----
(async () => {
  try {
    await getPool();
    const lanIP = getLanIP();
    server.listen(PORT, '0.0.0.0', () => console.log(`
โ•”โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•—
โ•‘  ๐ฅ BCH 360ยฐ Intelligence V.10  โ€” PRODUCTION     โ•‘
โ•‘  Hospital AI Executive Dashboard                  โ•‘
โ•‘                                                   โ•‘
โ•‘  Local:   http://localhost:${PORT}                  โ•‘
โ•‘  Network: http://${lanIP}:${PORT}               โ•‘
โ•‘                                                   โ•‘
โ•‘  Data: HOSxP XE (10.1.0.3)                       โ•‘
โ•‘  ๐ง  AI: 11 Modules Active                         โ•‘
โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•โ•`));
  } catch (err) { console.error('โ', err.message); process.exit(1); }
})();
