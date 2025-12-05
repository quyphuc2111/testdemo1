// nhập excel
import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { importCatalogFromWorkbook } from "@/lib/catalogImporter";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic"; // để route không bị cache
export const maxDuration = 60; // cho phép chạy lâu hơn chút nếu file lớn

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { status: "error", message: "Thiếu file Excel (field name: file)" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const workbook = XLSX.read(buffer, { type: "buffer" });

    await importCatalogFromWorkbook(workbook);

    return NextResponse.json({
      status: "ok",
      message: "Import dữ liệu bài giảng từ Excel thành công",
    });
  } catch (error) {
    console.error("POST /api/import/catalog error:", error);
    return NextResponse.json(
      { status: "error", message: "Import thất bại" },
      { status: 500 }
    );
  } finally {
    // optional
    await prisma.$disconnect().catch(() => {});
  }
}
