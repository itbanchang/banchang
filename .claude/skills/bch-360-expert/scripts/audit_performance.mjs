#!/usr/bin/env node
// ============================================================
// bch-360-expert: one-shot performance + quality audit
// Usage:  node scripts/audit_performance.mjs
// Runs:   typecheck, lint, build (for bundle size), smoke test
// Reports: one-screen summary with red/yellow/green status
// ============================================================
import { spawn } from 'node:child_process';
import { statSync, readdirSync, existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = resolve(__dirname, '..', '..', '..', '..');

const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const DIM = '\x1b[2m';
const BOLD = '\x1b[1m';
const RESET = '\x1b[0m';

function icon(status) {
    if (status === 'pass') return `${GREEN}✓${RESET}`;
    if (status === 'warn') return `${YELLOW}!${RESET}`;
    return `${RED}✗${RESET}`;
}

function runCmd(cmd, args, label) {
    return new Promise((resolvePromise) => {
        const start = Date.now();
        const child = spawn(cmd, args, {
            cwd: PROJECT_ROOT,
            shell: true,
            stdio: ['ignore', 'pipe', 'pipe'],
        });
        let stdout = '';
        let stderr = '';
        child.stdout?.on('data', (d) => { stdout += d.toString(); });
        child.stderr?.on('data', (d) => { stderr += d.toString(); });
        child.on('close', (code) => {
            resolvePromise({
                label,
                code,
                stdout,
                stderr,
                ms: Date.now() - start,
            });
        });
    });
}

function formatBytes(n) {
    if (n < 1024) return `${n} B`;
    if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
    return `${(n / 1024 / 1024).toFixed(2)} MB`;
}

function scanBundle() {
    const assetsDir = join(PROJECT_ROOT, 'dist', 'assets');
    if (!existsSync(assetsDir)) return null;
    const files = readdirSync(assetsDir)
        .filter(f => f.endsWith('.js') || f.endsWith('.css'))
        .map(f => ({
            name: f,
            size: statSync(join(assetsDir, f)).size,
        }))
        .sort((a, b) => b.size - a.size);
    return files;
}

console.log(`\n${BOLD}BCH 360° — Performance & Quality Audit${RESET}\n`);
console.log(`${DIM}Running typecheck, lint, build, smoke in parallel...${RESET}\n`);

const [typecheck, lint, build] = await Promise.all([
    runCmd('npm', ['run', '--silent', 'typecheck'], 'typecheck'),
    runCmd('npm', ['run', '--silent', 'lint'], 'lint'),
    runCmd('npm', ['run', '--silent', 'build'], 'build'),
]);

// ── Typecheck ─────────────────────────────────────────────────
const tcStatus = typecheck.code === 0 ? 'pass' : 'fail';
console.log(`${icon(tcStatus)} ${BOLD}typecheck${RESET}  ${DIM}(${typecheck.ms}ms)${RESET}`);
if (tcStatus !== 'pass') {
    const tail = (typecheck.stdout + typecheck.stderr).split('\n').slice(-15).join('\n');
    console.log(`${DIM}${tail}${RESET}\n`);
}

// ── Lint ──────────────────────────────────────────────────────
const lintStatus = lint.code === 0 ? 'pass' : 'fail';
const warnMatch = lint.stdout.match(/(\d+)\s+warning/);
const errorMatch = lint.stdout.match(/(\d+)\s+error/);
const warns = warnMatch ? parseInt(warnMatch[1]) : 0;
const errors = errorMatch ? parseInt(errorMatch[1]) : 0;
console.log(`${icon(lintStatus === 'pass' && warns > 20 ? 'warn' : lintStatus)} ${BOLD}lint${RESET}       ${DIM}(${lint.ms}ms)${RESET}  ${errors} errors, ${warns} warnings`);
if (lintStatus !== 'pass') {
    const tail = lint.stdout.split('\n').slice(-10).join('\n');
    console.log(`${DIM}${tail}${RESET}\n`);
}

// ── Build + Bundle ────────────────────────────────────────────
const buildStatus = build.code === 0 ? 'pass' : 'fail';
console.log(`${icon(buildStatus)} ${BOLD}build${RESET}      ${DIM}(${build.ms}ms)${RESET}`);
if (buildStatus !== 'pass') {
    const tail = (build.stdout + build.stderr).split('\n').slice(-15).join('\n');
    console.log(`${DIM}${tail}${RESET}\n`);
}

if (buildStatus === 'pass') {
    const bundle = scanBundle();
    if (bundle && bundle.length > 0) {
        const total = bundle.reduce((s, f) => s + f.size, 0);
        const main = bundle.find(f => /^index-.*\.js$/.test(f.name));
        console.log(`\n  ${BOLD}Bundle${RESET}`);
        console.log(`    total:  ${formatBytes(total)}`);
        if (main) {
            const mainSize = main.size;
            const mainStatus = mainSize < 500 * 1024 ? 'pass' : mainSize < 800 * 1024 ? 'warn' : 'fail';
            console.log(`    main:   ${icon(mainStatus)} ${formatBytes(mainSize)}  ${DIM}(target < 500 KB)${RESET}`);
        }
        console.log(`    top 5:`);
        for (const f of bundle.slice(0, 5)) {
            console.log(`      ${f.name}  ${formatBytes(f.size)}`);
        }
    }
}

// ── Smoke test (run sequentially after build since it may need the server) ──
console.log();
const smoke = await runCmd('npm', ['run', '--silent', 'test:smoke'], 'smoke');
const smokeStatus = smoke.code === 0 ? 'pass' : 'fail';
console.log(`${icon(smokeStatus)} ${BOLD}smoke${RESET}      ${DIM}(${smoke.ms}ms)${RESET}`);
if (smokeStatus !== 'pass') {
    const tail = (smoke.stdout + smoke.stderr).split('\n').slice(-10).join('\n');
    console.log(`${DIM}${tail}${RESET}`);
}

// ── Summary ───────────────────────────────────────────────────
const all = [tcStatus, lintStatus, buildStatus, smokeStatus];
const failed = all.filter(s => s === 'fail').length;
console.log(`\n${BOLD}Summary${RESET}: ${failed === 0 ? `${GREEN}all checks passed${RESET}` : `${RED}${failed} check(s) failed${RESET}`}\n`);

if (failed === 0 && warns > 20) {
    console.log(`${YELLOW}Heads up:${RESET} ${warns} lint warnings. Target < 20.\n`);
}

process.exit(failed);
