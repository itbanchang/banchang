// ============================================================
// Phase H.4 admin-gate smoke test
// ============================================================
// POST-deploy probe (must run AFTER Phase H.1 — auth restored).
// Verifies /api/system/cache-audit refuses non-admin callers.
//
//   1. unauth         → 401 (Authentication required)
//   2. non-admin role → 403 (ไม่มีสิทธิ์เข้าถึงโมดูล "admin")
//   3. admin role     → 200 + JSON with { stores: { local, heavy, stale } }
//
// Login uses DEFAULT_*_PASSWORD from .env (seeded users.db).
// Override target via BCH_BASE_URL (default https://10.109.0.33:4001).
//
// Usage:
//   node scripts/verify-phase-h4-admin-gate.mjs
//   BCH_BASE_URL=https://10.1.0.68:4001 node scripts/verify-phase-h4-admin-gate.mjs
//
// Behavior under DISABLE_AUTH=true:
//   All 3 cases return 200. The script will FAIL with a clear message —
//   that's the expected signal that Phase H.1 isn't deployed yet.
// ============================================================
import 'dotenv/config';
import https from 'https';
import { URL } from 'url';

const BASE_URL = process.env.BCH_BASE_URL || 'https://10.109.0.33:4001';
const ADMIN_USER    = process.env.BCH_ADMIN_USER    || 'admin';
const ADMIN_PASS    = process.env.BCH_ADMIN_PASS    || process.env.DEFAULT_ADMIN_PASSWORD;
const NONADMIN_USER = process.env.BCH_NONADMIN_USER || 'nursing';
const NONADMIN_PASS = process.env.BCH_NONADMIN_PASS || process.env.DEFAULT_NURSING_PASSWORD;

if (!ADMIN_PASS || !NONADMIN_PASS) {
  console.error('❌ Missing creds. Set BCH_ADMIN_PASS + BCH_NONADMIN_PASS or DEFAULT_*_PASSWORD in .env');
  process.exit(2);
}

// Force-allow self-signed TLS (BCH prod cert is self-signed on intranet)
const agent = new https.Agent({ rejectUnauthorized: false });

const checks = [];
const record = (name, ok, detail = '') => {
  checks.push({ name, ok });
  console.log(`  ${ok ? '✅' : '❌'} ${name}${detail ? '  ' + detail : ''}`);
};

const banner = (s) => console.log(`\n━━━ ${s} ━━━`);

// Minimal fetch wrapper that preserves Set-Cookie headers
async function req(pathStr, { method = 'GET', body = null, cookie = '' } = {}) {
  const url = new URL(pathStr, BASE_URL);
  const headers = { 'accept': 'application/json' };
  if (body) headers['content-type'] = 'application/json';
  if (cookie) headers['cookie'] = cookie;

  const init = { method, headers, agent };
  if (body) init.body = JSON.stringify(body);

  const res = await fetch(url.toString(), init);
  const text = await res.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch { /* not json */ }
  return { status: res.status, headers: res.headers, text, json };
}

function parseCookie(setCookieHeader) {
  if (!setCookieHeader) return '';
  // Node's fetch may return multiple set-cookie as a single comma-joined string
  // (legacy). Split safely on cookie boundaries (look for "=" after "; ").
  const parts = setCookieHeader.split(/,(?=\s*[A-Za-z0-9_-]+=)/);
  return parts
    .map(p => p.split(';')[0].trim())
    .filter(p => p.startsWith('accessToken=') || p.startsWith('refreshToken=') || p.startsWith('csrf_token='))
    .join('; ');
}

// ============================================================
banner(`Pre-check — target reachable @ ${BASE_URL}`);
// ============================================================
try {
  const r = await req('/healthz');
  record('GET /healthz returns 200', r.status === 200, `status=${r.status}`);
  if (r.json) {
    record('mysql connected (per healthz)', r.json.mysql === 'connected', r.json.mysql);
  }
} catch (e) {
  console.log(`  ❌ unreachable: ${e.message}`);
  process.exit(1);
}

// ============================================================
banner('Step 1 — Login admin');
// ============================================================
const adminLogin = await req('/api/auth/login', {
  method: 'POST',
  body: { username: ADMIN_USER, password: ADMIN_PASS },
});
record('admin login returns 200', adminLogin.status === 200, `status=${adminLogin.status}`);
record('admin user has role=admin or director',
  adminLogin.json?.user?.role === 'admin' || adminLogin.json?.user?.role === 'director',
  `role=${adminLogin.json?.user?.role}`);
const adminCookie = parseCookie(adminLogin.headers.get('set-cookie'));
record('admin Set-Cookie captured', adminCookie.includes('accessToken='),
  `len=${adminCookie.length}`);

// ============================================================
banner('Step 2 — Login non-admin');
// ============================================================
const naLogin = await req('/api/auth/login', {
  method: 'POST',
  body: { username: NONADMIN_USER, password: NONADMIN_PASS },
});
record('non-admin login returns 200', naLogin.status === 200, `status=${naLogin.status}`);
const naRole = naLogin.json?.user?.role;
record('non-admin role != admin/director', naRole && !['admin', 'director'].includes(naRole),
  `role=${naRole}`);
const naCookie = parseCookie(naLogin.headers.get('set-cookie'));
record('non-admin Set-Cookie captured', naCookie.includes('accessToken='));

// ============================================================
banner('Step 3 — Probe /api/system/cache-audit (3 scenarios)');
// ============================================================

// 3.1 — no auth
const r1 = await req('/api/system/cache-audit');
record('Scenario A: NO auth → 401', r1.status === 401, `status=${r1.status}`);
if (r1.status === 200) {
  console.log('  ⚠️  Got 200 without auth — DISABLE_AUTH is still active on prod (Phase H.1 not deployed)');
}

// 3.2 — non-admin
const r2 = await req('/api/system/cache-audit', { cookie: naCookie });
record('Scenario B: non-admin cookie → 403', r2.status === 403, `status=${r2.status}`);

// 3.3 — admin
const r3 = await req('/api/system/cache-audit', { cookie: adminCookie });
record('Scenario C: admin cookie → 200', r3.status === 200, `status=${r3.status}`);
record('Scenario C: response has { stores: { local, heavy, stale } }',
  r3.json?.stores?.local && r3.json?.stores?.heavy && r3.json?.stores?.stale,
  r3.json?.stores ? `keys=[${Object.keys(r3.json.stores).join(',')}]` : 'no stores key');
record('Scenario C: response has flags[] array (may be empty)',
  Array.isArray(r3.json?.flags),
  `flags=${r3.json?.flags?.length ?? 'missing'}`);

// ============================================================
banner('VERDICT');
// ============================================================
const passed = checks.filter(c => c.ok).length;
const failed = checks.length - passed;
console.log('');
console.log(`  ${passed}/${checks.length} checks passed`);
if (failed === 0) {
  console.log('\n✅ ADMIN GATE VERIFIED — H.4 endpoint properly RBAC-gated');
  process.exit(0);
} else {
  console.log(`\n❌ ${failed} CHECK(S) FAILED`);
  for (const c of checks.filter(c => !c.ok)) console.log(`    - ${c.name}`);
  if (r1.status === 200) {
    console.log('\n  💡 Root cause likely: DISABLE_AUTH=true still active on prod.');
    console.log('     Fix: Phase H.1 (set NODE_ENV=production, remove DISABLE_AUTH=true)');
  }
  process.exit(1);
}
