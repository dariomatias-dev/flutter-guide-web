import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { PhoneFrame } from "@/shared/components/phone-frame";

describe("PhoneFrame", () => {
  it("renders the screenshot with its alt text", () => {
    render(<PhoneFrame src="/screenshots/01_home.png" alt="Home screen" />);

    expect(screen.getByRole("img", { name: "Home screen" })).toBeInTheDocument();
  });

  it("merges a caller's classes over the defaults", () => {
    const { container } = render(<PhoneFrame src="/x.png" alt="" className="absolute w-40" />);

    expect(container.firstChild).toHaveClass("absolute", "w-40");
    expect(container.firstChild).not.toHaveClass("relative");
  });
});
