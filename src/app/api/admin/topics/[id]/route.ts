import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/apiResponse";

// GET /api/admin/topics/:id
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json(errorResponse("ID không hợp lệ", 400), { status: 400 });
  }

  try {
    const topic = await prisma.topic.findUnique({ where: { id } });
    if (!topic) {
      return NextResponse.json(errorResponse("Không tìm thấy chủ đề", 404), { status: 404 });
    }
    return NextResponse.json(successResponse(topic, "Success", 200, null));
  } catch (error) {
    console.error("GET /api/admin/topics/[id] error:", error);
    return NextResponse.json(errorResponse("Lỗi khi lấy thông tin chủ đề", 500), { status: 500 });
  }
}

// PUT /api/admin/topics/:id
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
    const topicName = body?.topicName?.toString().trim();
    const gradeId = Number(body?.gradeId);
    const subjectId = Number(body?.subjectId);
    const bookId = Number(body?.bookId);

    if (!topicName || Number.isNaN(gradeId) || Number.isNaN(subjectId) || Number.isNaN(bookId)) {
      return NextResponse.json(
        errorResponse("Thiếu hoặc sai dữ liệu", 400),
        { status: 400 }
      );
    }

    const updated = await prisma.topic.update({
      where: { id },
      data: { topicName, gradeId, subjectId, bookId },
    });

    return NextResponse.json(successResponse(updated, "Cập nhật chủ đề thành công", 200, null));
  } catch (error: unknown) {
    console.error("PUT /api/admin/topics/[id] error:", error);
    return NextResponse.json(errorResponse("Không cập nhật được chủ đề", 500), { status: 500 });
  }
}

// DELETE /api/admin/topics/:id
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json(errorResponse("ID không hợp lệ", 400), { status: 400 });
  }

  try {
    await prisma.topic.delete({ where: { id } });
    return NextResponse.json(successResponse(null, "Đã xoá chủ đề", 200, null));
  } catch (error: unknown) {
    console.error("DELETE /api/admin/topics/[id] error:", error);
    return NextResponse.json(
      errorResponse("Không xoá được chủ đề (có thể còn bài học tham chiếu)", 400),
      { status: 400 }
    );
  }
}
