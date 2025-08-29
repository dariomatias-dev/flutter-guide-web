"use client";

import { motion } from "framer-motion";
import { Eye, Code, Rocket } from "lucide-react";

import { sectionAnimation } from "@/utils/sectionAnimation";

export const LearningPathSection = () => {
  return (
    <motion.section
      {...sectionAnimation}
      id="learning-path"
      className="w-full px-4 py-20 sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
            Demystifying Flutter: Learn Directly and Visually
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            FlutterGuide transforms learning into an intuitive experience. See
            components in action, copy the source code, and understand the
            concepts behind each feature.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center shadow-lg">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
              <Eye className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">
              Visual Preview
            </h3>
            <p className="mt-2 text-zinc-400">
              See how components behave and look before even writing a single
              line of code.
            </p>
          </div>

          <div className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center shadow-lg">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-600/20 text-cyan-400">
              <Code className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">
              Instant Source Code
            </h3>
            <p className="mt-2 text-zinc-400">
              Access and copy the complete Flutter code for each example,
              accelerating your development.
            </p>
          </div>

          <div className="flex flex-col items-center rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center shadow-lg">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600/20 text-purple-400">
              <Rocket className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">
              Practical Implementation
            </h3>
            <p className="mt-2 text-zinc-400">
              Understand concepts and implement them in your own projects with
              ease.
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
