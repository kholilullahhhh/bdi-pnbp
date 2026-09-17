export const dynamic = "force-dynamic";

import { CreditCard, Clock, CheckCircle2, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatCurrency, getStatusLabel, getStatusVariant } from "@/lib/utils";

export default async function PembayaranPage() {
  const session = await auth();
  const userId = (session?.user as unknown as { id: string })?.id;
  if (!userId) return null;

  const [payments, summary] = await Promise.all([
    prisma.payment.findMany({
      where: { invoice: { application: { userId } } },
      include: {
        invoice: { include: { application: { select: { serviceName: true } } } },
      },
      orderBy: { createdAt: "desc" },
    }),
    prisma.payment.aggregate({
      where: { status: "PAID", invoice: { application: { userId } } },
      _sum: { amount: true },
    }),
  ]);

  const pendingCount = payments.filter((p) => p.status === "PENDING").length;
  const paidCount = payments.filter((p) => p.status === "PAID").length;
  const totalPaid = summary._sum.amount ? Number(summary._sum.amount) : 0;

  const stats = [
    { label: "Menunggu Pembayaran", value: pendingCount, icon: Clock, gradient: "from-amber-500 to-orange-500", shadow: "shadow-amber-500/20" },
    { label: "Lunas", value: paidCount, icon: CheckCircle2, gradient: "from-emerald-500 to-green-500", shadow: "shadow-emerald-500/20" },
    { label: "Total Dibayar", value: formatCurrency(totalPaid), icon: CreditCard, gradient: "from-violet-500 to-purple-500", shadow: "shadow-violet-500/20" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pembayaran</h1>
        <p className="text-muted-foreground mt-1">Riwayat dan status pembayaran Anda</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => (
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

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {payments.length === 0 ? (
          <EmptyState icon={<CreditCard className="h-8 w-8" />} title="Belum ada pembayaran"
            description="Riwayat pembayaran akan muncul di sini setelah Anda melakukan pembayaran." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface/80">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Referensi</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Layanan</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Jumlah</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b border-border/60 last:border-0 hover:bg-primary-50/30 transition-colors group">
                    <td className="py-3.5 px-4 font-mono text-xs text-foreground">{p.paymentNumber}</td>
                    <td className="py-3.5 px-4 font-medium text-foreground group-hover:text-primary-800 transition-colors">{p.invoice.application.serviceName}</td>
                    <td className="py-3.5 px-4 font-medium font-mono text-xs">{formatCurrency(Number(p.amount))}</td>
                    <td className="py-3.5 px-4"><Badge variant={getStatusVariant(p.status)}>{getStatusLabel(p.status)}</Badge></td>
                    <td className="py-3.5 px-4 text-right">
                      <Button variant="ghost" size="icon" aria-label="Unduh bukti" className="text-muted-foreground hover:text-primary-700">
                        <CreditCard className="h-4 w-4" />
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
