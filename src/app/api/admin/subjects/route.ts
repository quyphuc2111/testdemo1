import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  successResponse,
  errorResponse,
  normalizePagination,
  createPaginationMeta,
} from "@/lib/apiResponse";

// GET /api/admin/subjects?search=&page=&limit=
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const search = (searchParams.get("search") || "").trim();
    const { page, limit } = normalizePagination(
      searchParams.get("page"),
      searchParams.get("limit") || searchParams.get("pageSize"),
      20
    );

    const where: any = {};
    if (search) {
      where.name = { contains: search, mode: "insensitive" };
    }

    const [subjects, total] = await Promise.all([
      prisma.subject.findMany({
        where,
        orderBy: { name: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.subject.count({ where }),
    ]);

    const pagination = createPaginationMeta(page, limit, total);
    return NextResponse.json(
      successResponse(subjects, "Success", 200, pagination)
    );
  } catch (error) {
    console.error("GET /api/admin/subjects error:", error);
    return NextResponse.json(
      errorResponse("Không lấy được danh sách môn học", 500),
      { status: 500 }
    );
  }
}

// POST /api/admin/subjects
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = (body?.name || "").toString().trim();

    if (!name) {
      return NextResponse.json(
        errorResponse("Thiếu tên môn học", 400),
        { status: 400 }
      );
    }

    const subject = await prisma.subject.create({ data: { name } });
    return NextResponse.json(
      successResponse(subject, "Tạo môn học thành công", 201, null)
    );
  } catch (error: any) {
    console.error("POST /api/admin/subjects error:", error);
    return NextResponse.json(
      errorResponse("Không tạo được môn học", 500),
      { status: 500 }
    );
  }
}
