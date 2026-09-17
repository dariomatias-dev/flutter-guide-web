import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { WhatsNewSection } from "@/features/whats-new/components/whats-new-section";
import { releases } from "@/features/whats-new/data/releases";
import { renderWithIntl } from "@/shared/lib/test-utils";

import messages from "../../../../../messages/en.json";

describe("WhatsNewSection", () => {
  it("renders the title and one card per release, with its highlights", () => {
    renderWithIntl(<WhatsNewSection />);

    expect(screen.getByRole("heading", { name: "What's New" })).toBeInTheDocument();

    for (const { version, key } of releases) {
      expect(screen.getByText(`v${version}`)).toBeInTheDocument();

      const highlights =
        messages.WhatsNew.releases[key as keyof typeof messages.WhatsNew.releases].highlights;
      for (const highlight of highlights) {
        expect(screen.getByText(highlight)).toBeInTheDocument();
      }
    }
  });
});
