# Tier 1.5 — Bundle Replacement Plan

> **Goal**: Switch production from bundle-based ReportTab to src-built ReportTab, transferring 7 restored reports (Tier 1.1 + 2.1-2.6) from "src-only" to "running in prod".
>
> **Status**: Planning only — execution requires user supervision (high-risk operation).

---

## 🎯 What's at stake

| Current state | After Tier 1.5 |
|---|---|
| Prod loads `dist/assets/ReportTab-PTSVC09.js` (the bundle) | Prod loads from `npm run build` output of `src/components/ReportTab.jsx` |
| Bundle has 13 reports baked in | Source has 13 reports too (7 freshly restored) |
| Changes require bundle surgery via `bch-edit-on-prod` | Changes go through PR → CI → merge → `npm run build` → deploy |
| Source drift returns every session | CI prevents drift (Tier 0 Sprint 0.2) |

**Risk**: If `npm run build` produces output that differs functionally from the bundle, users will see broken/different reports. **Production-impacting.**

**Mitigation**: Phased rollout (steps 4-7 below) with rollback at every checkpoint.

---

## ✅ Pre-requisites (must be true before Tier 1.5)

- [x] Tier 1.1 + 2.x complete (7 reports in `src/components/reports/`)
- [x] _shared.jsx with reusable building blocks
- [x] ReportTab.jsx wires all 7 reports + 4 V1 baseline compare reports
- [x] Sprint 0.2 CI/CD active (this commit)
- [ ] **One full PR has gone through CI without intervention** — current session adds CI; not yet tested
- [ ] **Stakeholder sign-off** — Director + ICN must agree to "the report you see today might look slightly different tomorrow"

---

## 🚦 7-Step Phased Migration

### Step 1: Build verification (offline, no prod impact)

```bash
git checkout ux-iteration-1
npm ci
npm run build
ls -la dist/assets/
```

**Verify**:
- Build succeeds with no errors
- New ReportTab bundle filename appears (e.g. `ReportTab-NEW-<hash>.js`)
- File size in reasonable range (~80-120 KB minified)
- esbuild output is valid ESM

**Acceptance**: Build completes, dist/assets/ contains expected files

### Step 2: Side-by-side dev server test

```bash
npm run dev   # localhost:5173 (Vite dev server, uses src/)
# Compare with: https://10.109.0.33:4001/ (uses bundle)
```

For each of the 13 reports:
1. Open same date range / FY in both UIs
2. Visual diff: KPI cards, chart positions, table rows, totals
3. Functional diff: Excel export (if not yet wired), filter, sort, drill-down

**Document differences** in `docs/tier1.5-parity-results.md`:
- ✅ Identical (no action)
- 🟡 Minor cosmetic (acceptable per skill rule "behavioral parity, not byte parity")
- 🔴 Behavioral/data difference (BLOCKER — must fix before proceeding)

**Acceptance**: 0 🔴 differences. All 🟡 documented + accepted.

### Step 3: Build artifacts to test image (not stable yet)

```bash
# Build the docker image with new src
docker build -t bch360:test-1.5-$(date +%Y%m%d-%H%M) .

# Pull current stable to compare manifest
docker inspect bch360:stable > /tmp/stable.json
docker inspect bch360:test-1.5-... > /tmp/test.json
diff <(jq '.[].Config.Env' /tmp/stable.json) <(jq '.[].Config.Env' /tmp/test.json)
```

**Verify**:
- Image builds without errors
- Env vars match
- ENTRYPOINT / CMD unchanged

**Acceptance**: Docker image builds cleanly, manifest diff = empty (or only the SHA/labels differ)

### Step 4: Blue-green deploy (parallel container, different port)

```bash
# Start test container on port 4002 (parallel to prod on 4001)
docker run -d \
  --name bch360-test \
  --network host \
  -e PORT=4002 \
  -v /opt/bch360/data_lake:/app/data_lake \
  -v /opt/bch360/logs:/app/logs:ro \
  -v /opt/bch360/.env:/app/.env:ro \
  bch360:test-1.5-...

# UAT against test instance
curl -k https://10.109.0.33:4002/api/system/health

# Manual UAT: open https://10.109.0.33:4002/ in browser, test all 13 reports
```

**Acceptance**:
- Test container runs without errors for 30+ minutes
- All 13 reports load with same data as prod (4001)
- No 500 errors in `docker logs bch360-test --tail 100`

### Step 5: Cutover (atomic swap)

```bash
TS=$(date +%Y%m%d-%H%M)
# Save current image as rollback
docker tag bch360:stable bch360:pre-1.5-$TS

# Stop both containers
docker stop bch360 bch360-test
docker rm bch360 bch360-test

# Start test image as the main container
docker run -d \
  --name bch360 \
  --restart unless-stopped \
  --network host \
  -e PORT=4001 \
  -v /opt/bch360/data_lake:/app/data_lake \
  -v /opt/bch360/logs:/app/logs \
  -v /opt/bch360/.env:/app/.env:ro \
  bch360:test-1.5-...

# Wait + smoke
sleep 8
curl -k https://localhost:4001/api/system/health

# Tag the new image as stable
docker tag bch360:test-1.5-... bch360:stable
docker tag bch360:test-1.5-... bch360:stable-1.5-$TS
docker tag bch360:test-1.5-... bch360:safe
docker tag bch360:test-1.5-... bch360:latest
```

**Acceptance**: HTTPS healthcheck returns 200 + smoke test passes

### Step 6: Burn-in monitoring (24 hours)

For the next 24 hours:
- Check `docker logs bch360 --since 1h | grep -i error` every 4 hours
- Monitor `/api/admin/claude-metrics` for cost anomalies
- Ask Director + ICN + nurse lead "anything weird in any report?"
- Check that `data_lake/warehouse.db` is being written (sat survey, audit log)

**Rollback trigger** (any of):
- Logs show unhandled exception rate > pre-1.5 baseline
- Any report shows wrong numbers vs HOSxP raw SQL
- Page load times > 2× baseline
- User complaint about visual regression

### Step 7: Cleanup or rollback

**If clean**: Update memory `project_prod_stable_image.md` with new SHA + note "Tier 1.5 cutover complete, edit-on-prod now hotfix-only". Remove old bundle from `dist/assets/` via Dockerfile change (next deploy).

**If problems**:
```bash
docker stop bch360
docker rm bch360
docker tag bch360:pre-1.5-$TS bch360:stable
docker run -d --name bch360 --restart unless-stopped --network host \
  -v /opt/bch360/data_lake:/app/data_lake \
  -v /opt/bch360/logs:/app/logs \
  -v /opt/bch360/.env:/app/.env:ro \
  bch360:stable
```

Then investigate, fix in src, repeat from Step 1.

---

## 🛡️ Risk register

| Risk | Probability | Impact | Mitigation |
|---|---|---|---|
| Build fails (Vite errors) | Medium | Low (caught at Step 1) | Iterate locally before tagging |
| Visual regression | High | Medium | Step 2 side-by-side check + accept "behavioral parity" |
| Functional regression (wrong data) | Medium | High | Step 2 verify SQL + spot-check 5 known cases |
| Excel export breaks | High | Medium | Defer — keep using bundle's xlsx.min lazy-load |
| Auth flow breaks | Low | High | Step 4 UAT must include login |
| Bundle filename changes break legacy URL bookmarks | Low | Low | Vite emits hashed names; clients don't bookmark these |
| Director/Nurse complaint | Medium | High | Step 6 + immediate rollback |

---

## 📅 Recommended cadence

- **Sprint A** (Week 1): Steps 1-2 (build + side-by-side). Output: parity-results.md.
- **Sprint B** (Week 2): Steps 3-4 (image + blue-green). Output: test image running on :4002.
- **Sprint C** (Week 3): Step 5 cutover during low-traffic window (Sunday morning?). Output: prod on src.
- **Sprint D** (Week 4): Step 6 burn-in + Step 7 cleanup. Output: edit-on-prod marked hotfix-only.

---

## 🚫 Explicit non-goals

- **Do not** retire `bch-edit-on-prod` skill yet. Keep it for genuine hotfixes.
- **Do not** delete the old bundle from `dist/assets/` in the same Docker build as the cutover. Leave it for 1 sprint as belt-and-braces.
- **Do not** auto-deploy on merge to master in this phase. Manual deploy gives humans final review.
- **Do not** attempt this Tier 1.5 in a single session — minimum 4 weeks elapsed time + user supervision at each step.

---

## ✅ Acceptance for Tier 1.5

- [ ] Steps 1-2 complete + parity-results.md committed
- [ ] Step 3-4 complete + test image running 30+ min
- [ ] Step 5 cutover successful
- [ ] Step 6 burn-in 24h with no incidents
- [ ] Memory updated: edit-on-prod = hotfix-only
- [ ] All 13 reports verified working in src-built deployment

Once all 6 checked: **Tier 1.5 = DONE. The big source-drift problem is solved.**

---

*Plan created: 2026-05-13 · Phase H · Companion to bch-source-recovery skill*
