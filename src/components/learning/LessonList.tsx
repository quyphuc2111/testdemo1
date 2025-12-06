import React, { useState, useMemo } from "react";
import { Topic } from "@/lib/learning-data";
import { TopicCard } from "./TopicCard";
import { AnimatePresence } from "motion/react";

interface LessonListProps {
  className: string;
  subjectName: string;
  topics: Topic[];
  onBack: () => void; // Keeping it in interface for consistency, but removing unused warning if possible or just use it.
}

export const LessonList = ({
  className,
  subjectName,
  topics,
}: Omit<LessonListProps, "onBack"> & { onBack?: () => void }) => {
  const [selectedBook, setSelectedBook] = useState<string | null>(null);
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  // Extract Books and Topics for Sidebar
  const books = useMemo(() => {
    const b = new Set<string>();
    topics.forEach((t) => {
      if (t.book) b.add(t.book);
    });
    return Array.from(b);
  }, [topics]);

  // Filter Logic
  const filteredTopics = useMemo(() => {
    return topics.filter((t) => {
      if (selectedBook && t.book !== selectedBook) return false;
      if (selectedTopicId && t.id !== selectedTopicId) return false;
      return true;
    });
  }, [topics, selectedBook, selectedTopicId]);

  // Calculate Stats
  const stats = useMemo(() => {
    const bookCount = books.length;
    const topicCount = topics.length;
    const lessonCount = topics.reduce((acc, t) => acc + t.lessons.length, 0);
    return { bookCount, topicCount, lessonCount };
  }, [books, topics]);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6; // Adjust as needed

  // Reset pagination when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [selectedBook, selectedTopicId, topics]);

  // Calculate Pagination
  const totalPages = Math.ceil(filteredTopics.length / itemsPerPage);
  const currentTopics = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredTopics.slice(start, start + itemsPerPage);
  }, [filteredTopics, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          {/* Header Info (Moved here) */}
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2 py-1 bg-pink-100 text-pink-600 text-xs font-bold rounded">
                {className}
              </span>
              <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded">
                {subjectName}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-2">
              Bài giảng môn {subjectName}
            </h1>
            <p className="text-slate-500 text-sm mb-4">
              Tìm thấy {filteredTopics.length} bài giảng theo bộ lọc hiện tại.
            </p>

            <div className="flex gap-4">
              <div>
                <div className="text-xs text-slate-400 uppercase font-bold">
                  Sách
                </div>
                <div className="text-xl font-bold text-slate-800">
                  {stats.bookCount}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-bold">
                  Chủ đề
                </div>
                <div className="text-xl font-bold text-slate-800">
                  {stats.topicCount}
                </div>
              </div>
              <div>
                <div className="text-xs text-slate-400 uppercase font-bold">
                  Bài giảng
                </div>
                <div className="text-xl font-bold text-slate-800">
                  {stats.lessonCount}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 sticky top-24">
            <div className="flex items-center gap-2 mb-6 text-xl font-bold text-rose-500 uppercase border-b border-rose-100 pb-4">
              <span className="text-rose-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="opacity-80"
                >
                  <rect x="3" y="3" width="7" height="7" rx="1"></rect>
                  <rect x="14" y="3" width="7" height="7" rx="1"></rect>
                  <rect x="14" y="14" width="7" height="7" rx="1"></rect>
                  <rect x="3" y="14" width="7" height="7" rx="1"></rect>
                </svg>
              </span>
              Danh mục
            </div>

            <button
              onClick={() => {
                setSelectedBook(null);
                setSelectedTopicId(null);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold mb-3 transition-all shadow-sm flex items-center gap-3 ${
                !selectedBook
                  ? "bg-rose-400 text-white shadow-rose-200"
                  : "bg-white text-slate-600 border border-slate-100 hover:bg-rose-50 hover:text-rose-500"
              }`}
            >
              <div
                className={`p-1.5 rounded-full ${
                  !selectedBook ? "bg-white/20" : "bg-slate-100"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="3" y1="9" x2="21" y2="9"></line>
                  <line x1="9" y1="21" x2="9" y2="9"></line>
                </svg>
              </div>
              Tất cả
            </button>

            <div className="space-y-3">
              {books.map((book) => (
                <div key={book} className="rounded-xl overflow-hidden">
                  <button
                    onClick={() =>
                      setSelectedBook(selectedBook === book ? null : book)
                    }
                    className={`w-full text-left px-4 py-3 font-medium flex justify-between items-center transition-all border ${
                      selectedBook === book
                        ? "bg-emerald-100 text-emerald-700 border-emerald-200 shadow-sm"
                        : "bg-white text-slate-600 border-slate-100 hover:bg-emerald-50 hover:text-emerald-600"
                    } rounded-xl`}
                  >
                    <span className="flex items-center gap-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={
                          selectedBook === book
                            ? "text-emerald-600"
                            : "text-slate-400"
                        }
                      >
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                      </svg>
                      <span className="line-clamp-1">{book}</span>
                    </span>
                    {selectedBook === book && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-emerald-600"
                      >
                        <polyline points="9 18 15 12 9 6"></polyline>
                      </svg>
                    )}
                  </button>

                  {selectedBook === book && (
                    <div className="ml-4 mt-2 pl-4 border-l-2 border-emerald-100 space-y-1">
                      {topics
                        .filter((t) => t.book === book)
                        .map((topic) => (
                          <button
                            key={topic.id}
                            onClick={() => setSelectedTopicId(topic.id)}
                            className={`w-full text-left px-3 py-2 text-sm rounded-lg transition-colors ${
                              selectedTopicId === topic.id
                                ? "bg-emerald-50 text-emerald-700 font-medium"
                                : "text-slate-500 hover:bg-slate-50 hover:text-emerald-600"
                            }`}
                          >
                            <div className="flex items-start gap-2">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-current shrink-0" />
                              <span className="line-clamp-2">{topic.name}</span>
                            </div>
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4 mb-6 flex justify-between items-center">
            <h2 className="font-bold text-slate-800">Danh sách bài giảng</h2>
            <div className="text-sm text-slate-500">
              Hiển thị {currentTopics.length} / {filteredTopics.length} kết quả
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <AnimatePresence mode="popLayout">
              {currentTopics.map((topic) => (
                <TopicCard key={topic.id} topic={topic} />
              ))}
            </AnimatePresence>
          </div>

          {filteredTopics.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-500">Không tìm thấy bài giảng nào.</p>
            </div>
          ) : (
            /* Pagination Controls */
            totalPages > 1 && (
              <div className="flex flex-wrap justify-center items-center gap-2 mt-8 bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                <button
                  onClick={() => handlePageChange(1)}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Đầu
                </button>
                <button
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Trang trước
                </button>

                <div className="flex gap-1 mx-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        className={`w-9 h-9 flex items-center justify-center rounded-lg font-bold text-sm transition-all ${
                          currentPage === page
                            ? "bg-rose-400 text-white shadow-md shadow-rose-200"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200"
                        }`}
                      >
                        {page}
                      </button>
                    )
                  )}
                </div>

                <button
                  onClick={() =>
                    handlePageChange(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Trang sau
                </button>
                <button
                  onClick={() => handlePageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Cuối
                </button>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
