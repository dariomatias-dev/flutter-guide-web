# Architecture

How the code is organized and why.

## Layout

```text
src/
├── app/
│   ├── [locale]/             the real site, routed by locale
│   │   ├── layout.tsx       html shell, Header, Footer, NextIntlClientProvider
│   │   ├── page.tsx         home page
│   │   ├── not-found.tsx    404 page
│   │   ├── opengraph-image.tsx
│   │   └── privacy-policy/
│   ├── (deep-links)/         English-only, locale-independent root layout
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
│   ├── catalog/              the catalog bento and the pub.dev packages marquee
│   ├── changelog/            release notes fetched from the app's CHANGELOG.md, the /changelog page and the home "What's new" preview
│   ├── deep-links/           the "opening in the app" redirector page
│   ├── download-cta/         the closing "get the app" band
│   ├── examples/             code window + live preview, highlighted with shiki at build time
│   ├── faq/
│   ├── features-showcase/    feature grid and author card
│   ├── hero/
│   ├── layout/               header, header menu, footer, language switcher
│   ├── legal/                privacy policy content
│   ├── open-source/          quality stats and contributing call
│   ├── screenshots/          carousel and image viewer
│   └── share/
│
├── i18n/                     next-intl wiring: routing, navigation, request config
│
└── shared/                   code with no feature of its own
    ├── components/            logo, section-heading, phone-frame, buttons, brand icons
    │   └── ui/                shadcn primitives (accordion, breadcrumb, dialog)
    └── lib/                   cn (class merging), site (external URLs), locale-alternates

messages/                    one JSON file per locale (en, pt-BR, es)
src/proxy.ts                 next-intl's locale-detection/redirect proxy (Next 16's middleware)
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
unprefixed, the default), `pt-BR` and `es` (both prefixed, e.g.
`/pt-BR/privacy-policy`). Locale detection is off (`localeDetection:
false`), so `/` always serves English and the language only changes when
a visitor picks one. `src/proxy.ts` and `src/i18n/routing.ts` define
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
`src/proxy.ts`'s matcher excludes them outright.

## Rendering

- `app/[locale]/page.tsx` and `app/[locale]/layout.tsx` are Server
  Components: they only compose feature components, with no hooks or
  state of their own.
- Section components are Server Components wherever they have no state
  of their own; only the header, the language switcher, the screenshots
  carousel, the FAQ accordion, the animated counters and the deep-link
  page ship to the client. Reveal-on-scroll is one small client component
  (`RevealObserver`) that adds `.is-visible` to `.reveal` elements; the
  hidden starting state sits behind `@media (scripting: enabled)`, so
  content stays visible with JavaScript off or with reduced motion.
- The privacy policy is static: prerendered at build time for each
  locale (`generateStaticParams`). The home page and `/changelog` are
  prerendered too, then regenerated in the background at most once an
  hour (incremental static regeneration), because they show release data
  fetched from the app's `CHANGELOG.md` on GitHub. The five deep-link
  routes are the exception — they're server-rendered on demand (`ƒ` in
  `next build`'s route summary), since the catalog slug in the URL is
  arbitrary user-shared content and can't be enumerated ahead of time.

## Decisions

- **Why SSG for the home page and privacy policy.** Neither has user
  accounts, per-visitor content, or data that changes between requests: an
  app catalog, screenshots, an FAQ, a privacy policy. There's nothing to
  render per request, so prerendering makes each one a static file,
  cacheable at the edge, with none of the cost of a server render nobody
  needs.
- **Why the changelog is fetched, not copied.** The app's `CHANGELOG.md`
  (Keep a Changelog format) is the single source of truth for releases.
  Fetching and parsing it (`features/changelog`) means a new app release
  shows up on the site within the hour, with no deploy and no copy to keep
  in sync. It's kept in English, as written; the page chrome is localized.
  If GitHub can't be reached, the page renders a link to the file instead
  of failing.
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
