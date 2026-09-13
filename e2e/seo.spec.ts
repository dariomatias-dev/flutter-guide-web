import { expect, test } from "@playwright/test";

test.describe("SEO metadata", () => {
  test("home has the expected title, description, and Open Graph tags", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("FlutterGuide");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /Flutter developers/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://flutter-guide-web.vercel.app",
    );
    await expect(page.locator('meta[property="og:type"]')).toHaveAttribute("content", "website");
    await expect(page.locator('meta[property="og:site_name"]')).toHaveAttribute(
      "content",
      "FlutterGuide",
    );
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute(
      "content",
      "summary_large_image",
    );
  });

  test("privacy policy has its own title, description, and canonical URL", async ({ page }) => {
    await page.goto("/privacy-policy");

    await expect(page).toHaveTitle("Privacy Policy | FlutterGuide");
    await expect(page.locator('meta[name="description"]')).toHaveAttribute(
      "content",
      /collects, uses, and protects/,
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      "https://flutter-guide-web.vercel.app/privacy-policy",
    );
  });
});
