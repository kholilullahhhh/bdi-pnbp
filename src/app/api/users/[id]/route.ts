import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, requireRole, getClientIp } from "@/lib/auth-helpers";
import { z } from "zod";
import bcrypt from "bcryptjs";

const updateUserSchema = z.object({
  role: z.enum(["USER", "OPERATOR", "ADMIN", "SUPER_ADMIN", "LEADER", "AUDITOR"]).optional(),
  isActive: z.boolean().optional(),
});

const selfUpdateSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong").max(100).optional(),
  phone: z.string().max(20).nullable().optional(),
  currentPassword: z.string().optional(),
  newPassword: z.string().min(6, "Password minimal 6 karakter").optional(),
}).refine(
  (data) => {
    if (data.newPassword && !data.currentPassword) return false;
    if (data.currentPassword && !data.newPassword) return false;
    return true;
  },
  { message: "Password saat ini dan password baru wajib diisi bersamaan" }
);

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

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;
  const { session } = authResult;
  const { id } = await params;

  if (id !== session.userId) {
    return NextResponse.json({ error: "Tidak dapat mengubah profil pengguna lain" }, { status: 403 });
  }

  try {
    const body = await request.json();
    const parsed = selfUpdateSchema.safeParse(body);

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

    const updateData: { name?: string; phone?: string | null; password?: string } = {};

    if (parsed.data.name !== undefined) updateData.name = parsed.data.name;
    if (parsed.data.phone !== undefined) updateData.phone = parsed.data.phone;

    if (parsed.data.currentPassword && parsed.data.newPassword) {
      const validPassword = await bcrypt.compare(parsed.data.currentPassword, existing.password);
      if (!validPassword) {
        return NextResponse.json({ error: "Password saat ini salah" }, { status: 400 });
      }
      updateData.password = await bcrypt.hash(parsed.data.newPassword, 10);
    }

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "Tidak ada data yang diperbarui" }, { status: 400 });
    }

    const updated = await prisma.user.update({
      where: { id },
      data: updateData,
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "UPDATE",
        entity: "User",
        entityId: id,
        oldData: { name: existing.name, phone: existing.phone },
        newData: { name: updated.name, phone: updated.phone, passwordChanged: !!parsed.data.newPassword },
        ipAddress: getClientIp(request),
      },
    });

    return NextResponse.json({ data: updated, message: "Profil berhasil diperbarui" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json({ error: "Gagal memperbarui profil" }, { status: 500 });
  }
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

    // Prevent ADMIN from modifying SUPER_ADMIN users
    if (session.role === "ADMIN" && existing.role === "SUPER_ADMIN" && id !== session.userId) {
      return NextResponse.json(
        { error: "Admin tidak dapat mengubah akun Super Admin" },
        { status: 403 }
      );
    }

    // Prevent ADMIN from assigning SUPER_ADMIN role
    if (session.role === "ADMIN" && parsed.data.role === "SUPER_ADMIN") {
      return NextResponse.json(
        { error: "Admin tidak dapat menetapkan role Super Admin" },
        { status: 403 }
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
