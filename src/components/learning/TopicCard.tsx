import React, { useState } from "react";
import { Topic, Lesson } from "@/lib/learning-data";
import {
  FaCheckCircle,
  FaExternalLinkAlt,
  FaFileAlt,
  FaVideo,
  FaQuestionCircle,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { cn, logEvent } from "@/lib/utils";
import { LessonViewer } from "./LessonViewer";
import { motion } from "motion/react";
import Image from "next/image";

interface TopicCardProps {
  topic: Topic;
}

const LessonItem = ({
  lesson,
  onOpen,
}: {
  lesson: Lesson;
  onOpen: (l: Lesson) => void;
}) => {
  // Determine icon based on lesson type/name
  const getIcon = () => {
    if (lesson.type === "exam")
      return <FaQuestionCircle className="text-orange-500" />;
    if (lesson.name.toLowerCase().includes("video"))
      return <FaVideo className="text-red-500" />;
    return <FaFileAlt className="text-blue-500" />;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      className="group flex items-center justify-between p-2.5 hover:bg-slate-50 rounded-lg transition-colors border border-transparent hover:border-slate-100 mb-1"
    >
      <div className="flex overflow-hidden gap-3 items-center">
        <div className="shrink-0 mt-0.5">{getIcon()}</div>
        <div className="min-w-0">
          <div
            className="text-sm font-medium truncate cursor-pointer text-slate-700 group-hover:text-indigo-700"
            onClick={() => onOpen(lesson)}
            title={lesson.name}
          >
            {lesson.name}
          </div>
        </div>
      </div>

      <div className="flex gap-1 items-center opacity-0 transition-opacity shrink-0 group-hover:opacity-100">
        {lesson.status === "done" && (
          <FaCheckCircle
            className="text-xs text-green-500"
            title="Đã hoàn thành"
          />
        )}
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6 text-slate-400 hover:text-indigo-600"
          onClick={(e) => {
            e.stopPropagation();
            onOpen(lesson);
          }}
          title="Mở tài liệu"
        >
          <FaExternalLinkAlt size={10} />
        </Button>
      </div>
    </motion.div>
  );
};

export const TopicCard = ({ topic }: TopicCardProps) => {
  const [viewingLesson, setViewingLesson] = useState<Lesson | null>(null);
  const [showAll, setShowAll] = useState(false);

  const DISPLAY_LIMIT = 5;
  const visibleLessons = showAll
    ? topic.lessons
    : topic.lessons.slice(0, DISPLAY_LIMIT);
  const hasMore = topic.lessons.length > DISPLAY_LIMIT;

  const handleOpenLesson = (lesson: Lesson) => {
    logEvent("open_lesson", { lessonId: lesson.id, type: "new_tab" });
    if (lesson.url) {
      window.open(lesson.url, "_blank");
    } else {
      setViewingLesson(lesson);
    }
  };

  // Generate a color based on subject or random
  const getHeaderColor = () => {
    const subject = topic.subject?.toLowerCase() || "";
    if (subject.includes("toán")) return "bg-blue-600";
    if (subject.includes("việt")) return "bg-green-600";
    if (subject.includes("anh")) return "bg-purple-600";
    return "bg-indigo-600";
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        exit={{ opacity: 0, scale: 0.95 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        className="flex overflow-hidden flex-col h-full bg-white rounded-xl border shadow-sm transition-all duration-300 border-slate-200 hover:shadow-md group"
      >
        {/* Card Header */}
        <div
          className={cn(
            "overflow-hidden relative p-4 text-white",
            getHeaderColor()
          )}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 transform translate-x-2 -translate-y-2">
            <Image
              src="/images/gif/file.gif"
              alt="Logo"
              width={60}
              height={60}
            />
          </div>

          <div className="relative z-10">
            <div className="flex gap-2 items-center mb-1 text-xs font-medium opacity-90">
              <span className="bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                {topic.class}
              </span>
              {topic.subject && (
                <span className="bg-white/20 px-2 py-0.5 rounded-full backdrop-blur-sm">
                  {topic.subject}
                </span>
              )}
            </div>
            <h3
              className="mb-2 text-lg font-bold leading-tight line-clamp-2"
              title={topic.name}
            >
              {topic.name}
            </h3>

            {topic.url && (
              <a
                href={topic.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex gap-1 items-center text-xs font-medium text-white/90 hover:text-white hover:underline"
              >
                <FaExternalLinkAlt size={10} /> Xem chi tiết chủ đề
              </a>
            )}
          </div>
        </div>

        {/* Card Body - Lesson List */}
        <div className="flex-1 p-3 bg-white">
          {topic.lessons.length > 0 ? (
            <div className="space-y-1">
              {visibleLessons.map((lesson) => (
                <LessonItem
                  key={lesson.id}
                  lesson={lesson}
                  onOpen={handleOpenLesson}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col justify-center items-center h-24 text-sm italic text-slate-400">
              <FaCheckCircle className="mb-2 text-3xl opacity-20" />
              Chưa có bài học
            </div>
          )}
        </div>

        {/* Card Footer */}
        {hasMore && (
          <div className="p-2 text-center border-t border-slate-100 bg-slate-50">
            <button
              onClick={() => setShowAll(!showAll)}
              className="text-xs font-medium text-indigo-600 transition-colors hover:text-indigo-700 hover:underline"
            >
              {showAll
                ? "Thu gọn"
                : `Xem thêm ${topic.lessons.length - DISPLAY_LIMIT} bài học`}
            </button>
          </div>
        )}
      </motion.div>

      <LessonViewer
        isOpen={!!viewingLesson}
        onClose={() => setViewingLesson(null)}
        url={viewingLesson?.url || null}
        title={viewingLesson?.name || ""}
      />
    </>
  );
};
