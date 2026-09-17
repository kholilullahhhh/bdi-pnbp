"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Megaphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { AnnouncementForm } from "@/components/admin/announcement-form";
import { DeleteConfirm } from "@/components/admin/delete-confirm";
import { formatDateShort } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Announcement {
  id: string;
  title: string;
  content: string;
  isPublished: boolean;
  publishedAt?: Date | string | null;
}

export function AnnouncementTable({ announcements }: { announcements: Announcement[] }) {
  const router = useRouter();
  const [formOpen, setFormOpen] = useState(false);
  const [editData, setEditData] = useState<Announcement | null>(null);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Announcement | null>(null);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/announcements/${deleteTarget.id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) { toast.error(data.error || "Gagal menghapus"); return; }
      toast.success("Pengumuman berhasil dihapus");
      setDeleteOpen(false);
      setDeleteTarget(null);
      router.refresh();
    } catch { toast.error("Terjadi kesalahan"); } finally { setDeleting(false); }
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Manajemen Pengumuman</h1>
          <p className="text-muted-foreground mt-1">Kelola pengumuman untuk pengguna</p>
        </div>
        <Button onClick={() => { setEditData(null); setFormOpen(true); }}>
          <Plus className="mr-1.5 h-4 w-4" /> Tambah Pengumuman
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Daftar Pengumuman ({announcements.length})</CardTitle>
        </CardHeader>
        <CardContent>
          {announcements.length === 0 ? (
            <EmptyState icon={<Megaphone className="h-8 w-8" />} title="Tidak ada pengumuman" description="Belum ada pengumuman yang terdaftar." />
          ) : (
            <div className="space-y-3">
              {announcements.map((a) => (
                <div key={a.id} className="border border-border/60 rounded-xl p-4 hover:bg-primary-50/30 hover:border-primary-200 transition-all duration-200 group">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-foreground group-hover:text-primary-800 transition-colors">{a.title}</h3>
                        <Badge variant={a.isPublished ? "success" : "secondary"}>
                          {a.isPublished ? "Diterbitkan" : "Draft"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed line-clamp-2">{a.content}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {a.publishedAt ? formatDateShort(a.publishedAt) : "Belum diterbitkan"}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button variant="ghost" size="icon" aria-label="Edit" onClick={() => { setEditData(a); setFormOpen(true); }} className="text-muted-foreground hover:text-amber-600">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" aria-label="Hapus" onClick={() => { setDeleteTarget(a); setDeleteOpen(true); }} className="text-muted-foreground hover:text-red-600">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <AnnouncementForm
        open={formOpen}
        onClose={() => { setFormOpen(false); setEditData(null); }}
        mode={editData ? "edit" : "create"}
        initialData={editData || undefined}
      />

      <DeleteConfirm
        open={deleteOpen}
        onClose={() => { setDeleteOpen(false); setDeleteTarget(null); }}
        onConfirm={handleDelete}
        title="Hapus Pengumuman"
        description={`Yakin ingin menghapus "${deleteTarget?.title}"?`}
        loading={deleting}
      />
    </>
  );
}
