"use client";

import { Bell, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const notifications = [
  { id: "1", title: "Selamat Datang", message: "Selamat datang di Sistem Informasi PNBP BDI Makassar.", type: "INFO", read: true, date: "2026-09-17" },
];

const typeIcon = { INFO: Info, WARNING: AlertTriangle, SUCCESS: CheckCircle2 };
const typeColor = { INFO: "text-blue-600 bg-blue-50", WARNING: "text-yellow-600 bg-yellow-50", SUCCESS: "text-green-600 bg-green-50" };

export default function NotifikasiPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h1 className="text-2xl font-bold text-gray-900">Notifikasi</h1><p className="text-gray-600">Pemberitahuan terkini</p></div>
        <Button variant="outline" size="sm">Tandai Semua Dibaca</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {notifications.length === 0 ? (
            <div className="py-12 text-center text-gray-500"><Bell className="h-12 w-12 text-gray-300 mx-auto mb-4" />Belum ada notifikasi</div>
          ) : (
            <div className="divide-y divide-gray-100">
              {notifications.map((n) => {
                const Icon = typeIcon[n.type as keyof typeof typeIcon] || Info;
                const color = typeColor[n.type as keyof typeof typeColor] || typeColor.INFO;
                return (
                  <div key={n.id} className={`p-4 flex items-start gap-4 ${!n.read ? "bg-blue-50/50" : ""}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}><Icon className="h-4 w-4" /></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between"><p className="font-medium text-gray-900">{n.title}</p><span className="text-xs text-gray-500">{new Date(n.date).toLocaleDateString("id-ID")}</span></div>
                      <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
