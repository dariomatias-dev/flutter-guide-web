# Architecture

How the code is organized and why.

## Layout

```text
src/
├── app/                    thin routes, only compose features
│   ├── layout.tsx          root layout: html shell, Header, Footer
│   ├── page.tsx            home page
│   ├── not-found.tsx       404 page, also resolves app deep links
│   └── privacy-policy/
│
├── features/               one directory per feature
│   ├── about/
│   ├── community/
│   ├── contribution/
│   ├── faq/
│   ├── features-showcase/
│   ├── hero/
│   ├── layout/             header, header menu, footer
│   ├── learning-path/
│   ├── legal/              privacy policy content
│   ├── official-resources/
│   ├── screenshots/        carousel and image viewer
│   └── theme-customization/
│
└── shared/                 code with no feature of its own
    ├── components/         link-button, github-button, play-store-button
    │   └── ui/             shadcn primitives (button, accordion, breadcrumb)
    ├── lib/                cn (class merging), site (external URLs)
    └── motion/             framer-motion variants used across features
```

Each feature holds only the layers it actually needs:

```text
features/<name>/
├── components/       the feature's UI
├── data/             static content (only when the feature has any)
├── <name>.types.ts   the feature's own types (only when it has any)
└── index.ts          the feature's public API
```

## Dependency rules

- Imports only go down: `app` → `features` → `shared`.
- `shared/` never imports from `features/`.
- `app/` and a feature may only reach another feature through its
  `index.ts` barrel, never a file inside it. A feature's own internal files
  are fair game for that same feature.
- Files in kebab-case, components in PascalCase.

`eslint.config.mjs`'s `import/no-restricted-paths` is what actually enforces
these rules: `pnpm lint` fails on a cross-boundary import, so this document
can't drift from what's really allowed the way a comment-only convention
could.

## Exceptions

None right now. Every feature-to-feature import goes through a barrel.

## Rendering

- `app/page.tsx` and `app/layout.tsx` are Server Components: they only
  compose feature components, with no hooks or state of their own.
- Most feature components are Client Components (`"use client"`), since
  almost every section animates with `framer-motion`/`motion`. Converting a
  section to a Server Component would mean dropping its animation, which is
  out of scope for the restructuring steps (tracked separately, alongside
  the other animation work).
- The whole site is static: every route is prerendered at build time
  (`next build`), with no per-request server rendering and no dynamic data.

## Decisions

- **Why SSG.** The site has no user accounts, no per-visitor content and no
  data that changes between requests: an app catalog, screenshots, an FAQ,
  a privacy policy. There's nothing to render per request, so prerendering
  every route at build time makes each one a static file, cacheable at the
  edge, with none of the cost of a server render nobody needs.
- **Why feature-first.** The site is a single long page made of clearly
  separate sections (hero, screenshots, FAQ, ...), each with its own copy,
  animation variants and, in a few cases, its own data. Grouping by feature
  keeps everything a section needs in one place, instead of splitting it
  across parallel `components/`, `constants/` and `@types/` trees the way
  the project did before this restructuring — the layout this document
  describes replaced that.
