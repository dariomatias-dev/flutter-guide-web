import { screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ExamplesContent } from "@/features/examples/components/examples-content";
import { renderWithIntl } from "@/shared/lib/test-utils";

describe("ExamplesContent", () => {
  it("renders the title, the three selling points and a link to the catalog", () => {
    renderWithIntl(<ExamplesContent codeHtml="" />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Real examples, real code." }),
    ).toBeInTheDocument();
    expect(screen.getByText("A working preview, not a screenshot")).toBeInTheDocument();
    expect(screen.getByText("Complete source, ready to paste into main.dart")).toBeInTheDocument();
    expect(screen.getByText("A link to the official docs for every widget")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Browse the catalog/ })).toHaveAttribute(
      "href",
      "/#catalog",
    );
  });

  it("renders the highlighted code it's given next to the sample's preview", () => {
    renderWithIntl(<ExamplesContent codeHtml='<pre class="shiki"><code>ActionChip</code></pre>' />);

    expect(screen.getByText("ActionChip")).toBeInTheDocument();
    expect(
      screen.getByRole("img", { name: /ActionChip sample's live preview/ }),
    ).toBeInTheDocument();
  });
});
