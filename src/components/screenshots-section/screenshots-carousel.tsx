"use client";

import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { ImageViewer } from "./image-viewer";

const screenshots: string[] = Array.from(
  { length: 12 },
  (_, i) => `/screenshots/flutter_guide_screen_${i + 1}.jpg`,
);

export const ScreenshotsCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });

  const [canScrollPrev, setCanScrollPrev] = useState<boolean>(false);
  const [canScrollNext, setCanScrollNext] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const [isViewerOpen, setIsViewerOpen] = useState<boolean>(false);
  const [currentPreviewImageSrc, setCurrentPreviewImageSrc] =
    useState<string>("");

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

  const openViewer = useCallback((src: string) => {
    setCurrentPreviewImageSrc(src);
    setIsViewerOpen(true);
  }, []);

  const closeViewer = useCallback(() => {
    setIsViewerOpen(false);
    setCurrentPreviewImageSrc("");
  }, []);

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
              <button
                onClick={() => openViewer(src)}
                className="flex h-full max-h-[70vh] w-full cursor-pointer items-center justify-center border-0 bg-transparent p-0"
                aria-label={`Visualizar screenshot ${index + 1}`}
              >
                <Image
                  src={src}
                  alt={`Flutter Guide App Screenshot ${index + 1}`}
                  width={540}
                  height={960}
                  className="h-auto max-h-[70vh] w-auto rounded-2xl object-contain"
                />
              </button>
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

        <div className="flex gap-2">
          {screenshots.map((_, index) => (
            <button
              key={index}
              onClick={() => onDotButtonClick(index)}
              className={`h-2 rounded-full transition-all duration-200 ${
                index === selectedIndex
                  ? "w-4 bg-blue-500"
                  : "w-2 bg-zinc-600 hover:bg-zinc-500"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button
          onClick={scrollNext}
          disabled={!canScrollNext}
          className="flex rounded-full border border-zinc-700 bg-zinc-800 p-2 text-zinc-300 shadow-lg transition-colors duration-200 hover:bg-zinc-700 hover:text-white focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50"
          aria-label="Next screenshot"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      <AnimatePresence>
        {isViewerOpen && currentPreviewImageSrc && (
          <ImageViewer
            src={currentPreviewImageSrc}
            alt={`Flutter Guide App Screenshot ${selectedIndex + 1}`}
            onClose={closeViewer}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
