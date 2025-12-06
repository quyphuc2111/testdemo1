"use client";

import { motion } from "motion/react";
import TypingEffect from "@/components/animations/typing-effect";

const BannerTop = () => {
  return (
    <div className="relative w-full min-h-[90vh] lg:h-screen flex items-center bg-[#E0F7FA] overflow-hidden snap-start">
      {/* Background Graphic */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center opacity-40 mix-blend-multiply"
        style={{ backgroundImage: "url('/images/banner-top.svg')" }}
      />

      <div className="container mx-auto px-4 md:px-8 xl:px-20 relative z-10 grid gap-12 items-center h-full pt-20">
        <div className="flex flex-col items-start gap-8 order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white/70 backdrop-blur-xl border border-white/60 p-8 md:p-12 rounded-4xl shadow-2xl relative overflow-hidden group"
          >
            {/* Shine effect */}
            <div className="absolute top-0 -left-full w-1/2 h-full bg-linear-to-r from-transparent via-white/50 to-transparent skew-x-12 group-hover:animate-shine" />

            <h1 className="text-4xl md:text-5xl xl:text-6xl font-extrabold text-[#004C70] mb-6 leading-tight">
              <TypingEffect
                text="HỆ THỐNG BKT LMS"
                speed={100}
                typingDelay={500}
                className="bg-clip-text text-transparent bg-linear-to-r from-[#004C70] to-[#0083C9]"
              />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="text-lg md:text-xl text-slate-700 leading-relaxed mb-8 text-justify"
            >
              Nền tảng giáo dục số toàn diện, kiến tạo tương lai. Kết nối nhà
              trường, giáo viên và học sinh trong một hệ sinh thái học tập thông
              minh, an toàn và sáng tạo.
            </motion.p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() =>
                  window.scrollTo({
                    top: window.innerHeight,
                    behavior: "smooth",
                  })
                }
                className="px-8 py-4 bg-linear-to-r from-[#FFA726] to-[#FB8C00] text-white font-bold rounded-full shadow-lg hover:shadow-orange-300/50 hover:scale-105 transition-all duration-300 flex items-center gap-2"
              >
                <span>Khám phá ngay</span>
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  ></path>
                </svg>
              </button>
              <a
                href="https://zalo.me/0337218868"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-[#004C70] font-bold rounded-full shadow-md hover:bg-gray-50 hover:scale-105 transition-all duration-300 border border-[#004C70]/20"
              >
                Liên hệ tư vấn
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BannerTop;
