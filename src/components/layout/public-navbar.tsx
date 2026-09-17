"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Phone, Mail, ChevronDown, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Layanan", href: "/layanan" },
  { name: "Panduan", href: "/panduan" },
  { name: "FAQ", href: "/faq" },
  { name: "Kontak", href: "/kontak" },
];

export function PublicNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sticky top-0 z-50 bg-white">
      {/* Top bar */}
      <div className="bg-blue-800 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-8">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" />0411-556617</span>
            <span className="hidden sm:flex items-center gap-1"><Mail className="h-3 w-3" />bdimks.kemenperin@gmail.com</span>
          </div>
          <span className="hidden md:block">Sen-Kam: 07:00-16:00 | Jum: 07:30-16:30</span>
        </div>
      </div>

      {/* Main nav */}
      <nav className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center">
              <Building2 className="h-6 w-6 text-white" />
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold text-blue-800 leading-tight">BDI MAKASSAR</p>
              <p className="text-[10px] text-gray-500 leading-tight">Balai Diklat Industri</p>
            </div>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 rounded-md hover:bg-gray-50">
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login"><Button variant="outline" size="sm">Masuk</Button></Link>
            <Link href="/register"><Button size="sm">Daftar</Button></Link>
          </div>

          <button type="button" className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100" onClick={() => setOpen(!open)}>
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="lg:hidden border-t border-gray-200 px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link key={item.name} href={item.href} className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-md" onClick={() => setOpen(false)}>
                {item.name}
              </Link>
            ))}
            <div className="pt-4 space-y-2">
              <Link href="/login" className="block"><Button variant="outline" className="w-full">Masuk</Button></Link>
              <Link href="/register" className="block"><Button className="w-full">Daftar</Button></Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
