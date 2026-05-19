// ============================================================
// BCH 360° Intelligence V.10 — Infrastructure Status API
// Cache, Job Queue, Centralized Logging
// ============================================================
import { Router } from 'express';
import { getDistributedCacheStats } from '../infra/distributedCache.js';
import { getJobStatus, triggerJob } from '../infra/jobQueue.js';
import { queryLogs, getLogStats } from '../infra/centralLog.js';
import { validateParams } from '../middleware/validate.js';
import { triggerJobParams } from '../middleware/schemas.js';
import { safeError } from '../lib/safeError.js';

const router = Router();

// ── Infrastructure Overview ──
router.get('/status', async (req, res) => {
  res.json({
    timestamp: new Date().toISOString(),
    pid: process.pid,
    instance: process.env.NODE_APP_INSTANCE || '0',

    cache: getDistributedCacheStats(),
    jobs: getJobStatus(),
    logs: getLogStats(),

    architecture: {
      cache_backend: 'In-Memory (per-instance)',
      job_backend: 'node-cron (per-instance)',
      log_backend: 'Local Buffer (per-instance)',
      cluster_safe: false,
    },
  });
});

// ── Cache Stats ──
router.get('/cache', (req, res) => {
  res.json(getDistributedCacheStats());
});

// ── Job Queue Status ──
router.get('/jobs', (req, res) => {
  res.json(getJobStatus());
});

// ── Manual Job Trigger ──
router.post('/jobs/:name/trigger', validateParams(triggerJobParams), async (req, res) => {
  try {
    const result = await triggerJob(req.params.name, req.body || {});
    res.json({ status: 'ok', ...result });
  } catch (err) {
    safeError(res, err, 'Infra', 400);
  }
});

// ── Centralized Logs Query ──
router.get('/logs', (req, res) => {
  const { level = 'info', search = '', limit = 100, since } = req.query;
  res.json({
    stats: getLogStats(),
    logs: queryLogs({ level, search, limit: Number(limit), since }),
  });
});

// ── Log Stats ──
router.get('/logs/stats', (req, res) => {
  res.json(getLogStats());
});

export default router;
