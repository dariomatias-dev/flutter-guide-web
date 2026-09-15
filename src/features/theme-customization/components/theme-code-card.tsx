"use client";

import { motion } from "motion/react";

import { cardItemVariants } from "@/shared/motion/card-item-variants";

interface ThemeCodeCardProps {
  html: string;
  label: string;
  variant: "light" | "dark";
}

export const ThemeCodeCard = ({ html, label, variant }: ThemeCodeCardProps) => {
  const isLight = variant === "light";

  return (
    <motion.div
      variants={cardItemVariants}
      className={`relative h-120 w-92 rounded-xl p-px shadow-2xl ${
        isLight
          ? "bg-linear-to-br from-zinc-200 to-zinc-50 shadow-blue-500/10"
          : "bg-linear-to-br from-zinc-800 to-zinc-950 shadow-purple-500/20"
      }`}
    >
      <div
        className={`flex h-full w-full flex-col overflow-hidden rounded-[0.7rem] ${
          isLight ? "bg-white text-[#24292e]" : "bg-[#282a36] text-[#f8f8f2]"
        }`}
      >
        <div
          className={`flex w-full items-center gap-2 rounded-t-[0.7rem] border-b px-3 py-2 ${
            isLight ? "border-[#e1e4e8] bg-[#f6f8fa]" : "border-[#3b3e4f] bg-[#21222c]"
          }`}
        >
          <div className="h-3 w-3 rounded-full bg-red-500"></div>
          <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
          <div className="h-3 w-3 rounded-full bg-green-500"></div>
          <span className={`ml-auto text-sm ${isLight ? "text-zinc-500" : "text-zinc-400"}`}>
            main.dart
          </span>
        </div>

        <div
          className="theme-code-card__code flex-1 overflow-x-auto overflow-y-hidden px-4 pt-4 font-mono text-xs [&_pre]:bg-transparent!"
          dangerouslySetInnerHTML={{ __html: html }}
        />

        <p className="mt-6 mb-4 px-4 text-center text-2xl font-semibold tracking-tight">{label}</p>
      </div>
    </motion.div>
  );
};
