"use client";

import { ArrowRight, Code, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScreenshotsCarousel } from "@/components/ScreenshotsCarousel";
import { Button } from "@/components/ui/button";

export default function Home() {
  const playStoreUrl =
    "https://play.google.com/store/apps/details?id=com.dariomatias.flutter_guide";
  const githubUrl = "https://github.com/dariomatias-dev/flutter_guide_app";

  const features = [
    {
      icon: Sparkles,
      title: "Widget of the Day",
      description:
        "Discover and master a new widget daily with interactive examples and code snippets.",
      className: "md:col-span-2",
    },
    {
      icon: Code,
      title: "Tips & Tricks",
      description:
        "Boost your workflow with concise, actionable tips from experienced developers.",
    },
    {
      icon: Star,
      title: "Curated Content",
      description:
        "Learn with practical guidance and real-world examples you can apply immediately.",
      className: "md:col-span-3",
    },
  ];

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-zinc-950 text-white">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 -z-10 h-full w-full">
        <div className="absolute top-0 left-[-20rem] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(29,78,216,0.15),_transparent_40%)]" />
        <div className="absolute right-[-20rem] bottom-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(29,78,216,0.15),_transparent_40%)]" />
      </div>

      <Header />

      <main className="flex-1">
        {/* --- Hero Section --- */}
        <section className="w-full px-4 pt-20 pb-20 text-center md:pt-32 md:pb-24">
          <div className="mx-auto max-w-screen-xl">
            <h1 className="text-4xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl">
              Master Flutter Development,{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Faster.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl">
              Learn, practice, and build beautiful, high-performance apps with
              curated content in your pocket.
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" asChild className="w-full sm:w-auto">
                <Link
                  href={playStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Get it on Google Play
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                asChild
                className="w-full sm:w-auto"
              >
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="mt-16 md:mt-24">
              <ScreenshotsCarousel />
            </div>
          </div>
        </section>

        {/* --- Features Section (Bento Grid) --- */}
        <section id="features" className="w-full px-4 py-20 sm:px-8 md:py-28">
          <div className="mx-auto max-w-screen-xl">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
                Everything You Need to Succeed
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
                Flutter Guide is packed with features designed to accelerate
                your learning and building process.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`rounded-2xl bg-gradient-to-b from-zinc-50/10 to-transparent p-px shadow-2xl shadow-blue-900/10 ${feature.className}`}
                >
                  <div className="flex h-full flex-col gap-4 rounded-[15px] bg-zinc-900 p-8">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500">
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>

                    <h3 className="text-2xl font-semibold tracking-tight">
                      {feature.title}
                    </h3>
                    <p className="text-zinc-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- About Me Section --- */}
        <section id="about" className="w-full px-4 py-20 sm:px-8 md:py-28">
          <div className="mx-auto max-w-4xl text-center">
            <Image
              src="/dario-matias-avatar.jpeg"
              alt="Dário Matias"
              width={100}
              height={100}
              className="mx-auto rounded-full"
            />

            <h2 className="mt-8 text-4xl font-extrabold tracking-tighter sm:text-5xl">
              Built with Passion
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
              I'm <strong>Dário Matias</strong>, a Full Stack developer with a
              love for creating beautiful, functional software. Flutter Guide is
              my open-source contribution to the community, born from a desire
              to make high-quality development resources accessible to everyone.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <a
                href="https://www.instagram.com/dariomatias_dev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                className="text-zinc-400 transition-colors hover:text-white"
              >
                Instagram
              </a>

              <span className="text-zinc-600">|</span>

              <a
                href="https://www.linkedin.com/in/dariomatias-dev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="text-zinc-400 transition-colors hover:text-white"
              >
                LinkedIn
              </a>

              <span className="text-zinc-600">|</span>

              <a
                href="https://github.com/dariomatias-dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="text-zinc-400 transition-colors hover:text-white"
              >
                GitHub
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
