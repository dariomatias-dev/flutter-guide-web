import { describe, expect, it } from "vitest";

import { highlightCodeSnippet } from "@/features/theme-customization/lib/highlight-code";

describe("highlightCodeSnippet", () => {
  it("renders the snippet with the GitHub Light theme", async () => {
    const html = await highlightCodeSnippet("github-light");

    expect(html).toContain('class="shiki github-light"');
    expect(html).toContain("MyApp");
  });

  it("renders the snippet with the Dracula theme", async () => {
    const html = await highlightCodeSnippet("dracula");

    expect(html).toContain('class="shiki dracula"');
    expect(html).toContain("MyApp");
  });
});
