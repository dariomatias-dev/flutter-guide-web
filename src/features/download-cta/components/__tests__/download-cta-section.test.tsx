import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { DownloadCtaSection } from "@/features/download-cta/components/download-cta-section";
import { catalogTotal } from "@/shared/lib/catalog-stats";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("DownloadCtaSection", () => {
  it("renders the title, the catalog total and the Play Store link", () => {
    renderWithIntl(<DownloadCtaSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Ready to learn by example?" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`carry ${catalogTotal}\\+ runnable samples`)),
    ).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Download on Google Play/ })).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.dariomatias.flutter_guide",
    );
  });
});
