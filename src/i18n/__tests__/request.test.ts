import { describe, expect, it, vi } from "vitest";

vi.mock("next-intl/server", () => ({
  getRequestConfig: (fn: unknown) => fn,
}));

import getRequestConfig from "@/i18n/request";

import enMessages from "../../../messages/en.json";
import ptBRMessages from "../../../messages/pt-BR.json";

describe("i18n request config", () => {
  it("resolves the requested locale and its messages", async () => {
    const config = await getRequestConfig({ requestLocale: Promise.resolve("pt-BR") });

    expect(config.locale).toBe("pt-BR");
    expect(config.messages).toEqual(ptBRMessages);
    expect(config.timeZone).toBe("UTC");
  });

  it("falls back to the default locale for an unknown value", async () => {
    const config = await getRequestConfig({ requestLocale: Promise.resolve("xx") });

    expect(config.locale).toBe("en");
    expect(config.messages).toEqual(enMessages);
  });

  it("falls back to the default locale when none is requested", async () => {
    const config = await getRequestConfig({ requestLocale: Promise.resolve(undefined) });

    expect(config.locale).toBe("en");
  });
});
