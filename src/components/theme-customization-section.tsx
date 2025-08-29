"use client";

import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";

import { sectionAnimation } from "@/utils/sectionAnimation";

export const ThemeCustomizationSection = () => {
  return (
    <motion.section
      {...sectionAnimation}
      id="themes"
      className="relative w-full py-20 sm:py-28"
    >
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[40rem] w-full max-w-screen-lg rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(29,78,216,0.15)_0%,_transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-screen-xl px-4">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
            Personalize Your Experience: Light and Dark Themes
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Adapt your learning environment to your liking. Choose from a
            variety of carefully designed themes for both light and dark modes,
            ensuring visual comfort in any condition.
          </p>
        </div>

        <div className="mt-16 flex flex-col items-center gap-12 md:flex-row md:justify-center">
          <div className="relative h-[28rem] w-[16rem] rounded-[2.5rem] bg-gradient-to-br from-zinc-700 to-zinc-900 p-4 shadow-2xl shadow-zinc-500/20">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-[1.8rem] bg-white p-4 text-zinc-900">
              <Sun className="h-12 w-12 text-yellow-500" />
              <p className="mt-4 text-2xl font-semibold tracking-tight">
                Light Mode
              </p>
              <p className="text-center text-sm text-zinc-600">
                Bright and vibrant interface for daytime.
              </p>
            </div>
          </div>

          <div className="relative h-[28rem] w-[16rem] rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-cyan-400 p-4 shadow-2xl shadow-blue-500/20">
            <div className="flex h-full w-full flex-col items-center justify-center rounded-[1.8rem] bg-zinc-800 p-4 text-white">
              <Moon className="h-12 w-12 text-blue-300" />
              <p className="mt-4 text-2xl font-semibold tracking-tight">
                Dark Mode
              </p>
              <p className="text-center text-sm text-zinc-400">
                Elegant and comfortable design for nighttime.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
