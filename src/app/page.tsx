"use client";

import { Code, Instagram, Linkedin, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ScreenshotsCarousel } from "@/components/ScreenshotsCarousel";
import { Button } from "@/components/ui/button";

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

        {/* How It Works */}
        <section
          id="how-it-works"
          aria-labelledby="how-it-works-title"
          className="flex h-screen w-full flex-col justify-center border-t border-gray-300 bg-gradient-to-tr from-gray-50 via-white to-gray-50 px-12 py-28 dark:border-gray-700 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900"
        >
          <div className="mx-auto max-w-5xl text-center">
            <h2
              id="how-it-works-title"
              tabIndex={0}
              className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100"
            >
              How It Works
            </h2>
            <p className="mx-auto mb-16 max-w-3xl text-xl font-medium text-gray-700 dark:text-gray-300">
              Learn Flutter step-by-step with daily widgets, concise tips, and
              practical examples you can apply right away.
            </p>

            <div className="grid grid-cols-1 gap-14 sm:grid-cols-3">
              {[
                {
                  icon: Sparkles,
                  title: "Widget of the Day",
                  description:
                    "Discover and practice a new widget every day with code and usage tips.",
                  iconColor: "text-[#02569B]",
                },
                {
                  icon: Code,
                  title: "Tips & Tricks",
                  description:
                    "Access concise tips and code snippets to improve your productivity.",
                  iconColor: "text-[#02569B]",
                },
                {
                  icon: Star,
                  title: "Practical Guidance",
                  description:
                    "Learn with clear, real-world examples to apply in your own projects.",
                  iconColor: "text-[#02569B]",
                },
              ].map(({ icon: Icon, title, description, iconColor }) => (
                <article
                  key={title}
                  className="hover:shadow-4xl flex cursor-default flex-col items-center rounded-3xl bg-white p-10 shadow-2xl transition-shadow duration-400 dark:bg-gray-800"
                  tabIndex={0}
                  aria-label={title}
                >
                  <Icon
                    className={`mb-6 h-14 w-14 ${iconColor} drop-shadow-md`}
                    aria-hidden="true"
                  />
                  <h3 className="mb-4 text-3xl font-semibold">{title}</h3>
                  <p className="max-w-xs text-center text-lg leading-relaxed text-gray-600 dark:text-gray-400">
                    {description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshots */}
        <section
          id="screenshots"
          aria-labelledby="screenshots-title"
          className="flex h-screen w-full flex-col justify-center border-t border-gray-200 px-6 py-28 sm:px-12 dark:border-gray-900 bg-white dark:bg-gray-950"
        >
          <div className="mx-auto max-w-6xl text-center">
            <h2
              id="screenshots-title"
              tabIndex={0}
              className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white"
            >
              App Screenshots
            </h2>
            <p className="mx-auto mb-14 max-w-3xl text-lg font-medium text-gray-600 sm:text-xl dark:text-gray-300">
              Get a real look into the app's polished interface and experience
              how intuitive Flutter learning can be.
            </p>
            <ScreenshotsCarousel />
          </div>
        </section>

        {/* GitHub */}
        <section
          id="github"
          aria-labelledby="github-title"
          className="w-full border-t border-gray-200 bg-gradient-to-r from-gray-50 via-white to-gray-50 px-6 py-28 sm:px-12 dark:border-gray-700 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900"
        >
          <div className="mx-auto max-w-4xl space-y-10 text-center">
            <h2
              id="github-title"
              tabIndex={0}
              className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white"
            >
              Open Source & Contributions
            </h2>

            <p className="mx-auto max-w-2xl text-lg font-medium text-gray-600 sm:text-xl dark:text-gray-300">
              Flutter Guide is 100% open source. Follow updates, fork the repo,
              or contribute to make it even better.
            </p>

            <Button
              asChild
              className="inline-flex items-center justify-center rounded-3xl border border-[#1565C0] bg-transparent px-7 py-5 text-sm font-bold text-[#1565C0] transition-all duration-300 hover:bg-[#1565C0] hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1565C0]/50 dark:border-[#1565C0] dark:text-[#1565C0] dark:hover:bg-[#1565C0] dark:hover:text-white dark:focus-visible:ring-[#1565C0]/80"
            >
              <Link
                href="https://github.com/dariomatias-dev/flutter_guide_app"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View Flutter Guide App repository on GitHub"
              >
                View on GitHub
              </Link>
            </Button>
          </div>
        </section>

        {/* About Me */}
        <section
          id="about"
          aria-labelledby="about-title"
          className="w-full border-t border-gray-200 px-6 py-32 sm:px-16 dark:border-gray-900 bg-white dark:bg-gray-950"
        >
          <div className="mx-auto max-w-4xl space-y-16 text-center">
            <h2
              id="about-title"
              tabIndex={0}
              className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl"
            >
              About the Creator
            </h2>

            <div className="space-y-8 max-w-3xl mx-auto">
              <p className="text-lg sm:text-xl font-semibold leading-relaxed text-gray-800 dark:text-gray-300">
                I'm <strong>Dário Matias</strong>, a Full Stack developer specializing in
                <span className="text-[#02569B] font-bold"> Flutter</span> and modern frontend
                technologies. I'm passionate about building meaningful software and helping others
                grow through educational content.
              </p>

              <p className="text-lg sm:text-xl font-semibold leading-relaxed text-gray-800 dark:text-gray-300">
                Flutter Guide was born from my desire to simplify learning and
                make high-quality resources accessible to everyone.
              </p>
            </div>

            <div className="mt-12 flex justify-center gap-6">
              {/* Instagram */}
              <a
                href="https://www.instagram.com/dariomatias_dev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile"
                className="flex items-center justify-center h-10 w-10 rounded-full border border-[#1565C0] bg-transparent text-[#1565C0] shadow-md transition duration-300 ease-in-out hover:bg-[#1565C0] hover:text-white dark:border-[#1565C0] dark:text-[#1565C0] dark:hover:bg-[#1565C0] dark:hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1565C0]/50 focus-visible:ring-opacity-80 cursor-pointer"
              >
                <Instagram className="h-5 w-5" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://www.linkedin.com/in/dariomatias-dev/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="flex items-center justify-center h-10 w-10 rounded-full border border-[#1565C0] bg-transparent text-[#1565C0] shadow-md transition duration-300 ease-in-out hover:bg-[#1565C0] hover:text-white dark:border-[#1565C0] dark:text-[#1565C0] dark:hover:bg-[#1565C0] dark:hover:text-white focus:outline-none focus-visible:ring-4 focus-visible:ring-[#1565C0]/50 focus-visible:ring-opacity-80 cursor-pointer"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
