"use client";

import { motion } from "framer-motion";
import { BookOpen, Package, Youtube } from "lucide-react";
import Link from "next/link";

import { elementAnimation } from "@/utils/sectionAnimation";

export const OfficialResourcesSection = () => {
  return (
    <motion.section
      {...elementAnimation}
      id="official-resources"
      className="w-full px-4 py-20 sm:px-8 md:py-28"
    >
      <div className="mx-auto max-w-screen-xl">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
            Your Hub for Official Flutter Resources
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Connect directly with the source of knowledge. Access official
            documentation, explore packages on pub.dev, and watch tutorials on
            the official Flutter YouTube channel.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
          <Link
            href="https://docs.flutter.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center shadow-lg transition-all hover:border-blue-700 hover:bg-blue-900/20">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/20 text-blue-400">
                <BookOpen className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                Official Documentation
              </h3>
              <p className="mt-2 text-zinc-400">
                Explore guides, APIs, and examples to master Flutter.
              </p>
            </div>
          </Link>

          <Link
            href="https://pub.dev/"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center shadow-lg transition-all hover:border-cyan-700 hover:bg-cyan-900/20">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-600/20 text-cyan-400">
                <Package className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                pub.dev Packages
              </h3>
              <p className="mt-2 text-zinc-400">
                Find and utilize thousands of community packages.
              </p>
            </div>
          </Link>

          <Link
            href="https://www.youtube.com/@flutterdev"
            target="_blank"
            rel="noopener noreferrer"
            className="block"
          >
            <div className="flex h-full flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center shadow-lg transition-all hover:border-red-700 hover:bg-red-900/20">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-red-600/20 text-red-400">
                <Youtube className="h-8 w-8" />
              </div>
              <h3 className="mt-6 text-2xl font-semibold tracking-tight">
                YouTube Channel
              </h3>
              <p className="mt-2 text-zinc-400">
                Watch tutorials, news, and official Flutter events.
              </p>
            </div>
          </Link>
        </div>
      </div>
    </motion.section>
  );
};
