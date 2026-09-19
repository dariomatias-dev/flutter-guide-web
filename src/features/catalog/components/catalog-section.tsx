import { AppWindow, Blocks, Braces, Package, Puzzle } from "lucide-react";
import { useTranslations } from "next-intl";

import { CountUp } from "@/shared/components/count-up";
import { highlightOnLight } from "@/shared/components/highlight";
import { SectionHeading } from "@/shared/components/section-heading";
import { catalogStats, catalogTotal } from "@/shared/lib/catalog-stats";
import { revealDelay } from "@/shared/lib/reveal";

import { PackagesMarquee } from "./packages-marquee";

import type { LucideIcon } from "lucide-react";

type Category = Exclude<keyof typeof catalogStats, "widgets">;

const smallCategories: { key: Category; icon: LucideIcon }[] = [
  { key: "packages", icon: Package },
  { key: "functions", icon: Braces },
  { key: "elements", icon: Puzzle },
  { key: "uis", icon: AppWindow },
];

/** Component groups from the app's home screen, in the same order. */
const widgetGroups = [
  "text",
  "button",
  "form",
  "picker",
  "list",
  "layout",
  "navigation",
  "dialog",
  "display",
  "effects",
  "interaction",
  "builder",
] as const;

export const CatalogSection = () => {
  const t = useTranslations("Catalog");

  return (
    <section id="catalog" className="bg-white py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            tone="light"
            eyebrow={t("eyebrow")}
            title={t.rich("title", { hl: highlightOnLight })}
            subtitle={t("subtitle")}
          />

          <div className="reveal flex items-baseline gap-3 lg:text-right">
            <span className="text-heading text-6xl font-extrabold tracking-tighter tabular-nums sm:text-7xl">
              <CountUp value={catalogTotal} />
            </span>
            <span className="text-body max-w-28 text-sm leading-snug font-medium">
              {t("total")}
            </span>
          </div>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-3 lg:grid-rows-2">
          <article className="reveal bg-ink-900 relative flex flex-col overflow-hidden rounded-3xl p-8 text-white lg:row-span-2">
            <div
              aria-hidden="true"
              className="bg-brand-500/30 absolute -right-20 -bottom-20 size-72 rounded-full blur-3xl"
            />
            <div className="relative flex items-center justify-between">
              <span className="text-brand-300 flex size-12 items-center justify-center rounded-2xl bg-white/10">
                <Blocks className="size-6" aria-hidden="true" />
              </span>
              <span className="text-5xl font-extrabold tracking-tighter tabular-nums">
                <CountUp value={catalogStats.widgets} />
              </span>
            </div>
            <h3 className="relative mt-8 text-2xl font-bold">{t("categories.widgets.title")}</h3>
            <p className="relative mt-2 text-slate-300">{t("categories.widgets.description")}</p>
            <ul className="relative mt-8 flex flex-wrap gap-2 lg:mt-auto">
              {widgetGroups.map((group) => (
                <li
                  key={group}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200"
                >
                  {t(`groups.${group}`)}
                </li>
              ))}
            </ul>
          </article>

          {smallCategories.map(({ key, icon: Icon }, index) => (
            <article
              key={key}
              style={revealDelay(index + 1)}
              className="reveal group bg-paper ring-line flex flex-col rounded-3xl p-7 ring-1 transition-[translate,box-shadow,background-color] duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_24px_50px_-25px_rgb(31_95_224/0.4)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-brand-600 ring-line flex size-11 items-center justify-center rounded-xl bg-white ring-1">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <span className="text-heading text-4xl font-extrabold tracking-tighter tabular-nums">
                  <CountUp value={catalogStats[key]} />
                </span>
              </div>
              <h3 className="text-heading mt-6 text-lg font-bold">
                {t(`categories.${key}.title`)}
              </h3>
              <p className="text-body mt-1.5 text-sm leading-relaxed">
                {t(`categories.${key}.description`)}
              </p>
            </article>
          ))}
        </div>

        <PackagesMarquee />
      </div>
    </section>
  );
};
