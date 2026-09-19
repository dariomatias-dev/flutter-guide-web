import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { OpenSourceSection } from "@/features/open-source/components/open-source-section";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("OpenSourceSection", () => {
  it("renders the title and the project's quality stats", () => {
    renderWithIntl(<OpenSourceSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Built in the open, tested like a product." }),
    ).toBeInTheDocument();
    for (const value of ["97.8%", "378", "MIT"]) {
      expect(screen.getByText(value)).toBeInTheDocument();
    }
  });

  it("links to the repository and the contributing guide", () => {
    renderWithIntl(<OpenSourceSection />);

    expect(screen.getByRole("link", { name: /View on GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/dariomatias-dev/flutter_guide_app",
    );
    expect(screen.getByRole("link", { name: /Read the guide/ })).toHaveAttribute(
      "href",
      "https://github.com/dariomatias-dev/flutter_guide_app/blob/main/docs/contributing.md",
    );
  });
});
