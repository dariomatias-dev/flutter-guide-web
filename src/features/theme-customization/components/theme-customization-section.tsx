import { highlightCodeSnippet } from "@/features/theme-customization/lib/highlight-code";

import { ThemeCustomizationContent } from "./theme-customization-content";

export const ThemeCustomizationSection = async () => {
  const [lightHtml, darkHtml] = await Promise.all([
    highlightCodeSnippet("github-light"),
    highlightCodeSnippet("dracula"),
  ]);

  return (
    <section id="themes" className="relative w-full py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-160 w-full max-w-5xl rounded-full bg-[radial-gradient(ellipse_at_center,rgba(29,78,216,0.15)_0%,transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <ThemeCustomizationContent lightHtml={lightHtml} darkHtml={darkHtml} />
      </div>
    </section>
  );
};
