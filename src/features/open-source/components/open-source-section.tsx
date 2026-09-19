import {
  ArrowUpRight,
  FlaskConical,
  Gauge,
  GitPullRequest,
  History,
  ListChecks,
  Scale,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { CountUp } from "@/shared/components/count-up";
import { GithubButton } from "@/shared/components/github-button";
import { highlightOnDark } from "@/shared/components/highlight";
import { SectionHeading } from "@/shared/components/section-heading";
import { revealDelay } from "@/shared/lib/reveal";
import { contributingUrl } from "@/shared/lib/site";

/** Engineering practices, each backed by the app's README or changelog. */
const practices = [
  { key: "ci", icon: Workflow },
  { key: "lints", icon: ListChecks },
  { key: "coverage", icon: Gauge },
  { key: "releases", icon: History },
] as const;

/** From flutter_guide_app's README.md "Testing" section. */
const stats = [
  { icon: ShieldCheck, value: <CountUp value={97.8} decimals={1} suffix="%" />, key: "coverage" },
  { icon: FlaskConical, value: <CountUp value={378} />, key: "tests" },
  { icon: Scale, value: "MIT", key: "license" },
] as const;

export const OpenSourceSection = () => {
  const t = useTranslations("OpenSource");

  return (
    <section
      id="open-source"
      className="bg-ink-900 relative isolate overflow-hidden py-24 text-white lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="dot-grid absolute inset-0 opacity-60" />
        <div className="bg-violet/15 absolute bottom-0 left-0 h-96 w-xl rounded-full blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.15fr_1fr] lg:px-8 [&>*]:min-w-0">
        <div>
          <SectionHeading
            tone="dark"
            eyebrow={t("eyebrow")}
            title={t.rich("title", { hl: highlightOnDark })}
            subtitle={t("subtitle")}
          />

          <dl className="reveal mt-12 grid grid-cols-3 divide-x divide-white/10 rounded-2xl border border-white/10 bg-white/3">
            {stats.map(({ icon: Icon, value, key }) => (
              <div key={key} className="flex flex-col gap-1 px-4 py-6 sm:px-6">
                <Icon className="text-brand-300 mb-3 size-5" aria-hidden="true" />
                <dt className="order-2 text-xs text-slate-400 sm:text-sm">{t(`stats.${key}`)}</dt>
                <dd className="order-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <p className="reveal mt-6 text-sm text-slate-400">{t("stack")}</p>
        </div>

        <div className="reveal bg-ink-800/80 relative overflow-hidden rounded-3xl border border-white/10 p-8 sm:p-10">
          <div
            aria-hidden="true"
            className="via-brand-400/70 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent"
          />
          <span className="bg-brand-500/15 text-brand-300 flex size-12 items-center justify-center rounded-2xl">
            <GitPullRequest className="size-6" aria-hidden="true" />
          </span>
          <h3 className="mt-7 text-2xl font-extrabold tracking-tight">{t("contributeTitle")}</h3>
          <p className="mt-3 leading-relaxed text-slate-300">{t("contributeBody")}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <GithubButton />
            <Link
              href={contributingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group text-brand-300 inline-flex items-center gap-1.5 px-2 text-sm font-semibold transition-colors hover:text-white"
            >
              {t("contributeCta")}
              <ArrowUpRight
                className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <h3 className="reveal text-sm font-semibold tracking-wider text-slate-400 uppercase">
          {t("practicesTitle")}
        </h3>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {practices.map(({ key, icon: Icon }, index) => (
            <li
              key={key}
              style={revealDelay(index)}
              className="reveal rounded-2xl border border-white/10 bg-white/3 p-6"
            >
              <Icon className="text-brand-300 size-5" aria-hidden="true" />
              <p className="mt-4 font-semibold text-white">{t(`practices.${key}.title`)}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                {t(`practices.${key}.body`)}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
