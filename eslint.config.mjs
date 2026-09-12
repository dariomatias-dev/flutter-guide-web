import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { globalIgnores } from "eslint/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // `next lint` auto-ignores these generated paths; the bare `eslint` CLI
  // does not, so this is required to keep `pnpm lint` behaving the same
  // way it did under `next lint`, not a new rule.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
];

export default eslintConfig;
