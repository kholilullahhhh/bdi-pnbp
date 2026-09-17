"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { RotateCcw, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface RevisionPanelProps {
  applicationId: string;
  currentNotes: string | null;
}

export function RevisionPanel({ applicationId, currentNotes }: RevisionPanelProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(currentNotes || "");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Update notes first
      if (notes !== currentNotes) {
        const updateRes = await fetch(`/api/applications/${applicationId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ notes }),
        });
        if (!updateRes.ok) {
          const data = await updateRes.json();
          toast.error(data.error || "Gagal menyimpan catatan");
          return;
        }
      }

      // Submit the revision
      const submitRes = await fetch(`/api/applications/${applicationId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "SUBMITTED", notes: "Revisi dikirim ulang" }),
      });

      const data = await submitRes.json();
      if (!submitRes.ok) {
        toast.error(data.error || "Gagal mengirim revisi");
        return;
      }

      toast.success("Revisi berhasil dikirim ulang");
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-orange-50 rounded-xl border border-orange-200 overflow-hidden">
      <div className="px-6 py-4 border-b border-orange-200">
        <h3 className="text-base font-bold text-orange-800 flex items-center gap-2">
          <RotateCcw className="h-5 w-5" /> Perlu Revisi
        </h3>
      </div>
      <div className="p-6 space-y-4">
        <p className="text-sm text-orange-700">
          Permohonan Anda membutuhkan revisi. Silakan perbaiki data di bawah ini dan kirim ulang.
        </p>
        <div>
          <label className="text-sm font-medium text-foreground">Catatan Permohonan</label>
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Perbarui catatan permohonan..."
            className="mt-1"
            rows={4}
          />
        </div>
        <Button onClick={handleSubmit} disabled={loading}>
          {loading ? (
            "Mengirim..."
          ) : (
            <>
              <Save className="h-4 w-4 mr-1.5" />
              Kirim Ulang
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
