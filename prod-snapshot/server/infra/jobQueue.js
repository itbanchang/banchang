// ============================================================
// BCH 360° Intelligence V.10 — Job Queue (node-cron)
// Lightweight job scheduling — no Redis dependency
// ============================================================
import cron from 'node-cron';
import logger from '../logger.js';

// ── State ──
const _cronJobs = {};
const _jobHistory = [];
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
 * Start all registered jobs using node-cron.
 */
export async function startAllJobs() {
  logger.info('[JobQueue] Starting all jobs in node-cron mode');

  for (const [name, job] of Object.entries(JOB_REGISTRY)) {
    try {
      _startCronJob(name, job);
    } catch (err) {
      logger.error(`[JobQueue] Failed to start job: ${name}`, { error: err.message });
    }
  }

  return { mode: 'node-cron', jobs: Object.keys(JOB_REGISTRY).length };
}

// ── Cron Implementation ──
function _startCronJob(name, job) {
  if (!job.cron) {
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
    mode: 'cron',
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
  for (const [name, cronJob] of Object.entries(_cronJobs)) {
    try { cronJob.stop(); } catch { /* ignore */ }
  }
  logger.info('[JobQueue] All jobs stopped');
}

export default { registerJob, startAllJobs, triggerJob, getJobStatus, stopAllJobs };
