// ============================================================
// Phase H Pre-deploy Validation Pack (H.7)
// ============================================================
// Single-script gate that must pass before scp-ing Phase H to prod.
// Runs entirely on the DEV workstation against LOCAL files + LOCAL .env.
//
// Sections:
//   1) .env audit            — security/RBAC vars required for H.1 to be safe
//   2) Syntax check          — node --check on all 9 edited files
//   3) Verify probes         — H.2 (admit) + H.3 (hash unit) + H.6 (er_dch_type sweep)
//   4) Static checks         — grep guarantees on code (admin gate, hash export)
//   5) Files-to-deploy list  — for the operator's scp loop
//   6) Verdict               — green/red summary
//
// Note: H.4 admin-gate behavior verifies via scripts/verify-phase-h4-admin-gate.mjs
//       — that's a POST-deploy probe (needs auth restored) — run AFTER scp + restart.
//
// Exit 0 = safe to deploy · Exit 1 = something wrong, do NOT scp.
//
// Usage:
//   node scripts/preflight-phase-h.mjs                      # check local .env
//   node scripts/preflight-phase-h.mjs --env-path=/tmp/prod-env  # check a prod .env copied down via scp
//   node scripts/preflight-phase-h.mjs --skip-env           # syntax + probes only (dev iteration)
// ============================================================
import fs from 'fs';
import path from 'path';
import { spawnSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const args = process.argv.slice(2);
const SKIP_ENV = args.includes('--skip-env');
const ENV_PATH_ARG = args.find(a => a.startsWith('--env-path='));
const CUSTOM_ENV_PATH = ENV_PATH_ARG ? ENV_PATH_ARG.split('=')[1] : null;

const checks = [];
const record = (section, name, ok, detail = '') => {
  checks.push({ section, name, ok, detail });
  console.log(`  ${ok ? '✅' : '❌'} ${name}${detail ? '  ' + detail : ''}`);
};

const banner = (s) => console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n${s}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);

// ============================================================
// 1) .env audit
// ============================================================
banner('1) .env audit (will-be-prod state expectations)');

if (SKIP_ENV) {
  console.log('  ⏭  skipped (--skip-env)');
}
const envPath = CUSTOM_ENV_PATH || path.join(ROOT, '.env');
if (SKIP_ENV) {
  // noop — go to next section
} else if (!fs.existsSync(envPath)) {
  record('env', '.env file exists', false, 'NOT FOUND at ' + envPath);
} else {
  console.log(`  📄 reading: ${envPath}`);
  const envRaw = fs.readFileSync(envPath, 'utf-8');
  const lines = envRaw.split(/\r?\n/);

  // Parse non-comment lines into key/value
  const env = {};
  const commentedKeys = new Set();
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;
    if (trimmed.startsWith('#')) {
      const m = trimmed.match(/^#\s*([A-Z_][A-Z0-9_]*)\s*=/);
      if (m) commentedKeys.add(m[1]);
      continue;
    }
    const m = trimmed.match(/^([A-Z_][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (m) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }

  record('env', '.env file present + parseable', true, `${Object.keys(env).length} active vars, ${commentedKeys.size} commented`);

  // The CRITICAL Phase H.1 invariants for prod
  const nodeEnv = env.NODE_ENV;
  record('env',
    'NODE_ENV=production (active, not commented)',
    nodeEnv === 'production',
    nodeEnv ? `current=${nodeEnv}` : (commentedKeys.has('NODE_ENV') ? 'currently COMMENTED OUT' : 'not set')
  );

  const disableAuth = env.DISABLE_AUTH;
  const disableAuthIsActive = disableAuth === 'true';
  record('env',
    'DISABLE_AUTH NOT set to true',
    !disableAuthIsActive,
    disableAuthIsActive ? `current=true — AUTH IS BYPASSED ON PROD` : 'absent or =false (good)'
  );

  // JWT_SECRET strength gate (matches server.js validation)
  const jwt = env.JWT_SECRET || '';
  record('env', 'JWT_SECRET present + ≥32 chars', jwt.length >= 32, `length=${jwt.length}`);

  const refresh = env.REFRESH_TOKEN_SECRET || '';
  record('env', 'REFRESH_TOKEN_SECRET present', refresh.length > 0, `length=${refresh.length}`);

  // AUDIT_HASH_SALT is optional but recommended (H.3 falls back to JWT_SECRET if missing)
  const salt = env.AUDIT_HASH_SALT;
  record('env',
    'AUDIT_HASH_SALT set (optional — falls back to JWT_SECRET if absent)',
    true,
    salt ? `present (len=${salt.length})` : 'absent — H.3 will use JWT_SECRET as fallback'
  );

  // SSL paths exist if production with HTTPS
  if (env.SSL_KEY_PATH) {
    const keyPath = path.isAbsolute(env.SSL_KEY_PATH) ? env.SSL_KEY_PATH : path.join(ROOT, env.SSL_KEY_PATH);
    const certPath = path.isAbsolute(env.SSL_CERT_PATH || '') ? env.SSL_CERT_PATH : path.join(ROOT, env.SSL_CERT_PATH || '');
    // Existence is a soft check — files may live only on prod
    const keyHere = fs.existsSync(keyPath);
    const certHere = fs.existsSync(certPath);
    record('env',
      'SSL_KEY_PATH / SSL_CERT_PATH present in .env',
      true,
      `key_here=${keyHere}, cert_here=${certHere} (OK if files only on prod)`
    );
  }
}

// ============================================================
// 2) Syntax check on all H.* edited files
// ============================================================
banner('2) Syntax check — node --check (all 9 Phase H files)');

const FILES_TO_CHECK = [
  // H.2
  'server/routes/er.js',
  // H.3
  'server/middleware/audit.js',
  // H.4
  'server/cache/staleCache.js',
  'server/db/mysql.js',
  // H.4 + H.6 (3 still-in-ER fixes)
  'server/server.js',
  // H.6
  'server/socket.js',
  'server/ai/clinicalIntelligence.js',
  'server/db/materializedViews.js',
  'server/routes/kpiExtended.js',
];

for (const rel of FILES_TO_CHECK) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) {
    record('syntax', rel, false, 'FILE MISSING');
    continue;
  }
  const r = spawnSync(process.execPath, ['--check', abs], { encoding: 'utf-8' });
  if (r.status === 0) {
    record('syntax', rel, true);
  } else {
    record('syntax', rel, false, (r.stderr || r.stdout || '').split('\n')[0]);
  }
}

// ============================================================
// 3) Verify probes — H.2 + H.6
// ============================================================
banner('3) Verify probes (against live HOSxP)');

const PROBES = [
  { name: 'H.2 — ER admission outcome-based', script: 'scripts/verify-phase-h2-er-admit.mjs' },
  { name: 'H.3 — HN hash unit (deterministic + salted)', script: 'scripts/verify-phase-h3-hash-unit.mjs' },
  { name: 'H.6 — er_dch_type sweep (4 patterns)', script: 'scripts/verify-phase-h6-er-dch-type-sweep.mjs' },
];

for (const probe of PROBES) {
  const abs = path.join(ROOT, probe.script);
  if (!fs.existsSync(abs)) {
    record('probe', probe.name, false, `script missing: ${probe.script}`);
    continue;
  }
  console.log(`  ▶ running ${probe.script} ...`);
  const r = spawnSync(process.execPath, [abs], {
    encoding: 'utf-8',
    cwd: ROOT,
    timeout: 60000,
  });
  const out = (r.stdout || '') + (r.stderr || '');
  const passed = r.status === 0;
  // Extract X/Y from "X/Y checks passed" if present
  const m = out.match(/(\d+)\/(\d+)\s+checks?\s+passed/i);
  const detail = m ? `${m[1]}/${m[2]} checks` : (passed ? 'exit 0' : `exit ${r.status}`);
  record('probe', probe.name, passed, detail);
}

// ============================================================
// 4) Static checks — grep-level guarantees on code shape
// ============================================================
banner('4) Static checks — code-shape guarantees');

function fileContains(rel, pattern) {
  const abs = path.join(ROOT, rel);
  if (!fs.existsSync(abs)) return null;
  const content = fs.readFileSync(abs, 'utf-8');
  return pattern instanceof RegExp ? pattern.test(content) : content.includes(pattern);
}

// 4.1 — cache-audit route is gated by authorize('admin')
{
  const txt = fs.existsSync(path.join(ROOT, 'server/server.js'))
    ? fs.readFileSync(path.join(ROOT, 'server/server.js'), 'utf-8')
    : '';
  // Look for route definition with authorize('admin') in same statement
  const re = /app\.get\(\s*['"]\/api\/system\/cache-audit['"]\s*,\s*authorize\(\s*['"]admin['"]\s*\)/;
  record('static', 'H.4: /api/system/cache-audit gated by authorize(\'admin\')', re.test(txt));
}

// 4.2 — audit.js exports hashPatientId (H.3 verify probe imports it)
{
  const ok = fileContains('server/middleware/audit.js', /export\s+function\s+hashPatientId/);
  record('static', 'H.3: audit.js exports hashPatientId function', !!ok);
}

// 4.3 — er.js admission count uses an_stat join (H.2)
{
  const txt = fs.existsSync(path.join(ROOT, 'server/routes/er.js'))
    ? fs.readFileSync(path.join(ROOT, 'server/routes/er.js'), 'utf-8')
    : '';
  // Cache key bumped + both pieces of an_stat join present in /today block.
  // Check by isolating the /today route body (200 lines after the cached() declaration).
  const cacheKeyOk = txt.includes("'erToday_v3_admit_outcome'") || txt.includes('"erToday_v3_admit_outcome"');
  record('static', 'H.2: er.js /today cache key bumped to _v3_admit_outcome', cacheKeyOk);

  const todayIdx = txt.indexOf('erToday_v3_admit_outcome');
  const todayBlock = todayIdx > -1 ? txt.slice(todayIdx, todayIdx + 2500) : '';
  const hasAdmitExpr = todayBlock.includes('an.an IS NOT NULL');
  const hasJoin = /LEFT JOIN an_stat an\b/.test(todayBlock);
  record('static', 'H.2: er.js /today admission uses an_stat JOIN + an.an IS NOT NULL',
    hasAdmitExpr && hasJoin,
    `join=${hasJoin}, expr=${hasAdmitExpr}`);
}

// 4.4 — kpiExtended.js cache key bumped (H.6)
{
  const txt = fs.existsSync(path.join(ROOT, 'server/routes/kpiExtended.js'))
    ? fs.readFileSync(path.join(ROOT, 'server/routes/kpiExtended.js'), 'utf-8')
    : '';
  record('static', 'H.6: kpiExtended.js cache key bumped to kpi_er_ops_v2_outcome',
    txt.includes('kpi_er_ops_v2_outcome'));
}

// 4.5 — no remaining `er_dch_type = '1'` or `= '2'` patterns outside comments + DQ monitor
{
  const grepFiles = [
    'server/routes/er.js',
    'server/routes/kpiExtended.js',
    'server/ai/clinicalIntelligence.js',
    'server/db/materializedViews.js',
    'server/server.js',
    'server/socket.js',
  ];
  // Strip JS line comments + block comments + SQL `-- ...` comments before grep.
  const stripComments = (s) => s
    .replace(/\/\*[\s\S]*?\*\//g, '')      // /* ... */ block comments
    .replace(/(^|[^:])\/\/[^\n]*/g, '$1')  // // line comments (avoid http://)
    .replace(/--[^\n]*/g, '');             // SQL -- comments

  const calcRe = /er_dch_type\s*(=|<>|IN)\s*\(?\s*['"]/;
  let bug = null;
  for (const rel of grepFiles) {
    const abs = path.join(ROOT, rel);
    if (!fs.existsSync(abs)) continue;
    const raw = fs.readFileSync(abs, 'utf-8');
    const stripped = stripComments(raw);
    if (calcRe.test(stripped)) { bug = rel; break; }
  }
  record('static', 'No `er_dch_type = "X"` calculation patterns remain in fixed files (comments excluded)', !bug, bug ? `still in ${bug}` : 'clean');
}

// ============================================================
// 5) Files-to-deploy list (for the operator)
// ============================================================
banner('5) Files-to-deploy (scp these to /opt/bch360/...)');

const DEPLOY_FILES = [
  ...FILES_TO_CHECK,
  'scripts/verify-phase-h2-er-admit.mjs',
  'scripts/verify-phase-h3-hash-unit.mjs',
  'scripts/verify-phase-h6-er-dch-type-sweep.mjs',
  'scripts/verify-phase-h4-admin-gate.mjs',
  'scripts/preflight-phase-h.mjs',
];

let totalBytes = 0;
for (const rel of DEPLOY_FILES) {
  const abs = path.join(ROOT, rel);
  if (fs.existsSync(abs)) {
    const stat = fs.statSync(abs);
    totalBytes += stat.size;
    console.log(`  📦 ${rel.padEnd(50)} ${(stat.size / 1024).toFixed(1).padStart(7)} KB`);
  }
}
console.log(`\n  Total: ${DEPLOY_FILES.length} files, ${(totalBytes / 1024).toFixed(1)} KB`);

// ============================================================
// 6) Verdict
// ============================================================
banner('6) VERDICT');

const failed = checks.filter(c => !c.ok);
const bySection = (s) => {
  const sub = checks.filter(c => c.section === s);
  const pass = sub.filter(c => c.ok).length;
  return `${pass}/${sub.length}`;
};

console.log('');
console.log(`  Section 1 (.env audit):    ${bySection('env')}`);
console.log(`  Section 2 (syntax):        ${bySection('syntax')}`);
console.log(`  Section 3 (verify probes): ${bySection('probe')}`);
console.log(`  Section 4 (static checks): ${bySection('static')}`);
console.log('');

if (failed.length === 0) {
  console.log('  ✅ ALL CHECKS PASSED — safe to deploy Phase H.2–H.6');
  console.log('  ▶ Next: follow docs/phase-h-deployment-runbook.md → Step 2 (scp)');
  console.log('  ▶ AFTER deploy: run scripts/verify-phase-h4-admin-gate.mjs (admin-gate smoke)');
  process.exit(0);
} else {
  console.log(`  ❌ ${failed.length} CHECK(S) FAILED — DO NOT DEPLOY`);
  console.log('');
  console.log('  Failing checks:');
  for (const f of failed) {
    console.log(`    - [${f.section}] ${f.name}  ${f.detail || ''}`);
  }
  console.log('');
  console.log('  ⚠️  Action: resolve each failing check, then re-run this script.');
  console.log('');
  const envFails = failed.filter(f => f.section === 'env');
  if (envFails.length > 0) {
    console.log('  📝 .env failures mean PROD .env still needs Phase H.1 changes:');
    console.log('     1. ssh root@10.109.0.33');
    console.log('     2. Edit /opt/bch360/.env:');
    console.log('        - uncomment  NODE_ENV=production');
    console.log('        - remove or comment out DISABLE_AUTH=true');
    console.log('        - add        AUDIT_HASH_SALT=<32-byte hex>   (optional but recommended)');
    console.log('     3. docker restart bch360');
    console.log('     4. Copy prod .env back to dev for verification:');
    console.log('        scp root@10.109.0.33:/opt/bch360/.env /tmp/prod-env');
    console.log('     5. Re-run:  node scripts/preflight-phase-h.mjs --env-path=/tmp/prod-env');
  }
  process.exit(1);
}
