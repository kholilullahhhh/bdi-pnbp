import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth-helpers";

export async function GET() {
  const result = await requireRole("ADMIN", "SUPER_ADMIN");
  if (result.error) return result.error;

  const settings = await prisma.systemSetting.findMany({
    orderBy: { key: "asc" },
  });

  const grouped: Record<string, Record<string, string | null>> = {};
  for (const s of settings) {
    const g = s.group || "general";
    if (!grouped[g]) grouped[g] = {};
    grouped[g][s.key] = s.value;
  }

  return NextResponse.json(grouped);
}

export async function PUT(request: NextRequest) {
  const result = await requireRole("ADMIN", "SUPER_ADMIN");
  if (result.error) return result.error;

  const body = await request.json();
  const { settings } = body as { settings: Record<string, Record<string, string>> };

  if (!settings || typeof settings !== "object") {
    return NextResponse.json({ error: "Data tidak valid" }, { status: 400 });
  }

  const ops = [];
  for (const [group, entries] of Object.entries(settings)) {
    for (const [key, value] of Object.entries(entries)) {
      ops.push(
        prisma.systemSetting.upsert({
          where: { key },
          update: { value, group },
          create: { key, value, group },
        })
      );
    }
  }

  await prisma.$transaction(ops);

  return NextResponse.json({ message: "Pengaturan berhasil disimpan" });
}
