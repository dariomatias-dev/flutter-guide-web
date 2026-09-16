"use client";

import { Rocket } from "lucide-react";
import { motion } from "motion/react";
import { useFormatter, useTranslations } from "next-intl";

import { releases } from "@/features/whats-new/data/releases";
import { cardItemVariants } from "@/shared/motion/card-item-variants";
import { cardsContainerVariants } from "@/shared/motion/cards-container-variants";
import { headerVariants } from "@/shared/motion/header-variants";
import { textItemVariants } from "@/shared/motion/text-item-variants";

export const WhatsNewSection = () => {
  const t = useTranslations("WhatsNew");
  const format = useFormatter();

  return (
    <section id="whats-new" className="w-full px-4 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-6xl">
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
          className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3"
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {releases.map(({ version, date, key }) => {
            const highlights = t.raw(`releases.${key}.highlights`) as string[];

            return (
              <motion.div
                key={version}
                variants={cardItemVariants}
                className="border-brand-surface-raised bg-brand-surface-elevated/50 flex flex-col rounded-xl border p-6 shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-brand-accent/20 text-brand-accent flex h-10 w-10 shrink-0 items-center justify-center rounded-full">
                    <Rocket className="h-5 w-5" />
                  </div>

                  <div>
                    <p className="font-semibold text-white">v{version}</p>
                    <p className="text-sm text-zinc-400">
                      {format.dateTime(new Date(date), { year: "numeric", month: "long" })}
                    </p>
                  </div>
                </div>

                <ul className="mt-4 space-y-2 text-left text-zinc-400">
                  {highlights.map((highlight) => (
                    <li key={highlight} className="flex gap-2">
                      <span aria-hidden="true">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
