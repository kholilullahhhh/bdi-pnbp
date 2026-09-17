"use client";

import { useState } from "react";
import { Search, Eye, CreditCard } from "lucide-react";
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
import {
  getStatusLabel,
  getStatusVariant,
  formatCurrency,
  formatDateShort,
} from "@/lib/utils";

const mockPayments = [
  {
    id: "PAY-001",
    user: "Budi Santoso",
    service: "Wisata Edukasi Cokelat",
    amount: 1000000,
    status: "PENDING",
    date: "2026-09-17",
  },
];

export default function AdminPembayaranPage() {
  const [search, setSearch] = useState("");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">
          Manajemen Pembayaran
        </h1>
        <p className="text-muted-foreground mt-1">
          Kelola dan verifikasi pembayaran
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Daftar Pembayaran</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Cari referensi atau pemohon..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {mockPayments.length === 0 ? (
            <EmptyState
              icon={<CreditCard className="h-8 w-8" />}
              title="Belum ada pembayaran"
              description="Data pembayaran akan muncul di sini."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Referensi
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Pemohon
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Layanan
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Jumlah
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Tanggal
                    </th>
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {mockPayments.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-border last:border-0 hover:bg-surface-alt/50 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono text-xs text-foreground">
                        {p.id}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-foreground">
                        {p.user}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">
                        {p.service}
                      </td>
                      <td className="py-3.5 px-4 font-medium font-mono text-xs">
                        {formatCurrency(p.amount)}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={getStatusVariant(p.status)}>
                          {getStatusLabel(p.status)}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">
                        {formatDateShort(p.date)}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label="Lihat detail"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
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
