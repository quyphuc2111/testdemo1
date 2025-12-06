"use client";

import React from "react";
import Link from "next/link";
import {
  getSubjectsForClass,
  MOCK_DB_DATA,
  getCategoriesBySubject,
} from "../_data/mock-data";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function ClassPage({
  params,
}: {
  params: Promise<{ classId: string }>;
}) {
  const { classId: rawClassId } = React.use(params);
  const classId = decodeURIComponent(rawClassId);

  const subjects = getSubjectsForClass(MOCK_DB_DATA, classId);

  // Parse class number for styling
  const classNumStr = classId.replace(/\D/g, "");
  const classNum = parseInt(classNumStr) || 1;
  const isTieuHoc = classNum >= 1 && classNum <= 5;
  const heroBg = isTieuHoc ? "#FEF3F8" : "#EFF6FF";
  const heroBorder = isTieuHoc ? "#FBCFE8" : "#BFDBFE";
  // const heroAccent = isTieuHoc ? "#EC4899" : "#3B82F6"; // Unused

  return (
    <div className="min-h-screen pt-24 bg-white relative">
      {/* Main Content */}
      <div
        style={{ backgroundImage: 'url("/images/subjects/bg_subject.png")' }}
        className="w-full min-h-screen bg-cover bg-center bg-no-repeat pb-24"
      >
        <div className="max-w-[1440px] h-full mx-auto px-4 xl:px-8 2xl:px-12 py-12 relative z-10">
          {/* Hero container styled like section blocks */}
          <div
            className="mb-8 p-6 rounded-3xl relative overflow-hidden border-3"
            style={{ backgroundColor: heroBg, borderColor: heroBorder }}
          >
            <div className="flex items-center justify-between flex-wrap gap-4 relative z-10">
              <div className="flex items-center gap-4">
                <Link
                  href="/digital-learning-exam"
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white border-3 text-[#0F3550] shrink-0"
                  style={{ borderColor: heroBorder }}
                >
                  <ArrowLeft size={20} />
                </Link>
                <div className="flex flex-col gap-1">
                  <h2 className="text-[24px] xl:text-[28px] font-bold text-[#0F3550] leading-tight">
                    Danh sách môn học
                  </h2>
                  <p className="text-[14px]" style={{ color: "#0F3550B3" }}>
                    Chọn môn học để xem bài học và bài thi
                  </p>
                </div>
              </div>
              <div className="flex items-center">
                <div
                  className="bg-white rounded-full px-5 py-3 border-3"
                  style={{ borderColor: heroBorder }}
                >
                  <div
                    className="text-[24px] xl:text-[28px] font-black leading-none text-center"
                    style={{ color: "#0F3550" }}
                  >
                    {classId}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Subject Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subjects.map((subject, index) => {
              const bgColors = ["#B5EAD7", "#FFB7B2", "#E2F0CB", "#FFDAC1"];
              const bgColor = bgColors[index % bgColors.length]; // Cycle mainly through pastel backgrounds

              return (
                <Link
                  key={subject.id}
                  href={`/digital-learning-exam/${encodeURIComponent(
                    classId
                  )}/${encodeURIComponent(subject.id)}`}
                  className="block h-full"
                >
                  <div
                    className="group relative h-[140px] bg-white rounded-3xl border-2 flex overflow-hidden"
                    style={{ borderColor: bgColor }}
                  >
                    {/* Left Decoration Strip */}
                    <div
                      className="w-32 h-full shrink-0"
                      style={{ backgroundColor: bgColor }}
                    />
                    {/* Right Content Area */}
                    <div className="flex-1 py-5 pl-5 pr-2 flex flex-col justify-center">
                      <span
                        className="text-xs uppercase tracking-wider font-bold opacity-60 mb-1"
                        style={{ color: "#0F3550" }}
                      >
                        Môn học
                      </span>
                      <h3 className="text-[20px] font-black leading-tight text-[#0F3550]">
                        {subject.name}
                      </h3>
                      <div
                        className="mt-3 flex items-center text-sm font-semibold opacity-70"
                        style={{ color: "#0F3550" }}
                      >
                        <span>
                          {getCategoriesBySubject(subject.id, classId).length}{" "}
                          bộ sách
                        </span>
                        {/* <span className="mx-2">•</span> */}
                        {/* <span>{getCategoriesBySubject(subject.id).reduce((acc, cat) => acc + (cat.children?.length || 0), 0)} chủ đề</span> */}
                      </div>
                    </div>
                    {/* Right Arrow */}
                    <div className="w-12 flex items-center justify-center shrink-0 mr-2">
                      <ArrowRight
                        size={24}
                        className="text-[#0F3550] opacity-40"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
