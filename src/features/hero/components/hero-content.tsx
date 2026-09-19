import { ArrowRight, Globe, ShieldCheck, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

import { releaseAnchor } from "@/features/changelog";
import { Link } from "@/i18n/navigation";
import { LinkButton } from "@/shared/components/link-button";
import { PhoneFrame } from "@/shared/components/phone-frame";
import { PlayStoreButton } from "@/shared/components/play-store-button";
import { catalogTotal } from "@/shared/lib/catalog-stats";

/** Entrance animation classes for the hero copy. */
const enter = "animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-700";

interface HeroContentProps {
  latestVersion: string | null;
}

export const HeroContent = ({ latestVersion }: HeroContentProps) => {
  const t = useTranslations("Hero");

  const trust = [
    { icon: ShieldCheck, label: t("trust.free") },
    { icon: Zap, label: t("trust.noAccount") },
    { icon: Globe, label: t("trust.languages") },
  ];

  return (
    <section
      id="hero"
      className="bg-ink-950 relative isolate flex min-h-screen items-center overflow-hidden pt-28 pb-16 text-white lg:pt-24 lg:pb-12"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="dot-grid absolute inset-0" />
        <div className="bg-brand-600/20 absolute -top-40 left-1/2 h-144 w-240 -translate-x-1/2 rounded-full blur-[120px]" />
        <div
          className="bg-violet/20 absolute top-1/3 -right-40 h-120 w-120 rounded-full blur-[110px]"
          style={{ animation: "glow-pulse 9s ease-in-out infinite" }}
        />
        <div
          className="from-brand-400/0 via-brand-400/45 to-brand-400/0 absolute -top-24 right-[14%] h-[130%] w-64 origin-top bg-linear-to-b blur-2xl"
          style={{ transform: "rotate(32deg)", animation: "beam-sway 14s ease-in-out infinite" }}
        />
        <div
          className="from-violet/0 via-violet/15 to-violet/0 absolute -top-24 right-[34%] h-[120%] w-40 origin-top bg-linear-to-b blur-3xl"
          style={{
            transform: "rotate(32deg)",
            animation: "beam-sway 18s ease-in-out -6s infinite",
          }}
        />
        <div className="via-brand-300/60 absolute -top-24 right-[21%] hidden h-[120%] w-0.5 origin-top rotate-32 bg-linear-to-b from-transparent to-transparent blur-[1px] lg:block" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-white/15 to-transparent" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:px-8 [&>*]:min-w-0">
        <div className="max-w-xl">
          {latestVersion ? (
            <Link
              href={`/changelog#${releaseAnchor(latestVersion)}`}
              className={`${enter} group hover:border-brand-400/40 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/4 py-1 pr-3 pl-1 text-sm text-slate-300 transition-colors hover:bg-white/[0.07]`}
            >
              <span className="bg-brand-500 rounded-full px-2.5 py-0.5 text-xs font-semibold text-white">
                {t("latestBadge", { version: latestVersion })}
              </span>
              {t("latestBadgeCta")}
              <ArrowRight
                className="size-3.5 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          ) : (
            <p className={`${enter} text-brand-300 text-xs font-bold tracking-[0.2em] uppercase`}>
              {t("eyebrow")}
            </p>
          )}

          <h1
            className={`${enter} mt-5 text-5xl leading-[1.02] font-extrabold tracking-[-0.035em] text-balance sm:text-6xl lg:text-7xl`}
          >
            <span className="block">{t("titleLine1")}</span>
            <span className="text-gradient block pb-1">{t("titleLine2")}</span>
          </h1>

          <p
            className={`${enter} mt-6 text-lg leading-relaxed text-pretty text-slate-300 delay-100`}
          >
            {t("subtitle", { count: catalogTotal })}
          </p>

          <div className={`${enter} mt-9 flex flex-col gap-3 delay-200 sm:flex-row`}>
            <PlayStoreButton />
            <LinkButton href="/#examples" target="_self" rel="" variant="ghostDark">
              {t("exploreExamples")}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
            </LinkButton>
          </div>

          <ul
            className={`${enter} mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm text-slate-300 delay-300`}
          >
            {trust.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-2">
                <Icon className="text-brand-300 size-4" aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative mx-auto w-full max-w-124">
          <div
            aria-hidden="true"
            className="bg-brand-500/25 pointer-events-none absolute inset-x-10 top-12 bottom-10 -z-10 rounded-full blur-[90px]"
          />

          <div
            className="flex items-start justify-center"
            style={{ animation: "float-y 9s ease-in-out infinite" }}
          >
            <div className="animate-in fade-in slide-in-from-bottom-8 fill-mode-both relative z-10 w-[54%] delay-150 duration-1000">
              <PhoneFrame
                src="/screenshots/01_home.png"
                alt={t("homeAlt")}
                sizes="(min-width: 1024px) 290px, 55vw"
                eager
              />
            </div>

            <div className="animate-in fade-in slide-in-from-bottom-8 fill-mode-both mt-[9%] -ml-[7%] w-[48%] rotate-6 delay-300 duration-1000">
              <PhoneFrame
                src="/screenshots/06_component_code.png"
                alt={t("codeAlt")}
                sizes="(min-width: 1024px) 260px, 50vw"
                className="opacity-95"
                eager
              />
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute -bottom-6 left-1/2 -z-10 h-12 w-3/4 -translate-x-1/2 rounded-[100%] bg-black/60 blur-2xl"
          />
        </div>
      </div>
    </section>
  );
};
