import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FeaturesSection } from "@/features/features-showcase/components/features-section";
import { features } from "@/features/features-showcase/data/features";
import { renderWithIntl } from "@/shared/lib/test-utils";

import messages from "../../../../../messages/en.json";

describe("FeaturesSection", () => {
  it("renders the title and one item per feature, with its title and description", () => {
    renderWithIntl(<FeaturesSection />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Why FlutterGuide?" }),
    ).toBeInTheDocument();

    for (const { key } of features) {
      const item = messages.Features.items[key];
      expect(screen.getByRole("heading", { level: 3, name: item.title })).toBeInTheDocument();
      expect(screen.getByText(item.description)).toBeInTheDocument();
    }
  });

  it("introduces the author, without a photo, and links to their portfolio", () => {
    renderWithIntl(<FeaturesSection />);

    expect(screen.queryByRole("img", { name: "Dário Matias" })).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Meet the author/ })).toHaveAttribute(
      "href",
      "https://dariomatias-dev.com/",
    );
  });
});
