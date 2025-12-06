// src/lib/catalogImporter.ts
import * as XLSX from "xlsx";
import { prisma } from "./prisma";

// ===== CONFIG: Db Bài giảng =====
const LECTURE_SHEET_NAME = "Db Bài giảng";

const COL_SCHOOL_LEVEL = "school_level"; // Mới: Mầm non, Tiểu học, THCS, THPT
const COL_CLASS = "class";
const COL_SUBJECT = "subject";
const COL_BOOK = "book";
const COL_TOPIC_NAME = "topic_name";
const COL_LESSON_NAME = "lesson_name";
const COL_LECTURE_URL = "lecture_online_link";
const COL_IMAGE = "image"; // Mới: URL ảnh cho lớp
// ================================

// Đọc 1 sheet thành mảng dòng (object)
function loadSheetRows(workbook: XLSX.WorkBook, sheetName: string) {
  const sheet = workbook.Sheets[sheetName];
  if (!sheet) {
    throw new Error(`Không tìm thấy sheet: ${sheetName}`);
  }
  return XLSX.utils.sheet_to_json<any>(sheet, { defval: "" });
}

// ====== GET OR CREATE (ADD-ONLY, KHÔNG UPDATE) ======

// Auto-detect school level từ tên lớp
function detectSchoolLevel(gradeName: string): string {
  const name = gradeName.toLowerCase();
  if (name.includes("mầm non") || name.includes("mẫu giáo")) return "Mầm non";
  if (name.match(/lớp\s*[1-5]/)) return "Tiểu học";
  if (name.match(/lớp\s*[6-9]/)) return "Trung học cơ sở";
  if (name.match(/lớp\s*(10|11|12)/)) return "Trung học phổ thông";
  return "Tiểu học"; // Default
}

async function getOrCreateSchoolLevel(name: string) {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("School level name trống");

  const existing = await prisma.schoolLevel.findFirst({
    where: { levelName: trimmed },
  });

  if (existing) return existing;

  return prisma.schoolLevel.create({
    data: { levelName: trimmed },
  });
}

async function getOrCreateGrade(params: {
  name: string;
  schoolLevelId: number;
  image?: string | null;
}) {
  const { name, schoolLevelId, image } = params;
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Grade name trống");

  const existing = await prisma.grade.findFirst({
    where: { gradeName: trimmed },
  });

  if (existing) return existing;

  return prisma.grade.create({
    data: {
      gradeName: trimmed,
      schoolLevelId,
      image: image || null,
    },
  });
}

async function getOrCreateSubject(name: string) {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Subject name trống");

  const existing = await prisma.subject.findFirst({
    where: { subjectName: trimmed },
  });

  if (existing) return existing;

  return prisma.subject.create({
    data: { subjectName: trimmed },
  });
}

async function getOrCreateBook(name: string) {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Book name trống");

  const existing = await prisma.book.findFirst({
    where: { bookName: trimmed },
  });

  if (existing) return existing;

  return prisma.book.create({
    data: { bookName: trimmed },
  });
}

async function getOrCreateTopic(params: {
  name: string;
  gradeId: number;
  subjectId: number;
  bookId: number;
}) {
  const { name, gradeId, subjectId, bookId } = params;
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Topic name trống");

  const existing = await prisma.topic.findFirst({
    where: {
      topicName: trimmed,
      gradeId,
      subjectId,
      bookId,
    },
  });

  if (existing) return existing;

  return prisma.topic.create({
    data: {
      topicName: trimmed,
      gradeId,
      subjectId,
      bookId,
    },
  });
}

/**
 * ADD-ONLY:
 * - Nếu đã có Lesson (name + topicId) → TRẢ VỀ luôn, KHÔNG UPDATE lectureUrl
 * - Nếu chưa có → TẠO MỚI (có lectureUrl nếu Excel có)
 */
async function findOrCreateLesson(params: {
  name: string;
  gradeId: number;
  subjectId: number;
  bookId: number;
  topicId: number;
  lectureUrl?: string | null;
}) {
  const { name, gradeId, subjectId, bookId, topicId, lectureUrl } = params;
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Lesson name trống");

  const existing = await prisma.lesson.findFirst({
    where: {
      lessonName: trimmed,
      topicId,
    },
  });

  if (existing) {
    // ADD-ONLY: không đụng gì tới bản ghi cũ (kể cả lectureUrl)
    return existing;
  }

  return prisma.lesson.create({
    data: {
      lessonName: trimmed,
      gradeId,
      subjectId,
      bookId,
      topicId,
      lectureUrl: lectureUrl || null,
    },
  });
}

// ====== HÀM CHÍNH: IMPORT TỪ WORKBOOK (ADD-ONLY) ======

export async function importCatalogFromWorkbook(workbook: XLSX.WorkBook) {
  console.log("=== Import Db Bài giảng (ADD-ONLY) ===");
  const rows = loadSheetRows(workbook, LECTURE_SHEET_NAME);

  let lastSchoolLevel = "";
  let lastClass = "";
  let lastSubject = "";
  let lastBook = "";
  let lastTopic = "";
  let lastImage = "";

  let countLessonsCreated = 0;
  let countLessonsSkipped = 0;

  for (const raw of rows) {
    const schoolLevelName = (raw[COL_SCHOOL_LEVEL] || lastSchoolLevel || "")
      .toString()
      .trim();
    const className = (raw[COL_CLASS] || lastClass || "").toString().trim();
    const subjectName = (raw[COL_SUBJECT] || lastSubject || "")
      .toString()
      .trim();
    const bookName = (raw[COL_BOOK] || lastBook || "").toString().trim();
    const topicName = (raw[COL_TOPIC_NAME] || lastTopic || "")
      .toString()
      .trim();
    const lessonName = (raw[COL_LESSON_NAME] || "").toString().trim();
    const lectureUrl = (raw[COL_LECTURE_URL] || "").toString().trim() || null;
    const image = (raw[COL_IMAGE] || lastImage || "").toString().trim() || null;

    // Dòng trắng hoàn toàn → bỏ qua
    if (!className && !subjectName && !bookName && !topicName && !lessonName) {
      continue;
    }

    // Fill-down giống Excel: nếu ô trống thì dùng giá trị dòng trên
    if (schoolLevelName) lastSchoolLevel = schoolLevelName;
    if (className) lastClass = className;
    if (subjectName) lastSubject = subjectName;
    if (bookName) lastBook = bookName;
    if (topicName) lastTopic = topicName;
    if (image) lastImage = image;

    if (!lessonName) {
      console.warn("Bỏ qua 1 dòng vì thiếu lesson_name:", raw);
      continue;
    }

    // Xác định school level: ưu tiên từ Excel, fallback sang auto-detect
    const finalSchoolLevelName = schoolLevelName || detectSchoolLevel(className);
    const schoolLevel = await getOrCreateSchoolLevel(finalSchoolLevelName);

    const grade = await getOrCreateGrade({
      name: className,
      schoolLevelId: schoolLevel.id,
      image,
    });
    const subject = await getOrCreateSubject(subjectName);
    const book = await getOrCreateBook(bookName);
    const topic = await getOrCreateTopic({
      name: topicName,
      gradeId: grade.id,
      subjectId: subject.id,
      bookId: book.id,
    });

    // Kiểm tra xem lesson đã tồn tại chưa (add-only)
    const existingLesson = await prisma.lesson.findFirst({
      where: {
        lessonName: lessonName.trim(),
        topicId: topic.id,
      },
    });

    if (existingLesson) {
      // ĐÃ CÓ → bỏ qua, không update lectureUrl (tôn trọng chỉnh sửa admin)
      countLessonsSkipped++;
      continue;
    }

    await findOrCreateLesson({
      name: lessonName,
      gradeId: grade.id,
      subjectId: subject.id,
      bookId: book.id,
      topicId: topic.id,
      lectureUrl,
    });

    countLessonsCreated++;
  }

  console.log(
    `🎉 Import xong: tạo mới ${countLessonsCreated} bài học, bỏ qua (đã tồn tại) ${countLessonsSkipped} bài.`
  );
}
