import { routing } from "@/i18n/routing";

/** A page's path in `locale`: unprefixed for the default locale, prefixed otherwise. */
export const localePath = (locale: string, pathname: string) => {
  if (locale === routing.defaultLocale) return pathname;
  return pathname === "/" ? `/${locale}` : `/${locale}${pathname}`;
};

/** Builds a page's `alternates.languages` metadata for every locale. */
export const localeAlternates = (pathname: string): Record<string, string> => {
  const languages: Record<string, string> = {
    "x-default": localePath(routing.defaultLocale, pathname),
  };

  for (const locale of routing.locales) {
    languages[locale] = localePath(locale, pathname);
  }

  return languages;
};
