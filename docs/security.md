# Security

## What the site is

A statically generated Next.js site: no server-side code runs at
request time (every route is prerendered HTML), no database, no user
accounts, no forms that collect or store data. Most classes of
server-side vulnerability (SQL injection, auth bypass, session
handling) don't apply here because the surfaces they'd attack don't
exist.

## Headers and CSP

`next.config.ts`'s `headers()` applies a Content-Security-Policy,
`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
`Strict-Transport-Security`, and `Permissions-Policy` to every response.
The CSP is scoped to `'self'` for scripts, styles, images, fonts, and
connections, since the site loads nothing external. `script-src` and
`style-src` include `'unsafe-inline'`: the App Router injects an inline
`<script>` for its RSC streaming payload, and Motion/Radix set inline
`style` attributes (entrance animations, accordion CSS variables) —
neither works under a strict CSP without a per-request nonce, which would
require middleware running on every request, incompatible with this
site's fully static output. See `e2e/security.spec.ts` for the header
assertions.

## Automated scanning

- **`pnpm audit`**, **`osv-scanner`**, **`gitleaks`**: run in the
  `vulnerabilities` job in `ci.yml` on every push and pull request,
  report-only.
- **CodeQL**: static analysis for JavaScript/TypeScript, via
  `.github/workflows/codeql.yml`, on push, pull request, and a weekly
  schedule.
- **`dependency-review.yml`**: fails a pull request that introduces a
  new high-severity advisory or a disallowed license (see
  `docs/dependencies.md`).
- **Renovate**: keeps dependencies current on a weekly schedule (see
  `docs/dependencies.md`); a security-relevant update is triaged like
  any other Renovate PR.

## Reporting

See `SECURITY.md` at the repository root.
