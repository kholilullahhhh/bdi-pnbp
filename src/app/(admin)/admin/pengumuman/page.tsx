"use client";

import { useState } from "react";
import { Megaphone, Search, Plus, Eye, EyeOff, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const announcements = [
  { id: "1", title: "Jadwal Pelatihan Oktober 2026", summary: "Daftar pelatihan yang akan diselenggarakan di bulan Oktober 2026.", isPublished: true, publishedAt: "2026-09-15" },
  { id: "2", title: "Pemeliharaan Sistem", summary: "Sistem akan mengalami pemeliharaan pada tanggal 20 September 2026.", isPublished: true, publishedAt: "2026-09-14" },
];

export default function PengumumanPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Manajemen Pengumuman</h1><p className="text-gray-600">Kelola pengumuman untuk pengguna</p></div>
        <Button><Plus className="h-4 w-4 mr-2" />Tambah Pengumuman</Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daftar Pengumuman</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Cari pengumuman..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {announcements.map((a) => (
              <div key={a.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-gray-900">{a.title}</h3>
                      <Badge className={a.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>{a.isPublished ? "Diterbitkan" : "Draft"}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{a.summary}</p>
                    <p className="text-xs text-gray-500 mt-2">{new Date(a.publishedAt).toLocaleDateString("id-ID")}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon"><Pencil className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4 text-red-500" /></Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
