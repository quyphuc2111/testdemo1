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
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("...");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("...");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("...");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();
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
    <div className="w-full mt-8 bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
      <div className="text-[14px] text-gray-600">
        Hiển thị {startItem}-{endItem} trên {totalItems}
      </div>
      <div className="flex items-center justify-center gap-2 flex-wrap">
        {/* First Button */}
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="cursor-pointer"
          style={{
            minWidth: 40,
            height: 40,
            padding: "0 16px",
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 600,
            fontSize: 16,
            borderRadius: 12,
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
          className="cursor-pointer"
          style={{
            minWidth: 40,
            height: 40,
            padding: "0 16px",
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 600,
            fontSize: 16,
            borderRadius: 12,
            border: "none",
            backgroundColor: currentPage === 1 ? "#f0f0f0" : colors.yellow,
            color: currentPage === 1 ? "#ccc" : "#555",
            cursor: currentPage === 1 ? "not-allowed" : "pointer",
          }}
        >
          Trang trước
        </button>

        {/* Page Numbers */}
        {pageNumbers.map((page, index) => {
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

        {/* Next Button */}
        <button
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="cursor-pointer"
          style={{
            minWidth: 40,
            height: 40,
            padding: "0 16px",
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 600,
            fontSize: 16,
            borderRadius: 12,
            border: "none",
            backgroundColor: currentPage === totalPages ? "#f0f0f0" : colors.yellow,
            color: currentPage === totalPages ? "#ccc" : "#555",
            cursor: currentPage === totalPages ? "not-allowed" : "pointer",
          }}
        >
          Trang sau
        </button>

        {/* Last Button */}
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="cursor-pointer"
          style={{
            minWidth: 40,
            height: 40,
            padding: "0 16px",
            fontFamily: "'Fredoka', sans-serif",
            fontWeight: 600,
            fontSize: 16,
            borderRadius: 12,
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

