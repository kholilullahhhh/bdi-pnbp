"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FileText,
  Search,
  Plus,
  Eye,
  Download,
  ArrowRight,
} from "lucide-react";
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
  formatDateShort,
} from "@/lib/utils";

const applications: {
  id: string;
  serviceName: string;
  status: string;
  date: string;
  amount: number;
}[] = [];

const statusFilters = [
  { label: "Semua", value: "ALL" },
  { label: "Diajukan", value: "SUBMITTED" },
  { label: "Diproses", value: "UNDER_REVIEW" },
  { label: "Selesai", value: "COMPLETED" },
];

export default function PermohonanPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const filtered = applications.filter(
    (a) =>
      (statusFilter === "ALL" || a.status === statusFilter) &&
      (!search ||
        a.id.toLowerCase().includes(search.toLowerCase()) ||
        a.serviceName.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Permohonan Saya
          </h1>
          <p className="text-muted-foreground mt-1">
            Daftar permohonan layanan PNBP
          </p>
        </div>
        <Link href="/layanan">
          <Button>
            <Plus className="mr-1.5 h-4 w-4" />
            Ajukan Baru
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cari nomor atau nama layanan..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-1.5 bg-surface p-1 rounded-lg border border-border">
          {statusFilters.map((f) => (
            <button
              key={f.value}
              type="button"
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                statusFilter === f.value
                  ? "bg-white text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
              onClick={() => setStatusFilter(f.value)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          {filtered.length === 0 ? (
            <EmptyState
              icon={<FileText className="h-8 w-8" />}
              title="Belum ada permohonan"
              description="Ajukan permohonan layanan PNBP pertama Anda."
              action={
                <Link href="/layanan">
                  <Button>
                    <Plus className="mr-1.5 h-4 w-4" />
                    Ajukan Permohonan
                  </Button>
                </Link>
              }
            />
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-surface">
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Nomor
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Layanan
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                      Tanggal
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
                  {filtered.map((app) => (
                    <tr
                      key={app.id}
                      className="border-b border-border last:border-0 hover:bg-surface-alt/50 transition-colors"
                    >
                      <td className="py-3.5 px-4 font-mono text-xs text-foreground">
                        {app.id}
                      </td>
                      <td className="py-3.5 px-4 font-medium text-foreground">
                        {app.serviceName}
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground">
                        {formatDateShort(app.date)}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={getStatusVariant(app.status)}>
                          {getStatusLabel(app.status)}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <Button variant="ghost" size="icon" aria-label="Lihat detail">
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
