"use client";

import { useState } from "react";
import { FileText, Search, Eye, CheckCircle, XCircle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockApplications = [
  {
    id: "PNBP-202609-0001",
    user: "Budi Santoso",
    service: "Wisata Edukasi Cokelat",
    status: "SUBMITTED",
    date: "17 Sep 2026",
  },
  {
    id: "PNBP-202609-0002",
    user: "PT Maju Jaya",
    service: "Pelatihan Penyelia Halal",
    status: "UNDER_REVIEW",
    date: "16 Sep 2026",
  },
  {
    id: "PNBP-202609-0003",
    user: "SMA Negeri 1 Makassar",
    service: "Wisata Edukasi Cokelat",
    status: "COMPLETED",
    date: "15 Sep 2026",
  },
];

const statusColors: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-800",
  SUBMITTED: "bg-blue-100 text-blue-800",
  UNDER_REVIEW: "bg-yellow-100 text-yellow-800",
  REVISION_REQUIRED: "bg-orange-100 text-orange-800",
  APPROVED: "bg-green-100 text-green-800",
  REJECTED: "bg-red-100 text-red-800",
  COMPLETED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-gray-100 text-gray-500",
};

const statusLabels: Record<string, string> = {
  DRAFT: "Draft",
  SUBMITTED: "Diajukan",
  UNDER_REVIEW: "Sedang Diproses",
  REVISION_REQUIRED: "Perlu Revisi",
  APPROVED: "Disetujui",
  REJECTED: "Ditolak",
  COMPLETED: "Selesai",
  CANCELLED: "Dibatalkan",
};

export default function AdminPermohonanPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          Manajemen Permohonan
        </h1>
        <p className="text-gray-600">Kelola dan verifikasi permohonan layanan</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <CardTitle>Daftar Permohonan</CardTitle>
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Cari nomor atau nama..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="h-9 rounded-md border border-gray-300 px-3 text-sm"
              >
                <option value="ALL">Semua Status</option>
                <option value="SUBMITTED">Diajukan</option>
                <option value="UNDER_REVIEW">Diproses</option>
                <option value="COMPLETED">Selesai</option>
              </select>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Nomor
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Pemohon
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Layanan
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-600">
                    Tanggal
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
                {mockApplications.map((app) => (
                  <tr
                    key={app.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 font-mono text-xs">{app.id}</td>
                    <td className="py-3 px-4">{app.user}</td>
                    <td className="py-3 px-4 text-gray-600">{app.service}</td>
                    <td className="py-3 px-4 text-gray-600">{app.date}</td>
                    <td className="py-3 px-4">
                      <Badge className={statusColors[app.status]}>
                        {statusLabels[app.status]}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
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
