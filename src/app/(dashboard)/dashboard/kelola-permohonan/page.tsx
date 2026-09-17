export const dynamic = "force-dynamic";

import { Eye, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { getApplications, getStatusLabel, getStatusVariant, formatDateShort } from "@/lib/db-queries";

export default async function KelolaPermohonanPage() {
  const applications = await getApplications();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manajemen Permohonan</h1>
        <p className="text-muted-foreground mt-1">Kelola dan verifikasi permohonan layanan</p>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {applications.length === 0 ? (
          <EmptyState icon={<FileText className="h-8 w-8" />} title="Tidak ada permohonan" description="Belum ada permohonan yang diajukan." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface/80">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Nomor</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Pemohon</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Layanan</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Tanggal</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b border-border/60 last:border-0 hover:bg-primary-50/30 transition-colors group">
                    <td className="py-3.5 px-4 font-mono text-xs text-foreground">{app.applicationNumber}</td>
                    <td className="py-3.5 px-4 font-medium text-foreground group-hover:text-primary-800 transition-colors">{app.user.name}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{app.serviceName}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{formatDateShort(app.createdAt)}</td>
                    <td className="py-3.5 px-4"><Badge variant={getStatusVariant(app.status)}>{getStatusLabel(app.status)}</Badge></td>
                    <td className="py-3.5 px-4 text-right">
                      <Button variant="ghost" size="icon" aria-label="Lihat detail" className="text-muted-foreground hover:text-primary-700">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
