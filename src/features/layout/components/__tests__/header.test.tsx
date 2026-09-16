import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Header } from "@/features/layout/components/header";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("Header", () => {
  it("links to the privacy policy page", () => {
    renderWithIntl(<Header />);

    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy-policy",
    );
  });

  it("links to the page's own sections", () => {
    renderWithIntl(<Header />);

    expect(screen.getByRole("link", { name: "Screenshots" })).toHaveAttribute("href", "/#showcase");
    expect(screen.getByRole("link", { name: "Features" })).toHaveAttribute("href", "/#features");
    expect(screen.getByRole("link", { name: "FAQ" })).toHaveAttribute("href", "/#faq");
  });

  it("links to GitHub and the Play Store", () => {
    renderWithIntl(<Header />);

    expect(screen.getByRole("link", { name: "GitHub" })).toHaveAttribute(
      "href",
      "https://github.com/dariomatias-dev/flutter_guide_app",
    );
    expect(screen.getByRole("link", { name: "Download App" })).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.dariomatias.flutter_guide",
    );
  });

  it("opens and closes the mobile menu", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Header />);

    expect(screen.queryByRole("button", { name: "Close menu" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.queryByRole("button", { name: "Close menu" })).not.toBeInTheDocument();
  });

  it("opens the mobile menu as an accessible dialog and closes it with Escape", async () => {
    const user = userEvent.setup();
    renderWithIntl(<Header />);

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
