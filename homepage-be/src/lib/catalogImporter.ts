// src/lib/catalogImporter.ts
import * as XLSX from "xlsx";
import { prisma } from "./prisma";

// ===== CONFIG: Db Bài giảng =====
const LECTURE_SHEET_NAME = "Db Bài giảng";

const COL_CLASS = "class";
const COL_SUBJECT = "subject";
const COL_BOOK = "book";
const COL_TOPIC_NAME = "topic_name";
const COL_LESSON_NAME = "lesson_name";
const COL_LECTURE_URL = "lecture_online_link";
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

async function getOrCreateGrade(name: string) {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Grade name trống");

  const existing = await prisma.grade.findFirst({
    where: { name: trimmed },
  });

  if (existing) return existing;

  return prisma.grade.create({
    data: { name: trimmed },
  });
}

async function getOrCreateSubject(name: string) {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Subject name trống");

  const existing = await prisma.subject.findFirst({
    where: { name: trimmed },
  });

  if (existing) return existing;

  return prisma.subject.create({
    data: { name: trimmed },
  });
}

async function getOrCreateBook(name: string) {
  const trimmed = name.trim();
  if (!trimmed) throw new Error("Book name trống");

  const existing = await prisma.book.findFirst({
    where: { name: trimmed },
  });

  if (existing) return existing;

  return prisma.book.create({
    data: { name: trimmed },
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
      name: trimmed,
      gradeId,
      subjectId,
      bookId,
    },
  });

  if (existing) return existing;

  return prisma.topic.create({
    data: {
      name: trimmed,
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
      name: trimmed,
      topicId,
    },
  });

  if (existing) {
    // ADD-ONLY: không đụng gì tới bản ghi cũ (kể cả lectureUrl)
    return existing;
  }

  return prisma.lesson.create({
    data: {
      name: trimmed,
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

  let lastClass = "";
  let lastSubject = "";
  let lastBook = "";
  let lastTopic = "";

  let countLessonsCreated = 0;
  let countLessonsSkipped = 0;

  for (const raw of rows) {
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

    // Dòng trắng hoàn toàn → bỏ qua
    if (!className && !subjectName && !bookName && !topicName && !lessonName) {
      continue;
    }

    // Fill-down giống Excel: nếu ô trống thì dùng giá trị dòng trên
    if (className) lastClass = className;
    if (subjectName) lastSubject = subjectName;
    if (bookName) lastBook = bookName;
    if (topicName) lastTopic = topicName;

    if (!lessonName) {
      console.warn("Bỏ qua 1 dòng vì thiếu lesson_name:", raw);
      continue;
    }

    const grade = await getOrCreateGrade(className);
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
        name: lessonName.trim(),
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
