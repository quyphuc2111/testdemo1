"use client";

import Link from "next/link";
import BannerSection from "./_components/banner-section";
import { mockClasses, getSubjectsByClass, getCategoriesBySubject } from "./_data/mock-data";
import { motion } from "motion/react";
import Image from "next/image";
import { GraduationCap, School } from "lucide-react";

const DigitalLecturesPage = () => {
    // Group classes by level
    const tieuHocClasses = mockClasses.filter((cls) => cls.level === "Tiểu học");
    const thcsClasses = mockClasses.filter((cls) => cls.level === "THCS");

    // Helper function to get book and topic counts for a class
    const getClassStats = (classId: number) => {
        const subjects = getSubjectsByClass(classId.toString());
        let totalBooks = 0;
        let totalTopics = 0;

        subjects.forEach((subject) => {
            const categories = getCategoriesBySubject(subject.id);
            totalBooks += categories.length;
            categories.forEach((category) => {
                if (category.children) {
                    totalTopics += category.children.length;
                }
            });
        });

        return { books: totalBooks, topics: totalTopics };
    };

    return (
        <div className="min-h-screen bg-white pt-24 relative">
            {/* Banner Section */}
            <BannerSection />

            {/* Decorative Pattern - Left Side */}
            <div className="absolute left-0 top-[50%] -translate-y-[50%] w-[120px] pointer-events-none z-0 opacity-[0.2] hidden lg:block" style={{ marginTop: '200px' }}>
                <svg width="120" height="800" viewBox="0 0 120 800" xmlns="http://www.w3.org/2000/svg">
                    {/* Pastel Pink Circles */}
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
            <div className="absolute right-0 top-[50%] -translate-y-[50%] w-[120px] pointer-events-none z-0 opacity-[0.2] hidden lg:block" style={{ marginTop: '200px' }}>
                <svg width="120" height="800" viewBox="0 0 120 800" xmlns="http://www.w3.org/2000/svg">
                    {/* Pastel Blue Circles */}
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
                <div className="mb-8">
                    <h2 className="text-[24px] md:text-[28px] xl:text-[32px] 2xl:text-[36px] font-semibold text-[#004C70] mb-2">
                        Danh sách lớp học
                    </h2>
                    <p className="text-[16px] text-gray-600">
                        Tìm thấy {mockClasses.length} lớp học
                    </p>
                </div>

                {/* Tiểu học Section */}
                <div className="mb-12">
                    <div className="mb-8 bg-[#FEF3F8] border-3 border-[#FBCFE8] p-4 md:p-6 rounded-3xl relative overflow-hidden">
                        <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="bg-white p-2 md:p-3 rounded-full border-3 border-[#FBCFE8] shrink-0">
                                    <School className="text-[#EC4899] w-6 h-6 md:w-8 md:h-8" />
                                </div>
                                <div>
                                    <h3 className="text-[20px] md:text-[24px] xl:text-[28px] 2xl:text-[32px] font-black text-[#EC4899] mb-1" style={{ letterSpacing: '-0.5px' }}>
                                        Tiểu học
                                    </h3>
                                    <p className="text-[12px] md:text-[14px] text-[#EC4899]/70 font-medium">
                                        Cấp học đầu tiên trong hệ thống giáo dục
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-white rounded-full px-4 py-2 md:px-5 md:py-3 border-3 border-[#FBCFE8]">
                                    <div className="text-[20px] md:text-[28px] xl:text-[32px] 2xl:text-[36px] font-black text-[#EC4899] leading-none text-center">
                                        {tieuHocClasses.length}
                                    </div>
                                    <div className="text-[10px] md:text-[12px] text-[#EC4899]/70 font-semibold mt-0.5 md:mt-1 text-center">
                                        lớp học
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {tieuHocClasses.map((classItem, index) => (
                            <Link
                                key={classItem.id}
                                href={`/digital-lectures/${classItem.id}`}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="bg-white rounded-2xl overflow-hidden h-full flex flex-col transition-colors border border-gray-200 shadow-sm"
                                >
                                    <div className="h-1.5 w-full bg-[#FBCFE8]" />
                                    {/* Banner Image */}
                                    <div className="relative w-full aspect-video overflow-hidden bg-gray-50">
                                        <Image
                                            src={classItem.thumbnail}
                                            alt={classItem.name}
                                            fill
                                            className="object-cover object-center"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-1">
                                        {/* Class Title */}
                                        <h3 className="text-[20px] xl:text-[22px] font-bold text-[#004C70] mb-4 leading-tight">
                                            {classItem.name}
                                        </h3>

                                        {/* Subject Badges */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {getSubjectsByClass(classItem.id.toString()).slice(0, 3).map((subject) => (
                                                <span
                                                    key={subject.id}
                                                    className="text-[11px] font-semibold text-[#004C70] bg-[#FEF3F8] px-2.5 py-1 rounded"
                                                >
                                                    {subject.name}
                                                </span>
                                            ))}
                                            {getSubjectsByClass(classItem.id.toString()).length > 3 && (
                                                <span className="text-[11px] font-semibold text-[#004C70] bg-[#FEF3F8] px-2.5 py-1 rounded">
                                                    +{getSubjectsByClass(classItem.id.toString()).length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* Stats Badges */}
                                        {(() => {
                                            const stats = getClassStats(classItem.id);
                                            return (
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="text-[11px] font-semibold text-gray-600 bg-gray-50 px-2.5 py-1 rounded">
                                                        {stats.books} sách
                                                    </span>
                                                    <span className="text-[11px] font-semibold text-gray-600 bg-gray-50 px-2.5 py-1 rounded">
                                                        {stats.topics} chủ đề
                                                    </span>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>

                {/* THCS Section */}
                <div>
                    <div className="mb-8 bg-[#EFF6FF] border-3 border-[#BFDBFE] p-4 md:p-6 rounded-3xl relative overflow-hidden">
                        <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className="bg-white p-2 md:p-3 rounded-full border-3 border-[#BFDBFE] shrink-0">
                                    <GraduationCap className="text-[#3B82F6] w-6 h-6 md:w-8 md:h-8" />
                                </div>
                                <div>
                                    <h3 className="text-[20px] md:text-[24px] xl:text-[28px] 2xl:text-[32px] font-black text-[#3B82F6] mb-1" style={{ letterSpacing: '-0.5px' }}>
                                        Trung học cơ sở
                                    </h3>
                                    <p className="text-[12px] md:text-[14px] text-[#3B82F6]/70 font-medium">
                                        Cấp học tiếp theo sau Tiểu học
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <div className="bg-white rounded-full px-4 py-2 md:px-5 md:py-3 border-3 border-[#BFDBFE]">
                                    <div className="text-[20px] md:text-[28px] xl:text-[32px] 2xl:text-[36px] font-black text-[#3B82F6] leading-none text-center">
                                        {thcsClasses.length}
                                    </div>
                                    <div className="text-[10px] md:text-[12px] text-[#3B82F6]/70 font-semibold mt-0.5 md:mt-1 text-center">
                                        lớp học
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {thcsClasses.map((classItem, index) => (
                            <Link
                                key={classItem.id}
                                href={`/digital-lectures/${classItem.id}`}
                            >
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                    className="bg-white rounded-2xl overflow-hidden h-full flex flex-col transition-colors border border-gray-200 shadow-sm"
                                >
                                    <div className="h-1.5 w-full bg-[#BFDBFE]" />
                                    {/* Banner Image */}
                                    <div className="relative w-full aspect-video overflow-hidden bg-gray-50">
                                        <Image
                                            src={classItem.thumbnail}
                                            alt={classItem.name}
                                            fill
                                            className="object-cover object-center"
                                        />
                                    </div>

                                    {/* Content */}
                                    <div className="p-5 flex flex-col flex-1">
                                        {/* Class Title */}
                                        <h3 className="text-[20px] xl:text-[22px] font-bold text-[#004C70] mb-4 leading-tight">
                                            {classItem.name}
                                        </h3>

                                        {/* Subject Badges */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {getSubjectsByClass(classItem.id.toString()).slice(0, 3).map((subject) => (
                                                <span
                                                    key={subject.id}
                                                    className="text-[11px] font-semibold text-[#004C70] bg-[#EFF6FF] px-2.5 py-1 rounded"
                                                >
                                                    {subject.name}
                                                </span>
                                            ))}
                                            {getSubjectsByClass(classItem.id.toString()).length > 3 && (
                                                <span className="text-[11px] font-semibold text-[#004C70] bg-[#EFF6FF] px-2.5 py-1 rounded">
                                                    +{getSubjectsByClass(classItem.id.toString()).length - 3}
                                                </span>
                                            )}
                                        </div>

                                        {/* Stats Badges */}
                                        {(() => {
                                            const stats = getClassStats(classItem.id);
                                            return (
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="text-[11px] font-semibold text-gray-600 bg-gray-50 px-2.5 py-1 rounded">
                                                        {stats.books} sách
                                                    </span>
                                                    <span className="text-[11px] font-semibold text-gray-600 bg-gray-50 px-2.5 py-1 rounded">
                                                        {stats.topics} chủ đề
                                                    </span>
                                                </div>
                                            );
                                        })()}
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>

            {/* Waves Pattern - Decorative only, below content, full width */}
            <div className="w-full relative -mt-32 pointer-events-none">
                <div
                    className="opacity-[0.2]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='100%25' height='300' viewBox='0 0 1920 300' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='none'%3E%3Cpath d='M0,150 Q480,50 960,150 T1920,150 L1920,300 L0,300 Z' fill='%23BFDBFE'/%3E%3Cpath d='M0,180 Q480,80 960,180 T1920,180 L1920,300 L0,300 Z' fill='%23EFF6FF'/%3E%3C/svg%3E")`,
                        backgroundSize: '100% 100%',
                        backgroundRepeat: 'no-repeat',
                        height: '300px',
                        width: '100%'
                    }}
                />
            </div>
        </div>
    );
};

export default DigitalLecturesPage;
