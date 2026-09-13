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

      const results = await new AxeBuilder({ page }).analyze();

      expect(results.violations).toEqual([]);
    });
  }
});
