import { Link2, MousePointerClick, Share2, Smartphone } from "lucide-react";
import { useTranslations } from "next-intl";

import { highlightOnLight } from "@/shared/components/highlight";
import { PhoneFrame } from "@/shared/components/phone-frame";
import { SectionHeading } from "@/shared/components/section-heading";
import { revealDelay } from "@/shared/lib/reveal";
import { appLinkHost } from "@/shared/lib/site";

const steps = [
  { key: "open", icon: MousePointerClick },
  { key: "share", icon: Share2 },
  { key: "land", icon: Smartphone },
] as const;

export const ShareSection = () => {
  const t = useTranslations("Share");

  return (
    <section id="share" className="bg-paper py-24 lg:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
        <div>
          <SectionHeading
            tone="light"
            eyebrow={t("eyebrow")}
            title={t.rich("title", { hl: highlightOnLight })}
            subtitle={t("subtitle")}
          />

          <ol className="mt-12 space-y-3">
            {steps.map(({ key, icon: Icon }, index) => (
              <li
                key={key}
                style={revealDelay(index)}
                className="reveal group ring-line flex items-center gap-5 rounded-2xl bg-white p-5 ring-1 transition-[box-shadow,translate] duration-300 hover:translate-x-1 hover:shadow-[0_18px_40px_-24px_rgb(31_95_224/0.45)]"
              >
                <span className="bg-brand-500/10 text-brand-600 group-hover:bg-brand-600 flex size-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 group-hover:text-white">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-heading font-bold">{t(`steps.${key}.title`)}</h3>
                  <p className="text-body mt-0.5 text-sm">{t(`steps.${key}.description`)}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="relative mx-auto w-full max-w-md">
          <div
            aria-hidden="true"
            className="bg-brand-400/25 absolute inset-x-10 top-1/4 bottom-10 rounded-full blur-3xl"
          />

          <div className="reveal relative mx-auto w-[58%]">
            <PhoneFrame
              src="/screenshots/05_component_detail.png"
              alt={t("previewAlt")}
              sizes="(min-width: 1024px) 260px, 55vw"
            />
          </div>

          <div
            style={revealDelay(3, 100)}
            className="reveal bg-ink-900 absolute top-[18%] left-0 max-w-[85%] rounded-2xl p-4 text-white shadow-[0_30px_60px_-25px_rgb(10_18_38/0.7)] ring-1 ring-white/10 sm:-left-6"
          >
            <p className="text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              {t("linkLabel")}
            </p>
            <p className="mt-2 flex items-center gap-2.5 font-mono text-xs sm:text-[13px]">
              <Link2 className="text-brand-300 size-4 shrink-0" aria-hidden="true" />
              <span className="min-w-0 break-all">
                {appLinkHost}
                <span className="text-brand-300">/widgets/ActionChip</span>
              </span>
            </p>
          </div>

          <div
            style={revealDelay(5, 100)}
            className="reveal ring-line absolute right-0 bottom-[14%] flex items-center gap-3 rounded-2xl bg-white py-3 pr-5 pl-3 shadow-[0_24px_50px_-25px_rgb(10_18_38/0.5)] ring-1 sm:-right-4"
          >
            <span className="bg-brand-500/10 text-brand-600 flex size-9 items-center justify-center rounded-xl">
              <Smartphone className="size-4.5" aria-hidden="true" />
            </span>
            <span className="text-heading text-sm font-semibold">{t("opensIn")}</span>
          </div>
        </div>
      </div>
    </section>
  );
};
