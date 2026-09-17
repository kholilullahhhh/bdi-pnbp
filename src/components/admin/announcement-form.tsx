"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Dialog, DialogHeader, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface AnnouncementFormProps {
  open: boolean;
  onClose: () => void;
  mode: "create" | "edit";
  initialData?: {
    id: string;
    title: string;
    content: string;
    isPublished: boolean;
  };
}

export function AnnouncementForm({ open, onClose, mode, initialData }: AnnouncementFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: initialData?.title || "",
    content: initialData?.content || "",
    isPublished: initialData?.isPublished ?? false,
  });

  const set = (k: string, v: string | boolean) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = mode === "edit" ? `/api/announcements/${initialData?.id}` : "/api/announcements";
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
    <Dialog open={open} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <DialogHeader
          title={mode === "create" ? "Tambah Pengumuman" : "Edit Pengumuman"}
          description="Isi data pengumuman"
        />
        <DialogContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Judul *</Label>
            <Input id="title" value={form.title} onChange={(e) => set("title", e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="content">Konten *</Label>
            <Textarea id="content" value={form.content} onChange={(e) => set("content", e.target.value)} rows={4} required />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isPublished"
              checked={form.isPublished}
              onChange={(e) => set("isPublished", e.target.checked)}
              className="rounded border-border"
            />
            <Label htmlFor="isPublished" className="cursor-pointer">Terbitkan sekarang</Label>
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
