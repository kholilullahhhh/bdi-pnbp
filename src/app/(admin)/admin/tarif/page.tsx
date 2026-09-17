"use client";

import { useState } from "react";
import { Plus, Pencil, Search, CheckCircle, XCircle, DollarSign } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Manajemen Tarif
          </h1>
          <p className="text-muted-foreground mt-1">
            Kelola tarif layanan dengan pencatatan periode berlaku
          </p>
        </div>
        <Button>
          <Plus className="mr-1.5 h-4 w-4" />
          Tambah Tarif
        </Button>
      </div>

      <Card className="border-amber-200 bg-warning-light">
        <CardContent className="p-4">
          <p className="text-sm text-amber-800">
            <strong>Catatan:</strong> Tarif harus sesuai dengan PP 54/2021 dan
            peraturan terkait. Jangan menimpa histori tarif lama. Gunakan
            pencatatan versi atau periode berlaku.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Daftar Tarif</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari tarif..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                    Layanan
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                    Nama Tarif
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                    Harga
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                    Satuan
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                    Berlaku Sejak
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                    Verifikasi
                  </th>
                  <th className="text-right py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                    Aksi
                  </th>
                </tr>
              </thead>
              <tbody>
                {mockTariffs.map((tariff) => (
                  <tr
                    key={tariff.id}
                    className="border-b border-border last:border-0 hover:bg-surface-alt/50 transition-colors"
                  >
                    <td className="py-3.5 px-4 text-muted-foreground">
                      {tariff.serviceName}
                    </td>
                    <td className="py-3.5 px-4 font-medium text-foreground">
                      {tariff.name}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-xs text-foreground">
                      {tariff.price}
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      {tariff.unit}
                    </td>
                    <td className="py-3.5 px-4 text-muted-foreground">
                      {tariff.effectiveDate}
                    </td>
                    <td className="py-3.5 px-4">
                      {tariff.status === "VERIFIED" ? (
                        <Badge variant="success">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Terverifikasi
                        </Badge>
                      ) : (
                        <Badge variant="warning">
                          <XCircle className="h-3 w-3 mr-1" />
                          Belum
                        </Badge>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button variant="ghost" size="icon" aria-label="Edit">
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
