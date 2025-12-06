"use client";

import { useParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { FileQuestion, ArrowLeft } from "lucide-react";
import CategoryTree3Level from "../../_components/category-tree-3-level";
import LectureCardGrid from "./_components/lecture-card-grid";
import Pagination from "../../_components/pagination";
import { useGetLectureCategories, useGetLectureLessons, useGetLectureSubjects } from "@/hooks/digital-lecture/useDigitalLectureHook";
import LectureLoadingComponent from "@/components/exceptions/lecture-loading";
import LectureErrorComponent from "@/components/exceptions/lecture-error";

const SubjectPage = () => {
    const params = useParams();
    const classId = params.classId as string;
    const subjectId = params.subject as string;

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;


    // Fetch categories
    const {
        data: categoriesData,
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
        refetch: refetchCategories
    } = useGetLectureCategories(classId, subjectId);

    // Fetch subjects to get subject name
    const { data: subjectsData } = useGetLectureSubjects(classId);
    const subjectName = subjectsData?.find(s => s.id === subjectId)?.name || "Môn học";

    // Determine if selected category is a topic and get topic name
    const selectedTopic = useMemo(() => {
        if (!selectedCategory || !categoriesData) return undefined;

        // Check if it's a topic (not a book)
        return categoriesData
            .flatMap((book) => book.children || [])
            .find((topic) => topic.id === selectedCategory);
    }, [selectedCategory, categoriesData]);

    const selectedTopicId = selectedTopic?.id;
    const selectedTopicName = selectedTopic?.name;

    // Fetch total lessons count (without filter) for stats display
    const {
        data: totalLessonsResponse,
    } = useGetLectureLessons(classId, subjectId, {
        page: 1,
        limit: 1,
    });

    // Fetch lessons with server-side pagination and filtering
    const {
        data: lessonsResponse,
        isLoading: isLoadingLessons,
        isError: isErrorLessons,
        refetch: refetchLessons
    } = useGetLectureLessons(classId, subjectId, {
        topicId: selectedTopicId,
        page: currentPage,
        limit: itemsPerPage,
    });

    // Reset page when category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [selectedCategory]);



    const isLoading = isLoadingCategories || isLoadingLessons;
    const isError = isErrorCategories || isErrorLessons;

    return (
        <div className="min-h-screen bg-white pt-28 relative">
            {/* Main Content */}
            <div style={{ backgroundImage: 'url("/images/lectures/bg_lectures.png")' }} className="w-full min-h-screen bg-cover bg-center bg-no-repeat ">

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left column: overview + category */}
                    <aside className="w-full lg:w-[340px] shrink-0 lg:sticky lg:top-28 self-start h-screen">
                        <div className="bg-white border border-gray-200 p-5 h-full">
                            <div className="flex items-center gap-2 mb-3">
                                <Link
                                    href={`/digital-lectures/${classId}`}
                                    className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-gray-200 text-[#0F3550] hover:bg-gray-50 transition-colors shrink-0"
                                >
                                    <ArrowLeft size={18} />
                                </Link>
                                <span className={`text-[12px] font-semibold px-3 py-1.5 border ${Number(classId) >= 1 && Number(classId) <= 5 ? "text-[#EC4899] border-[#FBCFE8] bg-[#FEF3F8]" : "text-[#3B82F6] border-[#BFDBFE] bg-[#EFF6FF]"}`}>
                                    Lớp {classId}
                                </span>
                                <span className="text-[12px] font-semibold px-3 py-1.5 border border-gray-200 text-gray-700">
                                    {subjectName}
                                </span>
                            </div>
                            <h1 className="text-[20px] xl:text-[22px] font-bold text-[#0F3550] mb-2 leading-tight">
                                Bài giảng môn {subjectName}
                            </h1>
                            <p className="text-[14px] text-gray-600 mb-4">
                                Hệ thống bài giảng số đầy đủ và chất lượng cao
                            </p>
                            <div className="grid grid-cols-3 gap-2 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex flex-col gap-1">
                                    <p className="text-[11px] text-gray-500 uppercase tracking-wide">Sách</p>
                                    <p className="text-[18px] font-bold text-[#0F3550]">{categoriesData?.length || 0}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-[11px] text-gray-500 uppercase tracking-wide">Chủ đề</p>
                                    <p className="text-[18px] font-bold text-[#0F3550]">{categoriesData?.reduce((sum, book) => sum + (book.children?.length || 0), 0) || 0}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-[11px] text-gray-500 uppercase tracking-wide">Bài giảng</p>
                                    <p className="text-[18px] font-bold text-[#0F3550]">{totalLessonsResponse?.pagination?.total || 0}</p>
                                </div>
                            </div>
                            <CategoryTree3Level
                                categories={categoriesData || []}
                                selectedCategory={selectedCategory}
                                onSelectCategory={setSelectedCategory}
                                totalLessons={totalLessonsResponse?.pagination?.total || 0}
                            />
                        </div>
                    </aside>

                    {/* Lesson Grid Content */}
                    <main className="flex-1 pr-8 mt-6 pb-24 flex flex-col min-h-screen">
                        {isLoading ? (
                            <LectureLoadingComponent />
                        ) : isError ? (
                            <LectureErrorComponent
                                onRetry={() => {
                                    refetchCategories();
                                    refetchLessons();
                                }}
                            />
                        ) : (
                            <>
                                <div className="mb-6 bg-white border border-gray-200 px-5 py-4 rounded-xl">
                                    <h2 className="text-[24px] xl:text-[26px] font-bold text-[#0F3550] leading-tight line-clamp-2">
                                        {selectedTopicName ? selectedTopicName : "Danh sách bài giảng"}
                                    </h2>
                                    <p className="text-[14px] text-gray-600 mt-1">
                                        Tìm thấy {lessonsResponse?.pagination?.total || 0} bài giảng
                                    </p>
                                </div>

                                {lessonsResponse?.data && lessonsResponse.data.length > 0 ? (
                                    <LectureCardGrid lessons={lessonsResponse.data} />
                                ) : (
                                    <div className="text-center py-16">
                                        <FileQuestion
                                            size={64}
                                            className="mx-auto mb-4 text-gray-400"
                                        />
                                        <p className="text-[18px] text-gray-500 font-medium">
                                            Không tìm thấy bài giảng nào
                                        </p>
                                    </div>
                                )}

                                {/* Pagination */}
                                {lessonsResponse?.pagination && Math.ceil(lessonsResponse.pagination.total / lessonsResponse.pagination.limit) > 1 && (
                                    <div className="mt-auto">
                                        <div className="mt-12">
                                            <Pagination
                                                currentPage={currentPage}
                                                totalPages={Math.ceil(lessonsResponse.pagination.total / lessonsResponse.pagination.limit)}
                                                totalItems={lessonsResponse.pagination.total}
                                                pageSize={itemsPerPage}
                                                onPageChange={setCurrentPage}
                                            />
                                        </div>
                                    </div>
                                )}
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SubjectPage;
