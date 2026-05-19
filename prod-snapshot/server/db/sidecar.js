// ============================================================
// BCH 360° Intelligence V.10 — better-sqlite3 Sidecar
// ------------------------------------------------------------
// HOSxP XE (MySQL) is read-only; any writable app state has to live
// somewhere else. This module owns the writable sidecar DB at
// `server/db/hospital.db` and applies the SQL migrations in
// `server/db/migrations/` on startup.
//
// Callers import the default export (a prepared better-sqlite3
// handle) and use it directly:
//
//     import sidecar from './sidecar.js';
//     sidecar.prepare('INSERT INTO ipt_vitals ...').run(...);
//
// userStore.js owns a separate users.db file and pre-dates this
// module; leave it as-is. A future pass can consolidate.
// ============================================================
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join, basename } from 'path';
import { readdirSync, readFileSync } from 'fs';
import logger from '../logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);
const DB_PATH    = join(__dirname, 'hospital.db');
const MIG_DIR    = join(__dirname, 'migrations');

const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ── Track applied migrations so each file runs at most once ──
db.exec(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
        filename    TEXT PRIMARY KEY,
        applied_at  TEXT NOT NULL DEFAULT (datetime('now'))
    );
`);

const stmtIsApplied  = db.prepare('SELECT 1 FROM schema_migrations WHERE filename = ?');
const stmtMarkApplied = db.prepare('INSERT INTO schema_migrations (filename) VALUES (?)');

function applyMigrations() {
    let files;
    try {
        files = readdirSync(MIG_DIR)
            .filter(f => f.endsWith('.sql'))
            .sort(); // lexicographic — 001_ before 002_ before 003_
    } catch (err) {
        logger.warn('[Sidecar] migrations dir missing or unreadable', { MIG_DIR, error: err.message });
        return;
    }

    let applied = 0;
    for (const file of files) {
        if (stmtIsApplied.get(file)) continue;
        const sql = readFileSync(join(MIG_DIR, file), 'utf8');
        try {
            // Wrap each file in a transaction so a failure in the middle
            // rolls back; mark applied only on success.
            const tx = db.transaction((statements) => {
                db.exec(statements);
                stmtMarkApplied.run(file);
            });
            tx(sql);
            applied++;
            logger.info(`[Sidecar] applied migration ${file}`);
        } catch (err) {
            logger.error(`[Sidecar] migration ${file} FAILED — sidecar features that rely on it will be broken`, {
                error: err.message,
                file: basename(file),
            });
        }
    }

    if (applied === 0) {
        logger.debug('[Sidecar] no new migrations to apply');
    }
}

applyMigrations();

export default db;
