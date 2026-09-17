export const dynamic = "force-dynamic";

import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth-helpers";
import { notFound } from "next/navigation";
import { SettingsClient } from "@/components/admin/settings-client";

export default async function PengaturanPage() {
  const session = await getAuthSession();
  if (!session || !["ADMIN", "SUPER_ADMIN"].includes(session.role)) {
    notFound();
  }

  const settings: Record<string, Record<string, string>> = {};
  try {
    const rows = await prisma.systemSetting.findMany({ orderBy: { key: "asc" } });
    for (const s of rows) {
      const g = s.group || "general";
      if (!settings[g]) settings[g] = {};
      settings[g][s.key] = s.value ?? "";
    }
  } catch (error) {
    console.error("Settings page DB error:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pengaturan</h1>
        <p className="text-muted-foreground mt-1">Konfigurasi sistem informasi</p>
      </div>
      <SettingsClient initialSettings={settings} />
    </div>
  );
}
