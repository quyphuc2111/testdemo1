import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import {
    successResponse,
    errorResponse,
    normalizePagination,
    createPaginationMeta,
} from "@/lib/apiResponse";

// GET /api/digital-lecture/classes/[classId]/subjects/[subjectId]/lessons
// Lấy danh sách bài giảng theo lớp, môn học, và có thể filter theo topicId
export async function GET(
    req: Request,
    { params }: { params: { classId: string; subjectId: string } }
) {
    try {
        const classId = Number(params.classId);
        const subjectId = Number(params.subjectId);

        if (isNaN(classId) || isNaN(subjectId)) {
            return NextResponse.json(
                errorResponse("classId hoặc subjectId không hợp lệ", 400),
                { status: 400 }
            );
        }

        const { searchParams } = new URL(req.url);
        const topicIdParam = searchParams.get("topicId");
        const { page, limit } = normalizePagination(
            searchParams.get("page"),
            searchParams.get("limit"),
            8 // default limit theo spec
        );

        // Build where clause
        const where: Prisma.LessonWhereInput = {
            gradeId: classId,
            subjectId: subjectId,
        };

        if (topicIdParam) {
            const topicId = Number(topicIdParam);
            if (!isNaN(topicId)) {
                where.topicId = topicId;
            }
        }

        // Query với pagination
        const [lessons, total] = await Promise.all([
            prisma.lesson.findMany({
                where,
                include: {
                    grade: true,
                    subject: true,
                    book: true,
                    topic: true,
                },
                orderBy: { id: "asc" },
                skip: (page - 1) * limit,
                take: limit,
            }),
            prisma.lesson.count({ where }),
        ]);

        // Map sang format theo spec
        const data = lessons.map((lesson) => ({
            id: lesson.id,
            title: lesson.lessonName, // spec yêu cầu "title" không phải "name"
            topicId: lesson.topicId,
            topic: lesson.topic.topicName,
            bookId: lesson.bookId,
            book: lesson.book.bookName,
            classId: lesson.gradeId,
            className: lesson.grade.gradeName,
            subjectId: lesson.subjectId,
            subjectName: lesson.subject.subjectName,
            lectureOnlineLink: lesson.lectureUrl, // Thêm lectureOnlineLink để hiển thị badge
        }));

        const pagination = createPaginationMeta(page, limit, total);

        return NextResponse.json(
            successResponse(data, "Success", 200, pagination)
        );
    } catch (error) {
        console.error(
            "GET /api/digital-lecture/classes/[classId]/subjects/[subjectId]/lessons error:",
            error
        );
        return NextResponse.json(
            errorResponse("Không lấy được danh sách bài giảng", 500),
            { status: 500 }
        );
    }
}
