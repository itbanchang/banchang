#!/usr/bin/env node
/**
 * run-all.js — Sprint 1 Task 1.8
 * Runs all verify-*.js scripts sequentially and reports pass/fail summary.
 * Returns non-zero if any check fails.
 *
 * Run locally:  node scripts/verify/run-all.js
 * Run in CI:    npm run verify
 */
import { spawn } from 'node:child_process';
import { readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function listVerifyScripts() {
  const files = await readdir(__dirname);
  return files.filter((f) => f.startsWith('verify-') && f.endsWith('.js')).sort();
}

function runScript(file) {
  return new Promise((resolve) => {
    const start = Date.now();
    const child = spawn('node', [join(__dirname, file)], { stdio: 'inherit' });
    child.on('exit', (code) => {
      resolve({ file, code, ms: Date.now() - start });
    });
  });
}

async function main() {
  const scripts = await listVerifyScripts();
  console.log(`\n🔍 BCH 360° Verify Suite — ${scripts.length} checks\n${'='.repeat(60)}\n`);

  const results = [];
  for (const s of scripts) {
    console.log(`\n▶ ${s}\n${'-'.repeat(60)}`);
    const r = await runScript(s);
    results.push(r);
  }

  console.log(`\n${'='.repeat(60)}\n📋 Summary\n${'='.repeat(60)}`);
  const pad = (s, n) => String(s).padEnd(n);
  for (const r of results) {
    const status = r.code === 0 ? '✅ PASS' : r.code === 1 ? '⚠️  WARN' : '❌ FAIL';
    console.log(`${status}  ${pad(r.file, 30)} (${r.ms}ms)`);
  }
  const fails = results.filter((r) => r.code !== 0 && r.code !== 1).length;
  const warns = results.filter((r) => r.code === 1).length;
  const passes = results.filter((r) => r.code === 0).length;
  console.log(`\nTotal: ${results.length}  ✅ ${passes}  ⚠️  ${warns}  ❌ ${fails}\n`);

  process.exit(fails > 0 ? 1 : 0);
}

main().catch((e) => { console.error('FATAL:', e); process.exit(99); });
