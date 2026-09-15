import { DURATION_BASE } from "./durations";

export const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: DURATION_BASE } },
};
