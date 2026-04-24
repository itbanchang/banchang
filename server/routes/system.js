// ============================================================
// BCH 360° Intelligence V.10 — System Routes
// Status, health, servers, MV, metrics, calibration, warehouse, update
// ============================================================
import { Router } from 'express';
import os from 'os';
import path from 'path';
import fs from 'fs';
import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { isMySQLConnected, dbQuery, dbQueryOne, getQueryMetrics, getSemaphoreStats, getServerProfiles, getActiveServer, switchServer } from '../db/mysql.js';
import { getMVStatus, forceRefreshView, forceRefreshAll } from '../db/materializedViews.js';
import { getMasterDataStatus } from '../cache/masterData.js';
import { renderMetrics, getMetricsJSON } from '../monitoring/metrics.js';
import { getAlertStatus } from '../monitoring/alerts.js';
import { runFullCalibration, getCalibrated, getCalibrationMeta } from '../ai/calibration.js';
import dw from '../db/dataWarehouse.js';
import { authorize } from '../middleware/rbac.js';
import { validateQuery } from '../middleware/validate.js';
import { warehouseYearsQuery, warehouseMonthsQuery } from '../middleware/schemas.js';
import { safeError } from '../lib/safeError.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..', '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');

const router = Router();

// Build Info (PUBLIC — no auth required, used for stale-bundle auto-reload detection)
router.get('/build-info', (req, res) => {
  try {
    // Use dist/index.html mtime as version identifier (unique per build)
    const indexPath = path.join(DIST_DIR, 'index.html');
    const stat = fs.statSync(indexPath);
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.json({ buildId: stat.mtimeMs.toString(), buildTime: stat.mtime.toISOString() });
  } catch (e) {
    res.setHeader('Cache-Control', 'no-store');
    res.json({ buildId: 'unknown', error: e.message });
  }
});

// System Status
router.get('/status', (req, res) => {
  res.json({
    version: '10.0.0', mysql_connected: isMySQLConnected(),
    mysql_host: '10.1.0.3', mysql_db: 'bchhosxpxe',
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

// Database Server Management
router.get('/servers', (req, res) => {
  res.json({
    active: getActiveServer(),
    servers: getServerProfiles(),
    timestamp: new Date().toISOString(),
  });
});

router.post('/servers/switch', authorize('admin'), async (req, res) => {
  const { server_id } = req.body || {};
  if (!server_id) return res.status(400).json({ error: 'server_id is required' });
  try {
    const result = await switchServer(server_id);
    res.json(result);
  } catch (err) {
    safeError(res, err, 'System');
  }
});

router.post('/servers/test', authorize('admin'), async (req, res) => {
  const { server_id } = req.body || {};
  if (!server_id) return res.status(400).json({ error: 'server_id is required' });
  const profiles = getServerProfiles();
  const profile = profiles.find(p => p.id === server_id);
  if (!profile) return res.status(400).json({ error: `Unknown server: ${server_id}` });

  try {
    const testPool = (await import('mysql2/promise')).default.createPool({
      host: profile.host, database: profile.database,
      user: profile.user,
      password: profile.password,
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

// Materialized Views Status & Admin
router.get('/mv-status', (req, res) => {
  res.json({
    materialized_views: getMVStatus(),
    master_data: getMasterDataStatus(),
    query_metrics: getQueryMetrics(),
    timestamp: new Date().toISOString()
  });
});

router.post('/mv-refresh', authorize('admin'), async (req, res) => {
  try {
    const { view } = req.body || {};
    if (view) {
      const result = await forceRefreshView(view);
      return res.json({ status: 'ok', refreshed: view, result });
    }
    const result = await forceRefreshAll();
    return res.json({ status: 'ok', refreshed: 'all', views: result });
  } catch (err) {
    safeError(res, err, 'System');
  }
});

// JSON Metrics
router.get('/metrics', (req, res) => {
  res.json(getMetricsJSON());
});

// Alert Status
router.get('/alerts', (req, res) => {
  res.json(getAlertStatus());
});

// AI Calibration
router.get('/calibration', (req, res) => {
  res.json({ weights: getCalibrated(), meta: getCalibrationMeta() });
});

router.post('/calibration/run', authorize('admin'), async (req, res) => {
  try {
    const result = await runFullCalibration();
    res.json(result);
  } catch (err) {
    safeError(res, err, 'System');
  }
});

// Data Warehouse Long-term Trend APIs
router.get('/warehouse/revenue-trend', validateQuery(warehouseYearsQuery), (req, res) => {
  const years = parseInt(req.query.years) || 5;
  res.json({ data_source: 'Data Warehouse', trend: dw.getRevenueTrend(years) });
});

router.get('/warehouse/ipd-trend', validateQuery(warehouseYearsQuery), (req, res) => {
  const years = parseInt(req.query.years) || 3;
  res.json({ data_source: 'Data Warehouse', trend: dw.getIPDTrend(years) });
});

router.get('/warehouse/er-trend', validateQuery(warehouseMonthsQuery), (req, res) => {
  const months = parseInt(req.query.months) || 12;
  res.json({ data_source: 'Data Warehouse', trend: dw.getERTrend(months) });
});

router.get('/warehouse/daily-trend', validateQuery(warehouseMonthsQuery), (req, res) => {
  const months = parseInt(req.query.months) || 12;
  res.json({ data_source: 'Data Warehouse', trend: dw.getDailyTrend(months) });
});

router.get('/warehouse/yoy', (req, res) => {
  res.json({ data_source: 'Data Warehouse', comparison: dw.getYoYComparison() });
});

router.get('/warehouse/stats', (req, res) => {
  res.json({ data_source: 'Data Warehouse', stats: dw.getWarehouseStats() });
});

// System Auto-Update via Git (ADMIN ONLY)
router.post('/update', authorize('admin'), async (req, res) => {
  try {
    exec('git pull', { cwd: ROOT_DIR }, (error, stdout, stderr) => {
      if (error) {
        console.error(`[Auto-Update] Error: ${error.message}`);
        return res.status(500).json({ status: 'error', message: 'Git pull failed', error: error.message });
      }
      console.log(`[Auto-Update] Changes pulled successfully:\n${stdout}`);
      res.status(200).json({
        status: 'success',
        message: 'Code updated successfully. Production auto-deploy will now rebuild and restart automatically.',
        output: stdout
      });
    });
  } catch (err) {
    safeError(res, err, 'System');
  }
});

// Health Check (Quick)
router.get('/health', async (req, res) => {
  const mysqlOk = isMySQLConnected();
  let dbLatency = null;
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

// Health Check (Detailed)
router.get('/health/detailed', async (req, res) => {
  const uptimeSec = Math.round(process.uptime());
  const mem = process.memoryUsage();
  const cpus = os.cpus();

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

  let deployInfo = null;
  try {
    const deployPath = path.join(DIST_DIR, '.deploy-info.json');
    const { readFileSync } = await import('fs');
    deployInfo = JSON.parse(readFileSync(deployPath, 'utf-8'));
  } catch { /* no deploy info */ }

  const days = Math.floor(uptimeSec / 86400);
  const hours = Math.floor((uptimeSec % 86400) / 3600);
  const minutes = Math.floor((uptimeSec % 3600) / 60);

  res.json({
    status: mysqlStatus.connected ? 'healthy' : 'degraded',
    version: '10.0.0',
    environment: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 4000,
    uptime: {
      seconds: uptimeSec,
      formatted: `${days}d ${hours}h ${minutes}m`,
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

export default router;
