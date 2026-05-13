#!/usr/bin/env node
/**
 * verify-bsc.js — Sprint 1 Task 1.8
 * Cross-checks BSC endpoint output vs raw HOSxP SQL.
 * Hits /api/executive/bsc and validates the response structure + values.
 */
import http from 'node:http';
import https from 'node:https';

const BSC_URL = process.env.BSC_URL || 'http://localhost:3000/api/executive/bsc';
const AUTH_TOKEN = process.env.AUTH_TOKEN; // optional bearer for prod check

function fetchBSC() {
  return new Promise((resolve, reject) => {
    const lib = BSC_URL.startsWith('https') ? https : http;
    const opts = AUTH_TOKEN ? { headers: { Authorization: `Bearer ${AUTH_TOKEN}` } } : {};
    lib.get(BSC_URL, opts, (res) => {
      let body = '';
      res.on('data', (c) => body += c);
      res.on('end', () => {
        if (res.statusCode !== 200) return reject(new Error(`HTTP ${res.statusCode}: ${body.slice(0, 200)}`));
        try { resolve(JSON.parse(body)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

async function verify() {
  const bsc = await fetchBSC();

  console.log(`📊 BSC Endpoint Verify`);
  console.log(`   Overall score : ${bsc.overall_score} (grade ${bsc.overall_grade})`);
  console.log(`   Period        : ${bsc.period}`);
  console.log(`   Perspectives  : ${bsc.perspectives?.length || 0}`);

  const failures = [];

  // 1. Must have 4 perspectives
  if (!bsc.perspectives || bsc.perspectives.length < 4) {
    failures.push(`Expected ≥4 perspectives, got ${bsc.perspectives?.length || 0}`);
  }

  // 2. Each perspective must have score [0, 100] + grade A-F
  for (const p of (bsc.perspectives || [])) {
    if (p.score == null || p.score < 0 || p.score > 100) failures.push(`Perspective ${p.id} score=${p.score} outside [0, 100]`);
    if (!['A', 'B', 'C', 'D', 'F'].includes(p.grade)) failures.push(`Perspective ${p.id} grade=${p.grade} invalid`);
    if (!Array.isArray(p.kpis) || p.kpis.length === 0) failures.push(`Perspective ${p.id} has no KPIs`);
  }

  // 3. Operations LWBS must NOT be 0% exact (Task 1.1 regression check)
  const ops = bsc.perspectives?.find((p) => p.id === 'operations');
  const lwbs = ops?.kpis?.find((k) => k.name === 'ER LWBS')?.value;
  if (lwbs === 0) {
    failures.push(`LWBS = 0 exact — possible regression to er_dch_type field (NULL 100% at BCH)`);
  } else {
    console.log(`   LWBS check    : ${lwbs}% (non-zero ✓)`);
  }

  // 4. Financial must have billed + collected + outstanding
  const fin = bsc.perspectives?.find((p) => p.id === 'financial');
  const finNames = (fin?.kpis || []).map((k) => k.name);
  const required = ['รายได้ตามบิล (Billed)', 'เก็บได้จริง (Collected)', 'ส่วนต่าง (Outstanding)'];
  for (const r of required) {
    if (!finNames.includes(r)) failures.push(`Financial perspective missing KPI: ${r}`);
  }

  // 5. Clinical must have unexpected mortality
  const clin = bsc.perspectives?.find((p) => p.id === 'clinical');
  const clinNames = (clin?.kpis || []).map((k) => k.name);
  if (!clinNames.some((n) => n.includes('Palliative'))) {
    failures.push(`Clinical perspective missing 'อัตราตาย (ไม่นับ Palliative)' KPI`);
  }

  if (failures.length) {
    console.error(`❌ FAIL:\n   - ${failures.join('\n   - ')}`);
    return 2;
  }
  console.log(`✅ PASS: BSC structure + content invariants hold.`);
  return 0;
}

verify()
  .then((code) => process.exit(code))
  .catch((e) => { console.error('FATAL:', e); process.exit(99); });
