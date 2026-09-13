# Dependencias

## Versiones exactas, y por qué

La mayoría de las dependencias usa `^`, así que Renovate puede
actualizarlas libremente. Algunas quedan fijadas en una versión exacta a
propósito:

- **`react`, `react-dom`**: mantenidas en sincronía con la versión exacta
  que espera el release instalado de `next`.
- **`next`, `eslint-config-next`**: actualizadas juntas a mano, ya que un
  major de Next puede cambiar valores por defecto (nuevas reglas de
  ESLint, Turbopack pasando a ser el predeterminado, etc.) que necesitan
  una mirada a nivel de código fuente, no una actualización automática.

Renovate está configurado para dejar `next`, `eslint-config-next`,
`react` y `react-dom` intactos (ver `renovate.json`). Actualizar
cualquiera de ellos es un cambio dedicado propio, no un PR de Renovate.

## Configuración de Renovate

`renovate.json` extiende `config:recommended` con:

- **Agenda semanal**: un lote de PRs por semana en vez de uno por
  release.
- **Prefijo de commit `build(deps):`**, acorde a la convención de commits
  de este repositorio.
- **GitHub Actions agrupadas** en un único PR por semana, ya que
  actualizar versiones de action rara vez necesita revisión individual.

## Cómo evaluar un PR de Renovate

1. Lee las notas de la versión enlazadas en el cuerpo del PR en busca de
   algo que rompa.
2. Corre `pnpm run verify` localmente en el branch del PR.
3. Si es un solo paquete de bajo riesgo (un bump patch o minor con
   `verify` limpio), haz merge tal cual.
4. Si afecta algo con UI visible (`motion`, `embla-carousel-react`,
   `tailwindcss`, `@radix-ui/*`), revisa la app en un navegador antes de
   hacer merge, no solo la suite de pruebas — las regresiones visuales no
   hacen fallar las pruebas.
5. Si `verify` falla, decide si el arreglo pertenece al mismo PR (pequeño,
   mecánico) o como un cambio de seguimiento (cualquier cosa que afecte
   el comportamiento de `src/` más allá de renombrar un import).
