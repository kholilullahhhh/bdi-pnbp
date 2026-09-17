"use client";

import { Bell, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";

const notifications: {
  id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  date: string;
}[] = [];

const typeConfig: Record<
  string,
  { icon: typeof Info; color: string; bg: string }
> = {
  INFO: { icon: Info, color: "text-primary-700", bg: "bg-primary-50" },
  WARNING: {
    icon: AlertTriangle,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  SUCCESS: {
    icon: CheckCircle2,
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
};

export default function NotifikasiPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifikasi</h1>
          <p className="text-muted-foreground mt-1">
            Pemberitahuan terkini untuk Anda
          </p>
        </div>
        <Button variant="outline" size="sm">
          Tandai Semua Dibaca
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {notifications.length === 0 ? (
            <EmptyState
              icon={<Bell className="h-8 w-8" />}
              title="Belum ada notifikasi"
              description="Pemberitahuan penting akan muncul di sini."
            />
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((n) => {
                const config = typeConfig[n.type] || typeConfig.INFO;
                const Icon = config.icon;
                return (
                  <div
                    key={n.id}
                    className={`p-4 flex items-start gap-4 transition-colors ${
                      !n.read ? "bg-primary-50/30" : "hover:bg-surface-alt/50"
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${config.bg}`}
                    >
                      <Icon className={`h-4 w-4 ${config.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <p className="font-medium text-foreground text-sm">
                          {n.title}
                        </p>
                        <span className="text-xs text-muted-foreground whitespace-nowrap">
                          {new Date(n.date).toLocaleDateString("id-ID")}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                        {n.message}
                      </p>
                    </div>
                    {!n.read && (
                      <div className="w-2 h-2 bg-primary-500 rounded-full flex-shrink-0 mt-2" />
                    )}
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
