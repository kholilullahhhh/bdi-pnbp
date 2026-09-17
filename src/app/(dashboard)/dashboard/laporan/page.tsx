export const dynamic = "force-dynamic";

import { BarChart3, Download, Calendar, FileText, Users, CreditCard, CheckCircle2, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { getReportSummary, formatCurrency } from "@/lib/db-queries";

export default async function LaporanPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let summary: any = {
    totalApps: 0, totalUsers: 0, paidAmount: 0, billedAmount: 0,
    pendingApps: 0, completedApps: 0, rejectedApps: 0,
  };
  try {
    summary = await getReportSummary();
  } catch (error) {
    console.error("Laporan page DB error:", error);
  }

  const summaryStats = [
    { label: "Total Permohonan", value: summary.totalApps.toString(), icon: FileText, gradient: "from-blue-500 to-blue-600", shadow: "shadow-blue-500/20" },
    { label: "Total Pengguna", value: summary.totalUsers.toString(), icon: Users, gradient: "from-violet-500 to-purple-500", shadow: "shadow-violet-500/20" },
    { label: "Total Pendapatan", value: formatCurrency(summary.paidAmount), icon: CreditCard, gradient: "from-emerald-500 to-green-500", shadow: "shadow-emerald-500/20" },
  ];

  const detailStats = [
    { label: "Menunggu Verifikasi", value: summary.pendingApps.toString(), icon: Clock, color: "text-amber-600", bg: "bg-amber-50" },
    { label: "Selesai", value: summary.completedApps.toString(), icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "Ditolak", value: summary.rejectedApps.toString(), icon: XCircle, color: "text-red-600", bg: "bg-red-50" },
    { label: "Total Tagihan", value: formatCurrency(summary.billedAmount), icon: CreditCard, color: "text-rose-600", bg: "bg-rose-50" },
    { label: "Terealisasi", value: `${summary.billedAmount > 0 ? Math.round((summary.paidAmount / summary.billedAmount) * 100) : 0}%`, icon: BarChart3, color: "text-blue-600", bg: "bg-blue-50" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Laporan</h1>
          <p className="text-muted-foreground mt-1">Ringkasan data dan statistik sistem</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Calendar className="mr-1.5 h-4 w-4" />Periode: Semua</Button>
          <Button variant="outline" size="sm"><Download className="mr-1.5 h-4 w-4" />Export PDF</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryStats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border p-5 hover:shadow-card-hover transition-all duration-300 group">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{s.label}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{s.value}</p>
              </div>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${s.gradient} flex items-center justify-center shadow-lg ${s.shadow} group-hover:scale-110 transition-transform duration-300`}>
                <s.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {detailStats.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-border p-4 hover:shadow-card-hover transition-all duration-300 group">
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg} group-hover:scale-110 transition-transform duration-300`}>
                <s.icon className={`h-5 w-5 ${s.color}`} />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold">{s.label}</p>
                <p className="text-lg font-bold text-foreground">{s.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-base font-bold text-foreground">Permohonan per Kategori</h3>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-center justify-center bg-surface rounded-xl border border-border border-dashed">
              <EmptyState icon={<BarChart3 className="h-8 w-8" />} title="Grafik akan ditampilkan" description="Data akan muncul ketika ada permohonan." />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h3 className="text-base font-bold text-foreground">Pendapatan Bulanan</h3>
          </div>
          <div className="p-6">
            <div className="h-64 flex items-center justify-center bg-surface rounded-xl border border-border border-dashed">
              <EmptyState icon={<BarChart3 className="h-8 w-8" />} title="Grafik akan ditampilkan" description="Data pendapatan akan muncul di sini." />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
