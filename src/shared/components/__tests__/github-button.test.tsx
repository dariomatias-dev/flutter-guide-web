import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GithubButton } from "@/shared/components/github-button";

describe("GithubButton", () => {
  it("links to the app's GitHub repository in a new tab", () => {
    render(<GithubButton />);

    const link = screen.getByRole("link", { name: /view on github/i });
    expect(link).toHaveAttribute("href", "https://github.com/dariomatias-dev/flutter_guide_app");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
