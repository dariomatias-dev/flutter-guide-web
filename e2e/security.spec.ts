import { expect, test } from "@playwright/test";

test.describe("security headers", () => {
  for (const path of ["/", "/privacy-policy", "/.well-known/assetlinks.json"]) {
    test(`${path} sets the expected security headers`, async ({ request }) => {
      const response = await request.get(path);
      const headers = response.headers();

      expect(headers["content-security-policy"]).toContain("default-src 'self'");
      expect(headers["x-content-type-options"]).toBe("nosniff");
      expect(headers["referrer-policy"]).toBe("strict-origin-when-cross-origin");
      expect(headers["strict-transport-security"]).toContain("max-age=63072000");
      expect(headers["permissions-policy"]).toContain("camera=()");
    });
  }

  test("/ also sets X-Frame-Options", async ({ request }) => {
    const response = await request.get("/");
    expect(response.headers()["x-frame-options"]).toBe("DENY");
  });

  test("assetlinks.json keeps its JSON content type", async ({ request }) => {
    const response = await request.get("/.well-known/assetlinks.json");
    expect(response.headers()["content-type"]).toContain("application/json");
  });
});
