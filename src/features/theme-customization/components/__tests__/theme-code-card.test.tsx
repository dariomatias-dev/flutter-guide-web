import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ThemeCodeCard } from "@/features/theme-customization/components/theme-code-card";

describe("ThemeCodeCard", () => {
  it("renders the label and the highlighted code", () => {
    render(
      <ThemeCodeCard
        html="<pre><code>void main() {}</code></pre>"
        label="GitHub Light"
        variant="light"
      />,
    );

    expect(screen.getByText("GitHub Light")).toBeInTheDocument();
    expect(screen.getByText("void main() {}")).toBeInTheDocument();
  });

  it("uses the light card colors for the light variant", () => {
    render(<ThemeCodeCard html="<pre><code></code></pre>" label="GitHub Light" variant="light" />);

    expect(screen.getByText("GitHub Light").closest("div")).toHaveClass("bg-white");
  });

  it("uses the dark card colors for the dark variant", () => {
    render(<ThemeCodeCard html="<pre><code></code></pre>" label="Dracula" variant="dark" />);

    expect(screen.getByText("Dracula").closest("div")).toHaveClass("bg-[#282a36]");
  });
});
