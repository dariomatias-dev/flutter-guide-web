"use client";

import { Code, Eye, Rocket } from "lucide-react";
import { motion } from "motion/react";

import { cardItemVariants } from "@/shared/motion/card-item-variants";
import { headerVariants } from "@/shared/motion/header-variants";
import { textItemVariants } from "@/shared/motion/text-item-variants";

const cardsContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.15,
    },
  },
};

export const LearningPathSection = () => {
  return (
    <section id="learning-path" className="w-full px-4 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-screen-xl">
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
            Demystifying Flutter: Learn Directly and Visually
          </motion.h2>

          <motion.p
            variants={textItemVariants}
            className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400"
          >
            FlutterGuide transforms learning into an intuitive experience. See components in action,
            copy the source code, and understand the concepts behind each feature.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={cardItemVariants}
            className="border-brand-surface-raised bg-brand-surface-elevated/50 flex flex-col items-center rounded-xl border p-6 text-center shadow-lg"
          >
            <div className="bg-brand-accent/20 text-brand-accent flex h-16 w-16 items-center justify-center rounded-full">
              <Eye className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">Visual Preview</h3>
            <p className="mt-2 text-zinc-400">
              See how components behave and look before even writing a single line of code.
            </p>
          </motion.div>

          <motion.div
            variants={cardItemVariants}
            className="border-brand-surface-raised bg-brand-surface-elevated/50 flex flex-col items-center rounded-xl border p-6 text-center shadow-lg"
          >
            <div className="bg-brand-accent/20 text-brand-accent flex h-16 w-16 items-center justify-center rounded-full">
              <Code className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">Instant Source Code</h3>
            <p className="mt-2 text-zinc-400">
              Access and copy the complete Flutter code for each example, accelerating your
              development.
            </p>
          </motion.div>

          <motion.div
            variants={cardItemVariants}
            className="border-brand-surface-raised bg-brand-surface-elevated/50 flex flex-col items-center rounded-xl border p-6 text-center shadow-lg"
          >
            <div className="bg-brand-accent/20 text-brand-accent flex h-16 w-16 items-center justify-center rounded-full">
              <Rocket className="h-8 w-8" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold tracking-tight">Practical Implementation</h3>
            <p className="mt-2 text-zinc-400">
              Understand concepts and implement them in your own projects with ease.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
