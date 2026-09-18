"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Layers, Plus, Pencil, Trash2, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";
import { Dialog, DialogHeader, DialogContent, DialogFooter } from "@/components/ui/dialog";
import { EmptyState } from "@/components/ui/empty-state";
import { DeleteConfirm } from "@/components/admin/delete-confirm";
import { formatCurrency } from "@/lib/utils";

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  targetUser?: string | null;
  requirements?: string | null;
  procedure?: string | null;
  estimationTime?: string | null;
  status: string;
  categoryId: string;
  imageUrl?: string | null;
  category: { name: string };
  tariffs: { price: { toString(): string } }[];
}

interface Category {
  id: string;
  name: string;
}

interface Props {
  services: Service[];
  categories: Category[];
}

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  targetUser: "",
  requirements: "",
  procedure: "",
  estimationTime: "",
  categoryId: "",
  status: "ACTIVE",
  imageUrl: "",
};

export function LayananDashboard({ services, categories }: Props) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<Service | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Service | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailData, setDetailData] = useState<Service | null>(null);

  const filtered = services.filter(
    (s) =>
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.name.toLowerCase().includes(search.toLowerCase())
  );

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const openCreate = () => {
    setEditData(null);
    setForm(emptyForm);
    setFormOpen(true);
  };

  const openEdit = (s: Service) => {
    setEditData(s);
    setForm({
      name: s.name,
      slug: s.slug,
      description: s.description,
      targetUser: s.targetUser ?? "",
      requirements: s.requirements ?? "",
      procedure: s.procedure ?? "",
      estimationTime: s.estimationTime ?? "",
      categoryId: s.categoryId,
      status: s.status,
      imageUrl: s.imageUrl ?? "",
    });
    setFormOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const url = editData ? `/api/services/${editData.id}` : "/api/services";
      const method = editData ? "PUT" : "POST";
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
      setFormOpen(false);
      setEditData(null);
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/services/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error || "Gagal menghapus");
        return;
      }
      toast.success("Layanan berhasil dihapus");
      setDeleteTarget(null);
      router.refresh();
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Manajemen Layanan</h1>
            <p className="text-muted-foreground mt-1">Kelola layanan PNBP BDI Makassar</p>
          </div>
          <Button onClick={openCreate}>
            <Plus className="mr-1.5 h-4 w-4" /> Tambah Layanan
          </Button>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-base">Daftar Layanan ({filtered.length})</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Cari layanan..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            {filtered.length === 0 ? (
              <EmptyState icon={<Layers className="h-8 w-8" />} title="Tidak ada layanan" description="Belum ada layanan yang terdaftar." />
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border bg-surface/80">
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Nama Layanan</th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Kategori</th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Tarif</th>
                      <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                      <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Aksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((s) => (
                      <tr key={s.id} className="border-b border-border/60 last:border-0 hover:bg-primary-50/30 transition-colors group">
                        <td className="py-3.5 px-4 font-medium text-foreground group-hover:text-primary-800 transition-colors">{s.name}</td>
                        <td className="py-3.5 px-4 text-muted-foreground">{s.category.name}</td>
                        <td className="py-3.5 px-4 font-mono text-xs text-muted-foreground">
                          {s.tariffs[0] ? formatCurrency(Number(s.tariffs[0].price)) : "-"}
                        </td>
                        <td className="py-3.5 px-4">
                          <Badge variant={s.status === "ACTIVE" ? "success" : "destructive"}>
                            {s.status === "ACTIVE" ? "Aktif" : "Nonaktif"}
                          </Badge>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button variant="ghost" size="icon" aria-label="Lihat" onClick={() => { setDetailData(s); setDetailOpen(true); }} className="text-muted-foreground hover:text-primary-700">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" aria-label="Edit" onClick={() => openEdit(s)} className="text-muted-foreground hover:text-amber-600">
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" aria-label="Hapus" onClick={() => setDeleteTarget(s)} className="text-muted-foreground hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Create / Edit Dialog */}
      <Dialog open={formOpen} onClose={() => { setFormOpen(false); setEditData(null); }} className="max-w-2xl">
        <form onSubmit={handleSubmit}>
          <DialogHeader
            title={editData ? "Edit Layanan" : "Tambah Layanan"}
            description="Isi data layanan PNBP"
          />
          <DialogContent className="space-y-4 max-h-[60vh] overflow-y-auto pr-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nama Layanan *</Label>
              <Input id="name" value={form.name} onChange={(e) => set("name", e.target.value)} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="categoryId">Kategori *</Label>
                <select id="categoryId" value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm" required>
                  <option value="">Pilih kategori</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select id="status" value={form.status} onChange={(e) => set("status", e.target.value)} className="w-full rounded-lg border border-border bg-white px-3 py-2 text-sm">
                  <option value="ACTIVE">Aktif</option>
                  <option value="INACTIVE">Nonaktif</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi *</Label>
              <Textarea id="description" value={form.description} onChange={(e) => set("description", e.target.value)} rows={3} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="imageUrl">URL Gambar</Label>
              <Input
                id="imageUrl"
                value={form.imageUrl}
                onChange={(e) => set("imageUrl", e.target.value)}
                placeholder="https://images.unsplash.com/..."
              />
              {form.imageUrl ? (
                <div className="mt-2">
                  <div className="relative w-full h-32 rounded-lg overflow-hidden border border-border bg-muted">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={form.imageUrl} alt="Pratinjau gambar layanan" className="w-full h-full object-cover" />
                  </div>
                </div>
              ) : (
                <p className="text-xs text-muted-foreground">Opsional. Tampil di daftar layanan dan halaman detail. Kosongkan untuk pakai gambar bawaan.</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="targetUser">Target Pengguna</Label>
              <Input id="targetUser" value={form.targetUser} onChange={(e) => set("targetUser", e.target.value)} placeholder="Contoh: UMKM, Masyarakat" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="requirements">Persyaratan</Label>
              <Textarea id="requirements" value={form.requirements} onChange={(e) => set("requirements", e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="procedure">Prosedur</Label>
              <Textarea id="procedure" value={form.procedure} onChange={(e) => set("procedure", e.target.value)} rows={2} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="estimationTime">Estimasi Waktu</Label>
              <Input id="estimationTime" value={form.estimationTime} onChange={(e) => set("estimationTime", e.target.value)} placeholder="Contoh: 2-3 hari" />
            </div>
          </DialogContent>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => { setFormOpen(false); setEditData(null); }}>Batal</Button>
            <Button type="submit" loading={saving}>{editData ? "Simpan" : "Buat"}</Button>
          </DialogFooter>
        </form>
      </Dialog>

      {/* Detail Dialog */}
      {detailOpen && detailData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setDetailOpen(false)}>
          <div className="bg-white rounded-2xl border border-border shadow-xl w-full max-w-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-foreground">{detailData.name}</h2>
                  <p className="text-sm text-muted-foreground mt-1">{detailData.category.name}</p>
                </div>
                <Badge variant={detailData.status === "ACTIVE" ? "success" : "destructive"}>
                  {detailData.status === "ACTIVE" ? "Aktif" : "Nonaktif"}
                </Badge>
              </div>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 font-semibold">Deskripsi</p>
                  <p className="text-foreground">{detailData.description}</p>
                </div>
                {detailData.targetUser && (
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 font-semibold">Target Pengguna</p>
                    <p className="text-foreground">{detailData.targetUser}</p>
                  </div>
                )}
                {detailData.requirements && (
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 font-semibold">Persyaratan</p>
                    <p className="text-foreground whitespace-pre-line">{detailData.requirements}</p>
                  </div>
                )}
                {detailData.procedure && (
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 font-semibold">Prosedur</p>
                    <p className="text-foreground whitespace-pre-line">{detailData.procedure}</p>
                  </div>
                )}
                {detailData.estimationTime && (
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 font-semibold">Estimasi Waktu</p>
                    <p className="text-foreground">{detailData.estimationTime}</p>
                  </div>
                )}
                {detailData.tariffs[0] && (
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 font-semibold">Tarif</p>
                    <p className="text-foreground font-mono">{formatCurrency(Number(detailData.tariffs[0].price))}</p>
                  </div>
                )}
              </div>
              <div className="flex justify-end pt-2 border-t border-border">
                <Button variant="outline" onClick={() => setDetailOpen(false)}>Tutup</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirm */}
      <DeleteConfirm
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        title="Hapus Layanan"
        description={`Yakin ingin menghapus "${deleteTarget?.name}"?`}
        loading={deleting}
      />
    </>
  );
}
