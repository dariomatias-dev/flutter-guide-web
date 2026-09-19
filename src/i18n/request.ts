import { hasLocale } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
    // Fixed, not derived from the server's environment: WhatsNewSection
    // formats a release's fixed date, not "now", so every visitor should
    // see the same result regardless of where the server runs — and a
    // server/browser mismatch here would be a hydration error.
    timeZone: "UTC",
  };
});
