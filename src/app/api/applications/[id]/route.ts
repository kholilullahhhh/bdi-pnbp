import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth, getClientIp } from "@/lib/auth-helpers";
import { z } from "zod";
import { Prisma } from "@prisma/client";

const updateApplicationSchema = z.object({
  notes: z.string().max(5000, "Catatan maksimal 5000 karakter").optional(),
  serviceName: z.string().min(1).optional(),
  serviceId: z.string().min(1).optional(),
});

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;
  const { session } = authResult;
  const { id } = await params;

  const application = await prisma.application.findUnique({
    where: { id },
    include: {
      service: true,
      user: { select: { id: true, name: true, email: true, phone: true, instansi: true } },
      invoice: {
        include: {
          items: true,
          payments: true,
        },
      },
      statusHistory: {
        orderBy: { changedAt: "desc" },
        include: { changedBy: { select: { name: true } } },
      },
      documents: true,
    },
  });

  if (!application) {
    return NextResponse.json(
      { error: "Permohonan tidak ditemukan" },
      { status: 404 }
    );
  }

  // User can only view own applications
  if (session.role === "USER" && application.userId !== session.userId) {
    return NextResponse.json(
      { error: "Akses ditolak" },
      { status: 403 }
    );
  }

  return NextResponse.json({ data: application });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await requireAuth();
  if (authResult.error) return authResult.error;
  const { session } = authResult;
  const { id } = await params;

  try {
    const body = await request.json();
    const parsed = updateApplicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const application = await prisma.application.findUnique({
      where: { id },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Permohonan tidak ditemukan" },
        { status: 404 }
      );
    }

    if (session.role === "USER" && application.userId !== session.userId) {
      return NextResponse.json(
        { error: "Akses ditolak" },
        { status: 403 }
      );
    }

    if (session.role === "USER" && application.status !== "DRAFT" && application.status !== "REVISION_REQUIRED") {
      return NextResponse.json(
        { error: "Hanya permohonan DRAFT atau PERLU REVISI yang dapat diedit" },
        { status: 400 }
      );
    }

    const updateData: Record<string, unknown> = {};
    if (parsed.data.notes !== undefined) updateData.notes = parsed.data.notes;
    if (parsed.data.serviceName !== undefined) updateData.serviceName = parsed.data.serviceName;
    if (parsed.data.serviceId !== undefined) updateData.serviceId = parsed.data.serviceId;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ data: application, message: "Tidak ada perubahan" });
    }

    const [updated] = await prisma.$transaction([
      prisma.application.update({ where: { id }, data: updateData }),
      prisma.auditLog.create({
        data: {
          userId: session.userId,
          action: "UPDATE",
          entity: "Application",
          entityId: id,
          oldData: { notes: application.notes } as Prisma.InputJsonValue,
          newData: updateData as Prisma.InputJsonValue,
          ipAddress: getClientIp(request),
        },
      }),
    ]);

    return NextResponse.json({ data: updated, message: "Berhasil diperbarui" });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui permohonan" },
      { status: 500 }
    );
  }
}
