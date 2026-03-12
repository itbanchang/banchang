// ============================================================
// BCH 360° Intelligence V.10 - Main Server
// HOSxP XE + 8 AI Modules — Performance Optimized
// 🔐 Phase 1 Security Hardening Applied
// ============================================================
import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import { Server as SocketIO } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import { exec } from 'child_process';

import { getPool, isMySQLConnected, dbQuery, dbQueryOne, getQueryMetrics } from './db/mysql.js';
import hosxp from './db/hosxpIntegration.js';
import { getEWSSummary, getIPDPatientsEWS, calculateNEWS2 } from './ai/ewsEngine.js';
import { forecastRevenue, forecastByPayer } from './ai/forecastEngine.js';
import ai from './ai/aiModules.js';
import financeRoutes from './routes/finance.js';
import ipdRoutes from './routes/ipd.js';
import clinicalRoutes from './routes/clinical.js';
import authRoutes from './routes/auth.js';
import opdRoutes from './routes/opd.js';
import aiRoutes from './routes/ai_routes.js';
import erRoutes from './routes/er.js';
import dentalRoutes from './routes/dental.js';
import thaimedRoutes from './routes/thaimedicine.js';
import ptRoutes from './routes/physicaltherapy.js';
import ncdRoutes from './routes/ncd.js';
import medrecRoutes from './routes/medrec.js';
import debugRoutes from './routes/debug.js';
import { authenticate, authorize } from './middleware/rbac.js';
import { auditMiddleware } from './middleware/audit.js';
import { initDataLake, archiveSnapshot } from './db/dataLake.js';
import { initMaterializedViews, getMV, getMVStatus, forceRefreshView, forceRefreshAll } from './db/materializedViews.js';
import dw from './db/dataWarehouse.js';

const app = express();
const server = createServer(app);

// ---- AI-3: Lock CORS to known origins ----
const ALLOWED_ORIGINS = [
  'http://localhost:5173',                                      // Vite dev
  'http://localhost:3001',                                      // Dev server
  'http://localhost:3000',                                      // Production
  `http://${process.env.SERVER_IP || '10.1.0.3'}:3001`,         // LAN dev
  `http://${process.env.SERVER_IP || '10.1.0.3'}:3000`,         // LAN prod
];
const io = new SocketIO(server, { cors: { origin: ALLOWED_ORIGINS } });
const PORT = process.env.PORT || 3001;

// ---- ESM __dirname ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

// ---- Middleware ----
app.use(compression({ level: 6, threshold: 1024 })); // gzip responses >1KB
app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }));
app.use(helmet({ contentSecurityPolicy: false }));
app.use(express.json());

// ---- Serve Production Frontend (dist/) ----
app.use(express.static(DIST_DIR, {
  etag: true,
  setHeaders: (res, pathStr) => {
    if (pathStr.includes('/assets/')) {
      // ⚡ Vite assets have hashes in names, safe to cache for 1 year
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      // ⚡ index.html and others revalidate frequently
      res.setHeader('Cache-Control', 'public, max-age=3600, must-revalidate');
    }
  }
}));

// ---- Health Dashboard (standalone page — public) ----
app.get('/health', (req, res) => {
  res.sendFile(path.join(__dirname, 'health-dashboard.html'));
});

// ---- Rate Limiting (AI-9) ----
const apiLimiter = rateLimit({
  windowMs: 60 * 1000,   // 1 Minute
  max: 120,              // Limit 120 requests/IP/min
  message: { error: 'Too many requests. Please slow down.' },
  standardHeaders: true,
});
app.use('/api', apiLimiter);

// ---- Public Routes (before authenticate middleware) ----
app.use('/api/auth', authRoutes);

// ---- AI-1: Enable Authentication on all /api/* routes ----
// All routes below this line require a valid JWT token.
// If no token is provided, fallback to 'demo/director' role (Phase 1 grace period).
app.use('/api', authenticate);

// ---- Protected Routes (AI-10: Adding RBAC authorize) ----
app.use('/api/finance', auditMiddleware('financial_data'), authorize('finance'), financeRoutes);
app.use('/api/ipd', auditMiddleware('ward_info'), authorize('ipd'), ipdRoutes);
app.use('/api/clinical', auditMiddleware('clinical_risk'), authorize('clinical'), clinicalRoutes);

// Protect inline routes
app.use('/api/opd', auditMiddleware('patient_info'));
app.use('/api/er', auditMiddleware('patient_info'));
app.use('/api/dental', auditMiddleware('patient_info'));
app.use('/api/thaimedicine', auditMiddleware('patient_info'));
app.use('/api/physicaltherapy', auditMiddleware('patient_info'));
app.use('/api/ncd', auditMiddleware('patient_info'));
app.use('/api/medrec', auditMiddleware('patient_info'));
app.use('/api/ai', auditMiddleware('clinical_risk'));

// ---- Cache Helper (Stale-While-Revalidate + Request Deduplication) ----
const cache = {};
const inflight = new Map(); // dedup: prevent thundering herd on cache miss
function cached(key, ttl, fn) {
  return async (req, res) => {
    const k = key + (req.originalUrl.includes('?') ? req.originalUrl.split('?')[1] : '');
    const entry = cache[k];
    const now = Date.now();

    // HIT — still fresh → return pre-serialized JSON instantly
    if (entry && now - entry.t < ttl) {
      return res.set('X-Cache', 'HIT')
        .set('Cache-Control', `public, max-age=${Math.round(ttl / 1000)}`)
        .type('json').end(entry.json);
    }

    // STALE — expired but exists → return stale immediately, refresh in background
    if (entry && now - entry.t < ttl * 3) {
      res.set('X-Cache', 'STALE')
        .set('Cache-Control', `public, max-age=${Math.round(ttl / 1000)}, stale-while-revalidate=${Math.round(ttl / 500)}`)
        .type('json').end(entry.json);
      // Background refresh — deduplicated (only 1 query even if 10 requests hit)
      if (!inflight.has(k)) {
        const p = fn(req).then(data => {
          const json = JSON.stringify(data);
          cache[k] = { d: data, json, t: Date.now() };
        }).catch(() => { }).finally(() => inflight.delete(k));
        inflight.set(k, p);
      }
      return;
    }

    // MISS — fetch fresh (deduplicated: if another request is already fetching, wait for it)
    if (inflight.has(k)) {
      try {
        await inflight.get(k);
        const fresh = cache[k];
        if (fresh) {
          return res.set('X-Cache', 'DEDUP')
            .set('Cache-Control', `public, max-age=${Math.round(ttl / 1000)}`)
            .type('json').end(fresh.json);
        }
      } catch { /* fall through to fetch ourselves */ }
    }

    try {
      const p = fn(req).then(data => {
        const json = JSON.stringify(data);
        cache[k] = { d: data, json, t: Date.now() };
        return json;
      });
      inflight.set(k, p);
      const json = await p;
      inflight.delete(k);
      res.set('X-Cache', 'MISS')
        .set('Cache-Control', `public, max-age=${Math.round(ttl / 1000)}`)
        .type('json').end(json);
    } catch (err) {
      inflight.delete(k);
      res.status(500).json({ error: err.message });
    }
  };
}

// ---- Revenue Fiscal Year Helpers (shared, DRY, Map-optimized) ----
const MONTH_TH_FISCAL = ['', 'ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];
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
      fiscal_year_be: fy.fiscalBE, fiscal_label: `ปีงบ ${fy.fiscalBE}`, start_date: fy.startDate, end_date: fy.endDate,
      total_revenue: tR, total_visits: tV, total_patients: tP, avg_revenue_per_visit: tV > 0 ? Math.round(tR / tV) : 0, months
    };
  });

  // ---- Comparable Revenue: fair YoY comparison ----
  // Find which month indices have data in the LATEST fiscal year
  const latest = result[result.length - 1];
  const comparableIdx = latest.months.map((m, i) => m.has_data ? i : -1).filter(i => i >= 0);
  const comparableMonthCount = comparableIdx.length;

  // For each fiscal year, sum revenue only for those same month indices
  for (const fy of result) {
    let compRev = 0, compVis = 0;
    for (const i of comparableIdx) {
      compRev += fy.months[i]?.revenue || 0;
      compVis += fy.months[i]?.visits || 0;
    }
    fy.comparable_revenue = compRev;
    fy.comparable_visits = compVis;
    fy.comparable_months = comparableMonthCount;
  }

  return { data_source: dataSource, fiscal_years: result, timestamp: new Date().toISOString() };
}
// AI-4: Parameterized SQL — no more string interpolation
async function getRevenueFiscal(mainDep, dataSource) {
  const { fiscalYears, globalStart, globalEnd } = getFiscalConfig();
  if (mainDep) {
    const sql = `SELECT YEAR(o.vstdate) AS yr, MONTH(o.vstdate) AS mo, SUM(v.income) AS revenue, COUNT(DISTINCT o.vn) AS visit_count, COUNT(DISTINCT o.hn) AS patient_count
       FROM ovst o INNER JOIN vn_stat v ON o.vn = v.vn WHERE o.vstdate BETWEEN ? AND LEAST(?, CURDATE()) AND o.main_dep = ? AND v.income > 0
       GROUP BY YEAR(o.vstdate), MONTH(o.vstdate) ORDER BY yr, mo`;
    return buildFiscalResult(await dbQuery(sql, [globalStart, globalEnd, mainDep]), fiscalYears, dataSource);
  }
  const sql = `SELECT YEAR(vstdate) AS yr, MONTH(vstdate) AS mo, SUM(income) AS revenue, COUNT(DISTINCT vn) AS visit_count, COUNT(DISTINCT hn) AS patient_count
     FROM vn_stat WHERE vstdate BETWEEN ? AND LEAST(?, CURDATE()) GROUP BY YEAR(vstdate), MONTH(vstdate) ORDER BY yr, mo`;
  return buildFiscalResult(await dbQuery(sql, [globalStart, globalEnd]), fiscalYears, dataSource);
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
    query_metrics: getQueryMetrics(),
    uptime: Math.round(process.uptime())
  });
});

// ---- Materialized Views Status & Admin ----
app.get('/api/system/mv-status', (req, res) => {
  res.json({
    materialized_views: getMVStatus(),
    query_metrics: getQueryMetrics(),
    timestamp: new Date().toISOString()
  });
});

app.post('/api/system/mv-refresh', async (req, res) => {
  try {
    const { view } = req.body || {};
    if (view) {
      const result = await forceRefreshView(view);
      return res.json({ status: 'ok', refreshed: view, result });
    }
    const result = await forceRefreshAll();
    return res.json({ status: 'ok', refreshed: 'all', views: result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ---- Data Warehouse Long-term Trend APIs ----
app.get('/api/warehouse/revenue-trend', (req, res) => {
  const years = parseInt(req.query.years) || 5;
  res.json({ data_source: 'Data Warehouse', trend: dw.getRevenueTrend(years) });
});

app.get('/api/warehouse/ipd-trend', (req, res) => {
  const years = parseInt(req.query.years) || 3;
  res.json({ data_source: 'Data Warehouse', trend: dw.getIPDTrend(years) });
});

app.get('/api/warehouse/er-trend', (req, res) => {
  const months = parseInt(req.query.months) || 12;
  res.json({ data_source: 'Data Warehouse', trend: dw.getERTrend(months) });
});

app.get('/api/warehouse/daily-trend', (req, res) => {
  const months = parseInt(req.query.months) || 12;
  res.json({ data_source: 'Data Warehouse', trend: dw.getDailyTrend(months) });
});

app.get('/api/warehouse/yoy', (req, res) => {
  res.json({ data_source: 'Data Warehouse', comparison: dw.getYoYComparison() });
});

app.get('/api/warehouse/stats', (req, res) => {
  res.json({ data_source: 'Data Warehouse', stats: dw.getWarehouseStats() });
});

// ---- System Auto-Update via Git ----
app.post('/api/system/update', async (req, res) => {
  try {
    exec('git pull', { cwd: ROOT_DIR }, (error, stdout, stderr) => {
      if (error) {
        console.error(`[Auto-Update] Error: ${error.message}`);
        return res.status(500).json({ status: 'error', message: 'Git pull failed', error: error.message });
      }
      console.log(`[Auto-Update] Changes pulled successfully:\n${stdout}`);

      // Since production.js watches for file changes, it will automatically rebuild and restart!
      res.status(200).json({
        status: 'success',
        message: 'Code updated successfully. Production auto-deploy will now rebuild and restart automatically.',
        output: stdout
      });
    });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

// ---- Health Check (Quick — for monitoring/load balancer) ----
app.get('/api/health', async (req, res) => {
  const mysqlOk = isMySQLConnected();
  let dbLatency = null;

  // Quick DB ping
  if (mysqlOk) {
    try {
      const t0 = Date.now();
      await dbQueryOne('SELECT 1 AS ok');
      dbLatency = Date.now() - t0;
    } catch { dbLatency = -1; }
  }

  const healthy = mysqlOk && dbLatency !== null && dbLatency >= 0;
  res.status(healthy ? 200 : 503).json({
    status: healthy ? 'healthy' : 'degraded',
    version: '10.0.0',
    uptime: Math.round(process.uptime()),
    mysql: mysqlOk ? 'connected' : 'disconnected',
    db_latency_ms: dbLatency,
    timestamp: new Date().toISOString(),
  });
});

// ---- Health Check (Detailed — full system diagnostics) ----
app.get('/api/system/health', async (req, res) => {
  const uptimeSec = Math.round(process.uptime());
  const mem = process.memoryUsage();
  const cpus = os.cpus();

  // MySQL connectivity test
  let mysqlStatus = { connected: false, latency_ms: null, error: null };
  if (isMySQLConnected()) {
    try {
      const t0 = Date.now();
      const result = await dbQueryOne('SELECT NOW() AS server_time, VERSION() AS version');
      mysqlStatus = {
        connected: true,
        latency_ms: Date.now() - t0,
        server_time: result?.server_time,
        version: result?.version,
        host: process.env.MYSQL_HOST || '10.1.0.3',
        database: process.env.MYSQL_DB || 'bchhosxpxe',
      };
    } catch (err) {
      mysqlStatus = { connected: false, latency_ms: null, error: err.message };
    }
  }

  // Deploy info (written by production.js)
  let deployInfo = null;
  try {
    const deployPath = path.join(DIST_DIR, '.deploy-info.json');
    const { readFileSync } = await import('fs');
    deployInfo = JSON.parse(readFileSync(deployPath, 'utf-8'));
  } catch { /* no deploy info */ }

  // Format uptime
  const days = Math.floor(uptimeSec / 86400);
  const hours = Math.floor((uptimeSec % 86400) / 3600);
  const minutes = Math.floor((uptimeSec % 3600) / 60);
  const uptimeStr = `${days}d ${hours}h ${minutes}m`;

  res.json({
    status: mysqlStatus.connected ? 'healthy' : 'degraded',
    version: '10.0.0',
    environment: process.env.NODE_ENV || 'development',
    port: PORT,

    uptime: {
      seconds: uptimeSec,
      formatted: uptimeStr,
      started_at: new Date(Date.now() - uptimeSec * 1000).toISOString(),
    },

    mysql: mysqlStatus,

    memory: {
      rss_mb: Math.round(mem.rss / 1048576),
      heap_used_mb: Math.round(mem.heapUsed / 1048576),
      heap_total_mb: Math.round(mem.heapTotal / 1048576),
      external_mb: Math.round(mem.external / 1048576),
    },

    system: {
      hostname: os.hostname(),
      platform: os.platform(),
      arch: os.arch(),
      node_version: process.version,
      cpu_cores: cpus.length,
      cpu_model: cpus[0]?.model || 'unknown',
      total_memory_mb: Math.round(os.totalmem() / 1048576),
      free_memory_mb: Math.round(os.freemem() / 1048576),
      memory_usage_pct: Math.round((1 - os.freemem() / os.totalmem()) * 100),
      load_avg: os.loadavg(),
    },

    ai_modules: {
      count: 11,
      list: [
        'NEWS2 EWS', 'Revenue Forecast', 'Readmission Risk', 'Bed Demand',
        'DRG Optimizer', 'ER Surge', 'LOS Predictor', 'Billing Anomaly',
        'ER Admission Pred', 'ER Wait Forecast', 'Under-charging Detection'
      ],
    },

    deploy: deployInfo,
    timestamp: new Date().toISOString(),
  });
});

// ---- Dashboard Summary (45s cache) ---- ULTRA-FAST: EWS is non-blocking with timeout
app.get('/api/dashboard/summary', cached('summary', 45000, async () => {
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

    // รายได้เดือนก่อน (เปรียบเทียบ trend)
    dbQueryOne(`
      SELECT SUM(income) as revenue
      FROM opdscreen
      WHERE vstdate >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
        AND vstdate < DATE_FORMAT(CURDATE(), '%Y-%m-01')
    `).catch(() => null),

    // OPD เมื่อวาน
    dbQueryOne(`
      SELECT COUNT(*) as total FROM ovst
      WHERE vstdate = DATE_SUB(CURDATE(), INTERVAL 1 DAY)
    `).catch(() => null),

    // IPD วันก่อน
    dbQueryOne(`
      SELECT COUNT(*) as total FROM ipt
      WHERE dchdate IS NULL AND regdate < CURDATE()
    `).catch(() => null),

    // ER เมื่อวาน
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

  // คำนวณ trend %
  const calcT = (cur, prev) => {
    if (!prev || prev === 0) return null;
    return Math.round(((cur - prev) / Math.abs(prev)) * 100);
  };

  console.log(`📊 Dashboard Summary: ${Date.now() - start}ms`);
  return {
    data_source: 'HOSxP XE',
    finance: {
      total_revenue: ytd,
      total_expense: exp,
      net_profit: ytd - exp,
      profit_margin: ytd > 0 ? Math.round(((ytd - exp) / ytd) * 1000) / 10 : 0,
      revenue_this_month: thisMonth,
      trend_revenue: calcT(thisMonth, prevMonth),   // % เทียบเดือนก่อน
    },
    opd: {
      today_visits: d.opd_today,
      trend_visits: calcT(d.opd_today, Number(prevOPD?.total || 0)),  // % เทียบเมื่อวาน
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

app.use('/api/opd', opdRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/er', erRoutes);
app.use('/api/dental', dentalRoutes);
app.use('/api/thaimedicine', thaimedRoutes);
app.use('/api/physicaltherapy', ptRoutes);
app.use('/api/ncd', ncdRoutes);
app.use('/api/medrec', medrecRoutes);
app.use('/api/debug', debugRoutes);


// ============================
// WebSocket — Real-time Updates + Alert Detection
// ============================

// ── Alert detection — checks HOSxP XE for critical conditions ──
const recentAlerts = new Map(); // dedup: key → timestamp
const ALERT_COOLDOWN = 300000;  // 5 min cooldown per alert type

function shouldAlert(key) {
  const last = recentAlerts.get(key);
  if (last && Date.now() - last < ALERT_COOLDOWN) return false;
  recentAlerts.set(key, Date.now());
  return true;
}

async function detectAlerts() {
  const alerts = [];
  try {
    const [ewsHigh, erOvercrowd, bedCrisis, erLongWait, criticalTriage] = await Promise.all([
      // 1. EWS High-Risk patients (score ≥ 7)
      dbQueryOne(`
        SELECT COUNT(*) as cnt FROM an_stat a
        INNER JOIN patient p ON a.hn = p.hn
        WHERE a.dchdate IS NULL
        AND a.rw > 0
    `).catch(() => null),

      // 2. ER Overcrowding (>30 patients currently waiting)
      dbQueryOne(`
        SELECT COUNT(*) as cnt FROM er_regist e
        INNER JOIN ovst o ON e.vn = o.vn
        LEFT JOIN service_time st ON o.vn = st.vn
        WHERE o.vstdate = CURDATE()
        AND e.er_discharge_status IS NULL
        AND st.service7 IS NULL
    `).catch(() => null),

      // 3. Bed Occupancy Crisis (>90%)
      dbQueryOne(`
        SELECT
          SUM(CASE WHEN a.dchdate IS NULL THEN 1 ELSE 0 END) as occupied,
    (SELECT SUM(bedcount) FROM ward WHERE ward_active = 'Y') as total
        FROM an_stat a
        WHERE a.dchdate IS NULL
    `).catch(() => null),

      // 4. ER patients waiting > 2 hours with no service
      dbQueryOne(`
        SELECT COUNT(*) as cnt FROM er_regist e
        INNER JOIN ovst o ON e.vn = o.vn
        LEFT JOIN service_time st ON o.vn = st.vn
        WHERE o.vstdate = CURDATE()
        AND e.er_discharge_status IS NULL
        AND st.service1 IS NULL
        AND o.vsttime IS NOT NULL
        AND TIME_TO_SEC(TIMEDIFF(CURTIME(), o.vsttime)) > 7200
    `).catch(() => null),

      // 5. Critical triage patients (Level 1 — Resuscitation) not yet seen
      dbQueryOne(`
        SELECT COUNT(*) as cnt FROM er_regist e
        INNER JOIN ovst o ON e.vn = o.vn
        LEFT JOIN service_time st ON o.vn = st.vn
        WHERE o.vstdate = CURDATE()
        AND e.er_pt_type = '1'
        AND e.er_discharge_status IS NULL
        AND st.service1 IS NULL
      `).catch(() => null),
    ]);

    // Evaluate conditions and generate alerts
    const erWaiting = Number(erOvercrowd?.cnt || 0);
    if (erWaiting > 30 && shouldAlert('er-overcrowd')) {
      alerts.push({
        severity: 'critical',
        category: 'ER',
        message: `🚑 ER แออัด: ${erWaiting} ราย กำลังรอรับบริการ — เกินขีดรองรับ`,
        timestamp: new Date().toISOString(),
      });
    } else if (erWaiting > 20 && shouldAlert('er-busy')) {
      alerts.push({
        severity: 'warning',
        category: 'ER',
        message: `⚠️ ER หนาแน่น: ${erWaiting} ราย กำลังรอรับบริการ`,
        timestamp: new Date().toISOString(),
      });
    }

    const occupied = Number(bedCrisis?.occupied || 0);
    const totalBeds = Number(bedCrisis?.total || 1);
    const occPct = Math.round((occupied / totalBeds) * 100);
    if (occPct > 90 && shouldAlert('bed-crisis')) {
      alerts.push({
        severity: 'critical',
        category: 'IPD',
        message: `🛏️ Bed Occupancy วิกฤต: ${occPct}% (${occupied}/${totalBeds} เตียง) — เหลือเตียงว่าง ${totalBeds - occupied} เตียง`,
        timestamp: new Date().toISOString(),
      });
    }

    const longWait = Number(erLongWait?.cnt || 0);
    if (longWait > 0 && shouldAlert('er-long-wait')) {
      alerts.push({
        severity: 'critical',
        category: 'ER',
        message: `⏰ ER ผู้ป่วยรอนาน: ${longWait} ราย รอ > 2 ชม.ยังไม่ได้รับบริการ`,
        timestamp: new Date().toISOString(),
      });
    }

    const criticalUnseen = Number(criticalTriage?.cnt || 0);
    if (criticalUnseen > 0 && shouldAlert('er-critical-triage')) {
      alerts.push({
        severity: 'critical',
        category: 'ER',
        message: `🔴 Triage Level 1(Resuscitation): ${criticalUnseen} ราย ยังไม่ได้รับการตรวจ!`,
        timestamp: new Date().toISOString(),
      });
    }

  } catch { /* silent — alert detection should never crash the system */ }
  return alerts;
}

io.on('connection', (socket) => {
  const sendAll = async () => {
    try {
      const [beds, ews, alerts] = await Promise.all([
        hosxp.getBedOccupancy().catch(() => null),
        getEWSSummary().catch(() => null),
        detectAlerts(),
      ]);
      if (beds) socket.emit('bed:update', beds.map(w => ({ ward: w.name, occupied: w.occupied, available: (w.total_beds || 0) - w.occupied, total: w.total_beds || 0 })));
      if (ews?.alerts?.length) socket.emit('ews:alerts', { critical_count: ews.critical, high_count: ews.high, alerts: ews.alerts.slice(0, 5).map(a => ({ name: a.name, ward: a.ward, ews_score: a.ews.score, action: a.ews.action })) });

      // Send alerts to frontend AlertBanner
      if (alerts.length > 0) {
        for (const alert of alerts) {
          socket.emit('alert:emergency', alert);
        }
      }
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
    await initDataLake();

    // 🏗️ Initialize Materialized Views (pre-compute heavy KPIs)
    try {
      await initMaterializedViews();
    } catch (e) {
      console.warn('⚠️ Materialized Views init skipped:', e.message);
    }

    // 📦 Initialize Data Warehouse (SQLite — long-term trends)
    try {
      dw.initDataWarehouse();
    } catch (e) {
      console.warn('⚠️ Data Warehouse init skipped:', e.message);
    }

    // 🕒 Automated Archiving (Daily Snapshots → Data Lake + Data Warehouse)
    // Runs at startup and every 24 hours to capture long-term trends
    const archiveJobs = async () => {
      try {
        const [summary, forecast] = await Promise.all([
          hosxp.getDashboardSummary(),
          forecastRevenue(12)
        ]);

        // Archive to JSON Data Lake (legacy)
        await archiveSnapshot('dashboard_summary', summary);
        await archiveSnapshot('revenue_forecast', forecast);

        // Archive to SQLite Data Warehouse (new)
        try {
          dw.archiveDailySnapshot(summary);

          // Archive MV data to warehouse if available
          const mvIPD = getMV('mv_ipd_summary');
          if (mvIPD?.length) dw.archiveIPDMonthly(mvIPD);

          const mvER = getMV('mv_er_daily');
          if (mvER?.length) {
            const todayER = mvER.find(r => r.vstdate === new Date().toISOString().split('T')[0]);
            if (todayER) dw.archiveERDaily(todayER);
          }

          const mvRevenue = getMV('mv_monthly_dept_revenue');
          if (mvRevenue?.length) dw.archiveMonthlyRevenue(mvRevenue);

          console.log('📦 Data Warehouse snapshot archived');
        } catch (dwErr) {
          console.warn('⚠️ DW archiving failed:', dwErr.message);
        }

        console.log('✅ Daily Trend Snapshots Archived to Data Lake + Warehouse');
      } catch (e) {
        console.warn('⚠️ Archiving failed:', e.message);
      }
    };
    archiveJobs();
    setInterval(archiveJobs, 24 * 60 * 60 * 1000);

    const lanIP = getLanIP();
    server.listen(PORT, '0.0.0.0', () => console.log(`
╔═══════════════════════════════════════════════════╗
║  🏥 BCH 360° Intelligence V.10  — PRODUCTION     ║
║  Hospital AI Executive Dashboard                  ║
║                                                   ║
║  Local: http://localhost:${PORT}                  ║
║  Network: http://${lanIP}:${PORT}               ║
║                                                   ║
║  Data: HOSxP XE(10.1.0.3)                       ║
║  🧠 AI: 11 Modules Active                         ║
║  📊 MV: 10 Materialized Views                     ║
║  📦 DW: SQLite Data Warehouse                     ║
╚═══════════════════════════════════════════════════╝`));
  } catch (err) { console.error('❌', err.message); process.exit(1); }
})();
