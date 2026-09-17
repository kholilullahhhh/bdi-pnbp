"use client";

import { CreditCard, Download, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";

const payments = [
  { id: "PAY-001", applicationId: "PNBP-202609-0001", service: "Wisata Edukasi Cokelat", amount: 1000000, status: "PENDING", date: "2026-09-17" },
];

export default function PembayaranPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pembayaran</h1>
        <p className="text-gray-600">Riwayat dan status pembayaran</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-gray-600">Menunggu Pembayaran</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">0</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-gray-600">Lunas</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold text-green-600">0</p></CardContent></Card>
        <Card><CardHeader className="pb-2"><CardTitle className="text-sm text-gray-600">Total Dibayar</CardTitle></CardHeader><CardContent><p className="text-2xl font-bold">{formatCurrency(0)}</p></CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Riwayat Pembayaran</CardTitle></CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead><tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-600">ID Pembayaran</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Layanan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Jumlah</th>
                <th className="text-left py-3 px-4 font-medium text-gray-600">Status</th>
                <th className="text-right py-3 px-4 font-medium text-gray-600">Aksi</th>
              </tr></thead>
              <tbody>
                {payments.length === 0 ? (
                  <tr><td colSpan={5} className="py-12 text-center text-gray-500">
                    <CreditCard className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    Belum ada pembayaran
                  </td></tr>
                ) : payments.map((p) => (
                  <tr key={p.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono text-xs">{p.id}</td>
                    <td className="py-3 px-4">{p.service}</td>
                    <td className="py-3 px-4 font-medium">{formatCurrency(p.amount)}</td>
                    <td className="py-3 px-4">
                      <Badge className={p.status === "PAID" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                        {p.status === "PAID" ? "Lunas" : "Menunggu"}
                      </Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Button variant="ghost" size="icon"><Download className="h-4 w-4" /></Button>
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
