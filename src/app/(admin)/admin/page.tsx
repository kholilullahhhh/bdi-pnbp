import {
  FileText,
  CreditCard,
  Clock,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
  DollarSign,
  Users,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Permohonan",
    value: "0",
    icon: FileText,
    description: "Semua permohonan",
  },
  {
    title: "Menunggu Verifikasi",
    value: "0",
    icon: Clock,
    description: "Perlu ditindaklanjuti",
    highlight: true,
  },
  {
    title: "Selesai",
    value: "0",
    icon: CheckCircle2,
    description: "Total selesai",
  },
  {
    title: "Total Pengguna",
    value: "0",
    icon: Users,
    description: "Terdaftar",
  },
  {
    title: "Total Tagihan",
    value: "Rp 0",
    icon: DollarSign,
    description: "Nilai tagihan",
  },
  {
    title: "Pembayaran Terverifikasi",
    value: "Rp 0",
    icon: CreditCard,
    description: "Sudah dikonfirmasi",
  },
];

const recentActivity = [
  // Empty state
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard Admin</h1>
        <p className="text-gray-600">
          Ringkasan data dan aktivitas Sistem Informasi PNBP
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className={stat.highlight ? "border-yellow-300 bg-yellow-50" : ""}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Chart placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Transaksi Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-gray-300 mx-auto mb-2" />
                <p className="text-gray-500">Grafik akan ditampilkan di sini</p>
                <p className="text-sm text-gray-400">Ketika ada data transaksi</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent activity */}
        <Card>
          <CardHeader>
            <CardTitle>Aktivitas Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivity.length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Belum ada aktivitas</p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Activity list */}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
