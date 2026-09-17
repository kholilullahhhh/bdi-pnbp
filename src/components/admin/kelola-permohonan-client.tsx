"use client";

import { useState } from "react";
import Link from "next/link";
import { FileText, Clock, AlertCircle, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getStatusLabel, getStatusVariant, formatDateShort } from "@/lib/utils";

interface ApplicationRow {
  id: string;
  applicationNumber: string;
  serviceName: string;
  status: string;
  createdAt: Date;
  user: { name: string };
}

const statusTabs = [
  { key: "ALL", label: "Semua" },
  { key: "SUBMITTED", label: "Menunggu", icon: Clock },
  { key: "UNDER_REVIEW", label: "Ditinjau" },
  { key: "APPROVED", label: "Disetujui" },
  { key: "COMPLETED", label: "Selesai" },
  { key: "REJECTED", label: "Ditolak" },
];

export function KelolaPermohonanClient({
  applications,
}: {
  applications: ApplicationRow[];
}) {
  const [activeTab, setActiveTab] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = applications.filter((app) => {
    const matchStatus = activeTab === "ALL" || app.status === activeTab;
    const matchSearch =
      !search ||
      app.applicationNumber.toLowerCase().includes(search.toLowerCase()) ||
      app.user.name.toLowerCase().includes(search.toLowerCase()) ||
      app.serviceName.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const pendingCount = applications.filter((a) => a.status === "SUBMITTED").length;
  const reviewCount = applications.filter((a) => a.status === "UNDER_REVIEW").length;

  return (
    <div className="space-y-6">
      {(pendingCount > 0 || reviewCount > 0) && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pendingCount > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="h-5 w-5 text-amber-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-amber-900">{pendingCount} Permohonan Baru</p>
                <p className="text-xs text-amber-600">Menunggu verifikasi</p>
              </div>
            </div>
          )}
          {reviewCount > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                <Clock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-900">{reviewCount} Sedang Ditinjau</p>
                <p className="text-xs text-blue-600">Perlu tindak lanjut</p>
              </div>
            </div>
          )}
        </div>
      )}

      <div>
        <Input
          placeholder="Cari nomor, pemohon, atau layanan..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-md"
        />
      </div>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {statusTabs.map((tab) => {
          const count = tab.key === "ALL" ? applications.length : applications.filter((a) => a.status === tab.key).length;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.key
                  ? "bg-primary-100 text-primary-700 border border-primary-200"
                  : "bg-surface text-muted-foreground hover:text-foreground border border-transparent"
              }`}
            >
              {tab.icon && <tab.icon className="h-3.5 w-3.5" />}
              {tab.label}
              <span className="text-xs opacity-60">({count})</span>
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
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Pemohon</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Layanan</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Tanggal</th>
                  <th className="text-left py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Status</th>
                  <th className="text-right py-3 px-4 font-semibold text-muted-foreground text-xs uppercase tracking-wider">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((app) => (
                    <tr key={app.id} className="border-b border-border/60 last:border-0 hover:bg-primary-50/30 transition-colors group">
                      <td className="py-3.5 px-4 font-mono text-xs text-foreground">{app.applicationNumber}</td>
                      <td className="py-3.5 px-4 font-medium text-foreground group-hover:text-primary-800 transition-colors">{app.user.name}</td>
                      <td className="py-3.5 px-4 text-muted-foreground">{app.serviceName}</td>
                      <td className="py-3.5 px-4 text-muted-foreground">{formatDateShort(app.createdAt)}</td>
                      <td className="py-3.5 px-4"><Badge variant={getStatusVariant(app.status)}>{getStatusLabel(app.status)}</Badge></td>
                      <td className="py-3.5 px-4 text-right">
                        <Link href={`/dashboard/kelola-permohonan/${app.id}`}>
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
