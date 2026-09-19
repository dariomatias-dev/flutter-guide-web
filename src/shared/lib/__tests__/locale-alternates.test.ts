import { describe, expect, it } from "vitest";

import { localeAlternates, localePath } from "@/shared/lib/locale-alternates";

describe("localePath", () => {
  it("leaves the default locale unprefixed and prefixes the others", () => {
    expect(localePath("en", "/")).toBe("/");
    expect(localePath("en", "/changelog")).toBe("/changelog");
    expect(localePath("pt-BR", "/")).toBe("/pt-BR");
    expect(localePath("es", "/changelog")).toBe("/es/changelog");
  });
});

describe("localeAlternates", () => {
  it("lists one URL per locale, with the default locale as x-default", () => {
    expect(localeAlternates("/privacy-policy")).toEqual({
      "x-default": "/privacy-policy",
      en: "/privacy-policy",
      "pt-BR": "/pt-BR/privacy-policy",
      es: "/es/privacy-policy",
    });
  });

  it("applies the same rule to the home path, without a trailing slash", () => {
    expect(localeAlternates("/")).toEqual({
      "x-default": "/",
      en: "/",
      "pt-BR": "/pt-BR",
      es: "/es",
    });
  });
});
