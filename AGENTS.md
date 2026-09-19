# Project rules

## Commit convention

Conventional Commits. The scope is the area touched (`hero`, `faq`, `deps`,
`ci`), never a file path. Use `fix` for corrections, `build(deps)` for
dependency bumps, `chore` for repo maintenance with no source change,
`docs` for documentation only, `test` for test-only changes.

## Code

- All code (identifiers, comments) is in English. User-facing text is in
  English too, until a step adds another locale on purpose.
- Where things live and how features are organized: see
  `docs/architecture.md`.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
