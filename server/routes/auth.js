// ============================================================
// BCH 360° Intelligence V.10 - Auth Routes (Secure)
// 🔐 Phase 1 Security Hardening — bcrypt + JWT
// ============================================================
import { Router } from 'express';
import bcrypt from 'bcryptjs';
import { generateToken } from '../middleware/rbac.js';

const router = Router();

// ── User Store ──
// Phase 1: In-memory users (Phase 2+ → migrate to DB)
// รหัสผ่านเริ่มต้น ควรเปลี่ยนทันทีหลัง deploy
const USERS = [
    {
        id: 1,
        username: 'admin',
        password_hash: bcrypt.hashSync('BCH@dm1n2026!', 10),
        role: 'admin',
        full_name: 'ผู้ดูแลระบบ',
        department: 'IT'
    },
    {
        id: 2,
        username: 'director',
        password_hash: bcrypt.hashSync('BCHd1r3ct0r!', 10),
        role: 'director',
        full_name: 'ผู้อำนวยการ',
        department: 'Management'
    },
    {
        id: 3,
        username: 'finance',
        password_hash: bcrypt.hashSync('BCHf1n@nc3!', 10),
        role: 'finance',
        full_name: 'ฝ่ายการเงิน',
        department: 'Finance'
    },
    {
        id: 4,
        username: 'clinical',
        password_hash: bcrypt.hashSync('BCHcl1n1c@l!', 10),
        role: 'clinical',
        full_name: 'แพทย์/เภสัชกร',
        department: 'Clinical'
    },
    {
        id: 5,
        username: 'nursing',
        password_hash: bcrypt.hashSync('BCHnurs1ng!', 10),
        role: 'nursing',
        full_name: 'พยาบาล',
        department: 'Nursing'
    }
];

import { z } from 'zod';
import { validate } from '../middleware/validate.js';

// ---- Login Validation Schema ----
const loginSchema = z.object({
    username: z.string().min(3).max(50),
    password: z.string().min(6).max(128)
});

// ── POST /api/auth/login ──
router.post('/login', validate(loginSchema), async (req, res) => {
    const { username, password } = req.body;

    // Find user
    const user = USERS.find(u => u.username === username);
    if (!user) {
        // Constant-time comparison even for missing users (prevent username enumeration)
        await bcrypt.compare(password, '$2a$10$dummy.hash.for.timing.attack.prevention.xxxxx');
        return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    // Verify password
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (!isValid) {
        return res.status(401).json({ error: 'ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง' });
    }

    // Generate real JWT token
    const token = generateToken(user);

    console.log(`🔐 Login OK: ${user.username} (${user.role})`);

    res.json({
        token,
        user: {
            id: user.id,
            username: user.username,
            full_name: user.full_name,
            role: user.role,
            department: user.department
        }
    });
});

// ── GET /api/auth/me — Get current user from JWT ──
router.get('/me', (req, res) => {
    res.json({ user: req.user || null });
});

export default router;
