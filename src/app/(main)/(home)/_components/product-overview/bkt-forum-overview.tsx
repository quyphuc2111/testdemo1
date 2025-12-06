"use client";

import { motion } from "motion/react";
import Image from "next/image";

type BKTForumOverviewProps = {
  forumListFeatures: Array<{ title: string }>;
};

const BKTForumOverview: React.FC<BKTForumOverviewProps> = (props) => {
  return (
    <motion.div className="w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
      <motion.div
        className="flex-1 w-full max-w-lg lg:max-w-xl order-1"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50">
          <Image
            src="/images/forum.jpg"
            alt="BKT Forum"
            fill
            className="object-cover hover:scale-105 transition-transform duration-700"
          />
        </div>
      </motion.div>

      <section className="flex-1 order-2">
        <motion.h1
          className="font-bold text-3xl md:text-4xl text-[#004C70] mb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          BKT FORUM
        </motion.h1>

        <motion.ul
          className="flex flex-col gap-y-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          {props.forumListFeatures.map((feature, index) => (
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
      </section>
    </motion.div>
  );
};

export default BKTForumOverview;
