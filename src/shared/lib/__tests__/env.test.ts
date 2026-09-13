import { afterEach, describe, expect, it, vi } from "vitest";

const ENV_KEY = "NEXT_PUBLIC_SITE_URL";

describe("env", () => {
  const original = process.env[ENV_KEY];

  afterEach(() => {
    if (original === undefined) {
      delete process.env[ENV_KEY];
    } else {
      process.env[ENV_KEY] = original;
    }
    vi.resetModules();
  });

  it("defaults NEXT_PUBLIC_SITE_URL when unset", async () => {
    delete process.env[ENV_KEY];
    const { env } = await import("@/shared/lib/env");

    expect(env.NEXT_PUBLIC_SITE_URL).toBe("https://flutter-guide-web.vercel.app");
  });

  it("uses NEXT_PUBLIC_SITE_URL when set to a valid URL", async () => {
    process.env[ENV_KEY] = "https://example.com";
    const { env } = await import("@/shared/lib/env");

    expect(env.NEXT_PUBLIC_SITE_URL).toBe("https://example.com");
  });

  it("throws when NEXT_PUBLIC_SITE_URL is not a valid URL", async () => {
    process.env[ENV_KEY] = "not-a-url";

    await expect(import("@/shared/lib/env")).rejects.toThrow();
  });
});
