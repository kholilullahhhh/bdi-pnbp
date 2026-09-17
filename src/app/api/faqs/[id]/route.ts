import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, getClientIp } from "@/lib/auth-helpers";
import { faqSchema } from "@/validations";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const faq = await prisma.fAQ.findUnique({ where: { id } });

  if (!faq) {
    return NextResponse.json({ error: "FAQ tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json({ data: faq });
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
    const parsed = faqSchema.partial().safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const existing = await prisma.fAQ.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "FAQ tidak ditemukan" }, { status: 404 });
    }

    const updated = await prisma.fAQ.update({
      where: { id },
      data: parsed.data,
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "UPDATE",
        entity: "FAQ",
        entityId: id,
        oldData: { question: existing.question },
        newData: { question: parsed.data.question || existing.question },
        ipAddress: getClientIp(request),
      },
    });

    return NextResponse.json({ data: updated, message: "FAQ berhasil diperbarui" });
  } catch (error) {
    console.error("Error updating FAQ:", error);
    return NextResponse.json({ error: "Gagal memperbarui FAQ" }, { status: 500 });
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
    const existing = await prisma.fAQ.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "FAQ tidak ditemukan" }, { status: 404 });
    }

    await prisma.fAQ.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "DELETE",
        entity: "FAQ",
        entityId: id,
        oldData: { question: existing.question },
        ipAddress: getClientIp(request),
      },
    });

    return NextResponse.json({ message: "FAQ berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting FAQ:", error);
    return NextResponse.json({ error: "Gagal menghapus FAQ" }, { status: 500 });
  }
}
