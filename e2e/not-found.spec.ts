import { expect, test } from "@playwright/test";

test.describe("not found", () => {
  for (const path of ["/does-not-exist", "/pt-BR/does-not-exist", "/es/does-not-exist"]) {
    test(`${path} renders the custom 404 page, not Next's generic fallback`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);

      await expect(page.getByRole("heading", { level: 1 })).not.toContainText(
        "This page could not be found",
      );
      await expect(
        page.getByRole("link", { name: /back to home|voltar ao início|volver al inicio/i }),
      ).toBeVisible();
    });
  }
});
