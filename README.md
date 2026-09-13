<p align="center">
  <img src="https://github.com/dariomatias-dev/flutter-guide-web/actions/workflows/ci.yml/badge.svg" alt="CI: status">
  <img src="https://codecov.io/github/dariomatias-dev/flutter-guide-web/graph/badge.svg" alt="Coverage: codecov">
  <img src="https://img.shields.io/github/license/dariomatias-dev/flutter-guide-web" alt="License: MIT">
</p>

<p align="center">
  <strong>English</strong> ·
  <a href="README.es.md">Español</a> ·
  <a href="README.pt-BR.md">Português (BR)</a>
</p>

<h1 align="center">FlutterGuide</h1>

<p align="center">
  The official website for the FlutterGuide Android app: a free, open-source
  companion with curated widgets, functions, packages, and UI ideas for
  Flutter developers.
</p>

<p align="center">
  <a href="#about"><strong>Explore the docs »</strong></a>
  ·
  <a href="https://github.com/dariomatias-dev/flutter-guide-web/issues/new?template=bug_report.yml">Report Bug</a>
  ·
  <a href="https://github.com/dariomatias-dev/flutter-guide-web/issues/new?template=feature_request.yml">Request Feature</a>
</p>

## Table of Contents

- [About](#about)
- [Contents](#contents)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Testing](#testing)
- [Scripts](#scripts)
- [Documentation](#documentation)
- [Screenshots](#screenshots)
- [Download the App](#download-the-app)
- [Contributing](#contributing)
- [Changelog](#changelog)
- [License](#license)
- [Author](#author)

## About

This is the repository for the official website of the FlutterGuide mobile
app, live at [flutter-guide-web.vercel.app](https://flutter-guide-web.vercel.app/).
It showcases the app, presents its content categories, displays screenshots,
and links to the Play Store listing.

This repository contains only the website's code. The FlutterGuide mobile
app itself lives in a separate repository.

## Contents

The app organizes Flutter content into five categories, each with its own
deep link from the site (`flutterguide://open.app/<category>/<slug>`):

| Category  | What it covers                       |
| --------- | ------------------------------------ |
| Widgets   | Built-in and custom Flutter widgets  |
| Functions | Reusable Dart functions and snippets |
| Packages  | Notable community packages           |
| Elements  | Smaller UI building blocks           |
| UIs       | Full UI patterns and screen ideas    |

## Tech Stack

- **[Next.js](https://nextjs.org/)** (App Router) - React framework, fully
  statically generated.
- **[React](https://react.dev/)** and **[TypeScript](https://www.typescriptlang.org/)**.
- **[Tailwind CSS](https://tailwindcss.com/)** - utility-first styling.
- **[Radix UI](https://www.radix-ui.com/)** - accessible primitives (dialog,
  accordion), wrapped shadcn-style.
- **[Motion](https://motion.dev/)** - animation.
- **[Embla Carousel](https://www.embla-carousel.com/)** - the screenshots
  carousel.
- **[Vitest](https://vitest.dev/)** and **[Testing Library](https://testing-library.com/)** - unit and component tests.
- **[Playwright](https://playwright.dev/)** - end-to-end tests.

## Architecture

Feature-first structure under `src/features/<name>/`, with shared code in
`src/shared/`. Dependency direction (`app` → `features` → `shared`) is
enforced by ESLint. See [`docs/architecture.md`](docs/architecture.md) for
the full write-up.

## Getting Started

### Prerequisites

- Node.js 24+
- [pnpm](https://pnpm.io/) 10 (pinned in `package.json`'s `packageManager` field)

### Installation

```sh
git clone https://github.com/dariomatias-dev/flutter-guide-web.git
cd flutter-guide-web
pnpm install
```

### Running locally

```sh
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Testing

```sh
pnpm run test        # unit/component tests, watch mode
pnpm run test:e2e    # end-to-end tests (Playwright)
pnpm run verify       # the full local gate: typecheck, lint, format, coverage, build, e2e
```

Coverage has a floor enforced in CI; see
[`docs/testing.md`](docs/testing.md) for what's tested, what's
intentionally excluded, and why.

## Scripts

| Script                       | Description                                      |
| ---------------------------- | ------------------------------------------------ |
| `pnpm run dev`               | Start the dev server                             |
| `pnpm run build`             | Production build                                 |
| `pnpm run start`             | Serve a production build                         |
| `pnpm run lint`              | ESLint                                           |
| `pnpm run typecheck`         | `tsc --noEmit`                                   |
| `pnpm run format`            | Format with Prettier                             |
| `pnpm run test`              | Unit/component tests (watch mode)                |
| `pnpm run test:e2e`          | End-to-end tests                                 |
| `pnpm run check-bundle-size` | Check the JS bundle budget (needs a build first) |
| `pnpm run verify`            | The full local gate CI also runs                 |

## Documentation

| Document                                       | Covers                                 |
| ---------------------------------------------- | -------------------------------------- |
| [`docs/architecture.md`](docs/architecture.md) | Project structure, dependency rules    |
| [`docs/testing.md`](docs/testing.md)           | What's tested, coverage floor, gaps    |
| [`docs/ci.md`](docs/ci.md)                     | CI/CD pipeline, running checks locally |
| [`docs/dependencies.md`](docs/dependencies.md) | Pinned versions, Renovate, triage      |
| [`docs/performance.md`](docs/performance.md)   | Bundle size budget                     |
| [`docs/security.md`](docs/security.md)         | Headers, CSP, dependency scanning      |

## Screenshots

<div align="center">
  <img src="public/screenshots/flutter_guide_screen_1.jpg" width="200" alt="Screenshot 1"/>
  <img src="public/screenshots/flutter_guide_screen_2.jpg" width="200" alt="Screenshot 2"/>
  <img src="public/screenshots/flutter_guide_screen_3.jpg" width="200" alt="Screenshot 3"/>
  <img src="public/screenshots/flutter_guide_screen_4.jpg" width="200" alt="Screenshot 4"/>
  <img src="public/screenshots/flutter_guide_screen_5.jpg" width="200" alt="Screenshot 5"/>
  <img src="public/screenshots/flutter_guide_screen_6.jpg" width="200" alt="Screenshot 6"/>
  <img src="public/screenshots/flutter_guide_screen_7.jpg" width="200" alt="Screenshot 7"/>
  <img src="public/screenshots/flutter_guide_screen_8.jpg" width="200" alt="Screenshot 8"/>
  <img src="public/screenshots/flutter_guide_screen_9.jpg" width="200" alt="Screenshot 9"/>
  <img src="public/screenshots/flutter_guide_screen_10.jpg" width="200" alt="Screenshot 10"/>
  <img src="public/screenshots/flutter_guide_screen_11.jpg" width="200" alt="Screenshot 11"/>
  <img src="public/screenshots/flutter_guide_screen_12.jpg" width="200" alt="Screenshot 12"/>
</div>

## Download the App

Get **FlutterGuide** on the **Google Play Store**:

<a href="https://play.google.com/store/apps/details?id=com.dariomatias.flutter_guide" target="_blank">
  <img src="https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png" alt="Get it on Google Play" width="200">
</a>

## Contributing

Contributions are welcome. See [`CONTRIBUTING.md`](CONTRIBUTING.md) for
the local setup, the verification gate, and the pull request checklist.

## Changelog

Generated automatically by [release-please](https://github.com/googleapis/release-please)
from Conventional Commits. Once a release has shipped, see `CHANGELOG.md`.

## License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for the
full text.

## Author

Developed by **Dário Matias**:

- **Portfolio**: [dariomatias-dev.com](https://dariomatias-dev.com)
- **GitHub**: [@dariomatias-dev](https://github.com/dariomatias-dev)
- **Email**: [matiasdario75@gmail.com](mailto:matiasdario75@gmail.com)
- **Instagram**: [@dariomatias_dev](https://instagram.com/dariomatias_dev)
- **LinkedIn**: [linkedin.com/in/dariomatias-dev](https://linkedin.com/in/dariomatias-dev)
