# Phase H Deployment Runbook (Security Hotfix)

> เอกสารคู่มือการ deploy Phase H.2 → H.5 ลง production · ใช้ edit-on-prod workflow + granular tag chain

**Target host**: `root@10.109.0.33`
**Container**: `bch360` (port 4001 HTTPS)
**Current stable**: `bch360:stable` (5c4ee90126b1, 2026-05-13)
**Target tag**: `bch360:stable-20260515-HHMM` (HHMM = local deploy time)

---

## ⚠️ ก่อนเริ่ม — Phase H.1 ต้องเสร็จก่อน

H.1 (security gate) เป็น **prerequisite** ของ H.2-H.5 ทั้งหมด เพราะถ้า `DISABLE_AUTH=true` ยังเปิดอยู่, `/api/system/cache-audit` admin gate ก็บายพาส.

### H.1 checklist (Day 1 — ก่อนเริ่ม H.2)

```bash
# 1. SSH เข้า prod
ssh root@10.109.0.33

# 2. แก้ /opt/bch360/.env
#    - คอมเมนต์ทิ้ง   DISABLE_AUTH=true       (หรือเปลี่ยนเป็น =false)
#    - uncomment      NODE_ENV=production
#    - เพิ่ม          AUDIT_HASH_SALT=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
nano /opt/bch360/.env

# 3. Restart container
docker restart bch360

# 4. Verify (จาก dev workstation — ต้องได้ 401 ทุก endpoint)
curl -sk -o /dev/null -w '%{http_code}\n' https://10.109.0.33:4001/api/auth/me
# expected: 401

curl -sk -o /dev/null -w '%{http_code}\n' https://10.109.0.33:4001/api/finance/monthly-summary
# expected: 401
```

ถ้ายังได้ 200 + ข้อมูล → Phase H.1 ยังไม่เสร็จ — หยุดอยู่ตรงนี้ก่อน

---

## 📦 ไฟล์ที่เปลี่ยน (Phase H.2-H.6)

| File                                            | Change                                                                                                   | Phase     |
| ----------------------------------------------- | -------------------------------------------------------------------------------------------------------- | --------- |
| `server/routes/er.js`                           | `/today` admission count → outcome-based `an_stat` join + cache key `_v3_admit_outcome`                  | H.2       |
| `server/middleware/audit.js`                    | HN → SHA256(hn + salt) before insert + export `hashPatientId`                                            | H.3       |
| `server/db/mysql.js`                            | export `getDbCacheStats()`                                                                               | H.4       |
| `server/cache/staleCache.js`                    | TTL registry + export `getStaleCacheStats()`                                                             | H.4       |
| `server/server.js`                              | imports + cache TTL registry + `/api/system/cache-audit` + 3 still-in-ER filters → `finish_time IS NULL` | H.4 + H.6 |
| `server/socket.js`                              | 3 still-in-ER filters → `finish_time IS NULL`                                                            | H.6       |
| `server/ai/clinicalIntelligence.js`             | admit count → `an_stat` JOIN (was `er_dch_type='1'`)                                                     | H.6       |
| `server/db/materializedViews.js`                | `mv_er_daily.admit_count` → `an_stat` JOIN                                                               | H.6       |
| `server/routes/kpiExtended.js`                  | LWBS + admitted + deaths → outcome-based proxies + cache `kpi_er_ops_v2_outcome`                         | H.6       |
| `scripts/verify-phase-h2-er-admit.mjs`          | H.2 verify probe (5/5 passed)                                                                            | H.2       |
| `scripts/verify-phase-h6-er-dch-type-sweep.mjs` | H.6 sweep probe (12/12 passed)                                                                           | H.6       |

ทั้งหมดเป็น **backend-only** — ไม่กระทบ `dist/` bundle, ไม่ต้อง `npm run build`

---

## 🚀 Deploy Procedure

### Step 0 — Pre-flight (gate) ⭐ (Phase H.7)

ใช้ script `scripts/preflight-phase-h.mjs` เป็น **gate เดียว** ที่รวบ:

- .env audit (NODE_ENV, DISABLE_AUTH, JWT_SECRET, REFRESH_TOKEN_SECRET, AUDIT_HASH_SALT)
- Syntax check ทุก 9 ไฟล์ที่แก้
- Run verify-phase-h2 + verify-phase-h6 (รวม 17 checks ต่อ HOSxP)
- รายการไฟล์ + ขนาดที่ต้อง scp

```bash
# Mode 1: ตรวจ local .env (จะ fail ถ้า DISABLE_AUTH=true ยังอยู่)
node scripts/preflight-phase-h.mjs

# Mode 2: ตรวจไฟล์ + probes อย่างเดียว ข้าม .env (dev iteration)
node scripts/preflight-phase-h.mjs --skip-env

# Mode 3: ตรวจ prod .env หลังแก้แล้ว — scp ลงมาก่อน
scp root@10.109.0.33:/opt/bch360/.env /tmp/prod-env
node scripts/preflight-phase-h.mjs --env-path=/tmp/prod-env
```

**Exit 0 = safe to scp** · **Exit 1 = หยุด แก้ก่อน**

ถ้า fail บน `.env` section → ต้องทำ Phase H.1 ก่อน (ดูส่วน prerequisite ด้านบน) แล้วใช้ Mode 3 verify

### Step 1 — Verify locally (alternative — manual)

ถ้าไม่ใช้ preflight ให้รัน manual:

```bash
# Syntax check (9 files)
for f in server/routes/er.js server/middleware/audit.js server/cache/staleCache.js \
         server/db/mysql.js server/server.js server/socket.js \
         server/ai/clinicalIntelligence.js server/db/materializedViews.js \
         server/routes/kpiExtended.js; do
  node --check "$f" && echo "✅ $f"
done

# Verify probes
node scripts/verify-phase-h2-er-admit.mjs        # 5/5 checks
node scripts/verify-phase-h6-er-dch-type-sweep.mjs # 12/12 checks
```

### Step 2 — Copy files to prod (H.2-H.6 combined)

```powershell
# From dev workstation (Windows PowerShell)
$PROD = "root@10.109.0.33:/opt/bch360"
# H.2
scp server/routes/er.js              "$PROD/server/routes/er.js"
# H.3
scp server/middleware/audit.js       "$PROD/server/middleware/audit.js"
# H.4
scp server/cache/staleCache.js       "$PROD/server/cache/staleCache.js"
scp server/db/mysql.js               "$PROD/server/db/mysql.js"
# H.4 + H.6 (3 still-in-ER fixes merged)
scp server/server.js                 "$PROD/server/server.js"
# H.6
scp server/socket.js                 "$PROD/server/socket.js"
scp server/ai/clinicalIntelligence.js "$PROD/server/ai/clinicalIntelligence.js"
scp server/db/materializedViews.js   "$PROD/server/db/materializedViews.js"
scp server/routes/kpiExtended.js     "$PROD/server/routes/kpiExtended.js"
# Verify probes
scp scripts/verify-phase-h2-er-admit.mjs            "$PROD/scripts/verify-phase-h2-er-admit.mjs"
scp scripts/verify-phase-h6-er-dch-type-sweep.mjs   "$PROD/scripts/verify-phase-h6-er-dch-type-sweep.mjs"
```

### Step 3 — Restart container (no rebuild)

```bash
ssh root@10.109.0.33 'docker restart bch360'

# Wait for startup
ssh root@10.109.0.33 'docker logs bch360 --tail 30'
# Should see: "Server listening on port 4001" + no startup errors
```

### Step 4 — Smoke test on prod

```bash
# 4.1 — Health check
curl -sk https://10.109.0.33:4001/healthz | jq .
# Expected: status=healthy, mysql=connected

# 4.2 — H.2 verification: ER admit > 0
curl -sk -H "Cookie: accessToken=<get-from-browser>" https://10.109.0.33:4001/api/er/today | jq '.admitted, .total'
# Expected: admitted > 0 (no longer always 0)

# 4.3 — H.3 verification: trigger any /api/* call, then check audit_logs sidecar
ssh root@10.109.0.33 'docker exec bch360 node -e "
  const Database = require(\"better-sqlite3\");
  const db = new Database(\"/opt/bch360/data_lake/audit.db\");
  const rows = db.prepare(\"SELECT patient_id FROM audit_logs WHERE patient_id IS NOT NULL ORDER BY created_at DESC LIMIT 5\").all();
  console.log(rows);
"'
# Expected: patient_id values are 64-char hex strings (SHA256), NOT raw HN like \"123456\"

# 4.4 — H.4 verification: cache-audit endpoint
curl -sk -H "Cookie: accessToken=<admin-cookie>" https://10.109.0.33:4001/api/system/cache-audit | jq '.stores | keys'
# Expected: ["local", "heavy", "stale"]

# 4.4b — Without admin → must be 403
curl -sk -H "Cookie: accessToken=<non-admin-cookie>" -w '%{http_code}\n' -o /dev/null https://10.109.0.33:4001/api/system/cache-audit
# Expected: 403

# 4.5 — Re-run verify probes via the prod container against HOSxP
ssh root@10.109.0.33 'docker exec bch360 node /opt/bch360/scripts/verify-phase-h2-er-admit.mjs'
# Expected: ALL CHECKS PASSED (5/5)

ssh root@10.109.0.33 'docker exec bch360 node /opt/bch360/scripts/verify-phase-h6-er-dch-type-sweep.mjs'
# Expected: ALL CHECKS PASSED (12/12)

# 4.6 — H.6 smoke tests on live endpoints
curl -sk -H "Cookie: accessToken=<token>" https://10.109.0.33:4001/api/kpi/extended | jq '.er_ops'
# Expected: lwbs ≥ 0, admitted > 0, deaths ≥ 0 (not all 0 like before)

# 4.7 — H.6 materialized view check
ssh root@10.109.0.33 'docker exec bch360 node -e "
  import(\"/opt/bch360/server/db/materializedViews.js\").then(({ getMV }) => {
    const rows = getMV(\"mv_er_daily\");
    if (!rows?.length) return console.log(\"MV not refreshed yet — wait 3 min\");
    const sumAdmit = rows.reduce((s, r) => s + Number(r.admit_count || 0), 0);
    console.log({ days: rows.length, total_admits_30d: sumAdmit });
  });
"'
# Expected: total_admits_30d > 0 (was 0 before H.6)
```

### Step 5 — Bump tag chain (commit + alias)

```bash
ssh root@10.109.0.33

# Generate timestamp
TS=$(date +%Y%m%d-%H%M)
echo "New tag: bch360:test-$TS"

# Commit running container to test tag
docker commit bch360 bch360:test-$TS

# After 30-min observation window (or immediate if smoke tests pass):
# Promote test → stable + safe + latest
docker tag bch360:test-$TS bch360:stable-$TS
docker tag bch360:stable-$TS bch360:stable
docker tag bch360:stable-$TS bch360:safe
docker tag bch360:stable-$TS bch360:latest

# Confirm
docker images bch360 --format 'table {{.Repository}}:{{.Tag}}\t{{.ID}}\t{{.CreatedAt}}' | head -10
```

### Step 6 — Update memory

Append to `memory/project_prod_stable_image.md`:

````markdown
## bch360:stable-20260515-HHMM (Phase H — Security Hotfix)

**Image**: `bch360:stable-20260515-HHMM` (replaces `bch360:stable-20260513-1348`)
**Deployed**: 2026-05-15 HH:MM Bangkok
**Backend changes only — no bundle rebuild**

Changes:

- H.1: `NODE_ENV=production` set, `DISABLE_AUTH=true` removed → auth restored
- H.2: ER admission count outcome-based (er.js cache key `erToday_v3_admit_outcome`)
- H.3: HN hashed (SHA256 + AUDIT_HASH_SALT) in audit_logs
- H.4: `/api/system/cache-audit` (admin) — introspect 3 cache stores + flag long-TTL patient-safety keys
- H.6: Sweep — fixed remaining er_dch_type usages in server.js, socket.js, clinicalIntelligence.js, materializedViews.js, kpiExtended.js

Rollback:

```bash
docker tag bch360:stable-20260513-1348 bch360:stable bch360:safe bch360:latest
docker restart bch360
```
````

Verify scripts: `scripts/verify-phase-h2-er-admit.mjs` (passed locally + on prod)

````

---

## 🔄 Rollback (ถ้ามีปัญหา)

```bash
# 1. Rollback to last known-good
ssh root@10.109.0.33 'docker tag bch360:stable-20260513-1348 bch360:stable bch360:safe bch360:latest && docker stop bch360 && docker rm bch360'

# 2. Re-create container from previous stable
# (use whatever your docker run / docker compose command is — see project_promote_flow.md)

# 3. Verify
curl -sk https://10.109.0.33:4001/healthz
````

---

## 🎯 Exit Criteria — Phase H Complete

ทุก check ต้อง ✅ ก่อนถือว่า Phase H ปิด:

- [ ] `curl /api/auth/me` ได้ 401 (no auth bypass — H.1)
- [ ] `curl /api/finance/monthly-summary` ได้ 401 (no auth bypass — H.1)
- [ ] `curl /api/er/today` ตอบ `admitted > 0` (H.2 fix verified)
- [ ] `audit_logs.patient_id` ทั้งหมดเป็น 64-char hex (no plaintext HN — H.3)
- [ ] `curl /api/system/cache-audit` ตอบ 403 ถ้าไม่ใช่ admin / 200 ถ้าเป็น admin (H.4)
- [ ] `verify-phase-h2-er-admit.mjs` รันบน prod ผ่านทุก check (5/5 — H.2)
- [ ] `verify-phase-h6-er-dch-type-sweep.mjs` รันบน prod ผ่านทุก check (12/12 — H.6)
- [ ] `curl /api/kpi/extended` คืน `er_ops.admitted > 0` + `deaths ≥ 0` (H.6 kpiExtended fix)
- [ ] `mv_er_daily.admit_count` รวม 30 วัน > 0 (H.6 materializedViews fix)
- [ ] `docker images | grep bch360:stable-20260515` แสดง granular tag
- [ ] `memory/project_prod_stable_image.md` อัปเดตแล้ว

---

## 🐛 Phase H.6 — Sweep Fix Details (เสร็จแล้ว)

**Verified ทุก pattern จากการรัน `scripts/verify-phase-h6-er-dch-type-sweep.mjs`**:

### Pattern A — "still in ER" filter (3 + 3 = 6 instances)

| Location                 | OLD                                             | NEW                                             |
| ------------------------ | ----------------------------------------------- | ----------------------------------------------- |
| `server.js:972/991/1004` | `e.er_dch_type IS NULL AND st.serviceX IS NULL` | `e.finish_time IS NULL AND st.serviceX IS NULL` |
| `socket.js:55/68/78`     | same                                            | same                                            |

**Live data (2026-05-15 06:55)**:

- CTRL (no `er_dch_type` filter): 8 visits unpaid pharmacy today
- OLD (`er_dch_type IS NULL`): **8** ← bug: filter is no-op
- NEW (`finish_time IS NULL`): **0** ← actually still in ER right now

### Pattern B — Admit count (3 instances)

| Location                       | OLD                                   | NEW                                                               |
| ------------------------------ | ------------------------------------- | ----------------------------------------------------------------- |
| `clinicalIntelligence.js:252`  | `SUM(er_dch_type='1') AS admits`      | `SUM(an.an IS NOT NULL) ... LEFT JOIN ovst ... LEFT JOIN an_stat` |
| `materializedViews.js:233`     | `SUM(er_dch_type='1') as admit_count` | same                                                              |
| `kpiExtended.js:99` (now ~115) | `SUM(er_dch_type='2') AS admitted`    | same                                                              |

**Live data**: Today=4 (was 0), 30d=347 (was 0), admit rate=12.5% (was 0%)

### Pattern C — LWBS (1 instance, kpiExtended.js)

**OLD**: `SUM(er_dch_type IN ('4','5'))` — always 0
**NEW**: Phase A 5-condition proxy:

- `door_to_doctor_second IS NULL` + `doctor_tx_time IS NULL`
- `finish_time IS NOT NULL` + `< 15 min stay`
- `NOT EXISTS admit` (ovst+an_stat) + `NOT EXISTS refer` (referout)

**Live data**: 0/2768 in 30d — BCH ER is well-staffed (no LWBS pattern)

### Pattern D — ED Deaths (1 instance, kpiExtended.js)

**OLD**: `SUM(er_dch_type IN ('09','9'))` — always 0
**NEW**: `patient.deathday BETWEEN vstdate AND vstdate+1` via `JOIN ovst + patient`

**Live data**: 12 deaths / 7907 visits in 90d = 0.15% mortality (matches skill memory "0.16% / 13 ราย / 90 วัน")

### Cache key bumps

- `kpi_er_ops` → `kpi_er_ops_v2_outcome` (kpiExtended.js)
- `erToday_v2` → `erToday_v3_admit_outcome` (er.js — H.2)
- `mv_er_daily` ← MV name unchanged (consumers read same key, MV refreshes every 3 min so new SQL flows naturally)

---

## 🚧 Out-of-scope `er_dch_type` references (intentional — keep)

| File:Line                           | Purpose                                               | Action                                   |
| ----------------------------------- | ----------------------------------------------------- | ---------------------------------------- |
| `server/routes/er.js:983-987`       | Data Quality Monitor counts `er_dch_type IS NOT NULL` | ✅ Keep — purpose is to track NULL ratio |
| `server/routes/er.js:1049-1052`     | DQ metadata (label, table name)                       | ✅ Keep — informational                  |
| `server/db/hosxpIntegration.js:257` | SELECT `er_dch_type as dch_type_id` for patient list  | ✅ Keep — passthrough display            |

---

_Last updated: 2026-05-15 (Phase H.6 added)_
