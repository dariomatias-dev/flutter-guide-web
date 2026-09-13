import { expect, test } from "@playwright/test";

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the hero's text is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Master Flutter,");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });
});
