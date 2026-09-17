"use client";

import { ClipboardList, Search, User, FileText, CreditCard, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const logs = [
  { id: "1", action: "LOGIN", user: "admin@bdi-makassar.go.id", target: "Auth", details: "Login berhasil", timestamp: "2026-09-17 09:00:00" },
  { id: "2", action: "CREATE", user: "admin@bdi-makassar.go.id", target: "Layanan", details: "Menambah layanan baru", timestamp: "2026-09-17 09:15:00" },
  { id: "3", action: "UPDATE", user: "operator@bdi-makassar.go.id", target: "Permohonan", details: "Status diubah ke UNDER_REVIEW", timestamp: "2026-09-17 10:00:00" },
];

const actionColor: Record<string, string> = {
  LOGIN: "bg-blue-100 text-blue-800", LOGOUT: "bg-gray-100 text-gray-800",
  CREATE: "bg-green-100 text-green-800", UPDATE: "bg-yellow-100 text-yellow-800", DELETE: "bg-red-100 text-red-800",
};

const actionIcon: Record<string, typeof User> = { LOGIN: User, LOGOUT: User, CREATE: FileText, UPDATE: FileText, DELETE: FileText };

export default function AuditLogPage() {
  return (
    <div className="space-y-6">
      <div><h1 className="text-2xl font-bold text-gray-900">Audit Log</h1><p className="text-gray-600">Riwayat aktivitas sistem</p></div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Log Aktivitas</CardTitle>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Cari log..." className="pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {logs.map((log) => {
              const Icon = actionIcon[log.action] || FileText;
              return (
                <div key={log.id} className="flex items-start gap-4 p-3 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${actionColor[log.action] || "bg-gray-100 text-gray-800"}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Badge className={actionColor[log.action]}>{log.action}</Badge>
                      <span className="text-xs text-gray-500">{log.timestamp}</span>
                    </div>
                    <p className="text-sm text-gray-900 mt-1">{log.user} - {log.target}</p>
                    <p className="text-sm text-gray-600">{log.details}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
