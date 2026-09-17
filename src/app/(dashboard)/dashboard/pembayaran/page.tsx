export const dynamic = "force-dynamic";

import { CreditCard, Clock, CheckCircle2, FileText, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatCurrency, getStatusLabel, getStatusVariant, formatDateShort } from "@/lib/utils";
import { PaymentFormClient } from "@/components/dashboard/payment-form-client";

export default async function PembayaranPage() {
  const session = await auth();
  const userId = (session?.user as unknown as { id: string })?.id;
  if (!userId) return null;

  let invoices: unknown[] = [];
  let payments: unknown[] = [];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let summary: any = { _sum: { amount: null } };

  try {
    [invoices, payments, summary] = await Promise.all([
      prisma.invoice.findMany({
        where: {
          application: { userId },
          status: { in: ["PENDING", "AWAITING_PAYMENT"] },
        },
        include: {
          application: { select: { id: true, applicationNumber: true, serviceName: true, status: true } },
          items: true,
          payments: { select: { id: true, status: true, amount: true } },
        },
        orderBy: { createdAt: "desc" },
      }),
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
  } catch (error) {
    console.error("Pembayaran page DB error:", error);
  }

  const typedInvoices = invoices as {
    id: string;
    invoiceNumber: string;
    totalAmount: { toNumber(): number };
    paidAmount: { toNumber(): number };
    status: string;
    dueDate: Date | null;
    application: { id: string; applicationNumber: string; serviceName: string; status: string };
    items: { description: string; totalPrice: { toNumber(): number } }[];
    payments: { id: string; status: string; amount: { toNumber(): number } }[];
  }[];

  const typedPayments = payments as {
    id: string;
    paymentNumber: string;
    amount: { toNumber(): number };
    status: string;
    createdAt: Date;
    invoice: { application: { serviceName: string } };
  }[];

  const pendingCount = typedInvoices.length;
  const paidCount = typedPayments.filter((p) => p.status === "PAID").length;
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

      {/* Pending Invoices - Pay Now */}
      {typedInvoices.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-amber-500" />
            <h2 className="text-lg font-bold text-foreground">Tagihan Belum Dibayar</h2>
          </div>
          <div className="space-y-3">
            {typedInvoices.map((inv) => {
              const total = inv.totalAmount.toNumber();
              const paid = inv.paidAmount.toNumber();
              const remaining = total - paid;
              return (
                <div key={inv.id} className="bg-white rounded-xl border border-amber-200 overflow-hidden hover:shadow-card-hover transition-all">
                  <div className="p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="h-5 w-5 text-amber-500 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-bold text-foreground">{inv.application.serviceName}</p>
                            <p className="text-xs text-muted-foreground">{inv.application.applicationNumber}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                          <div>
                            <p className="text-xs text-muted-foreground">Invoice</p>
                            <p className="text-sm font-mono font-medium">{inv.invoiceNumber}</p>
                          </div>
                          <div>
                            <p className="text-xs text-muted-foreground">Total</p>
                            <p className="text-sm font-bold">{formatCurrency(total)}</p>
                          </div>
                          {paid > 0 && (
                            <div>
                              <p className="text-xs text-muted-foreground">Dibayar</p>
                              <p className="text-sm font-medium text-emerald-600">{formatCurrency(paid)}</p>
                            </div>
                          )}
                          <div>
                            <p className="text-xs text-muted-foreground">Sisa</p>
                            <p className="text-sm font-bold text-amber-600">{formatCurrency(remaining)}</p>
                          </div>
                        </div>
                        {inv.dueDate && (
                          <p className="text-xs text-muted-foreground mt-2">
                            Batas waktu: {new Date(inv.dueDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                          </p>
                        )}
                        {inv.payments.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-1">
                            {inv.payments.map((p) => (
                              <Badge key={p.id} variant={getStatusVariant(p.status)} className="text-[10px]">
                                {getStatusLabel(p.status)} {formatCurrency(p.amount.toNumber())}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        <PaymentFormClient
                          invoice={{
                            id: inv.id,
                            invoiceNumber: inv.invoiceNumber,
                            totalAmount: total,
                            paidAmount: paid,
                            dueDate: inv.dueDate?.toISOString() || null,
                            applicationNumber: inv.application.applicationNumber,
                            serviceName: inv.application.serviceName,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Payment History */}
      <div className="bg-white rounded-xl border border-border overflow-hidden">
        <div className="px-6 py-4 border-b border-border">
          <h3 className="text-base font-bold text-foreground">Riwayat Pembayaran</h3>
        </div>
        {typedPayments.length === 0 ? (
          <div className="p-12 text-center">
            <CreditCard className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">Belum ada riwayat pembayaran</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface/80">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Referensi</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Layanan</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Jumlah</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Tanggal</th>
                </tr>
              </thead>
              <tbody>
                {typedPayments.map((p) => (
                  <tr key={p.id} className="border-b border-border/60 last:border-0 hover:bg-primary-50/30 transition-colors group">
                    <td className="py-3.5 px-4 font-mono text-xs text-foreground">{p.paymentNumber}</td>
                    <td className="py-3.5 px-4 font-medium text-foreground group-hover:text-primary-800 transition-colors">{p.invoice.application.serviceName}</td>
                    <td className="py-3.5 px-4 font-medium font-mono text-xs">{formatCurrency(p.amount.toNumber())}</td>
                    <td className="py-3.5 px-4"><Badge variant={getStatusVariant(p.status)}>{getStatusLabel(p.status)}</Badge></td>
                    <td className="py-3.5 px-4 text-muted-foreground">{formatDateShort(p.createdAt)}</td>
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
