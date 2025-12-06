"use client";

import { motion } from "motion/react";
import { FileQuestion } from "lucide-react";

interface LectureEmptyComponentProps {
    title?: string;
    description?: string;
}

const LectureEmptyComponent = ({
    title = "Không tìm thấy bài giảng",
    description = "Hiện tại chưa có bài giảng nào trong danh mục này"
}: LectureEmptyComponentProps) => {
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
            <div className="max-w-[1440px] mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-8 2xl:px-12 py-6 sm:py-8 md:py-10 lg:py-12 relative z-10">
                <div className="flex flex-col items-center justify-center min-h-[250px] sm:min-h-[300px] md:min-h-[350px] lg:min-h-[400px]">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center gap-4 sm:gap-6 md:gap-8 max-w-lg text-center w-full px-2"
                    >
                        {/* Flat Empty Icon */}
                        <div className="relative">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-[#FEF3F8] border-2 border-[#EC4899] rounded-lg sm:rounded-xl flex items-center justify-center">
                                <FileQuestion className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-[#EC4899]" />
                            </div>
                        </div>

                        {/* Empty Message */}
                        <div className="space-y-2 sm:space-y-2.5 md:space-y-3">
                            <h3 className="text-xl sm:text-2xl md:text-[28px] lg:text-[32px] xl:text-[36px] font-bold text-[#004C70] leading-tight">
                                {title}
                            </h3>
                            <p className="text-sm sm:text-base md:text-[16px] lg:text-[18px] text-gray-600 font-medium">
                                {description}
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LectureEmptyComponent;

