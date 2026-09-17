import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, getClientIp } from "@/lib/auth-helpers";
import { z } from "zod";

const updateUserSchema = z.object({
  role: z.enum(["USER", "OPERATOR", "ADMIN", "SUPER_ADMIN", "LEADER", "AUDITOR"]).optional(),
  isActive: z.boolean().optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireRole("ADMIN", "SUPER_ADMIN");
  if (authResult.error) return authResult.error;
  const { id } = await params;

  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      role: true,
      isActive: true,
      createdAt: true,
      profile: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "Pengguna tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json({ data: user });
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
    const parsed = updateUserSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const existing = await prisma.user.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Pengguna tidak ditemukan" }, { status: 404 });
    }

    // Prevent self-demotion
    if (id === session.userId && parsed.data.role && parsed.data.role !== existing.role) {
      return NextResponse.json(
        { error: "Tidak dapat mengubah role sendiri" },
        { status: 400 }
      );
    }

    // Prevent deactivating self
    if (id === session.userId && parsed.data.isActive === false) {
      return NextResponse.json(
        { error: "Tidak dapat menonaktifkan akun sendiri" },
        { status: 400 }
      );
    }

    const updated = await prisma.user.update({
      where: { id },
      data: parsed.data,
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        isActive: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "UPDATE",
        entity: "User",
        entityId: id,
        oldData: { role: existing.role, isActive: existing.isActive },
        newData: parsed.data,
        ipAddress: getClientIp(request),
      },
    });

    return NextResponse.json({ data: updated, message: "Pengguna berhasil diperbarui" });
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json({ error: "Gagal memperbarui pengguna" }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireRole("SUPER_ADMIN");
  if (authResult.error) return authResult.error;
  const { session } = authResult;
  const { id } = await params;

  try {
    const existing = await prisma.user.findUnique({
      where: { id },
      include: { applications: { take: 1 } },
    });

    if (!existing) {
      return NextResponse.json({ error: "Pengguna tidak ditemukan" }, { status: 404 });
    }

    if (id === session.userId) {
      return NextResponse.json(
        { error: "Tidak dapat menghapus akun sendiri" },
        { status: 400 }
      );
    }

    if (existing.applications.length > 0) {
      // Soft delete: deactivate instead of hard delete
      await prisma.user.update({
        where: { id },
        data: { isActive: false },
      });

      return NextResponse.json({ message: "Pengguna dinonaktifkan (memiliki data permohonan)" });
    }

    await prisma.user.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "DELETE",
        entity: "User",
        entityId: id,
        oldData: { email: existing.email },
        ipAddress: getClientIp(request),
      },
    });

    return NextResponse.json({ message: "Pengguna berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json({ error: "Gagal menghapus pengguna" }, { status: 500 });
  }
}
