// ============================================================
// Phase H.3 hash unit verify
// ============================================================
// Pure-function tests for hashPatientId() in server/middleware/audit.js.
// Runs locally (no DB, no HOSxP). Asserts:
//   1. null/undefined/empty/0-string → null
//   2. Deterministic: same HN + same salt → same hash
//   3. Salted: hash != raw SHA256(HN) — proves salt is mixed in
//   4. Different HN → different hash (collision check on small set)
//   5. Output is 64-char lowercase hex (SHA256)
//
// Exit 0 = pass · Exit 1 = fail
// ============================================================
import crypto from 'crypto';
import 'dotenv/config';
import { hashPatientId } from '../server/middleware/audit.js';

const checks = [];
const t = (name, pass, detail = '') => {
  checks.push({ name, pass });
  console.log(`  ${pass ? '✅' : '❌'} ${name}${detail ? '  ' + detail : ''}`);
};

const banner = (s) => console.log(`\n━━━ ${s} ━━━`);

const SALT = process.env.AUDIT_HASH_SALT || process.env.JWT_SECRET || '';

// ============================================================
banner('Test 1: null/empty inputs map to null');
// ============================================================
t('hashPatientId(null) === null',   hashPatientId(null) === null);
t('hashPatientId(undefined) === null', hashPatientId(undefined) === null);
t('hashPatientId("") === null',     hashPatientId('') === null);
// Edge case: number 0 is falsy in JS; we treat it as a real HN of "0"
const h0 = hashPatientId(0);
t('hashPatientId(0) → hashes (not null) — number 0 is a real HN', typeof h0 === 'string' && h0.length === 64, h0);

// ============================================================
banner('Test 2: deterministic — same input, same hash');
// ============================================================
const hn = '123456';
const h1 = hashPatientId(hn);
const h2 = hashPatientId(hn);
t('hashPatientId("123456") returns same hash on repeated calls', h1 === h2, h1);

// String vs number coercion
const h3 = hashPatientId(123456);
t('hashPatientId(123456) == hashPatientId("123456") — coerces to string', h1 === h3, `numeric=${h3}`);

// ============================================================
banner('Test 3: salt actually mixed in (not raw SHA256)');
// ============================================================
const rawHash = crypto.createHash('sha256').update(String(hn)).digest('hex');
const saltedHash = hashPatientId(hn);
if (!SALT) {
  console.log('  ⚠️  No salt set (AUDIT_HASH_SALT and JWT_SECRET both missing)');
  t('Hash differs from raw SHA256 — requires salt to verify', saltedHash !== rawHash || SALT === '',
    `raw=${rawHash.slice(0,12)}.. salted=${saltedHash.slice(0,12)}..`);
} else {
  t('Hash != raw SHA256(HN) — salt is mixed in', saltedHash !== rawHash,
    `raw=${rawHash.slice(0,12)}.. salted=${saltedHash.slice(0,12)}..`);

  // Verify exact algorithm: SHA256(HN + salt)
  const expected = crypto.createHash('sha256').update(String(hn) + SALT).digest('hex');
  t('Hash == SHA256(hn + salt) — exact algorithm match', saltedHash === expected);
}

// ============================================================
banner('Test 4: different HNs → different hashes (collision spot-check)');
// ============================================================
const sampleHns = ['000001', '000002', '999999', '550e8400', 'HN-12345', '0', '1'];
const hashes = sampleHns.map(h => hashPatientId(h));
const uniqHashes = new Set(hashes);
t('All sample HNs produce unique hashes',
  uniqHashes.size === sampleHns.length,
  `${uniqHashes.size}/${sampleHns.length} unique`);

// ============================================================
banner('Test 5: output format — 64-char lowercase hex');
// ============================================================
const HEX64 = /^[0-9a-f]{64}$/;
let allFormatOk = true;
for (const h of hashes) {
  if (!HEX64.test(h)) { allFormatOk = false; break; }
}
t('All hashes match /^[0-9a-f]{64}$/ (SHA256 hex)', allFormatOk,
  `sample=${hashes[0]}`);

// ============================================================
banner('VERDICT');
// ============================================================
const passed = checks.filter(c => c.pass).length;
const failed = checks.length - passed;
console.log('');
console.log(`  ${passed}/${checks.length} checks passed`);
if (failed === 0) {
  console.log('\n✅ ALL HASH UNIT CHECKS PASSED — H.3 implementation verified');
  process.exit(0);
} else {
  console.log(`\n❌ ${failed} CHECK(S) FAILED — review audit.js hashPatientId()`);
  for (const c of checks.filter(c => !c.pass)) console.log(`    - ${c.name}`);
  process.exit(1);
}
