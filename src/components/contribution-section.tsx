"use client";

import { motion } from "framer-motion";
import { Lightbulb, Share2, Users } from "lucide-react";

const headerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      delayChildren: 0.1,
      staggerChildren: 0.1,
    },
  },
};

const textItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const itemsContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
};

export const ContributionSection = () => {
  return (
    <section
      id="contribution"
      className="w-full bg-[#101011] px-4 py-20 md:py-28"
    >
      <div className="mx-auto max-w-screen-xl text-center">
        <motion.div
          variants={headerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2
            variants={textItemVariants}
            className="text-4xl font-extrabold tracking-tighter sm:text-5xl"
          >
            Share and Grow: A Vibrant Community
          </motion.h2>

          <motion.p
            variants={textItemVariants}
            className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400"
          >
            Contribute to the FlutterGuide community! Share your widgets,
            favorite packages, UI ideas, and more. Together, we build a
            knowledge repository for everyone.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-col justify-center gap-8 md:flex-row"
          variants={itemsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
              <Share2 className="h-8 w-8" />
            </div>
            <p className="mt-3 text-lg font-medium text-white">
              Widgets & Packages
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-600/20 text-cyan-400">
              <Lightbulb className="h-8 w-8" />
            </div>
            <p className="mt-3 text-lg font-medium text-white">UI Ideas</p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-purple-600/20 text-purple-400">
              <Users className="h-8 w-8" />
            </div>
            <p className="mt-3 text-lg font-medium text-white">
              Knowledge Sharing
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
