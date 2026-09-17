"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogHeader, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface FAQFormProps {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: {
    id: string;
    question: string;
    answer: string;
    category?: string | null;
    sortOrder: number;
    isActive: boolean;
  };
}

export function FAQForm({ open, onClose, mode, initialData }: FAQFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    question: initialData?.question || "",
    answer: initialData?.answer || "",
    category: initialData?.category || "",
    sortOrder: initialData?.sortOrder?.toString() || "0",
    isActive: initialData?.isActive ?? true,
  });

  const set = (k: string, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = mode === "edit" ? `/api/faqs/${initialData?.id}` : "/api/faqs";
      const method = mode === "edit" ? "PUT" : "POST";

      const body = {
        ...form,
        sortOrder: parseInt(form.sortOrder) || 0,
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
          title={mode === "create" ? "Tambah FAQ" : "Edit FAQ"}
          description="Isi data pertanyaan yang sering diajukan"
        />
        <DialogContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="question">Pertanyaan *</Label>
            <Input id="question" value={form.question} onChange={(e) => set("question", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="answer">Jawaban *</Label>
            <Textarea id="answer" value={form.answer} onChange={(e) => set("answer", e.target.value)} rows={4} required />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="category">Kategori</Label>
              <Input id="category" value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="Contoh: Umum, Pendaftaran" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="sortOrder">Urutan</Label>
              <Input id="sortOrder" type="number" value={form.sortOrder} onChange={(e) => set("sortOrder", e.target.value)} min={0} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isActive"
              checked={form.isActive}
              onChange={(e) => set("isActive", e.target.checked)}
              className="rounded border-border"
            />
            <Label htmlFor="isActive" className="cursor-pointer">Aktif</Label>
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
