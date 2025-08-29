"use client";

import { motion } from "framer-motion";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { codeExample } from "@/constants/codeExample";
import { sectionAnimation } from "@/utils/sectionAnimation";

export const SampleSection = () => {
  return (
    <motion.section
      {...sectionAnimation}
      id="sample"
      className="w-full px-4 py-20 sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
            Learn Flutter Visually, Code Instantly.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Demystify complex concepts by seeing the visual result and grabbing
            the Dart code with a single tap. Learning Flutter has never been
            more direct and intuitive.
          </p>
        </div>

        <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="flex justify-center">
            <div className="relative h-[30rem] w-[18rem] rounded-[2.5rem] bg-gradient-to-br from-blue-600 to-cyan-400 p-4 shadow-2xl shadow-blue-500/20">
              <div className="h-full w-full rounded-[1.8rem] bg-zinc-800 p-4">
                <div className="flex h-full w-full items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg">
                  <span className="text-2xl font-bold text-white">
                    Flutter!
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative h-[30rem] overflow-hidden rounded-xl border border-zinc-800 bg-[#282c34]">
            <div className="absolute top-0 left-0 flex w-full items-center gap-2 border-b border-zinc-700 bg-zinc-900 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-red-500"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
              <div className="h-3 w-3 rounded-full bg-green-500"></div>
              <span className="ml-auto text-sm text-zinc-400">
                gradient_card.dart
              </span>
            </div>

            <div className="h-full overflow-y-auto pt-12">
              <SyntaxHighlighter
                language="dart"
                style={atomOneDark}
                customStyle={{
                  backgroundColor: "transparent",
                  fontSize: "14px",
                  padding: "1rem",
                  height: "100%",
                }}
                codeTagProps={{ style: { fontFamily: "var(--font-mono)" } }}
                showLineNumbers
              >
                {codeExample.trim()}
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  );
};
