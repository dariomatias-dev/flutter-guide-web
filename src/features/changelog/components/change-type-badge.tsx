import { useTranslations } from "next-intl";

import type { ChangeType } from "@/features/changelog/changelog.types";
import { cn } from "@/shared/lib/cn";

/** Badge color per Keep a Changelog section. */
const tones: Record<ChangeType, string> = {
  added: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  changed: "bg-brand-500/8 text-brand-700 ring-brand-600/20",
  fixed: "bg-amber-50 text-amber-800 ring-amber-600/25",
  removed: "bg-rose-50 text-rose-700 ring-rose-600/20",
  deprecated: "bg-slate-100 text-slate-700 ring-slate-500/20",
  security: "bg-violet/10 text-[#5b45d6] ring-violet/30",
};

interface ChangeTypeBadgeProps {
  type: ChangeType;
  className?: string;
}

export const ChangeTypeBadge = ({ type, className }: ChangeTypeBadgeProps) => {
  const t = useTranslations("Changelog.types");

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold ring-1 ring-inset",
        tones[type],
        className,
      )}
    >
      {t(type)}
    </span>
  );
};
