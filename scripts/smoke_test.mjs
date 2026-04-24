#!/usr/bin/env node
// ============================================================
// BCH 360° Intelligence V.10 — Smoke Test
//
// Hits the top critical API endpoints with an authenticated
// session and reports HTTP status per endpoint.
//
// Usage:
//   npm run test:smoke
//   BASE_URL=https://10.1.0.68:4001 npm run test:smoke
//   ADMIN_PASSWORD=xxx npm run test:smoke
// ============================================================
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import https from 'https';
import { URL } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: resolve(__dirname, '..', '.env') });

const BASE_URL = process.env.BASE_URL || 'https://10.1.0.68:4001';
const USERNAME = process.env.SMOKE_USER || 'admin';
const PASSWORD = process.env.SMOKE_PASS || process.env.DEFAULT_ADMIN_PASSWORD;

if (!PASSWORD) {
  console.error('❌ Set SMOKE_PASS or DEFAULT_ADMIN_PASSWORD in .env');
  process.exit(2);
}

// Disable cert verification for self-signed local server
const agent = new https.Agent({ rejectUnauthorized: false });

// ─── Critical endpoints — add/edit here ──────────────────────
const ENDPOINTS = [
  // Core
  ['GET', '/api/system/build-info', 200],
  ['GET', '/api/system/health', 200],
  // Finance
  ['GET', '/api/finance/monthly-summary', 200],
  ['GET', '/api/finance/analytics', 200],
  // OPD / IPD / ER
  ['GET', '/api/opd/today', 200],
  ['GET', '/api/ipd/bed-occupancy', 200],
  ['GET', '/api/ipd/admissions', 200],
  ['GET', '/api/er/today', 200],
  ['GET', '/api/er/triage-stats', 200],
  // Department tabs
  ['GET', '/api/pharmacy/today', 200],
  ['GET', '/api/lab/today', 200],
  ['GET', '/api/xray/today', 200],
  ['GET', '/api/ncd/today', 200],
  ['GET', '/api/quality/today', 200],
  // Analytics
  ['GET', '/api/doctor/activity-summary?days=1', 200],
  ['GET', '/api/customer-insight/screening-summary', 200],
  // AI
  ['GET', '/api/ai/ews/summary', 200],
];

// ─── HTTP helpers ────────────────────────────────────────────
function request(method, path, { cookies = '', body = null, csrf = null } = {}) {
  const url = new URL(BASE_URL + path);
  return new Promise((resolvePromise, rejectPromise) => {
    const headers = { 'Content-Type': 'application/json', 'Cookie': cookies };
    if (csrf) headers['X-CSRF-Token'] = csrf;
    const req = https.request({
      hostname: url.hostname, port: url.port, path: url.pathname + url.search,
      method, headers, agent,
    }, res => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => {
        const setCookies = res.headers['set-cookie'] || [];
        resolvePromise({ status: res.statusCode, data, setCookies });
      });
    });
    req.on('error', rejectPromise);
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
}

function extractCookies(setCookies) {
  return setCookies.map(c => c.split(';')[0]).join('; ');
}
function extractCsrf(setCookies) {
  for (const c of setCookies) {
    const match = /^csrf_token=([^;]+)/.exec(c);
    if (match) return match[1];
  }
  return null;
}

// ─── Login ───────────────────────────────────────────────────
console.log(`🔗 BASE_URL = ${BASE_URL}`);
console.log(`👤 Logging in as ${USERNAME}...`);
const login = await request('POST', '/api/auth/login', {
  body: { username: USERNAME, password: PASSWORD },
});
if (login.status !== 200) {
  console.error(`❌ Login failed: HTTP ${login.status} · ${login.data.substring(0, 200)}`);
  process.exit(2);
}
const cookies = extractCookies(login.setCookies);
const csrf = extractCsrf(login.setCookies);
if (!csrf) {
  console.error('❌ CSRF token not found in login response');
  process.exit(2);
}
console.log('✅ Logged in\n');

// ─── Run tests ───────────────────────────────────────────────
const t0 = Date.now();
const results = [];
for (const [method, path, expectedStatus] of ENDPOINTS) {
  const start = Date.now();
  try {
    const res = await request(method, path, { cookies, csrf });
    const ms = Date.now() - start;
    const ok = res.status === expectedStatus;
    results.push({ method, path, expected: expectedStatus, actual: res.status, ms, ok });
    const icon = ok ? '✅' : '❌';
    console.log(`${icon} ${method} ${path}  →  HTTP ${res.status}  (${ms}ms)`);
  } catch (err) {
    results.push({ method, path, expected: expectedStatus, actual: 0, ms: 0, ok: false, err: err.message });
    console.log(`❌ ${method} ${path}  →  ERROR  ${err.message}`);
  }
}

// ─── Summary ─────────────────────────────────────────────────
const totalMs = Date.now() - t0;
const passed = results.filter(r => r.ok).length;
const failed = results.length - passed;
const avgMs = results.length > 0 ? Math.round(results.reduce((s, r) => s + r.ms, 0) / results.length) : 0;
const slowest = results.slice().sort((a, b) => b.ms - a.ms)[0];

console.log('\n' + '='.repeat(60));
console.log(`Smoke Test Results · total ${totalMs}ms`);
console.log('='.repeat(60));
console.log(`✅ Passed: ${passed} / ${results.length}`);
if (failed > 0) console.log(`❌ Failed: ${failed}`);
console.log(`⏱ Average: ${avgMs}ms · Slowest: ${slowest.method} ${slowest.path} (${slowest.ms}ms)`);

if (failed > 0) {
  console.log('\nFailures:');
  for (const r of results.filter(r => !r.ok)) {
    console.log(`  ${r.method} ${r.path} → expected ${r.expected}, got ${r.actual}${r.err ? ' · ' + r.err : ''}`);
  }
  process.exit(1);
}
process.exit(0);
