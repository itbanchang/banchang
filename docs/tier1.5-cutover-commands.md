# Tier 1.5 Cutover — Ready-to-run Commands

> **For user supervision only.** Each step has rollback. Run on `root@10.109.0.33` unless noted.
>
> Companion to `docs/tier1.5-bundle-replacement-plan.md` (high-level 7-step plan).
> This doc has the actual shell commands.

---

## ✅ Pre-flight (verify before starting)

```bash
# On dev machine
cd "C:/BCH 360° Intelligence V.10"
git status                                        # working tree clean
git log --oneline -5                              # latest commit aa93503 visible
npm run build                                     # rebuild dist/, must succeed
ls dist/assets/ | head -10                        # 25+ files, includes vendor-react, ReportTab, xlsx
```

```bash
# On prod
ssh root@10.109.0.33 "docker ps --filter name=bch360 --format '{{.Image}} {{.Status}}'"
# Expected: bch360:stable-20260513-1546 (= 1aaccde0f577) Up X hours
```

If both green → proceed. If either red → fix first.

---

## Sprint B — Build Test Image (15 min, safe)

### Step 1: Copy build artifacts to prod

```bash
# On dev machine
TS=$(date +%Y%m%d-%H%M)
echo "TS=$TS"  # remember this — used for tag in step 3

# Create tarball of build context (server + dist + package + Dockerfile)
tar czf /tmp/bch360-tier1.5.tar.gz \
  Dockerfile docker-compose.yml package.json \
  server/ dist/ public/ scripts/ ecosystem.config.cjs

# Copy to prod
scp /tmp/bch360-tier1.5.tar.gz root@10.109.0.33:/tmp/
```

### Step 2: Build new image on prod

```bash
# On prod
ssh root@10.109.0.33
cd /opt/bch360-build && rm -rf *  # clean staging
mkdir -p /opt/bch360-build && cd /opt/bch360-build
tar xzf /tmp/bch360-tier1.5.tar.gz

TS=20260513-XXXX  # use timestamp from Step 1
docker build -t bch360:tier1.5-${TS} . 2>&1 | tail -20

# Verify build success
docker images bch360:tier1.5-${TS} --format "{{.ID}} {{.Size}} {{.CreatedAt}}"
```

**Acceptance**: Image builds without errors, size ~1-2 GB (similar to bch360:stable).

If build fails → fix npm install / vite errors → retry.

### Step 3: Blue-green deploy on port 4002 (parallel)

```bash
# On prod — start test container on different port
docker run -d \
  --name bch360-test \
  --network host \
  --restart no \
  -e PORT=4002 \
  -v /opt/bch360/data_lake:/app/data_lake \
  -v /opt/bch360/logs:/app/logs:ro \
  -v /opt/bch360/.env:/app/.env:ro \
  bch360:tier1.5-${TS}

# Wait + smoke
sleep 15
docker logs bch360-test --tail 30
curl -k -s -o /dev/null -w "Test :4002 = %{http_code}\n" https://localhost:4002/api/system/health
```

**Acceptance**: HTTP 200, no fatal errors in logs.

---

## Sprint C — UAT + Atomic Swap (varies)

### Step 4: UAT against test instance

```bash
# Open in browser: https://10.109.0.33:4002/
# Compare with prod: https://10.109.0.33:4001/

# Check these reports specifically (Tier 1.1 + 2.1-2.6 restored):
# 1. ReportTab dropdown — should have all 13 options
#    (was V1 baseline 4, now should have 7 patient-level + 4 compare + 2 PT/Staff)
# 2. ER tab — ED Mortality should show dual rate (ed_only + 24h)
# 3. Finance tab — Revenue Billed vs Collected card visible
# 4. New "🌟 กลยุทธ์" tab — should show 3 sub-tabs (Service Plan / PA / Catchment)
# 5. /api/executive/bsc — should return version: 'v8' (5 perspectives)

# Run smoke
bash /opt/bch360-build/scripts/smoke-test.sh  # adjust paths if needed
```

**Decision point**:
- 🟢 All looks good → proceed to Step 5
- 🟡 Cosmetic differences → document in `tier1.5-parity-results.md`, proceed
- 🔴 Wrong numbers / broken functionality → STOP, rollback Sprint B

### Step 5: Atomic swap (THE BIG MOMENT — 30 sec downtime)

```bash
# On prod — atomic swap
TS=20260513-XXXX
PRE_TAG=$(docker inspect bch360 -f '{{.Config.Image}}' || echo 'unknown')

# Save current stable as rollback point
docker tag $PRE_TAG bch360:pre-1.5-${TS}
echo "Pre-cutover image saved as: bch360:pre-1.5-${TS}"

# Stop both
docker stop bch360 bch360-test
docker rm bch360 bch360-test

# Start new container as the main
docker run -d \
  --name bch360 \
  --restart unless-stopped \
  --network host \
  -e PORT=4001 \
  -v /opt/bch360/data_lake:/app/data_lake \
  -v /opt/bch360/logs:/app/logs \
  -v /opt/bch360/.env:/app/.env:ro \
  bch360:tier1.5-${TS}

# Wait + verify
sleep 10
curl -k -s -o /dev/null -w "Prod :4001 = %{http_code}\n" https://localhost:4001/api/system/health

# If 200 → tag as stable
docker tag bch360:tier1.5-${TS} bch360:stable
docker tag bch360:tier1.5-${TS} bch360:stable-1.5-${TS}
docker tag bch360:tier1.5-${TS} bch360:safe
docker tag bch360:tier1.5-${TS} bch360:latest

# Verify tags
docker images bch360 --format "{{.Repository}}:{{.Tag}} {{.ID}}" | head -10
```

**Total downtime**: ~30 seconds (between docker stop and the new container being ready).

---

## Sprint D — Burn-in (24 hours)

### Step 6: Monitor

```bash
# Every 4 hours for 24 hours:
ssh root@10.109.0.33 "docker logs bch360 --since 4h 2>&1 | grep -iE 'error|fail|exception' | tail -20"

# Spot-check:
curl -k -s -c /tmp/cookie.txt -X POST https://10.109.0.33:4001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"bch@dm1n2026"}' > /dev/null
curl -k -s -b /tmp/cookie.txt https://10.109.0.33:4001/api/executive/bsc | head -c 300

# Check Director/ICN/nurse satisfaction (manual)
```

### Step 7a: Cleanup (if all good after 24h)

```bash
# Update memory
# In ~/.claude/projects/.../memory/project_prod_stable_image.md:
# Add entry: "2026-05-XX · Tier 1.5 cutover complete · bch360:tier1.5-${TS}
# Now src-built, not bundle-surgery. edit-on-prod = hotfix only."

# Verify backup tarball still exists for catastrophic restore
ls -lh /backup/bch360-pre-tier1-20260513-1523.tar.gz
```

### Step 7b: ROLLBACK (if any problem in 24h)

```bash
ssh root@10.109.0.33 << 'ROLLBACK'
TS=20260513-XXXX  # the timestamp from cutover
docker stop bch360
docker rm bch360

# Revert to pre-cutover
docker tag bch360:pre-1.5-${TS} bch360:stable
docker tag bch360:pre-1.5-${TS} bch360:safe
docker tag bch360:pre-1.5-${TS} bch360:latest

docker run -d \
  --name bch360 \
  --restart unless-stopped \
  --network host \
  -v /opt/bch360/data_lake:/app/data_lake \
  -v /opt/bch360/logs:/app/logs \
  -v /opt/bch360/.env:/app/.env:ro \
  bch360:stable

sleep 8
curl -k -s -o /dev/null -w "Rolled back :4001 = %{http_code}\n" https://localhost:4001/api/system/health
ROLLBACK
```

Rollback time: **~45 seconds**. Production restored to last-known-good Option B state.

---

## 🛡️ Risk register

| Step | Risk | Mitigation |
|---|---|---|
| 1 Build | Vite errors / missing deps | Test on dev first (`npm run build`) |
| 2 Docker build | Node 20 incompatibility | Use baseline Dockerfile (proven) |
| 3 Test container | Won't start | Check logs + env vars |
| 4 UAT | Visual regression | Step 4 sign-off gate |
| 5 Swap | Container won't start | Rollback within 60s |
| 6 Burn-in | Late-discovered bug | 7b rollback |
| 7 Cleanup | Premature memory update | Keep `:pre-1.5-${TS}` for 1 sprint |

---

## ⏸️ Status as of 2026-05-13

- ✅ Dockerfile restored to working tree (`feat/baseline-from-prod`)
- ✅ docker-compose.yml restored
- ✅ `npm run build` verified successful
- ✅ dist/assets/ has 25+ files including ReportTab-B-bHzoQ7.js (112 KB)
- ⏸️ Sprint B-D execution — pending user supervision + chosen low-traffic window

**Recommended cutover window**: Sunday morning 06:00-08:00 (low ER traffic, OPD closed, IPD rounds not yet started).

---

*Created: 2026-05-13 · Companion to tier1.5-bundle-replacement-plan.md*
