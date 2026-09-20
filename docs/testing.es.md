# Pruebas

## La cobertura es un piso, no una meta

Los umbrales en `vitest.config.mts` son lo medido menos un margen
pequeño (lo medido era 99.11/99.06/98.63/100 el 2026-09-20, umbrales
ajustados a 97/97/97/99), no una meta hacia la que escribir pruebas.
Súbelos cuando un cambio mejore el agregado de forma medible; bajar uno
necesita un motivo en el mensaje del commit. Lo que importa más que el
número es _qué_ probar:

- **Lógica real**: un cálculo, una rama, un fragmento de estado que
  puede estar mal. El emparejamiento de categoría de
  `resolveAppDeepLink`, el estado abierto/cerrado del menú del header, el
  expandir/colapsar del accordion de la FAQ — todos merecen una prueba.
- **Interacción real del usuario**: hacer clic en algo, esperar un
  resultado específico. Las pruebas de componentes aquí renderizan el
  componente real e interactúan con él mediante consultas de Testing
  Library (`getByRole`, `getByText`), no accediendo a los internos.
- **Destinos de enlaces**: todo botón o enlace que apunte a algún lugar
  externo (GitHub, la Play Store, el portafolio del autor) merece una
  verificación — es exactamente el tipo de cosa que un error de copiar y
  pegar rompe silenciosamente.

Cada componente de sección (`features/*/components/*-section.tsx` y
`*-content.tsx`) tiene su propia prueba: el título traducido se
renderiza, cada card/enlace proveniente de datos está presente, y los
enlaces externos apuntan al lugar correcto. Incluso "markup fijo sin
ramas" merece una verificación de renderizado — es exactamente el tipo
de archivo que un copiar y pegar erróneo o una clave de traducción
faltante rompe silenciosamente, sin nada en `pnpm lint` o `tsc` que lo
detecte.

Lo que deliberadamente **no** se persigue, y queda excluido de la
cobertura en `vitest.config.mts`:

- **Datos puros**: los arreglos estáticos en `features/*/data/**` y el
  código de ejemplo en `examples/lib/code-snippet.ts`. Nada que
  ramificar.
- **Primitivas shadcn/Radix** (`shared/components/ui/**`): solo estilos,
  sin lógica propia.
- **`app/[locale]/page.tsx` y `app/[locale]/privacy-policy/page.tsx`**:
  composición pura de componentes de feature ya probados, sin lógica
  propia. Cubiertos de verdad por `e2e/smoke.spec.ts` en su lugar.
- **Configuración declarativa sin ramas propias** (`i18n/routing.ts`,
  `i18n/navigation.ts`, `proxy.ts`, `shared/lib/fonts.ts`) y
  **convenciones de ruta generadas** (`app/manifest.ts`,
  `app/robots.ts`, `app/[locale]/opengraph-image.tsx`). `i18n/request.ts`
  parece igual pero no lo es: elige un idioma de reserva, que es una rama
  real, así que se prueba directamente (ver "Dobles de prueba" abajo) en
  vez de excluirse.

Un archivo que solo exporta constantes (`shared/lib/site.ts`,
`shared/lib/catalog-stats.ts`) no necesita una entrada de exclusión ni
una prueba propia: sus únicas "declaraciones" (incluido un `.reduce`
sobre un arreglo literal) se ejecutan en el momento en que algo importa
el módulo, así que aparece al 100% en cuanto una prueba lo toca.
`catalog-stats.ts` llevaba una entrada de exclusión que nunca necesitó.

## Brecha conocida, no exclusión

Esta sigue contando contra el piso de cobertura, a propósito, para que
arreglarla suba el número en vez de olvidarse en silencio:

- **`onDotButtonClick` en `screenshots-carousel.tsx`**: nunca ve un
  `emblaApi` verdadero bajo jsdom, ya que embla nunca se inicializa del
  todo sin anchos de slide reales (ver "Dobles de prueba" abajo) — hacer
  clic en un botón de dot en la prueba de componente siempre cae en la
  rama de retorno anticipado. El comportamiento real de navegar al hacer
  clic está cubierto por `e2e/navigation.spec.ts`.

## Inestabilidades conocidas en la cobertura

- **El porcentaje de ramas de `count-up.tsx` varía en cerca de una rama
  entre ejecuciones idénticas** (99.06% en una, 98.6% en la otra). La
  prueba "lands on the final value once the animation ends" dispara un
  bucle de `requestAnimationFrame` real con 50ms de duración; que termine
  en un tick o en varios depende de qué tan rápida sea la máquina que
  corre la prueba, lo que voltea la rama `if (progress < 1) frame =
requestAnimationFrame(tick)`. El margen entre el agregado medido y el
  umbral de `branches` lo absorbe; simular los temporizadores para fijar
  esa rama no compensa la indirección extra por una sola rama.

## Dobles de prueba

- **Las brechas de jsdom son reales y merecen un comentario, no un
  parche.** `IntersectionObserver`, `ResizeObserver` y `matchMedia`
  simplemente no existen en jsdom; ver los polyfills en
  `vitest.setup.ts` — `embla-carousel` los necesita. Tampoco hay
  App Router, así que `vitest.setup.ts` fija además el `usePathname()` de
  `next/navigation` en `/` para el selector de idioma del footer.
- **embla-carousel necesita layout real** (anchos de slide, entradas de
  `ResizeObserver` con dimensiones reales) para decidir hasta dónde
  puede desplazarse, algo que jsdom no puede proveer. La navegación real
  es solo e2e (`e2e/navigation.spec.ts`); la prueba de componente solo
  verifica el estado inicial y las partes que no dependen del layout
  medido (el visor de imagen abriéndose y cerrándose).
- **`onLoad`/`onError` de `next/image` no llegan al componente vía
  `fireEvent.load`/`fireEvent.error`**: internamente llama a
  `img.decode()`, que jsdom no implementa, así que el wrapper que
  llamaría al handler real nunca se ejecuta. `image-viewer.test.tsx` mockea `next/image` a una `<img>`
  simple, para que las props pasen por el sistema de eventos normal de
  React.
- **`getTranslations` de `next-intl/server` lanza un error bajo jsdom**
  ("not supported in Client Components"), ya que lee un contexto acotado
  a la solicitud que solo existe durante un renderizado de servidor real
  de Next.js. Para probar un Server Component asíncrono que lo llama
  directamente (no con un argumento explícito `{ locale, namespace }`,
  que funciona de forma aislada), mockea `next-intl/server` con
  `createTranslator` de `next-intl` — la primitiva client-safe que
  `getTranslations` usa por debajo. Ver
  `privacy-policy-content.test.tsx`.

## Inestabilidades conocidas en e2e

- **`e2e/a11y.spec.ts` reportaba intermitentemente una violación de
  `color-contrast` en el header/hero**, más frecuente bajo ejecución
  `fullyParallel`, pero no solo ahí — también se reproducía aislado, solo
  que con menos frecuencia. Causa raíz: la animación de entrada del
  header anima la opacidad mediante WAAPI de Framer Motion, y
  `MotionConfig reducedMotion="user"` (`motion-provider.tsx`) neutraliza
  solo animaciones de transform/layout por diseño de la propia librería,
  no de opacidad — así que axe podía capturar un color interpolado en
  medio del fade como una falla de contraste, incluso con
  `reducedMotion: "reduce"` en el test. El rediseño eliminó Motion por
  completo (toda animación ahora es CSS, y la regla global de
  `prefers-reduced-motion` en `globals.css` las cancela todas), así que
  la causa desapareció junto con la espera de `opacity: 1` que la
  sorteaba.

## Ejecutar las suites

```bash
pnpm test              # Vitest en modo watch
pnpm run test:run       # Vitest una vez
pnpm run test:coverage  # Vitest una vez, con los umbrales de cobertura exigidos
pnpm run test:e2e       # Playwright, contra una app ya compilada
```
