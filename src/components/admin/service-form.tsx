"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogHeader, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface ServiceFormProps {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    targetUser?: string;
    requirements?: string;
    procedure?: string;
    paymentInfo?: string;
    estimationTime?: string;
    categoryId: string;
    status: string;
  };
  categories: { id: string; name: string }[];
}

export function ServiceForm({ open, onClose, mode, initialData, categories }: ServiceFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: initialData?.name || "",
    slug: initialData?.slug || "",
    description: initialData?.description || "",
    targetUser: initialData?.targetUser || "",
    requirements: initialData?.requirements || "",
    procedure: initialData?.procedure || "",
    paymentInfo: initialData?.paymentInfo || "",
    estimationTime: initialData?.estimationTime || "",
    categoryId: initialData?.categoryId || "",
    status: initialData?.status || "ACTIVE",
  });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = mode === "edit" ? `/api/services/${initialData?.id}` : "/api/services";
      const method = mode === "edit" ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
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
          title={mode === "create" ? "Tambah Layanan" : "Edit Layanan"}
          description="Isi data layanan PNBP"
        />
        <DialogContent className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
          <div className="space-y-2">
            <Label htmlFor="name">Nama Layanan *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="categoryId">Kategori *</Label>
              <select
                id="categoryId"
                value={form.categoryId}
                onChange={(e) => set("categoryId", e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
                required
              >
                <option value="">Pilih kategori</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={form.status}
                onChange={(e) => set("status", e.target.value)}
                className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm"
              >
                <option value="ACTIVE">Aktif</option>
                <option value="INACTIVE">Nonaktif</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Deskripsi *</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              rows={3}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="targetUser">Target Pengguna</Label>
            <Input
              id="targetUser"
              value={form.targetUser}
              onChange={(e) => set("targetUser", e.target.value)}
              placeholder="Contoh: UMKM, Masyarakat"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="requirements">Persyaratan</Label>
            <Textarea
              id="requirements"
              value={form.requirements}
              onChange={(e) => set("requirements", e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="procedure">Prosedur</Label>
            <Textarea
              id="procedure"
              value={form.procedure}
              onChange={(e) => set("procedure", e.target.value)}
              rows={2}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="estimationTime">Estimasi Waktu</Label>
            <Input
              id="estimationTime"
              value={form.estimationTime}
              onChange={(e) => set("estimationTime", e.target.value)}
              placeholder="Contoh: 2-3 hari"
            />
          </div>
        </DialogContent>
        <DialogFooter>
          <Button type="button" variant="outline" onClick={onClose}>
            Batal
          </Button>
          <Button type="submit" loading={loading}>
            {mode === "create" ? "Buat" : "Simpan"}
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
