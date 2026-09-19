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
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll(); // sinkronkan saat mount (mis. reload di tengah halaman)
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Tutup mobile menu otomatis ketika route berubah
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-[background-color,backdrop-filter,box-shadow,border-color] duration-500 ease-out",
        scrolled
          ? // ── Setelah scroll: lebih transparan + blur + border halus ──
            "bg-slate-950/55 backdrop-blur-xl backdrop-saturate-150 border-b border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.12)]"
          : // ── Di atas halaman: solid, tegas, institusional ──
            "bg-slate-950 border-b border-slate-900"
      )}
    >
      {/* ── Top Bar (Official Agency Info) ── */}
      <div
        className={cn(
          "hidden lg:block bg-slate-950 text-slate-400 text-xs border-b border-slate-900 overflow-hidden transition-all duration-500 ease-out",
          scrolled ? "max-h-0 opacity-0 border-transparent" : "max-h-8 opacity-100"
        )}
      >
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
              <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
            </a>
            <a
              href="https://kemenperin.go.id"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors inline-flex items-center gap-1"
            >
              Kemenperin
              <ExternalLink className="h-3 w-3 opacity-60" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/* ── Main Navigation ── */}
      <nav
        aria-label="Navigasi utama"
        className={cn(
          "text-white transition-[background-color,backdrop-filter] duration-500 ease-out",
          scrolled ? "bg-transparent" : "bg-slate-950"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={cn(
              "flex items-center justify-between transition-[height] duration-500 ease-out",
              scrolled ? "h-16" : "h-16 sm:h-20"
            )}
          >
            {/* Brand Logo */}
            <Link
              href="/"
              className="flex items-center gap-3.5 group shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 rounded-xl"
            >
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/30 group-hover:bg-primary-500 transition-all duration-300 border border-primary-500/30">
                <Building2 className="h-5 w-5 text-white" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-extrabold text-white leading-none tracking-tight">
                  BDI MAKASSAR
                </p>
                <p
                  className={cn(
                    "text-[11px] font-medium text-slate-400 mt-1 transition-opacity duration-300",
                    scrolled ? "opacity-70" : "opacity-100"
                  )}
                >
                  Layanan PNBP Resmi
                </p>
              </div>
            </Link>

            {/* Desktop Navigation (Pill Style) */}
            <div
              className={cn(
                "hidden lg:flex items-center gap-1 p-1.5 rounded-full border transition-all duration-500",
                scrolled
                  ? "bg-white/[0.06] border-white/10 backdrop-blur-md"
                  : "bg-white/5 border-white/10 backdrop-blur-md"
              )}
            >
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
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="h-10 text-xs font-bold text-slate-300 hover:text-white hover:bg-white/10 rounded-xl px-4"
              >
                <Link href="/login">
                  <LogIn
                    className="mr-1.5 h-3.5 w-3.5 text-slate-400"
                    aria-hidden="true"
                  />
                  Masuk
                </Link>
              </Button>

              <Button
                asChild
                size="sm"
                className="h-10 text-xs font-bold bg-primary-600 text-white hover:bg-primary-500 shadow-lg shadow-primary-600/30 rounded-xl px-5 transition-all hover:shadow-primary-600/50"
              >
                <Link href="/register">Daftar Akun</Link>
              </Button>
            </div>

            {/* Mobile Toggle Button */}
            <button
              type="button"
              className="lg:hidden p-2.5 rounded-xl text-slate-300 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Tutup menu" : "Buka menu"}
            >
              {open ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out border-t",
            scrolled
              ? "bg-slate-950/85 backdrop-blur-xl border-white/10"
              : "bg-slate-950/98 backdrop-blur-xl border-slate-800",
            open ? "max-h-[480px] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
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
              <Button
                asChild
                variant="outline"
                className="w-full h-11 text-xs font-bold rounded-xl border-white/15 bg-white/5 text-white hover:bg-white/10"
              >
                <Link href="/login">Masuk</Link>
              </Button>

              <Button
                asChild
                className="w-full h-11 text-xs font-bold bg-primary-600 hover:bg-primary-500 text-white rounded-xl shadow-lg shadow-primary-600/30"
              >
                <Link href="/register">Daftar Akun</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}