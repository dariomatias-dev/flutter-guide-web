import { codeToHtml } from "shiki";

import { codeSnippet } from "./code-snippet";

export const highlightCodeSnippet = (theme: "github-light" | "dracula") =>
  codeToHtml(codeSnippet, { lang: "dart", theme });
