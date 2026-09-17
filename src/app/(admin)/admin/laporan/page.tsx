import {
  BarChart3,
  Download,
  Calendar,
  FileText,
  Users,
  CreditCard,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency } from "@/lib/utils";

const summaryStats = [
  {
    label: "Total Permohonan",
    value: "0",
    icon: FileText,
    color: "text-primary-700",
    bg: "bg-primary-50",
  },
  {
    label: "Total Pengguna",
    value: "0",
    icon: Users,
    color: "text-violet-600",
    bg: "bg-violet-50",
  },
  {
    label: "Total Pendapatan",
    value: formatCurrency(0),
    icon: CreditCard,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
];

export default function LaporanPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Laporan</h1>
          <p className="text-muted-foreground mt-1">
            Ringkasan data dan statistik sistem
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Calendar className="mr-1.5 h-4 w-4" />
            Periode: Semua
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-1.5 h-4 w-4" />
            Export PDF
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryStats.map((s) => (
          <Card key={s.label}>
            <CardContent className="p-5">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                    {s.label}
                  </p>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {s.value}
                  </p>
                </div>
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${s.bg}`}
                >
                  <s.icon className={`h-5 w-5 ${s.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Permohonan per Kategori
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-surface rounded-xl border border-border border-dashed">
              <EmptyState
                icon={<BarChart3 className="h-8 w-8" />}
                title="Grafik akan ditampilkan"
                description="Data akan muncul ketika ada permohonan."
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Pendapatan Bulanan</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-surface rounded-xl border border-border border-dashed">
              <EmptyState
                icon={<BarChart3 className="h-8 w-8" />}
                title="Grafik akan ditampilkan"
                description="Data pendapatan akan muncul di sini."
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
