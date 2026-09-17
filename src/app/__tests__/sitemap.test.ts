import { describe, expect, it } from "vitest";

import sitemap from "@/app/sitemap";

const SITE_URL = "https://flutter-guide-web.vercel.app";

describe("sitemap", () => {
  it("lists one entry per page per locale", () => {
    const entries = sitemap();

    // 2 pages (home, privacy-policy) x 3 locales (en, pt-BR, es).
    expect(entries).toHaveLength(6);
  });

  it("gives the home page a bare, unprefixed URL for the default locale", () => {
    const entries = sitemap();
    const home = entries.find((entry) => entry.url === SITE_URL);

    expect(home).toBeDefined();
    // No trailing slash: a real regression this sitemap once had.
    expect(home?.url).not.toMatch(/\/$/);
  });

  it("prefixes non-default locales, including for the home page", () => {
    const entries = sitemap();

    expect(entries.map((entry) => entry.url)).toEqual(
      expect.arrayContaining([
        `${SITE_URL}/pt-BR`,
        `${SITE_URL}/es`,
        `${SITE_URL}/pt-BR/privacy-policy`,
        `${SITE_URL}/es/privacy-policy`,
      ]),
    );
  });

  it("gives every entry a complete set of hreflang alternates", () => {
    const entries = sitemap();

    for (const entry of entries) {
      expect(entry.alternates?.languages).toEqual({
        en: expect.any(String),
        "pt-BR": expect.any(String),
        es: expect.any(String),
      });
    }
  });
});
