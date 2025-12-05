"use client";

import { mockLessons, mockClasses } from "../../../_data/mock-data";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";

const LectureDetailPage = () => {
    const params = useParams();
    const lectureId = typeof params?.lectureId === 'string' ? parseInt(params.lectureId) : null;
    const classId = typeof params?.classId === 'string' ? parseInt(params.classId) : null;

    // Find the lecture and class
    const lecture = mockLessons.find((l) => l.id === lectureId);
    const classInfo = mockClasses.find((c) => c.id === classId);

    if (!lecture) {
        return (
            <div className="min-h-screen flex items-center justify-center flex-col gap-4 ">
                <AlertCircle size={48} className="text-[#FFB7B2]" />
                <h1 className="text-xl font-bold text-gray-500">
                    Không tìm thấy bài giảng
                </h1>
                <Link
                    href="/digital-lectures"
                    className="px-6 py-2 bg-[#B5EAD7] text-[#557C6C] rounded-xl font-bold hover:brightness-95 transition-all"
                >
                    Quay lại
                </Link>
            </div>
        );
    }

    return (
        <div style={{ backgroundImage: `url(${lecture.thumbnail})`, backgroundSize: "cover", backgroundPosition: "center" }} className="min-h-screen  pt-36 px-4 xl:px-8 pb-10">
            <div className="max-w-[1280px] mx-auto">
                {/* Header Navigation */}
                <div className="mb-6 flex items-center gap-4">
                    <Link
                        href={`/digital-lectures/${params?.classId}/${params?.subject}`}
                        className="p-3 bg-[#B5EAD7] rounded-2xl  text-[#557C6C] hover:brightness-95 transition-all"
                    >
                        <ArrowLeft size={24} strokeWidth={2.5} />
                    </Link>

                    <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                            {classInfo && (
                                <span className="px-3 py-1 bg-[#D7E3FC] text-[#4A5568] text-xs font-bold rounded-lg uppercase tracking-wider">
                                    {classInfo.name}
                                </span>
                            )}
                            <span className="px-3 py-1 bg-[#E2F0CB] text-[#71825B] text-xs font-bold rounded-lg uppercase tracking-wider">
                                {lecture.book}
                            </span>
                            <span className="px-3 py-1 bg-[#FFDAC1] text-[#8C6A5D] text-xs font-bold rounded-lg uppercase tracking-wider">
                                {lecture.topic}
                            </span>
                        </div>
                        <h1 className="text-xl md:text-2xl font-black text-[#004C70] line-clamp-1">
                            {lecture.title}
                        </h1>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-[32px] p-2 md:p-4 border-2 border-[#E2F0CB]">
                    {/* Video/Webview Container */}
                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black/5">
                        {lecture.link_online ? (
                            <iframe
                                src={lecture.link_online}
                                className="w-full h-full border-0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={lecture.title}
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 text-gray-400">
                                <AlertCircle size={40} />
                                <span className="font-medium">Chưa có liên kết bài giảng</span>
                            </div>
                        )}
                    </div>


                </div>


            </div>
        </div>
    );
};

export default LectureDetailPage;