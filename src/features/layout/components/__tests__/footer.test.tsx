import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "@/features/layout/components/footer";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("Footer", () => {
  it("links to the author's portfolio", () => {
    renderWithIntl(<Footer />);

    expect(screen.getByRole("link", { name: "Dário Matias" })).toHaveAttribute(
      "href",
      "https://dariomatias-dev.com/",
    );
  });

  it("shows the current year in the copyright notice", () => {
    renderWithIntl(<Footer />);

    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
