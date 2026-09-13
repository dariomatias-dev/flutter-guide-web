<p align="center">
  <img src="https://github.com/dariomatias-dev/flutter-guide-web/actions/workflows/ci.yml/badge.svg" alt="CI: estado">
  <img src="https://codecov.io/github/dariomatias-dev/flutter-guide-web/graph/badge.svg" alt="Cobertura: codecov">
  <img src="https://img.shields.io/github/license/dariomatias-dev/flutter-guide-web" alt="Licencia: MIT">
</p>

<p align="center">
  <a href="README.md">English</a> ·
  <strong>Español</strong> ·
  <a href="README.pt-BR.md">Português (BR)</a>
</p>

<h1 align="center">FlutterGuide</h1>

<p align="center">
  El sitio web oficial de la app Android FlutterGuide: un compañero
  gratuito y de código abierto con widgets, funciones, paquetes e ideas de
  UI seleccionados para desarrolladores Flutter.
</p>

<p align="center">
  <a href="#acerca-de"><strong>Explorar la documentación »</strong></a>
  ·
  <a href="https://github.com/dariomatias-dev/flutter-guide-web/issues/new?template=bug_report.yml">Reportar Error</a>
  ·
  <a href="https://github.com/dariomatias-dev/flutter-guide-web/issues/new?template=feature_request.yml">Solicitar Función</a>
</p>

## Índice

- [Acerca de](#acerca-de)
- [Contenido](#contenido)
- [Stack Tecnológico](#stack-tecnológico)
- [Arquitectura](#arquitectura)
- [Primeros Pasos](#primeros-pasos)
- [Pruebas](#pruebas)
- [Scripts](#scripts)
- [Documentación](#documentación)
- [Capturas de Pantalla](#capturas-de-pantalla)
- [Descargar la App](#descargar-la-app)
- [Contribuir](#contribuir)
- [Registro de Cambios](#registro-de-cambios)
- [Licencia](#licencia)
- [Autor](#autor)

## Acerca de

Este es el repositorio del sitio web oficial de la app FlutterGuide,
disponible en
[flutter-guide-web.vercel.app](https://flutter-guide-web.vercel.app/).
Presenta la app, sus categorías de contenido, capturas de pantalla, y
enlaza directamente a la Play Store.

Este repositorio contiene solo el código del sitio. El código de la app
FlutterGuide en sí vive en un repositorio aparte.

## Contenido

La app organiza el contenido de Flutter en cinco categorías, cada una con
su propio deep link desde el sitio
(`flutterguide://open.app/<categoría>/<slug>`):

| Categoría | Qué cubre                                           |
| --------- | --------------------------------------------------- |
| Widgets   | Widgets nativos y personalizados de Flutter         |
| Functions | Funciones y fragmentos de código Dart reutilizables |
| Packages  | Paquetes relevantes de la comunidad                 |
| Elements  | Bloques más pequeños de UI                          |
| UIs       | Patrones completos de UI e ideas de pantalla        |

## Stack Tecnológico

- **[Next.js](https://nextjs.org/)** (App Router) - framework de React,
  completamente estático.
- **[React](https://react.dev/)** y **[TypeScript](https://www.typescriptlang.org/)**.
- **[Tailwind CSS](https://tailwindcss.com/)** - estilos utility-first.
- **[Radix UI](https://www.radix-ui.com/)** - primitivas accesibles
  (diálogo, accordion), envueltas al estilo shadcn.
- **[Motion](https://motion.dev/)** - animación.
- **[Embla Carousel](https://www.embla-carousel.com/)** - el carrusel de
  capturas de pantalla.
- **[Vitest](https://vitest.dev/)** y **[Testing Library](https://testing-library.com/)** - pruebas unitarias y de componentes.
- **[Playwright](https://playwright.dev/)** - pruebas end-to-end.

## Arquitectura

Estructura feature-first bajo `src/features/<nombre>/`, con código
compartido en `src/shared/`. La dirección de dependencia (`app` →
`features` → `shared`) la impone ESLint. Ver
[`docs/architecture.md`](docs/architecture.md) para el detalle completo
(en inglés).

## Primeros Pasos

### Requisitos previos

- Node.js 24+
- [pnpm](https://pnpm.io/) 10 (fijado en el campo `packageManager` de
  `package.json`)

### Instalación

```sh
git clone https://github.com/dariomatias-dev/flutter-guide-web.git
cd flutter-guide-web
pnpm install
```

### Ejecutar localmente

```sh
pnpm run dev
```

Abre [http://localhost:3000](http://localhost:3000) para verlo.

## Pruebas

```sh
pnpm run test        # pruebas unitarias/de componentes, modo watch
pnpm run test:e2e    # pruebas end-to-end (Playwright)
pnpm run verify       # el gate local completo: typecheck, lint, format, cobertura, build, e2e
```

La cobertura tiene un piso exigido en el CI; ver
[`docs/testing.md`](docs/testing.md) (en inglés) para qué se prueba, qué
se excluye a propósito, y por qué.

## Scripts

| Script                       | Descripción                                                  |
| ---------------------------- | ------------------------------------------------------------ |
| `pnpm run dev`               | Inicia el servidor de desarrollo                             |
| `pnpm run build`             | Build de producción                                          |
| `pnpm run start`             | Sirve un build de producción                                 |
| `pnpm run lint`              | ESLint                                                       |
| `pnpm run typecheck`         | `tsc --noEmit`                                               |
| `pnpm run format`            | Formatea con Prettier                                        |
| `pnpm run test`              | Pruebas unitarias/de componentes (modo watch)                |
| `pnpm run test:e2e`          | Pruebas end-to-end                                           |
| `pnpm run check-bundle-size` | Verifica el presupuesto del bundle JS (necesita build antes) |
| `pnpm run verify`            | El mismo gate local que corre el CI                          |

## Documentación

Los siguientes documentos están en inglés:

| Documento                                      | Cubre                                          |
| ---------------------------------------------- | ---------------------------------------------- |
| [`docs/architecture.md`](docs/architecture.md) | Estructura del proyecto, reglas de dependencia |
| [`docs/testing.md`](docs/testing.md)           | Qué se prueba, piso de cobertura, brechas      |
| [`docs/ci.md`](docs/ci.md)                     | Pipeline de CI/CD, ejecutar checks localmente  |
| [`docs/dependencies.md`](docs/dependencies.md) | Versiones fijas, Renovate, triage              |
| [`docs/performance.md`](docs/performance.md)   | Presupuesto de tamaño de bundle                |
| [`docs/security.md`](docs/security.md)         | Cabeceras, CSP, escaneo de dependencias        |

## Capturas de Pantalla

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

## Descargar la App

Consigue **FlutterGuide** en la **Google Play Store**:

<a href="https://play.google.com/store/apps/details?id=com.dariomatias.flutter_guide" target="_blank">
  <img src="https://play.google.com/intl/es/badges/static/images/badges/es_badge_web_generic.png" alt="Disponible en Google Play" width="200">
</a>

## Contribuir

Las contribuciones son bienvenidas. Ver
[`CONTRIBUTING.md`](CONTRIBUTING.md) (en inglés) para la configuración
local, el gate de verificación, y el checklist de pull request.

## Registro de Cambios

Generado automáticamente por
[release-please](https://github.com/googleapis/release-please) a partir
de Conventional Commits. Después del primer release, ver
`CHANGELOG.md`.

## Licencia

Distribuido bajo la **Licencia MIT**. Ver [`LICENSE`](LICENSE) para el
texto completo.

## Autor

Desarrollado por **Dário Matias**:

- **Portafolio**: [dariomatias-dev.com](https://dariomatias-dev.com)
- **GitHub**: [@dariomatias-dev](https://github.com/dariomatias-dev)
- **Correo**: [matiasdario75@gmail.com](mailto:matiasdario75@gmail.com)
- **Instagram**: [@dariomatias_dev](https://instagram.com/dariomatias_dev)
- **LinkedIn**: [linkedin.com/in/dariomatias-dev](https://linkedin.com/in/dariomatias-dev)
