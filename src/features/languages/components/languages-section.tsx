"use client";

import { Languages as LanguagesIcon } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { cardItemVariants } from "@/shared/motion/card-item-variants";
import { cardsContainerVariants } from "@/shared/motion/cards-container-variants";
import { headerVariants } from "@/shared/motion/header-variants";
import { textItemVariants } from "@/shared/motion/text-item-variants";

// Native display names, in the order the app's own language picker uses
// (flutter_guide_app's Language.all). Not translated: a language's own
// name stays in its own script regardless of the site's locale.
const languages = ["English", "Português", "Español"];

export const LanguagesSection = () => {
  const t = useTranslations("Languages");

  return (
    <section id="languages" className="w-full px-4 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          className="text-center"
          variants={headerVariants}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.h2
            variants={textItemVariants}
            className="text-4xl font-extrabold tracking-tighter sm:text-5xl"
          >
            {t("title")}
          </motion.h2>

          <motion.p
            variants={textItemVariants}
            className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400"
          >
            {t("subtitle")}
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-6"
          variants={cardsContainerVariants}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {languages.map((language) => (
            <motion.div
              key={language}
              variants={cardItemVariants}
              className="border-brand-surface-raised bg-brand-surface-elevated/50 flex w-40 flex-col items-center gap-3 rounded-xl border px-6 py-8 text-center shadow-lg"
            >
              <LanguagesIcon className="text-brand-accent h-8 w-8" />
              <span className="text-lg font-semibold text-white">{language}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
