"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

import { testimonials } from "@/constants/testimonials";

export const CommunityMarquee = () => {
  const extendedTestimonials = [...testimonials, ...testimonials];

  return (
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex gap-6"
        animate={{ x: "-50%" }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
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

            <p className="mt-6 text-zinc-300">
              &quot;{testimonial.comment}&quot;
            </p>
          </div>
        ))}
      </motion.div>

      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-gradient-to-r from-zinc-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-gradient-to-l from-zinc-950 to-transparent" />
    </div>
  );
};
