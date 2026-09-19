import { ArrowRight } from "lucide-react";
import { useFormatter, useLocale, useTranslations } from "next-intl";

import type { Release } from "@/features/changelog/changelog.types";
import { releaseAnchor, releaseDate } from "@/features/changelog/lib/release-anchor";
import { Link } from "@/i18n/navigation";
import { highlightOnLight } from "@/shared/components/highlight";
import { SectionHeading } from "@/shared/components/section-heading";
import { cn } from "@/shared/lib/cn";
import { revealDelay } from "@/shared/lib/reveal";
import { changelogUrl } from "@/shared/lib/site";

import { ChangeTypeBadge } from "./change-type-badge";
import { EntryText } from "./entry-text";

/** How many releases the home page previews, and how many entries of each. */
const RELEASES_SHOWN = 3;
const ENTRIES_SHOWN = 3;

interface WhatsNewContentProps {
  releases: Release[] | null;
}

export const WhatsNewContent = ({ releases }: WhatsNewContentProps) => {
  const t = useTranslations("WhatsNew");
  const tChangelog = useTranslations("Changelog");
  const format = useFormatter();
  const locale = useLocale();

  const shipped = (releases ?? []).filter((release) => release.date).slice(0, RELEASES_SHOWN);

  return (
    <section id="whats-new" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 [&>*]:min-w-0">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            tone="light"
            eyebrow={t("eyebrow")}
            title={t.rich("title", { hl: highlightOnLight })}
            subtitle={t("subtitle")}
          />
          <Link
            href="/changelog"
            className="group reveal text-brand-600 hover:text-brand-700 mt-8 inline-flex items-center gap-1.5 text-sm font-semibold"
          >
            {t("fullChangelog")}
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>
          {locale !== "en" && shipped.length > 0 && (
            <p className="reveal text-body mt-4 max-w-sm text-xs">{tChangelog("englishNote")}</p>
          )}
        </div>

        {shipped.length === 0 ? (
          <div className="reveal ring-line self-start rounded-3xl bg-white p-8 ring-1">
            <p className="text-body">{tChangelog("unavailable")}</p>
            <Link
              href={changelogUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-600 mt-4 inline-block text-sm font-semibold"
            >
              {tChangelog("unavailableCta")}
            </Link>
          </div>
        ) : (
          <ol className="border-line relative space-y-6 border-l pl-8 sm:pl-10">
            {shipped.map((release, index) => {
              const entries = release.sections.flatMap((section) =>
                section.items.map((text) => ({ type: section.type, text })),
              );
              const hidden = entries.length - ENTRIES_SHOWN;
              const isLatest = index === 0;

              return (
                <li key={release.version} style={revealDelay(index)} className="reveal relative">
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute top-8 -left-[calc(2rem+5px)] size-2.5 rounded-full ring-4 sm:-left-[calc(2.5rem+5px)]",
                      isLatest ? "bg-brand-500 ring-brand-500/20" : "ring-paper bg-slate-300",
                    )}
                  />
                  <article
                    className={cn(
                      "rounded-3xl bg-white p-7 ring-1 transition-shadow duration-300",
                      isLatest
                        ? "ring-brand-500/40 shadow-[0_24px_60px_-30px_rgb(31_95_224/0.45)]"
                        : "ring-line hover:shadow-[0_20px_50px_-30px_rgb(10_18_38/0.3)]",
                    )}
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <h3 className="text-heading font-mono text-lg font-bold">
                        v{release.version}
                      </h3>
                      {isLatest && (
                        <span className="bg-brand-500/10 text-brand-700 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                          {t("latest")}
                        </span>
                      )}
                      <time dateTime={release.date!} className="text-body ml-auto text-sm">
                        {format.dateTime(releaseDate(release.date!), {
                          year: "numeric",
                          month: "long",
                          timeZone: "UTC",
                        })}
                      </time>
                    </div>

                    {entries.length > 0 ? (
                      <ul className="text-body mt-5 space-y-3 text-sm leading-relaxed">
                        {entries.slice(0, ENTRIES_SHOWN).map((entry) => (
                          <li key={entry.text} className="flex items-start gap-3">
                            <ChangeTypeBadge type={entry.type} className="mt-0.5 shrink-0" />
                            <span>
                              <EntryText text={entry.text} />
                            </span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-body mt-5 text-sm">{release.summary.join(" ")}</p>
                    )}

                    {hidden > 0 && (
                      <Link
                        href={`/changelog#${releaseAnchor(release.version)}`}
                        className="text-brand-600 hover:text-brand-700 mt-5 inline-block text-sm font-semibold"
                      >
                        {t("moreChanges", { count: hidden })}
                      </Link>
                    )}
                  </article>
                </li>
              );
            })}
          </ol>
        )}
      </div>
    </section>
  );
};
