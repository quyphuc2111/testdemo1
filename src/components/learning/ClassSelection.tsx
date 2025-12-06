import React from "react";
import { ClassInfo } from "@/lib/learning-data";
import { motion } from "motion/react";
import Image from "next/image";

interface ClassSelectionProps {
  classes: ClassInfo[];
  onSelectClass: (classId: string) => void;
}

export const ClassSelection = ({
  classes,
  onSelectClass,
}: ClassSelectionProps) => {
  const primaryClasses = classes.filter((c) => c.level === "primary");
  const secondaryClasses = classes.filter((c) => c.level === "secondary");
  const highClasses = classes.filter((c) => c.level === "high");

  const renderSection = (
    title: string,
    items: ClassInfo[],
    icon: string,
    colorClass: string
  ) => {
    if (items.length === 0) return null;

    return (
      <div className="mb-12">
        <div
          className={`flex gap-4 items-center p-6 mb-8 bg-opacity-10 rounded-2xl border border-opacity-20 ${colorClass}`}
        >
          <div className={`p-3 bg-white rounded-full shadow-sm`}>
            <Image
              src={icon}
              alt={title}
              width={32}
              height={32}
              className="w-8 h-8"
              unoptimized
            />
          </div>
          <div>
            <h2
              className={`text-2xl font-bold ${colorClass
                .replace("bg-", "text-")
                .replace("-100", "-700")}`}
            >
              {title}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Cấp học trong hệ thống giáo dục
            </p>
          </div>
          <div className="ml-auto">
            <span
              className={`px-4 py-2 rounded-full bg-white font-bold shadow-sm ${colorClass
                .replace("bg-", "text-")
                .replace("-100", "-600")}`}
            >
              {items.length} lớp học
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => onSelectClass(item.id)}
              className="overflow-hidden bg-white rounded-2xl border shadow-sm transition-all duration-300 cursor-pointer group border-slate-200 hover:shadow-xl hover:-translate-y-1"
            >
              {/* Decorative Header Image Area */}
              <div className="overflow-hidden relative h-32 bg-slate-100">
                {/* Placeholder for class specific illustration */}
                <div className="flex absolute inset-0 justify-center items-center text-4xl font-black select-none text-slate-200">
                  {item.name}
                </div>
                {/* We can add specific images later if provided */}
                <Image
                  src={`/images/gif/class-header-${(idx % 4) + 1}.gif`} // Fallback or random
                  alt={item.name}
                  fill
                  className="object-cover opacity-80 transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    // Fallback if image doesn't exist
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                  unoptimized
                />
                <div className="absolute inset-0 to-transparent bg-linear-to-t from-white/80" />

                <div className="absolute bottom-4 left-4">
                  <h3 className="text-2xl font-bold transition-colors text-slate-800 group-hover:text-indigo-600">
                    {item.name}
                  </h3>
                </div>
              </div>

              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.subjects.slice(0, 3).map((sub) => (
                    <span
                      key={sub}
                      className="px-2 py-1 text-xs font-medium rounded-md bg-slate-100 text-slate-600"
                    >
                      {sub}
                    </span>
                  ))}
                  {item.subjects.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium text-indigo-600 bg-indigo-50 rounded-md">
                      +{item.subjects.length - 3}
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-center pt-4 text-xs border-t text-slate-500 border-slate-100">
                  <span>{item.totalBooks} sách</span>
                  <span>{item.totalTopics} chủ đề</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-slate-800">
          Danh sách lớp học
        </h1>
        <p className="text-slate-500">Tìm thấy {classes.length} lớp học</p>
      </div>

      {renderSection(
        "Tiểu học",
        primaryClasses,
        "/images/gif/school.gif",
        "bg-pink-100 text-pink-700"
      )}
      {renderSection(
        "Trung học cơ sở",
        secondaryClasses,
        "/images/gif/student.gif",
        "bg-blue-100 text-blue-700"
      )}
      {renderSection(
        "Trung học phổ thông",
        highClasses,
        "/images/gif/book.gif",
        "bg-orange-100 text-orange-700"
      )}
    </div>
  );
};
