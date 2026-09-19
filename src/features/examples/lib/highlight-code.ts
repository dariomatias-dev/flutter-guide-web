import { codeToHtml } from "shiki";

import { codeSnippet } from "./code-snippet";

/** Highlights the sample with shiki at build time. */
export const highlightCodeSnippet = () =>
  codeToHtml(codeSnippet, {
    lang: "dart",
    theme: "tokyo-night",
    colorReplacements: { "#51597d": "#8089b3", "#5a638c": "#8a93bd" },
  });
