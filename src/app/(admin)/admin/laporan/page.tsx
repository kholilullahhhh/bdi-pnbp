import {
  BarChart3,
  Download,
  Calendar,
  FileText,
  Users,
  CreditCard,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { getReportSummary, formatCurrency } from "@/lib/db-queries";

export default async function LaporanPage() {
  const summary = await getReportSummary();

  const summaryStats = [
    {
      label: "Total Permohonan",
      value: summary.totalApps.toString(),
      icon: FileText,
      color: "text-primary-700",
      bg: "bg-primary-50",
    },
    {
      label: "Total Pengguna",
      value: summary.totalUsers.toString(),
      icon: Users,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      label: "Total Pendapatan",
      value: formatCurrency(summary.paidAmount),
      icon: CreditCard,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  const detailStats = [
    {
      label: "Menunggu Verifikasi",
      value: summary.pendingApps.toString(),
      icon: Clock,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Selesai",
      value: summary.completedApps.toString(),
      icon: CheckCircle2,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Ditolak",
      value: summary.rejectedApps.toString(),
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-50",
    },
    {
      label: "Total Tagihan",
      value: formatCurrency(summary.billedAmount),
      icon: CreditCard,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      label: "Terealisasi",
      value: `${summary.billedAmount > 0 ? Math.round((summary.paidAmount / summary.billedAmount) * 100) : 0}%`,
      icon: BarChart3,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Laporan</h1>
          <p className="text-muted-foreground mt-1">
            Ringkasan data dan statistik sistem
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-1.5 h-4 w-4" />
            Periode: Semua
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-1.5 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryStats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {s.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {s.value}
                  </p>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg}`}>
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {detailStats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${s.bg}`}>
                  <s.icon className={`h-4 w-4 ${s.color}`} />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                  <p className="text-lg font-bold text-foreground">{s.value}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Permohonan per Kategori</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-surface rounded-xl border border-border border-dashed">
              <EmptyState
                icon={<BarChart3 className="h-8 w-8" />}
                title="Grafik akan ditampilkan"
                description="Data akan muncul ketika ada permohonan."
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pendapatan Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-surface rounded-xl border border-border border-dashed">
              <EmptyState
                icon={<BarChart3 className="h-8 w-8" />}
                title="Grafik akan ditampilkan"
                description="Data pendapatan akan muncul di sini."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
