"use client";

import { motion } from "motion/react";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { DURATION_BASE } from "@/shared/motion/durations";

export const Footer = () => {
  const t = useTranslations("Footer");

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: DURATION_BASE }}
      className="border-brand-surface-raised/50 bg-brand-surface w-full border-t px-4"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 py-8 text-center text-sm text-zinc-400 md:flex-row md:text-left">
        <span>{t("rights", { year: new Date().getFullYear() })}</span>

        <div>
          <span>{t("developedBy")} </span>
          <Link
            href="https://dariomatias-dev.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-brand-accent font-medium text-white transition"
          >
            Dário Matias
          </Link>
        </div>
      </div>
    </motion.footer>
  );
};
