"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useGetLectureLessonDetail } from "@/hooks/digital-lecture/useDigitalLectureHook";
import LectureLoadingComponent from "@/components/exceptions/lecture-loading";
import LectureErrorComponent from "@/components/exceptions/lecture-error";
import LectureEmptyComponent from "@/components/exceptions/lecture-empty";

const LectureDetailPage = () => {
    const params = useParams();
    const lectureId = params?.lectureId as string;
    const classId = params?.classId as string;
    const subjectId = params?.subject as string;

    // Fetch lesson detail
    const {
        data: lecture,
        isLoading,
        isError,
        refetch
    } = useGetLectureLessonDetail(classId, subjectId, lectureId);

    return (
        <div
            style={{ backgroundImage: 'url("/images/lectures/bg_lectures.png")', backgroundSize: "cover", backgroundPosition: "center" }}
            className="min-h-screen  pt-28 px-3 sm:px-4 md:px-6 lg:px-8 xl:px-8 pb-6 sm:pb-8 md:pb-10"
        >
            <div className="max-w-[1280px] mx-auto">
                {/* Header Navigation */}
                <div className="mb-4 sm:mb-5 md:mb-6 flex items-start sm:items-center gap-2 sm:gap-3 md:gap-4">
                    <Link
                        href={`/digital-lectures/${classId}/${subjectId}`}
                        className="p-2 sm:p-2.5 md:p-3 bg-[#B5EAD7] rounded-xl sm:rounded-2xl text-[#557C6C] hover:brightness-95 transition-all shrink-0 mt-1 sm:mt-0"
                        aria-label="Quay lại"
                    >
                        <ArrowLeft size={20} strokeWidth={2.5} className="sm:w-6 sm:h-6" />
                    </Link>

                    <div className="flex-1 min-w-0 overflow-hidden">
                        <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2 md:mb-1 flex-wrap">
                            {lecture && (
                                <>
                                    <span className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-[#D7E3FC] text-[#4A5568] text-[10px] sm:text-xs font-bold rounded-md sm:rounded-lg uppercase tracking-wider truncate max-w-[120px] sm:max-w-[150px] md:max-w-[200px]">
                                        {lecture.className}
                                    </span>
                                    <span className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-[#E2F0CB] text-[#71825B] text-[10px] sm:text-xs font-bold rounded-md sm:rounded-lg uppercase tracking-wider truncate max-w-[120px] sm:max-w-[150px] md:max-w-[200px]">
                                        {lecture.book}
                                    </span>
                                    <span className="px-2 sm:px-2.5 md:px-3 py-0.5 sm:py-1 bg-[#FFDAC1] text-[#8C6A5D] text-[10px] sm:text-xs font-bold rounded-md sm:rounded-lg uppercase tracking-wider truncate max-w-[120px] sm:max-w-[150px] md:max-w-[200px]">
                                        {lecture.topic}
                                    </span>
                                </>
                            )}
                        </div>
                        <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-black text-[#004C70] line-clamp-2 sm:line-clamp-3 leading-tight sm:leading-snug overflow-hidden">
                            {lecture?.title || "Bài giảng"}
                        </h1>
                    </div>
                </div>

                {/* Main Content Area */}
                <div className="bg-white  border-2 border-[#E2F0CB] ">
                    {/* Video/Webview Container */}
                    <div className="relative w-full   bg-black/5 overflow-hidden">
                        {/* Mobile: Taller container for landscape content, Desktop: Standard aspect-video */}
                        <div className="relative w-full aspect-video sm:aspect-video md:aspect-video min-h-[300px] sm:min-h-0">
                            {isLoading ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <LectureLoadingComponent />
                                </div>
                            ) : isError ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <LectureErrorComponent
                                        onRetry={() => refetch()}
                                    />
                                </div>
                            ) : !lecture ? (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <LectureEmptyComponent
                                        title="Bài giảng được được cập nhật"
                                        description="Bài giảng này được được cập nhật"
                                    />
                                </div>
                            ) : lecture.lectureOnlineLink ? (
                                <iframe
                                    src={lecture.lectureOnlineLink}
                                    className="w-full h-full border-0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={lecture.title}
                                    scrolling="yes"
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        overflow: 'auto'
                                    }}
                                />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <LectureEmptyComponent
                                        title="Bài giảng được được cập nhật"
                                        description="Bài giảng này được được cập nhật"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LectureDetailPage;