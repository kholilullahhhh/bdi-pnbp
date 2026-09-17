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
        <section className="gradient-hero py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-white/15 text-white border-white/20 mb-4">
              Panduan
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
              Panduan Penggunaan
            </h1>
            <p className="mt-4 text-lg text-primary-100/80 max-w-2xl mx-auto">
              Panduan menggunakan Sistem Informasi PNBP BDI Makassar
            </p>
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
              <Card key={s.step} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-primary-700 text-white rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
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
                            <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            <Card className="bg-surface border-border">
              <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <HelpCircle className="h-5 w-5 text-primary-700" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">Butuh Bantuan?</h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    Telepon: 0411-556617 | WhatsApp: 0822-9331-9335 | Email:
                    bdimks.kemenperin@gmail.com
                  </p>
                </div>
                <Link href="/kontak">
                  <Button variant="outline" size="sm">
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
