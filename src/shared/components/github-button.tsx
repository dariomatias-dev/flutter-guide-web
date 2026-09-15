"use client";

import { ArrowRight } from "lucide-react";
import { motion } from "motion/react";
import Link from "next/link";

import { githubUrl } from "@/shared/lib/site";

export const GithubButton = () => {
  return (
    <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
      <motion.span className="group border-brand-surface-raised bg-brand-surface-raised/50 hover:border-brand-accent/50 flex w-full items-center justify-center gap-2 rounded-full border px-8 py-3 text-base font-medium text-zinc-300 backdrop-blur-sm transition-colors hover:text-white sm:w-auto">
        View on GitHub
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </motion.span>
    </Link>
  );
};
