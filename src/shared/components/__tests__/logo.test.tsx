import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Logo } from "@/shared/components/logo";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("Logo", () => {
  it("links home, named by its wordmark", () => {
    renderWithIntl(<Logo />);

    expect(screen.getByRole("link", { name: "FlutterGuide" })).toHaveAttribute("href", "/");
  });

  it("switches the wordmark color for light bands", () => {
    renderWithIntl(<Logo tone="light" />);

    expect(screen.getByRole("link", { name: "FlutterGuide" })).toHaveClass("text-heading");
  });
});
