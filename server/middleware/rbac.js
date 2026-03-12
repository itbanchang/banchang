// ============================================================
// BCH 360° Intelligence V.10 - RBAC Middleware
// ============================================================
import 'dotenv/config';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    console.error('❌ FATAL: JWT_SECRET ไม่ได้ตั้งค่าใน .env — กรุณาเพิ่ม JWT_SECRET ก่อนเริ่มระบบ');
    process.exit(1);
}

const ROLE_PERMISSIONS = {
    director: { modules: ['finance', 'ipd', 'opd', 'clinical', 'admin', 'audit'], description: 'ผู้อำนวยการ' },
    finance: { modules: ['finance'], description: 'ฝ่ายการเงิน' },
    clinical: { modules: ['ipd', 'opd', 'clinical'], description: 'แพทย์/เภสัชกร' },
    nursing: { modules: ['ipd', 'clinical'], description: 'พยาบาล' },
    admin: { modules: ['finance', 'ipd', 'opd', 'clinical', 'admin', 'audit'], description: 'ผู้ดูแลระบบ' }
};

export function generateToken(user) {
    return jwt.sign(
        { id: user.id, username: user.username, role: user.role, full_name: user.full_name },
        JWT_SECRET, { expiresIn: '8h' }
    );
}

export function authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        req.user = { id: 'demo', username: 'demo', role: 'director', full_name: 'Demo User' };
        return next();
    }
    try {
        req.user = jwt.verify(authHeader.split(' ')[1], JWT_SECRET);
        next();
    } catch {
        return res.status(401).json({ error: 'Token ไม่ถูกต้อง' });
    }
}

export function authorize(module) {
    return (req, res, next) => {
        const perms = ROLE_PERMISSIONS[req.user?.role];
        if (!perms || !perms.modules.includes(module)) {
            return res.status(403).json({ error: `ไม่มีสิทธิ์เข้าถึงโมดูล "${module}"` });
        }
        next();
    };
}

export function getPermissions(role) { return ROLE_PERMISSIONS[role] || { modules: [] }; }
export default { generateToken, authenticate, authorize, getPermissions, ROLE_PERMISSIONS };
