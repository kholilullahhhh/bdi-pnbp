import { Search, User, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";

const logs = [
  {
    id: "1",
    action: "LOGIN",
    user: "admin@bdi-makassar.go.id",
    target: "Auth",
    details: "Login berhasil",
    timestamp: "2026-09-17 09:00:00",
  },
  {
    id: "2",
    action: "CREATE",
    user: "admin@bdi-makassar.go.id",
    target: "Layanan",
    details: "Menambah layanan baru",
    timestamp: "2026-09-17 09:15:00",
  },
  {
    id: "3",
    action: "UPDATE",
    user: "operator@bdi-makassar.go.id",
    target: "Permohonan",
    details: "Status diubah ke UNDER_REVIEW",
    timestamp: "2026-09-17 10:00:00",
  },
];

const actionVariant: Record<
  string,
  "default" | "secondary" | "info" | "success" | "warning" | "destructive"
> = {
  LOGIN: "info",
  LOGOUT: "secondary",
  CREATE: "success",
  UPDATE: "warning",
  DELETE: "destructive",
};

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Audit Log</h1>
        <p className="text-muted-foreground mt-1">
          Riwayat aktivitas sistem
        </p>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-base">Log Aktivitas</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Cari log..." className="pl-9" />
          </div>
        </CardHeader>
        <CardContent>
          {logs.length === 0 ? (
            <EmptyState
              icon={<FileText className="h-8 w-8" />}
              title="Belum ada log"
              description="Aktivitas sistem akan tercatat di sini."
            />
          ) : (
            <div className="space-y-2">
              {logs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-start gap-4 p-3.5 border border-border rounded-xl hover:bg-surface-alt/50 transition-colors"
                >
                  <div className="w-8 h-8 bg-surface rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge
                        variant={actionVariant[log.action] || "secondary"}
                        className="text-[10px]"
                      >
                        {log.action}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-mono">
                        {log.timestamp}
                      </span>
                    </div>
                    <p className="text-sm text-foreground mt-1">
                      <span className="font-medium">{log.user}</span>
                      {" — "}
                      {log.target}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {log.details}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
