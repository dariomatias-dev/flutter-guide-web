"use client";

import { Code, Instagram, Linkedin, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScreenshotsCarousel } from "@/components/ScreenshotsCarousel";

export default function Home() {
  const playStoreUrl =
    "https://play.google.com/store/apps/details?id=com.dariomatias.flutter_guide";

  return (
    <div className="bg-background flex min-h-screen w-full flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full px-4 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="mx-auto flex max-w-screen-md flex-col items-center space-y-8 text-center">
            <Image
              src="/flutter_guide_icon.png"
              alt="Flutter Guide App Icon"
              width={100}
              height={100}
              className="rounded-2xl shadow-lg"
            />
            <h1 className="text-4xl leading-tight font-extrabold tracking-tight text-gray-900 sm:text-6xl dark:text-white">
              Your Guide to Mastering Flutter
            </h1>
            <p className="max-w-prose text-lg text-gray-700 sm:text-xl dark:text-gray-300">
              Learn, practice, and build amazing apps with curated Flutter
              content in your pocket.
            </p>
            <p className="max-w-prose text-base text-gray-600 sm:text-lg dark:text-gray-400">
              Showcase of responsive UIs, smooth animations, optimized
              performance, and seamless API integration — all built with Flutter
              for Android and iOS.
            </p>
            <Button size="lg" asChild>
              <Link
                href={playStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get it on Google Play
              </Link>
            </Button>
          </div>
        </section>

        {/* Screenshots Section */}
        <section
          id="screenshots"
          className="w-full rounded-t-lg border-t border-gray-200 px-4 py-16 md:py-24 dark:border-gray-700"
        >
          <div className="mx-auto w-full max-w-screen-lg space-y-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">
              App Screenshots
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-700 dark:text-gray-300">
              Explore some of the available screens and interface styles in
              Flutter Guide.
            </p>
            <ScreenshotsCarousel />
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="w-full rounded-t-lg border-t border-gray-200 bg-slate-50/50 px-4 py-16 md:py-24 dark:border-gray-700 dark:bg-transparent"
        >
          <div className="mx-auto w-full max-w-screen-lg space-y-10 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl dark:text-white">
                Key Features
              </h2>
              <p className="mx-auto max-w-2xl text-base text-gray-700 sm:text-lg dark:text-gray-300">
                Everything you need to become a skilled Flutter developer.
              </p>
            </div>

            <div className="grid w-full justify-center gap-6 sm:grid-cols-2 md:grid-cols-3">
              <Card className="shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold">
                    Widget of the Day
                  </CardTitle>
                  <Sparkles className="h-5 w-5" />
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Discover a new widget every day with real examples and use
                    cases.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold">
                    Tips & Examples
                  </CardTitle>
                  <Code className="h-5 w-5" />
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Access concise tips and code snippets to improve your
                    productivity.
                  </p>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-lg font-semibold">
                    Practical Guidance
                  </CardTitle>
                  <Star className="h-5 w-5" />
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    Learn with clear, real-world examples to apply in your own
                    projects.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* GitHub Section */}
        <section
          id="github"
          className="w-full rounded-t-lg border-t border-gray-200 px-6 py-20 dark:border-gray-700"
        >
          <div className="mx-auto max-w-screen-md space-y-6 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white">
              Open Source
            </h2>
            <p className="mx-auto max-w-xl text-lg text-gray-700 dark:text-gray-300">
              Explore the codebase, contribute with improvements, or follow
              updates on GitHub.
            </p>

            <Button
              size="lg"
              variant="outline"
              className="px-10 transition hover:bg-gray-100 dark:hover:bg-gray-800"
              asChild
            >
              <Link
                href="https://github.com/dariomatias-dev/flutter_guide_app"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub
              </Link>
            </Button>
          </div>
        </section>

        {/* About Me Section */}
        <section
          id="about"
          className="w-full rounded-t-lg border-t border-gray-200 bg-slate-50/50 dark:border-gray-700 dark:bg-transparent"
        >
          <div className="mx-auto flex max-w-screen-md flex-col items-center justify-center space-y-12 px-6 py-20 text-center md:py-28">
            <h2 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
              About Me
            </h2>

            <div className="space-y-6">
              <p className="max-w-prose text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                I&apos;m Dário Matias, a Full Stack developer with a strong
                focus on Flutter and modern web technologies. I specialize in
                building efficient, scalable applications and crafting
                educational resources for the tech community.
              </p>

              <p className="max-w-prose text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                My work is driven by a commitment to quality, continuous
                learning, and the belief that knowledge should be shared. I aim
                to inspire and support developers around the world.
              </p>
            </div>

            <div className="mt-6 flex items-center gap-6 rounded-xl border bg-white/60 px-6 py-4 shadow-sm dark:bg-white/5">
              <a
                href="https://www.instagram.com/dariomatias_dev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-black transition-transform duration-200 hover:scale-110 hover:opacity-80 dark:text-white"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://www.linkedin.com/in/dariomatias-dev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-black transition-transform duration-200 hover:scale-110 hover:opacity-80 dark:text-white"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
