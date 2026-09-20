# Pipeline de CI/CD

## Workflows

### `ci.yml`

Corre en cada push a `main` y en cada pull request.

- **`commit-lint`**: valida el título del PR contra `commitlint.ci.config.mjs`.
  Solo en pull request, ya que no hay título de PR en un push simple.
- **`quality`**: `format:check`, `lint`, `typecheck`. Un gate obligatorio.
- **`unit`**: `test:coverage`, exigiendo los umbrales en
  `vitest.config.mts`, y luego sube a Codecov. Codecov rechaza las subidas
  sin token, así que el paso se omite cuando no hay `CODECOV_TOKEN` y falla
  el job cuando una subida con token falla: un fallo silencioso dejaría la
  insignia de cobertura informando un commit anterior. Un gate
  obligatorio.
- **`vulnerabilities`**: `pnpm audit`, `osv-scanner` contra el lockfile,
  `gitleaks`. Solo informativo (`continue-on-error` en cada paso).
- **`build`**: `next build`, sube `.next` como artefacto para `e2e` y
  `lighthouse`. Las actions de artefacto siguen fijadas en v4, que es lo
  que soporta el servidor de artefactos local de `act` (nektos/act#6022), y
  la subida necesita `include-hidden-files` porque `.next` empieza por
  punto. Un gate obligatorio.
- **`e2e`**: descarga el artefacto del build, corre la suite de
  Playwright. Un gate obligatorio.
- **`lighthouse`**: descarga el artefacto del build, corre `lhci autorun`
  contra el build de producción. Solo informativo.

### `codeql.yml`, `dependency-review.yml`, `release-please.yml`

Cada uno hace una cosa: análisis estático, un gate de licencia/advisory
en PRs, y automatización de PR de release a partir de Conventional
Commits. Ver `docs/dependencies.md` para cómo interactúan Renovate y
release-please.

## Qué corre de verdad localmente, y qué no

Cada archivo de workflow se valida (YAML/JSON, `eslint`, `commitlint`,
schema) antes de confirmarse, pero no todos los jobs pueden correr de
punta a punta en esta máquina — algunos necesitan un PR de verdad, un
push de verdad, o una API de GitHub que `act` no puede simular. Para
esos jobs, "listo" significa que el archivo existe y es válido, no una
ejecución real.

Comprobable con `act`:

- `act -j quality`, `act -j build`, `act -j e2e`: corren de verdad.
- `act -j vulnerabilities`: corre de verdad; `gitleaks-action` falla bajo
  `act` porque su payload de evento simulado no tiene
  `repository.owner`, así que este job solo se ejercita de verdad con un
  push real.
- `act -j unit`: corre de verdad. La subida a Codecov se omite, ya que
  `act` no tiene `CODECOV_TOKEN`.
- `act -j lighthouse`: el job en sí pasa, pero `lhci` falla su
  healthcheck porque la imagen Docker de `act` no tiene Chrome instalado
  (el runner real `ubuntu-latest` sí lo tiene).

No comprobable con `act` (la validez del archivo es el criterio de
finalización): `commit-lint` (necesita un título de PR real),
`codeql.yml` (necesita GitHub Advanced Security), `dependency-review.yml`
(necesita el grafo de dependencias de GitHub), `release-please.yml`
(necesita permiso de escritura para abrir un PR de release).

## Ejecutar `act` localmente

```sh
act -j <nombre-del-job>
```

`.actrc` fija la imagen del runner en `catthehacker/ubuntu:act-latest`.
`actions/upload-artifact` y `actions/download-artifact` quedan fijados
en `v4` en `ci.yml` — versiones mayores más nuevas no funcionan con el
servidor de artefactos local de `act` (`nektos/act#6022`).

## Depurar un fallo de e2e

1. Corre `pnpm run test:e2e` localmente primero — es más rápido de
   iterar que `act`.
2. Un fallo en CI sube `playwright-report/` y `test-results/` como
   artefacto; descárgalo y abre `playwright-report/index.html` para ver
   traces, capturas de pantalla y videos de cada prueba fallida.
3. `mobile-chrome` solo corre las specs `smoke`, `app-integration`,
   `a11y` y `navigation` (ver `testMatch` en `playwright.config.ts`) —
   un fallo específico de ese proyecto casi siempre es un problema de
   viewport móvil o de interacción táctil, no un problema compartido.
