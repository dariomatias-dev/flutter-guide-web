import { routing } from "@/i18n/routing";

// Builds the `alternates.languages` map for a page's metadata: one entry
// per configured locale, pointing at that locale's version of `pathname`
// (unprefixed for the default locale, matching `localePrefix: "as-needed"`),
// plus "x-default" pointing at the unprefixed path.
export const localeAlternates = (pathname: string): Record<string, string> => {
  const languages: Record<string, string> = { "x-default": pathname };

  for (const locale of routing.locales) {
    const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
    languages[locale] = `${prefix}${pathname}`;
  }

  return languages;
};
