# Dependencies

## Exact versions, and why

Most dependencies use `^`, so Renovate can bump them freely. A few are
pinned to an exact version on purpose:

- **`react`, `react-dom`**: kept in lockstep with the exact version Next
  expects for the installed `next` release.
- **`next`, `eslint-config-next`**: upgraded together by hand, since a Next
  major can change defaults (new ESLint rules, Turbopack becoming the
  default, etc.) that need a source-level look, not an automatic bump.

Renovate is configured to leave `next`, `eslint-config-next`, `react`, and
`react-dom` alone (see `renovate.json`). Bumping any of them is its own
dedicated change, not a Renovate PR.

## Renovate configuration

`renovate.json` extends `config:recommended` with:

- **Weekly schedule**: one batch of PRs a week instead of one per release.
- **`build(deps):` commit prefix**, matching this repo's commit convention.
- **GitHub Actions grouped** into a single PR per week, since bumping
  action versions rarely needs individual review.

## Triaging a Renovate PR

1. Read the release notes linked in the PR body for anything breaking.
2. Run `pnpm run verify` locally on the PR's branch.
3. If it's a single low-risk package (a patch or minor bump with a clean
   `verify`), merge it as-is.
4. If it touches something with visible UI (`motion`, `embla-carousel-react`,
   `tailwindcss`, `@radix-ui/*`), check the app in a browser before merging,
   not just the test suite — visual regressions do not fail tests.
5. If `verify` fails, decide whether the fix belongs in the same PR (small,
   mechanical) or as a follow-up change (anything that touches `src/`
   behavior beyond an import rename).
