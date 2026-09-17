"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { getStatusLabel, getStatusVariant, formatDateShort, formatCurrency } from "@/lib/utils";

interface ApplicationRow {
  id: string;
  applicationNumber: string;
  serviceName: string;
  status: string;
  createdAt: Date;
  invoice: { totalAmount: unknown; status: string } | null;
}

const statusTabs = [
  { key: "ALL", label: "Semua" },
  { key: "DRAFT", label: "Draft" },
  { key: "SUBMITTED", label: "Terkirim" },
  { key: "UNDER_REVIEW", label: "Ditinjau" },
  { key: "APPROVED", label: "Disetujui" },
  { key: "REVISION_REQUIRED", label: "Revisi" },
  { key: "COMPLETED", label: "Selesai" },
  { key: "REJECTED", label: "Ditolak" },
];

export function PermohonanClient({ applications }: { applications: ApplicationRow[] }) {
  const [activeTab, setActiveTab] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = applications.filter((app) => {
    const matchStatus = activeTab === "ALL" || app.status === activeTab;
    const matchSearch =
      !search ||
      app.applicationNumber.toLowerCase().includes(search.toLowerCase()) ||
      app.serviceName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  return (
    <div className="space-y-4">
      <Input
        placeholder="Cari nomor atau nama layanan..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />

      <div className="flex gap-2 overflow-x-auto pb-1">
        {statusTabs.map((tab) => {
          const count = tab.key === "ALL" ? applications.length : applications.filter((a) => a.status === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-primary-100 text-primary-700 border border-primary-200"
                  : "bg-surface text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              {tab.label} <span className="text-xs opacity-60">({count})</span>
            </button>
          );
        })}
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {filtered.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" />
            <p className="text-muted-foreground text-sm">
              {applications.length === 0 ? "Belum ada permohonan" : "Tidak ada permohonan yang cocok"}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-surface/80">
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Nomor</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Layanan</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Tagihan</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Tanggal</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => (
                  <tr key={app.id} className="border-b border-border/60 last:border-0 hover:bg-primary-50/30 transition-colors group">
                    <td className="py-3.5 px-4 font-mono text-xs text-foreground">{app.applicationNumber}</td>
                    <td className="py-3.5 px-4 font-medium text-foreground group-hover:text-primary-800 transition-colors">{app.serviceName}</td>
                    <td className="py-3.5 px-4 font-mono text-xs text-muted-foreground">{app.invoice ? formatCurrency(Number(app.invoice.totalAmount)) : "-"}</td>
                    <td className="py-3.5 px-4 text-muted-foreground">{formatDateShort(app.createdAt)}</td>
                    <td className="py-3.5 px-4"><Badge variant={getStatusVariant(app.status)}>{getStatusLabel(app.status)}</Badge></td>
                    <td className="py-3.5 px-4 text-right">
                      <Link href={`/dashboard/permohonan/${app.id}`}>
                        <Button variant="ghost" size="icon" aria-label="Lihat detail" className="text-muted-foreground hover:text-primary-700">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
