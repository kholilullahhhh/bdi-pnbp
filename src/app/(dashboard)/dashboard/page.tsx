import {
  FileText,
  CreditCard,
  Clock,
  CheckCircle2,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Permohonan",
    value: "0",
    icon: FileText,
    change: "+0 bulan ini",
    changeType: "neutral",
  },
  {
    title: "Menunggu Verifikasi",
    value: "0",
    icon: Clock,
    change: "Perlu ditindaklanjuti",
    changeType: "warning",
  },
  {
    title: "Selesai",
    value: "0",
    icon: CheckCircle2,
    change: "Total selesai",
    changeType: "success",
  },
  {
    title: "Total Pembayaran",
    value: "Rp 0",
    icon: CreditCard,
    change: "Nilai terverifikasi",
    changeType: "success",
  },
];

const recentApplications = [
  // Empty state - no applications yet
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">
          Selamat datang di Sistem Informasi PNBP BDI Makassar
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p
                className={`text-xs mt-1 ${
                  stat.changeType === "success"
                    ? "text-green-600"
                    : stat.changeType === "warning"
                    ? "text-yellow-600"
                    : "text-gray-500"
                }`}
              >
                {stat.changeType === "warning" && (
                  <AlertCircle className="inline h-3 w-3 mr-1" />
                )}
                {stat.changeType === "success" && (
                  <TrendingUp className="inline h-3 w-3 mr-1" />
                )}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Applications */}
      <Card>
        <CardHeader>
          <CardTitle>Permohonan Terbaru</CardTitle>
        </CardHeader>
        <CardContent>
          {recentApplications.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Belum ada permohonan</p>
              <p className="text-sm text-gray-400 mt-1">
                Mulai dengan melihat layanan yang tersedia
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Application list would go here */}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
