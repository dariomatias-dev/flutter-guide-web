import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";

import { footerColumns } from "@/features/layout/data/footer-columns";
import { Link } from "@/i18n/navigation";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/shared/components/brand-icons";
import { Logo } from "@/shared/components/logo";
import { author, githubUrl } from "@/shared/lib/site";

/** Site footer: brand, link columns and a legal bar. */
export const Footer = () => {
  const t = useTranslations("Footer");
  const tHeader = useTranslations("Header");

  const label = (key: string) => (key.startsWith("nav.") ? tHeader(key) : t(`links.${key}`));

  const socialLinks = [
    { href: githubUrl, label: "GitHub", Icon: GithubIcon },
    { href: author.linkedinUrl, label: "LinkedIn", Icon: LinkedinIcon },
    { href: author.instagramUrl, label: "Instagram", Icon: InstagramIcon },
    { href: author.portfolioUrl, label: t("portfolio"), Icon: Globe },
  ];

  return (
    <footer className="bg-ink-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_2fr] lg:px-8">
        <div className="max-w-xs">
          <Logo />
          <p className="mt-4 text-sm leading-relaxed text-slate-400">{t("description")}</p>

          <p className="mt-8 text-xs font-semibold tracking-wider text-slate-400 uppercase">
            {t("follow")}
          </p>
          <ul className="mt-3 flex items-center gap-2">
            {socialLinks.map(({ href, label: name, Icon }) => (
              <li key={href}>
                <Link
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex size-10 items-center justify-center rounded-full text-slate-300 ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:text-white hover:ring-white/20"
                >
                  <Icon className="size-4.5" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.titleKey}>
              <h2 className="text-sm font-semibold text-white">
                {t(`columns.${column.titleKey}`)}
              </h2>
              <ul className="mt-4 space-y-3 text-sm">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      {...(link.external && { target: "_blank", rel: "noopener noreferrer" })}
                      className="text-slate-400 transition-colors hover:text-white"
                    >
                      {label(link.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <p>
            {t("rights", { year: new Date().getFullYear() })}
            <span aria-hidden="true" className="mx-2 text-slate-600">
              ·
            </span>
            {t("madeBy")}{" "}
            <Link
              href={author.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-1 font-medium text-slate-200 transition-colors hover:text-white"
            >
              {author.name}
            </Link>
          </p>

          <Link href="/privacy-policy" className="transition-colors hover:text-white">
            {t("links.privacyPolicy")}
          </Link>
        </div>
      </div>
    </footer>
  );
};
