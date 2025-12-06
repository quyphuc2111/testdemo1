import React, { useEffect, useState } from "react";
import {
  FaTimes,
  FaExternalLinkAlt,
  FaExpand,
  FaCompress,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

interface LessonViewerProps {
  isOpen: boolean;
  onClose: () => void;
  url: string | null;
  title: string;
}

export const LessonViewer = ({
  isOpen,
  onClose,
  url,
  title,
}: LessonViewerProps) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="flex fixed inset-0 z-50 justify-center items-center p-4 backdrop-blur-sm bg-black/80">
      <div
        className={`bg-white rounded-xl overflow-hidden flex flex-col shadow-2xl transition-all duration-300 ${
          isFullscreen
            ? "fixed inset-0 rounded-none"
            : "w-full max-w-5xl h-[80vh]"
        }`}
      >
        {/* Header */}
        <div className="flex justify-between items-center px-4 py-3 bg-white border-b border-slate-100">
          <h3 className="font-bold text-slate-800 truncate max-w-[60%]">
            {title}
          </h3>
          <div className="flex gap-2 items-center">
            {url && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open(url, "_blank")}
                title="Mở tab mới"
              >
                <FaExternalLinkAlt />
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsFullscreen(!isFullscreen)}
              title={isFullscreen ? "Thu nhỏ" : "Toàn màn hình"}
            >
              {isFullscreen ? <FaCompress /> : <FaExpand />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="hover:bg-red-50 hover:text-red-500"
            >
              <FaTimes size={20} />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="relative flex-1 bg-slate-50">
          {url ? (
            <iframe
              src={url}
              className="w-full h-full border-0"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
              title={title}
            />
          ) : (
            <div className="flex absolute inset-0 flex-col justify-center items-center text-slate-400">
              <div className="mb-4 text-4xl">⚠️</div>
              <p className="font-medium">Không tìm thấy liên kết bài học</p>
              <p className="mt-2 text-sm">
                Vui lòng liên hệ giáo viên hoặc quản trị viên.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
