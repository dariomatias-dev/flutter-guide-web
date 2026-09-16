import { screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";

import { AppLinkPage } from "@/features/deep-links/components/app-link-page";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("AppLinkPage", () => {
  afterEach(() => {
    window.history.pushState({}, "", "/");
  });

  it("shows an Open in App link built from the current URL", async () => {
    window.history.pushState({}, "", "/widgets/x?ref=share#section");
    renderWithIntl(<AppLinkPage />);

    expect(await screen.findByRole("link", { name: /Open in App/ })).toHaveAttribute(
      "href",
      "flutterguide://open.app/widgets/x?ref=share#section",
    );
  });

  it("offers the Play Store download as a fallback", () => {
    window.history.pushState({}, "", "/widgets/x");
    renderWithIntl(<AppLinkPage />);

    expect(screen.getByRole("link", { name: "Download on Google Play" })).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.dariomatias.flutter_guide",
    );
  });

  it("shows no Open in App link for a path with no resolvable deep link", () => {
    window.history.pushState({}, "", "/this-does-not-exist");
    renderWithIntl(<AppLinkPage />);

    expect(screen.queryByRole("link", { name: /Open in App/ })).not.toBeInTheDocument();
  });
});
