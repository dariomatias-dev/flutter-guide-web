"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check, ChevronDown, Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { localeNames } from "@/features/layout/data/locale-names";
import { localeHref } from "@/features/layout/lib/locale-href";
import { usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/shared/lib/cn";

interface LocaleMenuProps {
  className?: string;
}

/** Dropdown to switch the current page's language. */
export const LocaleMenu = ({ className }: LocaleMenuProps) => {
  const t = useTranslations("LocaleSwitcher");
  const locale = useLocale() as keyof typeof localeNames;
  const pathname = usePathname();

  return (
    <DropdownMenu.Root modal={false}>
      <DropdownMenu.Trigger
        aria-label={t("label", { current: localeNames[locale] })}
        className={cn(
          "group focus-visible:ring-brand-400 inline-flex h-10 items-center gap-2 rounded-xl px-3 text-sm font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-white focus-visible:ring-2 focus-visible:outline-none data-[state=open]:bg-white/5 data-[state=open]:text-white",
          className,
        )}
      >
        <Globe className="size-4" aria-hidden="true" />
        {localeNames[locale]}
        <ChevronDown
          className="size-3.5 transition-transform duration-200 group-data-[state=open]:rotate-180"
          aria-hidden="true"
        />
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in data-[state=closed]:fade-out data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[state=open]:slide-in-from-top-1 bg-ink-800 z-60 min-w-44 rounded-xl border border-white/10 p-1.5 text-sm text-slate-200 shadow-[0_24px_60px_-20px_rgb(0_0_0/0.7)] duration-150"
        >
          {routing.locales.map((code) => (
            <DropdownMenu.Item key={code} asChild>
              <a
                href={localeHref(pathname, code)}
                lang={code}
                aria-current={code === locale ? "true" : undefined}
                className={cn(
                  "flex cursor-pointer items-center justify-between gap-6 rounded-lg px-3 py-2 outline-none data-highlighted:bg-white/8 data-highlighted:text-white",
                  code === locale && "font-semibold text-white",
                )}
              >
                {localeNames[code]}
                {code === locale && <Check className="text-brand-300 size-4" aria-hidden="true" />}
              </a>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
};
