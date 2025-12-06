import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import {
  successResponse,
  errorResponse,
  normalizePagination,
  createPaginationMeta,
} from "@/lib/apiResponse";

// GET /api/grades?search=&page=&pageSize=  -> danh sách lớp (có tìm kiếm + phân trang)
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = (searchParams.get("search") || "").trim();
    const { page, limit } = normalizePagination(
      searchParams.get("page"),
      searchParams.get("limit") || searchParams.get("pageSize"), // support cả 2
      20
    );

    const where: Prisma.GradeWhereInput = {};

    if (search) {
      where.gradeName = {
        contains: search,
      };
    }

    const [grades, total] = await Promise.all([
      prisma.grade.findMany({
        where,
        include: {
          schoolLevel: true,
        },
        orderBy: { gradeName: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.grade.count({ where }),
    ]);

    const pagination = createPaginationMeta(page, limit, total);

    return NextResponse.json(
      successResponse(grades, "Success", 200, pagination)
    );
  } catch (error) {
    console.error("GET /api/admin/grades error:", error);
    return NextResponse.json(
      errorResponse("Không lấy được danh sách lớp", 500),
      { status: 500 }
    );
  }
}

// POST /api/grades  -> tạo lớp mới
// body: { name: string }
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const gradeName = (body?.name || "").toString().trim();
    const schoolLevelId = Number(body?.schoolLevelId);
    const image = body?.image?.toString().trim() || null;

    if (!gradeName || Number.isNaN(schoolLevelId)) {
      return NextResponse.json(
        errorResponse("Thiếu tên lớp hoặc cấp học", 400),
        { status: 400 }
      );
    }

    const grade = await prisma.grade.create({
      data: { gradeName, schoolLevelId, image },
    });

    return NextResponse.json(
      successResponse(grade, "Tạo lớp thành công", 201, null)
    );
  } catch (error: unknown) {
    console.error("POST /api/admin/grades error:", error);
    return NextResponse.json(
      errorResponse("Không tạo được lớp", 500),
      { status: 500 }
    );
  }
}
