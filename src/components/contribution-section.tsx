"use client";

import { motion } from "framer-motion";
import { Lightbulb, Share2, Users } from "lucide-react";

import { sectionAnimation } from "@/utils/sectionAnimation";

export const ContributionSection = () => {
  return (
    <motion.section
      {...sectionAnimation}
      id="contribution"
      className="w-full bg-zinc-900/50 px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-screen-xl text-center">
        <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
          Share and Grow: A Vibrant Community
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
          Contribute to the FlutterGuide community! Share your widgets, favorite
          packages, UI ideas, and more. Together, we build a knowledge
          repository for everyone.
        </p>

        <div className="mt-16 flex flex-wrap justify-center gap-8">
          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
              <Share2 className="h-8 w-8" />
            </div>
            <p className="mt-3 text-lg font-medium text-white">
              Widgets & Packages
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-600/20 text-cyan-400">
              <Lightbulb className="h-8 w-8" />
            </div>
            <p className="mt-3 text-lg font-medium text-white">UI Ideas</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600/20 text-purple-400">
              <Users className="h-8 w-8" />
            </div>
            <p className="mt-3 text-lg font-medium text-white">
              Knowledge Sharing
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
