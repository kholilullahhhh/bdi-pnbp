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
import { formatCurrency, getStatusLabel } from "@/lib/utils";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboardPage() {
  let totalApps = 0;
  let pendingApps = 0;
  let completedApps = 0;
  let totalUsers = 0;
  let billedAmount = 0;
  let paidAmount = 0;
  let recentApps: Array<{
    id: string;
    applicationNumber: string;
    serviceName: string;
    status: string;
    createdAt: Date;
    user: { name: string };
  }> = [];

  try {
    [totalApps, pendingApps, completedApps, totalUsers] = await Promise.all([
      prisma.application.count(),
      prisma.application.count({ where: { status: { in: ["SUBMITTED", "UNDER_REVIEW"] } } }),
      prisma.application.count({ where: { status: "COMPLETED" } }),
      prisma.user.count({ where: { isActive: true } }),
    ]);

    const [invoiceResult, paymentResult, apps] = await Promise.all([
      prisma.invoice.aggregate({ _sum: { totalAmount: true } }),
      prisma.payment.aggregate({ where: { status: "PAID" }, _sum: { amount: true } }),
      prisma.application.findMany({
        include: {
          service: { select: { name: true } },
          user: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    billedAmount = invoiceResult._sum.totalAmount ? Number(invoiceResult._sum.totalAmount) : 0;
    paidAmount = paymentResult._sum.amount ? Number(paymentResult._sum.amount) : 0;
    recentApps = apps;
  } catch (error) {
    console.error("Admin dashboard query error:", error);
  }

  const stats = [
    {
      title: "Total Permohonan",
      value: totalApps.toString(),
      icon: FileText,
      description: "Semua permohonan",
      color: "text-primary-700",
      bg: "bg-primary-50",
    },
    {
      title: "Menunggu Verifikasi",
      value: pendingApps.toString(),
      icon: Clock,
      description: "Perlu ditindaklanjuti",
      color: "text-amber-600",
      bg: "bg-amber-50",
      highlight: true,
    },
    {
      title: "Selesai",
      value: completedApps.toString(),
      icon: CheckCircle2,
      description: "Total selesai",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Total Pengguna",
      value: totalUsers.toString(),
      icon: Users,
      description: "Terdaftar",
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      title: "Total Tagihan",
      value: formatCurrency(billedAmount),
      icon: DollarSign,
      description: "Nilai tagihan",
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      title: "Pembayaran Terverifikasi",
      value: formatCurrency(paidAmount),
      icon: CreditCard,
      description: "Sudah dikonfirmasi",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard Admin</h1>
        <p className="text-muted-foreground mt-1">
          Ringkasan data dan aktivitas Sistem Informasi PNBP
        </p>
      </div>

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

      <div className="grid lg:grid-cols-2 gap-6">
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

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Permohonan Terbaru</CardTitle>
          </CardHeader>
          <CardContent>
            {recentApps.length === 0 ? (
              <EmptyState
                icon={<AlertCircle className="h-8 w-8" />}
                title="Belum ada aktivitas"
                description="Aktivitas terbaru akan muncul di sini."
              />
            ) : (
              <div className="space-y-3">
                {recentApps.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-border"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {app.serviceName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {app.applicationNumber} &middot; {app.user.name}
                      </p>
                    </div>
                    <span className="text-xs font-medium text-muted-foreground">
                      {getStatusLabel(app.status)}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
