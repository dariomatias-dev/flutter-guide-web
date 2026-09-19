import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ThemeCustomizationContent } from "@/features/theme-customization/components/theme-customization-content";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("ThemeCustomizationContent", () => {
  it("renders the title and both theme cards", () => {
    renderWithIntl(
      <ThemeCustomizationContent
        lightHtml="<pre><code>void main() {}</code></pre>"
        darkHtml="<pre><code>void main() {}</code></pre>"
      />,
    );

    expect(
      screen.getByRole("heading", { name: "Elevate Your Coding: Choose Your Code Theme" }),
    ).toBeInTheDocument();
    expect(screen.getByText("GitHub Light")).toBeInTheDocument();
    expect(screen.getByText("Dracula")).toBeInTheDocument();
  });
});
