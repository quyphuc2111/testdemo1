"use client";

import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
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

  return (
    <div className="w-full py-20 xl:py-32 bg-linear-to-b from-white to-slate-50">
      <div className="container mx-auto px-4 md:px-8 xl:px-20">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center font-bold text-3xl md:text-5xl text-[#004C70] mb-12 md:mb-20"
        >
          Tại sao nên lựa chọn BKT EDU
        </motion.h1>

        {/* Tabs - Scrollable on mobile */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="bg-white p-1 rounded-full shadow-lg border border-slate-100 flex overflow-x-auto max-w-full no-scrollbar">
            {tabList.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-3 rounded-full text-sm md:text-lg font-semibold transition-colors duration-300 min-w-max z-10 ${
                  activeTab === tab
                    ? "text-white"
                    : "text-gray-500 hover:text-orange-500"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#FFA726] rounded-full -z-10 shadow-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                {props.whyUsListFeatures[tab].parentTitle}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab as string}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
          >
            {/* Text Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-x-12 md:gap-y-16 order-2 lg:order-1">
              {props.whyUsListFeatures[activeTab].content.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col gap-4 justify-center items-center"
                >
                  <div className="w-12 h-12 relative">
                    <Image
                      src={item.icon}
                      fill
                      alt={item.title}
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-xl font-bold text-[#004C70]">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-justify leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Main Image */}
            <div className="flex justify-center order-1 lg:order-2">
              <motion.div
                className="relative w-64 h-64 md:w-80 md:h-80 xl:w-96 xl:h-96 rounded-full p-4"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  background:
                    "radial-gradient(circle, rgba(212,235,217,1) 0%, rgba(127,196,140,1) 100%)",
                }}
              >
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white shadow-2xl">
                  <Image
                    src={props.whyUsListFeatures[activeTab].image}
                    alt="Feature"
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default WhyUsOverview;
