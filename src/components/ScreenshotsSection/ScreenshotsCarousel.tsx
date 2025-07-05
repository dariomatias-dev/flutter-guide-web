"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const screenshots = Array.from(
  { length: 6 },
  (_, i) => `/screenshots/flutter_guide_screen_${i + 1}.jpeg`,
);

export const ScreenshotsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;

    setCanScrollPrev(emblaApi.canScrollPrev());
    setCanScrollNext(emblaApi.canScrollNext());
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
    <div className="flex w-full flex-col items-center">
      <div className="w-full overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {screenshots.map((src, index) => (
            <div
              key={index}
              className="min-w-0 flex-[0_0_100%] px-2 sm:flex-[0_0_50%] md:flex-[0_0_33.3333%] lg:flex-[0_0_25%]"
            >
              <div className="flex max-h-[80vh] items-center justify-center overflow-hidden rounded-2xl">
                <Image
                  src={src}
                  alt={`Flutter Guide App Screenshot ${index + 1}`}
                  width={540}
                  height={960}
                  className="h-auto max-h-[80vh] w-auto rounded-2xl object-contain"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-center gap-4">
        <button
          onClick={scrollPrev}
          disabled={!canScrollPrev}
          className="flex rounded-full border border-zinc-700 bg-zinc-800 p-2 text-zinc-300 shadow-lg transition-colors duration-200 hover:bg-zinc-700 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          aria-label="Previous screenshot"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="flex rounded-full border border-zinc-700 bg-zinc-800 p-2 text-zinc-300 shadow-lg transition-colors duration-200 hover:bg-zinc-700 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          aria-label="Next screenshot"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
};
