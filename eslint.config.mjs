import { globalIgnores } from "eslint/config";
import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    rules: {
      // Flags the isMounted-in-useEffect pattern in hero-section.tsx,
      // image-viewer.tsx and screenshots-carousel.tsx. Real issue (see
      // plan.md's B6), fixed in a later step, not part of this upgrade.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // `next lint` auto-ignores these generated paths; the bare `eslint` CLI
  // does not, so this is required to keep `pnpm lint` behaving the same
  // way it did under `next lint`, not a new rule.
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
];

export default eslintConfig;
