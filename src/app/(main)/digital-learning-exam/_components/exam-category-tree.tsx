"use client";

import { motion } from "motion/react";
import { useState } from "react";
import {
  BookOpen,
  Folder,
  ChevronRight,
  Grid3x3,
  LayoutGrid,
} from "lucide-react";
import React from "react";

type Category = {
  id: number | string;
  name: string;
  children?: Category[];
};

type ExamCategoryTreeProps = {
  categories: Category[];
  selectedCategory: number | string | null;
  onSelectCategory: (categoryId: number | string | null) => void;
};

// Pastel Color Palette
const COLORS = {
  selected: "bg-[#FFB7B2] text-white", // Pastel Pink
  allParams: "bg-[#FFDAC1] text-[#8C6A5D]", // Pastel Peach
  book: "bg-[#B5EAD7] text-[#557C6C]", // Pastel Mint
  topic: "bg-[#E2F0CB] text-[#71825B]", // Pastel Lime
  white: "bg-white text-gray-700",
};

// Icon components with "cute" wrappers
const IconWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={`p-1.5 rounded-full bg-white/40 backdrop-blur-sm ${className}`}
  >
    {children}
  </div>
);

const BookIcon = ({ isSelected }: { isSelected: boolean }) => (
  <IconWrapper className={isSelected ? "text-white" : "text-[#557C6C]"}>
    <BookOpen size={18} strokeWidth={2.5} />
  </IconWrapper>
);

const TopicIcon = ({ isSelected }: { isSelected: boolean }) => (
  <IconWrapper className={isSelected ? "text-white" : "text-[#71825B]"}>
    <Folder size={16} strokeWidth={2.5} />
  </IconWrapper>
);

const ChevronIcon = ({
  isExpanded,
  isSelected,
}: {
  isExpanded: boolean;
  isSelected: boolean;
}) => (
  <motion.div
    animate={{ rotate: isExpanded ? 90 : 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 20 }}
    className={`p-1 rounded-full ${
      isSelected ? "text-white" : "text-black/20"
    }`}
  >
    <ChevronRight size={18} strokeWidth={3} />
  </motion.div>
);

const ExamCategoryTree = ({
  categories,
  selectedCategory,
  onSelectCategory,
}: ExamCategoryTreeProps) => {
  const [expandedCategories, setExpandedCategories] = useState<
    Set<number | string>
  >(new Set());

  const toggleCategory = (categoryId: number | string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const handleCategoryClick = (categoryId: number | string) => {
    onSelectCategory(categoryId);
  };

  const renderCategory = (category: Category, level: number = 0) => {
    // Only render up to level 1 (Topic), not level 2 (Lesson)
    if (level > 1) {
      return null;
    }

    const hasChildren =
      category.children && category.children.length > 0 && level < 1;
    const isExpanded = expandedCategories.has(category.id);
    const isSelected = selectedCategory === category.id;
    const isBook = level === 0;

    // Determine Base Color Class
    let colorClass = isBook ? COLORS.book : COLORS.topic;
    if (isSelected) colorClass = COLORS.selected;

    return (
      <div key={category.id} className="mb-2">
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer select-none transition-colors hover:brightness-95 active:scale-[0.98] ${colorClass}`}
          style={{
            marginLeft: level === 0 ? 0 : "16px",
            width: level === 0 ? "100%" : "calc(100% - 16px)",
          }}
          onClick={() => {
            if (hasChildren) {
              toggleCategory(category.id);
            }
            handleCategoryClick(category.id);
          }}
        >
          {/* Icon */}
          <div className="shrink-0">
            {isBook ? (
              <BookIcon isSelected={isSelected} />
            ) : (
              <TopicIcon isSelected={isSelected} />
            )}
          </div>

          {/* Category Name */}
          <span className="flex-1 text-[15px] xl:text-[16px] font-bold tracking-wide">
            {category.name}
          </span>

          {/* Chevron Icon for expandable */}
          {hasChildren && (
            <ChevronIcon isExpanded={isExpanded} isSelected={isSelected} />
          )}
        </div>

        {/* Children - Only render if level < 1 (i.e., only for Book level) */}
        {hasChildren && isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -5 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -5 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mt-1 space-y-1 overflow-hidden"
          >
            {category.children!.map((child) =>
              renderCategory(child, level + 1)
            )}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <div className="p-2">
      {/* Header */}
      <div className="mb-6 pb-2 border-b-2 border-dashed border-[#FFB7B2]/50">
        <h3 className="text-[20px] xl:text-[24px] font-black text-[#FF9AA2] flex items-center gap-3 tracking-tight">
          <div className="bg-[#FF9AA2] p-2 rounded-xl text-white rotate-3">
            <LayoutGrid size={24} strokeWidth={2.5} />
          </div>
          Danh mục
        </h3>
      </div>

      {/* Categories List */}
      <div className="space-y-2">
        {/* All Categories Option */}
        <div
          className={`flex items-center gap-3 px-4 py-3 rounded-2xl cursor-pointer select-none transition-colors hover:brightness-95 active:scale-[0.98] ${
            selectedCategory === null ? COLORS.selected : COLORS.allParams
          }`}
          onClick={() => onSelectCategory(null)}
        >
          <div className="shrink-0">
            <IconWrapper
              className={
                selectedCategory === null ? "text-white" : "text-[#8C6A5D]"
              }
            >
              <Grid3x3 size={20} strokeWidth={2.5} />
            </IconWrapper>
          </div>
          <span className="text-[15px] xl:text-[16px] font-bold tracking-wide">
            Tất cả
          </span>
        </div>

        {/* Category Tree */}
        {categories.map((category) => renderCategory(category))}
      </div>
    </div>
  );
};

export default ExamCategoryTree;
