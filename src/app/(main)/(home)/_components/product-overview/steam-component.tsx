"use client";

import { motion } from "motion/react";
import Image from "next/image";
import TypingEffect from "@/components/animations/typing-effect";

type steamComponentProps = {
  stemListFeatures: Array<{ title: string }>;
};

const StemOverview: React.FC<steamComponentProps> = (props) => {
  return (
    <div className="w-full bg-white py-20 xl:py-32">
      <div className="container mx-auto px-4 md:px-8 xl:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Image Left */}
        <motion.div
          className="w-full order-1"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-50">
            <Image
              src="/images/stem-1.svg"
              alt="STEM"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Content Right */}
        <motion.section
          className="order-2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-bold text-3xl md:text-5xl text-[#004C70] mb-8">
            <TypingEffect
              text="STEM"
              speed={100}
              typingDelay={500}
              className="inline-block"
            />
          </h1>

          <motion.ul
            className="flex flex-col gap-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {props.stemListFeatures.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-x-4"
                initial={{ opacity: 0, x: 50 }} // Slide from right
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <div className="w-12 h-12 relative shrink-0">
                  <Image
                    src="/images/gif/gif-12.gif"
                    fill
                    alt="feature-icon"
                    className="object-contain"
                    unoptimized
                  />
                </div>
                <span className="text-lg md:text-xl text-slate-700 font-medium">
                  {feature.title}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>
      </div>
    </div>
  );
};

export default StemOverview;
