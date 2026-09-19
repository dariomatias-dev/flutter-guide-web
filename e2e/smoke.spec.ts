import { expect, test } from "@playwright/test";

test.describe("smoke", () => {
  test("home loads with no console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));

    const response = await page.goto("/");
    expect(response?.status()).toBe(200);

    await expect(page.getByRole("heading", { level: 1 })).toContainText("Learn Flutter");

    expect(consoleErrors).toEqual([]);
  });

  test("privacy policy loads with no console errors", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));

    const response = await page.goto("/privacy-policy");
    expect(response?.status()).toBe(200);

    await expect(page.getByRole("heading", { level: 1, name: "Privacy Policy" })).toBeVisible();

    expect(consoleErrors).toEqual([]);
  });

  test("changelog loads with no console errors and lists releases", async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") consoleErrors.push(msg.text());
    });
    page.on("pageerror", (error) => consoleErrors.push(error.message));

    const response = await page.goto("/changelog");
    expect(response?.status()).toBe(200);

    await expect(page.getByRole("heading", { level: 1, name: "Changelog" })).toBeVisible();
    await expect(
      page.getByRole("article").first().or(page.getByText("couldn't be loaded")),
    ).toBeVisible();

    expect(consoleErrors).toEqual([]);
  });
});
