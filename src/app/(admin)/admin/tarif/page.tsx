"use client";

import { useState } from "react";
import { FolderTree, Plus, Pencil, Search, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockTariffs = [
  {
    id: "1",
    serviceName: "Wisata Edukasi Cokelat",
    name: "Paket Cokelat Praline",
    price: "Rp 1.000.000",
    unit: "Paket (25 orang)",
    status: "VERIFIED",
    effectiveDate: "01 Jan 2024",
  },
  {
    id: "2",
    serviceName: "Pelatihan Penyelia Halal",
    name: "Pelatihan Reguler",
    price: "Rp 500.000",
    unit: "Peserta",
    status: "UNVERIFIED",
    effectiveDate: "-",
  },
];

export default function AdminTarifPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manajemen Tarif</h1>
          <p className="text-gray-600">
            Kelola tarif layanan dengan pencatatan periode berlaku
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Tarif
        </Button>
      </div>

      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="pt-4">
          <p className="text-sm text-yellow-800">
            <strong>Catatan:</strong> Tarif harus sesuai dengan PP 54/2021 dan
            peraturan terkait. Jangan menimpa histori tarif lama. Gunakan
            pencatatan versi atau periode berlaku.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Daftar Tarif</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Cari tarif..."
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
                    Layanan
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Nama Tarif
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Harga
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Satuan
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Berlaku Sejak
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Verifikasi
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-gray-600">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockTariffs.map((tariff) => (
                  <tr
                    key={tariff.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">{tariff.serviceName}</td>
                    <td className="py-3 px-4 font-medium">{tariff.name}</td>
                    <td className="py-3 px-4">{tariff.price}</td>
                    <td className="py-3 px-4 text-gray-600">{tariff.unit}</td>
                    <td className="py-3 px-4 text-gray-600">
                      {tariff.effectiveDate}
                    </td>
                    <td className="py-3 px-4">
                      {tariff.status === "VERIFIED" ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Terverifikasi
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800">
                          <XCircle className="h-3 w-3 mr-1" />
                          Belum
                        </Badge>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="icon">
                        <Pencil className="h-4 w-4" />
                      </Button>
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
