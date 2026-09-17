"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, FileText, CreditCard, Bell, User, LogOut, Menu, X, Building2, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Permohonan", href: "/dashboard/permohonan", icon: FileText },
  { title: "Pembayaran", href: "/dashboard/pembayaran", icon: CreditCard },
  { title: "Notifikasi", href: "/dashboard/notifikasi", icon: Bell },
  { title: "Profil", href: "/dashboard/profil", icon: User },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button type="button" className="lg:hidden fixed top-20 left-4 z-40 p-2 rounded-md bg-white shadow-md border border-gray-200" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {mobileOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-30" onClick={() => setMobileOpen(false)} />}

      <aside className={cn("fixed left-0 top-0 z-40 h-screen bg-white border-r border-gray-200 transition-all duration-300", collapsed ? "w-16" : "w-64", mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0")}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            {!collapsed && (
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center"><Building2 className="h-5 w-5 text-white" /></div>
                <div><p className="text-sm font-bold text-blue-800">BDI</p><p className="text-[10px] text-gray-500">Dashboard</p></div>
              </Link>
            )}
            <button type="button" className="hidden lg:flex p-1 rounded-md hover:bg-gray-100" onClick={() => setCollapsed(!collapsed)}>
              <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
            </button>
          </div>

          <nav className="flex-1 p-2 space-y-1">
            {items.map((item) => {
              const active = pathname === item.href || (item.href !== "/dashboard" && pathname?.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors", active ? "bg-blue-50 text-blue-700" : "text-gray-700 hover:bg-gray-50", collapsed && "justify-center px-2")} onClick={() => setMobileOpen(false)}>
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="p-2 border-t border-gray-200">
            <Link href="/" className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50", collapsed && "justify-center px-2")} onClick={() => setMobileOpen(false)}>
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>Kembali</span>}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
