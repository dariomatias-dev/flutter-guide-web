import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AboutMeSection } from "@/features/about/components/about-me-section";
import { links } from "@/features/about/data/links";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("AboutMeSection", () => {
  it("renders the name, role, bio, and every social link", () => {
    renderWithIntl(<AboutMeSection />);

    expect(screen.getByRole("heading", { name: "Dário Matias" })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Software Developer | Full Stack & Mobile" }),
    ).toBeInTheDocument();

    for (const { href, aria } of links) {
      expect(screen.getByRole("link", { name: aria })).toHaveAttribute("href", href);
    }
  });
});
