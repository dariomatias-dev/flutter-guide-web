import { cva } from "class-variance-authority";

import { Link } from "@/i18n/navigation";
import { cn } from "@/shared/lib/cn";

import type { VariantProps } from "class-variance-authority";

const linkButtonVariants = cva(
  "group inline-flex items-center justify-center gap-2.5 rounded-xl font-semibold whitespace-nowrap transition-[scale,background-color,border-color,box-shadow,filter] duration-base ease-out active:scale-[0.98] focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:outline-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-linear-to-b from-brand-500 to-brand-600 text-white shadow-[0_10px_30px_-10px] shadow-brand-500/70 ring-1 ring-white/10 ring-inset hover:shadow-[0_16px_36px_-12px] hover:brightness-110",
        ghostDark:
          "border border-white/20 bg-white/3 text-white hover:border-brand-400/60 hover:bg-white/[0.07]",
        ghostLight:
          "border border-brand-500/35 bg-white text-brand-600 hover:border-brand-500 hover:bg-brand-500/5",
        ink: "bg-ink-900 text-white shadow-[0_12px_30px_-12px] shadow-ink-900/60 hover:bg-ink-800",
      },
      size: {
        md: "h-11 px-5 text-sm",
        lg: "h-13 px-6 text-[15px]",
      },
    },
    defaultVariants: { variant: "primary", size: "lg" },
  },
);

interface LinkButtonProps extends VariantProps<typeof linkButtonVariants> {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
}

export function LinkButton({
  href,
  children,
  className,
  variant,
  size,
  target = "_blank",
  rel = "noopener noreferrer",
}: LinkButtonProps) {
  return (
    <Link
      href={href}
      target={target}
      rel={rel}
      className={cn(linkButtonVariants({ variant, size }), className)}
    >
      {children}
    </Link>
  );
}
