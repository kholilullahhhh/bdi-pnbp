"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Avatar } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import Link from "next/link";
import { NotificationBell } from "./notification-bell";

const breadcrumbMap: Record<string, string> = {
  dashboard: "Dashboard",
  layanan: "Layanan",
  permohonan: "Permohonan",
  pembayaran: "Pembayaran",
  notifikasi: "Notifikasi",
  profil: "Profil",
  tarif: "Kelola Tarif",
  "kelola-permohonan": "Kelola Permohonan",
  "kelola-pembayaran": "Kelola Pembayaran",
  pengguna: "Pengguna",
  pengumuman: "Pengumuman",
  faq: "FAQ",
  laporan: "Laporan",
  "audit-log": "Audit Log",
  pengaturan: "Pengaturan",
};

export function DashboardHeader() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const user = session?.user;

  const segments = pathname?.split("/").filter(Boolean) || [];
  const breadcrumbs = segments.map((seg, i) => ({
    label: breadcrumbMap[seg] || seg,
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-xl border-b border-border/50">
      <div className="flex items-center justify-between h-16 px-6 lg:px-8">
        {/* Left: Breadcrumb */}
        <div className="flex items-center gap-2 min-w-0">
          <nav className="flex items-center gap-1.5 text-sm">
            {breadcrumbs.map((crumb, i) => (
              <span key={crumb.href} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-muted-foreground/50">/</span>}
                {crumb.isLast ? (
                  <span className="font-semibold text-foreground truncate">
                    {crumb.label}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="text-muted-foreground hover:text-foreground transition-colors truncate"
                  >
                    {crumb.label}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-3">
          <NotificationBell />
          <div className="w-px h-6 bg-border" />
          <div className="flex items-center gap-2.5">
            <Avatar size="sm" fallback={getInitials(user?.name || "U")} />
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-foreground leading-tight">
                {user?.name}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {(session?.user as unknown as { role: string })?.role || "USER"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
