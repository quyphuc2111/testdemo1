// render toàn bộ cây thư mục
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Trả về: Grade -> Subject -> Book -> Topic -> Lesson
export async function GET() {
  try {
    const topics = await prisma.topic.findMany({
      include: {
        grade: true,
        subject: true,
        book: true,
        lessons: true,
      },
      orderBy: { id: "asc" },
    });

    type LessonNode = {
      id: number;
      name: string;
      lectureUrl: string | null;
    };

    type TopicNode = {
      id: number;
      name: string;
      lessons: LessonNode[];
    };

    type BookNode = {
      id: number;
      name: string;
      topics: TopicNode[];
    };

    type SubjectNode = {
      id: number;
      name: string;
      books: BookNode[];
    };

    type GradeNode = {
      id: number;
      name: string;
      subjects: SubjectNode[];
    };

    // Dùng Map để build tree
    const gradeMap = new Map<
      number,
      {
        id: number;
        name: string;
        subjectsMap: Map<
          number,
          {
            id: number;
            name: string;
            booksMap: Map<number, BookNode>;
          }
        >;
      }
    >();

    for (const t of topics) {
      // Grade
      let gradeNode = gradeMap.get(t.grade.id);
      if (!gradeNode) {
        gradeNode = {
          id: t.grade.id,
          name: t.grade.name,
          subjectsMap: new Map(),
        };
        gradeMap.set(t.grade.id, gradeNode);
      }

      // Subject (theo grade + subject)
      let subjectNode = gradeNode.subjectsMap.get(t.subject.id);
      if (!subjectNode) {
        subjectNode = {
          id: t.subject.id,
          name: t.subject.name,
          booksMap: new Map(),
        };
        gradeNode.subjectsMap.set(t.subject.id, subjectNode);
      }

      // Book (theo subject + book)
      let bookNode = subjectNode.booksMap.get(t.book.id);
      if (!bookNode) {
        bookNode = {
          id: t.book.id,
          name: t.book.name,
          topics: [],
        };
        subjectNode.booksMap.set(t.book.id, bookNode);
      }

      // Topic
      let topicNode = bookNode.topics.find((tp) => tp.id === t.id);
      if (!topicNode) {
        topicNode = {
          id: t.id,
          name: t.name,
          lessons: [],
        };
        bookNode.topics.push(topicNode);
      }

      // Lessons của topic này
      for (const les of t.lessons) {
        topicNode.lessons.push({
          id: les.id,
          name: les.name,
          lectureUrl: les.lectureUrl,
        });
      }
    }

    // Chuyển từ Map sang array để trả về
    const tree: GradeNode[] = Array.from(gradeMap.values()).map((g) => {
      const subjects: SubjectNode[] = Array.from(g.subjectsMap.values()).map(
        (s) => ({
          id: s.id,
          name: s.name,
          books: Array.from(s.booksMap.values()),
        })
      );

      return {
        id: g.id,
        name: g.name,
        subjects,
      };
    });

    return NextResponse.json({ status: "ok", tree });
  } catch (error: unknown) {
    console.error("GET /api/catalog/tree error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { status: "error", message: errorMessage },
      { status: 500 }
    );
  }
}
