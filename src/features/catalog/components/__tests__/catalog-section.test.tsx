import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CatalogSection } from "@/features/catalog/components/catalog-section";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("CatalogSection", () => {
  it("renders the title and a stat card per category", () => {
    renderWithIntl(<CatalogSection />);

    expect(
      screen.getByRole("heading", { name: "A Catalog That Keeps Growing" }),
    ).toBeInTheDocument();

    for (const label of ["Widgets", "Packages", "Functions", "Elements", "UIs"]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
  });
});
