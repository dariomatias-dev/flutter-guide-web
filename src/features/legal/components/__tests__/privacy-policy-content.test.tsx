import { render, screen } from "@testing-library/react";
import { createTranslator, NextIntlClientProvider } from "next-intl";
import { describe, expect, it, vi } from "vitest";

import { PrivacyPolicyContent } from "@/features/legal/components/privacy-policy-content";

import messages from "../../../../../messages/en.json";

// `next-intl/server`'s `getTranslations` refuses to run outside a real
// server request context (it errors under jsdom). `createTranslator` is
// the client-safe building block it uses internally, so it's a faithful
// stand-in here.
vi.mock("next-intl/server", () => ({
  getTranslations: async (namespace: "PrivacyPolicy") =>
    createTranslator({ locale: "en", messages, namespace }),
}));

describe("PrivacyPolicyContent", () => {
  it("renders every section and the inline links in the advertising and contact paragraphs", async () => {
    const element = await PrivacyPolicyContent();

    render(
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        {element}
      </NextIntlClientProvider>,
    );

    expect(screen.getByRole("heading", { name: "Local Preferences" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Advertising" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "External Links" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Children" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Changes to This Policy" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Contact" })).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Google AdMob" })).toHaveAttribute(
      "href",
      "https://support.google.com/admob/answer/6128543",
    );
    expect(screen.getByRole("link", { name: "Google's Privacy Policy" })).toHaveAttribute(
      "href",
      "https://policies.google.com/privacy",
    );
    expect(screen.getByRole("link", { name: "matiasdario75@gmail.com" })).toHaveAttribute(
      "href",
      "mailto:matiasdario75@gmail.com",
    );
  });
});
