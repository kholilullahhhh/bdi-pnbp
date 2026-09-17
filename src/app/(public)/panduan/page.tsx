import Link from "next/link";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { BookOpen, CheckCircle2, HelpCircle, ArrowRight } from "lucide-react";

export default function PanduanPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <section className="relative overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-950 py-16 lg:py-20">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-white/10 text-primary-100 hover:bg-white/20 backdrop-blur-md border-white/20 mb-4">
              Panduan
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Panduan Penggunaan
            </h1>
            <p className="mt-4 text-lg text-primary-200/80 max-w-2xl mx-auto">
              Panduan menggunakan Sistem Informasi PNBP BDI Makassar
            </p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 overflow-hidden leading-none">
            <svg className="relative block w-full h-8 sm:h-12 text-background" viewBox="0 0 1200 120" preserveAspectRatio="none" fill="currentColor">
              <path d="M0,0 C150,90 350,-40 500,65 C650,170 900,10 1200,40 L1200,120 L0,120 Z"></path>
            </svg>
          </div>
        </section>

        <section className="py-16 lg:py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {[
              {
                step: "1",
                title: "Akses Informasi Layanan",
                items: [
                  "Kunjungi halaman Layanan untuk melihat semua layanan tersedia",
                  "Lihat deskripsi, persyaratan, dan estimasi waktu",
                  "Periksa tarif dan dasar hukum yang berlaku",
                  "Pahami prosedur untuk setiap jenis layanan",
                ],
              },
              {
                step: "2",
                title: "Buat Akun atau Masuk",
                items: [
                  "Klik Daftar untuk membuat akun baru secara gratis",
                  "Isi data diri dengan lengkap dan benar",
                  "Gunakan email aktif untuk menerima notifikasi",
                  "Jika sudah memiliki akun, langsung Masuk",
                ],
              },
              {
                step: "3",
                title: "Ajukan Permohonan",
                items: [
                  "Pilih layanan yang sesuai kebutuhan Anda",
                  "Lengkapi data dan unggah dokumen yang diperlukan",
                  "Periksa kembali data sebelum mengirim",
                  "Submit permohonan dan catat nomor referensi",
                ],
              },
              {
                step: "4",
                title: "Pantau & Selesaikan",
                items: [
                  "Lihat status permohonan di Dashboard secara real-time",
                  "Ikuti instruksi pembayaran jika diperlukan",
                  "Unduh bukti pembayaran setelah verifikasi",
                  "Selesaikan layanan dan berikan umpan balik",
                ],
              },
            ].map((s) => (
              <Card key={s.step} className="hover:shadow-lg transition-shadow border-border/60">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 bg-gradient-to-br from-primary-700 to-primary-800 text-white rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md">
                      {s.step}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-foreground mb-3">
                        {s.title}
                      </h3>
                      <ul className="space-y-2">
                        {s.items.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 text-sm text-muted-foreground"
                          >
                            <CheckCircle2 className="h-4 w-4 text-primary-600 mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-primary-50 border-primary-200">
              <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-11 h-11 bg-gradient-to-br from-primary-700 to-primary-800 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                  <HelpCircle className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary-900">Butuh Bantuan?</h3>
                  <p className="text-sm text-primary-700/80 mt-0.5">
                    Telepon: 0411-556617 | WhatsApp: 0822-9331-9335 | Email:
                    bdimks.kemenperin@gmail.com
                  </p>
                </div>
                <Link href="/kontak">
                  <Button variant="outline" size="sm" className="border-primary-200 text-primary-700 hover:bg-primary-100">
                    Hubungi Kami
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
