"use client";

import React, { useMemo, useState } from "react";
import { getCategoriesBySubject, getTopics } from "../../_data/mock-data";
import ExamCategoryTree from "../../_components/exam-category-tree";
import ExamCardGrid from "../../_components/exam-card-grid";
import ExamPagination from "../../_components/exam-pagination";
import { useRouter } from "next/navigation";
import { Folder, ArrowLeft } from "lucide-react";

export default function SubjectPage({
  params,
}: {
  params: Promise<{ classId: string; subjectId: string }>;
}) {
  const router = useRouter();
  const { classId: rawClassId, subjectId: rawSubjectId } = React.use(params);
  const classId = decodeURIComponent(rawClassId);
  const subjectId = decodeURIComponent(rawSubjectId);

  const [selectedCategory, setSelectedCategory] = useState<
    number | string | null
  >(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const categories = useMemo(
    () => getCategoriesBySubject(subjectId, classId),
    [subjectId, classId]
  );

  const allTopics = useMemo(
    () => getTopics(classId, subjectId),
    [classId, subjectId]
  );

  // Parse class number for styling
  const classNumStr = classId.replace(/\D/g, "");
  const classNum = parseInt(classNumStr) || 1;
  const isTieuHoc = classNum >= 1 && classNum <= 5;

  // Filter topics based on selected category (Book)
  const filteredTopics = useMemo(() => {
    if (selectedCategory === null) {
      return allTopics;
    }

    // Find book
    const selectedBook = categories.find((c) => c.id === selectedCategory);
    if (selectedBook) {
      return allTopics.filter((t) => t.book === selectedBook.name);
    }

    return allTopics;
  }, [selectedCategory, categories, allTopics]);

  // Map topics to grid card format
  const currentGridItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const items = filteredTopics.slice(startIndex, endIndex);

    return items.map((t) => ({
      id: t.id,
      title: t.name,
      topic: t.name,
      book: t.book || "Chưa phân loại",
      duration: "",
      views: 0,
      thumbnail: "/images/lectures/image_lecture.png", // Placeholder
      link_online: t.url || undefined,
      type: "topic",
    }));
  }, [filteredTopics, currentPage]);

  // Pagination
  const totalPages = Math.ceil(filteredTopics.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-white pt-20 relative">
      {/* Main Content */}
      <div
        style={{ backgroundImage: 'url("/images/lectures/bg_lectures.png")' }}
        className="w-full min-h-screen bg-cover bg-center bg-no-repeat "
      >
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column: overview + category */}
          <aside className="w-full lg:w-[340px] shrink-0 lg:sticky lg:top-28 self-start max-h-[calc(100vh-120px)] overflow-hidden flex flex-col">
            <div className="bg-white border border-gray-200 p-5 h-full overflow-y-auto custom-scrollbar rounded-xl">
              <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-gray-500 hover:text-[#0F3550] transition-colors mb-4 font-medium"
              >
                <ArrowLeft size={20} />
                Quay lại
              </button>
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`text-[12px] font-semibold px-3 py-1.5 border ${
                    isTieuHoc
                      ? "text-[#EC4899] border-[#FBCFE8] bg-[#FEF3F8]"
                      : "text-[#3B82F6] border-[#BFDBFE] bg-[#EFF6FF]"
                  }`}
                >
                  {classId}
                </span>
                <span className="text-[12px] font-semibold px-3 py-1.5 border border-gray-200 text-gray-700">
                  {subjectId}
                </span>
              </div>
              <h1 className="text-[20px] xl:text-[22px] font-bold text-[#0F3550] mb-2 leading-tight">
                Học & Thi {subjectId}
              </h1>
              <p className="text-[14px] text-gray-600 mb-4">
                Tìm thấy {filteredTopics.length} chủ đề.
              </p>

              <ExamCategoryTree
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={(id) => {
                  setSelectedCategory(id);
                  setCurrentPage(1); // Reset page on category change
                }}
              />
            </div>
          </aside>

          {/* Lesson Grid Content */}
          <main className="flex-1 pr-8 mt-6 pb-24 flex flex-col min-h-screen">
            <div className="mb-6 bg-white border border-gray-200 px-5 py-4 rounded-xl">
              <h2 className="text-[24px] xl:text-[26px] font-bold text-[#0F3550] leading-tight">
                Danh sách chủ đề
              </h2>
              <p className="text-[14px] text-gray-600 mt-1">
                Tìm thấy {filteredTopics.length} kết quả
              </p>
            </div>

            {currentGridItems.length > 0 ? (
              <ExamCardGrid lessons={currentGridItems} />
            ) : (
              <div className="text-center py-16">
                <Folder size={64} className="mx-auto mb-4 text-gray-400" />
                <p className="text-[18px] text-gray-500 font-medium">
                  Không tìm thấy chủ đề nào
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-auto">
                <div className="mt-12">
                  <ExamPagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalItems={filteredTopics.length}
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
}
