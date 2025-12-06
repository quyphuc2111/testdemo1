import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/apiResponse";

// GET /api/admin/books/:id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json(
      errorResponse("ID không hợp lệ", 400),
      { status: 400 }
    );
  }

  try {
    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) {
      return NextResponse.json(
        errorResponse("Không tìm thấy sách", 404),
        { status: 404 }
      );
    }
    return NextResponse.json(successResponse(book, "Success", 200, null));
  } catch (error) {
    console.error("GET /api/admin/books/[id] error:", error);
    return NextResponse.json(
      errorResponse("Lỗi khi lấy thông tin sách", 500),
      { status: 500 }
    );
  }
}

// PUT /api/admin/books/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json(
      errorResponse("ID không hợp lệ", 400),
      { status: 400 }
    );
  }

  try {
    const body = await req.json();
    const name = body?.name?.toString().trim();
    if (!name) {
      return NextResponse.json(
        errorResponse("Thiếu tên sách", 400),
        { status: 400 }
      );
    }

    const updated = await prisma.book.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(
      successResponse(updated, "Cập nhật sách thành công", 200, null)
    );
  } catch (error: any) {
    console.error("PUT /api/admin/books/[id] error:", error);
    return NextResponse.json(
      errorResponse("Không cập nhật được sách", 500),
      { status: 500 }
    );
  }
}

// DELETE /api/admin/books/:id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json(
      errorResponse("ID không hợp lệ", 400),
      { status: 400 }
    );
  }

  try {
    await prisma.book.delete({ where: { id } });
    return NextResponse.json(
      successResponse(null, "Đã xoá sách", 200, null)
    );
  } catch (error: any) {
    console.error("DELETE /api/admin/books/[id] error:", error);
    return NextResponse.json(
      errorResponse(
        "Không xoá được sách (có thể còn chủ đề/bài học tham chiếu)",
        400
      ),
      { status: 400 }
    );
  }
}
