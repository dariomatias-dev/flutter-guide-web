import createMiddleware from "next-intl/middleware";

import { routing } from "@/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Excludes API routes, Next.js internals, static files (anything with a
  // dot in the last segment — covers assetlinks.json, app-ads.txt,
  // sitemap.xml, robots.txt, manifest.webmanifest), and the deep-link
  // fallback routes, which stay unprefixed for every locale (see
  // app/(deep-links)).
  matcher: ["/((?!api|_next|_vercel|widgets|functions|packages|elements|uis|.*\\..*).*)"],
};
