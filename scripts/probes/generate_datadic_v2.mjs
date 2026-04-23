#!/usr/bin/env node
// ============================================================
// BCH 360° — Data Dictionary Generator (v2)
//
// Connects to HOSxP XE via env (.env MYSQL_*) and produces:
//   docs/data-dictionary/index.html      browsable
//   docs/data-dictionary/tables.json     structured (for tooling)
//   docs/data-dictionary/core-tables.md  deep-dive of the tables the app uses
//
// - Enumerates ALL tables with row counts from INFORMATION_SCHEMA.
// - Deep-dives a curated CORE set (26-metric + 11-AI-module dependencies).
// - Samples 3 rows per core table, with PII columns masked.
// - Fails gracefully per-table so one missing table does not abort the run.
// ============================================================
import 'dotenv/config';
import mysql from 'mysql2/promise';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..', '..');
const OUT_DIR = resolve(ROOT, 'docs', 'data-dictionary');

// ---- Curated set (core tables the app actually depends on) ----
const CORE_TABLES = [
    // OPD / visits
    'ovst', 'ovstdiag', 'vn_stat',
    'ovst_service_time',      // ← real name (skills called it 'opd_service')
    'ovst_service_time_uni',
    'opdscreen', 'opdscreen_cc_list',
    // IPD
    'ipt', 'iptdiag', 'an_stat', 'ward',
    'ipt_vital_chart',        // ← real IPD vitals (skills called it 'vital_sign_ipd')
    'ipt_vital_chart_opt',
    // ER
    'er_regist', 'er_nursing_detail',
    // Billing
    'opitemrece', 'rcpt_print', 'rcpt_debt_detail',
    'incoth',
    // Pharmacy
    'opi_dispense',           // ← real drug-dispensing (skills called it 'drug_receive')
    'opi_dispense_dru',
    'drugitems',
    // Lab + xray
    'lab_head', 'lab_order', 'lab_order_service', 'lab_head_summary',
    'xray_head',
    // Reference
    'patient', 'pttype', 'kskdepartment', 'holiday', 'doctor',
    'visit_pttype', 'ovst_doctor_sign',
    // DX reference
    'icd101',
];

// ---- Columns to mask in sample rows (PII) ----
const PII_COLUMNS = new Set([
    'cid', 'pname', 'fname', 'lname', 'firstname', 'lastname', 'name',
    'address', 'addrpart', 'moopart', 'tmblpart', 'amppart', 'chwpart',
    'phone', 'mobile', 'email',
    'hometel', 'worktel', 'contact_phone',
    'tambon_code', 'ampur_code',
]);

function maskValue(col, v) {
    if (v == null) return null;
    if (PII_COLUMNS.has(String(col).toLowerCase())) {
        return '[REDACTED]';
    }
    // hn: keep but hash-looking
    if (String(col).toLowerCase() === 'hn') {
        const s = String(v);
        if (s.length <= 4) return '***';
        return s.slice(0, 2) + '***' + s.slice(-2);
    }
    return v;
}

async function main() {
    const config = {
        host: process.env.MYSQL_HOST || '10.109.0.33',
        user: process.env.MYSQL_USER || 'dataaudit',
        password: process.env.MYSQL_PASS || 'dataaudit',
        database: process.env.MYSQL_DB || 'bchhosxpxe',
        port: Number(process.env.MYSQL_PORT || 3306),
        connectTimeout: 10000,
    };

    console.log(`→ Connecting to ${config.host}:${config.port}/${config.database} as ${config.user}`);
    const pool = mysql.createPool({ ...config, waitForConnections: true, connectionLimit: 5 });

    const started = Date.now();

    // Enforce read-only at session level, matching server/db/mysql.js
    const conn = await pool.getConnection();
    await conn.query('SET SESSION TRANSACTION READ ONLY').catch(() => {});
    conn.release();

    // ────────────────────────────────────────────────────────────
    // 1. Enumerate ALL tables with estimated row counts
    // ────────────────────────────────────────────────────────────
    console.log('→ Enumerating all tables...');
    const [allTables] = await pool.query(`
        SELECT TABLE_NAME, TABLE_ROWS, DATA_LENGTH, INDEX_LENGTH, ENGINE, TABLE_COLLATION, TABLE_COMMENT
        FROM INFORMATION_SCHEMA.TABLES
        WHERE TABLE_SCHEMA = ?
        ORDER BY TABLE_NAME
    `, [config.database]);

    console.log(`  found ${allTables.length} tables`);

    const tableSummary = allTables.map(t => ({
        name: t.TABLE_NAME,
        rows_estimated: Number(t.TABLE_ROWS || 0),
        data_bytes: Number(t.DATA_LENGTH || 0),
        index_bytes: Number(t.INDEX_LENGTH || 0),
        engine: t.ENGINE,
        collation: t.TABLE_COLLATION,
        comment: t.TABLE_COMMENT || '',
    }));

    // ────────────────────────────────────────────────────────────
    // 2. Deep-dive core tables
    // ────────────────────────────────────────────────────────────
    console.log(`→ Deep-diving ${CORE_TABLES.length} core tables...`);
    const coreDetails = {};
    for (const t of CORE_TABLES) {
        try {
            process.stdout.write(`  ${t}... `);
            const [cols] = await pool.query(`SHOW FULL COLUMNS FROM \`${t}\``);
            const [idx] = await pool.query(`SHOW INDEX FROM \`${t}\``);
            const [cnt] = await pool.query(`SELECT COUNT(*) AS n FROM \`${t}\``);

            // Sample 3 rows; skip entirely if core table is a PII table
            let sample = [];
            if (!['patient', 'person'].includes(t)) {
                try {
                    const [rows] = await pool.query(`SELECT * FROM \`${t}\` LIMIT 3`);
                    sample = rows.map(r => {
                        const out = {};
                        for (const [k, v] of Object.entries(r)) out[k] = maskValue(k, v);
                        return out;
                    });
                } catch { /* sampling is best-effort */ }
            }

            coreDetails[t] = {
                columns: cols.map(c => ({
                    field: c.Field, type: c.Type, null: c.Null, key: c.Key,
                    default: c.Default, extra: c.Extra, comment: c.Comment,
                })),
                indexes: idx.map(i => ({
                    key_name: i.Key_name, column: i.Column_name, unique: i.Non_unique === 0,
                    seq: i.Seq_in_index, cardinality: i.Cardinality,
                })),
                row_count: Number(cnt?.[0]?.n || 0),
                sample_rows: sample,
            };
            console.log(`✓ ${coreDetails[t].columns.length} cols, ${coreDetails[t].row_count.toLocaleString()} rows`);
        } catch (err) {
            coreDetails[t] = { error: err.message };
            console.log(`✗ ${err.message}`);
        }
    }

    await pool.end();

    // ────────────────────────────────────────────────────────────
    // 3. Write outputs
    // ────────────────────────────────────────────────────────────
    mkdirSync(OUT_DIR, { recursive: true });
    const durationSec = Math.round((Date.now() - started) / 1000);

    const payload = {
        generated_at: new Date().toISOString(),
        database: config.database,
        host: config.host,
        duration_seconds: durationSec,
        total_tables: allTables.length,
        core_tables: CORE_TABLES.length,
        tables: tableSummary,
        core: coreDetails,
    };

    writeFileSync(resolve(OUT_DIR, 'tables.json'), JSON.stringify(payload, null, 2));
    console.log(`\n✓ tables.json (${tableSummary.length} tables)`);

    writeFileSync(resolve(OUT_DIR, 'core-tables.md'), renderMarkdown(payload));
    console.log(`✓ core-tables.md (${CORE_TABLES.length} core)`);

    writeFileSync(resolve(OUT_DIR, 'index.html'), renderHtml(payload));
    console.log(`✓ index.html browsable`);

    // Also refresh the legacy data_dictionary.md at repo root
    writeFileSync(resolve(ROOT, 'data_dictionary.md'), renderLegacy(payload));
    console.log(`✓ data_dictionary.md (legacy path)`);

    console.log(`\nDone in ${durationSec}s. Output: docs/data-dictionary/`);
}

// ────────────────────────────────────────────────────────────
function renderMarkdown(p) {
    const lines = [];
    lines.push(`# Data Dictionary — Core Tables\n`);
    lines.push(`Generated ${p.generated_at} • ${p.database}@${p.host} • ${p.total_tables} total tables • ${p.core_tables} deep-dived • in ${p.duration_seconds}s\n`);

    for (const [name, d] of Object.entries(p.core)) {
        lines.push(`\n## ${name}`);
        if (d.error) { lines.push(`\n⚠️ error: \`${d.error}\`\n`); continue; }
        lines.push(`\nRow count: **${d.row_count.toLocaleString()}** • Columns: ${d.columns.length} • Indexes: ${d.indexes.length}\n`);

        lines.push(`\n### Columns\n`);
        lines.push(`| Field | Type | Null | Key | Default | Extra | Comment |`);
        lines.push(`|-------|------|------|-----|---------|-------|---------|`);
        for (const c of d.columns) {
            lines.push(`| \`${c.field}\` | ${c.type} | ${c.null} | ${c.key || ''} | ${c.default ?? ''} | ${c.extra || ''} | ${(c.comment || '').slice(0, 80)} |`);
        }

        if (d.indexes.length) {
            lines.push(`\n### Indexes\n`);
            lines.push(`| Index | Column | Seq | Unique | Cardinality |`);
            lines.push(`|-------|--------|-----|--------|-------------|`);
            for (const i of d.indexes) {
                lines.push(`| \`${i.key_name}\` | \`${i.column}\` | ${i.seq} | ${i.unique ? '✓' : ''} | ${i.cardinality ?? ''} |`);
            }
        }

        if (d.sample_rows?.length) {
            lines.push(`\n### Sample rows (PII masked)\n`);
            lines.push('```json');
            lines.push(JSON.stringify(d.sample_rows, null, 2));
            lines.push('```');
        }
    }

    return lines.join('\n') + '\n';
}

function renderLegacy(p) {
    const lines = [];
    lines.push(`# BCH 360° Intelligence - Data Dictionary`);
    lines.push(``);
    lines.push(`Generated on: ${p.generated_at}`);
    lines.push(`Database: ${p.database} (${p.host})`);
    lines.push(`Total tables: ${p.total_tables} • Core deep-dived: ${p.core_tables}`);
    lines.push(``);
    lines.push(`> Full core detail in \`docs/data-dictionary/core-tables.md\` • browsable in \`docs/data-dictionary/index.html\``);
    lines.push(``);

    // Compact listing of top-50 largest tables
    const bySize = [...p.tables].sort((a, b) => b.rows_estimated - a.rows_estimated).slice(0, 50);
    lines.push(`## Top 50 tables by estimated row count\n`);
    lines.push(`| Table | Rows (est) | Data | Index | Engine |`);
    lines.push(`|-------|-----------:|-----:|------:|--------|`);
    for (const t of bySize) {
        lines.push(`| \`${t.name}\` | ${t.rows_estimated.toLocaleString()} | ${humanBytes(t.data_bytes)} | ${humanBytes(t.index_bytes)} | ${t.engine} |`);
    }

    return lines.join('\n') + '\n';
}

function humanBytes(n) {
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    if (n < 1024 * 1024 * 1024) return `${(n / 1024 / 1024).toFixed(1)} MB`;
    return `${(n / 1024 / 1024 / 1024).toFixed(2)} GB`;
}

function renderHtml(p) {
    return `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<title>BCH 360° — Data Dictionary</title>
<style>
  body { font-family: Inter, 'Noto Sans Thai', system-ui, sans-serif; max-width: 1400px; margin: 2em auto; padding: 0 1em; color: #1e293b; line-height: 1.6; }
  h1 { color: #7c3aed; }
  h2 { color: #5b21b6; margin-top: 2em; padding-top: 1em; border-top: 2px solid #e2e8f0; }
  h3 { color: #475569; }
  table { width: 100%; border-collapse: collapse; margin: 1em 0; font-size: 13px; }
  th { background: #f5f3ff; color: #5b21b6; text-align: left; padding: .5em .75em; border-bottom: 2px solid #c4b5fd; }
  td { padding: .5em .75em; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
  code { background: #f1f5f9; padding: 2px 6px; border-radius: 4px; font-family: 'JetBrains Mono', monospace; font-size: 12px; }
  .stat { display: inline-block; background: #eef2ff; color: #4338ca; padding: 2px 10px; border-radius: 999px; margin-right: 6px; font-size: 12px; }
  details > summary { cursor: pointer; padding: 4px 0; font-weight: 600; }
  .nav { position: sticky; top: 0; background: white; padding: 12px 0; border-bottom: 1px solid #e2e8f0; margin-bottom: 1em; }
  .nav a { margin-right: 10px; color: #7c3aed; text-decoration: none; font-size: 13px; }
  .nav a:hover { text-decoration: underline; }
  pre { background: #0f172a; color: #e2e8f0; padding: 10px; border-radius: 6px; overflow-x: auto; font-size: 11px; }
</style>
</head>
<body>
<h1>🗃️ BCH 360° — Data Dictionary</h1>
<p>
  <span class="stat">Database: ${p.database}</span>
  <span class="stat">${p.total_tables} tables</span>
  <span class="stat">${p.core_tables} core deep-dived</span>
  <span class="stat">Generated ${p.generated_at}</span>
</p>

<div class="nav">
  ${Object.keys(p.core).map(t => `<a href="#t-${t}">${t}</a>`).join('')}
</div>

<h2>Top 50 tables by estimated row count</h2>
<table>
<thead><tr><th>Table</th><th>Rows (est)</th><th>Data</th><th>Index</th><th>Engine</th></tr></thead>
<tbody>
${[...p.tables].sort((a, b) => b.rows_estimated - a.rows_estimated).slice(0, 50).map(t => `
  <tr><td><code>${t.name}</code></td><td style="text-align:right">${t.rows_estimated.toLocaleString()}</td><td>${humanBytes(t.data_bytes)}</td><td>${humanBytes(t.index_bytes)}</td><td>${t.engine}</td></tr>`).join('')}
</tbody>
</table>

${Object.entries(p.core).map(([name, d]) => {
    if (d.error) return `<h2 id="t-${name}">${name}</h2><p>⚠️ ${d.error}</p>`;
    return `
<h2 id="t-${name}">${name}</h2>
<p>
  <span class="stat">rows: ${d.row_count.toLocaleString()}</span>
  <span class="stat">${d.columns.length} cols</span>
  <span class="stat">${d.indexes.length} indexes</span>
</p>
<details open><summary>Columns</summary>
<table>
<thead><tr><th>Field</th><th>Type</th><th>Null</th><th>Key</th><th>Default</th><th>Extra</th><th>Comment</th></tr></thead>
<tbody>
${d.columns.map(c => `<tr><td><code>${c.field}</code></td><td>${c.type}</td><td>${c.null}</td><td>${c.key || ''}</td><td>${c.default ?? ''}</td><td>${c.extra || ''}</td><td>${(c.comment || '').slice(0, 80)}</td></tr>`).join('')}
</tbody>
</table>
</details>
${d.indexes.length ? `
<details><summary>Indexes (${d.indexes.length})</summary>
<table>
<thead><tr><th>Index</th><th>Column</th><th>Seq</th><th>Unique</th><th>Cardinality</th></tr></thead>
<tbody>
${d.indexes.map(i => `<tr><td><code>${i.key_name}</code></td><td><code>${i.column}</code></td><td>${i.seq}</td><td>${i.unique ? '✓' : ''}</td><td>${i.cardinality ?? ''}</td></tr>`).join('')}
</tbody>
</table>
</details>` : ''}
${d.sample_rows?.length ? `<details><summary>Sample rows (PII masked)</summary><pre>${JSON.stringify(d.sample_rows, null, 2).replace(/</g, '&lt;')}</pre></details>` : ''}
`;
}).join('\n')}

<footer style="margin-top:3em;color:#94a3b8;font-size:12px;">
  BCH 360° V.10 • Data Dictionary • docs/data-dictionary/index.html
</footer>
</body>
</html>`;
}

main().catch(err => {
    console.error('FATAL:', err.message);
    process.exit(1);
});
