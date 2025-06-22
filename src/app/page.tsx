"use client";

import { Code, Sparkles, Star } from "lucide-react";
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
        {/* App Icon + Hero Section */}
        <section className="flex items-center justify-center px-4 pt-10 pb-12 md:py-20">
          <div className="flex max-w-screen-md flex-col items-center space-y-6 text-center">
            {/* App Icon */}
            <Image
              src="/flutter_guide_icon.png"
              alt="Flutter Guide App Icon"
              width={96}
              height={96}
              className="rounded-2xl shadow-md"
            />

            <h1 className="text-3xl leading-tight font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              Your Guide to Mastering Flutter
            </h1>

            <p className="text-lg sm:text-xl">
              Learn, practice, and build amazing apps with the best Flutter
              content, right in your pocket.
            </p>

            <p className="text-md max-w-prose sm:text-lg">
              An app developed to showcase the potential and versatility of
              Flutter. Highlights include responsive interfaces, smooth
              animations, optimized performance, and seamless API integration.
              Built to demonstrate how Flutter enables efficient and visually
              appealing apps for both Android and iOS using a single codebase.
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
          className="flex items-center justify-center px-4 py-12 md:py-20"
        >
          <div className="w-full max-w-screen-lg space-y-8 text-center">
            <h2 className="text-3xl font-bold md:text-4xl">App Screenshots</h2>
            <p className="text-muted-foreground mx-auto max-w-2xl">
              Take a look at some of the screens available in Flutter Guide.
            </p>

            <ScreenshotsCarousel />
          </div>
        </section>

        {/* Features Section */}
        <section
          id="features"
          className="flex items-center justify-center bg-slate-50/50 px-4 py-10 md:py-16 lg:py-20 dark:bg-transparent"
        >
          <div className="flex w-full max-w-screen-lg flex-col items-center space-y-10 text-center">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold sm:text-4xl">Key Features</h2>

              <p className="mx-auto max-w-2xl text-base sm:text-lg">
                Everything you need to become a skilled Flutter developer.
              </p>
            </div>

            <div className="grid w-full justify-center gap-6 sm:grid-cols-2 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Widget of the Day
                  </CardTitle>
                  <Sparkles className="h-5 w-5" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Explore a new Flutter widget daily, complete with a
                    practical example.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Tips & Examples
                  </CardTitle>
                  <Code className="h-5 w-5" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Get concise coding tips and practical snippets to enhance
                    your Flutter projects.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">
                    Practical Guidance
                  </CardTitle>
                  <Star className="h-5 w-5" />
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Benefit from straightforward guides designed to improve your
                    Flutter development workflow.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* GitHub Section */}
        <section
          id="github"
          className="flex items-center justify-center px-6 py-16"
        >
          <div className="max-w-screen-md w-full mx-auto p-12 text-center">
            <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4">
              Open Source
            </h2>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-xl mx-auto mb-8">
              Explore the source code, contribute, or follow updates on the official GitHub repository.
            </p>

            <Button
              size="lg"
              variant="outline"
              className="mx-auto px-10 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
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
      </main>

      <Footer />
    </div>
  );
}
