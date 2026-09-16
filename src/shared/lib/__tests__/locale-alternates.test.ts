import { describe, expect, it } from "vitest";

import { localeAlternates } from "@/shared/lib/locale-alternates";

describe("localeAlternates", () => {
  it("leaves the default locale unprefixed and prefixes the others", () => {
    expect(localeAlternates("/privacy-policy")).toEqual({
      "x-default": "/privacy-policy",
      en: "/privacy-policy",
      "pt-BR": "/pt-BR/privacy-policy",
      es: "/es/privacy-policy",
    });
  });

  it("applies the same rule to the home path", () => {
    expect(localeAlternates("/")).toEqual({
      "x-default": "/",
      en: "/",
      "pt-BR": "/pt-BR/",
      es: "/es/",
    });
  });
});
