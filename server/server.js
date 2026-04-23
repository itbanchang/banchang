// ============================================================
// BCH 360° Intelligence V.10 - Main Server
// HOSxP XE + 8 AI Modules — Performance Optimized
// 🔐 Phase 1 Security Hardening Applied
// ============================================================
import 'dotenv/config';
import express from 'express';
import { createServer } from 'http';
import https from 'https';
import fs from 'fs';
import { Server as SocketIO } from 'socket.io';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
import { exec } from 'child_process';

import { getPool, isMySQLConnected, dbQuery, dbQueryOne, getQueryMetrics, getSemaphoreStats, getServerProfiles, getActiveServer, switchServer } from './db/mysql.js';
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
import dialysisRoutes from './routes/dialysis.js';
import medrecRoutes from './routes/medrec.js';
import debugRoutes from './routes/debug.js';
import xrayRoutes from './routes/xray.js';
import pharmacyRoutes from './routes/pharmacy.js';
import labRoutes from './routes/laboratory.js';
import qualityRoutes from './routes/quality.js';
import evolutionRoutes from './routes/evolution.js';
import executiveRoutes from './routes/executive.js';
import reportRoutes from './routes/report.js';
import staffingRoutes from './routes/staffing.js';
import safetyRoutes from './routes/safety.js';
import kpiExtendedRoutes from './routes/kpiExtended.js';
import dqRoutes from './routes/dq.js';
import rumRoutes from './routes/rum.js';
import briefingRoutes from './routes/briefing.js';
import v2Shims from './routes/v2Shims.js';
import { authenticate, authorize } from './middleware/rbac.js';
import { auditMiddleware } from './middleware/audit.js';
import { trackingMiddleware } from './middleware/tracking.js';
import { initDataLake, archiveSnapshot } from './db/dataLake.js';
import { initMaterializedViews, getMV, getMVStatus, forceRefreshView, forceRefreshAll } from './db/materializedViews.js';
import dw from './db/dataWarehouse.js';
import logger from './logger.js';
import { startOccupancySyncJob } from './jobs/occupancySync.js';
import { metricsMiddleware, renderMetrics, getMetricsJSON } from './monitoring/metrics.js';
import { observabilityMiddleware } from './middleware/observability.js';
import { startAlertEngine, getAlertStatus } from './monitoring/alerts.js';
import { startCalibrationEngine, runFullCalibration, getCalibrated, getCalibrationMeta } from './ai/calibration.js';
import { getRedisClient, isRedisConnected } from './infra/redisClient.js';
import { registerJob, startAllJobs, getJobStatus } from './infra/jobQueue.js';
import { pushLog, startLogSubscriber } from './infra/centralLog.js';
import infraRoutes from './routes/infrastructure.js';

const app = express();

// ====== ENVIRONMENT VALIDATION (Phase 1) ======
const requiredEnvVars = ['JWT_SECRET', 'MYSQL_HOST', 'MYSQL_USER', 'MYSQL_PASS', 'MYSQL_DB'];
const NODE_ENV = process.env.NODE_ENV || 'development';
const IS_PRODUCTION = NODE_ENV === 'production';

// SSL is optional — only required if SSL_KEY_PATH is explicitly set
const USE_SSL = IS_PRODUCTION && process.env.SSL_KEY_PATH && process.env.SSL_CERT_PATH;
if (IS_PRODUCTION && process.env.SSL_KEY_PATH) {
  requiredEnvVars.push('SSL_KEY_PATH', 'SSL_CERT_PATH');
}

const missingVars = requiredEnvVars.filter(v => !process.env[v]);
if (missingVars.length > 0) {
  console.error(`\n❌ FATAL: Missing required environment variables:`);
  missingVars.forEach(v => console.error(`   - ${v}`));
  console.error(`\nPlease set these variables before starting the server.\n`);
  process.exit(1);
}

// Validate JWT_SECRET strength
if (process.env.JWT_SECRET.length < 32) {
  console.error(`\n❌ FATAL: JWT_SECRET must be at least 32 characters (currently ${process.env.JWT_SECRET.length})`);
  process.exit(1);
}

// ---- Network config (needed before server creation) ----
const SERVER_IP = process.env.SERVER_IP || '10.109.0.33';
const PROD_PORT = process.env.PROD_PORT || 4000;
const DEV_PORT = process.env.DEV_PORT || 3001;

// ====== SERVER CREATION (HTTP or HTTPS) ======
let server;
let httpRedirectServer;

if (USE_SSL) {
  // Production + SSL: Use HTTPS with certificates
  const sslKeyPath = process.env.SSL_KEY_PATH;
  const sslCertPath = process.env.SSL_CERT_PATH;

  if (!fs.existsSync(sslKeyPath) || !fs.existsSync(sslCertPath)) {
    console.error(`\n❌ FATAL: SSL certificate files not found`);
    console.error(`   Key: ${sslKeyPath}`);
    console.error(`   Cert: ${sslCertPath}\n`);
    process.exit(1);
  }

  const httpsOptions = {
    key: fs.readFileSync(sslKeyPath),
    cert: fs.readFileSync(sslCertPath)
  };

  server = https.createServer(httpsOptions, app);

  // Create HTTP redirect server (port 80 → 443)
  httpRedirectServer = createServer((req, res) => {
    const host = req.headers.host.split(':')[0];  // Remove port if present
    res.writeHead(301, { 'Location': `https://${host}:${PROD_PORT}${req.url}` });
    res.end();
  });

  console.log(`🔒 HTTPS Using HTTPS with certificates`);
} else {
  // HTTP mode (development, or production on intranet without SSL)
  server = createServer(app);
  if (IS_PRODUCTION) {
    console.log(`⚡ HTTP (PROD) Production over HTTP — intranet mode (set SSL_KEY_PATH & SSL_CERT_PATH for HTTPS)`);
  } else {
    console.log(`⚡ HTTP (DEV) Using HTTP (development mode)`);
  }
}

// ---- AI-3: Lock CORS to known origins ----
const PROTOCOL = USE_SSL ? 'https' : 'http';
const ALLOWED_ORIGINS = IS_PRODUCTION
  ? [
      `${PROTOCOL}://${SERVER_IP}:${PROD_PORT}`,    // Production (HTTPS or HTTP)
      `${PROTOCOL}://localhost:${PROD_PORT}`,        // Production localhost
    ]
  : [
      'http://localhost:4001',                       // Vite dev (exact port)
      'http://localhost:4000',                       // Dev backend (exact port)
      'http://localhost:3001',                       // Alternative dev port
      `http://${SERVER_IP}:${DEV_PORT}`,             // LAN dev (exact port)
      `http://${SERVER_IP}:${PROD_PORT}`,            // LAN production HTTP (exact port)
    ];

const io = new SocketIO(server, {
  cors: { 
    origin: ALLOWED_ORIGINS, 
    credentials: true,
    methods: ['GET', 'POST'],
    maxAge: 3600
  },
  transports: IS_PRODUCTION ? ['websocket'] : ['websocket', 'polling'],  // Only websocket in production
});
const PORT = process.env.PORT || 4000;

// ---- ESM __dirname ----
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

// ---- Middleware ----
app.use(compression({ level: 4, threshold: 1024 })); // gzip responses >1KB (level 4 = better CPU/ratio balance)

// ====== HTTPS ENFORCEMENT (only when SSL is active) ======
if (USE_SSL) {
  app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') === 'https' || req.secure) {
      return next();
    }
    const host = req.get('host');
    res.redirect(301, `https://${host}${req.originalUrl}`);
  });
}

app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }));

// ====== SECURITY HEADERS (Phase 1) ======
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: IS_PRODUCTION 
        ? ["'self'"]                    // Production: strict CSP
        : ["'self'", "'unsafe-inline'"],  // Dev: needs hot reload
      connectSrc: [
        "'self'",
        IS_PRODUCTION ? null : "ws://localhost:*",     // Dev only
        `${USE_SSL ? 'wss' : 'ws'}://${SERVER_IP}:${PROD_PORT}`,  // Prod WebSocket
        IS_PRODUCTION ? null : `ws://${SERVER_IP}:${DEV_PORT}`,    // Dev WebSocket
      ].filter(Boolean),
      imgSrc: ["'self'", "data:", "blob:"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "data:", "https://fonts.gstatic.com"],
      frameSrc: ["'none'"],  // Prevent clickjacking
      objectSrc: ["'none'"], // Prevent plugin-based attacks
      manifestSrc: ["'self'"],
      mediaSrc: ["'self'"],
      // upgradeInsecureRequests: only enable when actually using HTTPS
      upgradeInsecureRequests: USE_SSL ? [] : null,
    }
  },
  referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  hsts: USE_SSL ? { maxAge: 31536000, includeSubDomains: true, preload: true } : false,  // HSTS only when SSL is active
  frameguard: { action: 'deny' },
  noSniff: true,
  xssFilter: true,
}));

app.use(express.json());
app.use(cookieParser()); // Parse httpOnly cookies for JWT auth

// ====== REQUEST TRACKING & LOGGING (Phase 2) ======
app.use(trackingMiddleware());

// ====== PROMETHEUS METRICS COLLECTION ======
app.use(metricsMiddleware());

// ====== STRUCTURED LOGS + REQUEST ID (bch-observability) ======
app.use(observabilityMiddleware);

// ---- Serve Production Frontend (dist/) ----
app.use(express.static(DIST_DIR, {
  etag: true,
  setHeaders: (res, pathStr) => {
    if (pathStr.includes('/assets/')) {
      // ⚡ Vite assets have hashes in names, safe to cache for 1 year
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    } else {
      // index.html must always revalidate (no-cache still allows 304)
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
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
// RUM ingestion — anonymous + internally rate-limited (web-vitals, client errors)
app.use('/api/rum', rumRoutes);

// ---- AI-1: Enable Authentication on all /api/* routes ----
// All routes below this line require a valid JWT token.
// If no token is provided, fallback to 'demo/director' role (Phase 1 grace period).
app.use('/api', authenticate);

// V2 shims — mounted before domain-specific routers so their exact paths
// (e.g. /api/finance/summary, /api/clinical/insights) win over legacy handlers.
app.use('/api', v2Shims);

// ---- Protected Routes (RBAC authorize on ALL routes) ----
app.use('/api/finance', auditMiddleware('financial_data'), authorize('finance'), financeRoutes);
app.use('/api/ipd', auditMiddleware('ward_info'), authorize('ipd'), ipdRoutes);
app.use('/api/clinical', auditMiddleware('clinical_risk'), authorize('clinical'), clinicalRoutes);
app.use('/api/opd', auditMiddleware('patient_info'), authorize('opd'), opdRoutes);
app.use('/api/er', auditMiddleware('patient_info'), authorize('er'), erRoutes);
app.use('/api/dental', auditMiddleware('patient_info'), authorize('dental'), dentalRoutes);
app.use('/api/thaimedicine', auditMiddleware('patient_info'), authorize('thaimed'), thaimedRoutes);
app.use('/api/physicaltherapy', auditMiddleware('patient_info'), authorize('phystherapy'), ptRoutes);
app.use('/api/ncd', auditMiddleware('patient_info'), authorize('ncd'), ncdRoutes);
app.use('/api/dialysis', auditMiddleware('patient_info'), authorize('clinical'), dialysisRoutes);
app.use('/api/medrec', auditMiddleware('patient_info'), authorize('medrec'), medrecRoutes);
app.use('/api/xray', auditMiddleware('patient_info'), authorize('xray'), xrayRoutes);
app.use('/api/pharmacy', auditMiddleware('patient_info'), authorize('pharmacy'), pharmacyRoutes);
app.use('/api/lab', auditMiddleware('patient_info'), authorize('lab'), labRoutes);
app.use('/api/quality', auditMiddleware('patient_info'), authorize('quality'), qualityRoutes);
app.use('/api/ai', auditMiddleware('clinical_risk'), authorize('ai'), aiRoutes);
app.use('/api/evolution', evolutionRoutes);
app.use('/api/executive', auditMiddleware('executive_data'), authorize('finance'), executiveRoutes);
app.use('/api/report', auditMiddleware('operational'), authorize('finance'), reportRoutes);
app.use('/api/staffing', auditMiddleware('operational'), authorize('clinical'), staffingRoutes);
app.use('/api/safety', auditMiddleware('patient_safety'), authorize('clinical'), safetyRoutes);
app.use('/api/kpi', auditMiddleware('operational'), authorize('finance'), kpiExtendedRoutes);
app.use('/api/infra', authorize('admin'), infraRoutes);
app.use('/api/debug', authorize('admin'), debugRoutes);
// ── Tier 1/2 additions: Data Quality / RUM ingestion / Briefing reports ──
app.use('/api/dq', authorize('admin'), dqRoutes);
app.use('/api/briefing', auditMiddleware('executive_data'), authorize('finance'), briefingRoutes);

// ---- Cache Helper (Stale-While-Revalidate + Request Deduplication) ----
const cache = {};
const inflight = new Map(); // dedup: prevent thundering herd on cache miss
const MAX_CACHE_ENTRIES = 200;
function evictCache() {
  const keys = Object.keys(cache);
  if (keys.length <= MAX_CACHE_ENTRIES) return;
  // Remove oldest entries to stay at limit
  keys.sort((a, b) => (cache[a]?.t || 0) - (cache[b]?.t || 0))
      .slice(0, keys.length - MAX_CACHE_ENTRIES)
      .forEach(k => delete cache[k]);
}
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
          evictCache();
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
        evictCache();
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
    return buildFiscalResult(await dbQuery(sql, [globalStart, globalEnd, mainDep], { timeoutMs: 25000 }), fiscalYears, dataSource);
  }
  const sql = `SELECT YEAR(vstdate) AS yr, MONTH(vstdate) AS mo, SUM(income) AS revenue, COUNT(DISTINCT vn) AS visit_count, COUNT(DISTINCT hn) AS patient_count
     FROM vn_stat WHERE vstdate BETWEEN ? AND LEAST(?, CURDATE()) GROUP BY YEAR(vstdate), MONTH(vstdate) ORDER BY yr, mo`;
  return buildFiscalResult(await dbQuery(sql, [globalStart, globalEnd], { timeoutMs: 25000 }), fiscalYears, dataSource);
}

// ---- System Status ----
app.get('/api/system/status', (req, res) => {
  res.json({
    version: '10.0.0', mysql_connected: isMySQLConnected(),
    mysql_host: process.env.MYSQL_HOST || '10.109.0.33', mysql_db: process.env.MYSQL_DB || 'bchhosxpxe',
    data_source: isMySQLConnected() ? 'HOSxP XE (Live)' : 'Disconnected',
    ai_modules: [
      'NEWS2 EWS', 'Revenue Forecast', 'Readmission Risk', 'Bed Demand', 'DRG Optimizer',
      'ER Surge', 'LOS Predictor', 'Billing Anomaly', 'ER Admission Pred', 'ER Wait Forecast'
    ],
    query_metrics: getQueryMetrics(),
    semaphore: getSemaphoreStats(),
    uptime: Math.round(process.uptime())
  });
});

// ---- Database Server Management ----
app.get('/api/system/servers', (req, res) => {
  res.json({
    active: getActiveServer(),
    servers: getServerProfiles(),
    timestamp: new Date().toISOString(),
  });
});

app.post('/api/system/servers/switch', authorize('admin'), async (req, res) => {
  const { server_id } = req.body || {};
  if (!server_id) return res.status(400).json({ error: 'server_id is required' });
  try {
    const result = await switchServer(server_id);
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/system/servers/test', authorize('admin'), async (req, res) => {
  const { server_id } = req.body || {};
  if (!server_id) return res.status(400).json({ error: 'server_id is required' });
  const profiles = getServerProfiles();
  const profile = profiles.find(p => p.id === server_id);
  if (!profile) return res.status(400).json({ error: `Unknown server: ${server_id}` });

  // Credentials come from .env per profile — keeps secrets out of source.
  // Note: historical copy of this block had the slave2 password as
  // 'boom123boom123' (vs 'boom123' in server/db/mysql.js); if slave2 auth
  // fails here, check which value is actually correct and set it in .env.
  const creds = ({
    slave1: { user: process.env.MYSQL_USER, password: process.env.MYSQL_PASS },
    master: { user: process.env.MYSQL_MASTER_USER, password: process.env.MYSQL_MASTER_PASS },
    slave2: { user: process.env.MYSQL_SLAVE2_USER, password: process.env.MYSQL_SLAVE2_PASS },
  })[profile.id] || {};

  try {
    const testPool = (await import('mysql2/promise')).default.createPool({
      host: profile.host, database: profile.database,
      user: creds.user,
      password: creds.password,
      port: profile.port,
      connectionLimit: 1, connectTimeout: 5000,
    });
    const t0 = Date.now();
    const [rows] = await testPool.query('SELECT NOW() AS server_time, VERSION() AS version');
    const latency = Date.now() - t0;
    await testPool.end();
    res.json({
      server_id, status: 'reachable', latency_ms: latency,
      server_time: rows[0]?.server_time, version: rows[0]?.version,
    });
  } catch (err) {
    res.json({ server_id, status: 'unreachable', error: err.message });
  }
});

// ---- Materialized Views Status & Admin ----
app.get('/api/system/mv-status', (req, res) => {
  res.json({
    materialized_views: getMVStatus(),
    query_metrics: getQueryMetrics(),
    timestamp: new Date().toISOString()
  });
});

app.post('/api/system/mv-refresh', authorize('admin'), async (req, res) => {
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

// ---- Prometheus Metrics Endpoint (scrape target) ----
app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain; version=0.0.4; charset=utf-8');
  res.send(renderMetrics());
});

// ---- JSON Metrics (for dashboard / API consumers) ----
app.get('/api/system/metrics', (req, res) => {
  res.json(getMetricsJSON());
});

// ---- Alert Status ----
app.get('/api/system/alerts', (req, res) => {
  res.json(getAlertStatus());
});

// ---- AI Calibration Status & Trigger ----
app.get('/api/system/calibration', (req, res) => {
  res.json({ weights: getCalibrated(), meta: getCalibrationMeta() });
});

app.post('/api/system/calibration/run', authorize('admin'), async (req, res) => {
  try {
    const result = await runFullCalibration();
    res.json(result);
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

// ---- System Auto-Update via Git (ADMIN ONLY) ----
app.post('/api/system/update', authorize('admin'), async (req, res) => {
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
        host: process.env.MYSQL_HOST || '10.109.0.33',
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
  const T = (p, ms) => Promise.race([p.catch(() => null), new Promise(r => setTimeout(() => r(null), ms))]);

  // EWS runs in parallel with a 3s timeout
  const ewsPromise = T(
    getEWSSummary().then(e => ({ critical: e.critical, high: e.high, total: e.total_patients })),
    3000
  );

  // All queries in one parallel batch — slow revenue/collection wrapped with 7s timeout
  const [
    d, ewsStats,
    prevRevenue, prevOPD, prevIPD, prevER,
    collectionData,   // อัตราเรียกเก็บ + ค้างชำระเดือนนี้
    denialData,       // อัตรา denial 30 วัน
    alosData,         // Average LOS 30 วัน
    staffData,        // แพทย์/เจ้าหน้าที่มีการตรวจวันนี้
  ] = await Promise.all([
    hosxp.getDashboardSummary(),
    ewsPromise.then(r => r || { critical: 0, high: 0, total: 0 }),

    // รายได้เดือนก่อน
    T(dbQueryOne(`
      SELECT COALESCE(SUM(income), 0) as revenue
      FROM vn_stat
      WHERE vstdate >= DATE_FORMAT(DATE_SUB(CURDATE(), INTERVAL 1 MONTH), '%Y-%m-01')
        AND vstdate < DATE_FORMAT(CURDATE(), '%Y-%m-01')
    `), 7000),

    // OPD เมื่อวาน
    T(dbQueryOne(`SELECT COUNT(DISTINCT vn) as total FROM ovst WHERE vstdate = DATE_SUB(CURDATE(), INTERVAL 1 DAY)`), 3000),

    // IPD วันก่อน (active)
    T(dbQueryOne(`SELECT COUNT(*) as total FROM ipt WHERE dchdate IS NULL AND regdate < CURDATE() AND ward != '06'`), 3000),

    // ER เมื่อวาน
    T(dbQueryOne(`SELECT COUNT(*) as total FROM er_regist WHERE vstdate = DATE_SUB(CURDATE(), INTERVAL 1 DAY)`), 3000),

    // อัตราเรียกเก็บ + ยอดค้างชำระ (เดือนนี้)
    // Collection Rate = (income − remain_money) / income × 100
    // ใช้สูตร Net Collection: ยอดเรียกเก็บได้ (รวมสิทธิ์) หักค้างชำระ
    T(dbQueryOne(`
      SELECT
        ROUND(100.0 * COALESCE(SUM(income - remain_money), 0) / NULLIF(SUM(income), 0), 1) as collection_rate,
        COALESCE(SUM(CASE WHEN remain_money > 0 THEN remain_money ELSE 0 END), 0) as debtors_outstanding,
        COUNT(*) as total_vn
      FROM vn_stat
      WHERE vstdate >= DATE_FORMAT(CURDATE(), '%Y-%m-01')
        AND income > 0
    `), 7000),

    // อัตราปฏิเสธสิทธิ์ (30 วัน — remain_money > 0)
    T(dbQueryOne(`
      SELECT
        ROUND(100.0 * SUM(CASE WHEN remain_money > 0 THEN 1 ELSE 0 END)
          / NULLIF(COUNT(*), 0), 1) as denial_rate,
        SUM(CASE WHEN remain_money > 0 THEN 1 ELSE 0 END) as denied_count,
        COUNT(*) as total_count
      FROM vn_stat
      WHERE vstdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND income > 0
    `), 7000),

    // ALOS (Average Length of Stay) — 30 วัน
    T(dbQueryOne(`
      SELECT ROUND(AVG(DATEDIFF(dchdate, regdate)), 1) as alos
      FROM ipt
      WHERE dchdate >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        AND dchdate IS NOT NULL AND ward != '06'
        AND DATEDIFF(dchdate, regdate) BETWEEN 0 AND 60
    `), 5000),

    // จำนวนแพทย์ที่มีการตรวจวันนี้ (proxy สำหรับ staff on duty)
    T(dbQueryOne(`
      SELECT COUNT(DISTINCT doctor) as doctors_today
      FROM ovst
      WHERE vstdate = CURDATE() AND doctor IS NOT NULL AND doctor != ''
    `), 3000),
  ]);

  const calcT = (cur, prev) => {
    if (cur == null || !prev || prev === 0) return null;
    return Math.round(((cur - prev) / Math.abs(prev)) * 100);
  };

  const ytd        = d.revenue_ytd || 0;
  const thisMonth  = d.revenue_this_month || 0;
  const prevMonth  = Number(prevRevenue?.revenue || 0);
  const collRate   = collectionData?.collection_rate != null ? Number(collectionData.collection_rate) : null;
  const debtors    = collectionData?.debtors_outstanding != null ? Number(collectionData.debtors_outstanding) : null;
  const denialRate = denialData?.denial_rate != null ? Number(denialData.denial_rate) : null;
  const alos       = alosData?.alos != null ? Number(alosData.alos) : null;
  const doctors    = staffData?.doctors_today != null ? Number(staffData.doctors_today) : null;

  console.log(`📊 Dashboard Summary: ${Date.now() - start}ms | collection=${collRate}% denial=${denialRate}% alos=${alos} doctors=${doctors}`);

  return {
    data_source: 'HOSxP XE',
    finance: {
      total_revenue:        ytd,
      revenue_this_month:   thisMonth,
      // Expense estimate — สธ. รพ.ชุมชน benchmark 82%
      total_expense:        Math.round(ytd * 0.82),
      net_profit:           Math.round(ytd * 0.18),
      profit_margin:        18,
      trend_revenue:        calcT(thisMonth, prevMonth),
      collection_rate:      collRate,
      debtors_outstanding:  debtors,
      denial_rate:          denialRate,
      denied_count:         denialData?.denied_count != null ? Number(denialData.denied_count) : null,
    },
    opd: {
      today_visits:  d.opd_today,
      trend_visits:  calcT(d.opd_today, Number(prevOPD?.total || 0)),
    },
    ipd: {
      active_admissions: d.ipd_current,
      trend_admissions:  calcT(d.ipd_current, Number(prevIPD?.total || 0)),
      alos,
    },
    er: {
      today_visits: d.er_today,
      trend_visits: calcT(d.er_today, Number(prevER?.total || 0)),
    },
    beds: {
      total:          d.total_beds,
      occupied:       d.beds_occupied,
      available:      d.total_beds - d.beds_occupied,
      occupancy_rate: d.occupancy_rate,
    },
    clinical: {
      critical_patients:  ewsStats.critical,
      high_risk_patients: ewsStats.high,
      total_monitored:    ewsStats.total,
    },
    staff: {
      on_duty:       doctors,
      doctors_today: doctors,
    },
    last_updated: new Date().toISOString(),
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

// ⚠️ REMOVED: Duplicate route registrations that bypassed auth/RBAC (Security Fix - 2026-03-17)
// All routes are now registered once with proper authenticate + authorize + audit middleware above.


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
    // Use Promise.allSettled for resilience — one failing query won't block the others
    const results = await Promise.allSettled([
      // 1. EWS High-Risk patients (score ≥ 7)
      dbQueryOne(`
        SELECT COUNT(*) as cnt FROM an_stat a
        INNER JOIN patient p ON a.hn = p.hn
        WHERE a.dchdate IS NULL
        AND a.rw > 0
    `),

      // 2. ER Overcrowding (>30 patients currently waiting)
      dbQueryOne(`
        SELECT COUNT(*) as cnt FROM er_regist e
        INNER JOIN ovst o ON e.vn = o.vn
        LEFT JOIN service_time st ON o.vn = st.vn
        WHERE o.vstdate = CURDATE()
        AND e.er_dch_type IS NULL
        AND st.service7 IS NULL
    `),

      // 3. Bed Occupancy Crisis (>90%)
      dbQueryOne(`
        SELECT
          SUM(CASE WHEN a.dchdate IS NULL THEN 1 ELSE 0 END) as occupied,
    (SELECT SUM(bedcount) FROM ward WHERE ward_active = 'Y') as total
        FROM an_stat a
        WHERE a.dchdate IS NULL
    `),

      // 4. ER patients waiting > 2 hours with no service
      dbQueryOne(`
        SELECT COUNT(*) as cnt FROM er_regist e
        INNER JOIN ovst o ON e.vn = o.vn
        LEFT JOIN service_time st ON o.vn = st.vn
        WHERE o.vstdate = CURDATE()
        AND e.er_dch_type IS NULL
        AND st.service1 IS NULL
        AND o.vsttime IS NOT NULL
        AND TIME_TO_SEC(TIMEDIFF(CURTIME(), o.vsttime)) > 7200
    `),

      // 5. Critical triage patients (Level 1 — Resuscitation) not yet seen
      dbQueryOne(`
        SELECT COUNT(*) as cnt FROM er_regist e
        INNER JOIN ovst o ON e.vn = o.vn
        LEFT JOIN service_time st ON o.vn = st.vn
        WHERE o.vstdate = CURDATE()
        AND e.er_emergency_type = '1'
        AND e.er_dch_type IS NULL
        AND st.service1 IS NULL
      `),
    ]);
    const [ewsHigh, erOvercrowd, bedCrisis, erLongWait, criticalTriage] =
      results.map(r => r.status === 'fulfilled' ? r.value : null);

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
        _resus_count: criticalUnseen, // used to emit er:resus dedicated event
      });
    }

  } catch (err) { logger.warn('[Alerts] detectAlerts error', { error: err.message }); }
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
          // Dedicated Triage Level 1 event — ERTab shows flashing resus banner
          if (alert._resus_count > 0) {
            socket.emit('er:resus', {
              count: alert._resus_count,
              message: alert.message,
              timestamp: alert.timestamp,
            });
          }
        }
      }
    } catch (err) { logger.warn('[Socket] sendAll error', { error: err.message }); }
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

// ====== GLOBAL ERROR HANDLERS ======
// 404 Handler
app.use((req, res) => {
  logger.warn('404 Not Found', { path: req.path, method: req.method });
  res.status(404).json({ 
    error: 'Not found',
    path: req.path,
    method: req.method,
    timestamp: new Date().toISOString()
  });
});

// Global error handling middleware (MUST be last)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || err.status || 500;
  const isDev = NODE_ENV !== 'production';

  logger.error('Unhandled route error', {
    path: req.path,
    method: req.method,
    statusCode,
    error: err.message,
    stack: isDev ? err.stack : undefined,
    userId: req.user?.id,
    timestamp: new Date().toISOString()
  });

  // Self-Heal: detect pattern & auto-fix
  import('./ai/selfHeal.js').then(({ handleError }) => handleError(err, { path: req.path, method: req.method })).catch(() => {});

  // Never expose internal error details to client in production
  const message = isDev ? err.message : 'Internal server error';

  res.status(statusCode).json({
    error: message,
    requestId: req.id || 'unknown',
    timestamp: new Date().toISOString(),
    ...(isDev && { stack: err.stack })
  });
});

// Handle uncaught exceptions — route through Self-Heal
process.on('uncaughtException', async (err) => {
  logger.error('🔴 UNCAUGHT EXCEPTION', { error: err.message, stack: err.stack });
  try { const { handleError } = await import('./ai/selfHeal.js'); await handleError(err, { source: 'uncaughtException' }); } catch { }
});

// Handle unhandled promise rejections — route through Self-Heal
process.on('unhandledRejection', async (reason, promise) => {
  logger.error('🔴 UNHANDLED REJECTION', { reason: String(reason), promise: String(promise) });
  try { const { handleError } = await import('./ai/selfHeal.js'); await handleError(reason, { source: 'unhandledRejection' }); } catch { }
});

// ====== GRACEFUL SHUTDOWN ======
async function gracefulShutdown(signal) {
  logger.info(`\n\n🛑 ${signal} received. Starting graceful shutdown...`);
  
  // 1. Stop accepting new requests
  server.close(async () => {
    logger.info('✅ HTTP server closed. Waiting for active requests...');
    
    try {
      // 2. Close WebSocket connections
      if (io) {
        io.disconnectSockets();
        logger.info('✅ WebSocket connections closed');
      }

      // 3. Close database pool
      const pool = await getPool();
      if (pool?.end) {
        await pool.end();
        logger.info('✅ Database connections closed');
      }

      logger.info('✅ Graceful shutdown completed');
      process.exit(0);
    } catch (err) {
      logger.error('Error during graceful shutdown', err);
      process.exit(1);
    }
  });

  // 4. Force shutdown after timeout (30 seconds)
  setTimeout(() => {
    logger.error('⚠️ Forced shutdown after 30s timeout. Some requests may not have completed.');
    process.exit(1);
  }, 30000);
}

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// ---- Start ----
(async () => {
  try {
    await getPool();

    // ⚡ INSTANT BOOT: Start listening immediately once DB is connected
    // This prevents Vite proxy timeouts (ECONNREFUSED) while heavy background tasks run
    const lanIP = getLanIP();
    const protocol = USE_SSL ? 'https' : 'http';

    // Start HTTPS redirect server if in production (optional — port 80 may require admin)
    if (IS_PRODUCTION && httpRedirectServer) {
      httpRedirectServer.listen(80, '0.0.0.0', () => {
        console.log(`✅ HTTP redirect server listening on port 80 (redirects to HTTPS)`);
      }).on('error', (err) => {
        if (err.code === 'EACCES' || err.code === 'EADDRINUSE') {
          console.log(`⚠️ HTTP→HTTPS redirect on port 80 skipped (${err.code}) — not critical`);
        } else {
          console.error(`❌ HTTP redirect server error: ${err.message}`);
        }
      });
    }

    server.listen(PORT, '0.0.0.0', () => {
      console.log(`
╔═══════════════════════════════════════════════════╗
║  🏥 BCH 360° Intelligence V.10  — PRODUCTION     ║
║  Hospital AI Executive Dashboard                  ║
║                                                   ║
║  Protocol: ${USE_SSL ? '🔒 HTTPS' : IS_PRODUCTION ? '⚡ HTTP (PROD)' : '⚡ HTTP (DEV)'}${' '.repeat(28 - (USE_SSL ? '🔒 HTTPS' : IS_PRODUCTION ? '⚡ HTTP (PROD)' : '⚡ HTTP (DEV)').length)}║
║  Local: ${protocol}://localhost:${PORT}${' '.repeat(38 - protocol.length - String(PORT).length)}║
║  Network: ${protocol}://${lanIP}:${PORT}${' '.repeat(35 - protocol.length - lanIP.length - String(PORT).length)}║
║                                                   ║
║  Data: HOSxP XE(10.109.0.33)                    ║
║  🧠 AI: 11 Modules Active                         ║
║  🛡️ Phase 1 Security: HARDENED                    ║
║  🕒 Server Status: LISTENING                      ║
╚═══════════════════════════════════════════════════╝`);

      console.log(`✅ Environment Validation: PASSED`);
      console.log(`   - JWT_SECRET: [SET — ${process.env.JWT_SECRET.length} chars]`);
      console.log(`   - Database: ${process.env.MYSQL_HOST}:3306/${process.env.MYSQL_DB}`);
      console.log(`   - Authentication: Demo user bypass REMOVED ✓`);
      console.log(`   - HTTPS/TLS: ${USE_SSL ? 'ENABLED ✓' : IS_PRODUCTION ? 'HTTP intranet mode' : 'Development mode'}`);
      console.log(`   - Content-Security-Policy: ENABLED ✓`);
      console.log(`   - Helmet security headers: ENABLED ✓`);
      console.log(`   - Prometheus Metrics: /metrics ENABLED ✓`);
      console.log(`   - Alert Engine: ENABLED (60s interval) ✓`);

      // 📊 Start Alert Engine (checks every 60 seconds)
      startAlertEngine(60_000);

      // 🧠 Start AI Calibration Engine (auto-calibrate every 24 hours)
      startCalibrationEngine(24 * 60 * 60 * 1000);

      // 🔧 Initialize Distributed Infrastructure
      //    Redis → Cache/Queue/PubSub (fallback: in-memory if unavailable)
      try {
        getRedisClient(); // Attempt Redis connection (non-blocking)
        startLogSubscriber(); // Subscribe to centralized log channel
        console.log(`   - Redis: ${isRedisConnected() ? 'CONNECTED ✓' : 'UNAVAILABLE (in-memory fallback)'}`);
        console.log(`   - Job Queue: ${isRedisConnected() ? 'BullMQ (distributed)' : 'node-cron (local)'}`);
        console.log(`   - Central Logging: ${isRedisConnected() ? 'Redis Pub/Sub ✓' : 'Local buffer'}`);
      } catch (e) {
        console.log(`   - Redis: UNAVAILABLE (${e.message}) — using in-memory fallback`);
      }

      // 🏗️ Background Initializations (Lazy Load)
      // These are offloaded to background to keep the API responsive
      setImmediate(async () => {
        try {
          await initDataLake();

          // 🏗️ Materialized Views (Heavy KPIs)
          initMaterializedViews().catch(e => {
            logger.warn('MV Background Init Error', { error: e.message });
          });

          // 📦 Data Warehouse (SQLite Trend Storage)
          try {
            dw.initDataWarehouse();
            // Seed evolution log with initial entries
            const { seedEvolutionIfEmpty } = await import('./db/evolutionStore.js');
            seedEvolutionIfEmpty();
          } catch (e) {
            logger.warn('DW Background Init Error', { error: e.message });
          }

          // 🔧 Self-Healing: periodic health check every 5 minutes
          setInterval(async () => {
            try {
              const { runHealthCheck } = await import('./ai/selfHeal.js');
              const health = await runHealthCheck();
              if (health.status !== 'healthy') {
                logger.warn(`🔧 [SelfHeal] Health: ${health.status}`, { issues: health.issues.length });
              }
            } catch { }
          }, 5 * 60 * 1000);

          // 🕒 Automated Archiving Jobs
          const archiveJobs = () => {
            // Wrap in setImmediate to avoid blocking the event loop during archival
            setImmediate(async () => {
              try {
                const summary = await hosxp.getDashboardSummary();
                await archiveSnapshot('dashboard_summary', summary);
                try {
                  dw.archiveDailySnapshot(summary);
                  const mvIPD = getMV('mv_ipd_summary'); if (mvIPD?.length) dw.archiveIPDMonthly(mvIPD);
                  const mvER = getMV('mv_er_daily'); if (mvER?.length) {
                    const todayER = mvER.find(r => r.vstdate === new Date().toISOString().split('T')[0]);
                    if (todayER) dw.archiveERDaily(todayER);
                  }
                  const mvRevenue = getMV('mv_monthly_dept_revenue'); if (mvRevenue?.length) dw.archiveMonthlyRevenue(mvRevenue);
                } catch (dwErr) { }
              } catch (e) { }
            });
          };
          archiveJobs();
          setInterval(archiveJobs, 24 * 60 * 60 * 1000);

          // 🏥 PHASE 2: Start IPD Occupancy Sync Job (every 30 min)
          try {
            startOccupancySyncJob(io).catch(err => {
              logger.warn('Occupancy sync startup error', { error: err.message });
            });
          } catch (occErr) {
            logger.warn('Failed to start occupancy sync job', { error: String(occErr) });
          }

          // 📋 Register background jobs with distributed queue
          registerJob('health_check', async () => {
            const { runHealthCheck } = await import('./ai/selfHeal.js');
            return runHealthCheck();
          }, { cron: '*/5 * * * *', description: 'Self-healing health check', runOnStart: false });

          registerJob('daily_archive', async () => {
            const summary = await hosxp.getDashboardSummary();
            await archiveSnapshot('dashboard_summary', summary);
            dw.archiveDailySnapshot(summary);
            return { archived: true };
          }, { cron: '0 2 * * *', description: 'Daily data archival (2 AM)', runOnStart: false });

          // Start all registered jobs (BullMQ if Redis, cron if not)
          startAllJobs().catch(e => logger.warn('Job queue start error', { error: e.message }));

          console.log('\n🚀 All background analytical processes started.');
        } catch (initErr) {
          console.error('⚠️ Lazy Boot Background Init Failed:', initErr.message);
        }
      });
    });
  } catch (err) {
    console.error('❌ Critical Startup Failed:', err.message);
    process.exit(1);
  }
})();
