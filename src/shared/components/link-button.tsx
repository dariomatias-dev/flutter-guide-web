import Link from "next/link";

import { Button } from "@/shared/components/ui/button";

interface LinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
}

export function LinkButton({
  href,
  children,
  className = "",
  target = "_blank",
  rel = "noopener noreferrer",
}: LinkButtonProps) {
  return (
    <Button
      asChild
      className={`from-brand-accent to-brand-accent-soft text-brand-surface shadow-brand-accent/20 duration-base w-full rounded-full bg-linear-to-br bg-size-[200%_auto] px-8 py-3 text-base font-semibold shadow-lg transition-all hover:bg-right hover:brightness-110 sm:w-auto ${className}`}
    >
      <Link href={href} target={target} rel={rel}>
        {children}
      </Link>
    </Button>
  );
}
