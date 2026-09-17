"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Megaphone } from "lucide-react";
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

const announcements = [
  {
    id: "1",
    title: "Jadwal Pelatihan Oktober 2026",
    summary:
      "Daftar pelatihan yang akan diselenggarakan di bulan Oktober 2026.",
    isPublished: true,
    publishedAt: "2026-09-15",
  },
  {
    id: "2",
    title: "Pemeliharaan Sistem",
    summary:
      "Sistem akan mengalami pemeliharaan pada tanggal 20 September 2026.",
    isPublished: true,
    publishedAt: "2026-09-14",
  },
];

export default function PengumumanPage() {
  const [search, setSearch] = useState("");

  const filtered = announcements.filter(
    (a) =>
      !search ||
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.summary.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Manajemen Pengumuman
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola pengumuman untuk pengguna
          </p>
        </div>
        <Button>
          <Plus className="mr-1.5 h-4 w-4" />
          Tambah Pengumuman
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Daftar Pengumuman</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari pengumuman..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent>
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Megaphone className="h-8 w-8" />}
              title="Tidak ada pengumuman"
              description="Belum ada pengumuman yang terdaftar."
            />
          ) : (
            <div className="space-y-3">
              {filtered.map((a) => (
                <div
                  key={a.id}
                  className="border border-border rounded-xl p-4 hover:bg-surface-alt/50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-medium text-foreground">
                          {a.title}
                        </h3>
                        <Badge
                          variant={a.isPublished ? "success" : "secondary"}
                        >
                          {a.isPublished ? "Diterbitkan" : "Draft"}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                        {a.summary}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(a.publishedAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Edit"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label="Hapus"
                      >
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
    </div>
  );
}
