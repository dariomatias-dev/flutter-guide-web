import { highlightCodeSnippet } from "@/features/examples/lib/highlight-code";

import { ExamplesContent } from "./examples-content";

/** Highlights the sample and renders the examples section. */
export const ExamplesSection = async () => {
  const codeHtml = await highlightCodeSnippet();

  return <ExamplesContent codeHtml={codeHtml} />;
};
