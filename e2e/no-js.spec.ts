import { expect, test } from "@playwright/test";

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the hero's text is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Learn Flutter");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("sections below the hero are visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "Every screen, made to learn." })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Why FlutterGuide?" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Questions, answered." })).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});
