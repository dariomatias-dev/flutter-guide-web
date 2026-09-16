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

Lo que deliberadamente **no** se persigue, y queda excluido de la
cobertura en `vitest.config.mts`:

- **Secciones estáticas sin ramas**: `catalog-section.tsx`,
  `languages-section.tsx`, `share-section.tsx`, `whats-new-section.tsx`,
  `quality-section.tsx`,
  `learning-path-section.tsx`,
  `theme-customization-content.tsx`, `contribution-section.tsx`,
  `official-resources-section.tsx`, `features-section.tsx`,
  `about-me-section.tsx`, `screenshots-section.tsx` (el wrapper) y
  `privacy-policy-content.tsx`.
  Markup fijo sin props ni renderizado condicional — no hay lógica que
  pueda fallar.
- **`theme-customization-section.tsx`**: un Server Component asíncrono
  que llama a Shiki en tiempo de build. Sin equivalente en jsdom para
  renderizarlo; la llamada a Shiki está cubierta por
  `highlight-code.test.ts` y la salida está cubierta por
  `theme-code-card.test.tsx`.
- **Datos puros y objetos de variantes**: `shared/motion/**`, los
  arreglos estáticos en `features/*/data/*.ts` (excepto `faqs.ts`,
  ejercitado indirectamente vía `faq-section.test.tsx`), y
  `theme-customization/lib/code-snippet.ts`, y
  `whats-new/data/releases.ts`. Nada que ramificar.
- **Primitivas shadcn/Radix** (`shared/components/ui/**`): solo estilos,
  sin lógica propia.
- **`app/page.tsx` y `app/privacy-policy/page.tsx`**: composición pura de
  componentes de feature ya probados, sin lógica propia. Cubiertos de
  verdad por `e2e/smoke.spec.ts` en su lugar.

## Brechas conocidas, no exclusiones

Estas siguen contando contra el piso de cobertura, a propósito, para que
arreglarlas suba el número en vez de olvidarse en silencio:

- **`hero-section.tsx`**: todavía sin prueba unitaria dedicada; su
  animación de entrada y los fondos de blob están cubiertos
  indirectamente por `e2e/no-js.spec.ts` y `e2e/reduced-motion.spec.ts`.
- **Algunas ramas en `image-viewer.tsx` y `screenshots-carousel.tsx`**:
  estados de error y casos límite aún no cubiertos.

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
