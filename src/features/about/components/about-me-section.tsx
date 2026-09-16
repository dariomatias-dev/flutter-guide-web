"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useTranslations } from "next-intl";

import { links } from "@/features/about/data/links";
import { cardsContainerVariants } from "@/shared/motion/cards-container-variants";
import { textItemVariants } from "@/shared/motion/text-item-variants";

export const AboutMeSection = () => {
  const t = useTranslations("About");

  return (
    <section id="about" className="bg-brand-surface py-20 md:py-28">
      <motion.div
        className="mx-auto max-w-4xl bg-transparent px-4 text-center sm:px-8"
        variants={cardsContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
      >
        <motion.div variants={textItemVariants}>
          <Image
            src="/avatar.png"
            alt="Dário Matias"
            width={100}
            height={100}
            className="mx-auto rounded-full"
          />
        </motion.div>

        <motion.h2
          variants={textItemVariants}
          className="mt-8 text-4xl font-extrabold tracking-tighter sm:text-5xl"
        >
          Dário Matias
        </motion.h2>

        <motion.h3 variants={textItemVariants} className="mt-2 text-xl font-semibold text-zinc-400">
          {t("role")}
        </motion.h3>

        <motion.p
          variants={textItemVariants}
          className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300"
        >
          {t("bio")}
        </motion.p>

        <motion.div className="mt-8 flex flex-wrap justify-center gap-y-2 text-sm text-zinc-400 sm:text-base">
          {links.map(({ href, label, aria }, i) => (
            <motion.div key={href} className="flex items-center" variants={textItemVariants}>
              {i > 0 && (
                <span aria-hidden="true" className="mx-2 text-zinc-600">
                  |
                </span>
              )}
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={aria}
                className="transition-colors hover:text-white"
              >
                {label}
              </a>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
