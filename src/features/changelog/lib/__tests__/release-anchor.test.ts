import { describe, expect, it } from "vitest";

import { releaseAnchor, releaseDate } from "@/features/changelog/lib/release-anchor";

describe("releaseAnchor", () => {
  it("turns a version into an anchor id", () => {
    expect(releaseAnchor("1.3.0")).toBe("v1-3-0");
    expect(releaseAnchor("Unreleased")).toBe("vunreleased");
  });
});

describe("releaseDate", () => {
  it("pins a calendar day to UTC midnight", () => {
    expect(releaseDate("2026-08-01").toISOString()).toBe("2026-08-01T00:00:00.000Z");
  });
});
