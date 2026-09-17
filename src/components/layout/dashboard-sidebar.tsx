"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  FileText,
  CreditCard,
  Bell,
  User,
  LogOut,
  Menu,
  X,
  Building2,
  ChevronLeft,
  ChevronDown,
  Layers,
  DollarSign,
  Users,
  Megaphone,
  HelpCircle,
  BarChart3,
  ClipboardList,
  Settings,
  Shield,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserBadge } from "./user-badge";

const userItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Layanan", href: "/dashboard/layanan", icon: Layers },
  { title: "Permohonan", href: "/dashboard/permohonan", icon: FileText },
  { title: "Pembayaran", href: "/dashboard/pembayaran", icon: CreditCard },
  { title: "Notifikasi", href: "/dashboard/notifikasi", icon: Bell },
  { title: "Profil", href: "/dashboard/profil", icon: User },
];

const adminItems = [
  { title: "Kelola Layanan", href: "/dashboard/layanan", icon: Layers },
  { title: "Kelola Tarif", href: "/dashboard/tarif", icon: DollarSign },
  { title: "Kelola Permohonan", href: "/dashboard/kelola-permohonan", icon: FileText },
  { title: "Kelola Pembayaran", href: "/dashboard/kelola-pembayaran", icon: CreditCard },
  { title: "Pengguna", href: "/dashboard/pengguna", icon: Users },
  { title: "Pengumuman", href: "/dashboard/pengumuman", icon: Megaphone },
  { title: "FAQ", href: "/dashboard/faq", icon: HelpCircle },
  { title: "Laporan", href: "/dashboard/laporan", icon: BarChart3 },
  { title: "Audit Log", href: "/dashboard/audit-log", icon: ClipboardList },
  { title: "Pengaturan", href: "/dashboard/pengaturan", icon: Settings },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const userRole = (session?.user as unknown as { role: string })?.role ?? "USER";
  const isAdmin = ["ADMIN", "SUPER_ADMIN", "OPERATOR"].includes(userRole);

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminOpen, setAdminOpen] = useState(true);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/login");
    router.refresh();
  };

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-50 p-2.5 rounded-xl bg-white shadow-lg border border-border/50 text-muted-foreground hover:text-foreground transition-all"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Tutup sidebar" : "Buka sidebar"}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-gradient-to-b from-slate-900 to-slate-800 border-r border-white/10 transition-all duration-300 flex flex-col",
          collapsed ? "w-[72px]" : "w-64",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Logo header */}
        <div
          className={cn(
            "flex items-center border-b border-white/10 transition-all",
            collapsed ? "justify-center p-4" : "justify-between px-5 py-5"
          )}
        >
          {!collapsed && (
            <Link href="/dashboard" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold text-white leading-tight">
                  BDI Makassar
                </p>
                <p className="text-[10px] text-slate-400 font-medium leading-tight">
                  Sistem PNBP
                </p>
              </div>
            </Link>
          )}
          {collapsed && (
            <Link href="/dashboard" className="p-1">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25">
                <Building2 className="h-5 w-5 text-white" />
              </div>
            </Link>
          )}
          <button
            type="button"
            className="hidden lg:flex p-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
          >
            <ChevronLeft
              className={cn(
                "h-4 w-4 transition-transform duration-300",
                collapsed && "rotate-180"
              )}
            />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto" aria-label="Navigasi dashboard">
          {/* User menu */}
          <div>
            {!collapsed && (
              <p className="px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                Menu Utama
              </p>
            )}
            <div className="space-y-0.5">
              {userItems.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href !== "/dashboard" &&
                    pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                      active
                        ? "bg-white/10 text-white shadow-sm"
                        : "text-slate-400 hover:bg-white/5 hover:text-slate-200",
                      collapsed && "justify-center px-2"
                    )}
                    aria-current={active ? "page" : undefined}
                    onClick={() => setMobileOpen(false)}
                    title={collapsed ? item.title : undefined}
                  >
                    <div className={cn(
                      "flex-shrink-0 transition-colors",
                      active && "text-blue-400"
                    )}>
                      <item.icon className="h-[18px] w-[18px]" />
                    </div>
                    {!collapsed && <span>{item.title}</span>}
                    {active && !collapsed && (
                      <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Admin menu */}
          {isAdmin && (
            <div className="pt-2">
              {!collapsed && (
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-3 mb-2 text-[10px] font-semibold uppercase tracking-widest text-slate-500 hover:text-slate-400 transition-colors"
                  onClick={() => setAdminOpen(!adminOpen)}
                >
                  <span className="flex items-center gap-1.5">
                    <Shield className="h-3 w-3" /> Admin
                  </span>
                  <ChevronDown className={cn(
                    "h-3 w-3 transition-transform duration-200",
                    !adminOpen && "-rotate-90"
                  )} />
                </button>
              )}
              {(!adminOpen && !collapsed) ? null : (
                <div className="space-y-0.5">
                  {adminItems.map((item) => {
                    const active =
                      pathname === item.href ||
                      pathname?.startsWith(item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                          active
                            ? "bg-white/10 text-white shadow-sm"
                            : "text-slate-400 hover:bg-white/5 hover:text-slate-200",
                          collapsed && "justify-center px-2"
                        )}
                        aria-current={active ? "page" : undefined}
                        onClick={() => setMobileOpen(false)}
                        title={collapsed ? item.title : undefined}
                      >
                        <div className={cn(
                          "flex-shrink-0 transition-colors",
                          active && "text-blue-400"
                        )}>
                          <item.icon className="h-[18px] w-[18px]" />
                        </div>
                        {!collapsed && <span>{item.title}</span>}
                        {active && !collapsed && (
                          <div className="ml-auto w-1.5 h-1.5 rounded-full bg-blue-400" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </nav>

        {/* User & logout */}
        <div className="p-3 border-t border-white/10 space-y-1">
          {!collapsed && (
            <UserBadge />
          )}
          <button
            type="button"
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-all w-full text-left",
              collapsed && "justify-center px-2"
            )}
            title={collapsed ? "Keluar" : undefined}
          >
            <LogOut className="h-[18px] w-[18px] flex-shrink-0" />
            {!collapsed && <span>Keluar</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
