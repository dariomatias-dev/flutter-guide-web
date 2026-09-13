# Contributing

## Setup

```sh
git clone https://github.com/dariomatias-dev/flutter_guide_web.git
cd flutter_guide_web
pnpm install
```

Node.js 24+ and pnpm 10 are required; pnpm's version is pinned in
`package.json`'s `packageManager` field. See the README's
[Getting Started](../README.md#getting-started) for running the dev
server.

## Before opening a pull request

- [ ] Code and comments are in English (see `AGENTS.md`).
- [ ] New code follows the structure in `docs/architecture.md` — a
      feature's own files, not scattered across parallel trees.
- [ ] A behavior change has a test; see `docs/testing.md` for what
      merits one.
- [ ] `pnpm run verify` passes locally.
- [ ] The commit message follows `AGENTS.md`'s convention.

## The local gate

```sh
pnpm run verify
```

Mirrors what CI runs: typecheck, lint, format check, unit tests with
coverage, build, and end-to-end tests. Use `pnpm run verify --fast` to
skip the build and e2e steps while iterating.

## What CI checks

| Job               | What it does                                  | Gates the merge? |
| ----------------- | --------------------------------------------- | ---------------- |
| `commit-lint`     | Validates the PR title (Conventional Commits) | Yes              |
| `quality`         | Format check, lint, typecheck                 | Yes              |
| `unit`            | Unit tests with coverage, uploads to Codecov  | Yes              |
| `vulnerabilities` | `pnpm audit`, `osv-scanner`, `gitleaks`       | No (report only) |
| `build`           | Production build                              | Yes              |
| `e2e`             | Playwright end-to-end tests                   | Yes              |
| `lighthouse`      | Lighthouse CI against the build               | No (report only) |

CodeQL, the dependency review check, and Renovate run as separate
workflows; see `docs/ci.md` and `docs/dependencies.md`.

## Reproducing CI locally

```sh
act -j <job-name>
```

A green `act` run is a strong signal, not a guarantee — some jobs need a
real PR or push and can't run locally at all. See `docs/ci.md` for which
ones, and how to debug an e2e failure.

## Working with an AI agent

This repository carries agent instructions in `AGENTS.md` (and
`CLAUDE.md`, which just points to it). Changing that file is a normal
change, reviewed like any other.

## Dependency updates

Renovate opens dependency update PRs on a weekly schedule. See
`docs/dependencies.md` for which packages are pinned, why, and how to
triage a Renovate PR.

## Commit and branch conventions

Conventional Commits, scoped by area (not file path); see `AGENTS.md`.
Branch names describe what they contain, not the tool or process that
created them.

By participating in this project, you agree to follow the
[Code of Conduct](../CODE_OF_CONDUCT.md).
