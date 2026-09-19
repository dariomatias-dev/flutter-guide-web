import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ExamplesSection } from "@/features/examples/components/examples-section";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("ExamplesSection", () => {
  it("renders the ActionChip sample's highlighted source", async () => {
    const element = await ExamplesSection();
    const { container } = renderWithIntl(element);

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent("Real examples");
    expect(container.querySelector(".shiki")).toHaveTextContent("class ActionChipSample");
  });
});
