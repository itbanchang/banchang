#!/bin/sh
# ============================================================
# BCH 360° — Install Git Hooks for all developers
# Usage: bash scripts/install_hooks.sh
# ============================================================
set -e

toplevel=$(git rev-parse --show-toplevel)
cd "$toplevel"

cp scripts/.hooks/pre-commit .git/hooks/pre-commit
chmod +x .git/hooks/pre-commit

echo "✅ Git hooks installed in .git/hooks/"
echo "   Pre-commit: large-file guard + schema validator (when SQL routes change)"
