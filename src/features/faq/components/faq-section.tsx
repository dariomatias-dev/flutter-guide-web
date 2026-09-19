import { MessageCircleQuestion } from "lucide-react";
import { useTranslations } from "next-intl";

import { faqs } from "@/features/faq/data/faqs";
import { highlightOnDark } from "@/shared/components/highlight";
import { LinkButton } from "@/shared/components/link-button";
import { SectionHeading } from "@/shared/components/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/shared/components/ui/accordion";
import { revealDelay } from "@/shared/lib/reveal";
import { issuesUrl } from "@/shared/lib/site";

export const FaqSection = () => {
  const t = useTranslations("Faq");

  return (
    <section
      id="faq"
      className="bg-ink-950 relative isolate overflow-hidden py-24 text-white lg:py-32"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-brand-600/15 absolute top-0 right-1/4 h-80 w-xl rounded-full blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-7xl gap-14 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 [&>*]:min-w-0">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            tone="dark"
            eyebrow={t("eyebrow")}
            title={t.rich("title", { hl: highlightOnDark })}
            subtitle={t("subtitle")}
          />
          <LinkButton href={issuesUrl} variant="ghostDark" size="md" className="reveal mt-8">
            <MessageCircleQuestion className="size-4" aria-hidden="true" />
            {t("askOnGitHub")}
          </LinkButton>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={faq.key}
              value={faq.key}
              style={revealDelay(index, 60)}
              className="reveal data-[state=open]:border-brand-400/40 rounded-2xl border border-white/10 bg-white/3 px-6 transition-colors duration-300 last:border-b hover:border-white/20 data-[state=open]:bg-white/6"
            >
              <AccordionTrigger className="[&>svg]:text-brand-300 cursor-pointer py-5 text-base font-semibold text-white hover:no-underline [&>svg]:size-5">
                {t(`items.${faq.key}.question`)}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-[15px] leading-relaxed text-slate-300">
                {t(`items.${faq.key}.answer`)}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
