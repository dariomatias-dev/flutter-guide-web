import { ArrowUpRight, ChevronRight } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";

import type { Release } from "@/features/changelog/changelog.types";
import { releaseAnchor, releaseDate } from "@/features/changelog/lib/release-anchor";
import { Link } from "@/i18n/navigation";
import { GithubIcon } from "@/shared/components/brand-icons";
import { LinkButton } from "@/shared/components/link-button";
import { PlayStoreButton } from "@/shared/components/play-store-button";
import { changelogUrl, releasesUrl } from "@/shared/lib/site";

import { ChangeTypeBadge } from "./change-type-badge";
import { EntryText } from "./entry-text";

interface ChangelogContentProps {
  releases: Release[] | null;
}

export const ChangelogContent = ({ releases }: ChangelogContentProps) => {
  const t = useTranslations("Changelog");
  const format = useFormatter();
  const locale = useLocale();

  const formatDate = (date: string) =>
    format.dateTime(releaseDate(date), {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    });

  const latest = releases?.find((release) => release.date);

  return (
    <main id="main-content" tabIndex={-1} className="flex-1 focus:outline-none">
      <div className="bg-ink-950 relative isolate overflow-hidden pt-32 pb-16 sm:pt-40">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="dot-grid absolute inset-0" />
          <div className="bg-brand-600/20 absolute -top-40 left-1/2 h-96 w-3xl -translate-x-1/2 rounded-full blur-[120px]" />
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="text-sm text-slate-400">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="transition-colors hover:text-white">
                  {t("home")}
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight className="size-3.5" />
              </li>
              <li aria-current="page" className="font-medium text-slate-200">
                {t("title")}
              </li>
            </ol>
          </nav>

          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-brand-300 text-xs font-bold tracking-[0.2em] uppercase">
                {t("eyebrow")}
              </p>
              <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
                {t("title")}
              </h1>
              <p className="mt-4 text-lg leading-relaxed text-slate-300">{t("subtitle")}</p>
              {locale !== "en" && releases && (
                <p className="mt-3 text-sm text-slate-400">{t("englishNote")}</p>
              )}
            </div>

            {latest && (
              <div className="shrink-0 rounded-2xl border border-white/10 bg-white/4 p-5">
                <p className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
                  {t("latestRelease")}
                </p>
                <p className="mt-2 font-mono text-2xl font-bold">v{latest.version}</p>
                <p className="mt-1 text-sm text-slate-400">
                  {formatDate(latest.date!)}
                  <span aria-hidden="true" className="mx-2">
                    ·
                  </span>
                  {t("releaseCount", { count: releases!.length })}
                </p>
              </div>
            )}
          </div>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <PlayStoreButton size="md" />
            <LinkButton href={releasesUrl} variant="ghostDark" size="md">
              <GithubIcon className="size-4" />
              {t("githubReleases")}
            </LinkButton>
          </div>
        </div>
      </div>

      <div className="bg-paper py-16 sm:py-20">
        {releases ? (
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[13rem_1fr] lg:px-8 [&>*]:min-w-0">
            <nav aria-label={t("versions")} className="hidden lg:block">
              <div className="sticky top-28">
                <p className="text-heading text-xs font-bold tracking-wider uppercase">
                  {t("versions")}
                </p>
                <ul className="border-line mt-4 max-h-[calc(100vh-10rem)] space-y-0.5 overflow-y-auto border-l">
                  {releases.map((release) => (
                    <li key={release.version}>
                      <a
                        href={`#${releaseAnchor(release.version)}`}
                        className="text-body hover:border-brand-500 hover:text-heading -ml-px flex items-baseline justify-between gap-3 border-l border-transparent py-1.5 pl-4 text-sm transition-colors"
                      >
                        <span className="font-mono">{release.version}</span>
                        {release.date && (
                          <span className="text-body text-xs">
                            {format.dateTime(releaseDate(release.date), {
                              year: "numeric",
                              month: "short",
                              timeZone: "UTC",
                            })}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>

            <ol className="space-y-6">
              {releases.map((release) => (
                <li key={release.version}>
                  <article
                    id={releaseAnchor(release.version)}
                    aria-labelledby={`${releaseAnchor(release.version)}-title`}
                    className="ring-line scroll-mt-28 rounded-3xl bg-white p-7 ring-1 sm:p-9"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <h2
                        id={`${releaseAnchor(release.version)}-title`}
                        className="text-heading font-mono text-2xl font-bold"
                      >
                        {release.date ? `v${release.version}` : release.version}
                      </h2>
                      {release === latest && (
                        <span className="bg-brand-500/10 text-brand-700 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                          {t("latest")}
                        </span>
                      )}
                      {release.date && (
                        <time dateTime={release.date} className="text-body text-sm sm:ml-auto">
                          {formatDate(release.date)}
                        </time>
                      )}
                    </div>

                    {release.summary.length > 0 && (
                      <p className="text-body mt-4 leading-relaxed">
                        <EntryText text={release.summary.join(" ")} />
                      </p>
                    )}

                    {release.sections.map((section) => (
                      <section key={section.type} className="mt-7">
                        <h3>
                          <ChangeTypeBadge type={section.type} />
                        </h3>
                        <ul className="text-body mt-3 space-y-2 text-[15px] leading-relaxed">
                          {section.items.map((item) => (
                            <li key={item} className="flex gap-3">
                              <span
                                aria-hidden="true"
                                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-slate-300"
                              />
                              <span>
                                <EntryText text={item} />
                              </span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}

                    {release.compareUrl && (
                      <Link
                        href={release.compareUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group text-brand-600 hover:text-brand-700 mt-7 inline-flex items-center gap-1.5 text-sm font-semibold"
                      >
                        {t("compare")}
                        <ArrowUpRight
                          className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                          aria-hidden="true"
                        />
                      </Link>
                    )}
                  </article>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="ring-line rounded-3xl bg-white p-8 text-center ring-1">
              <p className="text-body">{t("unavailable")}</p>
              <Link
                href={changelogUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 mt-4 inline-block text-sm font-semibold"
              >
                {t("unavailableCta")}
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
