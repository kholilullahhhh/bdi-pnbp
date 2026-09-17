import { User, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { getAuditLogs, formatDateTime } from "@/lib/db-queries";

const actionVariant: Record<string, "default" | "secondary" | "info" | "success" | "warning" | "destructive"> = {
  LOGIN: "info",
  LOGOUT: "secondary",
  CREATE: "success",
  UPDATE: "warning",
  DELETE: "destructive",
  STATUS_CHANGE: "info",
  VERIFY_PAYMENT: "success",
};

export default async function AuditLogPage() {
  const logs = await getAuditLogs();

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
          <CardTitle className="text-base">Log Aktivitas ({logs.length})</CardTitle>
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
                        {formatDateTime(log.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-foreground mt-1">
                      <span className="font-medium">{log.user?.name || log.user?.email || "System"}</span>
                      {" — "}
                      {log.entity}
                      {log.entityId && ` (${log.entityId.slice(0, 8)}...)`}
                    </p>
                    {log.newData && (
                      <p className="text-sm text-muted-foreground mt-0.5 font-mono text-xs">
                        {JSON.stringify(log.newData)}
                      </p>
                    )}
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
