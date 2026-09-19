import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { ScreenshotsCarousel } from "@/features/screenshots/components/screenshots-carousel";
import { screenshots } from "@/features/screenshots/data/screenshots";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("ScreenshotsCarousel", () => {
  it("renders one captioned slide per screenshot", () => {
    renderWithIntl(<ScreenshotsCarousel />);

    expect(screen.getAllByRole("button", { name: /^Enlarge screenshot:/ })).toHaveLength(
      screenshots.length,
    );
    expect(screen.getByText("Code theme selector")).toBeInTheDocument();
  });

  it("starts on the first slide with the previous button disabled", () => {
    renderWithIntl(<ScreenshotsCarousel />);

    expect(screen.getByRole("button", { name: "Previous screenshot" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Go to slide 1" })).toHaveAttribute(
      "aria-current",
      "true",
    );
    expect(screen.getByRole("button", { name: "Go to slide 2" })).not.toHaveAttribute(
      "aria-current",
    );
  });

  it("opens and closes the image viewer", async () => {
    const user = userEvent.setup();
    renderWithIntl(<ScreenshotsCarousel />);

    await user.click(screen.getByRole("button", { name: "Enlarge screenshot: Settings" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close image viewer" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("labels the viewer with the clicked screenshot, not the active slide", async () => {
    const user = userEvent.setup();
    renderWithIntl(<ScreenshotsCarousel />);

    await user.click(
      screen.getByRole("button", { name: "Enlarge screenshot: UI samples catalog" }),
    );

    expect(screen.getByRole("dialog", { name: "UI samples catalog" })).toBeInTheDocument();
  });

  it("closes the image viewer with Escape", async () => {
    const user = userEvent.setup();
    renderWithIntl(<ScreenshotsCarousel />);

    await user.click(screen.getByRole("button", { name: "Enlarge screenshot: Settings" }));
    expect(screen.getByRole("dialog")).toBeInTheDocument();

    await user.keyboard("{Escape}");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("doesn't crash when a dot button is clicked", async () => {
    const user = userEvent.setup();
    renderWithIntl(<ScreenshotsCarousel />);

    await user.click(screen.getByRole("button", { name: "Go to slide 2" }));

    expect(screen.getByRole("button", { name: "Go to slide 2" })).toBeInTheDocument();
  });

  it("closes the image viewer on a click beside the screenshot", async () => {
    const user = userEvent.setup();
    renderWithIntl(<ScreenshotsCarousel />);

    await user.click(screen.getByRole("button", { name: "Enlarge screenshot: Settings" }));
    await user.click(screen.getByRole("dialog"));

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});
