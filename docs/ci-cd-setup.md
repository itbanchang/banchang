# CI/CD Setup Guide — BCH 360°

This document describes how to bring the CI/CD pipeline online after the Phase H Tier 0 Sprint 0.2 commit. It is **infrastructure-as-doc** — most setup steps are one-time GitHub UI actions, not code.

---

## 📦 What's in this repo now

| File | Purpose |
|---|---|
| `.github/workflows/lint.yml` | ESLint + Prettier on every PR. Cancels in-flight runs. |
| `.github/workflows/smoke.yml` | Spins up MariaDB + boots server + curls health endpoints. |
| `.github/dependabot.yml` | Weekly npm + monthly GH Actions dependency PRs. |
| `.husky/pre-commit` | Runs lint-staged + secret scan locally before commits land. |
| `.lintstagedrc.json` | Tells lint-staged what to run per file type. |
| `scripts/smoke-test.sh` | Used by `smoke.yml` and runnable locally. |

---

## 🚀 First-time activation (do these ONCE)

### 1. Install husky + lint-staged locally

```bash
npm install --save-dev husky lint-staged
npx husky install
chmod +x .husky/pre-commit
# Update package.json to add:
#   "scripts": { "prepare": "husky install" }
# so every clone auto-installs hooks.
```

After this, every `git commit` runs the pre-commit checks. Bypass with `--no-verify` only for emergencies (and document why in the commit message).

### 2. Enable branch protection on `master`

Go to: **GitHub repo → Settings → Branches → Add rule**

Branch name pattern: `master`

Check the following:
- ✅ **Require a pull request before merging**
  - Require approvals: **1**
  - Dismiss stale approvals when new commits pushed
- ✅ **Require status checks to pass before merging**
  - Require branches to be up to date before merging
  - Status checks (search by name after first PR runs):
    - `eslint` (from lint.yml)
    - `build-and-boot` (from smoke.yml)
- ✅ **Require linear history**
- ✅ **Restrict who can push to matching branches** (whitelist admins)
- ✅ **Do not allow bypassing the above settings** (include administrators)
- ✅ **Restrict force pushes** — block everyone

Save.

Repeat for `ux-iteration-*` glob if you want PR review on iteration branches too.

### 3. Add GitHub Secrets (Settings → Secrets and variables → Actions)

Required for `smoke.yml` (none — uses in-CI MariaDB).

Required for future `deploy.yml` (not in this commit — manual deploy still):
- `PROD_SSH_KEY` — private key matching the public key in `root@10.109.0.33:~/.ssh/authorized_keys`
- `ANTHROPIC_API_KEY` — optional, for AI eval tests
- `MYSQL_PROD_RO_USER` / `_PASS` — optional, for nightly verify-scripts cron

### 4. Test the workflows

Open a small PR (e.g. typo fix in a README). Both workflows should run:
- `Lint / ESLint` — fast, should pass
- `Smoke Test / build-and-boot` — slower (~3-5 min), should also pass

If lint fails on existing code:
- Initial threshold `--max-warnings 100` is intentionally loose
- Plan: tighten to 50 → 20 → 0 over 4 quarters
- Track baseline in `docs/ci-warnings-baseline.md` (create after first run)

If smoke fails:
- Check the "Server logs (if failed)" step output in the workflow
- Common cause: missing env var → add to `smoke.yml` `env:` block

---

## 🛠 Local smoke test (developer workflow)

```bash
# Set env vars matching what smoke.yml uses
export JWT_SECRET="local-test-secret-min-32-chars-x"
export DEFAULT_ADMIN_PASSWORD="ci-test-admin-pw"
export DISABLE_HTTPS=true
export MYSQL_HOST=127.0.0.1
export MYSQL_USER=root
export MYSQL_PASS=testroot
export MYSQL_DB=bchhosxpxe_test

# Run
bash scripts/smoke-test.sh
```

Requires a local MariaDB running with those credentials. If you don't have one, `docker run --rm -d --name bch-test-mysql -e MYSQL_ROOT_PASSWORD=testroot -p 3306:3306 mariadb:10.6`.

---

## 🚧 What CI does NOT do (yet)

| Gap | Why | Future fix |
|---|---|---|
| Run real HOSxP queries | CI has no access to 10.109.0.33 + 6566 prod tables | Acceptable — use mock data in tests |
| E2E (Playwright) | No tests written yet | Add nightly schedule when tests exist |
| Visual regression | No screenshot baseline | Add Percy/Chromatic when budget allows |
| Auto-deploy on merge | Risky for hospital prod system | Keep manual `npm run deploy` until verify suite is comprehensive |
| TypeScript typecheck | Project is JS-first, only types/api.ts is TS | Add tsc step if more `.ts` files appear |

---

## 📚 References

- Skill: `.claude/skills/bch-ci-cd/SKILL.md`
- Workflow template: `.claude/skills/bch-ci-cd/references/pr-workflow-template.md`
- Memory anchor: `project_v2_merge_incomplete.md` (the source drift problem CI prevents)

---

## ✅ Acceptance — when is CI/CD "done"?

- [ ] husky installed locally + `npm run prepare` works on fresh clone
- [ ] `lint.yml` passes on a no-op PR
- [ ] `smoke.yml` passes on a no-op PR
- [ ] Branch protection rule active on `master` (cannot force-push, cannot merge without checks)
- [ ] One real PR has gone through the full pipeline without intervention
- [ ] Memory updated: `project_prod_stable_image.md` notes "CI/CD active, hotfix-only edit-on-prod"

After all 6 checked: Tier 0 Sprint 0.2 = DONE. Edit-on-prod becomes the exception, not the default.

---

*Created: 2026-05-13 · Phase H Sprint 0.2 — bch-ci-cd skill*
