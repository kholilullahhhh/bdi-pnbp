import Link from "next/link";
import { FileText, Search, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getStatusLabel, getStatusVariant, formatDateShort, formatCurrency } from "@/lib/utils";

export default async function PermohonanPage() {
  const session = await auth();
  const userId = (session?.user as unknown as { id: string })?.id;
  if (!userId) return null;

  const applications = await prisma.application.findMany({
    where: { userId },
    include: {
      service: { select: { name: true } },
      invoice: { select: { totalAmount: true, status: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Permohonan Saya</h1>
          <p className="text-muted-foreground mt-1">Daftar permohonan layanan PNBP</p>
        </div>
        <Link href="/layanan">
          <Button><Plus className="mr-1.5 h-4 w-4" />Ajukan Baru</Button>
        </Link>
      </div>
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari nomor atau nama layanan..." className="pl-9" />
        </div>
      </div>
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {applications.length === 0 ? (
          <EmptyState icon={<FileText className="h-8 w-8" />} title="Belum ada permohonan"
            description="Ajukan permohonan layanan PNBP pertama Anda."
            action={<Link href="/layanan"><Button><Plus className="mr-1.5 h-4 w-4" />Ajukan Permohonan</Button></Link>} />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface/80">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Nomor</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Layanan</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Tagihan</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Tanggal</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {applications.map((app) => (
                  <tr key={app.id} className="border-b border-border/60 last:border-0 hover:bg-primary-50/30 transition-colors group">
                    <td className="py-3.5 px-4 font-mono text-xs text-foreground">{app.applicationNumber}</td>
                    <td className="py-3.5 px-4 font-medium text-foreground group-hover:text-primary-800 transition-colors">{app.serviceName}</td>
                    <td className="py-3.5 px-4 font-mono text-xs text-muted-foreground">{app.invoice ? formatCurrency(Number(app.invoice.totalAmount)) : "-"}</td>
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
