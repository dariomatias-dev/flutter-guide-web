import type { ElementType } from "react";

export interface Feature {
  icon: ElementType;
  key:
    | "livePreviews"
    | "favorites"
    | "search"
    | "deepLinks"
    | "languages"
    | "codeThemes"
    | "lightDarkMode";
}
