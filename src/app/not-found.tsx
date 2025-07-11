"use client";

import { motion, Variants } from "framer-motion";

import { LinkButton } from "../components/LinkButton";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
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
    <main className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden bg-zinc-950 px-4 text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-br from-zinc-950 via-zinc-950 to-blue-900/20" />
      </div>

      <motion.div
        className="pointer-events-none absolute top-1/4 left-[10%] h-32 w-32 rounded-2xl border border-blue-500/20 bg-zinc-900/50"
        initial={{ opacity: 0, y: 50, rotate: -10 }}
        animate={{
          opacity: 1,
          y: [0, -20],
          rotate: 10,
        }}
        transition={{
          opacity: { duration: 0.5, delay: 0.8 },
          y: {
            duration: 4,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          },
          rotate: {
            duration: 8,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          },
        }}
      />

      <motion.div
        className="pointer-events-none absolute right-[10%] bottom-1/4 h-20 w-40 rounded-full border border-cyan-500/20 bg-zinc-900/50"
        initial={{ opacity: 0, y: -50, rotate: 10 }}
        animate={{
          opacity: 1,
          y: [0, 25],
          rotate: -15,
        }}
        transition={{
          opacity: { duration: 0.5, delay: 1 },
          y: {
            duration: 5,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          },
          rotate: {
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "easeInOut",
          },
        }}
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="z-10 flex flex-col items-center text-center"
      >
        <motion.span
          variants={itemVariants}
          className="bg-gradient-to-br from-cyan-400 to-blue-500 bg-clip-text font-mono text-9xl font-bold tracking-tighter text-transparent sm:text-[12rem] md:text-[14rem]"
        >
          404
        </motion.span>

        <motion.h1
          variants={itemVariants}
          className="mt-4 text-4xl font-extrabold tracking-tighter text-zinc-100 sm:text-5xl"
        >
          Oops! The UI has broken.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mx-auto mt-4 max-w-md text-base text-zinc-400 md:text-lg"
        >
          We couldn't render this screen. It seems the route you followed
          doesn't exist in our widget tree.
        </motion.p>

        <motion.div variants={itemVariants} className="mt-10">
          <LinkButton href="/" target="_self" className="py-5">
            Back to Home
          </LinkButton>
        </motion.div>
      </motion.div>
    </main>
  );
}
