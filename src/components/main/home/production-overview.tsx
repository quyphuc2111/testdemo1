import { useState } from "react";
import {
  lmsListFeatures,
  forumListFeatures,
  mindMapFeatures,
  whyUsListFeatures,
} from "../../../contants/overview-list";
import { motion } from "motion/react";

const ProductionOverview = () => {
  const [activeTab, setActiveTab] =
    useState<keyof typeof whyUsListFeatures>("school");

  const tabList = Object.keys(whyUsListFeatures);

  return (
    <>
      <div className="w-full h-max bg-lms-background bg-no-repeat bg-contain flex flex-col gap-y-96 items-center">
        {/* LMS - 1 */}
        <motion.div className="w-max flex items-center gap-x-64 mt-48">
          <section className=" ">
            <h1 className="font-semibold text-[36px]">
              Quản lý dạy học và thi trực tuyến LMS
            </h1>
            <ul className="flex flex-col gap-y-5 mt-4">
              {lmsListFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-x-2">
                  <img src="/gif/gif-12.gif" width={50} height={50} />
                  <p className="text-[34px] font-normal">{feature.title}</p>
                </li>
              ))}
            </ul>
          </section>
          <img src="/lms-1.svg" width={700} height={531} />
        </motion.div>

        {/* BKT Forum */}
        <motion.div className="w-max h-max flex items-center gap-x-64 mt-56">
          <img src="/forum-1.svg" width={700} height={531} />
          <section className=" ">
            <h1 className="font-semibold text-[36px]">BKT FORUM</h1>
            <ul className="flex flex-col gap-y-5 mt-4">
              {forumListFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-x-2">
                  <img src="/gif/gif-12.gif" width={50} height={50} />
                  <span className="text-[34px] font-normal">
                    {feature.title}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </motion.div>
      </div>

      {/* Play and Learn */}
      <motion.div className="w-full h-[1080px] flex items-center justify-center gap-x-64  mt-60 bg-play-and-learn-background bg-no-repeat bg-contain">
        <section className=" ">
          <h1 className="font-semibold text-[36px]">Learn to game</h1>
          <ul className="flex flex-col gap-y-5 mt-4">
            {forumListFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-x-2">
                <img src="/gif/gif-12.gif" width={50} height={50} />
                <span className="text-[34px] font-normal">{feature.title}</span>
              </li>
            ))}
          </ul>
        </section>

        <img src="/playtolearn-1.svg" width={700} height={531} />
      </motion.div>

      {/* STEM */}
      <motion.div className="w-full h-[1080px] flex items-center justify-center gap-x-64  bg-stem-background bg-no-repeat bg-contain">
        <img src="/stem-1.svg" width={700} height={531} />
        <section className="-translate-y-12 ">
          <h1 className="font-semibold text-[36px]">STEM</h1>
          <ul className="flex flex-col gap-y-5 mt-4 ">
            {forumListFeatures.map((feature, index) => (
              <li key={index} className="flex items-center gap-x-2">
                <img src="/gif/gif-12.gif" width={50} height={50} />
                <span className="text-[34px] font-normal">{feature.title}</span>
              </li>
            ))}
          </ul>
        </section>
      </motion.div>

      {/* Mind map*/}
      <div className="w-full h-[1080px] flex items-center justify-center bg-mindmap-background bg-no-repeat bg-contain">
        <motion.div className="w-full h-full flex items-center justify-center gap-x-64">
          <section className="  ">
            <h1 className="font-semibold text-[36px]">Mindmap</h1>
            <ul className="flex flex-col gap-y-5 mt-4 ">
              {mindMapFeatures.map((feature, index) => (
                <li key={index} className="flex items-center gap-x-2">
                  <img src="/gif/gif-12.gif" width={50} height={50} />
                  <span className="text-[34px] font-normal">
                    {feature.title}
                  </span>
                </li>
              ))}
            </ul>
          </section>
          <img src="/mindmap-1.svg" width={700} height={531} />
        </motion.div>
      </div>

      {/* Why US */}
      <motion.div className="flex flex-col gap-y-20 h-[1180px]">
        <h1 className="text-center font-normal text-[48px] mt-32">
          Tại sao nên lựa chọn BKT EDU
        </h1>

        {/* tabs */}
        <div className="flex justify-center">
          <ul className="relative flex justify-center w-max shadow-lg rounded-[30px] bg-white overflow-hidden border border-gray-50">
            {tabList.map((tab, index) => (
              <li
                key={index}
                className={`hover:cursor-pointer w-[185px] h-[65px] text-[24px] flex justify-center items-center transition-all duration-300 relative z-10 ${
                  activeTab === tab ? "text-white" : "text-[#FFA726]"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {whyUsListFeatures[tab].parentTitle}
              </li>
            ))}
            {/* Animated Background */}
            <div
              className="absolute top-0 left-0 h-full w-[185px] bg-[#FFA726] rounded-[30px] shadow-md transition-transform duration-300"
              style={{
                transform: `translateX(${tabList.indexOf(activeTab) * 185}px)`,
              }}
            />
          </ul>
        </div>

        {/* content */}
        {whyUsListFeatures[activeTab] && (
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="flex items-center justify-between gap-x-24 px-32 "
          >
            <div className="grid grid-cols-2 grid-rows-2 gap-x-16 gap-y-16 w-[75%]">
              {whyUsListFeatures[activeTab].content.map((content, index) => (
                <div key={index} className="flex flex-col gap-y-2">
                  <img
                    src={content.icon}
                    alt={content.title}
                    width={50}
                    height={50}
                  />
                  <h1 className="font-semibold text-[32px]">{content.title}</h1>
                  <p className="font-normal text-[24px] text-justify">
                    {content.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="w-[300px] h-[300px] bg-why-me-radial-gradient rounded-full flex justify-center items-center">
              <img
                src={whyUsListFeatures[activeTab].image}
                alt={`${activeTab} image`}
                width={256}
                height={256}
              />
            </div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
};

export default ProductionOverview;
