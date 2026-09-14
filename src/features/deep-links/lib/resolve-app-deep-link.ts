const APP_BASE_PATHS = ["/widgets", "/packages", "/functions", "/elements", "/uis"];

/**
 * Given the pathname of a route, returns the `flutterguide://` URL the app
 * should be opened with, preserving `search` and `hash`, or `null` if the
 * path doesn't belong to one of the app's shareable categories (or has no
 * slug after the category).
 */
export function resolveAppDeepLink(pathname: string, search = "", hash = ""): string | null {
  const matchedBasePath = APP_BASE_PATHS.find(
    (base) => pathname.startsWith(base + "/") && pathname.length > (base + "/").length,
  );

  if (!matchedBasePath) return null;

  return `flutterguide://open.app${pathname}${search}${hash}`;
}
