"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { signOut } from "next-auth/react";
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
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { UserBadge } from "./user-badge";

const items = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Layanan", href: "/dashboard/layanan", icon: Layers },
  { title: "Permohonan", href: "/dashboard/permohonan", icon: FileText },
  { title: "Pembayaran", href: "/dashboard/pembayaran", icon: CreditCard },
  { title: "Notifikasi", href: "/dashboard/notifikasi", icon: Bell },
  { title: "Profil", href: "/dashboard/profil", icon: User },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-md border border-border text-muted-foreground hover:text-foreground transition-colors"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Tutup sidebar" : "Buka sidebar"}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/40 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-white border-r border-border transition-all duration-300",
          collapsed ? "w-[68px]" : "w-64",
          mobileOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo header */}
          <div
            className={cn(
              "flex items-center border-b border-border transition-all",
              collapsed ? "justify-center p-3" : "justify-between p-4"
            )}
          >
            {!collapsed && (
              <Link href="/dashboard" className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-primary-800 rounded-lg flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary-800 leading-tight">
                    BDI
                  </p>
                  <p className="text-[10px] text-muted-foreground leading-tight">
                    Dashboard
                  </p>
                </div>
              </Link>
            )}
            {collapsed && (
              <Link href="/dashboard" className="p-1">
                <div className="w-8 h-8 bg-primary-800 rounded-lg flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
              </Link>
            )}
            <button
              type="button"
              className="hidden lg:flex p-1 rounded-md hover:bg-surface-alt transition-colors text-muted-foreground"
              onClick={() => setCollapsed(!collapsed)}
              aria-label={collapsed ? "Perluas sidebar" : "Ciutkan sidebar"}
            >
              <ChevronLeft
                className={cn(
                  "h-4 w-4 transition-transform",
                  collapsed && "rotate-180"
                )}
              />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-2.5 space-y-0.5 overflow-y-auto" aria-label="Navigasi dashboard">
            {items.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/dashboard" &&
                  pathname?.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    active
                      ? "bg-primary-50 text-primary-700"
                      : "text-muted-foreground hover:bg-surface-alt hover:text-foreground",
                    collapsed && "justify-center px-2"
                  )}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                  title={collapsed ? item.title : undefined}
                >
                  <item.icon className="h-[18px] w-[18px] flex-shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              );
            })}
          </nav>

          {/* User & logout */}
          <div className="p-2.5 border-t border-border space-y-1">
            {!collapsed && (
              <UserBadge />
            )}
            <button
              type="button"
              onClick={handleLogout}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive-light hover:text-red-700 transition-colors w-full text-left",
                collapsed && "justify-center px-2"
              )}
              title={collapsed ? "Keluar" : undefined}
            >
              <LogOut className="h-[18px] w-[18px] flex-shrink-0" />
              {!collapsed && <span>Keluar</span>}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
