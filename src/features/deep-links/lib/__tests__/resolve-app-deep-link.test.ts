import { describe, expect, it } from "vitest";

import { resolveAppDeepLink } from "@/features/deep-links/lib/resolve-app-deep-link";

describe("resolveAppDeepLink", () => {
  it.each(["widgets", "functions", "packages", "elements", "uis"])(
    "resolves a %s category with a slug",
    (category) => {
      expect(resolveAppDeepLink(`/${category}/gradient-card`)).toBe(
        `flutterguide://open.app/${category}/gradient-card`,
      );
    },
  );

  it("resolves a slug with multiple segments", () => {
    expect(resolveAppDeepLink("/widgets/material/gradient-card")).toBe(
      "flutterguide://open.app/widgets/material/gradient-card",
    );
  });

  it("returns null for a category with no slug", () => {
    expect(resolveAppDeepLink("/widgets")).toBeNull();
  });

  it("returns null for a category with a trailing slash and no slug", () => {
    expect(resolveAppDeepLink("/widgets/")).toBeNull();
  });

  it("returns null for an unknown path", () => {
    expect(resolveAppDeepLink("/this-does-not-exist")).toBeNull();
  });

  it("returns null for the root path", () => {
    expect(resolveAppDeepLink("/")).toBeNull();
  });

  it("does not match a category name used as a prefix of another word", () => {
    expect(resolveAppDeepLink("/widgets-catalog/x")).toBeNull();
  });

  it("preserves the query string", () => {
    expect(resolveAppDeepLink("/widgets/gradient-card", "?ref=share")).toBe(
      "flutterguide://open.app/widgets/gradient-card?ref=share",
    );
  });

  it("preserves the hash", () => {
    expect(resolveAppDeepLink("/widgets/gradient-card", "", "#code")).toBe(
      "flutterguide://open.app/widgets/gradient-card#code",
    );
  });

  it("preserves both the query string and the hash", () => {
    expect(resolveAppDeepLink("/widgets/gradient-card", "?ref=share", "#code")).toBe(
      "flutterguide://open.app/widgets/gradient-card?ref=share#code",
    );
  });
});
