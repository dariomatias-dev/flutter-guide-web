import { motion } from "framer-motion";
import Image from "next/image";

import { cardVariants } from "@/constants/cardVariants";

export const ScreenshotCard = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => {
  return (
    <motion.div variants={cardVariants} className={`w-[270px] ${className}`}>
      <div className="relative overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 p-1 shadow-lg shadow-blue-950/30">
        <Image
          src={src}
          alt={alt}
          width={270}
          height={480}
          className="h-auto w-full rounded-md"
        />
      </div>
    </motion.div>
  );
};
