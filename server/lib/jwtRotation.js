// ============================================================
// JWT refresh-token rotation helper
// Use from auth routes to rotate refresh tokens on every use,
// which turns them into one-time-use and detects replay.
// ============================================================
import jwt from 'jsonwebtoken';
import { randomBytes } from 'node:crypto';

const REFRESH_TTL = process.env.REFRESH_TTL || '24h';
const ACCESS_TTL  = process.env.ACCESS_TTL  || '15m';

/**
 * Issue a new access + refresh pair.
 * Each refresh has a unique jti so old ones can be revoked.
 */
export function issuePair(user) {
    const jti = randomBytes(12).toString('hex');
    const access = jwt.sign(
        { sub: user.id, role: user.role, type: 'access' },
        process.env.JWT_SECRET,
        { expiresIn: ACCESS_TTL }
    );
    const refresh = jwt.sign(
        { sub: user.id, jti, type: 'refresh' },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: REFRESH_TTL }
    );
    return { access, refresh, jti };
}

/**
 * Rotate a presented refresh token for a new pair.
 * Caller must:
 *   1. Verify the presented refresh token is not in the revoked set (persist jti)
 *   2. After calling this, add the OLD jti to the revoked set.
 * If a revoked jti is ever presented again, treat as a replay attack:
 *   revoke ALL tokens for that user and force re-login.
 */
export function rotate(oldRefresh, user) {
    const payload = jwt.verify(oldRefresh, process.env.REFRESH_TOKEN_SECRET);
    if (payload.type !== 'refresh') throw new Error('not a refresh token');
    if (String(payload.sub) !== String(user.id)) throw new Error('user mismatch');
    const pair = issuePair(user);
    return { ...pair, oldJti: payload.jti };
}

/**
 * Cookie options for refresh token. Use with res.cookie().
 */
export function refreshCookieOptions() {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: ttlToMs(REFRESH_TTL),
        path: '/api/auth',
    };
}

function ttlToMs(ttl) {
    if (typeof ttl === 'number') return ttl * 1000;
    const m = /^(\d+)([smhd])$/.exec(String(ttl));
    if (!m) return 24 * 60 * 60 * 1000;
    const n = Number(m[1]);
    return n * ({ s: 1e3, m: 6e4, h: 36e5, d: 864e5 }[m[2]]);
}
