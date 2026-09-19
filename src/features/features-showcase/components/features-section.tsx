import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { features } from "@/features/features-showcase/data/features";
import { Link } from "@/i18n/navigation";
import { highlightOnLight } from "@/shared/components/highlight";
import { SectionHeading } from "@/shared/components/section-heading";
import { revealDelay } from "@/shared/lib/reveal";
import { author } from "@/shared/lib/site";

export const FeaturesSection = () => {
  const t = useTranslations("Features");

  return (
    <section id="features" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[1fr_22rem] lg:px-8 [&>*]:min-w-0">
        <div>
          <SectionHeading
            tone="light"
            eyebrow={t("eyebrow")}
            title={t.rich("title", { hl: highlightOnLight })}
            subtitle={t("subtitle")}
          />

          <ul className="mt-14 grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-3">
            {features.map(({ icon: Icon, key }, index) => (
              <li key={key} style={revealDelay(index % 3)} className="reveal group flex gap-4">
                <span className="ring-line text-brand-600 group-hover:bg-brand-600 flex size-12 shrink-0 items-center justify-center rounded-2xl bg-white shadow-[0_8px_24px_-12px_rgb(31_95_224/0.45)] ring-1 transition-[background-color,color,translate] duration-300 group-hover:-translate-y-0.5 group-hover:text-white">
                  <Icon className="size-5.5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-heading font-bold">{t(`items.${key}.title`)}</h3>
                  <p className="text-body mt-1.5 text-sm leading-relaxed">
                    {t(`items.${key}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <aside className="reveal ring-line relative flex flex-col overflow-hidden rounded-3xl bg-white p-8 ring-1 lg:self-start">
          <div
            aria-hidden="true"
            className="via-brand-500 absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent to-transparent"
          />
          <span className="bg-paper ring-line relative flex size-14 items-center justify-center rounded-2xl ring-1">
            <span className="relative h-6 w-9 overflow-hidden">
              <Image
                src="/flutter_guide_icon.png"
                alt=""
                fill
                sizes="36px"
                className="object-cover"
              />
            </span>
          </span>
          <h3 className="text-heading mt-7 text-xl leading-snug font-extrabold tracking-tight">
            {t("author.title")}
          </h3>
          <p className="text-body mt-3 text-sm leading-relaxed">{t("author.body")}</p>
          <Link
            href={author.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group text-brand-600 hover:text-brand-700 mt-8 inline-flex items-center gap-1.5 text-sm font-semibold"
          >
            {t("author.cta")}
            <ArrowUpRight
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </Link>
        </aside>
      </div>
    </section>
  );
};
