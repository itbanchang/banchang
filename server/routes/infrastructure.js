// ============================================================
// BCH 360° Intelligence V.10 — Infrastructure Status API
// Redis, Cache, Job Queue, Centralized Logging
// ============================================================
import { Router } from 'express';
import { isRedisConnected, getRedisClient } from '../infra/redisClient.js';
import { getDistributedCacheStats } from '../infra/distributedCache.js';
import { getJobStatus, triggerJob } from '../infra/jobQueue.js';
import { queryLogs, getLogStats } from '../infra/centralLog.js';

const router = Router();

// ── Infrastructure Overview ──
router.get('/status', async (req, res) => {
  const redisConnected = isRedisConnected();
  let redisInfo = null;

  if (redisConnected) {
    try {
      const redis = getRedisClient();
      const info = await redis.info('memory');
      const usedMemMatch = info.match(/used_memory_human:(.+)/);
      const keysInfo = await redis.dbsize();
      redisInfo = {
        connected: true,
        memory: usedMemMatch?.[1]?.trim() || 'unknown',
        keys: keysInfo,
      };
    } catch { redisInfo = { connected: true, error: 'info unavailable' }; }
  }

  res.json({
    timestamp: new Date().toISOString(),
    pid: process.pid,
    instance: process.env.NODE_APP_INSTANCE || '0',

    redis: redisInfo || { connected: false, mode: 'in-memory fallback' },
    cache: getDistributedCacheStats(),
    jobs: getJobStatus(),
    logs: getLogStats(),

    architecture: {
      cache_backend: redisConnected ? 'Redis (distributed)' : 'In-Memory (per-instance)',
      job_backend: redisConnected ? 'BullMQ (distributed)' : 'node-cron (per-instance)',
      log_backend: redisConnected ? 'Redis Pub/Sub (centralized)' : 'Local Buffer (per-instance)',
      cluster_safe: redisConnected,
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
router.post('/jobs/:name/trigger', async (req, res) => {
  try {
    const result = await triggerJob(req.params.name, req.body || {});
    res.json({ status: 'ok', ...result });
  } catch (err) {
    res.status(400).json({ error: err.message });
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
