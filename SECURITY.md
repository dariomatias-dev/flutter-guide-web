# Security Policy

## Supported versions

This project has a single branch, `main`. Only the latest commit on `main`
(what's deployed in production) is supported — there are no older
versions receiving fixes.

## Reporting a vulnerability

Email **matiasdario75@gmail.com** with a description of the issue, its
impact, reproduction steps, and the commit or URL you tested against.

This is a solo, hobby-maintained project, so there's no guaranteed
response time. You will get an acknowledgement once the report is seen,
and credit in the fix if you'd like one.

## Scope

This is a static marketing site (Next.js, statically generated, no
backend server, no database, no user accounts, no forms that collect
data). Relevant report categories:

- Cross-site scripting or content injection.
- A gap in the Content-Security-Policy or other security headers (see
  `docs/security.md`).
- A dependency vulnerability affecting the deployed site.
- Exposed secrets or credentials in the repository.

Out of scope: anything requiring a server-side vulnerability, an account
system, or user-submitted data — none of those exist here.

For more on how the site's security posture (headers, CSP, dependency
scanning) is set up, see `docs/security.md`.
