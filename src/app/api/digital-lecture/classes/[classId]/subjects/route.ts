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

        // Lấy tất cả topics của grade này với lesson count
        const allTopics = await prisma.topic.findMany({
            where: { gradeId: classId },
            include: {
                subject: true,
                book: true,
                _count: {
                    select: {
                        lessons: true,
                    },
                },
            },
        });

        // Group topics theo subject để tính bookCount, topicCount, và lessonCount
        const subjectMap = new Map<number, {
            id: string;
            name: string;
            bookCount: number;
            topicCount: number;
            lessonCount: number;
        }>();

        allTopics.forEach((topic) => {
            const subjectId = topic.subject.id;

            if (!subjectMap.has(subjectId)) {
                subjectMap.set(subjectId, {
                    id: subjectId.toString(),
                    name: topic.subject.subjectName,
                    bookCount: 0,
                    topicCount: 0,
                    lessonCount: 0,
                });
            }

            const subjectData = subjectMap.get(subjectId)!;
            subjectData.topicCount++;
            subjectData.lessonCount += topic._count.lessons;
        });

        // Tính bookCount cho từng subject (distinct books)
        const subjectBookMap = new Map<number, Set<number>>();
        allTopics.forEach((topic) => {
            if (!subjectBookMap.has(topic.subjectId)) {
                subjectBookMap.set(topic.subjectId, new Set());
            }
            subjectBookMap.get(topic.subjectId)!.add(topic.bookId);
        });

        // Cập nhật bookCount
        subjectBookMap.forEach((bookIds, subjectId) => {
            const subjectData = subjectMap.get(subjectId);
            if (subjectData) {
                subjectData.bookCount = bookIds.size;
            }
        });

        const subjects = Array.from(subjectMap.values());

        return NextResponse.json(
            successResponse(subjects, "Success", 200, null)
        );
    } catch (error) {
        console.error("GET /api/digital-lecture/classes/[classId]/subjects error:", error);
        return NextResponse.json(
            errorResponse("Không lấy được danh sách môn học", 500),
            { status: 500 }
        );
    }
}
