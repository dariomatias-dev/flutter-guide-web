import type { CSSProperties } from "react";

/** Staggers `.reveal` siblings: the nth item waits n * step before fading in. */
export const revealDelay = (index: number, step = 80): CSSProperties =>
  ({ "--reveal-delay": `${index * step}ms` }) as CSSProperties;
