"use client";

import Link from "next/link";
import { useState } from "react";
import {
  Menu,
  X,
  Phone,
  Mail,
  ChevronDown,
  Building2,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navigation = [
  { name: "Beranda", href: "/" },
  {
    name: "Layanan",
    href: "/layanan",
    children: [
      { name: "Diklat & Pelatihan", href: "/layanan#diklat" },
      { name: "Jasa Narasumber", href: "/layanan#narasumber" },
      { name: "Penyewaan Fasilitas", href: "/layanan#penyewaan" },
      { name: "Wisata Edukasi", href: "/layanan#wisata" },
      { name: "Sertifikasi", href: "/layanan#sertifikasi" },
    ],
  },
  { name: "Panduan", href: "/panduan" },
  { name: "Pengumuman", href: "/pengumuman" },
  { name: "FAQ", href: "/faq" },
  { name: "Kontak", href: "/kontak" },
];

export function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <div className="bg-white sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-primary-500 text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-8">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Phone className="h-3 w-3" />
                0411-556617
              </span>
              <span className="hidden sm:flex items-center gap-1">
                <Mail className="h-3 w-3" />
                bdimks.kemenperin@gmail.com
              </span>
            </div>
            <div className="flex items-center gap-4">
              <span>Sen-Kam: 07:00-16:00 | Jum: 07:30-16:30</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-500 rounded-lg flex items-center justify-center">
                <Building2 className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-primary-500 leading-tight">
                  BDI MAKASSAR
                </p>
                <p className="text-[10px] text-gray-500 leading-tight">
                  Balai Diklat Industri
                </p>
              </div>
            </Link>

            {/* Desktop navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() =>
                    item.children && setOpenDropdown(item.name)
                  }
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-primary-500 rounded-md hover:bg-gray-50"
                  >
                    {item.name}
                    {item.children && (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Link>
                  {item.children && openDropdown === item.name && (
                    <div className="absolute top-full left-0 w-56 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary-500"
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Masuk
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Daftar</Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-md text-gray-700 hover:bg-gray-100"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-4 py-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-primary-500 rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 space-y-2">
                <Link href="/login" className="block">
                  <Button variant="outline" className="w-full">
                    Masuk
                  </Button>
                </Link>
                <Link href="/register" className="block">
                  <Button className="w-full">Daftar</Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}
