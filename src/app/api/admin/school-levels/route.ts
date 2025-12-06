// src/app/api/admin/school-levels/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/admin/school-levels:
 *   get:
 *     summary: Lấy danh sách tất cả cấp học
 *     tags: [Admin - School Levels]
 *     responses:
 *       200:
 *         description: Danh sách cấp học
 */
export async function GET() {
    try {
        const schoolLevels = await prisma.schoolLevel.findMany({
            include: {
                grades: true,
            },
            orderBy: {
                id: 'asc',
            },
        });
        return NextResponse.json({ data: schoolLevels });
    } catch (error) {
        console.error('Error fetching school levels:', error);
        return NextResponse.json(
            { error: 'Lỗi khi lấy danh sách cấp học' },
            { status: 500 }
        );
    }
}

/**
 * @swagger
 * /api/admin/school-levels:
 *   post:
 *     summary: Tạo cấp học mới
 *     tags: [Admin - School Levels]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               levelName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Cấp học đã được tạo
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { levelName } = body;

        if (!levelName) {
            return NextResponse.json(
                { error: 'Tên cấp học là bắt buộc' },
                { status: 400 }
            );
        }

        const schoolLevel = await prisma.schoolLevel.create({
            data: {
                levelName,
            },
        });

        return NextResponse.json(schoolLevel, { status: 201 });
    } catch (error) {
        console.error('Error creating school level:', error);
        return NextResponse.json(
            { error: 'Lỗi khi tạo cấp học' },
            { status: 500 }
        );
    }
}
