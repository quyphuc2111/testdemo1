// Script kiểm tra dữ liệu trong database
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function checkData() {
    console.log('=== KIỂM TRA DỮ LIỆU DATABASE ===\n');

    // Check School Levels
    const schoolLevels = await prisma.schoolLevel.findMany();
    console.log(`📚 School Levels: ${schoolLevels.length} records`);
    schoolLevels.forEach(sl => console.log(`  - ${sl.id}: ${sl.levelName}`));

    // Check Grades
    const grades = await prisma.grade.findMany();
    console.log(`\n🎓 Grades: ${grades.length} records`);
    grades.forEach(g => console.log(`  - ${g.id}: ${g.gradeName} (schoolLevelId: ${g.schoolLevelId})`));

    // Check Subjects
    const subjects = await prisma.subject.findMany();
    console.log(`\n📖 Subjects: ${subjects.length} records`);
    subjects.forEach(s => console.log(`  - ${s.id}: ${s.subjectName}`));

    // Check Books
    const books = await prisma.book.findMany();
    console.log(`\n📕 Books: ${books.length} records`);
    books.forEach(b => console.log(`  - ${b.id}: ${b.bookName}`));

    // Check Topics
    const topics = await prisma.topic.findMany();
    console.log(`\n🎯 Topics: ${topics.length} records`);
    topics.forEach(t => console.log(`  - ${t.id}: ${t.topicName} (grade:${t.gradeId}, subject:${t.subjectId}, book:${t.bookId})`));

    // Check Lessons
    const lessons = await prisma.lesson.findMany();
    console.log(`\n📝 Lessons: ${lessons.length} records`);
    lessons.forEach(l => console.log(`  - ${l.id}: ${l.lessonName} (topic:${l.topicId})`));

    await prisma.$disconnect();
}

checkData().catch(console.error);
