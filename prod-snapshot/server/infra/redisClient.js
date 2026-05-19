// ============================================================
// BCH 360° Intelligence V.10 — Cache Client (In-Memory Only)
// Redis removed — all callers get null, triggering in-memory fallback
// ============================================================

export const REDIS_PREFIX = 'bch360:';
export function getRedisClient() { return null; }
export function isRedisConnected() { return false; }
export function getRedisSubscriber() { return null; }
export async function closeRedis() {}

export default { getRedisClient, isRedisConnected, getRedisSubscriber, closeRedis, REDIS_PREFIX };
