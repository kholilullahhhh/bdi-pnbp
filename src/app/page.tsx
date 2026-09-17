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
  TrendingUp,
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

const services = [
  {
    icon: GraduationCap,
    title: "Diklat & Pelatihan",
    desc: "Pelatihan berbasis kompetensi industri dengan sistem 3 in 1: pelatihan, sertifikasi, dan penempatan kerja.",
    href: "/layanan#diklat",
    color: "bg-primary-700",
    badge: "Populer",
  },
  {
    icon: Users,
    title: "Jasa Narasumber",
    desc: "Seminar, workshop, dan pendampingan teknis oleh instruktur dan ahli kompeten.",
    href: "/layanan#narasumber",
    color: "bg-emerald-600",
  },
  {
    icon: Home,
    title: "Penyewaan Fasilitas",
    desc: "Aula, ruang belajar, asrama, dan laboratorium untuk kegiatan pelatihan.",
    href: "/layanan#penyewaan",
    color: "bg-amber-600",
  },
  {
    icon: Compass,
    title: "Wisata Edukasi",
    desc: "Kunjungan industri untuk pembelajaran pengolahan produk pangan secara langsung.",
    href: "/layanan#wisata",
    color: "bg-violet-600",
    badge: "Rp 1 Jt",
  },
];

const steps = [
  {
    step: "01",
    title: "Pilih Layanan",
    desc: "Lihat katalog layanan dan pilih yang sesuai kebutuhan Anda.",
  },
  {
    step: "02",
    title: "Daftar Online",
    desc: "Isi formulir pendaftaran dan lengkapi persyaratan yang diperlukan.",
  },
  {
    step: "03",
    title: "Verifikasi & Bayar",
    desc: "Admin melakukan verifikasi dan mengirimkan instruksi pembayaran.",
  },
  {
    step: "04",
    title: "Layanan Selesai",
    desc: "Nikmati layanan dan peroleh bukti pembayaran resmi.",
  },
];

const stats = [
  { value: "40+", label: "Tahun Pengalaman", icon: Star },
  { value: "15", label: "Skema Sertifikasi", icon: Award },
  { value: "1.000+", label: "Alumni Terlatih", icon: Users },
  { value: "100%", label: "Komitmen Mutu", icon: Shield },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        {/* ── Hero ── */}
        <section className="relative overflow-hidden gradient-hero">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2220%22%20height%3D%2220%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cpath%20d%3D%22M0%200h1v1H0z%22%20fill%3D%22rgba(255%2C255%2C255%2C0.04)%22%2F%3E%3C%2Fsvg%3E')] opacity-50" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div className="space-y-7 animate-fade-in">
                <Badge className="bg-white/15 text-white border-white/20 hover:bg-white/20">
                  <Building2 className="h-3.5 w-3.5 mr-1.5" />
                  Kementerian Perindustrian RI
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-[3.25rem] font-extrabold text-white leading-[1.1] tracking-tight text-balance">
                  Sistem Informasi{" "}
                  <span className="text-primary-200">PNBP</span>
                  <br />
                  BDI Makassar
                </h1>
                <p className="text-lg text-primary-100/80 max-w-lg leading-relaxed">
                  Portal resmi informasi Penerimaan Negara Bukan Pajak Balai
                  Diklat Industri Makassar. Akses layanan, pengajuan, dan
                  pelacakan status secara transparan.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/layanan">
                    <Button
                      size="lg"
                      className="bg-white text-primary-800 hover:bg-primary-50 shadow-lg"
                    >
                      Lihat Layanan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/panduan">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white/30 text-white hover:bg-white/10"
                    >
                      <BookOpen className="mr-2 h-4 w-4" />
                      Panduan Penggunaan
                    </Button>
                  </Link>
                </div>
              </div>
              {/* Stats */}
              <div className="hidden lg:grid grid-cols-2 gap-4 animate-slide-up">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:bg-white/15 transition-colors"
                  >
                    <s.icon className="h-6 w-6 text-primary-200 mb-3" />
                    <p className="text-3xl font-bold text-white">{s.value}</p>
                    <p className="text-sm text-primary-200/70 mt-1">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Wave divider */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 80"
              fill="none"
              className="w-full h-auto"
              preserveAspectRatio="none"
            >
              <path
                d="M0 80L48 74.7C96 69 192 59 288 53.3C384 48 480 48 576 53.3C672 59 768 69 864 72C960 75 1056 69 1152 64C1248 59 1344 53 1392 50.7L1440 48V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        {/* ── Services ── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="info" className="mb-4">
                Layanan Kami
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                Layanan PNBP BDI Makassar
              </h2>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                Berbagai layanan untuk mendukung pengembangan sumber daya
                manusia industri
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {services.map((s) => (
                <Link key={s.title} href={s.href} className="group">
                  <Card className="h-full group-hover:shadow-lg group-hover:border-primary-200 transition-all duration-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div
                          className={`w-11 h-11 ${s.color} rounded-xl flex items-center justify-center shadow-sm`}
                        >
                          <s.icon className="h-5 w-5 text-white" />
                        </div>
                        {s.badge && (
                          <Badge variant="success" className="text-[10px]">
                            {s.badge}
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-base group-hover:text-primary-700 transition-colors mt-3">
                        {s.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-sm leading-relaxed">
                        {s.desc}
                      </CardDescription>
                      <div className="mt-4 flex items-center text-sm font-medium text-primary-700">
                        Selengkapnya
                        <ChevronRight className="ml-1 h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it Works ── */}
        <section className="py-16 lg:py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="info" className="mb-4">
                Cara Kerja
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                Cara Menggunakan Layanan
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Proses yang mudah, transparan, dan terpercaya
              </p>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 max-w-5xl mx-auto">
              {steps.map((s, i) => (
                <div key={s.step} className="relative text-center">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-[60%] w-[80%] h-px bg-border z-0" />
                  )}
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-primary-700 rounded-2xl flex items-center justify-center text-white text-lg font-bold mx-auto mb-4 shadow-md">
                      {s.step}
                    </div>
                    <h3 className="text-base font-semibold text-foreground mb-2">
                      {s.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── About BDI ── */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <Badge variant="info" className="mb-4">
                  Tentang Kami
                </Badge>
                <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight mb-6">
                  Tentang BDI Makassar
                </h2>
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    Balai Diklat Industri (BDI) Makassar adalah Unit Pelaksana
                    Teknis di bawah BPSDMI Kementerian Perindustrian RI.
                  </p>
                  <p>
                    Berdiri sejak tahun 1981, BDI Makassar memiliki spesialisasi
                    di bidang agro, pangan, dan fitofarmaka dengan spesialis
                    penunjang desain kemasan industri.
                  </p>
                  <p>
                    Dengan sistem Diklat 3 in 1 (pelatihan + sertifikasi +
                    penempatan kerja), kami berkomitmen menghasilkan SDM industri
                    yang kompeten dan siap kerja.
                  </p>
                </div>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Pelatihan berbasis kompetensi",
                    "Sertifikasi melalui LSP BNSP",
                    "Penempatan kerja di industri",
                    "Fasilitas modern dan lengkap",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0" />
                      <span className="text-sm font-medium text-foreground">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: GraduationCap,
                    title: "Diklat 3 in 1",
                    desc: "Pelatihan, sertifikasi, dan penempatan",
                    color: "text-primary-700",
                  },
                  {
                    icon: Star,
                    title: "LSP BNSP",
                    desc: "15 skema sertifikasi",
                    color: "text-amber-500",
                  },
                  {
                    icon: Users,
                    title: "Inkubator Bisnis",
                    desc: "Pendampingan UMKM",
                    color: "text-emerald-600",
                  },
                  {
                    icon: Building2,
                    title: "Fasilitas Lengkap",
                    desc: "Aula, lab, asrama",
                    color: "text-violet-600",
                  },
                ].map((c) => (
                  <Card key={c.title} className="p-5 hover:shadow-md transition-shadow">
                    <c.icon className={`h-7 w-7 ${c.color} mb-3`} />
                    <h3 className="font-semibold text-foreground text-sm">
                      {c.title}
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">
                      {c.desc}
                    </p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Contact ── */}
        <section className="py-16 lg:py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <Badge variant="info" className="mb-4">
                Hubungi Kami
              </Badge>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
                Butuh Bantuan?
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Kami siap membantu Anda
              </p>
            </div>
            <div className="grid sm:grid-cols-3 gap-5 max-w-4xl mx-auto">
              {[
                {
                  icon: MapPin,
                  title: "Alamat",
                  lines: [
                    "Jl. Perintis Kemerdekaan Km 17",
                    "Kota Makassar, Sulawesi Selatan",
                  ],
                },
                {
                  icon: Phone,
                  title: "Telepon & WhatsApp",
                  lines: ["0411-556617", "WA: 0822-9331-9335"],
                },
                {
                  icon: Clock,
                  title: "Jam Layanan",
                  lines: ["Sen–Kam: 07:00–16:00", "Jumat: 07:30–16:30"],
                },
              ].map((c) => (
                <Card key={c.title} className="text-center p-6 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <c.icon className="h-6 w-6 text-primary-700" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {c.title}
                  </h3>
                  {c.lines.map((l) => (
                    <p key={l} className="text-sm text-muted-foreground">
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
