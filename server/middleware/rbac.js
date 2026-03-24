// ============================================================
// BCH 360° Intelligence V.10 - RBAC Middleware
// ============================================================
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
const DISABLE_AUTH =
  process.env.DISABLE_AUTH === 'true' ||
  process.env.NO_AUTH === 'true' ||
  process.env.NODE_ENV !== 'production';

if (!JWT_SECRET && !DISABLE_AUTH) {
  console.error('❌ FATAL: JWT_SECRET ไม่ได้ตั้งค่าใน .env — กรุณาเพิ่ม JWT_SECRET ก่อนเริ่มระบบ');
  process.exit(1);
}

const ROLE_PERMISSIONS = {
  director: {
    modules: [
      'finance',
      'ipd',
      'opd',
      'clinical',
      'er',
      'dental',
      'thaimed',
      'phystherapy',
      'ncd',
      'medrec',
      'xray',
      'pharmacy',
      'lab',
      'quality',
      'ai',
      'admin',
      'audit',
      'system',
    ],
    description: 'ผู้อำนวยการ',
  },
  finance: {
    modules: ['finance', 'medrec', 'pharmacy'],
    description: 'ฝ่ายการเงิน',
  },
  clinical: {
    modules: [
      'ipd',
      'opd',
      'clinical',
      'er',
      'dental',
      'thaimed',
      'phystherapy',
      'ncd',
      'xray',
      'pharmacy',
      'lab',
      'quality',
      'ai',
    ],
    description: 'แพทย์/เภสัชกร',
  },
  nursing: {
    modules: ['ipd', 'opd', 'clinical', 'er', 'ncd', 'quality'],
    description: 'พยาบาล',
  },
  medrec: {
    modules: ['medrec', 'opd', 'ipd'],
    description: 'เวชระเบียน',
  },
  admin: {
    modules: [
      'finance',
      'ipd',
      'opd',
      'clinical',
      'er',
      'dental',
      'thaimed',
      'phystherapy',
      'ncd',
      'medrec',
      'xray',
      'pharmacy',
      'lab',
      'quality',
      'ai',
      'admin',
      'audit',
      'system',
    ],
    description: 'ผู้ดูแลระบบ',
  },
};

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
if (!REFRESH_TOKEN_SECRET) {
  console.error(
    '❌ WARNING: REFRESH_TOKEN_SECRET not set. Using JWT_SECRET as fallback (less secure)'
  );
}

export function generateToken(user, isRefresh = false) {
  const secret = isRefresh ? REFRESH_TOKEN_SECRET || JWT_SECRET : JWT_SECRET;
  const expiresIn = isRefresh ? '24h' : '30m'; // Access: 30min, Refresh: 24h
  return jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
      full_name: user.full_name,
      type: isRefresh ? 'refresh' : 'access',
    },
    secret,
    { expiresIn }
  );
}

export function authenticate(req, res, next) {
  // Bypass authentication for demo/dev mode
  if (DISABLE_AUTH) {
    req.user = { id: 'dev', username: 'admin', role: 'admin', full_name: 'Administrator' };
    return next();
  }

  // Priority 1: httpOnly cookie (browser clients — XSS-safe)
  // Priority 2: Bearer header (API clients / mobile)
  const cookieToken = req.cookies?.accessToken;
  const bearerToken = req.headers.authorization?.startsWith('Bearer ')
    ? req.headers.authorization.split(' ')[1]
    : null;
  const token = cookieToken || bearerToken;

  if (!token) {
    return res.status(401).json({
      error: 'Authentication required',
      message: 'Missing or invalid JWT token. Please login first.',
      statusCode: 401,
    });
  }
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.type === 'refresh') {
      return res.status(401).json({
        error: 'Token ไม่ถูกต้อง',
        message: 'Refresh token cannot be used for authentication',
        statusCode: 401,
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: 'Token ไม่ถูกต้อง',
      message: 'JWT token is invalid or expired',
      statusCode: 401,
    });
  }
}

export function authorize(module) {
  // If auth is disabled, allow all access (demo mode)
  if (DISABLE_AUTH) {
    return (req, res, next) => next();
  }

  return (req, res, next) => {
    const perms = ROLE_PERMISSIONS[req.user?.role];
    if (!perms || !perms.modules.includes(module)) {
      return res.status(403).json({ error: `ไม่มีสิทธิ์เข้าถึงโมดูล "${module}"` });
    }
    next();
  };
}

export function getPermissions(role) {
  return ROLE_PERMISSIONS[role] || { modules: [] };
}
export default { generateToken, authenticate, authorize, getPermissions, ROLE_PERMISSIONS };
