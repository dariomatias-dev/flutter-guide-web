import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ScreenshotsCarousel } from "@/features/screenshots/components/screenshots-carousel";

// Real slide navigation isn't tested here (jsdom reports 0 for every slide
// width); see e2e/navigation.spec.ts for that.
describe("ScreenshotsCarousel", () => {
  it("starts on the first slide with the previous button disabled", () => {
    render(<ScreenshotsCarousel />);

    expect(screen.getByRole("button", { name: "Previous screenshot" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Go to slide 1" }).firstChild).toHaveClass(
      "bg-brand-accent",
    );
  });

  it("opens and closes the image viewer", async () => {
    const user = userEvent.setup();
    render(<ScreenshotsCarousel />);

    await user.click(screen.getByRole("button", { name: "View screenshot 1" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close Image Viewer" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("labels the viewer with the clicked screenshot, not the active slide", async () => {
    const user = userEvent.setup();
    render(<ScreenshotsCarousel />);

    await user.click(screen.getByRole("button", { name: "View screenshot 3" }));

    expect(screen.getByRole("dialog", { name: "UIs catalog list" })).toBeInTheDocument();
  });

  it("closes the image viewer with Escape", async () => {
    const user = userEvent.setup();
    render(<ScreenshotsCarousel />);

    await user.click(screen.getByRole("button", { name: "View screenshot 1" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
