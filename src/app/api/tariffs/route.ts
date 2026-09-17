import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, getClientIp } from "@/lib/auth-helpers";
import { tariffSchema } from "@/validations";

export async function POST(request: NextRequest) {
  const authResult = await requireRole("ADMIN", "SUPER_ADMIN");
  if (authResult.error) return authResult.error;
  const { session } = authResult;

  try {
    const body = await request.json();
    const parsed = tariffSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { effectiveEndDate, effectiveStartDate, ...data } = parsed.data;

    const tariff = await prisma.serviceTariff.create({
      data: {
        ...data,
        effectiveStartDate: new Date(effectiveStartDate),
        effectiveEndDate: effectiveEndDate ? new Date(effectiveEndDate) : null,
        createdById: session.userId,
      },
      include: { service: { select: { name: true } } },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "CREATE",
        entity: "ServiceTariff",
        entityId: tariff.id,
        newData: { name: tariff.name, price: tariff.price },
        ipAddress: getClientIp(request),
      },
    });

    return NextResponse.json(
      { data: tariff, message: "Tarif berhasil dibuat" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating tariff:", error);
    return NextResponse.json({ error: "Gagal membuat tarif" }, { status: 500 });
  }
}
