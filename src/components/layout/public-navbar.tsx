"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Building2, ExternalLink, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Beranda", href: "/" },
  { name: "Layanan", href: "/layanan" },
  { name: "Panduan", href: "/panduan" },
  { name: "FAQ", href: "/faq" },
  { name: "Kontak", href: "/kontak" },
];

export function PublicNavbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-slate-950/90 backdrop-blur-md shadow-xl border-b border-slate-800/80"
          : "bg-slate-950 border-b border-slate-900"
      )}
    >
      {/* Top Bar (Official Agency Info) */}
      <div className="hidden lg:block bg-slate-950 text-slate-400 text-xs border-b border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-medium text-slate-300">
              Kementerian Perindustrian RI — Balai Diklat Industri Makassar
            </span>
          </div>
          <div className="flex items-center gap-5 font-medium">
            <a
              href="https://sidia.kemenperin.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors inline-flex items-center gap-1"
            >
              SIDIA
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
            <a
              href="https://kemenperin.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors inline-flex items-center gap-1"
            >
              Kemenperin
              <ExternalLink className="h-3 w-3 opacity-60" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav aria-label="Navigasi utama" className="text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            
            {/* Brand Logo */}
            <Link href="/" className="flex items-center gap-3.5 group shrink-0">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/30 group-hover:bg-primary-500 transition-all duration-300 border border-primary-500/30">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-white leading-none tracking-tight">
                  BDI MAKASSAR
                </p>
                <p className="text-[11px] font-medium text-slate-400 mt-1">
                  Layanan PNBP Resmi
                </p>
              </div>
            </Link>

            {/* Desktop Navigation (Pill Pill Style) */}
            <div className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-200",
                      active
                        ? "bg-primary-600 text-white shadow-md shadow-primary-600/40"
                        : "text-slate-300 hover:text-white hover:bg-white/10"
                    )}
                    aria-current={active ? "page" : undefined}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/login">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 rounded-xl px-4"
                >
                  <LogIn className="mr-1.5 h-3.5 w-3.5 text-slate-400" />
                  Masuk
                </Button>
              </Link>
              <Link href="/register">
                <Button
                  size="sm"
                  className="h-10 text-xs font-bold bg-primary-600 text-white hover:bg-primary-500 shadow-lg shadow-primary-600/30 rounded-xl px-5 transition-all hover:shadow-primary-600/50"
                >
                  Daftar Akun
                </Button>
              </Link>
            </div>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              className="lg:hidden p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Tutup menu" : "Buka menu"}
            >
              {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t border-slate-800 bg-slate-950/98 backdrop-blur-xl",
            open ? "max-h-[450px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
          )}
        >
          <div className="px-4 space-y-1">
            {navItems.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 text-sm font-bold rounded-xl transition-all",
                    active
                      ? "text-white bg-primary-600/90 shadow-md shadow-primary-600/30"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  )}
                  aria-current={active ? "page" : undefined}
                >
                  {item.name}
                </Link>
              );
            })}

            <div className="pt-4 pb-2 space-y-2.5 border-t border-slate-800 mt-3 px-1">
              <Link href="/login" className="block w-full">
                <Button
                  variant="outline"
                  className="w-full h-11 text-xs font-bold rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10"
                >
                  Masuk
                </Button>
              </Link>
              <Link href="/register" className="block w-full">
                <Button className="w-full h-11 text-xs font-bold bg-primary-600 hover:bg-primary-500 text-white rounded-xl shadow-lg shadow-primary-600/30">
                  Daftar Akun
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}