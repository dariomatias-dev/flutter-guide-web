import { cn } from "@/shared/lib/cn";
import { revealDelay } from "@/shared/lib/reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  tone: "dark" | "light";
  align?: "left" | "center";
  className?: string;
  id?: string;
}

export const SectionHeading = ({
  eyebrow,
  title,
  subtitle,
  tone,
  align = "left",
  className,
  id,
}: SectionHeadingProps) => (
  <div className={cn("max-w-xl", align === "center" && "mx-auto max-w-2xl text-center", className)}>
    <p
      className={cn(
        "reveal text-xs font-bold tracking-[0.18em] uppercase",
        tone === "dark" ? "text-brand-300" : "text-brand-600",
      )}
    >
      {eyebrow}
    </p>
    <h2
      id={id}
      style={revealDelay(1)}
      className={cn(
        "reveal mt-3 text-3xl leading-[1.1] font-extrabold tracking-tight text-balance sm:text-[2.6rem]",
        tone === "dark" ? "text-white" : "text-heading",
      )}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        style={revealDelay(2)}
        className={cn(
          "reveal mt-4 text-base leading-relaxed text-pretty sm:text-lg",
          tone === "dark" ? "text-slate-300" : "text-body",
        )}
      >
        {subtitle}
      </p>
    )}
  </div>
);
