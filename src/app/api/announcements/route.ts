import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole, getClientIp } from "@/lib/auth-helpers";
import { announcementSchema } from "@/validations";

export async function POST(request: NextRequest) {
  const authResult = await requireRole("ADMIN", "SUPER_ADMIN");
  if (authResult.error) return authResult.error;
  const { session } = authResult;

  try {
    const body = await request.json();
    const parsed = announcementSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { isPublished, ...data } = parsed.data;

    const announcement = await prisma.announcement.create({
      data: {
        ...data,
        isPublished: isPublished ?? false,
        publishedAt: isPublished ? new Date() : null,
        createdById: session.userId,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId: session.userId,
        action: "CREATE",
        entity: "Announcement",
        entityId: announcement.id,
        newData: { title: announcement.title },
        ipAddress: getClientIp(request),
      },
    });

    return NextResponse.json(
      { data: announcement, message: "Pengumuman berhasil dibuat" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating announcement:", error);
    return NextResponse.json({ error: "Gagal membuat pengumuman" }, { status: 500 });
  }
}
