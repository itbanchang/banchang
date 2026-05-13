// ============================================================
// BCH 360° Intelligence V.10 — Token Blacklist
// ------------------------------------------------------------
// Thin wrapper over the shared Redis client that tracks revoked
// JWT IDs (`jti`) so logout and refresh-rotation can invalidate
// previously issued tokens before their natural expiry.
//
// Design:
//   • Key:   `revoked:<jti>`  (prefix `bch360:` is added automatically
//     by redisClient's keyPrefix — full Redis key ends up as
//     `bch360:revoked:<jti>`).
//   • Value: `"1"` (presence is what matters).
//   • TTL:   remaining lifetime of the token in seconds, so revoked
//     entries evict themselves once the token would have expired
//     anyway.  Never store jti past its exp — prevents unbounded growth.
//
// Fallback: if Redis is unavailable, revoke() is a no-op and
// isRevoked() returns false.  Document this tradeoff with the user:
// without Redis, logout does not invalidate existing sessions.
// ============================================================
import { getRedisClient, isRedisConnected } from './redisClient.js';
import logger from '../logger.js';

const KEY_PREFIX = 'revoked:';

function secondsUntil(expUnixSeconds) {
    const now = Math.floor(Date.now() / 1000);
    const diff = Math.floor(expUnixSeconds) - now;
    return diff > 0 ? diff : 0;
}

/**
 * Mark a JWT as revoked until its natural expiry.
 * @param {string} jti  unique token id (from jwt.sign({ jwtid }))
 * @param {number} exp  token's `exp` claim in unix seconds
 */
export async function revokeToken(jti, exp) {
    if (!jti || !exp) return;
    const client = getRedisClient();
    if (!client || !isRedisConnected()) {
        logger.debug('[TokenBlacklist] Redis unavailable — revoke() no-op', { jti });
        return;
    }
    const ttl = secondsUntil(exp);
    if (ttl === 0) return;  // already expired
    try {
        await client.set(KEY_PREFIX + jti, '1', 'EX', ttl);
    } catch (err) {
        logger.warn('[TokenBlacklist] revoke failed', { jti, error: err.message });
    }
}

/**
 * Returns true only when the jti is definitively revoked.
 * Returns false on Redis errors / outages (fail-open by design so the
 * auth layer doesn't lock everyone out during an infra incident).
 */
export async function isRevoked(jti) {
    if (!jti) return false;
    const client = getRedisClient();
    if (!client || !isRedisConnected()) return false;
    try {
        const hit = await client.get(KEY_PREFIX + jti);
        return hit === '1';
    } catch (err) {
        logger.warn('[TokenBlacklist] isRevoked lookup failed', { jti, error: err.message });
        return false;
    }
}

export default { revokeToken, isRevoked };
