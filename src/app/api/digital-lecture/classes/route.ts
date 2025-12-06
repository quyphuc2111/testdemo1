import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { successResponse, errorResponse } from "@/lib/apiResponse";

// GET /api/digital-lecture/classes
// Trả về danh sách lớp kèm subjects, topicCount, bookCount
export async function GET() {
  try {
    // Lấy tất cả grades
    const grades = await prisma.grade.findMany({
      orderBy: { name: "asc" },
    });

    // Với mỗi grade, lấy thông tin subjects, topicCount, bookCount
    const data = await Promise.all(
      grades.map(async (grade) => {
        // Lấy tất cả topics của grade này
        const topics = await prisma.topic.findMany({
          where: { gradeId: grade.id },
          include: {
            subject: true,
            book: true,
          },
        });

        // Tính topicCount
        const topicCount = topics.length;

        // Tính bookCount (distinct)
        const uniqueBookIds = new Set(topics.map((t) => t.bookId));
        const bookCount = uniqueBookIds.size;

        // Lấy danh sách subjects (distinct)
        const subjectMap = new Map<
          number,
          { subjectId: string; subjectName: string }
        >();
        topics.forEach((topic) => {
          if (!subjectMap.has(topic.subject.id)) {
            subjectMap.set(topic.subject.id, {
              subjectId: topic.subject.id.toString(),
              subjectName: topic.subject.name,
            });
          }
        });

        const subject = Array.from(subjectMap.values());

        return {
          id: grade.id,
          name: grade.name,
          subject,
          topicCount,
          bookCount,
        };
      })
    );

    return NextResponse.json(successResponse(data, "Success", 200, null));
  } catch (error) {
    console.error("GET /api/digital-lecture/classes error:", error);
    return NextResponse.json(
      errorResponse("Không lấy được danh sách lớp", 500),
      { status: 500 }
    );
  }
}
