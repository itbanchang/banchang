// ============================================================
// BCH 360° Intelligence V.10 — CSRF Protection Middleware
// Double-Submit Cookie Pattern (stateless, no session needed)
// ============================================================
import crypto from 'crypto';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const CSRF_COOKIE = 'csrf_token';
const CSRF_HEADER = 'x-csrf-token';

/**
 * Issue a CSRF token cookie on every response if not already set.
 * The client reads the cookie and sends it back via the X-CSRF-Token header.
 * Since httpOnly is false, JS can read it — but cross-origin JS cannot
 * because the cookie has SameSite=strict.
 */
export function csrfCookie(req, res, next) {
  if (!req.cookies[CSRF_COOKIE]) {
    const token = crypto.randomBytes(32).toString('hex');
    res.cookie(CSRF_COOKIE, token, {
      httpOnly: false,   // Must be readable by frontend JS
      secure: IS_PRODUCTION,
      sameSite: IS_PRODUCTION ? 'strict' : 'lax',
      path: '/',
      maxAge: 24 * 60 * 60 * 1000, // 24h
    });
  }
  next();
}

/**
 * Paths exempt from CSRF check — used for endpoints that anonymous,
 * cross-origin or non-browser clients legitimately POST to.
 */
const CSRF_EXEMPT_PREFIXES = [
  '/api/auth/',              // login + token refresh
  '/api/satisfaction/submit', // public patient survey (Phase E Tier 3)
];

/**
 * Validate CSRF token on state-changing requests (POST/PUT/PATCH/DELETE).
 * Skips GET/HEAD/OPTIONS and whitelisted paths.
 */
export function csrfProtect(req, res, next) {
  const safeMethods = ['GET', 'HEAD', 'OPTIONS'];
  if (safeMethods.includes(req.method)) return next();

  // Skip whitelisted paths (use req.originalUrl since middleware may be mounted on /api)
  if (CSRF_EXEMPT_PREFIXES.some(p => req.originalUrl.startsWith(p))) return next();

  const cookieToken = req.cookies[CSRF_COOKIE];
  const headerToken = req.headers[CSRF_HEADER];

  if (!cookieToken || !headerToken || cookieToken !== headerToken) {
    return res.status(403).json({
      error: 'CSRF token invalid',
      message: 'Missing or mismatched CSRF token. Please refresh and try again.',
    });
  }

  next();
}
