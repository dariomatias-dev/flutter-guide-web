"use client";

import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { LinkButton } from "@/shared/components/link-button";
import { DURATION_BASE } from "@/shared/motion/durations";

import type { Variants } from "motion/react";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      duration: DURATION_BASE,
      ease: "easeOut",
    },
  },
};

const NotFoundPage = () => {
  const t = useTranslations("NotFound");

  return (
    <>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="from-brand-surface via-brand-surface to-brand-accent/20 absolute top-0 left-0 h-full w-full bg-linear-to-br" />

        <motion.div
          className="border-brand-accent/20 bg-brand-surface-elevated/50 pointer-events-none absolute top-1/4 left-[10%] h-32 w-32 -rotate-6 rounded-2xl border"
          animate={{ y: [0, -20] }}
          transition={{ duration: 4, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />

        <motion.div
          className="border-brand-accent/20 bg-brand-surface-elevated/50 pointer-events-none absolute right-[10%] bottom-1/4 h-20 w-40 rounded-full border"
          animate={{ y: [0, 25] }}
          transition={{ duration: 5, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />

        <motion.div
          className="border-brand-accent/20 bg-brand-surface-elevated/30 pointer-events-none absolute top-[5%] right-1/5 h-16 w-16 rotate-12 rounded-full border"
          animate={{ y: [0, 15] }}
          transition={{ duration: 3, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      </div>

      <main
        id="main-content"
        tabIndex={-1}
        className="z-10 flex flex-1 flex-col items-center justify-center px-4 text-center"
      >
        <motion.div
          variants={containerVariants}
          initial={false}
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
            {t("title")}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="mx-auto mt-4 max-w-md text-base text-zinc-400 md:text-lg"
          >
            {t("body")}
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10">
            <LinkButton href="/" target="_self" className="py-5">
              {t("backToHome")}
            </LinkButton>
          </motion.div>
        </motion.div>
      </main>
    </>
  );
};

export default NotFoundPage;
