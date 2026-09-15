import Image from "next/image";
import { useEffect, useRef, useState } from "react";

interface ScreenshotThumbnailProps {
  src: string;
  alt: string;
  priority: boolean;
}

export const ScreenshotThumbnail = ({ src, alt, priority }: ScreenshotThumbnailProps) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // A cached image can finish loading before this effect attaches the
  // onLoad handler, in which case that event never fires. Checking
  // `complete` here catches that case instead of leaving the image
  // permanently hidden.
  useEffect(() => {
    if (imgRef.current?.complete) {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      <Image
        ref={imgRef}
        src={src}
        alt={alt}
        width={540}
        height={960}
        sizes="(max-width: 639px) 100vw, (max-width: 767px) 50vw, (max-width: 1023px) 33vw, 288px"
        className={`h-auto max-h-[70vh] w-auto rounded-2xl object-contain transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        }`}
        onLoad={() => setIsLoading(false)}
        priority={priority}
      />
      {isLoading && (
        <div className="bg-brand-surface-elevated/80 absolute inset-0 flex items-center justify-center rounded-2xl">
          <div
            className="h-8 w-8 animate-spin rounded-full border-2 border-solid border-white/20 border-t-white"
            role="status"
          >
            <span className="sr-only">Loading image...</span>
          </div>
        </div>
      )}
    </>
  );
};
