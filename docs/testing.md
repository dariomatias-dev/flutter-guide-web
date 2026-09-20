# Testing

## Coverage is a floor, not a goal

The thresholds in `vitest.config.mts` are measured minus a small margin
(actual was 99.11/99.06/98.63/100 on 2026-09-20, thresholds set to
97/97/97/99), not a target to write tests toward. Raise them whenever a
change measurably improves the aggregate; lowering one needs a reason in
the commit message. What matters more than the number is _what_ to test:

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

Every section component (`features/*/components/*-section.tsx` and
`*-content.tsx`) has its own test: the translated heading renders, every
data-driven card/link is present, and external links point where they
should. Even "hardcoded markup with no branches" is worth a render
assertion — it's exactly the kind of file a copy-paste edit or a missing
translation key breaks silently, with nothing in `pnpm lint` or `tsc` to
catch it.

What's deliberately **not** chased, and excluded from coverage in
`vitest.config.mts`:

- **Plain data**: the static arrays in `features/*/data/**` and the
  sample source in `examples/lib/code-snippet.ts`. Nothing to branch on.
- **shadcn/Radix primitives** (`shared/components/ui/**`): styling only, no
  logic of our own.
- **`app/[locale]/page.tsx` and `app/[locale]/privacy-policy/page.tsx`**:
  pure composition of already-tested feature components, no logic of their
  own. Covered for real by `e2e/smoke.spec.ts` instead.
- **Declarative config with no branches of our own**
  (`i18n/routing.ts`, `i18n/navigation.ts`, `proxy.ts`,
  `shared/lib/fonts.ts`) and **generated route conventions**
  (`app/manifest.ts`, `app/robots.ts`,
  `app/[locale]/opengraph-image.tsx`). `i18n/request.ts` looks similar
  but isn't: it picks a fallback locale, which is a real branch, so it's
  tested directly instead (see "Test doubles" below) rather than excluded.

A file that exports nothing but constants (`shared/lib/site.ts`,
`shared/lib/catalog-stats.ts`) doesn't need an exclude entry or a
dedicated test: its only "statements" (including a `.reduce` over a
literal array) run the moment anything imports the module, so it reads as
100% covered as soon as one test touches it. `catalog-stats.ts` used to
carry an exclude entry it never needed.

## Known gaps, not exclusions

This stays counted against the coverage floor, on purpose, so fixing it
raises the number instead of quietly being forgotten:

- **`onDotButtonClick` in `screenshots-carousel.tsx`**: never sees a
  truthy `emblaApi` under jsdom, since embla never fully initializes
  without real slide widths (see "Test doubles" below) — clicking a dot
  button in the component test always takes the early-return branch. The
  real click-to-navigate behavior is covered by `e2e/navigation.spec.ts`.

## Known coverage flakes

- **`count-up.tsx`'s branch percentage moves by about one branch between
  otherwise identical runs** (99.06% one run, 98.6% the next). The
  "lands on the final value once the animation ends" test drives a real
  `requestAnimationFrame` loop with a 50ms duration; whether that finishes
  in one tick or several depends on how fast the machine runs the test,
  which flips the `if (progress < 1) frame = requestAnimationFrame(tick)`
  branch. The margin between the measured aggregate and the `branches`
  threshold absorbs it; faking timers to pin it down isn't worth the
  extra indirection for one branch.

## Test doubles

- **jsdom gaps are real and worth a comment, not a workaround.**
  `IntersectionObserver`, `ResizeObserver` and `matchMedia` don't exist in
  jsdom at all; see the polyfills in `vitest.setup.ts` — `embla-carousel`
  needs them. There's no App Router either, so `vitest.setup.ts` also pins
  `next/navigation`'s `usePathname()` to `/` for the footer's language
  switcher.
- **embla-carousel needs real layout** (slide widths, `ResizeObserver`
  entries with actual dimensions) to decide what it can scroll to, which
  jsdom can't provide. Real navigation is e2e-only
  (`e2e/navigation.spec.ts`); the component test only checks the initial
  state and the parts that don't depend on measured layout (the image
  viewer opening and closing).
- **`next/image`'s `onLoad`/`onError` don't reach a component under
  `fireEvent.load`/`fireEvent.error`**: internally it calls
  `img.decode()`, which jsdom doesn't implement, so the wrapper that would
  call the real handler never runs. `image-viewer.test.tsx` mocks `next/image` to a plain `<img>` so
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
  the test. The redesign dropped Motion altogether (every animation is
  CSS now, and the global `prefers-reduced-motion` rule in `globals.css`
  cancels all of them), so the cause is gone along with the wait for
  `opacity: 1` that worked around it.

## Running the suites

```bash
pnpm test              # Vitest in watch mode
pnpm run test:run       # Vitest once
pnpm run test:coverage  # Vitest once, with the coverage thresholds enforced
pnpm run test:e2e       # Playwright, against a built app
```
