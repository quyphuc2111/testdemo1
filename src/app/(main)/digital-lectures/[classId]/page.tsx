"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGetLectureSubjects } from "@/hooks/digital-lecture/useDigitalLectureHook";
import LectureErrorComponent from "@/components/exceptions/lecture-error";
import LectureLoadingComponent from "@/components/exceptions/lecture-loading";

const SubjectListPage = () => {
  const params = useParams();
  const classId = params.classId as string;

  const { data: subjects, isLoading, isError, refetch } = useGetLectureSubjects(classId);

  const classNum = Number(classId);
  const isTieuHoc = classNum >= 1 && classNum <= 5;
  const heroBg = isTieuHoc ? "#FEF3F8" : "#EFF6FF";
  const heroBorder = isTieuHoc ? "#FBCFE8" : "#BFDBFE";

  return (
    <div className="min-h-screen pt-24 bg-white relative">
      {/* Main Content */}
      <div
        style={{ backgroundImage: 'url("/images/subjects/bg_subject.png")' }}
        className="w-full min-h-screen bg-cover bg-center bg-no-repeat pb-12 sm:pb-16 md:pb-24"
      >
        <div className="max-w-[1440px] h-full mx-auto px-4 sm:px-6 md:px-8 xl:px-8 2xl:px-12 py-6 sm:py-8 md:py-12 relative z-10">
          {/* Hero container styled like section blocks */}
          <div
            className="mb-6 sm:mb-8 mt-6 md:mt-0 p-4 sm:p-5 md:p-6 rounded-2xl sm:rounded-3xl relative overflow-hidden border-3"
            style={{ backgroundColor: heroBg, borderColor: heroBorder }}
          >
            <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4 relative z-10">
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                <Link
                  href="/digital-lectures"
                  className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-3 text-[#0F3550] shrink-0"
                  style={{ borderColor: heroBorder }}
                >
                  <ArrowLeft size={18} className="sm:w-5 sm:h-5" />
                </Link>
                <div className="flex flex-col gap-0.5 sm:gap-1 min-w-0 flex-1">
                  <h2 className="text-[18px] sm:text-[20px] md:text-[24px] xl:text-[28px] font-bold text-[#0F3550] leading-tight truncate">
                    Danh sách môn học
                  </h2>
                  <p className="text-[12px] sm:text-[13px] md:text-[14px]" style={{ color: "#0F3550B3" }}>
                    Chọn môn học để xem bài giảng
                  </p>
                </div>
              </div>
              <div className="flex items-center shrink-0">
                <div
                  className="bg-white rounded-full px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 border-3"
                  style={{ borderColor: heroBorder }}
                >
                  <div className="text-[18px] sm:text-[20px] md:text-[24px] xl:text-[28px] font-black leading-none text-center whitespace-nowrap" style={{ color: "#0F3550" }}>
                    Lớp {classId}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && <LectureLoadingComponent />}

          {/* Error State */}
          {isError && (
            <LectureErrorComponent onRetry={() => {
              refetch();
            }} />
          )}

          {/* Subject Grid */}
          {!isLoading && !isError && subjects && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
              {subjects.map((subject, index) => {
                const bgColors = ['#B5EAD7', '#FFB7B2', '#E2F0CB', '#FFDAC1'];
                const bgColor = bgColors[index % bgColors.length]; // Cycle mainly through pastel backgrounds

                return (
                  <Link
                    key={subject.id}
                    href={`/digital-lectures/${classId}/${subject.id}`}
                    className="block h-full"
                  >
                    <div
                      className="group relative h-[120px] sm:h-[130px] md:h-[140px] bg-white rounded-2xl sm:rounded-3xl border-2 flex overflow-hidden transition-transform hover:scale-[1.02] active:scale-[0.98]"
                      style={{ borderColor: bgColor }}
                    >
                      {/* Left Decoration Strip */}
                      <div
                        className="w-20 sm:w-24 md:w-32 h-full shrink-0"
                        style={{ backgroundColor: bgColor }}
                      />
                      {/* Right Content Area */}
                      <div className="flex-1 py-3 sm:py-4 md:py-5 pl-3 sm:pl-4 md:pl-5 pr-2 flex flex-col justify-center min-w-0">
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold opacity-60 mb-0.5 sm:mb-1 truncate" style={{ color: '#0F3550' }}>Môn học</span>
                        <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-black leading-tight text-[#0F3550] truncate">
                          {subject.name}
                        </h3>
                        <div className="mt-2 sm:mt-3 flex items-center text-[11px] sm:text-xs md:text-sm font-semibold opacity-70 flex-wrap gap-1" style={{ color: '#0F3550' }}>
                          <span>{subject.bookCount} bộ sách</span>
                          <span className="mx-1 sm:mx-2">•</span>
                          <span>{subject.topicCount} chủ đề</span>
                        </div>
                      </div>
                      {/* Right Arrow */}
                      <div className="w-8 sm:w-10 md:w-12 flex items-center justify-center shrink-0 mr-1 sm:mr-2">
                        <ArrowRight size={20} className="sm:w-6 sm:h-6 text-[#0F3550] opacity-40" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>


    </div>
  );
};

export default SubjectListPage;
