"use client";

import Link from "next/link";
import { useState } from "react";
import { FileText, Search, Plus, Eye, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, getStatusColor, getStatusLabel } from "@/lib/utils";

const applications = [
  { id: "PNBP-202609-0001", serviceName: "Wisata Edukasi Cokelat", status: "SUBMITTED", date: "2026-09-17", amount: 1000000 },
  { id: "PNBP-202609-0002", serviceName: "Pelatihan Penyelia Halal", status: "COMPLETED", date: "2026-09-16", amount: 500000 },
];

export default function PermohonanPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Permohonan Saya</h1>
          <p className="text-gray-600">Daftar permohonan layanan PNBP</p>
        </div>
        <Link href="/layanan"><Button><Plus className="h-4 w-4 mr-2" />Ajukan Baru</Button></Link>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Riwayat Permohonan</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Cari nomor permohonan..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">Nomor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Layanan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Tanggal</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Aksi</th>
              </tr></thead>
              <tbody>
                {applications.length === 0 ? (
                  <tr><td colSpan={5} className="py-12 text-center text-gray-500">
                    <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    Belum ada permohonan
                  </td></tr>
                ) : (
                  applications.map((app) => (
                    <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono text-xs">{app.id}</td>
                      <td className="py-3 px-4">{app.serviceName}</td>
                      <td className="py-3 px-4 text-gray-600">{new Date(app.date).toLocaleDateString("id-ID")}</td>
                      <td className="py-3 px-4"><Badge className={getStatusColor(app.status)}>{getStatusLabel(app.status)}</Badge></td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="icon"><Eye className="h-4 w-4" /></Button>
                        {app.status === "COMPLETED" && <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
