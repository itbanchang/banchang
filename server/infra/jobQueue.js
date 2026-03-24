// ============================================================
// BCH 360° Intelligence V.10 — Job Queue (BullMQ)
// Distributed job scheduling — cluster-safe
// Falls back to node-cron if Redis unavailable
// ============================================================
import { Queue, Worker } from 'bullmq';
import cron from 'node-cron';
import { getRedisClient, isRedisConnected } from './redisClient.js';
import logger from '../logger.js';

// ── State ──
const _queues = {};
const _workers = {};
const _cronJobs = {};  // fallback cron jobs
const _jobHistory = []; // last 100 job executions
const MAX_HISTORY = 100;

// ── Job Registry ──
const JOB_REGISTRY = {};

/**
 * Register a job type with its handler function
 * @param {string} name - Job name (e.g., 'occupancy_sync')
 * @param {Function} handler - async (data) => result
 * @param {object} opts - { cron: '* /30 * * * *', description: '...' }
 */
export function registerJob(name, handler, opts = {}) {
  JOB_REGISTRY[name] = { handler, ...opts };
  logger.info(`[JobQueue] Registered: ${name}`, { cron: opts.cron || 'manual', description: opts.description || '' });
}

/**
 * Start all registered jobs.
 * If Redis is available → BullMQ (distributed, deduped across PM2 workers)
 * If Redis unavailable → node-cron (per-process, simple)
 */
export async function startAllJobs() {
  const useRedis = isRedisConnected();
  const mode = useRedis ? 'BullMQ (Redis)' : 'node-cron (in-memory)';
  logger.info(`[JobQueue] Starting all jobs in ${mode} mode`);

  for (const [name, job] of Object.entries(JOB_REGISTRY)) {
    try {
      if (useRedis) {
        await _startBullMQJob(name, job);
      } else {
        _startCronJob(name, job);
      }
    } catch (err) {
      logger.error(`[JobQueue] Failed to start job: ${name}`, { error: err.message });
      // Try cron fallback
      if (useRedis) {
        logger.warn(`[JobQueue] Falling back to cron for: ${name}`);
        _startCronJob(name, job);
      }
    }
  }

  return { mode, jobs: Object.keys(JOB_REGISTRY).length };
}

// ── BullMQ Implementation ──
async function _startBullMQJob(name, job) {
  const redis = getRedisClient();
  if (!redis) throw new Error('Redis not available');

  const connection = { host: redis.options.host, port: redis.options.port, db: redis.options.db };

  // Create queue
  const queue = new Queue(name, {
    connection,
    prefix: 'bch360:jobs',
    defaultJobOptions: {
      removeOnComplete: { count: 50 },   // keep last 50 completed
      removeOnFail: { count: 20 },       // keep last 20 failed
      attempts: 2,
      backoff: { type: 'exponential', delay: 5000 },
    },
  });
  _queues[name] = queue;

  // Create worker
  const worker = new Worker(name, async (bullJob) => {
    const start = Date.now();
    try {
      const result = await job.handler(bullJob.data || {});
      _recordHistory(name, 'completed', Date.now() - start, null);
      return result;
    } catch (err) {
      _recordHistory(name, 'failed', Date.now() - start, err.message);
      throw err;
    }
  }, {
    connection,
    prefix: 'bch360:jobs',
    concurrency: 1,             // one at a time per job type
    limiter: { max: 1, duration: 10000 },  // max 1 per 10s
  });

  worker.on('failed', (bullJob, err) => {
    logger.error(`[JobQueue] ${name} failed`, { error: err.message, attempt: bullJob?.attemptsMade });
  });

  _workers[name] = worker;

  // Schedule repeatable job if cron pattern specified
  if (job.cron) {
    await queue.add(name, {}, {
      repeat: { pattern: job.cron },
      jobId: `${name}_repeat`,
    });
    logger.info(`[JobQueue] BullMQ scheduled: ${name} (${job.cron})`);
  }

  // Run immediately on start
  if (job.runOnStart) {
    await queue.add(`${name}_init`, {}, { jobId: `${name}_init_${Date.now()}` });
  }
}

// ── Cron Fallback ──
function _startCronJob(name, job) {
  if (!job.cron) {
    // No schedule — just run once if runOnStart
    if (job.runOnStart) {
      setTimeout(() => {
        job.handler({}).catch(err => logger.error(`[JobQueue] ${name} init failed`, { error: err.message }));
      }, 5000);
    }
    return;
  }

  const cronJob = cron.schedule(job.cron, async () => {
    const start = Date.now();
    try {
      await job.handler({});
      _recordHistory(name, 'completed', Date.now() - start, null);
    } catch (err) {
      _recordHistory(name, 'failed', Date.now() - start, err.message);
      logger.error(`[JobQueue] ${name} cron failed`, { error: err.message });
    }
  }, { scheduled: true });

  _cronJobs[name] = cronJob;
  logger.info(`[JobQueue] Cron scheduled: ${name} (${job.cron})`);

  // Run immediately if requested
  if (job.runOnStart) {
    setTimeout(() => {
      const start = Date.now();
      job.handler({}).then(() => {
        _recordHistory(name, 'completed', Date.now() - start, null);
      }).catch(err => {
        _recordHistory(name, 'failed', Date.now() - start, err.message);
      });
    }, 3000);
  }
}

function _recordHistory(name, status, durationMs, error) {
  _jobHistory.push({
    job: name,
    status,
    duration_ms: durationMs,
    error,
    timestamp: new Date().toISOString(),
  });
  if (_jobHistory.length > MAX_HISTORY) _jobHistory.shift();
}

/**
 * Manually trigger a job
 */
export async function triggerJob(name, data = {}) {
  const job = JOB_REGISTRY[name];
  if (!job) throw new Error(`Unknown job: ${name}`);

  if (_queues[name]) {
    // BullMQ mode
    await _queues[name].add(`${name}_manual`, data, { jobId: `${name}_manual_${Date.now()}` });
    return { mode: 'bullmq', queued: true };
  }

  // Direct execution
  const start = Date.now();
  const result = await job.handler(data);
  _recordHistory(name, 'completed', Date.now() - start, null);
  return { mode: 'direct', result };
}

/**
 * Get job queue status
 */
export function getJobStatus() {
  return {
    mode: isRedisConnected() ? 'bullmq' : 'cron',
    registered_jobs: Object.keys(JOB_REGISTRY).map(name => ({
      name,
      description: JOB_REGISTRY[name].description || '',
      cron: JOB_REGISTRY[name].cron || null,
      run_on_start: JOB_REGISTRY[name].runOnStart || false,
    })),
    recent_executions: _jobHistory.slice(-20).reverse(),
    total_completed: _jobHistory.filter(h => h.status === 'completed').length,
    total_failed: _jobHistory.filter(h => h.status === 'failed').length,
  };
}

/**
 * Graceful shutdown
 */
export async function stopAllJobs() {
  for (const [name, worker] of Object.entries(_workers)) {
    try { await worker.close(); } catch { /* ignore */ }
  }
  for (const [name, queue] of Object.entries(_queues)) {
    try { await queue.close(); } catch { /* ignore */ }
  }
  for (const [name, cronJob] of Object.entries(_cronJobs)) {
    try { cronJob.stop(); } catch { /* ignore */ }
  }
  logger.info('[JobQueue] All jobs stopped');
}

export default { registerJob, startAllJobs, triggerJob, getJobStatus, stopAllJobs };
