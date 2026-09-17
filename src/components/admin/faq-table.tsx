"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { FAQForm } from "@/components/admin/faq-form";
import { DeleteConfirm } from "@/components/admin/delete-confirm";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
  sortOrder: number;
  isActive: boolean;
}

export function FAQTable({ faqs }: { faqs: FAQ[] }) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<FAQ | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<FAQ | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/faqs/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Gagal menghapus"); return; }
      toast.success("FAQ berhasil dihapus");
      setDeleteOpen(false);
      setDeleteTarget(null);
      router.refresh();
    } catch { toast.error("Terjadi kesalahan"); } finally { setDeleting(false); }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manajemen FAQ</h1>
          <p className="text-muted-foreground mt-1">Kelola pertanyaan yang sering diajukan</p>
        </div>
        <Button onClick={() => { setEditData(null); setFormOpen(true); }}>
          <Plus className="mr-1.5 h-4 w-4" /> Tambah FAQ
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Daftar FAQ ({faqs.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {faqs.length === 0 ? (
            <EmptyState icon={<HelpCircle className="h-8 w-8" />} title="Tidak ada FAQ" description="Belum ada FAQ yang terdaftar." />
          ) : (
            <div className="space-y-3">
              {faqs.map((faq) => (
                <div key={faq.id} className="border border-border rounded-xl p-4 hover:bg-surface-alt/50 transition-colors">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        {faq.category && <Badge variant="info" className="text-[10px]">{faq.category}</Badge>}
                        <span className="text-xs text-muted-foreground">Urutan: {faq.sortOrder}</span>
                      </div>
                      <p className="font-medium text-foreground mt-2">{faq.question}</p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{faq.answer}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button variant="ghost" size="icon" aria-label="Edit" onClick={() => { setEditData(faq); setFormOpen(true); }}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Hapus" onClick={() => { setDeleteTarget(faq); setDeleteOpen(true); }}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <FAQForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditData(null); }}
        mode={editData ? "edit" : "create"}
        initialData={editData ? {
          ...editData,
          category: editData.category ?? undefined,
        } : undefined}
      />

      <DeleteConfirm
        open={deleteOpen}
        onClose={() => { setDeleteOpen(false); setDeleteTarget(null); }}
        onConfirm={handleDelete}
        title="Hapus FAQ"
        description={`Yakin ingin menghapus pertanyaan "${deleteTarget?.question}"?`}
        loading={deleting}
      />
    </>
  );
}
