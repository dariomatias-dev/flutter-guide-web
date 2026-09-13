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
        "src/features/community/data/testimonials.ts",
        "src/features/about/data/links.ts",
        // shadcn/Radix primitives: styling only, no logic of our own.
        "src/shared/components/ui/**",
        // Static sections: hardcoded markup, no props, no branches.
        "src/features/learning-path/components/learning-path-section.tsx",
        "src/features/theme-customization/components/theme-customization-section.tsx",
        "src/features/contribution/components/contribution-section.tsx",
        "src/features/official-resources/components/official-resources-section.tsx",
        "src/features/features-showcase/components/features-section.tsx",
        "src/features/community/components/community-section.tsx",
        "src/features/screenshots/components/screenshots-section.tsx",
        "src/features/about/components/about-me-section.tsx",
        "src/features/legal/components/privacy-policy-content.tsx",
      ],
      // Floor, not a target: measured minus a small margin (actual was
      // 76.22/70.73/64.7/77.94 on 2026-09-13). Known gaps — community-marquee.tsx
      // (untestable while testimonials.ts is empty, see E77),
      // hero-section.tsx (the isMounted bug tracked as B6/E48), and a few
      // branches in image-viewer.tsx/screenshots-carousel.tsx — are a
      // backlog, not a reason to lower this further. Raise it whenever a
      // change measurably improves the aggregate; lowering it needs a
      // reason in the commit message.
      thresholds: {
        statements: 74,
        branches: 68,
        functions: 62,
        lines: 75,
      },
    },
  },
});
