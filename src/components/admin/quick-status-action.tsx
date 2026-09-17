"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  CheckCircle2,
  XCircle,
  RotateCcw,
  ClipboardCheck,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const actionConfig: Record<string, {
  label: string;
  shortLabel: string;
  icon: typeof CheckCircle2;
  variant: "default" | "destructive" | "outline";
  description: string;
  needsRejectionReason?: boolean;
}> = {
  UNDER_REVIEW: {
    label: "Mulai Tinjau",
    shortLabel: "Tinjau",
    icon: ClipboardCheck,
    variant: "default",
    description: "Permohonan akan mulai ditinjau oleh tim.",
  },
  APPROVED: {
    label: "Setujui",
    shortLabel: "Setujui",
    icon: CheckCircle2,
    variant: "default",
    description: "Permohonan akan disetujui. Invoice akan dikirim ke pemohon.",
  },
  REJECTED: {
    label: "Tolak",
    shortLabel: "Tolak",
    icon: XCircle,
    variant: "destructive",
    description: "Permohonan akan ditolak. Alasan penolakan wajib diisi.",
    needsRejectionReason: true,
  },
  REVISION_REQUIRED: {
    label: "Minta Revisi",
    shortLabel: "Revisi",
    icon: RotateCcw,
    variant: "outline",
    description: "Pemohon akan diminta memperbaiki permohonan.",
  },
  COMPLETED: {
    label: "Selesaikan",
    shortLabel: "Selesai",
    icon: CheckCircle2,
    variant: "default",
    description: "Layanan akan ditandai selesai.",
  },
  SUBMITTED: {
    label: "Kirim",
    shortLabel: "Kirim",
    icon: Send,
    variant: "default",
    description: "Permohonan akan dikirim untuk ditinjau.",
  },
};

interface QuickStatusActionProps {
  applicationId: string;
  currentStatus: string;
  validTransitions: string[];
}

export function QuickStatusAction({
  applicationId,
  validTransitions,
}: QuickStatusActionProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");

  if (validTransitions.length === 0) {
    return (
      <Link href={`/dashboard/kelola-permohonan/${applicationId}`}>
        <Button variant="ghost" size="icon" aria-label="Lihat detail" className="text-muted-foreground hover:text-primary-700">
          <Eye className="h-4 w-4" />
        </Button>
      </Link>
    );
  }

  const handleAction = (action: string) => {
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

  const currentAction = selectedAction ? actionConfig[selectedAction] : null;

  return (
    <>
      <div className="flex items-center gap-1">
        {validTransitions.map((action) => {
          const config = actionConfig[action];
          if (!config) return null;
          const Icon = config.icon;
          return (
            <Button
              key={action}
              variant={config.variant}
              size="sm"
              onClick={() => handleAction(action)}
              className="h-7 text-xs gap-1"
              title={config.label}
            >
              <Icon className="h-3 w-3" />
              <span className="hidden lg:inline">{config.shortLabel}</span>
            </Button>
          );
        })}
        <div className="w-px h-5 bg-border mx-1" />
        <Link href={`/dashboard/kelola-permohonan/${applicationId}`}>
          <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary-700" aria-label="Lihat detail">
            <Eye className="h-3.5 w-3.5" />
          </Button>
        </Link>
      </div>

      <Dialog open={modalOpen} onClose={() => setModalOpen(false)}>
        <div className="p-6 space-y-4">
          <h3 className="text-lg font-bold text-foreground">
            {currentAction?.label || "Konfirmasi"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {currentAction?.description}
          </p>

          {currentAction?.needsRejectionReason && (
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
              disabled={loading || (currentAction?.needsRejectionReason && !rejectionReason)}
            >
              {loading ? "Memproses..." : "Konfirmasi"}
            </Button>
          </div>
        </div>
      </Dialog>
    </>
  );
}
