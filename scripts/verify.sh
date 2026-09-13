#!/usr/bin/env bash
# Single local gate mirroring the CI pipeline (.github/workflows/ci.yml).
# Run from anywhere; always operates on the repo root.
#
# Usage:
#   pnpm run verify          # full gate: everything CI runs, including e2e
#   pnpm run verify --fast   # skip build and e2e

set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

fast=false

for arg in "$@"; do
  case "$arg" in
    --fast) fast=true ;;
    *)
      echo "Unknown argument: $arg" >&2
      echo "Usage: verify.sh [--fast]" >&2
      exit 1
      ;;
  esac
done

run_step() {
  local name="$1"
  shift
  echo "▶ $name"
  if ! "$@"; then
    echo "✗ $name failed" >&2
    exit 1
  fi
  echo "✓ $name"
  echo
}

# Fastest checks first, so a broken commit fails in seconds, not minutes.
run_step "Typecheck" pnpm run typecheck
run_step "Lint" pnpm run lint
run_step "Format check" pnpm run format:check
run_step "Docs locale parity" pnpm run check-docs-locales
run_step "Unit tests with coverage" pnpm run test:coverage

if [ "$fast" = true ]; then
  echo "⚠ --fast: skipping build and e2e; this is NOT the full gate."
  echo "  Run 'pnpm run verify' before opening a PR."
  exit 0
fi

run_step "Build" pnpm run build

# --with-deps installs OS packages via sudo, which prompts for a password on
# most dev machines. CI (a disposable, root-capable runner) uses --with-deps;
# locally we assume system dependencies were installed once already.
run_step "Install Playwright browsers" pnpm exec playwright install chromium
run_step "End-to-end tests" pnpm run test:e2e

echo "✓ All checks passed: this run mirrors CI."
