import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Sparkles } from "lucide-react";
import Link from "next/link";

import { githubUrl, playStoreUrl } from "@/constants/constants";
import { textVariants } from "@/constants/variants/textVariants";
import { titleContainerVariants } from "@/constants/variants/titleContainerVariants";
import { titleWordVariants } from "@/constants/variants/titleWordVariants";
import { Button } from "./ui/button";

export const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden px-4 text-center"
    >
      <div className="absolute inset-0 -z-20 bg-zinc-950" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-cyan-500/20 blur-3xl"
          style={{ animation: "blob 10s infinite alternate" }}
        />
        <div
          className="absolute -top-20 -right-20 h-[30rem] w-[30rem] rounded-full bg-blue-500/20 blur-3xl"
          style={{ animation: "blob 12s infinite alternate-reverse" }}
        />
        <div
          className="absolute -bottom-40 left-1/4 h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-3xl"
          style={{ animation: "blob 14s infinite alternate" }}
        />

        <motion.div
          className="absolute top-1/4 left-1/4 h-32 w-56 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm"
          animate={{ y: [-10, 10], rotate: [-2, 2] }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute right-1/4 bottom-1/4 h-40 w-40 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm"
          animate={{ y: [15, -15], x: [-10, 10], rotate: [5, -5] }}
          transition={{
            duration: 12,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="flex flex-col items-center">
        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          className="mb-4 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300"
        >
          <Sparkles className="mr-2 h-4 w-4 text-blue-400" />
          The Essential Companion for Flutter Devs
        </motion.div>

        <motion.h1
          variants={titleContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-5xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl"
        >
          <motion.span variants={titleWordVariants} className="inline-block">
            Master
          </motion.span>{" "}
          <motion.span variants={titleWordVariants} className="inline-block">
            Flutter,
          </motion.span>{" "}
          <motion.span
            variants={titleWordVariants}
            className="relative inline-block"
          >
            <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
              Faster.
            </span>
            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent opacity-0"
              style={{
                animation: "shimmer 4s infinite",
                WebkitTextStroke: "1px transparent",
              }}
            >
              Faster.
            </span>
          </motion.span>
        </motion.h1>

        <motion.p
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.8 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl"
        >
          Learn, practice, and build beautiful, high-performance apps with
          curated content in your pocket.
        </motion.p>

        <motion.div
          variants={textVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
          className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Button
            size="lg"
            asChild
            className="w-full rounded-md bg-gradient-to-br from-blue-600 to-cyan-500 bg-[length:200%_auto] text-base font-semibold text-white transition-all duration-300 hover:bg-right sm:w-auto"
          >
            <Link href={playStoreUrl} target="_blank" rel="noopener noreferrer">
              Get it on Google Play
            </Link>
          </Button>

          <Button
            size="lg"
            variant="ghost"
            asChild
            className="w-full border border-zinc-700 bg-zinc-800/50 text-base font-medium text-zinc-300 backdrop-blur-sm transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-white sm:w-auto"
          >
            <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
              View on GitHub <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
        >
          <ChevronDown className="h-6 w-6 text-zinc-500" />
        </motion.div>
      </motion.div>
    </section>
  );
};
