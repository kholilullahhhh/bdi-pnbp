"use client";

import { useState } from "react";
import { Layers, Plus, Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Manajemen Layanan
          </h1>
          <p className="text-gray-600">Kelola katalog layanan PNBP</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Layanan
        </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daftar Layanan</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari layanan..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Nama Layanan
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Kategori
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Tarif
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Status
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockServices.map((service) => (
                  <tr
                    key={service.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-medium">{service.name}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {service.category}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      {service.tariff}
                    </td>
                    <td className="py-3 px-4">
                      <Badge
                        className={
                          service.status === "ACTIVE"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }
                      >
                        {service.status === "ACTIVE" ? "Aktif" : "Nonaktif"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
