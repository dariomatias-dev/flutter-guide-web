import { ArrowUpRight, X } from "lucide-react";
import { useTranslations } from "next-intl";

import { navLinks } from "@/features/layout/data/nav-links";
import { Link } from "@/i18n/navigation";
import { GithubButton } from "@/shared/components/github-button";
import { Logo } from "@/shared/components/logo";
import { PlayStoreButton } from "@/shared/components/play-store-button";
import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from "@/shared/components/ui/dialog";

import { LocaleSwitcher } from "./locale-switcher";

interface HeaderMenuProps {
  onNavigate: () => void;
  showLocaleSwitcher?: boolean;
}

export const HeaderMenu = ({ onNavigate, showLocaleSwitcher = true }: HeaderMenuProps) => {
  const t = useTranslations("Header");

  return (
    <DialogPortal>
      <DialogOverlay className="data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in duration-base bg-ink-950 fixed inset-0 z-50 lg:hidden" />

      <DialogContent className="data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:slide-in-from-top-2 duration-base fixed inset-0 z-50 flex flex-col px-4 pb-6 text-white sm:px-6 lg:hidden">
        <DialogTitle className="sr-only">{t("navigationMenu")}</DialogTitle>

        <div className="flex h-18 items-center justify-between">
          <Logo />

          <DialogClose
            className="flex size-10 items-center justify-center rounded-xl text-slate-200 transition-colors hover:bg-white/10"
            aria-label={t("closeMenu")}
          >
            <X className="size-6" />
          </DialogClose>
        </div>

        <nav className="mt-6 grow">
          <ul className="divide-y divide-white/8 border-y border-white/8">
            {navLinks.map((link, index) => (
              <li
                key={link.href}
                style={{ animationDelay: `${120 + index * 50}ms` }}
                className="animate-in fade-in slide-in-from-top-2 fill-mode-both duration-500"
              >
                <Link
                  href={link.href}
                  onClick={onNavigate}
                  className="hover:text-brand-300 flex items-center justify-between py-4 text-xl font-semibold text-slate-100 transition-colors"
                >
                  {t(`nav.${link.labelKey}`)}
                  <ArrowUpRight className="size-5 text-slate-500" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {showLocaleSwitcher && (
          <div className="mb-6 flex justify-center">
            <LocaleSwitcher />
          </div>
        )}

        <div className="flex flex-col gap-3">
          <PlayStoreButton className="w-full" />
          <GithubButton className="w-full" />
        </div>
      </DialogContent>
    </DialogPortal>
  );
};
