/**
 * Comprehensive health check for production monitoring
 */
import { isRedisConnected, getRedisClient } from '../infra/redisClient.js';
import os from 'os';

export async function getHealthStatus(pool) {
  const checks = {
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '10.0.0',
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    checks: {}
  };

  // Database check
  try {
    const start = Date.now();
    await pool.query('SELECT 1');
    checks.checks.database = { status: 'up', latency_ms: Date.now() - start };
  } catch (e) {
    checks.checks.database = { status: 'down', error: e.message };
    checks.status = 'degraded';
  }

  // Redis check — actually ping the server
  if (isRedisConnected()) {
    try {
      const redis = getRedisClient();
      const start = Date.now();
      await redis.ping();
      checks.checks.redis = { status: 'up', latency_ms: Date.now() - start };
    } catch (e) {
      checks.checks.redis = { status: 'degraded', error: e.message };
    }
  } else {
    checks.checks.redis = { status: 'unavailable', fallback: 'in-memory' };
  }

  // Disk check — free memory as proxy for system health
  const freeMem = os.freemem();
  const totalMem = os.totalmem();
  const freeMemPct = Math.round((freeMem / totalMem) * 100);
  checks.checks.disk = {
    status: freeMemPct < 5 ? 'warning' : 'up',
    free_system_memory_pct: freeMemPct,
  };

  // Memory check — Node.js heap
  const used = checks.memory.heapUsed / checks.memory.heapTotal;
  if (used > 0.9) {
    checks.checks.memory = { status: 'warning', usage: Math.round(used * 100) + '%' };
    checks.status = 'degraded';
  } else {
    checks.checks.memory = { status: 'up', usage: Math.round(used * 100) + '%' };
  }

  return checks;
}
