import { ImageOff, X } from "lucide-react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useCallback, useEffect, useRef, useState } from "react";

import {
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from "@/shared/components/ui/dialog";

interface ImageViewerProps {
  src: string;
  alt: string;
}

export const ImageViewer = ({ src, alt }: ImageViewerProps) => {
  const t = useTranslations("Screenshots");
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  // A cached image can finish loading before this effect attaches the
  // onLoad handler, in which case that event never fires. Checking
  // `complete` here catches that case instead of leaving the image
  // permanently hidden.
  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoading(false);
    }
  }, []);

  const handleLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setIsLoading(false);
    setHasError(true);
  }, []);

  return (
    <>
      <DialogOverlay className="data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:animate-in data-[state=open]:fade-in duration-fast fixed inset-0 z-50 bg-black/80 backdrop-blur-sm" />

      <DialogContent className="data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in data-[state=open]:zoom-in-95 duration-fast fixed inset-0 z-50 flex items-center justify-center p-4">
        <DialogTitle className="sr-only">{alt}</DialogTitle>

        <div className="relative flex h-auto max-h-[90vh] w-full max-w-5xl items-center justify-center p-5">
          <Image
            ref={imgRef}
            src={src}
            alt={alt}
            width={1920}
            height={1080}
            sizes="(max-width: 1280px) 100vw, 1280px"
            className={`border-brand-surface-elevated bg-brand-surface-elevated duration-base h-auto max-h-[90vh] w-auto max-w-full rounded-lg border object-contain shadow-xl transition-opacity ${
              isLoading || hasError ? "opacity-0" : "opacity-100"
            }`}
            onLoad={handleLoad}
            onError={handleError}
          />

          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-white/20 border-t-white"
                role="status"
              >
                <span className="sr-only">{t("loading")}</span>
              </div>
            </div>
          )}

          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-zinc-400">
              <ImageOff className="h-16 w-16" aria-hidden="true" />
              <span className="text-sm">{t("failedToLoad")}</span>
            </div>
          )}
        </div>

        <DialogClose
          className="absolute top-3 right-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/75"
          aria-label={t("closeViewer")}
        >
          <X size={20} />
        </DialogClose>
      </DialogContent>
    </>
  );
};
