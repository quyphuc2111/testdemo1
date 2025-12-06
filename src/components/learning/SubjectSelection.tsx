import React from "react";
import { SubjectInfo } from "@/lib/learning-data";
import { motion } from "motion/react";
import Image from "next/image";

interface SubjectSelectionProps {
  className: string;
  subjects: SubjectInfo[];
  onSelectSubject: (subjectId: string) => void;
  onBack: () => void;
}

export const SubjectSelection = ({
  className,
  subjects,
  onSelectSubject,
}: SubjectSelectionProps) => {
  // Helper to get background/image based on subject name
  const getSubjectStyle = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes("toán"))
      return {
        bg: "bg-blue-100",
        text: "text-blue-700",
        img: "/images/gif/math.gif",
      };
    if (n.includes("tiếng việt") || n.includes("ngữ văn"))
      return {
        bg: "bg-pink-100",
        text: "text-pink-700",
        img: "/images/gif/literature.gif",
      };
    if (n.includes("tiếng anh"))
      return {
        bg: "bg-purple-100",
        text: "text-purple-700",
        img: "/images/gif/english.gif",
      };
    if (n.includes("khoa học") || n.includes("vật lý") || n.includes("hóa"))
      return {
        bg: "bg-green-100",
        text: "text-green-700",
        img: "/images/gif/science.gif",
      };
    if (n.includes("lịch sử") || n.includes("địa"))
      return {
        bg: "bg-orange-100",
        text: "text-orange-700",
        img: "/images/gif/history.gif",
      };
    if (n.includes("tin học") || n.includes("công nghệ"))
      return {
        bg: "bg-indigo-100",
        text: "text-indigo-700",
        img: "/images/gif/tech.gif",
      };
    if (n.includes("đạo đức") || n.includes("gdcd"))
      return {
        bg: "bg-red-100",
        text: "text-red-700",
        img: "/images/gif/moral.gif",
      };

    return {
      bg: "bg-slate-100",
      text: "text-slate-700",
      img: "/images/gif/book.gif",
    };
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center p-4 mb-8 bg-pink-50 rounded-2xl border border-pink-100">
        <div className="flex gap-4 items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">
              Danh sách môn học
            </h1>
            <p className="text-sm text-slate-500">
              Chọn môn học để xem bài giảng
            </p>
          </div>
        </div>
        <div className="hidden md:block">
          <span className="px-4 py-2 font-bold text-pink-600 bg-white rounded-full border border-pink-100 shadow-sm">
            {className}
          </span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {subjects.map((subject, idx) => {
          const style = getSubjectStyle(subject.name);
          return (
            <motion.div
              key={subject.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onSelectSubject(subject.id)}
              className={`overflow-hidden relative h-48 rounded-2xl border-2 border-transparent shadow-sm transition-all duration-300 cursor-pointer group hover:border-indigo-200 hover:shadow-lg`}
            >
              {/* Background Image/Color */}
              <div
                className={`absolute inset-0 ${style.bg} opacity-80 transition-opacity group-hover:opacity-100`}
              >
                {/* We can add a pattern here if needed */}
              </div>

              {/* Content */}
              <div className="flex relative z-10 flex-col justify-between p-6 h-full">
                <h3
                  className={`text-3xl font-black text-white opacity-90 drop-shadow-md transition-opacity group-hover:opacity-100`}
                >
                  {subject.name}
                </h3>

                <div className="flex justify-between items-end">
                  <span className="px-4 py-2 font-bold bg-white rounded-lg shadow-sm transition-transform text-slate-800 group-hover:scale-105">
                    {subject.name}
                  </span>

                  {/* Icon */}
                  <div className="relative w-16 h-16 transition-transform duration-500 transform group-hover:scale-110 group-hover:-rotate-12">
                    <Image
                      src={style.img}
                      alt={subject.name}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
