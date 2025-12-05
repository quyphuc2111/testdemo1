"use client";

import { useParams } from "next/navigation";
import { useState, useMemo } from "react";
import { FileQuestion } from "lucide-react";
import CategoryTree3Level from "../../_components/category-tree-3-level";
import LectureCardGrid from "./_components/lecture-card-grid";
import Pagination from "../../_components/pagination";
import { getCategoriesBySubject, mockLessons, subjectNames, mockClasses } from "../../_data/mock-data";

const SubjectPage = () => {
    const params = useParams();
    const classId = params.classId as string;
    const subject = params.subject as string;

    const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    const subjectName = subjectNames[subject] || "Môn học";
    const categories = getCategoriesBySubject(subject);

    // Get class info
    const classInfo = mockClasses.find((cls) => cls.id === parseInt(classId));
    const isTieuHoc = classInfo?.level === "Tiểu học";

    // Filter lessons based on selected category
    const filteredLessons = useMemo(() => {
        if (selectedCategory === null) {
            return mockLessons;
        }

        // If selected is a topic, filter by topic
        const selectedTopic = categories
            .flatMap((book) => book.children || [])
            .find((topic) => topic.id === selectedCategory);

        if (selectedTopic) {
            const topicName = selectedTopic.name;
            return mockLessons.filter((lesson) => lesson.topic === topicName);
        }

        // If selected is a book, filter by book
        const selectedBook = categories.find((book) => book.id === selectedCategory);
        if (selectedBook) {
            return mockLessons.filter((lesson) => lesson.book === selectedBook.name);
        }

        return mockLessons;
    }, [selectedCategory, categories]);

    // Stats
    const totalBooks = categories.length;
    const totalTopics = categories.reduce((sum, book) => sum + (book.children?.length || 0), 0);

    // Pagination
    const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentLessons = filteredLessons.slice(startIndex, endIndex);

    return (
        <div className="min-h-screen bg-white pt-28 relative">
            {/* Main Content */}
            <div style={{ backgroundImage: 'url("/images/lectures/bg_lectures.png")' }} className="w-full min-h-screen bg-cover bg-center bg-no-repeat ">

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left column: overview + category */}
                    <aside className="w-full lg:w-[340px] shrink-0 lg:sticky lg:top-28 self-start h-screen">
                        <div className="bg-white border border-gray-200 p-5 h-full">
                            <div className="flex items-center gap-2 mb-3">
                                <span className={`text-[12px] font-semibold px-3 py-1.5 border ${isTieuHoc ? "text-[#EC4899] border-[#FBCFE8] bg-[#FEF3F8]" : "text-[#3B82F6] border-[#BFDBFE] bg-[#EFF6FF]"}`}>
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
                                Tìm thấy {filteredLessons.length} bài giảng theo bộ lọc hiện tại.
                            </p>
                            <div className="grid grid-cols-3 gap-2 mb-6 pb-6 border-b border-gray-200">
                                <div className="flex flex-col gap-1">
                                    <p className="text-[11px] text-gray-500 uppercase tracking-wide">Sách</p>
                                    <p className="text-[18px] font-bold text-[#0F3550]">{totalBooks}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-[11px] text-gray-500 uppercase tracking-wide">Chủ đề</p>
                                    <p className="text-[18px] font-bold text-[#0F3550]">{totalTopics}</p>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <p className="text-[11px] text-gray-500 uppercase tracking-wide">Bài giảng</p>
                                    <p className="text-[18px] font-bold text-[#0F3550]">{filteredLessons.length}</p>
                                </div>
                            </div>
                            <CategoryTree3Level
                                categories={categories}
                                selectedCategory={selectedCategory}
                                onSelectCategory={setSelectedCategory}
                            />
                        </div>
                    </aside>

                    {/* Lesson Grid Content */}
                    <main className="flex-1 pr-8 mt-6 pb-24 flex flex-col min-h-screen">
                        <div className="mb-6 bg-white border border-gray-200 px-5 py-4 rounded-xl">
                            <h2 className="text-[24px] xl:text-[26px] font-bold text-[#0F3550] leading-tight">
                                Danh sách bài giảng
                            </h2>
                            <p className="text-[14px] text-gray-600 mt-1">
                                Tìm thấy {filteredLessons.length} bài giảng
                            </p>
                        </div>

                        {currentLessons.length > 0 ? (
                            <LectureCardGrid lessons={currentLessons} />
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
                        {totalPages > 1 && (
                            <div className="mt-auto">
                                <div className="mt-12">
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        totalItems={filteredLessons.length}
                                        pageSize={itemsPerPage}
                                        onPageChange={setCurrentPage}
                                    />
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default SubjectPage;
