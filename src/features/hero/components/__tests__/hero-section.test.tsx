import { screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { HeroContent } from "@/features/hero/components/hero-content";
import { HeroSection } from "@/features/hero/components/hero-section";
import { catalogTotal } from "@/shared/lib/catalog-stats";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("HeroContent", () => {
  it("renders the headline and a subtitle with the catalog total", () => {
    renderWithIntl(<HeroContent latestVersion="1.3.0" />);

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Learn Flutter");
    expect(heading).toHaveTextContent("by example.");
    expect(
      screen.getByText(new RegExp(`with ${catalogTotal}\\+ runnable samples`)),
    ).toBeInTheDocument();
  });

  it("links to the Play Store and to the examples section", () => {
    renderWithIntl(<HeroContent latestVersion="1.3.0" />);

    expect(screen.getByRole("link", { name: /Download on Google Play/ })).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.dariomatias.flutter_guide",
    );
    expect(screen.getByRole("link", { name: /Explore the examples/ })).toHaveAttribute(
      "href",
      "/#examples",
    );
  });

  it("announces the latest version, linking to its release notes", () => {
    renderWithIntl(<HeroContent latestVersion="1.3.0" />);

    expect(screen.getByRole("link", { name: /New in v1\.3\.0/ })).toHaveAttribute(
      "href",
      "/changelog#v1-3-0",
    );
  });

  it("shows the plain eyebrow when the latest version is unknown", () => {
    renderWithIntl(<HeroContent latestVersion={null} />);

    expect(screen.getByText("Flutter learning app")).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /New in/ })).not.toBeInTheDocument();
  });

  it("describes both phone screenshots", () => {
    renderWithIntl(<HeroContent latestVersion={null} />);

    expect(screen.getByRole("img", { name: /home screen/ })).toBeInTheDocument();
    expect(screen.getByRole("img", { name: /source code of the ActionChip/ })).toBeInTheDocument();
  });
});

describe("HeroSection", () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("reads the latest version from the app's changelog", async () => {
    vi.spyOn(globalThis, "fetch").mockImplementation(
      async () => new Response("## [2.0.0] - 2027-01-01\n### Added\n- Things\n"),
    );

    renderWithIntl(await HeroSection());

    expect(screen.getByRole("link", { name: /New in v2\.0\.0/ })).toBeInTheDocument();
  });

  it("falls back to the plain eyebrow when the changelog can't be fetched", async () => {
    vi.spyOn(globalThis, "fetch").mockRejectedValue(new TypeError("fetch failed"));

    renderWithIntl(await HeroSection());

    expect(screen.getByText("Flutter learning app")).toBeInTheDocument();
  });
});
