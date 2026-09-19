import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  GithubIcon,
  GooglePlayIcon,
  InstagramIcon,
  LinkedinIcon,
} from "@/shared/components/brand-icons";

describe("brand icons", () => {
  it.each([
    ["GooglePlayIcon", GooglePlayIcon],
    ["GithubIcon", GithubIcon],
    ["LinkedinIcon", LinkedinIcon],
    ["InstagramIcon", InstagramIcon],
  ])("%s is decorative and forwards props", (_, Icon) => {
    const { container } = render(<Icon className="size-4" />);
    const svg = container.querySelector("svg")!;

    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).toHaveClass("size-4");
  });
});
