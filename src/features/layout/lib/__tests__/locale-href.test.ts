import { describe, expect, it } from "vitest";

import { localeHref } from "@/features/layout/lib/locale-href";

describe("localeHref", () => {
  it("prefixes every locale but the default one", () => {
    expect(localeHref("/", "en")).toBe("/");
    expect(localeHref("/", "pt-BR")).toBe("/pt-BR");
    expect(localeHref("/privacy-policy", "es")).toBe("/es/privacy-policy");
  });
});
