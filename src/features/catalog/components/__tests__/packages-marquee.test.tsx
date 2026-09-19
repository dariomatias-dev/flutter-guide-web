import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PackagesMarquee } from "@/features/catalog/components/packages-marquee";
import { packages } from "@/features/catalog/data/packages";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("PackagesMarquee", () => {
  it("lists every package once for assistive tech, duplicating rows only visually", () => {
    const { container } = renderWithIntl(<PackagesMarquee />);

    expect(
      screen.getByText(`${packages.length} pub.dev packages, each running live in the app`),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(packages.length);
    expect(container.querySelectorAll('ul[aria-hidden="true"] li')).toHaveLength(packages.length);
  });
});
