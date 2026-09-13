import { expect, test } from "@playwright/test";

test.describe("prefers-reduced-motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("the hero's background blobs stop animating", async ({ page }) => {
    await page.goto("/");

    const durationInSeconds = await page.evaluate(() => {
      const el = document.querySelector<HTMLElement>('[style*="animation"]');
      return el ? parseFloat(getComputedStyle(el).animationDuration) : null;
    });

    // The normal duration is 15s; the reduced-motion override caps it near 0.
    expect(durationInSeconds).toBeLessThan(0.1);
  });
});
