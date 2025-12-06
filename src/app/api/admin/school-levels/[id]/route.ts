// src/app/api/admin/school-levels/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * @swagger
 * /api/admin/school-levels/{id}:
 *   get:
 *     summary: Lấy thông tin cấp học theo ID
 *     tags: [Admin - School Levels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Thông tin cấp học
 */
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const schoolLevel = await prisma.schoolLevel.findUnique({
            where: { id },
            include: {
                grades: true,
            },
        });

        if (!schoolLevel) {
            return NextResponse.json(
                { error: 'Không tìm thấy cấp học' },
                { status: 404 }
            );
        }

        return NextResponse.json(schoolLevel);
    } catch (error) {
        console.error('Error fetching school level:', error);
        return NextResponse.json(
            { error: 'Lỗi khi lấy thông tin cấp học' },
            { status: 500 }
        );
    }
}

/**
 * @swagger
 * /api/admin/school-levels/{id}:
 *   put:
 *     summary: Cập nhật cấp học
 *     tags: [Admin - School Levels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
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
 *       200:
 *         description: Cấp học đã được cập nhật
 */
export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);
        const body = await request.json();
        const { levelName } = body;

        if (!levelName) {
            return NextResponse.json(
                { error: 'Tên cấp học là bắt buộc' },
                { status: 400 }
            );
        }

        const schoolLevel = await prisma.schoolLevel.update({
            where: { id },
            data: {
                levelName,
            },
        });

        return NextResponse.json(schoolLevel);
    } catch (error) {
        console.error('Error updating school level:', error);
        return NextResponse.json(
            { error: 'Lỗi khi cập nhật cấp học' },
            { status: 500 }
        );
    }
}

/**
 * @swagger
 * /api/admin/school-levels/{id}:
 *   delete:
 *     summary: Xóa cấp học
 *     tags: [Admin - School Levels]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Cấp học đã được xóa
 */
export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const id = parseInt(params.id);

        await prisma.schoolLevel.delete({
            where: { id },
        });

        return NextResponse.json({ message: 'Đã xóa cấp học thành công' });
    } catch (error) {
        console.error('Error deleting school level:', error);
        return NextResponse.json(
            { error: 'Lỗi khi xóa cấp học' },
            { status: 500 }
        );
    }
}
