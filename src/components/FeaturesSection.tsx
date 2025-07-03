import { motion } from "framer-motion";

import { features } from "@/constants/features";
import { sectionAnimation } from "@/utils/sectionAnimation";

export const FeaturesSection = () => {
  return (
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
            Flutter Guide is packed with features designed to accelerate your
            learning and productivity.
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
  );
};
