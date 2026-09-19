import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ShareSection } from "@/features/share/components/share-section";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("ShareSection", () => {
  it("renders the title and all three steps in order", () => {
    renderWithIntl(<ShareSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Every sample has a link." }),
    ).toBeInTheDocument();

    const steps = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(steps).toEqual(["Open a sample", "Tap Share", "They land right on it"]);
  });

  it("shows a link in the app's own share format", () => {
    const { container } = renderWithIntl(<ShareSection />);

    expect(container).toHaveTextContent("flutterguide.app/widgets/ActionChip");
  });
});
