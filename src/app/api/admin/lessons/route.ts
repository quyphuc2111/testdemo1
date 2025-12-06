import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import {
  successResponse,
  errorResponse,
  normalizePagination,
  createPaginationMeta,
} from "@/lib/apiResponse";

// GET /api/admin/lessons?gradeId=&subjectId=&bookId=&topicId=&search=&page=&limit=
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const gradeIdParam = searchParams.get("gradeId");
    const subjectIdParam = searchParams.get("subjectId");
    const bookIdParam = searchParams.get("bookId");
    const topicIdParam = searchParams.get("topicId");
    const search = (searchParams.get("search") || "").trim();
    const { page, limit } = normalizePagination(
      searchParams.get("page"),
      searchParams.get("limit") || searchParams.get("pageSize"),
      20
    );

    const where: Prisma.LessonWhereInput = {};

    if (gradeIdParam) {
      const gradeId = Number(gradeIdParam);
      if (!Number.isNaN(gradeId)) where.gradeId = gradeId;
    }

    if (subjectIdParam) {
      const subjectId = Number(subjectIdParam);
      if (!Number.isNaN(subjectId)) where.subjectId = subjectId;
    }

    if (bookIdParam) {
      const bookId = Number(bookIdParam);
      if (!Number.isNaN(bookId)) where.bookId = bookId;
    }

    if (topicIdParam) {
      const topicId = Number(topicIdParam);
      if (!Number.isNaN(topicId)) where.topicId = topicId;
    }

    if (search) {
      where.lessonName = { contains: search };
    }

    const [lessons, total] = await Promise.all([
      prisma.lesson.findMany({
        where,
        include: {
          grade: true,
          subject: true,
          book: true,
          topic: true,
        },
        orderBy: { id: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.lesson.count({ where }),
    ]);

    const pagination = createPaginationMeta(page, limit, total);
    return NextResponse.json(
      successResponse(lessons, "Success", 200, pagination)
    );
  } catch (error) {
    console.error("GET /api/admin/lessons error:", error);
    return NextResponse.json(
      errorResponse("Không lấy được danh sách bài học", 500),
      { status: 500 }
    );
  }
}

// POST /api/admin/lessons
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const lessonName = (body?.lessonName || "").toString().trim();
    const gradeId = Number(body?.gradeId);
    const subjectId = Number(body?.subjectId);
    const bookId = Number(body?.bookId);
    const topicId = Number(body?.topicId);
    const lectureUrl = body?.lectureUrl
      ? body.lectureUrl.toString().trim()
      : null;

    if (
      !lessonName ||
      Number.isNaN(gradeId) ||
      Number.isNaN(subjectId) ||
      Number.isNaN(bookId) ||
      Number.isNaN(topicId)
    ) {
      return NextResponse.json(
        errorResponse("Thiếu hoặc sai dữ liệu (lessonName, gradeId, subjectId, bookId, topicId)", 400),
        { status: 400 }
      );
    }

    const lesson = await prisma.lesson.create({
      data: {
        lessonName,
        gradeId,
        subjectId,
        bookId,
        topicId,
        lectureUrl,
      },
    });

    return NextResponse.json(
      successResponse(lesson, "Tạo bài học thành công", 201, null)
    );
  } catch (error) {
    console.error("POST /api/admin/lessons error:", error);
    return NextResponse.json(
      errorResponse("Không tạo được bài học", 500),
      { status: 500 }
    );
  }
}
