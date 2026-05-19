#!/usr/bin/env node
// scripts/promote-bundle.mjs
//
// Promote whatever was last synced to dev → prod container.
// Reads .sync-state.json from sync-to-dev.mjs to know which files to promote.
//
// Usage:
//   npm run promote:bundle -- "<commit message>"
//
// Steps per file:
//   docker cp /opt/bch360-dev/<remote> bch360:/app/<same-path>
// Then commit container → tag image as test-YYYYMMDD-HHMM-<slug> + safe + stable + latest
// Restart prod container if any backend file was promoted

import { execSync } from 'node:child_process';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const REMOTE = 'root@10.109.0.33';
const PROD_CONTAINER = 'bch360';
const DEV_BASE = '/opt/bch360-dev';
const PROD_APP = '/app';
const STATE_FILE = '.sync-state.json';
const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');

const msg = process.argv.slice(2).join(' ').trim();
if (!msg) {
  console.error('Usage: npm run promote:bundle -- "<commit message>"');
  console.error('Example: npm run promote:bundle -- "fix doctor activity dentist line"');
  process.exit(1);
}

const statePath = resolve(ROOT, STATE_FILE);
if (!existsSync(statePath)) {
  console.error(`No .sync-state.json found. Run \`npm run sync:dev\` first.`);
  process.exit(1);
}

const state = JSON.parse(readFileSync(statePath, 'utf8'));
if (!state.files?.length) {
  console.error(`.sync-state.json has no files. Nothing to promote.`);
  process.exit(1);
}

console.log(`State from ${state.lastSync}`);
console.log(`Promoting ${state.files.length} file(s):`);
state.files.forEach(f => console.log(`  ${f.kind.padEnd(15)} ${f.local}`));
console.log('');

function ssh(cmd, { stdio = 'inherit' } = {}) {
  return execSync(`ssh ${REMOTE} ${JSON.stringify(cmd)}`, { stdio });
}

function sshCapture(cmd) {
  return execSync(`ssh ${REMOTE} ${JSON.stringify(cmd)}`, { encoding: 'utf8' }).trim();
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40);
}

function pad(n) { return String(n).padStart(2, '0'); }

function timestamp() {
  const d = new Date();
  return `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}-${pad(d.getHours())}${pad(d.getMinutes())}`;
}

async function main() {
  const tag = `test-${timestamp()}-${slug(msg)}`;
  let needsRestart = false;

  // 1. docker cp each file from dev path → prod container path
  for (const f of state.files) {
    // f.remote is like /opt/bch360-dev/server/routes/foo.js
    // map to /app/server/routes/foo.js
    const prodPath = PROD_APP + f.remote.slice(DEV_BASE.length);
    console.log(`→ docker cp ${f.remote}  →  ${PROD_CONTAINER}:${prodPath}`);
    ssh(`docker cp ${f.remote} ${PROD_CONTAINER}:${prodPath}`);
    if (f.kind === 'backend') needsRestart = true;
  }

  // 2. Restart prod if any backend file
  if (needsRestart) {
    console.log(`\n→ docker restart ${PROD_CONTAINER}`);
    ssh(`docker restart ${PROD_CONTAINER}`);
    console.log(`  waiting 6s for boot...`);
    await new Promise(r => setTimeout(r, 6000));
  }

  // 3. Commit + tag
  console.log(`\n→ docker commit ${PROD_CONTAINER} ${PROD_CONTAINER}:${tag}`);
  const imageId = sshCapture(`docker commit ${PROD_CONTAINER} ${PROD_CONTAINER}:${tag}`);
  const shortId = imageId.replace(/^sha256:/, '').slice(0, 12);
  console.log(`  image: ${shortId}`);

  for (const t of ['safe', 'stable', 'latest']) {
    ssh(`docker tag ${PROD_CONTAINER}:${tag} ${PROD_CONTAINER}:${t}`);
    console.log(`  tagged ${t}`);
  }

  // 4. Health check
  console.log(`\n→ health check (prod)`);
  try {
    const code = sshCapture(`curl -sk https://localhost:4001/api/health -o /dev/null -w '%{http_code}'`);
    const indexCode = sshCapture(`curl -sk https://localhost:4001/ -o /dev/null -w '%{http_code}'`);
    console.log(`  /api/health → HTTP ${code} ${code === '401' ? '(auth required, alive ✓)' : code === '200' ? '✓' : '⚠'}`);
    console.log(`  /           → HTTP ${indexCode} ${indexCode === '200' ? '✓' : '⚠'}`);
  } catch (e) {
    console.log(`  ⚠ health check failed: ${e.message}`);
  }

  console.log(`\n✓ Promoted to prod`);
  console.log(`  Image:    ${PROD_CONTAINER}:${tag} (${shortId})`);
  console.log(`  Tags:     safe + stable + latest`);
  console.log(`  Live:     https://10.109.0.33:4001/`);
  console.log(`  Rollback: npm run rollback:bundle -- ${PROD_CONTAINER}:<previous-tag>`);
}

main().catch(e => {
  console.error(`\n✗ promote failed: ${e.message}`);
  process.exit(1);
});
