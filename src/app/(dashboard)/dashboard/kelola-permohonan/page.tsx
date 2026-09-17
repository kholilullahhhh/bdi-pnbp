export const dynamic = "force-dynamic";

import { FileText } from "lucide-react";
import { getApplications } from "@/lib/db-queries";
import { KelolaPermohonanClient } from "@/components/admin/kelola-permohonan-client";

export default async function KelolaPermohonanPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let applications: any[] = [];
  try {
    applications = await getApplications();
  } catch (error) {
    console.error("Kelola permohonan page DB error:", error);
  }

  if (applications.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manajemen Permohonan</h1>
          <p className="text-muted-foreground mt-1">Kelola dan verifikasi permohonan layanan</p>
        </div>
        <div className="bg-white rounded-xl border border-border p-12 text-center">
          <FileText className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
          <p className="text-muted-foreground">Belum ada permohonan yang diajukan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manajemen Permohonan</h1>
        <p className="text-muted-foreground mt-1">Kelola dan verifikasi permohonan layanan</p>
      </div>
      <KelolaPermohonanClient applications={applications} />
    </div>
  );
}
