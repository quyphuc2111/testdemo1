"use client";

import { parseLearningData, MOCK_DB_DATA } from "../../../_data/mock-data";
import { ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function TopicDetailPage({
  params,
}: {
  params: Promise<{ classId: string; subjectId: string; topicId: string }>;
}) {
  const {
    classId: rawClassId,
    subjectId: rawSubjectId,
    topicId: rawTopicId,
  } = React.use(params);

  const classId = decodeURIComponent(rawClassId);
  const subjectId = decodeURIComponent(rawSubjectId);
  const topicId = decodeURIComponent(rawTopicId);

  // Search globally across all data to find the topic by ID
  // This bypasses potential encoding mismatches in class/subject params
  const allTopics = parseLearningData(MOCK_DB_DATA);
  const topic = allTopics.find((t) => t.id === topicId);

  if (!topic) {
    return (
      <div className="min-h-screen flex items-center justify-center flex-col gap-4 pt-20">
        <AlertCircle size={48} className="text-[#FFB7B2]" />
        <h1 className="text-xl font-bold text-gray-500">
          Không tìm thấy chủ đề
        </h1>
        <Link
          href={`/digital-learning-exam/${classId}/${subjectId}`}
          className="px-6 py-2 bg-[#B5EAD7] text-[#557C6C] rounded-xl font-bold hover:brightness-95 transition-all"
        >
          Quay lại
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-36 px-4 xl:px-8 pb-10 bg-white">
      <div className="max-w-[1280px] mx-auto">
        {/* Header Navigation */}
        <div className="mb-6 flex items-center gap-4">
          <Link
            href={`/digital-learning-exam/${classId}/${subjectId}`}
            className="p-3 bg-[#B5EAD7] rounded-2xl text-[#557C6C] hover:brightness-95 transition-all"
          >
            <ArrowLeft size={24} strokeWidth={2.5} />
          </Link>

          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-3 py-1 bg-[#D7E3FC] text-[#4A5568] text-xs font-bold rounded-lg uppercase tracking-wider">
                {classId}
              </span>
              <span className="px-3 py-1 bg-[#E2F0CB] text-[#71825B] text-xs font-bold rounded-lg uppercase tracking-wider">
                {topic.book || "Chưa phân loại"}
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black text-[#004C70] line-clamp-1">
              {topic.name}
            </h1>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-[32px] p-2 md:p-4 border-2 border-[#E2F0CB]">
          {/* Video/Webview Container */}
          <div className="relative w-full aspect-video rounded-3xl overflow-hidden bg-black/5">
            {topic.url ? (
              <iframe
                src={topic.url}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={topic.name}
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center flex-col gap-3 text-gray-400">
                <AlertCircle size={40} />
                <span className="font-medium">Chưa có liên kết chủ đề</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
