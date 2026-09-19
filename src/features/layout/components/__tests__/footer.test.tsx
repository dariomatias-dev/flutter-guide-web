import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Footer } from "@/features/layout/components/footer";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("Footer", () => {
  it("links to the author's portfolio", () => {
    renderWithIntl(<Footer />);

    expect(screen.getByRole("link", { name: "Dário Matias" })).toHaveAttribute(
      "href",
      "https://dariomatias-dev.com/",
    );
  });

  it("shows the current year in the copyright notice", () => {
    renderWithIntl(<Footer />);

    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(`© ${year} FlutterGuide`))).toBeInTheDocument();
  });

  it("renders the four link columns", () => {
    renderWithIntl(<Footer />);

    const headings = screen.getAllByRole("heading", { level: 2 }).map((h) => h.textContent);
    expect(headings).toEqual(["The app", "Flutter resources", "Open source", "Get the app"]);
  });

  it("links to the page's own sections, Flutter's docs, the Play Store and the privacy policy", () => {
    renderWithIntl(<Footer />);

    expect(screen.getByRole("link", { name: "Screenshots" })).toHaveAttribute("href", "/#showcase");
    expect(screen.getByRole("link", { name: "Flutter docs" })).toHaveAttribute(
      "href",
      "https://docs.flutter.dev",
    );
    expect(screen.getByRole("link", { name: "Google Play" })).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.dariomatias.flutter_guide",
    );
    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy-policy",
    );
  });

  it("opens external links in a new tab and internal ones in place", () => {
    renderWithIntl(<Footer />);

    expect(screen.getByRole("link", { name: "pub.dev" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "FAQ" })).not.toHaveAttribute("target");
  });

  it("links to the project's and the author's social profiles", () => {
    renderWithIntl(<Footer />);

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/dariomatias-dev/flutter_guide_app",
    );
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://www.instagram.com/dariomatias_dev/",
    );
    expect(screen.getByRole("link", { name: "LinkedIn" })).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/dariomatias-dev/",
    );
  });

  it("leaves the language picker to the header", () => {
    renderWithIntl(<Footer />);

    expect(screen.queryByRole("button", { name: /^Language/ })).not.toBeInTheDocument();
  });

  it("describes the app next to the logo", () => {
    renderWithIntl(<Footer />);

    expect(screen.getByText(/open-source Android app for learning Flutter/)).toBeInTheDocument();
  });
});
