"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MOCK_DB_DATA, parseLearningData } from "@/lib/learning-data";
import { LessonList } from "@/components/learning/LessonList";
import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft, FaArrowUp } from "react-icons/fa";

export default function SubjectPage({
  params,
}: {
  params: { classId: string; subjectId: string };
}) {
  const router = useRouter();
  const classId = decodeURIComponent(params.classId);
  const subjectId = decodeURIComponent(params.subjectId);

  const allTopics = useMemo(() => parseLearningData(MOCK_DB_DATA), []);

  const currentTopics = useMemo(() => {
    return allTopics.filter(
      (t) => t.class === classId && t.subject === subjectId
    );
  }, [allTopics, classId, subjectId]);

  const handleBackToClass = () => {
    router.push(`/digital-learning-exam/${encodeURIComponent(classId)}`);
  };

  // Scroll to top logic
  const [showScrollTop, setShowScrollTop] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900">
      {/* Header / Breadcrumb Area */}
      <div className="sticky top-0 z-40 bg-white border-b shadow-sm border-slate-200">
        <div className="container px-4 py-3 mx-auto">
          <div className="flex flex-col gap-4 justify-between md:flex-row md:items-center">
            <div className="flex gap-4 items-center">
              <button
                onClick={handleBackToClass}
                className="p-2 rounded-full transition-colors text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
                title="Quay lại"
              >
                <FaArrowLeft />
              </button>
              <Link
                href="/"
                className="flex gap-1 items-center text-xl font-bold text-indigo-900"
              >
                <Image
                  src="/images/gif/Learned.gif"
                  alt="Learn"
                  width={40}
                  height={40}
                  unoptimized
                />
                Học & Thi Trực Tuyến
              </Link>
            </div>

            {/* Breadcrumbs */}
            <div className="flex gap-2 items-center text-sm font-medium text-slate-500">
              <Link
                href="/digital-learning-exam"
                className="hover:text-indigo-600"
              >
                Trang chủ
              </Link>
              <span>/</span>
              <Link
                href={`/digital-learning-exam/${encodeURIComponent(classId)}`}
                className="hover:text-indigo-600"
              >
                {classId}
              </Link>
              <span>/</span>
              <span className="font-bold text-indigo-600">{subjectId}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="min-h-[calc(100vh-80px)] pt-8 pb-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <LessonList
            className={classId}
            subjectName={subjectId}
            topics={currentTopics}
            onBack={handleBackToClass}
          />
        </motion.div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={scrollToTop}
            className="fixed right-8 bottom-8 z-50 p-4 text-white bg-indigo-600 rounded-full shadow-xl transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-300"
            aria-label="Lên đầu trang"
          >
            <FaArrowUp />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
