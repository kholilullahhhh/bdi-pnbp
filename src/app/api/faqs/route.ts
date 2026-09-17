import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const faqs = await prisma.fAQ.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(faqs);
  } catch (error) {
    console.error("Error fetching FAQs:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data FAQ" },
      { status: 500 }
    );
  }
}
