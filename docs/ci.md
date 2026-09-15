# CI/CD pipeline

## Workflows

### `ci.yml`

Runs on every push to `main` and every pull request.

- **`commit-lint`**: validates the PR title against `commitlint.ci.config.mjs`.
  Pull-request-only, since there's no PR title on a plain push.
- **`quality`**: `format:check`, `lint`, `typecheck`. A hard gate.
- **`unit`**: `test:coverage`, enforcing the thresholds in
  `vitest.config.mts`, then uploads to Codecov (`fail_ci_if_error: false`,
  so a missing token never blocks a PR). A hard gate.
- **`vulnerabilities`**: `pnpm audit`, `osv-scanner` against the lockfile,
  `gitleaks`. Report-only (`continue-on-error` on every step).
- **`build`**: `next build`, uploads `.next` as an artifact for `e2e` and
  `lighthouse`. A hard gate.
- **`e2e`**: downloads the build artifact, runs the Playwright suite. A
  hard gate.
- **`lighthouse`**: downloads the build artifact, runs `lhci autorun`
  against the production build. Report-only.

### `codeql.yml`, `dependency-review.yml`, `release-please.yml`

Each does one thing: static analysis, a license/advisory gate on PRs, and
release PR automation from Conventional Commits. See `docs/dependencies.md`
for how Renovate and release-please interact.

## What actually runs locally, and what doesn't

Every workflow file is validated (YAML/JSON, `eslint`, `commitlint`,
schema) before being committed, but not every job can run end-to-end on
this machine — some need a real PR, a real push, or a GitHub API that
`act` can't simulate. For those jobs, "done" means the file exists and is
valid, not a real run.

Testable via `act`:

- `act -j quality`, `act -j build`, `act -j e2e`: run for real.
- `act -j vulnerabilities`: runs for real; `gitleaks-action` fails under
  `act` because its simulated event payload is missing
  `repository.owner`, so this job is really only exercised by a real push.
- `act -j unit`: runs for real, **including the Codecov upload** — its
  tokenless mode for public repos actually publishes. Do not run this job
  with `act` more than necessary.
- `act -j lighthouse`: the job itself passes, but `lhci` fails its
  healthcheck because `act`'s Docker image has no Chrome installed (the
  real `ubuntu-latest` runner does).

Not testable via `act` (file-validity is the completion criterion):
`commit-lint` (needs a real PR title), `codeql.yml` (needs GitHub Advanced
Security), `dependency-review.yml` (needs GitHub's dependency graph),
`release-please.yml` (needs write access to open a release PR).

## Running `act` locally

```sh
act -j <job-name>
```

`.actrc` pins the runner image to `catthehacker/ubuntu:act-latest`.
`actions/upload-artifact` and `actions/download-artifact` are pinned to
`v4` in `ci.yml` — newer majors don't work with `act`'s local artifact
server (`nektos/act#6022`).

## Debugging an e2e failure

1. Run `pnpm run test:e2e` locally first — it's faster to iterate on than
   `act`.
2. A failure in CI uploads `playwright-report/` and `test-results/` as an
   artifact; download it and open `playwright-report/index.html` for
   traces, screenshots, and videos per failing test.
3. `mobile-chrome` only runs `smoke`, `app-integration`, `a11y`, and
   `navigation` specs (see `testMatch` in `playwright.config.ts`) — a
   failure specific to that project is almost always a mobile-viewport or
   touch-interaction issue, not a shared one.
