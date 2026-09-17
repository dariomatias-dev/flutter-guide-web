import { act, fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ScreenshotThumbnail } from "@/features/screenshots/components/screenshot-thumbnail";

// See image-viewer.test.tsx: next/image's onLoad wrapper calls
// `img.decode()`, unavailable in jsdom, so a plain <img> mock is needed
// for fireEvent.load to reach the real component's handler.
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    onLoad,
    ref,
  }: {
    src: string;
    alt: string;
    onLoad?: () => void;
    ref?: React.Ref<HTMLImageElement>;
    // eslint-disable-next-line @next/next/no-img-element -- intentional stand-in for next/image, see the comment above.
  }) => <img ref={ref} src={src} alt={alt} onLoad={onLoad} />,
}));

describe("ScreenshotThumbnail", () => {
  it("shows a loading spinner until the image loads", () => {
    render(<ScreenshotThumbnail src="/screenshots/01_home.png" alt="Home screen" priority />);

    expect(screen.getByRole("status")).toBeInTheDocument();

    act(() => {
      fireEvent.load(screen.getByAltText("Home screen"));
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("skips the spinner when the image is already cached and complete", () => {
    const completeSpy = vi.spyOn(HTMLImageElement.prototype, "complete", "get");
    completeSpy.mockReturnValue(true);

    render(<ScreenshotThumbnail src="/screenshots/01_home.png" alt="Home screen" priority />);

    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    completeSpy.mockRestore();
  });
});
