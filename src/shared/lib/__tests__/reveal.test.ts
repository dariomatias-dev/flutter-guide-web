import { describe, expect, it } from "vitest";

import { revealDelay } from "@/shared/lib/reveal";

describe("revealDelay", () => {
  it("delays each item by index times the step", () => {
    expect(revealDelay(0)).toEqual({ "--reveal-delay": "0ms" });
    expect(revealDelay(3)).toEqual({ "--reveal-delay": "240ms" });
    expect(revealDelay(2, 120)).toEqual({ "--reveal-delay": "240ms" });
  });
});
