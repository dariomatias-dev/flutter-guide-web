import { Eye, Languages, Link2, Moon, Palette, Search, Star } from "lucide-react";

import type { Feature } from "@/features/features-showcase/features-showcase.types";

export const features: Feature[] = [
  { icon: Eye, key: "livePreviews" },
  { icon: Star, key: "favorites" },
  { icon: Search, key: "search" },
  { icon: Link2, key: "deepLinks" },
  { icon: Languages, key: "languages" },
  { icon: Palette, key: "codeThemes" },
  { icon: Moon, key: "lightDarkMode" },
];
