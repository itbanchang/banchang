#!/usr/bin/env node
// ============================================================
// AI Eval Runner — CLI entry
// Usage: node eval/runners/index.js [--module=<id>]
//        npm run eval
//        npm run eval -- --module=news2
// ============================================================
import 'dotenv/config';
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPORTS_DIR = resolve(__dirname, '..', 'reports');

const RUNNERS = {
    readmission:     () => import('./readmission.js').then(m => m.run()),
    news2:           () => import('./news2.js').then(m => m.run()),
    revenueForecast: () => import('./revenueForecast.js').then(m => m.run()),
    bedDemand:       () => import('./bedDemand.js').then(m => m.run()),
    drgOptimizer:    () => import('./drgOptimizer.js').then(m => m.run()),
    erSurge:         () => import('./erSurge.js').then(m => m.run()),
    losPredictor:    () => import('./losPredictor.js').then(m => m.run()),
    billingAnomaly:  () => import('./billingAnomaly.js').then(m => m.run()),
    erAdmission:     () => import('./erAdmission.js').then(m => m.run()),
    erWaitTime:      () => import('./erWaitTime.js').then(m => m.run()),
    underCharging:   () => import('./underCharging.js').then(m => m.run()),
};

const args = process.argv.slice(2);
const moduleArg = args.find(a => a.startsWith('--module='))?.split('=')[1];
const toRun = moduleArg ? [moduleArg] : Object.keys(RUNNERS);

console.log(`🧪 Running ${toRun.length} eval${toRun.length > 1 ? 's' : ''}: ${toRun.join(', ')}\n`);

const report = { ts: new Date().toISOString(), runs: {} };
let hadFailure = false;

for (const id of toRun) {
    if (!RUNNERS[id]) {
        console.error(`✗ unknown module: ${id}`);
        hadFailure = true;
        continue;
    }
    process.stdout.write(`▸ ${id}... `);
    try {
        const result = await RUNNERS[id]();
        report.runs[id] = { ok: true, ...result };
        const status = result.pass === true ? '✅ PASS' : result.pass === false ? '❌ FAIL' : '○ n/a';
        console.log(status);
        if (result.note) console.log(`  ${result.note}`);
        if (result.metrics) {
            const compact = Object.entries(result.metrics).map(([k, v]) => {
                if (typeof v === 'object' && v !== null) return `${k}=${JSON.stringify(v)}`;
                return `${k}=${v}`;
            }).join(' ');
            console.log(`  ${compact}`);
        }
        if (result.error) console.log(`  error: ${result.error}`);
        if (result.pass === false && !result.error) hadFailure = true;
    } catch (err) {
        report.runs[id] = { ok: false, error: err.message };
        console.log(`✗ ${err.message}`);
        hadFailure = true;
    }
    console.log();
}

mkdirSync(REPORTS_DIR, { recursive: true });
const reportFile = resolve(REPORTS_DIR, `${Date.now()}.json`);
writeFileSync(reportFile, JSON.stringify(report, null, 2), 'utf8');
console.log(`📄 Report → ${reportFile}`);

process.exit(hadFailure ? 1 : 0);
