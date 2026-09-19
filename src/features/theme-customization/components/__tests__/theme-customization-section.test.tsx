import { render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";

import { ThemeCustomizationSection } from "@/features/theme-customization/components/theme-customization-section";

import messages from "../../../../../messages/en.json";

describe("ThemeCustomizationSection", () => {
  it("highlights both code snippets and renders them in the content", async () => {
    const element = await ThemeCustomizationSection();

    render(
      <NextIntlClientProvider locale="en" messages={messages} timeZone="UTC">
        {element}
      </NextIntlClientProvider>,
    );

    expect(
      screen.getByRole("heading", { name: "Elevate Your Coding: Choose Your Code Theme" }),
    ).toBeInTheDocument();
    expect(screen.getByText("GitHub Light")).toBeInTheDocument();
    expect(screen.getByText("Dracula")).toBeInTheDocument();
  });
});
