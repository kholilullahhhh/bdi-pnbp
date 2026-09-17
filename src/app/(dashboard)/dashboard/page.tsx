import Link from "next/link";
import {
  FileText,
  CreditCard,
  Clock,
  CheckCircle2,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Plus,
  BookOpen,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency, getStatusLabel } from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export default async function DashboardPage() {
  const session = await auth();
  const userId = (session?.user as unknown as { id: string })?.id;

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

  const stats = [
    {
      title: "Total Permohonan",
      value: totalApps.toString(),
      icon: FileText,
      description: "Semua permohonan yang pernah diajukan",
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
      description: "Total permohonan selesai",
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Total Pembayaran",
      value: formatCurrency(paidAmount),
      icon: CreditCard,
      description: "Nilai pembayaran terverifikasi",
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
  ];

  const quickActions = [
    {
      title: "Lihat Layanan",
      desc: "Jelajahi katalog layanan PNBP",
      href: "/layanan",
      icon: FileText,
    },
    {
      title: "Panduan",
      desc: "Pelajari cara menggunakan sistem",
      href: "/panduan",
      icon: BookOpen,
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Selamat datang di Sistem Informasi PNBP BDI Makassar
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Permohonan Terbaru</CardTitle>
            <Link href="/dashboard/permohonan">
              <Button variant="ghost" size="sm">
                Lihat Semua
                <ArrowRight className="ml-1 h-3.5 w-3.5" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
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
              <div className="space-y-3">
                {recentApps.map((app) => (
                  <div
                    key={app.id}
                    className="flex items-center justify-between p-3 rounded-xl border border-border hover:border-primary-200 transition-colors"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">
                        {app.serviceName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {app.applicationNumber}
                      </p>
                    </div>
                    <Badge variant={app.status === "COMPLETED" ? "success" : app.status === "SUBMITTED" ? "info" : "secondary"}>
                      {getStatusLabel(app.status)}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Akses Cepat</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((a) => (
              <Link key={a.title} href={a.href}>
                <div className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary-200 hover:bg-primary-50/50 transition-all group cursor-pointer">
                  <div className="w-9 h-9 bg-surface rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                    <a.icon className="h-4 w-4 text-muted-foreground group-hover:text-primary-700 transition-colors" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-foreground group-hover:text-primary-700 transition-colors">
                      {a.title}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {a.desc}
                    </p>
                  </div>
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
