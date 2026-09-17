import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { HeroSection } from "@/features/hero/components/hero-section";
import { catalogStats, catalogTotal } from "@/shared/lib/catalog-stats";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("HeroSection", () => {
  it("renders the headline, subtitle, catalog stats, and the download/GitHub links", () => {
    renderWithIntl(<HeroSection />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Master Flutter,");
    expect(heading).toHaveTextContent("Faster.");
    expect(
      screen.getByText(
        "Learn, practice, and build amazing, high-performance apps with curated content in your pocket.",
      ),
    ).toBeInTheDocument();

    expect(screen.getByText(`${catalogTotal}+ components in the catalog:`)).toBeInTheDocument();
    expect(screen.getByText(`${catalogStats.widgets} Widgets`)).toBeInTheDocument();
    expect(screen.getByText(`${catalogStats.packages} Packages`)).toBeInTheDocument();
    expect(screen.getByText(`${catalogStats.functions} Functions`)).toBeInTheDocument();
    expect(screen.getByText(`${catalogStats.elements} Elements`)).toBeInTheDocument();
    expect(screen.getByText(`${catalogStats.uis} UIs`)).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Download on Google Play/ })).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.dariomatias.flutter_guide",
    );
    expect(screen.getByRole("link", { name: /View on GitHub/ })).toHaveAttribute(
      "href",
      "https://github.com/dariomatias-dev/flutter_guide_app",
    );
  });
});
