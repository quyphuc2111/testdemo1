import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import * as XLSX from 'xlsx';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json(
                { error: 'Không tìm thấy file' },
                { status: 400 }
            );
        }

        // Đọc file Excel
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const workbook = XLSX.read(buffer, { type: 'buffer' });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = XLSX.utils.sheet_to_json(worksheet);

        let stats = {
            grades: 0,
            subjects: 0,
            books: 0,
            topicsCreated: 0,
            topicsUpdated: 0,
            lessonsCreated: 0,
            lessonsUpdated: 0,
            errors: [] as string[],
        };

        // Maps để track unique items
        const gradeSet = new Set<number>();
        const subjectSet = new Set<number>();
        const bookSet = new Set<number>();

        // Map để cache các ID
        const topicMap = new Map<string, number>();

        // Biến để lưu giá trị từ dòng trước (xử lý merged cells)
        let lastClass = '';
        let lastSubject = '';
        let lastBook = '';
        let lastTopicName = '';

        for (let i = 0; i < data.length; i++) {
            const row: any = data[i];

            try {
                // Lấy giá trị từ row
                let className = row.class?.toString().trim();
                let subjectName = row.subject?.toString().trim();
                let bookName = row.book?.toString().trim();
                let topicName = row.topic_name?.toString().trim();
                const lessonName = row.lesson_name?.toString().trim();

                // Xử lý merged cells
                if (!className && lastClass) {
                    className = lastClass;
                } else if (className) {
                    lastClass = className;
                }

                if (!subjectName && lastSubject) {
                    subjectName = lastSubject;
                } else if (subjectName) {
                    lastSubject = subjectName;
                }

                if (!bookName && lastBook) {
                    bookName = lastBook;
                } else if (bookName) {
                    lastBook = bookName;
                }

                if (!topicName && lastTopicName) {
                    topicName = lastTopicName;
                } else if (topicName) {
                    lastTopicName = topicName;
                }

                // Validate dữ liệu bắt buộc
                if (!className || !bookName || !topicName || !lessonName) {
                    stats.errors.push(
                        `Dòng ${i + 2}: Thiếu thông tin bắt buộc (class: "${className || ''}", book: "${bookName || ''}", topic_name: "${topicName || ''}", lesson_name: "${lessonName || ''}")`
                    );
                    continue;
                }

                // Tìm Grade dựa vào className
                const grade = await prisma.grade.findFirst({
                    where: { gradeName: className },
                });

                if (!grade) {
                    stats.errors.push(
                        `Dòng ${i + 2}: Không tìm thấy lớp "${className}" trong hệ thống`
                    );
                    continue;
                }

                // Track grade
                gradeSet.add(grade.id);

                // Tìm Subject (nếu có trong file, nếu không thì lấy subject đầu tiên của grade)
                let subject;
                if (subjectName) {
                    subject = await prisma.subject.findFirst({
                        where: { subjectName: subjectName },
                    });
                    if (!subject) {
                        stats.errors.push(
                            `Dòng ${i + 2}: Không tìm thấy môn học "${subjectName}" trong hệ thống`
                        );
                        continue;
                    }
                } else {
                    // Nếu không có subject trong file, tìm subject từ book
                    const bookWithSubject = await prisma.book.findFirst({
                        where: { bookName: bookName },
                        include: {
                            topics: {
                                include: { subject: true },
                                take: 1,
                            },
                        },
                    });

                    if (bookWithSubject?.topics[0]?.subject) {
                        subject = bookWithSubject.topics[0].subject;
                    } else {
                        stats.errors.push(
                            `Dòng ${i + 2}: Không xác định được môn học cho sách "${bookName}"`
                        );
                        continue;
                    }
                }

                // Track subject
                subjectSet.add(subject.id);

                // Tìm Book
                const book = await prisma.book.findFirst({
                    where: { bookName: bookName },
                });

                if (!book) {
                    stats.errors.push(
                        `Dòng ${i + 2}: Không tìm thấy sách "${bookName}" trong hệ thống`
                    );
                    continue;
                }

                // Track book
                bookSet.add(book.id);

                // Tạo hoặc lấy Topic
                const topicKey = `${grade.id}-${subject.id}-${book.id}-${topicName}`;
                let topicId = topicMap.get(topicKey);
                let isNewTopic = false;

                if (!topicId) {
                    let topic = await prisma.topic.findFirst({
                        where: {
                            topicName: topicName,
                            gradeId: grade.id,
                            subjectId: subject.id,
                            bookId: book.id,
                        },
                    });

                    if (!topic) {
                        topic = await prisma.topic.create({
                            data: {
                                topicName: topicName,
                                gradeId: grade.id,
                                subjectId: subject.id,
                                bookId: book.id,
                            },
                        });
                        stats.topicsCreated++;
                        isNewTopic = true;
                    } else {
                        stats.topicsUpdated++;
                    }

                    topicId = topic.id;
                    topicMap.set(topicKey, topicId);
                }

                // Tạo hoặc update Lesson
                const existingLesson = await prisma.lesson.findFirst({
                    where: {
                        lessonName: lessonName,
                        topicId: topicId,
                    },
                });

                if (!existingLesson) {
                    await prisma.lesson.create({
                        data: {
                            lessonName: lessonName,
                            gradeId: grade.id,
                            subjectId: subject.id,
                            bookId: book.id,
                            topicId: topicId,
                        },
                    });
                    stats.lessonsCreated++;
                } else {
                    stats.lessonsUpdated++;
                }

            } catch (error: any) {
                stats.errors.push(`Dòng ${i + 2}: ${error.message}`);
            }
        }

        // Cập nhật stats với số lượng unique items
        stats.grades = gradeSet.size;
        stats.subjects = subjectSet.size;
        stats.books = bookSet.size;

        return NextResponse.json({
            success: true,
            message: 'Import topics và lessons thành công',
            stats,
        });
    } catch (error: any) {
        console.error('Import error:', error);
        return NextResponse.json(
            { error: error.message || 'Lỗi khi import file' },
            { status: 500 }
        );
    }
}
