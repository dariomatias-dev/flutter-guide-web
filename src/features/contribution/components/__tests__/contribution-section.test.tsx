import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ContributionSection } from "@/features/contribution/components/contribution-section";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("ContributionSection", () => {
  it("renders the title and links each card to the right GitHub URL", () => {
    renderWithIntl(<ContributionSection />);

    expect(
      screen.getByRole("heading", { name: "Share and Grow: A Vibrant Community" }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: "Widgets & Packages" })).toHaveAttribute(
      "href",
      "https://github.com/dariomatias-dev/flutter_guide_app",
    );
    expect(screen.getByRole("link", { name: "UI Ideas" })).toHaveAttribute(
      "href",
      "https://github.com/dariomatias-dev/flutter_guide_app/issues",
    );
    expect(screen.getByRole("link", { name: "Knowledge Sharing" })).toHaveAttribute(
      "href",
      "https://github.com/dariomatias-dev/flutter_guide_app/blob/main/docs/contributing.md",
    );
  });
});
