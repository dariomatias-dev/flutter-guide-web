import { routing } from "@/i18n/routing";
import { localePath } from "@/shared/lib/locale-alternates";
import { siteUrl } from "@/shared/lib/site";

import type { MetadataRoute } from "next";

const pages = [
  { pathname: "/", changeFrequency: "monthly" as const, priority: 1 },
  { pathname: "/changelog", changeFrequency: "weekly" as const, priority: 0.5 },
  { pathname: "/privacy-policy", changeFrequency: "yearly" as const, priority: 0.3 },
];

const localizedUrl = (locale: string, pathname: string) => {
  const path = localePath(locale, pathname);
  return `${siteUrl}${path === "/" ? "" : path}`;
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
