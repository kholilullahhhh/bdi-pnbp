"use client";

import { BarChart3, Download, Calendar, FileText, Users, CreditCard } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

const summaryStats = [
  { label: "Total Permohonan", value: "0", icon: FileText },
  { label: "Total Pengguna", value: "0", icon: Users },
  { label: "Total Pendapatan", value: formatCurrency(0), icon: CreditCard },
];

export default function LaporanPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Laporan</h1><p className="text-gray-600">Ringkasan data dan statistik sistem</p></div>
        <div className="flex gap-2">
          <Button variant="outline"><Calendar className="h-4 w-4 mr-2" />Periode: Semua</Button>
          <Button variant="outline"><Download className="h-4 w-4 mr-2" />Export PDF</Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {summaryStats.map((s) => (
          <Card key={s.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{s.label}</CardTitle>
              <s.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent><p className="text-2xl font-bold">{s.value}</p></CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Permohonan per Kategori</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center"><BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-2" /><p className="text-gray-500">Grafik akan ditampilkan ketika ada data</p></div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Pendapatan Bulanan</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
              <div className="text-center"><BarChart3 className="h-12 w-12 text-gray-300 mx-auto mb-2" /><p className="text-gray-500">Grafik akan ditampilkan ketika ada data</p></div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
