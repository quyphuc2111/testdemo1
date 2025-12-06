import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/apiResponse";

// GET /api/admin/subjects/:id
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
    const subject = await prisma.subject.findUnique({ where: { id } });
    if (!subject) {
      return NextResponse.json(
        errorResponse("Không tìm thấy môn học", 404),
        { status: 404 }
      );
    }
    return NextResponse.json(successResponse(subject, "Success", 200, null));
  } catch (error) {
    console.error("GET /api/admin/subjects/[id] error:", error);
    return NextResponse.json(
      errorResponse("Lỗi khi lấy thông tin môn học", 500),
      { status: 500 }
    );
  }
}

// PUT /api/admin/subjects/:id
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
        errorResponse("Thiếu tên môn học", 400),
        { status: 400 }
      );
    }

    const updated = await prisma.subject.update({
      where: { id },
      data: { name },
    });
    return NextResponse.json(
      successResponse(updated, "Cập nhật môn học thành công", 200, null)
    );
  } catch (error: unknown) {
    console.error("PUT /api/admin/subjects/[id] error:", error);
    return NextResponse.json(
      errorResponse("Không cập nhật được môn học", 500),
      { status: 500 }
    );
  }
}

// DELETE /api/admin/subjects/:id
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
    await prisma.subject.delete({ where: { id } });
    return NextResponse.json(
      successResponse(null, "Đã xoá môn học", 200, null)
    );
  } catch (error: unknown) {
    console.error("DELETE /api/admin/subjects/[id] error:", error);
    return NextResponse.json(
      errorResponse(
        "Không xoá được môn học (có thể còn chủ đề/bài học tham chiếu)",
        400
      ),
      { status: 400 }
    );
  }
}
