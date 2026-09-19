import { getPathname } from "@/i18n/navigation";
import type { routing } from "@/i18n/routing";

type Locale = (typeof routing.locales)[number];

/** Current page URL in `locale`, prefixed for every locale but the default one. */
export const localeHref = (pathname: string, locale: Locale) =>
  getPathname({ href: pathname, locale });
