import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, getClientIp } from "@/lib/auth-helpers";
import { serviceSchema } from "@/validations";
import { slugify } from "@/lib/utils";

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

export async function POST(request: NextRequest) {
  const authResult = await requireRole("ADMIN", "SUPER_ADMIN");
  if (authResult.error) return authResult.error;
  const { session } = authResult;

  try {
    const body = await request.json();
    const parsed = serviceSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const data = parsed.data;
    if (!data.slug) {
      data.slug = slugify(data.name);
    }

    const existing = await prisma.service.findUnique({ where: { slug: data.slug } });
    if (existing) {
      return NextResponse.json(
        { error: "Slug layanan sudah ada" },
        { status: 400 }
      );
    }

    const service = await prisma.service.create({
      data: {
        ...data,
        createdById: session.userId,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "CREATE",
        entity: "Service",
        entityId: service.id,
        newData: { name: service.name, slug: service.slug },
        ipAddress: getClientIp(request),
      },
    });

    return NextResponse.json(
      { data: service, message: "Layanan berhasil dibuat" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating service:", error);
    return NextResponse.json({ error: "Gagal membuat layanan" }, { status: 500 });
  }
}
