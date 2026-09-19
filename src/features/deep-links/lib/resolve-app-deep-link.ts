const APP_BASE_PATHS = ["/widgets", "/packages", "/functions", "/elements", "/uis"];

/** Maps a shareable route to its `flutterguide://` app URL, or `null` if it isn't one. */
export function resolveAppDeepLink(pathname: string, search = "", hash = ""): string | null {
  const matchedBasePath = APP_BASE_PATHS.find(
    (base) => pathname.startsWith(base + "/") && pathname.length > (base + "/").length,
  );

  if (!matchedBasePath) return null;

  return `flutterguide://open.app${pathname}${search}${hash}`;
}
