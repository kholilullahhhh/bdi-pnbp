import Link from "next/link";
import { Building2, GraduationCap, Users, Home, Compass, ArrowRight, CheckCircle2, Phone, Mail, MapPin, Clock, Star, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";

const services = [
  { icon: GraduationCap, title: "Diklat & Pelatihan", desc: "Pelatihan berbasis kompetensi industri dengan sistem 3 in 1.", href: "/layanan", color: "bg-blue-600" },
  { icon: Users, title: "Jasa Narasumber", desc: "Seminar, workshop, dan pendampingan teknis oleh instruktur kompeten.", href: "/layanan", color: "bg-green-600" },
  { icon: Home, title: "Penyewaan Fasilitas", desc: "Aula, ruang belajar, asrama, dan fasilitas lainnya.", href: "/layanan", color: "bg-orange-600" },
  { icon: Compass, title: "Wisata Edukasi", desc: "Kunjungan industri untuk pembelajaran pengolahan produk pangan.", href: "/layanan", color: "bg-purple-600" },
];

const steps = [
  { step: "01", title: "Pilih Layanan", desc: "Lihat katalog layanan dan pilih yang sesuai kebutuhan." },
  { step: "02", title: "Daftar Online", desc: "Isi formulir pendaftaran dan lengkapi persyaratan." },
  { step: "03", title: "Verifikasi & Bayar", desc: "Admin verifikasi dan kirimkan instruksi pembayaran." },
  { step: "04", title: "Layanan Selesai", desc: "Nikmati layanan dan peroleh bukti pembayaran." },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        {/* Hero */}
        <section className="gradient-bg hero-pattern relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 py-20 lg:py-28">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 bg-white/10 rounded-full px-4 py-2 text-white/90 text-sm">
                  <Building2 className="h-4 w-4" /><span>Kementerian Perindustrian RI</span>
                </div>
                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                  Sistem Informasi <span className="text-yellow-300">PNBP</span><br />BDI Makassar
                </h1>
                <p className="text-lg text-white/80 max-w-lg">Portal resmi informasi Penerimaan Negara Bukan Pajak Balai Diklat Industri Makassar.</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/layanan"><Button size="lg" className="bg-white text-blue-800 hover:bg-gray-100">Lihat Layanan <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
                  <Link href="/login"><Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">Masuk ke Sistem</Button></Link>
                </div>
              </div>
              <div className="hidden lg:block">
                <div className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm grid grid-cols-2 gap-4">
                  {[{ v: "40+", l: "Tahun Pengalaman" }, { v: "15", l: "Skema Sertifikasi" }, { v: "1000+", l: "Alumni Terlatih" }, { v: "100%", l: "Komitmen Mutu" }].map((s) => (
                    <div key={s.l} className="bg-white/10 rounded-xl p-4 text-center">
                      <p className="text-3xl font-bold text-white">{s.v}</p>
                      <p className="text-sm text-white/70 mt-1">{s.l}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 120" fill="none"><path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white" /></svg>
          </div>
        </section>

        {/* Services */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Layanan PNBP Kami</h2>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">Berbagai layanan untuk mendukung pengembangan sumber daya manusia industri</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((s) => (
                <Link key={s.title} href={s.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                    <CardHeader>
                      <div className={`w-12 h-12 ${s.color} rounded-lg flex items-center justify-center mb-2`}><s.icon className="h-6 w-6 text-white" /></div>
                      <CardTitle className="group-hover:text-blue-700 transition-colors">{s.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription>{s.desc}</CardDescription>
                      <div className="mt-4 flex items-center text-sm text-blue-700 font-medium">Selengkapnya <ChevronRight className="ml-1 h-4 w-4" /></div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Cara Menggunakan Layanan</h2>
              <p className="mt-4 text-lg text-gray-600">Proses yang mudah dan transparan</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((s, i) => (
                <div key={s.step} className="relative">
                  {i < steps.length - 1 && <div className="hidden lg:block absolute top-8 left-full w-full h-0.5 bg-gray-300 z-0" />}
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center text-white text-xl font-bold mb-4">{s.step}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{s.title}</h3>
                    <p className="text-gray-600">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Tentang BDI Makassar</h2>
                <div className="space-y-4 text-gray-600">
                  <p>Balai Diklat Industri (BDI) Makassar adalah Unit Pelaksana Teknis di bawah BPSDMI Kementerian Perindustrian RI.</p>
                  <p>Berdiri sejak tahun 1981, BDI Makassar memiliki spesialisasi di bidang agro, pangan, dan fitofarmaka dengan spesialis penunjang desain kemasan industri.</p>
                  <p>Dengan sistem Diklat 3 in 1 (pelatihan + sertifikasi + penempatan kerja), kami berkomitmen menghasilkan SDM industri yang kompeten.</p>
                </div>
                <div className="mt-6 space-y-3">
                  {["Pelatihan berbasis kompetensi", "Sertifikasi melalui LSP BNSP", "Penempatan kerja di industri", "Fasilitas modern dan lengkap"].map((item) => (
                    <div key={item} className="flex items-center gap-2"><CheckCircle2 className="h-5 w-5 text-green-500" /><span className="text-gray-700">{item}</span></div>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: GraduationCap, title: "Diklat 3 in 1", desc: "Pelatihan, sertifikasi, dan penempatan", color: "text-blue-600" },
                  { icon: Star, title: "LSP BNSP", desc: "15 skema sertifikasi", color: "text-yellow-500" },
                  { icon: Users, title: "Inkubator Bisnis", desc: "Pendampingan UMKM", color: "text-green-500" },
                  { icon: Building2, title: "Fasilitas", desc: "Aula, lab, asrama", color: "text-orange-500" },
                ].map((c) => (
                  <Card key={c.title} className="p-6">
                    <c.icon className={`h-8 w-8 ${c.color} mb-3`} />
                    <h3 className="font-semibold text-gray-900">{c.title}</h3>
                    <p className="text-sm text-gray-600 mt-1">{c.desc}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Hubungi Kami</h2>
              <p className="mt-4 text-lg text-gray-600">Kami siap membantu Anda</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              {[
                { icon: MapPin, title: "Alamat", lines: ["Jl. Perintis Kemerdekaan Km 17", "Kota Makassar, Sulawesi Selatan"] },
                { icon: Phone, title: "Telepon", lines: ["0411-556617", "WA: 0822-9331-9335"] },
                { icon: Clock, title: "Jam Layanan", lines: ["Sen-Kam: 07:00 - 16:00", "Jumat: 07:30 - 16:30"] },
              ].map((c) => (
                <Card key={c.title} className="text-center p-6">
                  <c.icon className="h-8 w-8 text-blue-700 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">{c.title}</h3>
                  {c.lines.map((l) => <p key={l} className="text-sm text-gray-600">{l}</p>)}
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
