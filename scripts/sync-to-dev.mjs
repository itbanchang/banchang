#!/usr/bin/env node
// scripts/sync-to-dev.mjs
//
// Push edited file(s) from local VSCode workspace → dev container at 10.109.0.33:4003.
// Auto-detects backend vs frontend by path. Frontend assets get minified before push.
//
// Usage:
//   npm run sync:dev -- <path> [<path>...]
//
// Path conventions:
//   prod-snapshot/server/<rel>                  → backend (scp + restart)
//   server/<rel>                                → backend (scp + restart) [same target]
//   prod-snapshot/dist-reflector/assets/<name>  → frontend (minify → scp asset)
//   prod-snapshot/dist-reflector/<name>         → frontend root (scp overlay script)

import { execSync, spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync, existsSync, statSync } from 'node:fs';
import { resolve, relative, basename, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const REMOTE = 'root@10.109.0.33';
const DEV_CONTAINER = 'bch360-dev';
const DEV_BASE = '/opt/bch360-dev';
const STATE_FILE = '.sync-state.json';
const ROOT = resolve(fileURLToPath(import.meta.url), '..', '..');

const args = process.argv.slice(2).filter(a => !a.startsWith('-'));
if (args.length === 0) {
  console.error('Usage: npm run sync:dev -- <path> [<path>...]');
  console.error('');
  console.error('Examples:');
  console.error('  npm run sync:dev -- prod-snapshot/server/routes/doctorActivity.js');
  console.error('  npm run sync:dev -- prod-snapshot/dist-reflector/assets/DoctorActivityTab-DA0519x.js');
  process.exit(1);
}

function classify(p) {
  const rel = relative(ROOT, resolve(p)).replace(/\\/g, '/');
  if (!existsSync(resolve(p))) {
    throw new Error(`File not found: ${p}`);
  }
  if (rel.startsWith('prod-snapshot/server/')) {
    return { kind: 'backend', local: rel, remote: `${DEV_BASE}/server/${rel.slice('prod-snapshot/server/'.length)}` };
  }
  if (rel.startsWith('server/')) {
    return { kind: 'backend', local: rel, remote: `${DEV_BASE}/server/${rel.slice('server/'.length)}` };
  }
  if (rel.startsWith('prod-snapshot/dist-reflector/assets/')) {
    const name = rel.slice('prod-snapshot/dist-reflector/assets/'.length);
    return { kind: 'frontend-asset', local: rel, remote: `${DEV_BASE}/dist/assets/${name}` };
  }
  if (rel.startsWith('prod-snapshot/dist-reflector/')) {
    const name = rel.slice('prod-snapshot/dist-reflector/'.length);
    return { kind: 'frontend-root', local: rel, remote: `${DEV_BASE}/dist/${name}` };
  }
  throw new Error(`Cannot classify ${rel} — must be under prod-snapshot/{server,dist-reflector} or server/`);
}

function run(cmd, { stdio = 'inherit' } = {}) {
  return execSync(cmd, { stdio });
}

function scp(local, remote) {
  // Use forward slashes; ssh on Windows handles drive letters fine
  const localPosix = local.replace(/\\/g, '/');
  run(`scp -q "${localPosix}" "${REMOTE}:${remote}"`);
}

function ssh(cmd, { stdio = 'inherit' } = {}) {
  return execSync(`ssh ${REMOTE} ${JSON.stringify(cmd)}`, { stdio });
}

function minifyToTemp(localFile) {
  const tmp = `c:/tmp/sync-${Date.now()}-${basename(localFile)}`;
  // esbuild minify — keep ESM format, target es2020 to match existing bundle
  run(`npx --yes esbuild "${localFile}" --minify --format=esm --target=es2020 --outfile="${tmp}"`,
      { stdio: 'inherit' });
  return tmp;
}

async function syncOne(file) {
  const c = classify(file);
  console.log(`\n→ ${c.kind}: ${c.local}`);
  console.log(`  remote: ${c.remote}`);

  if (c.kind === 'frontend-asset') {
    // Minify locally first, then scp the minified version
    const min = minifyToTemp(resolve(ROOT, c.local));
    const sizeMin = statSync(min).size;
    const sizeBeauty = statSync(resolve(ROOT, c.local)).size;
    console.log(`  minify: ${sizeBeauty.toLocaleString()} → ${sizeMin.toLocaleString()} bytes`);
    scp(min, c.remote);
  } else {
    // Backend or frontend root (overlay scripts) — push as-is
    scp(resolve(ROOT, c.local), c.remote);
  }
  console.log(`  ✓ scp done`);
  return c;
}

async function main() {
  const synced = [];
  let needsRestart = false;

  for (const arg of args) {
    const c = await syncOne(arg);
    synced.push(c);
    if (c.kind === 'backend') needsRestart = true;
  }

  if (needsRestart) {
    console.log(`\n→ docker restart ${DEV_CONTAINER}`);
    ssh(`docker restart ${DEV_CONTAINER}`);
    console.log(`  ✓ restarted — waiting 6s for boot...`);
    await new Promise(r => setTimeout(r, 6000));
  }

  // Health check
  console.log(`\n→ health check`);
  try {
    const code = execSync(`ssh ${REMOTE} "curl -sk https://localhost:4003/api/health -o /dev/null -w '%{http_code}'"`,
                        { encoding: 'utf8' }).trim();
    console.log(`  /api/health → HTTP ${code} ${code === '401' ? '(auth required, server alive ✓)' : code === '200' ? '✓' : '⚠ unexpected'}`);
  } catch (e) {
    console.log(`  ⚠ health check failed: ${e.message}`);
  }

  // Write sync state for promote-bundle.mjs to consume
  const state = {
    lastSync: new Date().toISOString(),
    files: synced.map(c => ({ local: c.local, remote: c.remote, kind: c.kind }))
  };
  writeFileSync(resolve(ROOT, STATE_FILE), JSON.stringify(state, null, 2));
  console.log(`\n→ state saved to ${STATE_FILE}`);

  console.log(`\n✓ Synced ${synced.length} file(s) to dev`);
  console.log(`  Test:    https://10.109.0.33:4003/`);
  console.log(`  Promote: npm run promote:bundle -- "<commit message>"`);
}

main().catch(e => {
  console.error(`\n✗ sync failed: ${e.message}`);
  process.exit(1);
});
