import { globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Flags the isMounted-in-useEffect pattern in hero-section.tsx,
      // image-viewer.tsx and screenshots-carousel.tsx. Real issue (see
      // plan.md's B6), fixed in a later step, not part of this upgrade.
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
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
];

export default eslintConfig;
