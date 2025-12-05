"use client";

import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { PlayCircle } from "lucide-react";

type Lesson = {
    id: number;
    title: string;
    topic: string;
    book: string;
    duration: string;
    views: number;
    thumbnail: string;
    link_online?: string;
};

type LectureCardGridProps = {
    lessons: Lesson[];
};

const LectureCardGrid = ({ lessons }: LectureCardGridProps) => {
    const params = useParams();
    const classId = params?.classId;
    const subject = params?.subject;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {lessons.map((lesson, index) => (
                <Link
                    key={lesson.id}
                    href={`/digital-lectures/${classId}/${subject}/${lesson.id}`}
                    className="block h-full"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="bg-white rounded-lg border overflow-hidden cursor-pointer flex flex-col h-full"
                        style={{ borderColor: "#004C70" }}
                    >
                        {/* Thumbnail */}
                        <div className="relative w-full h-[250px] xl:h-[270px] overflow-hidden bg-gray-100 group">
                            <Image
                                src={lesson.thumbnail}
                                alt={lesson.title}
                                fill
                                className="object-cover transition-transform duration-500"
                            />

                            {/* Online Content Badge */}
                            {lesson.link_online && (
                                <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-[#E2F0CB] shadow-[0_2px_10px_rgba(0,0,0,0.05)] flex items-center gap-1.5">
                                    <div className="relative flex items-center justify-center">
                                        <div className="absolute inset-0 bg-[#B5EAD7] rounded-full blur-[2px] opacity-50" />
                                        <PlayCircle size={14} fill="#B5EAD7" className="text-[#004C70] relative z-10" />
                                    </div>
                                    <span className="text-[10px] font-extrabold text-[#004C70] tracking-wide uppercase">Bài giảng</span>
                                </div>
                            )}

                            {/* Overlay Title Container */}
                            <div className="absolute inset-0 flex items-center justify-center p-4">
                                <div className="bg-white/90 backdrop-blur-sm px-4 py-3 rounded-2xl  text-center w-full max-w-[95%] border border-[#E2F0CB] transition-transform duration-300">
                                    <h3 className="text-[15px] xl:text-[17px] font-bold text-[#004C70] line-clamp-3 leading-snug">
                                        {lesson.title}
                                    </h3>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col flex-1">
                            <div className="mb-2">
                                <span className="inline-block max-w-full text-[12px] text-[#004C70] font-medium bg-[#E8F1FF] px-2 py-1 rounded line-clamp-1 truncate">
                                    {lesson.topic}
                                </span>
                            </div>
                            <h3 className="text-[16px] xl:text-[18px] font-semibold text-[#004C70] mb-2 line-clamp-2">
                                {lesson.title}
                            </h3>
                            <div className="mt-auto ">
                                <span className="inline-block max-w-full text-[12px] font-medium text-[#004C70] bg-gray-100 px-2.5 py-1 rounded line-clamp-1 truncate">
                                    {lesson.book}
                                </span>
                            </div>
                        </div>
                    </motion.div>
                </Link>
            ))
            }
        </div >
    );
};

export default LectureCardGrid;
