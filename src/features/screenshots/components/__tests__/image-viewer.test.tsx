import { act, fireEvent, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ImageViewer } from "@/features/screenshots/components/image-viewer";
import { Dialog } from "@/shared/components/ui/dialog";
import { renderWithIntl } from "@/shared/lib/test-utils";

// next/image wraps onLoad/onError with its own image-decoding logic
// (calls `img.decode()`, unavailable in jsdom), so firing DOM load/error
// events never reaches the real component's handlers. A plain <img> mock
// routes them through React's normal event system instead.
vi.mock("next/image", () => ({
  default: ({
    src,
    alt,
    onLoad,
    onError,
    ref,
  }: {
    src: string;
    alt: string;
    onLoad?: () => void;
    onError?: () => void;
    ref?: React.Ref<HTMLImageElement>;
    // eslint-disable-next-line @next/next/no-img-element -- intentional stand-in for next/image, see the comment above.
  }) => <img ref={ref} src={src} alt={alt} onLoad={onLoad} onError={onError} />,
}));

const renderViewer = (props: { src: string; alt: string }) =>
  renderWithIntl(
    <Dialog open>
      <ImageViewer {...props} />
    </Dialog>,
  );

describe("ImageViewer", () => {
  it("shows a loading spinner until the image loads", () => {
    renderViewer({ src: "/screenshots/01_home.png", alt: "Home screen" });

    expect(screen.getByRole("status")).toBeInTheDocument();

    act(() => {
      fireEvent.load(screen.getByAltText("Home screen"));
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("shows a fallback message if the image fails to load", () => {
    renderViewer({ src: "/screenshots/01_home.png", alt: "Home screen" });

    act(() => {
      fireEvent.error(screen.getByAltText("Home screen"));
    });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();
    expect(screen.getByText("Failed to load image")).toBeInTheDocument();
  });

  it("skips the spinner when the image is already cached and complete", () => {
    const completeSpy = vi.spyOn(HTMLImageElement.prototype, "complete", "get");
    completeSpy.mockReturnValue(true);

    renderViewer({ src: "/screenshots/01_home.png", alt: "Home screen" });

    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    completeSpy.mockRestore();
  });
});
