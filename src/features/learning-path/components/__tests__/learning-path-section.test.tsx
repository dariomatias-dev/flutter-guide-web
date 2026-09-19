import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LearningPathSection } from "@/features/learning-path/components/learning-path-section";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("LearningPathSection", () => {
  it("renders the title and all three steps in order", () => {
    renderWithIntl(<LearningPathSection />);

    expect(
      screen.getByRole("heading", { name: "Demystifying Flutter: Learn Directly and Visually" }),
    ).toBeInTheDocument();

    const steps = screen
      .getAllByRole("heading", { level: 3 })
      .map((heading) => heading.textContent);
    expect(steps).toEqual(["Visual Preview", "Instant Source Code", "Practical Implementation"]);
  });
});
