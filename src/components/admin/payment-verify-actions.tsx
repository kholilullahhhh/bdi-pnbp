"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface PaymentVerifyActionsProps {
  paymentId: string;
  currentStatus: string;
}

export function PaymentVerifyActions({ paymentId, currentStatus }: PaymentVerifyActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [action, setAction] = useState<"PAID" | "FAILED" | null>(null);
  const [notes, setNotes] = useState("");

  if (currentStatus !== "PENDING") return null;

  const handleVerify = (verifyAction: "PAID" | "FAILED") => {
    setAction(verifyAction);
    setNotes("");
    setModalOpen(true);
  };

  const confirmAction = async () => {
    if (!action) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/payments/${paymentId}/verify`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: action, notes }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Gagal memverifikasi");
        return;
      }
      toast.success(data.message || "Berhasil diverifikasi");
      setModalOpen(false);
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleVerify("PAID")}
          className="h-8 w-8 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
          title="Verifikasi"
        >
          <CheckCircle2 className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handleVerify("FAILED")}
          className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
          title="Tolak"
        >
          <XCircle className="h-4 w-4" />
        </Button>
      </div>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-foreground">
            {action === "PAID" ? "Verifikasi Pembayaran" : "Tolak Pembayaran"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {action === "PAID"
              ? "Pembayaran akan ditandai sebagai lunas. Invoice akan diperbarui."
              : "Pembayaran akan ditolak. Pemohon akan diberitahu."}
          </p>
          <div>
            <label className="text-sm font-medium text-foreground">Catatan</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder={action === "PAID" ? "Pembayaran terverifikasi" : "Alasan penolakan..."}
              className="mt-1"
              rows={3}
            />
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={loading}>
              Batal
            </Button>
            <Button
              variant={action === "PAID" ? "default" : "destructive"}
              onClick={confirmAction}
              disabled={loading}
            >
              {loading ? "Memproses..." : "Konfirmasi"}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
