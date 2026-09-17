import { expect, test } from "@playwright/test";

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("the hero's text is visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Master Flutter,");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("sections below the hero are visible", async ({ page }) => {
    await page.goto("/");

    await expect(page.getByRole("heading", { name: "The App in Action" })).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "A Powerful Toolkit in Your Pocket" }),
    ).toBeVisible();
    await expect(page.getByRole("heading", { name: "Frequently Asked Questions" })).toBeVisible();
    await expect(page.locator("footer")).toBeVisible();
  });
});
