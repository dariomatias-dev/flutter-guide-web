export interface Release {
  version: string;
  date: string;
  key: string;
}

// Condensed from flutter_guide_app's CHANGELOG.md. `key` matches
// WhatsNew.releases.<key>.highlights in messages/*.json. Update after a
// release that's worth a marketing highlight.
export const releases: Release[] = [
  { version: "1.3.0", date: "2026-08-01", key: "v1_3_0" },
  { version: "1.2.3", date: "2025-09-05", key: "v1_2_3" },
  { version: "1.2.2", date: "2025-09-03", key: "v1_2_2" },
];
