# Testing

## What actually merits a test here

Coverage is a floor, not a goal. See the thresholds and their rationale in
`vitest.config.mts`. What matters more than the number is _what_ to test:

- **Real logic**: a computation, a branch, a piece of state that can be
  wrong. `resolveAppDeepLink`'s category matching, the header menu's
  open/closed state, the FAQ accordion's expand/collapse — all worth a test.
- **Real user interaction**: click something, expect a specific outcome.
  Component tests here render the real component and interact with it
  through Testing Library queries (`getByRole`, `getByText`), not by
  reaching into internals.
- **Link targets**: every button or link that points somewhere external
  (GitHub, the Play Store, the author's portfolio) is worth asserting on —
  it's exactly the kind of thing a copy-paste error breaks silently.

What's deliberately **not** chased, and excluded from coverage in
`vitest.config.mts`:

- **Static sections with no branches**: `learning-path-section.tsx`,
  `theme-customization-section.tsx`, `contribution-section.tsx`,
  `official-resources-section.tsx`, `features-section.tsx`,
  `about-me-section.tsx`, `screenshots-section.tsx` (the wrapper) and
  `privacy-policy-content.tsx`. Hardcoded markup with no props and no
  conditional rendering — there's no logic to get wrong.
- **Plain data and variant objects**: `shared/motion/**` and the static
  arrays in `features/*/data/*.ts` (except `faqs.ts`, which is exercised
  indirectly through `faq-section.test.tsx`). Nothing to branch on.
- **shadcn/Radix primitives** (`shared/components/ui/**`): styling only, no
  logic of our own.
- **`app/page.tsx` and `app/privacy-policy/page.tsx`**: pure composition of
  already-tested feature components, no logic of their own. Covered for
  real by `e2e/smoke.spec.ts` instead.

## Known gaps, not exclusions

These stay counted against the coverage floor, on purpose, so fixing them
raises the number instead of quietly being forgotten:

- **`hero-section.tsx`**: no dedicated unit test yet; its entrance
  animation and blob backgrounds are covered indirectly by
  `e2e/no-js.spec.ts` and `e2e/reduced-motion.spec.ts`.
- **A few branches in `image-viewer.tsx` and `screenshots-carousel.tsx`**:
  error states and edge cases not yet covered.

## Test doubles

- **jsdom gaps are real and worth a comment, not a workaround.**
  `IntersectionObserver`, `ResizeObserver` and `matchMedia` don't exist in
  jsdom at all; see the polyfills in `vitest.setup.ts` — `framer-motion`'s
  `whileInView` needs the first, `embla-carousel` needs the other two.
- **Framer Motion's stagger propagation doesn't always resolve in jsdom**
  even with `IntersectionObserver` polyfilled (see the comment in
  `faq-section.test.tsx`): an item nested under a `whileInView` parent can
  stay at its `hidden` variant. Assert `toBeInTheDocument()`/state
  attributes there instead of `toBeVisible()`, and leave the real visual
  check to e2e.
- **embla-carousel needs real layout** (slide widths, `ResizeObserver`
  entries with actual dimensions) to decide what it can scroll to, which
  jsdom can't provide. Real navigation is e2e-only
  (`e2e/navigation.spec.ts`); the component test only checks the initial
  state and the parts that don't depend on measured layout (the image
  viewer opening and closing).

## Running the suites

```bash
pnpm test              # Vitest in watch mode
pnpm run test:run       # Vitest once
pnpm run test:coverage  # Vitest once, with the coverage thresholds enforced
pnpm run test:e2e       # Playwright, against a built app
```
