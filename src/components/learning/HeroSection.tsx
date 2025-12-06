import React from "react";
import { motion } from "motion/react";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <div className="overflow-hidden relative mb-12 bg-white rounded-3xl border shadow-lg border-slate-100">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-1/2 h-full from-indigo-50 to-transparent opacity-60 bg-linear-to-l" />
      <div className="absolute bottom-0 left-0 w-1/2 h-full from-pink-50 to-transparent opacity-60 bg-linear-to-r" />

      <div className="container relative z-10 px-6 py-12 mx-auto md:py-20 md:px-12">
        <div className="flex flex-col gap-8 items-center md:flex-row">
          <div className="flex-1 text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-4 text-4xl font-black text-slate-900 md:text-5xl lg:text-6xl">
                Học & Thi <br />
                <span className="text-transparent bg-clip-text from-indigo-600 to-pink-600 bg-linear-to-r">
                  Trực Tuyến
                </span>
              </h1>
              <p className="mb-8 max-w-2xl text-lg text-slate-600 md:text-xl">
                Nền tảng học tập thông minh, giúp học sinh tiếp cận kiến thức
                mọi lúc mọi nơi. Hệ thống bài giảng đa dạng từ Tiểu học đến
                Trung học phổ thông.
              </p>

              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <div className="flex gap-2 items-center px-4 py-2 bg-white rounded-full border shadow-sm border-slate-200">
                  <span className="flex justify-center items-center w-8 h-8 text-indigo-600 bg-indigo-50 rounded-full">
                    📚
                  </span>
                  <span className="font-medium text-slate-700">
                    Đa dạng môn học
                  </span>
                </div>
                <div className="flex gap-2 items-center px-4 py-2 bg-white rounded-full border shadow-sm border-slate-200">
                  <span className="flex justify-center items-center w-8 h-8 text-pink-600 bg-pink-50 rounded-full">
                    🎯
                  </span>
                  <span className="font-medium text-slate-700">
                    Luyện thi hiệu quả
                  </span>
                </div>
                <div className="flex gap-2 items-center px-4 py-2 bg-white rounded-full border shadow-sm border-slate-200">
                  <span className="flex justify-center items-center w-8 h-8 text-green-600 bg-green-50 rounded-full">
                    🚀
                  </span>
                  <span className="font-medium text-slate-700">
                    Tự học mọi lúc
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="relative flex-1">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative z-10"
            >
              {/* Using a generic educational illustration or placeholder if specific one isn't available */}
              <div className="relative mx-auto w-full max-w-md aspect-video md:aspect-square">
                <Image
                  src="/images/gif/online-learning.gif"
                  alt="Online Learning"
                  fill
                  className="object-contain"
                  unoptimized
                  onError={(e) => {
                    // Fallback to a nice gradient box if image fails
                    e.currentTarget.style.display = "none";
                    e.currentTarget.parentElement!.classList.add(
                      "bg-gradient-to-br",
                      "from-indigo-200",
                      "to-pink-200",
                      "rounded-2xl",
                      "flex",
                      "items-center",
                      "justify-center"
                    );
                    e.currentTarget.parentElement!.innerHTML =
                      '<span class="text-6xl">🎓</span>';
                  }}
                />
              </div>
            </motion.div>

            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-linear-to-tr from-indigo-100/50 to-pink-100/50 blur-3xl rounded-full -z-10" />
          </div>
        </div>
      </div>
    </div>
  );
};
