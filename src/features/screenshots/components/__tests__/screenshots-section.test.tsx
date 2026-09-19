import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ScreenshotsSection } from "@/features/screenshots/components/screenshots-section";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("ScreenshotsSection", () => {
  it("renders the title and the carousel", () => {
    renderWithIntl(<ScreenshotsSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Every screen, made to learn." }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Enlarge screenshot: Home, with every component group" }),
    ).toBeInTheDocument();
  });
});
