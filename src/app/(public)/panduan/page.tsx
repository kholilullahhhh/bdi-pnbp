import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { PageHero } from "@/components/landing/page-hero";
import { CheckCircle2, HelpCircle, ArrowRight } from "lucide-react";

const steps = [
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
];

export default function PanduanPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <PageHero
          title="Panduan Penggunaan"
          description="Panduan menggunakan Sistem Informasi PNBP BDI Makassar."
          badge="Panduan"
          imageAlt="Panduan penggunaan sistem"
        />

        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
            {steps.map((s) => (
              <div
                key={s.step}
                className="bg-white rounded-2xl border border-border/60 p-6 hover:shadow-lg hover:border-primary/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary-600 to-primary-700 text-white rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-md">
                    {s.step}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-foreground mb-3">
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
              </div>
            ))}

            <div className="bg-primary-50 border border-primary-200 rounded-2xl p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="w-11 h-11 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <HelpCircle className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-foreground">Butuh Bantuan?</h3>
                <p className="text-sm text-muted-foreground mt-0.5">
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
            </div>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
