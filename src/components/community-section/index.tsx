"use client";

import { motion } from "framer-motion";

import { headerVariants } from "@/constants/variants/headerVariants";
import { textItemVariants } from "@/constants/variants/textItemVariants";
import { CommunityMarquee } from "./community-marquee";

const marqueeVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.4 } },
};

export const CommunitySection = () => {
  return (
    <section id="community" className="relative w-full py-20 sm:py-28">
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[40rem] w-full max-w-screen-lg rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(29,78,216,0.15)_0%,_transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-screen-xl px-4">
        <motion.div
          className="text-center"
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2
            variants={textItemVariants}
            className="text-4xl font-extrabold tracking-tighter sm:text-5xl"
          >
            Loved by the Community
          </motion.h2>

          <motion.p
            variants={textItemVariants}
            className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400"
          >
            See what developers are saying about FlutterGuide.
          </motion.p>
        </motion.div>
      </div>

      <motion.div
        className="mt-16"
        variants={marqueeVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <CommunityMarquee />
      </motion.div>
    </section>
  );
};
