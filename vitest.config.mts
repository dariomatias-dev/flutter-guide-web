import path from "node:path";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { "@": path.resolve(import.meta.dirname, "src") },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}", "scripts/**/*.{test,spec}.mjs"],
    // Without this, Vitest treats next-intl as an external Node dependency
    // and resolves its imports natively instead of through Vite (and our
    // `next/navigation` alias above), which fails under pnpm's nested
    // dependency layout.
    server: { deps: { inline: ["next-intl"] } },
    coverage: {
      provider: "v8",
      reporter: ["text", "text-summary", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "**/__tests__/**",
        "src/app/**/{layout,page,loading,error,not-found,global-error}.tsx",
        "**/*.types.ts",
        "**/index.ts",
        // Plain variant/data objects: nothing to branch on.
        "src/shared/motion/**",
        "src/features/features-showcase/data/features.ts",
        "src/features/about/data/links.ts",
        "src/shared/lib/catalog-stats.ts",
        "src/features/theme-customization/lib/code-snippet.ts",
        "src/features/whats-new/data/releases.ts",
        // next-intl wiring: declarative config, no logic of our own.
        "src/i18n/routing.ts",
        "src/i18n/navigation.ts",
        "src/i18n/request.ts",
        // shadcn/Radix primitives: styling only, no logic of our own.
        "src/shared/components/ui/**",
        // Next.js metadata route conventions: static data or markup, no
        // branches of our own. sitemap.ts has real branching logic (locale
        // prefixing) and has its own test, so it's not excluded here.
        "src/app/manifest.ts",
        "src/app/robots.ts",
        "src/app/[locale]/opengraph-image.tsx",
        // Trivial passthrough wrappers, no logic of our own.
        "src/shared/components/motion-provider.tsx",
        "src/shared/lib/cn.ts",
        // Test infrastructure, not application code.
        "src/shared/lib/test-utils.tsx",
      ],
      // Floor, not a target: measured minus a small margin (actual was
      // 98.23/96.36/97.26/100 on 2026-09-17). One known gap —
      // `onDotButtonClick` in screenshots-carousel.tsx never sees a
      // truthy `emblaApi` under jsdom (slide widths report as 0, so embla
      // never fully initializes); the real click-to-navigate behavior is
      // covered by e2e/navigation.spec.ts instead. Raise this whenever a
      // change measurably improves the aggregate; lowering it needs a
      // reason in the commit message.
      thresholds: {
        statements: 96,
        branches: 94,
        functions: 95,
        lines: 98,
      },
    },
  },
});
