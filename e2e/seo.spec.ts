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

  test("sitemap.xml lists both pages", async ({ request }) => {
    const response = await request.get("/sitemap.xml");
    const body = await response.text();

    expect(response.headers()["content-type"]).toContain("application/xml");
    expect(body).toContain("<loc>https://flutter-guide-web.vercel.app</loc>");
    expect(body).toContain("<loc>https://flutter-guide-web.vercel.app/privacy-policy</loc>");
  });

  test("robots.txt allows everything and points to the sitemap", async ({ request }) => {
    const response = await request.get("/robots.txt");
    const body = await response.text();

    expect(body).toContain("Allow: /");
    expect(body).toContain("Sitemap: https://flutter-guide-web.vercel.app/sitemap.xml");
  });

  test("the web app manifest has the expected name and icon", async ({ request }) => {
    const response = await request.get("/manifest.webmanifest");
    const manifest = await response.json();

    expect(manifest.name).toBe("FlutterGuide");
    expect(manifest.display).toBe("standalone");
    expect(manifest.icons).toHaveLength(1);
    expect(manifest.icons[0].src).toBe("/flutter_guide_icon.png");
  });

  test("home links to the manifest", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator('link[rel="manifest"]')).toHaveAttribute(
      "href",
      "/manifest.webmanifest",
    );
  });

  test("home sets an og:image", async ({ page, request }) => {
    await page.goto("/");

    const ogImage = page.locator('meta[property="og:image"]');
    await expect(ogImage).toHaveAttribute("content", /\/opengraph-image/);

    const imageUrl = await ogImage.getAttribute("content");
    const imagePath = new URL(imageUrl!).pathname + new URL(imageUrl!).search;
    const response = await request.get(imagePath);
    expect(response.headers()["content-type"]).toBe("image/png");
  });

  test("home has MobileApplication JSON-LD", async ({ page }) => {
    await page.goto("/");

    const jsonLd = await page.locator('script[type="application/ld+json"]').textContent();
    const data = JSON.parse(jsonLd!);

    expect(data["@type"]).toBe("MobileApplication");
    expect(data.operatingSystem).toBe("ANDROID");
    expect(data.downloadUrl).toContain("play.google.com");
  });
});
