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
            schoolLevels: 0,
            grades: 0,
            subjects: 0,
            books: 0,
            topics: 0,
            lessons: 0,
            errors: [] as string[],
        };

        // Map để lưu các ID đã tạo
        const schoolLevelMap = new Map<string, number>();
        const gradeMap = new Map<string, number>();
        const subjectMap = new Map<string, number>();
        const bookMap = new Map<string, number>();
        const topicMap = new Map<string, number>();

        // Biến để lưu giá trị từ dòng trước (xử lý merged cells)
        let lastSchoolLevel = '';
        let lastClass = '';

        for (let i = 0; i < data.length; i++) {
            const row: any = data[i];

            try {
                // Lấy giá trị, nếu trống thì dùng giá trị từ dòng trước
                let schoolLevelName = row.school_level?.toString().trim();
                let className = row.class?.toString().trim();
                const subjectName = row.subject?.toString().trim();
                const bookName = row.book?.toString().trim();
                const topicName = row.topic_name?.toString().trim();
                const lessonName = row.lesson_name?.toString().trim();

                // Xử lý merged cells: nếu trống thì lấy giá trị từ dòng trước
                if (!schoolLevelName && lastSchoolLevel) {
                    schoolLevelName = lastSchoolLevel;
                } else if (schoolLevelName) {
                    lastSchoolLevel = schoolLevelName;
                }

                if (!className && lastClass) {
                    className = lastClass;
                } else if (className) {
                    lastClass = className;
                }

                if (!schoolLevelName || !className || !subjectName || !bookName) {
                    stats.errors.push(
                        `Dòng ${i + 2}: Thiếu thông tin (school_level: "${schoolLevelName || ''}", class: "${className || ''}", subject: "${subjectName || ''}", book: "${bookName || ''}")`
                    );
                    continue;
                }

                // 1. Tạo hoặc lấy School Level
                let schoolLevelId = schoolLevelMap.get(schoolLevelName);
                if (!schoolLevelId) {
                    let schoolLevel = await prisma.schoolLevel.findFirst({
                        where: { levelName: schoolLevelName },
                    });
                    if (!schoolLevel) {
                        schoolLevel = await prisma.schoolLevel.create({
                            data: { levelName: schoolLevelName },
                        });
                        stats.schoolLevels++;
                    }
                    schoolLevelId = schoolLevel.id;
                    schoolLevelMap.set(schoolLevelName, schoolLevelId);
                }

                // 2. Tạo hoặc lấy Grade
                const gradeKey = `${schoolLevelId}-${className}`;
                let gradeId = gradeMap.get(gradeKey);
                if (!gradeId) {
                    let grade = await prisma.grade.findFirst({
                        where: {
                            gradeName: className,
                            schoolLevelId: schoolLevelId,
                        },
                    });
                    if (!grade) {
                        grade = await prisma.grade.create({
                            data: {
                                gradeName: className,
                                schoolLevelId: schoolLevelId,
                            },
                        });
                        stats.grades++;
                    }
                    gradeId = grade.id;
                    gradeMap.set(gradeKey, gradeId);
                }

                // 3. Tạo hoặc lấy Subject
                let subjectId = subjectMap.get(subjectName);
                if (!subjectId) {
                    let subject = await prisma.subject.findFirst({
                        where: { subjectName: subjectName },
                    });
                    if (!subject) {
                        subject = await prisma.subject.create({
                            data: { subjectName: subjectName },
                        });
                        stats.subjects++;
                    }
                    subjectId = subject.id;
                    subjectMap.set(subjectName, subjectId);
                }

                // 4. Tạo hoặc lấy Book
                let bookId = bookMap.get(bookName);
                if (!bookId) {
                    let book = await prisma.book.findFirst({
                        where: { bookName: bookName },
                    });
                    if (!book) {
                        book = await prisma.book.create({
                            data: { bookName: bookName },
                        });
                        stats.books++;
                    }
                    bookId = book.id;
                    bookMap.set(bookName, bookId);
                }

                // 5. Tạo hoặc lấy Topic (nếu có)
                let topicId: number | undefined;
                if (topicName) {
                    const topicKey = `${gradeId}-${subjectId}-${bookId}-${topicName}`;
                    topicId = topicMap.get(topicKey);
                    if (!topicId) {
                        let topic = await prisma.topic.findFirst({
                            where: {
                                topicName: topicName,
                                gradeId: gradeId,
                                subjectId: subjectId,
                                bookId: bookId,
                            },
                        });
                        if (!topic) {
                            topic = await prisma.topic.create({
                                data: {
                                    topicName: topicName,
                                    gradeId: gradeId,
                                    subjectId: subjectId,
                                    bookId: bookId,
                                },
                            });
                            stats.topics++;
                        }
                        topicId = topic.id;
                        topicMap.set(topicKey, topicId);
                    }
                }

                // 6. Tạo Lesson (nếu có)
                if (lessonName && topicId) {
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
                                gradeId: gradeId,
                                subjectId: subjectId,
                                bookId: bookId,
                                topicId: topicId,
                            },
                        });
                        stats.lessons++;
                    }
                }
            } catch (error: any) {
                stats.errors.push(`Dòng ${i + 2}: ${error.message}`);
            }
        }

        return NextResponse.json({
            success: true,
            message: 'Import thành công',
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
