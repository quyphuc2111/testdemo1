import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/apiResponse";

// GET /api/admin/grades/:id
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
    const grade = await prisma.grade.findUnique({
      where: { id },
    });

    if (!grade) {
      return NextResponse.json(
        errorResponse("Không tìm thấy lớp", 404),
        { status: 404 }
      );
    }

    return NextResponse.json(successResponse(grade, "Success", 200, null));
  } catch (error) {
    console.error("GET /api/admin/grades/[id] error:", error);
    return NextResponse.json(
      errorResponse("Lỗi khi lấy thông tin lớp", 500),
      { status: 500 }
    );
  }
}

// PUT /api/admin/grades/:id  -> cập nhật tên lớp
// body: { name?: string }
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
        errorResponse("Thiếu tên lớp", 400),
        { status: 400 }
      );
    }

    const updated = await prisma.grade.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(
      successResponse(updated, "Cập nhật lớp thành công", 200, null)
    );
  } catch (error: unknown) {
    console.error("PUT /api/admin/grades/[id] error:", error);
    return NextResponse.json(
      errorResponse("Không cập nhật được lớp", 500),
      { status: 500 }
    );
  }
}

// DELETE /api/admin/grades/:id
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
    // sẽ lỗi nếu còn Topic/Lesson tham chiếu
    await prisma.grade.delete({
      where: { id },
    });

    return NextResponse.json(
      successResponse(null, "Đã xoá lớp", 200, null)
    );
  } catch (error: unknown) {
    console.error("DELETE /api/admin/grades/[id] error:", error);
    return NextResponse.json(
      errorResponse(
        "Không xoá được lớp (có thể vẫn còn chủ đề/bài học tham chiếu)",
        400
      ),
      { status: 400 }
    );
  }
}
