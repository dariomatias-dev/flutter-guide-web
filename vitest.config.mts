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
        // shadcn/Radix primitives: styling only, no logic of our own.
        "src/shared/components/ui/**",
        // Static sections: hardcoded markup, no props, no branches.
        "src/features/catalog/components/catalog-section.tsx",
        "src/features/languages/components/languages-section.tsx",
        "src/features/learning-path/components/learning-path-section.tsx",
        "src/features/theme-customization/components/theme-customization-section.tsx",
        "src/features/theme-customization/components/theme-customization-content.tsx",
        "src/features/contribution/components/contribution-section.tsx",
        "src/features/official-resources/components/official-resources-section.tsx",
        "src/features/features-showcase/components/features-section.tsx",
        "src/features/screenshots/components/screenshots-section.tsx",
        "src/features/about/components/about-me-section.tsx",
        "src/features/legal/components/privacy-policy-content.tsx",
        // Next.js metadata route conventions: static data or markup, no
        // branches of our own.
        "src/app/manifest.ts",
        "src/app/robots.ts",
        "src/app/sitemap.ts",
        "src/app/opengraph-image.tsx",
        // Trivial passthrough wrapper, no logic of our own.
        "src/shared/components/motion-provider.tsx",
      ],
      // Floor, not a target: measured minus a small margin (actual was
      // 83.05/75/72.22/85.58 on 2026-09-14). Known gaps — hero-section.tsx
      // (no dedicated test, covered indirectly by e2e/no-js.spec.ts and
      // e2e/reduced-motion.spec.ts), and a few branches in
      // image-viewer.tsx/screenshots-carousel.tsx — are a backlog, not a
      // reason to lower this further. Raise it whenever a change
      // measurably improves the aggregate; lowering it needs a reason in
      // the commit message.
      thresholds: {
        statements: 81,
        branches: 73,
        functions: 70,
        lines: 84,
      },
    },
  },
});
