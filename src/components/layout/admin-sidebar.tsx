"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, Layers, FileText, CreditCard, Users, Megaphone, HelpCircle, BarChart3, ClipboardList, Settings, LogOut, Menu, X, Building2, ChevronLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { title: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { title: "Layanan", href: "/admin/layanan", icon: Layers },
  { title: "Tarif", href: "/admin/tarif", icon: Layers },
  { title: "Permohonan", href: "/admin/permohonan", icon: FileText },
  { title: "Pembayaran", href: "/admin/pembayaran", icon: CreditCard },
  { title: "Pengguna", href: "/admin/pengguna", icon: Users },
  { title: "Pengumuman", href: "/admin/pengumuman", icon: Megaphone },
  { title: "FAQ", href: "/admin/faq", icon: HelpCircle },
  { title: "Laporan", href: "/admin/laporan", icon: BarChart3 },
  { title: "Audit Log", href: "/admin/audit-log", icon: ClipboardList },
  { title: "Pengaturan", href: "/admin/pengaturan", icon: Settings },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <button type="button" className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-900 text-white shadow-md" onClick={() => setMobileOpen(!mobileOpen)}>
        {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {mobileOpen && <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setMobileOpen(false)} />}

      <aside className={cn("fixed left-0 top-0 z-40 h-screen bg-gray-900 text-white transition-all duration-300", collapsed ? "w-16" : "w-64", mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0")}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-800">
            {!collapsed && (
              <Link href="/admin" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"><Building2 className="h-5 w-5 text-white" /></div>
                <div><p className="text-sm font-bold">Admin Panel</p><p className="text-[10px] text-gray-400">PNBP BDI</p></div>
              </Link>
            )}
            <button type="button" className="hidden lg:flex p-1 rounded-md hover:bg-gray-800" onClick={() => setCollapsed(!collapsed)}>
              <ChevronLeft className={cn("h-4 w-4 transition-transform", collapsed && "rotate-180")} />
            </button>
          </div>

          <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
            {items.map((item) => {
              const active = pathname === item.href || (item.href !== "/admin" && pathname?.startsWith(item.href));
              return (
                <Link key={item.href} href={item.href} className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors", active ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-800 hover:text-white", collapsed && "justify-center px-2")} onClick={() => setMobileOpen(false)}>
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span>{item.title}</span>}
                </Link>
              );
            })}
          </nav>

          <div className="p-2 border-t border-gray-800">
            <Link href="/" className={cn("flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white", collapsed && "justify-center px-2")}>
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>Kembali</span>}
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
