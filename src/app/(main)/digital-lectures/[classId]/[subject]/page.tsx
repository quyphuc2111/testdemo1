"use client";

import { useParams } from "next/navigation";
import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { ArrowLeft, Menu, X } from "lucide-react";
import CategoryTree3Level from "../../_components/category-tree-3-level";
import LectureCardGrid from "./_components/lecture-card-grid";
import Pagination from "../../_components/pagination";
import { useGetLectureCategories, useGetLectureLessons, useGetLectureSubjects, useGetLectureClasses } from "@/hooks/digital-lecture/useDigitalLectureHook";
import LectureLoadingComponent from "@/components/exceptions/lecture-loading";
import LectureErrorComponent from "@/components/exceptions/lecture-error";
import LectureEmptyComponent from "@/components/exceptions/lecture-empty";

const SubjectPage = () => {
    const params = useParams();
    const classId = params.classId as string;
    const subjectId = params.subject as string;

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const itemsPerPage = 8;

    // Fetch classes to get schoolLevel
    const { data: classesData } = useGetLectureClasses();
    const currentClass = classesData?.find((cls) => cls.id === Number(classId));
    const isPrimarySchool = currentClass?.schoolLevel === "Tiểu học";

    // Fetch categories
    const {
        data: categoriesData,
        isLoading: isLoadingCategories,
        isError: isErrorCategories,
        refetch: refetchCategories
    } = useGetLectureCategories(classId, subjectId);

    // Fetch subjects to get subject name and lessonCount
    const { data: subjectsData } = useGetLectureSubjects(classId);
    const currentSubject = subjectsData?.find(s => s.id === subjectId);
    const subjectName = currentSubject?.name || "Môn học";
    const totalLessons = currentSubject?.lessonCount || 0;

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
                    {/* Mobile Overlay */}
                    {isSidebarOpen && (
                        <div
                            className="lg:hidden fixed inset-0 bg-black/50 z-999"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    )}

                    {/* Left column: overview + category */}
                    <aside className={`fixed top-0 bottom-0 left-0 z-999 lg:z-auto w-[85vw] max-w-[340px] lg:w-[340px] shrink-0 lg:sticky lg:top-28 self-start h-screen lg:h-[calc(100vh-7rem)] transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                        }`}>
                        <div className="bg-white border border-gray-200 p-5 h-full flex flex-col overflow-hidden shadow-xl lg:shadow-none">
                            <div className="shrink-0">
                                <div className="flex items-center justify-between gap-2 mb-3">
                                    <div className="flex items-center gap-2 flex-1 min-w-0">
                                        {/* Quay lại Button */}
                                        <Link
                                            href={`/digital-lectures/${classId}`}
                                            className="flex items-center gap-1.5 px-3 py-2 h-auto bg-[#FFB7B2] text-white hover:opacity-80 transition-all shrink-0 cursor-pointer rounded-md"
                                        >
                                            <ArrowLeft size={16} />
                                            <span className="text-[12px] font-semibold whitespace-nowrap">Quay lại</span>
                                        </Link>
                                        <span className={`text-[12px] font-semibold px-3 py-2 rounded-md truncate ${isPrimarySchool ? "text-[#EC4899] bg-[#FEF3F8]" : "text-[#3B82F6] bg-[#EFF6FF]"}`}>
                                            Lớp {classId}
                                        </span>
                                        <span className="text-[12px] font-semibold px-3 py-2 rounded-md text-gray-700 bg-gray-100 truncate">
                                            {subjectName}
                                        </span>
                                    </div>
                                    {/* Mobile Close Sidebar Button */}
                                    <button
                                        onClick={() => setIsSidebarOpen(false)}
                                        className="lg:hidden flex items-center justify-center w-8 h-8 bg-[#FFB7B2] text-white hover:opacity-80 transition-all shrink-0 cursor-pointer rounded-md"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                                <h1 className="text-[20px] xl:text-[22px] font-bold text-[#0F3550] mb-2 leading-tight line-clamp-2">
                                    Bài giảng môn {subjectName}
                                </h1>
                                <p className="text-[14px] text-gray-600 mb-4 line-clamp-2">
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
                                        <p className="text-[18px] font-bold text-[#0F3550]">{totalLessons}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-1 min-h-0">
                                <CategoryTree3Level
                                    categories={categoriesData || []}
                                    selectedCategory={selectedCategory}
                                    onSelectCategory={(categoryId) => {
                                        setSelectedCategory(categoryId);
                                        setIsSidebarOpen(false); // Close sidebar on mobile when category is selected
                                    }}
                                    totalLessons={totalLessons}
                                />
                            </div>
                        </div>
                    </aside>

                    {/* Lesson Grid Content */}
                    <main className="flex-1 lg:pr-8 px-4 lg:px-0 mt-6 pb-24 flex flex-col min-h-screen">
                        {isLoading ? (
                            <div className="min-h-[400px]">
                                <LectureLoadingComponent />
                            </div>
                        ) : isError ? (
                            <div className="min-h-[400px]">
                                <LectureErrorComponent
                                    onRetry={() => {
                                        refetchCategories();
                                        refetchLessons();
                                    }}
                                />
                            </div>
                        ) : (
                            <>
                                <div className="mb-6 bg-white border border-gray-200 px-5 py-4 rounded-xl">
                                    <div className="flex items-center justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <h2 className="text-[24px] xl:text-[26px] font-bold text-[#0F3550] leading-tight line-clamp-2">
                                                {selectedTopicName ? selectedTopicName : "Danh sách bài giảng"}
                                            </h2>
                                            <p className="text-[14px] text-gray-600 mt-1">
                                                Tìm thấy {lessonsResponse?.pagination?.total || 0} bài giảng
                                            </p>
                                        </div>
                                        {/* Mobile Menu Button */}
                                        <button
                                            onClick={() => setIsSidebarOpen(true)}
                                            className="lg:hidden flex items-center justify-center w-10 h-10 rounded-full bg-[#FFB7B2] text-white hover:opacity-80 hover:cursor-pointer transition-all shrink-0 cursor-pointer"
                                        >
                                            <Menu size={20} />
                                        </button>
                                    </div>
                                </div>

                                <div className="min-h-[400px] transition-all duration-300">
                                    {isLoadingLessons ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {[...Array(8)].map((_, index) => (
                                                <div key={index} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
                                                    <div className="w-full h-[250px] xl:h-[270px] bg-gray-200" />
                                                    <div className="p-4 space-y-3">
                                                        <div className="h-4 bg-gray-200 rounded w-1/3" />
                                                        <div className="h-5 bg-gray-200 rounded w-full" />
                                                        <div className="h-5 bg-gray-200 rounded w-2/3" />
                                                        <div className="h-4 bg-gray-200 rounded w-1/2 mt-4" />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : lessonsResponse?.data && lessonsResponse.data.length > 0 ? (
                                        <LectureCardGrid key={`${selectedTopicId}-${currentPage}`} lessons={lessonsResponse.data} />
                                    ) : (
                                        <LectureEmptyComponent
                                            title="Không tìm thấy bài giảng"
                                            description={selectedTopicName ? `Chưa có bài giảng nào trong chủ đề "${selectedTopicName}"` : "Hiện tại chưa có bài giảng nào trong môn học này"}
                                        />
                                    )}
                                </div>

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
