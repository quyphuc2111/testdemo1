import React from "react";
import { RawLearningRow } from "@/lib/learning-data";
import Image from "next/image";

interface FilterState {
  class: string | null;
  subject: string | null;
  book: string | null;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string | null) => void;
  data: RawLearningRow[]; // Pass raw data to extract unique options
}

export const FilterSidebar = ({
  filters,
  onFilterChange,
  data,
}: FilterSidebarProps) => {
  // Extract unique options
  const classes = Array.from(
    new Set(data.map((d) => d.class).filter(Boolean))
  ) as string[];
  const subjects = Array.from(
    new Set(data.map((d) => d.subject).filter(Boolean))
  ) as string[];
  const books = Array.from(
    new Set(data.map((d) => d.book).filter(Boolean))
  ) as string[];

  return (
    <div className="p-4 bg-white rounded-xl border shadow-sm border-slate-200 h-fit lg:sticky lg:top-24">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-slate-800">Bộ lọc</h3>
        <button
          onClick={() => {
            onFilterChange("class", null);
            onFilterChange("subject", null);
            onFilterChange("book", null);
          }}
          className="flex gap-1 items-center text-xs text-indigo-600 hover:underline"
        >
          Xóa lọc
          <Image
            src="/images/gif/RemoveFilter.gif"
            alt="Xóa lọc"
            width={25}
            height={20}
            unoptimized
          />
        </button>
      </div>

      <div className="space-y-6">
        {/* Class Filter */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Lớp
          </label>
          <div className="flex flex-wrap gap-2">
            {classes.map((c) => (
              <button
                key={c}
                onClick={() =>
                  onFilterChange("class", filters.class === c ? null : c)
                }
                className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                  filters.class === c
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md"
                    : "bg-white text-slate-600 border-slate-200 hover:border-indigo-300"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Subject Filter */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Môn học
          </label>
          <div className="space-y-1">
            {subjects.map((s) => (
              <label
                key={s}
                className="flex gap-2 items-center p-1 rounded cursor-pointer hover:bg-slate-50"
              >
                <input
                  type="radio"
                  name="subject"
                  checked={filters.subject === s}
                  onChange={() =>
                    onFilterChange("subject", filters.subject === s ? null : s)
                  }
                  onClick={(e) => {
                    if (filters.subject === s) {
                      e.preventDefault();
                      onFilterChange("subject", null);
                    }
                  }}
                  className="w-4 h-4 text-indigo-600 border-slate-300 focus:ring-indigo-500"
                />
                <span className="text-sm text-slate-600">{s}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Book Filter */}
        <div>
          <label className="block mb-2 text-sm font-medium text-slate-700">
            Bộ sách
          </label>
          <select
            value={filters.book || ""}
            onChange={(e) => onFilterChange("book", e.target.value || null)}
            className="w-full text-sm rounded-lg border-slate-200 focus:ring-indigo-500 focus:border-indigo-500"
            aria-label="Chọn bộ sách"
          >
            <option value="">Tất cả sách</option>
            {books.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
