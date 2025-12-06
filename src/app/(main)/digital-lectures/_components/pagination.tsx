"use client";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems: number;
  pageSize: number;
};

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  pageSize,
}: PaginationProps) => {
  const getPageNumbers = (isMobile: boolean = false) => {
    const pages: (number | string)[] = [];
    const maxVisible = isMobile ? 3 : 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 2) {
        for (let i = 1; i <= (isMobile ? 2 : 4); i++) {
          pages.push(i);
        }
        if (!isMobile) {
          pages.push("...");
          pages.push(totalPages);
        }
      } else if (currentPage >= totalPages - 1) {
        if (!isMobile) {
          pages.push(1);
          pages.push("...");
        }
        for (let i = (isMobile ? totalPages - 1 : totalPages - 3); i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        if (!isMobile) {
          pages.push(1);
          pages.push("...");
        }
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        if (!isMobile) {
          pages.push("...");
          pages.push(totalPages);
        }
      }
    }

    return pages;
  };

  const startItem = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const endItem = totalItems === 0 ? 0 : Math.min(currentPage * pageSize, totalItems);

  const colors = {
    pink: "#FF9AA2",
    blue: "#C7CEEA",
    yellow: "#FFDAC1",
    text: "#666",
    white: "#fff",
    border: "#EEE",
    hoverYellow: "#FFD1B3",
  };

  return (
    <div className="w-full mt-8 bg-white border border-gray-200 rounded-xl px-3 sm:px-5 py-3 sm:py-4 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
      <div className="text-[12px] sm:text-[14px] text-gray-600 order-2 sm:order-1">
        Hiển thị {startItem}-{endItem} trên {totalItems}
      </div>
      <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap order-1 sm:order-2">
        {/* First Button */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="cursor-pointer text-[12px] sm:text-[16px]"
          style={{
            minWidth: "auto",
            height: 36,
            padding: "0 8px",
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 600,
            fontSize: "inherit",
            borderRadius: 10,
            border: "none",
            backgroundColor: currentPage === 1 ? "#f0f0f0" : colors.yellow,
            color: currentPage === 1 ? "#ccc" : "#555",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Đầu
        </button>

        {/* Previous Button */}
        <button
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="cursor-pointer text-[12px] sm:text-[16px]"
          style={{
            minWidth: "auto",
            height: 36,
            padding: "0 8px",
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 600,
            fontSize: "inherit",
            borderRadius: 10,
            border: "none",
            backgroundColor: currentPage === 1 ? "#f0f0f0" : colors.yellow,
            color: currentPage === 1 ? "#ccc" : "#555",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          <span className="hidden sm:inline">Trang trước</span>
          <span className="sm:hidden">Trước</span>
        </button>

        {/* Page Numbers - Desktop */}
        <div className="hidden sm:flex items-center gap-1.5 sm:gap-2">
          {getPageNumbers(false).map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="px-2 text-gray-500 text-[16px]"
                >
                  ...
                </span>
              );
            }

            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className="cursor-pointer"
                style={{
                  minWidth: 40,
                  height: 40,
                  padding: "0 10px",
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: 600,
                  fontSize: 16,
                  borderRadius: 12,
                  border: `2px solid ${isActive ? colors.pink : colors.border}`,
                  backgroundColor: isActive ? colors.pink : colors.white,
                  color: isActive ? colors.white : colors.text,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = colors.blue;
                    e.currentTarget.style.borderColor = colors.blue;
                    e.currentTarget.style.color = colors.white;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = colors.white;
                    e.currentTarget.style.borderColor = colors.border;
                    e.currentTarget.style.color = colors.text;
                  }
                }}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Page Numbers - Mobile */}
        <div className="flex sm:hidden items-center gap-1.5">
          {getPageNumbers(true).map((page, index) => {
            const pageNum = page as number;
            const isActive = pageNum === currentPage;

            return (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className="cursor-pointer"
                style={{
                  minWidth: 32,
                  height: 32,
                  padding: "0 8px",
                  fontFamily: "'Fredoka', sans-serif",
                  fontWeight: 600,
                  fontSize: 14,
                  borderRadius: 8,
                  border: `2px solid ${isActive ? colors.pink : colors.border}`,
                  backgroundColor: isActive ? colors.pink : colors.white,
                  color: isActive ? colors.white : colors.text,
                }}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="cursor-pointer text-[12px] sm:text-[16px]"
          style={{
            minWidth: "auto",
            height: 36,
            padding: "0 8px",
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 600,
            fontSize: "inherit",
            borderRadius: 10,
            border: "none",
            backgroundColor: currentPage === totalPages ? "#f0f0f0" : colors.yellow,
            color: currentPage === totalPages ? "#ccc" : "#555",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          <span className="hidden sm:inline">Trang sau</span>
          <span className="sm:hidden">Sau</span>
        </button>

        {/* Last Button */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="cursor-pointer text-[12px] sm:text-[16px]"
          style={{
            minWidth: "auto",
            height: 36,
            padding: "0 8px",
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 600,
            fontSize: "inherit",
            borderRadius: 10,
            border: "none",
            backgroundColor: currentPage === totalPages ? "#f0f0f0" : colors.yellow,
            color: currentPage === totalPages ? "#ccc" : "#555",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Cuối
        </button>
      </div>
    </div>
  );
};

export default Pagination;

