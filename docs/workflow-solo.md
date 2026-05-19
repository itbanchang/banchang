# BCH 360° — Solo Developer Workflow

The 3-step loop for editing code in VSCode and shipping safely to production.

```
VSCode (local)
   ↓ npm run sync:dev -- <file>
Dev container (10.109.0.33:4003)
   ↓ [verify in browser]
   ↓ npm run promote:bundle -- "message"
Prod container (10.109.0.33:4001)
   ↓ rollback if broken
   ← npm run rollback:bundle
```

## Prerequisites

- SSH key authorized to `root@10.109.0.33` (passwordless)
- `ssh`, `scp`, `npx` available in PATH (VSCode terminal — bash or PowerShell both work)
- `prod-snapshot/` exists in workspace (created by the prod-mirror sync of 2026-05-19)
- Working on git branch `prod-mirror-20260519` (or a feature branch from it) — so you're editing the file tree that mirrors prod

## What to edit, where

| Change type                            | Edit file under                                   | Why                                               |
| -------------------------------------- | ------------------------------------------------- | ------------------------------------------------- |
| Backend route, middleware, DB code     | `prod-snapshot/server/<...>`                      | Backend has src parity, edits map 1:1 to runtime  |
| Frontend UI tweak (existing component) | `prod-snapshot/dist-reflector/assets/<Bundle>.js` | Bundles are the truth — `src/` has lost 7 reports |
| Frontend overlay (DSV02, MRA02, etc.)  | `prod-snapshot/dist-reflector/<overlay>.js`       | Overlays are already vanilla JS, edit directly    |

The beautified bundles under `dist-reflector/assets/` are indented and easy to read — edit them like any JS file. The sync script minifies them with esbuild before pushing.

## The loop

### 1. Sync to dev

```sh
npm run sync:dev -- prod-snapshot/server/routes/doctorActivity.js
```

What it does:

- Detects backend vs frontend by path
- If frontend asset: minifies with esbuild, then scp to `/opt/bch360-dev/dist/assets/`
- If backend: scp to `/opt/bch360-dev/server/<...>` + `docker restart bch360-dev`
- Writes `.sync-state.json` so `promote:bundle` knows what to ship

Multiple files at once is fine:

```sh
npm run sync:dev -- prod-snapshot/server/routes/x.js prod-snapshot/dist-reflector/assets/Y.js
```

### 2. Verify on dev

Open `https://10.109.0.33:4003/` in browser. Hard refresh (Ctrl+Shift+R) if the bundle filename didn't change.

If something's wrong, fix locally and run `sync:dev` again — repeats are free.

### 3. Promote to prod

```sh
npm run promote:bundle -- "fix doctor activity dentist line"
```

What it does:

- Reads `.sync-state.json` — promotes the same set of files that were last synced
- `docker cp` each file from `/opt/bch360-dev/<...>` to `bch360:/app/<...>`
- `docker commit bch360 → bch360:test-YYYYMMDD-HHMM-<slug>` based on your message
- Tags new image as `safe + stable + latest` (these are rolling pointers)
- Restarts `bch360` if any backend file was promoted

Output gives you the new image ID + the rollback command to undo if needed.

### 4. Rollback (if needed)

```sh
npm run rollback:bundle
```

Interactive — lists last 15 tags newest-first, type the number, confirm. The script:

- Snapshots current `stable` first as `bch360:rollback-from-YYYYMMDD-HHMM` (you can always undo the undo)
- Re-tags the chosen image as `stable + safe + latest`
- Recreates the container (preserves bind mounts: `/app/data_lake`, `/app/logs`, `/app/.env`)

Or skip the menu by passing a tag:

```sh
npm run rollback:bundle -- test-20260519-1218-da-3lines-ldr2
```

## Edge cases

### Frontend cache busting

If you edit `prod-snapshot/dist-reflector/assets/Foo-ABC123.js` and the browser keeps loading the cached version — the **filename** didn't change so Vite's `immutable` cache headers tell browsers to reuse the cached copy.

Two ways to fix:

1. **Hard refresh once** (Ctrl+Shift+R) — works for the developer
2. **Rename the chunk** — copy `Foo-ABC123.js` → `Foo-ABC124.js`, edit the new one, then patch any loader (e.g., `index-LDR2.js`) to reference the new name. The user's normal F5 picks it up.

The `prod-snapshot/dist-reflector/index-LDR*.js` loader controls which bundle is loaded for each route — when you rename a chunk, also `sync:dev` the loader.

### Two people on the dev server

`bch360-dev` is shared. Two developers `sync:dev` at the same time → second one wins. Today this is fine (1 person). If team grows, the next step is GitHub PR + auto-deploy on merge (see "Upgrade path" below).

### Backend syntax error breaks dev

If `sync:dev` pushes broken backend code, `docker restart bch360-dev` will succeed but the Node process will crash-loop. Symptom: `https://10.109.0.33:4003/` → connection refused.

Recovery:

```sh
ssh root@10.109.0.33 "docker logs --tail 20 bch360-dev"
```

Find the SyntaxError, fix locally, `sync:dev` again. The container auto-restarts on the new file.

### Promote without syncing first

`.sync-state.json` is required. If you skip `sync:dev`, `promote:bundle` aborts with a clear error. Don't manually edit `.sync-state.json` — let the tool write it.

## Upgrade path (when team grows past 1)

The same `sync-to-dev.mjs` + `promote-bundle.mjs` scripts work as deploy commands inside GitHub Actions later. To upgrade:

1. Add `.github/workflows/pr.yml` — lint + build + smoke test on every PR
2. Add `.github/workflows/deploy-dev.yml` — on merge to `master`, run `sync:dev` over SSH from runner
3. Keep `promote:bundle` as a manual gated command (don't auto-deploy to prod)
4. Add branch protection requiring 1 PR approval

No rewrite needed.

## Related

- `prod-snapshot/README.md` — what each folder contains
- `.claude/skills/bch-edit-on-prod/` — the older direct-edit-on-prod flow (still works for emergencies)
- `.claude/skills/bch-ci-cd/` — the upgrade-to-Git-Flow guide for later
- `.claude/skills/bch-rollback-manager/` — image-tag policy + cleanup rules
