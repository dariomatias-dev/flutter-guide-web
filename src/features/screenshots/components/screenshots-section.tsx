import { useTranslations } from "next-intl";

import { highlightOnDark } from "@/shared/components/highlight";
import { SectionHeading } from "@/shared/components/section-heading";

import { ScreenshotsCarousel } from "./screenshots-carousel";

export const ScreenshotsSection = () => {
  const t = useTranslations("Screenshots");

  return (
    <section
      id="showcase"
      className="bg-ink-950 relative isolate overflow-hidden py-24 text-white lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-brand-600/15 absolute -top-32 left-1/4 h-96 w-160 rounded-full blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          tone="dark"
          eyebrow={t("eyebrow")}
          title={t.rich("title", { hl: highlightOnDark })}
          subtitle={t("subtitle")}
        />

        <div className="reveal mt-14">
          <ScreenshotsCarousel />
        </div>
      </div>
    </section>
  );
};
