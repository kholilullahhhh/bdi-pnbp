import {
  FileText,
  CreditCard,
  Clock,
  CheckCircle2,
  Users,
  DollarSign,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency } from "@/lib/utils";

const stats = [
  {
    title: "Total Permohonan",
    value: "0",
    icon: FileText,
    description: "Semua permohonan",
    color: "text-primary-700",
    bg: "bg-primary-50",
  },
  {
    title: "Menunggu Verifikasi",
    value: "0",
    icon: Clock,
    description: "Perlu ditindaklanjuti",
    color: "text-amber-600",
    bg: "bg-amber-50",
    highlight: true,
  },
  {
    title: "Selesai",
    value: "0",
    icon: CheckCircle2,
    description: "Total selesai",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    title: "Total Pengguna",
    value: "0",
    icon: Users,
    description: "Terdaftar",
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    title: "Total Tagihan",
    value: formatCurrency(0),
    icon: DollarSign,
    description: "Nilai tagihan",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
  {
    title: "Pembayaran Terverifikasi",
    value: formatCurrency(0),
    icon: CreditCard,
    description: "Sudah dikonfirmasi",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Admin</h1>
        <p className="text-muted-foreground mt-1">
          Ringkasan data dan aktivitas Sistem Informasi PNBP
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className={stat.highlight ? "border-amber-200 bg-amber-50/50" : ""}
          >
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}
                >
                  <stat.icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts & Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Chart placeholder */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Transaksi Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-surface rounded-xl border border-border border-dashed">
              <EmptyState
                icon={<TrendingUp className="h-8 w-8" />}
                title="Grafik akan ditampilkan"
                description="Data transaksi akan muncul di sini ketika ada data."
              />
            </div>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            <EmptyState
              icon={<AlertCircle className="h-8 w-8" />}
              title="Belum ada aktivitas"
              description="Aktivitas terbaru akan muncul di sini."
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
