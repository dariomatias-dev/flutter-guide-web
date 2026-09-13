import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LinkButton } from "@/shared/components/link-button";

describe("LinkButton", () => {
  it("renders an external link by default", () => {
    render(<LinkButton href="https://example.com">Click me</LinkButton>);

    const link = screen.getByRole("link", { name: "Click me" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("allows overriding target and rel for an internal link", () => {
    render(
      <LinkButton href="/" target="_self" rel="">
        Back to Home
      </LinkButton>,
    );

    const link = screen.getByRole("link", { name: "Back to Home" });
    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveAttribute("target", "_self");
  });
});
