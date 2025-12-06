import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/apiResponse";

// GET /api/digital-lecture/classes/[classId]/subjects
// Trả về danh sách môn học theo lớp
export async function GET(
    req: Request,
    { params }: { params: { classId: string } }
) {
    try {
        const classId = Number(params.classId);

        if (isNaN(classId)) {
            return NextResponse.json(
                errorResponse("classId không hợp lệ", 400),
                { status: 400 }
            );
        }

        // Kiểm tra grade có tồn tại không
        const grade = await prisma.grade.findUnique({
            where: { id: classId },
        });

        if (!grade) {
            return NextResponse.json(
                errorResponse("Không tìm thấy lớp", 404),
                { status: 404 }
            );
        }

        // Lấy tất cả topics của grade này để lấy distinct subjects
        const topics = await prisma.topic.findMany({
            where: { gradeId: classId },
            include: {
                subject: true,
            },
            distinct: ["subjectId"],
        });

        // Map sang format { id, name }
        const subjects = topics.map((topic) => ({
            id: topic.subject.id.toString(),
            name: topic.subject.subjectName,
        }));

        // Loại bỏ duplicates (nếu có)
        const uniqueSubjects = Array.from(
            new Map(subjects.map((s) => [s.id, s])).values()
        );

        return NextResponse.json(
            successResponse(uniqueSubjects, "Success", 200, null)
        );
    } catch (error) {
        console.error("GET /api/digital-lecture/classes/[classId]/subjects error:", error);
        return NextResponse.json(
            errorResponse("Không lấy được danh sách môn học", 500),
            { status: 500 }
        );
    }
}
