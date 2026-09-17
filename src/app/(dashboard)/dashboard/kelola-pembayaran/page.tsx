export const dynamic = "force-dynamic";

import { CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { getPayments, getStatusLabel, getStatusVariant, formatCurrency, formatDateShort } from "@/lib/db-queries";
import { PaymentVerifyActions } from "@/components/admin/payment-verify-actions";

export default async function KelolaPembayaranPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let payments: any[] = [];
  try {
    payments = await getPayments();
  } catch (error) {
    console.error("Kelola pembayaran page DB error:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Manajemen Pembayaran</h1>
        <p className="text-muted-foreground mt-1">Kelola dan verifikasi pembayaran</p>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {payments.length === 0 ? (
          <EmptyState icon={<CreditCard className="h-8 w-8" />} title="Belum ada pembayaran" description="Data pembayaran akan muncul di sini." />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface/80">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Referensi</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Pemohon</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Layanan</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Jumlah</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Tanggal</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b border-border/60 last:border-0 hover:bg-primary-50/30 transition-colors group">
                    <td className="py-3.5 px-4 font-mono text-xs text-foreground">{p.paymentNumber}</td>
                    <td className="py-3.5 px-4 font-medium text-foreground group-hover:text-primary-800 transition-colors">{p.invoice.application.user?.name || "-"}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{p.invoice.application.serviceName}</td>
                    <td className="py-3.5 px-4 font-medium font-mono text-xs">{formatCurrency(Number(p.amount))}</td>
                    <td className="py-3.5 px-4"><Badge variant={getStatusVariant(p.status)}>{getStatusLabel(p.status)}</Badge></td>
                    <td className="py-3.5 px-4 text-muted-foreground">{formatDateShort(p.createdAt)}</td>
                    <td className="py-3.5 px-4 text-right">
                      <PaymentVerifyActions paymentId={p.id} currentStatus={p.status} />
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
