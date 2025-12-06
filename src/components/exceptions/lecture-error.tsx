
"use client";

import { motion } from "motion/react";
import { AlertCircle, RefreshCw, BookOpen, Wifi, RotateCcw, Trash2 } from "lucide-react";

interface LectureErrorComponentProps {
    onRetry?: () => void;
}

const LectureErrorComponent = ({ onRetry }: LectureErrorComponentProps) => {
    const handleRetry = () => {
        if (onRetry) {
            onRetry();
        } else {
            // Fallback: reload the page
            window.location.reload();
        }
    };

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
            <div className="max-w-[1440px] mx-auto px-4 xl:px-8 2xl:px-12 py-12 relative z-10">
                <div className="flex flex-col items-center justify-center min-h-[400px]">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                        className="flex flex-col items-center gap-8 max-w-lg text-center"
                    >
                        {/* Flat Error Icon */}
                        <div className="w-24 h-24 bg-[#FEF3F8] border-2 border-[#EC4899] rounded-xl flex items-center justify-center">
                            <AlertCircle className="w-12 h-12 text-[#EC4899]" />
                        </div>

                        {/* Error Message */}
                        <div className="space-y-3">
                            <h3 className="text-[32px] md:text-[36px] font-bold text-[#004C70]">
                                Đã xảy ra lỗi
                            </h3>
                            <p className="text-[18px] text-gray-600 font-medium">
                                Không thể tải dữ liệu
                            </p>
                            <p className="text-[16px] text-gray-500">
                                Vui lòng kiểm tra kết nối mạng và thử lại
                            </p>
                        </div>

                        {/* Flat Retry Button */}
                        <motion.button

                            onClick={handleRetry}
                            className=" hover:cursor-pointer flex items-center gap-3 px-8 py-4 bg-[#EC4899] text-white rounded-xl font-bold text-[16px] border-2 border-[#EC4899] hover:bg-[#DB2777] hover:border-[#DB2777] transition-all"
                        >
                            <RefreshCw className="w-5 h-5" />
                            <span>Thử lại</span>
                        </motion.button>


                    </motion.div>
                </div>
            </div>


        </div>
    );
};

export default LectureErrorComponent;