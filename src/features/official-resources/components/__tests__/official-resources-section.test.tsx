import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { OfficialResourcesSection } from "@/features/official-resources/components/official-resources-section";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("OfficialResourcesSection", () => {
  it("renders the title and links each card to the right external URL", () => {
    renderWithIntl(<OfficialResourcesSection />);

    expect(
      screen.getByRole("heading", { name: "Your Hub for Official Flutter Resources" }),
    ).toBeInTheDocument();

    expect(screen.getByRole("link", { name: /Official Documentation/ })).toHaveAttribute(
      "href",
      "https://docs.flutter.dev/",
    );
    expect(screen.getByRole("link", { name: /pub\.dev Packages/ })).toHaveAttribute(
      "href",
      "https://pub.dev/",
    );
    expect(screen.getByRole("link", { name: /YouTube Channel/ })).toHaveAttribute(
      "href",
      "https://www.youtube.com/@flutterdev",
    );
  });
});
