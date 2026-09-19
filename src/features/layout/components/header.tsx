"use client";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { navLinks } from "@/features/layout/data/nav-links";
import { Link } from "@/i18n/navigation";
import { GithubIcon, GooglePlayIcon } from "@/shared/components/brand-icons";
import { LinkButton } from "@/shared/components/link-button";
import { Logo } from "@/shared/components/logo";
import { Dialog, DialogTrigger } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/cn";
import { githubUrl, playStoreUrl } from "@/shared/lib/site";

import { HeaderMenu } from "./header-menu";
import { LocaleMenu } from "./locale-menu";

interface HeaderProps {
  showLocaleMenu?: boolean;
}

export const Header = ({ showLocaleMenu = true }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const t = useTranslations("Header");

  useEffect(() => {
    const update = () => setIsScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("main section[id]");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <Dialog open={isMenuOpen} onOpenChange={setIsMenuOpen}>
      <header
        className={cn(
          "duration-base fixed inset-x-0 top-0 z-50 border-b transition-colors",
          isScrolled
            ? "bg-ink-950/95 border-white/8 backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-18 max-w-7xl items-center gap-10 px-4 sm:px-6 lg:px-8">
          <Logo />

          <nav aria-label={t("primaryNavigation")} className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = link.href === `/#${activeId}`;

                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "relative block rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-300 hover:text-white",
                        isActive ? "text-white" : "text-slate-300",
                      )}
                    >
                      {t(`nav.${link.labelKey}`)}
                      <span
                        aria-hidden="true"
                        className={cn(
                          "bg-brand-400 absolute inset-x-3.5 -bottom-0.5 h-0.5 origin-center rounded-full transition-transform duration-300",
                          isActive ? "scale-x-100" : "scale-x-0",
                        )}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="ml-auto hidden items-center gap-3 lg:flex">
            {showLocaleMenu && <LocaleMenu />}

            <Link
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("github")}
              className="flex size-10 items-center justify-center rounded-xl text-slate-300 transition-colors hover:bg-white/5 hover:text-white"
            >
              <GithubIcon className="size-5" />
            </Link>

            <LinkButton href={playStoreUrl} size="md">
              <GooglePlayIcon className="size-4" />
              {t("download")}
            </LinkButton>
          </div>

          <DialogTrigger
            className="ml-auto flex size-10 items-center justify-center rounded-xl text-slate-200 transition-colors hover:bg-white/10 lg:hidden"
            aria-label={t("openMenu")}
          >
            <Menu className="size-6" />
          </DialogTrigger>
        </div>
      </header>

      <HeaderMenu onNavigate={() => setIsMenuOpen(false)} showLocaleSwitcher={showLocaleMenu} />
    </Dialog>
  );
};
