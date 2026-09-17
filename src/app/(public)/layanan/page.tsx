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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";

const services = [
  {
    id: "diklat",
    icon: GraduationCap,
    title: "Diklat & Pelatihan",
    subtitle: "Pelatihan berbasis kompetensi industri",
    desc: "Program pelatihan dengan sistem 3 in 1: pelatihan, sertifikasi kompetensi, dan penempatan kerja. Spesialisasi bidang agro, pangan, dan fitofarmaka.",
    features: [
      "Pelatihan Penyelia Halal",
      "Pandu Kakao",
      "Pelatihan Olahan Pangan",
      "Bootcamp intensif",
    ],
    target: "Masyarakat, UMKM, Pelajar, Instansi, Dunia Usaha",
  },
  {
    id: "narasumber",
    icon: Users,
    title: "Jasa Narasumber",
    subtitle: "Seminar, workshop, dan pendampingan",
    desc: "Layanan jasa narasumber oleh instruktur dan ahli dari BDI Makassar untuk seminar, workshop, dan pendampingan teknis.",
    features: [
      "Seminar industri",
      "Workshop teknis",
      "Pendampingan UMKM",
      "Konsultasi teknis",
    ],
    target: "Instansi, Dunia Usaha, Perguruan Tinggi",
  },
  {
    id: "penyewaan",
    icon: Home,
    title: "Penyewaan Fasilitas",
    subtitle: "Aula, ruang belajar, asrama",
    desc: "Penyewaan fasilitas di BDI Makassar untuk kegiatan pelatihan, rapat, seminar, atau acara lainnya.",
    features: [
      "Aula (300 orang)",
      "Ruang Rapat (50 orang)",
      "Asrama",
      "Laboratorium",
    ],
    target: "Instansi, Organisasi, Masyarakat",
  },
  {
    id: "wisata",
    icon: Compass,
    title: "Wisata Edukasi",
    subtitle: "Kunjungan industri untuk pembelajaran",
    desc: "Program kunjungan industri untuk pembelajaran pengolahan produk pangan seperti cokelat praline dan pizza.",
    features: [
      "Pembuatan Cokelat Praline",
      "Pembuatan Pizza",
      "Kunjungan pabrik",
      "Praktik langsung",
    ],
    target: "Sekolah, Universitas, Komunitas",
    tarif: "Rp 1.000.000 / 25 orang",
  },
  {
    id: "sertifikasi",
    icon: Award,
    title: "Sertifikasi Kompetensi",
    subtitle: "LSP P1 BDI Makassar — BNSP",
    desc: "Layanan sertifikasi kompetensi profesi melalui LSP P1 BDI Makassar yang terlisensi BNSP dengan 15 skema sertifikasi.",
    features: [
      "Operator Mesin Pengolahan",
      "Pembuatan Olahan Pangan",
      "Barista & Pengolahan Kopi",
      "Penyelia Halal",
    ],
    target: "Alumni Pelatihan, Masyarakat",
  },
];

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

export default function LayananPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        {/* Header */}
        <section className="gradient-hero py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-white/15 text-white border-white/20 mb-4">
              Layanan PNBP
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Layanan PNBP BDI Makassar
            </h1>
            <p className="mt-4 text-lg text-primary-100/80 max-w-2xl mx-auto">
              Pelayanan Penerimaan Negara Bukan Pajak untuk pengembangan SDM
              industri
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {services.map((s) => (
              <Card
                key={s.id}
                id={s.id}
                className="scroll-mt-24 overflow-hidden hover:shadow-md transition-shadow"
              >
                <CardContent className="p-0">
                  <div className="grid lg:grid-cols-[1fr_1fr] gap-0">
                    <div className="p-6 lg:p-8">
                      <div className="flex items-start gap-4 mb-5">
                        <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                          <s.icon className="h-6 w-6 text-primary-700" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h2 className="text-xl font-bold text-foreground">
                              {s.title}
                            </h2>
                            <Badge variant="success" className="text-[10px]">
                              Tersedia
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-0.5">
                            {s.subtitle}
                          </p>
                        </div>
                      </div>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        {s.desc}
                      </p>
                      <div className="mb-4">
                        <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">
                          Target Pengguna
                        </p>
                        <p className="text-sm text-foreground">{s.target}</p>
                      </div>
                      {s.tarif && (
                        <div className="bg-warning-light border border-amber-200 rounded-lg p-3 flex items-center gap-2">
                          <Info className="h-4 w-4 text-amber-600 flex-shrink-0" />
                          <span className="text-sm font-medium text-amber-800">
                            Tarif: {s.tarif}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="bg-surface p-6 lg:p-8 border-t lg:border-t-0 lg:border-l border-border">
                      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
                        Yang Tersedia
                      </h3>
                      <ul className="space-y-2.5 mb-6">
                        {s.features.map((f) => (
                          <li
                            key={f}
                            className="flex items-center gap-2.5 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <Link href="/register">
                        <Button className="w-full">
                          Ajukan Sekarang
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Skema Sertifikasi */}
        <section className="py-16 lg:py-24 bg-surface" id="sertifikasi">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="info" className="mb-4">
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
                  className="flex items-start gap-3 bg-white rounded-xl p-4 border border-border hover:border-primary-200 hover:shadow-sm transition-all"
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
        <section className="py-16 lg:py-24">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary-700" />
                  Informasi Tarif PNBP
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
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
                      <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-warning-light border border-amber-200 rounded-lg p-4">
                  <p className="text-sm text-amber-800">
                    <strong>Catatan:</strong> Tarif merupakan batas tertinggi.
                    Tarif aktual dapat berbeda sesuai ketentuan BDI Makassar.
                  </p>
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
