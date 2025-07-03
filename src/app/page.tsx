"use client";

import { motion } from "framer-motion";
import { ArrowRight, ChevronDown, Code, Sparkles, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { faqs } from "@/constants/faqs";

type Testimonial = {
  name: string;
  handle: string;
  avatar: string;
  comment: string;
};

const CommunityMarquee = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  const extendedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex gap-6"
        animate={{ x: "-100%" }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 40,
            ease: "linear",
          },
        }}
      >
        {extendedTestimonials.map((testimonial, index) => (
          <div
            key={index}
            className="w-[350px] flex-shrink-0 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-lg shadow-black/20 backdrop-blur-sm"
          >
            <div className="flex items-center gap-4">
              <Image
                src={testimonial.avatar}
                alt={testimonial.name}
                width={48}
                height={48}
                className="rounded-full"
              />

              <div>
                <h3 className="font-semibold text-white">{testimonial.name}</h3>
                <p className="text-sm text-zinc-400">{testimonial.handle}</p>
              </div>
            </div>

            <div className="mt-4 flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-yellow-400 text-yellow-400"
                />
              ))}
            </div>

            <p className="mt-6 text-zinc-300">"{testimonial.comment}"</p>
          </div>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-zinc-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-zinc-950 to-transparent" />
    </div>
  );
};

const screenshots = Array.from({ length: 6 }, (_, i) => ({
  src: `/screenshots/flutter_guide_screen_${i + 1}.jpeg`,
  alt: `Flutter Guide screen ${i + 1}`,
}));

export default function Home() {
  const playStoreUrl =
    "https://play.google.com/store/apps/details?id=com.dariomatias.flutter_guide";
  const githubUrl = "https://github.com/dariomatias-dev/flutter_guide_app";

  const features = [
    {
      icon: Sparkles,
      title: "Widget of the Day",
      description:
        "Discover a new widget daily with interactive examples and ready-to-use code.",
    },
    {
      icon: Code,
      title: "UI's & Snippets",
      description:
        "Browse a curated collection of interfaces and code snippets to speed up your development.",
    },
    {
      icon: Star,
      title: "Curated Content",
      description:
        "Learn with practical guides and real-world examples you can apply immediately.",
    },
  ];

  const testimonials: Testimonial[] = [];

  const sectionAnimation = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  };

  const codeExample = `
import 'package:flutter/material.dart';

// A custom card with a gradient and shadow
class GradientCard extends StatelessWidget {
  const GradientCard({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: 200,
      height: 250,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(20),
        gradient: const LinearGradient(
          colors: [Colors.blue, Colors.cyan],
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.blue.withOpacity(0.4),
            blurRadius: 10,
            offset: const Offset(0, 5),
          ),
        ],
      ),
      child: const Center(
        child: Text(
          'Flutter!',
          style: TextStyle(
            color: Colors.white,
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}
  `;

  return (
    <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-zinc-950 text-white">
      {/* Background Glows */}
      <div className="absolute top-0 left-0 -z-10 h-full w-full">
        <div className="absolute top-0 left-[-20rem] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(29,78,216,0.15),_transparent_40%)]" />
        <div className="absolute right-[-20rem] bottom-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle_at_center,_rgba(29,78,216,0.15),_transparent_40%)]" />
      </div>

      <Header />

      {/* Hero Section */}
      <main className="min-h-screen flex-1">
        <section className="relative flex min-h-screen w-full items-center justify-center px-4 text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15,
                },
              },
            }}
            className="flex flex-col items-center"
          >
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mb-4 inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300"
            >
              <Sparkles className="mr-2 h-4 w-4 text-blue-400" />
              The Essential Companion for Flutter Devs
            </motion.div>

            <motion.h1
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-4xl font-extrabold tracking-tighter sm:text-6xl md:text-7xl"
            >
              Master Flutter,{" "}
              <span className="bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent">
                Faster.
              </span>
            </motion.h1>

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mx-auto mt-6 max-w-2xl text-lg text-zinc-400 md:text-xl"
            >
              Learn, practice, and build beautiful, high-performance apps with
              curated content in your pocket.
            </motion.p>

            <motion.div
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row"
            >
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
                className="w-full text-black sm:w-auto"
              >
                <Link
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View on GitHub <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{
                y: [0, 8, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut",
              }}
            >
              <ChevronDown className="h-6 w-6 text-zinc-500" />
            </motion.div>
          </motion.div>
        </section>

        <section id="showcase" className="relative w-full py-24 sm:py-32">
          <div className="mx-auto max-w-screen-xl px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-4xl font-extrabold tracking-tighter text-white sm:text-5xl">
                The App in Action
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
                See how Flutter Guide brings concepts to life with a clean,
                intuitive, and powerful interface.
              </p>
            </motion.div>

            {/* Grid Columns */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              className="relative mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8"
            >
              {/* Column 1 */}
              <div className="space-y-6 lg:space-y-8">
                <ScreenshotCard
                  src={screenshots[0].src}
                  alt={screenshots[0].alt}
                />
                <ScreenshotCard
                  src={screenshots[1].src}
                  alt={screenshots[1].alt}
                />
              </div>

              {/* Column 2 */}
              <div className="hidden space-y-6 sm:block lg:translate-y-24 lg:space-y-8">
                <ScreenshotCard
                  src={screenshots[2].src}
                  alt={screenshots[2].alt}
                />
                <ScreenshotCard
                  src={screenshots[3].src}
                  alt={screenshots[3].alt}
                />
              </div>

              {/* Column 3 */}
              <div className="space-y-6 lg:space-y-8">
                <ScreenshotCard
                  src={screenshots[4].src}
                  alt={screenshots[4].alt}
                />
                <ScreenshotCard
                  src={screenshots[5].src}
                  alt={screenshots[5].alt}
                />
              </div>
            </motion.div>
          </div>

          <div className="pointer-events-none absolute bottom-0 left-0 h-1/3 w-full bg-gradient-to-t from-zinc-950 to-transparent"></div>
        </section>

        {/* --- Features Section --- */}
        <motion.section
          {...sectionAnimation}
          id="features"
          className="w-full px-4 py-20 sm:px-8 md:py-28"
        >
          <div className="mx-auto max-w-screen-xl">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
                A Powerful Toolkit in Your Pocket
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
                Flutter Guide is packed with features designed to accelerate
                your learning and productivity.
              </p>
            </div>

            <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="rounded-2xl bg-gradient-to-b from-zinc-50/10 to-transparent p-px shadow-2xl shadow-blue-900/10"
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
        </motion.section>

        {/* --- Example Section --- */}
        <motion.section
          {...sectionAnimation}
          className="w-full px-4 py-20 sm:px-8 md:py-28"
        >
          <div className="mx-auto max-w-screen-xl">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
                From Example to Implementation, Instantly.
              </h2>

              <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
                See the visual result and grab the Dart code with a single tap.
                Learning Flutter has never been more direct.
              </p>
            </div>

            <div className="mt-16 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Visual Content */}
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

              {/* Code */}
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

        {/* --- Community Section --- */}
        {testimonials.length != 0 && (
          <motion.section
            {...sectionAnimation}
            id="community"
            className="relative w-full py-20 sm:py-28"
          >
            <div className="absolute inset-0 -z-10 flex items-center justify-center">
              <div className="h-[40rem] w-full max-w-screen-lg rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(29,78,216,0.15)_0%,_transparent_50%)]" />
            </div>

            <div className="mx-auto max-w-screen-xl px-4">
              <div className="text-center">
                <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
                  Loved by the Community
                </h2>

                <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
                  See what developers are saying about Flutter Guide.
                </p>
              </div>
            </div>

            <div className="mt-16">
              <CommunityMarquee testimonials={testimonials} />
            </div>
          </motion.section>
        )}

        {/* --- FAQ Section --- */}
        <motion.section
          {...sectionAnimation}
          id="faq"
          className="w-full px-4 py-20 sm:px-8 md:py-28"
        >
          <div className="mx-auto max-w-3xl">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold tracking-tighter sm:text-5xl">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
                Have a question? Find the answer here.
              </p>
            </div>

            <Accordion type="single" collapsible className="mt-12 w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-lg hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="text-base text-zinc-400">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </motion.section>

        {/* --- About Me Section --- */}
        <motion.section
          {...sectionAnimation}
          id="about"
          className="bg-zinc-900/50 py-20 md:py-28"
        >
          <div className="mx-auto max-w-4xl px-4 text-center sm:px-8">
            <Image
              src="/dario-matias-avatar.jpeg"
              alt="Dário Matias"
              width={100}
              height={100}
              className="mx-auto rounded-full"
            />

            <h2 className="mt-8 text-4xl font-extrabold tracking-tighter sm:text-5xl">
              Developer
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-zinc-300">
              I'm <strong>Dário Matias</strong>, a Full Stack developer. Flutter
              Guide is my open source contribution to the community, born out of
              a desire to make high-quality development resources accessible to
              everyone.
            </p>

            <div className="mt-8 flex justify-center gap-4">
              <a
                href="https://dariomatias-dev.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Portfolio"
                className="text-zinc-400 transition-colors hover:text-white"
              >
                Portfolio
              </a>
              <span className="text-zinc-600">|</span>
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
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}

const ScreenshotCard = ({ src, alt }: { src: string; alt: string }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className={`relative overflow-hidden rounded-2xl border-4 border-zinc-800 bg-zinc-900 shadow-2xl shadow-blue-900/20`}
    >
      <Image
        src={src}
        alt={alt}
        width={400}
        height={866}
        className="h-auto w-full"
        priority
      />
    </motion.div>
  );
};
