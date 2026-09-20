<br>
<div align="center">
<img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js">
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
<img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
</div>
<br>

<p align="center">
<a href="https://github.com/dariomatias-dev/flutter-guide-web/actions/workflows/ci.yml"><img src="https://github.com/dariomatias-dev/flutter-guide-web/actions/workflows/ci.yml/badge.svg" alt="CI: build passing"></a>
<a href="https://codecov.io/github/dariomatias-dev/flutter-guide-web"><img src="https://codecov.io/github/dariomatias-dev/flutter-guide-web/graph/badge.svg" alt="Coverage reported to Codecov"></a>
<a href="LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue" alt="License: MIT"></a>
<img src="https://img.shields.io/badge/node-%3E%3D24-339933?logo=node.js&logoColor=white" alt="Node.js: 24 or newer">
</p>

<p align="center">
<strong>English</strong> · <a href="README.es.md">Español</a> · <a href="README.pt-BR.md">Português (BR)</a>
</p>

<h1 align="center">FlutterGuide</h1>

<p align="center">
The official website for the FlutterGuide Android app: a free, open-source catalog of runnable Flutter and Dart samples, each with a live preview and its source code.
<br>
<a href="#about-the-project"><strong>Explore the docs »</strong></a>
<br>
<br>
<a href="https://github.com/dariomatias-dev/flutter-guide-web/issues/new?template=bug_report.yml">Report Bug</a> ·
<a href="https://github.com/dariomatias-dev/flutter-guide-web/issues/new?template=feature_request.yml">Request Feature</a>
</p>

## Table of Contents

- [About the Project](#about-the-project)
- [Preview](#preview)
- [Features](#features)
- [The App](#the-app)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Testing](#testing)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [Security](#security)
- [License](#license)
- [Author](#author)

## About the Project

This repository holds the marketing site for the FlutterGuide mobile app, live at
[flutter-guide-web.vercel.app](https://flutter-guide-web.vercel.app/). It presents the app's
catalog, shows its screens, answers the common questions, and sends visitors to the Play Store.

It also serves the routes the app itself depends on: the shareable deep links
(`/widgets/<name>` and four sibling paths), the Android App Links verification file, and the
privacy policy the store listing points at.

The FlutterGuide app lives in a separate repository,
[flutter_guide_app](https://github.com/dariomatias-dev/flutter_guide_app).

## Preview

Screens from the app, the ones the site puts in front of the visitor:

<div align="center">
<img src="public/screenshots/01_home.png" width="200" alt="The app's home screen">
<img src="public/screenshots/05_component_detail.png" width="200" alt="A sample's live preview">
<img src="public/screenshots/06_component_code.png" width="200" alt="The same sample's source code">
</div>

## Features

- One page in three languages (English, Portuguese and Spanish), routed by `next-intl`.
- A changelog page built from the app's `CHANGELOG.md` on GitHub, parsed at build time and
  regenerated hourly, which also feeds the home page preview and the version badge in the hero.
- Deep-link pages that open a shared sample in the app, with a Play Store fallback.
- Screenshot carousel with a full-screen viewer, and an Android device frame drawn in CSS.
- Reveal-on-scroll and entrance animations in CSS: no animation library, and content stays
  visible without JavaScript and with reduced motion.
- Accessibility checked with axe on every page, in CI.
- SEO: per-locale canonical URLs, hreflang, sitemap, robots, Open Graph image and JSON-LD.
- Security headers with a Content Security Policy, checked end to end.

## The App

The app organizes its catalog into five categories. Each sample has a shareable link that this
site resolves into the app:

| Category  | What it covers                       |
| --------- | ------------------------------------ |
| Widgets   | Built-in and custom Flutter widgets  |
| Functions | Reusable Dart functions and snippets |
| Packages  | Notable community packages           |
| Elements  | Smaller UI building blocks           |
| UIs       | Full UI patterns and screen ideas    |

Get **FlutterGuide** on the **Google Play Store**:

<a href="https://play.google.com/store/apps/details?id=com.dariomatias.flutter_guide" target="_blank">
<img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" width="200">
</a>

## Tech Stack

- Next.js (App Router) with React and TypeScript in strict mode.
- Tailwind CSS v4, with tokens defined in `src/app/globals.css`.
- `next-intl` for routing, messages and formatting in three locales.
- Radix UI primitives (dialog, dropdown menu, accordion), wrapped shadcn-style.
- Embla Carousel for the screenshots, and Shiki for build-time syntax highlighting.
- Vitest with Testing Library, and Playwright with axe.
- ESLint, Prettier, Husky, commitlint, Renovate and GitHub Actions.

## Architecture

The code is organized feature first under `src/features/<name>/`, with only genuinely shared
code in `src/shared/`. The dependency direction (`app` → `features` → `shared`) is enforced by
ESLint, so a cross-boundary import fails `pnpm run lint`. See
[docs/architecture.md](docs/architecture.md).

## Getting Started

Prerequisites: Node.js 24 or newer, and pnpm 10 (pinned in `package.json`'s `packageManager`
field).

```bash
git clone https://github.com/dariomatias-dev/flutter-guide-web.git
cd flutter-guide-web
pnpm install
pnpm run dev                  # http://localhost:3000
```

## Scripts

| Command                      | Description                                      |
| ---------------------------- | ------------------------------------------------ |
| `pnpm run dev`               | Development server                               |
| `pnpm run build`             | Production build                                 |
| `pnpm run start`             | Serve the production build                       |
| `pnpm run lint`              | ESLint                                           |
| `pnpm run typecheck`         | `tsc --noEmit`                                   |
| `pnpm run format`            | Prettier (write)                                 |
| `pnpm run test`              | Vitest (watch)                                   |
| `pnpm run test:run`          | Vitest (single run)                              |
| `pnpm run test:coverage`     | Vitest with the coverage floors                  |
| `pnpm run test:e2e`          | Playwright (navigation, a11y, SEO, app links)    |
| `pnpm run check-bundle-size` | Check the JS bundle budget (needs a build first) |
| `pnpm run verify`            | The full local gate, in the order CI runs it     |

## Testing

- Unit and component tests with Vitest and Testing Library (`pnpm run test:run`), with coverage
  floors enforced in CI.
- End-to-end tests with Playwright (`pnpm run test:e2e`), covering navigation, accessibility
  with axe, SEO metadata, and the routes the Android app depends on.
- One command runs the same gate CI runs, in the same order: `pnpm run verify`.

See [docs/testing.md](docs/testing.md) for what is tested, what is deliberately excluded, and
why.

## Deployment

Deployment runs on Vercel, with a preview per pull request and production on merge to `main`.
[GitHub Actions CI](.github/workflows/ci.yml) runs the gates that block a merge: format, lint,
types, documentation parity, unit tests with coverage, build with a bundle budget, and the
end-to-end suite. Dependency and secret scanning run as reports. Releases are versioned
automatically by [release-please](https://github.com/googleapis/release-please), which keeps a
standing pull request with `CHANGELOG.md` and the version bump.

## Documentation

| Document                              | Covers                                 |
| ------------------------------------- | -------------------------------------- |
| [Architecture](docs/architecture.md)  | Structure, layering rules, decisions   |
| [Testing](docs/testing.md)            | What is tested, coverage floors, gaps  |
| [CI](docs/ci.md)                      | Pipeline jobs and running them locally |
| [Dependencies](docs/dependencies.md)  | Pinned versions, Renovate, triage      |
| [Performance](docs/performance.md)    | Bundle size budget                     |
| [Security](docs/security.md)          | Headers, CSP, dependency scanning      |
| [Contributing](CONTRIBUTING.md)       | Setup, the local gate, pull requests   |
| [Code of Conduct](CODE_OF_CONDUCT.md) | Behaviour expected in project spaces   |

Each document under `docs/` is also available in [Español](docs/architecture.es.md) and
[Português (BR)](docs/architecture.pt-BR.md).

## Contributing

Bug reports, fixes and content corrections are welcome. See
[CONTRIBUTING.md](CONTRIBUTING.md) for the setup, the local gate (`pnpm run verify`) and the
commit convention. Participation is covered by the
[Code of Conduct](CODE_OF_CONDUCT.md).

## Security

Found a vulnerability? Please don't open a public issue. See
[docs/security.md](docs/security.md) for how to report it privately.

## License

Distributed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

## Author

Developed by **Dário Matias Sales**:

- Portfolio: [https://dariomatias-dev.com](https://dariomatias-dev.com)
- GitHub: [https://github.com/dariomatias-dev](https://github.com/dariomatias-dev)
- Email: [dariomatias.dev@gmail.com](mailto:dariomatias.dev@gmail.com)
- Instagram: [https://instagram.com/dariomatias_dev](https://instagram.com/dariomatias_dev)
- LinkedIn: [https://linkedin.com/in/dariomatias-dev](https://linkedin.com/in/dariomatias-dev)
