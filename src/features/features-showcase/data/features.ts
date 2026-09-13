import { Eye, Languages, Link2, Moon, Palette, Search, Star } from "lucide-react";

import type { Feature } from "@/features/features-showcase/features-showcase.types";

export const features: Feature[] = [
  {
    icon: Eye,
    title: "Live Previews",
    description:
      "See every widget, element, and UI rendered live, not just described, with the source code right next to it.",
  },
  {
    icon: Star,
    title: "Favorites",
    description: "Save the components you use most for quick access later.",
  },
  {
    icon: Search,
    title: "Search",
    description: "Find the widget, function, or package you need in seconds.",
  },
  {
    icon: Link2,
    title: "Deep Links",
    description: "Jump straight to a specific component from a shared link, no browsing required.",
  },
  {
    icon: Languages,
    title: "3 Languages",
    description: "Use the app in English, Spanish, or Portuguese.",
  },
  {
    icon: Palette,
    title: "Code Themes",
    description: "Pick the syntax highlighting theme that's easiest on your eyes.",
  },
  {
    icon: Moon,
    title: "Light & Dark Mode",
    description: "Switch between light and dark, matching your system or your preference.",
  },
];
