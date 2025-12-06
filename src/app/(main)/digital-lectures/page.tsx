"use client";

import Link from "next/link";
import { useMemo } from "react";
import BannerSection from "./_components/banner-section";
import { motion } from "motion/react";
import Image from "next/image";
import { GraduationCap, School } from "lucide-react";
import { useGetLectureClasses } from "@/hooks/digital-lecture/useDigitalLectureHook";
import LectureErrorComponent from "@/components/exceptions/lecture-error";
import LectureLoadingComponent from "@/components/exceptions/lecture-loading";
import type { LectureClass } from "@/types/digital-lecture.type";

const DigitalLecturesPage = () => {
    const { data: classes, isLoading, isError, refetch } = useGetLectureClasses();

    // Helper function để lấy thumbnail dựa trên class id hoặc image từ API
    const getThumbnail = (classItem: LectureClass): string => {
        if (classItem.image) {
            return classItem.image;
        }
        // Fallback nếu không có image từ API
        return `/images/class/class_${classItem.id}.png`;
    };

    // Phân loại classes thành Tiểu học và THCS dựa trên schoolLevel
    const { elementaryClasses, middleSchoolClasses } = useMemo(() => {
        if (!classes) {
            return { elementaryClasses: [], middleSchoolClasses: [] };
        }

        const elementary = classes.filter((cls) => cls.schoolLevel === "Tiểu học");
        const middleSchool = classes.filter((cls) => cls.schoolLevel === "Trung học cơ sở");

        return {
            elementaryClasses: elementary,
            middleSchoolClasses: middleSchool,
        };
    }, [classes]);

    // Config cho các school levels
    const schoolLevels = useMemo(() => [
        {
            id: "elementary",
            title: "Tiểu học",
            description: "Cấp học đầu tiên trong hệ thống giáo dục",
            classes: elementaryClasses,
            icon: School,
            colors: {
                bg: "bg-[#FEF3F8]",
                border: "border-[#FBCFE8]",
                iconBg: "bg-white",
                iconBorder: "border-[#FBCFE8]",
                iconColor: "text-[#EC4899]",
                titleColor: "text-[#EC4899]",
                descColor: "text-[#EC4899]/70",
                accentColor: "bg-[#FBCFE8]",
                subjectBadgeBg: "bg-[#FEF3F8]",
            },
        },
        {
            id: "middle-school",
            title: "Trung học cơ sở",
            description: "Cấp học tiếp theo sau Tiểu học",
            classes: middleSchoolClasses,
            icon: GraduationCap,
            colors: {
                bg: "bg-[#EFF6FF]",
                border: "border-[#BFDBFE]",
                iconBg: "bg-white",
                iconBorder: "border-[#BFDBFE]",
                iconColor: "text-[#3B82F6]",
                titleColor: "text-[#3B82F6]",
                descColor: "text-[#3B82F6]/70",
                accentColor: "bg-[#BFDBFE]",
                subjectBadgeBg: "bg-[#EFF6FF]",
            },
        },
    ], [elementaryClasses, middleSchoolClasses]);

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
                        Tìm thấy {classes?.length || 0} lớp học
                    </p>
                </div>

                {isLoading && <LectureLoadingComponent />}
                {isError && (
                    <LectureErrorComponent onRetry={() => {
                        refetch();
                    }} />
                )}
                {!isLoading && !isError && schoolLevels.map((level, levelIndex) => {
                    const IconComponent = level.icon;
                    const isLast = levelIndex === schoolLevels.length - 1;

                    return (
                        <div key={level.id} className={isLast ? "" : "mb-12"}>
                            {/* Header Section */}
                            <div className={`mb-8 ${level.colors.bg} border-3 ${level.colors.border} p-4 md:p-6 rounded-3xl relative overflow-hidden`}>
                                <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
                                    <div className="flex items-center gap-3 md:gap-4">
                                        <div className={`${level.colors.iconBg} p-2 md:p-3 rounded-full border-3 ${level.colors.iconBorder} shrink-0`}>
                                            <IconComponent className={`${level.colors.iconColor} w-6 h-6 md:w-8 md:h-8`} />
                                        </div>
                                        <div>
                                            <h3 className={`text-[20px] md:text-[24px] xl:text-[28px] 2xl:text-[32px] font-black ${level.colors.titleColor} mb-1`} style={{ letterSpacing: '-0.5px' }}>
                                                {level.title}
                                            </h3>
                                            <p className={`text-[12px] md:text-[14px] ${level.colors.descColor} font-medium`}>
                                                {level.description}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <div className={`bg-white rounded-full px-4 py-2 md:px-5 md:py-3 border-3 ${level.colors.border}`}>
                                            <div className={`text-[20px] md:text-[28px] xl:text-[32px] 2xl:text-[36px] font-black ${level.colors.titleColor} leading-none text-center`}>
                                                {level.classes.length}
                                            </div>
                                            <div className={`text-[10px] md:text-[12px] ${level.colors.descColor} font-semibold mt-0.5 md:mt-1 text-center`}>
                                                lớp học
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Classes Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                                {level.classes.map((classItem, index) => (
                                    <Link
                                        key={classItem.id}
                                        href={`/digital-lectures/${classItem.id}`}
                                    >
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            className="bg-white rounded-2xl overflow-hidden h-full flex flex-col transition-colors border border-gray-200"
                                        >
                                            <div className={`h-1.5 w-full ${level.colors.accentColor}`} />
                                            {/* Banner Image */}
                                            <div className="relative w-full aspect-video overflow-hidden bg-gray-50">
                                                <Image
                                                    src={getThumbnail(classItem)}
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
                                                    {classItem.subject.slice(0, 3).map((subject) => (
                                                        <span
                                                            key={subject.subjectId}
                                                            className={`text-[11px] font-semibold text-[#004C70] ${level.colors.subjectBadgeBg} px-2.5 py-1 rounded`}
                                                        >
                                                            {subject.subjectName}
                                                        </span>
                                                    ))}
                                                    {classItem.subject.length > 3 && (
                                                        <span className={`text-[11px] font-semibold text-[#004C70] ${level.colors.subjectBadgeBg} px-2.5 py-1 rounded`}>
                                                            +{classItem.subject.length - 3}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Stats Badges */}
                                                <div className="flex flex-wrap gap-2">
                                                    <span className="text-[11px] font-semibold text-gray-600 bg-gray-50 px-2.5 py-1 rounded">
                                                        {classItem.bookCount} sách
                                                    </span>
                                                    <span className="text-[11px] font-semibold text-gray-600 bg-gray-50 px-2.5 py-1 rounded">
                                                        {classItem.topicCount} chủ đề
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    );
                })}
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
