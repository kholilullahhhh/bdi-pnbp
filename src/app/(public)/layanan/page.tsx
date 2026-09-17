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
  CardDescription,
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
    description:
      "Program pelatihan dengan sistem 3 in 1 yang meliputi pelatihan, sertifikasi kompetensi, dan penempatan kerja. Spesialisasi di bidang agro, pangan, dan fitofarmaka.",
    features: [
      "Pelatihan Penyelia Halal",
      "Pandu Kakao",
      "Pelatihan Olahan Pangan",
      "Bootcamp intensif",
    ],
    targetUser: "Masyarakat, UMKM, Pelajar, Instansi, Dunia Usaha",
    status: "Tersedia",
    statusColor: "bg-green-100 text-green-800",
    learnMore: "#",
    register: "#",
  },
  {
    id: "narasumber",
    icon: Users,
    title: "Jasa Narasumber",
    subtitle: "Seminar, workshop, dan pendampingan teknis",
    description:
      "Layanan jasa narasumber oleh instruktur dan ahli dari BDI Makassar untuk seminar, workshop, dan pendampingan teknis di berbagai bidang industri.",
    features: [
      "Seminar industri",
      "Workshop teknis",
      "Pendampingan UMKM",
      "Konsultasi teknis",
    ],
    targetUser: "Instansi, Dunia Usaha, Perguruan Tinggi",
    status: "Tersedia",
    statusColor: "bg-green-100 text-green-800",
    learnMore: "#",
    register: "#",
  },
  {
    id: "penyewaan",
    icon: Home,
    title: "Penyewaan Fasilitas",
    subtitle: "Aula, ruang belajar, asrama",
    description:
      "Penyewaan fasilitas di BDI Makassar untuk kegiatan pelatihan, rapat, seminar, atau acara lainnya dengan fasilitas yang memadai.",
    features: [
      "Aula (300 orang)",
      "Ruang Rapat/Kelas (50 orang)",
      "Asrama",
      "Laboratorium",
    ],
    targetUser: "Instansi, Organisasi, Masyarakat",
    status: "Tersedia",
    statusColor: "bg-green-100 text-green-800",
    learnMore: "#",
    register: "#",
  },
  {
    id: "wisata",
    icon: Compass,
    title: "Wisata Edukasi",
    subtitle: "Kunjungan industri untuk pembelajaran",
    description:
      "Program kunjungan industri untuk pembelajaran pengolahan produk pangan seperti cokelat praline dan pizza.",
    features: [
      "Pembuatan Cokelat Praline",
      "Pembuatan Pizza",
      "Kunjungan pabrik",
      "Praktik langsung",
    ],
    targetUser: "Sekolah, Universitas, Komunitas",
    status: "Tersedia",
    statusColor: "bg-green-100 text-green-800",
    tarif: "Rp 1.000.000 / 25 orang",
    learnMore: "#",
    register: "#",
  },
  {
    id: "sertifikasi",
    icon: Award,
    title: "Sertifikasi Kompetensi",
    subtitle: "Lembaga Sertifikasi Profesi (LSP) BNSP",
    description:
      "Layanan sertifikasi kompetensi profesi melalui LSP P1 BDI Makassar yang terlisensi BNSP dengan 15 skema sertifikasi.",
    features: [
      "Operator Mesin Pengolahan",
      "Pembuatan Olahan Pangan",
      "Barista & Pengolahan Kopi",
      "Penyelia Halal",
    ],
    targetUser: "Alumni Pelatihan, Masyarakat",
    status: "Tersedia",
    statusColor: "bg-green-100 text-green-800",
    learnMore: "#",
    register: "#",
  },
];

const skemaSertifikasi = [
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
        <section className="gradient-bg py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white">
                Layanan PNBP
              </h1>
              <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
                Pelayanan Penerimaan Negara Bukan Pajak Balai Diklat Industri
                Makassar
              </p>
            </div>
          </div>
        </section>

        {/* Services List */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-8">
              {services.map((service) => (
                <Card
                  key={service.id}
                  id={service.id}
                  className="scroll-mt-24"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-primary-500 rounded-lg flex items-center justify-center flex-shrink-0">
                          <service.icon className="h-6 w-6 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl">
                            {service.title}
                          </CardTitle>
                          <CardDescription className="text-base">
                            {service.subtitle}
                          </CardDescription>
                        </div>
                      </div>
                      <Badge className={service.statusColor}>
                        {service.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid lg:grid-cols-2 gap-8">
                      <div className="space-y-4">
                        <p className="text-gray-600">{service.description}</p>

                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Target Pengguna:
                          </h4>
                          <p className="text-sm text-gray-600">
                            {service.targetUser}
                          </p>
                        </div>

                        {service.tarif && (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                            <div className="flex items-center gap-2">
                              <Info className="h-4 w-4 text-yellow-600" />
                              <span className="text-sm font-medium text-yellow-800">
                                Tarif: {service.tarif}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">
                            Yang Tersedia:
                          </h4>
                          <ul className="space-y-2">
                            {service.features.map((feature) => (
                              <li
                                key={feature}
                                className="flex items-center gap-2 text-sm text-gray-600"
                              >
                                <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex gap-3 pt-4">
                          <Link href={service.register}>
                            <Button>
                              Ajukan Sekarang
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Sertifikasi Section */}
        <section className="py-16 bg-gray-50" id="sertifikasi">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900">
                Skema Sertifikasi LSP BDI Makassar
              </h2>
              <p className="mt-4 text-lg text-gray-600">
                15 skema sertifikasi kompetensi yang diakui BNSP
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {skemaSertifikasi.map((skema, index) => (
                <div
                  key={skema}
                  className="flex items-start gap-3 bg-white rounded-lg p-4 border border-gray-200"
                >
                  <span className="w-6 h-6 bg-primary-500 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0">
                    {index + 1}
                  </span>
                  <span className="text-sm text-gray-700">{skema}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Tarif Info */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5 text-primary-500" />
                  Informasi Tarif PNBP
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Tarif layanan PNBP BDI Makassar ditetapkan berdasarkan:
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Peraturan Pemerintah Nomor 54 Tahun 2021 tentang Jenis dan
                      Tarif atas Jenis PNBP pada Kementerian Perindustrian
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Peraturan Menteri Perindustrian Nomor 19 Tahun 2021
                      tentang Besaran, Persyaratan, dan Tata Cara Pengenaan
                      Tarif Tertentu atas Jenis PNBP
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>
                      Peraturan Menteri Keuangan terkait tarif layanan BLU
                      Kementerian Perindustrian
                    </span>
                  </li>
                </ul>
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                  <p className="text-sm text-yellow-800">
                    <strong>Catatan:</strong> Tarif yang tercantum merupakan
                    batas tarif tertinggi. Tarif aktual dapat berbeda sesuai
                    ketentuan yang berlaku di BDI Makassar. Untuk informasi
                    tarif terkini, silakan hubungi kami.
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
