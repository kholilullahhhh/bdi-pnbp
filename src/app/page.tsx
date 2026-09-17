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
  Mail,
  MapPin,
  Clock,
  Star,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";

const services = [
  {
    icon: GraduationCap,
    title: "Diklat & Pelatihan",
    description:
      "Pelatihan berbasis kompetensi industri dengan sistem 3 in 1: pelatihan, sertifikasi, dan penempatan kerja.",
    href: "/layanan#diklat",
    color: "bg-blue-500",
  },
  {
    icon: Users,
    title: "Jasa Narasumber",
    description:
      "Seminar, workshop, dan pendampingan teknis oleh instruktur kompeten.",
    href: "/layanan#narasumber",
    color: "bg-green-500",
  },
  {
    icon: Home,
    title: "Penyewaan Fasilitas",
    description:
      "Aula, ruang belajar, asrama, dan fasilitas lainnya untuk kegiatan Anda.",
    href: "/layanan#penyewaan",
    color: "bg-orange-500",
  },
  {
    icon: Compass,
    title: "Wisata Edukasi",
    description:
      "Kunjungan industri untuk pembelajaran pengolahan produk pangan.",
    href: "/layanan#wisata",
    color: "bg-purple-500",
  },
];

const steps = [
  {
    step: "01",
    title: "Pilih Layanan",
    description: "Lihat katalog layanan dan pilih yang sesuai kebutuhan Anda.",
  },
  {
    step: "02",
    title: "Daftar Online",
    description: "Isi formulir pendaftaran dan lengkapi persyaratan yang diperlukan.",
  },
  {
    step: "03",
    title: "Verifikasi & Bayar",
    description: "Admin memverifikasi pendaftaran dan mengirimkan instruksi pembayaran.",
  },
  {
    step: "04",
    title: "Layanan Selesai",
    description: "Nikmati layanan dan peroleh bukti/bukti pembayaran.",
  },
];

const stats = [
  { value: "40+", label: "Tahun Pengalaman" },
  { value: "15", label: "Skema Sertifikasi" },
  { value: "1000+", label: "Alumni Terlatih" },
  { value: "100%", label: "Komitmen Mutu" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="gradient-bg hero-pattern relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-white/90 text-sm">
                  <Building2 className="h-4 w-4" />
                  <span>Kementerian Perindustrian RI</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Sistem Informasi{" "}
                  <span className="text-yellow-300">PNBP</span>
                  <br />
                  BDI Makassar
                </h1>
                <p className="text-lg text-white/80 max-w-lg">
                  Portal resmi informasi Penerimaan Negara Bukan Pajak Balai
                  Diklat Industri Makassar. Akses layanan pelatihan,
                  sertifikasi, dan fasilitas industri.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/layanan">
                    <Button
                      size="lg"
                      className="bg-white text-primary-500 hover:bg-gray-100"
                    >
                      Lihat Layanan
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/login">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-white text-white hover:bg-white/10"
                    >
                      Masuk ke Sistem
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="hidden lg:block">
                <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm">
                  <div className="grid grid-cols-2 gap-4">
                    {stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="bg-white/10 rounded-xl p-4 text-center"
                      >
                        <p className="text-3xl font-bold text-white">
                          {stat.value}
                        </p>
                        <p className="text-sm text-white/70 mt-1">
                          {stat.label}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Wave decoration */}
          <div className="absolute bottom-0 left-0 right-0">
            <svg
              viewBox="0 0 1440 120"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
                fill="white"
              />
            </svg>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Layanan PNBP Kami
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Berbagai layanan yang dirancang untuk mendukung pengembangan
                sumber daya manusia industri
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service) => (
                <Link key={service.title} href={service.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div
                        className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-2`}
                      >
                        <service.icon className="h-6 w-6 text-white" />
                      </div>
                      <CardTitle className="group-hover:text-primary-500 transition-colors">
                        {service.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{service.description}</CardDescription>
                      <div className="mt-4 flex items-center text-sm text-primary-500 font-medium">
                        Selengkapnya
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Cara Menggunakan Layanan
              </h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                Proses yang mudah dan transparan untuk mengakses layanan kami
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <div key={step.step} className="relative">
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 z-0" />
                  )}
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">
                      {step.step}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Tentang BDI Makassar
                </h2>
                <div className="space-y-4 text-gray-600">
                  <p>
                    Balai Diklat Industri (BDI) Makassar adalah Unit Pelaksana
                    Teknis di bawah Badan Pengembangan Sumber Daya Manusia
                    Industri (BPSDMI) Kementerian Perindustrian RI.
                  </p>
                  <p>
                    Berdiri sejak tahun 1981, BDI Makassar memiliki spesialisasi
                    di bidang agro, pangan, dan fitofarmaka dengan spesialis
                    penunjang desain kemasan industri.
                  </p>
                  <p>
                    Dengan sistem Diklat 3 in 1 (pelatihan + sertifikasi +
                    penempatan kerja), kami berkomitmen menghasilkan SDM industri
                    yang kompeten dan berdaya saing.
                  </p>
                </div>
                <div className="mt-6 space-y-3">
                  {[
                    "Pelatihan berbasis kompetensi",
                    "Sertifikasi melalui LSP BNSP",
                    "Penempatan kerja di industri",
                    "Fasilitas modern dan lengkap",
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Card className="p-6">
                  <GraduationCap className="h-8 w-8 text-primary-500 mb-3" />
                  <h3 className="font-semibold text-gray-900">Diklat 3 in 1</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Pelatihan, sertifikasi, dan penempatan kerja
                  </p>
                </Card>
                <Card className="p-6">
                  <Star className="h-8 w-8 text-yellow-500 mb-3" />
                  <h3 className="font-semibold text-gray-900">LSP BNSP</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    15 skema sertifikasi kompetensi
                  </p>
                </Card>
                <Card className="p-6">
                  <Users className="h-8 w-8 text-green-500 mb-3" />
                  <h3 className="font-semibold text-gray-900">
                    Inkubator Bisnis
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Pendampingan UMKM dan wirausaha
                  </p>
                </Card>
                <Card className="p-6">
                  <Building2 className="h-8 w-8 text-orange-500 mb-3" />
                  <h3 className="font-semibold text-gray-900">Fasilitas</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Aula, lab, asrama, dan workshop
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Hubungi Kami
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                Kami siap membantu Anda mengakses layanan PNBP
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="text-center p-6">
                <MapPin className="h-8 w-8 text-primary-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Alamat</h3>
                <p className="text-sm text-gray-600">
                  Jl. Perintis Kemerdekaan Km 17, Kota Makassar, Prov.
                  Sulawesi Selatan
                </p>
              </Card>
              <Card className="text-center p-6">
                <Phone className="h-8 w-8 text-primary-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Telepon</h3>
                <p className="text-sm text-gray-600">0411-556617</p>
                <p className="text-sm text-gray-600">WA: 0822-9331-9335</p>
              </Card>
              <Card className="text-center p-6">
                <Clock className="h-8 w-8 text-primary-500 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">
                  Jam Layanan
                </h3>
                <p className="text-sm text-gray-600">
                  Sen-Kam: 07:00 - 16:00
                </p>
                <p className="text-sm text-gray-600">Jumat: 07:30 - 16:30</p>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <PublicFooter />
    </div>
  );
}
