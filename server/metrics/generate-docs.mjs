#!/usr/bin/env node
// ============================================================
// Metric Registry — auto-generate docs/metrics/index.html
// Run: node server/metrics/generate-docs.mjs
// ============================================================
import { writeFileSync, mkdirSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { listMetrics } from './index.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..', '..');
const OUT_DIR = resolve(ROOT, 'docs', 'metrics');
const OUT_FILE = resolve(OUT_DIR, 'index.html');

const metrics = await listMetrics();

const html = `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<title>BCH 360° — Metric Registry</title>
<style>
  body { font-family: Inter, 'Noto Sans Thai', system-ui, sans-serif; max-width: 1200px; margin: 2em auto; padding: 0 1em; color: #1e293b; line-height: 1.6; }
  h1 { color: #7c3aed; }
  table { width: 100%; border-collapse: collapse; margin-top: 1em; }
  th { background: #f5f3ff; color: #5b21b6; text-align: left; padding: .75em; border-bottom: 2px solid #c4b5fd; }
  td { padding: .75em; border-bottom: 1px solid #e2e8f0; vertical-align: top; }
  .id { font-family: 'JetBrains Mono', monospace; font-size: .9em; color: #475569; }
  .owner { color: #64748b; font-size: .9em; }
  .target { font-weight: 600; color: #10b981; }
  .desc-th { color: #334155; }
  .reviewed { font-family: monospace; color: #64748b; }
  footer { margin-top: 2em; color: #94a3b8; font-size: .9em; }
</style>
</head>
<body>
<h1>📊 BCH 360° — Metric Registry</h1>
<p>ทะเบียน KPI กลางของระบบ <strong>${metrics.length}</strong> ตัว — ค่านิยามเดียว สูตรเดียว ที่เดียว.</p>
<table>
  <thead>
    <tr>
      <th>ID</th>
      <th>ป้าย (TH/EN)</th>
      <th>หน่วย</th>
      <th>Target</th>
      <th>เจ้าของ</th>
      <th>Reviewed</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
${metrics.map(m => `    <tr>
      <td class="id">${m.id}</td>
      <td><strong>${m.label?.th || ''}</strong><br><span class="owner">${m.label?.en || ''}</span></td>
      <td>${m.unit || ''}</td>
      <td class="target">${m.target ?? '—'}</td>
      <td class="owner">${m.owner || '—'}</td>
      <td class="reviewed">${m.reviewed || '—'}</td>
      <td class="desc-th">${m.description?.th || ''}</td>
    </tr>`).join('\n')}
  </tbody>
</table>
<footer>Generated ${new Date().toISOString()} • bch-360-expert/references/architecture.md • bch-analytics-engineer/SKILL.md</footer>
</body>
</html>`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_FILE, html, 'utf8');
console.log(`Wrote ${metrics.length} metrics → ${OUT_FILE}`);
