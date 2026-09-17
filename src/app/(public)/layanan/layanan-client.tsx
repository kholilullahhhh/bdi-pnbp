"use client";

import Link from "next/link";
import {
  GraduationCap,
  Users,
  Home,
  Compass,
  Award,
  ArrowRight,
  CheckCircle2,
  Info,
  Search,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { formatCurrency } from "@/lib/utils";

const iconMap: Record<string, typeof GraduationCap> = {
  GraduationCap,
  Users,
  Home,
  Compass,
  Award,
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ServiceCard({ service }: { service: any }) {
  const Icon = iconMap[service.category?.icon] || GraduationCap;
  const latestTariff = service.tariffs?.[0];

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow border-border/60">
      <CardContent className="p-0">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-0">
          <div className="p-6 lg:p-8">
            <div className="flex items-start gap-4 mb-5">
              <div className="w-12 h-12 bg-gradient-to-br from-primary-700 to-primary-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <Icon className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl font-bold text-foreground">
                    {service.name}
                  </h2>
                  <Badge variant="success" className="text-[10px]">
                    Tersedia
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {service.category?.name || "Layanan"}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {service.description}
            </p>
            {service.targetUser && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">
                  Target Pengguna
                </p>
                <p className="text-sm text-foreground">{service.targetUser}</p>
              </div>
            )}
            {latestTariff && (
              <div className="bg-info-light border border-primary-200 rounded-lg p-3 flex items-center gap-2">
                <Info className="h-4 w-4 text-primary-700 flex-shrink-0" />
                <span className="text-sm font-medium text-primary-800">
                  Tarif: {formatCurrency(Number(latestTariff.price))} / {latestTariff.unit}
                </span>
              </div>
            )}
          </div>
          <div className="bg-primary-50/50 p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-border">
            <h3 className="text-sm font-semibold text-primary-800 uppercase tracking-wider mb-3">
              Detail Layanan
            </h3>
            {service.requirements && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Persyaratan</p>
                <p className="text-sm text-muted-foreground line-clamp-3">{service.requirements}</p>
              </div>
            )}
            {service.estimationTime && (
              <div className="mb-4">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Estimasi Waktu</p>
                <p className="text-sm text-muted-foreground">{service.estimationTime}</p>
              </div>
            )}
            <div className="flex flex-col gap-2 mt-6">
              <Link href={`/layanan/${service.slug}`}>
                <Button variant="outline" className="w-full">
                  Lihat Detail
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href={`/layanan/${service.slug}/ajukan`}>
                <Button className="w-full shadow-md hover:shadow-lg transition-shadow">
                  Ajukan Sekarang
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const skema = [
  "Operator Mesin Pengolahan Kakao",
  "Operator Mesin Pengolahan Rumput Laut",
  "Pengolahan Ikan Tuna Segar Beku",
  "Pembuatan Desain Kemasan Produk Pangan",
  "Pembuatan Aneka Olahan Berbasis Cokelat",
  "Pembuatan Aneka Olahan Berbasis Rumput Laut",
  "Pembuatan Aneka Olahan Berbasis Ikan",
  "Pengolahan dan Penyajian Kopi (Barista)",
  "Penyelia Halal",
  "Penyulingan Minyak Atsiri",
  "Pengalengan Ikan Tuna",
  "Pengolahan Makanan",
  "Penyangraian Kopi Biji",
  "Pengujian Citarasa Kopi",
  "Pemprosesan Makanan Kering",
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function LayananClient({ services }: { services: any[] }) {
  const [search, setSearch] = useState("");

  const filtered = services.filter(
    (s) =>
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.category?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        {/* Header */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 py-16 lg:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-white/10 text-primary-100 hover:bg-white/20 backdrop-blur-md border-white/20 mb-4">
              Layanan PNBP
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Layanan PNBP BDI Makassar
            </h1>
            <p className="mt-4 text-lg text-primary-200/80 max-w-2xl mx-auto">
              Pelayanan Penerimaan Negara Bukan Pajak untuk pengembangan SDM
              industri
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
            <svg className="relative block w-full h-8 sm:h-12 text-background" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
              <path d="M0,0 C150,90 350,-40 500,65 C650,170 900,10 1200,40 L1200,120 L0,120 Z"></path>
            </svg>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {/* Search */}
            <div className="max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Cari layanan..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">
                  {services.length === 0
                    ? "Belum ada layanan yang tersedia"
                    : "Tidak ada layanan yang cocok dengan pencarian Anda"}
                </p>
              </div>
            ) : (
              filtered.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))
            )}
          </div>
        </section>

        {/* Skema Sertifikasi */}
        <section className="py-16 lg:py-24 bg-primary-950 text-white" id="sertifikasi">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge className="bg-white/10 text-primary-100 border-white/20 mb-4">
                Sertifikasi
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                Skema Sertifikasi LSP BDI Makassar
              </h2>
              <p className="mt-4 text-lg text-primary-200/80 max-w-2xl mx-auto">
                15 skema sertifikasi kompetensi yang diakui BNSP
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
              {skema.map((s, i) => (
                <div
                  key={s}
                  className="flex items-start gap-3 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 hover:border-white/30 hover:bg-white/15 transition-all"
                >
                  <span className="w-6 h-6 bg-primary-500/30 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-primary-100 leading-snug">
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Tarif */}
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-primary-200 shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-9 h-9 bg-primary-100 rounded-xl flex items-center justify-center">
                    <Info className="h-4.5 w-4.5 text-primary-700" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Informasi Tarif PNBP</h3>
                </div>
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    Tarif layanan PNBP ditetapkan berdasarkan:
                  </p>
                  <ul className="space-y-3 text-sm text-muted-foreground">
                    {[
                      "PP 54/2021 tentang Jenis dan Tarif PNBP Kementerian Perindustrian",
                      "Permenperin 19/2021 tentang Tarif Tertentu PNBP",
                      "PMK terkait tarif layanan BLU Kementerian Perindustrian",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2.5">
                        <CheckCircle2 className="h-4 w-4 text-primary-600 mt-0.5 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
                    <p className="text-sm text-primary-800">
                      <strong>Catatan:</strong> Tarif merupakan batas tertinggi.
                      Tarif aktual dapat berbeda sesuai ketentuan BDI Makassar.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
