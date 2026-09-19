import { screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { CatalogSection } from "@/features/catalog/components/catalog-section";
import { catalogStats, catalogTotal } from "@/shared/lib/catalog-stats";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("CatalogSection", () => {
  it("renders the title and the catalog total", () => {
    renderWithIntl(<CatalogSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: "The whole toolkit, in one place." }),
    ).toBeInTheDocument();
    expect(screen.getByText(String(catalogTotal))).toBeInTheDocument();
  });

  it("renders a card per category with its count", () => {
    renderWithIntl(<CatalogSection />);

    const cards = {
      Widgets: catalogStats.widgets,
      Packages: catalogStats.packages,
      Functions: catalogStats.functions,
      Elements: catalogStats.elements,
      "UI samples": catalogStats.uis,
    };

    for (const [title, count] of Object.entries(cards)) {
      const card = screen.getByRole("heading", { level: 3, name: title }).closest("article")!;
      expect(within(card).getByText(String(count))).toBeInTheDocument();
    }
  });

  it("lists the app's widget groups on the widgets card", () => {
    renderWithIntl(<CatalogSection />);

    const card = screen.getByRole("heading", { level: 3, name: "Widgets" }).closest("article")!;
    expect(within(card).getAllByRole("listitem")).toHaveLength(12);
    expect(within(card).getByText("Dialog & Overlay")).toBeInTheDocument();
  });
});
