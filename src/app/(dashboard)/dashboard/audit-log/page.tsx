export const dynamic = "force-dynamic";

import { User, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { getAuditLogs, formatDateTime } from "@/lib/db-queries";

const actionVariant: Record<string, "default" | "secondary" | "info" | "success" | "warning" | "destructive"> = {
  LOGIN: "info", LOGOUT: "secondary", CREATE: "success", UPDATE: "warning",
  DELETE: "destructive", STATUS_CHANGE: "info", VERIFY_PAYMENT: "success",
};

export default async function AuditLogPage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let logs: any[] = [];
  try {
    logs = await getAuditLogs();
  } catch (error) {
    console.error("Audit log page DB error:", error);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Audit Log</h1>
        <p className="text-muted-foreground mt-1">Riwayat aktivitas sistem</p>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {logs.length === 0 ? (
          <EmptyState icon={<FileText className="h-8 w-8" />} title="Belum ada log" description="Aktivitas sistem akan tercatat di sini." />
        ) : (
          <div className="divide-y divide-border/60">
            {logs.map((log) => (
              <div key={log.id} className="flex items-start gap-4 p-4 hover:bg-primary-50/30 transition-colors group">
                <div className="w-10 h-10 bg-surface rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-100 transition-colors">
                  <User className="h-4.5 w-4.5 text-muted-foreground group-hover:text-primary-700 transition-colors" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={actionVariant[log.action] || "secondary"} className="text-[10px]">{log.action}</Badge>
                    <span className="text-xs text-muted-foreground font-mono">{formatDateTime(log.createdAt)}</span>
                  </div>
                  <p className="text-sm text-foreground mt-1">
                    <span className="font-semibold group-hover:text-primary-800 transition-colors">{log.user?.name || log.user?.email || "System"}</span>
                    {" — "}{log.entity}
                    {log.entityId && <span className="text-muted-foreground font-mono text-xs"> ({log.entityId.slice(0, 8)}...)</span>}
                  </p>
                  {log.newData && (
                    <p className="text-sm text-muted-foreground mt-0.5 font-mono text-xs bg-surface rounded-lg p-2 mt-2">{JSON.stringify(log.newData)}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
