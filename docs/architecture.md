# Architecture

How the code is organized and why.

## Layout

```text
src/
├── app/
│   ├── [locale]/            the real site, routed by locale
│   │   ├── layout.tsx       html shell, Header, Footer, NextIntlClientProvider
│   │   ├── page.tsx         home page
│   │   ├── not-found.tsx    404 page
│   │   ├── opengraph-image.tsx
│   │   └── privacy-policy/
│   ├── (deep-links)/        English-only, locale-independent root layout
│   │   ├── layout.tsx       its own html shell (no locale prefix, ever)
│   │   ├── widgets/[...slug]/
│   │   ├── packages/[...slug]/
│   │   ├── functions/[...slug]/
│   │   ├── elements/[...slug]/
│   │   └── uis/[...slug]/
│   ├── manifest.ts, robots.ts, sitemap.ts
│   └── globals.css
│
├── features/                one directory per feature
│   ├── about/
│   ├── catalog/
│   ├── contribution/
│   ├── deep-links/           the "opening in the app" redirector page
│   ├── faq/
│   ├── features-showcase/
│   ├── hero/
│   ├── languages/
│   ├── layout/               header, header menu, footer
│   ├── learning-path/
│   ├── legal/                 privacy policy content
│   ├── official-resources/
│   ├── quality/
│   ├── screenshots/           carousel and image viewer
│   ├── share/
│   ├── theme-customization/
│   └── whats-new/
│
├── i18n/                     next-intl wiring: routing, navigation, request config
│
└── shared/                   code with no feature of its own
    ├── components/            link-button, github-button, play-store-button
    │   └── ui/                shadcn primitives (button, accordion, breadcrumb)
    ├── lib/                   cn (class merging), site (external URLs), locale-alternates
    └── motion/                motion (formerly framer-motion) variants used across features

messages/                    one JSON file per locale (en, pt-BR, es)
middleware.ts                next-intl's locale-detection/redirect middleware
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

## Locale routing

The site is served in three locales via `next-intl`: English (`en`,
unprefixed, the default), `pt-BR`, and `es` (both prefixed, e.g.
`/pt-BR/privacy-policy`). `middleware.ts` and `src/i18n/routing.ts` define
this; `src/app/[locale]/` holds every localized route, with its own root
layout that reads `params.locale` and renders `<html lang={locale}>`.

**Invariant routes stay outside `[locale]` on purpose.** The app's deep
links (`/widgets/[...slug]`, `/packages/[...slug]`, `/functions/[...slug]`,
`/elements/[...slug]`, `/uis/[...slug]`) and the two static files under
`public/` (`.well-known/assetlinks.json`, `app-ads.txt`) must resolve at
exactly those URLs, with no locale prefix, because they're referenced by
the Android app and by Google Play's asset-links verification — a URL
that shifts under `/en/...` would break both. The deep-link routes live in
their own `(deep-links)` route group with an English-only root layout
(`src/app/(deep-links)/layout.tsx`); a route group doesn't affect the URL
path, but it does let that subtree have a completely independent
`<html>`/`<body>` shell and translation context from `[locale]`'s. The two
static files under `public/` are untouched by any of this, since
`middleware.ts`'s matcher excludes them outright.

## Rendering

- `app/[locale]/page.tsx` and `app/[locale]/layout.tsx` are Server
  Components: they only compose feature components, with no hooks or
  state of their own.
- Most feature components are Client Components (`"use client"`), since
  almost every section animates with `motion`. Converting a section to a
  Server Component would mean dropping its animation, which is out of
  scope for the restructuring steps (tracked separately, alongside the
  other animation work).
- The home page and privacy policy are static: prerendered at build time
  for each locale (`generateStaticParams`), with no per-request server
  rendering. The five deep-link routes are the exception — they're
  server-rendered on demand (`ƒ` in `next build`'s route summary), since
  the catalog slug in the URL is arbitrary user-shared content and can't
  be enumerated ahead of time.

## Decisions

- **Why SSG for the home page and privacy policy.** Neither has user
  accounts, per-visitor content, or data that changes between requests: an
  app catalog, screenshots, an FAQ, a privacy policy. There's nothing to
  render per request, so prerendering makes each one a static file,
  cacheable at the edge, with none of the cost of a server render nobody
  needs.
- **Why the deep-link routes are the one dynamic exception.** Each route
  resolves an arbitrary catalog slug shared from the app (e.g.
  `/widgets/some-widget`) into an "open in app" redirector page. The set
  of possible slugs isn't known at build time and grows as the app's
  catalog does, so these can't be statically enumerated the way the rest
  of the site can.
- **Why feature-first.** The site is a single long page made of clearly
  separate sections (hero, screenshots, FAQ, ...), each with its own copy,
  animation variants and, in a few cases, its own data. Grouping by feature
  keeps everything a section needs in one place, instead of splitting it
  across parallel `components/`, `constants/` and `@types/` trees the way
  the project did before this restructuring — the layout this document
  describes replaced that.
