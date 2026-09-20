import path from "node:path";

import { globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";
import jsxA11y from "eslint-plugin-jsx-a11y";

/** Resolves an except pattern to an absolute path. */
const abs = (p) => path.resolve(import.meta.dirname, p);

/** The features under src/features/; add each new one here. */
const FEATURES = [
  "catalog",
  "changelog",
  "deep-links",
  "download-cta",
  "examples",
  "faq",
  "features-showcase",
  "hero",
  "layout",
  "legal",
  "open-source",
  "screenshots",
  "share",
];

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
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
            {
              target: "./src/app/**/*",
              from: "./src/features/**/*",
              except: [abs("./src/features/*/index.ts")],
              message: "Import from the feature's barrel (index.ts), not an internal file.",
            },
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
  eslintConfigPrettier,
  globalIgnores([".next/**", "out/**", "build/**", "coverage/**", "next-env.d.ts"]),
];

export default eslintConfig;
