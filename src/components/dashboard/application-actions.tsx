"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send, XCircle, RotateCcw, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const actionLabels: Record<string, { label: string; icon: typeof Send; variant: "default" | "destructive" | "outline" }> = {
  SUBMITTED: { label: "Kirim Permohonan", icon: Send, variant: "default" },
  CANCELLED: { label: "Batalkan", icon: XCircle, variant: "destructive" },
  UNDER_REVIEW: { label: "Mulai Tinjau", icon: CheckCircle2, variant: "default" },
  REVISION_REQUIRED: { label: "Minta Revisi", icon: RotateCcw, variant: "outline" },
  APPROVED: { label: "Setujui", icon: CheckCircle2, variant: "default" },
  REJECTED: { label: "Tolak", icon: XCircle, variant: "destructive" },
  COMPLETED: { label: "Selesaikan", icon: CheckCircle2, variant: "default" },
};

interface ApplicationActionsProps {
  applicationId: string;
  currentStatus: string;
  validTransitions: string[];
  userRole: string;
}

export function ApplicationActions({
  applicationId,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  currentStatus,
  validTransitions,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  userRole,
}: ApplicationActionsProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  if (validTransitions.length === 0) return null;

  const handleAction = async (action: string) => {
    setSelectedAction(action);
    setNotes("");
    setRejectionReason("");
    setModalOpen(true);
  };

  const confirmAction = async () => {
    if (!selectedAction) return;

    setLoading(true);
    try {
      const body: Record<string, string> = { status: selectedAction };
      if (notes) body.notes = notes;
      if (selectedAction === "REJECTED" && rejectionReason) body.rejectionReason = rejectionReason;

      const res = await fetch(`/api/applications/${applicationId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Gagal memperbarui status");
        return;
      }

      toast.success(data.message || "Status berhasil diperbarui");
      setModalOpen(false);
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  const currentAction = selectedAction ? actionLabels[selectedAction] : null;
  const needsRejectionReason = selectedAction === "REJECTED";

  return (
    <>
      <div className="flex gap-2">
        {validTransitions.map((action) => {
          const config = actionLabels[action];
          if (!config) return null;
          const Icon = config.icon;
          return (
            <Button
              key={action}
              variant={config.variant}
              size="sm"
              onClick={() => handleAction(action)}
            >
              <Icon className="h-4 w-4 mr-1.5" />
              {config.label}
            </Button>
          );
        })}
      </div>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-foreground">
            {currentAction?.label || "Konfirmasi"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {selectedAction === "SUBMITTED" && "Permohonan akan dikirim untuk ditinjau oleh petugas."}
            {selectedAction === "CANCELLED" && "Permohonan akan dibatalkan. Tindakan ini tidak dapat dibatalkan."}
            {selectedAction === "UNDER_REVIEW" && "Permohonan akan mulai ditinjau."}
            {selectedAction === "REVISION_REQUIRED" && "Pemohon akan diminta memperbaiki permohonan."}
            {selectedAction === "APPROVED" && "Permohonan akan disetujui."}
            {selectedAction === "REJECTED" && "Permohonan akan ditolak. Alasan penolakan wajib diisi."}
            {selectedAction === "COMPLETED" && "Layanan akan ditandai selesai."}
          </p>

          {needsRejectionReason && (
            <div>
              <label className="text-sm font-medium text-foreground">Alasan Penolakan *</label>
              <Textarea
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
                placeholder="Jelaskan alasan penolakan..."
                className="mt-1"
                rows={3}
              />
            </div>
          )}

          <div>
            <label className="text-sm font-medium text-foreground">Catatan (opsional)</label>
            <Textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Tambahkan catatan..."
              className="mt-1"
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" onClick={() => setModalOpen(false)} disabled={loading}>
              Batal
            </Button>
            <Button
              variant={currentAction?.variant || "default"}
              onClick={confirmAction}
              disabled={loading || (needsRejectionReason && !rejectionReason)}
            >
              {loading ? "Memproses..." : "Konfirmasi"}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
