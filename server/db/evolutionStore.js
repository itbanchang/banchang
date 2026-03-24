// ============================================================
// BCH 360° Intelligence V.10 — Self-Upgrade System Data Store
// Learning Journal + Evolution Log
// ============================================================
import { getWarehouseDb } from './dataWarehouse.js';

function db() {
    const d = getWarehouseDb();
    if (!d) throw new Error('Warehouse DB not initialized');
    return d;
}

// ── Learning Journal ──

export function logLearning({ module, event_type, severity = 'info', title, detail, metric_value, metric_unit }) {
    return db().prepare(`
        INSERT INTO dw_learning_journal (module, event_type, severity, title, detail, metric_value, metric_unit)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(module, event_type, severity, title, typeof detail === 'object' ? JSON.stringify(detail) : detail, metric_value ?? null, metric_unit ?? null);
}

export function getLearningJournal({ days = 30, module, event_type, limit = 50, offset = 0 } = {}) {
    let sql = `SELECT * FROM dw_learning_journal WHERE event_date >= date('now', 'localtime', ?)`;
    const params = [`-${days} days`];
    if (module) { sql += ` AND module = ?`; params.push(module); }
    if (event_type) { sql += ` AND event_type = ?`; params.push(event_type); }
    sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);
    return db().prepare(sql).all(...params);
}

export function getLearningStats() {
    const d = db();
    const byModule = d.prepare(`
        SELECT module, COUNT(*) as count FROM dw_learning_journal
        WHERE event_date >= date('now', 'localtime', '-30 days')
        GROUP BY module ORDER BY count DESC
    `).all();
    const byType = d.prepare(`
        SELECT event_type, COUNT(*) as count FROM dw_learning_journal
        WHERE event_date >= date('now', 'localtime', '-30 days')
        GROUP BY event_type ORDER BY count DESC
    `).all();
    const bySeverity = d.prepare(`
        SELECT severity, COUNT(*) as count FROM dw_learning_journal
        WHERE event_date >= date('now', 'localtime', '-30 days')
        GROUP BY severity ORDER BY count DESC
    `).all();
    const total = d.prepare(`
        SELECT COUNT(*) as count FROM dw_learning_journal
        WHERE event_date >= date('now', 'localtime', '-30 days')
    `).get();
    const totalAll = d.prepare(`SELECT COUNT(*) as count FROM dw_learning_journal`).get();
    return { total: total.count, total_all: totalAll.count, by_module: byModule, by_type: byType, by_severity: bySeverity };
}

// ── Evolution Log ──

export function logEvolution({ category, title, description, author = 'system', version, tags, impact = 'minor' }) {
    return db().prepare(`
        INSERT INTO dw_evolution_log (category, title, description, author, version, tags, impact)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(category, title, description, author, version ?? null, tags ?? null, impact);
}

export function getEvolutionLog({ days = 90, category, limit = 50, offset = 0 } = {}) {
    let sql = `SELECT * FROM dw_evolution_log WHERE event_date >= date('now', 'localtime', ?)`;
    const params = [`-${days} days`];
    if (category) { sql += ` AND category = ?`; params.push(category); }
    sql += ` ORDER BY created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);
    return db().prepare(sql).all(...params);
}

// ── Combined Timeline ──

export function getTimeline({ days = 30, limit = 100 } = {}) {
    return db().prepare(`
        SELECT id, event_date, module as source_module, event_type as category, severity, title, detail, metric_value, metric_unit, created_at, 'learning' as source
        FROM dw_learning_journal WHERE event_date >= date('now', 'localtime', ?)
        UNION ALL
        SELECT id, event_date, author as source_module, category, impact as severity, title, description as detail, NULL as metric_value, NULL as metric_unit, created_at, 'evolution' as source
        FROM dw_evolution_log WHERE event_date >= date('now', 'localtime', ?)
        ORDER BY created_at DESC LIMIT ?
    `).all(`-${days} days`, `-${days} days`, limit);
}

// ── Seed initial evolution entries ──
export function seedEvolutionIfEmpty() {
    const count = db().prepare('SELECT COUNT(*) as c FROM dw_evolution_log').get().c;
    if (count > 0) return;

    const seed = db().prepare(`INSERT INTO dw_evolution_log (event_date, category, title, description, author, version, tags, impact) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`);
    const entries = [
        ['2026-03-01', 'release', 'BCH 360° Intelligence V.10 Launch', 'ระบบ Dashboard AI สำหรับผู้บริหาร รพ.บ้านฉาง — 14 แผนก, 11 AI Modules, HOSxP XE Integration', 'system', 'v10.0.0', 'launch,production', 'major'],
        ['2026-03-05', 'improvement', 'SQL Optimization & Materialized Views', 'เพิ่ม Materialized Views 10 ตัว, Data Warehouse SQLite, Circuit Breaker Pattern', 'system', 'v10.1.0', 'performance,sql,cache', 'major'],
        ['2026-03-10', 'improvement', 'Security Hardening Phase 1', 'JWT 30min + Refresh Token, CORS exact origins, CSP, Helmet, Rate Limiting, RBAC', 'system', 'v10.2.0', 'security,auth,rbac', 'major'],
        ['2026-03-18', 'improvement', 'Revenue by Payer — Visit-level pttype Fix', 'แก้ JOIN จาก patient.pttype เป็น vn_stat.pttype ให้ตรงกับข้อมูลจริงแต่ละ visit', 'system', 'v10.3.0', 'finance,data-accuracy', 'minor'],
        ['2026-03-20', 'improvement', 'Fiscal Year Custom Date Range', 'เพิ่มระบบเลือกช่วงวันที่เอง สำหรับเปรียบเทียบปีงบประมาณทุกแผนก', 'system', 'v10.4.0', 'compare,date-range,fiscal', 'major'],
        ['2026-03-22', 'improvement', 'CompareTab Performance & Grouped Bar Charts', 'Parallel fetch, AbortController, Map lookup, Department color palette, Grouped bars', 'system', 'v10.5.0', 'performance,ui,charts', 'minor'],
        ['2026-03-22', 'release', 'Self-Upgrade System', 'ระบบพัฒนาตัวเอง — Learning Journal + Evolution Log สำหรับติดตามการเรียนรู้และพัฒนาของ AI', 'system', 'v10.6.0', 'ai,self-upgrade,learning', 'major'],
    ];
    const tx = db().transaction(() => { for (const e of entries) seed.run(...e); });
    tx();
}
