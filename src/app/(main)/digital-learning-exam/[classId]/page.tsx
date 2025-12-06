"use client";

import React, { useMemo } from "react";
import { useRouter } from "next/navigation";
import { MOCK_DB_DATA, getSubjectsForClass } from "@/lib/learning-data";
import { SubjectSelection } from "@/components/learning/SubjectSelection";
import { motion } from "motion/react";
import Link from "next/link";
import Image from "next/image";
import { FaArrowLeft } from "react-icons/fa";

export default function ClassPage({ params }: { params: { classId: string } }) {
  const router = useRouter();
  const classId = decodeURIComponent(params.classId);

  const currentClassSubjects = useMemo(() => {
    return getSubjectsForClass(MOCK_DB_DATA, classId);
  }, [classId]);

  const handleSelectSubject = (subjectId: string) => {
    router.push(
      `/digital-learning-exam/${encodeURIComponent(
        classId
      )}/${encodeURIComponent(subjectId)}`
    );
  };

  const handleBackToHome = () => {
    router.push("/digital-learning-exam");
  };

  return (
    <div className="min-h-screen font-sans bg-slate-50 text-slate-900">
      {/* Header / Breadcrumb Area */}
      <div className="sticky top-0 z-40 bg-white border-b shadow-sm border-slate-200">
        <div className="container px-4 py-3 mx-auto">
          <div className="flex flex-col gap-4 justify-between md:flex-row md:items-center">
            <div className="flex gap-4 items-center">
              <button
                onClick={handleBackToHome}
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
              <span className="font-bold text-indigo-600">{classId}</span>
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
          <SubjectSelection
            className={classId}
            subjects={currentClassSubjects}
            onSelectSubject={handleSelectSubject}
            onBack={handleBackToHome}
          />
        </motion.div>
      </div>
    </div>
  );
}
