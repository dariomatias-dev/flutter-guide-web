import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FeaturesSection } from "@/features/features-showcase/components/features-section";
import { features } from "@/features/features-showcase/data/features";
import { renderWithIntl } from "@/shared/lib/test-utils";

import messages from "../../../../../messages/en.json";

describe("FeaturesSection", () => {
  it("renders the title and one card per feature, with its title and description", () => {
    renderWithIntl(<FeaturesSection />);

    expect(
      screen.getByRole("heading", { name: "A Powerful Toolkit in Your Pocket" }),
    ).toBeInTheDocument();

    for (const { key } of features) {
      const copy = messages.Features[key as keyof typeof messages.Features] as {
        title: string;
        description: string;
      };
      expect(screen.getByRole("heading", { name: copy.title })).toBeInTheDocument();
      expect(screen.getByText(copy.description)).toBeInTheDocument();
    }
  });
});
