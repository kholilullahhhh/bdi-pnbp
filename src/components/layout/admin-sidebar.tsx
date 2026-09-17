"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LayoutDashboard,
  Layers,
  FileText,
  CreditCard,
  Users,
  Megaphone,
  HelpCircle,
  BarChart3,
  ClipboardList,
  Settings,
  LogOut,
  Menu,
  X,
  Building2,
  ChevronLeft,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar } from "@/components/ui/avatar";

const navSections = [
  {
    label: "Menu",
    items: [
      { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
    ],
  },
  {
    label: "Manajemen",
    items: [
      { title: "Layanan", href: "/admin/layanan", icon: Layers },
      { title: "Tarif", href: "/admin/tarif", icon: DollarSign },
      { title: "Permohonan", href: "/admin/permohonan", icon: FileText },
      { title: "Pembayaran", href: "/admin/pembayaran", icon: CreditCard },
    ],
  },
  {
    label: "Sistem",
    items: [
      { title: "Pengguna", href: "/admin/pengguna", icon: Users },
      { title: "Pengumuman", href: "/admin/pengumuman", icon: Megaphone },
      { title: "FAQ", href: "/admin/faq", icon: HelpCircle },
      { title: "Laporan", href: "/admin/laporan", icon: BarChart3 },
      { title: "Audit Log", href: "/admin/audit-log", icon: ClipboardList },
      { title: "Pengaturan", href: "/admin/pengaturan", icon: Settings },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Mobile hamburger */}
      <button
        type="button"
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-primary-900 text-white shadow-md"
        onClick={() => setMobileOpen(!mobileOpen)}
        aria-label={mobileOpen ? "Tutup sidebar" : "Buka sidebar"}
      >
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Backdrop */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen bg-primary-950 text-primary-200 transition-all duration-300",
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
              "flex items-center border-b border-primary-800 transition-all",
              collapsed ? "justify-center p-3" : "justify-between p-4"
            )}
          >
            {!collapsed && (
              <Link href="/admin" className="flex items-center gap-2.5">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-bold text-white leading-tight">
                    Admin Panel
                  </p>
                  <p className="text-[10px] text-primary-400 leading-tight">
                    PNBP BDI
                  </p>
                </div>
              </Link>
            )}
            {collapsed && (
              <Link href="/admin" className="p-1">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Building2 className="h-4 w-4 text-white" />
                </div>
              </Link>
            )}
            <button
              type="button"
              className="hidden lg:flex p-1 rounded-md hover:bg-primary-800 transition-colors text-primary-400"
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
          <nav className="flex-1 p-2.5 space-y-4 overflow-y-auto" aria-label="Navigasi admin">
            {navSections.map((section) => (
              <div key={section.label}>
                {!collapsed && (
                  <p className="px-3 mb-1.5 text-[10px] font-semibold uppercase tracking-widest text-primary-500">
                    {section.label}
                  </p>
                )}
                <div className="space-y-0.5">
                  {section.items.map((item) => {
                    const active =
                      pathname === item.href ||
                      (item.href !== "/admin" &&
                        pathname?.startsWith(item.href));
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(
                          "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                          active
                            ? "bg-primary-700 text-white"
                            : "text-primary-300 hover:bg-primary-800/50 hover:text-white",
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
                </div>
              </div>
            ))}
          </nav>

          {/* User & logout */}
          <div className="p-2.5 border-t border-primary-800 space-y-1">
            {!collapsed && (
              <div className="px-3 py-2 flex items-center gap-2.5">
                <Avatar size="sm" fallback="A" className="bg-primary-700" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-medium text-white truncate">
                    Admin
                  </p>
                  <p className="text-[10px] text-primary-400 truncate">
                    admin@bdi-makassar.go.id
                  </p>
                </div>
              </div>
            )}
            <Link
              href="/"
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-primary-300 hover:bg-red-500/10 hover:text-red-400 transition-colors",
                collapsed && "justify-center px-2"
              )}
              onClick={() => setMobileOpen(false)}
              title={collapsed ? "Keluar" : undefined}
            >
              <LogOut className="h-[18px] w-[18px] flex-shrink-0" />
              {!collapsed && <span>Keluar</span>}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
