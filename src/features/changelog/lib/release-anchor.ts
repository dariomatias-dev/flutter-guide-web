/** The in-page anchor for a release on the changelog page: "1.3.0" -> "v1-3-0". */
export const releaseAnchor = (version: string) =>
  `v${version.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-")}`;

/** Parses a changelog date (YYYY-MM-DD) as UTC midnight. */
export const releaseDate = (date: string) => new Date(`${date}T00:00:00Z`);
