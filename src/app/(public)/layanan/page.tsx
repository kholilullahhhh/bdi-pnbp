import Link from "next/link";
import { GraduationCap, Users, Home, Compass, Award, ArrowRight, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";

const services = [
  { id: "diklat", icon: GraduationCap, title: "Diklat & Pelatihan", subtitle: "Pelatihan berbasis kompetensi industri", desc: "Program pelatihan dengan sistem 3 in 1: pelatihan, sertifikasi kompetensi, dan penempatan kerja. Spesialisasi bidang agro, pangan, dan fitofarmaka.", features: ["Pelatihan Penyelia Halal", "Pandu Kakao", "Pelatihan Olahan Pangan", "Bootcamp intensif"], target: "Masyarakat, UMKM, Pelajar, Instansi, Dunia Usaha" },
  { id: "narasumber", icon: Users, title: "Jasa Narasumber", subtitle: "Seminar, workshop, dan pendampingan", desc: "Layanan jasa narasumber oleh instruktur dan ahli dari BDI Makassar untuk seminar, workshop, dan pendampingan teknis.", features: ["Seminar industri", "Workshop teknis", "Pendampingan UMKM", "Konsultasi teknis"], target: "Instansi, Dunia Usaha, Perguruan Tinggi" },
  { id: "penyewaan", icon: Home, title: "Penyewaan Fasilitas", subtitle: "Aula, ruang belajar, asrama", desc: "Penyewaan fasilitas di BDI Makassar untuk kegiatan pelatihan, rapat, seminar, atau acara lainnya.", features: ["Aula (300 orang)", "Ruang Rapat (50 orang)", "Asrama", "Laboratorium"], target: "Instansi, Organisasi, Masyarakat" },
  { id: "wisata", icon: Compass, title: "Wisata Edukasi", subtitle: "Kunjungan industri untuk pembelajaran", desc: "Program kunjungan industri untuk pembelajaran pengolahan produk pangan seperti cokelat praline dan pizza.", features: ["Pembuatan Cokelat Praline", "Pembuatan Pizza", "Kunjungan pabrik", "Praktik langsung"], target: "Sekolah, Universitas, Komunitas", tarif: "Rp 1.000.000 / 25 orang" },
  { id: "sertifikasi", icon: Award, title: "Sertifikasi Kompetensi", subtitle: "LSP P1 BDI Makassar - BNSP", desc: "Layanan sertifikasi kompetensi profesi melalui LSP P1 BDI Makassar yang terlisensi BNSP dengan 15 skema sertifikasi.", features: ["Operator Mesin Pengolahan", "Pembuatan Olahan Pangan", "Barista & Pengolahan Kopi", "Penyelia Halal"], target: "Alumni Pelatihan, Masyarakat" },
];

const skema = ["Operator Mesin Pengolahan Kakao", "Operator Mesin Pengolahan Rumput Laut", "Pengolahan Ikan Tuna Segar Beku", "Pembuatan Desain Kemasan Produk Pangan", "Pembuatan Aneka Olahan Berbasis Cokelat", "Pembuatan Aneka Olahan Berbasis Rumput Laut", "Pembuatan Aneka Olahan Berbasis Ikan", "Pengolahan dan Penyajian Kopi (Barista)", "Penyelia Halal", "Penyulingan Minyak Atsiri", "Pengalengan Ikan Tuna", "Pengolahan Makanan", "Penyangraian Kopi Biji", "Pengujian Citarasa Kopi", "Pemprosesan Makanan Kering"];

export default function LayananPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <section className="gradient-bg py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold text-white">Layanan PNBP</h1>
            <p className="mt-4 text-lg text-white/80">Pelayanan Penerimaan Negara Bukan Pajak BDI Makassar</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 space-y-8">
            {services.map((s) => (
              <Card key={s.id} id={s.id} className="scroll-mt-24">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center flex-shrink-0"><s.icon className="h-6 w-6 text-white" /></div>
                      <div><CardTitle className="text-xl">{s.title}</CardTitle><p className="text-gray-500 text-sm mt-1">{s.subtitle}</p></div>
                    </div>
                    <Badge variant="success">Tersedia</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <p className="text-gray-600">{s.desc}</p>
                      <div><h4 className="font-medium text-gray-900 mb-1">Target Pengguna:</h4><p className="text-sm text-gray-600">{s.target}</p></div>
                      {s.tarif && <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3"><div className="flex items-center gap-2"><Info className="h-4 w-4 text-yellow-600" /><span className="text-sm font-medium text-yellow-800">Tarif: {s.tarif}</span></div></div>}
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 mb-2">Yang Tersedia:</h4>
                      <ul className="space-y-2">{s.features.map((f) => <li key={f} className="flex items-center gap-2 text-sm text-gray-600"><CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />{f}</li>)}</ul>
                      <div className="pt-4"><Link href="/register"><Button>Ajukan Sekarang <ArrowRight className="ml-2 h-4 w-4" /></Button></Link></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-16 bg-gray-50" id="sertifikasi">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">Skema Sertifikasi LSP BDI Makassar</h2>
              <p className="mt-4 text-lg text-gray-600">15 skema sertifikasi kompetensi yang diakui BNSP</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {skema.map((s, i) => (
                <div key={s} className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200">
                  <span className="w-6 h-6 bg-blue-800 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">{i + 1}</span>
                  <span className="text-sm text-gray-700">{s}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-3xl mx-auto px-4">
            <Card>
              <CardHeader><CardTitle className="flex items-center gap-2"><Info className="h-5 w-5 text-blue-700" />Informasi Tarif PNBP</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">Tarif layanan PNBP ditetapkan berdasarkan:</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /><span>PP 54/2021 tentang Jenis dan Tarif PNBP Kementerian Perindustrian</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /><span>Permenperin 19/2021 tentang Tarif Tertentu PNBP</span></li>
                  <li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" /><span>PMK terkait tarif layanan BLU Kementerian Perindustrian</span></li>
                </ul>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4"><p className="text-sm text-yellow-800"><strong>Catatan:</strong> Tarif merupakan batas tertinggi. Tarif aktual dapat berbeda sesuai ketentuan BDI Makassar.</p></div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
