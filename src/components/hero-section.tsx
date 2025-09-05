"use client";

import { motion, Variants } from "framer-motion";
import { ChevronDown, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

import { GithubButton } from "./buttons/github-button";
import { PlayStoreButton } from "./buttons/play-store-button";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: i * 0.1 },
  }),
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "tween",
      ease: "easeOut",
      duration: 0.5,
    },
  },
};

export const HeroSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4 text-center"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-zinc-950 via-zinc-950 to-blue-950/20" />
        <div
          className="absolute -top-60 -left-80 h-[40rem] w-[40rem] rounded-full bg-cyan-500/10 blur-3xl"
          style={{ animation: "blob 15s infinite alternate" }}
        />
        <div
          className="absolute -right-40 -bottom-40 h-[40rem] w-[40rem] rounded-full bg-blue-500/10 blur-3xl"
          style={{ animation: "blob 18s infinite alternate-reverse" }}
        />
      </div>

      <motion.div
        className="flex flex-col items-center"
        variants={containerVariants}
        initial="hidden"
        animate={isMounted ? "visible" : "hidden"}
      >
        <motion.div
          variants={itemVariants}
          className="mb-6 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 backdrop-blur-sm"
        >
          <Sparkles className="mr-2 h-4 w-4 text-blue-400" />
          The Essential Companion for Flutter Devs
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="flex flex-col text-5xl font-bold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          <span>Master Flutter,</span>

          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Faster.
            </span>
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-8 max-w-xl text-lg text-zinc-400 md:text-xl"
        >
          Learn, practice, and build amazing, high-performance apps with curated
          content in your pocket.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <PlayStoreButton />

          <GithubButton />
        </motion.div>

        <motion.div variants={itemVariants} className="mt-16 text-center">
          <p className="text-sm text-zinc-500">
            Used by developers at companies like:
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-x-6 gap-y-2 grayscale">
            <span className="font-semibold text-zinc-400">Google</span>
            <span className="font-semibold text-zinc-400">Alibaba</span>
            <span className="font-semibold text-zinc-400">Nubank</span>
            <span className="font-semibold text-zinc-400">iFood</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-6 w-6 text-zinc-600" />
        </motion.div>
      </motion.div>
    </section>
  );
};
