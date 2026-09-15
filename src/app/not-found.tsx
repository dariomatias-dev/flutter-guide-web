"use client";

import { motion } from "motion/react";

import { LinkButton } from "@/shared/components/link-button";

import type { Variants } from "motion/react";

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

const NotFoundPage = () => {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="from-brand-surface via-brand-surface to-brand-accent/20 absolute top-0 left-0 h-full w-full bg-linear-to-br" />

        <motion.div
          className="border-brand-accent/20 bg-brand-surface-elevated/50 pointer-events-none absolute top-1/4 left-[10%] h-32 w-32 rounded-2xl border"
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
          className="border-brand-accent/20 bg-brand-surface-elevated/50 pointer-events-none absolute right-[10%] bottom-1/4 h-20 w-40 rounded-full border"
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
          className="border-brand-accent/20 bg-brand-surface-elevated/30 pointer-events-none absolute top-[5%] right-[20%] h-16 w-16 rounded-full border"
          initial={{ opacity: 0, x: -30, rotate: 0 }}
          animate={{
            opacity: 1,
            x: [0, 30],
            y: [0, 15],
            rotate: 20,
          }}
          transition={{
            opacity: { duration: 0.6, delay: 0.5 },
            x: {
              duration: 6,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
            y: {
              duration: 3,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
            rotate: {
              duration: 7,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
        />

        <motion.div
          className="border-brand-accent/20 bg-brand-surface-elevated/40 pointer-events-none absolute bottom-[15%] left-[25%] h-12 w-24 rounded-lg border"
          initial={{ opacity: 0, y: 40, rotate: 5 }}
          animate={{
            opacity: 1,
            y: [0, -10],
            x: [0, -20],
            rotate: -5,
          }}
          transition={{
            opacity: { duration: 0.7, delay: 0.9 },
            y: {
              duration: 4.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
            x: {
              duration: 5.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
            rotate: {
              duration: 9,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
        />

        <motion.div
          className="border-brand-accent/10 bg-brand-surface-elevated/20 pointer-events-none absolute top-[60%] left-[5%] h-10 w-10 border [clip-path:polygon(50%_0%,0%_100%,100%_100%)]"
          initial={{ opacity: 0, y: -20, rotate: 45 }}
          animate={{
            opacity: 1,
            y: [0, 10],
            rotate: [45, 60],
          }}
          transition={{
            opacity: { duration: 0.4, delay: 1.2 },
            y: {
              duration: 3.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
            rotate: {
              duration: 6.5,
              repeat: Infinity,
              repeatType: "mirror",
              ease: "easeInOut",
            },
          }}
        />
      </div>

      <main className="z-10 flex flex-1 flex-col items-center justify-center px-4 text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.span
            variants={itemVariants}
            className="from-brand-accent-soft to-brand-accent bg-linear-to-br bg-clip-text font-mono text-9xl font-bold tracking-tighter text-transparent sm:text-[12rem] md:text-[14rem]"
          >
            404
          </motion.span>

          <motion.h1
            variants={itemVariants}
            className="mt-4 text-4xl font-extrabold tracking-tighter text-zinc-100 sm:text-5xl"
          >
            Widget Not Found in the Tree.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-md text-base text-zinc-400 md:text-lg"
          >
            We couldn&apos;t render this screen. It seems the route you followed doesn&apos;t exist
            in our widget tree.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10">
            <LinkButton href="/" target="_self" className="py-5">
              Back to Home
            </LinkButton>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
};

export default NotFoundPage;
