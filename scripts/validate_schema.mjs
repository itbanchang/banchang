#!/usr/bin/env node
// ============================================================
// BCH 360° Intelligence V.10 — Column Schema Validator
//
// Scans server/routes/**/*.js for SQL and verifies that every
// column referenced (`alias.col`) exists in the actual HOSxP XE
// database (via SHOW COLUMNS). Reports orphan columns per file.
//
// Usage:
//   npm run validate:schema              # full scan, exits 1 on error
//   npm run validate:schema -- --files=server/routes/ipd.js
// ============================================================
import dotenv from 'dotenv';
import { readFileSync, readdirSync, statSync } from 'fs';
import { join, dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '..', '.env') });

const { dbQuery } = await import('../server/db/mysql.js');

// ─── Walk all route files ───────────────────────────────────
const ROUTE_DIR = resolve(__dirname, '..', 'server', 'routes');
function walk(dir) {
  const out = [];
  for (const f of readdirSync(dir)) {
    const p = join(dir, f);
    const s = statSync(p);
    if (s.isDirectory()) out.push(...walk(p));
    else if (f.endsWith('.js')) out.push(p);
  }
  return out;
}

const argFiles = process.argv.find(a => a.startsWith('--files='));
const files = argFiles
  ? argFiles.replace('--files=', '').split(',').map(f => resolve(__dirname, '..', f))
  : walk(ROUTE_DIR);

// ─── Extract table aliases + column references per file ─────
// Patterns: FROM table alias · FROM table · JOIN table alias · JOIN table
const RE_ALIAS = /\b(?:FROM|JOIN)\s+([a-z_][a-z0-9_]*)\s+(?:AS\s+)?([a-z][a-z0-9_]?)\b/gi;
const RE_FROM = /\b(?:FROM|JOIN)\s+([a-z_][a-z0-9_]*)\b/gi;
const RE_COL = /\b([a-z][a-z0-9_]?)\.([a-z_][a-z0-9_]*)\b/gi;

// Ignore non-SQL contexts and common JS/object accesses
const IGNORE_COL_PREFIXES = new Set([
  'req', 'res', 'err', 'err', 'e', 'process', 'console', 'Math', 'JSON',
  'this', 'data', 'body', 'query', 'params', 'path', 'fs', 'url', 'dayjs',
  'logger', 'app', 'router', 'state', 'config', 'env',
]);
const IGNORE_COL_NAMES = new Set([
  'length', 'map', 'filter', 'reduce', 'push', 'pop', 'shift', 'sort',
  'slice', 'splice', 'join', 'split', 'trim', 'toString', 'toISOString',
  'catch', 'then', 'forEach', 'has', 'get', 'set', 'add', 'delete',
  'json', 'status', 'send', 'cookie', 'header', 'headers', 'end',
]);

// ─── Cache for SHOW COLUMNS ─────────────────────────────────
const schemaCache = new Map(); // tableName → Set of column names
async function getColumns(tableName) {
  if (schemaCache.has(tableName)) return schemaCache.get(tableName);
  try {
    const rows = await dbQuery(`SHOW COLUMNS FROM \`${tableName}\``);
    const cols = new Set(rows.map(r => String(r.Field).toLowerCase()));
    schemaCache.set(tableName, cols);
    return cols;
  } catch (e) {
    schemaCache.set(tableName, null);
    return null;
  }
}

// ─── Scan each file ─────────────────────────────────────────
let totalErrors = 0;
const report = [];

for (const file of files) {
  const relFile = file.replace(resolve(__dirname, '..') + '\\', '').replace(/\\/g, '/');
  const src = readFileSync(file, 'utf8');

  // Only look inside template literals (backticks) — that's where SQL lives
  const sqlBlocks = [];
  const re = /`([^`]+)`/g;
  let m;
  while ((m = re.exec(src)) !== null) {
    if (/\b(SELECT|FROM|JOIN|WHERE|GROUP BY|ORDER BY)\b/i.test(m[1])) {
      sqlBlocks.push(m[1]);
    }
  }
  if (sqlBlocks.length === 0) continue;

  const errors = [];
  const seen = new Set(); // dedupe across blocks

  // Process each SQL block INDEPENDENTLY — same alias may point to different
  // tables in different queries within one file.
  for (const sqlText of sqlBlocks) {
    const alias2table = {};
    let am;
    RE_ALIAS.lastIndex = 0;
    while ((am = RE_ALIAS.exec(sqlText)) !== null) {
      const [, table, alias] = am;
      if (alias && !['on', 'as', 'is', 'in'].includes(alias.toLowerCase())) {
        alias2table[alias.toLowerCase()] = table.toLowerCase();
      }
    }

    // Extract alias.column references within this block
    const refs = new Map();
    RE_COL.lastIndex = 0;
    let cm;
    while ((cm = RE_COL.exec(sqlText)) !== null) {
      const alias = cm[1].toLowerCase();
      const col = cm[2].toLowerCase();
      if (IGNORE_COL_PREFIXES.has(alias) || IGNORE_COL_NAMES.has(col)) continue;
      const key = `${alias}.${col}`;
      refs.set(key, (refs.get(key) || 0) + 1);
    }

    for (const [key] of refs) {
      const [alias, col] = key.split('.');
      const table = alias2table[alias];
      if (!table) continue;
      const cols = await getColumns(table);
      if (cols === null) {
        const errKey = `${table}|UNKNOWN|${alias}.${col}`;
        if (!seen.has(errKey)) {
          seen.add(errKey);
          errors.push(`  ⚠ Unknown table: ${table} (referenced as ${alias}.${col})`);
        }
        continue;
      }
      if (!cols.has(col)) {
        const errKey = `${table}|${col}`;
        if (!seen.has(errKey)) {
          seen.add(errKey);
          errors.push(`  ❌ ${alias}.${col} → table \`${table}\` has no column \`${col}\``);
        }
      }
    }
  }

  if (errors.length > 0) {
    totalErrors += errors.length;
    report.push(`\n📄 ${relFile}:`);
    report.push(...errors);
  }
}

// ─── Summary ────────────────────────────────────────────────
console.log('='.repeat(60));
console.log('BCH 360° — Column Schema Validator');
console.log('='.repeat(60));
console.log(`Scanned ${files.length} route files · ${schemaCache.size} tables queried`);
if (totalErrors === 0) {
  console.log('✅ No column mismatches found.');
} else {
  console.log(`❌ ${totalErrors} issues:`);
  console.log(report.join('\n'));
}

process.exit(totalErrors > 0 ? 1 : 0);
