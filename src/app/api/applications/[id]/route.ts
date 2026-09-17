import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth-helpers";

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
    const { notes } = body;

    if (notes !== undefined && notes !== null && typeof notes !== "string") {
      return NextResponse.json({ error: "Notes harus berupa string" }, { status: 400 });
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

    // User can only update own applications and only notes
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

    const updated = await prisma.application.update({
      where: { id },
      data: {
        notes: notes !== undefined ? notes : undefined,
      },
    });

    return NextResponse.json({ data: updated, message: "Berhasil diperbarui" });
  } catch (error) {
    console.error("Error updating application:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui permohonan" },
      { status: 500 }
    );
  }
}
