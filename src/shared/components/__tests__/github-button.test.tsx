import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { GithubButton } from "@/shared/components/github-button";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("GithubButton", () => {
  it("links to the app's GitHub repository in a new tab", () => {
    renderWithIntl(<GithubButton />);

    const link = screen.getByRole("link", { name: /view on github/i });
    expect(link).toHaveAttribute("href", "https://github.com/dariomatias-dev/flutter_guide_app");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders a single link with no nested button", () => {
    renderWithIntl(<GithubButton />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("uses the outlined light variant on light bands", () => {
    renderWithIntl(<GithubButton tone="light" />);

    expect(screen.getByRole("link", { name: /view on github/i })).toHaveClass("bg-white");
  });
});
