import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const categories = await prisma.serviceCategory.findMany({
      where: { isActive: true },
      include: {
        _count: {
          select: { services: { where: { isActive: true } } },
        },
      },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data kategori" },
      { status: 500 }
    );
  }
}
