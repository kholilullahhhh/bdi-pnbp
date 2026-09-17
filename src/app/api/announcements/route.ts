import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const announcements = await prisma.announcement.findMany({
      where: { isPublished: true },
      orderBy: { publishedAt: "desc" },
      take: 10,
    });

    return NextResponse.json(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data pengumuman" },
      { status: 500 }
    );
  }
}
