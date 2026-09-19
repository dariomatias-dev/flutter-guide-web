import { ArrowRight, Check, Code2, Eye, FileCode2 } from "lucide-react";
import { useTranslations } from "next-intl";

import { highlightOnDark } from "@/shared/components/highlight";
import { LinkButton } from "@/shared/components/link-button";
import { PhoneFrame } from "@/shared/components/phone-frame";
import { SectionHeading } from "@/shared/components/section-heading";
import { revealDelay } from "@/shared/lib/reveal";

interface ExamplesContentProps {
  codeHtml: string;
}

const pointKeys = ["preview", "code", "docs"] as const;

export const ExamplesContent = ({ codeHtml }: ExamplesContentProps) => {
  const t = useTranslations("Examples");

  return (
    <section
      id="examples"
      className="bg-ink-900 relative isolate overflow-hidden py-24 text-white lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="dot-grid absolute inset-0 opacity-70" />
        <div className="bg-brand-600/15 absolute top-1/2 right-0 h-128 w-160 -translate-y-1/2 rounded-full blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 [&>*]:min-w-0">
        <div>
          <SectionHeading
            tone="dark"
            eyebrow={t("eyebrow")}
            title={t.rich("title", { hl: highlightOnDark })}
            subtitle={t("subtitle")}
          />

          <ul className="mt-8 space-y-3.5">
            {pointKeys.map((key, index) => (
              <li
                key={key}
                style={revealDelay(index + 1)}
                className="reveal flex items-start gap-3 text-slate-200"
              >
                <span className="bg-brand-500/20 text-brand-300 mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full">
                  <Check className="size-3.5" strokeWidth={3} aria-hidden="true" />
                </span>
                {t(`points.${key}`)}
              </li>
            ))}
          </ul>

          <LinkButton
            href="/#catalog"
            target="_self"
            rel=""
            variant="ghostDark"
            className="reveal mt-10"
          >
            {t("cta")}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </LinkButton>
        </div>

        <div className="relative pb-10 sm:pr-28 lg:pr-36">
          <div className="reveal overflow-hidden rounded-2xl border border-white/10 bg-[#0d1428] shadow-[0_40px_100px_-40px_rgb(47_108_246/0.55)]">
            <div className="flex items-center gap-4 border-b border-white/8 bg-white/2 px-4">
              <div className="flex gap-1.5" aria-hidden="true">
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
                <span className="size-2.5 rounded-full bg-white/15" />
              </div>
              <div className="border-brand-400 flex items-center gap-2 border-b-2 py-3 text-xs font-medium text-white">
                <FileCode2 className="text-sky size-3.5" aria-hidden="true" />
                actionchip_sample.dart
              </div>
              <div
                aria-hidden="true"
                className="ml-auto hidden items-center gap-1 rounded-lg bg-white/5 p-1 text-[11px] font-medium sm:flex"
              >
                <span className="flex items-center gap-1 rounded-md px-2 py-1 text-slate-400">
                  <Eye className="size-3" />
                  {t("previewTab")}
                </span>
                <span className="bg-brand-500 flex items-center gap-1 rounded-md px-2 py-1 text-white">
                  <Code2 className="size-3" />
                  {t("codeTab")}
                </span>
              </div>
            </div>

            <div className="relative h-88 overflow-hidden sm:h-104">
              <div
                className="code-window px-3 py-4 font-mono text-[12.5px] leading-[1.7]"
                dangerouslySetInnerHTML={{ __html: codeHtml }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-[#0d1428] to-transparent"
              />
            </div>
          </div>

          <div
            style={revealDelay(3, 120)}
            className="reveal absolute right-0 bottom-0 hidden w-44 sm:block lg:w-52"
          >
            <PhoneFrame
              src="/screenshots/05_component_detail.png"
              alt={t("previewAlt")}
              sizes="208px"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
