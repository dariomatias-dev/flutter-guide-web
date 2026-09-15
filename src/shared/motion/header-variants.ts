import { DURATION_BASE } from "./durations";

export const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: DURATION_BASE,
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};
