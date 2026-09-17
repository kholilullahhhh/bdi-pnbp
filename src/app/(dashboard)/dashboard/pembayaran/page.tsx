"use client";

import { CreditCard, Download } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency, getStatusLabel, getStatusVariant } from "@/lib/utils";

const payments: {
  id: string;
  service: string;
  amount: number;
  status: string;
  date: string;
}[] = [];

export default function PembayaranPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pembayaran</h1>
        <p className="text-muted-foreground mt-1">
          Riwayat dan status pembayaran Anda
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Menunggu Pembayaran
            </p>
            <p className="text-2xl font-bold text-foreground mt-1">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Lunas
            </p>
            <p className="text-2xl font-bold text-emerald-600 mt-1">0</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-5">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Total Dibayar
            </p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {formatCurrency(0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {payments.length === 0 ? (
            <EmptyState
              icon={<CreditCard className="h-8 w-8" />}
              title="Belum ada pembayaran"
              description="Riwayat pembayaran akan muncul di sini setelah Anda melakukan pembayaran."
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      ID Pembayaran
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
                    <th className="text-right py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-border last:border-0 hover:bg-surface-alt/50 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono text-xs">
                        {p.id}
                      </td>
                      <td className="py-3.5 px-4 font-medium">{p.service}</td>
                      <td className="py-3.5 px-4 font-medium">
                        {formatCurrency(p.amount)}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={getStatusVariant(p.status)}>
                          {getStatusLabel(p.status)}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button variant="ghost" size="icon" aria-label="Unduh bukti">
                          <Download className="h-4 w-4" />
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
