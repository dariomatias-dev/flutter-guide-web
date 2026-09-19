"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { localeNames } from "@/features/layout/data/locale-names";
import { localeHref } from "@/features/layout/lib/locale-href";
import { usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/shared/lib/cn";

/** Inline language list for the mobile menu. */
export const LocaleSwitcher = () => {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("listLabel")} className="flex items-center gap-1.5">
      <Globe className="mr-1 size-4 text-slate-400" aria-hidden="true" />
      {routing.locales.map((code) => (
        <a
          key={code}
          href={localeHref(pathname, code)}
          lang={code}
          aria-current={code === locale ? "true" : undefined}
          className={cn(
            "rounded-lg px-2.5 py-1 text-sm transition-colors",
            code === locale
              ? "bg-white/10 font-semibold text-white"
              : "text-slate-400 hover:bg-white/5 hover:text-white",
          )}
        >
          {localeNames[code]}
        </a>
      ))}
    </nav>
  );
};
