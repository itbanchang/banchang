// ============================================================
// BCH 360° Intelligence V.10 - Auth Routes (Secure)
// 🔐 Phase 2: bcrypt + JWT + httpOnly cookies + SQLite user store
// ============================================================
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import rateLimit, { ipKeyGenerator } from 'express-rate-limit';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { generateToken, authenticate } from '../middleware/rbac.js';
import { findByUsername, findById, updateLastLogin } from '../db/userStore.js';
import { validate } from '../middleware/validate.js';
import logger from '../logger.js';

const router = Router();

// ── Cookie config ──
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const COOKIE_BASE = {
  httpOnly: true,                                    // Not accessible via JavaScript (XSS protection)
  secure:   IS_PRODUCTION,                          // HTTPS only in production
  sameSite: IS_PRODUCTION ? 'strict' : 'lax',      // CSRF protection
  path:     '/'
};

// ── Rate Limiters ──
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 5,                     // 5 attempts per IP
  message: { error: '⚠️ Too many login attempts. Please try again in 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: ipKeyGenerator
});

const refreshLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 minutes
  max: 30,                    // 30 refresh requests per IP (covers normal usage)
  message: { error: '⚠️ Too many refresh requests. Please login again.' },
  standardHeaders: true,
  legacyHeaders: false,
  keyGenerator: ipKeyGenerator
});

// ── Login Validation Schema ──
const loginSchema = z.object({
  username: z.string().min(3).max(50),
  password: z.string().min(6).max(128)
});

// ── POST /api/auth/login ──
router.post('/login', loginLimiter, validate(loginSchema), async (req, res) => {
  const { username, password } = req.body;

  // Find user from SQLite (persistent, survives restarts)
  const user = findByUsername(username);
  if (!user) {
    // Constant-time comparison even for missing users (prevent username enumeration)
    await bcrypt.compare(password, '$2a$10$dummy.hash.for.timing.attack.prevention.xxxxx');
    return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
  }

  const isValid = await bcrypt.compare(password, user.password_hash);
  if (!isValid) {
    return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
  }

  const accessToken  = generateToken(user, false);  // 30 min
  const refreshToken = generateToken(user, true);   // 24 h

  // Set httpOnly cookies — tokens never touch JavaScript
  res.cookie('accessToken',  accessToken,  { ...COOKIE_BASE, maxAge: 30 * 60 * 1000        });
  res.cookie('refreshToken', refreshToken, { ...COOKIE_BASE, maxAge: 24 * 60 * 60 * 1000   });

  updateLastLogin(user.id);
  logger.info('User login successful', { username: user.username, role: user.role });

  // Return only user info — tokens are in httpOnly cookies
  res.json({
    user: {
      id:         user.id,
      username:   user.username,
      full_name:  user.full_name,
      role:       user.role,
      department: user.department
    }
  });
});

// ── POST /api/auth/refresh — Get new access token using refresh cookie ──
router.post('/refresh', refreshLimiter, (req, res) => {
  try {
    // Read refreshToken from httpOnly cookie (not from body)
    const refreshToken = req.cookies?.refreshToken;
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token not found. Please login again.' });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET);
    if (decoded.type !== 'refresh') {
      return res.status(401).json({ error: 'Invalid token type' });
    }

    // Handle auto-session (dashboard-viewer) users
    let user;
    if (decoded.id === 'dashboard-viewer') {
      user = { id: 'dashboard-viewer', username: 'admin', role: 'admin', full_name: 'Dashboard Viewer' };
    } else {
      // Verify user still exists and is active
      user = findById(decoded.id);
      if (!user) {
        res.clearCookie('accessToken',  COOKIE_BASE);
        res.clearCookie('refreshToken', COOKIE_BASE);
        return res.status(401).json({ error: 'User not found. Please login again.' });
      }
    }

    // Issue new access token and rotate it into cookie
    const newAccessToken = generateToken(user, false);
    res.cookie('accessToken', newAccessToken, { ...COOKIE_BASE, maxAge: 30 * 60 * 1000 });

    logger.info('Token refreshed', { username: user.username });
    res.json({ ok: true, expiresIn: '30m' });
  } catch (error) {
    // Invalid or expired refresh token — clear cookies and force re-login
    res.clearCookie('accessToken',  COOKIE_BASE);
    res.clearCookie('refreshToken', COOKIE_BASE);
    logger.warn('Token refresh failed', { error: error.message });
    return res.status(401).json({ error: 'Session expired. Please login again.' });
  }
});

// ── POST /api/auth/auto-session — Issue dashboard-viewer cookies without password ──
// Used when frontend bypassAuth is enabled (kiosk / wall display mode)
router.post('/auto-session', (req, res) => {
  const dashboardUser = {
    id: 'dashboard-viewer',
    username: 'admin',
    role: 'admin',
    full_name: 'Dashboard Viewer',
  };

  const accessToken  = generateToken(dashboardUser, false);  // 30 min
  const refreshToken = generateToken(dashboardUser, true);   // 24 h

  res.cookie('accessToken',  accessToken,  { ...COOKIE_BASE, maxAge: 30 * 60 * 1000        });
  res.cookie('refreshToken', refreshToken, { ...COOKIE_BASE, maxAge: 24 * 60 * 60 * 1000   });

  logger.info('Auto-session issued for dashboard viewer');
  res.json({
    user: {
      id:         dashboardUser.id,
      username:   dashboardUser.username,
      full_name:  dashboardUser.full_name,
      role:       dashboardUser.role,
    }
  });
});

// ── POST /api/auth/logout ──
router.post('/logout', (req, res) => {
  res.clearCookie('accessToken',  { ...COOKIE_BASE, maxAge: 0 });
  res.clearCookie('refreshToken', { ...COOKIE_BASE, maxAge: 0 });
  logger.info('User logged out', { username: req.user?.username || 'unknown' });
  res.json({ ok: true });
});

// ── GET /api/auth/me — Get current user from cookie ──
router.get('/me', authenticate, (req, res) => {
  res.json({ user: req.user || null });
});

export default router;
