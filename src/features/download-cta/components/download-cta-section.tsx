import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { highlightOnLight } from "@/shared/components/highlight";
import { PhoneFrame } from "@/shared/components/phone-frame";
import { PlayStoreButton } from "@/shared/components/play-store-button";
import { SectionHeading } from "@/shared/components/section-heading";
import { catalogTotal } from "@/shared/lib/catalog-stats";
import { revealDelay } from "@/shared/lib/reveal";

const pointKeys = ["free", "noAccount", "languages"] as const;

export const DownloadCtaSection = () => {
  const t = useTranslations("DownloadCta");

  return (
    <section id="download" className="bg-paper relative isolate overflow-hidden py-24 lg:py-28">
      <div
        aria-hidden="true"
        className="bg-brand-400/20 absolute right-0 bottom-0 -z-10 h-112 w-184 rounded-full blur-[120px]"
      />

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:px-8 [&>*]:min-w-0">
        <div>
          <SectionHeading
            tone="light"
            eyebrow={t("eyebrow")}
            title={t.rich("title", { hl: highlightOnLight })}
            subtitle={t("subtitle", { count: catalogTotal })}
          />
          <ul className="mt-8 space-y-3">
            {pointKeys.map((key, index) => (
              <li
                key={key}
                style={revealDelay(index + 2)}
                className="reveal text-heading flex items-center gap-3 font-medium"
              >
                <span className="flex size-6 items-center justify-center rounded-full bg-emerald-500/12 text-emerald-600">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {t(`points.${key}`)}
              </li>
            ))}
          </ul>
          <PlayStoreButton variant="ink" className="reveal mt-10" />
        </div>

        <div
          aria-hidden="true"
          className="relative mx-auto flex w-full max-w-xl items-center justify-center gap-[3%]"
        >
          <div className="reveal w-[29%]" style={revealDelay(1, 120)}>
            <PhoneFrame
              src="/screenshots/02_catalog_elements.png"
              alt=""
              sizes="(min-width: 640px) 170px, 29vw"
            />
          </div>
          <div className="reveal relative z-10 w-[36%]">
            <PhoneFrame
              src="/screenshots/01_home.png"
              alt=""
              sizes="(min-width: 640px) 210px, 36vw"
            />
          </div>
          <div className="reveal w-[29%]" style={revealDelay(1, 120)}>
            <PhoneFrame
              src="/screenshots/07_packages_tab.png"
              alt=""
              sizes="(min-width: 640px) 170px, 29vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
