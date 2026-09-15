"use client";

import { motion } from "motion/react";

import { cardsContainerVariants } from "@/shared/motion/cards-container-variants";
import { headerVariants } from "@/shared/motion/header-variants";
import { textItemVariants } from "@/shared/motion/text-item-variants";

import { ThemeCodeCard } from "./theme-code-card";

interface ThemeCustomizationContentProps {
  lightHtml: string;
  darkHtml: string;
}

export const ThemeCustomizationContent = ({
  lightHtml,
  darkHtml,
}: ThemeCustomizationContentProps) => {
  return (
    <>
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
          Elevate Your Coding: Choose Your Code Theme
        </motion.h2>

        <motion.p
          variants={textItemVariants}
          className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400"
        >
          Personalize your development environment with a selection of popular and vibrant code
          themes, enhancing readability and visual comfort.
        </motion.p>
      </motion.div>

      <motion.div
        className="mt-16 flex flex-col items-center gap-12 md:flex-row md:justify-center"
        variants={cardsContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <ThemeCodeCard html={lightHtml} label="GitHub Light" variant="light" />
        <ThemeCodeCard html={darkHtml} label="Dracula" variant="dark" />
      </motion.div>
    </>
  );
};
