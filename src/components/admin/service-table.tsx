"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Layers, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { ServiceForm } from "@/components/admin/service-form";
import { DeleteConfirm } from "@/components/admin/delete-confirm";
import { formatCurrency } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Service {
  id: string;
  name: string;
  slug: string;
  description: string;
  targetUser?: string | null;
  requirements?: string | null;
  procedure?: string | null;
  paymentInfo?: string | null;
  estimationTime?: string | null;
  status: string;
  categoryId: string;
  category: { name: string };
  tariffs: { price: { toString(): string } }[];
}

export function ServiceTable({ services, categories }: { services: Service[]; categories: { id: string; name: string }[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<Service | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
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
      setDeleteOpen(false);
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manajemen Layanan</h1>
          <p className="text-muted-foreground mt-1">Kelola katalog layanan PNBP</p>
        </div>
        <Button onClick={() => { setEditData(null); setFormOpen(true); }}>
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
                  <tr className="border-b border-border bg-surface">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">Nama Layanan</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">Kategori</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">Tarif</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">Status</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((service) => (
                    <tr key={service.id} className="border-b border-border last:border-0 hover:bg-surface-alt/50 transition-colors">
                      <td className="py-3.5 px-4 font-medium text-foreground">{service.name}</td>
                      <td className="py-3.5 px-4 text-muted-foreground">{service.category.name}</td>
                      <td className="py-3.5 px-4 text-muted-foreground font-mono text-xs">
                        {service.tariffs[0] ? formatCurrency(Number(service.tariffs[0].price)) : "Belum Terverifikasi"}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={service.status === "ACTIVE" ? "success" : "destructive"}>
                          {service.status === "ACTIVE" ? "Aktif" : "Nonaktif"}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" aria-label="Lihat" onClick={() => { setDetailData(service); setDetailOpen(true); }}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" aria-label="Edit" onClick={() => { setEditData(service); setFormOpen(true); }}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" aria-label="Hapus" onClick={() => { setDeleteTarget(service); setDeleteOpen(true); }}>
                            <Trash2 className="h-4 w-4 text-destructive" />
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

      <ServiceForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditData(null); }}
        mode={editData ? "edit" : "create"}
        initialData={editData ? {
          id: editData.id,
          name: editData.name,
          slug: editData.slug,
          description: editData.description,
          targetUser: editData.targetUser ?? undefined,
          requirements: editData.requirements ?? undefined,
          procedure: editData.procedure ?? undefined,
          paymentInfo: editData.paymentInfo ?? undefined,
          estimationTime: editData.estimationTime ?? undefined,
          categoryId: editData.categoryId,
          status: editData.status,
        } : undefined}
        categories={categories}
      />

      <DeleteConfirm
        open={deleteOpen}
        onClose={() => { setDeleteOpen(false); setDeleteTarget(null); }}
        onConfirm={handleDelete}
        title="Hapus Layanan"
        description={`Yakin ingin menghapus "${deleteTarget?.name}"?`}
        loading={deleting}
      />

      {/* Detail Dialog */}
      {detailOpen && detailData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setDetailOpen(false)}>
          <div className="bg-white rounded-xl border border-border shadow-lg w-full max-w-2xl max-h-[80vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
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
                  <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Deskripsi</p>
                  <p className="text-foreground">{detailData.description}</p>
                </div>
                {detailData.targetUser && (
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Target Pengguna</p>
                    <p className="text-foreground">{detailData.targetUser}</p>
                  </div>
                )}
                {detailData.requirements && (
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Persyaratan</p>
                    <p className="text-foreground whitespace-pre-line">{detailData.requirements}</p>
                  </div>
                )}
                {detailData.procedure && (
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Prosedur</p>
                    <p className="text-foreground whitespace-pre-line">{detailData.procedure}</p>
                  </div>
                )}
                {detailData.estimationTime && (
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Estimasi Waktu</p>
                    <p className="text-foreground">{detailData.estimationTime}</p>
                  </div>
                )}
                {detailData.tariffs[0] && (
                  <div>
                    <p className="text-muted-foreground text-xs uppercase tracking-wide mb-1">Tarif</p>
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
    </>
  );
}
