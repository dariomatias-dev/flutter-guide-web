import { describe, expect, it } from "vitest";

import { highlightCodeSnippet } from "@/features/examples/lib/highlight-code";

describe("highlightCodeSnippet", () => {
  it("renders the ActionChip sample with the Tokyo Night theme", async () => {
    const html = await highlightCodeSnippet();

    expect(html).toContain('class="shiki tokyo-night"');
    expect(html).toContain("ActionChipSample");
    expect(html).toContain('class="line"');
  });
});

describe("highlightCodeSnippet's comment colors", () => {
  it("replaces Tokyo Night's low-contrast comment grays", async () => {
    const html = (await highlightCodeSnippet()).toLowerCase();

    expect(html).not.toContain("#51597d");
    expect(html).not.toContain("#5a638c");
    expect(html).toContain("#8089b3");
  });
});
