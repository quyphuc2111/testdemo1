"use client";


import { motion } from "motion/react";
import { useState } from "react";

type WhyUsOverviewProps = {
  whyUsListFeatures: Record<
    string,
    {
      image: string;
      parentTitle: string;
      content: { icon: string; title: string; description: string }[];
    }
  >;
};

const WhyUsOverview: React.FC<WhyUsOverviewProps> = (props) => {
  const [activeTab, setActiveTab] =
    useState<keyof typeof props.whyUsListFeatures>("school");

  const tabList = Object.keys(props.whyUsListFeatures);

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div className="flex flex-col gap-y-20 h-[1180px]">
      <motion.h1
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{
          type: "spring",
          duration: 1, // Giữ thời gian hợp lý
          stiffness: 300,
          damping: 20, // Giảm dao động
        }}
        className="text-center font-normal text-[48px] mt-32"
      >
        Tại sao nên lựa chọn BKT EDU
      </motion.h1>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.8 }}
        transition={{
          duration: 0.7,
          ease: [0.25, 0.1, 0.25, 1],
        }}
        className="flex justify-center"
      >
        <ul className="relative flex justify-center w-max shadow-lg rounded-[30px] bg-white overflow-hidden border border-gray-50">
          {tabList.map((tab, index) => (
            <motion.li
              key={index}
              className={`hover:cursor-pointer w-[185px] h-[65px] text-[24px] flex justify-center items-center transition-all duration-300 relative z-10 ${activeTab === tab
                ? "text-white font-semibold"
                : "text-[#FFA726]"
                }`}
              onClick={() => setActiveTab(tab)}
            >
              {props.whyUsListFeatures[tab].parentTitle}
            </motion.li>
          ))}

          {/* Animated Background */}
          <motion.div
            className="absolute top-0 left-0 h-full w-[185px] bg-[#FFA726] rounded-[30px] shadow-md"
            animate={{
              x: tabList.indexOf(activeTab) * 185, // Chuyển động dựa trên vị trí tab
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
          />
        </ul>
      </motion.div>

      {/* content */}
      {props.whyUsListFeatures[activeTab] && (
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          viewport={{ amount: 0.05 }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.1, 0.25, 1],
          }}
          className="flex items-center justify-between gap-x-24 px-10 xl:px-20 2xl:px-32 "
        >
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-2 grid-rows-2 gap-x-16 gap-y-16 w-[75%]"
          >
            {props.whyUsListFeatures[activeTab].content.map(
              (content, index) => (
                <motion.div
                  key={index}
                  variants={childVariants}
                  className="flex flex-col gap-y-2"
                >
                  <img
                    loading="lazy"
                    src={content.icon}
                    alt={content.title}
                    width={50}
                    height={50}
                  />
                  <h1 className="font-semibold text-[20px] 2xl:text-[32px]">
                    {content.title}
                  </h1>
                  <p className="font-normal text-[20px] 2xl:text-[24px] text-justify">
                    {content.description}
                  </p>
                </motion.div>
              )
            )}
          </motion.div>

          {/* Image Container with Gradient */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.7,
              ease: [0.25, 0.1, 0.25, 1],
              delay: 0.3,
            }}
          className="xl:w-[260px] xl:h-[240px] 2xl:w-[300px] 2xl:h-[280px] rounded-full flex justify-center items-center"
          style={{
            backgroundImage:
              "radial-gradient(100% 100% at 100% 50%, #d4ebd9 0%, #aad8b2 36.55%, #8dcb98 79.33%, #7fc48c 100%)",
          }}
          >
            <img
              loading="lazy"
              src={props.whyUsListFeatures[activeTab].image}
              alt={`${activeTab} image`}
              width={256}
              height={256}
            />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default WhyUsOverview;
