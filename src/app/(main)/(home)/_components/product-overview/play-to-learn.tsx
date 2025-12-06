"use client";

import { motion } from "motion/react";
import Image from "next/image";
import TypingEffect from "@/components/animations/typing-effect";

type PlayToLearnProps = {
  playToLearnListFeatures: Array<{ title: string }>;
};

const PlayToLearn: React.FC<PlayToLearnProps> = (props) => {
  return (
    <div className="w-full bg-[#FAFAFA] py-20 xl:py-32">
      <div className="container mx-auto px-4 md:px-8 xl:px-20 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Content Left */}
        <motion.section
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="order-2 lg:order-1"
        >
          <div>
            <h1 className="font-bold text-3xl md:text-5xl text-[#004C70] mb-8">
              <TypingEffect
                text="Play to learn"
                speed={100}
                typingDelay={500}
                className="inline-block"
              />
            </h1>
          </div>

          <motion.ul
            className="flex flex-col gap-y-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {props.playToLearnListFeatures.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-x-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
              >
                <motion.div
                  className="w-12 h-12 relative shrink-0"
                  whileHover={{ rotate: 15, scale: 1.1 }}
                >
                  <Image
                    src="/images/gif/gif-12.gif"
                    fill
                    alt="feature-icon"
                    className="object-contain"
                    unoptimized
                  />
                </motion.div>
                <p className="text-lg md:text-xl text-slate-700 font-medium">
                  {feature.title}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.section>

        {/* Image Right */}
        <motion.div
          className="order-1 lg:order-2 w-full"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <Image
              src="/images/playtolearn.jpg"
              alt="Play to learn"
              fill
              className="object-cover"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PlayToLearn;
