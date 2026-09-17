import Link from "next/link";
import {
  FileText,
  Search,
  Plus,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
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
          <h1 className="text-2xl font-bold text-foreground">
            Permohonan Saya
          </h1>
          <p className="text-muted-foreground mt-1">
            Daftar permohonan layanan PNBP
          </p>
        </div>
        <Link href="/layanan">
          <Button>
            <Plus className="mr-1.5 h-4 w-4" />
            Ajukan Baru
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Cari nomor atau nama layanan..." className="pl-9" />
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {applications.length === 0 ? (
            <EmptyState
              icon={<FileText className="h-8 w-8" />}
              title="Belum ada permohonan"
              description="Ajukan permohonan layanan PNBP pertama Anda."
              action={
                <Link href="/layanan">
                  <Button>
                    <Plus className="mr-1.5 h-4 w-4" />
                    Ajukan Permohonan
                  </Button>
                </Link>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Nomor
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Layanan
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Tagihan
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Tanggal
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <tr
                      key={app.id}
                      className="border-b border-border last:border-0 hover:bg-surface-alt/50 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono text-xs text-foreground">
                        {app.applicationNumber}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-foreground">
                        {app.serviceName}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-xs text-muted-foreground">
                        {app.invoice ? formatCurrency(Number(app.invoice.totalAmount)) : "-"}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">
                        {formatDateShort(app.createdAt)}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={getStatusVariant(app.status)}>
                          {getStatusLabel(app.status)}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button variant="ghost" size="icon" aria-label="Lihat detail">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
