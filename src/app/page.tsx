import Link from "next/link";
import {
  Building2,
  GraduationCap,
  Users,
  Home,
  Compass,
  ArrowRight,
  CheckCircle2,
  Phone,
  MapPin,
  Clock,
  Star,
  ChevronRight,
  Award,
  Shield,
  BookOpen,
  Sparkles,
  Quote,
  Headphones,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { prisma } from "@/lib/prisma";

const iconMap: Record<string, typeof GraduationCap> = {
  GraduationCap,
  Users,
  Home,
  Compass,
  Award,
};

const steps = [
  {
    step: "01",
    title: "Pilih Layanan",
    desc: "Eksplorasi katalog layanan PNBP dan tentukan yang sesuai kebutuhan Anda.",
  },
  {
    step: "02",
    title: "Daftar Online",
    desc: "Isi formulir pendaftaran digital dengan cepat dan siapkan berkas persyaratan.",
  },
  {
    step: "03",
    title: "Verifikasi & Pembayaran",
    desc: "Dapatkan kode billing resmi setelah berkas Anda diverifikasi oleh tim admin.",
  },
  {
    step: "04",
    title: "Akses Layanan",
    desc: "Nikmati layanan profesional kami dan dapatkan kuitansi/bukti pembayaran resmi.",
  },
];

const stats = [
  { value: "40+", label: "Tahun Pengalaman", icon: Star },
  { value: "15", label: "Skema Sertifikasi", icon: Award },
  { value: "1.000+", label: "Alumni Terlatih / Thn", icon: Users },
  { value: "100%", label: "Komitmen Mutu", icon: Shield },
];

const testimonials = [
  {
    quote:
      "Pelatihan 3 in 1 BDI Makassar sangat membantu meningkatkan keterampilan praktis saya hingga langsung diserap industri.",
    author: "Andi Pratama",
    role: "Alumni Diklat Pangan",
  },
  {
    quote:
      "Fasilitas aula dan laboratorium yang disewa sangat lengkap, bersih, dan didukung staf yang sangat responsif.",
    author: "Siti Rahmawati",
    role: "Mitra Kerjasama UMKM",
  },
  {
    quote:
      "Sistem informasi PNBP ini membuat proses pendaftaran layanan menjadi transparan, cepat, dan tanpa kendala.",
    author: "Budi Santoso",
    role: "Peserta Wisata Edukasi",
  },
];

const fallbackServices = [
  {
    id: "1",
    name: "Diklat & Pelatihan",
    description: "Pelatihan berbasis kompetensi industri dengan sistem 3 in 1: pelatihan, sertifikasi, dan penempatan kerja.",
    slug: "diklat-pelatihan",
    category: { name: "Pelatihan", icon: "GraduationCap" },
    badge: "Populer",
    color: "bg-blue-600",
  },
  {
    id: "2",
    name: "Jasa Narasumber",
    description: "Seminar, workshop, dan pendampingan teknis oleh instruktur dan ahli kompeten di bidangnya.",
    slug: "jasa-narasumber",
    category: { name: "Jasa", icon: "Users" },
    color: "bg-emerald-600",
  },
  {
    id: "3",
    name: "Penyewaan Fasilitas",
    description: "Aula, ruang belajar, asrama, dan laboratorium modern untuk mendukung berbagai kegiatan Anda.",
    slug: "penyewaan-fasilitas",
    category: { name: "Fasilitas", icon: "Home" },
    color: "bg-amber-600",
  },
  {
    id: "4",
    name: "Wisata Edukasi",
    description: "Kunjungan industri untuk pembelajaran langsung pengolahan produk pangan & kemasan.",
    slug: "wisata-edukasi",
    category: { name: "Edukasi", icon: "Compass" },
    badge: "Edukatif",
    color: "bg-violet-600",
  },
];

export default async function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let dbServices: any[] = [];
  try {
    dbServices = await prisma.service.findMany({
      where: { isActive: true, status: "ACTIVE" },
      include: {
        category: true,
      },
      orderBy: { sortOrder: "asc" },
      take: 4,
    });
  } catch {
    // Use fallback services
  }

  const displayServices = dbServices.length > 0 ? dbServices : fallbackServices;
  return (
    <div className="min-h-screen flex flex-col bg-background font-sans antialiased">
      <PublicNavbar />

      <main className="flex-1">
        {/* ── 1. Hero Section ── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 text-white">
          {/* Background Grid Pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                <Badge className="bg-white/10 text-primary-100 hover:bg-white/20 backdrop-blur-md border-white/20 px-3.5 py-1.5 text-xs font-medium">
                  <Building2 className="h-4 w-4 mr-2 text-primary-300" />
                  Kementerian Perindustrian Republik Indonesia
                </Badge>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15]">
                  Layanan Resmi <br className="hidden sm:block" />
                  <span className="bg-gradient-to-r from-primary-200 via-primary-100 to-amber-200 bg-clip-text text-transparent">
                    PNBP BDI Makassar
                  </span>
                </h1>

                <p className="text-lg sm:text-xl text-primary-100/90 max-w-2xl font-normal leading-relaxed mx-auto lg:mx-0">
                  Portal terpadu untuk pengajuan layanan diklat, penyewaan
                  fasilitas, hingga konsultasi industri secara transparan,
                  akuntabel, dan cepat.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-2">
                  <Link href="/layanan">
                    <Button
                      size="lg"
                      className="w-full sm:w-auto bg-white text-primary-900 hover:bg-primary-50 font-semibold shadow-xl hover:shadow-2xl transition-all"
                    >
                      Jelajahi Layanan
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </Link>
                  <Link href="/panduan">
                    <Button
                      size="lg"
                      variant="outline"
                      className="
                        w-full sm:w-auto
                        inline-flex items-center justify-center gap-2
                        rounded-xl
                        border border-white/40
                        bg-white/10
                        px-6 py-3
                        font-semibold text-white
                        shadow-sm
                        backdrop-blur-md
                        transition-all duration-300
                        hover:border-white/60
                        hover:bg-white/20
                        hover:text-white
                        hover:shadow-lg
                        active:scale-[0.98]
                      "
                    >
                      <BookOpen className="h-5 w-5 shrink-0" />
                      <span>Panduan Penggunaan</span>
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Hero Stats Card / Floating Panel */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/15 hover:border-white/30 hover:bg-white/15 transition-all duration-300 group"
                  >
                    <div className="p-3 w-fit rounded-xl bg-white/10 mb-4 group-hover:scale-110 transition-transform">
                      <s.icon className="h-6 w-6 text-primary-200" />
                    </div>
                    <p className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                      {s.value}
                    </p>
                    <p className="text-sm text-primary-200/80 font-medium mt-1">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Curved Bottom Divider */}
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
            <svg
              className="relative block w-full h-8 sm:h-12 text-background"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              fill="currentColor"
            >
              <path d="M0,0 C150,90 350,-40 500,65 C650,170 900,10 1200,40 L1200,120 L0,120 Z"></path>
            </svg>
          </div>
        </section>

        {/* ── 2. Services Section ── */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <Badge
                variant="secondary"
                className="mb-3 px-3 py-1 text-xs uppercase tracking-wider font-semibold"
              >
                Katalog Utama
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                Layanan Unggulan Kami
              </h2>
              <p className="mt-4 text-base sm:text-lg text-muted-foreground">
                Pilih berbagai skema pelatihan dan fasilitas terbaik yang siap
                mendukung akselerasi SDM serta bisnis Anda.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {displayServices.map((s) => {
                const Icon = iconMap[s.category?.icon] || GraduationCap;
                const color = s.color || "bg-primary-600";
                return (
                  <Link key={s.id} href={`/layanan/${s.slug}`} className="group flex">
                    <Card className="flex flex-col justify-between w-full h-full border border-border/60 hover:border-primary/40 group-hover:shadow-xl transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between mb-4">
                          <div
                            className={`w-12 h-12 ${color} rounded-xl flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}
                          >
                            <Icon className="h-6 w-6" />
                          </div>
                          {s.badge && (
                            <Badge
                              variant="outline"
                              className="border-primary/30 text-primary font-medium text-xs"
                            >
                              {s.badge}
                            </Badge>
                          )}
                        </div>
                        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                          {s.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 flex flex-col justify-between">
                        <CardDescription className="text-sm text-muted-foreground leading-relaxed mb-6">
                          {s.description}
                        </CardDescription>
                        <div className="flex items-center text-sm font-semibold text-primary pt-2 border-t border-border/40">
                          Lihat Detail
                          <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── 3. How It Works Section ── */}
        <section className="py-20 bg-muted/40 border-y border-border/50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge
                variant="secondary"
                className="mb-3 px-3 py-1 text-xs uppercase tracking-wider font-semibold"
              >
                Alur Kerja
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                4 Langkah Mudah Mengakses Layanan
              </h2>
              <p className="mt-4 text-muted-foreground">
                Proses transparan dan terintegrasi secara sistematis dari awal
                hingga selesai.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {steps.map((s) => (
                <div
                  key={s.step}
                  className="relative flex flex-col items-center text-center group"
                >
                  {/* Step Badge/Icon */}
                  <div className="w-16 h-16 rounded-2xl bg-primary text-primary-foreground font-black text-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform mb-6 relative z-10">
                    {s.step}
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 4. About Section ── */}
        <section className="py-20 lg:py-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              <div className="lg:col-span-6 space-y-6">
                <Badge
                  variant="secondary"
                  className="px-3 py-1 text-xs uppercase tracking-wider font-semibold"
                >
                  Profil Lembaga
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-tight">
                  Membangun SDM Industri Unggul dan Berdaya Saing
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Balai Diklat Industri (BDI) Makassar merupakan Unit Pelaksana
                  Teknis di bawah Badan Pengembangan Sumber Daya Manusia
                  Industri (BPSDMI) Kementerian Perindustrian RI.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Berfokus pada spesialisasi industri **Agro, Pangan,
                  Fitofarmaka, dan Desain Kemasan**, BDI Makassar hadir
                  memberikan kontribusi nyata bagi pertumbuhan sektor industri
                  nasional.
                </p>

                <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Sistem Diklat 3 in 1 Terpadu",
                    "Sertifikasi Kompetensi BNSP",
                    "Jaringan Mitra Industri Luas",
                    "Fasilitas Laboratorium Modern",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-emerald-600 flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Feature Cards */}
              <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                {[
                  {
                    icon: GraduationCap,
                    title: "Diklat 3 in 1",
                    desc: "Pelatihan, sertifikasi & penempatan kerja.",
                  },
                  {
                    icon: Star,
                    title: "LSP-P2 BNSP",
                    desc: "Pengujian dengan standar kompetensi kerja nasional.",
                  },
                  {
                    icon: Users,
                    title: "Inkubator Bisnis",
                    desc: "Pendampingan dan komersialisasi UMKM.",
                  },
                  {
                    icon: Building2,
                    title: "Sarana Lengkap",
                    desc: "Gedung diklat, asrama, & lab pengolahan.",
                  },
                ].map((c) => (
                  <Card
                    key={c.title}
                    className="p-6 border border-border/60 hover:shadow-md transition-shadow"
                  >
                    <c.icon className="h-8 w-8 text-primary mb-4" />
                    <h3 className="font-bold text-foreground text-base mb-1">
                      {c.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {c.desc}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Testimonials Section ── */}
        <section className="py-20 bg-muted/30 border-t border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge
                variant="secondary"
                className="mb-3 px-3 py-1 text-xs uppercase tracking-wider font-semibold"
              >
                Testimoni
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                Apa Kata Mereka?
              </h2>
              <p className="mt-4 text-muted-foreground">
                Pengalaman dari para alumni, mitra industri, dan pengguna
                layanan PNBP BDI Makassar.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {testimonials.map((t, idx) => (
                <Card
                  key={idx}
                  className="p-6 border border-border/60 flex flex-col justify-between"
                >
                  <CardContent className="p-0">
                    <Quote className="h-8 w-8 text-primary/30 mb-4" />
                    <p className="text-sm text-foreground/90 italic leading-relaxed mb-6">
                      &ldquo;{t.quote}&rdquo;
                    </p>
                  </CardContent>
                  <div className="pt-4 border-t border-border/40">
                    <p className="font-bold text-sm text-foreground">
                      {t.author}
                    </p>
                    <p className="text-xs text-muted-foreground">{t.role}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* ── 6. CTA Banner Section ── */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-primary-800 to-primary-950 rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="space-y-4 max-w-2xl text-center lg:text-left z-10">
                <Badge className="bg-amber-400/20 text-amber-200 border-amber-400/30">
                  <Sparkles className="h-3.5 w-3.5 mr-1.5" />
                  Siap Melayani Anda
                </Badge>
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                  Tingkatkan Kompetensi & Fasilitas Anda Sekarang
                </h2>
                <p className="text-primary-100/80 text-sm sm:text-base">
                  Daftarkan diri atau instansi Anda untuk menggunakan layanan
                  PNBP BDI Makassar secara langsung dan mudah.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 z-10 w-full sm:w-auto">
                <Link href="/layanan">
                  <Button
                    size="lg"
                    className="w-full sm:w-auto bg-amber-400 text-primary-950 hover:bg-amber-300 font-bold shadow-lg"
                  >
                    Ajukan Layanan
                  </Button>
                </Link>
                <Link href="/kontak">
                  <Button
                    size="lg"
                    variant="outline"
                    className="
                      w-full sm:w-auto
                      inline-flex items-center justify-center gap-2
                      rounded-xl
                      border border-white/40
                      bg-white/10
                      px-6 py-3
                      font-semibold text-white
                      shadow-sm
                      backdrop-blur-md
                      transition-all duration-300
                      hover:border-white/60
                      hover:bg-white/20
                      hover:text-white
                      active:scale-[0.98]
                    "
                  >
                    <Headphones className="h-5 w-5 shrink-0" />
                    <span>Hubungi Admin</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── 7. Contact Section ── */}
        <section className="py-20 bg-muted/40 border-t border-border/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <Badge
                variant="secondary"
                className="mb-3 px-3 py-1 text-xs uppercase tracking-wider font-semibold"
              >
                Kontak & Lokasi
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                Informasi Pelayanan
              </h2>
              <p className="mt-4 text-muted-foreground">
                Kunjungi kami atau hubungi Helpdesk untuk konsultasi lebih
                lanjut.
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-6 max-w-5xl mx-auto">
              {[
                {
                  icon: MapPin,
                  title: "Alamat Kantor",
                  lines: [
                    "Jl. Perintis Kemerdekaan Km 17",
                    "Makassar, Sulawesi Selatan 90242",
                  ],
                },
                {
                  icon: Phone,
                  title: "Kontak Resmi",
                  lines: ["Telp: (0411) 556617", "WhatsApp: 0822-9331-9335"],
                },
                {
                  icon: Clock,
                  title: "Jam Operasional",
                  lines: [
                    "Senin – Kamis: 08:00 – 16:00 WITA",
                    "Jumat: 08:00 – 16:30 WITA",
                  ],
                },
              ].map((c) => (
                <Card
                  key={c.title}
                  className="text-center p-8 border border-border/60 hover:shadow-md transition-shadow"
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-5 text-primary">
                    <c.icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-bold text-foreground text-lg mb-2">
                    {c.title}
                  </h3>
                  {c.lines.map((l) => (
                    <p
                      key={l}
                      className="text-sm text-muted-foreground leading-relaxed"
                    >
                      {l}
                    </p>
                  ))}
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
