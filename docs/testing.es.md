# Pruebas

## Qué merece realmente una prueba aquí

La cobertura es un piso, no una meta. Ver los umbrales y su razón de ser
en `vitest.config.mts`. Lo que importa más que el número es _qué_
probar:

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

Cada sección "estática" (`catalog-section.tsx`, `languages-section.tsx`,
`share-section.tsx`, `whats-new-section.tsx`, `quality-section.tsx`,
`learning-path-section.tsx`, `theme-customization-content.tsx`,
`theme-customization-section.tsx`, `contribution-section.tsx`,
`official-resources-section.tsx`, `features-section.tsx`,
`about-me-section.tsx`, `screenshots-section.tsx`, `hero-section.tsx` y
`privacy-policy-content.tsx`) tiene su propia prueba ahora: el título
traducido se renderiza, cada card/enlace proveniente de datos está
presente, y los enlaces externos apuntan al lugar correcto. Incluso
"markup fijo sin ramas" merece una verificación de renderizado — es
exactamente el tipo de archivo que un copiar y pegar erróneo o una clave
de traducción faltante rompe silenciosamente, sin nada en `pnpm lint` o
`tsc` que lo detecte.

Lo que deliberadamente **no** se persigue, y queda excluido de la
cobertura en `vitest.config.mts`:

- **Datos puros y objetos de variantes**: `shared/motion/**`, los
  arreglos estáticos en `features/*/data/*.ts` (excepto `faqs.ts`,
  ejercitado indirectamente vía `faq-section.test.tsx`), y
  `theme-customization/lib/code-snippet.ts`, y
  `whats-new/data/releases.ts`. Nada que ramificar.
- **Primitivas shadcn/Radix** (`shared/components/ui/**`): solo estilos,
  sin lógica propia.
- **`app/[locale]/page.tsx` y `app/[locale]/privacy-policy/page.tsx`**:
  composición pura de componentes de feature ya probados, sin lógica
  propia. Cubiertos de verdad por `e2e/smoke.spec.ts` en su lugar.

## Brecha conocida, no exclusión

Esta sigue contando contra el piso de cobertura, a propósito, para que
arreglarla suba el número en vez de olvidarse en silencio:

- **`onDotButtonClick` en `screenshots-carousel.tsx`**: nunca ve un
  `emblaApi` verdadero bajo jsdom, ya que embla nunca se inicializa del
  todo sin anchos de slide reales (ver "Dobles de prueba" abajo) — hacer
  clic en un botón de dot en la prueba de componente siempre cae en la
  rama de retorno anticipado. El comportamiento real de navegar al hacer
  clic está cubierto por `e2e/navigation.spec.ts`.

## Dobles de prueba

- **Las brechas de jsdom son reales y merecen un comentario, no un
  parche.** `IntersectionObserver`, `ResizeObserver` y `matchMedia`
  simplemente no existen en jsdom; ver los polyfills en
  `vitest.setup.ts` — el `whileInView` de `framer-motion` necesita el
  primero, `embla-carousel` necesita los otros dos.
- **La propagación de stagger de Framer Motion no siempre se resuelve en
  jsdom** incluso con el polyfill de `IntersectionObserver` (ver el
  comentario en `faq-section.test.tsx`): un elemento anidado bajo un
  padre `whileInView` puede quedarse en su variante `hidden`. Verifica
  `toBeInTheDocument()`/atributos de estado ahí en vez de
  `toBeVisible()`, y deja la verificación visual real para e2e.
- **embla-carousel necesita layout real** (anchos de slide, entradas de
  `ResizeObserver` con dimensiones reales) para decidir hasta dónde
  puede desplazarse, algo que jsdom no puede proveer. La navegación real
  es solo e2e (`e2e/navigation.spec.ts`); la prueba de componente solo
  verifica el estado inicial y las partes que no dependen del layout
  medido (el visor de imagen abriéndose y cerrándose).
- **`onLoad`/`onError` de `next/image` no llegan al componente vía
  `fireEvent.load`/`fireEvent.error`**: internamente llama a
  `img.decode()`, que jsdom no implementa, así que el wrapper que
  llamaría al handler real nunca se ejecuta. `image-viewer.test.tsx` y
  `screenshot-thumbnail.test.tsx` mockean `next/image` a una `<img>`
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
  `reducedMotion: "reduce"` en el test. Corregido esperando a que el
  header llegue a `opacity: 1` antes de ejecutar `axe.analyze()`, en vez
  de tocar la animación en sí.

## Ejecutar las suites

```bash
pnpm test              # Vitest en modo watch
pnpm run test:run       # Vitest una vez
pnpm run test:coverage  # Vitest una vez, con los umbrales de cobertura exigidos
pnpm run test:e2e       # Playwright, contra una app ya compilada
```
