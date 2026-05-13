// ============================================================
// BCH 360° Intelligence V.10 — CSRF (Double-Submit Cookie)
// ------------------------------------------------------------
// sameSite=strict on the JWT cookie already blocks most CSRF in
// modern browsers.  This middleware layers a second check so a
// compromised browser extension, a relaxed sameSite fallback, or a
// legacy client still needs to explicitly echo the CSRF cookie
// value in a header it cannot read cross-origin.
//
// Flow:
//   1. Login / refresh endpoints issue a `csrfToken` cookie
//      (non-httpOnly, sameSite=strict, secure in prod) alongside
//      the JWT cookies.
//   2. On mutating requests (POST/PUT/DELETE/PATCH) to /api/*,
//      this middleware compares the header `X-CSRF-Token` against
//      the cookie value and rejects mismatches with 403.
//   3. GET/HEAD/OPTIONS skip validation (no state change).
//   4. /api/auth/* skips validation so login / refresh / logout
//      can bootstrap the cookie without chicken-and-egg problems.
//
// Disable with `CSRF_DISABLED=true` in .env — e.g. while rolling
// out the frontend header changes.
// ============================================================
import { randomBytes, timingSafeEqual } from 'crypto';

const DISABLED =
  process.env.CSRF_DISABLED === 'true' ||
  process.env.DISABLE_AUTH === 'true' ||
  process.env.NO_AUTH === 'true';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const CSRF_COOKIE_NAME = 'csrfToken';
const CSRF_HEADER_NAME = 'x-csrf-token';
// /api/auth/* — login + token refresh bootstrap the cookie.
// /api/satisfaction/submit — public anonymous patient survey (Phase E Tier 3, no session).
const EXEMPT_PATH = /^\/api\/(auth\/|satisfaction\/submit$)/;
const MUTATING_METHODS = new Set(['POST', 'PUT', 'DELETE', 'PATCH']);

export function generateCsrfToken() {
    return randomBytes(32).toString('hex');
}

/**
 * Cookie options for the CSRF token. NOT httpOnly — the client must
 * read the cookie from JS to echo it back as a header. sameSite=strict
 * still prevents cross-site JS from reading it.
 */
export const CSRF_COOKIE_OPTIONS = {
    httpOnly: false,
    secure: IS_PRODUCTION,
    sameSite: IS_PRODUCTION ? 'strict' : 'lax',
    path: '/',
};

function safeEqual(a, b) {
    if (!a || !b || a.length !== b.length) return false;
    try {
        return timingSafeEqual(Buffer.from(a, 'utf8'), Buffer.from(b, 'utf8'));
    } catch {
        return false;
    }
}

/**
 * Validate CSRF header vs cookie on mutating requests.
 * Wire in as app-level middleware AFTER cookieParser and AFTER authenticate.
 */
export function verifyCsrf(req, res, next) {
    if (DISABLED) return next();
    if (!MUTATING_METHODS.has(req.method)) return next();
    if (EXEMPT_PATH.test(req.path)) return next();

    const cookieToken = req.cookies?.[CSRF_COOKIE_NAME];
    const headerToken = req.headers[CSRF_HEADER_NAME];

    if (!cookieToken || !headerToken || !safeEqual(cookieToken, headerToken)) {
        return res.status(403).json({
            error: 'CSRF validation failed',
            message: 'Missing or mismatched CSRF token. Reload the page and try again.',
            statusCode: 403,
        });
    }
    return next();
}

export default { generateCsrfToken, CSRF_COOKIE_NAME, CSRF_COOKIE_OPTIONS, verifyCsrf };
