"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { githubUrl } from "@/constants/constants";

export const GithubButton = () => {
  return (
    <Link href={githubUrl} target="_blank" rel="noopener noreferrer">
      <motion.button className="group flex w-full items-center justify-center gap-2 rounded-full border border-zinc-700 bg-zinc-800/50 px-8 py-3 text-base font-medium text-zinc-300 backdrop-blur-sm transition-colors hover:border-zinc-500 hover:text-white sm:w-auto">
        View on GitHub
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
      </motion.button>
    </Link>
  );
};
