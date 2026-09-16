export interface Release {
  version: string;
  date: string;
  highlights: string[];
}

// Condensed from flutter_guide_app's CHANGELOG.md. Update after a release
// that's worth a marketing highlight.
export const releases: Release[] = [
  {
    version: "1.3.0",
    date: "August 2026",
    highlights: [
      "Now available in Spanish, alongside Portuguese and English",
      "Dozens of new catalog samples, including DataTable, Stepper, and SearchBar",
      "Accessibility labels added across interactive components",
    ],
  },
  {
    version: "1.2.3",
    date: "September 2025",
    highlights: [
      "Fixed the theme not applying correctly when opening a shared link",
      "Standardized app links across the app",
    ],
  },
  {
    version: "1.2.2",
    date: "September 2025",
    highlights: [
      "Redesigned dialogs across the app",
      "Accepts more Android deep link formats",
      "Localized error messages for invalid links",
    ],
  },
];
