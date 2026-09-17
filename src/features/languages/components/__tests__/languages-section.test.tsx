import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LanguagesSection } from "@/features/languages/components/languages-section";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("LanguagesSection", () => {
  it("renders the title and each supported language's native name", () => {
    renderWithIntl(<LanguagesSection />);

    expect(screen.getByRole("heading", { name: "Available in 3 Languages" })).toBeInTheDocument();

    for (const language of ["English", "Português", "Español"]) {
      expect(screen.getByText(language)).toBeInTheDocument();
    }
  });
});
