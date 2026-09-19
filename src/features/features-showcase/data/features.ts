import { Code2, Languages, LayoutGrid, MousePointerClick, Palette, Star } from "lucide-react";

import type { Feature } from "@/features/features-showcase/features-showcase.types";

/** Title/description live in messages/*.json under Features.items.<key>. */
export const features: Feature[] = [
  { icon: MousePointerClick, key: "livePreview" },
  { icon: Code2, key: "sourceCode" },
  { icon: LayoutGrid, key: "organized" },
  { icon: Star, key: "favorites" },
  { icon: Palette, key: "codeThemes" },
  { icon: Languages, key: "languages" },
];
