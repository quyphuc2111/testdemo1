"use client";

import { motion } from "motion/react";

type BannerSectionProps = {
  title?: string;
  description?: string;
  className?: string;
};

const BannerSection = ({ title, description, className }: BannerSectionProps) => {
  return (
    <div
      className={`w-full h-[400px] xl:h-[500px] 2xl:h-[600px] relative bg-cover bg-center bg-no-repeat ${className || ""}`}
      style={{ backgroundImage: "url('/images/lms-background.svg')" }}
    >
      {/* Overlay gradient for better text readability */}
      <div className="absolute inset-0 bg-linear-to-r from-[#004C70]/80 to-[#004C70]/40" />

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-[1440px] mx-auto px-4 xl:px-8 2xl:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <h1 className="text-[36px] xl:text-[48px] 2xl:text-[64px] font-bold text-white mb-4">
              {title || "Hệ thống bài giảng trực tuyến"}
            </h1>
            <p className="text-[18px] xl:text-[20px] 2xl:text-[24px] text-white/90 leading-relaxed">
              {description || "Khám phá hệ thống bài giảng chất lượng cao, được xây dựng bài bản và quản lý bởi đội ngũ giàu kinh nghiệm, tận tâm."}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BannerSection;

