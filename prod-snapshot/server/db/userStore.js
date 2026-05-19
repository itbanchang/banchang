// ============================================================
// BCH 360° Intelligence V.10 - SQLite User Store
// Persistent user storage — replaces in-memory USERS array
// Phase 2: Database-backed authentication
// ============================================================
import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import logger from '../logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const DB_PATH    = join(__dirname, 'users.db');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');

// ── Schema ──
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id            INTEGER PRIMARY KEY AUTOINCREMENT,
    username      TEXT    UNIQUE NOT NULL COLLATE NOCASE,
    password_hash TEXT    NOT NULL,
    full_name     TEXT    NOT NULL,
    role          TEXT    NOT NULL CHECK(role IN ('director','finance','clinical','nursing','admin','medrec')),
    department    TEXT,
    is_active     INTEGER NOT NULL DEFAULT 1,
    last_login    TEXT,
    created_at    TEXT    NOT NULL DEFAULT (datetime('now','localtime'))
  );
  CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
`);

// ── Prepared statements ──
const stmtByUsername = db.prepare('SELECT * FROM users WHERE username = ? AND is_active = 1');
const stmtById       = db.prepare('SELECT * FROM users WHERE id = ?       AND is_active = 1');
const stmtLogin      = db.prepare("UPDATE users SET last_login = datetime('now','localtime') WHERE id = ?");
const stmtInsert     = db.prepare(
  'INSERT OR IGNORE INTO users (username, password_hash, full_name, role, department) VALUES (?, ?, ?, ?, ?)'
);

export function findByUsername(username) { return stmtByUsername.get(username); }
export function findById(id)             { return stmtById.get(id); }
export function updateLastLogin(id)      { stmtLogin.run(id); }

// ── Seed default users from env on first startup ──
function seedDefaultUsers() {
  const { cnt } = db.prepare('SELECT COUNT(*) AS cnt FROM users').get();
  if (cnt > 0) return; // Already seeded — skip

  const entries = [
    { username: 'admin',    env: 'DEFAULT_ADMIN_PASSWORD',    full_name: 'ผู้ดูแลระบบ',    role: 'admin',    department: 'IT'         },
    { username: 'director', env: 'DEFAULT_DIRECTOR_PASSWORD', full_name: 'ผู้อำนวยการ',    role: 'director', department: 'Management' },
    { username: 'finance',  env: 'DEFAULT_FINANCE_PASSWORD',  full_name: 'ฝ่ายการเงิน',    role: 'finance',  department: 'Finance'    },
    { username: 'clinical', env: 'DEFAULT_CLINICAL_PASSWORD', full_name: 'แพทย์/เภสัชกร',  role: 'clinical', department: 'Clinical'   },
    { username: 'nursing',  env: 'DEFAULT_NURSING_PASSWORD',  full_name: 'พยาบาล',          role: 'nursing',  department: 'Nursing'    },
    { username: 'medrec',   env: 'DEFAULT_MEDREC_PASSWORD',   full_name: 'เวชระเบียน',      role: 'medrec',   department: 'MedRec'     },
  ];

  let seeded = 0;
  for (const e of entries) {
    const pwd = process.env[e.env];
    if (!pwd || pwd === 'CHANGE_ME_IMMEDIATELY') continue;
    stmtInsert.run(e.username, bcrypt.hashSync(pwd, 10), e.full_name, e.role, e.department);
    seeded++;
  }

  if (seeded > 0) {
    logger.info(`User store: seeded ${seeded} users into SQLite`);
  } else {
    logger.warn('User store: no users seeded — set DEFAULT_*_PASSWORD env vars and restart');
  }
}

seedDefaultUsers();

export default db;
