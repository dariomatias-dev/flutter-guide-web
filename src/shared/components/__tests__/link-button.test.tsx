import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { LinkButton } from "@/shared/components/link-button";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("LinkButton", () => {
  it("renders an external link by default", () => {
    renderWithIntl(<LinkButton href="https://example.com">Click me</LinkButton>);

    const link = screen.getByRole("link", { name: "Click me" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("allows overriding target and rel for an internal link", () => {
    renderWithIntl(
      <LinkButton href="/" target="_self" rel="">
        Back to Home
      </LinkButton>,
    );

    const link = screen.getByRole("link", { name: "Back to Home" });
    expect(link).toHaveAttribute("href", "/");
    expect(link).toHaveAttribute("target", "_self");
  });

  it("renders a single link with no nested button", () => {
    renderWithIntl(<LinkButton href="https://example.com">Click me</LinkButton>);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });
});
