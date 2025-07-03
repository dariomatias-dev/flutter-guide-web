import { motion } from "framer-motion";

import { sectionAnimation } from "@/utils/sectionAnimation";
import { CommunityMarquee } from "./CommunityMarquee";

export const CommunitySection = () => {
  return (
    <motion.section
      {...sectionAnimation}
      id="community"
      className="relative w-full py-20 sm:py-28"
    >
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[40rem] w-full max-w-screen-lg rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(29,78,216,0.15)_0%,_transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-screen-xl px-4">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
            Loved by the Community
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            See what developers are saying about Flutter Guide.
          </p>
        </div>
      </div>

      <div className="mt-16">
        <CommunityMarquee />
      </div>
    </motion.section>
  );
};
