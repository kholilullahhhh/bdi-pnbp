import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, getClientIp } from "@/lib/auth-helpers";
import { serviceSchema } from "@/validations";
import { slugify } from "@/lib/utils";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  // Try by id first, then by slug
  let service = await prisma.service.findUnique({
    where: { id },
    include: {
      category: true,
      tariffs: {
        where: { verificationStatus: "VERIFIED" },
        orderBy: { effectiveStartDate: "desc" },
      },
    },
  });

  if (!service) {
    service = await prisma.service.findUnique({
      where: { slug: id },
      include: {
        category: true,
        tariffs: {
          where: { verificationStatus: "VERIFIED" },
          orderBy: { effectiveStartDate: "desc" },
        },
      },
    });
  }

  if (!service) {
    return NextResponse.json({ error: "Layanan tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json(service);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireRole("ADMIN", "SUPER_ADMIN");
  if (authResult.error) return authResult.error;
  const { session } = authResult;
  const { id } = await params;

  try {
    const body = await request.json();
    const parsed = serviceSchema.partial().safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const existing = await prisma.service.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Layanan tidak ditemukan" }, { status: 404 });
    }

    const data = parsed.data;
    if (data.name && !data.slug) {
      data.slug = slugify(data.name);
    }

    const updated = await prisma.service.update({
      where: { id },
      data,
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "UPDATE",
        entity: "Service",
        entityId: id,
        oldData: { name: existing.name },
        newData: data,
        ipAddress: getClientIp(request),
      },
    });

    return NextResponse.json({ data: updated, message: "Layanan berhasil diperbarui" });
  } catch (error) {
    console.error("Error updating service:", error);
    return NextResponse.json({ error: "Gagal memperbarui layanan" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireRole("ADMIN", "SUPER_ADMIN");
  if (authResult.error) return authResult.error;
  const { session } = authResult;
  const { id } = await params;

  try {
    const existing = await prisma.service.findUnique({
      where: { id },
      include: { applications: { take: 1 } },
    });

    if (!existing) {
      return NextResponse.json({ error: "Layanan tidak ditemukan" }, { status: 404 });
    }

    if (existing.applications.length > 0) {
      return NextResponse.json(
        { error: "Tidak dapat menghapus layanan yang sudah memiliki permohonan" },
        { status: 400 }
      );
    }

    await prisma.service.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "DELETE",
        entity: "Service",
        entityId: id,
        oldData: { name: existing.name },
        ipAddress: getClientIp(request),
      },
    });

    return NextResponse.json({ message: "Layanan berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting service:", error);
    return NextResponse.json({ error: "Gagal menghapus layanan" }, { status: 500 });
  }
}
