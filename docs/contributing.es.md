# Contribuir

## Configuración

```sh
git clone https://github.com/dariomatias-dev/flutter_guide_web.git
cd flutter_guide_web
pnpm install
```

Se necesitan Node.js 24+ y pnpm 10; la versión de pnpm está fijada en el
campo `packageManager` de `package.json`. Ver
[Primeros Pasos](../README.es.md#primeros-pasos) del README para
ejecutar el servidor de desarrollo.

## Antes de abrir un pull request

- [ ] El código y los comentarios están en inglés (ver `AGENTS.md`).
- [ ] El código nuevo sigue la estructura de `docs/architecture.md` —
      archivos propios de la feature, no repartidos en árboles
      paralelos.
- [ ] Un cambio de comportamiento tiene una prueba; ver
      `docs/testing.md` para qué la merece.
- [ ] `pnpm run verify` pasa localmente.
- [ ] El mensaje de commit sigue la convención de `AGENTS.md`.

## El gate local

```sh
pnpm run verify
```

Refleja lo que corre el CI: typecheck, lint, verificación de formato,
pruebas unitarias con cobertura, build, y pruebas end-to-end. Usa
`pnpm run verify --fast` para saltar el build y el e2e mientras iteras.

## Qué verifica el CI

| Job               | Qué hace                                        | ¿Bloquea el merge? |
| ----------------- | ----------------------------------------------- | ------------------ |
| `commit-lint`     | Valida el título del PR (Conventional Commits)  | Sí                 |
| `quality`         | Verificación de formato, lint, typecheck        | Sí                 |
| `unit`            | Pruebas unitarias con cobertura, sube a Codecov | Sí                 |
| `vulnerabilities` | `pnpm audit`, `osv-scanner`, `gitleaks`         | No (solo informe)  |
| `build`           | Build de producción                             | Sí                 |
| `e2e`             | Pruebas end-to-end de Playwright                | Sí                 |
| `lighthouse`      | Lighthouse CI contra el build                   | No (solo informe)  |

CodeQL, la verificación de dependency review, y Renovate corren como
workflows separados; ver `docs/ci.md` y `docs/dependencies.md`.

## Reproducir el CI localmente

```sh
act -j <nombre-del-job>
```

Una corrida verde de `act` es una señal fuerte, no una garantía —
algunos jobs necesitan un PR o push real y no pueden correr localmente
en absoluto. Ver `docs/ci.md` para cuáles son, y cómo depurar un fallo
de e2e.

## Trabajar con un agente de IA

Este repositorio lleva instrucciones de agente en `AGENTS.md` (y
`CLAUDE.md`, que solo apunta a él). Cambiar ese archivo es un cambio
normal, revisado como cualquier otro.

## Actualizaciones de dependencias

Renovate abre PRs de actualización de dependencias en una agenda
semanal. Ver `docs/dependencies.md` para qué paquetes están fijados, por
qué, y cómo evaluar un PR de Renovate.

## Convenciones de commit y branch

Conventional Commits, con alcance por área (no ruta de archivo); ver
`AGENTS.md`. Los nombres de branch describen lo que contienen, no la
herramienta o proceso que los creó.

Al participar en este proyecto, aceptas seguir el
[Código de Conducta](../CODE_OF_CONDUCT.md).
