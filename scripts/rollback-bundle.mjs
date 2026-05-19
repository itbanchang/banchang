#!/usr/bin/env node
// scripts/rollback-bundle.mjs
//
// Rollback prod container to a previous image tag.
// Lists recent bch360 image tags + lets user pick (or pass tag as arg).
//
// Usage:
//   npm run rollback:bundle              # interactive list
//   npm run rollback:bundle -- bch360:test-20260519-xxx
//   npm run rollback:bundle -- test-20260519-xxx   (bch360: prefix optional)
//
// Steps:
//   1. ssh docker tag <selected> bch360:stable + safe + latest
//   2. ssh docker stop bch360 + rm + run from new stable
//      (host-network + bind mounts preserved)
//   3. Verify health

import { execSync } from 'node:child_process';
import readline from 'node:readline';

const REMOTE = 'root@10.109.0.33';
const PROD_CONTAINER = 'bch360';

function ssh(cmd, { stdio = 'inherit' } = {}) {
  return execSync(`ssh ${REMOTE} ${JSON.stringify(cmd)}`, { stdio });
}

function sshCapture(cmd) {
  return execSync(`ssh ${REMOTE} ${JSON.stringify(cmd)}`, { encoding: 'utf8' });
}

function listTags() {
  // newest first, exclude the rolling tags (stable/safe/latest)
  const out = sshCapture(`docker images ${PROD_CONTAINER} --format '{{.Tag}}|{{.ID}}|{{.CreatedSince}}|{{.Size}}'`);
  return out.split('\n')
    .filter(l => l.trim())
    .map(l => {
      const [tag, id, age, size] = l.split('|');
      return { tag, id, age, size };
    })
    .filter(t => !['stable', 'safe', 'latest', '<none>'].includes(t.tag))
    .slice(0, 15);
}

async function pickTag() {
  const tags = listTags();
  if (tags.length === 0) {
    console.error('No tags available.');
    process.exit(1);
  }

  console.log('\nRecent bch360 image tags:');
  console.log('  #  TAG'.padEnd(50) + 'AGE'.padEnd(20) + 'IMAGE ID    SIZE');
  console.log('  ' + '-'.repeat(94));
  tags.forEach((t, i) => {
    const num = String(i + 1).padStart(2);
    console.log(`  ${num} ${t.tag.padEnd(48)}${t.age.padEnd(20)}${t.id}  ${t.size}`);
  });

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const answer = await new Promise(r => rl.question('\nPick # to rollback to (or `q` to abort): ', r));
  rl.close();

  if (answer.trim().toLowerCase() === 'q') {
    console.log('Aborted.');
    process.exit(0);
  }
  const idx = parseInt(answer, 10) - 1;
  if (Number.isNaN(idx) || idx < 0 || idx >= tags.length) {
    console.error(`Invalid choice: ${answer}`);
    process.exit(1);
  }
  return tags[idx].tag;
}

async function confirm(message) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  const ans = await new Promise(r => rl.question(`${message} [y/N] `, r));
  rl.close();
  return ans.trim().toLowerCase() === 'y' || ans.trim().toLowerCase() === 'yes';
}

async function main() {
  let arg = process.argv.slice(2).join(' ').trim();
  if (arg.startsWith(`${PROD_CONTAINER}:`)) arg = arg.slice(PROD_CONTAINER.length + 1);

  let tag;
  if (arg) {
    tag = arg;
    console.log(`Target tag: ${PROD_CONTAINER}:${tag}`);
  } else {
    tag = await pickTag();
    console.log(`Selected: ${PROD_CONTAINER}:${tag}`);
  }

  // Verify tag exists
  try {
    sshCapture(`docker image inspect ${PROD_CONTAINER}:${tag} --format '{{.Id}}'`);
  } catch (e) {
    console.error(`✗ Image ${PROD_CONTAINER}:${tag} not found on remote`);
    process.exit(1);
  }

  // Capture current state as a safety snapshot before clobbering
  const currentId = sshCapture(`docker image inspect ${PROD_CONTAINER}:stable --format '{{.Id}}'`)
                    .trim().replace(/^sha256:/, '').slice(0, 12);
  const safetyTag = `rollback-from-${new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '').slice(0, 13)}`;
  console.log(`\nSafety snapshot: tagging current stable (${currentId}) as ${PROD_CONTAINER}:${safetyTag}`);

  const ok = await confirm(`\nProceed: rollback to ${PROD_CONTAINER}:${tag}?`);
  if (!ok) {
    console.log('Aborted.');
    process.exit(0);
  }

  ssh(`docker tag ${PROD_CONTAINER}:stable ${PROD_CONTAINER}:${safetyTag}`);
  console.log(`  ✓ safety tag ${safetyTag} created`);

  // Re-tag target as stable/safe/latest
  for (const t of ['stable', 'safe', 'latest']) {
    ssh(`docker tag ${PROD_CONTAINER}:${tag} ${PROD_CONTAINER}:${t}`);
  }
  console.log(`  ✓ ${tag} now tagged as stable + safe + latest`);

  // Recreate container from new image
  console.log(`\n→ recreate ${PROD_CONTAINER} container from new stable`);
  ssh(`docker stop ${PROD_CONTAINER} && docker rm ${PROD_CONTAINER}`);
  ssh(`docker run -d --name ${PROD_CONTAINER} --network host --restart unless-stopped \\
       -v /opt/bch360/data_lake:/app/data_lake \\
       -v /opt/bch360/logs:/app/logs \\
       -v /opt/bch360/.env:/app/.env \\
       ${PROD_CONTAINER}:stable`);
  console.log(`  waiting 8s for boot...`);
  await new Promise(r => setTimeout(r, 8000));

  // Health check
  console.log(`\n→ health check`);
  try {
    const code = sshCapture(`curl -sk https://localhost:4001/api/health -o /dev/null -w '%{http_code}'`).trim();
    const indexCode = sshCapture(`curl -sk https://localhost:4001/ -o /dev/null -w '%{http_code}'`).trim();
    console.log(`  /api/health → HTTP ${code} ${code === '401' ? '(alive ✓)' : code === '200' ? '✓' : '⚠'}`);
    console.log(`  /           → HTTP ${indexCode} ${indexCode === '200' ? '✓' : '⚠'}`);
  } catch (e) {
    console.log(`  ⚠ health check failed: ${e.message}`);
  }

  console.log(`\n✓ Rolled back to ${PROD_CONTAINER}:${tag}`);
  console.log(`  Previous state preserved as: ${PROD_CONTAINER}:${safetyTag}`);
  console.log(`  To undo this rollback:   npm run rollback:bundle -- ${safetyTag}`);
}

main().catch(e => {
  console.error(`\n✗ rollback failed: ${e.message}`);
  process.exit(1);
});
