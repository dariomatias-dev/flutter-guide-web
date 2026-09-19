"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Maximize2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useState } from "react";

import { screenshots } from "@/features/screenshots/data/screenshots";
import { PhoneFrame } from "@/shared/components/phone-frame";
import { Dialog, DialogPortal, DialogTrigger } from "@/shared/components/ui/dialog";
import { cn } from "@/shared/lib/cn";

import { ImageViewer } from "./image-viewer";

export const ScreenshotsCarousel = () => {
  const t = useTranslations("Screenshots");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, align: "start" });

  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false);
  const [canScrollNext, setCanScrollNext] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onDotButtonClick = useCallback(
    (index: number) => {
      if (!emblaApi) return;
      emblaApi.scrollTo(index);
    },
    [emblaApi],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect();

    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <ul className="-ml-6 flex">
          {screenshots.map(({ src, key }, index) => {
            const title = t(`screens.${key}`);

            return (
              <li
                key={key}
                className="min-w-0 shrink-0 grow-0 basis-[72%] pl-6 sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Dialog
                  open={openIndex === index}
                  onOpenChange={(open) => setOpenIndex(open ? index : null)}
                >
                  <DialogTrigger
                    className="group focus-visible:ring-brand-400 focus-visible:ring-offset-ink-950 block w-full cursor-zoom-in rounded-[2.6rem] text-left focus-visible:ring-2 focus-visible:ring-offset-4 focus-visible:outline-none"
                    aria-label={t("viewScreenshot", { title })}
                  >
                    <div className="duration-base relative transition-transform group-hover:-translate-y-1.5">
                      <PhoneFrame
                        src={src}
                        alt=""
                        sizes="(min-width: 1024px) 260px, (min-width: 640px) 33vw, 70vw"
                      />
                      <span className="bg-ink-950/70 absolute top-5 right-5 flex size-8 items-center justify-center rounded-full text-white opacity-0 backdrop-blur transition-opacity group-hover:opacity-100">
                        <Maximize2 className="size-3.5" aria-hidden="true" />
                      </span>
                    </div>
                  </DialogTrigger>

                  <DialogPortal>
                    <ImageViewer src={src} alt={title} onClose={() => setOpenIndex(null)} />
                  </DialogPortal>
                </Dialog>

                <p className="mt-5 flex items-baseline gap-2.5 text-sm text-slate-300">
                  <span className="text-brand-300 font-mono text-xs tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {title}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-12 flex items-center justify-between gap-6">
        <div className="flex items-center">
          {screenshots.map(({ key }, index) => (
            <button
              key={key}
              type="button"
              onClick={() => onDotButtonClick(index)}
              className="group flex size-6 cursor-pointer items-center justify-center"
              aria-label={t("goToSlide", { number: index + 1 })}
              aria-current={index === selectedIndex ? "true" : undefined}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "duration-fast h-1.5 rounded-full transition-all",
                  index === selectedIndex
                    ? "bg-brand-400 w-4"
                    : "w-1.5 bg-white/20 group-hover:bg-white/40",
                )}
              />
            </button>
          ))}
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="focus-visible:ring-brand-400 flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-35"
            aria-label={t("previous")}
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="focus-visible:ring-brand-400 flex size-11 cursor-pointer items-center justify-center rounded-full border border-white/15 text-white transition-colors hover:bg-white/10 focus-visible:ring-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-35"
            aria-label={t("next")}
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
