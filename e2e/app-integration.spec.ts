import { expect, test } from "@playwright/test";

import type { Page } from "@playwright/test";

// The app depends on these routes to keep working: breaking any of them
// breaks something for real users of the FlutterGuide Android app, not just
// the site. See plan.md's "Invariantes" section.

test.describe("app integration invariants", () => {
  test("assetlinks.json verifies the Android App Links", async ({ request }) => {
    const response = await request.get("/.well-known/assetlinks.json");
    expect(response.status()).toBe(200);
    expect(response.headers()["content-type"]).toContain("application/json");

    const body = await response.json();
    expect(body).toEqual([
      expect.objectContaining({
        relation: expect.arrayContaining(["delegate_permission/common.handle_all_urls"]),
        target: expect.objectContaining({
          namespace: "android_app",
          package_name: "com.dariomatias.flutter_guide",
          sha256_cert_fingerprints: expect.arrayContaining([
            "C9:C6:6E:6D:38:AF:4B:FE:15:35:A5:C2:BD:22:82:7C:13:63:1E:A2:37:5B:A8:73:E1:47:7B:7C:6B:77:8B:6E",
          ]),
        }),
      }),
    ]);
  });

  test("app-ads.txt is served for AdMob verification", async ({ request }) => {
    const response = await request.get("/app-ads.txt");
    expect(response.status()).toBe(200);

    const body = await response.text();
    expect(body).toContain("google.com, pub-3105026055105833, DIRECT, f08c47fec0942fa0");
  });

  test("privacy policy stays reachable", async ({ page }) => {
    const response = await page.goto("/privacy-policy");
    expect(response?.status()).toBe(200);
  });

  // `window.location.href = "flutterguide://..."` produces no real page
  // navigation (Chromium can't handle the unknown scheme), but Playwright
  // still observes it as a failed `request` for that URL, so that's what
  // these tests wait for instead of a navigation event.
  for (const category of ["widgets", "functions", "packages", "elements", "uis"]) {
    test(`/${category}/x tries to open the app`, async ({ page }) => {
      const deepLinkRequest = page.waitForRequest(`flutterguide://open.app/${category}/x`);
      await page.goto(`/${category}/x`);
      const request = await deepLinkRequest;
      expect(request.url()).toBe(`flutterguide://open.app/${category}/x`);
    });
  }

  const collectDeepLinkRequests = (page: Page) => {
    const urls: string[] = [];
    page.on("request", (request) => {
      if (request.url().startsWith("flutterguide://")) urls.push(request.url());
    });
    return urls;
  };

  test("/widgets with no slug does not try to open the app", async ({ page }) => {
    const urls = collectDeepLinkRequests(page);
    await page.goto("/widgets");
    await page.waitForTimeout(500);
    expect(urls).toEqual([]);
  });

  test("an unknown path does not try to open the app", async ({ page }) => {
    const urls = collectDeepLinkRequests(page);
    await page.goto("/this-does-not-exist");
    await page.waitForTimeout(500);
    expect(urls).toEqual([]);
  });
});
