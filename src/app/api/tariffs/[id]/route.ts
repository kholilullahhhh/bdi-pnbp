import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, getClientIp } from "@/lib/auth-helpers";
import { tariffSchema } from "@/validations";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const tariff = await prisma.serviceTariff.findUnique({
    where: { id },
    include: { service: { select: { name: true } } },
  });

  if (!tariff) {
    return NextResponse.json({ error: "Tarif tidak ditemukan" }, { status: 404 });
  }

  return NextResponse.json({ data: tariff });
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
    const parsed = tariffSchema.partial().safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const existing = await prisma.serviceTariff.findUnique({ where: { id } });
    if (!existing) {
      return NextResponse.json({ error: "Tarif tidak ditemukan" }, { status: 404 });
    }

    const data = parsed.data;
    const updateData: Record<string, unknown> = { ...data };
    if (data.effectiveStartDate) {
      updateData.effectiveStartDate = new Date(data.effectiveStartDate);
    }
    if (data.effectiveEndDate) {
      updateData.effectiveEndDate = new Date(data.effectiveEndDate);
    }

    const updated = await prisma.serviceTariff.update({
      where: { id },
      data: updateData,
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "UPDATE",
        entity: "ServiceTariff",
        entityId: id,
        oldData: { price: existing.price },
        newData: data,
        ipAddress: getClientIp(request),
      },
    });

    return NextResponse.json({ data: updated, message: "Tarif berhasil diperbarui" });
  } catch (error) {
    console.error("Error updating tariff:", error);
    return NextResponse.json({ error: "Gagal memperbarui tarif" }, { status: 500 });
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
    const existing = await prisma.serviceTariff.findUnique({
      where: { id },
      include: { invoices: { take: 1 } },
    });

    if (!existing) {
      return NextResponse.json({ error: "Tarif tidak ditemukan" }, { status: 404 });
    }

    if (existing.invoices.length > 0) {
      return NextResponse.json(
        { error: "Tidak dapat menghapus tarif yang sudah digunakan di invoice" },
        { status: 400 }
      );
    }

    await prisma.serviceTariff.delete({ where: { id } });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "DELETE",
        entity: "ServiceTariff",
        entityId: id,
        oldData: { name: existing.name },
        ipAddress: getClientIp(request),
      },
    });

    return NextResponse.json({ message: "Tarif berhasil dihapus" });
  } catch (error) {
    console.error("Error deleting tariff:", error);
    return NextResponse.json({ error: "Gagal menghapus tarif" }, { status: 500 });
  }
}
