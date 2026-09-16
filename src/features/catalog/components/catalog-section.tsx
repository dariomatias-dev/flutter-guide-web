"use client";

import { Code2, Layers, LayoutTemplate, Package, Puzzle } from "lucide-react";
import { motion } from "motion/react";
import { useTranslations } from "next-intl";

import { catalogStats, catalogTotal } from "@/shared/lib/catalog-stats";
import { cardItemVariants } from "@/shared/motion/card-item-variants";
import { cardsContainerVariants } from "@/shared/motion/cards-container-variants";
import { headerVariants } from "@/shared/motion/header-variants";
import { textItemVariants } from "@/shared/motion/text-item-variants";

const stats = [
  { icon: Layers, count: catalogStats.widgets, labelKey: "widgets" },
  { icon: Package, count: catalogStats.packages, labelKey: "packages" },
  { icon: Code2, count: catalogStats.functions, labelKey: "functions" },
  { icon: Puzzle, count: catalogStats.elements, labelKey: "elements" },
  { icon: LayoutTemplate, count: catalogStats.uis, labelKey: "uis" },
] as const;

export const CatalogSection = () => {
  const t = useTranslations("Catalog");

  return (
    <section id="catalog" className="w-full px-4 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-5xl">
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
            {t("subtitle", { count: catalogTotal })}
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-6"
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map(({ icon: Icon, count, labelKey }) => (
            <motion.div
              key={labelKey}
              variants={cardItemVariants}
              className="border-brand-surface-raised bg-brand-surface-elevated/50 flex w-40 flex-col items-center gap-3 rounded-xl border px-6 py-8 text-center shadow-lg"
            >
              <Icon className="text-brand-accent h-8 w-8" />
              <span className="text-3xl font-bold text-white">{count}</span>
              <span className="text-sm text-zinc-400">{t(labelKey)}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
