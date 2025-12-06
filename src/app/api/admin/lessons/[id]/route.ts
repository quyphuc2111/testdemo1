import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/apiResponse";

// GET /api/admin/lessons/:id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json(errorResponse("ID không hợp lệ", 400), { status: 400 });
  }

  try {
    const lesson = await prisma.lesson.findUnique({ where: { id } });
    if (!lesson) {
      return NextResponse.json(errorResponse("Không tìm thấy bài học", 404), { status: 404 });
    }
    return NextResponse.json(successResponse(lesson, "Success", 200, null));
  } catch (error) {
    console.error("GET /api/admin/lessons/[id] error:", error);
    return NextResponse.json(errorResponse("Lỗi khi lấy thông tin bài học", 500), { status: 500 });
  }
}

// PUT /api/admin/lessons/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json(errorResponse("ID không hợp lệ", 400), { status: 400 });
  }

  try {
    const body = await req.json();
    const name = body?.name?.toString().trim();
    const gradeId = Number(body?.gradeId);
    const subjectId = Number(body?.subjectId);
    const bookId = Number(body?.bookId);
    const topicId = Number(body?.topicId);
    const lectureUrl = body?.lectureUrl ? body.lectureUrl.toString().trim() : null;

    if (!name || Number.isNaN(gradeId) || Number.isNaN(subjectId) || Number.isNaN(bookId) || Number.isNaN(topicId)) {
      return NextResponse.json(errorResponse("Thiếu hoặc sai dữ liệu", 400), { status: 400 });
    }

    const updated = await prisma.lesson.update({
      where: { id },
      data: { name, gradeId, subjectId, bookId, topicId, lectureUrl },
    });

    return NextResponse.json(successResponse(updated, "Cập nhật bài học thành công", 200, null));
  } catch (error: unknown) {
    console.error("PUT /api/admin/lessons/[id] error:", error);
    return NextResponse.json(errorResponse("Không cập nhật được bài học", 500), { status: 500 });
  }
}

// DELETE /api/admin/lessons/:id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json(errorResponse("ID không hợp lệ", 400), { status: 400 });
  }

  try {
    await prisma.lesson.delete({ where: { id } });
    return NextResponse.json(successResponse(null, "Đã xoá bài học", 200, null));
  } catch (error: unknown) {
    console.error("DELETE /api/admin/lessons/[id] error:", error);
    return NextResponse.json(errorResponse("Không xoá được bài học", 400), { status: 400 });
  }
}
