import { routing } from "@/i18n/routing";
import { siteUrl } from "@/shared/lib/site";

import type { MetadataRoute } from "next";

const pages = [
  { pathname: "/", changeFrequency: "monthly" as const, priority: 1 },
  { pathname: "/privacy-policy", changeFrequency: "yearly" as const, priority: 0.3 },
];

const localizedUrl = (locale: string, pathname: string) => {
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  // Avoids a trailing "/" for the home path: siteUrl already has none, and
  // "prefix + /" would otherwise duplicate it (or add a stray one when
  // prefix is empty).
  return pathname === "/" ? `${siteUrl}${prefix}` : `${siteUrl}${prefix}${pathname}`;
};

export default function sitemap(): MetadataRoute.Sitemap {
  return pages.flatMap(({ pathname, changeFrequency, priority }) => {
    const languages = Object.fromEntries(
      routing.locales.map((locale) => [locale, localizedUrl(locale, pathname)]),
    );

    return routing.locales.map((locale) => ({
      url: localizedUrl(locale, pathname),
      changeFrequency,
      priority,
      alternates: { languages },
    }));
  });
}
