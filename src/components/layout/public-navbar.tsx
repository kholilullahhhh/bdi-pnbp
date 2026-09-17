"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X, Building2 } from "lucide-react";
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
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname?.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-200",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-white border-b border-border"
      )}
    >
      {/* Top bar */}
      <div className="hidden lg:block bg-primary-900 text-white/80 text-xs">
        <div className="max-w-7xl mx-auto px-4 h-8 flex items-center justify-between">
          <span>Kementerian Perindustrian RI — Balai Diklat Industri Makassar</span>
          <div className="flex items-center gap-4">
            <a href="https://sidia.kemenperin.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">SIDIA</a>
            <a href="https://kemenperin.go.id" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Kemenperin</a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="bg-white" aria-label="Navigasi utama">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <div className="w-10 h-10 bg-primary-800 rounded-xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <Building2 className="h-5 w-5 text-white" />
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-bold text-primary-800 leading-tight tracking-tight">
                  BDI MAKASSAR
                </p>
                <p className="text-[11px] text-muted-foreground leading-tight">
                  Balai Diklat Industri
                </p>
              </div>
            </Link>

            {/* Desktop nav */}
            <div className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "px-3.5 py-2 text-sm font-medium rounded-lg transition-colors relative",
                    isActive(item.href)
                      ? "text-primary-700 bg-primary-50"
                      : "text-muted-foreground hover:text-foreground hover:bg-surface-alt"
                  )}
                  aria-current={isActive(item.href) ? "page" : undefined}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Masuk
                </Button>
              </Link>
              <Link href="/register">
                <Button size="sm">Daftar</Button>
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              className="lg:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface-alt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Tutup menu" : "Buka menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300 ease-in-out",
            open ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"
          )}
        >
          <div className="border-t border-border bg-white px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  isActive(item.href)
                    ? "text-primary-700 bg-primary-50"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface-alt"
                )}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 pb-2 space-y-2 border-t border-border mt-2">
              <Link href="/login">
                <Button variant="outline" className="w-full">
                  Masuk
                </Button>
              </Link>
              <Link href="/register">
                <Button className="w-full">Daftar</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
