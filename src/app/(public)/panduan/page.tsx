import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PublicNavbar } from "@/components/layout/public-navbar";
import { PublicFooter } from "@/components/layout/public-footer";
import { BookOpen, CheckCircle2, HelpCircle } from "lucide-react";

export default function PanduanPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <PublicNavbar />
      <main className="flex-1">
        <section className="gradient-bg py-16">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <BookOpen className="h-12 w-12 text-white/80 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-white">Panduan Penggunaan</h1>
            <p className="mt-4 text-lg text-white/80">Panduan menggunakan Sistem Informasi PNBP</p>
          </div>
        </section>
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 space-y-8">
            {[
              { step: "1", title: "Akses Informasi Layanan", items: ["Kunjungi halaman Layanan", "Lihat deskripsi dan persyaratan", "Periksa tarif dan dasar hukum", "Pahami prosedur dan estimasi waktu"] },
              { step: "2", title: "Buat Akun atau Masuk", items: ["Klik Daftar untuk akun baru", "Isi data diri dengan lengkap", "Gunakan email aktif"] },
              { step: "3", title: "Ajukan Permohonan", items: ["Pilih layanan yang diinginkan", "Lengkapi data dan dokumen", "Submit permohonan"] },
              { step: "4", title: "Pantau Status", items: ["Lihat status di Dashboard", "Terima notifikasi perubahan", "Lihat instruksi pembayaran"] },
            ].map((s) => (
              <Card key={s.step}>
                <CardHeader><CardTitle className="flex items-center gap-3"><div className="w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center text-sm font-bold">{s.step}</div>{s.title}</CardTitle></CardHeader>
                <CardContent><ul className="space-y-2 text-sm text-gray-600">{s.items.map((i) => <li key={i} className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" />{i}</li>)}</ul></CardContent>
              </Card>
            ))}
            <Card className="bg-gray-50"><CardHeader><CardTitle className="flex items-center gap-2"><HelpCircle className="h-5 w-5 text-blue-700" />Butuh Bantuan?</CardTitle></CardHeader><CardContent><p className="text-gray-600">Telepon: 0411-556617 | WhatsApp: 0822-9331-9335 | Email: bdimks.kemenperin@gmail.com</p></CardContent></Card>
          </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
