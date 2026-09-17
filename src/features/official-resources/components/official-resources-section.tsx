"use client";

import { BookOpen, Package, SquarePlay } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { cardItemVariants } from "@/shared/motion/card-item-variants";
import { cardsContainerVariants } from "@/shared/motion/cards-container-variants";
import { headerVariants } from "@/shared/motion/header-variants";
import { textItemVariants } from "@/shared/motion/text-item-variants";

// Each card's colors mirror that platform's own brand (Flutter blue,
// pub.dev cyan, YouTube red), not our own design tokens.
const resources = [
  {
    href: "https://docs.flutter.dev/",
    icon: BookOpen,
    key: "documentation",
    hover: "hover:border-blue-700 hover:bg-blue-900/20",
    iconClassName: "bg-blue-600/20 text-blue-400",
  },
  {
    href: "https://pub.dev/",
    icon: Package,
    key: "pubDev",
    hover: "hover:border-cyan-700 hover:bg-cyan-900/20",
    iconClassName: "bg-cyan-600/20 text-cyan-400",
  },
  {
    href: "https://www.youtube.com/@flutterdev",
    icon: SquarePlay,
    key: "youtube",
    hover: "hover:border-red-700 hover:bg-red-900/20",
    iconClassName: "bg-red-600/20 text-red-400",
  },
] as const;

export const OfficialResourcesSection = () => {
  const t = useTranslations("OfficialResources");

  return (
    <section id="official-resources" className="w-full px-4 py-20 sm:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
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
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
          variants={cardsContainerVariants}
          initial={false}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {resources.map(({ href, icon: Icon, key, hover, iconClassName }) => (
            <motion.div key={key} variants={cardItemVariants}>
              <Link href={href} target="_blank" rel="noopener noreferrer" className="block">
                <div
                  className={`flex h-full flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center shadow-lg transition-all ${hover}`}
                >
                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-full ${iconClassName}`}
                  >
                    <Icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                    {t(`${key}.title`)}
                  </h3>
                  <p className="mt-2 text-zinc-400">{t(`${key}.description`)}</p>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
