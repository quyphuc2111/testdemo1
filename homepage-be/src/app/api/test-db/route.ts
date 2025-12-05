import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const count = await prisma.user.count();

        return NextResponse.json({
            status: "ok",
            message: "Kết nối database thành công",
            userCount: count,
        });
    } catch (error) {
        console.error("DB error:", error);

        return NextResponse.json(
            {
                status: "error",
                message: "Không kết nối được database",
            },
            { status: 500 }
        );
    }
}
