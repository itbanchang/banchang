// ============================================================
// BCH 360° Intelligence V.10 — Redis Client
// Shared connection for Cache, Queue, PubSub
// Graceful fallback: if Redis unavailable → in-memory mode
// ============================================================
import Redis from 'ioredis';
import logger from '../logger.js';

// ── Configuration ──
const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';
const REDIS_PREFIX = process.env.REDIS_PREFIX || 'bch360:';
const REDIS_DB = Number(process.env.REDIS_DB || 0);

// ── State ──
let client = null;
let isConnected = false;
let connectAttempts = 0;
const MAX_CONNECT_ATTEMPTS = 3;

/**
 * Create or return the Redis client singleton.
 * If Redis is unavailable, returns null (caller must handle fallback).
 */
export function getRedisClient() {
  if (client) return isConnected ? client : null;

  try {
    client = new Redis(REDIS_URL, {
      db: REDIS_DB,
      keyPrefix: REDIS_PREFIX,
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        if (times > MAX_CONNECT_ATTEMPTS) {
          logger.warn('[Redis] Max connect attempts reached — running in memory-only mode');
          return null; // Stop retrying
        }
        return Math.min(times * 500, 3000);
      },
      lazyConnect: true,        // Don't connect until first command
      enableReadyCheck: true,
      connectTimeout: 5000,
    });

    client.on('connect', () => {
      isConnected = true;
      connectAttempts = 0;
      logger.info('[Redis] Connected', { url: REDIS_URL.replace(/\/\/.*@/, '//***@'), db: REDIS_DB });
    });

    client.on('error', (err) => {
      connectAttempts++;
      if (connectAttempts <= 2) {
        logger.warn('[Redis] Connection error (will retry)', { error: err.message });
      }
      isConnected = false;
    });

    client.on('close', () => {
      isConnected = false;
    });

    client.on('reconnecting', () => {
      logger.info('[Redis] Reconnecting...');
    });

    // Try to connect (non-blocking)
    client.connect().catch(() => {
      logger.warn('[Redis] Initial connection failed — using in-memory fallback');
    });

    return isConnected ? client : null;
  } catch (err) {
    logger.warn('[Redis] Failed to create client', { error: err.message });
    return null;
  }
}

/**
 * Check if Redis is available
 */
export function isRedisConnected() {
  return isConnected && client !== null;
}

/**
 * Get a duplicate client for pub/sub (ioredis requires separate connection)
 */
export function getRedisSubscriber() {
  if (!client || !isConnected) return null;
  try {
    return client.duplicate();
  } catch {
    return null;
  }
}

/**
 * Graceful shutdown
 */
export async function closeRedis() {
  if (client) {
    try {
      await client.quit();
    } catch { /* ignore */ }
    client = null;
    isConnected = false;
  }
}

export default { getRedisClient, isRedisConnected, getRedisSubscriber, closeRedis, REDIS_PREFIX };
