import Link from "next/link";
import { Button } from "@/components/ui/button";

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
    <Link href={href} target={target} rel={rel}>
      <Button
        className={`w-full rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 bg-[length:200%_auto] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-blue-500/20 transition-all duration-300 hover:bg-right hover:brightness-110 sm:w-auto ${className}`}
      >
        {children}
      </Button>
    </Link>
  );
}
