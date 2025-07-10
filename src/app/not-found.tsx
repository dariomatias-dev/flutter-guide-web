"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";

import { Button } from "@/components/ui/button";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function NotFoundPage() {
  return (
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4 text-center text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute -top-40 -left-40 h-[30rem] w-[30rem] rounded-full bg-cyan-500/10 blur-3xl"
          style={{ animation: "blob 10s infinite alternate" }}
        />
        <div
          className="absolute -right-20 -bottom-20 h-[30rem] w-[30rem] rounded-full bg-blue-500/10 blur-3xl"
          style={{ animation: "blob 12s infinite alternate-reverse" }}
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 flex flex-col items-center"
      >
        <motion.div
          variants={itemVariants}
          animate={{
            translateY: ["-5px", "5px", "-5px"],
            transition: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        >
          <span className="bg-gradient-to-br from-blue-500 to-cyan-400 bg-clip-text font-mono text-9xl font-bold tracking-tighter text-transparent sm:text-[12rem] md:text-[14rem]">
            404
          </span>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="mt-6 text-4xl font-extrabold tracking-tighter text-zinc-100 sm:text-5xl"
        >
          Page Not Found
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-4 max-w-md text-base text-zinc-400 md:text-lg"
        >
          The link you followed may be broken or the page may have been removed.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10">
          <Button
            size="lg"
            asChild
            className="w-full bg-gradient-to-br from-blue-600 to-cyan-500 bg-[length:200%_auto] text-sm font-semibold text-white transition-all duration-300 hover:bg-right hover:brightness-110"
          >
            <Link href="/">Back to Home</Link>
          </Button>
        </motion.div>
      </motion.div>
    </main>
  );
}
