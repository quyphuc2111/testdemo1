import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  successResponse,
  errorResponse,
  normalizePagination,
  createPaginationMeta,
} from "@/lib/apiResponse";

// GET /api/admin/books?search=&page=&limit=
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

    const [books, total] = await Promise.all([
      prisma.book.findMany({
        where,
        orderBy: { name: "asc" },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.book.count({ where }),
    ]);

    const pagination = createPaginationMeta(page, limit, total);
    return NextResponse.json(
      successResponse(books, "Success", 200, pagination)
    );
  } catch (error) {
    console.error("GET /api/admin/books error:", error);
    return NextResponse.json(
      errorResponse("Không lấy được danh sách sách", 500),
      { status: 500 }
    );
  }
}

// POST /api/admin/books
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const name = (body?.name || "").toString().trim();

    if (!name) {
      return NextResponse.json(
        errorResponse("Thiếu tên sách", 400),
        { status: 400 }
      );
    }

    const book = await prisma.book.create({ data: { name } });
    return NextResponse.json(
      successResponse(book, "Tạo sách thành công", 201, null)
    );
  } catch (error: any) {
    console.error("POST /api/admin/books error:", error);
    return NextResponse.json(
      errorResponse("Không tạo được sách", 500),
      { status: 500 }
    );
  }
}
