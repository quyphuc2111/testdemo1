"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";

type MindMapOverviewProps = {
  mindMapFeatures: Array<{ title: string }>;
};

const MindMapOverview: React.FC<MindMapOverviewProps> = (props) => {
  return (
    <div
      className="w-full h-[630px] xl:h-[720px] 2xl:h-[1080px] flex items-center justify-center bg-no-repeat bg-contain"
      style={{ backgroundImage: "url('/images/Mindmap.svg')" }}
    >
      <motion.div
        className="w-full h-full flex justify-center gap-x-14 xl:gap-x-24 2xl:gap-x-64 xl:mt-40"
        initial={{ opacity: 0 }} // Ban đầu ẩn
        whileInView={{ opacity: 1 }} // Khi vào viewport sẽ xuất hiện
        transition={{ duration: 1, ease: "easeInOut" }} // Thời gian và easing
      >
        <section>
          <motion.h1
            className="font-semibold text-[24px] xl:text-[28px]  2xl:text-[36px]"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Mindmap
          </motion.h1>

          <motion.ul
            className="flex flex-col gap-y-5 mt-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {props.mindMapFeatures.map((feature, index) => (
              <motion.li
                key={index}
                className="flex items-center gap-x-2"
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <Image src="/images/gif/gif-12.gif" width={50} height={50} alt="feature-icon" unoptimized />
                <span className="text-[20px] xl:text-[22px] 2xl:text-[34px] font-normal">
                  {feature.title}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        </section>

        <AnimatePresence>
          <div className="rounded-xl overflow-hidden">
            <motion.div
              className="rounded-xl 2xl:w-[680px] 2xl:h-[350px] xl:w-[600px] w-[500px] xl:h-[310px] h-[260px]"
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
                delay: 0.5,
              }}
            >
              <Image
                src="/images/mindmap-1.svg"
                alt="Mindmap"
                width={680}
                height={350}
                className="rounded-xl w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default MindMapOverview;
