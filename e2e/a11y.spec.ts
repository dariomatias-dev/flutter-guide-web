import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("accessibility", () => {
  // Settles entrance animations instantly (see globals.css's
  // prefers-reduced-motion rule), so axe measures final-state colors
  // instead of a mid-fade opacity.
  test.use({ reducedMotion: "reduce" });

  for (const path of ["/", "/privacy-policy"]) {
    test(`${path} has no axe violations`, async ({ page }) => {
      await page.goto(path);

      // The header's entrance fade animates opacity via Framer Motion's
      // WAAPI, which `prefers-reduced-motion` doesn't neutralize (only
      // transform/layout animations respect `reducedMotion="user"` — see
      // motion-provider.tsx). Waiting for it to settle avoids axe
      // sampling a mid-fade, interpolated color as a contrast violation.
      await expect(page.locator("header")).toHaveCSS("opacity", "1");

      const results = await new AxeBuilder({ page }).analyze();

      expect(results.violations).toEqual([]);
    });
  }
});
