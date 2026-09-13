import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "@/features/layout/components/footer";

describe("Footer", () => {
  it("links to the author's portfolio", () => {
    render(<Footer />);

    expect(screen.getByRole("link", { name: "Dário Matias" })).toHaveAttribute(
      "href",
      "https://dariomatias-dev.com/",
    );
  });

  it("shows the current year in the copyright notice", () => {
    render(<Footer />);

    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });
});
