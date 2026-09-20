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
        "src/features/**/data/**",
        "src/shared/lib/catalog-stats.ts",
        "src/features/examples/lib/code-snippet.ts",
        "src/i18n/routing.ts",
        "src/proxy.ts",
        "src/shared/lib/fonts.ts",
        "src/i18n/navigation.ts",
        "src/i18n/request.ts",
        "src/shared/components/ui/**",
        "src/app/manifest.ts",
        "src/app/robots.ts",
        "src/app/[locale]/opengraph-image.tsx",
        "src/shared/lib/cn.ts",
        "src/shared/lib/test-utils.tsx",
      ],
      thresholds: {
        statements: 96,
        branches: 94,
        functions: 95,
        lines: 98,
      },
    },
  },
});
