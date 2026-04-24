#!/usr/bin/env bash
# ============================================================
# BCH 360 V.10 — Lint baseline check
#
# Runs ESLint and compares the error/warning counts to the baseline in
# scripts/lint-baseline.json. Exits non-zero if either count regressed.
# This replaces the absolute --max-warnings gate in promote.sh, which
# was useless once master accumulated 50 errors / 239 warnings (it would
# always block, forcing --force).
#
# Usage:
#   bash scripts/lint-check.sh              # check only (used by promote.sh)
#   bash scripts/lint-check.sh --update     # re-snapshot baseline (use after fixes)
#   bash scripts/lint-check.sh --quiet      # output only counts on success
# ============================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
BASELINE="$SCRIPT_DIR/lint-baseline.json"

UPDATE=0
QUIET=0
for arg in "$@"; do
    case "$arg" in
        --update) UPDATE=1 ;;
        --quiet)  QUIET=1 ;;
        --help|-h) sed -n '2,16p' "$0"; exit 0 ;;
        *) echo "Unknown arg: $arg" >&2; exit 2 ;;
    esac
done

cd "$PROJECT_ROOT"

# Run ESLint without --max-warnings so we get full output even when over the
# gate. Allow non-zero exit; we parse counts ourselves.
LINT_OUT=$(npx eslint src --ext .js,.jsx --report-unused-disable-directives 2>&1 || true)
COUNTS_LINE=$(echo "$LINT_OUT" | grep -E '^✖ [0-9]+ problems? \([0-9]+ errors?, [0-9]+ warnings?\)' | tail -1 || true)

if [ -z "$COUNTS_LINE" ]; then
    # No "problems" line means clean (zero errors, zero warnings)
    CUR_ERR=0
    CUR_WARN=0
else
    # Greedy `.*` in sed eats too much when both numbers are present
    # ("...50 errors, 239 warnings" -> "9" not "239"). Use grep -oE pairs.
    CUR_ERR=$(echo "$COUNTS_LINE"  | grep -oE '[0-9]+ errors?'   | grep -oE '^[0-9]+' | head -1)
    CUR_WARN=$(echo "$COUNTS_LINE" | grep -oE '[0-9]+ warnings?' | grep -oE '^[0-9]+' | head -1)
    : "${CUR_ERR:=0}"
    : "${CUR_WARN:=0}"
fi

if [ ! -f "$BASELINE" ]; then
    echo "No baseline at $BASELINE; create one with: $0 --update" >&2
    exit 2
fi

# Cheap JSON parse — depends on key on its own line, value as a JSON number.
BASE_ERR=$(grep -E '"errors"' "$BASELINE" | grep -oE '[0-9]+' | head -1)
BASE_WARN=$(grep -E '"warnings"' "$BASELINE" | grep -oE '[0-9]+' | head -1)

if [ $UPDATE -eq 1 ]; then
    cat > "$BASELINE" <<EOF
{
  "errors": $CUR_ERR,
  "warnings": $CUR_WARN,
  "captured_at": "$(date '+%Y-%m-%d')",
  "captured_on_sha": "$(git rev-parse --short HEAD 2>/dev/null || echo unknown)",
  "_note": "Baseline of pre-existing lint findings. promote.sh accepts <= these counts. Reduce as you fix; never increase. Re-snapshot with: bash scripts/lint-check.sh --update"
}
EOF
    echo "Baseline updated: $BASE_ERR -> $CUR_ERR errors, $BASE_WARN -> $CUR_WARN warnings"
    exit 0
fi

REGRESSED=0
[ "$CUR_ERR"  -gt "$BASE_ERR"  ] && REGRESSED=1
[ "$CUR_WARN" -gt "$BASE_WARN" ] && REGRESSED=1

if [ $REGRESSED -eq 1 ]; then
    echo "✗ Lint regressed:"
    echo "    errors:   $BASE_ERR -> $CUR_ERR"
    echo "    warnings: $BASE_WARN -> $CUR_WARN"
    echo
    echo "  Last block of new findings (eyeball it):"
    echo "$LINT_OUT" | tail -30 | sed 's/^/    /'
    exit 1
fi

if [ $QUIET -eq 0 ]; then
    if [ "$CUR_ERR" -lt "$BASE_ERR" ] || [ "$CUR_WARN" -lt "$BASE_WARN" ]; then
        echo "✓ Lint improved:"
        echo "    errors:   $BASE_ERR -> $CUR_ERR"
        echo "    warnings: $BASE_WARN -> $CUR_WARN"
        echo "  Tip: lock in with 'bash scripts/lint-check.sh --update'"
    else
        echo "✓ Lint at baseline ($CUR_ERR errors, $CUR_WARN warnings)."
    fi
fi
exit 0
