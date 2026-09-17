"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CreditCard, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { formatCurrency } from "@/lib/utils";

interface InvoiceInfo {
  id: string;
  invoiceNumber: string;
  totalAmount: number;
  paidAmount: number;
  dueDate: string | null;
  applicationNumber: string;
  serviceName: string;
}

interface PaymentFormClientProps {
  invoice: InvoiceInfo;
}

export function PaymentFormClient({ invoice }: PaymentFormClientProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(invoice.totalAmount - invoice.paidAmount);
  const [paymentMethod, setPaymentMethod] = useState("BANK_TRANSFER");
  const [bankName, setBankName] = useState("");
  const [paymentReference, setPaymentReference] = useState("");
  const [notes, setNotes] = useState("");

  const remaining = invoice.totalAmount - invoice.paidAmount;

  const handleSubmit = async () => {
    if (amount <= 0) {
      toast.error("Jumlah pembayaran harus lebih dari 0");
      return;
    }
    if (amount > remaining) {
      toast.error("Jumlah pembayaran melebihi sisa tagihan");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/payments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          invoiceId: invoice.id,
          amount,
          paymentMethod,
          bankName: bankName || undefined,
          paymentReference: paymentReference || undefined,
          notes: notes || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Gagal mencatat pembayaran");
        return;
      }

      toast.success("Pembayaran berhasil dicatat. Menunggu verifikasi oleh petugas.");
      setOpen(false);
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const methodLabels: Record<string, string> = {
    BANK_TRANSFER: "Transfer Bank",
    E_WALLET: "E-Wallet",
    QRIS: "QRIS",
    CASH: "Tunai",
    OTHER: "Lainnya",
  };

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)}>
        <CreditCard className="h-4 w-4 mr-1.5" />
        Bayar Sekarang
      </Button>

      <Dialog open={open} onClose={() => setOpen(false)}>
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-foreground">Konfirmasi Pembayaran</h3>

          <div className="bg-surface rounded-lg p-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Invoice</span>
              <span className="font-mono font-medium">{invoice.invoiceNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Layanan</span>
              <span className="font-medium">{invoice.serviceName}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Total Tagihan</span>
              <span className="font-bold">{formatCurrency(invoice.totalAmount)}</span>
            </div>
            {invoice.paidAmount > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Sudah Dibayar</span>
                <span className="font-medium text-emerald-600">{formatCurrency(invoice.paidAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-sm border-t border-border pt-2">
              <span className="text-muted-foreground font-semibold">Sisa Tagihan</span>
              <span className="font-bold text-primary-700">{formatCurrency(remaining)}</span>
            </div>
            {invoice.dueDate && (
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Batas Waktu</span>
                <span className="font-medium">{new Date(invoice.dueDate).toLocaleDateString("id-ID")}</span>
              </div>
            )}
          </div>

          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="amount">Jumlah Pembayaran *</Label>
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                min={0}
                max={remaining}
                step={1000}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="method">Metode Pembayaran *</Label>
              <select
                id="method"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full h-10 px-3 rounded-lg border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {Object.entries(methodLabels).map(([val, label]) => (
                  <option key={val} value={val}>{label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank">Nama Bank</Label>
              <Input
                id="bank"
                value={bankName}
                onChange={(e) => setBankName(e.target.value)}
                placeholder="Contoh: BRI, BCA, Mandiri"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ref">Nomor Referensi / Bukti Transfer</Label>
              <Input
                id="ref"
                value={paymentReference}
                onChange={(e) => setPaymentReference(e.target.value)}
                placeholder="Nomor resi atau referensi"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Catatan</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Catatan tambahan..."
                rows={2}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setOpen(false)} disabled={loading}>
              Batal
            </Button>
            <Button onClick={handleSubmit} disabled={loading}>
              {loading ? <Loader2 className="h-4 w-4 mr-1.5 animate-spin" /> : <CreditCard className="h-4 w-4 mr-1.5" />}
              {loading ? "Mengirim..." : "Kirim Pembayaran"}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
