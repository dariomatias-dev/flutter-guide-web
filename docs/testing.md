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

Every "static" section (`catalog-section.tsx`, `languages-section.tsx`,
`share-section.tsx`, `whats-new-section.tsx`, `quality-section.tsx`,
`learning-path-section.tsx`, `theme-customization-content.tsx`,
`theme-customization-section.tsx`, `contribution-section.tsx`,
`official-resources-section.tsx`, `features-section.tsx`,
`about-me-section.tsx`, `screenshots-section.tsx`, `hero-section.tsx`, and
`privacy-policy-content.tsx`) has its own test now: the translated
heading renders, every data-driven card/link is present, and external
links point where they should. Even "hardcoded markup with no branches"
is worth a render assertion — it's exactly the kind of file a copy-paste
edit or a missing translation key breaks silently, with nothing in
`pnpm lint` or `tsc` to catch it.

What's deliberately **not** chased, and excluded from coverage in
`vitest.config.mts`:

- **Plain data and variant objects**: `shared/motion/**`, the static arrays
  in `features/*/data/*.ts` (except `faqs.ts`, which is exercised
  indirectly through `faq-section.test.tsx`), and
  `theme-customization/lib/code-snippet.ts`, and
  `whats-new/data/releases.ts`. Nothing to branch on.
- **shadcn/Radix primitives** (`shared/components/ui/**`): styling only, no
  logic of our own.
- **`app/[locale]/page.tsx` and `app/[locale]/privacy-policy/page.tsx`**:
  pure composition of already-tested feature components, no logic of their
  own. Covered for real by `e2e/smoke.spec.ts` instead.

## Known gaps, not exclusions

This stays counted against the coverage floor, on purpose, so fixing it
raises the number instead of quietly being forgotten:

- **`onDotButtonClick` in `screenshots-carousel.tsx`**: never sees a
  truthy `emblaApi` under jsdom, since embla never fully initializes
  without real slide widths (see "Test doubles" below) — clicking a dot
  button in the component test always takes the early-return branch. The
  real click-to-navigate behavior is covered by `e2e/navigation.spec.ts`.

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
- **`next/image`'s `onLoad`/`onError` don't reach a component under
  `fireEvent.load`/`fireEvent.error`**: internally it calls
  `img.decode()`, which jsdom doesn't implement, so the wrapper that would
  call the real handler never runs. `image-viewer.test.tsx` and
  `screenshot-thumbnail.test.tsx` mock `next/image` to a plain `<img>` so
  the props pass through React's normal event system instead.
- **`getTranslations` from `next-intl/server` throws under jsdom**
  ("not supported in Client Components") since it reads request-scoped
  context that only exists during a real Next.js server render. To test
  an async Server Component that calls it directly (not via an explicit
  `{ locale, namespace }` argument, which works standalone), mock
  `next-intl/server` with `createTranslator` from `next-intl` — the
  client-safe primitive `getTranslations` builds on internally. See
  `privacy-policy-content.test.tsx`.

## Known e2e flakes

- **`e2e/a11y.spec.ts` intermittently reported a `color-contrast`
  violation on the header/hero**, more often under `fullyParallel`
  execution but not exclusively — it could reproduce isolated too, just
  less often. Root cause: the header's entrance fade animates opacity via
  Framer Motion's WAAPI, and `MotionConfig reducedMotion="user"`
  (`motion-provider.tsx`) only neutralizes transform/layout animations by
  design, not opacity — so axe could sample a mid-fade, interpolated
  color as a contrast failure even with `reducedMotion: "reduce"` set in
  the test. Fixed by waiting for the header to reach `opacity: 1` before
  running `axe.analyze()`, instead of touching the animation itself.

## Running the suites

```bash
pnpm test              # Vitest in watch mode
pnpm run test:run       # Vitest once
pnpm run test:coverage  # Vitest once, with the coverage thresholds enforced
pnpm run test:e2e       # Playwright, against a built app
```
