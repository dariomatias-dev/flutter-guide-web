import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ScreenshotsSection } from "@/features/screenshots/components/screenshots-section";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("ScreenshotsSection", () => {
  it("renders the title and the carousel", () => {
    renderWithIntl(<ScreenshotsSection />);

    expect(screen.getByRole("heading", { name: "The App in Action" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "View screenshot 1" })).toBeInTheDocument();
  });
});
