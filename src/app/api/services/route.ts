import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      include: {
        category: true,
        tariffs: {
          where: { verificationStatus: "VERIFIED" },
          orderBy: { effectiveStartDate: "desc" },
          take: 1,
        },
      },
      orderBy: { sortOrder: "asc" },
    });

    return NextResponse.json(services);
  } catch (error) {
    console.error("Error fetching services:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data layanan" },
      { status: 500 }
    );
  }
}
