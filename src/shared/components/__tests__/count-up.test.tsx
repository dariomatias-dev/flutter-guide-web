import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { CountUp } from "@/shared/components/count-up";

describe("CountUp", () => {
  it("gives screen readers the final, formatted value", () => {
    render(<CountUp value={97.8} decimals={1} suffix="%" />);

    expect(screen.getByText("97.8%", { selector: ".sr-only" })).toBeInTheDocument();
  });

  it("lands on the final value once the animation ends", async () => {
    render(<CountUp value={378} durationMs={50} />);

    expect(
      await screen.findByText("378", { selector: '[aria-hidden="true"]' }, { timeout: 2000 }),
    ).toBeInTheDocument();
  });

  it("skips the animation under reduced motion", () => {
    vi.mocked(window.matchMedia).mockImplementationOnce(
      (query: string) => ({ matches: true, media: query }) as MediaQueryList,
    );
    render(<CountUp value={46} />);

    expect(screen.getByText("46", { selector: '[aria-hidden="true"]' })).toBeInTheDocument();
  });
});
