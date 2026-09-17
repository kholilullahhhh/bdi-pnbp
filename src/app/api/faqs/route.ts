import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, getClientIp } from "@/lib/auth-helpers";
import { faqSchema } from "@/validations";

export async function POST(request: NextRequest) {
  const authResult = await requireRole("ADMIN", "SUPER_ADMIN");
  if (authResult.error) return authResult.error;
  const { session } = authResult;

  try {
    const body = await request.json();
    const parsed = faqSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const faq = await prisma.fAQ.create({
      data: {
        ...parsed.data,
        createdById: session.userId,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "CREATE",
        entity: "FAQ",
        entityId: faq.id,
        newData: { question: faq.question },
        ipAddress: getClientIp(request),
      },
    });

    return NextResponse.json(
      { data: faq, message: "FAQ berhasil dibuat" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating FAQ:", error);
    return NextResponse.json({ error: "Gagal membuat FAQ" }, { status: 500 });
  }
}
