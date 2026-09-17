import { DURATION_BASE } from "./durations";

export const elementAnimation = {
  initial: false as const,
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.5 },
  transition: { duration: DURATION_BASE },
};
