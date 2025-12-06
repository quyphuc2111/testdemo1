
"use client";

import { motion } from "motion/react";
import { BookOpen } from "lucide-react";

const LectureLoadingComponent = () => {
    return (
        <div className="relative">
            {/* Decorative Pattern - Left Side */}
            <div className="absolute left-0 top-[50%] -translate-y-[50%] w-[120px] pointer-events-none z-0 opacity-[0.15] hidden lg:block" style={{ marginTop: '200px' }}>
                <svg width="120" height="800" viewBox="0 0 120 800" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="30" cy="80" r="25" fill="#FBCFE8" />
                    <circle cx="90" cy="150" r="20" fill="#FEF3F8" />
                    <circle cx="40" cy="250" r="30" fill="#FBCFE8" />
                    <circle cx="80" cy="350" r="22" fill="#FEF3F8" />
                    <circle cx="25" cy="450" r="28" fill="#FBCFE8" />
                    <circle cx="95" cy="530" r="24" fill="#FEF3F8" />
                    <circle cx="50" cy="630" r="26" fill="#FBCFE8" />
                    <circle cx="70" cy="720" r="20" fill="#FEF3F8" />
                </svg>
            </div>

            {/* Decorative Pattern - Right Side */}
            <div className="absolute right-0 top-[50%] -translate-y-[50%] w-[120px] pointer-events-none z-0 opacity-[0.15] hidden lg:block" style={{ marginTop: '200px' }}>
                <svg width="120" height="800" viewBox="0 0 120 800" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="90" cy="80" r="25" fill="#BFDBFE" />
                    <circle cx="30" cy="150" r="20" fill="#EFF6FF" />
                    <circle cx="80" cy="250" r="30" fill="#BFDBFE" />
                    <circle cx="40" cy="350" r="22" fill="#EFF6FF" />
                    <circle cx="95" cy="450" r="28" fill="#BFDBFE" />
                    <circle cx="25" cy="530" r="24" fill="#EFF6FF" />
                    <circle cx="70" cy="630" r="26" fill="#BFDBFE" />
                    <circle cx="50" cy="720" r="20" fill="#EFF6FF" />
                </svg>
            </div>

            {/* Main Content */}
            <div className="max-w-[1440px] mx-auto px-4 xl:px-8 2xl:px-12 py-12 relative z-10 flex items-center justify-center min-h-[400px]">
                <div className="flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center gap-8"
                    >
                        {/* Flat Loading Icon */}
                        <div className="relative">
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0"
                            >
                                <div className="w-20 h-20 rounded-lg border-2 border-[#EC4899] border-t-transparent"></div>
                            </motion.div>
                            <div className="relative w-20 h-20 bg-[#FEF3F8] border-2 border-[#EC4899] rounded-lg flex items-center justify-center">
                                <BookOpen className="w-10 h-10 text-[#EC4899]" />
                            </div>
                        </div>

                        {/* Loading Text */}
                        <div className="text-center space-y-2">
                            <h3 className="text-[28px] md:text-[32px] font-bold text-[#004C70]">
                                Đang tải dữ liệu
                            </h3>
                            <p className="text-[16px] md:text-[18px] text-gray-500 font-medium">
                                Vui lòng đợi trong giây lát
                            </p>
                        </div>

                        {/* Flat Loading Dots */}
                        <div className="flex gap-3">
                            {[0, 1, 2].map((index) => (
                                <motion.div
                                    key={index}
                                    className="w-4 h-4 bg-[#EC4899] rounded-sm"
                                    animate={{
                                        y: [0, -8, 0],
                                        opacity: [0.4, 1, 0.4],
                                    }}
                                    transition={{
                                        duration: 0.8,
                                        repeat: Infinity,
                                        delay: index * 0.15,
                                        ease: "easeInOut",
                                    }}
                                />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LectureLoadingComponent;