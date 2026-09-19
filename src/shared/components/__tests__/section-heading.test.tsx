import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { highlightOnDark, highlightOnLight } from "@/shared/components/highlight";
import { SectionHeading } from "@/shared/components/section-heading";

describe("SectionHeading", () => {
  it("renders the eyebrow, a level-2 title and the subtitle", () => {
    render(<SectionHeading tone="dark" eyebrow="FAQ" title="Questions" subtitle="Answers here." />);

    expect(screen.getByText("FAQ")).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Questions" })).toHaveClass("text-white");
    expect(screen.getByText("Answers here.")).toBeInTheDocument();
  });

  it("uses ink text on light bands and can center itself", () => {
    const { container } = render(
      <SectionHeading tone="light" align="center" eyebrow="E" title="Title" />,
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveClass("text-heading");
    expect(container.firstChild).toHaveClass("text-center");
  });

  it("highlights with a gradient that matches the band", () => {
    render(
      <>
        {highlightOnDark("dark")}
        {highlightOnLight("light")}
      </>,
    );

    expect(screen.getByText("dark")).toHaveClass("text-brand-300");
    expect(screen.getByText("light")).toHaveClass("text-brand-600");
  });
});
