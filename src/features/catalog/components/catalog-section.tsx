"use client";

import { Code2, Layers, LayoutTemplate, Package, Puzzle } from "lucide-react";
import { motion } from "motion/react";

import { catalogStats, catalogTotal } from "@/shared/lib/catalog-stats";
import { cardItemVariants } from "@/shared/motion/card-item-variants";
import { cardsContainerVariants } from "@/shared/motion/cards-container-variants";
import { headerVariants } from "@/shared/motion/header-variants";
import { textItemVariants } from "@/shared/motion/text-item-variants";

const stats = [
  { icon: Layers, count: catalogStats.widgets, label: "Widgets" },
  { icon: Package, count: catalogStats.packages, label: "Packages" },
  { icon: Code2, count: catalogStats.functions, label: "Functions" },
  { icon: Puzzle, count: catalogStats.elements, label: "Elements" },
  { icon: LayoutTemplate, count: catalogStats.uis, label: "UIs" },
];

export const CatalogSection = () => {
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
            A Catalog That Keeps Growing
          </motion.h2>

          <motion.p
            variants={textItemVariants}
            className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400"
          >
            {catalogTotal}+ ready-to-use components, organized by category.
          </motion.p>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-wrap justify-center gap-6"
          variants={cardsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map(({ icon: Icon, count, label }) => (
            <motion.div
              key={label}
              variants={cardItemVariants}
              className="border-brand-surface-raised bg-brand-surface-elevated/50 flex w-40 flex-col items-center gap-3 rounded-xl border px-6 py-8 text-center shadow-lg"
            >
              <Icon className="text-brand-accent h-8 w-8" />
              <span className="text-3xl font-bold text-white">{count}</span>
              <span className="text-sm text-zinc-400">{label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
