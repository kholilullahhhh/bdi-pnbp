"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  FileText,
  CheckCircle2,
  Clock,
  Info,
  Send,
  User,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

interface AjukanFormClientProps {
  serviceId: string;
  serviceName: string;
  serviceDescription: string;
  serviceRequirements: string | null;
  serviceProcedure: string | null;
  tariffName: string | null;
  tariffPrice: number | null;
  tariffUnit: string | null;
  estimationTime: string | null;
  targetUser: string | null;
  userName: string;
  userEmail: string;
}

export function AjukanFormClient({
  serviceId,
  serviceName,
  serviceDescription,
  serviceRequirements,
  serviceProcedure,
  tariffName,
  tariffPrice,
  tariffUnit,
  estimationTime,
  targetUser,
  userName,
  userEmail,
}: AjukanFormClientProps) {
  const router = useRouter();
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId,
          notes: notes || undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.error || "Gagal membuat permohonan");
        return;
      }

      toast.success("Permohonan berhasil dibuat!", {
        description: `Nomor: ${data.data.applicationNumber}`,
      });

      router.push(`/dashboard/permohonan/${data.data.id}`);
    } catch {
      toast.error("Terjadi kesalahan saat mengirim permohonan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      {/* Applicant Info */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Data Pemohon
        </h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <div className="flex items-center gap-3 bg-surface rounded-lg p-3">
            <User className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Nama</p>
              <p className="text-sm font-medium text-foreground">{userName}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-surface rounded-lg p-3">
            <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Email</p>
              <p className="text-sm font-medium text-foreground">{userEmail}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Service Info */}
      <div>
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Detail Layanan
        </h2>
        <div className="bg-surface rounded-lg p-4 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Nama Layanan</p>
            <p className="text-sm font-bold text-foreground">{serviceName}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Deskripsi</p>
            <p className="text-sm text-foreground leading-relaxed">{serviceDescription}</p>
          </div>
          {targetUser && (
            <div>
              <p className="text-xs text-muted-foreground">Target Pengguna</p>
              <p className="text-sm text-foreground">{targetUser}</p>
            </div>
          )}
        </div>
      </div>

      {/* Tariff */}
      {tariffPrice !== null && (
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
            Informasi Tarif
          </h2>
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-1">
              <Info className="h-4 w-4 text-primary-700" />
              <span className="text-sm font-semibold text-primary-800">{tariffName}</span>
            </div>
            <p className="text-2xl font-bold text-primary-900">
              {formatCurrency(tariffPrice)}
              <span className="text-sm font-normal text-primary-600 ml-1">/ {tariffUnit}</span>
            </p>
          </div>
        </div>
      )}

      {/* Requirements */}
      {serviceRequirements && (
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Persyaratan yang Perlu Dipenuhi
          </h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="text-sm text-amber-900 leading-relaxed whitespace-pre-line">
              {serviceRequirements}
            </div>
          </div>
        </div>
      )}

      {/* Procedure */}
      {serviceProcedure && (
        <div>
          <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Prosedur
          </h2>
          <div className="bg-surface rounded-lg p-4">
            <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
              {serviceProcedure}
            </div>
          </div>
        </div>
      )}

      {/* Estimation */}
      {estimationTime && (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="h-4 w-4" />
          Estimasi waktu penyelesaian: <span className="font-medium text-foreground">{estimationTime}</span>
        </div>
      )}

      {/* Notes */}
      <div>
        <Label htmlFor="notes" className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
          Catatan / Keterangan Tambahan
        </Label>
        <Textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Sertakan informasi tambahan yang relevan dengan pengajuan Anda (opsional)..."
          className="mt-2"
          rows={4}
        />
      </div>

      {/* Agreement */}
      <div className="flex items-start gap-3 bg-surface rounded-lg p-4">
        <input
          type="checkbox"
          id="agree"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-border text-primary focus:ring-primary"
        />
        <label htmlFor="agree" className="text-sm text-muted-foreground leading-relaxed">
          Saya menyatakan bahwa data yang saya isi adalah benar dan saya menyetujui syarat & ketentuan yang berlaku.
          Permohonan ini akan masuk dalam status <strong className="text-foreground">Draft</strong> dan perlu dikirim ulang setelah dilengkapi.
        </label>
      </div>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          type="submit"
          size="lg"
          className="flex-1"
          loading={loading}
          disabled={!agreed}
        >
          <Send className="mr-2 h-4 w-4" />
          Kirim Permohonan
        </Button>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Setelah dikirim, permohonan akan diverifikasi oleh petugas kami.
      </p>
    </form>
  );
}
