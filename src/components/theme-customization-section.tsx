"use client";

import { motion } from "framer-motion";

import { elementAnimation } from "@/utils/sectionAnimation";

export const ThemeCustomizationSection = () => {
  return (
    <motion.section
      {...elementAnimation}
      id="themes"
      className="relative w-full py-20 sm:py-28"
    >
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[40rem] w-full max-w-screen-lg rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(29,78,216,0.15)_0%,_transparent_50%)]" />
      </div>

      <div className="mx-auto max-w-screen-xl px-4">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
            Elevate Your Coding: Choose Your Code Theme
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Personalize your development environment with a selection of popular
            and vibrant code themes, enhancing readability and visual comfort.
          </p>
        </div>

        <div className="mt-16 flex flex-col items-center gap-12 md:flex-row md:justify-center">
          {/* Light theme */}
          <div className="relative h-[30rem] w-[20rem] rounded-xl bg-gradient-to-br from-zinc-200 to-zinc-50 p-px shadow-2xl shadow-blue-500/10">
            <div className="flex h-full w-full flex-col overflow-hidden rounded-[0.7rem] bg-white text-[#24292e]">
              <div className="flex w-full items-center gap-2 rounded-t-[0.7rem] border-b border-[#e1e4e8] bg-[#f6f8fa] px-3 py-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="ml-auto text-sm text-zinc-500">main.dart</span>
              </div>

              <div className="flex-1 space-y-1 px-4 pt-4 font-mono text-sm">
                {" "}
                <div className="flex">
                  <span className="w-6 text-zinc-400">1</span>
                  <span className="text-[#005cc5]">import</span>
                  <span className="ml-1 text-[#e3116c]">
                    &lsquo;package:flutter/material.dart&lsquo;
                  </span>
                  <span className="text-[#24292e]">;</span>
                </div>
                <div className="flex">
                  <span className="w-6 text-zinc-400">2</span>
                </div>
                <div className="flex">
                  <span className="w-6 text-zinc-400">3</span>
                  <span className="text-[#005cc5]">void</span>
                  <span className="ml-1 text-[#6f42c1]">main</span>
                  <span className="text-[#24292e]">() {"{"}</span>
                </div>
                <div className="flex">
                  <span className="w-6 text-zinc-400">4</span>
                  <span className="ml-4 text-[#6f42c1]">runApp</span>
                  <span className="text-[#24292e]">(</span>
                  <span className="text-[#005cc5]">const</span>
                  <span className="ml-1 text-[#22863a]">MyApp</span>
                  <span className="text-[#24292e]">());</span>
                </div>
                <div className="flex">
                  <span className="w-6 text-zinc-400">5</span>
                  <span className="text-[#24292e]">{"}"}</span>
                </div>
                <div className="flex">
                  <span className="w-6 text-zinc-400">6</span>
                </div>
                <div className="flex">
                  <span className="w-6 text-zinc-400">7</span>
                  <span className="text-[#005cc5]">class</span>
                  <span className="ml-1 text-[#22863a]">MyApp</span>
                  <span className="ml-1 text-[#24292e]">extends</span>
                  <span className="ml-1 text-[#22863a]">StatelessWidget</span>
                  <span className="text-[#24292e]">{"{"}</span>
                </div>
                <div className="flex">
                  <span className="w-6 text-zinc-400">8</span>
                  <span className="ml-4 text-[#6a737d]">
                    {"/* ... build method ... */"}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-6 text-zinc-400">9</span>
                  <span className="text-[#24292e]">{"}"}</span>
                </div>
              </div>
              <p className="mt-6 mb-4 px-4 text-center text-2xl font-semibold tracking-tight">
                {" "}
                GitHub Light
              </p>
            </div>
          </div>

          {/* Dark theme */}
          <div className="relative h-[30rem] w-[20rem] rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 p-px shadow-2xl shadow-purple-500/20">
            <div className="flex h-full w-full flex-col overflow-hidden rounded-[0.7rem] bg-[#282a36] text-[#f8f8f2]">
              <div className="flex w-full items-center gap-2 rounded-t-[0.7rem] border-b border-[#3b3e4f] bg-[#21222c] px-3 py-2">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
                <span className="ml-auto text-sm text-zinc-400">main.dart</span>
              </div>

              <div className="flex-1 space-y-1 px-4 pt-4 font-mono text-sm">
                {" "}
                <div className="flex">
                  <span className="w-6 text-zinc-500">1</span>
                  <span className="text-[#ff79c6]">import</span>
                  <span className="ml-1 text-[#f1fa8c]">
                    &lsquo;package:flutter/material.dart&lsquo;
                  </span>
                  <span className="text-[#ff79c6]">;</span>
                </div>
                <div className="flex">
                  <span className="w-6 text-zinc-500">2</span>
                </div>
                <div className="flex">
                  <span className="w-6 text-zinc-500">3</span>
                  <span className="text-[#8be9fd]">void</span>
                  <span className="ml-1 text-[#50fa7b]">main</span>
                  <span className="text-[#f8f8f2]">() {"{"}</span>
                </div>
                <div className="flex">
                  <span className="w-6 text-zinc-500">4</span>
                  <span className="ml-4 text-[#f1fa8c]">runApp</span>
                  <span className="text-[#f8f8f2]">(</span>
                  <span className="text-[#50fa7b]">const</span>
                  <span className="ml-1 text-[#bd93f9]">MyApp</span>
                  <span className="text-[#f8f8f2]">());</span>
                </div>
                <div className="flex">
                  <span className="w-6 text-zinc-500">5</span>
                  <span className="text-[#f8f8f2]">{"}"}</span>
                </div>
                <div className="flex">
                  <span className="w-6 text-zinc-500">6</span>
                </div>
                <div className="flex">
                  <span className="w-6 text-zinc-500">7</span>
                  <span className="text-[#8be9fd]">class</span>
                  <span className="ml-1 text-[#bd93f9]">MyApp</span>
                  <span className="ml-1 text-[#f8f8f2]">extends</span>
                  <span className="ml-1 text-[#bd93f9]">StatelessWidget</span>
                  <span className="text-[#f8f8f2]"> {"{"}</span>
                </div>
                <div className="flex">
                  <span className="w-6 text-zinc-500">8</span>
                  <span className="ml-4 text-[#6272a4]">
                    {"/* ... build method ... */"}
                  </span>
                </div>
                <div className="flex">
                  <span className="w-6 text-zinc-500">9</span>
                  <span className="text-[#f8f8f2]">{"}"}</span>
                </div>
              </div>
              <p className="mt-6 mb-4 px-4 text-center text-2xl font-semibold tracking-tight">
                {" "}
                Dracula
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
