import { Bell, CheckCircle2, Info, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { formatDateTime } from "@/lib/utils";

const typeConfig: Record<string, { icon: typeof Info; color: string; bg: string; ring: string }> = {
  info: { icon: Info, color: "text-blue-600", bg: "bg-blue-50", ring: "ring-blue-100" },
  warning: { icon: AlertTriangle, color: "text-amber-600", bg: "bg-amber-50", ring: "ring-amber-100" },
  success: { icon: CheckCircle2, color: "text-emerald-600", bg: "bg-emerald-50", ring: "ring-emerald-100" },
};

export default async function NotifikasiPage() {
  const session = await auth();
  const userId = (session?.user as unknown as { id: string })?.id;
  if (!userId) return null;

  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Notifikasi</h1>
          <p className="text-muted-foreground mt-1">Pemberitahuan terkini untuk Anda</p>
        </div>
        <Button variant="outline" size="sm">
          <CheckCircle2 className="mr-1.5 h-4 w-4" />
          Tandai Semua Dibaca
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden">
        {notifications.length === 0 ? (
          <EmptyState icon={<Bell className="h-8 w-8" />} title="Belum ada notifikasi"
            description="Pemberitahuan penting akan muncul di sini." />
        ) : (
          <div className="divide-y divide-border/60">
            {notifications.map((n) => {
              const config = typeConfig[n.type] || typeConfig.info;
              const Icon = config.icon;
              return (
                <div key={n.id} className={`p-4 flex items-start gap-4 transition-all duration-200 ${
                  !n.isRead ? "bg-primary-50/30 hover:bg-primary-50/50" : "hover:bg-surface-alt/50"}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ring-4 ${config.ring} ${config.bg}`}>
                    <Icon className={`h-5 w-5 ${config.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <p className="font-semibold text-foreground text-sm">{n.title}</p>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{formatDateTime(n.createdAt)}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{n.message}</p>
                  </div>
                  {!n.isRead && (
                    <div className="w-2.5 h-2.5 bg-primary-500 rounded-full flex-shrink-0 mt-1.5 ring-4 ring-primary-100" />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
