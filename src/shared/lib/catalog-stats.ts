/** Catalog counts from the app's sample_definitions (counted 2026-09-13). */
export const catalogStats = {
  widgets: 143,
  functions: 13,
  packages: 46,
  elements: 9,
  uis: 5,
} as const;

export const catalogTotal = Object.values(catalogStats).reduce((sum, count) => sum + count, 0);
