"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Search, Layers } from "lucide-react";
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

const mockServices = [
  {
    id: "1",
    name: "Pelatihan Penyelia Halal",
    category: "Diklat & Pelatihan",
    status: "ACTIVE",
    tariff: "Rp 500.000",
  },
  {
    id: "2",
    name: "Wisata Edukasi Cokelat",
    category: "Wisata Edukasi",
    status: "ACTIVE",
    tariff: "Rp 1.000.000/paket",
  },
  {
    id: "3",
    name: "Sewa Aula",
    category: "Penyewaan Fasilitas",
    status: "ACTIVE",
    tariff: "Belum Terverifikasi",
  },
];

export default function AdminLayananPage() {
  const [search, setSearch] = useState("");

  const filtered = mockServices.filter(
    (s) =>
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Manajemen Layanan
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola katalog layanan PNBP
          </p>
        </div>
        <Button>
          <Plus className="mr-1.5 h-4 w-4" />
          Tambah Layanan
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Daftar Layanan</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari layanan..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <EmptyState
              icon={<Layers className="h-8 w-8" />}
              title="Tidak ada layanan"
              description="Belum ada layanan yang terdaftar."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Nama Layanan
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Kategori
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Tarif
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Status
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((service) => (
                    <tr
                      key={service.id}
                      className="border-b border-border last:border-0 hover:bg-surface-alt/50 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-medium text-foreground">
                        {service.name}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">
                        {service.category}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground font-mono text-xs">
                        {service.tariff}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge
                          variant={
                            service.status === "ACTIVE"
                              ? "success"
                              : "destructive"
                          }
                        >
                          {service.status === "ACTIVE" ? "Aktif" : "Nonaktif"}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="icon" aria-label="Edit">
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
  );
}
