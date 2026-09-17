"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { TariffForm } from "@/components/admin/tariff-form";
import { DeleteConfirm } from "@/components/admin/delete-confirm";
import { formatCurrency, formatDateShort } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Tariff {
  id: string;
  serviceId: string;
  name: string;
  price: { toString(): string };
  unit: string;
  verificationStatus: string;
  effectiveStartDate: Date | string;
  effectiveEndDate?: Date | string | null;
  description?: string | null;
  legalBasis?: string | null;
  regulationNumber?: string | null;
  regulationYear?: number | null;
  service: { name: string; id: string };
}

export function TariffTable({ tariffs, services }: { tariffs: Tariff[]; services: { id: string; name: string }[] }) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<Tariff | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Tariff | null>(null);
  const [deleting, setDeleting] = useState(false);

  const filtered = tariffs.filter(
    (t) => !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.service.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/tariffs/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Gagal menghapus"); return; }
      toast.success("Tarif berhasil dihapus");
      setDeleteOpen(false);
      setDeleteTarget(null);
      router.refresh();
    } catch { toast.error("Terjadi kesalahan"); } finally { setDeleting(false); }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manajemen Tarif</h1>
          <p className="text-muted-foreground mt-1">Kelola tarif layanan dengan pencatatan periode berlaku</p>
        </div>
        <Button onClick={() => { setEditData(null); setFormOpen(true); }}>
          <Plus className="mr-1.5 h-4 w-4" /> Tambah Tarif
        </Button>
      </div>

      <Card className="border-amber-200 bg-warning-light">
        <CardContent className="p-4">
          <p className="text-sm text-amber-800">
            <strong>Catatan:</strong> Tarif harus sesuai dengan PP 54/2021 dan peraturan terkait. Jangan menimpa histori tarif lama.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Daftar Tarif ({filtered.length})</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Cari tarif..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <EmptyState icon={<XCircle className="h-8 w-8" />} title="Tidak ada tarif" description="Belum ada tarif yang terdaftar." />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">Layanan</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">Nama Tarif</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">Harga</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">Satuan</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">Berlaku Sejak</th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">Verifikasi</th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((tariff) => (
                    <tr key={tariff.id} className="border-b border-border last:border-0 hover:bg-surface-alt/50 transition-colors">
                      <td className="py-3.5 px-4 text-muted-foreground">{tariff.service.name}</td>
                      <td className="py-3.5 px-4 font-medium text-foreground">{tariff.name}</td>
                      <td className="py-3.5 px-4 font-mono text-xs text-foreground">{formatCurrency(Number(tariff.price))}</td>
                      <td className="py-3.5 px-4 text-muted-foreground">{tariff.unit}</td>
                      <td className="py-3.5 px-4 text-muted-foreground">{formatDateShort(tariff.effectiveStartDate)}</td>
                      <td className="py-3.5 px-4">
                        {tariff.verificationStatus === "VERIFIED" ? (
                          <Badge variant="success"><CheckCircle className="h-3 w-3 mr-1" />Terverifikasi</Badge>
                        ) : (
                          <Badge variant="warning"><XCircle className="h-3 w-3 mr-1" />Belum</Badge>
                        )}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" aria-label="Edit" onClick={() => { setEditData(tariff); setFormOpen(true); }}>
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" aria-label="Hapus" onClick={() => { setDeleteTarget(tariff); setDeleteOpen(true); }}>
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

      <TariffForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditData(null); }}
        mode={editData ? "edit" : "create"}
        initialData={editData ? {
          ...editData,
          price: Number(editData.price),
          description: editData.description ?? undefined,
          legalBasis: editData.legalBasis ?? undefined,
          regulationNumber: editData.regulationNumber ?? undefined,
          regulationYear: editData.regulationYear ?? undefined,
          effectiveStartDate: String(editData.effectiveStartDate),
          effectiveEndDate: editData.effectiveEndDate ? String(editData.effectiveEndDate) : undefined,
        } : undefined}
        services={services}
      />

      <DeleteConfirm
        open={deleteOpen}
        onClose={() => { setDeleteOpen(false); setDeleteTarget(null); }}
        onConfirm={handleDelete}
        title="Hapus Tarif"
        description={`Yakin ingin menghapus "${deleteTarget?.name}"?`}
        loading={deleting}
      />
    </>
  );
}
