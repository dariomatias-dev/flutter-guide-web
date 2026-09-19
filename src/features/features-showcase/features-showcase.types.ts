import type { LucideIcon } from "lucide-react";

export interface Feature {
  icon: LucideIcon;
  key: "livePreview" | "sourceCode" | "organized" | "favorites" | "codeThemes" | "languages";
}
