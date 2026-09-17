import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, getClientIp } from "@/lib/auth-helpers";
import { announcementSchema } from "@/validations";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const announcement = await prisma.announcement.findUnique({ where: { id } });

  if (!announcement) {
    return NextResponse.json({ error: "Pengumuman tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json({ data: announcement });
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
    const parsed = announcementSchema.partial().safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const existing = await prisma.announcement.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Pengumuman tidak ditemukan" }, { status: 404 });
    }

    const data = parsed.data;
    const updateData: Record<string, unknown> = { ...data };
    if (data.isPublished !== undefined) {
      updateData.publishedAt = data.isPublished && !existing.isPublished ? new Date() : existing.publishedAt;
    }

    const updated = await prisma.announcement.update({
      where: { id },
      data: updateData,
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "UPDATE",
        entity: "Announcement",
        entityId: id,
        oldData: { title: existing.title },
        newData: { title: data.title || existing.title },
        ipAddress: getClientIp(request),
      },
    });

    return NextResponse.json({ data: updated, message: "Pengumuman berhasil diperbarui" });
  } catch (error) {
    console.error("Error updating announcement:", error);
    return NextResponse.json({ error: "Gagal memperbarui pengumuman" }, { status: 500 });
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
    const existing = await prisma.announcement.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Pengumuman tidak ditemukan" }, { status: 404 });
    }

    await prisma.announcement.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "DELETE",
        entity: "Announcement",
        entityId: id,
        oldData: { title: existing.title },
        ipAddress: getClientIp(request),
      },
    });

    return NextResponse.json({ message: "Pengumuman berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting announcement:", error);
    return NextResponse.json({ error: "Gagal menghapus pengumuman" }, { status: 500 });
  }
}
