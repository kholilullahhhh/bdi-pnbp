import Link from "next/link";
import {
  FileText,
  CreditCard,
  Clock,
  CheckCircle2,
  ArrowRight,
  Plus,
  BookOpen,
  ChevronRight,
  Sparkles,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency, getStatusLabel, getStatusVariant } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();
  const userId = (session?.user as unknown as { id: string })?.id;
  const userName = (session?.user as unknown as { name: string })?.name || "Pengguna";

  if (!userId) {
    return null;
  }

  let totalApps = 0;
  let pendingApps = 0;
  let completedApps = 0;
  let paidAmount = 0;
  let recentApps: Array<{
    id: string;
    applicationNumber: string;
    serviceName: string;
    status: string;
    createdAt: Date;
  }> = [];

  try {
    [totalApps, pendingApps, completedApps] = await Promise.all([
      prisma.application.count({ where: { userId } }),
      prisma.application.count({ where: { userId, status: { in: ["SUBMITTED", "UNDER_REVIEW"] } } }),
      prisma.application.count({ where: { userId, status: "COMPLETED" } }),
    ]);

    const [paymentResult, apps] = await Promise.all([
      prisma.payment.aggregate({
        where: {
          status: "PAID",
          invoice: { application: { userId } },
        },
        _sum: { amount: true },
      }),
      prisma.application.findMany({
        where: { userId },
        include: {
          service: { select: { name: true } },
        },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

    paidAmount = paymentResult._sum.amount ? Number(paymentResult._sum.amount) : 0;
    recentApps = apps;
  } catch (error) {
    console.error("Dashboard query error:", error);
  }

  const quickActions = [
    {
      title: "Ajukan Permohonan",
      desc: "Lihat katalog layanan dan ajukan baru",
      href: "/layanan",
      icon: FileText,
      color: "from-blue-500 to-blue-600",
      shadow: "shadow-blue-500/25",
    },
    {
      title: "Panduan Sistem",
      desc: "Pelajari cara menggunakan sistem PNBP",
      href: "/panduan",
      icon: BookOpen,
      color: "from-violet-500 to-violet-600",
      shadow: "shadow-violet-500/25",
    },
    {
      title: "Cek Pembayaran",
      desc: "Lihat status dan riwayat pembayaran",
      href: "/dashboard/pembayaran",
      icon: CreditCard,
      color: "from-emerald-500 to-emerald-600",
      shadow: "shadow-emerald-500/25",
    },
  ];

  const stats = [
    {
      title: "Total Permohonan",
      value: totalApps,
      icon: FileText,
      gradient: "from-blue-500 to-blue-600",
      shadow: "shadow-blue-500/20",
      trend: null,
    },
    {
      title: "Menunggu Verifikasi",
      value: pendingApps,
      icon: Clock,
      gradient: "from-amber-500 to-orange-500",
      shadow: "shadow-amber-500/20",
      trend: pendingApps > 0 ? "Perlu ditindaklanjuti" : null,
    },
    {
      title: "Selesai",
      value: completedApps,
      icon: CheckCircle2,
      gradient: "from-emerald-500 to-green-500",
      shadow: "shadow-emerald-500/20",
      trend: null,
    },
    {
      title: "Total Pembayaran",
      value: formatCurrency(paidAmount),
      icon: CreditCard,
      gradient: "from-violet-500 to-purple-500",
      shadow: "shadow-violet-500/20",
      trend: null,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl gradient-welcome p-8 text-white shadow-xl shadow-primary-900/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-10" />
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/5 rounded-full blur-2xl" />
        <div className="relative">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="h-5 w-5 text-blue-200" />
            <span className="text-sm font-medium text-blue-200">Dashboard PNBP</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">
            Selamat datang, {userName.split(" ")[0]}!
          </h1>
          <p className="text-blue-100 text-sm sm:text-base max-w-lg">
            Kelola permohonan layanan PNBP Balai Diklat Industri Makassar dalam satu tempat.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/layanan">
              <Button className="bg-white text-primary-800 hover:bg-blue-50 shadow-lg border-0 font-semibold">
                <Plus className="mr-1.5 h-4 w-4" />
                Ajukan Permohonan
              </Button>
            </Link>
            <Link href="/dashboard/permohonan">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 bg-white/5">
                Lihat Permohonan
                <ArrowUpRight className="ml-1.5 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div
            key={stat.title}
            className="group relative bg-white rounded-xl border border-border p-5 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-0.5"
            style={{ animationDelay: `${i * 75}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {stat.title}
                </p>
                <p className="text-2xl font-bold text-foreground tracking-tight">
                  {stat.value}
                </p>
                {stat.trend && (
                  <p className="text-xs text-amber-600 font-medium flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    {stat.trend}
                  </p>
                )}
              </div>
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center shadow-lg ${stat.shadow} group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-5 w-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Applications */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-border overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <div>
              <h2 className="text-base font-bold text-foreground">Permohonan Terbaru</h2>
              <p className="text-xs text-muted-foreground mt-0.5">5 permohonan terakhir</p>
            </div>
            <Link href="/dashboard/permohonan">
              <Button variant="ghost" size="sm" className="text-primary-700 hover:text-primary-800 hover:bg-primary-50">
                Lihat Semua
                <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="p-6">
            {recentApps.length === 0 ? (
              <EmptyState
                icon={<FileText className="h-8 w-8" />}
                title="Belum ada permohonan"
                description="Mulai dengan melihat layanan yang tersedia dan ajukan permohonan pertama Anda."
                action={
                  <Link href="/layanan">
                    <Button size="sm">
                      <Plus className="mr-1.5 h-3.5 w-3.5" />
                      Ajukan Permohonan
                    </Button>
                  </Link>
                }
              />
            ) : (
              <div className="space-y-2">
                {recentApps.map((app, i) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-border/60 hover:border-primary-200 hover:bg-primary-50/30 transition-all duration-200 group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-lg bg-surface flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                        <FileText className="h-4.5 w-4.5 text-muted-foreground group-hover:text-primary-700 transition-colors" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-foreground truncate group-hover:text-primary-800 transition-colors">
                          {app.serviceName}
                        </p>
                        <p className="text-xs text-muted-foreground font-mono">
                          {app.applicationNumber}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge variant={getStatusVariant(app.status)}>
                        {getStatusLabel(app.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl border border-border overflow-hidden">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="text-base font-bold text-foreground">Akses Cepat</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Menu populer</p>
          </div>
          <div className="p-4 space-y-2">
            {quickActions.map((a) => (
              <Link key={a.title} href={a.href}>
                <div className="flex items-center gap-3.5 p-3.5 rounded-xl border border-border/60 hover:border-primary-200 hover:bg-primary-50/30 transition-all duration-200 group cursor-pointer">
                  <div className={`w-10 h-10 bg-gradient-to-br ${a.color} rounded-xl flex items-center justify-center shadow-lg ${a.shadow} group-hover:scale-110 transition-transform duration-300 flex-shrink-0`}>
                    <a.icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-foreground group-hover:text-primary-700 transition-colors">
                      {a.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {a.desc}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-200 translate-x-1 group-hover:translate-x-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
