import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/apiResponse";

// GET /api/digital-lecture/classes/[classId]/subjects/[subjectId]/categories
// Trả về danh mục (Book + Topics) theo lớp và môn học
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

        // Lấy tất cả topics theo grade và subject
        const topics = await prisma.topic.findMany({
            where: {
                gradeId: classId,
                subjectId: subjectId,
            },
            include: {
                book: true,
            },
            orderBy: [
                { bookId: "asc" },
                { id: "asc" },
            ],
        });

        if (topics.length === 0) {
            return NextResponse.json(
                successResponse([], "Success", 200, null)
            );
        }

        // Group topics theo book
        const bookMap = new Map<
            number,
            {
                id: number;
                book: string;
                children: Array<{ id: number; name: string }>;
            }
        >();

        topics.forEach((topic) => {
            if (!bookMap.has(topic.bookId)) {
                bookMap.set(topic.bookId, {
                    id: topic.bookId,
                    book: topic.book.name,
                    children: [],
                });
            }

            bookMap.get(topic.bookId)!.children.push({
                id: topic.id,
                name: topic.name,
            });
        });

        const categories = Array.from(bookMap.values());

        return NextResponse.json(
            successResponse(categories, "Success", 200, null)
        );
    } catch (error) {
        console.error(
            "GET /api/digital-lecture/classes/[classId]/subjects/[subjectId]/categories error:",
            error
        );
        return NextResponse.json(
            errorResponse("Không lấy được danh mục", 500),
            { status: 500 }
        );
    }
}
