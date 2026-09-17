"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogHeader, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface TariffFormProps {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: {
    id: string;
    serviceId: string;
    name: string;
    price: number;
    unit: string;
    description?: string | null;
    legalBasis?: string | null;
    regulationNumber?: string | null;
    regulationYear?: number | null;
    effectiveStartDate: string | Date;
    effectiveEndDate?: string | Date | null;
  };
  services: { id: string; name: string }[];
}

export function TariffForm({ open, onClose, mode, initialData, services }: TariffFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    serviceId: initialData?.serviceId || "",
    name: initialData?.name || "",
    price: initialData?.price?.toString() || "",
    unit: initialData?.unit || "",
    description: initialData?.description || "",
    legalBasis: initialData?.legalBasis || "",
    regulationNumber: initialData?.regulationNumber || "",
    regulationYear: initialData?.regulationYear?.toString() || "",
    effectiveStartDate: initialData?.effectiveStartDate ? String(initialData.effectiveStartDate).split("T")[0] : "",
    effectiveEndDate: initialData?.effectiveEndDate ? String(initialData.effectiveEndDate).split("T")[0] : "",
  });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = mode === "edit" ? `/api/tariffs/${initialData?.id}` : "/api/tariffs";
      const method = mode === "edit" ? "PUT" : "POST";

      const body = {
        ...form,
        price: parseFloat(form.price) || 0,
        regulationYear: form.regulationYear ? parseInt(form.regulationYear) : undefined,
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Gagal menyimpan");
        return;
      }

      toast.success(data.message || "Berhasil disimpan");
      onClose();
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} className="max-w-2xl">
      <form onSubmit={handleSubmit}>
        <DialogHeader
          title={mode === "create" ? "Tambah Tarif" : "Edit Tarif"}
          description="Isi data tarif layanan"
        />
        <DialogContent className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="space-y-2">
            <Label htmlFor="serviceId">Layanan *</Label>
            <select
              id="serviceId"
              value={form.serviceId}
              onChange={(e) => set("serviceId", e.target.value)}
              className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
              required
            >
              <option value="">Pilih layanan</option>
              {services.map((s) => (
                <option key={s.id} value={s.id}>{s.name}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Nama Tarif *</Label>
            <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="price">Harga (Rp) *</Label>
              <Input
                id="price"
                type="number"
                value={form.price}
                onChange={(e) => set("price", e.target.value)}
                required
                min={0}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="unit">Satuan *</Label>
              <Input id="unit" value={form.unit} onChange={(e) => set("unit", e.target.value)} required placeholder="Contoh: Paket, Orang" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi</Label>
            <Textarea id="description" value={form.description} onChange={(e) => set("description", e.target.value)} rows={2} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="legalBasis">Dasar Hukum</Label>
              <Input id="legalBasis" value={form.legalBasis} onChange={(e) => set("legalBasis", e.target.value)} placeholder="Contoh: PP 54/2021" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="regulationNumber">Nomor Regulasi</Label>
              <Input id="regulationNumber" value={form.regulationNumber} onChange={(e) => set("regulationNumber", e.target.value)} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="effectiveStartDate">Berlaku Sejak *</Label>
              <Input id="effectiveStartDate" type="date" value={form.effectiveStartDate} onChange={(e) => set("effectiveStartDate", e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="effectiveEndDate">Berlaku Hingga</Label>
              <Input id="effectiveEndDate" type="date" value={form.effectiveEndDate} onChange={(e) => set("effectiveEndDate", e.target.value)} />
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>Batal</Button>
          <Button type="submit" loading={loading}>{mode === "create" ? "Buat" : "Simpan"}</Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
