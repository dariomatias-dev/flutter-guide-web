import Image from "next/image";

import { cn } from "@/shared/lib/cn";

interface PhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  eager?: boolean;
}

/** An Android handset drawn around one of the app's own screenshots. */
export const PhoneFrame = ({
  src,
  alt,
  className,
  sizes = "280px",
  eager = false,
}: PhoneFrameProps) => (
  <div className={cn("@container relative", className)}>
    <span
      aria-hidden="true"
      className="absolute top-[22%] right-[-0.9cqw] h-[8%] w-[1.4cqw] rounded-r-[0.6cqw] bg-linear-to-r from-[#2a3350] to-[#46506e]"
    />
    <span
      aria-hidden="true"
      className="absolute top-[34%] right-[-0.9cqw] h-[15%] w-[1.4cqw] rounded-r-[0.6cqw] bg-linear-to-r from-[#2a3350] to-[#46506e]"
    />

    <div className="relative rounded-[13cqw] bg-linear-to-b from-[#3b4563] via-[#232b42] to-[#1a2034] p-[0.9cqw] shadow-[0_2.5cqw_6cqw_-1cqw_rgb(2_6_20/0.55),0_12cqw_24cqw_-8cqw_rgb(2_6_20/0.6)]">
      <div className="rounded-[12.2cqw] bg-[#05070d] p-[2.4cqw]">
        <div className="relative aspect-1220/2664 overflow-hidden rounded-[9.8cqw] bg-[#f4f8ff]">
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            loading={eager ? "eager" : "lazy"}
            fetchPriority={eager ? "high" : "auto"}
            className="object-cover object-top"
          />

          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 flex h-[8cqw] items-center justify-between px-[6.5cqw] text-[3.4cqw] font-semibold text-[#1b1d24]"
          >
            <span className="tabular-nums">12:30</span>
            <span className="flex items-center gap-[1.4cqw]">
              <svg viewBox="0 0 16 16" className="size-[3.6cqw]" fill="currentColor">
                <path d="M8 13.5 0.6 5.2A10.5 10.5 0 0 1 15.4 5.2Z" />
              </svg>
              <svg viewBox="0 0 16 16" className="size-[3.6cqw]" fill="currentColor">
                <path d="M15 1v14H1Z" />
              </svg>
              <svg viewBox="0 0 10 16" className="h-[3.8cqw] w-[2.4cqw]" fill="currentColor">
                <path d="M3 0h4v1.5h1.5a1 1 0 0 1 1 1V15a1 1 0 0 1-1 1h-7a1 1 0 0 1-1-1V2.5a1 1 0 0 1 1-1H3Z" />
              </svg>
            </span>
          </div>

          <span
            aria-hidden="true"
            className="absolute top-[2.3cqw] left-1/2 size-[3.6cqw] -translate-x-1/2 rounded-full bg-[#05070d] ring-[0.5cqw] ring-[#11151f]"
          />

          <span
            aria-hidden="true"
            className="absolute bottom-[1.8cqw] left-1/2 h-[1.1cqw] w-[30cqw] -translate-x-1/2 rounded-full bg-[#1b1d24]/80"
          />
        </div>
      </div>
    </div>
  </div>
);
