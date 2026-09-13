// Counted from flutter_guide_app's sample_definitions/{widgets,functions,
// packages,elements,uis}.dart on 2026-09-13. Re-count from those files
// after a content-adding release and update here.
export const catalogStats = {
  widgets: 143,
  functions: 13,
  packages: 46,
  elements: 9,
  uis: 5,
} as const;

export const catalogTotal = Object.values(catalogStats).reduce((sum, count) => sum + count, 0);
