import path from "node:path";

import { globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";

// Resolves an except pattern to an absolute path.
const abs = (p) => path.resolve(import.meta.dirname, p);

// Add a feature here when you add one under src/features/.
const FEATURES = [
  "about",
  "community",
  "contribution",
  "deep-links",
  "faq",
  "features-showcase",
  "hero",
  "layout",
  "learning-path",
  "legal",
  "official-resources",
  "screenshots",
  "theme-customization",
];

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // hero-section.tsx's isMounted pattern (plan.md's B6) is fixed, and
      // image-viewer.tsx no longer needs its own mount guard now that
      // Radix Dialog owns its portal. Stays off for the one legitimate
      // case left: screenshots-carousel.tsx syncing embla-carousel's
      // imperative state into React state.
      "react-hooks/set-state-in-effect": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "import/order": [
        "error",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"], "type"],
          pathGroups: [{ pattern: "@/**", group: "internal" }],
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],
      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            {
              target: "./src/shared/**/*",
              from: "./src/features/**/*",
              message: "shared/ must not depend on features/. Move the shared piece down instead.",
            },
            // app/ composes features; it may only reach a feature's public
            // API (its index.ts barrel), never a file inside it.
            {
              target: "./src/app/**/*",
              from: "./src/features/**/*",
              except: [abs("./src/features/*/index.ts")],
              message: "Import from the feature's barrel (index.ts), not an internal file.",
            },
            // A feature may freely import its own files, but never reach
            // directly inside another feature.
            ...FEATURES.map((name) => ({
              target: `./src/features/${name}/**/*`,
              from: "./src/features/**/*",
              except: [abs(`./src/features/${name}/**/*`), abs("./src/features/*/index.ts")],
              message: "Import from the other feature's barrel (index.ts), not an internal file.",
            })),
          ],
        },
      ],
    },
  },
  {
    // Type-aware rules need the type checker, which is slow and only makes
    // sense for the app's own source; config files at the repo root stay on
    // the plain (non type-aware) parser from nextTypescript.
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": "error",
    },
  },
  // Turn off ESLint formatting rules that conflict with Prettier. Must be last.
  eslintConfigPrettier,
  // `next lint` auto-ignores these generated paths; the bare `eslint` CLI
  // does not, so this is required to keep `pnpm lint` behaving the same
  // way it did under `next lint`, not a new rule.
  globalIgnores([".next/**", "out/**", "build/**", "coverage/**", "next-env.d.ts"]),
];

export default eslintConfig;
