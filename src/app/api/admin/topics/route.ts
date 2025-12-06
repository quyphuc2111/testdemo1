import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import {
  successResponse,
  errorResponse,
  normalizePagination,
  createPaginationMeta,
} from "@/lib/apiResponse";

// GET /api/admin/topics?gradeId=&subjectId=&bookId=&search=&page=&limit=
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const gradeIdParam = searchParams.get("gradeId");
    const subjectIdParam = searchParams.get("subjectId");
    const bookIdParam = searchParams.get("bookId");
    const search = (searchParams.get("search") || "").trim();
    const { page, limit } = normalizePagination(
      searchParams.get("page"),
      searchParams.get("limit") || searchParams.get("pageSize"),
      20
    );

    const where: Prisma.TopicWhereInput = {};

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

    if (search) {
      where.topicName = { contains: search };
    }

    const [topics, total] = await Promise.all([
      prisma.topic.findMany({
        where,
        include: {
          grade: true,
          subject: true,
          book: true,
        },
        orderBy: { topicName: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.topic.count({ where }),
    ]);

    const pagination = createPaginationMeta(page, limit, total);
    return NextResponse.json(
      successResponse(topics, "Success", 200, pagination)
    );
  } catch (error) {
    console.error("GET /api/admin/topics error:", error);
    return NextResponse.json(
      errorResponse("Không lấy được danh sách chủ đề", 500),
      { status: 500 }
    );
  }
}

// POST /api/admin/topics
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const topicName = (body?.topicName || "").toString().trim();
    const gradeId = Number(body?.gradeId);
    const subjectId = Number(body?.subjectId);
    const bookId = Number(body?.bookId);

    if (
      !topicName ||
      Number.isNaN(gradeId) ||
      Number.isNaN(subjectId) ||
      Number.isNaN(bookId)
    ) {
      return NextResponse.json(
        errorResponse("Thiếu hoặc sai dữ liệu (topicName, gradeId, subjectId, bookId)", 400),
        { status: 400 }
      );
    }

    const topic = await prisma.topic.create({
      data: { topicName, gradeId, subjectId, bookId },
    });

    return NextResponse.json(
      successResponse(topic, "Tạo chủ đề thành công", 201, null)
    );
  } catch (error) {
    console.error("POST /api/admin/topics error:", error);
    return NextResponse.json(
      errorResponse("Không tạo được chủ đề", 500),
      { status: 500 }
    );
  }
}
