import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const service = await prisma.service.findUnique({
      where: { slug },
      include: {
        category: true,
        tariffs: {
          orderBy: { effectiveStartDate: "desc" },
        },
      },
    });

    if (!service) {
      return NextResponse.json(
        { error: "Layanan tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(service);
  } catch (error) {
    console.error("Error fetching service:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data layanan" },
      { status: 500 }
    );
  }
}
