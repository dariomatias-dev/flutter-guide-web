import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PlayStoreButton } from "@/shared/components/play-store-button";

describe("PlayStoreButton", () => {
  it("links to the app's Play Store listing", () => {
    render(<PlayStoreButton />);

    const link = screen.getByRole("link", { name: /download on google play/i });
    expect(link).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.dariomatias.flutter_guide",
    );
  });
});
