"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useGetLectureSubjects, useGetLectureClasses } from "@/hooks/digital-lecture/useDigitalLectureHook";
import LectureErrorComponent from "@/components/exceptions/lecture-error";
import LectureLoadingComponent from "@/components/exceptions/lecture-loading";
import LectureEmptyComponent from "@/components/exceptions/lecture-empty";

const SubjectListPage = () => {
  const params = useParams();
  const classId = params.classId as string;

  const { data: subjects, isLoading, isError, refetch } = useGetLectureSubjects(classId);

  // Fetch classes to get schoolLevel
  const { data: classesData } = useGetLectureClasses();
  const currentClass = classesData?.find((cls) => cls.id === Number(classId));
  const isPrimarySchool = currentClass?.schoolLevel === "Tiểu học";
  const heroBg = isPrimarySchool ? "#FEF3F8" : "#EFF6FF";
  const heroBorder = isPrimarySchool ? "#FBCFE8" : "#BFDBFE";

  return (
    <div className="min-h-screen pt-20 bg-white relative">
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
          {!isLoading && !isError && subjects && subjects.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
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
                      className="group relative h-[120px] sm:h-[140px] md:h-[140px] bg-white rounded-2xl sm:rounded-3xl border-2 flex overflow-hidden transition-transform "
                      style={{ borderColor: bgColor }}
                    >
                      {/* Left Decoration Strip */}
                      <div
                        className="w-20 sm:w-24 md:w-32 h-full shrink-0"
                        style={{ backgroundColor: bgColor }}
                      />
                      {/* Right Content Area */}
                      <div className="flex-1 py-3 sm:py-4 md:py-5 pl-3 sm:pl-4 md:pl-5 pr-2 flex flex-col justify-center min-w-0">
                        <span className="text-[10px] sm:text-xs uppercase tracking-wider font-bold opacity-60 mb-1.5 sm:mb-2 truncate" style={{ color: '#0F3550' }}>Môn học</span>
                        <h3 className="text-[16px] sm:text-[18px] md:text-[20px] font-black leading-tight text-[#0F3550] truncate mb-3 sm:mb-4">
                          {subject.name}
                        </h3>
                        <div className="flex items-center flex-nowrap gap-1.5 sm:gap-2">
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-semibold bg-[#E8F1FF] text-[#0F3550] border border-[#BFDBFE]">
                            {subject.bookCount} bộ sách
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-semibold bg-[#E2F0CB] text-[#0F3550] border border-[#B5EAD7]">
                            {subject.topicCount} chủ đề
                          </span>
                          <span className="inline-flex items-center px-2 py-1 rounded-md text-[10px] sm:text-[11px] font-semibold bg-[#FEF3F8] text-[#0F3550] border border-[#FBCFE8]">
                            {subject.lessonCount} bài giảng
                          </span>
                        </div>
                      </div>

                    </div>
                  </Link>
                );
              })}
            </div>
          ) : !isLoading && !isError && subjects && subjects.length === 0 ? (
            <LectureEmptyComponent
              title="Chưa có môn học"
              description={`Hiện tại chưa có môn học nào trong lớp ${classId}`}
            />
          ) : null}
        </div>
      </div>


    </div>
  );
};

export default SubjectListPage;
