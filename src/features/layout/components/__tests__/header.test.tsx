import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Header } from "@/features/layout/components/header";

describe("Header", () => {
  it("links to the privacy policy page", () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "Privacy Policy" })).toHaveAttribute(
      "href",
      "/privacy-policy",
    );
  });

  it("links to GitHub and the Play Store", () => {
    render(<Header />);

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
    render(<Header />);

    expect(screen.queryByRole("button", { name: "Close menu" })).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Open menu" }));
    expect(screen.getByRole("button", { name: "Close menu" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close menu" }));
    expect(screen.queryByRole("button", { name: "Close menu" })).not.toBeInTheDocument();
  });
});
