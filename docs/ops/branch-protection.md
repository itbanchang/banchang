# Branch Protection — master

Goal: stop the repeating pattern of "code merged to master then breaks prod."
The promote scripts already enforce gates locally; this layer enforces them
on GitHub before code can reach `master`.

## What CI runs

`.github/workflows/ci.yml` runs on every PR targeting `master` and every push
to `feat/**` / `fix/**`. Steps:

1. `npm ci`
2. `npm run typecheck` — must pass
3. `bash scripts/lint-check.sh` — must stay at-or-below `scripts/lint-baseline.json`
4. `npm run build` — must succeed
5. `npm test` — informational (continue-on-error until the suite is greener)

A failing CI run blocks merge once branch protection is enabled.

## Enable branch protection (one-time, web UI)

GitHub does not let scripts modify protection rules without a Personal Access
Token, so do this once via the UI.

1. Go to `https://github.com/itbanchang/banchang/settings/branches`.
2. Click **Add branch protection rule**.
3. Branch name pattern: `master`
4. Tick:
   - **Require a pull request before merging**
     - Required approvals: `1` (or `0` for solo dev — still gives the PR view)
     - Dismiss stale approvals when new commits are pushed
   - **Require status checks to pass before merging**
     - Required check: `quality` (the job name in `ci.yml`)
     - Require branches to be up to date before merging
   - **Require linear history** (no merge commits — keeps `git log` readable)
   - **Do not allow bypassing the above settings**
5. Click **Create**.

After this:
- Direct pushes to `master` are rejected.
- PRs cannot merge until CI's `quality` job is green.
- The promote scripts can still deploy from any branch — but if the codebase is
  going to land on `master`, CI gates it first.

## Verifying

```bash
# Try pushing directly to master — should be rejected
git push origin HEAD:master
# remote: error: GH006: Protected branch update failed for refs/heads/master.
```

## CI cost

The `quality` job runs on `ubuntu-latest` for ~3-5 min. GitHub Actions free tier
includes 2,000 min/month for private repos — we're nowhere near that.
