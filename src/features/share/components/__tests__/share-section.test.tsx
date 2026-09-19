import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ShareSection } from "@/features/share/components/share-section";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("ShareSection", () => {
  it("renders the title and all three steps in order", () => {
    renderWithIntl(<ShareSection />);

    expect(screen.getByRole("heading", { name: "Every Component Has a Link" })).toBeInTheDocument();

    const steps = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(steps).toEqual(["Find & Share", "Get a Link", "Opens Right There"]);
  });
});
