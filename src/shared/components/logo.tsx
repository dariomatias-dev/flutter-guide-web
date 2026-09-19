import Image from "next/image";

import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";

interface LogoProps {
  className?: string;
  tone?: "dark" | "light";
}

export const Logo = ({ className, tone = "dark" }: LogoProps) => (
  <Link
    href="/"
    className={cn(
      "inline-flex items-center gap-2.5 text-lg font-bold tracking-tight",
      tone === "dark" ? "text-white" : "text-heading",
      className,
    )}
  >
    <span className="relative h-6 w-9 shrink-0 overflow-hidden">
      <Image src="/flutter_guide_icon.png" alt="" fill sizes="36px" className="object-cover" />
    </span>
    FlutterGuide
  </Link>
);
