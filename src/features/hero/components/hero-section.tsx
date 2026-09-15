"use client";

import { ChevronDown, Sparkles } from "lucide-react";
import { motion } from "motion/react";

import { GithubButton } from "@/shared/components/github-button";
import { PlayStoreButton } from "@/shared/components/play-store-button";
import { catalogStats, catalogTotal } from "@/shared/lib/catalog-stats";
import { DURATION_BASE } from "@/shared/motion/durations";

import type { Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: DURATION_BASE,
    },
  },
};

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="bg-brand-surface relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-4 text-center"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="from-brand-surface via-brand-surface to-brand-accent/20 absolute top-0 left-0 h-full w-full bg-linear-to-br" />
        <div
          className="bg-brand-accent/10 absolute -top-60 -left-80 h-160 w-160 rounded-full blur-3xl"
          style={{ animation: "aurora 15s infinite alternate" }}
        />
        <div
          className="bg-brand-accent-soft/10 absolute -right-40 -bottom-40 h-160 w-160 rounded-full blur-3xl"
          style={{ animation: "aurora 18s infinite alternate-reverse" }}
        />
      </div>

      <motion.div
        className="flex flex-col items-center"
        variants={containerVariants}
        initial={false}
        animate="visible"
      >
        <motion.div
          variants={itemVariants}
          className="border-brand-accent/30 bg-brand-accent/10 text-brand-accent-soft mb-6 inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
        >
          <Sparkles className="text-brand-accent mr-2 h-4 w-4" />
          The Essential Companion for Flutter Devs
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="flex flex-col text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span>Master Flutter,</span>

          <span className="relative inline-block">
            <span className="from-brand-accent to-brand-accent-soft bg-linear-to-r bg-clip-text text-transparent">
              Faster.
            </span>
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-8 max-w-xl text-lg text-zinc-400 md:text-xl"
        >
          Learn, practice, and build amazing, high-performance apps with curated content in your
          pocket.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <PlayStoreButton />

          <GithubButton />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16 text-center">
          <p className="text-sm text-zinc-400">{catalogTotal}+ components in the catalog:</p>

          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-zinc-400">
            <span>{catalogStats.widgets} Widgets</span>
            <span>{catalogStats.packages} Packages</span>
            <span>{catalogStats.functions} Functions</span>
            <span>{catalogStats.elements} Elements</span>
            <span>{catalogStats.uis} UIs</span>
          </div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <ChevronDown className="h-6 w-6 text-zinc-600" />
      </div>
    </section>
  );
};
