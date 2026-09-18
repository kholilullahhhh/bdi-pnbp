"use client";

import Link from "next/link";
import {
  ArrowRight,
  GraduationCap,
  Users,
  Home,
  Compass,
  Search,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { PageHero } from "@/components/landing/page-hero";
import { formatCurrency } from "@/lib/utils";
import { getServiceImage } from "@/lib/service-images";

const iconMap: Record<string, typeof GraduationCap> = {
  GraduationCap,
  Users,
  Home,
  Compass,
};

const serviceGradients: Record<string, string> = {
  "diklat-pelatihan": "from-blue-600 to-blue-800",
  "jasa-narasumber": "from-emerald-600 to-emerald-800",
  "penyewaan-fasilitas": "from-amber-600 to-amber-800",
  "wisata-edukasi": "from-violet-600 to-violet-800",
  "pelatihan-penyelia-halal": "from-blue-600 to-blue-800",
  "pandu-kakao": "from-amber-700 to-orange-800",
  "jasa-narasumber-teknis": "from-emerald-600 to-emerald-800",
  "sewa-aula": "from-indigo-600 to-indigo-800",
  "wisata-edukasi-cokelat": "from-violet-600 to-fuchsia-700",
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ServiceCard({ service }: { service: any }) {
  const Icon = iconMap[service.category?.icon] || GraduationCap;
  const latestTariff = service.tariffs?.[0];
  const imgSrc = getServiceImage(service);
  const gradient = serviceGradients[service.slug] || "from-primary-600 to-primary-800";

  return (
    <div className="bg-white rounded-2xl border border-border/60 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 group">
      <div className="grid lg:grid-cols-[1fr_1fr] gap-0">
        {/* Image side */}
        <div
          className="relative h-48 lg:h-auto min-h-[200px] overflow-hidden bg-cover bg-center transition-transform duration-500 group-hover:scale-[1.02]"
          style={imgSrc ? { backgroundImage: `url(${imgSrc})` } : undefined}
        >
          {!imgSrc && (
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient}`} />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4">
            <div className="w-11 h-11 bg-white/90 backdrop-blur-sm rounded-xl flex items-center justify-center shadow-sm">
              <Icon className="h-5 w-5 text-primary-700" />
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <Badge className="bg-emerald-500 text-white border-0 text-xs font-semibold">
              Tersedia
            </Badge>
          </div>
        </div>

        {/* Content side */}
        <div className="p-6 lg:p-8 flex flex-col">
          <div className="text-xs font-semibold text-primary-600 uppercase tracking-wider mb-1">
            {service.category?.name || "Layanan"}
          </div>
          <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors mb-2">
            {service.name}
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            {service.description}
          </p>

          {service.targetUser && (
            <div className="mb-3">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-0.5">
                Target Pengguna
              </p>
              <p className="text-sm text-foreground">{service.targetUser}</p>
            </div>
          )}

          {latestTariff && (
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 flex items-center gap-2 mb-4">
              <span className="text-sm font-medium text-primary-800">
                Tarif: {formatCurrency(Number(latestTariff.price))} / {latestTariff.unit}
              </span>
            </div>
          )}

          <div className="mt-auto pt-4 border-t border-border/40 flex flex-col sm:flex-row gap-2">
            <Link href={`/layanan/${service.slug}`} className="flex-1">
              <Button variant="outline" className="w-full">
                Lihat Detail
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={`/layanan/${service.slug}/ajukan`} className="flex-1">
              <Button className="w-full shadow-md hover:shadow-lg transition-shadow">
                Ajukan Sekarang
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
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
        <PageHero
          title="Layanan PNBP BDI Makassar"
          description="Pelayanan Penerimaan Negara Bukan Pajak untuk pengembangan SDM industri."
          badge="Layanan PNBP"
          imageAlt="Layanan pelatihan industri"
        />

        {/* Services */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
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
              <div className="space-y-6">
                {filtered.map((service) => (
                  <ServiceCard key={service.id} service={service} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Skema Sertifikasi */}
        <section className="py-16 lg:py-24 bg-muted/30 border-y border-border/50" id="sertifikasi">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="secondary" className="mb-4 px-3 py-1 text-xs uppercase tracking-wider font-semibold">
                Sertifikasi
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                Skema Sertifikasi LSP BDI Makassar
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                15 skema sertifikasi kompetensi yang diakui BNSP
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 max-w-5xl mx-auto">
              {skema.map((s, i) => (
                <div
                  key={s}
                  className="flex items-start gap-3 bg-white rounded-xl p-4 border border-border/60 hover:shadow-md hover:border-primary/20 transition-all"
                >
                  <span className="w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {i + 1}
                  </span>
                  <span className="text-sm text-foreground leading-snug">
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Info Tarif */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
                  <span className="text-primary-700 font-bold">i</span>
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
                      <span className="text-primary-600 mt-0.5 flex-shrink-0">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-white border border-primary-200 rounded-lg p-4">
                  <p className="text-sm text-primary-800">
                    <strong>Catatan:</strong> Tarif merupakan batas tertinggi.
                    Tarif aktual dapat berbeda sesuai ketentuan BDI Makassar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
