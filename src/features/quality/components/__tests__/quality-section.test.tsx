import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { QualitySection } from "@/features/quality/components/quality-section";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("QualitySection", () => {
  it("renders the title, each stat, and a link to GitHub", () => {
    renderWithIntl(<QualitySection />);

    expect(screen.getByRole("heading", { name: "Built in the Open" })).toBeInTheDocument();

    expect(screen.getByText("97.8%")).toBeInTheDocument();
    expect(screen.getByText("Line Coverage")).toBeInTheDocument();
    expect(screen.getByText("378")).toBeInTheDocument();
    expect(screen.getByText("Test Cases")).toBeInTheDocument();
    expect(screen.getByText("MIT")).toBeInTheDocument();
    expect(screen.getByText("Open Source License")).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "View on GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/dariomatias-dev/flutter_guide_app",
    );
  });
});
