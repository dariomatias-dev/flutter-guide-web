"use client";

import { motion } from "framer-motion";
import { sectionAnimation } from "@/utils/sectionAnimation";
import { features } from "@/constants/features";

export const FeaturesSection = () => {
  return (
    <motion.section
      {...sectionAnimation}
      id="features"
      className="w-full px-4 py-20 sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
            A Powerful Toolkit in Your Pocket
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            FlutterGuide is packed with features designed to accelerate your
            learning and productivity.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center shadow-lg"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
                <feature.icon className="h-8 w-8" />
              </div>

              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                {feature.title}
              </h3>

              <p className="mt-2 text-zinc-400">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
