"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

import { Testimonial } from "@/@types/Testimonial";
import { AboutMeSection } from "@/components/AboutMeSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs } from "@/constants/faqs";
import { sectionAnimation } from "@/utils/sectionAnimation";

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
  const testimonials: Testimonial[] = [];

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

      <main className="min-h-screen flex-1">
        <HeroSection />

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

        <FeaturesSection />

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

        <AboutMeSection />
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
