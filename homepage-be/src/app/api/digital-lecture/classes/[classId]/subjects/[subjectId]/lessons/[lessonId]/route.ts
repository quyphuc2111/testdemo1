import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/apiResponse";

// GET /api/digital-lecture/classes/[classId]/subjects/[subjectId]/lessons/[lessonId]
// Lấy chi tiết một bài giảng
export async function GET(
    req: Request,
    {
        params,
    }: {
        params: { classId: string; subjectId: string; lessonId: string };
    }
) {
    try {
        const classId = Number(params.classId);
        const subjectId = Number(params.subjectId);
        const lessonId = Number(params.lessonId);

        if (isNaN(classId) || isNaN(subjectId) || isNaN(lessonId)) {
            return NextResponse.json(
                errorResponse("Tham số không hợp lệ", 400),
                { status: 400 }
            );
        }

        // Lấy lesson với tất cả relations
        const lesson = await prisma.lesson.findUnique({
            where: { id: lessonId },
            include: {
                grade: true,
                subject: true,
                book: true,
                topic: true,
            },
        });

        if (!lesson) {
            return NextResponse.json(
                errorResponse("Không tìm thấy bài giảng", 404),
                { status: 404 }
            );
        }

        // Validate lesson thuộc đúng classId và subjectId
        if (lesson.gradeId !== classId || lesson.subjectId !== subjectId) {
            return NextResponse.json(
                errorResponse("Bài giảng không thuộc lớp hoặc môn học này", 400),
                { status: 400 }
            );
        }

        // Map sang format theo spec
        const data = {
            id: lesson.id,
            title: lesson.name, // spec yêu cầu "title"
            topicId: lesson.topicId,
            topic: lesson.topic.name,
            bookId: lesson.bookId,
            book: lesson.book.name,
            lectureOnlineLink: lesson.lectureUrl, // spec yêu cầu "lectureOnlineLink"
            classId: lesson.gradeId,
            className: lesson.grade.name,
            subjectId: lesson.subjectId,
            subjectName: lesson.subject.name,
        };

        return NextResponse.json(
            successResponse(data, "Success", 200, null)
        );
    } catch (error) {
        console.error(
            "GET /api/digital-lecture/classes/[classId]/subjects/[subjectId]/lessons/[lessonId] error:",
            error
        );
        return NextResponse.json(
            errorResponse("Không lấy được chi tiết bài giảng", 500),
            { status: 500 }
        );
    }
}
