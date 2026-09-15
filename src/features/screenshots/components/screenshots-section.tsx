"use client";

import { motion } from "motion/react";

import { elementAnimation } from "@/shared/motion/section-animation";

import { ScreenshotsCarousel } from "./screenshots-carousel";

export const ScreenshotsSection = () => {
  return (
    <section id="showcase" className="relative w-full py-20 md:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center px-4 text-center">
        <motion.div {...elementAnimation}>
          <h2 className="text-4xl font-extrabold tracking-tighter text-white sm:text-5xl">
            The App in Action
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            See how FlutterGuide brings concepts to life with a clean, intuitive, and powerful
            interface.
          </p>
        </motion.div>

        <motion.div {...elementAnimation} className="mt-8">
          <ScreenshotsCarousel />
        </motion.div>
      </div>
    </section>
  );
};
